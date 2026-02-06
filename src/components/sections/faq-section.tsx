"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FaqSectionProps {
  onContactClick: () => void;
}

const faqs = [
  {
    question: "What exactly is included in the PKR 45,000 package?",
    answer:
      "The package includes a complete, ready-to-use e-commerce store with a premium responsive theme, unlimited product listings, payment gateway integrations (JazzCash, EasyPaisa, Stripe, COD, bank transfer), order management system, customer accounts, inventory tracking, SEO optimization, admin dashboard with analytics, WhatsApp integration, free SSL certificate, 1-year hosting, 1-year .pk domain, and free lifetime support on existing features.",
  },
  {
    question: "Are there really no monthly fees?",
    answer:
      "Absolutely! The PKR 45,000 is a one-time payment that covers everything. There are no monthly subscription fees, no transaction fees from our side, and no hidden charges. After the first year, renewal is just PKR 5,000/year for domain + hosting. That's it.",
  },
  {
    question: "How fast can my store be ready?",
    answer:
      "72 hours after you send us your product content and branding. We handle everything — domain registration, hosting setup, store configuration, and payment integration. You just provide your products and logo, we do the rest.",
  },
  {
    question: "What payment gateways do you support?",
    answer:
      "We integrate whatever your business needs — COD (Cash on Delivery), bank transfers, JazzCash, EasyPaisa, Stripe, and more. All gateway setup is included in the PKR 45,000 package at no extra charge. Tell us what you need and we'll set it up.",
  },
  {
    question: "I'm on Shopify — can you recreate my store?",
    answer:
      "Yes! Send us your current Shopify store and we'll recreate it with modern technology, better performance, and zero monthly fees. We'll migrate your products, categories, and design. You keep your brand, lose the monthly bill.",
  },
  {
    question: "I sell on Daraz/Instagram — is this for me?",
    answer:
      "Absolutely. If you're selling on Daraz, you're giving away 30% in commissions and don't own your customer data. We'll take your products and build you a professional store at yourbrand.pk. Your own brand, your own customers, no commissions.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. We handle the entire setup and provide a user-friendly admin panel. You can add/edit products, manage orders, update content, and view analytics — all without any technical knowledge. We also provide training to get you started.",
  },
  {
    question: "Do I get support after setup?",
    answer:
      "Yes. You get free support on all existing features forever. No ticket limits, no expiry. If you want new features or custom development work, that's quoted separately. But for anything that's already built — we support it for free, forever.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "You can get a full refund within 2 hours of your initial 50% payment. After that, once work begins or your domain is registered, refunds aren't available for change of mind (domain registrations are irreversible). But if we can't deliver what was promised or can't fix a specific issue — you get your money back. Full details on our Refund Policy page.",
  },
  {
    question: "What about renewal costs?",
    answer:
      "After the first year, renewal is just PKR 5,000/year. That covers domain + hosting renewal. No other fees. Compare that to Shopify's PKR 42,000+/year and you'll see why Zenixa makes sense for Pakistani businesses.",
  },
];

export function FaqSection({ onContactClick }: FaqSectionProps) {
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about Zenixa and our e-commerce solution.
            Can&apos;t find what you&apos;re looking for? Contact us!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Questions */}
          <div className="lg:col-span-8">
            <AnimatedSection delay={200}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-4 text-gray-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>

          {/* Right: CTA */}
          <div className="lg:col-span-4 sticky top-24">
            <AnimatedSection delay={400}>
              <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Our team is here to help. Get in touch and we&apos;ll respond within 24 hours.
                </p>
                <div className="flex flex-col gap-3">
                  <Button onClick={onContactClick} className="w-full bg-gray-900 hover:bg-gray-800 text-white">Contact Us</Button>
                  <Link href="https://wa.me/923040260023" target="_blank">
                    <Button
                      variant="outline"
                      className="w-full border-[#25D366] text-[#25D366] hover:bg-green-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Us
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
