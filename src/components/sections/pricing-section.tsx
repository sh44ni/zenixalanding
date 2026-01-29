"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PricingSectionProps {
  onGetStarted?: () => void;
}

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

const paymentMethods = [
  { name: "Bank Transfer", available: true },
  { name: "Cash on Delivery", available: true },
  { name: "JazzCash / EasyPaisa", available: true },
];

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  return (
    <section id="pricing" className="pt-8 md:pt-12 pb-16 md:pb-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Get everything you need to start selling online with a single payment.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Pricing Card */}
          <AnimatedSection delay={100}>
            <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm">
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">Complete Package</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-semibold text-gray-900">PKR 45,000</span>
                  <span className="text-gray-500">one-time</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Includes domain & hosting for 1st year.
                </p>
              </div>

              <Link href="https://wa.me/923040260023" target="_blank">
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-6 text-base font-medium rounded-lg mb-8"
                >
                  WhatsApp Us for Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <div className="space-y-4">
                <p className="font-medium text-gray-900 text-sm">What's included in PKR 45,000:</p>
                <ul className="space-y-3">
                  {includedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Payment Methods & FAQ */}
          <div className="space-y-6">
            <AnimatedSection delay={200}>
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <h3 className="font-medium text-gray-900 mb-4">Accepted Payment Methods</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{method.name}</span>
                      {method.available ? (
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          <Check className="w-4 h-4" />
                          <span>Accepted</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 bg-gray-100 px-2 py-1 rounded text-xs">Coming Soon</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <h3 className="font-medium text-gray-900 mb-4">Common Questions</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">What about renewal costs?</p>
                    <p className="text-gray-600 mt-1">
                      After the first year, you only pay for domain (~PKR 2,500) and hosting renewal (~PKR 15,000).
                      No other fees.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Do I need technical knowledge?</p>
                    <p className="text-gray-600 mt-1">No. We handle setup and provide a user-friendly admin panel.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">How long does setup take?</p>
                    <p className="text-gray-600 mt-1">Typically 2 working days after receiving your content.</p>
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
