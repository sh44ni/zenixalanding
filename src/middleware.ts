import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "zenixa-secure-jwt-secret-key-2026"
);

// Admin emails - add your email here
const ADMIN_EMAILS = [
    "officielprojekts@gmail.com",
    "admin@zenixa.pk",
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    const token = request.cookies.get("zenixa_session")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth?redirect=/admin", request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const email = payload.email as string;

        if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
            return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/auth?redirect=/admin", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};
