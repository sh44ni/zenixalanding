"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  Smartphone,
  Server,
  Globe,
  Search,
  BarChart3,
  HeadphonesIcon,
} from "lucide-react";

// Large feature cards (span 2 columns on desktop)
const largeFeatures = [
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description:
      "Accept COD, bank transfers, JazzCash, EasyPaisa, and Stripe. All gateway setup included — no extra charges.",
    logos: [
      { name: "JazzCash", color: "bg-red-500" },
      { name: "EasyPaisa", color: "bg-green-500" },
      { name: "Stripe", color: "bg-indigo-500" },
      { name: "COD", color: "bg-gray-500" },
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Your store looks perfect on every phone. Fast checkout. Your admin panel works on mobile too — manage orders from anywhere.",
    showPhone: true,
  },
];

// Medium feature cards (single column)
const mediumFeatures = [
  {
    icon: ShoppingCart,
    title: "Product Catalog",
    description:
      "Unlimited products with variants (Size, Color, Material). Bulk CSV import supported.",
  },
  {
    icon: Truck,
    title: "Order Management",
    description:
      "Track orders from placement to delivery. Print invoices and manage shipping status.",
  },
  {
    icon: Globe,
    title: ".PK Domain Included",
    description: "We register yourbrand.pk for you. First year included.",
  },
  {
    icon: Server,
    title: "Hosting Included",
    description: "1 year of high-speed hosting on Pakistani servers.",
  },
];

// Small feature cards (badge style)
const smallFeatures = [
  { icon: Search, title: "Basic SEO Setup" },
  { icon: BarChart3, title: "Inventory Tracking" },
  { icon: HeadphonesIcon, title: "Free Lifetime Support" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-gray-50 relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header with Zchappie */}
        <div className="flex items-start justify-between mb-16">
          <AnimatedSection className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
              Everything Included
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Built for Pakistani Commerce
            </h2>
            <p className="text-lg text-gray-600">
              Payment gateways, domain, hosting, and lifetime support — all in
              one package.
            </p>
          </AnimatedSection>

          {/* Zchappie presenting - desktop only */}
          <div className="hidden lg:block">
            <Image
              src="/zchappie/presenting.png"
              alt="Zchappie presenting features"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Large Feature Cards (span 2 cols) */}
          {largeFeatures.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={index * 100}
              className="lg:col-span-2"
            >
              <div className="h-full p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 hover:border-accent-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>

                {/* Payment logos or phone mockup */}
                {feature.logos && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {feature.logos.map((logo) => (
                      <span
                        key={logo.name}
                        className={`px-3 py-1.5 ${logo.color} text-white text-xs font-medium rounded-full`}
                      >
                        {logo.name}
                      </span>
                    ))}
                  </div>
                )}

                {feature.showPhone && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      {/* Phone Mockup Frame */}
                      <div className="relative flex-shrink-0">
                        {/* Phone outer frame */}
                        <div className="w-24 h-48 bg-gray-900 rounded-[20px] p-1 shadow-xl relative">
                          {/* Dynamic island */}
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-full z-10" />
                          {/* Screen */}
                          <div className="w-full h-full bg-white rounded-[16px] overflow-hidden">
                            <Image
                              src="/screenshots/admin-dashboard-mobile.png"
                              alt="Admin panel mobile view"
                              width={240}
                              height={480}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                        {/* Subtle reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[20px] pointer-events-none" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Manage from anywhere
                        </p>
                        <p className="text-xs text-gray-500">
                          Full admin panel works perfectly on mobile
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}

          {/* Medium Feature Cards */}
          {mediumFeatures.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={200 + index * 50}>
              <div className="h-full p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}

          {/* Small Feature Badges - span full row */}
          <AnimatedSection delay={400} className="lg:col-span-4">
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              {smallFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm"
                >
                  <feature.icon className="w-4 h-4 text-accent-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
