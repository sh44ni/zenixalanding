"use client";

import { AnimatedSection } from "@/components/shared/animated-section";

const comparisonData = [
    { feature: "Setup Cost", shopify: "~PKR 3,500/month", zenixa: "PKR 45,000 one-time" },
    { feature: "Annual Cost (Year 1)", shopify: "~PKR 42,000 + Setup", zenixa: "PKR 45,000 (All included)" },
    { feature: "Domain & Hosting", shopify: "Extra Cost", zenixa: "Included (Year 1)" },
    { feature: "Source Code", shopify: "No access", zenixa: "Full ownership" },
    { feature: "Transaction Fees", shopify: "2.0%", zenixa: "0%" },
    { feature: "Local Payments", shopify: "Limited", zenixa: "COD, Bank, JazzCash" },
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
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
                        Why Zenixa makes sense
                    </h2>
                    <p className="text-lg text-gray-600">
                        See exactly what you pay and what you get.
                    </p>
                </AnimatedSection>

                {/* Comparison Table */}
                <AnimatedSection delay={200}>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-3 border-b border-gray-200">
                            <div className="p-4 font-medium text-gray-500 text-sm">Feature</div>
                            <div className="p-4 font-medium text-gray-500 text-sm text-center border-l border-gray-200">Shopify</div>
                            <div className="p-4 font-medium text-gray-900 text-sm text-center border-l border-gray-200 bg-gray-50">Zenixa</div>
                        </div>

                        {/* Rows */}
                        {comparisonData.map((row, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 border-b border-gray-100 last:border-b-0"
                            >
                                <div className="p-4 text-gray-900 text-sm">{row.feature}</div>
                                <div className="p-4 text-gray-600 text-sm text-center border-l border-gray-100">{row.shopify}</div>
                                <div className="p-4 text-gray-900 text-sm text-center border-l border-gray-100 bg-gray-50 font-medium">{row.zenixa}</div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
