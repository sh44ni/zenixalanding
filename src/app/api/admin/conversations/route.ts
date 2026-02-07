"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const conversations = await prisma.chatConversation.findMany({
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        return NextResponse.json({ conversations });
    } catch (error) {
        console.error("Fetch conversations error:", error);
        return NextResponse.json(
            { error: "Failed to fetch conversations" },
            { status: 500 }
        );
    }
}
