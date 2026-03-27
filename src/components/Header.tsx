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
            <div className="flex items-center gap-2">
              <Link
                href="https://www.instagram.com/hydrapestcontrol/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hydra-gray hover:text-hydra-cyan transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@hydrapestcontrol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hydra-gray hover:text-hydra-cyan transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.99-.43V6.69h1.99z"/></svg>
              </Link>
            </div>
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
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/hydra-logo.jpg"
                alt="Hydra Pest Control logo"
                width={180}
                height={60}
                className="h-10 sm:h-12 w-auto"
                priority
              />
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
