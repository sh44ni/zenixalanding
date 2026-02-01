import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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
        const { email, name, phone, promotionMethod, socialLinks, expectedReferrals, whyAffiliate } = body;

        if (!email || !name || !phone || !promotionMethod || !expectedReferrals || !whyAffiliate) {
            return NextResponse.json(
                { error: "All required fields must be filled" },
                { status: 400 }
            );
        }

        // Verify user is logged in via session
        const cookieStore = await cookies();
        const token = cookieStore.get("zenixa_session")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Please verify your email first" },
                { status: 401 }
            );
        }

        let userId: string;
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            userId = payload.userId as string;
        } catch {
            return NextResponse.json(
                { error: "Session expired. Please verify your email again" },
                { status: 401 }
            );
        }

        // Check if user already has a pending or approved application
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (existingUser.applicationStatus === "pending") {
            return NextResponse.json(
                { error: "You already have a pending application" },
                { status: 400 }
            );
        }

        if (existingUser.applicationStatus === "approved") {
            return NextResponse.json(
                { error: "You are already an approved affiliate" },
                { status: 400 }
            );
        }

        // Generate referral code for the application
        let referralCode = existingUser.referralCode;
        if (!referralCode) {
            referralCode = generateReferralCode();
            // Ensure uniqueness
            let exists = await prisma.user.findUnique({ where: { referralCode } });
            while (exists) {
                referralCode = generateReferralCode();
                exists = await prisma.user.findUnique({ where: { referralCode } });
            }
        }

        // Update user with application data
        await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                phone,
                referralCode,
                applicationStatus: "pending",
                applicationDate: new Date(),
                applicationData: {
                    promotionMethod,
                    socialLinks,
                    expectedReferrals,
                    whyAffiliate,
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
        });
    } catch (error) {
        console.error("Affiliate apply error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
