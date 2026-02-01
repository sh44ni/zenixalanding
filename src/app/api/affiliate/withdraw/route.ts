import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "zenixa-secure-jwt-secret-key-2026"
);

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("affiliate-session")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.userId as string;

        const { amount, bankName, accountNumber, accountTitle } = await req.json();

        if (!amount || !bankName || !accountNumber || !accountTitle) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (amount > user.walletBalance) {
            return NextResponse.json(
                { error: "Insufficient balance" },
                { status: 400 }
            );
        }

        if (amount < 1000) {
            return NextResponse.json(
                { error: "Minimum withdrawal is PKR 1,000" },
                { status: 400 }
            );
        }

        // Create withdrawal request
        const withdrawal = await prisma.withdrawalRequest.create({
            data: {
                userId,
                amount,
                bankName,
                accountNumber,
                accountTitle,
            },
        });

        // Deduct from wallet balance
        await prisma.user.update({
            where: { id: userId },
            data: {
                walletBalance: { decrement: amount },
                // Save bank details for future use
                bankName,
                accountNumber,
                accountTitle,
            },
        });

        return NextResponse.json({
            success: true,
            withdrawal: {
                id: withdrawal.id,
                amount: withdrawal.amount,
                status: withdrawal.status,
            },
        });
    } catch (error) {
        console.error("Withdrawal error:", error);
        return NextResponse.json(
            { error: "Withdrawal request failed" },
            { status: 500 }
        );
    }
}
