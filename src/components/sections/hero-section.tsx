"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, Check } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const features = [
  "Live in 72 Hours",
  "No Monthly Fees",
  ".PK Domain Included",
  "Free Lifetime Support",
];

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent-50/30 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="container-custom relative z-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-lg">
            {/* Badge */}
            <AnimatedSection animation="fade-in" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                For Daraz, Instagram & Shopify sellers
              </div>
            </AnimatedSection>

            {/* Main headline */}
            <AnimatedSection animation="fade-in" delay={100}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] mb-3 tracking-tight">
                Your Own Store.
                <br />
                <span className="text-accent-500">Live in 72 Hours.</span>
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection animation="fade-in" delay={200}>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                Stop paying monthly fees. Stop losing 30% to Daraz.
                We build your complete e-commerce store — ready to accept orders.
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-5">
                PKR 45,000 one-time • Then just PKR 5,000/year
              </p>
            </AnimatedSection>

            {/* Features list */}
            <AnimatedSection animation="fade-in" delay={250}>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="fade-in" delay={300}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="https://wa.me/923040260023" target="_blank">
                  <Button
                    size="lg"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-5 text-sm font-semibold rounded-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    WhatsApp Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="https://demo.zenixa.pk" target="_blank">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-5 text-sm font-medium rounded-lg w-full sm:w-auto"
                  >
                    See Live Demo
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Zchappie */}
          <AnimatedSection animation="fade-in" delay={200} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind Zchappie */}
              <div className="absolute inset-0 bg-accent-400/20 blur-3xl rounded-full scale-75" />
              <Image
                src="/zchappie/welcoming.png"
                alt="Zchappie - Your E-commerce Assistant"
                width={400}
                height={400}
                className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-xl"
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
