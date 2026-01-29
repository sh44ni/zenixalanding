"use client";

import { ReactNode } from "react";
import { Navigation } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";
import { ContactFormModal } from "@/components/shared/contact-form-modal";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { ContactModalProvider, useContactModal } from "@/context/contact-modal-context";

interface ClientLayoutProps {
    children: ReactNode;
}

function LayoutContent({ children }: { children: ReactNode }) {
    const { isOpen, closeModal, openModal } = useContactModal();

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation onContactClick={openModal} />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
            <ContactFormModal
                open={isOpen}
                onOpenChange={(open) => open ? openModal() : closeModal()}
            />
            <FloatingWhatsApp />
        </div>
    );
}

export function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <ContactModalProvider>
            <LayoutContent>{children}</LayoutContent>
        </ContactModalProvider>
    );
}
