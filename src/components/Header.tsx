"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Menu,
  X,
  Shield,
  Bug,
  MapPin,
  Users,
  MessageSquare,
  Home,
} from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services", icon: Bug },
  { href: "#pest-library", label: "Pest Library", icon: Bug },
  { href: "#about", label: "About", icon: Users },
  { href: "#areas", label: "Service Areas", icon: MapPin },
  { href: "/blog", label: "Blog", icon: MessageSquare },
  { href: "#contact", label: "Contact", icon: MessageSquare },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-hydra-dark text-white text-xs sm:text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-hydra-cyan" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-hydra-cyan" />
              3 Locations Across Arizona
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-hydra-gray">
              Mon-Fri 8-5 &bull; Sat 9-2
            </span>
            <Link
              href="https://hydra.pestportals.com/landing/index"
              className="text-hydra-cyan hover:text-white transition-colors"
            >
              Customer Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-hydra-dark/5"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/images/favicon-full.png"
                alt="Hydra Pest Control logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
              />
              <div className="hidden sm:block">
                <span className="font-[var(--font-heading)] font-bold text-hydra-dark text-xl tracking-wide uppercase">
                  Hydra
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-hydra-gray -mt-1">
                  Pest Control
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-hydra-navy hover:text-hydra-teal transition-colors rounded-lg hover:bg-hydra-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA cluster */}
            <div className="flex items-center gap-3">
              <Link
                href="tel:8334937229"
                className="hidden sm:flex items-center gap-2 text-hydra-dark font-semibold text-sm"
              >
                <div className="relative">
                  <Phone className="w-4 h-4 text-hydra-teal" />
                </div>
                <span className="hidden md:inline">833-493-7229</span>
              </Link>

              <Link
                href="#contact"
                className="bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 glow-cyan hover:scale-105"
              >
                Free Quote
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-hydra-light transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-hydra-light">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-hydra-navy hover:bg-hydra-light transition-colors"
                  >
                    <Icon className="w-5 h-5 text-hydra-teal" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              <Link
                href="tel:8334937229"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-hydra-dark text-white mt-3"
              >
                <Phone className="w-5 h-5 text-hydra-cyan" />
                <span className="font-semibold">Call 833-493-7229</span>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
