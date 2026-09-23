import type { Locale } from "./types";
import type { RecapWork, GothamEra } from "@/data/recap";

export const RECAP_HEADER_EN = {
  title: "Recap & Gotham Timeline",
  subtitle: "GOTHAM TIMELINE & RECAPS",
  lede: "A comprehensive chronological narrative timeline of The Batman Epic Crime Saga: spanning the ancestral Wayne scandals, Riddler's terror campaign, the catastrophic seawall flood, through Oz Cobb's bloody syndicate war in The Penguin, leading straight into the winter crucible of Part II.",
  quickNavTitle: "Story Universe Navigation",
  timelineTitle: "Gotham Chronological Timeline",
  timelineLede: "Events arranged in in-universe chronological order. For real-world production logs, release dates, and shooting schedules, visit Film Dossier · Shoot Log.",
  recapsTitle: "Deep Story Recaps",
  recapsLede: "Detailed narrative breakdowns of all canon works in Matt Reeves' universe: characters, themes, and open plot threads leading into Part II.",
  boardTitle: "Sequel Evidence & Character Status Board",
  boardLede: "Confirmed character statuses and faction standing heading into the winter of The Batman: Part II:",
};

export const TIMELINE_BEATS_EN: Record<string, { when: string; span: string; title: string; line: string; published: string; form: string }> = {
  before: {
    when: "Formative Years (1997–2010s)",
    span: "Thomas Wayne's mayoral bid to 17-year-old Bruce's custom muscle cars",
    title: "Before the Batman",
    line: "Bruce discovers the abandoned subterranean rail terminal beneath Wayne Tower, building his workshop while working under aliases; Edward Nashton struggles in the neglected orphanage.",
    published: "2022",
    form: "Official Prequel Novel",
  },
  "year-one": {
    when: "One Year Prior to Film (6-Issue Canon Arc)",
    span: "KTMJ accounting audits to Halloween infiltration",
    title: "Riddler: Year One",
    line: "Forensic accountant Edward Nashton uncovers the multi-billion Renewal fund laundering conspiracy, witnesses Batman in action, launches rataalada.com, and descends into vigilante terror.",
    published: "2022–2023",
    form: "DC Black Label Limited Series",
  },
  "the-batman": {
    when: "Year Two of Vigilance · Halloween Murders",
    span: "A seven-day hardboiled noir detective investigation",
    title: "The Batman",
    line: "The Riddler systematically executes corrupt officials before detonating the harbor seawalls; Batman undergoes a profound metamorphosis from pure vengeance into a symbol of hope.",
    published: "2022",
    form: "Theatrical Feature Film",
  },
  "the-penguin": {
    when: "One Week Post-Flood · The Power Vacuum",
    span: "8-episode limited series chronicling Oz Cobb's ruthless ascendance",
    title: "The Penguin",
    line: "With Carmine Falcone dead, Oz Cobb exploits the catastrophic flood to wage war on rival families, eliminating all emotional vulnerabilities to crown himself the new kingpin.",
    published: "2024",
    form: "HBO Original Limited Series",
  },
  "part-two": {
    when: "Weeks Post-Series · Deep Winter",
    span: "Theatrical Release: February 18, 2028",
    title: "The Batman: Part II",
    line: "A brutal winter envelops Gotham; practical shoots in Glasgow capture squad cars pursuing the snow-treaded Batmobile, while Bruce is escorted through civil protests outside London courts.",
    published: "2028",
    form: "Theatrical Feature Film",
  },
};

export const GOTHAM_ERAS_EN: Record<number, { era: string; note: string; beats: { when: string; title: string; line: string; source: string }[] }> = {
  0: {
    era: "I. Arkham Dynasty & The Wayne Tragedy (Martha's Childhood–2002)",
    note: "Two founding dynasties unite, mental illness records are sealed, until gunfire in Crime Alley shatters the philanthropic myth.",
    beats: [
      {
        when: "Martha's Youth",
        title: "The Arkham Tragedy & Concealed Trauma",
        line: "Martha experiences severe familial trauma; powerful influence seals the medical records. She undergoes psychiatric treatment at Arkham State Hospital, an explosive secret later weaponized by Riddler.",
        source: "The Batman",
      },
      {
        when: "1997",
        title: "Edward Abandoned at Orphanage",
        line: "Infant Edward Nashton is left on the steps of Gotham Orphanage; his mother, suffering from severe mental illness, commits suicide inside Arkham State Hospital.",
        source: "Riddler: Year One",
      },
      {
        when: "1997",
        title: "Wayne Manor Repurposed into Orphanage",
        line: "Thomas and Martha Wayne officially donate their ancestral estate to create the Gotham Orphanage as a civic philanthropic endeavor.",
        source: "Before the Batman",
      },
      {
        when: "1997",
        title: "Thomas Runs for Mayor & Founds Renewal",
        line: "Thomas Wayne announces his mayoral candidacy and establishes the multibillion-dollar Gotham Renewal Fund; young Edward catches his first glimpse of Bruce in the orphanage choir.",
        source: "Before the Batman",
      },
      {
        when: "Campaign Trail",
        title: "Thomas Asks Falcone to Silence Reporter",
        line: "To halt investigative reporter Edward Elliot from exposing Martha's psychiatric history, Thomas appeals to Carmine Falcone; Falcone takes it upon himself to murder Elliot, permanently binding the Waynes to the mob.",
        source: "Riddler: Year One / The Batman",
      },
      {
        when: "Circa 2002",
        title: "Thomas & Martha Wayne Murdered in Crime Alley",
        line: "Leaving a screening at the Monarch Theater, the Waynes are shot dead on Park Row. Ten-year-old Bruce is orphaned; Gotham plunges unchecked into institutional collapse.",
        source: "Core Canon Lore",
      },
    ],
  },
  1: {
    era: "II. Divergent Paths of Youth (2003–2010s)",
    note: "In the decade following the murders, Bruce and Edward follow drastically opposing trajectories within the same city.",
    beats: [
      {
        when: "Early Adolescence",
        title: "Edward's Renewal Scholarship Denials",
        line: "Following the Waynes' deaths, orphanage conditions deteriorate; Edward's repeated academic scholarship applications are heartlessly rejected, planting deep seeds of class resentment.",
        source: "Riddler: Year One",
      },
      {
        when: "Age 17 (Summer)",
        title: "Bruce Discovers Subterranean Rail Station",
        line: "Returning from boarding school to Wayne Tower, Bruce uncovers the abandoned Wayne Terminus private train station deep underground, converting it into a clandestine workshop.",
        source: "Before the Batman",
      },
      {
        when: "Age 17 (Summer)",
        title: "Racing Under the Alias 'Paul'",
        line: "Dressed in an early prototype of his drifter gear, Bruce races a custom muscle car under the pseudonym 'Paul', encountering street racer Dax.",
        source: "Before the Batman",
      },
      {
        when: "Age 17 (Summer)",
        title: "Alfred's Combat & Moral Guidance",
        line: "Alfred trains Bruce in military combat and forensic science, warning that reckless street racing is an avoidance mechanism and redirecting his obsession toward discipline.",
        source: "Before the Batman",
      },
      {
        when: "Young Adulthood",
        title: "Delivery Job Incident Fuels Class Retaliation",
        line: "Working as a delivery courier, Edward is nearly struck by joyriding wealthy youths; he retaliates by planting an explosive in their exhaust pipe, expanding his hatred to the entire ruling elite.",
        source: "Before the Batman",
      },
    ],
  },
  2: {
    era: "III. First Year of the Cape (Year One)",
    note: "Bruce dons armor to launch his nocturnal crusade as 'Vengeance'; Edward operates as an unassuming forensic accountant.",
    beats: [
      {
        when: "Year One",
        title: "The Batman Patrols as 'Vengeance'",
        line: "Bruce develops tactical armor and recording contact lenses, terrorizing criminals in the rain; Lieutenant Jim Gordon emerges as his sole reliable GCPD ally.",
        source: "The Batman Lore",
      },
      {
        when: "Concurrent",
        title: "Edward Joins KTMJ Accounting Firm",
        line: "Utilizing savant-level mathematical skills, Edward Nashton joins KTMJ as a forensic accountant, meticulously mapping Gotham's financial and illicit money flows.",
        source: "Riddler: Year One",
      },
    ],
  },
  3: {
    era: "IV. The Audit & The Awakening (One Year Prior to Film)",
    note: "The six-issue storyline of Riddler: Year One: forensic auditing, witnessing Batman, launching the cipher network.",
    beats: [
      {
        when: "Issue 1",
        title: "Phony Pet Shelter & Witnessing Batman",
        line: "Edward uncovers $10,000 weekly wire transfers from a pet charity to waterfront dummy corporations; that night behind Iceberg Lounge, he witnesses Batman brutally subdue mobsters to save Annika.",
        source: "Riddler: Year One",
      },
      {
        when: "Issue 2",
        title: "Tracing Falcone's Drops Network & Police Corruption",
        line: "Edward traces dummy accounts to Falcone's 'Drops' narcotics operation; attempting to blow the whistle, he discovers Detective William Kenzie and senior GCPD ranks are on the mob payroll.",
        source: "Riddler: Year One",
      },
      {
        when: "Issue 3",
        title: "The Renewal Laundering Mechanism Unveiled",
        line: "Edward's audit confirms Renewal funds have been systematically plundered by Mayor Mitchell, Commissioner Savage, and DA Colson under Falcone's direction; disillusioned, he resolves on lethal extrajudicial action.",
        source: "Riddler: Year One",
      },
      {
        when: "Issue 4",
        title: "Birth of the Riddler & rataalada.com",
        line: "Edward purchases surplus winter combat gear and a military combat knife, launching the encrypted portal rataalada.com to recruit online followers with cryptographic ciphers.",
        source: "Riddler: Year One",
      },
      {
        when: "Issue 5",
        title: "Cryptographic Journals & Seawall Blast Blueprint",
        line: "Edward calculates Gotham's hydrological depression below sea level, mapping a synchronized seven-van bomb plot along the seawalls to flood the city on Election Night.",
        source: "Riddler: Year One",
      },
      {
        when: "Issue 6",
        title: "Eliminating Higgins & Infiltrating the Mayor's Home",
        line: "Edward blackmails his corrupt supervisor into suicide. On Halloween night, disguised in his military green combat mask, he breaks into Mayor Mitchell's home, leaving the first 'To the Batman' envelope.",
        source: "Riddler: Year One",
      },
    ],
  },
  4: {
    era: "V. The Halloween Murders & The Great Flood (The Batman)",
    note: "The theatrical narrative of The Batman: serial assassinations, mayoral conspiracy unmasked, seawalls blown, and the arena rescue.",
    beats: [
      {
        when: "Halloween Night",
        title: "Mayor Mitchell Murdered; The First Cipher",
        line: "Mayor Don Mitchell Jr. is assassinated in his study. Riddler leaves a cipher addressed to Batman, drawing the vigilante into forensic homicide investigations with Gordon.",
        source: "The Batman",
      },
      {
        when: "Day 2–3",
        title: "Commissioner Savage & DA Colson Targeted",
        line: "Commissioner Savage is murdered; DA Gil Colson is kidnapped with a neck-bomb collar and driven into Mitchell's funeral, forced to answer ciphers before exploding live on air.",
        source: "The Batman",
      },
      {
        when: "Day 4–5",
        title: "Iceberg Lounge Infiltration & Selina Kyle",
        line: "Batman infiltrates 44 Below, teaming with Selina Kyle to uncover Annika Koslov's murder and proof that Carmine Falcone is the secret confidential police informant behind Maroni's downfall.",
        source: "The Batman",
      },
      {
        when: "Day 6",
        title: "Falcone Assassinated; Nashton Apprehended",
        line: "Brought into the open by Batman, Falcone is gunned down from across the street by Nashton. GCPD raids Riddler's diner and confines him to Arkham State Hospital.",
        source: "The Batman",
      },
      {
        when: "Election Night",
        title: "Seawalls Detonated; Gotham Square Garden Rescue",
        line: "Seven van bombs rupture the seawall, flooding Downtown. Batman fights through Riddler's snipers inside the arena, cuts the lethal high-voltage cable, and ignites a flare to lead survivors to safety.",
        source: "The Batman",
      },
    ],
  },
  5: {
    era: "VI. Underworld War & The Rise of the Kingpin (The Penguin)",
    note: "The HBO series narrative: Carmine Falcone's empire crumbles; Oz Cobb outmaneuvers Sofia Falcone to seize undisputed criminal supremacy.",
    beats: [
      {
        when: "Week 1 Post-Flood",
        title: "Oz Kills Alberto Falcone; Sparking Gang War",
        line: "Laughing at Oz's dreams of respect, heir Alberto Falcone is impulsively shot by Oz, igniting a war of succession between the Falcone and Maroni syndicates.",
        source: "The Penguin",
      },
      {
        when: "Mid-Season",
        title: "Sofia Falcone Released; Bliss Drug Pipeline",
        line: "Sofia Falcone is discharged from Arkham; Oz recruits street orphan Victor Aguilar and develops 'Bliss', a potent new mushroom-derived narcotic manufactured in flooded Crown Point tunnels.",
        source: "The Penguin",
      },
      {
        when: "Climax",
        title: "The Fall of the Gigantes & Victor's Tragic Fate",
        line: "Sofia wipes out the Falcone family patriarchs, rebranding as Gigante. Oz manipulates rival factions into mutual destruction, framing Sofia and returning her to Arkham. To eliminate his final emotional vulnerability, Oz strangles Victor.",
        source: "The Penguin",
      },
      {
        when: "Finale",
        title: "Oz Ascends Penthouse; Bat-Signal Relit",
        line: "Oz Cobb takes possession of an opulent downtown penthouse as Gotham's undisputed crime boss. In the final shot, the Bat-Signal cuts through the night sky, heralding Part II.",
        source: "The Penguin",
      },
    ],
  },
  6: {
    era: "VII. The Coming Winter Storm (The Batman: Part II)",
    note: "Following Oz's ascension, sub-zero winter temperatures grip Gotham as street protests and institutional backlash escalate.",
    beats: [
      {
        when: "Winter 2026/2028",
        title: "Sub-Zero Gotham & Snow Pursuit",
        line: "Freezing conditions freeze canals and bridges; set footage in Glasgow captures police cruisers ambushing the Batmobile equipped with snow treads and heavy exterior wear.",
        source: "Part II Set Leaks",
      },
      {
        when: "Winter 2026/2028",
        title: "Courthouse Protests & Civilian Scrutiny",
        line: "Bruce Wayne is filmed being escorted through angry picketing crowds outside London courts, pointing to civil unrest, legal fallout, or intense scrutiny on Wayne philanthropic resources.",
        source: "Part II Set Leaks",
      },
    ],
  },
};

export const BOARD_EN = [
  { who: "Gotham City", state: "Still reeling from catastrophic seawall flooding, the city faces freezing winter temperatures with crippled municipal infrastructure, power grids, and law enforcement." },
  { who: "Bruce Wayne / The Batman", state: "Robert Pattinson returns. Filmed in Glasgow in battle-worn armor with winter vehicle modifications, and in London navigating hostile civilian protests outside municipal courts." },
  { who: "Edward Nashton / The Riddler", state: "Confined to maximum-security Arkham State Hospital. Formed a nascent bond with an unidentified inmate (The Joker) in the first film's closing scenes." },
  { who: "Lieutenant Jim Gordon", state: "Jeffrey Wright confirmed returning, photographed in Gordon's signature trench coat amid court protest sequences filmed on September 13 in central London." },
  { who: "Oz Cobb / The Penguin", state: "Colin Farrell confirmed returning. Having eliminated his rivals and murdered his protege Victor, Oz reigns supreme over Gotham's illicit narcotics empire." },
  { who: "New Cast Ensemble", state: "Scarlett Johansson, Sebastian Stan, Charles Dance, Sebastian Koch, and Brian Tyree Henry join the production in undisclosed pivotal roles." },
];
