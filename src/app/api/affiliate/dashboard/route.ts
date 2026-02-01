import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "zenixa-secure-jwt-secret-key-2026"
);

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("affiliate-session")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.userId as string;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                referralsGiven: {
                    include: { referred: true },
                    orderBy: { createdAt: "desc" },
                },
                commissions: {
                    orderBy: { createdAt: "desc" },
                },
                withdrawals: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Calculate stats
        const totalReferrals = user.referralsGiven.length;
        const completedReferrals = user.referralsGiven.filter(r => r.status === "completed").length;
        const pendingReferrals = user.referralsGiven.filter(r => r.status !== "completed").length;
        const totalEarnings = user.commissions.reduce((sum, c) => sum + c.amount, 0);
        const availableBalance = user.walletBalance;
        const pendingEarnings = user.pendingEarnings;

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                referralCode: user.referralCode,
                walletBalance: user.walletBalance,
                pendingEarnings: user.pendingEarnings,
                bankName: user.bankName,
                accountNumber: user.accountNumber,
                accountTitle: user.accountTitle,
            },
            stats: {
                totalReferrals,
                completedReferrals,
                pendingReferrals,
                totalEarnings,
                availableBalance,
                pendingEarnings,
            },
            referrals: user.referralsGiven.map(r => ({
                id: r.id,
                email: r.referred.email,
                name: r.referred.name,
                status: r.status,
                createdAt: r.createdAt,
            })),
            withdrawals: user.withdrawals.slice(0, 5).map(w => ({
                id: w.id,
                amount: w.amount,
                status: w.status,
                createdAt: w.createdAt,
                processedAt: w.processedAt,
            })),
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json(
            { error: "Failed to load dashboard" },
            { status: 500 }
        );
    }
}
