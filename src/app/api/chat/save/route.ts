"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface SaveConversationRequest {
    sessionId: string;
    messages: Array<{
        role: "user" | "assistant";
        content: string;
        timestamp?: string;
    }>;
    status?: "active" | "ended";
    visitorInfo?: {
        userAgent?: string;
        pageUrl?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as SaveConversationRequest;
        const { sessionId, messages, status = "active", visitorInfo } = body;

        if (!sessionId || !messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "sessionId and messages array are required" },
                { status: 400 }
            );
        }

        // Add timestamps to messages if not present
        const timestampedMessages = messages.map(msg => ({
            ...msg,
            timestamp: msg.timestamp || new Date().toISOString()
        }));

        // Upsert conversation - create if doesn't exist, update if it does
        const conversation = await prisma.chatConversation.upsert({
            where: { sessionId },
            create: {
                sessionId,
                messages: timestampedMessages,
                status,
                visitorInfo: visitorInfo ? visitorInfo : undefined,
            },
            update: {
                messages: timestampedMessages,
                status,
                ...(visitorInfo && { visitorInfo }),
            },
        });

        return NextResponse.json({
            success: true,
            conversationId: conversation.id
        });
    } catch (error) {
        console.error("Save conversation error:", error);
        return NextResponse.json(
            { error: "Failed to save conversation" },
            { status: 500 }
        );
    }
}
