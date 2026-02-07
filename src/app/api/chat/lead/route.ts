"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface CaptureLeadRequest {
    name?: string;
    phone?: string;
    email?: string;
    businessName?: string;
    interest?: string;
    conversationId?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as CaptureLeadRequest;
        const { name, phone, email, businessName, interest, conversationId } = body;

        // At least one piece of contact info is required
        if (!name && !phone && !email) {
            return NextResponse.json(
                { error: "At least name, phone, or email is required" },
                { status: 400 }
            );
        }

        // Check for duplicate leads with same phone or email
        if (phone || email) {
            const existingLead = await prisma.chatLead.findFirst({
                where: {
                    OR: [
                        phone ? { phone } : {},
                        email ? { email } : {},
                    ].filter(obj => Object.keys(obj).length > 0)
                }
            });

            if (existingLead) {
                // Update existing lead instead of creating duplicate
                const updatedLead = await prisma.chatLead.update({
                    where: { id: existingLead.id },
                    data: {
                        name: name || existingLead.name,
                        phone: phone || existingLead.phone,
                        email: email || existingLead.email,
                        businessName: businessName || existingLead.businessName,
                        interest: interest || existingLead.interest,
                        conversationId: conversationId || existingLead.conversationId,
                    }
                });

                return NextResponse.json({
                    success: true,
                    leadId: updatedLead.id,
                    updated: true
                });
            }
        }

        // Create new lead
        const lead = await prisma.chatLead.create({
            data: {
                name,
                phone,
                email,
                businessName,
                interest,
                conversationId,
                source: "chatbot",
                status: "new",
            },
        });

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            created: true
        });
    } catch (error) {
        console.error("Lead capture error:", error);
        return NextResponse.json(
            { error: "Failed to capture lead" },
            { status: 500 }
        );
    }
}
