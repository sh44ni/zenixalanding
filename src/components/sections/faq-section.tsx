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

interface FaqSectionProps {
  onContactClick: () => void;
}

const faqs = [
  {
    question: "What exactly is included in the PKR 45,000 package?",
    answer:
      "The package includes a complete, ready-to-use e-commerce store with a premium responsive theme, unlimited product listings, payment gateway integrations (JazzCash, EasyPaisa, COD), order management system, customer accounts, inventory tracking, SEO optimization, admin dashboard with analytics, WhatsApp integration, free SSL certificate, 1-year hosting, and 30-day post-launch support.",
  },
  {
    question: "Are there really no monthly fees?",
    answer:
      "Absolutely! The PKR 45,000 is a one-time payment that covers everything. There are no monthly subscription fees, no transaction fees from our side, and no hidden charges. The only recurring cost would be your domain renewal (around PKR 2,000-3,000/year) after the first year, and hosting renewal after the first year if you choose to continue with us.",
  },
  {
    question: "How quickly can my store be ready?",
    answer:
      "We guarantee your store will be live within 24 hours of receiving all your requirements (logo, products, business details). For stores with a large number of products (100+), it may take 2-3 days for complete product setup, but the core store will be functional within 24 hours.",
  },
  {
    question: "Do I own the store completely?",
    answer:
      "Yes, you have full ownership. The store, its design, all data, and code belong to you. You're not locked into any platform. After the first year, you can even move your store to your own hosting if you prefer, and we'll assist with the migration.",
  },
  {
    question: "What payment methods can my customers use?",
    answer:
      "We integrate all popular Pakistani payment methods including JazzCash, EasyPaisa, bank transfers, and Cash on Delivery (COD). We can also set up international payment gateways like Stripe or PayPal if you plan to sell internationally.",
  },
  {
    question: "Can I manage the store myself after launch?",
    answer:
      "Absolutely! We provide a user-friendly admin dashboard and a complete training session. You can add/edit products, manage orders, update content, and view analytics - all without any technical knowledge. Most of our clients manage their stores independently within the first week.",
  },
  {
    question: "What if I need help after the 30-day support period?",
    answer:
      "We offer extended support packages starting from PKR 15,000 for 6 months. However, many routine questions can be handled through our WhatsApp support. For urgent issues, we're always available to help at reasonable hourly rates.",
  },
  {
    question: "Can I upgrade or add features later?",
    answer:
      "Yes! Your store is built on a flexible platform. You can add features like multiple languages, advanced analytics, membership systems, booking systems, or any custom functionality. We provide quotes for additional features based on your requirements.",
  },
  {
    question: "How does shipping integration work?",
    answer:
      "We can integrate your store with popular Pakistani courier services like Leopards, TCS, M&P, and others. This allows automatic tracking updates and can even calculate shipping costs based on destination. Integration fees may vary by courier.",
  },
  {
    question: "What if I'm not satisfied with the store?",
    answer:
      "We offer a 100% money-back guarantee if you're not satisfied with the initial store setup. Simply let us know within 7 days of delivery, and we'll provide a full refund. We're confident you'll love your store, but we want you to feel secure in your investment.",
  },
];

export function FaqSection({ onContactClick }: FaqSectionProps) {
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about Zenixa and our e-commerce solution.
            Can&apos;t find what you&apos;re looking for? Contact us!
          </p>
        </AnimatedSection>

        {/* FAQ Accordion */}
        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-50 rounded-xl border border-slate-100 px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>

        {/* Still Have Questions CTA */}
        <AnimatedSection delay={400} className="mt-16">
          <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              Our team is here to help. Get in touch and we&apos;ll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onContactClick}>Contact Us</Button>
              <Button
                variant="outline"
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I have a question about Zenixa e-commerce platform."
                  );
                  window.open(`https://wa.me/923000000000?text=${message}`, "_blank");
                }}
                leftIcon={<MessageCircle className="w-4 h-4" />}
                className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
