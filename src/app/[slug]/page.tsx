import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import Contact from "@/components/Contact";
import { cities, getCityBySlug } from "@/data/cities";
import {
  Phone,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  Bug,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";

export function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Page Not Found" };

  const title = `Pest Control ${city.name}, AZ | Hydra Pest Control`;
  const description = `Professional pest control in ${city.name}, Arizona. ${city.topPests.slice(0, 3).join(", ")} & more. Licensed & insured. Free inspections. Call ${city.phone}.`;

  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Hydra Pest Control",
      url: `https://www.hydrapest.com/${city.slug}`,
      images: [{ url: "/images/truck-branded.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const pestSlugMap: Record<string, string> = {
  "Bark Scorpions": "scorpions",
  "Subterranean Termites": "termites",
  "Black Widows": "spiders",
  "Mosquitoes": "mosquitoes",
  "Roof Rats": "rodents",
  "Pack Rats": "rodents",
  "Africanized Bees": "bees",
  "Paper Wasps": "wasps",
  "German Cockroaches": "roaches",
  "Carpenter Ants": "ants",
  "Fire Ants": "ants",
  "Harvester Ants": "ants",
  "Brown Dog Ticks": "ticks",
  "Wolf Spiders": "spiders",
  "Mice": "rodents",
  "Pocket Gophers": "pocket-gophers",
  "Bed Bugs": "bed-bugs",
  "Kissing Bugs": "roaches",
  "Brown Recluse Spiders": "spiders",
  "Centipedes": "scorpions",
  "Desert Hairy Scorpions": "scorpions",
};

const pestDescriptions: Record<string, string> = {
  "Bark Scorpions": "Arizona's most venomous scorpion. Hides in shoes, bedding, and wall voids. Professional perimeter treatments create a lethal barrier.",
  "Subterranean Termites": "Colony-based wood destroyers that tunnel through soil to reach your home's foundation. Cause billions in U.S. damage annually.",
  "Black Widows": "Venomous spiders found in garages, meter boxes, and woodpiles. Bites require medical attention, especially for children and elderly.",
  "Mosquitoes": "Breed in standing water and transmit West Nile virus. Professional larvicide and barrier treatments reduce populations by up to 90%.",
  "Roof Rats": "Agile climbers that nest in attics, chew wiring, and contaminate food. Require professional trapping and exclusion to eliminate.",
  "Ants": "Fire ants, harvester ants, and carpenter ants invade kitchens, damage lawns, and can even compromise structural wood.",
  "Carpenter Ants": "Large ants that excavate galleries in moist or damaged wood. Don't eat wood — but the structural damage rivals termites.",
  "Rodents": "Mice and packrats enter through gaps as small as a dime. They chew wiring (fire risk), contaminate food, and carry disease.",
  "Spiders": "Wolf spiders, brown recluses, and other species enter homes at ground level. Professional treatment targets entry points and harborage.",
  "Wolf Spiders": "Large, ground-hunting spiders common in forested areas. Not medically dangerous but alarming when found indoors.",
  "Wasps": "Paper wasps and yellow jackets build nests under eaves, in wall voids, and in ground burrows. Stings can trigger severe allergic reactions.",
  "Kissing Bugs": "Blood-feeding insects that emerge at night from packrat nests. Bites cause severe allergic reactions and can transmit Chagas disease.",
  "Crickets": "Swarm homes during monsoon season by the thousands. Damage fabrics, create noise, and attract other predator pests.",
  "Cockroaches": "German cockroaches breed rapidly in kitchens and bathrooms. Carry bacteria, trigger asthma, and are extremely difficult to eliminate without professional treatment.",
  "Africanized Bees": "Aggressive bee colonies that nest in walls, water meters, and abandoned structures. Swarm defensively and require professional removal.",
  "Earwigs": "Moisture-loving insects that invade basements and crawl spaces in large numbers during monsoon season.",
  "Stink Bugs": "Congregate on warm south-facing walls in fall and invade homes through window gaps. Release foul odor when crushed.",
  "Boxelder Bugs": "Swarm south-facing walls and windows in fall seeking warmth. Harmless but a major nuisance in large numbers.",
  "Bed Bugs": "Hitchhiking insects that infest mattresses and furniture. Require professional heat treatment or targeted chemical applications to eliminate.",
  "Fire Ants": "Aggressive stinging ants that build mounds in lawns and near foundations. Painful stings, especially dangerous for children and pets.",
};

const services = [
  { name: "Scorpion Control", description: "Targeted perimeter treatments and home sealing to eliminate scorpions" },
  { name: "Termite Treatment", description: "Pre- and post-construction treatments, WDI inspections, and monitoring" },
  { name: "Residential Programs", description: "Monthly and bi-monthly plans that create a continuous pest barrier" },
  { name: "Commercial Pest Control", description: "Discreet, code-compliant service for restaurants, hotels, and offices" },
  { name: "Bed Bug Treatment", description: "Professional heat and chemical treatments for complete bed bug elimination" },
  { name: "Rodent Exclusion", description: "Trapping, removal, and structural sealing to keep rodents out permanently" },
  { name: "Bee Removal", description: "Safe removal of Africanized and honey bee colonies from structures" },
  { name: "Mosquito Control", description: "Larvicide and barrier sprays that reduce mosquito populations up to 90%" },
];

function getFaqs(city: { name: string; topPests: string[]; phone: string; elevation: string; region: string }) {
  const regionName = city.region === "gila-valley" ? "Gila Valley" : city.region === "white-mountains" ? "White Mountains" : "Sierra Vista area";
  const isHighElevation = parseInt(city.elevation.replace(/,/g, "")) > 5000;

  return [
    {
      question: `How much does pest control cost in ${city.name}?`,
      answer: `Residential pest control in ${city.name} typically costs $40-$70 per month on a recurring plan. One-time treatments range from $150-$300 depending on the pest and severity. Termite treatments cost $800-$2,500 depending on the method and structure size. Hydra Pest Control offers free inspections and custom quotes for ${city.name} homes — call ${city.phone} for pricing specific to your situation.`,
    },
    {
      question: `What are the most common pests in ${city.name}, AZ?`,
      answer: `The most common pests in ${city.name} are ${city.topPests.join(", ")}. ${isHighElevation ? `At ${city.elevation} elevation, ${city.name} sees more rodent and carpenter ant activity than lower-elevation Arizona cities.` : `At ${city.elevation} elevation in the ${regionName}, ${city.name} deals with year-round scorpion and termite pressure due to warm soil temperatures.`} Seasonal monsoon moisture increases activity for many of these species during summer months.`,
    },
    {
      question: `Do I need termite treatment in ${city.name}?`,
      answer: `${isHighElevation ? `While termite pressure in ${city.name} is lower than in desert communities, subterranean termites are still present at ${city.elevation} and can damage homes — especially those with wood-to-soil contact or moisture issues.` : `Yes — ${city.name} has significant termite pressure. The warm temperatures and monsoon moisture at ${city.elevation} create ideal conditions for subterranean termite colonies.`} Hydra Pest Control recommends annual termite inspections for all ${city.name} homeowners and provides certified Wood Destroying Insect Reports (WDIIR) for real estate transactions.`,
    },
    {
      question: `How often should I get pest control in ${city.name}?`,
      answer: `Most ${city.name} homes benefit from monthly or bi-monthly pest control treatments due to the ${isHighElevation ? "seasonal rodent invasions and year-round carpenter ant activity" : "year-round scorpion and termite pressure"} in the ${regionName}. Consistent service creates a chemical barrier that prevents infestations before they start. Quarterly plans work for some lower-risk properties, but our technicians will recommend the right schedule based on your specific ${city.name} property after a free inspection.`,
    },
    {
      question: `Does Hydra Pest Control serve ${city.name}?`,
      answer: `Yes — Hydra Pest Control has a dedicated ${regionName} office and serves ${city.name} and surrounding communities. Our local technicians live and work in the area, so they understand the specific pest challenges that ${city.name} homeowners face at ${city.elevation} elevation. Call ${city.phone} for same-day service in ${city.name}.`,
    },
  ];
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const faqs = getFaqs(city);
  const regionName = city.region === "gila-valley" ? "Gila Valley" : city.region === "white-mountains" ? "White Mountains" : "Sierra Vista";
  const phoneDigits = city.phone.replace(/-/g, "");

  return (
    <>
      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PestControlService",
            name: `Hydra Pest Control — ${city.name}`,
            description: `Professional pest control serving ${city.name}, Arizona. ${city.topPests.slice(0, 3).join(", ")} & more. Licensed & insured.`,
            telephone: `+1${phoneDigits}`,
            url: `https://www.hydrapest.com/${city.slug}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: city.address.split(",")[0],
              addressLocality: city.address.split(",")[1]?.trim().split(" ")[0] || city.name,
              addressRegion: "AZ",
              postalCode: city.address.match(/\d{5}/)?.[0] || "",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: city.lat,
              longitude: city.lng,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "17:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "14:00",
              },
            ],
            areaServed: {
              "@type": "City",
              name: `${city.name}, AZ`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              ratingCount: "150",
            },
          }),
        }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
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
                name: `Pest Control ${city.name}, AZ`,
                item: `https://www.hydrapest.com/${city.slug}`,
              },
            ],
          }),
        }}
      />

      <Header />
      <main>
        {/* ───── HERO ───── */}
        <section className="bg-hydra-dark relative overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-40" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <span className="inline-block text-hydra-cyan font-semibold text-sm uppercase tracking-widest mb-4">
              {regionName} Office &bull; {city.county}
            </span>
            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight">
              Pest Control in{" "}
              <span className="text-gradient">{city.name}, Arizona</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {city.heroText}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold text-lg px-8 py-4 rounded-full transition-all duration-200 glow-cyan hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call {city.phone}
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-hydra-slate hover:bg-hydra-navy text-white font-semibold text-lg px-8 py-4 rounded-full border border-hydra-cyan/20 transition-all duration-200"
              >
                Free Inspection
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* ───── TRUST BAR ───── */}
        <section className="bg-white border-b border-hydra-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Shield, label: "Licensed & Insured" },
                { icon: Clock, label: "Same-Day Service" },
                { icon: Star, label: "Satisfaction Guaranteed" },
                { icon: CheckCircle, label: "10+ Years Experience" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-2">
                  <item.icon className="w-5 h-5 text-hydra-teal shrink-0" />
                  <span className="text-sm font-semibold text-hydra-dark">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── LOCAL CONTEXT ───── */}
        <section className="py-16 sm:py-20 bg-hydra-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <div className="lg:col-span-3">
                <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
                  Local Expertise
                </span>
                <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-hydra-dark mt-3">
                  Pest Control Built for {city.name}
                </h2>
                <p className="mt-5 text-hydra-gray leading-relaxed text-lg">
                  {city.localContext}
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-hydra-light shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-hydra-dark flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-hydra-cyan" />
                    </div>
                    <h3 className="font-[var(--font-heading)] text-lg font-bold uppercase text-hydra-dark">
                      {regionName} Office
                    </h3>
                  </div>
                  <p className="text-sm text-hydra-gray mb-1">{city.address}</p>
                  <Link
                    href={`tel:${phoneDigits}`}
                    className="inline-flex items-center gap-1.5 text-hydra-teal font-semibold text-sm mb-4"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {city.phone}
                  </Link>
                  <div className="pt-4 border-t border-hydra-light">
                    <p className="text-xs text-hydra-gray">
                      <span className="font-semibold text-hydra-dark">Hours:</span>{" "}
                      Mon-Fri 8am-5pm &bull; Sat 9am-2pm
                    </p>
                    <p className="text-xs text-hydra-gray mt-1">
                      <span className="font-semibold text-hydra-dark">Serving:</span>{" "}
                      {city.name}, {city.county}, AZ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── TOP PESTS ───── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
                Know Your Enemy
              </span>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-hydra-dark mt-3">
                Common Pests in {city.name}
              </h2>
              <p className="mt-4 text-hydra-gray text-lg">
                {city.pestContext}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {city.topPests.map((pest, i) => {
                const slug = pestSlugMap[pest];
                const card = (
                  <div
                    className="bg-hydra-light rounded-2xl p-6 border border-hydra-light hover:border-hydra-cyan/30 transition-all hover:shadow-lg hover:shadow-hydra-cyan/5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-hydra-dark flex items-center justify-center">
                        <Bug className="w-4 h-4 text-hydra-cyan" />
                      </div>
                      <div>
                        <span className="text-xs text-hydra-teal font-semibold">#{i + 1} in {city.name}</span>
                        <h3 className="font-[var(--font-heading)] text-base font-bold uppercase text-hydra-dark leading-tight">
                          {pest}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-hydra-gray leading-relaxed">
                      {pestDescriptions[pest] || "Professional treatment recommended for effective control."}
                    </p>
                  </div>
                );
                return slug ? (
                  <Link key={pest} href={`/pests/${slug}`}>
                    {card}
                  </Link>
                ) : (
                  <div key={pest}>{card}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── SERVICES GRID ───── */}
        <section className="py-16 sm:py-20 bg-hydra-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
                What We Do
              </span>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-hydra-dark mt-3">
                Pest Control Services in {city.name}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white rounded-xl p-5 border border-hydra-light"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-hydra-teal shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-hydra-dark text-sm">{service.name}</h3>
                      <p className="text-xs text-hydra-gray mt-1 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
                FAQ
              </span>
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-hydra-dark mt-3">
                Pest Control Questions in {city.name}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-hydra-light rounded-xl border border-hydra-light hover:border-hydra-cyan/30 transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-semibold text-hydra-dark text-base pr-4">{faq.question}</h3>
                    <ChevronDown className="w-5 h-5 text-hydra-gray shrink-0 group-open:hidden" />
                    <ChevronUp className="w-5 h-5 text-hydra-teal shrink-0 hidden group-open:block" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-hydra-gray leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───── NEARBY SERVICE AREAS ───── */}
        <section className="py-12 bg-hydra-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-[var(--font-heading)] text-xl font-bold uppercase text-hydra-dark mb-4">
              Nearby Service Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.filter(c => c.region === city.region && c.slug !== city.slug).map(c => (
                <Link key={c.slug} href={`/${c.slug}`} className="text-sm bg-white text-hydra-navy px-4 py-2.5 rounded-full hover:bg-hydra-cyan/20 hover:text-hydra-teal transition-colors border border-hydra-light">
                  Pest Control in {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="py-16 sm:py-20 bg-hydra-dark text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
              Ready for Pest-Free Living in{" "}
              <span className="text-gradient">{city.name}?</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Free inspections. Same-day service. Licensed &amp; insured technicians who know {city.name}.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold text-lg px-8 py-4 rounded-full transition-all duration-200 glow-cyan hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call {city.phone}
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-hydra-slate hover:bg-hydra-navy text-white font-semibold text-lg px-8 py-4 rounded-full border border-hydra-cyan/20 transition-all duration-200"
              >
                Request Free Inspection
              </Link>
            </div>
          </div>
        </section>

        {/* ───── CONTACT FORM ───── */}
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
