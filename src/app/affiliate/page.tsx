"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AffiliatePage() {
    return (
        <main className="pb-20">
            {/* Hero Section */}
            <section className="section-padding bg-white">
                <div className="container-custom text-center max-w-4xl">
                    <div className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 mb-6">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2"></span>
                        Affiliate Program
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
                        Partner with Zenixa & <span className="text-gray-900">Earn up to 20%</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join our affiliate program and help businesses launch their dream stores.
                        Earn recurring revenue for every successful referral.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="text-base px-8 h-12">
                            <Link href="/affiliate/apply">
                                Apply Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="text-base px-8 h-12">
                            <Link href="/affiliate/login">Affiliate Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                            Why Affiliates Love Us
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need to succeed as a Zenixa partner
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                                <DollarSign className="h-6 w-6 text-gray-900" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">High Commissions</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Earn 10-20% commission on every sale you generate. Our competitive rates ensure your efforts are rewarded.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                                <TrendingUp className="h-6 w-6 text-gray-900" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Detailed Tracking</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Monitor your clicks, conversions, and earnings in real-time with our comprehensive dashboard.
                            </p>
                        </div>
                        <div className="p-8 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                                <Users className="h-6 w-6 text-gray-900" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Dedicated Support</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Get access to marketing materials and a dedicated account manager to help you succeed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section-padding bg-gray-900 text-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
                                Why Partner with Zenixa?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Industry-leading conversion rates",
                                    "Dedicated WhatsApp support",
                                    "Instant payouts via EasyPaisa or JazzCash",
                                    "Exclusive promotional offers",
                                    "Early access to new features"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0" />
                                        <span className="text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Button
                                size="lg"
                                variant="secondary"
                                asChild
                                className="mt-10"
                            >
                                <Link href="/affiliate/apply">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="bg-white text-gray-900 rounded-2xl p-10 text-center shadow-2xl">
                                <div className="text-6xl md:text-7xl font-bold mb-2">20%</div>
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
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-800 rounded-2xl -z-10"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-800 rounded-2xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Start earning in three simple steps
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Apply",
                                description: "Fill out a quick application with your details and marketing plans."
                            },
                            {
                                step: "02",
                                title: "Promote",
                                description: "Get your unique affiliate link and start sharing with your audience."
                            },
                            {
                                step: "03",
                                title: "Earn",
                                description: "Receive 20% commission for every successful referral. Paid monthly."
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-5xl font-bold text-gray-200 mb-4">{item.step}</div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link href="/affiliate/apply">
                                Apply Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
