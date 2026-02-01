import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
