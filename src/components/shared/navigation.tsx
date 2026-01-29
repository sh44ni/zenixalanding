"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onContactClick?: () => void;
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation({ onContactClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-100"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-slate-900"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className={cn(
                "transition-colors duration-300",
                !isScrolled && "text-slate-900"
              )}>
                Zenixa
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isScrolled
                      ? "text-slate-600 hover:text-primary hover:bg-slate-100"
                      : "text-slate-700 hover:text-primary hover:bg-white/50"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className={cn(
                  "font-medium",
                  isScrolled ? "text-slate-600" : "text-slate-700"
                )}
                onClick={onContactClick}
              >
                Contact Us
              </Button>
              <Button variant="default" onClick={onContactClick}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-slate-900" : "text-slate-900"
                )} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-20 left-0 right-0 bg-white shadow-xl transition-transform duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="container-custom py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 text-lg font-medium text-slate-900 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onContactClick?.();
                }}
              >
                Contact Us
              </Button>
              <Button
                variant="default"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onContactClick?.();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
