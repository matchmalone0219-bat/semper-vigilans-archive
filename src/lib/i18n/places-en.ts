import type { Locale } from "./types";
import type { Place } from "@/lib/places";

export type PlaceEnData = {
  name: string;
  status: string;
  also: string;
  works?: string;
  body: string[];
};

export const PLACES_EN: Record<string, PlaceEnData> = {
  orphanage: {
    name: "Gotham Orphanage",
    status: "Operational",
    also: "Former Wayne Manor",
    works: "Prequel Novel · Riddler: Year One · The Batman",
    body: [
      "Originally the historic Wayne Manor, Thomas Wayne donated and repurposed the ancestral estate into a charitable home for orphans during his mayoral campaign. Young Edward Nashton endured a bitter, neglected childhood within its walls, while Bruce Wayne retreated to the top of Wayne Tower following his parents' murder.",
      "In The Batman, this dilapidated structure became a pivotal nexus in the Riddler's crusade to expose the corruption underlying the Wayne family's philanthropy. Investigating the site, Batman and Gordon uncovered the hidden video recording that revealed Thomas Wayne's compromised past.",
    ],
  },
  "park-row": {
    name: "Park Row / Crime Alley",
    status: "Historic Crime Scene",
    also: "Behind the Monarch Theater · Wayne Murders",
    works: "Prequel Novel · The Batman",
    body: [
      "A narrow alleyway in Gotham's older quarter near the Monarch Theater. In roughly 2002, Thomas and Martha Wayne were gunned down here after attending a film with young Bruce. Bruce survived; Gotham did not.",
      "The alley serves as the tragic inception point of this universe: the fracture of the Wayne philanthropic myth and the catalyst for Bruce's crusade. The film frames the alley through rain-soaked pavement, graffiti, and claustrophobic perspectives rather than an untouchable monument.",
    ],
  },
  "wayne-tower": {
    name: "Wayne Tower",
    status: "Active Residence",
    also: "Bruce's Penthouse & Family Headquarters",
    works: "Prequel Novel · The Batman · The Batman: Part II",
    body: [
      "A soaring neo-Gothic skyscraper anchoring Gotham's Financial District. After donating Wayne Manor, Bruce took up solitary residence in the penthouse suite, training and conducting investigations with Alfred's aid, with direct elevator access to the subterranean workshop below.",
      "In the sequel, Wayne Tower continues its dual purpose: by day, an unavoidable public monument to the Wayne industrial legacy; by night, a fortress from which Batman monitors escalating citywide threats.",
    ],
  },
  cave: {
    name: "Subterranean Workshop / Batcave",
    status: "Operational Sanctuary",
    also: "Underground Terminus & Tactical Base",
    works: "The Batman · The Batman: Part II",
    body: [
      "Not a natural limestone cavern, but a heavy-duty industrial subterranean workshop constructed inside the abandoned Wayne Terminus private rail station deep beneath Wayne Tower. Outfitted with heavy hydraulic lifts, custom machining stations, surveillance terminals, and ballistic tactical racks.",
      "Here Bruce tunes the Batmobile and Batsuit, reviewing nighttime patrol feeds captured via digital contact lenses. Winter set leaks featuring snow-treads and pursuit damage suggest the workshop will once again serve as tactical headquarters.",
    ],
  },
  gcpd: {
    name: "GCPD Headquarters",
    status: "Operational",
    also: "Morgue & Rooftop Bat-Signal",
    works: "The Batman · The Batman: Part II",
    body: [
      "The nerve center of Gotham municipal law enforcement, plagued by systemic corruption under Falcone's long reign. Lieutenant Jim Gordon operates from here, repeatedly defying departmental opposition to bring Batman into forensics and the morgue.",
      "The roof holds the iconic Bat-Signal. With Gordon and Martinez returning and set leaks showing SWAT encirclements, GCPD remains in severe internal upheaval.",
    ],
  },
  iceberg: {
    name: "The Iceberg Lounge",
    status: "Seized by Oz Cobb",
    also: "Includes Subterranean Club 44 Below",
    works: "Riddler: Year One · The Batman · The Penguin",
    body: [
      "Gotham's notorious high-end lounge catering to corrupt officials and mob bosses. Beneath the main floor lies '44 Below', Carmine Falcone's private den for drug distribution and extortion.",
      "Following Falcone's assassination, the venue became the epicenter of the mob war in The Penguin, ultimately seized by Oz Cobb as his syndicate headquarters.",
    ],
  },
  falcone: {
    name: "Falcone Penthouse",
    status: "Vacant / Seized",
    also: "Former Crime Lord's Private Residence",
    works: "The Batman",
    body: [
      "The opulent private penthouse above the Iceberg Lounge where Carmine Falcone orchestrated thirty years of political bribery and illicit trade. In The Batman, Falcone was unmasked as the police informant here before being assassinated on the street below.",
    ],
  },
  seawall: {
    name: "Gotham Seawall / Harbor",
    status: "Breached / Post-Flood Repairs",
    also: "City Defense Line Below Sea Level",
    works: "Riddler: Year One · The Batman",
    body: [
      "Because Gotham sits in a geographical depression below sea level, the harbor sea wall is the city's literal lifeline. The massive seawall was compromised by corner-cutting construction linked to Renewal fund embezzlement.",
      "On election night, the Riddler's followers detonated seven explosive-laden vans across primary stress points, flooding downtown and the arena. Edward Nashton weaponized Gotham's vulnerable geography into an apocalyptic judgment.",
    ],
  },
  gsg: {
    name: "Gotham Square Garden",
    status: "Restored Post-Flood",
    also: "Mayoral Rally Point & Flood Shelter",
    works: "The Batman",
    body: [
      "Gotham's premier civic arena, modeled on Madison Square Garden and filmed at London's O2 Arena. When the sea wall gave way, surging waters trapped thousands of citizens and Mayor-Elect Bella Reál inside.",
      "Batman dove into the floodwaters, severed a lethal high-voltage cable, and lit an emergency flare to guide citizens to safety, completing his transformation from an instrument of vengeance into a guardian of hope.",
    ],
  },
  arkham: {
    name: "Arkham State Hospital",
    status: "Maximum Security",
    also: "Arkham Estate · Psychiatric Facility",
    works: "Riddler: Year One · The Batman · The Penguin",
    body: [
      "Founded in the early 18th century by the Arkham family, the institution evolved from a private sanitarium into the maximum-security Arkham State Hospital for the criminally insane.",
      "Martha Arkham was treated here following family trauma, her records sealed for decades. In the present day, Arkham houses Edward Nashton (The Riddler), an unnamed inmate (The Joker), and formerly Sofia Falcone.",
      "As the repository of Gotham's deepest institutional fractures, Arkham casts a permanent psychological shadow over the city.",
    ],
  },
  "riddler-room": {
    name: "The Riddler's Tenement",
    status: "Condemned by GCPD",
    also: "Investigation Wall & Terror Nexus",
    works: "Riddler: Year One · The Batman",
    body: [
      "A cramped tenement apartment directly across from the Iceberg Lounge. Edward Nashton utilized telephoto optics to monitor Falcone, covered the walls with financial flowcharts, and broadcast his ciphered assassination commands from this room before it was raided by GCPD.",
    ],
  },
  "crown-point": {
    name: "Crown Point",
    status: "Under Cobb Syndicate Control",
    also: "Impoverished Flood Zone & Gang War Epicenter",
    works: "The Penguin",
    body: [
      "An impoverished, low-lying neighborhood devastated when the seawall exploded. In The Penguin, Oz Cobb used Crown Point's flooded ruins and neglected communities to build his illicit drug empire and crush rival gangs.",
    ],
  },
  "city-hall": {
    name: "Gotham City Hall",
    status: "Operational",
    also: "Mayor's Office & Municipal Courts",
    works: "The Batman · The Penguin",
    body: [
      "The administrative heart of Gotham, bearing the Latin civic motto 'Sic Parvis Magna'. Former Mayor Mitchell and DA Colson operated here under Falcone's payroll; Mayor Bella Reál now governs the city, spearheading post-flood recovery.",
    ],
  },
};

export const REGION_MARKERS_NOTES_EN: Record<string, string> = {
  "wayne-tower": "Production map labels Wayne Plaza downtown; Wayne Tower is anchored here matching film skyline sightlines.",
  gsg: "Corresponds to Gotham Square on production maps; arena location inferred from flood finale and plaza surroundings.",
  "city-hall": "Positioned from on-location practical filming relative to Gotham Square Subway Station.",
  gcpd: "Production map does not explicitly label GCPD HQ; placed here based on downtown dispatch grids and squad car routes.",
  iceberg: "Production design and concept art locate Iceberg Lounge at Tricorner Bridge foot, subterranean Shoreline Lofts, not Chinatown.",
  "riddler-room": "Film frames show Nashton's apartment window directly facing Iceberg Lounge main entrance, placing it in Tricorner.",
  "crown-point": "Production maps place Crown Point on Downtown's east flank along East River Avenue, rather than southern docks.",
};

export const REGIONS_EN: Record<string, {
  name: string;
  status: string;
  imageAlt: string;
  description: string;
}> = {
  uptown: {
    name: "Uptown",
    status: "HBO Series Reference",
    imageAlt: "Road network map of Uptown reconstructed from The Penguin full-city transit maps",
    description: "Northern island borough featured in The Penguin citywide transit maps. Unexplored in The Batman, currently reconstructed for coastlines and major arterial grids without speculative landmark markers.",
  },
  midtown: {
    name: "Midtown",
    status: "HBO Series Reference",
    imageAlt: "Road network map of Midtown reconstructed from The Penguin full-city transit maps",
    description: "Central island borough bridging north and south transit in The Penguin. The high-res basemap follows the series' citywide transit geography and major road network.",
  },
  downtown: {
    name: "Downtown",
    status: "Film Production · 7 Files",
    imageAlt: "Dark road grid map of Downtown redrawn from The Batman official production maps",
    description: "Core epicenter of The Batman. Official production maps and primary practical filming converge here: civic administration, finance, nightlife, and mob dens. Features toggleable Riddler seawall demolition grid.",
  },
};

export const GOTHAM_CITY_EN = {
  mottoZh: "Greatness from Small Beginnings",
  lede: "Gotham is a Northeastern port metropolis shackled by perpetual rain, toxic fog, and entrenched hierarchy: pervasive bureaucratic graft, staggering wealth disparity, and perpetually damp alleyways. Built entirely below sea level, giant sea walls along the bay hold back the Atlantic tide—should those walls fall, the city is inevitably punished by its own geography.",
  facts: [
    { label: "Civic Motto", value: "Sic Parvis Magna · Greatness from Small Beginnings" },
    { label: "Topography", value: "Below sea level, shielded by reinforced harbor seawalls" },
    { label: "Incumbent Mayor", value: "Bella Reál (Elected in 2022 General Election)" },
    { label: "Preceding Mayor", value: "Don Mitchell Jr. (Assassinated Halloween 2022)" },
    { label: "Founding Myth", value: "According to municipal lore, chartered in 1724 by architect William Gotham (contested in-universe)" },
    { label: "Founding Dynasties", value: "Wayne and Arkham families; Arkham family founded State Hospital circa city inception" },
    { label: "Filming Locations", value: "NYC architectural skeleton · Glasgow skyline & necropolis · Liverpool & London practical sets" },
  ],
  boroughs: [
    { name: "Downtown", nameEn: "Downtown", source: "The Batman", note: "Central staging ground with complete official production cartography" },
    { name: "Midtown", nameEn: "Midtown", source: "The Penguin", note: "Mapped in HBO limited series transit maps; unexplored in first film" },
    { name: "Uptown", nameEn: "Uptown", source: "The Penguin", note: "Mapped in HBO limited series transit maps; unexplored in first film" },
  ],
  districts: [
    { name: "Park Row", nameEn: "Park Row", note: "Narrow alleyway behind Monarch Theater; site of Wayne murders" },
    { name: "Crown Point", nameEn: "Crown Point", note: "Impoverished flood-hit borough; epicenter of Cobb gang war" },
    { name: "Blackgate Isle", nameEn: "Blackgate Isle", note: "Maximum-security penitentiary where Salvatore Maroni was incarcerated" },
    { name: "Gotham Square", nameEn: "Gotham Square", note: "Neon-lit commercial nexus, inspired by NYC Times Square" },
    { name: "Financial District", nameEn: "Financial District", note: "Core metropolitan skyline anchored by Wayne Tower" },
  ],
  families: [
    { name: "The Wayne Family", note: "Industrial infrastructure & philanthropy; Thomas ran for mayor, donated manor to orphanage" },
    { name: "The Arkham Family", note: "Martha's maternal dynasty; founded Arkham State Hospital; history of mental illness sealed" },
    { name: "The Falcone Family", note: "Carmine Falcone's 30-year mob syndicate; collapsed in 2022" },
    { name: "The Maroni Family", note: "Longtime Falcone rivals; boss poisoned in Blackgate" },
    { name: "The Gigante Family", note: "Falcone remnants reorganized under Sofia; defeated by Penguin" },
    { name: "The Cobb Family", note: "Oz Cobb's ascendant criminal empire controlling Gotham's illicit underground" },
  ],
};

export function getLocalizedPlace(place: Place, locale: Locale): Place {
  if (locale === "zh") return place;
  const en = PLACES_EN[place.id];
  if (!en) return place;
  return {
    ...place,
    name: en.name,
    status: en.status,
    also: en.also,
    works: en.works ?? place.works,
    body: en.body ?? place.body,
  };
}

