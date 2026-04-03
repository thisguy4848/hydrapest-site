import { Star, Quote, ExternalLink } from "lucide-react";
import Link from "next/link";

const reviews: { name: string; location: string; text: string; rating: number }[] = [];

export default function Reviews() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
            What Customers Say
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-hydra-dark mt-3">
            Don&apos;t Take Our Word For It
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-hydra-gray text-lg">
              4.9 Average &bull; Google Reviews
            </span>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-hydra-light rounded-2xl p-6 sm:p-8 relative"
              >
                <Quote className="w-8 h-8 text-hydra-cyan/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-hydra-navy text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-hydra-mint">
                  <p className="font-semibold text-hydra-dark text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-hydra-gray">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-hydra-gray text-lg">Reviews coming soon</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="https://www.google.com/maps/search/Hydra+Pest+Control+Arizona"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-hydra-teal hover:text-hydra-dark font-semibold transition-colors"
          >
            See all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
