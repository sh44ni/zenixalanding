"use client";

import { useState } from "react";
import { Navigation } from "@/components/shared/navigation";
import { ContactFormModal } from "@/components/shared/contact-form-modal";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <Navigation onContactClick={handleOpenContactModal} />

      <main>
        <HeroSection onGetStarted={handleOpenContactModal} />
        <ProblemSolutionSection onGetStarted={handleOpenContactModal} />
        <FeaturesSection />
        <HowItWorksSection onGetStarted={handleOpenContactModal} />
        <PricingSection onGetStarted={handleOpenContactModal} />
        <TestimonialsSection />
        <FaqSection onContactClick={handleOpenContactModal} />
        <CtaSection onGetStarted={handleOpenContactModal} />
      </main>

      <Footer />

      <ContactFormModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
}
