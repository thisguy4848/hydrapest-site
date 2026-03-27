import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import { getAllPests } from "@/data/pests";
import { Bug, ArrowRight, Shield, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Arizona Pest Library | Hydra Pest Control",
  description:
    "Complete guide to Arizona pests. Scorpions, termites, mosquitoes, bed bugs, spiders, rodents & more. Identification, prevention, and professional treatment.",
  alternates: { canonical: "/pests" },
  openGraph: {
    title: "Arizona Pest Library | Hydra Pest Control",
    description:
      "Complete guide to Arizona pests. Identification, prevention, and treatment.",
    type: "website",
    images: [{ url: "/images/truck-branded.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizona Pest Library | Hydra Pest Control",
    description: "Complete guide to Arizona pests.",
    images: ["/images/truck-branded.jpg"],
  },
};

const categoryLabels: Record<string, string> = {
  venomous: "Venomous",
  structural: "Structural",
  "disease-carrier": "Disease-Carrier",
  nuisance: "Nuisance",
};

const dangerColors: Record<string, string> = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
};

const categoryColors: Record<string, string> = {
  venomous: "bg-red-500/10 text-red-300",
  structural: "bg-amber-500/10 text-amber-300",
  "disease-carrier": "bg-purple-500/10 text-purple-300",
  nuisance: "bg-blue-500/10 text-blue-300",
};

export default function PestsPage() {
  const pests = getAllPests();
  const categories = [...new Set(pests.map((p) => p.category))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.hydrapest.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Pest Library",
                item: "https://www.hydrapest.com/pests",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Arizona Pest Library",
            description:
              "Complete guide to Arizona pests — identification, prevention, and professional treatment.",
            numberOfItems: pests.length,
            itemListElement: pests.map((pest, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: pest.name,
              url: `https://www.hydrapest.com/pests/${pest.slug}`,
            })),
          }),
        }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-hydra-dark relative overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Bug className="w-5 h-5 text-hydra-cyan" />
                <span className="text-hydra-cyan text-sm font-semibold uppercase tracking-wider">
                  Hydra Pest Control
                </span>
              </div>
              <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight">
                Arizona{" "}
                <span className="text-gradient">Pest Library</span>
              </h1>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl">
                Identification, prevention tips, and professional treatment for
                every pest in southeastern Arizona.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* Category filter */}
        <section className="bg-hydra-white border-b border-hydra-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-semibold text-hydra-gray uppercase tracking-wider shrink-0">
                Categories:
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="shrink-0 px-3 py-1 text-sm font-medium text-hydra-navy bg-hydra-mint/60 rounded-full"
                >
                  {categoryLabels[cat] || cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pest grid */}
        <section className="bg-hydra-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pests.map((pest) => (
                <Link
                  key={pest.slug}
                  href={`/pests/${pest.slug}`}
                  className="group bg-white rounded-2xl border border-hydra-light hover:border-hydra-cyan/40 hover:shadow-lg hover:shadow-hydra-cyan/5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Emoji + category bar */}
                  <div className="bg-hydra-dark px-5 py-5 flex items-center justify-between">
                    <span className="text-4xl" role="img" aria-label={pest.name}>
                      {pest.image}
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${dangerColors[pest.dangerLevel]}`}
                      >
                        {pest.dangerLevel} Risk
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[pest.category]}`}
                      >
                        {categoryLabels[pest.category]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-[var(--font-heading)] text-xl font-bold text-hydra-dark uppercase tracking-wide leading-snug group-hover:text-hydra-teal transition-colors">
                      {pest.name}
                    </h2>
                    <p className="text-xs italic text-hydra-gray mt-0.5">
                      {pest.scientificName}
                    </p>

                    <p className="mt-3 text-sm text-hydra-gray leading-relaxed flex-1 line-clamp-3">
                      {pest.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-hydra-gray">
                      <Shield className="w-3 h-3 text-hydra-teal" />
                      {pest.seasons}
                    </div>

                    <div className="mt-4 pt-3 border-t border-hydra-light flex items-center justify-end">
                      <span className="flex items-center gap-1 text-sm font-semibold text-hydra-teal group-hover:text-hydra-cyan transition-colors">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-hydra-dark py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Need Help Identifying a Pest?
            </h2>
            <p className="mt-3 text-gray-400">
              Our licensed technicians can identify any pest and recommend the
              right treatment. Free inspections across all three service areas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold px-8 py-3 rounded-full transition-all glow-cyan hover:scale-105"
              >
                Get a Free Quote
              </Link>
              <Link
                href="tel:8334937229"
                className="flex items-center gap-2 text-white hover:text-hydra-cyan font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call 833-493-7229
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
