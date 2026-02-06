"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { FeaturesSection } from "@/components/sections/features-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Package,
    Settings,
    Rocket,
    ArrowRight,
    Headphones,
    Clock,
    CheckCircle,
    MessageSquare,
    Shield,
    Zap,
} from "lucide-react";

const processSteps = [
    {
        number: "1",
        icon: Package,
        title: "Send Us Your Products",
        description:
            "Share your product photos, descriptions, and prices. Already selling on Daraz or Instagram? We'll pull everything from there.",
        time: "Day 0",
    },
    {
        number: "2",
        icon: Settings,
        title: "We Build Everything",
        description:
            "Design, products, categories, payment gateways, domain, hosting, admin panel — we handle it all. You don't touch a line of code.",
        time: "Day 1-2",
    },
    {
        number: "3",
        icon: Rocket,
        title: "Your Store Goes Live",
        description:
            "Within 72 hours, your store is live at yourbrand.pk. Start sharing, accepting orders, building your brand.",
        time: "Day 3",
    },
];

const supportFeatures = [
    {
        icon: Headphones,
        title: "WhatsApp Support",
        description: "Reach us anytime on WhatsApp. We respond within hours, not days.",
    },
    {
        icon: Clock,
        title: "Lifetime Support",
        description: "Free support on existing features — forever. No expiry, no limits.",
    },
    {
        icon: Shield,
        title: "Bug Fixes Included",
        description: "Found a bug? We fix it at no extra cost. Your store should just work.",
    },
    {
        icon: Zap,
        title: "Custom Features Available",
        description: "Need something specific? We can add custom features. Just ask for a quote.",
    },
];

export default function FeaturesPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom text-center max-w-3xl">
                    <AnimatedSection animation="fade-in">
                        <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                            Everything Included
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
                            Powerful Features, Zero Complexity
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            A complete e-commerce platform built for Pakistani businesses.
                            Everything you need to sell online — nothing you don&apos;t.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Features Grid (reusing component) */}
            <FeaturesSection />

            {/* Process Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                            Our Process
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Your Store, Ready in 72 Hours
                        </h2>
                        <p className="text-lg text-gray-600">
                            We&apos;ve streamlined the entire process. You provide the products, we do the rest.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {processSteps.map((step, index) => (
                            <AnimatedSection key={step.number} delay={index * 150}>
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full relative">
                                    {/* Time badge */}
                                    <div className="absolute top-6 right-6 px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-medium">
                                        {step.time}
                                    </div>

                                    {/* Step number */}
                                    <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-lg mb-6">
                                        {step.number}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                            Always Here For You
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Support That Doesn&apos;t Expire
                        </h2>
                        <p className="text-lg text-gray-600">
                            Unlike other platforms, our support doesn&apos;t end after 30 days.
                            We&apos;re here as long as your store is live.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {supportFeatures.map((feature, index) => (
                            <AnimatedSection key={feature.title} delay={index * 100}>
                                <div className="text-center p-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="w-7 h-7 text-gray-700" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-900">
                <div className="container-custom text-center">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Launch Your Store?
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            PKR 45,000 one-time payment. Live in 72 hours. Free support forever.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="https://wa.me/923040260023" target="_blank">
                                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    WhatsApp Us
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button size="lg" variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-gray-800 px-8">
                                    View Pricing
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
