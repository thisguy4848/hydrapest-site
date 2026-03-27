import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-data";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
} from "lucide-react";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Hydra Pest Control Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /<h2>(.*?)<\/h2>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}

function addHeadingIds(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_match, content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h2 id="${id}">${content}</h2>`;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);
  const headings = extractHeadings(post.content);
  const contentWithIds = addHeadingIds(post.content);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-hydra-dark relative overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-40" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-hydra-cyan hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold text-hydra-dark bg-hydra-cyan rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-hydra-slate rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-hydra-cyan" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {post.author}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* Content + Sidebar */}
        <section className="bg-hydra-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-12 lg:gap-16">
              {/* Main content */}
              <article
                className="flex-1 min-w-0 max-w-3xl prose-hydra"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* Sidebar - desktop only */}
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-24">
                  {/* Table of Contents */}
                  {headings.length > 0 && (
                    <div className="bg-white rounded-2xl border border-hydra-light p-6 mb-6">
                      <h3 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wider mb-4">
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        {headings.map((heading) => (
                          <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            className="block text-sm text-hydra-gray hover:text-hydra-teal transition-colors leading-snug py-1"
                          >
                            {heading.text}
                          </a>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* CTA Card */}
                  <div className="bg-hydra-dark rounded-2xl p-6 text-center">
                    <h3 className="font-[var(--font-heading)] text-lg font-bold text-white uppercase tracking-wide">
                      Need Pest Help?
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

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-hydra-light py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide text-center mb-10">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-2xl border border-hydra-light hover:border-hydra-cyan/40 hover:shadow-lg hover:shadow-hydra-cyan/5 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="bg-hydra-dark px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-hydra-cyan uppercase tracking-wider">
                        {related.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {related.readTime}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide leading-snug group-hover:text-hydra-teal transition-colors">
                        {related.title}
                      </h3>
                      <p className="mt-3 text-sm text-hydra-gray leading-relaxed flex-1 line-clamp-3">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-hydra-teal group-hover:text-hydra-cyan transition-colors">
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mobile CTA */}
        <section className="bg-hydra-dark py-12 lg:hidden">
          <div className="max-w-md mx-auto px-4 text-center">
            <h2 className="font-[var(--font-heading)] text-xl font-bold text-white uppercase tracking-wide">
              Need Help with Pests?
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Free inspections. Licensed &amp; insured.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-block bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold px-8 py-3 rounded-full transition-all glow-cyan"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
