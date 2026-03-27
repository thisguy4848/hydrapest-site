import { Heart, Users, Truck, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "Locally Rooted",
    text: "Born and raised in Arizona. We came back to protect the communities that raised us.",
  },
  {
    icon: Users,
    title: "Family Operated",
    text: "Your home gets treated like it's our own — because we're your neighbors.",
  },
  {
    icon: Truck,
    title: "3 Locations",
    text: "Gila Valley, White Mountains, and Sierra Vista. We're never far away.",
  },
  {
    icon: Award,
    title: "Advanced Training",
    text: "Experienced across climates — from freezing winters to Arizona's blistering summers.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — image placeholder + trust */}
          <div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-hydra-dark overflow-hidden relative">
                <Image
                  src="/images/truck-tech.jpg"
                  alt="Hydra Pest Control technician with branded truck"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-8 bg-hydra-cyan text-hydra-dark rounded-2xl p-5 shadow-xl">
                <span className="font-[var(--font-heading)] text-3xl font-bold block">
                  10+
                </span>
                <span className="text-sm font-medium">
                  Years
                  <br />
                  Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold uppercase text-hydra-dark mt-3">
              We Grew Up Here.
              <br />
              <span className="text-gradient">We Protect Here.</span>
            </h2>
            <p className="mt-5 text-hydra-gray text-lg leading-relaxed">
              We spent years working pest control in other states. Then we came
              home to Arizona and started doing it right. Hydra Pest Control
              exists because our communities deserve better than watered-down
              products and corner-cutting.
            </p>
            <p className="mt-4 text-hydra-gray leading-relaxed">
              We don&apos;t water down our products to save a buck. We don&apos;t
              cut corners. And we don&apos;t use scare tactics to sell you
              something you don&apos;t need. Your home gets treated like
              it&apos;s our own.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title}>
                    <div className="w-10 h-10 rounded-lg bg-hydra-mint flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-hydra-teal" />
                    </div>
                    <h4 className="font-semibold text-hydra-dark text-sm">
                      {v.title}
                    </h4>
                    <p className="text-xs text-hydra-gray mt-1">{v.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
