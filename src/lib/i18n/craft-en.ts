import type { Locale } from "./types";
import type { ThemeCue, LocationCity } from "@/lib/craft";

export const CRAFT_INTRO_EN =
  "The Batman Epic Crime Saga sets a benchmark in modern neo-noir visual and auditory artistry: brooding brass ostinatos, rain-drenched chiaroscuro streetscapes, anamorphic optical aberrations, and textured practical UK architecture. This section provides an in-depth exploration of Michael Giacchino's symphonic score, the cinematography of Greig Fraser and Erik Messerschmidt, and a comprehensive traveler's guide to the film's real-world UK locations.";

export const THEMES_EN: Record<string, {
  jump: string;
  title: string;
  kind: string;
  when: string;
  lede: string;
  sections: { heading: string; body: string }[];
}> = {
  "batman-theme": {
    jump: "Batman Theme",
    title: "The Four-Note Batman Theme",
    kind: "Michael Giacchino · Original Score",
    when: "Opening patrol, Batmobile pursuit, and arena flood rescue",
    lede: "Anchored by a relentless four-note descending ostinato driven by low brass and percussive piano, embodying Batman's unyielding vengeance and heavy kinetic momentum.",
    sections: [
      {
        heading: "Instrumentation & Abbey Road Sessions",
        body: "Recorded by Oscar-winning composer Michael Giacchino at London's legendary Abbey Road Studios in 2021. The orchestra stripped away traditional high woodwinds, relying heavily on low brass, timpani, and thunderous piano chords. Midway through, the theme unfurls into a poignant, tragic Wayne family orchestral lament.",
      },
      {
        heading: "Visual Synchronization & Emotional Resonance",
        body: "Rather than a standard superhero fanfare, the four notes act as an audio dread-signal accompanying heavy footsteps approaching through rain-slicked dark alleyways. During Wayne Tower solitude and journal voiceovers, Giacchino strips it down to intimate piano variations reflecting Bruce's unhealed trauma.",
      },
    ],
  },
  catwoman: {
    jump: "Catwoman Theme",
    title: "Catwoman Lyrical Theme",
    kind: "Michael Giacchino · Original Score",
    when: "Iceberg Lounge infiltration, rooftop trysts, and cemetery farewell",
    lede: "Drawing inspiration from 1970s slow-burn noir jazz strings, capturing Selina Kyle's seductive, morally ambiguous, and melancholic vigilante ethos.",
    sections: [
      {
        heading: "Creative Origins & Noir Style",
        body: "Giacchino channeled Jerry Goldsmith's classic score for Chinatown, steering clear of bombastic action percussion in favor of smoky, gliding string lines that wrap around Selina like Gotham fog.",
      },
      {
        heading: "Counterpoint with Batman's Theme",
        body: "During rooftop exchanges and the cemetery farewell, Selina's undulating string melody interweaves with Batman's stoic brass motifs, delicately articulating two damaged souls drawn to each other yet walking irreconcilable paths.",
      },
    ],
  },
  "ave-maria": {
    jump: "Ave Maria Variations",
    title: "Ave Maria (Dark Variations)",
    kind: "Schubert Classic + Giacchino Arrangement",
    when: "Orphanage choir, Mayor's murder scene, and Arkham interrogation",
    lede: "Schubert's classical hymn repurposed into the Riddler's chilling acoustic calling card, clashing pure choral innocence against corrupted orchestrations.",
    sections: [
      {
        heading: "Auditory Projection of Childhood Trauma",
        body: "Rooted in Edward Nashton's childhood in the Gotham Orphanage choir, the angelic boy-soprano voice echoes at crime scenes to evoke the festering psychological wounds driving his crusade.",
      },
      {
        heading: "Deconstruction into Dark Symphony",
        body: "In the final act and Arkham confinement, Giacchino breaks down the sacred melody with wordless soprano cries, cold celesta notes, and brooding contrabass textures into a psychological thriller crescendo.",
      },
    ],
  },
  nirvana: {
    jump: "Nirvana Classic",
    title: "Something in the Way by Nirvana",
    kind: "Official Feature Track (1991 · Nevermind)",
    when: "2020 DC FanDome teaser; opening night patrol voiceover; flood arena rescue",
    lede: "Not a promotional afterthought, but the core writing track Reeves played while scripting Act One. Kurt Cobain inspired Pattinson's reclusive, rock-star hermit portrayal—a broken man who rejected the playboy facade. Gus Van Sant's 'Last Days' provided manor seclusion aesthetics rather than a narrative blueprint.",
    sections: [
      {
        heading: "Written into the Script Before Filming",
        body: "Reeves explained the song was featured in the initial teaser because it was always embedded in the screenplay. Playing under the opening patrol voiceover and returning at the flood climax, its solitary guitar riff anchors Bruce's lonely isolation before carrying him into the crowd.",
      },
      {
        heading: "Cobain as Character Blueprint",
        body: "Reeves envisioned Bruce as an addict whose drug is vengeance. Pattinson channeled a rare blend of vulnerability, desperation, and power reminiscent of Cobain—looking like a rock star, but living like an absolute hermit.",
      },
      {
        heading: "Bookending the Film's Emotional Arc",
        body: "From rain-streaked car windows and diary monologues at the opening to the red emergency flare held aloft in the arena finale, the music stays constant while the man evolves from vengeance into hope.",
      },
    ],
  },
};

export const TRACK_SCENES_EN: string[] = [
  "Opening sequence: Riddler surveilling Mayor's residence; Thomas Wayne campaign speech background choir in orphanage",
  "Prologue: Bruce's nocturnal voiceover journal; motorcycle street patrol; climactic flood arena rescue and closing monologue",
  "Subterranean workshop: Alfred decoding the Riddler's encrypted cyphers beneath Wayne Tower",
  "Mayor Don Mitchell Jr.'s memorial service inside Gotham City Hall (St George's Hall)",
  "Wayne Tower penthouse: Alfred opens letter addressed to Bruce moments before explosion",
  "Bruce interrogating Carmine Falcone in the penthouse about his parents' murder",
  "Selina Kyle drawing her weapon against her biological father Carmine Falcone",
  "Batman enters Iceberg Lounge, clashing with the twin bouncers at the checkpoint",
  "Batman confronting Oz Cobb at the VIP lounge bar",
  "Batman surveying the crowded 44 Below subterranean dancefloor",
  "Underground electronic dance track echoing through 44 Below",
  "Bruce entering the Iceberg Lounge in daylight civilian attire to locate Falcone",
  "Selina wearing smart recording lenses on covert reconnaissance inside 44 Below",
  "Arkham State Hospital: Riddler singing maniacally behind reinforced glass to Batman",
];

export const LENS_EN = {
  intro:
    "The Batman established an unmistakable neo-noir visual language under Oscar-winning cinematographer Greig Fraser; for The Batman: Part II, fellow Oscar winner Erik Messerschmidt (Mank, Mindhunter, The Killer) takes the helm. Prior to official production, Messerschmidt posted four scout photographs—northwest, LEDs, spring, and mist—on Instagram, providing the earliest public glimpse of the sequel's atmospheric palette.",
  stillCaptions: [
    "northwest: Damp pavement reflecting cyan sodium vapor streetlamps. Fan consensus links this to the Runcorn area, where the crew filmed on the Runcorn bridge in July.",
    "LEDs: Gotham streetscape framed by an ocean of LED signs and traffic. Commenters speculated this might be Wayne Tower, though unconfirmed officially.",
    "spring: Industrial skyline and Gothic spires veiled in sepia-gray fog, sparking early discussion of an even dirtier, grittier sequel tone.",
    "mist: Tree-lined country lane disappearing into heavy mist. Commenters floated Wayne Manor or Scottish moorlands, unconfirmed officially.",
  ],
  fraser: [
    {
      heading: "Custom ARRI Alfa Anamorphic Lenses",
      body: "Greig Fraser paired the large-format ARRI Alexa LF camera with custom Alfa series anamorphic lenses (2.39:1 aspect ratio) tuned by ARRI Rental. Delivering razor-sharp optical clarity at center frame with organic coma, vignetting, and astigmatism along the edges, it captured a tactile, filmic richness.",
    },
    {
      heading: "Practical Neo-Noir Lighting Aesthetics",
      body: "The film largely avoided artificial softboxes, drawing motivation directly from practical sources within Gotham: orange sodium-vapor glows, cold red and blue neon signs, automobile headlights, and wet puddles. Exposure was held strictly in low-key ranges with deep shadows.",
    },
    {
      heading: "Dramatic Geometric Silhouette Framing",
      body: "Fraser deployed single-point perspective and striking silhouettes, fusing Batman's cowl with Gotham's Gothic towers. During the iconic car chase, anamorphic blue horizontal lens flares pierced through pouring rain for kinetic visual shock.",
    },
    {
      heading: "StageCraft LED Virtual Production Breakthrough",
      body: "Following COVID-19 filming interruptions in 2020, Fraser and Reeves pioneered the adoption of Industrial Light & Magic's StageCraft LED Volume at Warner Bros. Studios Leavesden. High-peril sequences—including the unfinished skyscraper balcony, the rainy City Hall rooftop, and GCPD dusk panoramas—were staged within the real-time Unreal Engine LED volume, bathing the actors and Batsuit in photorealistic practical reflections while eliminating green screen spill and pandemic crowd liabilities.",
    },
  ],
  messerschmidt: [
    {
      heading: "Oscar Winner Takes the Helm for Part II",
      body: "Erik Messerschmidt won an Academy Award for Mank and earned acclaim for his surgical lighting and disciplined framing on Mindhunter and The Killer. Confirmed in December 2025 to succeed Fraser, his psychological tension layers atop the existing neo-noir foundation.",
    },
    {
      heading: "Four Pre-Production Instagram Location Scouts",
      body: "Between February 27 and May 21, 2026, Messerschmidt shared four scout photos on @emesserschmidt: northwest, LEDs, spring, and mist, well ahead of Reeves' #FirstShot announcement. They represent verified pre-production location studies.",
    },
    {
      heading: "Winter Snow and Harsh Contrast Challenges",
      body: "The Glasgow set was dressed in dense snow with fog generators, searchlight grids, and wet reflections. Messerschmidt maintained high-contrast lighting, contrasting white snow against cold blue and red emergency flasher flares.",
    },
    {
      heading: "Confirmation of the Film-Out Chemical Process",
      body: "On Batman Day (Sept 19, 2026), Reeves confirmed the return of the film-out workflow: capturing digitally with pristine resolution and control, then recording onto physical film stock and scanning back, achieving 'a beautiful, deliberate imperfection.'",
    },
    {
      heading: "Spherical Lenses? A Fan Discussion",
      body: "Scouting photo commenters noted that adopting spherical lenses would contrast with the anamorphic look of the first film and The Penguin. This remains speculative fan observation; official optical specs are pending.",
    },
  ],
};

export const CITIES_EN: Record<string, {
  city: string;
  note: string;
  pins: {
    name: string;
    filmAs: string;
    work: string;
    body: string;
    visit: string;
  }[];
}> = {
  liverpool: {
    city: "Liverpool",
    note: "Liverpool serves as the primary architectural anchor for Gotham's civic administrative center and monumental neoclassical landmarks.",
    pins: [
      {
        name: "St George's Hall",
        filmAs: "Gotham City Hall / Mayor's Memorial",
        work: "The Batman · The Batman: Part II",
        body: "The eastern neoclassical colonnade of St George's Hall served as the exterior for Mayor Don Mitchell Jr.'s memorial service. In May 2026, production trucks returned to this plaza, indicating it continues to represent the seat of Gotham municipal power.",
        visit: "Located directly across from Liverpool Lime Street railway station. Grade I listed building with an open civic plaza welcoming visitors year-round.",
      },
      {
        name: "Royal Liver Building",
        filmAs: "GCPD Headquarters Rooftop",
        work: "The Batman",
        body: "One of Liverpool's iconic 'Three Graces'. The clock tower rooftop is where Batman was cornered by SWAT officers before leaping off with his wingsuit.",
        visit: "Situated at the Pier Head waterfront. Visitors can walk the riverside esplanade or book tickets for the Royal Liver Building 360 tower tour.",
      },
      {
        name: "Anfield Cemetery",
        filmAs: "Gotham Cemetery Gothic Underground Arch",
        work: "The Batman",
        body: "Features quiet Victorian Gothic stonework archways. Served as the covert subterranean tunnel where Batman and Selina departed on their motorcycles following their cemetery rendezvous.",
        visit: "Located on Cherry Lane in north Liverpool. A historic public Victorian cemetery open during daylight hours; please observe solemnity.",
      },
      {
        name: "Queensway Tunnel",
        filmAs: "Part II Winter Road Chase Location",
        work: "The Batman: Part II",
        body: "A renowned vehicular tunnel connecting Liverpool and Birkenhead beneath the River Mersey. Used for dynamic night shoots featuring the Batmobile in cold-weather pursuits.",
        visit: "An active municipal toll highway; driving through provides a first-hand experience of the film's industrial Art Deco tunnel arches.",
      },
    ],
  },
  glasgow: {
    city: "Glasgow",
    note: "Scotland's largest city, renowned for red sandstone Victorian architecture and heavy industrial bridges, serves as the core staging ground for Part II's winter chases.",
    pins: [
      {
        name: "Glasgow Necropolis",
        filmAs: "Gotham Cemetery & Bridge of Sighs",
        work: "The Batman",
        body: "The Bridge of Sighs and hillside Victorian monuments formed the poetic finale of the first film, where Bruce and Selina parted ways on their motorcycles.",
        visit: "Adjacent to Glasgow Cathedral, open daily for walking tours offering panoramic city views and authentic film sightlines.",
      },
      {
        name: "Glasgow Bridge",
        filmAs: "Winter Gotham Bridge Set",
        work: "The Batman: Part II",
        body: "Staged with snow machines, winterized GCPD squad cars, and tactical barriers during late summer 2026 night shoots for high-stakes vehicular showdowns.",
        visit: "A primary bridge spanning the River Clyde in central Glasgow, easily accessible via public walkways.",
      },
    ],
  },
  london: {
    city: "London & Surrounds",
    note: "Greater London provided soundstages at Warner Bros. Studios Leavesden alongside brutalist interiors, subterranean tunnels, and iconic civic domes.",
    pins: [
      {
        name: "The O2 Arena",
        filmAs: "Gotham Square Garden (Interior Climax)",
        work: "The Batman",
        body: "The cavernous dome interior hosted the massive flood shelter sequence where Batman severed the high-voltage cable and guided citizens with a red flare.",
        visit: "Located on the Greenwich Peninsula. A premier entertainment arena surrounded by public dining and entertainment complexes.",
      },
      {
        name: "Two Temple Place",
        filmAs: "Mayor Mitchell's Private Residence (Interior)",
        work: "The Batman",
        body: "A neo-Gothic Victorian mansion on the Victoria Embankment, chosen for its ornate dark mahogany staircases and wood-paneled study.",
        visit: "Hosts seasonal public art exhibitions and private architecture tours on select dates.",
      },
      {
        name: "Printworks London",
        filmAs: "The Iceberg Lounge (Interior)",
        work: "The Batman",
        body: "A former industrial newspaper printing plant in Rotherhithe, its towering industrial halls and narrow steel gantries accommodated the multilevel nightclub set.",
        visit: "The historic printing halls are currently undergoing urban cultural regeneration in southeastern London.",
      },
      {
        name: "Kingsway Tram Tunnel",
        filmAs: "Abandoned Wayne Rail Station / Batcave Access",
        work: "The Batman",
        body: "An abandoned subterranean tram subway beneath Southampton Row in Holborn, offering authentic historic brickwork and rusted iron tracks.",
        visit: "Occasionally featured in London Transport Museum 'Hidden London' guided underground tours.",
      },
    ],
  },
};

export const ALIASES_EN = [
  { heard: "Mayor's Funeral / City Hall", mapsTo: "st-georges", body: "St George's Hall, Liverpool: Grand eastern colonnade where Bruce arrives in his Corvette." },
  { heard: "GCPD Rooftop / Wingsuit Leap", mapsTo: "liver-building", body: "Royal Liver Building, Liverpool: Clock tower rooftop where Batman deploys his wingsuit glider." },
  { heard: "Cemetery Farewell / Bridge of Sighs", mapsTo: "necropolis", body: "Glasgow Necropolis, Scotland: Victorian hilltop cemetery where Bruce and Selina ride apart." },
  { heard: "Flood Climax / Arena Shelter", mapsTo: "o2-arena", body: "The O2 Arena, London: Submerged interior rafters where Batman cuts the electrical line." },
  { heard: "The Iceberg Lounge Dancefloor", mapsTo: "printworks", body: "Printworks, London: Former industrial printing press hall converted into the neon nightclub." },
  { heard: "Mayor's Crime Scene Study", mapsTo: "two-temple", body: "Two Temple Place, London: Neo-Gothic wood-paneled mansion where the opening homicide occurs." },
];

export function getLocalizedTheme(theme: ThemeCue, locale: Locale): ThemeCue {
  if (locale === "zh") return theme;
  const en = THEMES_EN[theme.id];
  if (!en) return theme;
  return {
    ...theme,
    jump: en.jump,
    title: en.title,
    kind: en.kind,
    when: en.when,
    lede: en.lede,
    sections: en.sections,
  };
}
