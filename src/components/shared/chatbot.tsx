"use client";

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import { X, Send, User, MessageSquare, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

// Generate or retrieve session ID
function getSessionId(): string {
    if (typeof window === "undefined") return "";

    let sessionId = localStorage.getItem("zchappie_session_id");
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem("zchappie_session_id", sessionId);
    }
    return sessionId;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isTextMinimized, setIsTextMinimized] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const lastSavedMessageCount = useRef(0);

    // Initialize session ID
    useEffect(() => {
        setSessionId(getSessionId());
    }, []);

    // Save conversation to database
    const saveConversation = useCallback(async (msgs: Message[], status: "active" | "ended" = "active") => {
        if (!sessionId || msgs.length === 0) return;

        try {
            await fetch("/api/chat/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    messages: msgs.map(m => ({
                        ...m,
                        timestamp: m.timestamp || new Date().toISOString()
                    })),
                    status,
                    visitorInfo: {
                        userAgent: navigator.userAgent,
                        pageUrl: window.location.href,
                    }
                }),
            });
            lastSavedMessageCount.current = msgs.length;
        } catch (error) {
            console.error("Failed to save conversation:", error);
        }
    }, [sessionId]);

    // Auto-save conversation every few messages
    useEffect(() => {
        if (messages.length > 0 && messages.length > lastSavedMessageCount.current + 1) {
            saveConversation(messages, "active");
        }
    }, [messages, saveConversation]);

    // Save when chat closes
    const handleClose = useCallback(() => {
        if (messages.length > 0) {
            saveConversation(messages, "ended");
        }
        setIsOpen(false);
    }, [messages, saveConversation]);

    // Delay visibility for smooth entrance
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when chat starts
    useEffect(() => {
        if (chatStarted && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatStarted]);

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(
            "Hi! I'm interested in Zenixa e-commerce platform."
        );
        window.open(`https://wa.me/923040260023?text=${message}`, "_blank");
    };

    const handleChatHereClick = () => {
        setChatStarted(true);
    };

    // Detect and save leads from messages
    const detectAndSaveLead = useCallback(async (messageContent: string, conversationId?: string) => {
        // Phone number patterns (Pakistani and international)
        const phonePatterns = [
            /(?:\+92|0092|92)?[\s-]?3[0-9]{2}[\s-]?[0-9]{7}/g, // Pakistani mobile
            /(?:\+92|0092|92)?[\s-]?[0-9]{2,3}[\s-]?[0-9]{7,8}/g, // Pakistani landline
            /\b0[0-9]{10}\b/g, // 03xx format
            /\b\+?[0-9]{10,14}\b/g // Generic international
        ];

        // Email pattern
        const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

        let phone: string | null = null;
        let email: string | null = null;

        // Try to find phone number
        for (const pattern of phonePatterns) {
            const matches = messageContent.match(pattern);
            if (matches && matches.length > 0) {
                phone = matches[0].replace(/[\s-]/g, '');
                break;
            }
        }

        // Try to find email
        const emailMatches = messageContent.match(emailPattern);
        if (emailMatches && emailMatches.length > 0) {
            email = emailMatches[0];
        }

        // If we found contact info, save the lead
        if (phone || email) {
            try {
                await fetch("/api/chat/lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        phone,
                        email,
                        conversationId,
                        interest: "e-commerce store",
                    }),
                });
                console.log("Lead captured:", { phone, email });
            } catch (error) {
                console.error("Failed to save lead:", error);
            }
        }
    }, []);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input.trim(),
            timestamp: new Date().toISOString()
        };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        // Check for lead info in the user's message
        detectAndSaveLead(userMessage.content, sessionId);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();
            const assistantMessage: Message = {
                role: "assistant",
                content: data.message,
                timestamp: new Date().toISOString()
            };
            const updatedMessages = [...newMessages, assistantMessage];
            setMessages(updatedMessages);

            // Save after each exchange
            saveConversation(updatedMessages, "active");
        } catch {
            const errorMessage: Message = {
                role: "assistant",
                content: "Sorry, I'm having trouble connecting. Please try again or reach out on WhatsApp: +92 304 026 0023",
                timestamp: new Date().toISOString()
            };
            setMessages([...newMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                                <Image
                                    src="/support.png"
                                    alt="Zenixa Support"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Zchappie</h3>
                                <p className="text-xs text-gray-300">
                                    {chatStarted ? "Ask me anything" : "How can we help?"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Area */}
                    {!chatStarted ? (
                        // Option Selection Screen
                        <div className="p-6 bg-gray-50 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 shadow-lg">
                                <Image
                                    src="/support.png"
                                    alt="Zenixa Support"
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                Hi! I&apos;m Zchappie 👋
                            </h4>
                            <p className="text-sm text-gray-500 mb-6 text-center">
                                Choose how you&apos;d like to connect with us
                            </p>

                            <div className="w-full space-y-3">
                                {/* Chat with AI */}
                                <button
                                    onClick={handleChatHereClick}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-sm">Chat with AI</p>
                                        <p className="text-xs text-gray-400">Get instant answers</p>
                                    </div>
                                </button>

                                {/* WhatsApp */}
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#20bd5a] transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-sm">Chat on WhatsApp</p>
                                        <p className="text-xs text-white/70">Talk to our team</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Chat Interface
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px] custom-scrollbar bg-gray-50">
                                {messages.length === 0 && (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 shadow-md">
                                            <Image
                                                src="/support.png"
                                                alt="Zenixa Support"
                                                width={64}
                                                height={64}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            Hi! I&apos;m Zchappie, Zenixa&apos;s AI assistant.
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Ask me about our e-commerce solutions.
                                        </p>
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.role === "assistant" && (
                                            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                                                <Image
                                                    src="/support.png"
                                                    alt="Bot"
                                                    width={28}
                                                    height={28}
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-gray-900 text-white rounded-br-md"
                                                : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                        {msg.role === "user" && (
                                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Loading indicator */}
                                {isLoading && (
                                    <div className="flex gap-2 items-start">
                                        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src="/support.png"
                                                alt="Bot"
                                                width={28}
                                                height={28}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                                            <div className="flex gap-1.5">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t border-gray-100 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Type a message..."
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 disabled:opacity-50 transition-all"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!input.trim() || isLoading}
                                        className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        aria-label="Send message"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Floating Widget with Avatar and Text */}
            {!isOpen && (
                <div
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Text Bubble - Shows on hover (desktop) or always on mobile (unless minimized) */}
                    <div
                        className={`
                            flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg
                            transition-all duration-300 origin-right
                            ${isHovered ? 'scale-100 opacity-100' : 'md:scale-0 md:opacity-0'}
                            ${isTextMinimized ? 'hidden md:flex' : 'flex'}
                        `}
                    >
                        <span className="text-sm font-medium whitespace-nowrap">
                            Chat with Zchappie ✨
                        </span>
                        {/* Mobile minimize button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTextMinimized(true);
                            }}
                            className="md:hidden w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                            aria-label="Minimize text"
                        >
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Avatar Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative group"
                        aria-label="Open chat"
                    >
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/support.png"
                                alt="Chat with us"
                                width={56}
                                height={56}
                                className="object-cover"
                            />
                        </div>
                        {/* Pulse animation */}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                            <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                        </span>
                    </button>
                </div>
            )}

            {/* Close Button when chat is open */}
            {isOpen && (
                <button
                    onClick={handleClose}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-gray-800"
                    aria-label="Close chat"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
            )}
        </>
    );
}
