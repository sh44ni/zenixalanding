import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
    // IP-based rate limiting (in addition to email-based limiting below)
    const rateLimitError = checkRateLimit(req, RATE_LIMITS.otp);
    if (rateLimitError) return rateLimitError;

    try {
        const body = await req.json();
        const { email } = body;

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Rate limiting: max 3 OTPs per email per hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentOtps = await prisma.otp.count({
            where: {
                email: email.toLowerCase(),
                createdAt: { gte: oneHourAgo },
            },
        });

        if (recentOtps >= 3) {
            return NextResponse.json(
                { error: "Too many OTP requests. Please try again later." },
                { status: 429 }
            );
        }

        // Generate OTP
        const code = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { email: email.toLowerCase() },
            });
        }

        // Invalidate any existing unverified OTPs for this email
        await prisma.otp.deleteMany({
            where: {
                email: email.toLowerCase(),
                verified: false,
            },
        });

        // Store OTP in database
        await prisma.otp.create({
            data: {
                code,
                email: email.toLowerCase(),
                expiresAt,
                userId: user.id,
            },
        });

        // Send OTP via email
        const emailResult = await resend.emails.send({
            from: "Zenixa <no-reply@zenixa.pk>",
            to: email,
            subject: "Your Zenixa Login Code",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; padding: 40px 20px; }
            .card { background: white; border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .logo { font-size: 24px; font-weight: 700; color: #0F766E; margin-bottom: 24px; }
            h1 { margin: 0 0 8px; font-size: 20px; color: #1a1a1a; font-weight: 600; }
            p { margin: 0 0 24px; color: #666; font-size: 14px; line-height: 1.5; }
            .code { font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0F766E; background: #E6F5F4; padding: 20px 24px; border-radius: 12px; margin: 24px 0; }
            .expires { font-size: 12px; color: #999; }
            .footer { margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="logo">Zenixa</div>
              <h1>Your Login Code</h1>
              <p>Enter this code to sign in to your account</p>
              <div class="code">${code}</div>
              <p class="expires">This code expires in 10 minutes</p>
              <div class="footer">
                If you didn't request this code, you can safely ignore this email.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
        });

        if (emailResult.error) {
            console.error("Email send error:", emailResult.error);
            return NextResponse.json(
                { error: "Failed to send OTP. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
