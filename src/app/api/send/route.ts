import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_hJjX1P6T_JvvLpVpV7BXLmqzPRyydhuXz");

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, businessName, message } = body;

        // 1. Send Admin Notification
        const adminEmail = await resend.emails.send({
            from: "Zenixa Contact <no-reply@zenixa.pk>",
            to: "officialprojekts@gmail.com",
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h1>New Contact Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (adminEmail.error) {
            console.error("Resend Admin Error:", adminEmail.error);
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        // 2. Send User Confirmation
        await resend.emails.send({
            from: "Zenixa Team <no-reply@zenixa.pk>",
            to: email,
            subject: "We received your message!",
            html: `
        <h1>Hi ${name},</h1>
        <p>Thanks for reaching out to Zenixa! We've received your message and our team will get back to you within 24 hours.</p>
        <p>Best regards,<br>The Zenixa Team</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
