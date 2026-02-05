import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Verify admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { id } = await params;
        const body = await req.json();
        const { status } = body;

        if (!status || !["pending", "clearance", "paid"].includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const commission = await prisma.commission.findUnique({
            where: { id },
        });

        if (!commission) {
            return NextResponse.json(
                { error: "Commission not found" },
                { status: 404 }
            );
        }

        const oldStatus = commission.status;
        const amount = commission.amount;

        // Update commission status
        await prisma.commission.update({
            where: { id },
            data: {
                status,
                paidAt: status === "paid" ? new Date() : null,
            },
        });

        // Update user balances based on status transition
        if (status === "paid" && oldStatus !== "paid") {
            await prisma.user.update({
                where: { id: commission.userId },
                data: {
                    pendingEarnings: { decrement: amount },
                    walletBalance: { increment: amount },
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Update commission status error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
