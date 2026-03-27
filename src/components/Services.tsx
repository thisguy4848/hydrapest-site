"use client";

import {
  Home,
  Building2,
  Bug,
  ArrowRight,
  ShieldCheck,
  Zap,
  Leaf,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Residential",
    image: "/images/truck-residential.jpg",
    imageAlt: "Hydra Pest Control residential home treatment in Arizona",
    description:
      "Custom pest programs built for your home and your family. Our treatments keep working for months after we leave — not days. We use controlled-release formulations that other companies don't carry.",
    features: [
      "Custom treatment plans",
      "Pet & family safe",
      "Recurring programs",
    ],
  },
  {
    icon: Building2,
    title: "Commercial",
    image: "/images/restaurant.jpg",
    imageAlt: "Commercial pest control service for restaurant in Arizona",
    description:
      "Discreet, professional pest management for restaurants, hotels, schools, healthcare, retail, and industrial facilities. Detailed reporting and flexible scheduling to minimize disruption.",
    features: [
      "Detailed reporting",
      "Flexible scheduling",
      "Industry compliance",
    ],
  },
  {
    icon: Bug,
    title: "Termite Control",
    image: "/images/termite-treatment.jpg",
    imageAlt: "Professional termite treatment and foundation inspection",
    description:
      "Pre-construction and post-construction treatments, drywood termite service, carpenter ant elimination, and certified Wood Destroying Inspections (WDIIR / NPMA-33).",
    features: ["5-year warranty", "WDO inspections", "Pre & post-construction"],
  },
  {
    icon: Bug,
    title: "Specialty Services",
    image: "/images/aerial-property.jpg",
    imageAlt: "Aerial view of Arizona property for pest assessment",
    description:
      "Targeted solutions for scorpions, bed bugs, bees, mosquitoes, pocket gophers, and more. We use professional-grade products — never watered down.",
    features: ["Scorpion control", "Bed bug treatment", "Bee removal"],
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Guaranteed Results",
    text: "If pests return between treatments, so do we — at no extra cost.",
  },
  {
    icon: Zap,
    title: "iCap Technology",
    text: "Controlled-release microcaps that keep working for months, not days.",
  },
  {
    icon: Leaf,
    title: "Pet & Family Safe",
    text: "Professional-grade products that are tough on pests, safe for your family.",
  },
  {
    icon: RotateCcw,
    title: "No Shortcuts",
    text: "No watered-down products. No skipped services. No scare tactics.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-hydra-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-hydra-dark mt-3">
            Every Pest. Every Property.
          </h2>
          <p className="mt-4 text-hydra-gray text-lg">
            Recurring plans that keep pests out. One-time treatments that
            solve the problem. Your call.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white rounded-2xl overflow-hidden border border-hydra-light hover:border-hydra-cyan/30 transition-all duration-300 hover:shadow-xl hover:shadow-hydra-cyan/5"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hydra-dark/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-hydra-cyan/90 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-hydra-dark" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-hydra-gray leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 text-xs font-medium bg-hydra-light text-hydra-teal px-3 py-1 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Differentiators */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-hydra-dark mx-auto flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-hydra-cyan" />
                </div>
                <h4 className="font-[var(--font-heading)] font-bold uppercase text-hydra-dark">
                  {d.title}
                </h4>
                <p className="mt-2 text-sm text-hydra-gray">{d.text}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 text-hydra-teal font-semibold hover:text-hydra-dark transition-colors"
          >
            Get a free quote for your property
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
