import { getAllPosts } from "@/lib/blog-data";
import { cities } from "@/data/cities";
import { getAllPestSlugs } from "@/data/pests";

export default function sitemap() {
  const baseUrl = "https://www.hydrapest.com";
  const posts = getAllPosts();
  const pestSlugs = getAllPestSlugs();

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ...pestSlugs.map((slug) => ({
      url: `${baseUrl}/pests/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    ...cities.map((city) => ({
      url: `${baseUrl}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
