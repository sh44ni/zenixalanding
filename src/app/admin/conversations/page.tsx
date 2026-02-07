"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Clock, User, ChevronDown, ChevronUp, Search } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

interface Conversation {
    id: string;
    sessionId: string;
    messages: Message[];
    visitorInfo: {
        userAgent?: string;
        pageUrl?: string;
    } | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function ConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const res = await fetch("/api/admin/conversations");
            const data = await res.json();
            setConversations(data.conversations || []);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-PK", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getMessagePreview = (messages: Message[]) => {
        const firstUserMessage = messages.find(m => m.role === "user");
        return firstUserMessage?.content.slice(0, 100) || "No messages";
    };

    const filteredConversations = conversations.filter(conv => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return conv.messages.some(m =>
            m.content.toLowerCase().includes(search)
        );
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
                <h1 className="text-3xl font-bold text-gray-900">Chat Conversations</h1>
                <p className="text-gray-500 mt-1">View all customer conversations with Zchappie</p>
            </div>

            {/* Search */}
            <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
                            <p className="text-sm text-gray-500">Total Conversations</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {new Set(conversations.map(c => c.sessionId)).size}
                            </p>
                            <p className="text-sm text-gray-500">Unique Visitors</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {conversations.filter(c => c.status === "active").length}
                            </p>
                            <p className="text-sm text-gray-500">Active Chats</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conversations List */}
            {filteredConversations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No conversations yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredConversations.map((conv) => (
                        <div key={conv.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setExpandedId(expandedId === conv.id ? null : conv.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 line-clamp-1">
                                            {getMessagePreview(conv.messages)}...
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-gray-400">
                                                {formatDate(conv.createdAt)}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${conv.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}>
                                                {conv.status}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {conv.messages.length} messages
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {expandedId === conv.id ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {/* Expanded Messages */}
                            {expandedId === conv.id && (
                                <div className="border-t border-gray-100 p-4 bg-gray-50">
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {conv.messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${msg.role === "user"
                                                            ? "bg-gray-900 text-white"
                                                            : "bg-white text-gray-800 border border-gray-200"
                                                        }`}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {conv.visitorInfo && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-xs text-gray-400">
                                                Visitor: {conv.visitorInfo.userAgent?.slice(0, 50)}...
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
