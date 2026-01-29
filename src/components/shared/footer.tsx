"use client";

import Link from "next/link";
import {
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  company: [
    { label: "About Us", href: "https://projekts.pk/about", external: true },
    { label: "Portfolio", href: "https://projekts.pk/portfolio", external: true },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "https://projekts.pk/careers", external: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/projektspk", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/projektspk", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/projektspk", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/projektspk", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Zenixa</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Complete e-commerce solution for Pakistani businesses. Launch your online
              store in 24 hours with one payment and no monthly fees.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-slate-400">
                  Karachi, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+923000000000"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +92 300 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:hello@projekts.pk"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  hello@projekts.pk
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="https://projekts.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  projekts.pk
                </a>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-400 text-center md:text-left">
              <p>
                &copy; {currentYear} Zenixa. All rights reserved.
              </p>
              <p className="mt-1">
                Powered by{" "}
                <a
                  href="https://projekts.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-400 font-medium transition-colors"
                >
                  Projekts Vision (Private) Limited
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
