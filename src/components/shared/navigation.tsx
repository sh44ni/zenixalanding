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
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

interface NavigationProps {
  hasAnnouncement?: boolean;
}

export function Navigation({ hasAnnouncement = false }: NavigationProps) {
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
        "fixed left-0 right-0 z-50 transition-all duration-300",
        hasAnnouncement ? "top-9" : "top-0",
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3" : "bg-white/80 backdrop-blur-sm py-4"
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
                pathname === link.href ? "text-gray-900" : "text-gray-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://demo.zenixa.pk" target="_blank" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Live Demo
          </Link>
          {isLoggedIn ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-50"
            >
              <Link href="/account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-50"
            >
              <Link href="/auth/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
          <Button asChild size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href="https://wa.me/923040260023" target="_blank">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
          <nav className="container-custom py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 transition-colors",
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
              className="text-base font-medium text-gray-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Demo
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              {isLoggedIn ? (
                <Button asChild variant="outline" className="w-full justify-center">
                  <Link href="/account">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full justify-center">
                  <Link href="/auth/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
              <Button asChild className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                <Link href="https://wa.me/923040260023" target="_blank">
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
