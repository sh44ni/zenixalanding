import { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
    title: "Contact Us - Zenixa",
    description: "Get in touch with the Zenixa team for sales, support, or partnership inquiries.",
};

export default function ContactPage() {
    return <ContactClient />;
}
