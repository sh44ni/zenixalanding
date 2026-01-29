"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid" />

      <div className="container-custom relative z-10 pt-12 lg:pt-20 pb-16 lg:pb-24">
        <div className="max-w-4xl">
          {/* Small tag */}
          <AnimatedSection animation="fade-in" delay={0}>
            <p className="text-sm font-medium text-gray-500 mb-4 tracking-wide uppercase">
              E-commerce Platform
            </p>
          </AnimatedSection>

          {/* Main headline */}
          <AnimatedSection animation="fade-in" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] mb-4 tracking-tight">
              Launch Your Pakistani
              <br />
              <span className="text-gray-400">E-commerce Store</span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl leading-relaxed">
              Complete solution with .pk domain and hosting included.
              <span className="block mt-2 font-medium text-gray-900">
                PKR 45,000 - No monthly fees, ever.
              </span>
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="fade-in" delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="https://wa.me/923040260023" target="_blank">
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-6 text-base font-medium rounded-lg w-full sm:w-auto"
                >
                  WhatsApp Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-6 text-base font-medium rounded-lg w-full sm:w-auto"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </div>
          </AnimatedSection>

          {/* Key points */}
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                No monthly subscriptions
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                Full source code ownership
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                24-hour delivery
              </span>
            </div>
          </AnimatedSection>
        </div>

        {/* Clean product preview */}
        <AnimatedSection animation="fade-in" delay={500} className="mt-10 lg:mt-14">
          <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <Image
              src="/screenshots/shop-page.png"
              alt="Zenixa Store Preview"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Your store will look this professional
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
