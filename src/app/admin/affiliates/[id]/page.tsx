import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AffiliateDetails } from "./affiliate-details";

async function getAffiliate(id: string) {
    const affiliate = await prisma.user.findUnique({
        where: { id },
        include: {
            referralsGiven: {
                include: {
                    referred: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            createdAt: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
            commissions: {
                orderBy: { createdAt: "desc" },
                take: 20,
            },
        },
    });

    return affiliate;
}

export default async function AffiliateDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const affiliate = await getAffiliate(id);

    if (!affiliate) {
        notFound();
    }

    return (
        <div className="p-8">
            <AffiliateDetails affiliate={affiliate} />
        </div>
    );
}
