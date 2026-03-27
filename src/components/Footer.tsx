import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-hydra-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/favicon-full.png"
                alt="Hydra Pest Control logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <span className="font-[var(--font-heading)] font-bold text-lg tracking-wide uppercase">
                  Hydra
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-gray-400 -mt-0.5">
                  Pest Control
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Arizona&apos;s trusted pest control experts. Locally owned,
              professionally operated. Protecting homes and businesses since day
              one.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Shield className="w-4 h-4 text-hydra-cyan" />
              <span className="text-xs text-gray-400">
                Licensed & Insured &bull; Satisfaction Guaranteed
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[var(--font-heading)] font-bold uppercase text-sm tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link
                  href="#services"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Residential Pest Control
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Commercial Pest Control
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Termite Treatment
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Scorpion Control
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Mosquito Control
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Bed Bug Treatment
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-hydra-cyan transition-colors"
                >
                  Pest Control Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-[var(--font-heading)] font-bold uppercase text-sm tracking-wider mb-4">
              Locations
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-white font-medium">Gila Valley</p>
                <p className="text-gray-400">928-432-6200</p>
              </li>
              <li>
                <p className="text-white font-medium">White Mountains</p>
                <p className="text-gray-400">928-457-2481</p>
              </li>
              <li>
                <p className="text-white font-medium">Sierra Vista</p>
                <p className="text-gray-400">520-523-8818</p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-heading)] font-bold uppercase text-sm tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-hydra-cyan" />
                <Link
                  href="tel:8334937229"
                  className="hover:text-hydra-cyan transition-colors font-semibold text-white"
                >
                  833-493-7229
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-hydra-cyan" />
                Mon-Fri 8-5 &bull; Sat 9-2
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-hydra-cyan shrink-0 mt-0.5" />
                P.O. Box 1185
                <br />
                Thatcher, AZ 85552
              </li>
            </ul>
            <Link
              href="https://hydra.pestportals.com/landing/index"
              className="inline-flex items-center gap-1 text-sm text-hydra-cyan hover:text-white transition-colors mt-4"
            >
              Customer Portal
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Hydra Pest Control. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
