"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, DollarSign, Users } from "lucide-react";
import { useContactModal } from "@/context/contact-modal-context";
import { Header } from "@/components/shared/navigation";
import { Footer } from "@/components/shared/footer";

export default function AffiliatePage() {
    const { openModal } = useContactModal();

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
                        Coming Soon
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                        Partner with Zenixa & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Earn up to 20%</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our affiliate program and help businesses launch their dream stores.
                        Earn recurring revenue for every successful referral.
                    </p>
                    <Button size="lg" onClick={openModal} className="text-lg px-8 py-6 h-auto">
                        Join the Waitlist
                    </Button>
                </div>

                {/* Features Grid */}
                <div className="container mx-auto px-4 py-20">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                            <DollarSign className="h-10 w-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-bold mb-2">High Commissions</h3>
                            <p className="text-gray-600">
                                Earn 10-20% commission on every sale you generate. Our competitive rates ensure your efforts are rewarded.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                            <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Detailed Tracking</h3>
                            <p className="text-gray-600">
                                Monitor your clicks, conversions, and earnings in real-time with our comprehensive dashboard.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                            <Users className="h-10 w-10 text-purple-600 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                            <p className="text-gray-600">
                                Get access to marketing materials and a dedicated account manager to help you succeed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-gray-900 text-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Why Partner with Zenixa?</h2>
                                <div className="space-y-4">
                                    {[
                                        "Industry-leading conversion rates",
                                        "30-day cookie duration",
                                        "Monthly payouts via Bank or Wise",
                                        "Exclusive promotional offers",
                                        "Early access to new features"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            <span className="text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={openModal}
                                    className="mt-8"
                                >
                                    Apply Now
                                </Button>
                            </div>
                            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 opacity-90 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold mb-2">20%</div>
                                    <div className="text-2xl opacity-90">Commission Rate</div>
                                    <div className="mt-8 text-sm opacity-75">
                                        *Terms apply. Waitlist open now.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
