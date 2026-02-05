import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Verify admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { id } = await params;
        const { status } = await req.json();

        const withdrawal = await prisma.withdrawalRequest.update({
            where: { id },
            data: {
                status,
                processedAt: status === "completed" || status === "rejected" ? new Date() : null,
            },
        });

        // If rejected, refund the amount to user's wallet
        if (status === "rejected") {
            await prisma.user.update({
                where: { id: withdrawal.userId },
                data: {
                    walletBalance: { increment: withdrawal.amount },
                },
            });
        }

        return NextResponse.json({ success: true, withdrawal });
    } catch (error) {
        console.error("Failed to update withdrawal:", error);
        return NextResponse.json(
            { error: "Failed to update withdrawal" },
            { status: 500 }
        );
    }
}
