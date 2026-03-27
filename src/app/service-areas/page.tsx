import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import { cities } from "@/data/cities";
import { MapPin, Phone, Clock, ArrowRight, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas | Hydra Pest Control Arizona",
  description:
    "Hydra Pest Control serves 3 regions across southeastern Arizona: Gila Valley, White Mountains, and Sierra Vista. 16 cities covered. Free inspections.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas | Hydra Pest Control Arizona",
    description:
      "3 offices serving 16 cities across southeastern Arizona.",
    type: "website",
    images: [{ url: "/images/truck-branded.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | Hydra Pest Control Arizona",
    description: "3 offices, 16 cities, southeastern Arizona.",
    images: ["/images/truck-branded.jpg"],
  },
};

const regions = [
  {
    id: "gila-valley" as const,
    name: "Gila Valley",
    phone: "928-432-6200",
    address: "2158 N Reay Ln Suite 1, Thatcher, AZ 85552",
    mapQuery: "2158+N+Reay+Ln+Suite+1+Thatcher+AZ+85552",
    hours: "Mon-Fri 8-5 \u2022 Sat 9-2",
    description:
      "The Gila Valley stretches along the Gila River corridor at the base of Mount Graham. Irrigated farmland, desert washes, and low-elevation heat create year-round scorpion pressure, aggressive subterranean termite colonies, and seasonal mosquito blooms during monsoon.",
  },
  {
    id: "white-mountains" as const,
    name: "White Mountains",
    phone: "928-457-2481",
    address: "1080 N 16th St Suite 300, Show Low, AZ 85901",
    mapQuery: "1080+N+16th+St+Suite+300+Show+Low+AZ+85901",
    hours: "Mon-Fri 8-5 \u2022 Sat 9-2",
    description:
      "The White Mountains bring cooler temperatures and ponderosa pine forests, but that means rodents seeking warmth in attics, carpenter ants boring into wood-frame and log homes, and spiders thriving in forested environments. Seasonal cabins face unique risks from vacancy.",
  },
  {
    id: "sierra-vista" as const,
    name: "Sierra Vista",
    phone: "520-523-8818",
    address: "4148 Industry Dr Suite 1111, Sierra Vista, AZ 85650",
    mapQuery: "4148+Industry+Dr+Suite+1111+Sierra+Vista+AZ+85650",
    hours: "Mon-Fri 8-5 \u2022 Sat 9-2",
    description:
      "Cochise County spans desert lowlands to mountain foothills along the San Pedro River. Bark scorpions, subterranean termites, Africanized bees, and roof rats are persistent threats. Historic mining towns like Bisbee and Tombstone face unique pest challenges from century-old construction.",
  },
];

export default function ServiceAreasPage() {
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
                name: "Service Areas",
                item: "https://www.hydrapest.com/service-areas",
              },
            ],
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
                <MapPin className="w-5 h-5 text-hydra-cyan" />
                <span className="text-hydra-cyan text-sm font-semibold uppercase tracking-wider">
                  Hydra Pest Control
                </span>
              </div>
              <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight">
                Pest Control Across{" "}
                <span className="text-gradient">Southeastern Arizona</span>
              </h1>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl">
                3 offices, 16 cities, from the desert floor to the mountain
                pines.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* Regions */}
        {regions.map((region, idx) => {
          const regionCities = cities.filter((c) => c.region === region.id);
          return (
            <section
              key={region.id}
              className={`py-16 sm:py-20 ${
                idx % 2 === 0 ? "bg-hydra-white" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Region heading */}
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-6 h-6 text-hydra-teal" />
                  <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-hydra-dark uppercase tracking-wide">
                    {region.name}
                  </h2>
                </div>
                <p className="text-hydra-gray max-w-3xl mb-8 leading-relaxed">
                  {region.description}
                </p>

                {/* Office info + map */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-hydra-dark rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
                    <h3 className="font-[var(--font-heading)] text-xl font-bold text-white uppercase tracking-wide mb-4">
                      {region.name} Office
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-hydra-cyan shrink-0 mt-0.5" />
                        <span className="text-gray-300">{region.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-hydra-cyan shrink-0" />
                        <Link
                          href={`tel:${region.phone.replace(/-/g, "")}`}
                          className="text-white font-semibold hover:text-hydra-cyan transition-colors"
                        >
                          {region.phone}
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-hydra-cyan shrink-0" />
                        <span className="text-gray-300">{region.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-hydra-light">
                    <iframe
                      src={`https://maps.google.com/maps?q=${region.mapQuery}&output=embed`}
                      className="w-full h-64 lg:h-full min-h-[16rem]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${region.name} office location`}
                    />
                  </div>
                </div>

                {/* City cards */}
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide mb-4">
                  Cities We Serve in {region.name}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="group bg-white rounded-xl border border-hydra-light hover:border-hydra-cyan/40 hover:shadow-md hover:shadow-hydra-cyan/5 transition-all duration-300 p-5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide group-hover:text-hydra-teal transition-colors">
                          {city.name}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-hydra-gray group-hover:text-hydra-cyan group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-hydra-gray mb-3">
                        {city.county}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {city.topPests.slice(0, 3).map((pest) => (
                          <span
                            key={pest}
                            className="text-[10px] font-medium text-hydra-navy bg-hydra-mint/60 px-2 py-0.5 rounded-full"
                          >
                            {pest}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section className="bg-hydra-dark py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Don&apos;t See Your City?
            </h2>
            <p className="mt-3 text-gray-400">
              We likely serve your area. Hydra Pest Control covers communities
              throughout Graham, Navajo, Apache, and Cochise counties. Call us to
              check availability.
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
