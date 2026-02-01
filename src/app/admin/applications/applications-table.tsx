"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Application {
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    applicationStatus: string | null;
    applicationDate: Date | null;
    applicationData: unknown;
    referralCode: string | null;
}

interface ApplicationsTableProps {
    applications: Application[];
}

export function ApplicationsTable({ applications: initialApplications }: ApplicationsTableProps) {
    const [applications, setApplications] = useState(initialApplications);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const handleAction = async (id: string, action: "approve" | "reject") => {
        setIsLoading(id);
        try {
            const res = await fetch(`/api/admin/applications/${id}/${action}`, {
                method: "POST",
            });

            const data = await res.json();

            if (res.ok) {
                if (action === "approve") {
                    setApplications((apps) => apps.filter((a) => a.id !== id));
                    alert("Application approved! Affiliate has been notified.");
                } else {
                    setApplications((apps) =>
                        apps.map((a) =>
                            a.id === id ? { ...a, applicationStatus: "rejected" } : a
                        )
                    );
                    alert("Application rejected.");
                }
                setSelectedApp(null);
            } else {
                alert(`Error: ${data.error || "Action failed"}`);
            }
        } catch (error) {
            console.error("Action failed:", error);
            alert("Network error. Please try again.");
        } finally {
            setIsLoading(null);
        }
    };

    const pendingCount = applications.filter((a) => a.applicationStatus === "pending").length;

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="flex gap-4">
                <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {pendingCount} Pending
                </div>
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {applications.length - pendingCount} Rejected
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                    <p className="text-gray-500">No applications to review</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Applicant</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Contact</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{app.name || "No name"}</p>
                                        <p className="text-sm text-gray-500">{app.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{app.phone || "-"}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {app.applicationDate
                                            ? new Date(app.applicationDate).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-medium",
                                                app.applicationStatus === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            )}
                                        >
                                            {app.applicationStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setSelectedApp(app)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {app.applicationStatus === "pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-green-600 border-green-200 hover:bg-green-50"
                                                        onClick={() => handleAction(app.id, "approve")}
                                                        disabled={isLoading === app.id}
                                                    >
                                                        {isLoading === app.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Check className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                                        onClick={() => handleAction(app.id, "reject")}
                                                        disabled={isLoading === app.id}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                                <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{selectedApp.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{selectedApp.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{selectedApp.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Referral Code</p>
                                <p className="font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                                    {selectedApp.referralCode}
                                </p>
                            </div>
                            {selectedApp.applicationData && typeof selectedApp.applicationData === "object" ? (
                                <>
                                    <hr />
                                    {Object.entries(selectedApp.applicationData as Record<string, string>).map(([key, value]) => (
                                        <div key={key}>
                                            <p className="text-sm text-gray-500 capitalize">
                                                {key.replace(/([A-Z])/g, " $1").trim()}
                                            </p>
                                            <p className="font-medium whitespace-pre-wrap">{String(value)}</p>
                                        </div>
                                    ))}
                                </>
                            ) : null}
                        </div>
                        {selectedApp.applicationStatus === "pending" && (
                            <div className="p-6 border-t border-gray-100 flex gap-3">
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAction(selectedApp.id, "approve")}
                                    disabled={isLoading === selectedApp.id}
                                >
                                    {isLoading === selectedApp.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                        <Check className="w-4 h-4 mr-2" />
                                    )}
                                    Approve
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleAction(selectedApp.id, "reject")}
                                    disabled={isLoading === selectedApp.id}
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Reject
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
