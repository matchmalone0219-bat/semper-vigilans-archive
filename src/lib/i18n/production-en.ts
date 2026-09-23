import type { ProductionPhase, ScriptComparison, ScreenTestDuel } from "@/data/production";

export const PRODUCTION_PHASES_EN: Record<
  string,
  {
    tag: string;
    title: string;
    summary: string;
    bulletPoints: string[];
    keyQuotes?: {
      speaker: string;
      role: string;
      text: string;
      source: string;
      sourceUrl?: string;
    }[];
    source: string;
    sourceUrl?: string;
  }
> = {
  "affleck-era": {
    tag: "DCEU Original Concept",
    title: "Ben Affleck's Solo Movie & The Deathstroke Revenge Arc",
    summary:
      "After signing on in 2013 to portray a seasoned Bruce Wayne in the DCEU, Warner Bros. and Ben Affleck initiated a solo film in 2015. Co-written with DC CCO Geoff Johns, the original script set Arkham Asylum as its primary arena, pitting Batman against the assassin Deathstroke in a methodical campaign to dismantle Bruce Wayne's life.",
    bulletPoints: [
      "Warner Bros. CEO Kevin Tsujihara officially announced at CinemaCon 2016 that Ben Affleck would write, direct, and star in the standalone film, tentatively titled 'The Batman'.",
      "In August 2016, Affleck surprised fans by posting test footage of a fully armored Deathstroke on the London 'Justice League' set; Geoff Johns confirmed in September that Joe Manganiello was officially cast as Slade Wilson.",
      "The script was deeply intertwined with the DCEU canon, featuring an Arkham Asylum riot with planned appearances by Margot Robbie's Harley Quinn and other rogue gallery regulars.",
      "Manganiello revealed the story was tonally inspired by David Fincher's 'The Game'—Deathstroke blamed Batman for his son's death, infiltrating Gotham to systematically strip away Bruce's fortune, allies, and psychological sanity.",
    ],
    keyQuotes: [
      {
        speaker: "Ben Affleck",
        role: "Original Director / Writer / Batman",
        text: "For me, as a director, it's about the material and the characters, so if I found the right material I would definitely throw my hat in the ring to direct something on that scale.",
        source: "Yahoo News · March 2016",
        sourceUrl: "https://www.yahoo.com/news/batman-v-superman-yields-unlikely-female-hero-224254500.html",
      },
      {
        speaker: "Joe Manganiello",
        role: "Originally Cast as Deathstroke",
        text: "It was a really dark, psychological story. Deathstroke was like a horror movie predator, hunting Bruce Wayne and taking apart his life from the inside out.",
        source: "Collider Exclusive",
        sourceUrl: "https://collider.com/joe-manganiello-ben-affleck-batman-movie-details/",
      },
    ],
    source: "Variety / The Hollywood Reporter",
    sourceUrl: "https://variety.com/2015/film/news/ben-affleck-solo-batman-movie-1201537304/",
  },
  "creative-crisis": {
    tag: "Crisis & Turning Point",
    title: "Personal Crisis, Affleck's Directorial Exit & Reeves' Takeover",
    summary:
      "Strained by the critical disappointment of 'Live by Night', personal health challenges, and the chaotic production of 'Justice League', Affleck stepped down as director in January 2017. Warner Bros. then courted Matt Reeves, who negotiated complete creative independence and insisted on completely tossing out the existing script.",
    bulletPoints: [
      "Affleck confided to a confidant: 'I showed somebody The Batman script. They said, 'I think the script is good. I also think you’ll drink yourself to death if you go through what you just went through again.''",
      "On January 30, 2017, Affleck formally stepped down as director, initially intending to remain as star and producer to focus entirely on the performance.",
      "On February 23, 2017, Matt Reeves ('Dawn of the Planet of the Apes') officially signed on to write, direct, and produce.",
      "The pivotal fork in the road: Reeves set a hard prerequisite with studio executives—he would not use Affleck and Johns' action-thriller script, choosing instead to write a fresh narrative focusing on Bruce Wayne's raw 'Year Two'.",
    ],
    keyQuotes: [
      {
        speaker: "Ben Affleck",
        role: "Original Star / Co-Writer",
        text: "I couldn't crack it. I tried to direct a version of it, and worked with a really good screenwriter, but just couldn't come up with a version that worked. It felt like it was time to let someone else take a shot at it.",
        source: "Jimmy Kimmel Live",
        sourceUrl: "https://variety.com/2019/film/news/ben-affleck-retires-batman-jimmy-kimmel-1203140590/",
      },
      {
        speaker: "Matt Reeves",
        role: "Director / Co-Writer",
        text: "I read a script that they had that was totally valid... action-driven, connected to the DCEU. But I told them, that's not me. If I'm doing this, it has to be a personal, subjective noir detective investigation.",
        source: "Esquire Feature",
        sourceUrl: "https://www.esquire.com/entertainment/movies/a38753232/matt-reeves-the-batman-interview/",
      },
    ],
    source: "Variety / The Hollywood Reporter",
    sourceUrl: "https://variety.com/2017/film/news/matt-reeves-the-batman-director-ben-affleck-1201994998/",
  },
  "screen-test-reboot": {
    tag: "Reboot & Casting Duel",
    title: "DCEU Separation, The Elseworlds Pivot & The 35mm Screen Test Duel",
    summary:
      "In January 2019, Affleck officially retired from the cowl, and Warner Bros. scheduled a 2021 release date. Reeves decoupled the story into an autonomous 'Elseworlds' saga. After a months-long global search, Robert Pattinson and Nicholas Hoult competed in a high-stakes 35mm screen test wearing vintage Batsuits.",
    bulletPoints: [
      "On January 30, 2019, Warner Bros. announced the revised release window; Affleck tweeted his blessing to the new filmmakers, marking the definitive conclusion of the DCEU Batman era.",
      "Reeves conceived his young Bruce Wayne while writing with Robert Pattinson in mind, inspired by his frantic, brooding, and dangerous turn in the Safdie brothers' 'Good Time' (2017).",
      "By mid-May 2019, casting boiled down to two British finalists: Robert Pattinson and Nicholas Hoult, who both flew to Burbank for final camera tests.",
      "The audition protocol: both actors stepped into Val Kilmer's original 1995 'Batman Forever' rubber suit for 35mm film camera tests, evaluating bone structure, jawline definition, and the intensity behind the cowl eyeholes.",
      "On May 31, 2019, Warner Bros. and Reeves officially ratified Robert Pattinson as the next Dark Knight, initiating a brand-new neo-noir era.",
    ],
    keyQuotes: [
      {
        speaker: "Robert Pattinson",
        role: "Bruce Wayne / Batman",
        text: "You feel very powerful immediately. It's pretty astonishing. It takes five people to help you shove your way into it, and you're sweating profusely, but once it's on, you feel this visceral surge of adrenaline.",
        source: "Variety Cover Story",
        sourceUrl: "https://variety.com/2019/film/features/robert-pattinson-batman-the-lighthouse-tenet-1203319822/",
      },
      {
        speaker: "Nicholas Hoult",
        role: "Finalist Screen Test Actor (now DCU Lex Luthor)",
        text: "Of course it's an emotional blow. But you accept it. Matt's vision was crystal clear, and Rob did a magnificent job. I respect the entire creative journey.",
        source: "Happy Sad Confused Podcast",
        sourceUrl: "https://variety.com/2023/film/news/nicholas-hoult-lost-batman-top-gun-maverick-mission-impossible-7-1235586687/",
      },
    ],
    source: "Deadline / Variety",
    sourceUrl: "https://deadline.com/2019/05/robert-pattinson-batman-warner-bros-matt-reeves-1202624838/",
  },
  "pandemic-crucible": {
    tag: "Production Crucible",
    title: "Two Pandemic Halts, StageCraft LED Breakthrough & $771M Triumph",
    summary:
      "Filming launched in London in January 2020 before being slammed by the global COVID-19 pandemic. The production persevered through shutdowns, the lead actor contracting the virus, and pioneering the use of ILM StageCraft LED virtual volumes, culminating in massive critical acclaim and $771M worldwide.",
    bulletPoints: [
      "On March 14, 2020, just seven weeks into shooting across London and Liverpool, global pandemic lockdowns shuttered production indefinitely.",
      "On September 1, 2020, filming tentatively resumed at Leavesden Studios—only to be halted three days later when Robert Pattinson tested positive for COVID-19, sending the crew into a two-week quarantine.",
      "To circumvent international travel bans, DP Greig Fraser and Industrial Light & Magic deployed StageCraft LED volumes indoors, rendering real-time golden hour environmental lighting for City Hall rooftops.",
      "Principal photography wrapped on March 13, 2021 after a grueling 14-month odyssey; released on March 4, 2022, the film grossed $771 million globally and earned 3 Academy Award nominations.",
    ],
    keyQuotes: [
      {
        speaker: "Matt Reeves",
        role: "Director",
        text: "Making this movie felt like a survival mission. Every roadblock pushed us to double down on what made the story authentic, raw, and relentlessly human.",
        source: "The Hollywood Reporter Cover Story",
        sourceUrl: "https://www.hollywoodreporter.com/movies/movie-features/the-batman-matt-reeves-robert-pattinson-1235087595/",
      },
    ],
    source: "Deadline / Variety",
    sourceUrl: "https://deadline.com/2020/09/batman-uk-production-halts-covid-19-1234569959/",
  },
};

export const SCRIPT_COMPARISONS_EN: ScriptComparison[] = [
  {
    dimension: "Universe Canon & Continuity",
    affleckScript:
      "DCEU Core Canon; directly continuing Batman v Superman and Justice League, featuring crossover worldbuilding with Suicide Squad, Harley Quinn, and Justice League members.",
    reevesReboot:
      "Autonomous Elseworlds; completely untethered from god-like superhumans, building a gritty, grounded 'Batman Epic Crime Saga'.",
  },
  {
    dimension: "Narrative Genre & Tone",
    affleckScript:
      "High-octane psychological action thriller; emphasizing tight-quarters martial arts, high-tech gadgetry, and a globe-trotting James Bond pacing.",
    reevesReboot:
      "Neo-Noir Detective Mystery; inspired by Chinatown, Klute, and Zodiac, returning Batman to his 'World's Greatest Detective' procedural origins.",
  },
  {
    dimension: "Central Antagonist & Conflict",
    affleckScript:
      "Deathstroke (Slade Wilson / Joe Manganiello); motivated by personal vendetta, executing a targeted infiltration to dismantle Bruce Wayne's life from the outside in.",
    reevesReboot:
      "The Riddler (Edward Nashton / Paul Dano); a grassroots anti-establishment extremist unmasking forty years of institutional corruption and Wayne philanthropy fraud.",
  },
  {
    dimension: "Primary Setting & Scale",
    affleckScript:
      "Arkham Asylum breakout; centered around an asylum lockdown and rogue gallery uprising, contrasted with high-society Wayne Manor luxuries.",
    reevesReboot:
      "Rain-soaked street gutters, abandoned high-rises, and Iceberg Lounge underworld; the Wayne legacy reduced to a decaying, reclusive Wayne Tower.",
  },
  {
    dimension: "Bruce Wayne's Mindset",
    affleckScript:
      "A weathered, 20-year veteran vigilante; hardened by Robin's tragic death, disillusioned with humanity, and utilizing lethal, brutal tactics.",
    reevesReboot:
      "A raw 'Year Two' reclusive vigilante; consumed by unprocessed grief, viewing himself strictly as an avatar of 'Vengeance' before learning to embody hope.",
  },
  {
    dimension: "Aesthetics & Batmobile",
    affleckScript:
      "Heavily armored military combat vehicle mounted with turrets and twin machine cannons; advanced carbon-weave tactical armor.",
    reevesReboot:
      "Hand-welded American muscle car (1969 Dodge Charger chassis with Chevy V8 block); battle-scarred leather and ballistic plate DIY tactical suit.",
  },
];

export const SCREEN_TEST_DUEL_EN: ScreenTestDuel = {
  title: "Burbank 35mm Suit Screen Test Duel (May 2019)",
  date: "Late May 2019",
  location: "Warner Bros. Studios, Burbank, California",
  summary:
    "Prior to locking in Pattinson, Warner Bros. staged a high-stakes, 35mm camera test inside their Burbank stages. Pattinson and Hoult each flew in to step into Val Kilmer's iconic suit under the scrutiny of director Matt Reeves and DP Greig Fraser, testing close-up jawline geometry and emotional resonance through the cowl.",
  candidates: [
    {
      name: "Robert Pattinson",
      suitWorn: "Val Kilmer's 'Batman Forever' (1995) suit",
      strengths:
        "Coming off magnetic turns in Good Time and Cosmopolis, possessed the exact 'reclusive rock star, raw rage, and haunting vulnerability' Reeves envisioned; captivating gaze behind the cowl.",
      outcome:
        "Officially Cast: Approved on May 31, 2019, becoming one of the youngest standalone Batman leads in cinematic history.",
      laterDcuFate:
        "Headlines 'The Batman' feature trilogy and the overarching Epic Crime Saga.",
    },
    {
      name: "Nicholas Hoult",
      suitWorn: "Legacy Batsuit screen test fitting",
      strengths:
        "Premier British talent with exceptional versatility (Mad Max: Fury Road, The Favourite), statuesque physique, regal poise, and commanding vocal cadence.",
      outcome:
        "Runner-Up: Narrowly missed out, but left a lasting impression on studio leadership and director Matt Reeves.",
      laterDcuFate:
        "Handpicked by James Gunn in 2023 to play arch-nemesis Lex Luthor in the new DCU's 'Superman' (2025).",
    },
  ],
  details: [
    "The vintage rubber Batsuit featured zero built-in cooling, requiring five wardrobe technicians over 40 minutes just to squeeze each actor inside under blistering studio lighting.",
    "Reeves' primary evaluation criterion wasn't athletic flips, but rather: 'When the cowl is on and only the eyes and jaw are visible, can the actor command the entire frame with a single breath?'",
    "Reviewing the 35mm close-up footage in the editing suite, Reeves determined that Pattinson's tragic, Kurt Cobain-esque weariness provided the indispensable soul for this neo-noir incarnation.",
  ],
};

export function getLocalizedProductionPhase(phase: ProductionPhase, locale: string) {
  if (locale !== "en") return phase;
  const en = PRODUCTION_PHASES_EN[phase.id];
  if (!en) return phase;
  return {
    ...phase,
    tag: en.tag,
    title: en.title,
    summary: en.summary,
    bulletPoints: en.bulletPoints,
    keyQuotes: en.keyQuotes ?? phase.keyQuotes,
    source: en.source,
    sourceUrl: en.sourceUrl ?? phase.sourceUrl,
  };
}

export function getLocalizedScriptComparisons(locale: string): ScriptComparison[] {
  if (locale === "en") return SCRIPT_COMPARISONS_EN;
  return [];
}
