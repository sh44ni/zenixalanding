"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { useContactModal } from "@/context/contact-modal-context";

export default function HomePage() {
  const { openModal } = useContactModal();

  return (
    <>
      <HeroSection onGetStarted={openModal} />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection onGetStarted={openModal} />
      <TestimonialsSection />
      <FaqSection onContactClick={openModal} />
    </>
  );
}
