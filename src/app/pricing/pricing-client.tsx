"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
    Check,
    ArrowRight,
    MessageSquare,
    CreditCard,
    Smartphone,
    Banknote,
    Wallet,
} from "lucide-react";

const includedItems = [
    "Complete e-commerce store",
    "Premium responsive design",
    "Admin dashboard",
    "Unlimited products",
    "Order management",
    "Customer accounts",
    "Inventory tracking",
    "WhatsApp integration",
    "Basic SEO setup",
    "SSL certificate",
];

const includedExtras = [
    { label: ".pk domain", value: "PKR 2,000", included: true },
    { label: "1-year hosting", value: "PKR 15,000", included: true },
    { label: "Payment setup", value: "PKR 5,000", included: true },
    { label: "Training", value: "PKR 3,000", included: true },
    { label: "Lifetime support", value: "Priceless", included: true },
];

const paymentMethods = [
    { name: "JazzCash", icon: Smartphone, color: "bg-red-50 text-red-600" },
    { name: "EasyPaisa", icon: Wallet, color: "bg-green-50 text-green-600" },
    { name: "Bank Transfer", icon: Banknote, color: "bg-blue-50 text-blue-600" },
    { name: "Stripe/Cards", icon: CreditCard, color: "bg-purple-50 text-purple-600" },
];

const pricingFaqs = [
    {
        question: "Is PKR 45,000 really the total cost?",
        answer:
            "Yes. PKR 45,000 covers everything: store setup, domain, hosting, payment integration, and training. There are no hidden fees or surprises.",
    },
    {
        question: "What are the renewal costs?",
        answer:
            "After the first year, renewal is PKR 5,000/year. This covers domain + hosting renewal. Compare that to Shopify's PKR 42,000+/year.",
    },
    {
        question: "Are payment gateway fees included?",
        answer:
            "We set up your payment gateways at no extra charge. However, the gateways themselves (JazzCash, EasyPaisa, Stripe) charge their own transaction fees — typically 2-3%.",
    },
    {
        question: "Can I pay in installments?",
        answer:
            "We typically ask for 50% upfront and 50% before going live. Contact us on WhatsApp if you need a different arrangement.",
    },
    {
        question: "What's the refund policy?",
        answer:
            "Full refund within 2 hours of initial payment. After work begins, refunds aren't available for change of mind, but we guarantee delivery of what was promised.",
    },
    {
        question: "Can I add features later?",
        answer:
            "Absolutely. Your store is built on flexible technology. We can add custom features anytime — just ask for a quote.",
    },
];

const comparisonData = [
    { feature: "Monthly fees", zenixa: "PKR 0", shopify: "PKR 3,500/month" },
    { feature: "First year cost", zenixa: "PKR 45,000", shopify: "PKR 60,000+" },
    { feature: "Setup time", zenixa: "72 hours", shopify: "DIY" },
    { feature: "Payment gateways", zenixa: "All included", shopify: "Extra fees" },
    { feature: "Transaction fees", zenixa: "Gateway fees only", shopify: "2% + gateway" },
    { feature: "Support", zenixa: "Free forever", shopify: "Email only" },
    { feature: "Custom features", zenixa: "Available", shopify: "Limited" },
];

export function PricingClient() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom text-center max-w-3xl">
                    <AnimatedSection animation="fade-in">
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                            Simple Pricing
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
                            One Price. Everything Included.
                        </h1>
                        <p className="text-lg text-gray-600">
                            No monthly fees. No hidden charges. Just one payment to own your store.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Main Pricing Card */}
            <section className="py-12">
                <div className="container-custom max-w-5xl">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Price Card - 3 cols */}
                        <AnimatedSection delay={100} className="lg:col-span-3">
                            <div className="bg-white rounded-2xl border-2 border-gray-900 p-8 relative overflow-hidden">
                                {/* Popular badge */}
                                <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-medium px-4 py-1 rounded-bl-lg">
                                    Most Popular
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 mb-2">Complete E-commerce Store</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-gray-900">PKR 45,000</span>
                                        <span className="text-gray-500">one-time</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Then just PKR 5,000/year for renewal
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                                    {includedItems.map((item) => (
                                        <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-6 mb-6">
                                    <p className="text-sm font-medium text-gray-900 mb-3">Also included:</p>
                                    <div className="space-y-2">
                                        {includedExtras.map((extra) => (
                                            <div key={extra.label} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{extra.label}</span>
                                                <span className="text-gray-400 line-through">{extra.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link href="https://wa.me/923040260023" target="_blank" className="block">
                                    <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Get Started on WhatsApp
                                    </Button>
                                </Link>
                            </div>
                        </AnimatedSection>

                        {/* Payment Methods - 2 cols */}
                        <AnimatedSection delay={200} className="lg:col-span-2">
                            <div className="bg-gray-50 rounded-2xl p-8 h-full">
                                <h3 className="font-semibold text-gray-900 mb-4">Payment Gateways</h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    We set up any payment gateway you need — all included in the price.
                                </p>

                                <div className="space-y-3 mb-6">
                                    {paymentMethods.map((method) => (
                                        <div key={method.name} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.color}`}>
                                                <method.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{method.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs text-gray-500">
                                    COD (Cash on Delivery) also available. Gateway transaction fees apply.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom max-w-4xl">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Zenixa vs Shopify
                        </h2>
                        <p className="text-gray-600">
                            See how much you save with Zenixa
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={100}>
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                                <div className="p-4 text-sm font-medium text-gray-600">Feature</div>
                                <div className="p-4 text-sm font-bold text-gray-900 text-center bg-accent-50">Zenixa</div>
                                <div className="p-4 text-sm font-medium text-gray-600 text-center">Shopify</div>
                            </div>
                            {comparisonData.map((row, index) => (
                                <div key={row.feature} className={`grid grid-cols-3 ${index < comparisonData.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <div className="p-4 text-sm text-gray-600">{row.feature}</div>
                                    <div className="p-4 text-sm font-medium text-gray-900 text-center bg-accent-50/50">{row.zenixa}</div>
                                    <div className="p-4 text-sm text-gray-500 text-center">{row.shopify}</div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="container-custom max-w-3xl">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Pricing Questions
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={100}>
                        <Accordion type="single" collapsible className="space-y-3">
                            {pricingFaqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-gray-50 rounded-xl px-6 border-none"
                                >
                                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-5">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 pb-5">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-900">
                <div className="container-custom text-center">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Launch Your Store?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            72 hours from now, you could be accepting orders.
                        </p>
                        <Link href="https://wa.me/923040260023" target="_blank">
                            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Start on WhatsApp
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
