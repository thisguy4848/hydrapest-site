"use client";

import { useState } from "react";
import { X, AlertTriangle, Info, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Pest {
  name: string;
  emoji: string;
  danger: "Low" | "Medium" | "High";
  season: string;
  description: string;
  signs: string[];
}

const pestSlugs: Record<string, string> = {
  Scorpions: "scorpions",
  Termites: "termites",
  Mosquitoes: "mosquitoes",
  Wasps: "wasps",
  Bees: "bees",
  Roaches: "roaches",
  "Bed Bugs": "bed-bugs",
  Spiders: "spiders",
  Ants: "ants",
  Rodents: "rodents",
  Ticks: "ticks",
  "Pocket Gophers": "pocket-gophers",
};

const pests: Pest[] = [
  {
    name: "Scorpions",
    emoji: "🦂",
    danger: "High",
    season: "Year-round (peak Mar-Oct)",
    description:
      "Arizona bark scorpions are venomous and commonly found in homes. They glow under UV light and can squeeze through gaps as thin as a credit card.",
    signs: [
      "Sightings at night near moisture",
      "Found in shoes, bedding, dark areas",
      "Bark scorpion glows under blacklight",
    ],
  },
  {
    name: "Termites",
    emoji: "🪲",
    danger: "High",
    season: "Year-round (swarm spring)",
    description:
      "Subterranean and drywood termites cause billions in damage annually. Arizona's soil and climate make every home a target.",
    signs: [
      "Mud tubes on foundation",
      "Hollow-sounding wood",
      "Discarded wings near windows",
      "Frass (droppings) near wood",
    ],
  },
  {
    name: "Mosquitoes",
    emoji: "🦟",
    danger: "Medium",
    season: "Spring through fall (50°F+)",
    description:
      "Need only a thumbtack of standing water to breed. Can detect CO2 from 100-160 feet away. Carry West Nile virus and other diseases.",
    signs: [
      "Bites on exposed skin",
      "Buzzing at dusk/dawn",
      "Standing water on property",
    ],
  },
  {
    name: "Wasps",
    emoji: "🐝",
    danger: "High",
    season: "Spring through fall",
    description:
      "Paper wasps, yellow jackets, and tarantula hawks are common in Arizona. Nests near entry points pose a serious sting risk.",
    signs: [
      "Visible nests under eaves/decks",
      "Wasps entering wall voids",
      "Aggressive behavior near food",
    ],
  },
  {
    name: "Bees",
    emoji: "🐝",
    danger: "Medium",
    season: "Spring through fall",
    description:
      "Africanized bees are common in Arizona and can be aggressive. Professional removal is essential — surface spraying only makes them angry.",
    signs: [
      "Swarm or established hive",
      "Heavy bee traffic near structure",
      "Buzzing inside walls",
    ],
  },
  {
    name: "Roaches",
    emoji: "🪳",
    danger: "Medium",
    season: "Year-round",
    description:
      "German and American cockroaches thrive in Arizona. They spread bacteria and allergens and reproduce rapidly in warm environments.",
    signs: [
      "Droppings in kitchen/bathroom",
      "Musty odor",
      "Egg cases (oothecae)",
      "Sightings at night",
    ],
  },
  {
    name: "Bed Bugs",
    emoji: "🛏️",
    danger: "Medium",
    season: "Year-round",
    description:
      "Hitchhike on luggage and clothing. Notoriously difficult to eliminate without professional treatment and follow-up visits.",
    signs: [
      "Itchy bites in lines/clusters",
      "Blood spots on sheets",
      "Dark spots on mattress seams",
    ],
  },
  {
    name: "Spiders",
    emoji: "🕷️",
    danger: "Low",
    season: "Year-round",
    description:
      "Most Arizona spiders are harmless, but black widows and brown recluses require professional treatment. Regular pest control reduces prey and spider populations.",
    signs: [
      "Webs in corners and garages",
      "Egg sacs",
      "Sightings of black widows",
    ],
  },
  {
    name: "Ants",
    emoji: "🐜",
    danger: "Low",
    season: "Year-round (peak summer)",
    description:
      "Fire ants, carpenter ants, and harvester ants are all common in Arizona. Carpenter ants damage wood, fire ants deliver painful stings.",
    signs: [
      "Ant trails along baseboards",
      "Mounds in yard",
      "Wood shavings (carpenter ants)",
    ],
  },
  {
    name: "Rodents",
    emoji: "🐀",
    danger: "High",
    season: "Year-round (peak fall/winter)",
    description:
      "Mice and pack rats chew wiring (fire risk), contaminate food, and carry diseases. They squeeze through openings as small as a dime.",
    signs: [
      "Droppings in cabinets/drawers",
      "Gnaw marks on food/wires",
      "Scratching sounds in walls",
      "Nesting material",
    ],
  },
  {
    name: "Ticks",
    emoji: "🫓",
    danger: "Medium",
    season: "Spring through fall",
    description:
      "Brown dog ticks and Rocky Mountain wood ticks carry Lyme disease and Rocky Mountain Spotted Fever. Pets bring them indoors.",
    signs: [
      "Found on pets or skin",
      "Pet scratching excessively",
      "Tick nymphs in carpeting",
    ],
  },
  {
    name: "Pocket Gophers",
    emoji: "🐿️",
    danger: "Low",
    season: "Year-round",
    description:
      "Destroy landscaping, irrigation, and foundations with their burrowing. Professional trapping and exclusion is the most effective control.",
    signs: [
      "Fan-shaped dirt mounds",
      "Damaged plants/roots",
      "Collapsed ground areas",
    ],
  },
];

const dangerColor = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function PestLibrary() {
  const [selected, setSelected] = useState<Pest | null>(null);

  return (
    <section
      id="pest-library"
      className="py-20 sm:py-28 bg-hydra-dark text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-hydra-cyan font-semibold text-sm uppercase tracking-widest">
            Know Your Enemy
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase mt-3">
            Pest Library
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Tap any pest for a quick overview, or explore our{" "}
            <span className="text-hydra-cyan">full pest guides</span> for
            detailed information.
          </p>
        </div>

        {/* Pest grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {pests.map((pest) => (
            <button
              key={pest.name}
              onClick={() => setSelected(pest)}
              className="group relative bg-hydra-navy hover:bg-hydra-slate rounded-2xl p-4 sm:p-6 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-hydra-cyan/10 border border-transparent hover:border-hydra-cyan/20"
            >
              <span className="text-3xl sm:text-4xl block mb-2">
                {pest.emoji}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white">
                {pest.name}
              </span>
              <div
                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  pest.danger === "High"
                    ? "bg-red-500"
                    : pest.danger === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Selected pest detail */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-hydra-navy rounded-3xl max-w-lg w-full p-8 relative border border-hydra-cyan/20">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 hover:bg-hydra-slate rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{selected.emoji}</span>
                <div>
                  <h3 className="font-[var(--font-heading)] text-2xl font-bold uppercase">
                    {selected.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${dangerColor[selected.danger]}`}
                    >
                      {selected.danger} Risk
                    </span>
                    <span className="text-xs text-gray-400">
                      {selected.season}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {selected.description}
              </p>

              <div className="mt-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-hydra-cyan mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  Warning Signs
                </h4>
                <ul className="space-y-2">
                  {selected.signs.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <ChevronRight className="w-4 h-4 text-hydra-teal shrink-0 mt-0.5" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/#contact"
                  onClick={() => setSelected(null)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-bold px-6 py-3 rounded-full transition-all glow-cyan"
                >
                  Get Help With {selected.name}
                </Link>
                <Link
                  href={`/pests/${pestSlugs[selected.name] || selected.name.toLowerCase()}`}
                  onClick={() => setSelected(null)}
                  className="w-full inline-flex items-center justify-center gap-2 text-hydra-cyan hover:text-white font-semibold text-sm transition-colors"
                >
                  Learn More About {selected.name}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
