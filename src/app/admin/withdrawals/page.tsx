"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface Withdrawal {
    id: string;
    amount: number;
    bankName: string;
    accountNumber: string;
    accountTitle: string;
    status: string;
    createdAt: string;
    processedAt: string | null;
    user: {
        email: string;
        name: string | null;
    };
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
};

export default function AdminWithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            const res = await fetch("/api/admin/withdrawals");
            const data = await res.json();
            setWithdrawals(data.withdrawals || []);
        } catch (error) {
            console.error("Failed to fetch withdrawals:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        setUpdating(id);
        try {
            await fetch(`/api/admin/withdrawals/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchWithdrawals();
        } catch (error) {
            console.error("Failed to update:", error);
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h1>
                <p className="text-gray-600">Process affiliate payout requests</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Affiliate</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Amount</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Bank Details</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Date</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {withdrawals.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No withdrawal requests
                                </td>
                            </tr>
                        ) : (
                            withdrawals.map((w) => (
                                <tr key={w.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{w.user.name || w.user.email}</p>
                                        <p className="text-sm text-gray-500">{w.user.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900">PKR {w.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-900">{w.bankName}</p>
                                        <p className="text-sm text-gray-500">{w.accountNumber}</p>
                                        <p className="text-sm text-gray-500">{w.accountTitle}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[w.status]}`}>
                                            {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(w.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {w.status === "pending" && (
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    size="sm"
                                                    onClick={() => updateStatus(w.id, "completed")}
                                                    disabled={updating === w.id}
                                                >
                                                    {updating === w.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => updateStatus(w.id, "rejected")}
                                                    disabled={updating === w.id}
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
