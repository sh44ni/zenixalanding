"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
  Palette,
  Search,
  Shield,
  Smartphone,
  Globe,
  MessageSquare,
  Package,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const featureCategories = [
  {
    id: "store",
    label: "Store Management",
    icon: ShoppingCart,
  },
  {
    id: "payment",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: BarChart3,
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
  },
];

const features = {
  store: [
    {
      icon: Package,
      title: "Product Management",
      description:
        "Add unlimited products with variants, categories, and inventory tracking.",
    },
    {
      icon: ShoppingCart,
      title: "Order Processing",
      description:
        "Streamlined order management with status tracking and notifications.",
    },
    {
      icon: Truck,
      title: "Shipping Integration",
      description:
        "Connect with local couriers like Leopards, TCS, and more.",
    },
    {
      icon: Users,
      title: "Customer Management",
      description:
        "Build customer profiles, track purchase history, and manage relationships.",
    },
  ],
  payment: [
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description:
        "Accept JazzCash, EasyPaisa, bank transfers, and cash on delivery.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "SSL encryption and secure payment processing for peace of mind.",
    },
    {
      icon: Globe,
      title: "Multi-Currency Support",
      description:
        "Accept payments in PKR and other currencies for international sales.",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description:
        "Get real-time alerts for every payment received.",
    },
  ],
  marketing: [
    {
      icon: Search,
      title: "SEO Optimized",
      description:
        "Built-in SEO tools to help your store rank higher on Google.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track sales, visitors, and conversions with detailed reports.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      description:
        "Connect with customers directly through WhatsApp for orders and support.",
    },
    {
      icon: Users,
      title: "Social Media Ready",
      description:
        "Easy sharing and social media integration for better reach.",
    },
  ],
  design: [
    {
      icon: Palette,
      title: "Premium Themes",
      description:
        "Professional, conversion-optimized themes included at no extra cost.",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description:
        "Perfect display on all devices - phones, tablets, and desktops.",
    },
    {
      icon: Zap,
      title: "Fast Loading",
      description:
        "Optimized for speed to reduce bounce rates and improve conversions.",
    },
    {
      icon: Globe,
      title: "Custom Branding",
      description:
        "Your logo, colors, and brand identity throughout the store.",
    },
  ],
};

export function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState("store");

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Everything You Need
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Powerful Features for{" "}
            <span className="text-primary">Growing Businesses</span>
          </h2>
          <p className="text-lg text-slate-600">
            From product management to payment processing, get all the tools you
            need to run a successful online store.
          </p>
        </AnimatedSection>

        {/* Category Tabs */}
        <AnimatedSection delay={200} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <category.icon className="w-5 h-5" />
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features[activeCategory as keyof typeof features].map(
            (feature, index) => (
              <AnimatedSection
                key={`${activeCategory}-${index}`}
                delay={index * 100}
                className="group"
              >
                <div className="h-full bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            )
          )}
        </div>

        {/* Store Preview */}
        <AnimatedSection delay={400} className="mt-20">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-hero-pattern" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Beautiful, Conversion-Optimized Stores
                </h3>
                <p className="text-slate-400 mb-6">
                  Every Zenixa store comes with a premium theme designed to
                  showcase your products beautifully and convert visitors into
                  customers.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Professional product galleries",
                    "Quick view and wishlist features",
                    "Smart search and filters",
                    "Trust badges and social proof",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Store Preview Mockup */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>

                  {/* Store Content */}
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-24 bg-slate-200 rounded" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-slate-100 rounded" />
                        <div className="h-6 w-16 bg-slate-100 rounded" />
                      </div>
                    </div>

                    {/* Hero Banner */}
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-6 w-48 bg-slate-200 rounded mb-2 mx-auto" />
                        <div className="h-8 w-24 bg-primary rounded mx-auto" />
                      </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="aspect-square bg-slate-100 rounded-lg" />
                          <div className="h-3 w-full bg-slate-200 rounded" />
                          <div className="h-4 w-16 bg-primary/20 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Premium Theme Included
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
