import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getCategories } from "@/lib/blog-data";
import MobileCallBar from "@/components/MobileCallBar";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Pest Control Blog | Hydra Pest Control Arizona",
  description:
    "Expert pest control tips, prevention guides, and Arizona-specific pest information from Hydra Pest Control. Scorpions, termites, mosquitoes, bed bugs & more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Pest Control Blog | Hydra Pest Control Arizona",
    description:
      "Expert pest control tips and prevention guides for Arizona homeowners.",
    type: "website",
    url: "https://www.hydrapest.com/blog",
    images: [{ url: "/images/truck-branded.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pest Control Blog | Hydra Pest Control Arizona",
    description: "Expert pest control advice for Arizona homeowners.",
    images: ["/images/truck-branded.jpg"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

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
                name: "Blog",
                item: "https://www.hydrapest.com/blog",
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
                <BookOpen className="w-5 h-5 text-hydra-cyan" />
                <span className="text-hydra-cyan text-sm font-semibold uppercase tracking-wider">
                  Hydra Pest Control Blog
                </span>
              </div>
              <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight">
                Pest Control Tips{" "}
                <span className="text-gradient">&amp; Guides</span>
              </h1>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl">
                Expert advice on protecting your Arizona home and business from
                scorpions, termites, mosquitoes, bed bugs, and more. Written by
                licensed pest control professionals.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* Categories */}
        <section className="bg-hydra-white border-b border-hydra-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-semibold text-hydra-gray uppercase tracking-wider shrink-0">
                Topics:
              </span>
              {categories.map((category) => (
                <span
                  key={category}
                  className="shrink-0 px-3 py-1 text-sm font-medium text-hydra-navy bg-hydra-mint/60 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="bg-hydra-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-hydra-light hover:border-hydra-cyan/40 hover:shadow-lg hover:shadow-hydra-cyan/5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Category bar */}
                  <div className="bg-hydra-dark px-5 py-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-hydra-cyan uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h2 className="font-[var(--font-heading)] text-xl font-bold text-hydra-dark uppercase tracking-wide leading-snug group-hover:text-hydra-teal transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-hydra-gray leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 pt-4 border-t border-hydra-light flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-hydra-gray">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-hydra-teal group-hover:text-hydra-cyan transition-colors">
                        Read
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
              Need Help with a Pest Problem?
            </h2>
            <p className="mt-3 text-gray-400">
              Our licensed technicians serve the Gila Valley, White Mountains,
              and Sierra Vista areas. Free inspections, no pressure.
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
                className="text-white hover:text-hydra-cyan font-semibold transition-colors"
              >
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
