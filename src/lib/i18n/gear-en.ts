import type { Locale } from "./types";
import type { GearItem } from "@/lib/gear";

export const GEAR_INTRO_EN =
  "A comprehensive overview of the core tactical suit, forensic gadgets, and combat vehicles wielded by Bruce Wayne in Matt Reeves' The Batman epic crime saga. Costume craft engineered by Glyn Dillon, Jacqueline Durran, and Pierre Bohanna; vehicle architecture realized by production designer James Chinlund and concept artist Ash Thorp. Specifications reflect the 2022 feature film and official art monograph 'The Art of The Batman', updated with director-confirmed sequel modifications.";

export const GEAR_EN: Record<string, {
  kicker: string;
  name: string;
  seen: string;
  imageAlt: string;
  lede: string;
  body: string[];
}> = {
  suit: {
    kicker: "01 / Tactical Armor",
    name: "Batsuit",
    seen: "The Batman (2022)",
    imageAlt: "Batsuit chest and abdominal armor mounted on workshop concrete rig: ballistic strikes, hexagonal abdomen, and wing plates",
    lede: "Reeves' Batsuit is a handcrafted, tactical riot-armor emphasizing heavy-duty ballistic defense and utilitarian fabrication, far removed from sleek, mass-produced spandex. Costumes designed by Glyn Dillon and Jacqueline Durran, with specialty costumes built by Pierre Bohanna's team.",
    body: [
      "Reeves mandated a gritty, handcrafted texture reflecting Bruce Wayne's Year Two improvisational phase. The outer shell consists of layered ballistic plates; chest and back armor detach independently from the load-bearing vest, showing raw rivets, scratches, and unpolished coatings.",
      "Costume concept supervisor Glyn Dillon revealed in 'The Art of The Batman' that the longitudinal lacing along the flanks and back was directly adapted from high-altitude Russian pressure suits, paired with stretch mesh to grant full flexibility during brawls; stunt coordinator Robert Alonzo recommended segmenting torso armor after equestrian protective vests, providing ballistic protection while preserving the torso rotation of an elite fighter.",
      "The cowl is modular and separate from the suit, revealing a form-fitting high collar when removed. In Glasgow set footage from August 30, 2026, Robert Pattinson's stunt double without the cowl clearly displayed the separate collar and shoulder armor geometry. Pattinson tailored his physical posture and close-quarters combat stance to bear this tactical weight.",
    ],
  },
  cowl: {
    kicker: "02 / Tactical Armor",
    name: "Cowl",
    seen: "The Batman · Part II Camera Test (Modified)",
    imageAlt: "Hand-stitched leather cowl mounted on a workshop bust",
    lede: "Constructed from hand-stitched leather over an internal reinforcement skeleton, featuring tall sharp ears, deep ocular recesses, and an exposed jawline. It lacks covered lenses, relying on black greasepaint around the eyes; articulated neck vertebrae solve historic head-turning limitations; elongated ears for the sequel were personally confirmed by Matt Reeves.",
    body: [
      "The sharp, pointed ears give Batman an imposing silhouette against rain-soaked nighttime Gotham. The deeply recessed eye sockets forgo tinted lenses to showcase Pattinson's raw gaze; Bruce applies black eye paint to eliminate reflective glare and intensify psychological intimidation (audio-visual surveillance is handled by independent digital contact lenses).",
      "To resolve the decades-old Batsuit curse (dating back to Tim Burton's 1989 film where cast members could not turn their heads without twisting their entire upper bodies), the cowl integrates articulated vertebrae neck segments, granting Pattinson 360-degree head rotation and pitch mobility. The nose ridge was intentionally shaped like a repeatedly broken boxer's bridge, while the frontal silhouette pays homage to Adam West's 1966 cowl; hand-stitched leather replaces generic rubber molds to give the face a terrifying skull-like profile.",
      "The open jawline accommodates the intense respiratory demands of prolonged wet-weather patrols, harsh interrogations, and brutal hand-to-hand combat.",
      "Following the July 15, 2026 camera test, fans noted the elongated ears compared to the first film; Matt Reeves replied on social media: 'You are not crazy.' Full-suit nighttime shoots in Glasgow on September 4 confirmed the elongated cowl ears match the test footage.",
    ],
  },
  cape: {
    kicker: "03 / Tactical Armor",
    name: "Cape / Glider Wingsuit",
    seen: "The Batman · Production Concept Art",
    imageAlt: "Three cape configurations: draped, flared, and wingsuit glider mode",
    lede: "The cape serves a dual function: at rest, it drapes as a slash-resistant, weatherproof mantle; pulling integrated ripcords rapidly locks it into a rigid wingsuit glider profile.",
    body: [
      "Crafted from heavy-duty high-density ballistic weave, the fabric resists blades and debris while maintaining a natural drape under torrential downpours. In the iconic escape from GCPD headquarters rooftop, Bruce deployed the wingsuit to glide across downtown Gotham.",
      "A micro-chute deploys upon landing to shed speed; due to the violent deceleration forces, the cape unlatches from the suit on ground contact. As a purely gravity-driven aerodynamic system, glide trajectory and landing stability depend on leap height and wind management.",
    ],
  },
  "chest-blade": {
    kicker: "04 / Tactical Armor",
    name: "Detachable Chest Emblem Blade",
    seen: "Physical Suit Prop · Concept Design by Glyn Dillon",
    imageAlt: "Close-up photograph of the physical Batsuit chest emblem, showing carbon-weave substrate, rivets, battle scratches, and detachable dual blades",
    lede: "The stylized bat emblem fitted into the chest plate is in fact a detachable, high-tensile folding combat blade crafted from special alloy, serving as both an iconic crest and an emergency extraction tool.",
    body: [
      "Costume concept supervisor Glyn Dillon explained in 'The Art of The Batman': 'In this gritty world, Bruce wouldn't sew a useless decorative leather bat on his chest. It has to be a functional weapon.' Thus, the emblem's wings detach into a pair of high-carbon steel combat daggers.",
      "Ordinarily locked flush within the chest recess, the emblem is cast from anti-magnetic, rust-resistant high-carbon steel. In emergencies, it can be drawn with one hand to function as a defensive dagger, rope cutter, or circuit-breaching wedge.",
      "In the climactic flood rescue at Gotham Square Garden, Bruce detached this chest blade to sever a high-voltage cable submerged in rising waters, preventing catastrophic electrocution and saving hundreds of trapped citizens.",
    ],
  },
  belt: {
    kicker: "05 / Tactical Armor",
    name: "Utility Belt",
    seen: "The Batman · Concept Design by Glyn Dillon",
    imageAlt: "Suit abdomen and black leather utility belt: quick-release buckle, pouches, and cylindrical flares",
    lede: "The Year Two utility belt discarded bright yellow comic-book cylinders in favor of a modified tactical duty belt assembled from repurposed police gear; sequel sets introduced an homage to the classic mustard-yellow/dark-gold aesthetic.",
    body: [
      "Concept designer Glyn Dillon noted that the first film's belt was designed to look 'cobbled together from surplus police equipment': tough black leather, standard mag pouches, and heavy-duty buckles reflecting Bruce's gritty early vigilance.",
      "Fitted with forensic and survival gear: tactical epinephrine autoinjectors (for rapid recovery after ballistic shock), adhesive timed charges (for breaching steam pipes during evasions), forensic UV torches (to reveal Riddler's luminescent clues), and emergency flares.",
      "Set leaks from Glasgow on September 4, 2026 revealed a mustard-yellow/dark-gold tactical belt on the sequel suit, widely celebrated by media and fans as a visual nod to classic comic runs and the Batman: Arkham game series.",
    ],
  },
  "contact-lens": {
    kicker: "06 / Reconnaissance Tech",
    name: "Advanced Recording Contact Lenses",
    seen: "The Batman · Forensic Prop",
    imageAlt: "Close-up of forensic contact lens with micro-circuitry embedded inside",
    lede: "Specialized micro-engineered contact lenses developed in the subterranean workshop, integrating low-light HD video recording, real-time facial recognition, and encrypted wireless telemetry.",
    body: [
      "Micro-sensors and neural electrodes embedded along the lens perimeter allow the wearer to trigger video recording or snapshots with deliberate blinks. Feeds transmit directly to the Batcave computer banks for live database matching; Bruce wore them throughout the Mayor Mitchell crime scene investigation.",
      "During the covert operation against Carmine Falcone's illicit network, Bruce had Selina Kyle wear the lenses into 44 Below, streaming first-person evidence of corrupt judges and mob bosses directly to his surveillance terminal outside.",
    ],
  },
  gauntlet: {
    kicker: "07 / Weaponry & Hardware",
    name: "Tactical Gauntlets & Armament",
    seen: "The Batman · Concept Design by Glyn Dillon",
    imageAlt: "Tactical gauntlet concept sketches showing dart launcher rails and internal cushioning",
    lede: "Heavy metal vambraces mounted on both forearms combining melee blade parrying ridges, spring-loaded tactical darts, finger taser nodes, and rapid-draw grapnel docks into a unified offensive and defensive hub.",
    body: [
      "Hardened serrated ridges on the exterior deflect slashing weapons and amplify punch impact. Concept sketches identify the exterior forearm darts as Japanese 'Bo-Shuriken' mounted on rotational friction locks ('rotates on vambrace'), allowing Batman to flick them effortlessly into his palm.",
      "The right index finger houses an integrated high-voltage Finger Taser with exposed micro-wiring. Stunt coordinator Robert Alonzo emphasized the delicate balance between 'detective tactile dexterity' (handling minute crime scene trace evidence) and 'combat neutralization' (delivering incapacitating electrical shock pulses).",
      "The underside incorporates a spring-actuated sleeve-rail for the folding pneumatic grapnel gun, annotated with micro-spools and needle-threaded wire tracks. Glyn Dillon confirmed this mechanism directly homages Travis Bickle's quick-draw sleeve rig in Martin Scorsese's Taxi Driver.",
    ],
  },
  grapnel: {
    kicker: "08 / Weaponry & Hardware",
    name: "Tactical Grapnel Launcher",
    seen: "The Batman · Production Concept Art",
    imageAlt: "Forearm grapnel launcher concept: gauntlet dock, spool mechanism, and firing posture",
    lede: "A twin-folding pneumatic launcher docked on the forearm gauntlet (or hip holster), firing ultra-high-tensile steel cable to ascend vertical architecture and brake high-speed falls.",
    body: [
      "Fitted with hardened three-prong spring barbs and armor-piercing tips, wound with fine braided cable. An internal micro-motor and adaptive centrifugal brake automatically slow descents based on payload weight, with manual tension override.",
      "Crucial in the subway battle and the Gotham Square Garden high-wire traversal, Pattinson operated functional mechanical prop versions throughout filming.",
    ],
  },
  "sticky-bomb-gun": {
    kicker: "09 / Weaponry & Hardware",
    name: "Sticky Bomb Gun",
    seen: "The Batman · Prop Design by Jamie Wilkinson & Glyn Dillon",
    imageAlt: "Concept design sketch and pneumatic mechanical breakdown of the Sticky Bomb Gun by prop master Jamie Wilkinson",
    lede: "A close-quarters pneumatic breaching pistol designed by property master Jamie Wilkinson and costume concept director Glyn Dillon, engineered for the precise deployment of high-adhesion timed demolition charges.",
    body: [
      "Featuring a rugged side-loading double-barrel configuration powered by an air-pressure cartridge, the launcher eschews delicate electronics in favor of mechanical dependability, true to Bruce's Year Two improvisational philosophy. The adhesive polymer warheads can either be hand-placed directly onto structural weak points or launched across distances onto targets.",
      "In the film, Batman pairs this launcher with tactical charges stored in his utility belt pouches, using it to breach fortified blast doors, penetrate load-bearing masonry, or rupture high-pressure steam pipes to engineer tactical smoke screens for rapid exfiltration.",
    ],
  },
  car: {
    kicker: "10 / Vehicle Fleet",
    name: "Batmobile",
    seen: "The Batman · Concept Design by Ash Thorp",
    imageAlt: "Ash Thorp Batmobile concept art: red mist silhouette and rear-engine exhaust",
    lede: "Discarding hyper-futuristic concept designs, this Batmobile was conceived as a heavily customized American muscle car hand-built by Bruce in the subterranean workshop—a relentless, terrifying kinetic battering ram.",
    body: [
      "Production designer James Chinlund and Ash Thorp built upon a 1960s–70s muscle car chassis, reinforced with an all-steel front ram bumper and a full interior roll cage for extreme high-speed collision resilience.",
      "Set vehicles filmed in Glasgow in August 2026 retained this brutal silhouette, fitted with heavy-duty winter snow treads and battle damage, hinting at demanding cold-weather pursuit sequences in the sequel.",
    ],
  },
  turbine: {
    kicker: "11 / Vehicle Fleet",
    name: "Rear Jet Turbine Engine",
    seen: "The Batman · Engine Mockups & Cutaways",
    imageAlt: "Batmobile rear jet turbine clay model and twin-exhaust cross-section",
    lede: "The Batmobile's primary propulsion unit is an exposed jet turbine engine mounted directly over the rear axle, forming the vehicle's most visceral industrial design centerpiece.",
    body: [
      "Mounted transversely over the rear wheels, twin exhaust nozzles vent straight out the back. Ignition and hard acceleration unleash roaring red afterburner plumes, creating an unmistakable backlit silhouette in rain-slicked pursuits.",
      "Integrated directly into the tubular chassis roll cage, the exposed turbine is shielded against roll-overs while preserving genuine mechanical authenticity.",
    ],
  },
  batcycle: {
    kicker: "12 / Vehicle Fleet",
    name: "Batcycle & Drifter Motorcycle",
    seen: "The Batman",
    imageAlt: "Matte-black Batcycle studio photography with bat-ear fairing",
    lede: "Two distinct high-performance motorcycles: the heavy armored Batcycle for rapid nighttime pursuits, and the vintage Drifter bike for low-profile daylight reconnaissance in civilian disguise.",
    body: [
      "The Batcycle is built on a modified twin-cylinder sports platform stripped of all extraneous fairings in matte black, delivering agility in Gotham's claustrophobic alleyways.",
      "The Drifter bike preserves a raw Cafe Racer aesthetic, allowing Bruce in workwear jacket and hoodie to patrol street-level Gotham unnoticed by GCPD or syndicate lookouts.",
    ],
  },
  corvette: {
    kicker: "13 / Personal Motorcar",
    name: "1963 Chevrolet Corvette Stingray",
    seen: "The Batman · Bruce Wayne's Civilian Car",
    imageAlt: "Nighttime shot of the all-black 1963 Corvette: split rear window, dual-vent hood, plate XMC 867A",
    lede: "Bruce Wayne's personal vintage automobile for public high-society appearances, an iconic split-window masterpiece in automotive design history.",
    body: [
      "Finished in deep gloss black with the unmistakable split rear window and sculpted aerodynamic bodylines. Driven by Bruce to Mayor Don Mitchell Jr.'s memorial service (filmed at St George's Hall in Liverpool).",
      "The Corvette represents the hereditary elegance of the Wayne family in daylight, standing in stark contrast to the brutalist industrial machine he drives into the dark.",
    ],
  },
  cave: {
    kicker: "14 / Covert Base",
    name: "The Subterranean Workshop / Batcave",
    seen: "The Batman",
    imageAlt: "Wayne Tower workshop: tarp-covered Batmobile, workbenches, and arched tunnel illumination",
    lede: "Reeves' Batcave is not a natural limestone cavern, but an abandoned private rail terminal and reinforced industrial workshop deep beneath Wayne Tower.",
    body: [
      "Built with raw board-formed concrete, equipped with vehicle inspection pits, machine tool benches, multi-screen surveillance arrays, and armor maintenance racks. Alfred Pennyworth maintains regular vigil here, managing intelligence and logistics.",
      "This is where Bruce forensic-analyzes crime scenes, replays patrol recordings, and fine-tunes his equipment—his sole sanctuary in a corrupt metropolis.",
    ],
  },
  signal: {
    kicker: "15 / Alliance Beacon",
    name: "The Bat-Signal",
    seen: "The Batman · The Penguin Finale",
    imageAlt: "Bat-Signal silhouette projected through blinds on a rainy night, Gordon in foreground",
    lede: "Mounted on the rooftop of GCPD Headquarters, this high-intensity searchlight is the direct beacon used by Lieutenant Jim Gordon to summon Batman into the night.",
    body: [
      "Projecting the bat silhouette against Gotham's perpetual low-hanging overcast clouds, the signal serves as psychological terror to street criminals and a public symbol of Gordon and Batman's fragile alliance for justice.",
      "Illuminated at the close of The Batman and the season finale of The Penguin, it stands as a permanent reminder that the war for Gotham's soul continues.",
    ],
  },
};

export function getLocalizedGear(item: GearItem, locale: Locale): GearItem {
  if (locale === "zh") return item;
  const en = GEAR_EN[item.id];
  if (!en) return item;
  return {
    ...item,
    kicker: en.kicker,
    name: en.name,
    seen: en.seen,
    imageAlt: en.imageAlt,
    lede: en.lede,
    body: en.body,
  };
}
