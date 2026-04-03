export interface TrainingResource {
  name: string;
  url: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  videoUrl: string;
  keyTakeaways: string[];
  resources: TrainingResource[];
  order: number;
}

export const categories = [
  "Onboarding",
  "Pest Identification",
  "Treatment Procedures",
  "Equipment & Products",
  "Sales & Growth",
] as const;

export type Category = (typeof categories)[number];

export const trainingModules: TrainingModule[] = [
  {
    id: "welcome-to-hydra",
    title: "Welcome to Hydra Pest Control",
    category: "Onboarding",
    description:
      "Get to know Hydra Pest Control — our mission, values, and what makes us different. This module covers company history, organizational structure, and the standards we hold ourselves to every day in the field.",
    duration: "15 min",
    videoUrl: "",
    keyTakeaways: [
      "Understand Hydra's mission and core values",
      "Know the organizational structure and your reporting chain",
      "Recognize what sets Hydra apart from competitors",
      "Understand our commitment to customer satisfaction",
    ],
    resources: [
      { name: "Employee Handbook (PDF)", url: "" },
      { name: "Company Org Chart", url: "" },
      { name: "Brand Guidelines", url: "" },
    ],
    order: 1,
  },
  {
    id: "safety-protocols-ppe",
    title: "Safety Protocols & PPE Requirements",
    category: "Onboarding",
    description:
      "Your safety is non-negotiable. Learn the required personal protective equipment for every job type, proper chemical handling procedures, emergency protocols, and OSHA compliance standards.",
    duration: "20 min",
    videoUrl: "",
    keyTakeaways: [
      "Identify required PPE for each service type",
      "Understand chemical handling and storage procedures",
      "Know emergency response protocols for exposure incidents",
      "Stay compliant with OSHA and Arizona state regulations",
    ],
    resources: [
      { name: "PPE Checklist (PDF)", url: "" },
      { name: "Chemical Handling Guide", url: "" },
      { name: "Emergency Contact Card", url: "" },
      { name: "OSHA Quick Reference", url: "" },
    ],
    order: 2,
  },
  {
    id: "customer-service-standards",
    title: "Customer Service Standards",
    category: "Onboarding",
    description:
      "Every interaction is a chance to build trust. Learn Hydra's communication guidelines, how to handle complaints professionally, and the small touches that turn one-time customers into lifelong advocates.",
    duration: "12 min",
    videoUrl: "",
    keyTakeaways: [
      "Master the Hydra greeting and service walkthrough",
      "Handle customer concerns with confidence and empathy",
      "Document service visits properly for follow-up",
      "Turn every job into a five-star experience",
    ],
    resources: [
      { name: "Customer Communication Scripts", url: "" },
      { name: "Service Visit Checklist", url: "" },
      { name: "Complaint Resolution Flowchart", url: "" },
    ],
    order: 3,
  },
  {
    id: "arizona-scorpions",
    title: "Arizona Scorpions: Identification & Treatment",
    category: "Pest Identification",
    description:
      "Arizona is home to over 40 scorpion species, including the bark scorpion — the most venomous in North America. Learn to identify common species, understand their behavior patterns, and apply the correct treatment protocols.",
    duration: "18 min",
    videoUrl: "",
    keyTakeaways: [
      "Identify the Arizona bark scorpion and other common species",
      "Understand scorpion harborage and entry points",
      "Apply UV detection techniques during inspections",
      "Execute the Hydra scorpion treatment protocol",
    ],
    resources: [
      { name: "Scorpion ID Field Card (PDF)", url: "" },
      { name: "UV Inspection Guide", url: "" },
      { name: "Treatment Protocol Sheet", url: "" },
    ],
    order: 4,
  },
  {
    id: "termite-identification-inspection",
    title: "Termite Identification & Inspection Procedures",
    category: "Pest Identification",
    description:
      "Termites cause billions in damage annually. Master the differences between subterranean and drywood termites, learn to spot evidence of infestation, and understand the WDIIR (Wood Destroying Insect Inspection Report) process.",
    duration: "25 min",
    videoUrl: "",
    keyTakeaways: [
      "Distinguish subterranean from drywood termite damage",
      "Identify mud tubes, frass, and swarm evidence",
      "Conduct a thorough WDIIR inspection",
      "Communicate findings clearly to homeowners and realtors",
    ],
    resources: [
      { name: "Termite ID Guide (PDF)", url: "" },
      { name: "WDIIR Form Template", url: "" },
      { name: "Inspection Walkthrough Checklist", url: "" },
      { name: "Damage Photo Reference Library", url: "" },
    ],
    order: 5,
  },
  {
    id: "common-arizona-pests",
    title: "Common Arizona Pests: Field Guide",
    category: "Pest Identification",
    description:
      "Quick-reference training on the most common pests you'll encounter in the field — from black widows and brown recluses to roof rats, pigeons, bed bugs, and kissing bugs. Know what you're looking at and how to respond.",
    duration: "22 min",
    videoUrl: "",
    keyTakeaways: [
      "Identify the top 15 pests encountered in Arizona",
      "Understand seasonal activity patterns for each pest",
      "Know the correct initial treatment approach for each species",
      "Recognize signs that require specialist escalation",
    ],
    resources: [
      { name: "Arizona Pest Field Guide (PDF)", url: "" },
      { name: "Seasonal Pest Calendar", url: "" },
      { name: "Quick ID Flashcards", url: "" },
    ],
    order: 6,
  },
  {
    id: "hydra-guard-barrier",
    title: "Hydra-Guard Barrier Application",
    category: "Treatment Procedures",
    description:
      "The Hydra-Guard barrier is our signature perimeter treatment. Learn the step-by-step application process, proper spray patterns, product mixing ratios, and how to communicate the value of ongoing barrier protection to customers.",
    duration: "16 min",
    videoUrl: "",
    keyTakeaways: [
      "Execute the full Hydra-Guard barrier application process",
      "Maintain proper spray distance and pattern coverage",
      "Mix products at the correct ratios for each application",
      "Explain the barrier protection value to customers",
    ],
    resources: [
      { name: "Hydra-Guard Application SOP", url: "" },
      { name: "Mixing Ratio Quick Sheet", url: "" },
      { name: "Coverage Map Template", url: "" },
    ],
    order: 7,
  },
  {
    id: "icap-technology-application",
    title: "iCap Technology: Proper Application",
    category: "Treatment Procedures",
    description:
      "iCap microencapsulated formulation requires specific handling and application techniques for maximum effectiveness. Learn proper storage, mixing, application methods, and the science behind why microcap technology outperforms traditional sprays.",
    duration: "14 min",
    videoUrl: "",
    keyTakeaways: [
      "Understand how microencapsulation technology works",
      "Store and handle iCap products correctly",
      "Apply iCap at the proper dilution rates and pressures",
      "Explain the long-lasting benefits to customers",
    ],
    resources: [
      { name: "iCap Product Label (PDF)", url: "" },
      { name: "Application Rate Chart", url: "" },
      { name: "Safety Data Sheet", url: "" },
    ],
    order: 8,
  },
  {
    id: "termite-pre-construction",
    title: "Termite Pre-Construction Treatment",
    category: "Treatment Procedures",
    description:
      "Pre-construction termite treatment is a critical revenue stream and requires precise execution. Learn the complete protocol for new-build treatments, including soil preparation, chemical application zones, and builder coordination.",
    duration: "20 min",
    videoUrl: "",
    keyTakeaways: [
      "Understand Arizona pre-treatment code requirements",
      "Apply termiticide to all required zones pre-pour",
      "Document treatments for warranty compliance",
      "Coordinate effectively with builders and general contractors",
    ],
    resources: [
      { name: "Pre-Treatment Protocol (PDF)", url: "" },
      { name: "Builder Coordination Checklist", url: "" },
      { name: "Warranty Documentation Template", url: "" },
      { name: "Arizona Code Reference", url: "" },
    ],
    order: 9,
  },
  {
    id: "equipment-maintenance",
    title: "Equipment Maintenance & Care",
    category: "Equipment & Products",
    description:
      "Well-maintained equipment means reliable service and fewer callbacks. Learn daily, weekly, and monthly maintenance routines for sprayers, backpacks, vehicle rigs, and handheld tools.",
    duration: "12 min",
    videoUrl: "",
    keyTakeaways: [
      "Perform daily pre-route equipment checks",
      "Maintain sprayer pumps, hoses, and nozzles",
      "Keep service vehicles organized and inspection-ready",
      "Report equipment issues before they become failures",
    ],
    resources: [
      { name: "Daily Equipment Checklist (PDF)", url: "" },
      { name: "Sprayer Maintenance Guide", url: "" },
      { name: "Vehicle Inspection Form", url: "" },
    ],
    order: 10,
  },
  {
    id: "product-mixing-sds",
    title: "Product Mixing & Safety Data Sheets",
    category: "Equipment & Products",
    description:
      "Accurate product mixing protects your health, the customer's property, and Hydra's reputation. Learn proper mixing ratios for every product in our lineup and how to read and reference Safety Data Sheets.",
    duration: "15 min",
    videoUrl: "",
    keyTakeaways: [
      "Mix all Hydra products at the correct ratios",
      "Read and interpret Safety Data Sheets (SDS)",
      "Store mixed and unmixed products safely",
      "Handle spills and accidental exposure correctly",
    ],
    resources: [
      { name: "Product Mixing Chart (PDF)", url: "" },
      { name: "SDS Binder Index", url: "" },
      { name: "Spill Response Procedure", url: "" },
    ],
    order: 11,
  },
  {
    id: "upselling-services",
    title: "Upselling Services the Right Way",
    category: "Sales & Growth",
    description:
      "Great technicians solve problems customers didn't know they had — without being pushy. Learn how to identify upsell opportunities during service visits and present them as genuine value rather than a hard sell.",
    duration: "10 min",
    videoUrl: "",
    keyTakeaways: [
      "Spot natural upsell opportunities during inspections",
      "Present additional services as solutions, not sales pitches",
      "Use the 'show, don't tell' approach for add-on services",
      "Track upsell conversions and learn from what works",
    ],
    resources: [
      { name: "Upsell Opportunity Guide (PDF)", url: "" },
      { name: "Service Add-On Pricing Sheet", url: "" },
      { name: "Conversation Scripts", url: "" },
    ],
    order: 12,
  },
  {
    id: "generating-referrals",
    title: "Generating Referrals",
    category: "Sales & Growth",
    description:
      "Happy customers are your best marketing channel. Learn how to ask for referrals at the right time, make it easy for customers to spread the word, and track referral sources for bonus eligibility.",
    duration: "8 min",
    videoUrl: "",
    keyTakeaways: [
      "Ask for referrals at the peak moment of satisfaction",
      "Use referral cards and digital tools to make sharing easy",
      "Follow up with referred leads within 24 hours",
      "Track your referral numbers for monthly bonus eligibility",
    ],
    resources: [
      { name: "Referral Program Overview (PDF)", url: "" },
      { name: "Referral Card Templates", url: "" },
      { name: "Referral Tracking Sheet", url: "" },
    ],
    order: 13,
  },
  {
    id: "d2d-pest-control-basics",
    title: "Basics of the Pest Control Industry",
    category: "Sales & Growth",
    description:
      "Introduction to the pest control industry for door-to-door sales reps. Covers industry fundamentals, common services, how the business works, and what customers care about.",
    duration: "20 min",
    videoUrl: "https://drive.google.com/file/d/1FE3ySQ6XojkZXrxPEloy7CC0skTJuI_P/preview",
    keyTakeaways: [
      "Understand how the pest control industry works",
      "Know the core services Hydra offers and why they matter",
      "Speak confidently about common pests and treatment approaches",
      "Build credibility at the door with real industry knowledge",
    ],
    resources: [],
    order: 14,
  },
];

export function getModuleById(id: string): TrainingModule | undefined {
  return trainingModules.find((m) => m.id === id);
}

export function getModulesByCategory(category: string): TrainingModule[] {
  return trainingModules.filter((m) => m.category === category).sort((a, b) => a.order - b.order);
}

export function getDefaultModules(): TrainingModule[] {
  return trainingModules;
}

export function getAdjacentModules(id: string): {
  prev: TrainingModule | null;
  next: TrainingModule | null;
} {
  const sorted = [...trainingModules].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((m) => m.id === id);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
