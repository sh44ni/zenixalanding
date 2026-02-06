"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowDown, CreditCard, Store, Wrench } from "lucide-react";

const painCards = [
    {
        icon: CreditCard,
        heading: "Paying PKR 3,500 every month?",
        target: "For Shopify users",
        body: "Shopify charges monthly. Plus domain fees. Plus hosting. Plus 2% on every transaction. After one year you've spent PKR 42,000+ and you still don't own anything. Cancel and your store disappears.",
        faded: "Recurring charges that never end",
        color: "from-red-500/10 to-orange-500/10",
        borderColor: "border-red-100",
    },
    {
        icon: Store,
        heading: "Giving 30% commission to Daraz?",
        target: "For marketplace sellers",
        body: "You do the work — sourcing, packaging, shipping — and Daraz takes almost a third. No branding, no customer data, no repeat buyers. Your customers are Daraz's customers, not yours.",
        faded: "Building someone else's business",
        color: "from-orange-500/10 to-yellow-500/10",
        borderColor: "border-orange-100",
    },
    {
        icon: Wrench,
        heading: "Fighting with WordPress plugins?",
        target: "For WooCommerce users",
        body: "WordPress hosting costs PKR 10,000+/year. Then WooCommerce setup. Then theme. Then payment plugin. Then security plugin. Then it breaks after an update. You're paying a developer just to keep it alive.",
        faded: "Technical headaches that never stop",
        color: "from-yellow-500/10 to-green-500/10",
        borderColor: "border-yellow-100",
    },
];

export function PainPointSection() {
    const scrollToNextSection = () => {
        const howItWorks = document.getElementById("how-it-works");
        if (howItWorks) {
            howItWorks.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="section-padding bg-gray-50 relative">
            <div className="container-custom relative z-10">
                {/* Section header */}
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                        Sound familiar?
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Are You Tired Of...
                    </h2>
                </AnimatedSection>

                {/* Pain cards grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {painCards.map((card, index) => (
                        <AnimatedSection
                            key={card.heading}
                            delay={index * 150}
                            className="group"
                        >
                            <div
                                className={`h-full p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                            >
                                {/* Target badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                        <card.icon className="w-5 h-5 text-gray-700" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        {card.target}
                                    </span>
                                </div>

                                {/* Heading */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {card.heading}
                                </h3>

                                {/* Body */}
                                <p className="text-gray-600 leading-relaxed mb-4">{card.body}</p>

                                {/* Faded issue */}
                                <div className="pt-4 border-t border-gray-200/50">
                                    <p className="text-sm text-gray-400 italic flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                        {card.faded}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Solution teaser */}
                <AnimatedSection delay={500} className="text-center max-w-2xl mx-auto">
                    <p className="text-xl text-gray-700 mb-6">
                        What if you could own a complete, professional store for{" "}
                        <span className="font-bold text-gray-900">PKR 45,000 — once</span> — and
                        never think about any of this again?
                    </p>
                    <Button
                        onClick={scrollToNextSection}
                        variant="outline"
                        className="border-gray-300 hover:bg-gray-100 text-gray-700 gap-2"
                    >
                        See How It Works
                        <ArrowDown className="w-4 h-4" />
                    </Button>
                </AnimatedSection>
            </div>
        </section>
    );
}
