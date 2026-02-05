"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const affiliateFeatures = [
    {
        icon: DollarSign,
        title: "20% Commission",
        description: "Earn PKR 9,000 per successful referral"
    },
    {
        icon: TrendingUp,
        title: "Real-time Tracking",
        description: "Monitor clicks and conversions live"
    },
    {
        icon: Users,
        title: "Instant Payouts",
        description: "Via JazzCash or EasyPaisa"
    }
];

export function AffiliateSection() {
    return (
        <section className="py-16 md:py-24 bg-gray-900 text-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <AnimatedSection>
                        <p className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
                            Affiliate Program
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Partner with Zenixa & Earn
                        </h2>
                        <p className="text-lg text-gray-400 mb-8">
                            Help businesses launch their dream stores and earn up to 20% commission on every sale.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4 mb-8">
                            {affiliateFeatures.map((feature, index) => (
                                <div key={index} className="p-4 bg-gray-800 rounded-lg">
                                    <feature.icon className="w-5 h-5 text-white mb-2" />
                                    <p className="font-semibold text-white text-sm">{feature.title}</p>
                                    <p className="text-xs text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/affiliate/apply">
                                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                                    Become an Affiliate
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/affiliate">
                                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>

                    {/* Right - Stats Card */}
                    <AnimatedSection delay={200} className="flex justify-center lg:justify-end">
                        <div className="bg-white text-gray-900 rounded-2xl p-10 text-center shadow-2xl max-w-sm">
                            <div className="text-6xl font-bold mb-2">20%</div>
                            <div className="text-xl text-gray-600 mb-6">Commission Rate</div>
                            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 border-t pt-6">
                                <div>
                                    <div className="font-semibold text-gray-900 text-lg">PKR 9,000</div>
                                    <div>per sale</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-lg">Instant</div>
                                    <div>payouts</div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
