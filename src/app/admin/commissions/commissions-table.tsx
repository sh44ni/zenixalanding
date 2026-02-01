"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, DollarSign, Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string | null;
    referralCode: string | null;
}

interface Commission {
    id: string;
    amount: number;
    status: string;
    source: string;
    createdAt: Date;
    user: User;
}

interface Referral {
    id: string;
    status: string;
    createdAt: Date;
    referrer: User;
    referred: {
        id: string;
        email: string;
        name: string | null;
    };
}

interface CommissionsTableProps {
    commissions: Commission[];
    referrals: Referral[];
}

export function CommissionsTable({ commissions: initialCommissions, referrals: initialReferrals }: CommissionsTableProps) {
    const [commissions, setCommissions] = useState(initialCommissions);
    const [referrals, setReferrals] = useState(initialReferrals);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
    const [commissionAmount, setCommissionAmount] = useState("");
    const router = useRouter();

    const handleStatusChange = async (commissionId: string, newStatus: string) => {
        setIsLoading(commissionId);
        try {
            const res = await fetch(`/api/admin/commissions/${commissionId}/status`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setCommissions((prev) =>
                    prev.map((c) =>
                        c.id === commissionId ? { ...c, status: newStatus } : c
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        } finally {
            setIsLoading(null);
        }
    };

    const handleMarkPurchased = async (referralId: string) => {
        setIsLoading(referralId);
        try {
            const res = await fetch(`/api/admin/referrals/${referralId}/purchased`, {
                method: "POST",
            });

            if (res.ok) {
                setReferrals((prev) =>
                    prev.map((r) =>
                        r.id === referralId ? { ...r, status: "purchased" } : r
                    )
                );
            }
        } catch (error) {
            console.error("Failed to mark purchased:", error);
        } finally {
            setIsLoading(null);
        }
    };

    const handleCreateCommission = async () => {
        if (!selectedReferral || !commissionAmount) return;
        setIsLoading("create");

        try {
            const res = await fetch("/api/admin/commissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedReferral.referrer.id,
                    amount: parseFloat(commissionAmount),
                    source: `Referral: ${selectedReferral.referred.email}`,
                    referralId: selectedReferral.id,
                }),
            });

            if (res.ok) {
                router.refresh();
                setShowCreateModal(false);
                setSelectedReferral(null);
                setCommissionAmount("");
            }
        } catch (error) {
            console.error("Failed to create commission:", error);
        } finally {
            setIsLoading(null);
        }
    };

    const signupReferrals = referrals.filter((r) => r.status === "signup");
    const purchasedReferrals = referrals.filter((r) => r.status === "purchased");

    return (
        <div className="space-y-8">
            {/* Referrals Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Referrals</h2>
                {signupReferrals.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center border border-gray-100 text-gray-500">
                        No pending referrals
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Affiliate</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Referred User</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {signupReferrals.map((referral) => (
                                    <tr key={referral.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{referral.referrer.name}</p>
                                            <p className="text-sm text-gray-500">{referral.referrer.referralCode}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{referral.referred.name || "No name"}</p>
                                            <p className="text-sm text-gray-500">{referral.referred.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(referral.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => handleMarkPurchased(referral.id)}
                                                disabled={isLoading === referral.id}
                                            >
                                                {isLoading === referral.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>Mark Purchased</>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Purchased - Ready for Commission */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Ready for Commission</h2>
                </div>
                {purchasedReferrals.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center border border-gray-100 text-gray-500">
                        No purchased referrals ready for commission
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Affiliate</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Referred User</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {purchasedReferrals.map((referral) => (
                                    <tr key={referral.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{referral.referrer.name}</p>
                                            <p className="text-sm text-gray-500">{referral.referrer.referralCode}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{referral.referred.name || "No name"}</p>
                                            <p className="text-sm text-gray-500">{referral.referred.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(referral.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedReferral(referral);
                                                    setShowCreateModal(true);
                                                }}
                                            >
                                                <Plus className="w-4 h-4 mr-1" />
                                                Create Commission
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Commissions Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Commission History</h2>
                {commissions.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center border border-gray-100 text-gray-500">
                        No commissions yet
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Affiliate</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Source</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {commissions.map((commission) => (
                                    <tr key={commission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{commission.user.name}</p>
                                            <p className="text-sm text-gray-500">{commission.user.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{commission.source}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            PKR {commission.amount.toLocaleString()}
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
                                        <td className="px-6 py-4 text-right">
                                            {commission.status !== "paid" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            commission.id,
                                                            commission.status === "pending" ? "clearance" : "paid"
                                                        )
                                                    }
                                                    disabled={isLoading === commission.id}
                                                >
                                                    {isLoading === commission.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            {commission.status === "pending" ? "Move to Clearance" : "Mark Paid"}
                                                            <ArrowRight className="w-4 h-4 ml-1" />
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Commission Modal */}
            {showCreateModal && selectedReferral && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Create Commission</h2>
                                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Affiliate</p>
                                <p className="font-medium">{selectedReferral.referrer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">For Referral</p>
                                <p className="font-medium">{selectedReferral.referred.email}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 block mb-2">Commission Amount (PKR)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="number"
                                        placeholder="5000"
                                        value={commissionAmount}
                                        onChange={(e) => setCommissionAmount(e.target.value)}
                                        className="pl-12"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100">
                            <Button
                                className="w-full"
                                onClick={handleCreateCommission}
                                disabled={!commissionAmount || isLoading === "create"}
                            >
                                {isLoading === "create" ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                ) : (
                                    <Plus className="w-4 h-4 mr-2" />
                                )}
                                Create Commission
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
