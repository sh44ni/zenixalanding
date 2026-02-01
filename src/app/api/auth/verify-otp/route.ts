import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "zenixa-secure-jwt-secret-key-2026"
);

// Generate a unique referral code
function generateReferralCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, code, referralCode } = body;

        if (!email || !code) {
            return NextResponse.json(
                { error: "Email and code are required" },
                { status: 400 }
            );
        }

        // Find the latest unverified OTP for this email
        console.log("Verifying OTP:", { email: email.toLowerCase(), code, codeType: typeof code });

        const otp = await prisma.otp.findFirst({
            where: {
                email: email.toLowerCase(),
                code: String(code), // Ensure code is string
                verified: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });

        console.log("OTP found:", otp ? { id: otp.id, code: otp.code, expiresAt: otp.expiresAt } : null);

        if (!otp) {
            // Debug: Check what OTPs exist for this email
            const allOtps = await prisma.otp.findMany({
                where: { email: email.toLowerCase() },
                orderBy: { createdAt: "desc" },
                take: 3,
            });
            console.log("All recent OTPs for email:", allOtps.map(o => ({ code: o.code, verified: o.verified, expiresAt: o.expiresAt })));

            return NextResponse.json(
                { error: "Invalid or expired code" },
                { status: 400 }
            );
        }

        // Mark OTP as verified
        await prisma.otp.update({
            where: { id: otp.id },
            data: { verified: true },
        });

        // Validate referral code if provided
        let validReferralCode: string | null = null;
        if (referralCode) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: referralCode.toUpperCase() },
            });
            if (referrer) {
                validReferralCode = referralCode.toUpperCase();
            }
        }

        // Get or ensure user exists
        let user = otp.user || await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // If user doesn't have a referral code yet, generate one
        // Also update referredBy if this is effectively signup and referral code was provided
        const isNewUser = !user.referralCode;
        if (isNewUser) {
            const newReferralCode = generateReferralCode();
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    referralCode: newReferralCode,
                    referredBy: validReferralCode,
                },
            });

            // Create referral record if they signed up with a valid referral code
            if (validReferralCode) {
                const referrer = await prisma.user.findUnique({
                    where: { referralCode: validReferralCode },
                });
                if (referrer) {
                    await prisma.referral.create({
                        data: {
                            referrerId: referrer.id,
                            referredId: user.id,
                            status: "signup",
                        },
                    });
                }
            }
        }

        // Create JWT session token
        const token = await new SignJWT({
            userId: user.id,
            email: user.email
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        // Create response with session cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                referralCode: user.referralCode,
            },
        });

        // Set HTTP-only cookie
        response.cookies.set("zenixa_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

