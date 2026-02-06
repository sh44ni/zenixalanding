"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AnnouncementBarProps {
    onVisibilityChange?: (visible: boolean) => void;
}

export function AnnouncementBar({ onVisibilityChange }: AnnouncementBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user has dismissed the bar before
        const dismissed = localStorage.getItem("announcementDismissed");
        const visible = !dismissed;
        setIsVisible(visible);
        onVisibilityChange?.(visible);
    }, [onVisibilityChange]);

    const handleDismiss = () => {
        setIsDismissed(true);
        localStorage.setItem("announcementDismissed", "true");
        onVisibilityChange?.(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-4 z-[60] transition-all duration-300 ${isDismissed ? "opacity-0 -translate-y-full" : "opacity-100"
                }`}
        >
            <div className="container-custom flex items-center justify-center gap-2 text-sm">
                <span className="hidden sm:inline">🚀</span>
                <span className="text-center">
                    <span className="hidden sm:inline">Get your online store live in 72 hours — No monthly fees, ever.</span>
                    <span className="sm:hidden">72 hours • No monthly fees</span>
                </span>
                <Link
                    href="https://wa.me/923040260023"
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-accent-300 hover:text-accent-200 transition-colors ml-1"
                >
                    WhatsApp Us
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                    onClick={handleDismiss}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="Dismiss announcement"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
