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
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.userId as string;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Get user's orders
        const orders = await prisma.order.findMany({
            where: { email: user.email },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                referralCode: user.referralCode,
            },
            orders: orders.map(o => ({
                id: o.id,
                package: o.package,
                status: o.status,
                createdAt: o.createdAt,
                businessName: o.businessName,
            })),
        });
    } catch (error) {
        console.error("Account error:", error);
        return NextResponse.json(
            { error: "Failed to load account" },
            { status: 500 }
        );
    }
}
