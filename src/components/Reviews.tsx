import { Star, Quote, ExternalLink } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    name: "Sarah M.",
    location: "Thatcher, AZ",
    text: "Hydra solved our scorpion problem when two other companies couldn't. Haven't seen one in months. Professional and thorough every visit.",
    rating: 5,
  },
  {
    name: "Mike & Linda R.",
    location: "Show Low, AZ",
    text: "They found termite damage our inspector missed. Treated the whole house and gave us a 5-year warranty. Can't recommend them enough.",
    rating: 5,
  },
  {
    name: "Desert Sun Restaurant",
    location: "Sierra Vista, AZ",
    text: "Discreet, reliable, and always on schedule. Hydra handles our commercial pest control so we can focus on our customers. A+ service.",
    rating: 5,
  },
  {
    name: "James T.",
    location: "Safford, AZ",
    text: "Honest company. They told me I didn't need the more expensive treatment, saved me money, and the basic plan worked perfectly.",
    rating: 5,
  },
  {
    name: "Cathy W.",
    location: "Pinetop, AZ",
    text: "The bed bug situation was embarrassing, but the Hydra team was discreet and compassionate. Problem solved in two visits.",
    rating: 5,
  },
  {
    name: "Tom B.",
    location: "Willcox, AZ",
    text: "Pocket gophers were destroying my yard. Hydra got rid of them and my lawn actually recovered. Worth every penny.",
    rating: 5,
  },
];

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
