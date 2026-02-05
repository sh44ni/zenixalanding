"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Check, X } from "lucide-react";
import Image from "next/image";

const comparisonData = [
    {
        feature: "Setup Cost",
        shopify: "~PKR 3,500/month",
        zenixa: "PKR 45,000 one-time",
    },
    {
        feature: "Annual Cost (Year 1)",
        shopify: "~PKR 42,000 + Setup",
        zenixa: "PKR 45,000 (All included)",
    },
    {
        feature: "Renewal (Year 2+)",
        shopify: "~PKR 42,000/year",
        zenixa: "PKR 5,000/year",
    },
    {
        feature: "Domain & Hosting",
        shopify: "Extra Cost",
        zenixa: "Included (Year 1)",
    },
    {
        feature: "Transaction Fees",
        shopify: "2.0%",
        zenixa: "0%",
    },
    {
        feature: "Payment Gateways",
        shopify: "Extra cost / limited",
        zenixa: "COD, JazzCash, EasyPaisa, Stripe",
    },
    {
        feature: "Ready In",
        shopify: "DIY - takes weeks",
        zenixa: "72 Hours ⚡",
    },
    {
        feature: "Support",
        shopify: "Email/chat (paid)",
        zenixa: "Free forever",
    },
    {
        feature: "Refund Policy",
        shopify: "No refunds",
        zenixa: "Fair refund policy",
    },
];

export function ComparisonSection() {
    return (
        <section id="comparison" className="pt-16 md:pt-24 pb-8 md:pb-12 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="max-w-2xl mb-12">
                    <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                        Comparison
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Why Zenixa Makes Sense
                    </h2>
                    <p className="text-lg text-gray-600">
                        See exactly what you pay and what you get.
                    </p>
                </AnimatedSection>

                {/* Comparison Table */}
                <AnimatedSection delay={200}>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
                        {/* Header with logos */}
                        <div className="grid grid-cols-3 border-b border-gray-200 min-w-[500px]">
                            <div className="p-3 md:p-4 font-semibold text-gray-700 text-xs md:text-sm">Feature</div>
                            <div className="p-3 md:p-4 text-center border-l border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-center gap-2">
                                    {/* Shopify Logo */}
                                    <Image
                                        src="https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg"
                                        alt="Shopify"
                                        width={80}
                                        height={24}
                                        className="h-5 md:h-6 w-auto object-contain"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <div className="p-3 md:p-4 text-center border-l border-gray-200 bg-green-50">
                                <div className="flex items-center justify-center gap-2">
                                    {/* Zenixa Logo */}
                                    <Image
                                        src="/logo_logoforlightbg.svg"
                                        alt="Zenixa"
                                        width={80}
                                        height={24}
                                        className="h-5 md:h-6 w-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rows */}
                        {comparisonData.map((row, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 border-b border-gray-100 last:border-b-0 min-w-[500px]"
                            >
                                <div className="p-3 md:p-4 text-gray-900 text-xs md:text-sm font-medium">{row.feature}</div>
                                <div className="p-3 md:p-4 text-gray-500 text-xs md:text-sm text-center border-l border-gray-100 bg-gray-50/50">
                                    <span className="flex items-center justify-center gap-1">
                                        <X className="w-3 h-3 md:w-4 md:h-4 text-red-400 shrink-0" />
                                        <span>{row.shopify}</span>
                                    </span>
                                </div>
                                <div className="p-3 md:p-4 text-gray-900 text-xs md:text-sm text-center border-l border-gray-100 bg-green-50/50 font-medium">
                                    <span className="flex items-center justify-center gap-1">
                                        <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600 shrink-0" />
                                        <span>{row.zenixa}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Bottom CTA */}
                <AnimatedSection delay={400} className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Stop paying monthly. Own your store.
                        <a href="https://wa.me/923040260023" target="_blank" className="text-green-600 font-medium hover:underline ml-1">
                            WhatsApp us to get started →
                        </a>
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
}
