"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
    Users,
    DollarSign,
    Clock,
    Wallet,
    Copy,
    CheckCircle2,
    LogOut,
    Loader2,
    TrendingUp,
} from "lucide-react";

interface DashboardData {
    user: {
        id: string;
        email: string;
        name: string | null;
        referralCode: string;
        walletBalance: number;
        pendingEarnings: number;
        bankName: string | null;
        accountNumber: string | null;
        accountTitle: string | null;
    };
    stats: {
        totalReferrals: number;
        completedReferrals: number;
        pendingReferrals: number;
        totalEarnings: number;
        availableBalance: number;
        pendingEarnings: number;
    };
    referrals: Array<{
        id: string;
        email: string;
        name: string | null;
        status: string;
        createdAt: string;
    }>;
    withdrawals: Array<{
        id: string;
        amount: number;
        status: string;
        createdAt: string;
        processedAt: string | null;
    }>;
}

const statusColors: Record<string, string> = {
    signup: "bg-blue-500/20 text-blue-400",
    purchased: "bg-yellow-500/20 text-yellow-400",
    in_progress: "bg-purple-500/20 text-purple-400",
    completed: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    processing: "bg-blue-500/20 text-blue-400",
};

const statusLabels: Record<string, string> = {
    signup: "Signed Up",
    purchased: "Purchased",
    in_progress: "In Progress",
    completed: "Completed",
    pending: "Pending",
    processing: "Processing",
};

export default function AffiliateDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [withdrawForm, setWithdrawForm] = useState({
        amount: "",
        bankName: "",
        accountNumber: "",
        accountTitle: "",
    });
    const [withdrawing, setWithdrawing] = useState(false);
    const [withdrawError, setWithdrawError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await fetch("/api/affiliate/dashboard");
            if (!res.ok) {
                window.location.href = "/affiliate/login";
                return;
            }
            const dashboardData = await res.json();
            setData(dashboardData);
            // Pre-fill bank details if available
            if (dashboardData.user.bankName) {
                setWithdrawForm(prev => ({
                    ...prev,
                    bankName: dashboardData.user.bankName || "",
                    accountNumber: dashboardData.user.accountNumber || "",
                    accountTitle: dashboardData.user.accountTitle || "",
                }));
            }
        } catch (error) {
            console.error("Failed to load dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyReferralLink = () => {
        if (data?.user.referralCode) {
            navigator.clipboard.writeText(`https://zenixa.pk/?ref=${data.user.referralCode}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setWithdrawError("");
        setWithdrawing(true);

        try {
            const res = await fetch("/api/affiliate/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: parseFloat(withdrawForm.amount),
                    bankName: withdrawForm.bankName,
                    accountNumber: withdrawForm.accountNumber,
                    accountTitle: withdrawForm.accountTitle,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Withdrawal failed");
            }

            setShowWithdraw(false);
            fetchDashboard(); // Refresh data
        } catch (error) {
            setWithdrawError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setWithdrawing(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/affiliate/auth/logout", { method: "POST" });
        window.location.href = "/affiliate/login";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-gray-400">Failed to load dashboard</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800/50 border-b border-gray-700">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <span>Affiliate Portal</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm hidden sm:block">{data.user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Referral Link Card */}
                <div className="bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl p-6 mb-8 border border-primary/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Your Referral Link</h2>
                            <p className="text-gray-400 text-sm">Share this link to earn commissions</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-gray-800 px-4 py-2 rounded-lg text-primary font-mono text-sm">
                                zenixa.pk/?ref={data.user.referralCode}
                            </code>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={copyReferralLink}
                                className="shrink-0"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{data.stats.totalReferrals}</p>
                        <p className="text-gray-400 text-sm">Total Referrals</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">PKR {data.stats.totalEarnings.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Total Earnings</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-primary" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">PKR {data.stats.availableBalance.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Available Balance</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-400" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">PKR {data.stats.pendingEarnings.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Pending Earnings</p>
                    </div>
                </div>

                {/* Withdraw Button */}
                {data.stats.availableBalance >= 1000 && (
                    <div className="mb-8">
                        <Button
                            onClick={() => setShowWithdraw(true)}
                            className="w-full sm:w-auto"
                            size="lg"
                        >
                            <DollarSign className="w-5 h-5 mr-2" />
                            Request Withdrawal
                        </Button>
                    </div>
                )}

                {/* Withdrawal Modal */}
                {showWithdraw && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
                            <h2 className="text-xl font-bold text-white mb-4">Request Withdrawal</h2>
                            <form onSubmit={handleWithdraw} className="space-y-4">
                                {withdrawError && (
                                    <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                                        {withdrawError}
                                    </div>
                                )}
                                <div>
                                    <Label className="text-gray-300">Amount (PKR)</Label>
                                    <Input
                                        type="number"
                                        placeholder="Min. 1,000"
                                        value={withdrawForm.amount}
                                        onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white mt-1"
                                        min={1000}
                                        max={data.stats.availableBalance}
                                        required
                                    />
                                    <p className="text-gray-500 text-xs mt-1">
                                        Available: PKR {data.stats.availableBalance.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-gray-300">Bank Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g., HBL, Meezan, JazzCash"
                                        value={withdrawForm.bankName}
                                        onChange={(e) => setWithdrawForm({ ...withdrawForm, bankName: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-300">Account Number / IBAN</Label>
                                    <Input
                                        type="text"
                                        placeholder="Your bank account number"
                                        value={withdrawForm.accountNumber}
                                        onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-300">Account Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="Name on the account"
                                        value={withdrawForm.accountTitle}
                                        onChange={(e) => setWithdrawForm({ ...withdrawForm, accountTitle: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white mt-1"
                                        required
                                    />
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Withdrawals are processed within 24 hours to your bank account.
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setShowWithdraw(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={withdrawing}
                                        className="flex-1"
                                    >
                                        {withdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Referrals Table */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-700">
                            <h2 className="text-lg font-semibold text-white">Your Referrals</h2>
                        </div>
                        {data.referrals.length === 0 ? (
                            <div className="p-8 text-center">
                                <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400">No referrals yet</p>
                                <p className="text-gray-500 text-sm mt-1">Share your link to get started</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-700">
                                {data.referrals.map((referral) => (
                                    <div key={referral.id} className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-medium">{referral.email}</p>
                                            <p className="text-gray-500 text-sm">
                                                {new Date(referral.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[referral.status] || "bg-gray-500/20 text-gray-400"}`}>
                                            {statusLabels[referral.status] || referral.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Withdrawals */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-700">
                            <h2 className="text-lg font-semibold text-white">Recent Withdrawals</h2>
                        </div>
                        {data.withdrawals.length === 0 ? (
                            <div className="p-8 text-center">
                                <Wallet className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400">No withdrawals yet</p>
                                <p className="text-gray-500 text-sm mt-1">Request a withdrawal when you have PKR 1,000+</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-700">
                                {data.withdrawals.map((withdrawal) => (
                                    <div key={withdrawal.id} className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-medium">PKR {withdrawal.amount.toLocaleString()}</p>
                                            <p className="text-gray-500 text-sm">
                                                {new Date(withdrawal.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[withdrawal.status] || "bg-gray-500/20 text-gray-400"}`}>
                                            {statusLabels[withdrawal.status] || withdrawal.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
