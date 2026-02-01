"use client";

import { ReactNode } from "react";
import { ContactModalProvider } from "@/context/contact-modal-context";
import { AuthProvider } from "@/context/auth-context";

export default function AuthLayout({ children }: { children: ReactNode }) {
    // Auth pages have their own header/footer, so we skip the main Navigation/Footer
    return (
        <AuthProvider>
            <ContactModalProvider>
                {children}
            </ContactModalProvider>
        </AuthProvider>
    );
}
