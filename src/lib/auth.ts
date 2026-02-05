import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { NextResponse } from "next/server";

// JWT Secret - MUST be set in production
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
    console.warn("⚠️ JWT_SECRET not set - authentication will fail in production");
}

export interface AdminSession {
    email: string;
    iat: number;
}

export interface AffiliateSession {
    userId: string;
    email: string;
    role: string;
}

export interface UserSession {
    userId: string;
    email: string;
}

/**
 * Create a signed JWT token for admin sessions
 */
export async function createAdminToken(email: string): Promise<string> {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not configured");
    }

    return new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

/**
 * Verify admin session from cookie
 * Returns null if not authenticated, throws on invalid token
 */
export async function verifyAdminSession(): Promise<AdminSession | null> {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not configured");
        return null;
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin-session")?.value;

        if (!token) {
            return null;
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as AdminSession;
    } catch (error) {
        console.error("Admin session verification failed:", error);
        return null;
    }
}

/**
 * Verify affiliate session from cookie
 */
export async function verifyAffiliateSession(): Promise<AffiliateSession | null> {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not configured");
        return null;
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("affiliate-session")?.value;

        if (!token) {
            return null;
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as AffiliateSession;
    } catch (error) {
        console.error("Affiliate session verification failed:", error);
        return null;
    }
}

/**
 * Verify user session from cookie
 */
export async function verifyUserSession(): Promise<UserSession | null> {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not configured");
        return null;
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("zenixa_session")?.value;

        if (!token) {
            return null;
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as UserSession;
    } catch (error) {
        console.error("User session verification failed:", error);
        return null;
    }
}

/**
 * Helper to return 401 Unauthorized response
 */
export function unauthorizedResponse(message = "Unauthorized") {
    return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * Require admin authentication - returns error response if not authenticated
 */
export async function requireAdmin(): Promise<NextResponse | null> {
    const session = await verifyAdminSession();
    if (!session) {
        return unauthorizedResponse("Admin authentication required");
    }
    return null; // null means authenticated
}
