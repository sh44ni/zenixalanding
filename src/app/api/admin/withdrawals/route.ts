import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    // Verify admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const withdrawals = await prisma.withdrawalRequest.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: { email: true, name: true },
                },
            },
        });

        return NextResponse.json({ withdrawals });
    } catch (error) {
        console.error("Failed to fetch withdrawals:", error);
        return NextResponse.json(
            { error: "Failed to fetch withdrawals" },
            { status: 500 }
        );
    }
}
