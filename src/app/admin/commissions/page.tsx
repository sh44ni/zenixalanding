import { prisma } from "@/lib/prisma";
import { CommissionsTable } from "./commissions-table";

async function getCommissions() {
    const commissions = await prisma.commission.findMany({
        orderBy: [
            { status: "asc" }, // pending first
            { createdAt: "desc" },
        ],
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    referralCode: true,
                },
            },
        },
    });

    return commissions;
}

async function getReferrals() {
    const referrals = await prisma.referral.findMany({
        where: {
            status: { in: ["signup", "purchased"] },
        },
        orderBy: { createdAt: "desc" },
        include: {
            referrer: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    referralCode: true,
                },
            },
            referred: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
        },
    });

    return referrals;
}

export default async function CommissionsPage() {
    const [commissions, referrals] = await Promise.all([
        getCommissions(),
        getReferrals(),
    ]);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Commissions</h1>
                <p className="text-gray-500 mt-1">Manage referrals and commission payouts</p>
            </div>

            <CommissionsTable commissions={commissions} referrals={referrals} />
        </div>
    );
}
