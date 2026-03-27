import Link from "next/link";
import { Phone, ArrowRight, Shield } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hydra-teal to-hydra-cyan" />
      <div className="absolute inset-0 texture-dots opacity-20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-hydra-dark/10 rounded-full px-4 py-1.5 mb-6">
          <Shield className="w-4 h-4 text-hydra-dark" />
          <span className="text-sm font-semibold text-hydra-dark">
            Licensed & Insured &bull; Satisfaction Guaranteed
          </span>
        </div>

        <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-hydra-dark">
          Pests Don&apos;t Wait.
          <br />
          Neither Should You.
        </h2>

        <p className="mt-4 text-hydra-dark/70 text-lg max-w-lg mx-auto">
          Free inspection. Custom treatment plan. We can usually be there
          tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center gap-2 bg-hydra-dark hover:bg-hydra-navy text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-hydra-dark/20"
          >
            Schedule Free Inspection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="tel:8334937229"
            className="inline-flex items-center justify-center gap-2 bg-white/30 hover:bg-white/50 text-hydra-dark font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <Phone className="w-5 h-5" />
            833-493-7229
          </Link>
        </div>
      </div>
    </section>
  );
}
