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
  metadataBase: new URL("https://www.hydrapest.com"),
  alternates: { canonical: "/" },
  title: "Hydra Pest Control | Premium Pest Control in Arizona",
  description:
    "Arizona's trusted pest control experts. Scorpions, termites, mosquitoes & more. 3 locations serving Gila Valley, White Mountains & Sierra Vista. Free inspections. Call 833-493-7229.",
  keywords:
    "pest control Arizona, scorpion control, termite treatment, mosquito control, Safford pest control, Show Low pest control, Sierra Vista pest control",
  icons: {
    icon: "/images/favicon-full.png",
    apple: "/images/favicon-full.png",
  },
  openGraph: {
    title: "Hydra Pest Control | Premium Pest Control in Arizona",
    description:
      "Arizona's trusted pest control experts. Free inspections. Licensed & insured.",
    type: "website",
    locale: "en_US",
    siteName: "Hydra Pest Control",
    images: [{ url: "/images/truck-branded.jpg", width: 1200, height: 630 }],
    url: "https://www.hydrapest.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydra Pest Control | Premium Pest Control in Arizona",
    description: "Arizona's trusted pest control experts. Scorpions, termites, mosquitoes & more.",
    images: ["/images/truck-branded.jpg"],
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
        {/* Gila Valley Location */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PestControlService",
              "@id": "https://www.hydrapest.com/#gila-valley",
              name: "Hydra Pest Control — Gila Valley",
              description:
                "Professional pest control serving Safford, Thatcher, and the Gila Valley. Scorpions, termites, mosquitoes & more.",
              telephone: "+18334937229",
              url: "https://www.hydrapest.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2158 N Reay Ln Suite 1",
                addressLocality: "Thatcher",
                addressRegion: "AZ",
                postalCode: "85552",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
              areaServed: ["Safford, AZ", "Thatcher, AZ", "Pima, AZ"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "150",
              },
            }),
          }}
        />
        {/* White Mountains Location */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PestControlService",
              "@id": "https://www.hydrapest.com/#white-mountains",
              name: "Hydra Pest Control — White Mountains",
              description:
                "Professional pest control serving Show Low, Pinetop-Lakeside, and the White Mountains. Scorpions, termites, mosquitoes & more.",
              telephone: "+18334937229",
              url: "https://www.hydrapest.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1080 N 16th St Suite 300",
                addressLocality: "Show Low",
                addressRegion: "AZ",
                postalCode: "85901",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
              areaServed: ["Show Low, AZ", "Pinetop, AZ", "Lakeside, AZ"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "150",
              },
            }),
          }}
        />
        {/* Sierra Vista Location */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PestControlService",
              "@id": "https://www.hydrapest.com/#sierra-vista",
              name: "Hydra Pest Control — Sierra Vista",
              description:
                "Professional pest control serving Sierra Vista, Huachuca City, and Cochise County. Scorpions, termites, mosquitoes & more.",
              telephone: "+18334937229",
              url: "https://www.hydrapest.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "4148 Industry Dr Suite 1111",
                addressLocality: "Sierra Vista",
                addressRegion: "AZ",
                postalCode: "85650",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
              areaServed: ["Sierra Vista, AZ", "Huachuca City, AZ", "Willcox, AZ"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "150",
              },
            }),
          }}
        />
        {/* Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.hydrapest.com/#organization",
              name: "Hydra Pest Control",
              url: "https://www.hydrapest.com",
              telephone: "+18334937229",
              description:
                "Arizona's trusted pest control experts. 3 locations serving Gila Valley, White Mountains, and Sierra Vista.",
              subOrganization: [
                { "@id": "https://www.hydrapest.com/#gila-valley" },
                { "@id": "https://www.hydrapest.com/#white-mountains" },
                { "@id": "https://www.hydrapest.com/#sierra-vista" },
              ],
            }),
          }}
        />
        {/* FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are Arizona bark scorpions dangerous?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, the Arizona bark scorpion is the most venomous scorpion in North America. Stings cause intense pain, numbness, and tingling, and can be life-threatening for small children, the elderly, and those with compromised immune systems. Immediate medical attention is recommended for severe reactions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does pest control cost in Arizona?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Residential pest control in Arizona typically costs between $40 and $70 per month on a recurring plan. One-time treatments range from $150 to $300 depending on the pest and severity. Termite treatments cost more, generally $800 to $2,500 depending on the method and size of the structure.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How often should I get pest control in Arizona?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most Arizona homes benefit from monthly or bi-monthly treatments due to the year-round pest pressure from scorpions, spiders, and ants. Quarterly treatments can work in lower-risk areas. Consistent service creates a chemical barrier that prevents infestations before they start.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is pest control safe for pets and children?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Professional pest control products are formulated to be safe for households with pets and children when applied correctly. Hydra Pest Control uses targeted application methods and controlled-release formulations that minimize exposure. We recommend keeping pets and children off treated surfaces until dry, typically 30 to 60 minutes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I know if I need a termite inspection?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You should get a termite inspection if you see mud tubes on your foundation, notice hollow-sounding wood, find discarded wings near windows, or see small piles of frass (drywood termite droppings). Arizona homeowners should also get inspections before buying or selling a home. Annual inspections are recommended as a preventive measure.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the most common pests in Arizona?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The most common household pests in Arizona are bark scorpions, subterranean and drywood termites, black widows, brown recluse spiders, roof rats, Africanized bees, mosquitoes, cockroaches, and ants. Seasonal monsoon moisture drives increased activity in many of these species during summer months.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Should I hire a professional or do pest control myself?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "DIY pest control can handle minor ant or occasional spider problems, but Arizona's venomous pests — bark scorpions, black widows, and termites — require professional treatment. Licensed technicians have access to commercial-grade products, understand pest biology, and can identify entry points that homeowners typically miss.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Hydra Pest Control offer free inspections?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Hydra Pest Control provides free inspections at all three Arizona locations — Gila Valley, White Mountains, and Sierra Vista. A licensed technician will evaluate your property, identify pest activity and entry points, and recommend a treatment plan with no obligation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can mosquitoes in Arizona carry diseases?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Arizona mosquitoes can transmit West Nile virus, St. Louis encephalitis, and other mosquito-borne illnesses. Standing water from monsoon rains creates breeding sites throughout the state. Professional mosquito control reduces populations around your property and minimizes health risks for your family.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the best way to prevent scorpions in my Arizona home?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The most effective scorpion prevention combines professional perimeter treatments with home sealing. Seal gaps around doors, windows, pipes, and utility penetrations — bark scorpions can fit through openings as thin as a credit card. Remove debris, woodpiles, and rock landscaping near your foundation. Regular professional treatments create a chemical barrier that kills scorpions before they enter.",
                  },
                },
              ],
            }),
          }}
        />
        {/* Service schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Residential Pest Control",
                provider: { "@id": "https://www.hydrapest.com/#organization" },
                description:
                  "Custom pest programs designed for your home with Hydra-Guard Barriers and iCap Technology controlled-release formulations.",
                areaServed: "Arizona",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Commercial Pest Control",
                provider: { "@id": "https://www.hydrapest.com/#organization" },
                description:
                  "Discreet, professional pest management for restaurants, hotels, schools, healthcare, retail, and industrial facilities.",
                areaServed: "Arizona",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Termite Treatment",
                provider: { "@id": "https://www.hydrapest.com/#organization" },
                description:
                  "Pre-construction and post-construction termite treatments, drywood termite service, and certified Wood Destroying Inspections (WDIIR / NPMA-33).",
                areaServed: "Arizona",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Scorpion Control",
                provider: { "@id": "https://www.hydrapest.com/#organization" },
                description:
                  "Targeted scorpion elimination and prevention for Arizona homes using professional-grade products and perimeter barriers.",
                areaServed: "Arizona",
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
