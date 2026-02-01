import { prisma } from "@/lib/prisma";
import { ClipboardList, Users, DollarSign, TrendingUp } from "lucide-react";

async function getStats() {
    const [
        totalAffiliates,
        pendingApplications,
        totalReferrals,
        pendingCommissions,
        totalEarnings,
    ] = await Promise.all([
        prisma.user.count({ where: { applicationStatus: "approved" } }),
        prisma.user.count({ where: { applicationStatus: "pending" } }),
        prisma.referral.count(),
        prisma.commission.count({ where: { status: "pending" } }),
        prisma.commission.aggregate({ _sum: { amount: true }, where: { status: "paid" } }),
    ]);

    return {
        totalAffiliates,
        pendingApplications,
        totalReferrals,
        pendingCommissions,
        totalEarnings: totalEarnings._sum.amount || 0,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const cards = [
        {
            label: "Pending Applications",
            value: stats.pendingApplications,
            icon: ClipboardList,
            color: "bg-yellow-500",
            href: "/admin/applications",
        },
        {
            label: "Active Affiliates",
            value: stats.totalAffiliates,
            icon: Users,
            color: "bg-blue-500",
            href: "/admin/affiliates",
        },
        {
            label: "Total Referrals",
            value: stats.totalReferrals,
            icon: TrendingUp,
            color: "bg-green-500",
        },
        {
            label: "Pending Commissions",
            value: stats.pendingCommissions,
            icon: DollarSign,
            color: "bg-purple-500",
            href: "/admin/commissions",
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Affiliate program overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                            </div>
                            <div className={`${card.color} p-3 rounded-lg`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Earnings Card */}
            <div className="bg-gradient-to-r from-primary to-teal-600 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-teal-100 mb-2">Total Paid Commissions</p>
                        <p className="text-4xl font-bold">PKR {stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-16 h-16 text-teal-200/50" />
                </div>
            </div>
        </div>
    );
}
