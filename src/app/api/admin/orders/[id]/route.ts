import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });

        // If order is completed and has a referral, update referral status and create commission
        if (status === "completed" && order.referralCode) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: order.referralCode },
            });

            if (referrer && order.userId) {
                // Update referral status
                await prisma.referral.updateMany({
                    where: {
                        referrerId: referrer.id,
                        referredId: order.userId,
                    },
                    data: { status: "completed" },
                });

                // Calculate commission (20% of package price = PKR 9,000)
                const packagePrice = 45000; // Single package price
                const commissionAmount = packagePrice * 0.2; // 20% commission = PKR 9,000

                // Create commission
                await prisma.commission.create({
                    data: {
                        userId: referrer.id,
                        amount: commissionAmount,
                        status: "available",
                        source: `Order: ${order.name} - ${order.package.toUpperCase()}`,
                    },
                });

                // Update referrer's wallet balance
                await prisma.user.update({
                    where: { id: referrer.id },
                    data: {
                        walletBalance: { increment: commissionAmount },
                    },
                });
            }
        } else if (status === "in_progress" && order.referralCode && order.userId) {
            // Update referral to in_progress
            const referrer = await prisma.user.findUnique({
                where: { referralCode: order.referralCode },
            });

            if (referrer) {
                await prisma.referral.updateMany({
                    where: {
                        referrerId: referrer.id,
                        referredId: order.userId,
                    },
                    data: { status: "in_progress" },
                });
            }
        } else if (status === "confirmed" && order.referralCode && order.userId) {
            // Update referral to purchased
            const referrer = await prisma.user.findUnique({
                where: { referralCode: order.referralCode },
            });

            if (referrer) {
                await prisma.referral.updateMany({
                    where: {
                        referrerId: referrer.id,
                        referredId: order.userId,
                    },
                    data: { status: "purchased" },
                });
            }
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Failed to update order:", error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
}
