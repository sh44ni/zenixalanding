"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const includedFeatures = [
  "Complete e-commerce store setup",
  "Free .pk domain (1st year included)",
  "1 year hosting included",
  "Mobile-responsive design",
  "Admin panel with inventory management",
  "Payment gateway integration (COD, Bank, JazzCash, EasyPaisa, Stripe)",
  "Basic customization",
  "Live in 72 hours ⚡",
  "Free lifetime support on existing features",
];

const paymentMethods = [
  { name: "JazzCash", bgColor: "bg-red-600" },
  { name: "EasyPaisa", bgColor: "bg-green-600" },
  { name: "Stripe", bgColor: "bg-indigo-600" },
  { name: "Bank Transfer", bgColor: "bg-gray-700" },
  { name: "COD", bgColor: "bg-amber-600" },
];

export function PricingSection() {
  return (
    <section id="pricing" className="pt-8 md:pt-12 pb-16 md:pb-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Get everything you need to start selling online with a single payment.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Pricing Card */}
          <AnimatedSection delay={100}>
            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">Complete Package</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">PKR 45,000</span>
                  <span className="text-gray-500">one-time</span>
                </div>
                <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Renew for just PKR 5,000/year
                </p>
              </div>

              <Link href="https://wa.me/923040260023" target="_blank">
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-6 text-base font-semibold rounded-lg mb-8"
                >
                  WhatsApp Us to Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <div className="space-y-4">
                <p className="font-semibold text-gray-900 text-sm">What&apos;s included:</p>
                <ul className="space-y-3">
                  {includedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Refund Policy Link */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link href="/refund" className="text-sm text-gray-500 hover:text-gray-900 underline">
                  Fair refund policy →
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Payment Methods & FAQ */}
          <div className="space-y-6">
            <AnimatedSection delay={200}>
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="font-semibold text-gray-900 mb-4">Accepted Payment Gateways</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className={`flex items-center justify-center p-3 rounded-lg ${method.bgColor}`}>
                      <span className="text-sm font-semibold text-white">{method.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  All payment gateway setup is included in the package — no extra charges.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="font-semibold text-gray-900 mb-4">Common Questions</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">What about renewal costs?</p>
                    <p className="text-gray-600 mt-1">
                      After the first year, renewal is just PKR 5,000/year for domain + hosting. No other fees.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Do I need technical knowledge?</p>
                    <p className="text-gray-600 mt-1">No. We handle setup and provide a user-friendly admin panel.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">How long does setup take?</p>
                    <p className="text-gray-600 mt-1">72 hours after you send us your product content and branding.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Do I get support after setup?</p>
                    <p className="text-gray-600 mt-1">Yes. You get free support on all existing features forever. New features or custom work is quoted separately.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
