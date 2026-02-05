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

        // Update user to approved affiliate
        await prisma.user.update({
            where: { id },
            data: {
                applicationStatus: "approved",
                role: "affiliate",
            },
        });

        // Send approval email (don't fail if email fails)
        try {
            await resend.emails.send({
                from: "Zenixa <noreply@zenixa.pk>",
                to: user.email,
                subject: "🎉 Your Affiliate Application is Approved!",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0F766E 0%, #14B8A6 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0;">Welcome to the Team! 🎉</h1>
            </div>
            <div style="padding: 40px; background: #f9fafb; border-radius: 0 0 12px 12px;">
              <p style="font-size: 18px; color: #111;">Hi ${user.name || "there"},</p>
              <p style="color: #666;">Great news! Your affiliate application has been <strong style="color: #0F766E;">approved</strong>.</p>
              <p style="color: #666;">Your unique referral code is:</p>
              <div style="background: #0F766E; color: white; padding: 20px; border-radius: 8px; text-align: center; font-size: 24px; font-family: monospace; letter-spacing: 4px; margin: 20px 0;">
                ${user.referralCode}
              </div>
              <p style="color: #666;">Share this code with potential customers. When they sign up and make a purchase using your code, you'll earn 20% commission!</p>
              <p style="color: #666; margin-top: 20px;">Login to your affiliate dashboard: <a href="https://zenixa.pk/affiliate/login" style="color: #0F766E;">zenixa.pk/affiliate/login</a></p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #999; font-size: 14px;">Welcome to the Zenixa family!</p>
            </div>
          </div>
        `,
            });
        } catch (emailError) {
            console.error("Failed to send approval email:", emailError);
            // Continue even if email fails
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Approve error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}
