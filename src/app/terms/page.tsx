import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Hydra Pest Control",
  description:
    "Hydra Pest Control terms of service. Terms and conditions for using our services and website.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Hydra Pest Control",
    description: "Terms and conditions for Hydra Pest Control services and website.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Hydra Pest Control",
    description: "Terms and conditions for our services.",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-hydra-dark relative overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-40" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
              Terms of Service
            </h1>
            <p className="mt-4 text-gray-400">
              Last updated: March 2026
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hydra-cyan/30 to-transparent" />
        </section>

        {/* Content */}
        <section className="bg-hydra-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <article className="prose-hydra">
              <p>
                Welcome to the Hydra Pest Control website. By using our website or
                engaging our pest control services, you agree to the following terms
                and conditions. Please read them carefully.
              </p>

              <h2>Acceptance of Terms</h2>
              <p>
                By accessing our website or scheduling services with Hydra Pest
                Control, you agree to be bound by these Terms of Service. If you do
                not agree with any part of these terms, please do not use our website
                or services.
              </p>

              <h2>Services Description</h2>
              <p>
                Hydra Pest Control provides residential and commercial pest control
                services throughout Arizona, including but not limited to:
              </p>
              <ul>
                <li>General pest control treatments</li>
                <li>Termite inspections and treatments</li>
                <li>Scorpion control</li>
                <li>Mosquito control</li>
                <li>Bed bug treatments</li>
                <li>Rodent control</li>
                <li>Free pest inspections</li>
              </ul>
              <p>
                Service availability may vary by location. Contact us to confirm
                services available in your area.
              </p>

              <h2>Service Agreements</h2>
              <p>
                Quotes provided by Hydra Pest Control are estimates based on
                information available at the time. Final pricing may vary based on
                the findings of an on-site inspection, the severity of the
                infestation, property size, and any additional treatments required.
                We will communicate any pricing changes before performing additional
                work.
              </p>

              <h2>Scheduling and Cancellation</h2>
              <p>
                We ask that you provide at least <strong>24 hours&apos; notice</strong> if
                you need to cancel or reschedule a service appointment. Late
                cancellations or missed appointments may result in a service fee at
                our discretion. We understand that emergencies happen and will work
                with you on a case-by-case basis.
              </p>

              <h2>Payment Terms</h2>
              <p>
                Payment is due at the time of service unless other arrangements have
                been made in advance. We accept major credit cards, checks, and other
                payment methods as communicated at the time of booking. Recurring
                service plans may have separate billing arrangements outlined in your
                service agreement.
              </p>

              <h2>Warranties and Guarantees</h2>
              <p>
                Hydra Pest Control stands behind our work. If pests covered by your
                treatment plan return between scheduled service visits, we will
                re-treat the affected areas at no additional charge. This guarantee
                applies to active service plan customers and is subject to the terms
                of your specific service agreement.
              </p>
              <p>
                Our guarantee does not cover new pest species not included in your
                original treatment plan, infestations caused by structural issues
                beyond our control, or situations where recommended preparation steps
                were not followed.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                Hydra Pest Control will perform all services with reasonable care and
                in accordance with industry standards. Our liability for any claim
                arising from our services is limited to the amount you paid for the
                specific service in question. We are not liable for indirect,
                incidental, or consequential damages, including but not limited to
                property damage not directly caused by our negligence.
              </p>

              <h2>Property Access</h2>
              <p>
                By scheduling a service, you grant Hydra Pest Control technicians
                access to the areas of your property necessary to perform the agreed-upon
                treatment. You are responsible for:
              </p>
              <ul>
                <li>
                  Preparing your property as instructed before treatment (such as
                  clearing areas around the foundation or removing pets)
                </li>
                <li>
                  Informing us of any hazards, security systems, locked gates, or
                  access restrictions
                </li>
                <li>
                  Securing pets and notifying household members about the scheduled
                  service
                </li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                All content on the Hydra Pest Control website, including text,
                images, logos, graphics, and blog articles, is the property of Hydra
                Pest Control and is protected by applicable copyright and trademark
                laws. You may not reproduce, distribute, or use our content without
                written permission.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance
                with the laws of the State of Arizona. Any disputes arising from
                these terms or your use of our services shall be resolved in the
                courts of the State of Arizona.
              </p>

              <h2>Changes to These Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Changes take
                effect when posted on this page with an updated &quot;Last updated&quot; date.
                Your continued use of our website or services after changes are posted
                constitutes acceptance of the revised terms.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about these Terms of Service, please contact
                us:
              </p>
              <ul>
                <li>
                  <strong>Phone:</strong>{" "}
                  <Link href="tel:8334937229" className="text-hydra-teal hover:text-hydra-cyan transition-colors">
                    833-493-7229
                  </Link>
                </li>
                <li>
                  <strong>Mail:</strong> Hydra Pest Control, P.O. Box 1185,
                  Thatcher, AZ 85552
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
