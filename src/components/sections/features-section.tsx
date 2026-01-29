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
} from "lucide-react";

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
    description: "Accept Cash on Delivery (COD) and Bank Transfers directly to your account.",
  },
  {
    icon: Globe,
    title: ".PK Domain included",
    description: "We register your official .pk domain name for you (e.g., yourbrand.pk).",
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
];

const technicalSpecs = [
  {
    label: "Technology",
    value: (
      <div className="flex items-center gap-2">
        <img
          src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png"
          alt="Next.js"
          className="h-5 w-5 object-contain"
        />
        <span className="text-gray-900 font-medium">Next.js</span>
        <span className="text-gray-300">|</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
          alt="PostgreSQL"
          className="h-5 w-5 object-contain"
        />
        <span className="text-gray-900 font-medium">PostgreSQL</span>
      </div>
    ),
  },
  { label: "Hosting", value: "High Quality Servers" },
  { label: "Security", value: "SSL Certificate Included" },
  { label: "Analytics", value: "Full Analytics" },
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Built for Pakistani Commerce
          </h2>
          <p className="text-lg text-gray-600">
            A complete features set designed for local business needs.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              delay={index * 50}
              className="group"
            >
              <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <feature.icon className="w-5 h-5 text-gray-900 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">
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
            <h3 className="font-medium text-gray-900 mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technicalSpecs.map((spec, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-500">{spec.label}</p>
                  <div className="font-medium text-gray-900">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
