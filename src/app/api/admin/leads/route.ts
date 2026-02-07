"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const leads = await prisma.chatLead.findMany({
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        return NextResponse.json({ leads });
    } catch (error) {
        console.error("Fetch leads error:", error);
        return NextResponse.json(
            { error: "Failed to fetch leads" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status, notes } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Lead ID is required" },
                { status: 400 }
            );
        }

        const lead = await prisma.chatLead.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(notes !== undefined && { notes }),
            },
        });

        return NextResponse.json({ lead });
    } catch (error) {
        console.error("Update lead error:", error);
        return NextResponse.json(
            { error: "Failed to update lead" },
            { status: 500 }
        );
    }
}
