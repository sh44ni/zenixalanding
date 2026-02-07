"use client";

import { useState, useEffect } from "react";
import { UserPlus, Phone, Mail, Building2, MessageSquare, Clock, Search } from "lucide-react";

interface Lead {
    id: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    businessName: string | null;
    interest: string | null;
    conversationId: string | null;
    source: string;
    status: string;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
}

const STATUS_OPTIONS = [
    { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
    { value: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
    { value: "converted", label: "Converted", color: "bg-green-100 text-green-700" },
    { value: "not_interested", label: "Not Interested", color: "bg-gray-100 text-gray-700" },
];

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [editingNotes, setEditingNotes] = useState<string | null>(null);
    const [notesValue, setNotesValue] = useState("");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/admin/leads");
            const data = await res.json();
            setLeads(data.leads || []);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateLead = async (id: string, updates: { status?: string; notes?: string }) => {
        try {
            const res = await fetch("/api/admin/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            });

            if (res.ok) {
                const data = await res.json();
                setLeads(leads.map(l => l.id === id ? data.lead : l));
            }
        } catch (error) {
            console.error("Failed to update lead:", error);
        }
    };

    const handleStatusChange = (id: string, status: string) => {
        updateLead(id, { status });
    };

    const handleSaveNotes = (id: string) => {
        updateLead(id, { notes: notesValue });
        setEditingNotes(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-PK", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getStatusColor = (status: string) => {
        return STATUS_OPTIONS.find(s => s.value === status)?.color || "bg-gray-100 text-gray-700";
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = !searchTerm ||
            lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.businessName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Chat Leads</h1>
                <p className="text-gray-500 mt-1">Manage leads captured from Zchappie conversations</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, phone, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                    <option value="">All Status</option>
                    {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {STATUS_OPTIONS.map(status => (
                    <div key={status.value} className="bg-white rounded-xl p-4 border border-gray-100">
                        <p className="text-2xl font-bold text-gray-900">
                            {leads.filter(l => l.status === status.value).length}
                        </p>
                        <p className="text-sm text-gray-500">{status.label}</p>
                    </div>
                ))}
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No leads yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredLeads.map((lead) => (
                        <div key={lead.id} className="bg-white rounded-xl border border-gray-100 p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                {/* Lead Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <UserPlus className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {lead.name || "Unknown Name"}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {formatDate(lead.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                                        {lead.phone && (
                                            <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-primary">
                                                <Phone className="w-4 h-4" />
                                                {lead.phone}
                                            </a>
                                        )}
                                        {lead.email && (
                                            <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-primary">
                                                <Mail className="w-4 h-4" />
                                                {lead.email}
                                            </a>
                                        )}
                                        {lead.businessName && (
                                            <span className="flex items-center gap-1.5">
                                                <Building2 className="w-4 h-4" />
                                                {lead.businessName}
                                            </span>
                                        )}
                                    </div>

                                    {lead.interest && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            <span className="font-medium">Interest:</span> {lead.interest}
                                        </p>
                                    )}
                                </div>

                                {/* Status & Actions */}
                                <div className="flex flex-col items-start lg:items-end gap-3">
                                    <select
                                        value={lead.status}
                                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(lead.status)} border-0 cursor-pointer`}
                                    >
                                        {STATUS_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>

                                    {lead.conversationId && (
                                        <a
                                            href={`/admin/conversations?id=${lead.conversationId}`}
                                            className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                                        >
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            View Conversation
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                {editingNotes === lead.id ? (
                                    <div className="space-y-2">
                                        <textarea
                                            value={notesValue}
                                            onChange={(e) => setNotesValue(e.target.value)}
                                            placeholder="Add notes about this lead..."
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            rows={3}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSaveNotes(lead.id)}
                                                className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary/90"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingNotes(null)}
                                                className="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-900"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingNotes(lead.id);
                                            setNotesValue(lead.notes || "");
                                        }}
                                        className="text-sm text-gray-500 hover:text-gray-900"
                                    >
                                        {lead.notes ? (
                                            <span><span className="font-medium">Notes:</span> {lead.notes}</span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                Add notes...
                                            </span>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
