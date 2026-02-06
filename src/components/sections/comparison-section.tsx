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
        shopify: "Extra cost / limited in PK",
        zenixa: "COD, JazzCash, EasyPaisa, Stripe",
    },
    {
        feature: "Ready In",
        shopify: "DIY - takes weeks",
        zenixa: "72 Hours ⚡",
    },
    {
        feature: "Support",
        shopify: "Email/chat (paid plans)",
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
        <section id="comparison" className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex items-start justify-between mb-12">
                    <AnimatedSection className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
                            Cost Comparison
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Why Zenixa Makes Sense
                        </h2>
                        <p className="text-lg text-gray-600">
                            See exactly what you pay and what you get.
                        </p>
                    </AnimatedSection>

                    {/* Zchappie confident pose - desktop only */}
                    <div className="hidden lg:block">
                        <Image
                            src="/zchappie/confident-smug.png"
                            alt="Zchappie knows the numbers"
                            width={180}
                            height={180}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Comparison Table */}
                <AnimatedSection delay={200}>
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                        {/* Table wrapper for mobile scroll */}
                        <div className="overflow-x-auto">
                            {/* Header with logos */}
                            <div className="grid grid-cols-3 border-b border-gray-200 min-w-[500px]">
                                <div className="p-4 md:p-5 font-semibold text-gray-700">
                                    Feature
                                </div>
                                <div className="p-4 md:p-5 text-center border-l border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-center gap-2">
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
                                <div className="p-4 md:p-5 text-center border-l border-gray-200 bg-accent-50">
                                    <div className="flex items-center justify-center gap-2">
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
                                    className="grid grid-cols-3 border-b border-gray-100 last:border-b-0 min-w-[500px] hover:bg-gray-50/50 transition-colors"
                                >
                                    <div className="p-4 md:p-5 text-gray-900 text-sm font-medium">
                                        {row.feature}
                                    </div>
                                    <div className="p-4 md:p-5 text-gray-500 text-sm text-center border-l border-gray-100 bg-gray-50/30">
                                        <span className="flex items-center justify-center gap-1.5">
                                            <X className="w-4 h-4 text-red-400 shrink-0" />
                                            <span>{row.shopify}</span>
                                        </span>
                                    </div>
                                    <div className="p-4 md:p-5 text-gray-900 text-sm text-center border-l border-gray-100 bg-accent-50/30 font-medium">
                                        <span className="flex items-center justify-center gap-1.5">
                                            <Check className="w-4 h-4 text-accent-600 shrink-0" />
                                            <span>{row.zenixa}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Bottom CTA */}
                <AnimatedSection delay={400} className="mt-8 text-center">
                    <p className="text-gray-600">
                        Stop paying monthly. Own your store.{" "}
                        <a
                            href="https://wa.me/923040260023"
                            target="_blank"
                            className="text-[#25D366] font-semibold hover:underline"
                        >
                            WhatsApp us to get started →
                        </a>
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
}
