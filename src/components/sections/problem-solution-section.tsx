"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Check,
  X,
  TrendingDown,
  DollarSign,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemSolutionSectionProps {
  onGetStarted: () => void;
}

const shopifyBreakdown = [
  { label: "Shopify Basic Plan (Monthly)", shopify: 6650, zenixa: 0 },
  { label: "Domain (Yearly)", shopify: 4000, zenixa: "Included" },
  { label: "Theme Purchase", shopify: 50000, zenixa: "Included" },
  { label: "Payment Gateway Setup", shopify: 15000, zenixa: "Included" },
  { label: "Apps & Plugins", shopify: 5000, zenixa: "Included" },
];

const yearlyComparison = {
  shopify: {
    monthly: 6650 * 12,
    oneTime: 69000,
    total: 148800,
  },
  zenixa: {
    oneTime: 45000,
    total: 45000,
  },
};

export function ProblemSolutionSection({ onGetStarted }: ProblemSolutionSectionProps) {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("yearly");

  const savings = yearlyComparison.shopify.total - yearlyComparison.zenixa.total;

  return (
    <section id="comparison" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Problem with Traditional Platforms
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Stop Paying <span className="text-red-500">Monthly Fees</span> Forever
          </h2>
          <p className="text-lg text-slate-600">
            Most e-commerce platforms drain your profits with recurring fees.
            See how much you&apos;re really paying and how Zenixa changes the game.
          </p>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection delay={200} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("monthly")}
                className={cn(
                  "flex-1 py-4 text-sm font-semibold transition-colors",
                  activeTab === "monthly"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Monthly Costs
              </button>
              <button
                onClick={() => setActiveTab("yearly")}
                className={cn(
                  "flex-1 py-4 text-sm font-semibold transition-colors",
                  activeTab === "yearly"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                First Year Total
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border-b border-slate-200">
              <div className="text-sm font-medium text-slate-500">Cost Item</div>
              <div className="text-center">
                <div className="text-sm font-semibold text-slate-900">
                  Other Platforms
                </div>
                <div className="text-xs text-slate-500">Shopify, WooCommerce</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-primary">Zenixa</div>
                <div className="text-xs text-primary/70">One-time payment</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {shopifyBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
                >
                  <div className="text-sm text-slate-700">{item.label}</div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-red-600">
                      PKR {item.shopify.toLocaleString()}
                      {item.label.includes("Monthly") && "/mo"}
                    </span>
                  </div>
                  <div className="text-center">
                    {typeof item.zenixa === "number" ? (
                      <span className="text-sm font-medium text-slate-900">
                        PKR {item.zenixa.toLocaleString()}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        <Check className="w-4 h-4" />
                        {item.zenixa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-slate-100 to-slate-50 border-t-2 border-slate-200">
              <div className="text-base font-bold text-slate-900">
                {activeTab === "yearly" ? "First Year Total" : "Monthly Total"}
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">
                  PKR {activeTab === "yearly"
                    ? yearlyComparison.shopify.total.toLocaleString()
                    : "~12,400"
                  }
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-red-500 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  Recurring costs
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">
                  PKR {yearlyComparison.zenixa.total.toLocaleString()}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-primary mt-1">
                  <Check className="w-3 h-3" />
                  One-time only
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Savings Highlight */}
        <AnimatedSection delay={400} className="mt-12">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Save PKR {savings.toLocaleString()} in Year 1
              </h3>
              <p className="text-primary-100 mb-6 max-w-xl mx-auto">
                That&apos;s money you can reinvest in inventory, marketing, or growing your
                business instead of paying platform fees.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="white"
                  size="lg"
                  onClick={onGetStarted}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Saving Today
                </Button>
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <DollarSign className="w-4 h-4" />
                  No hidden fees, ever
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Feature Comparison */}
        <AnimatedSection delay={600} className="mt-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Others Card */}
            <div className="bg-white rounded-2xl p-8 border border-red-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Traditional Platforms
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Monthly subscription fees",
                  "Transaction fees per sale",
                  "Expensive premium themes",
                  "Limited customization",
                  "Dependent on platform",
                  "Complex pricing tiers",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zenixa Card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-primary shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                Recommended
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Zenixa</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "One-time payment only",
                  "Zero transaction fees",
                  "Premium theme included",
                  "Full customization freedom",
                  "You own everything",
                  "Simple, transparent pricing",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
