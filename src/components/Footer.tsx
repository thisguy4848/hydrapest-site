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
            <div className="mb-4">
              <Image
                src="/images/hydra-logo.jpg"
                alt="Hydra Pest Control logo"
                width={160}
                height={53}
                className="h-12 w-auto"
              />
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
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <Link
                href="https://www.instagram.com/hydrapestcontrol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-hydra-cyan/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5 text-gray-400 hover:text-hydra-cyan" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@hydrapestcontrol"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-hydra-cyan/20 flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4.5 h-4.5 text-gray-400 hover:text-hydra-cyan" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.99-.43V6.69h1.99z"/></svg>
              </Link>
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
