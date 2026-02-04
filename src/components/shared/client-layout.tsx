"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { ContactFormModal } from "@/components/shared/contact-form-modal";
import { ChatBot } from "@/components/shared/chatbot";
import { ContactModalProvider, useContactModal } from "@/context/contact-modal-context";
import { AuthProvider } from "@/context/auth-context";

interface ClientLayoutProps {
    children: ReactNode;
}

function LayoutContent({ children }: { children: ReactNode }) {
    const { isOpen, closeModal, openModal } = useContactModal();
    const pathname = usePathname();

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
            <Navigation />
            <main className="flex-grow pt-20">
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
