import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin routes protection
    if (pathname.startsWith("/admin")) {
        // Allow login page without auth
        if (pathname === "/admin/login") {
            return NextResponse.next();
        }

        const adminSession = request.cookies.get("admin-session")?.value;
        if (!adminSession) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Affiliate dashboard protection
    if (pathname.startsWith("/affiliate/dashboard") || pathname.startsWith("/affiliate/withdraw")) {
        const affiliateSession = request.cookies.get("affiliate-session")?.value;
        if (!affiliateSession) {
            return NextResponse.redirect(new URL("/affiliate/login", request.url));
        }
    }

    // User account protection
    if (pathname === "/account") {
        const userSession = request.cookies.get("zenixa_session")?.value;
        if (!userSession) {
            return NextResponse.redirect(new URL("/account/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/affiliate/dashboard/:path*", "/affiliate/withdraw/:path*", "/account"],
};
