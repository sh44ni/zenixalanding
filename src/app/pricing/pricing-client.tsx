"use client";

import { PricingSection } from "@/components/sections/pricing-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { useContactModal } from "@/context/contact-modal-context";

export function PricingClient() {
    const { openModal } = useContactModal();

    return (
        <div className="pt-12">
            <div className="container-custom mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Transparent Pricing
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Pay once, own it forever. No hidden fees.
                </p>
            </div>
            <PricingSection onGetStarted={openModal} />
            <ComparisonSection />
        </div>
    );
}
