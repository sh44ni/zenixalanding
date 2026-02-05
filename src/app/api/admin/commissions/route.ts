import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
    // Verify admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { userId, amount, source, referralId } = body;

        if (!userId || !amount || !source) {
            return NextResponse.json(
                { error: "userId, amount, and source are required" },
                { status: 400 }
            );
        }

        // Create commission
        const commission = await prisma.commission.create({
            data: {
                userId,
                amount: parseFloat(amount),
                source,
                referralId,
                status: "pending",
            },
        });

        // Update user pending earnings
        await prisma.user.update({
            where: { id: userId },
            data: {
                pendingEarnings: { increment: parseFloat(amount) },
            },
        });

        // Mark referral as completed if referralId provided
        if (referralId) {
            await prisma.referral.update({
                where: { id: referralId },
                data: { status: "completed" },
            });
        }

        return NextResponse.json({ success: true, commission });
    } catch (error) {
        console.error("Create commission error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

