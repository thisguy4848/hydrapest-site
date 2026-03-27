"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Star, Shield, Clock, Award } from "lucide-react";

const stats = [
  { icon: Star, value: "4.9", label: "Google Rating", suffix: "★" },
  { icon: Shield, value: "100%", label: "Satisfaction Guaranteed" },
  { icon: Clock, value: "Same-Day", label: "Service Available" },
  { icon: Award, value: "10+", label: "Years Experience" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hydra-dark text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/truck-branded.jpg"
          alt="Hydra Pest Control branded truck"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-hydra-dark/90 via-hydra-dark/80 to-hydra-dark/50" />
      <div className="absolute inset-0 texture-dots opacity-20" />

      {/* Diagonal accent */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-hydra-white transform -skew-y-2 origin-bottom-right translate-y-12" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-28 sm:pb-36">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-hydra-cyan/10 border border-hydra-cyan/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-hydra-cyan animate-pulse" />
            <span className="text-hydra-cyan text-sm font-medium">
              Locally Owned & Operated in Arizona
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.05]">
            Arizona&apos;s{" "}
            <span className="text-gradient">Toughest</span>
            <br />
            Pest Control
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
            We kill scorpions, termites, and every pest in between. Same-day
            service across Gila Valley, the White Mountains, and Sierra Vista.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold text-base px-8 py-4 rounded-full transition-all duration-200 glow-cyan hover:scale-105"
            >
              Get Your Free Inspection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="tel:8334937229"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              833-493-7229
            </Link>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-white/10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <Icon className="w-4 h-4 text-hydra-cyan" />
                    <span className="font-[var(--font-heading)] font-bold text-xl sm:text-2xl text-white">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-hydra-cyan">{stat.suffix}</span>
                      )}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
