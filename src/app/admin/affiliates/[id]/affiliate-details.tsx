"use client";

import { ArrowLeft, Users, Clock, Wallet } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Referral {
    id: string;
    status: string;
    createdAt: Date;
    referred: {
        id: string;
        email: string;
        name: string | null;
        createdAt: Date;
    };
}

interface Commission {
    id: string;
    amount: number;
    status: string;
    source: string;
    createdAt: Date;
}

interface Affiliate {
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    referralCode: string | null;
    walletBalance: number;
    pendingEarnings: number;
    createdAt: Date;
    referralsGiven: Referral[];
    commissions: Commission[];
}

interface AffiliateDetailsProps {
    affiliate: Affiliate;
}

export function AffiliateDetails({ affiliate }: AffiliateDetailsProps) {
    const stats = [
        {
            label: "Total Referrals",
            value: affiliate.referralsGiven.length,
            icon: Users,
            color: "bg-blue-500",
        },
        {
            label: "Pending Earnings",
            value: `PKR ${affiliate.pendingEarnings.toLocaleString()}`,
            icon: Clock,
            color: "bg-yellow-500",
        },
        {
            label: "Wallet Balance",
            value: `PKR ${affiliate.walletBalance.toLocaleString()}`,
            icon: Wallet,
            color: "bg-green-500",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/affiliates"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Affiliates
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">{affiliate.name || affiliate.email}</h1>
                    <p className="text-gray-500">{affiliate.email}</p>
                    <div className="mt-2 flex items-center gap-4">
                        <span className="font-mono bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm">
                            {affiliate.referralCode}
                        </span>
                        {affiliate.phone && (
                            <span className="text-gray-500 text-sm">{affiliate.phone}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Referrals */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Referrals</h2>
                </div>
                {affiliate.referralsGiven.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No referrals yet</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">User</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Signed Up</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {affiliate.referralsGiven.map((referral) => (
                                <tr key={referral.id}>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">
                                            {referral.referred.name || "No name"}
                                        </p>
                                        <p className="text-sm text-gray-500">{referral.referred.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(referral.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-medium",
                                                referral.status === "signup" && "bg-gray-100 text-gray-600",
                                                referral.status === "purchased" && "bg-green-100 text-green-700",
                                                referral.status === "completed" && "bg-blue-100 text-blue-700"
                                            )}
                                        >
                                            {referral.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Commissions */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Commission History</h2>
                </div>
                {affiliate.commissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No commissions yet</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Source</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {affiliate.commissions.map((commission) => (
                                <tr key={commission.id}>
                                    <td className="px-6 py-4 text-gray-900">{commission.source}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        PKR {commission.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(commission.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-medium",
                                                commission.status === "pending" && "bg-yellow-100 text-yellow-700",
                                                commission.status === "clearance" && "bg-blue-100 text-blue-700",
                                                commission.status === "paid" && "bg-green-100 text-green-700"
                                            )}
                                        >
                                            {commission.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
