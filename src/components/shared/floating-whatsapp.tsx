"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingWhatsApp() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        const message = encodeURIComponent(
            "Hi! I'm interested in Zenixa e-commerce platform."
        );
        window.open(`https://wa.me/923040260023?text=${message}`, "_blank");
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-500"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6 fill-current" />
        </button>
    );
}
