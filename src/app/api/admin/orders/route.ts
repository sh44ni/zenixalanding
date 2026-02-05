import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    // Verify admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
