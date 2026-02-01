import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_hJjX1P6T_JvvLpVpV7BXLmqzPRyydhuXz");

// Generate a 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user exists and is an approved affiliate
        let user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            // Create user for affiliate signup
            user = await prisma.user.create({
                data: {
                    email: normalizedEmail,
                    role: "affiliate",
                    applicationStatus: "pending",
                },
            });
        }

        // Generate OTP
        const code = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Invalidate any existing unverified OTPs
        await prisma.otp.deleteMany({
            where: {
                email: normalizedEmail,
                verified: false,
            },
        });

        // Store OTP
        await prisma.otp.create({
            data: {
                code,
                email: normalizedEmail,
                expiresAt,
                userId: user.id,
            },
        });

        // Send OTP via email
        await resend.emails.send({
            from: "Zenixa <no-reply@zenixa.pk>",
            to: normalizedEmail,
            subject: "Your Affiliate Portal Login Code",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #111827; }
                        .container { max-width: 400px; margin: 0 auto; padding: 40px 20px; }
                        .card { background: #1f2937; border-radius: 16px; padding: 32px; text-align: center; }
                        .logo { font-size: 24px; font-weight: 700; color: #0F766E; margin-bottom: 24px; }
                        h1 { margin: 0 0 8px; font-size: 20px; color: #fff; font-weight: 600; }
                        p { margin: 0 0 24px; color: #9ca3af; font-size: 14px; line-height: 1.5; }
                        .code { font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0F766E; background: #0F766E20; padding: 20px 24px; border-radius: 12px; margin: 24px 0; }
                        .expires { font-size: 12px; color: #6b7280; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="card">
                            <div class="logo">Zenixa Affiliate</div>
                            <h1>Your Login Code</h1>
                            <p>Enter this code to access your affiliate dashboard</p>
                            <div class="code">${code}</div>
                            <p class="expires">This code expires in 10 minutes</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Affiliate send OTP error:", error);
        return NextResponse.json(
            { error: "Failed to send verification code" },
            { status: 500 }
        );
    }
}
