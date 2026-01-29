"use client";

import { AnimatedSection } from "@/components/shared/animated-section";

const testimonials = [
  {
    quote: "Increased monthly sales from 50,000 to 1.5 lakh after launching our online store. The system is very stable.",
    author: "Ahmed Khan",
    role: "Clothing Store Owner",
  },
  {
    quote: "Saved 40,000 in first year compared to Shopify. We own the store completely which was important for us.",
    author: "Sara Malik",
    role: "Home Decor Business",
  },
  {
    quote: "Store was live in 2 days, very professional team. They handled the domain setup and hosting for us.",
    author: "Bilal Ahmed",
    role: "Electronics Retailer",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Real Results
          </h2>
          <p className="text-lg text-gray-600">
            Feedback from Pakistani business owners.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="h-full p-6 border border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-800 mb-6 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
