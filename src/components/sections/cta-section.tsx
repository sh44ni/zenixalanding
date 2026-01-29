"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Rocket,
  Clock,
  Shield,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface CtaSectionProps {
  onGetStarted: () => void;
}

const benefits = [
  "Complete store setup in 24 hours",
  "No monthly fees, ever",
  "Full ownership of your store",
  "30-day support included",
  "100% money-back guarantee",
];

export function CtaSection({ onGetStarted }: CtaSectionProps) {
  return (
    <section id="contact" className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Limited Time Offer
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Launch Your{" "}
              <span className="text-gradient bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400">
                Online Store?
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join 100+ Pakistani businesses already selling online with Zenixa.
              Start your e-commerce journey today.
            </p>

            {/* Price Highlight */}
            <div className="inline-block mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-slate-400 line-through text-2xl">
                    PKR 75,000
                  </span>
                  <span className="px-3 py-1 bg-secondary text-white text-sm font-semibold rounded-full">
                    40% OFF
                  </span>
                </div>
                <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                  PKR 45,000
                </div>
                <p className="text-slate-400">One-time payment • No monthly fees</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-400" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="secondary"
                onClick={onGetStarted}
                className="group"
                rightIcon={
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                }
              >
                Get Started Now
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                onClick={onGetStarted}
                leftIcon={<Clock className="w-5 h-5" />}
              >
                Schedule a Call
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-10 border-t border-white/10">
              <div className="flex items-center gap-3 text-slate-400">
                <Clock className="w-6 h-6 text-primary-400" />
                <span className="text-sm">24-hour launch</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Shield className="w-6 h-6 text-primary-400" />
                <span className="text-sm">Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Rocket className="w-6 h-6 text-primary-400" />
                <span className="text-sm">Free consultation</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
