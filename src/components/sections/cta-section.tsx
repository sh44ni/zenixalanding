"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Phone, Calendar } from "lucide-react";
import Link from "next/link";

interface CtaSectionProps {
  onGetStarted?: () => void;
}

export function CtaSection({ onGetStarted }: CtaSectionProps) {
  return (
    <section id="contact" className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to launch your store?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Get a complete e-commerce solution with domain and hosting included.
              No hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/923040260023?text=I%20want%20a%20quote%20for%20Zenixa" target="_blank">
                <Button
                  size="xl"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp us for quote
                </Button>
              </Link>

              <Link href="https://wa.me/923040260023?text=I%20want%20to%20schedule%20a%20call" target="_blank">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800 w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a call
                </Button>
              </Link>

              {onGetStarted && (
                <Button
                  size="xl"
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto"
                  onClick={onGetStarted}
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Direct support: +92 304 026 0023 • info@projekts.pk
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
