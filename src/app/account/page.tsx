"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Package,
    Clock,
    CheckCircle2,
    Loader2,
    LogOut,
    ArrowRight,
    User,
} from "lucide-react";

interface Order {
    id: string;
    package: string;
    status: string;
    createdAt: string;
    businessName: string | null;
}

interface AccountData {
    user: {
        id: string;
        email: string;
        name: string | null;
        referralCode: string | null;
    };
    orders: Order[];
}

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
    inquiry: { color: "bg-blue-100 text-blue-700", icon: Clock, label: "Inquiry Received" },
    confirmed: { color: "bg-yellow-100 text-yellow-700", icon: CheckCircle2, label: "Confirmed" },
    in_progress: { color: "bg-purple-100 text-purple-700", icon: Package, label: "In Progress" },
    completed: { color: "bg-green-100 text-green-700", icon: CheckCircle2, label: "Completed" },
    cancelled: { color: "bg-red-100 text-red-700", icon: Clock, label: "Cancelled" },
};

export default function AccountPage() {
    const [data, setData] = useState<AccountData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAccount();
    }, []);

    const fetchAccount = async () => {
        try {
            const res = await fetch("/api/account");
            if (!res.ok) {
                window.location.href = "/account/login";
                return;
            }
            const accountData = await res.json();
            setData(accountData);
        } catch (error) {
            console.error("Failed to load account:", error);
            window.location.href = "/account/login";
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <span>Zenixa</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 text-sm hidden sm:block">{data.user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Welcome */}
                <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Welcome{data.user.name ? `, ${data.user.name}` : "!"}
                            </h1>
                            <p className="text-gray-600">
                                {data.orders.length > 0
                                    ? "Track your order status below"
                                    : "Ready to launch your e-commerce store?"
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Your Orders</h2>
                    </div>

                    {data.orders.length === 0 ? (
                        <div className="p-12 text-center">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to get started?</h3>
                            <p className="text-gray-600 mb-6">Launch your own e-commerce store with Zenixa</p>
                            <Button asChild>
                                <Link href="/order">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {data.orders.map((order) => {
                                const status = statusConfig[order.status] || statusConfig.inquiry;
                                const StatusIcon = status.icon;
                                return (
                                    <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900 uppercase">
                                                    {order.package} Package
                                                </h3>
                                            </div>
                                            {order.businessName && (
                                                <p className="text-gray-600 text-sm">{order.businessName}</p>
                                            )}
                                            <p className="text-gray-500 text-sm">
                                                Ordered on {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.color}`}>
                                            <StatusIcon className="w-4 h-4" />
                                            <span className="font-medium text-sm">{status.label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Status Legend */}
                <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Status Guide</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="font-medium text-gray-900">Inquiry Received</p>
                                <p className="text-sm text-gray-500">We've received your order request</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div>
                                <p className="font-medium text-gray-900">Confirmed</p>
                                <p className="text-sm text-gray-500">Your order is confirmed & paid</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <div>
                                <p className="font-medium text-gray-900">In Progress</p>
                                <p className="text-sm text-gray-500">We're building your store</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div>
                                <p className="font-medium text-gray-900">Completed</p>
                                <p className="text-sm text-gray-500">Your store is live!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
