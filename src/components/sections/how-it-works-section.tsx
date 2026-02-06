"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  Package,
  Settings,
  Rocket,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Package,
    title: "Send Us Your Products",
    description:
      "Share your product photos, descriptions, and prices. If you're already selling on Daraz or Instagram, we'll pull everything from there. Already on Shopify? We'll recreate your exact store.",
  },
  {
    number: "2",
    icon: Settings,
    title: "We Build Everything",
    description:
      "We set up your complete store — design, products, categories, payment gateways (JazzCash, EasyPaisa, Stripe, COD), your .pk domain, hosting, admin panel. You don't touch a line of code.",
  },
  {
    number: "3",
    icon: Rocket,
    title: "Your Store Goes Live",
    description:
      "Within 72 hours, your store is live at yourbrand.pk. Start sharing the link, accepting orders, and building your brand. Free support on all existing features — forever.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            3 Steps. 72 Hours.{" "}
            <span className="text-accent-500">Done.</span>
          </h2>
          <p className="text-lg text-gray-600">
            We handle everything. You just provide products and branding.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop only */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent-200 via-accent-400 to-accent-200" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.number}
                delay={index * 200}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="w-14 h-14 rounded-2xl bg-accent-500 flex items-center justify-center text-white font-bold text-xl shadow-lg mb-6 relative z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-gray-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[4.5rem] -right-6 w-12 h-12 items-center justify-center z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-accent-500" />
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection delay={600} className="text-center mt-16">
          <Link href="https://wa.me/923040260023" target="_blank">
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Store Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Free consultation included • Reply within 1 hour
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
