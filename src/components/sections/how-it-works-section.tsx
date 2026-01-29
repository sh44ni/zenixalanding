"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Palette,
  Rocket,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HowItWorksSectionProps {
  onGetStarted: () => void;
}

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us Your Vision",
    description:
      "Share your business details, products, and design preferences. We'll understand your brand and goals.",
    features: [
      "Free consultation call",
      "Business requirements review",
      "Design preferences discussion",
    ],
    duration: "1-2 hours",
    color: "primary",
  },
  {
    number: "02",
    icon: Palette,
    title: "We Build Your Store",
    description:
      "Our team sets up your complete e-commerce store with your branding, products, and payment integrations.",
    features: [
      "Custom theme setup",
      "Product upload assistance",
      "Payment gateway configuration",
    ],
    duration: "12-24 hours",
    color: "accent",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Grow",
    description:
      "Your store goes live! We provide training and support to ensure you can manage and grow your business.",
    features: [
      "Admin training session",
      "Launch support",
      "30-day assistance included",
    ],
    duration: "Same day",
    color: "secondary",
  },
];

export function HowItWorksSection({ onGetStarted }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            From Idea to{" "}
            <span className="text-primary">Live Store</span> in 24 Hours
          </h2>
          <p className="text-lg text-slate-600">
            We&apos;ve simplified the process so you can focus on what matters most
            - running your business.
          </p>
        </AnimatedSection>

        {/* Steps Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Hidden on Mobile */}
          <div className="hidden lg:block absolute top-24 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.number}
                delay={index * 200}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300 h-full">
                  {/* Step Number Badge */}
                  <div
                    className={cn(
                      "absolute -top-4 left-8 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg",
                      step.color === "primary" && "bg-primary",
                      step.color === "accent" && "bg-accent",
                      step.color === "secondary" && "bg-secondary"
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mt-6 mb-6",
                      step.color === "primary" && "bg-primary/10",
                      step.color === "accent" && "bg-accent/10",
                      step.color === "secondary" && "bg-secondary/10"
                    )}
                  >
                    <step.icon
                      className={cn(
                        "w-8 h-8",
                        step.color === "primary" && "text-primary",
                        step.color === "accent" && "text-accent",
                        step.color === "secondary" && "text-secondary"
                      )}
                    />
                  </div>

                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 mb-4">
                    <Clock className="w-3 h-3" />
                    {step.duration}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 mb-6">{step.description}</p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2
                          className={cn(
                            "w-4 h-4",
                            step.color === "primary" && "text-primary",
                            step.color === "accent" && "text-accent",
                            step.color === "secondary" && "text-secondary"
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow - Hidden on Mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-24 -right-6 w-12 h-12 items-center justify-center z-10">
                    <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection delay={600} className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Store Today
            </Button>
            <p className="text-sm text-slate-500">
              Free consultation included
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
