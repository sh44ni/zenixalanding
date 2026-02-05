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

        const referral = await prisma.referral.findUnique({
            where: { id },
        });

        if (!referral) {
            return NextResponse.json(
                { error: "Referral not found" },
                { status: 404 }
            );
        }

        if (referral.status !== "signup") {
            return NextResponse.json(
                { error: "Referral already processed" },
                { status: 400 }
            );
        }

        // Update referral status to purchased
        await prisma.referral.update({
            where: { id },
            data: { status: "purchased" },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Mark purchased error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
