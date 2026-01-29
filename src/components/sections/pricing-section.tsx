"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  Check,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Headphones,
  Plus,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  onGetStarted: () => void;
}

const mainFeatures = [
  "Complete e-commerce store setup",
  "Premium responsive theme",
  "Unlimited product listings",
  "JazzCash & EasyPaisa integration",
  "Cash on Delivery support",
  "Order management system",
  "Customer accounts & profiles",
  "Inventory tracking",
  "SEO optimization",
  "Mobile-optimized design",
  "Admin dashboard & analytics",
  "WhatsApp integration",
  "Free SSL certificate",
  "1-year hosting included",
  "30-day post-launch support",
];

const addOns = [
  {
    title: "Additional Products Setup",
    description: "We'll upload and organize up to 100 products for you",
    price: "10,000",
  },
  {
    title: "Custom Domain",
    description: "Premium .pk or .com domain registration",
    price: "5,000",
  },
  {
    title: "Extended Support",
    description: "6 months of priority support & maintenance",
    price: "15,000",
  },
  {
    title: "Social Media Setup",
    description: "Facebook & Instagram shop integration",
    price: "8,000",
  },
];

const guarantees = [
  { icon: Clock, text: "24-hour launch guarantee" },
  { icon: Shield, text: "100% money-back guarantee" },
  { icon: Headphones, text: "Free consultation included" },
];

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleFeatures = showAllFeatures ? mainFeatures : mainFeatures.slice(0, 8);

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            One Price. <span className="text-primary">Everything Included.</span>
          </h2>
          <p className="text-lg text-slate-600">
            No hidden fees. No monthly subscriptions. Just one payment for your
            complete e-commerce solution.
          </p>
        </AnimatedSection>

        {/* Main Pricing Card */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-primary overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-secondary text-white px-6 py-2 text-sm font-semibold rounded-bl-2xl flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  Most Popular
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Left Side - Price & CTA */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Complete E-commerce Package
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Everything you need to launch and run your online store
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl md:text-6xl font-bold text-primary">
                          PKR 45,000
                        </span>
                      </div>
                      <p className="text-slate-500 mt-2">
                        One-time payment • No monthly fees
                      </p>
                    </div>

                    {/* Guarantees */}
                    <div className="space-y-3 mb-8">
                      {guarantees.map((guarantee, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <guarantee.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-slate-700">
                            {guarantee.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      size="xl"
                      className="w-full"
                      onClick={onGetStarted}
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      Get Started Now
                    </Button>

                    <p className="text-center text-sm text-slate-500 mt-4">
                      No credit card required for consultation
                    </p>
                  </div>

                  {/* Right Side - Features */}
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-3">
                      {visibleFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {mainFeatures.length > 8 && (
                      <button
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="text-primary font-medium text-sm mt-4 hover:underline flex items-center gap-1"
                      >
                        {showAllFeatures ? "Show less" : `+${mainFeatures.length - 8} more features`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Add-ons Section */}
        <AnimatedSection delay={400} className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Optional Add-ons
              </h3>
              <p className="text-slate-600">
                Enhance your package with additional services
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Plus className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {addon.title}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                          {addon.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-primary">
                          PKR {addon.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Payment Methods */}
        <AnimatedSection delay={600} className="mt-16">
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-4">Accepted Payment Methods</p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Bank Transfer", "JazzCash", "EasyPaisa", "Cash"].map(
                (method, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 bg-slate-100 rounded-lg text-sm font-medium text-slate-600"
                  >
                    {method}
                  </div>
                )
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
