import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_hJjX1P6T_JvvLpVpV7BXLmqzPRyydhuXz");

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, businessName, package: pkg, message, referralCode } = body;

        if (!name || !email || !phone || !pkg) {
            return NextResponse.json(
                { error: "Name, email, phone, and package are required" },
                { status: 400 }
            );
        }

        // Create order
        const order = await prisma.order.create({
            data: {
                name,
                email: email.toLowerCase(),
                phone,
                businessName,
                package: pkg,
                message,
                referralCode: referralCode?.toUpperCase() || null,
            },
        });

        // If referral code exists, create referral record
        if (referralCode) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: referralCode.toUpperCase() },
            });

            // Check if user exists, if not create them
            let user = await prisma.user.findUnique({
                where: { email: email.toLowerCase() },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email: email.toLowerCase(),
                        name,
                        phone,
                    },
                });
            }

            // Update order with userId
            await prisma.order.update({
                where: { id: order.id },
                data: { userId: user.id },
            });

            // Create referral if referrer exists and no existing referral
            if (referrer) {
                const existingReferral = await prisma.referral.findUnique({
                    where: { referredId: user.id },
                });

                if (!existingReferral) {
                    await prisma.referral.create({
                        data: {
                            referrerId: referrer.id,
                            referredId: user.id,
                            status: "signup",
                        },
                    });
                }
            }
        }

        // Send email notification to admin
        await resend.emails.send({
            from: "Zenixa <no-reply@zenixa.pk>",
            to: "officialprojekts@gmail.com",
            subject: `New Order: ${name} - ${pkg.toUpperCase()}`,
            html: `
                <h2>New Order Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Business:</strong> ${businessName || "Not provided"}</p>
                <p><strong>Package:</strong> ${pkg.toUpperCase()}</p>
                <p><strong>Referral Code:</strong> ${referralCode || "None"}</p>
                <p><strong>Message:</strong> ${message || "No message"}</p>
            `,
        });

        // Send confirmation to user
        await resend.emails.send({
            from: "Zenixa <no-reply@zenixa.pk>",
            to: email,
            subject: "Order Received - Zenixa",
            html: `
                <h2>Thank you for your interest in Zenixa!</h2>
                <p>Hi ${name},</p>
                <p>We've received your order for the <strong>${pkg.toUpperCase()}</strong> package.</p>
                <p>Our team will contact you within 24 hours to discuss your project.</p>
                <p>Best regards,<br>The Zenixa Team</p>
            `,
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Order error:", error);
        return NextResponse.json(
            { error: "Failed to submit order" },
            { status: 500 }
        );
    }
}
