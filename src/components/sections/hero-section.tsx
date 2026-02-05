"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, Zap, Banknote, Globe, Shield } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const trustBadges = [
  { icon: Zap, text: "Live in 72 Hours" },
  { icon: Banknote, text: "No Monthly Fees" },
  { icon: Globe, text: ".PK Domain Included" },
  { icon: Shield, text: "Free Lifetime Support" },
];

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
              E-commerce Platform for Pakistan
            </p>
          </AnimatedSection>

          {/* Main headline */}
          <AnimatedSection animation="fade-in" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-4 tracking-tight">
              Go Online in 72 Hours.
              <br />
              <span className="text-gray-400">No Monthly Fees. Ever.</span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl leading-relaxed">
              Complete e-commerce store with .pk domain and hosting included.
              <span className="block mt-2 font-semibold text-gray-900">
                PKR 45,000 one-time • Renew for just PKR 5,000/year
              </span>
            </p>
          </AnimatedSection>

          {/* Trust Badges */}
          <AnimatedSection animation="fade-in" delay={300}>
            <div className="flex flex-wrap gap-2 mb-8">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700"
                >
                  <badge.icon className="w-4 h-4 text-gray-500" />
                  {badge.text}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="https://wa.me/923040260023" target="_blank">
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-6 text-base font-semibold rounded-lg w-full sm:w-auto"
                >
                  WhatsApp Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="https://demo.zenixa.pk" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-6 text-base font-medium rounded-lg w-full sm:w-auto"
                >
                  See Live Demo
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Key points */}
          <AnimatedSection animation="fade-in" delay={500}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                No monthly subscriptions
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                JazzCash, EasyPaisa, Stripe included
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                72-hour delivery
              </span>
            </div>
          </AnimatedSection>
        </div>

        {/* Clean product preview */}
        <AnimatedSection animation="fade-in" delay={600} className="mt-10 lg:mt-14">
          <div className="relative rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
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
            Your store will look this professional — ready in 72 hours
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
