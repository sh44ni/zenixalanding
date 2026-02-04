"use client";
// force-sync v2

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Search,
    Eye,
    Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Order {
    id: string;
    name: string;
    email: string;
    phone: string;
    businessName: string | null;
    package: string;
    message: string | null;
    status: string;
    referralCode: string | null;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    inquiry: "bg-blue-100 text-blue-700",
    confirmed: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
    inquiry: "Inquiry",
    confirmed: "Confirmed",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/admin/orders");
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, status: string) => {
        setUpdating(true);
        try {
            await fetch(`/api/admin/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error("Failed to update order:", error);
        } finally {
            setUpdating(false);
        }
    };

    const filteredOrders = orders.filter(
        (o) =>
            o.name.toLowerCase().includes(search.toLowerCase()) ||
            o.email.toLowerCase().includes(search.toLowerCase()) ||
            o.phone.includes(search)
    );

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-600">Manage customer orders and inquiries</p>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search by name, email, or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Customer</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Package</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Referral</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Date</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{order.name}</p>
                                        <p className="text-sm text-gray-500">{order.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900 uppercase">{order.package}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.referralCode ? (
                                            <code className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                                                {order.referralCode}
                                            </code>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                            {statusLabels[order.status] || order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Order Details</h2>

                        <div className="space-y-4 mb-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{selectedOrder.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{selectedOrder.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Package</p>
                                    <p className="font-medium uppercase">{selectedOrder.package}</p>
                                </div>
                            </div>
                            {selectedOrder.businessName && (
                                <div>
                                    <p className="text-sm text-gray-500">Business Name</p>
                                    <p className="font-medium">{selectedOrder.businessName}</p>
                                </div>
                            )}
                            {selectedOrder.message && (
                                <div>
                                    <p className="text-sm text-gray-500">Message</p>
                                    <p className="font-medium">{selectedOrder.message}</p>
                                </div>
                            )}
                            {selectedOrder.referralCode && (
                                <div>
                                    <p className="text-sm text-gray-500">Referral Code</p>
                                    <code className="px-2 py-1 bg-primary/10 text-primary rounded">
                                        {selectedOrder.referralCode}
                                    </code>
                                </div>
                            )}
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-500 mb-3">Update Status</p>
                            <div className="flex flex-wrap gap-2">
                                {["inquiry", "confirmed", "in_progress", "completed", "cancelled"].map((status) => (
                                    <Button
                                        key={status}
                                        variant={selectedOrder.status === status ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => updateStatus(selectedOrder.id, status)}
                                        disabled={updating}
                                    >
                                        {statusLabels[status]}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
