"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { Star, Quote, TrendingUp, ShoppingBag, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Founder, Fashion Hub",
    location: "Karachi",
    image: "/testimonials/avatar-1.jpg",
    quote:
      "Zenixa transformed our business. We went from struggling with manual orders to processing 100+ orders daily. The setup was seamless and support was excellent.",
    stats: { orders: "5,000+", revenue: "PKR 8M", growth: "340%" },
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Owner, Organic Essentials",
    location: "Lahore",
    image: "/testimonials/avatar-2.jpg",
    quote:
      "I was hesitant about online selling, but Zenixa made it so easy. Within 24 hours, my store was live and I received my first order the same day!",
    stats: { orders: "2,500+", revenue: "PKR 3.5M", growth: "250%" },
    rating: 5,
  },
  {
    name: "Bilal Ahmed",
    role: "CEO, Tech Gadgets PK",
    location: "Islamabad",
    image: "/testimonials/avatar-3.jpg",
    quote:
      "The one-time payment model is a game-changer. No more worrying about monthly fees eating into our profits. Best decision for our e-commerce journey.",
    stats: { orders: "8,000+", revenue: "PKR 15M", growth: "420%" },
    rating: 5,
  },
  {
    name: "Sara Malik",
    role: "Founder, Handmade Crafts",
    location: "Faisalabad",
    image: "/testimonials/avatar-4.jpg",
    quote:
      "From a small Instagram business to a professional online store - Zenixa helped me scale my craft business beyond what I imagined possible.",
    stats: { orders: "1,800+", revenue: "PKR 2M", growth: "180%" },
    rating: 5,
  },
];

const caseStudies = [
  {
    business: "Fashion Hub",
    industry: "Clothing",
    before: {
      platform: "Instagram Only",
      monthlyOrders: 50,
      revenue: "PKR 150K",
    },
    after: {
      platform: "Zenixa Store",
      monthlyOrders: 400,
      revenue: "PKR 1.2M",
    },
    image: "/case-studies/fashion-hub.jpg",
  },
  {
    business: "Tech Gadgets PK",
    industry: "Electronics",
    before: {
      platform: "Facebook Shop",
      monthlyOrders: 80,
      revenue: "PKR 400K",
    },
    after: {
      platform: "Zenixa Store",
      monthlyOrders: 600,
      revenue: "PKR 3M",
    },
    image: "/case-studies/tech-gadgets.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Trusted by <span className="text-primary">100+ Pakistani</span> Businesses
          </h2>
          <p className="text-lg text-slate-600">
            See how Zenixa has helped businesses across Pakistan launch and grow
            their online presence.
          </p>
        </AnimatedSection>

        {/* Testimonials Carousel */}
        <AnimatedSection delay={200}>
          <div className="max-w-5xl mx-auto px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              autoplay
              autoplayDelay={5000}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="h-full bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100">
                      {/* Quote Icon */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Quote className="w-5 h-5 text-primary" />
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {testimonial.stats.orders}
                          </div>
                          <div className="text-xs text-slate-500">Orders</div>
                        </div>
                        <div className="text-center border-x border-slate-200">
                          <div className="text-lg font-bold text-primary">
                            {testimonial.stats.revenue}
                          </div>
                          <div className="text-xs text-slate-500">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {testimonial.stats.growth}
                          </div>
                          <div className="text-xs text-slate-500">Growth</div>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {testimonial.role} • {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselDots />
            </Carousel>
          </div>
        </AnimatedSection>

        {/* Case Studies */}
        <AnimatedSection delay={400} className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Before & After Results
            </h3>
            <p className="text-slate-600">
              Real transformations from our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{study.business}</h4>
                      <p className="text-sm text-slate-500">{study.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="p-6 bg-red-50">
                    <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">
                      Before
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500">Platform</div>
                        <div className="font-medium text-slate-700">
                          {study.before.platform}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Monthly Orders</div>
                        <div className="font-medium text-slate-700">
                          {study.before.monthlyOrders}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Revenue</div>
                        <div className="font-medium text-slate-700">
                          {study.before.revenue}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="p-6 bg-green-50">
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">
                      After
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500">Platform</div>
                        <div className="font-medium text-slate-700">
                          {study.after.platform}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Monthly Orders</div>
                        <div className="font-bold text-green-600">
                          {study.after.monthlyOrders}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Revenue</div>
                        <div className="font-bold text-green-600">
                          {study.after.revenue}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">
                    {Math.round(
                      ((study.after.monthlyOrders - study.before.monthlyOrders) /
                        study.before.monthlyOrders) *
                        100
                    )}
                    % increase in orders
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
