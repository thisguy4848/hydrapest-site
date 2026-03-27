import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Hydra Pest Control",
  description:
    "Hydra Pest Control privacy policy. How we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Hydra Pest Control",
    description: "How Hydra Pest Control collects, uses, and protects your information.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Hydra Pest Control",
    description: "How we collect, use, and protect your information.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-hydra-dark relative overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-40" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
              Privacy Policy
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
                Hydra Pest Control (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
                committed to protecting the personal information you share with us.
                This Privacy Policy explains how we collect, use, and safeguard your
                information when you visit our website, request a quote, or use our
                pest control services.
              </p>

              <h2>Information We Collect</h2>
              <p>We collect information that you voluntarily provide when you:</p>
              <ul>
                <li>Request a free inspection or quote through our website forms</li>
                <li>Call or text our office</li>
                <li>Schedule a service appointment</li>
                <li>Sign up for email communications</li>
              </ul>
              <p>This information may include your:</p>
              <ul>
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Service address</li>
                <li>Details about your pest concern</li>
              </ul>
              <p>
                We also automatically collect standard web analytics data when you
                visit our website, including your IP address, browser type, pages
                visited, and time spent on our site. This data is collected through
                cookies and similar technologies and is used in aggregate to improve
                our website.
              </p>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide pest control services you&apos;ve requested</li>
                <li>Schedule and confirm service appointments</li>
                <li>Communicate with you about your account and services</li>
                <li>Send service reminders and follow-ups</li>
                <li>
                  Send promotional offers and pest prevention tips (you can opt out
                  at any time)
                </li>
                <li>Improve our website and customer experience</li>
                <li>Respond to your questions and requests</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, rent, or trade your personal information to third
                parties. We may share your information only in the following
                situations:
              </p>
              <ul>
                <li>
                  <strong>Service partners:</strong> We may share your name and
                  service address with trusted partners who help us deliver services
                  (for example, a scheduling platform or payment processor). These
                  partners are required to protect your information and use it only
                  for the services we&apos;ve engaged them to provide.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose your
                  information if required by law, court order, or government
                  regulation.
                </li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                Our website uses cookies and standard analytics tools to understand
                how visitors use our site. This helps us improve our content and user
                experience. We do not use invasive tracking technologies or sell
                tracking data to advertisers.
              </p>
              <p>
                You can control cookies through your browser settings. Disabling
                cookies may affect some website functionality.
              </p>

              <h2>Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information,
                including SSL encryption on our website and industry-standard
                security practices for data storage. However, no method of
                transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Opt out of marketing communications</strong> at any time by
                  clicking the unsubscribe link in any email or contacting us
                  directly.
                </li>
                <li>
                  <strong>Request access</strong> to the personal information we hold
                  about you.
                </li>
                <li>
                  <strong>Request deletion</strong> of your personal information,
                  subject to any legal obligations we may have to retain certain
                  records.
                </li>
                <li>
                  <strong>Update or correct</strong> your information by contacting
                  us.
                </li>
              </ul>

              <h2>Children&apos;s Privacy</h2>
              <p>
                Our website and services are not directed at children under the age
                of 13. We do not knowingly collect personal information from children
                under 13. If you believe we have inadvertently collected such
                information, please contact us and we will promptly delete it.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for legal, operational, or regulatory
                reasons. When we make changes, we will update the &quot;Last updated&quot;
                date at the top of this page. We encourage you to review this policy
                periodically.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how we handle your
                information, please contact us:
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
