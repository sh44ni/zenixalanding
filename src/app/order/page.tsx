"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const includedFeatures = [
    "Complete e-commerce store setup",
    "Free .pk domain (worth PKR 2,000)",
    "1 year hosting included (worth PKR 15,000)",
    "Mobile-responsive design",
    "Admin panel with inventory management",
    "Payment integration (COD + Bank Transfer)",
    "Basic customization",
    "30-day support included",
];

import { Suspense } from "react";

function OrderForm() {
    const searchParams = useSearchParams();
    const referralCode = searchParams.get("ref") || "";

    const [step, setStep] = useState<"form" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    package: "standard",
                    referralCode,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to submit order");
            }

            setStep("success");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (step === "success") {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Submitted!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your interest in Zenixa! Our team will contact you within 24 hours to discuss your project.
                    </p>
                    <div className="space-y-3">
                        <Button asChild className="w-full">
                            <Link href="/account/login">Track Your Order</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/">Return to Homepage</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your E-commerce Store</h1>
                    <p className="text-xl text-gray-600">Fill out the form below and we&apos;ll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Price Summary */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Complete Package</h2>
                                <p className="text-sm text-gray-600">Everything you need to start selling online</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-primary">PKR 45,000</p>
                                <p className="text-sm text-gray-500">one-time payment</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {includedFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                    <Check className="w-4 h-4 text-primary shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-6">Your Details</h2>

                        {error && (
                            <div className="text-red-600 bg-red-50 p-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+92 300 1234567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="businessName">Business Name (Optional)</Label>
                                <Input
                                    id="businessName"
                                    placeholder="Your business or brand name"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="message">Tell us about your project (Optional)</Label>
                            <Textarea
                                id="message"
                                placeholder="What products do you sell? Any specific features you need?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="mt-1 min-h-[100px]"
                            />
                        </div>

                        {referralCode && (
                            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                <p className="text-sm text-gray-600">
                                    Referral Code: <span className="font-mono font-semibold text-primary">{referralCode}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto px-12"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Submit Inquiry
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </main>
    );
}

export default function OrderPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        }>
            <OrderForm />
        </Suspense>
    );
}
