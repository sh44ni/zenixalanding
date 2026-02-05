import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { requireAdmin } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    // Verify admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { id } = await context.params;

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user || user.applicationStatus !== "pending") {
            return NextResponse.json(
                { error: "Application not found or already processed" },
                { status: 404 }
            );
        }

        // Update user to rejected
        await prisma.user.update({
            where: { id },
            data: {
                applicationStatus: "rejected",
            },
        });

        // Send rejection email (don't fail if email fails)
        try {
            await resend.emails.send({
                from: "Zenixa <noreply@zenixa.pk>",
                to: user.email,
                subject: "Update on Your Affiliate Application",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #374151; padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0;">Application Update</h1>
            </div>
            <div style="padding: 40px; background: #f9fafb; border-radius: 0 0 12px 12px;">
              <p style="font-size: 18px; color: #111;">Hi ${user.name || "there"},</p>
              <p style="color: #666;">Thank you for your interest in becoming a Zenixa affiliate.</p>
              <p style="color: #666;">After careful review, we regret to inform you that we're unable to approve your application at this time.</p>
              <p style="color: #666;">This could be due to various factors, and we encourage you to apply again in the future with more details about your promotional plans.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #999; font-size: 14px;">If you have any questions, feel free to reach out to us.</p>
            </div>
          </div>
        `,
            });
        } catch (emailError) {
            console.error("Failed to send rejection email:", emailError);
            // Continue even if email fails
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Reject error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}
