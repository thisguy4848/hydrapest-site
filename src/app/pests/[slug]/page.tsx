import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import {
  getAllPests,
  getPestBySlug,
  getAllPestSlugs,
} from "@/data/pests";
import type { PestData } from "@/data/pests";
import { getPostBySlug as getBlogPost } from "@/lib/blog-data";
import {
  Phone,
  Shield,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
} from "lucide-react";

export function generateStaticParams() {
  return getAllPestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pest = getPestBySlug(slug);
  if (!pest) return { title: "Pest Not Found" };

  return {
    title: `${pest.name} Control in Arizona | Hydra Pest Control`,
    description: pest.description,
    alternates: { canonical: `/pests/${pest.slug}` },
    openGraph: {
      title: `${pest.name} Control in Arizona | Hydra Pest Control`,
      description: pest.description,
      type: "article",
      url: `https://www.hydrapest.com/pests/${pest.slug}`,
    },
  };
}

const categoryLabels: Record<PestData["category"], string> = {
  venomous: "Venomous",
  structural: "Structural Pest",
  nuisance: "Nuisance Pest",
  "disease-carrier": "Disease Carrier",
};

const categoryColors: Record<PestData["category"], string> = {
  venomous: "bg-red-100 text-red-700",
  structural: "bg-orange-100 text-orange-700",
  nuisance: "bg-blue-100 text-blue-700",
  "disease-carrier": "bg-purple-100 text-purple-700",
};

const dangerColors: Record<PestData["dangerLevel"], string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

function ComparisonTable({ pest }: { pest: PestData }) {
  if (pest.slug === "termites") {
    return (
      <div className="mt-8 overflow-x-auto">
        <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-hydra-dark mb-4">
          Subterranean vs. Drywood Termites
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-hydra-dark text-white">
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">Subterranean</th>
              <th className="px-4 py-3 text-left font-semibold">Drywood</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Colony Size</td>
              <td className="px-4 py-3">100,000–1,000,000</td>
              <td className="px-4 py-3">1,000–10,000</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Soil Contact</td>
              <td className="px-4 py-3">Required (mud tubes)</td>
              <td className="px-4 py-3">Not required</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Moisture Need</td>
              <td className="px-4 py-3">High (from soil)</td>
              <td className="px-4 py-3">Low (from wood)</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Key Sign</td>
              <td className="px-4 py-3">Mud tubes on foundation</td>
              <td className="px-4 py-3">Frass pellets below kick-out holes</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Swarm Season</td>
              <td className="px-4 py-3">February–May, July–September</td>
              <td className="px-4 py-3">September–November</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Treatment</td>
              <td className="px-4 py-3">Liquid barrier / bait systems</td>
              <td className="px-4 py-3">Localized injection / fumigation</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Damage Speed</td>
              <td className="px-4 py-3">Fast (large colonies)</td>
              <td className="px-4 py-3">Slow (small colonies)</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (pest.slug === "roaches") {
    return (
      <div className="mt-8 overflow-x-auto">
        <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-hydra-dark mb-4">
          German vs. American Cockroaches
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-hydra-dark text-white">
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">German</th>
              <th className="px-4 py-3 text-left font-semibold">American</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Size</td>
              <td className="px-4 py-3">1/2–5/8 inch</td>
              <td className="px-4 py-3">1.5–2 inches</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Color</td>
              <td className="px-4 py-3">Light brown, 2 dark stripes</td>
              <td className="px-4 py-3">Reddish-brown, yellow figure-8</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Habitat</td>
              <td className="px-4 py-3">Indoors only</td>
              <td className="px-4 py-3">Sewers, basements, outdoors</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Flight</td>
              <td className="px-4 py-3">Rarely flies</td>
              <td className="px-4 py-3">Flies short distances</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Reproduction</td>
              <td className="px-4 py-3">300,000 descendants/year</td>
              <td className="px-4 py-3">~800 descendants/year</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Difficulty</td>
              <td className="px-4 py-3">Very hard to eliminate</td>
              <td className="px-4 py-3">Moderate</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (pest.slug === "spiders") {
    return (
      <div className="mt-8 overflow-x-auto">
        <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-hydra-dark mb-4">
          Black Widow vs. Brown Recluse
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-hydra-dark text-white">
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">Black Widow</th>
              <th className="px-4 py-3 text-left font-semibold">Brown Recluse</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Size</td>
              <td className="px-4 py-3">1/2 inch body</td>
              <td className="px-4 py-3">1/4–1/2 inch body</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Color</td>
              <td className="px-4 py-3">Shiny jet-black</td>
              <td className="px-4 py-3">Light to medium brown</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Marking</td>
              <td className="px-4 py-3">Red hourglass (underside)</td>
              <td className="px-4 py-3">Violin shape (top)</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Eyes</td>
              <td className="px-4 py-3">8 eyes</td>
              <td className="px-4 py-3">6 eyes (3 pairs)</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Web</td>
              <td className="px-4 py-3">Irregular, tangled (near ground)</td>
              <td className="px-4 py-3">No prey web (active hunter)</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Venom Type</td>
              <td className="px-4 py-3">Neurotoxin (muscle pain)</td>
              <td className="px-4 py-3">Cytotoxin (tissue damage)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">AZ Prevalence</td>
              <td className="px-4 py-3">Very common statewide</td>
              <td className="px-4 py-3">Less common, southern AZ</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (pest.slug === "rodents") {
    return (
      <div className="mt-8 overflow-x-auto">
        <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-hydra-dark mb-4">
          Roof Rat vs. Pack Rat vs. House Mouse
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-hydra-dark text-white">
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">Roof Rat</th>
              <th className="px-4 py-3 text-left font-semibold">Pack Rat</th>
              <th className="px-4 py-3 text-left font-semibold">House Mouse</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Size</td>
              <td className="px-4 py-3">13–18 in (w/tail)</td>
              <td className="px-4 py-3">12–17 in (w/tail)</td>
              <td className="px-4 py-3">5–7 in (w/tail)</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Tail</td>
              <td className="px-4 py-3">Longer than body, scaly</td>
              <td className="px-4 py-3">Shorter, slightly bushy</td>
              <td className="px-4 py-3">Equal to body, thin</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Entry Point</td>
              <td className="px-4 py-3">Roofline, trees, vents</td>
              <td className="px-4 py-3">Ground level, equipment</td>
              <td className="px-4 py-3">1/4-inch gaps (dime)</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Nesting</td>
              <td className="px-4 py-3">Attics, wall voids</td>
              <td className="px-4 py-3">Middens (stick nests)</td>
              <td className="px-4 py-3">Inside walls, cabinets</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Behavior</td>
              <td className="px-4 py-3">Neophobic (cautious)</td>
              <td className="px-4 py-3">Hoards objects</td>
              <td className="px-4 py-3">Curious, exploratory</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Key Concern</td>
              <td className="px-4 py-3">Wiring damage, disease</td>
              <td className="px-4 py-3">Vehicle wiring, hantavirus</td>
              <td className="px-4 py-3">Contamination, prolific breeding</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (pest.slug === "ants") {
    return (
      <div className="mt-8 overflow-x-auto">
        <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-hydra-dark mb-4">
          Fire Ant vs. Carpenter Ant vs. Harvester Ant
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-hydra-dark text-white">
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">Fire Ant</th>
              <th className="px-4 py-3 text-left font-semibold">Carpenter Ant</th>
              <th className="px-4 py-3 text-left font-semibold">Harvester Ant</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Size</td>
              <td className="px-4 py-3">1/8–1/4 inch</td>
              <td className="px-4 py-3">1/4–1/2 inch</td>
              <td className="px-4 py-3">1/4–1/2 inch</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Color</td>
              <td className="px-4 py-3">Reddish-brown</td>
              <td className="px-4 py-3">Black or black-and-red</td>
              <td className="px-4 py-3">Red to dark brown</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Nest</td>
              <td className="px-4 py-3">Dome soil mounds</td>
              <td className="px-4 py-3">Inside wood (galleries)</td>
              <td className="px-4 py-3">Flat mound, cleared area</td>
            </tr>
            <tr className="border-b border-hydra-light bg-hydra-light/50">
              <td className="px-4 py-3 font-medium">Sting</td>
              <td className="px-4 py-3">Painful, pustules</td>
              <td className="px-4 py-3">Can bite, rarely stings</td>
              <td className="px-4 py-3">Very painful (3.0/4.0)</td>
            </tr>
            <tr className="border-b border-hydra-light">
              <td className="px-4 py-3 font-medium">Damage Type</td>
              <td className="px-4 py-3">Stings, electrical</td>
              <td className="px-4 py-3">Structural (wood)</td>
              <td className="px-4 py-3">Landscape (cleared zones)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Colony Size</td>
              <td className="px-4 py-3">200K–500K</td>
              <td className="px-4 py-3">3K–10K</td>
              <td className="px-4 py-3">5K–15K</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

export default async function PestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pest = getPestBySlug(slug);

  if (!pest) {
    notFound();
  }

  const allPests = getAllPests();
  const relatedPestData = pest.relatedPests
    .map((s) => allPests.find((p) => p.slug === s))
    .filter(Boolean) as PestData[];

  const relatedBlogPosts = pest.relatedBlogSlugs
    .map((s) => getBlogPost(s))
    .filter(Boolean);

  return (
    <>
      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pest.faqs.map((faq) => ({
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
      {/* JSON-LD: BreadcrumbList */}
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
                item: "https://www.hydrapest.com/#pest-library",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: pest.name,
                item: `https://www.hydrapest.com/pests/${pest.slug}`,
              },
            ],
          }),
        }}
      />
      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${pest.name} Control in Arizona`,
            description: pest.description,
            datePublished: "2026-03-27",
            dateModified: "2026-03-27",
            author: {
              "@type": "Organization",
              name: "Hydra Pest Control",
              url: "https://www.hydrapest.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Hydra Pest Control",
              url: "https://www.hydrapest.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.hydrapest.com/pests/${pest.slug}`,
            },
          }),
        }}
      />

      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-hydra-dark relative overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-40" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <Link
              href="/#pest-library"
              className="inline-flex items-center gap-1.5 text-sm text-hydra-cyan hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pest Library
            </Link>

            <div className="flex items-start gap-5 mb-6">
              <span className="text-5xl sm:text-6xl">{pest.image}</span>
              <div>
                <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
                  {pest.name}
                </h1>
                <p className="text-hydra-gray italic mt-1">
                  {pest.scientificName}
                </p>
              </div>
            </div>

            {/* AI-citable definition */}
            <div className="bg-hydra-navy border border-hydra-cyan/20 rounded-2xl p-5 sm:p-6 mb-6">
              <p className="text-gray-200 text-lg leading-relaxed">
                {pest.description}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${dangerColors[pest.dangerLevel]}`}
              >
                {pest.dangerLevel} Danger
              </span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[pest.category]}`}
              >
                {categoryLabels[pest.category]}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-hydra-slate text-gray-300">
                {pest.seasons}
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold px-8 py-3 rounded-full transition-all glow-cyan hover:scale-105"
              >
                <Shield className="w-5 h-5" />
                Get {pest.name} Control
              </Link>
              <Link
                href="tel:8334937229"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-hydra-cyan transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                833-493-7229
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* ── Content + Sidebar ── */}
        <section className="bg-hydra-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-12 lg:gap-16">
              {/* Main content */}
              <article className="flex-1 min-w-0 max-w-3xl">
                {/* Overview */}
                <div className="prose-hydra">
                  <h2 id="overview">Overview</h2>
                  {pest.content.overview.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Identification */}
                <div className="prose-hydra">
                  <h2 id="identification">
                    How to Identify {pest.name}
                  </h2>
                  {pest.content.identification.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Behavior */}
                <div className="prose-hydra">
                  <h2 id="behavior">Behavior &amp; Lifecycle</h2>
                  {pest.content.behavior.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Comparison Table (where applicable) */}
                <ComparisonTable pest={pest} />

                {/* Dangers */}
                <div className="prose-hydra">
                  <h2 id="dangers">Health &amp; Property Risks</h2>
                  {pest.content.dangers.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Prevention */}
                <div className="prose-hydra">
                  <h2 id="prevention">
                    How to Prevent {pest.name} in Arizona
                  </h2>
                  {pest.content.prevention.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Treatment */}
                <div className="prose-hydra">
                  <h2 id="treatment">
                    How Hydra Treats {pest.name}
                  </h2>
                  {pest.content.treatment.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Local Context */}
                <div className="prose-hydra">
                  <h2 id="arizona">{pest.name} in Arizona</h2>
                  {pest.content.localContext.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}

                  {/* Internal links to city pages */}
                  <p className="mt-4">
                    Hydra Pest Control serves communities across Arizona.
                    Learn about pest control in{" "}
                    <Link
                      href="/pest-control-safford-az"
                      className="text-hydra-teal underline underline-offset-2 hover:text-hydra-cyan"
                    >
                      Safford
                    </Link>
                    ,{" "}
                    <Link
                      href="/pest-control-show-low-az"
                      className="text-hydra-teal underline underline-offset-2 hover:text-hydra-cyan"
                    >
                      Show Low
                    </Link>
                    ,{" "}
                    <Link
                      href="/pest-control-sierra-vista-az"
                      className="text-hydra-teal underline underline-offset-2 hover:text-hydra-cyan"
                    >
                      Sierra Vista
                    </Link>
                    , and{" "}
                    <Link
                      href="/pest-control-thatcher-az"
                      className="text-hydra-teal underline underline-offset-2 hover:text-hydra-cyan"
                    >
                      Thatcher
                    </Link>
                    .
                  </p>
                </div>

                {/* ── FAQ Accordion ── */}
                <div className="mt-16">
                  <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide mb-8 pb-3 border-b-2 border-hydra-mint">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {pest.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-white border border-hydra-light rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-hydra-dark hover:text-hydra-teal transition-colors [&::-webkit-details-marker]:hidden">
                          <span>{faq.question}</span>
                          <ChevronRight className="w-5 h-5 shrink-0 text-hydra-gray group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-hydra-gray leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </article>

              {/* ── Sidebar (desktop) ── */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-24">
                  {/* Quick Facts */}
                  <div className="bg-white rounded-2xl border border-hydra-light p-6 mb-6">
                    <h3 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wider mb-4">
                      Quick Facts
                    </h3>
                    <div className="space-y-3">
                      {pest.quickFacts.map((fact) => (
                        <div key={fact.label}>
                          <p className="text-xs text-hydra-gray">
                            {fact.label}
                          </p>
                          <p className="text-sm font-semibold text-hydra-dark">
                            {fact.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning Signs */}
                  <div className="bg-white rounded-2xl border border-hydra-light p-6 mb-6">
                    <h3 className="flex items-center gap-2 font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wider mb-4">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Warning Signs
                    </h3>
                    <ul className="space-y-2">
                      {pest.signs.map((sign) => (
                        <li
                          key={sign}
                          className="flex items-start gap-2 text-sm text-hydra-gray"
                        >
                          <CheckCircle className="w-4 h-4 text-hydra-teal shrink-0 mt-0.5" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Table of Contents */}
                  <div className="bg-white rounded-2xl border border-hydra-light p-6 mb-6">
                    <h3 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wider mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-2">
                      {[
                        { id: "overview", label: "Overview" },
                        {
                          id: "identification",
                          label: `How to Identify ${pest.name}`,
                        },
                        { id: "behavior", label: "Behavior & Lifecycle" },
                        { id: "dangers", label: "Health & Property Risks" },
                        { id: "prevention", label: "Prevention Tips" },
                        {
                          id: "treatment",
                          label: `How Hydra Treats ${pest.name}`,
                        },
                        {
                          id: "arizona",
                          label: `${pest.name} in Arizona`,
                        },
                      ].map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-hydra-gray hover:text-hydra-teal transition-colors leading-snug py-1"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* CTA Card */}
                  <div className="bg-hydra-dark rounded-2xl p-6 text-center">
                    <h3 className="font-[var(--font-heading)] text-lg font-bold text-white uppercase tracking-wide">
                      Need {pest.name} Help?
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Free inspections across all our Arizona service areas.
                    </p>
                    <Link
                      href="/#contact"
                      className="mt-4 inline-block bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold text-sm px-6 py-2.5 rounded-full transition-all glow-cyan hover:scale-105 w-full"
                    >
                      Get a Free Quote
                    </Link>
                    <Link
                      href="tel:8334937229"
                      className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-hydra-cyan transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      833-493-7229
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Related Pests ── */}
        {relatedPestData.length > 0 && (
          <section className="bg-hydra-light py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide text-center mb-10">
                Related Pests
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPestData.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/pests/${related.slug}`}
                    className="group bg-white rounded-2xl border border-hydra-light hover:border-hydra-cyan/40 hover:shadow-lg hover:shadow-hydra-cyan/5 transition-all duration-300 p-6 flex items-start gap-4"
                  >
                    <span className="text-4xl">{related.image}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide group-hover:text-hydra-teal transition-colors">
                        {related.name}
                      </h3>
                      <p className="mt-1 text-sm text-hydra-gray line-clamp-2">
                        {related.description}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-hydra-teal group-hover:text-hydra-cyan transition-colors">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Blog Posts ── */}
        {relatedBlogPosts.length > 0 && (
          <section className="bg-hydra-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide text-center mb-10">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogPosts.map((post) =>
                  post ? (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl border border-hydra-light hover:border-hydra-cyan/40 hover:shadow-lg hover:shadow-hydra-cyan/5 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="bg-hydra-dark px-5 py-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-hydra-cyan uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        <h3 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide leading-snug group-hover:text-hydra-teal transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm text-hydra-gray leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-hydra-teal group-hover:text-hydra-cyan transition-colors">
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="bg-hydra-dark py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="text-5xl mb-4 block">{pest.image}</span>
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Need {pest.name} Control?
            </h2>
            <p className="mt-3 text-gray-400">
              Free inspections. Licensed &amp; insured. Serving Gila Valley,
              White Mountains &amp; Sierra Vista.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold px-8 py-3 rounded-full transition-all glow-cyan hover:scale-105"
              >
                Get a Free Quote
              </Link>
              <Link
                href="tel:8334937229"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-hydra-cyan transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                833-493-7229
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MobileCallBar />
      <Footer />
    </>
  );
}
