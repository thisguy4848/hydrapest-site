export interface PestData {
  slug: string;
  name: string;
  scientificName: string;
  category: "venomous" | "structural" | "nuisance" | "disease-carrier";
  dangerLevel: "Low" | "Medium" | "High";
  image: string;
  seasons: string;
  description: string;
  content: {
    overview: string;
    identification: string;
    behavior: string;
    dangers: string;
    prevention: string;
    treatment: string;
    localContext: string;
  };
  quickFacts: { label: string; value: string }[];
  signs: string[];
  faqs: { question: string; answer: string }[];
  relatedPests: string[];
  relatedBlogSlugs: string[];
}

export const pests: PestData[] = [
  // ─── 1. SCORPIONS ───
  {
    slug: "scorpions",
    name: "Scorpions",
    scientificName: "Centruroides sculpturatus",
    category: "venomous",
    dangerLevel: "High",
    image: "🦂",
    seasons: "Year-round (peak March–October)",
    description:
      "The Arizona bark scorpion (Centruroides sculpturatus) is the most venomous scorpion in North America. It is the only scorpion species that can climb vertical surfaces including walls, ceilings, and trees, and it fluoresces bright green under ultraviolet light.",
    content: {
      overview:
        "Arizona is home to more than 40 scorpion species, but the bark scorpion is the only one considered medically significant in the United States. Adults measure 2 to 3 inches long and are pale yellow-tan with slightly darker backs. Unlike most scorpion species that are solitary, bark scorpions are semi-social — it is not uncommon to find 20 to 30 individuals sheltering together in a single harborage.\n\nBark scorpions are nocturnal predators that feed on crickets, roaches, and other small invertebrates. They detect prey through vibrations rather than sight. Their metabolism is remarkably efficient: a bark scorpion can survive on a single cricket for months and can endure being submerged in water for up to 48 hours.\n\nThe species is uniquely adapted to Arizona's arid climate. Bark scorpions lose moisture at a slower rate than almost any other terrestrial arthropod, which allows them to thrive in desert environments where daytime temperatures exceed 110°F.",
      identification:
        "Bark scorpions are slender-bodied, measuring 2 to 3 inches from head to tail tip. Their color ranges from pale straw-yellow to light tan, often with faint darker striping on the back. The pincers are thin and elongated compared to the thicker pincers of less venomous species like the desert hairy scorpion. The tail is thin and held curled to the side when at rest — not arched high over the body. A key identification feature is the subaculear tooth, a small bump at the base of the stinger visible under magnification. Under UV blacklight, bark scorpions glow bright blue-green due to fluorescent compounds in their exoskeleton. This glow persists even in molted exoskeletons and fossil specimens.",
      behavior:
        "Bark scorpions become active when nighttime temperatures stay above 50°F, which in most of Arizona means March through October. Peak activity occurs during monsoon season (July–September) when humidity drives prey insects indoors and scorpions follow. Females give birth to live young — 25 to 35 per litter — which ride on the mother's back for 1 to 3 weeks. Bark scorpions reach maturity in about 3 years and can live up to 6 years. They are the only scorpion species in Arizona that routinely climbs. They ascend stucco walls, squeeze under door sweeps, and enter through gaps around pipes, wires, and utility penetrations. A bark scorpion can fit through any gap wide enough to slide a credit card through — roughly 1/16 of an inch.",
      dangers:
        "Bark scorpion venom is a neurotoxin that causes intense localized pain, numbness, and tingling that can radiate up the affected limb. Symptoms typically peak within 2 to 4 hours. In severe cases — primarily in children under 5, the elderly, and immunocompromised individuals — envenomation can cause difficulty breathing, muscle twitching, excessive salivation, and in rare cases, respiratory failure. Arizona Poison Control receives approximately 12,000 scorpion sting calls annually. Before the development of antivenom (Anascorp, FDA-approved in 2011), fatalities were more common. Today, deaths from bark scorpion stings in the U.S. are extremely rare — fewer than 1 per year — but stings remain painful and medically significant. Approximately 20% of stings in children require emergency medical intervention.",
      prevention:
        "Seal all gaps around doors, windows, and utility penetrations with caulk or weatherstripping — bark scorpions need only 1/16-inch clearance to enter. Install door sweeps on all exterior doors and ensure garage door seals are intact. Remove wood piles, rock landscaping, and debris within 5 feet of the foundation. Trim tree branches and vegetation that contact the structure. Fix leaky faucets and irrigation — scorpions seek moisture. Use a UV blacklight at night to inspect around the exterior and identify harborage areas. Keep beds away from walls and shake out shoes, clothing, and towels before use.",
      treatment:
        "Hydra Pest Control uses a multi-layered scorpion elimination program. We apply a professional-grade residual barrier around the exterior perimeter, targeting cracks, weave holes, expansion joints, and entry points. Interior treatments focus on known harborage areas including closets, bathrooms, and utility rooms. We dust wall voids and attic spaces with desiccant products that kill scorpions over time. Our UV blacklight inspections identify active populations so we can target treatments precisely. Monthly or bi-monthly service maintains the barrier and keeps populations suppressed. Most customers see a 70-90% reduction in scorpion sightings within the first 60 days.",
      localContext:
        "Arizona's Gila Valley — Safford, Thatcher, Pima — is one of the highest-density bark scorpion habitats in the state. The irrigated agricultural land and desert fringe create ideal conditions. Homes near the Gila River corridor and at the base of Graham Mountain see especially heavy scorpion pressure. In the White Mountains region, bark scorpion activity is lower at elevations above 6,000 feet due to cooler temperatures, but they are present in Show Low (6,300 ft) and increasingly active during warm summers. Sierra Vista and the Cochise County desert floor are also high-activity zones. Bark scorpions are found throughout Arizona below 7,000 feet elevation. Monsoon storms in July through September drive the biggest indoor invasions as scorpions seek shelter from flooding and follow prey insects into structures.",
    },
    quickFacts: [
      { label: "Adult Size", value: "2–3 inches" },
      { label: "Color", value: "Pale yellow-tan" },
      { label: "Lifespan", value: "Up to 6 years" },
      { label: "Litter Size", value: "25–35 live young" },
      { label: "Active Temps", value: "Above 50°F" },
      { label: "Entry Gap", value: "1/16 inch (credit card)" },
      { label: "UV Glow", value: "Yes — bright green" },
      { label: "Venom Type", value: "Neurotoxin" },
    ],
    signs: [
      "Scorpion sightings at night, especially near water sources",
      "Glowing scorpions visible under UV blacklight around exterior",
      "Found in shoes, bedding, towels, or clothing left on the floor",
      "Bark scorpions climbing walls or ceilings inside the home",
      "Multiple scorpions found in a single location (semi-social behavior)",
      "Increased cricket or roach activity (prey attracts scorpions)",
    ],
    faqs: [
      {
        question: "Are bark scorpions deadly?",
        answer:
          "Bark scorpion stings are extremely painful and medically significant, but fatalities in the U.S. are rare — fewer than 1 death per year. Children under 5, the elderly, and immunocompromised individuals face the highest risk of severe reactions including difficulty breathing and muscle spasms. Approximately 20% of pediatric stings require emergency medical treatment. The FDA-approved antivenom Anascorp has significantly reduced severe outcomes since 2011.",
      },
      {
        question: "How do I scorpion-proof my home?",
        answer:
          "Seal every gap around doors, windows, pipes, and wiring with caulk — bark scorpions fit through openings as thin as a credit card (1/16 inch). Install tight-fitting door sweeps, repair torn window screens, and seal weep holes with mesh. Remove rock landscaping, wood piles, and debris within 5 feet of the foundation. Professional perimeter treatments create a chemical barrier that kills scorpions before they enter.",
      },
      {
        question: "Do scorpions come in packs?",
        answer:
          "Bark scorpions are semi-social and often congregate in groups. It is common to find 20 to 30 bark scorpions sheltering together in a single harborage site — behind a piece of bark, inside a block wall, or in a utility box. If you find one bark scorpion inside your home, there are almost certainly more nearby.",
      },
      {
        question: "What attracts scorpions to my house?",
        answer:
          "Scorpions are attracted to three things: prey (crickets, roaches, and other insects), moisture (leaky faucets, irrigation overspray, pet water bowls), and shelter (cool, dark, tight spaces). Homes with exterior lighting that attracts insects indirectly attract scorpions. Reducing insect populations around your property is one of the most effective scorpion prevention strategies.",
      },
      {
        question: "When is scorpion season in Arizona?",
        answer:
          "Bark scorpions are active year-round in Arizona but peak activity runs from March through October when nighttime temperatures stay above 50°F. The worst period is during monsoon season (July–September) when humidity and rain drive both prey insects and scorpions indoors. In heated homes, scorpions may remain active through winter.",
      },
    ],
    relatedPests: ["spiders", "roaches", "ants"],
    relatedBlogSlugs: [
      "scorpion-season-in-arizona-what-homeowners-need-to-know",
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 2. TERMITES ───
  {
    slug: "termites",
    name: "Termites",
    scientificName: "Reticulitermes spp. / Incisitermes minor",
    category: "structural",
    dangerLevel: "High",
    image: "🪲",
    seasons: "Year-round (swarmers peak spring)",
    description:
      "Termites cause approximately $5 billion in property damage annually in the United States. Arizona falls within the USDA's 'very heavy' termite pressure zone, and both subterranean and drywood termite species actively damage structures throughout the state.",
    content: {
      overview:
        "Two primary termite groups threaten Arizona structures: subterranean termites and drywood termites. Subterranean termites (Reticulitermes spp. and Heterotermes aureus, the desert subterranean termite) are the most destructive. They live in underground colonies of 100,000 to 1 million individuals and access structures through mud tubes built from soil to wood. A mature colony can consume approximately 1 pound of wood per day.\n\nDrywood termites (Incisitermes minor) live entirely within the wood they consume. They do not require soil contact or moisture from an external source. Colonies are smaller — typically 1,000 to 10,000 individuals — but they can infest furniture, picture frames, and structural framing in upper stories that subterranean termites rarely reach.\n\nTermite damage is often invisible until it is severe. Because they feed from the inside out, wood can appear perfectly intact on the surface while being hollowed to a paper-thin shell. The average cost to repair termite damage in Arizona ranges from $3,000 to $12,000, with severe cases exceeding $30,000.",
      identification:
        "Subterranean termite workers are creamy-white, soft-bodied, about 1/4 inch long, and avoid light. Swarmers (reproductive adults) are dark brown to black with two pairs of equal-length wings. Desert subterranean termite swarmers are smaller and lighter in color. Mud tubes — pencil-width tunnels made of soil and saliva — are the most visible sign, typically found on foundation walls, piers, and plumbing penetrations.\n\nDrywood termite swarmers are slightly larger, reddish-brown, and also have two equal-length wings. The telltale sign is frass — small, hard, six-sided fecal pellets that accumulate in tiny piles below kick-out holes. Frass resembles coarse sand or coffee grounds and is a reliable indicator of active drywood infestation.",
      behavior:
        "Subterranean termites swarm in spring (February–May in Arizona) when temperatures and humidity rise after rain. Desert subterranean termites may swarm after monsoon rains in July–September. Swarming events last 30 to 60 minutes, usually in late afternoon. After swarming, reproductives shed their wings and pair off to start new colonies. A queen can live 15 to 25 years and produce thousands of eggs daily.\n\nDrywood termites swarm in late summer and fall, typically September–November. They are attracted to light and often enter structures through attic vents, unscreened windows, and gaps in wood trim. Drywood colonies grow slowly — it may take 3 to 5 years before damage becomes noticeable.",
      dangers:
        "Termites are the single most costly wood-destroying pest in the United States. They cause an estimated $5 billion in damage annually — more than fires, floods, and tornadoes combined. In Arizona, the warm climate allows year-round feeding. A mature subterranean colony consuming 1 pound of wood per day can cause structural failure in load-bearing members within 3 to 5 years if left untreated. Termite damage is not covered by standard homeowners insurance policies. A WDIIR (Wood-Destroying Insect Inspection Report, also called an NPMA-33) is required for most real estate transactions in Arizona. Failure to disclose known termite damage is a violation of Arizona real estate disclosure law.",
      prevention:
        "Eliminate wood-to-soil contact around the foundation — maintain at least 6 inches of clearance. Fix all plumbing leaks and ensure proper drainage away from the foundation. Do not stack firewood, lumber, or cardboard against the structure. Keep gutters clean and direct downspouts away from the foundation. Seal cracks in the foundation and around utility penetrations. For drywood termites, screen attic vents with 20-mesh screening and paint or seal all exposed wood surfaces. Schedule annual professional termite inspections — early detection saves thousands in repair costs.",
      treatment:
        "For subterranean termites, Hydra Pest Control uses liquid termiticide barrier treatments applied to the soil around and beneath the foundation. We trench along exterior walls, drill through concrete slabs where needed, and create a continuous chemical barrier that kills termites on contact. Bait monitoring systems are also available for ongoing colony elimination. For drywood termites, we perform localized treatments including direct wood injection of termiticide and heat treatment of affected areas. Whole-structure fumigation is recommended for widespread drywood infestations. All treatments include a WDIIR inspection and detailed report. We offer termite warranties that cover retreatment if termites return.",
      localContext:
        "Arizona's warm, dry climate is ideal for the desert subterranean termite (Heterotermes aureus), which is more prevalent than the eastern subterranean species in many parts of the state. In the Gila Valley, irrigated agricultural land and clay soils create conditions where subterranean termites thrive. Homes built on slab foundations in Safford and Thatcher are particularly vulnerable because termites can enter through expansion joints and plumbing penetrations in the slab. In Sierra Vista and Cochise County, both subterranean and drywood termites are common. The higher elevation White Mountains region has lower but still significant termite pressure. Arizona law requires sellers to provide a WDIIR prior to closing on residential real estate transactions, making regular termite inspections essential for homeowners planning to sell.",
    },
    quickFacts: [
      { label: "Colony Size", value: "100K–1M (subterranean)" },
      { label: "Feeding Rate", value: "~1 lb wood/day (mature colony)" },
      { label: "Queen Lifespan", value: "15–25 years" },
      { label: "Annual US Damage", value: "$5 billion" },
      { label: "AZ Risk Zone", value: "USDA 'Very Heavy'" },
      { label: "Swarmer Size", value: "1/4–3/8 inch with wings" },
      { label: "Avg Repair Cost (AZ)", value: "$3,000–$12,000" },
      { label: "Insurance Coverage", value: "Not covered" },
    ],
    signs: [
      "Mud tubes on foundation walls, piers, or plumbing penetrations",
      "Hollow-sounding wood when tapped with a screwdriver handle",
      "Discarded wings near windows, doors, or light sources after swarming",
      "Small piles of frass (six-sided pellets) below drywood kick-out holes",
      "Bubbling or peeling paint on wood surfaces",
      "Soft or crumbling wood in structural members, door frames, or window sills",
    ],
    faqs: [
      {
        question: "How do I know if I have termites?",
        answer:
          "The most common signs are mud tubes on foundation walls (subterranean termites), hollow-sounding wood, discarded wings near windows after swarming, and small piles of hard pellets called frass (drywood termites). Because termites feed from the inside out, damage is often hidden. A professional inspection with moisture meters and trained eyes is the most reliable way to detect activity early.",
      },
      {
        question: "How much does termite treatment cost in Arizona?",
        answer:
          "Liquid barrier treatments for subterranean termites typically cost $800 to $2,500 depending on the linear footage of the foundation and accessibility. Bait monitoring systems range from $1,200 to $3,000 for installation plus annual monitoring fees. Drywood termite treatments range from $500 for localized injection to $1,500–$4,000 for whole-structure fumigation. Most companies offer warranties covering retreatment.",
      },
      {
        question: "Can I treat termites myself?",
        answer:
          "DIY termite treatments are generally ineffective because they cannot reach the underground colony. Over-the-counter sprays kill individual termites on contact but do not eliminate the colony, which may contain hundreds of thousands of individuals. Professional termiticides are applied at precise concentrations and depths that consumer products cannot replicate. For a problem that causes $5 billion in annual damage, professional treatment is a sound investment.",
      },
      {
        question: "How long does termite treatment last?",
        answer:
          "Modern liquid termiticide barriers (such as Termidor and Taurus SC) typically provide 5 to 10 years of protection when properly applied. Bait monitoring systems provide ongoing protection as long as they are maintained. Drywood termite fumigation eliminates existing colonies but does not prevent re-infestation. Annual inspections are recommended regardless of treatment type.",
      },
      {
        question:
          "Do I need a termite inspection before buying a house in Arizona?",
        answer:
          "Yes. Arizona real estate law requires a WDIIR (Wood-Destroying Insect Inspection Report) for most residential transactions. The inspection covers termites, carpenter ants, wood-boring beetles, and other wood-destroying organisms. Sellers are required to disclose known pest damage. Buyers should insist on a current WDIIR even when not legally required — termite damage averaging $3,000 to $12,000 in repairs is not covered by homeowners insurance.",
      },
    ],
    relatedPests: ["ants", "rodents", "pocket-gophers"],
    relatedBlogSlugs: [
      "how-to-tell-if-you-have-termites-in-arizona",
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 3. MOSQUITOES ───
  {
    slug: "mosquitoes",
    name: "Mosquitoes",
    scientificName: "Aedes spp. / Culex spp.",
    category: "disease-carrier",
    dangerLevel: "Medium",
    image: "🦟",
    seasons: "Spring through fall (peak monsoon season)",
    description:
      "Mosquitoes in Arizona transmit West Nile virus and other diseases. They can detect carbon dioxide exhaled by humans from 100 to 160 feet away and require as little as a thumbtack-sized amount of standing water to breed and lay up to 300 eggs at a time.",
    content: {
      overview:
        "Arizona is home to approximately 40 mosquito species. The two most medically important genera are Aedes (including the invasive Aedes aegypti, the yellow fever mosquito) and Culex (the common house mosquito). Culex quinquefasciatus is the primary vector for West Nile virus in Arizona, while Aedes aegypti can transmit Zika, dengue, and chikungunya — though active transmission of these diseases has not been established in Arizona.\n\nMosquitoes are the deadliest animals on Earth, responsible for more than 700,000 human deaths worldwide each year. In Arizona, West Nile virus is the primary concern. Maricopa County has reported the highest case counts in the state, but cases occur in rural areas as well. Between 2003 and 2024, Arizona has reported over 2,500 confirmed West Nile virus cases.\n\nFemale mosquitoes require a blood meal to produce eggs. They detect hosts through carbon dioxide, body heat, lactic acid, and other chemical cues from distances of 100 to 160 feet. Mosquitoes are most active during the 30 minutes after sunset and the 30 minutes before sunrise.",
      identification:
        "Culex mosquitoes are medium-sized (about 1/4 inch), brownish-gray, and most active at dawn and dusk. They rest with their bodies parallel to the surface. Aedes aegypti is smaller, black with distinctive white stripes on the legs and a lyre-shaped pattern on the thorax. Aedes mosquitoes are aggressive daytime biters and are often found near or inside homes. Mosquito larvae are visible in standing water as small, wriggling comma-shaped organisms that hang from the water surface to breathe.",
      behavior:
        "Female mosquitoes lay 100 to 300 eggs at a time on or near standing water. Aedes aegypti lays eggs on the sides of containers just above the waterline — these eggs can survive dry conditions for months and hatch when rewetted. Culex species lay eggs in rafts that float on the water surface. The complete lifecycle from egg to adult takes 7 to 14 days depending on temperature. A single season can produce 10 or more generations. Mosquitoes do not fly far — most species stay within 300 feet of their breeding site, meaning the mosquitoes biting you likely bred on or near your property.",
      dangers:
        "West Nile virus is the primary mosquito-borne disease in Arizona. Most infected people (80%) show no symptoms. About 20% develop West Nile fever with headache, body aches, and fatigue. Fewer than 1% develop neuroinvasive disease (encephalitis or meningitis), which can be fatal — the fatality rate for neuroinvasive cases is approximately 10%. Individuals over 60 face the highest risk of severe illness. There is no specific treatment or vaccine for West Nile virus. Mosquito bites also cause allergic reactions ranging from mild itching to significant swelling in sensitized individuals.",
      prevention:
        "Eliminate all standing water on your property weekly. Empty plant saucers, bird baths, pet bowls, gutters, tire swings, and any container that holds water. A single bottle cap of water can breed mosquitoes. Fix leaky outdoor faucets and irrigation systems. Stock ornamental ponds with mosquitofish (Gambusia affinis), which are available free from many Arizona county health departments. Install or repair window and door screens — 16-mesh or finer. Use EPA-registered repellents containing DEET (20–30%), picaridin, or oil of lemon eucalyptus when outdoors during peak hours. Wear long sleeves and pants at dawn and dusk.",
      treatment:
        "Hydra Pest Control's mosquito reduction program targets both adult mosquitoes and breeding sites. We apply residual barrier treatments to shaded resting areas — under eaves, in dense vegetation, around patio furniture, and along fence lines. We treat identified breeding sites with larvicides that prevent larvae from developing into adults. Our In2Care mosquito traps use biological agents that female mosquitoes carry back to other breeding sites, creating a multiplier effect. Monthly treatments during mosquito season (April–October) maintain the barrier and suppress populations around your property.",
      localContext:
        "Arizona's monsoon season (July–September) creates a surge in mosquito populations as rain pools in desert washes, irrigation ditches, and low-lying areas. The Gila Valley's irrigated farmland and canal systems provide extensive breeding habitat for Culex mosquitoes. Standing water in agricultural equipment, livestock troughs, and flood-irrigated fields sustains populations throughout the warm months. In the White Mountains, cooler temperatures limit the mosquito season to June through September, but forested areas with natural water features support significant populations. Sierra Vista and the San Pedro River corridor see consistent mosquito activity from spring through fall. Cochise County health authorities have documented West Nile virus activity in the region.",
    },
    quickFacts: [
      { label: "Detection Range", value: "100–160 feet (CO2)" },
      { label: "Breeding Water Needed", value: "Thumbtack-sized amount" },
      { label: "Eggs Per Batch", value: "100–300" },
      { label: "Lifecycle Duration", value: "7–14 days" },
      { label: "Flight Range", value: "~300 feet from breeding site" },
      { label: "Peak Activity", value: "30 min after sunset" },
      { label: "AZ Disease Risk", value: "West Nile virus" },
      { label: "AZ Species Count", value: "~40 species" },
    ],
    signs: [
      "Bites appearing in clusters on exposed skin after outdoor activity",
      "Buzzing sounds at dusk and dawn around doorways and patios",
      "Standing water anywhere on the property — gutters, saucers, tarps, tires",
      "Wriggling larvae visible in still water sources",
    ],
    faqs: [
      {
        question: "Can mosquitoes in Arizona carry West Nile virus?",
        answer:
          "Yes. West Nile virus is actively transmitted by Culex mosquitoes in Arizona. The state has reported over 2,500 confirmed cases since tracking began in 2003. Most cases occur between June and November, peaking during and after monsoon season. Individuals over 60 face the highest risk of severe neuroinvasive disease.",
      },
      {
        question: "Why are mosquitoes so bad during monsoon season in Arizona?",
        answer:
          "Monsoon rains create standing water in desert washes, ditches, and low-lying areas that mosquitoes use as breeding sites. A single rain event can produce millions of mosquitoes within 7 to 14 days. The combination of warm temperatures and temporary water sources makes July through September the peak mosquito period in Arizona.",
      },
      {
        question: "How do I reduce mosquitoes around my Arizona home?",
        answer:
          "Eliminate all standing water weekly — even a bottle cap can breed mosquitoes. Empty plant saucers, clean gutters, fix leaky irrigation, and turn over unused containers. Professional barrier treatments applied to shaded resting areas reduce adult mosquito populations by 70–90% and last 3 to 4 weeks per application.",
      },
      {
        question: "Are Aedes aegypti mosquitoes in Arizona?",
        answer:
          "Yes. The invasive Aedes aegypti mosquito has been established in Arizona since at least 2014. It is found in urban areas across Maricopa, Pinal, and Yuma counties and has been detected in other regions. Unlike most mosquitoes, Aedes aegypti is a daytime biter and breeds in small artificial containers around homes.",
      },
      {
        question: "Do mosquito treatments harm bees or other pollinators?",
        answer:
          "Professional mosquito treatments target shaded resting areas where mosquitoes shelter — under eaves, in dense shrubs, and along fence lines — not flowering plants where pollinators forage. Hydra Pest Control avoids treating blooming plants and applies products in the evening when pollinators are not active, minimizing non-target impact.",
      },
    ],
    relatedPests: ["ticks", "wasps", "bees"],
    relatedBlogSlugs: [
      "mosquito-prevention-tips-for-arizona-summers",
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 4. WASPS ───
  {
    slug: "wasps",
    name: "Wasps",
    scientificName: "Polistes spp. / Vespula spp. / Pepsis grossa",
    category: "venomous",
    dangerLevel: "High",
    image: "🐝",
    seasons: "Spring through fall (peak summer)",
    description:
      "Arizona is home to paper wasps, yellow jackets, and the tarantula hawk wasp — which delivers the most painful insect sting in North America, rated a 4 out of 4 on the Schmidt Pain Index. Wasp nests near building entry points pose serious sting risks, especially for individuals with venom allergies.",
    content: {
      overview:
        "Three major wasp groups cause problems for Arizona homeowners and businesses. Paper wasps (Polistes spp.) build open, umbrella-shaped nests under eaves, porch ceilings, and inside wall voids. They are semi-aggressive and will sting if their nest is disturbed. Yellow jackets (Vespula spp.) build enclosed nests in ground cavities, wall voids, and attics. They are highly aggressive, especially in late summer when colonies reach peak size of 1,000 to 4,000 workers.\n\nThe tarantula hawk (Pepsis grossa) is a striking metallic blue-black wasp with orange wings that grows up to 2 inches long. Its sting is rated 4.0 on the Schmidt Pain Index — the highest possible score — described as 'blinding, fierce, shockingly electric.' Despite the extraordinary pain, the venom is not medically dangerous to most people.\n\nWasp stings cause approximately 62 deaths per year in the United States, more than any other venomous animal. The danger comes primarily from allergic reactions (anaphylaxis), not the venom itself.",
      identification:
        "Paper wasps are slender, 3/4 to 1 inch long, with narrow waists, long legs that dangle during flight, and brown or reddish-brown coloring with yellow markings. Their nests are open-celled, gray, and papery. Yellow jackets are stockier, 1/2 to 3/4 inch long, with bright yellow and black banding. Their nests are enclosed with a single entry hole and are usually hidden — underground, in walls, or in dense vegetation. Tarantula hawks are unmistakable: 1.5 to 2 inches long, metallic blue-black body, bright orange wings, and long legs.",
      behavior:
        "Paper wasp queens emerge from winter hibernation in March and begin nest construction. Colonies grow through summer, peaking at 20 to 75 workers by August. In fall, new queens mate and seek sheltered overwintering sites — often inside attics, wall voids, and garages. Yellow jacket colonies start small in spring and grow aggressively, peaking at 1,000 to 4,000 workers in late summer. Late-season yellow jackets become increasingly aggressive as the colony produces no more workers and forages desperately for protein and sugar. Tarantula hawks are solitary wasps. Females hunt tarantulas, paralyze them with a sting, and lay a single egg on the immobilized spider.",
      dangers:
        "Wasp stings inject venom that causes immediate pain, swelling, and redness at the sting site. Unlike bees, wasps can sting multiple times. Approximately 5% of the population is allergic to Hymenoptera venom. Anaphylactic reactions — difficulty breathing, throat swelling, rapid pulse, and loss of consciousness — can occur within minutes and are life-threatening without epinephrine. An estimated 62 people die from wasp and bee stings annually in the U.S. Yellow jacket stings are the most common cause of anaphylaxis from insects. Ground-nesting yellow jacket colonies are especially dangerous because they can be triggered by lawn mowing or foot traffic, releasing hundreds of aggressive defenders.",
      prevention:
        "Inspect the exterior of your property monthly for new nests — early removal (when nests are golf-ball-sized with 5–10 wasps) is far safer than waiting. Seal gaps around eaves, soffits, and utility penetrations that wasps use to enter wall voids. Keep food and drinks covered during outdoor meals — yellow jackets are attracted to protein and sugary drinks. Do not swat at wasps — rapid movements trigger defensive stinging. Keep garbage cans tightly sealed. Avoid wearing strong perfumes or bright floral patterns outdoors during peak wasp season.",
      treatment:
        "Hydra Pest Control removes wasp nests safely using professional equipment and protective gear. For paper wasp nests, we apply targeted treatments directly to the nest and remove it once activity ceases. Yellow jacket nests in walls or ground cavities require specialized dust or aerosol treatments applied to the entry point. We do not seal nest entrances before treatment — trapped wasps will chew through drywall to escape into living spaces. For properties with recurring wasp problems, our preventive treatments in early spring target queen overwintering sites and reduce colony establishment by 80–90%.",
      localContext:
        "Arizona's warm climate supports year-round wasp activity in lower elevations. In the Gila Valley, paper wasps begin nest construction as early as February. Yellow jackets are common in agricultural areas where protein sources (livestock, feed) are abundant. The tarantula hawk is a signature desert species found throughout southern Arizona — they are commonly seen in Cochise County and the San Pedro River corridor. In the White Mountains, wasp season is shorter (May–October) but colonies can be dense in forested areas. Sierra Vista homeowners frequently encounter paper wasp nests under covered patios and in block wall caps.",
    },
    quickFacts: [
      { label: "Paper Wasp Colony", value: "20–75 workers" },
      { label: "Yellow Jacket Colony", value: "1,000–4,000 workers" },
      { label: "Tarantula Hawk Size", value: "1.5–2 inches" },
      { label: "Pain Index (Tarantula Hawk)", value: "4.0/4.0 (highest)" },
      { label: "US Deaths/Year", value: "~62 (stings)" },
      { label: "Allergy Rate", value: "~5% of population" },
      { label: "Sting Behavior", value: "Multiple stings (not barbed)" },
    ],
    signs: [
      "Visible paper nests under eaves, porch ceilings, or in bushes",
      "Wasps entering and exiting a hole in the ground or wall",
      "Increased wasp activity near outdoor eating areas",
      "Buzzing or scratching sounds inside walls or ceilings",
      "Dead wasps accumulating on windowsills (nest inside wall void)",
    ],
    faqs: [
      {
        question: "What is the most dangerous wasp in Arizona?",
        answer:
          "Yellow jackets are the most dangerous wasp in Arizona due to their aggressive behavior, large colony size (up to 4,000 workers), and ability to sting repeatedly. They cause more anaphylactic reactions than any other insect in the U.S. The tarantula hawk delivers the most painful sting of any insect in North America, but it is not aggressive toward humans and its venom is not medically significant.",
      },
      {
        question: "Should I remove a wasp nest myself?",
        answer:
          "Small paper wasp nests with fewer than 10 wasps can be removed by homeowners using commercial wasp sprays applied at dusk when wasps are less active. Yellow jacket nests, large paper wasp nests, or nests in wall voids should always be handled by professionals. Disturbing a large nest can trigger a mass stinging response — yellow jackets can pursue targets for 100 yards or more.",
      },
      {
        question: "Why do wasps keep coming back to the same spot?",
        answer:
          "Wasps leave pheromone markers on old nest sites that attract new queens the following spring. Even after a nest is removed, pheromone residue on the surface draws new colonizers. Professional removal includes treatment of the nest site with products that neutralize pheromones and deter recolonization.",
      },
      {
        question: "Can wasps sting through clothing?",
        answer:
          "Yellow jackets and paper wasps can sting through thin, tight-fitting clothing. Loose-fitting, light-colored clothing provides better protection. Wasps are more attracted to dark colors and floral patterns. If you encounter an aggressive swarm, cover your face and walk calmly away — do not run or swat, as rapid movement increases aggressive pursuit.",
      },
      {
        question: "When are wasps most aggressive in Arizona?",
        answer:
          "Wasps are most aggressive in late summer (August–October) when colonies reach peak size and begin producing new queens. At this stage, workers forage aggressively for protein and sugar and are easily provoked. Yellow jackets at picnics and outdoor events are typically from late-season colonies competing for food resources.",
      },
    ],
    relatedPests: ["bees", "scorpions", "spiders"],
    relatedBlogSlugs: [
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 5. BEES ───
  {
    slug: "bees",
    name: "Bees",
    scientificName: "Apis mellifera scutellata (hybrid)",
    category: "venomous",
    dangerLevel: "Medium",
    image: "🐝",
    seasons: "Spring through fall (swarms peak spring)",
    description:
      "Africanized honeybees have been established in Arizona since 1993 and now comprise nearly all feral bee colonies in the state. They are 10 times more likely to sting than European honeybees and will pursue perceived threats for up to 1/4 mile.",
    content: {
      overview:
        "Africanized honeybees (AHB) — commonly called 'killer bees' — are a hybrid of African and European honeybee subspecies. They arrived in Arizona in 1993 and have since interbred with European bee populations to the point where virtually all feral (wild) honeybee colonies in the southern half of the state are Africanized. AHBs are physically identical to European honeybees and produce the same honey and wax.\n\nThe critical difference is behavioral. Africanized bees respond to threats with 3 to 10 times more defenders than European bees. They have a larger alarm zone — disturbances 50 to 100 feet from the hive can trigger an attack, compared to 10 to 20 feet for European bees. Once provoked, they will pursue a target for up to 1/4 mile and remain agitated for up to 8 hours.\n\nDespite their reputation, Africanized bees kill fewer than 3 people per year in the U.S. The real danger is mass stinging events — a single colony can deploy thousands of stingers within minutes. People who are unable to flee (the elderly, small children, disabled individuals, and pets) face the greatest risk.",
      identification:
        "Africanized honeybees are virtually identical to European honeybees in appearance — about 1/2 inch long, golden-brown with dark bands. Only laboratory analysis can confirm Africanization. Behavioral cues are the primary identifier: Africanized colonies are more defensive, respond faster to disturbance, nest in smaller, more exposed cavities (meter boxes, overturned pots, wall voids, vehicle undercarriages), and swarm more frequently (6 to 12 times per year vs. 1 to 2 for European bees).",
      behavior:
        "Africanized bees swarm frequently — a healthy colony may swarm 6 to 12 times per year, each swarm containing 5,000 to 20,000 bees. Swarms are temporary clusters of bees traveling to a new nest site. A resting swarm on a tree branch or structure is generally docile and will move on within 24 to 72 hours. The danger begins once a colony establishes a permanent nest. AHBs nest in a wider variety of locations than European bees: water meter boxes, BBQ grills, old tires, wall voids, attic spaces, storage sheds, abandoned vehicles, and underground cavities. They prefer small, enclosed spaces and will defend their nest aggressively.",
      dangers:
        "Individual bee stings are painful but not dangerous for most adults. The average person can safely tolerate 10 stings per pound of body weight. The danger from Africanized bees comes from mass stinging events. A disturbed colony can deploy 200 to 500 stingers within the first 30 seconds. Victims of mass stinging may receive 200 to 1,000 or more stings. The lethal dose for a non-allergic adult is estimated at 500 to 1,200 stings. Approximately 2% of the U.S. population is allergic to bee venom, and a single sting can trigger fatal anaphylaxis in these individuals. Arizona averages 1 to 3 bee-sting fatalities per year.",
      prevention:
        "Inspect your property monthly for new bee activity — colonies can establish within days. Seal holes and gaps larger than 1/8 inch in exterior walls, soffits, and eaves. Cover chimneys with appropriate caps. Secure water meter and utility box covers. Remove potential nesting sites: old tires, overturned pots, abandoned equipment. If you encounter a swarm, stay at least 100 feet away and do not attempt to spray or remove it. Never seal bees inside a wall void — trapped bees will find or create another exit, often into the interior of the building.",
      treatment:
        "Hydra Pest Control performs live bee removal and extermination depending on the situation. Established colonies in structural voids require removal of the entire nest — comb, honey, and bees — to prevent secondary pest problems (ants, roaches, wax moths) and future recolonization. We use professional protective equipment and vacuum systems to remove bees safely. After removal, we seal the entry point and treat the cavity to deter recolonization. DIY removal is extremely dangerous with Africanized bees — surface spraying of an established colony can trigger a massive stinging response that puts everyone in the area at risk.",
      localContext:
        "Every feral honeybee colony in southern Arizona should be assumed to be Africanized. In the Gila Valley, agricultural activity and irrigation provide abundant water and flowering resources that support large bee populations. Abandoned structures and agricultural equipment provide nesting sites. The White Mountains see less Africanized bee activity due to higher elevation and cooler winters, but colonies are present in Show Low and Pinetop-Lakeside. Sierra Vista and the Cochise County desert floor are high-activity zones — the warm climate allows year-round bee activity. Arizona typically reports 1 to 3 bee-sting fatalities per year, making professional management essential.",
    },
    quickFacts: [
      { label: "AHB in Arizona Since", value: "1993" },
      { label: "Swarm Frequency", value: "6–12 times/year" },
      { label: "Pursuit Distance", value: "Up to 1/4 mile" },
      { label: "Alarm Zone", value: "50–100 feet" },
      { label: "Colony Size", value: "10,000–60,000 bees" },
      { label: "AZ Fatalities/Year", value: "1–3" },
      { label: "Allergy Rate (US)", value: "~2% of population" },
    ],
    signs: [
      "Heavy bee traffic entering and exiting a hole in a structure",
      "A swarm cluster on a tree branch, fence, or wall",
      "Buzzing or humming sounds inside walls or ceilings",
      "Honey staining or moisture spots on interior walls",
      "Increased bee activity around water sources",
    ],
    faqs: [
      {
        question: "Are all bees in Arizona Africanized?",
        answer:
          "Virtually all feral (wild) honeybee colonies in southern Arizona are Africanized. Managed beekeeping operations maintain European stock through controlled queen breeding, but any unmanaged colony should be assumed Africanized. There is no visual way to distinguish Africanized from European honeybees — only laboratory analysis or behavioral observation can confirm the difference.",
      },
      {
        question: "Why is DIY bee removal dangerous in Arizona?",
        answer:
          "Spraying an Africanized bee colony with consumer insecticide agitates the colony without killing it quickly. A disturbed colony can deploy hundreds of stingers within seconds and pursue targets for up to 1/4 mile. Professional removal uses specialized equipment and techniques to manage the colony safely. Never seal bees inside a wall — they will find another exit, often into your living space.",
      },
      {
        question: "What should I do if I see a bee swarm?",
        answer:
          "Stay at least 100 feet away and keep children and pets indoors. A resting swarm is temporary — bees are searching for a new nest site and are generally docile because they have no comb or brood to defend. Most swarms move on within 24 to 72 hours. If the swarm remains after 3 days or establishes in a structure, call a professional for removal.",
      },
      {
        question: "How quickly can bees establish a hive in my wall?",
        answer:
          "Scout bees can identify a suitable wall void and begin moving a colony in within 24 to 48 hours. Within a week, the colony will have constructed comb and the queen will be laying eggs. Within 2 to 3 weeks, the colony is fully established and highly defensive. The longer a colony remains, the more difficult and costly removal becomes — comb left inside walls attracts ants, roaches, and future bee colonies.",
      },
      {
        question: "Can I save the bees instead of killing them?",
        answer:
          "Live bee relocation is possible when the colony is accessible and the situation is not an immediate safety threat. Hydra Pest Control works with local beekeepers to rehome colonies when feasible. However, Africanized colonies in structural voids often cannot be safely relocated and require extermination to protect residents. The decision is based on colony location, accessibility, and the risk to people nearby.",
      },
    ],
    relatedPests: ["wasps", "scorpions", "ants"],
    relatedBlogSlugs: [
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 6. ROACHES ───
  {
    slug: "roaches",
    name: "Cockroaches",
    scientificName: "Blattella germanica / Periplaneta americana",
    category: "disease-carrier",
    dangerLevel: "Medium",
    image: "🪳",
    seasons: "Year-round (peak summer)",
    description:
      "German and American cockroaches are the two most common species in Arizona homes. German cockroaches reproduce faster than almost any household pest — a single female can produce 300,000 descendants in one year — and their shed skins and droppings are a leading trigger for childhood asthma.",
    content: {
      overview:
        "Two cockroach species dominate Arizona infestations. The German cockroach (Blattella germanica) is the more serious indoor pest — it is found almost exclusively inside structures and is the most prolific breeder of any household cockroach. A single female carries 30 to 40 eggs in a purse-shaped case (ootheca) and can produce a new case every 6 weeks. Under ideal conditions, a pair of German cockroaches can theoretically produce 300,000 descendants in a single year.\n\nThe American cockroach (Periplaneta americana) — often called a 'water bug' or 'sewer roach' — is the largest common cockroach at 1.5 to 2 inches long. It prefers damp, warm environments like sewer systems, basements, and commercial kitchens. American roaches occasionally invade homes from exterior harborage, especially during temperature extremes.\n\nCockroaches are among the most resilient organisms on Earth. They can survive without food for a month, hold their breath for 40 minutes, and withstand up to 900 times their body weight in compression. A German cockroach can live for a week without its head.",
      identification:
        "German cockroaches are 1/2 to 5/8 inch long, light brown to tan, with two dark parallel stripes running down the pronotum (the plate behind the head). They have wings but rarely fly. Nymphs are smaller, darker, and wingless. American cockroaches are 1.5 to 2 inches long, reddish-brown, with a yellowish figure-eight pattern on the pronotum. They can fly short distances in warm weather — a behavior that surprises many homeowners. Egg cases (oothecae) are another identifier: German oothecae are tan, ridged, and 1/4 inch long; American oothecae are dark brown, smooth, and 3/8 inch long.",
      behavior:
        "German cockroaches are nocturnal and thigmotactic — they prefer to be in contact with surfaces on both sides of their body. They congregate in cracks, crevices, and voids near heat and moisture: under sinks, behind refrigerators, inside dishwasher motors, and in microwave clock housings. If you see German cockroaches during the day, the infestation is severe — the population has exceeded available harborage. American cockroaches prefer damp, dark spaces and are commonly found in sewer systems, drain lines, and crawl spaces. They enter homes through floor drains, gaps around pipes, and under doors. In Arizona, they are more common in irrigated areas and older construction.",
      dangers:
        "Cockroaches spread at least 33 species of bacteria (including Salmonella and E. coli), 6 species of parasitic worms, and at least 7 other human pathogens. They contaminate food and surfaces with bacteria from their bodies, feces, and regurgitated material. Cockroach allergens — proteins found in their droppings, shed skins, and saliva — are a major trigger for asthma, especially in children. Studies show that cockroach allergens are present in 85% of U.S. urban homes and are a leading cause of childhood asthma in inner-city environments. German cockroach infestations also produce a distinctive musty odor that permeates food, clothing, and living spaces.",
      prevention:
        "Sanitation is the foundation of cockroach prevention. Store food in sealed containers, clean up crumbs and spills immediately, and do not leave pet food out overnight. Take garbage out daily and use cans with tight-fitting lids. Fix plumbing leaks — cockroaches need water more than food. Seal gaps around pipes, drains, and utility penetrations with caulk or expanding foam. Install drain covers on floor drains. Declutter storage areas — cardboard boxes are a favorite harborage for German cockroaches. Inspect grocery bags, boxes, and used appliances before bringing them inside.",
      treatment:
        "Hydra Pest Control treats cockroach infestations using integrated pest management (IPM). For German cockroaches, we apply gel baits in cracks and crevices near harborage areas — baits are more effective than sprays because cockroaches share bait through trophallaxis (mouth-to-mouth feeding) and coprophagy (feces consumption), spreading the active ingredient through the colony. We also use growth regulators that prevent nymphs from reaching maturity. For American cockroaches, we treat exterior harborage areas, sewer access points, and create a perimeter barrier. Severe infestations may require multiple treatment visits over 2 to 4 weeks. We always address sanitation and exclusion issues as part of the treatment plan.",
      localContext:
        "Arizona's warm, dry climate actually favors cockroach infestations in irrigated residential areas where moisture is available. In the Gila Valley, German cockroach populations thrive in apartments, restaurants, and homes with plumbing issues. American cockroaches are common near agricultural areas and older homes with floor drains connected to sewer or septic systems. The White Mountains region sees fewer cockroach problems due to cooler temperatures, but German cockroaches persist year-round in heated structures. Sierra Vista's military community — with frequent housing turnover and shared-wall living — creates conditions where German cockroach infestations spread between units.",
    },
    quickFacts: [
      { label: "German Size", value: "1/2–5/8 inch" },
      { label: "American Size", value: "1.5–2 inches" },
      { label: "German Reproduction", value: "300K descendants/year" },
      { label: "Eggs Per Case", value: "30–40 (German)" },
      { label: "Survival Without Food", value: "Up to 1 month" },
      { label: "Bacteria Spread", value: "33+ species" },
      { label: "Asthma Trigger", value: "Present in 85% of US homes" },
    ],
    signs: [
      "Droppings resembling black pepper or coffee grounds in cabinets and drawers",
      "Musty or oily odor in kitchen, bathroom, or storage areas",
      "Egg cases (oothecae) found in hidden crevices",
      "Daytime sightings of cockroaches (indicates severe infestation)",
      "Shed skins and smear marks along baseboards and cabinet edges",
    ],
    faqs: [
      {
        question:
          "What is the difference between German and American cockroaches?",
        answer:
          "German cockroaches are small (1/2 inch), light brown with two dark stripes, and live exclusively indoors. They are prolific breeders and the most difficult cockroach to eliminate. American cockroaches are large (1.5–2 inches), reddish-brown, and primarily live outdoors in sewers and damp areas. They enter homes occasionally but do not typically establish permanent indoor colonies the way German cockroaches do.",
      },
      {
        question: "Why do I have roaches if my house is clean?",
        answer:
          "German cockroaches are hitchhikers — they enter homes in grocery bags, cardboard boxes, used appliances, and even purses. A clean home slows reproduction by limiting food resources, but it will not eliminate an established colony. German cockroaches also live in the internal voids of appliances (dishwasher motors, microwave clocks, coffee makers) where cleaning does not reach.",
      },
      {
        question: "Do cockroaches cause asthma?",
        answer:
          "Yes. Proteins found in cockroach droppings, shed skins, and saliva are a major trigger for asthma and allergic reactions, particularly in children. The National Institute of Environmental Health Sciences identifies cockroach allergens as present in 85% of U.S. urban homes. Eliminating cockroach infestations measurably reduces asthma symptoms in affected individuals.",
      },
      {
        question: "Why are roach sprays not working?",
        answer:
          "Over-the-counter sprays kill roaches on contact but repel others away from treated areas — scattering the colony deeper into walls and making professional treatment harder. German cockroaches have also developed resistance to many pyrethroid insecticides used in consumer sprays. Professional gel baits work differently: cockroaches eat the bait and spread it through the colony via feeding and fecal contact, eliminating the population from within.",
      },
      {
        question: "How long does it take to get rid of German cockroaches?",
        answer:
          "A professional treatment plan typically achieves 90% reduction within 2 to 3 weeks and full control within 4 to 6 weeks. Severe infestations may require 2 to 3 treatment visits. The timeline depends on infestation severity, sanitation cooperation, and whether adjacent units (in apartments) are also treated. German cockroach eggs hatch every 28 days, so follow-up treatments are essential to break the reproductive cycle.",
      },
    ],
    relatedPests: ["ants", "scorpions", "rodents"],
    relatedBlogSlugs: [
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 7. BED BUGS ───
  {
    slug: "bed-bugs",
    name: "Bed Bugs",
    scientificName: "Cimex lectularius",
    category: "nuisance",
    dangerLevel: "Medium",
    image: "🛏️",
    seasons: "Year-round",
    description:
      "Bed bugs (Cimex lectularius) are parasitic insects that feed exclusively on human blood, typically at night while the host sleeps. They are expert hitchhikers that spread through luggage, clothing, and used furniture, and professional treatment with follow-up visits is required for reliable elimination.",
    content: {
      overview:
        "Bed bugs experienced a dramatic global resurgence beginning in the late 1990s after decades of near-eradication in developed countries. The resurgence is attributed to increased international travel, resistance to pyrethroid insecticides, and the phase-out of DDT. Today, bed bugs are found in every U.S. state and infest homes, hotels, dormitories, hospitals, and public transportation regardless of cleanliness or income level.\n\nAdult bed bugs are flat, oval, reddish-brown, and about the size of an apple seed (4–5 mm). After feeding, they swell to nearly twice their size and become more elongated and reddish. A female bed bug lays 1 to 5 eggs per day and 200 to 500 eggs in her lifetime. Eggs hatch in 6 to 10 days, and nymphs can reach adulthood in as little as 5 weeks under favorable conditions.\n\nBed bugs are nocturnal feeders that locate hosts by detecting carbon dioxide, body heat, and chemical cues. They feed for 3 to 10 minutes and then retreat to harborage within 5 to 20 feet of the host. A bed bug can survive without feeding for 2 to 6 months — up to 12 months in cool conditions.",
      identification:
        "Adult bed bugs are flat, oval, wingless, reddish-brown, and 4 to 5 mm long — roughly the size and shape of an apple seed. Nymphs are translucent to yellowish-white and nearly invisible until they feed. Eggs are white, 1 mm long, and often deposited in clusters in seams, crevices, and joints. Key indicators include: dark fecal spots (digested blood) on mattress seams, sheets, and headboards; shed skins (exuviae) along mattress piping; and a sweet, musty odor in heavily infested rooms. Bites typically appear in lines or clusters on exposed skin — face, neck, arms, and hands.",
      behavior:
        "Bed bugs are obligate blood feeders — they cannot survive on any other food source. They prefer human blood but will feed on pets if necessary. Feeding occurs at night, peaking between 2 AM and 5 AM. Bed bugs inject an anticoagulant and anesthetic during feeding, which is why bites are not felt until later. After feeding, they retreat to cracks, crevices, mattress seams, headboard joints, electrical outlets, and picture frames. Bed bugs spread primarily through human activity: infested luggage in hotels, used furniture from thrift stores, laundry in shared facilities, and visitors carrying bugs on clothing. They do not fly or jump and cannot traverse smooth vertical surfaces.",
      dangers:
        "Bed bugs are not known to transmit any infectious diseases to humans. The primary health impacts are allergic reactions to bites (ranging from no reaction to severe itching and welts), secondary infections from scratching, sleep deprivation, and significant psychological distress including anxiety and insomnia. Studies have documented PTSD-like symptoms in individuals following severe infestations. The economic impact is substantial: treatment costs range from $500 to $3,000 depending on severity and treatment method, and infested furniture and belongings are often discarded unnecessarily.",
      prevention:
        "Inspect hotel rooms before unpacking — check mattress seams, headboard, and nightstand for dark spots and shed skins. Keep luggage on hard surfaces or luggage racks, never on the bed or carpeted floor. After traveling, wash and dry all clothing on high heat (130°F for 30 minutes kills all life stages). Inspect used furniture thoroughly before bringing it inside — bed bugs hide in seams, joints, and screw holes. Use mattress and box spring encasements. Reduce clutter around the bed to minimize harborage. Never pick up discarded mattresses or upholstered furniture from the curb.",
      treatment:
        "Hydra Pest Control uses an integrated approach to bed bug elimination. Chemical treatments include targeted application of residual insecticides, desiccant dusts, and growth regulators to harborage areas. We recommend heat treatment for severe infestations — professional equipment heats the room to 120–140°F for several hours, which kills all life stages including eggs. Chemical treatment alone typically requires 2 to 3 visits spaced 10 to 14 days apart to catch newly hatched nymphs. We provide detailed preparation instructions for residents and conduct follow-up inspections to confirm elimination. Our treatment comes with a 30-day warranty.",
      localContext:
        "Bed bugs are less associated with climate and more with human activity patterns. In Arizona, infestations are common in multi-unit housing, hotels along major highways (I-10, I-17), and rental properties with frequent tenant turnover. Military installations near Sierra Vista (Fort Huachuca) and transient housing see periodic bed bug issues. In the Gila Valley, bed bugs are introduced through travel and used furniture purchases. The White Mountains tourism industry — vacation rentals, campgrounds, and lodges — creates opportunities for bed bug spread during peak travel seasons.",
    },
    quickFacts: [
      { label: "Adult Size", value: "4–5 mm (apple seed)" },
      { label: "Eggs Per Lifetime", value: "200–500" },
      { label: "Egg Hatch Time", value: "6–10 days" },
      { label: "Survival Without Food", value: "2–12 months" },
      { label: "Feeding Duration", value: "3–10 minutes" },
      { label: "Peak Feeding Time", value: "2 AM – 5 AM" },
      { label: "Heat Kill Temp", value: "120°F+ (all stages)" },
      { label: "Treatment Cost Range", value: "$500–$3,000" },
    ],
    signs: [
      "Itchy bites in lines or clusters on exposed skin upon waking",
      "Dark fecal spots (digested blood) on mattress seams and sheets",
      "Tiny blood smears on pillowcases and bed linens",
      "Shed skins (translucent exoskeletons) along mattress piping and headboard",
      "Sweet, musty odor in the bedroom (heavy infestation)",
      "Live bugs visible in mattress seams, headboard joints, or outlet covers",
    ],
    faqs: [
      {
        question: "How do I know if I have bed bugs?",
        answer:
          "The most reliable signs are dark fecal spots (small black dots of digested blood) on mattress seams, shed skins along mattress piping, and bites appearing in lines or clusters on exposed skin. Pull back the sheets and inspect mattress seams, especially at corners and along the headboard. Use a flashlight to check crevices in the bed frame and nightstand. If you find signs, contact a professional — bed bugs multiply rapidly and early treatment is far more effective.",
      },
      {
        question: "Can I get rid of bed bugs without a professional?",
        answer:
          "DIY bed bug treatment has a very low success rate. Over-the-counter sprays kill bugs on contact but do not reach eggs or bugs hidden deep in crevices and wall voids. Bug bombs (foggers) are ineffective against bed bugs and can scatter them to new areas. Professional treatment using targeted insecticides, desiccant dusts, and/or heat treatment is the only reliable method for complete elimination.",
      },
      {
        question: "Do bed bugs only live in dirty homes?",
        answer:
          "No. Bed bugs are found in homes, hotels, hospitals, and dormitories regardless of cleanliness. They feed on blood, not filth. Five-star hotels report bed bug issues as frequently as budget motels. The primary risk factor is not cleanliness but exposure — travel, visitors, used furniture purchases, and proximity to infested units in multi-family housing.",
      },
      {
        question: "How long does bed bug treatment take?",
        answer:
          "Heat treatment typically takes 6 to 8 hours for a single room and achieves same-day kill of all life stages. Chemical treatment requires 2 to 3 visits spaced 10 to 14 days apart to catch nymphs that hatch from eggs after the initial treatment. Complete elimination is typically confirmed 30 days after the final treatment through a follow-up inspection.",
      },
      {
        question: "Can bed bugs spread from apartment to apartment?",
        answer:
          "Yes. Bed bugs travel between adjoining units through shared wall voids, electrical conduits, plumbing penetrations, and under doors. In multi-unit buildings, treating a single unit often results in reoccurrence from neighboring infestations. Effective management requires inspection and treatment of adjacent units, which is the landlord's responsibility under Arizona tenant law.",
      },
    ],
    relatedPests: ["ticks", "spiders", "roaches"],
    relatedBlogSlugs: [
      "bed-bug-treatment-what-to-expect-during-professional-service",
    ],
  },

  // ─── 8. SPIDERS ───
  {
    slug: "spiders",
    name: "Spiders",
    scientificName: "Latrodectus hesperus / Loxosceles spp.",
    category: "venomous",
    dangerLevel: "Medium",
    image: "🕷️",
    seasons: "Year-round (peak spring–fall)",
    description:
      "Arizona is home to both black widow spiders (Latrodectus hesperus) and brown recluse spiders (Loxosceles spp.), both of which deliver medically significant bites. The western black widow is the most common venomous spider in the state, found in garages, sheds, and undisturbed outdoor areas.",
    content: {
      overview:
        "While Arizona hosts hundreds of spider species, only two groups are medically significant: black widows and brown recluses. Most other spiders — including the large and intimidating desert tarantula — are harmless to humans and serve as beneficial predators that consume insects.\n\nThe western black widow (Latrodectus hesperus) is the most common venomous spider in Arizona. Females are jet black with a red or orange hourglass marking on the underside of the abdomen. They build irregular, messy webs in undisturbed, sheltered locations close to the ground. Black widows are responsible for the majority of medically significant spider bites in the state.\n\nBrown recluse spiders (Loxosceles arizonica and related species) are present in Arizona but less common than in the central and southern U.S. The Arizona brown spider (Loxosceles arizonica) is the native species. True Loxosceles reclusa (the brown recluse) is occasionally introduced via moving boxes and shipping. Brown recluse bites are rare but can cause tissue necrosis (dermonecrotic lesion) that takes weeks to heal.",
      identification:
        "Black widows: females are 1/2 inch body length, shiny jet-black, with a distinctive red or orange hourglass marking on the ventral (underside) abdomen. Males are smaller, brown, and harmless. Webs are irregular and tangled, usually within 18 inches of the ground. Brown recluses: 1/4 to 1/2 inch body length, light to medium brown, with a darker violin-shaped marking on the cephalothorax (the 'fiddle' points toward the abdomen). They have 6 eyes arranged in 3 pairs — most spiders have 8 eyes. Brown recluses do not build webs for prey capture; they are active hunters.",
      behavior:
        "Black widows are shy, non-aggressive spiders that bite only when trapped against skin — typically when a person puts on a glove, shoe, or reaches into a dark space where a widow is resting. They are nocturnal and prefer undisturbed locations: garages, meter boxes, woodpiles, outdoor furniture, and irrigation valve boxes. Peak activity is spring through fall, but they survive winter in sheltered harborage.\n\nBrown recluses are also reclusive — hence the name — and prefer dark, undisturbed spaces: closets, storage boxes, behind picture frames, and in seldom-worn clothing. Bites typically occur when the spider is trapped inside clothing, bedding, or shoes. They are most active at night and can go 6 months without food.",
      dangers:
        "Black widow venom is a neurotoxin (alpha-latrotoxin) that causes latrodectism: intense muscle pain and cramping radiating from the bite site, abdominal rigidity, nausea, sweating, and elevated blood pressure. Symptoms peak within 2 to 3 hours and may persist for 24 to 72 hours. Fatalities are extremely rare (fewer than 1% of treated bites) but bites are painful and require medical attention, especially for children and the elderly. Antivenom is available.\n\nBrown recluse venom contains sphingomyelinase D, which destroys tissue at the bite site. Most bites heal without complications, but approximately 10% develop a necrotic lesion — a slow-healing ulcer that can take 6 to 8 weeks to close. Rarely, bites cause systemic reactions including hemolytic anemia and kidney damage. There is no antivenom for brown recluse bites.",
      prevention:
        "Reduce spider habitat by eliminating clutter in garages, sheds, and storage areas. Shake out shoes, gloves, and clothing stored in dark areas before wearing. Install yellow sodium-vapor or LED lights for exterior lighting — these attract fewer insects, reducing the prey base that draws spiders. Seal gaps around doors, windows, and utility penetrations. Move woodpiles, rock landscaping, and debris away from the foundation. Regular professional pest control reduces insect prey populations, which in turn reduces spider populations.",
      treatment:
        "Hydra Pest Control addresses spider infestations by targeting both spiders and their prey base. We apply residual treatments to exterior perimeter areas where spiders build webs, including eaves, window frames, door frames, and foundation walls. Interior treatments focus on known harborage: garages, closets, storage rooms, and bathrooms. We remove webs and egg sacs during each service visit. For properties with heavy black widow populations, we conduct targeted inspections of meter boxes, irrigation valve covers, and block wall gaps. Reducing the insect prey base through regular perimeter treatment is the most effective long-term spider control strategy.",
      localContext:
        "Western black widows are extremely common throughout Arizona, including all three Hydra Pest Control service areas. In the Gila Valley, they are found in nearly every home's garage, storage shed, and exterior utility box. Agricultural areas provide abundant insect prey that supports large widow populations. The White Mountains region has fewer widows at higher elevations but they are present in Show Low and Pinetop. Sierra Vista and Cochise County have dense black widow populations year-round. Arizona brown spiders (Loxosceles arizonica) are most common in southern Arizona. They are rarely found in large numbers and are much less aggressive than their central U.S. relative, the brown recluse.",
    },
    quickFacts: [
      { label: "Black Widow Size", value: "1/2 inch (female body)" },
      { label: "Brown Recluse Size", value: "1/4–1/2 inch body" },
      { label: "Black Widow Venom", value: "Neurotoxin" },
      { label: "Brown Recluse Venom", value: "Cytotoxin (tissue damage)" },
      { label: "Necrotic Bite Rate", value: "~10% of recluse bites" },
      { label: "Black Widow Eyes", value: "8 eyes" },
      { label: "Brown Recluse Eyes", value: "6 eyes (3 pairs)" },
    ],
    signs: [
      "Irregular, tangled webs near ground level in garages and sheds",
      "Egg sacs (round, papery, white/tan) in dark corners and recesses",
      "Sightings of black spiders with red hourglass on underside",
      "Small brown spiders with violin marking found in closets or storage boxes",
      "Increased insect activity (indicates prey base that attracts spiders)",
    ],
    faqs: [
      {
        question: "How dangerous is a black widow bite?",
        answer:
          "Black widow bites cause intense muscle pain and cramping, nausea, and elevated blood pressure. The symptoms are painful and require medical attention but are rarely fatal — fewer than 1% of treated bites result in death. Children, the elderly, and immunocompromised individuals face the highest risk. Antivenom is available for severe reactions. Seek medical care promptly after any suspected black widow bite.",
      },
      {
        question: "Are brown recluse spiders in Arizona?",
        answer:
          "Arizona has its own native species, the Arizona brown spider (Loxosceles arizonica), which is found throughout the southern half of the state. True brown recluse spiders (Loxosceles reclusa) are occasionally introduced via moving boxes and shipping. Both species have medically significant bites, but encounters are relatively rare because they are nocturnal, reclusive, and not aggressive.",
      },
      {
        question: "How do I tell if a spider bite is serious?",
        answer:
          "Seek medical attention if the bite area develops a growing red zone, blister, or dark discoloration within 2 to 8 hours (possible recluse bite). For suspected black widow bites, watch for muscle cramping, abdominal pain, and difficulty breathing. Most spider bites cause only mild redness and swelling that resolves within a few days. If you can safely capture or photograph the spider, bring it to the medical visit for identification.",
      },
      {
        question: "Why are there so many spiders in my garage?",
        answer:
          "Garages provide everything spiders need: dark sheltered space, consistent temperature, and abundant prey insects attracted to exterior lighting and stored items. Black widows are especially common in Arizona garages because the undisturbed clutter and ground-level access provide ideal web sites. Regular pest control that reduces the insect population removes the food source and naturally decreases spider numbers.",
      },
      {
        question: "Do spiders come inside more during certain seasons?",
        answer:
          "Spider activity inside homes increases in fall when males wander in search of mates and in winter when outdoor temperatures drop. However, the most effective way to reduce indoor spiders year-round is to control their food supply. A home with a professional pest control barrier has fewer insects, which means fewer spiders follow them inside.",
      },
    ],
    relatedPests: ["scorpions", "roaches", "ants"],
    relatedBlogSlugs: [
      "scorpion-season-in-arizona-what-homeowners-need-to-know",
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 9. ANTS ───
  {
    slug: "ants",
    name: "Ants",
    scientificName: "Solenopsis spp. / Camponotus spp. / Pogonomyrmex spp.",
    category: "nuisance",
    dangerLevel: "Low",
    image: "🐜",
    seasons: "Year-round (peak spring–summer)",
    description:
      "Arizona's most problematic ant species are fire ants, carpenter ants, and harvester ants. Carpenter ants excavate wood to build nests and can cause structural damage similar to termites, while fire ants deliver painful venomous stings that cause pustules lasting up to 10 days.",
    content: {
      overview:
        "Arizona has more than 300 ant species, but three groups cause the most concern for homeowners. Red imported fire ants (Solenopsis invicta) are aggressive stinging ants that have expanded their range into central and southern Arizona. They build conspicuous mounds and attack in mass when disturbed, delivering painful stings that produce white pustules. Carpenter ants (Camponotus spp.) are large, black or bicolored ants that excavate wood to create nest galleries. Unlike termites, they do not eat wood — they remove it to create smooth tunnels for their colony. Harvester ants (Pogonomyrmex spp.) build large, bare-earth mounds in yards and desert areas and deliver painful stings.\n\nAdditionally, many Arizona homeowners deal with nuisance ants — odorous house ants, Argentine ants, and crazy ants — that invade kitchens and bathrooms in large numbers but cause no structural damage.\n\nAnt colonies are remarkably organized. A single fire ant colony can contain 200,000 to 500,000 workers. Carpenter ant colonies are smaller (3,000 to 10,000) but longer-lived, persisting for 15 to 20 years.",
      identification:
        "Fire ants are small (1/8 to 1/4 inch), reddish-brown, and build dome-shaped mounds of loose soil, often 12 to 18 inches in diameter. When the mound is disturbed, hundreds of ants swarm out aggressively. Carpenter ants are large (1/4 to 1/2 inch), black or black-and-red, with a smooth, evenly rounded thorax profile. They leave piles of coarse, sawdust-like frass (wood shavings mixed with insect parts) below their nest openings. Harvester ants are medium-sized (1/4 to 1/2 inch), red to dark brown, with large heads and a distinctive beard of long hairs on the underside of the head. Their mounds are flat-topped or slightly domed with a bare, cleared area (3 to 6 feet in diameter) surrounding the entrance.",
      behavior:
        "Fire ants are active in warm weather and retreat underground during extreme heat or cold. They are attracted to electrical equipment and have caused damage to air conditioners, junction boxes, and irrigation controllers. Their mounds appear after rain when soil is easier to excavate. Carpenter ants are nocturnal and forage along regular trails. They prefer damp, decaying wood for initial nest construction but will expand into sound wood. Satellite colonies (without a queen) may be established in structures while the parent colony remains in a nearby tree. Harvester ants are diurnal foragers that collect seeds in long, visible trails radiating from the mound entrance.",
      dangers:
        "Fire ant stings produce immediate burning pain followed by white, fluid-filled pustules that persist for 7 to 10 days. Multiple stings are common because fire ants grip with their jaws and sting repeatedly. Approximately 1% of the population is allergic to fire ant venom, and mass stinging events can cause anaphylaxis. Fire ants cause an estimated $6 billion in annual damage in the U.S. from agricultural losses, infrastructure damage, and medical costs. Carpenter ants cause structural damage by excavating galleries in wood. While they work more slowly than termites, an untreated carpenter ant colony can weaken structural members over several years. Harvester ant stings are the most painful of the three — rated 3.0 on the Schmidt Pain Index — but colonies are typically found in yards rather than structures.",
      prevention:
        "Keep food sealed and clean up spills immediately. Trim vegetation so branches and shrubs do not touch the structure — ants use these as bridges. Seal cracks and gaps around the foundation, windows, and doors. Address moisture problems — carpenter ants target damp, decaying wood. Replace water-damaged wood promptly. Store firewood at least 20 feet from the structure and elevate it off the ground. For fire ants, treat mounds promptly before colonies mature. For harvester ants, clear the area around the mound entrance to reduce the colony's food supply.",
      treatment:
        "Hydra Pest Control tailors ant treatments to the species. Fire ant colonies are treated with targeted mound treatments using granular or liquid insecticide that is carried deep into the colony. For carpenter ants, we locate the parent colony (often in a tree or stump near the structure) and satellite nests using moisture meters and tapping surveys. We treat nests directly with dust and liquid insecticide and address the moisture conditions that attracted them. For nuisance ants (odorous house ants, Argentine ants), we use non-repellent liquid baits and perimeter treatments that ants carry back to the colony, achieving colony elimination rather than just killing foragers. Regular perimeter treatments prevent reinfestation.",
      localContext:
        "Red imported fire ants are an increasing concern in central and southern Arizona. They have been documented in the Gila Valley and Cochise County, where irrigated agriculture and urban development provide suitable habitat. Carpenter ants are common in the White Mountains due to the abundance of tree cover and the moist conditions in forested areas. Homes with wood-to-soil contact or water damage are especially vulnerable. In Sierra Vista, both fire ants and harvester ants are common in residential yards. Harvester ants are ubiquitous in desert and semi-arid areas throughout all three Hydra service regions. Odorous house ants and Argentine ants are the most common kitchen invaders across all locations.",
    },
    quickFacts: [
      { label: "Fire Ant Colony", value: "200,000–500,000 workers" },
      { label: "Carpenter Ant Colony", value: "3,000–10,000 workers" },
      { label: "Fire Ant Sting", value: "Pustules lasting 7–10 days" },
      { label: "Carpenter Ant Damage", value: "Similar to termites" },
      { label: "Harvester Ant Pain", value: "3.0/4.0 Schmidt Index" },
      { label: "Carpenter Colony Lifespan", value: "15–20 years" },
      { label: "Fire Ant US Damage", value: "$6 billion/year" },
    ],
    signs: [
      "Ant trails along baseboards, counters, or exterior walls",
      "Dome-shaped soil mounds in the yard (fire ants)",
      "Coarse sawdust-like frass piles below wood surfaces (carpenter ants)",
      "Bare, cleared circular areas in the yard (harvester ants)",
      "Winged ants swarming near windows (new colony reproductives)",
      "Rustling sounds inside walls (carpenter ant excavation)",
    ],
    faqs: [
      {
        question: "What is the difference between carpenter ants and termites?",
        answer:
          "Carpenter ants excavate wood to create nesting galleries but do not eat wood — they push it out as coarse, sawdust-like frass. Termites consume wood as food and leave mud tubes and smooth-walled tunnels. Carpenter ant frass is visible and contains insect parts; termite damage is typically hidden inside the wood. Both cause structural damage, but termites work faster and cause more extensive damage. If you find wood shavings with insect parts, it's carpenter ants. If you find mud tubes or hollow wood with no visible debris, it's likely termites.",
      },
      {
        question: "Are fire ants in Arizona?",
        answer:
          "Yes. Red imported fire ants (Solenopsis invicta) have been established in Arizona since the early 2000s and their range continues to expand. They are found in irrigated residential and agricultural areas in central and southern Arizona, including the Gila Valley and Cochise County. Fire ant mounds appear in lawns, garden beds, and near irrigation equipment.",
      },
      {
        question: "Why do ants keep coming back after I spray them?",
        answer:
          "Killing visible forager ants with spray does not affect the colony. The queen, who produces all the workers, is safely deep in the nest. Repellent sprays actually worsen the problem by causing the colony to 'bud' — split into multiple smaller colonies. Non-repellent baits and professional perimeter treatments are carried back to the colony and shared, eliminating the queen and the colony from within.",
      },
      {
        question: "How do I know if I have carpenter ants?",
        answer:
          "Look for piles of coarse, sawdust-like frass below wood surfaces — this debris contains wood shavings mixed with insect body parts. You may hear faint rustling sounds inside walls. Carpenter ants are large (1/4 to 1/2 inch), black or black-and-red, and most active at night. They target damp or water-damaged wood first, so check areas with moisture history: around leaky pipes, window frames, and roof lines.",
      },
      {
        question: "Can ants damage electrical equipment?",
        answer:
          "Yes. Fire ants are attracted to electrical equipment and have been documented causing damage to air conditioning units, junction boxes, irrigation controllers, and transformer boxes. They nest inside equipment housings and their bodies can short-circuit relays and contacts. In the southern U.S., fire ant damage to electrical equipment causes millions of dollars in losses annually.",
      },
    ],
    relatedPests: ["termites", "roaches", "scorpions"],
    relatedBlogSlugs: [
      "how-to-tell-if-you-have-termites-in-arizona",
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 10. RODENTS ───
  {
    slug: "rodents",
    name: "Rodents",
    scientificName: "Rattus rattus / Neotoma spp. / Mus musculus",
    category: "disease-carrier",
    dangerLevel: "High",
    image: "🐀",
    seasons: "Year-round (peak fall–winter indoors)",
    description:
      "Roof rats, pack rats (wood rats), and house mice are the most common rodent pests in Arizona. They chew through electrical wiring — causing an estimated 20–25% of undetermined house fires — and can squeeze through openings as small as a dime (mice) or a quarter (rats).",
    content: {
      overview:
        "Three rodent species dominate Arizona pest problems. Roof rats (Rattus rattus) are agile climbers that enter structures through upper-level openings — roof vents, gaps at the roofline, and overhanging tree branches. They are the most common rat species in Arizona's urban and suburban areas. Pack rats, also called wood rats (Neotoma spp.), are native desert rodents that build large stick-and-debris nests (middens) in and around structures. They are notorious for hoarding shiny objects and chewing vehicle wiring. House mice (Mus musculus) are the smallest and most prolific, producing 5 to 10 litters of 5 to 6 pups per year.\n\nRodent damage extends far beyond contamination. Their constant gnawing (rodent incisors grow 4 to 5 inches per year and must be worn down by chewing) destroys insulation, drywall, ductwork, plumbing, and electrical wiring. The U.S. Fire Administration estimates that rodent-chewed wiring causes 20 to 25% of all fires of undetermined origin.\n\nAll three species are vectors for disease. Pack rats and deer mice in the Four Corners region are the primary reservoir for hantavirus, which has a 36% fatality rate in confirmed human cases.",
      identification:
        "Roof rats are 13 to 18 inches long (including tail), sleek-bodied, with gray-brown fur, large ears, and a tail longer than the body. Droppings are 1/2 inch, spindle-shaped with pointed ends. Pack rats are similar in size, with softer brown fur, white bellies, large eyes, and bushy tails. Their middens (nest structures) are distinctive — mounds of sticks, cactus pads, bones, and debris up to 4 feet in diameter. House mice are 5 to 7 inches total length, gray-brown, with small ears and a thin tail equal to body length. Droppings are 1/4 inch, rod-shaped with pointed ends. A single mouse produces 50 to 75 droppings per day.",
      behavior:
        "Roof rats are nocturnal climbers. They travel along utility lines, fence tops, and tree branches to access roofs. Once inside, they nest in attics, wall voids, and false ceilings. They are neophobic (cautious of new objects), making trapping more challenging. Pack rats are prolific nest builders. They construct middens in engine compartments, pool equipment, outdoor grills, A/C units, and under-structure crawl spaces. They have a compulsive hoarding behavior and will steal small objects — jewelry, coins, tools — and replace them with sticks or rocks. House mice are curious and exploratory, the opposite of rats. They investigate new objects readily, making trapping easier. Mice can squeeze through openings as small as 1/4 inch — the diameter of a dime.",
      dangers:
        "Rodents contaminate food and surfaces with urine, droppings, and hair. They spread diseases including hantavirus (from pack rats and deer mice — 36% fatality rate in pulmonary syndrome), leptospirosis, salmonellosis, and rat-bite fever. Rodent droppings and urine can trigger allergic reactions and asthma. The most acute danger is fire risk: rodent-chewed electrical wiring is responsible for an estimated 20–25% of house fires of undetermined origin. A single rodent can cause thousands of dollars in damage to vehicle wiring, HVAC systems, and irrigation controllers. Pack rat middens in engine compartments can disable vehicles and void warranties.",
      prevention:
        "Seal all openings larger than 1/4 inch with steel wool, hardware cloth, or metal flashing — rodents cannot chew through metal. Install chimney caps, gable vent screens, and roof vent covers. Trim tree branches at least 4 feet from the roofline. Remove pack rat middens promptly — an established midden attracts more rodents. Store food in glass or metal containers. Keep garbage in metal cans with tight lids. Eliminate water sources including leaky faucets, pet bowls, and birdbaths. For vehicle protection, park in a sealed garage or use rodent deterrent tape and under-hood repellent products.",
      treatment:
        "Hydra Pest Control uses a comprehensive rodent management approach. We begin with a thorough inspection to identify entry points, nesting sites, and travel routes. Exclusion (sealing entry points) is the foundation — we seal all openings with rodent-proof materials including steel wool, hardware cloth, metal flashing, and expanding foam reinforced with mesh. Trapping removes the existing population. We use professional snap traps and bait stations placed in tamper-resistant housing to protect children and pets. For pack rats, we remove middens and treat the area with deterrents. Monthly monitoring ensures the population stays controlled and new entry points are addressed promptly.",
      localContext:
        "Pack rats are the signature rodent pest of Arizona. In the Gila Valley, they build middens in agricultural equipment, hay bales, and citrus groves. Every home in Safford, Thatcher, and Pima has pack rat habitat nearby. Roof rats are prevalent in irrigated neighborhoods with mature citrus and shade trees. The White Mountains region sees more deer mice — the primary reservoir for Sin Nombre hantavirus in the Four Corners region. Homeowners in Show Low and Pinetop should take hantavirus precautions when cleaning rodent-contaminated areas: wear an N95 respirator, ventilate the space, and wet surfaces with disinfectant before sweeping. Sierra Vista's combination of desert and suburban environments supports all three rodent species. Vehicle damage from pack rats is a year-round concern across all Hydra service areas.",
    },
    quickFacts: [
      { label: "Roof Rat Length", value: "13–18 inches (w/tail)" },
      { label: "Mouse Entry Gap", value: "1/4 inch (a dime)" },
      { label: "Rat Entry Gap", value: "1/2 inch (a quarter)" },
      { label: "Mouse Litters/Year", value: "5–10 (5–6 pups each)" },
      { label: "Droppings/Day (mouse)", value: "50–75" },
      { label: "Hantavirus Fatality", value: "36% (pulmonary syndrome)" },
      { label: "Fire Risk", value: "20–25% of undetermined fires" },
      { label: "Incisor Growth", value: "4–5 inches/year" },
    ],
    signs: [
      "Droppings in cabinets, drawers, or along baseboards",
      "Gnaw marks on food packaging, wires, or wood",
      "Scratching or scurrying sounds in walls, attic, or ceiling at night",
      "Grease marks (rub marks) along walls and pipes from repeated travel",
      "Nesting material — shredded paper, insulation, fabric — in hidden areas",
      "Pack rat middens (stick/debris piles) near the structure or in engine compartments",
    ],
    faqs: [
      {
        question:
          "What is the difference between roof rats, pack rats, and house mice?",
        answer:
          "Roof rats are sleek, gray-brown rats with tails longer than their bodies that enter from above via rooflines and trees. Pack rats are native desert rodents with bushy tails and white bellies that build large stick nests (middens) and are notorious for chewing vehicle wiring. House mice are small (5–7 inches total), gray-brown, extremely prolific breeders, and can squeeze through dime-sized openings. All three species are common in Arizona.",
      },
      {
        question: "Can rodents really cause house fires?",
        answer:
          "Yes. The U.S. Fire Administration estimates that rodent-chewed electrical wiring causes 20 to 25% of all house fires of undetermined origin. Rodent incisors grow 4 to 5 inches per year and must be worn down by constant gnawing. Electrical wiring, insulation, and PVC pipe are common targets. A single gnawed wire in an attic or wall void can cause a catastrophic fire.",
      },
      {
        question: "What is hantavirus and should I be worried in Arizona?",
        answer:
          "Hantavirus pulmonary syndrome is a severe respiratory illness transmitted by inhaling dust contaminated with rodent urine, droppings, or saliva — primarily from deer mice and pack rats. Arizona is within the endemic range, particularly in the White Mountains and Four Corners region. The fatality rate is 36%. Never sweep or vacuum rodent droppings dry — wet the area with disinfectant first and wear an N95 respirator.",
      },
      {
        question: "How do I keep pack rats out of my car engine?",
        answer:
          "Park in a sealed garage when possible. If outdoor parking is unavoidable, use rodent deterrent tape (capsaicin-infused) on accessible wiring harnesses. Remove pack rat middens within 50 feet of parking areas. Under-hood LED deterrent lights and ultrasonic devices show mixed results. The most reliable protection is professional exclusion and trapping to remove the local population.",
      },
      {
        question: "Are rodent bait stations safe around children and pets?",
        answer:
          "Professional bait stations are enclosed in tamper-resistant housing that children and pets cannot open. The bait blocks are secured inside the station. Hydra Pest Control uses EPA-registered products and places bait stations in locations that minimize non-target access. Snap traps can also be used inside tamper-resistant boxes for an added layer of safety.",
      },
    ],
    relatedPests: ["termites", "roaches", "pocket-gophers"],
    relatedBlogSlugs: [
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 11. TICKS ───
  {
    slug: "ticks",
    name: "Ticks",
    scientificName: "Rhipicephalus sanguineus / Dermacentor andersoni",
    category: "disease-carrier",
    dangerLevel: "Medium",
    image: "🫓",
    seasons: "Spring through fall (peak March–October)",
    description:
      "The brown dog tick and Rocky Mountain wood tick are Arizona's most common tick species. Brown dog ticks can complete their entire lifecycle indoors and are the primary vector for Rocky Mountain Spotted Fever in Arizona, which has a fatality rate of 5–10% without treatment.",
    content: {
      overview:
        "Arizona's tick landscape differs from the eastern U.S. The state's most significant tick is the brown dog tick (Rhipicephalus sanguineus), which is the only tick species that can complete its entire lifecycle indoors. This makes it capable of establishing large infestations within homes and kennels. The brown dog tick is the primary vector for Rocky Mountain Spotted Fever (RMSF) in Arizona — a disease that has caused multiple fatal outbreaks in tribal communities.\n\nThe Rocky Mountain wood tick (Dermacentor andersoni) is found in Arizona's higher-elevation forested areas and is another RMSF vector. The western black-legged tick (Ixodes pacificus), the vector for Lyme disease on the West Coast, is present in small numbers in northern Arizona but Lyme disease cases remain rare in the state.\n\nTicks are arachnids (related to spiders and mites) that require blood meals to progress through their lifecycle stages: larva, nymph, and adult. A single female brown dog tick can lay 1,000 to 3,000 eggs after a blood meal.",
      identification:
        "Brown dog ticks are small — unfed adults are about 1/8 inch long, reddish-brown, with an elongated oval body. Engorged females swell to nearly 1/2 inch and become gray-blue. They have no distinctive markings. Rocky Mountain wood ticks are larger (3/16 inch unfed), brown with white or silver dorsal markings (ornate). Males and females have different patterns. Tick nymphs are tiny — about the size of a poppy seed — and easily overlooked. All ticks have 8 legs as adults and nymphs (6 legs as larvae).",
      behavior:
        "Brown dog ticks prefer dogs as hosts but will feed on humans when dog hosts are unavailable. They infest kennels, dog runs, cracks in baseboards, and furniture seams. After feeding, they detach and hide in crevices to molt or lay eggs. A single home infestation can involve thousands of ticks at various life stages. Rocky Mountain wood ticks are found in grasslands and scrub at elevations of 4,000 to 10,000 feet. They 'quest' by climbing to the tip of vegetation and waiting with front legs extended to grab passing hosts. Peak questing occurs March through June. Ticks do not jump or fly — they transfer only through direct contact.",
      dangers:
        "Rocky Mountain Spotted Fever (RMSF) is the most dangerous tick-borne disease in Arizona. Symptoms include fever, headache, and a distinctive rash that begins on the wrists and ankles 2 to 5 days after the bite. Without antibiotic treatment, the fatality rate is 5 to 10%. Arizona has experienced RMSF outbreaks with fatality rates exceeding 20% in communities with limited medical access. Between 2003 and 2022, Arizona reported over 400 RMSF cases. Brown dog ticks also transmit canine ehrlichiosis and babesiosis to dogs. Tick bites can cause localized allergic reactions and secondary infections. The lone star tick's alpha-gal allergy (meat allergy from tick bites) has not been documented in Arizona.",
      prevention:
        "Treat dogs with veterinarian-recommended tick preventives (oral or topical) year-round. Inspect pets daily, especially after outdoor activity. Mow lawns short and remove leaf litter — ticks require humidity to survive. Create a 3-foot gravel or mulch barrier between lawns and wooded areas. When hiking, wear light-colored clothing, tuck pants into socks, and use EPA-registered repellents containing DEET or permethrin. After outdoor activity, shower within 2 hours and conduct a full body tick check. Wash and dry outdoor clothing on high heat for 30 minutes. For brown dog tick infestations, treat the indoor environment — not just the dog — because ticks reproduce in the home.",
      treatment:
        "Hydra Pest Control treats tick infestations by addressing both the indoor and outdoor environment. For brown dog tick infestations, we treat baseboards, carpet edges, furniture seams, cracks, and crevices with residual insecticide and insect growth regulators. Dog bedding areas and kennels receive targeted treatment. Outdoor treatments focus on shaded resting areas, fence lines, and kennel perimeters. Multiple treatment visits (2 to 3) spaced 2 weeks apart are typically needed because eggs can take weeks to hatch and growth regulators prevent new generations from maturing. We coordinate with veterinary treatment of pets for comprehensive control.",
      localContext:
        "Brown dog ticks are common throughout Arizona, particularly in the Gila Valley and Sierra Vista where dog ownership is high and outdoor spaces provide habitat. RMSF cases have been reported in Graham and Cochise counties. The White Mountains region supports Rocky Mountain wood tick populations — hikers and campers in the Show Low and Pinetop areas should take precautions during spring and early summer. Arizona's tribal communities have experienced the highest RMSF rates in the nation, underscoring the importance of tick control in rural areas. Pet owners in all three Hydra service regions should maintain year-round tick prevention on their animals.",
    },
    quickFacts: [
      { label: "Brown Dog Tick Size", value: "1/8 inch (unfed adult)" },
      { label: "Eggs Per Female", value: "1,000–3,000" },
      { label: "RMSF Fatality (untreated)", value: "5–10%" },
      { label: "AZ RMSF Cases (2003–2022)", value: "400+" },
      { label: "Indoor Lifecycle", value: "Yes (brown dog tick only)" },
      { label: "Peak Season", value: "March–October" },
      { label: "Removal Method", value: "Fine-tipped tweezers, steady pull" },
    ],
    signs: [
      "Ticks found on dogs — check ears, between toes, and under collar",
      "Ticks discovered on skin after outdoor activity",
      "Clusters of tiny ticks (larvae or nymphs) on baseboards or pet bedding",
      "Dog scratching excessively, especially ears and neck",
      "Engorged (swollen, gray-blue) ticks dropping off pets onto floors or furniture",
    ],
    faqs: [
      {
        question: "Can ticks infest my house?",
        answer:
          "Yes. The brown dog tick is the only tick species that can complete its entire lifecycle indoors. A single engorged female can lay up to 3,000 eggs in cracks, baseboards, and furniture seams. Infestations can grow rapidly and require professional treatment of both the home and the pets. Outdoor-only ticks (wood ticks, deer ticks) may be brought inside on clothing or pets but cannot establish permanent indoor populations.",
      },
      {
        question: "Is Rocky Mountain Spotted Fever a risk in Arizona?",
        answer:
          "Yes. Arizona has reported over 400 RMSF cases between 2003 and 2022, with fatality rates of 5 to 10% in untreated cases. Brown dog ticks are the primary vector in Arizona, unlike the eastern U.S. where American dog ticks carry the disease. If you develop fever, headache, and rash (especially starting at wrists and ankles) within 2 weeks of a tick bite, seek immediate medical attention — early antibiotic treatment is critical.",
      },
      {
        question: "What is the proper way to remove a tick?",
        answer:
          "Use fine-tipped tweezers to grasp the tick as close to the skin surface as possible. Pull upward with steady, even pressure — do not twist, jerk, or squeeze the body. Clean the bite area with rubbing alcohol or soap and water. Save the tick in a sealed bag with the date for identification if symptoms develop. Do not use petroleum jelly, nail polish, heat, or other folk remedies — these do not work and may cause the tick to regurgitate pathogens into the wound.",
      },
      {
        question: "Do Arizona ticks carry Lyme disease?",
        answer:
          "Lyme disease is rare in Arizona. The western black-legged tick (Ixodes pacificus), which can carry the Lyme bacterium, is present in small numbers in northern Arizona, but confirmed Lyme disease cases originating in Arizona are extremely uncommon. The primary tick-borne disease concern in Arizona is Rocky Mountain Spotted Fever, transmitted by brown dog ticks.",
      },
      {
        question: "How do I protect my dog from ticks in Arizona?",
        answer:
          "Use veterinarian-prescribed tick preventives year-round — oral products (NexGard, Bravecto) or topical treatments (Frontline, Seresto collars) are effective. Inspect your dog daily, focusing on ears, between toes, under the collar, and around the tail base. Keep your yard mowed short and remove leaf litter. Professional yard treatments reduce tick populations in outdoor areas where your dog spends time.",
      },
    ],
    relatedPests: ["mosquitoes", "spiders", "rodents"],
    relatedBlogSlugs: [
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },

  // ─── 12. POCKET GOPHERS ───
  {
    slug: "pocket-gophers",
    name: "Pocket Gophers",
    scientificName: "Thomomys bottae",
    category: "nuisance",
    dangerLevel: "Low",
    image: "🐿️",
    seasons: "Year-round (peak spring–fall)",
    description:
      "Botta's pocket gopher (Thomomys bottae) is Arizona's most common burrowing rodent. A single gopher can move up to 2,000 pounds of soil per year, destroying lawns, gardens, irrigation lines, and underground utilities while creating tripping hazards with their extensive tunnel networks.",
    content: {
      overview:
        "Botta's pocket gopher is found throughout Arizona from desert floor to mountain meadow. They are solitary, territorial animals that spend nearly their entire lives underground. A single gopher maintains a tunnel system of 200 to 2,000 feet in length, excavating up to 2,000 pounds of soil per year. The 'pocket' in their name refers to external fur-lined cheek pouches used to carry food.\n\nGophers are herbivores that feed on roots, tubers, bulbs, and the bases of plants — pulling them underground from below. A single gopher can destroy an entire garden bed, kill mature trees by girdling roots, and collapse sections of lawn overnight. They also chew through irrigation lines, drip tubing, and underground cables.\n\nDespite their destructive capacity, gophers are ecologically important. Their tunneling aerates soil, incorporates organic matter, and improves water infiltration. However, in managed landscapes — lawns, gardens, farms, and golf courses — the damage outweighs the ecological benefit.",
      identification:
        "Pocket gophers are stocky, 6 to 10 inches long, with small eyes and ears, large visible incisors, and short, nearly hairless tails. Color varies from pale brown to nearly black depending on local soil color. The most reliable identification is from their mounds: fan-shaped or crescent-shaped piles of fresh soil pushed to the surface, with the plug hole visible on one side. This distinguishes them from mole hills (conical, symmetrical) and ant mounds (fine granular soil). Gopher mounds are typically 12 to 18 inches in diameter and 3 to 6 inches tall.",
      behavior:
        "Gophers are active year-round but produce the most visible surface activity in spring and fall when soil moisture makes digging easier. They are solitary — each tunnel system is occupied by a single gopher except during brief mating encounters and while females nurse young. Gophers breed 1 to 3 times per year with litters of 2 to 6 pups. Young gophers disperse above ground — a dangerous journey that exposes them to predators — to establish their own tunnel systems. Gophers can close their lips behind their incisors to chew through soil and roots without ingesting dirt. They are most active in the early morning and late afternoon.",
      dangers:
        "Gophers cause primarily property damage rather than health risks. A single gopher can destroy hundreds of dollars in landscaping, garden plants, and mature tree roots in a season. They chew through irrigation mainlines and drip tubing, causing water waste and system failure. Tunnel systems undermine foundations, sidewalks, and driveways — creating settling cracks and tripping hazards. In agricultural settings, gopher tunnels can redirect irrigation water, causing flooding in some areas and drought in others. Mounds left in lawns damage mower blades and create ankle-twisting hazards. Gophers are not significant disease vectors, but their tunnel systems can be occupied by venomous snakes and spiders.",
      prevention:
        "Exclusion is the most reliable long-term prevention. Install underground gopher baskets (galvanized wire mesh) around high-value plantings, tree root balls, and raised garden beds. Line the bottom of raised beds with hardware cloth. For new landscapes, install a complete gopher barrier — 1/2-inch hardware cloth buried 18 to 24 inches deep with a 6-inch L-shaped footer directed outward. Keep vegetation trimmed near the foundation to detect new mound activity early. Natural predators including barn owls, gopher snakes, and domestic cats provide some population control but rarely eliminate an established gopher.",
      treatment:
        "Hydra Pest Control uses professional trapping as the primary gopher management method. Trapping is the most effective and environmentally responsible approach. We locate active tunnels using a gopher probe, open the tunnel, set professional-grade traps (Macabee or Cinch traps), and seal the opening. Traps are checked within 48 hours. For large properties or persistent problems, we develop an ongoing management program with monthly inspections and trapping as needed. We also offer exclusion services — installing wire mesh barriers around landscape beds and tree plantings to provide permanent protection.",
      localContext:
        "Pocket gophers are common throughout all three Hydra Pest Control service areas. In the Gila Valley, they damage irrigated lawns, agricultural fields, and orchard root systems. The clay and loam soils around Safford and Thatcher are easy for gophers to excavate. They frequently chew through the PVC irrigation lines common in residential and agricultural settings. In the White Mountains, gophers are active in meadows and residential yards from spring through fall. Higher elevation reduces the breeding season but does not eliminate the population. Sierra Vista properties near natural desert habitat face constant gopher pressure as animals move between undeveloped land and irrigated landscapes. Golf courses, parks, and HOA-managed landscapes in all three regions frequently require ongoing gopher management.",
    },
    quickFacts: [
      { label: "Body Length", value: "6–10 inches" },
      { label: "Tunnel System", value: "200–2,000 feet" },
      { label: "Soil Moved/Year", value: "Up to 2,000 lbs" },
      { label: "Litters/Year", value: "1–3 (2–6 pups each)" },
      { label: "Diet", value: "Roots, tubers, plant bases" },
      { label: "Social Behavior", value: "Solitary & territorial" },
      { label: "Mound Shape", value: "Fan/crescent with side plug" },
    ],
    signs: [
      "Fan-shaped or crescent-shaped dirt mounds appearing on lawn",
      "Plants wilting or disappearing — pulled underground from below",
      "Soft, spongy ground that collapses when walked on (collapsed tunnels)",
      "Damaged irrigation lines with chew marks",
      "Fresh soil plugs visible near mound edges",
    ],
    faqs: [
      {
        question: "How do I know if I have gophers or moles?",
        answer:
          "Gopher mounds are fan-shaped or crescent-shaped with the plug hole visible on one side. Mole hills are conical and symmetrical with no visible plug. Gophers eat roots and plant material — you will see plants dying or disappearing. Moles eat grubs and earthworms and create raised surface tunnels (ridges) in the lawn. Arizona has very few moles — if you see mounds in your yard, they are almost certainly from pocket gophers.",
      },
      {
        question: "Can gophers damage my irrigation system?",
        answer:
          "Yes. Gophers routinely chew through PVC irrigation pipe, drip tubing, and polyethylene mainlines. They are attracted to the moisture around irrigation lines, and their incisors — which grow continuously and can gnaw through most non-metallic materials — make short work of plastic plumbing. Replacing chewed irrigation lines is one of the most common gopher-related expenses for Arizona homeowners.",
      },
      {
        question: "Do gopher repellents work?",
        answer:
          "Most gopher repellents — including castor oil granules, ultrasonic devices, vibrating stakes, and mothballs — have not been proven effective in controlled studies. Gophers may temporarily avoid a treated area but typically return or simply tunnel deeper. Professional trapping is the most reliable and immediate control method. Physical exclusion with wire mesh barriers provides the only guaranteed long-term prevention for specific plantings.",
      },
      {
        question: "Will flooding gopher tunnels get rid of them?",
        answer:
          "Flooding is generally ineffective. Gopher tunnel systems are extensive (200–2,000 feet) with multiple levels, and the water simply drains through the soil. Flooding can also damage your lawn and foundation. In some cases, flooding pushes gophers to the surface temporarily, but they return once the water recedes. Professional trapping in active tunnels is far more effective.",
      },
      {
        question: "How many gophers are in my yard?",
        answer:
          "Probably fewer than you think. Pocket gophers are solitary and territorial — a single gopher can produce 30 to 50 mounds per month, making it look like a large population. In a typical residential yard, 1 to 3 gophers are responsible for all the damage. Professional trapping can identify and remove the specific individuals within days.",
      },
    ],
    relatedPests: ["rodents", "ants", "termites"],
    relatedBlogSlugs: [
      "5-signs-you-need-professional-pest-control-not-diy",
    ],
  },
];

// ─── HELPER FUNCTIONS ───

export function getAllPests(): PestData[] {
  return pests;
}

export function getPestBySlug(slug: string): PestData | undefined {
  return pests.find((p) => p.slug === slug);
}

export function getAllPestSlugs(): string[] {
  return pests.map((p) => p.slug);
}
