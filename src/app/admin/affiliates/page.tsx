import { prisma } from "@/lib/prisma";
import { AffiliatesTable } from "./affiliates-table";

async function getAffiliates() {
    const affiliates = await prisma.user.findMany({
        where: {
            applicationStatus: "approved",
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            referralCode: true,
            walletBalance: true,
            pendingEarnings: true,
            createdAt: true,
            _count: {
                select: {
                    referralsGiven: true,
                },
            },
        },
    });

    return affiliates;
}

export default async function AffiliatesPage() {
    const affiliates = await getAffiliates();

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Affiliates</h1>
                <p className="text-gray-500 mt-1">Manage approved affiliates and their earnings</p>
            </div>

            <AffiliatesTable affiliates={affiliates} />
        </div>
    );
}
