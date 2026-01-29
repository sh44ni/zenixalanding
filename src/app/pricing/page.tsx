import { Metadata } from "next";
import { PricingClient } from "./pricing-client";

export const metadata: Metadata = {
    title: "Pricing - Zenixa E-commerce Platform",
    description: "One-time payment of PKR 45,000. No monthly fees. Full ownership and source code included.",
};

export default function PricingPage() {
    return <PricingClient />;
}
