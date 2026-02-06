"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { ContactFormModal } from "@/components/shared/contact-form-modal";
import { ChatBot } from "@/components/shared/chatbot";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { ContactModalProvider, useContactModal } from "@/context/contact-modal-context";
import { AuthProvider } from "@/context/auth-context";

interface ClientLayoutProps {
    children: ReactNode;
}

function LayoutContent({ children }: { children: ReactNode }) {
    const { isOpen, closeModal, openModal } = useContactModal();
    const pathname = usePathname();
    const [announcementVisible, setAnnouncementVisible] = useState(false);

    useEffect(() => {
        // Check if announcement bar is visible
        const dismissed = localStorage.getItem("announcementDismissed");
        setAnnouncementVisible(!dismissed);
    }, []);

    // Skip Navigation/Footer on auth, admin, affiliate dashboard, and account routes
    const isAuthRoute = pathname?.startsWith("/auth") ||
        pathname?.startsWith("/admin") ||
        pathname?.startsWith("/affiliate/dashboard") ||
        pathname?.startsWith("/affiliate/login") ||
        pathname?.startsWith("/account");

    if (isAuthRoute) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <AnnouncementBar onVisibilityChange={setAnnouncementVisible} />
            <Navigation hasAnnouncement={announcementVisible} />
            <main className={`flex-grow ${announcementVisible ? 'pt-28 sm:pt-24' : 'pt-16'}`}>
                {children}
            </main>
            <Footer />
            <ContactFormModal
                open={isOpen}
                onOpenChange={(open) => open ? openModal() : closeModal()}
            />
            <ChatBot />
        </div>
    );
}


export function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <AuthProvider>
            <ContactModalProvider>
                <LayoutContent>{children}</LayoutContent>
            </ContactModalProvider>
        </AuthProvider>
    );
}
