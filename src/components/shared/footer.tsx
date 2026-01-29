"use client";

import Link from "next/link";
import { ShoppingBag, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Zenixa
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Complete e-commerce solution for Pakistan. One payment, lifetime ownership.
            </p>
            <div className="pt-2">
              <a
                href="https://projekts.pk"
                target="_blank"
                className="text-xs text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                A product by Projekts Vision
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="https://demo.zenixa.pk" target="_blank" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Live Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Karachi, Pakistan</span>
              </li>
              <li>
                <a href="mailto:info@projekts.pk" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                  info@projekts.pk
                </a>
              </li>
              <li>
                <a href="https://wa.me/923040260023" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  +92 304 026 0023
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Zenixa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">
              SECP Registration: 0381859
            </span>
            <Link href="/refund" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
