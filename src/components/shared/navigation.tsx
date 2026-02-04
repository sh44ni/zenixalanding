"use client";
// force-sync

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";



const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/logo_logoforlightbg.svg"
            alt="Zenixa"
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gray-900",
                pathname === link.href ? "text-gray-900" : "text-gray-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://demo.zenixa.pk" target="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Live Demo
          </Link>
          {isLoggedIn ? (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="rounded-lg px-5 h-9"
            >
              <Link href="/account" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Account
              </Link>
            </Button>
          ) : (
            <Button
              size="sm"
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-5 h-9"
            >
              <Link href="/account/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg md:hidden animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-gray-50",
                  pathname === link.href ? "text-gray-900" : "text-gray-600"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://demo.zenixa.pk"
              target="_blank"
              className="text-base font-medium py-2 text-gray-600 border-b border-gray-50"
            >
              Live Demo
            </Link>
            {isLoggedIn ? (
              <Button
                className="w-full"
                variant="outline"
                asChild
              >
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  My Account
                </Link>
              </Button>
            ) : (
              <Button
                className="w-full bg-gray-900 text-white mt-2"
                asChild
              >
                <Link href="/account/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export { Navigation as Header };
