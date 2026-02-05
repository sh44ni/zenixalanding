import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

// In-memory store for rate limiting (works on Vercel serverless)
// Note: This resets on cold starts, which is acceptable for basic protection
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetAt < now) {
            rateLimitStore.delete(key);
        }
    }
}, 60000); // Clean every minute

export interface RateLimitConfig {
    /** Maximum number of requests allowed in the window */
    maxRequests: number;
    /** Time window in seconds */
    windowSeconds: number;
    /** Optional: Use a custom key instead of IP */
    keyPrefix?: string;
}

/**
 * Get client IP from request
 */
function getClientIP(req: NextRequest): string {
    // Check various headers in order of preference
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    const realIP = req.headers.get("x-real-ip");
    if (realIP) {
        return realIP;
    }

    // Vercel-specific header
    const vercelIP = req.headers.get("x-vercel-forwarded-for");
    if (vercelIP) {
        return vercelIP.split(",")[0].trim();
    }

    // Fallback - use the connection IP or a default
    return "unknown";
}

/**
 * Check rate limit for a request
 * Returns null if within limit, or a 429 response if exceeded
 */
export function checkRateLimit(
    req: NextRequest,
    config: RateLimitConfig
): NextResponse | null {
    const ip = getClientIP(req);
    const key = config.keyPrefix
        ? `${config.keyPrefix}:${ip}`
        : `default:${ip}`;

    const now = Date.now();
    const windowMs = config.windowSeconds * 1000;

    let entry = rateLimitStore.get(key);

    // If no entry or expired, create new one
    if (!entry || entry.resetAt < now) {
        entry = {
            count: 1,
            resetAt: now + windowMs,
        };
        rateLimitStore.set(key, entry);
        return null; // Within limit
    }

    // Increment count
    entry.count++;

    // Check if exceeded
    if (entry.count > config.maxRequests) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return NextResponse.json(
            {
                error: "Too many requests. Please try again later.",
                retryAfter,
            },
            {
                status: 429,
                headers: {
                    "Retry-After": retryAfter.toString(),
                    "X-RateLimit-Limit": config.maxRequests.toString(),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": Math.ceil(entry.resetAt / 1000).toString(),
                },
            }
        );
    }

    return null; // Within limit
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
    // Chat API - generous but protected
    chat: {
        maxRequests: 20,
        windowSeconds: 60, // 20 per minute
        keyPrefix: "chat",
    },

    // Order submission - strict
    order: {
        maxRequests: 5,
        windowSeconds: 3600, // 5 per hour
        keyPrefix: "order",
    },

    // Contact form - strict
    contact: {
        maxRequests: 3,
        windowSeconds: 3600, // 3 per hour
        keyPrefix: "contact",
    },

    // OTP sending - very strict
    otp: {
        maxRequests: 5,
        windowSeconds: 900, // 5 per 15 minutes
        keyPrefix: "otp",
    },

    // Admin login - very strict to prevent brute force
    adminLogin: {
        maxRequests: 5,
        windowSeconds: 900, // 5 per 15 minutes
        keyPrefix: "admin-login",
    },

    // Affiliate apply - moderate
    affiliateApply: {
        maxRequests: 3,
        windowSeconds: 3600, // 3 per hour
        keyPrefix: "affiliate-apply",
    },
} as const;
