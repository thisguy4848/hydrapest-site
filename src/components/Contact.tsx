"use client";

import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-hydra-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <span className="text-hydra-cyan font-semibold text-sm uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold uppercase mt-3">
              Free Inspection.
              <br />
              <span className="text-gradient">Fast Answer.</span>
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Fill out the form and we&apos;ll call you back today. Or just
              call us now — 833-493-7229.
            </p>

            <div className="space-y-5 mt-10">
              <Link
                href="tel:8334937229"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-hydra-cyan/10 flex items-center justify-center group-hover:bg-hydra-cyan/20 transition-colors">
                  <Phone className="w-5 h-5 text-hydra-cyan" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Toll-Free</p>
                  <p className="font-semibold text-lg group-hover:text-hydra-cyan transition-colors">
                    833-493-7229
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-hydra-cyan/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-hydra-cyan" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Hours</p>
                  <p className="font-semibold">
                    Mon-Fri 8-5 &bull; Sat 9-2
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-hydra-cyan/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-hydra-cyan" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Headquarters</p>
                  <p className="font-semibold">Thatcher, AZ 85552</p>
                </div>
              </div>
            </div>

            {/* Quick call CTA for mobile */}
            <Link
              href="tel:8334937229"
              className="mt-8 w-full sm:w-auto lg:hidden inline-flex items-center justify-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold px-8 py-4 rounded-full transition-all glow-cyan"
            >
              <Phone className="w-5 h-5" />
              Call Now — It&apos;s Free
            </Link>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-hydra-navy rounded-3xl p-8 sm:p-10 border border-hydra-slate">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-hydra-cyan mx-auto mb-4" />
                  <h3 className="font-[var(--font-heading)] text-2xl font-bold uppercase">
                    Request Received
                  </h3>
                  <p className="mt-3 text-gray-400 max-w-sm mx-auto">
                    We&apos;ll be in touch within a few hours. For immediate
                    assistance, call{" "}
                    <Link
                      href="tel:8334937229"
                      className="text-hydra-cyan font-semibold"
                    >
                      833-493-7229
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase mb-6">
                    Request a Free Quote
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-hydra-slate border border-hydra-slate focus:border-hydra-cyan rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-hydra-slate border border-hydra-slate focus:border-hydra-cyan rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-hydra-slate border border-hydra-slate focus:border-hydra-cyan rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{5}"
                        className="w-full bg-hydra-slate border border-hydra-slate focus:border-hydra-cyan rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors"
                        placeholder="85552"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                      What pest issue are you experiencing?
                    </label>
                    <select
                      className="w-full bg-hydra-slate border border-hydra-slate focus:border-hydra-cyan rounded-xl px-4 py-3 text-white outline-none transition-colors"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a pest...
                      </option>
                      <option>Scorpions</option>
                      <option>Termites</option>
                      <option>Mosquitoes</option>
                      <option>Roaches</option>
                      <option>Bed Bugs</option>
                      <option>Spiders</option>
                      <option>Ants</option>
                      <option>Rodents</option>
                      <option>Bees / Wasps</option>
                      <option>Pocket Gophers</option>
                      <option>General Pest Control</option>
                      <option>Commercial Service</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                      Additional Details
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-hydra-slate border border-hydra-slate focus:border-hydra-cyan rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors resize-none"
                      placeholder="Tell us about your pest problem..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold text-base px-8 py-4 rounded-full transition-all duration-200 glow-cyan hover:scale-[1.02]"
                  >
                    Send My Info — Get a Call Today
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    No spam. No obligation. We&apos;ll respond same-day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
