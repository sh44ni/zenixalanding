import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "zenixa-secure-jwt-secret-key-2026"
);

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("zenixa_session")?.value;

        if (!token) {
            return NextResponse.json({ user: null });
        }

        // Verify JWT token
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.userId as string;

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });

        if (!user) {
            // Clear invalid session
            const response = NextResponse.json({ user: null });
            response.cookies.delete("zenixa_session");
            return response;
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Auth check error:", error);
        // Clear invalid session on error
        const response = NextResponse.json({ user: null });
        response.cookies.delete("zenixa_session");
        return response;
    }
}
