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
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json(
                { error: "Email and code are required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Find the latest unverified OTP
        const otp = await prisma.otp.findFirst({
            where: {
                email: normalizedEmail,
                code: String(code),
                verified: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });

        if (!otp || !otp.user) {
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

        let user = otp.user;

        // Ensure user has affiliate role and referral code
        if (!user.referralCode || user.role !== "affiliate") {
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    role: "affiliate",
                    referralCode: user.referralCode || generateReferralCode(),
                    applicationStatus: user.applicationStatus || "approved",
                },
            });
        }

        // Create affiliate session token
        const token = await new SignJWT({
            userId: user.id,
            email: user.email,
            role: "affiliate",
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

        // Set affiliate session cookie
        response.cookies.set("affiliate-session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Affiliate verify OTP error:", error);
        return NextResponse.json(
            { error: "Verification failed" },
            { status: 500 }
        );
    }
}
