"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedCounter } from "@/components/shared/animated-section";
import {
  ArrowRight,
  Play,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  Store,
  Users,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const trustBadges = [
  { icon: Store, label: "100+ Stores Launched" },
  { icon: Users, label: "Trusted by Local Businesses" },
  { icon: TrendingUp, label: "PKR 50M+ in Sales" },
];

const features = [
  { icon: Clock, text: "Launch in 24 hours" },
  { icon: Shield, text: "No monthly fees" },
  { icon: Zap, text: "Full ownership" },
];

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <AnimatedSection animation="fade-in" delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Complete E-commerce Solution
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="fade-in" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Launch Your{" "}
                <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Online Store
                </span>{" "}
                in 24 Hours
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection animation="fade-in" delay={200}>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                One payment. No monthly fees. Full ownership. Everything you need to
                start selling online in Pakistan.
              </p>
            </AnimatedSection>

            {/* Feature Pills */}
            <AnimatedSection animation="fade-in" delay={300}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-slate-700">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="fade-in" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button
                  size="xl"
                  onClick={onGetStarted}
                  className="group relative overflow-hidden"
                  rightIcon={
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  }
                >
                  <span className="relative z-10">Get Started for PKR 45,000</span>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={() => setIsVideoPlaying(true)}
                  leftIcon={<Play className="w-5 h-5" />}
                >
                  Watch Demo
                </Button>
              </div>
            </AnimatedSection>

            {/* Trust Badges */}
            <AnimatedSection animation="fade-in" delay={500}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm text-slate-600">{badge.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Visual */}
          <AnimatedSection
            animation="fade-in-right"
            delay={300}
            className="relative"
          >
            <div className="relative">
              {/* Main Dashboard Preview */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-lg px-4 py-1.5 text-sm text-slate-400 text-center">
                      yourstore.com
                    </div>
                  </div>
                </div>

                {/* Dashboard Content Placeholder */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-32 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-8 w-24 bg-primary/20 rounded-lg" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Orders", value: "156", color: "primary" },
                      { label: "Revenue", value: "₹2.4M", color: "secondary" },
                      { label: "Visitors", value: "3.2K", color: "accent" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-50 rounded-xl text-center"
                      >
                        <div className={cn(
                          "text-2xl font-bold",
                          stat.color === "primary" && "text-primary",
                          stat.color === "secondary" && "text-secondary",
                          stat.color === "accent" && "text-accent"
                        )}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Product List Preview */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                      >
                        <div className="w-12 h-12 bg-slate-200 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 bg-slate-200 rounded" />
                          <div className="h-3 w-1/2 bg-slate-100 rounded" />
                        </div>
                        <div className="h-8 w-16 bg-primary/20 rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-slate-100 floating animate-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      New Order!
                    </div>
                    <div className="text-xs text-slate-500">Just now</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-xl p-4 border border-slate-100 floating animate-delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Sales Up 47%
                    </div>
                    <div className="text-xs text-slate-500">This month</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats Counter Section */}
        <AnimatedSection animation="fade-in" delay={600} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
            {[
              { value: 100, suffix: "+", label: "Stores Launched" },
              { value: 50, suffix: "M+", label: "Revenue Generated (PKR)" },
              { value: 24, suffix: "hrs", label: "Average Launch Time" },
              { value: 99, suffix: "%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Video Modal Placeholder */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full text-center">
            <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-16 h-16 text-slate-400" />
            </div>
            <p className="text-slate-600">Demo video placeholder</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => setIsVideoPlaying(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
