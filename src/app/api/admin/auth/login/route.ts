import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminToken } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    // Rate limit login attempts
    const rateLimitError = checkRateLimit(req, RATE_LIMITS.adminLogin);
    if (rateLimitError) return rateLimitError;

    try {
        const { email, password } = await req.json();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error("Admin credentials not configured in environment");
            return NextResponse.json(
                { error: "Admin credentials not configured" },
                { status: 500 }
            );
        }

        if (email !== adminEmail || password !== adminPassword) {
            // Add small delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 500));
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create signed JWT session token
        const sessionToken = await createAdminToken(email);

        // Set admin session cookie
        const cookieStore = await cookies();
        cookieStore.set("admin-session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
