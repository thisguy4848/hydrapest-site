import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hydra Pest Control | Premium Pest Control in Arizona",
  description:
    "Arizona's trusted pest control experts. Scorpions, termites, mosquitoes & more. 3 locations serving Gila Valley, White Mountains & Sierra Vista. Free inspections. Call 833-493-7229.",
  keywords:
    "pest control Arizona, scorpion control, termite treatment, mosquito control, Safford pest control, Show Low pest control, Sierra Vista pest control",
  openGraph: {
    title: "Hydra Pest Control | Premium Pest Control in Arizona",
    description:
      "Arizona's trusted pest control experts. Free inspections. Licensed & insured.",
    type: "website",
    locale: "en_US",
    siteName: "Hydra Pest Control",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PestControlService",
              name: "Hydra Pest Control",
              description:
                "Premium pest control services across Arizona. Scorpions, termites, mosquitoes & more.",
              telephone: "833-493-7229",
              url: "https://www.hydrapest.com",
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "2158 N Reay Ln Suite 1",
                  addressLocality: "Thatcher",
                  addressRegion: "AZ",
                  postalCode: "85552",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "1080 N 16th St Suite 300",
                  addressLocality: "Show Low",
                  addressRegion: "AZ",
                  postalCode: "85901",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "4148 Industry Dr Suite 1111",
                  addressLocality: "Sierra Vista",
                  addressRegion: "AZ",
                  postalCode: "85650",
                },
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "17:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "14:00",
                },
              ],
              areaServed: [
                "Safford, AZ",
                "Show Low, AZ",
                "Sierra Vista, AZ",
                "Thatcher, AZ",
                "Pinetop, AZ",
                "Willcox, AZ",
              ],
              serviceType: [
                "Pest Control",
                "Termite Treatment",
                "Scorpion Control",
                "Mosquito Control",
                "Bed Bug Treatment",
                "Rodent Control",
                "Bee Removal",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
