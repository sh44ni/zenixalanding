"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Check } from "lucide-react";
import Link from "next/link";

interface Affiliate {
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    referralCode: string | null;
    walletBalance: number;
    pendingEarnings: number;
    createdAt: Date;
    _count: {
        referralsGiven: number;
    };
}

interface AffiliatesTableProps {
    affiliates: Affiliate[];
}

export function AffiliatesTable({ affiliates }: AffiliatesTableProps) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    if (affiliates.length === 0) {
        return (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <p className="text-gray-500">No approved affiliates yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Affiliate</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Code</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Referrals</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Pending</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Wallet</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {affiliates.map((affiliate) => (
                        <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900">{affiliate.name || "No name"}</p>
                                <p className="text-sm text-gray-500">{affiliate.email}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                        {affiliate.referralCode}
                                    </span>
                                    <button
                                        onClick={() => copyCode(affiliate.referralCode || "")}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {copiedCode === affiliate.referralCode ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-gray-900 font-medium">{affiliate._count.referralsGiven}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-yellow-600 font-medium">
                                    PKR {affiliate.pendingEarnings.toLocaleString()}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-green-600 font-medium">
                                    PKR {affiliate.walletBalance.toLocaleString()}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={`/admin/affiliates/${affiliate.id}`}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        Details
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
