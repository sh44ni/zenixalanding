"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  BarChart3,
  Smartphone,
  Server,
  Globe,
  Search,
  HeadphonesIcon,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: ShoppingCart,
    title: "Product Catalog",
    description: "Manage unlimited products with variants (Size, Color, Material). Bulk CSV import supported.",
  },
  {
    icon: Truck,
    title: "Order Management",
    description: "Track orders from placement to delivery. Print invoices and manage shipping status.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Accept COD, Bank Transfers, JazzCash, EasyPaisa, and Stripe. All gateway setup included.",
  },
  {
    icon: Globe,
    title: ".PK Domain Included",
    description: "We register your official .pk domain name for you (e.g., yourbrand.pk). First year included.",
  },
  {
    icon: Server,
    title: "Hosting Included",
    description: "1 year of high-speed hosting on Pakistani servers for faster local access.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Your store looks perfect on mobile. Fast checkout experience for customers.",
  },
  {
    icon: Search,
    title: "Basic SEO Setup",
    description: "Google-friendly structure to help customers find your store online.",
  },
  {
    icon: BarChart3,
    title: "Inventory Tracking",
    description: "Automatic stock reduction when orders are placed. Low stock alerts.",
  },
  {
    icon: HeadphonesIcon,
    title: "Free Lifetime Support",
    description: "Get free support on all existing features forever. No support fees, no expiry.",
  },
];

const technicalSpecs = [
  {
    label: "Technology",
    logos: [
      { src: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png", alt: "Next.js", name: "Next.js" },
      { src: "https://www.postgresql.org/media/img/about/press/elephant.png", alt: "PostgreSQL", name: "PostgreSQL" },
    ]
  },
  { label: "Hosting", value: "High Quality Servers" },
  { label: "Security", value: "SSL Certificate Included" },
  { label: "Delivery", value: "Live in 72 Hours ⚡" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Pakistani Commerce
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to start selling online — payment gateways, domain, hosting, and lifetime support included.
          </p>
        </AnimatedSection>

        {/* Features Grid - 9 features in 3x3 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              delay={index * 50}
              className="group"
            >
              <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                <feature.icon className="w-5 h-5 text-gray-900 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Technical Specs */}
        <AnimatedSection delay={400}>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technicalSpecs.map((spec, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-500 mb-1">{spec.label}</p>
                  {spec.logos ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {spec.logos.map((logo, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                            unoptimized
                          />
                          <span className="text-sm font-medium text-gray-900">{logo.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="font-medium text-gray-900">{spec.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
