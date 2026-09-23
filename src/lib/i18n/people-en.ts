import type { Locale } from "./types";

export type LocalizedPersonData = {
  name: string;
  sub: string;
  actor?: string;
  sections: { heading: string; body: string }[];
  appearances: { work: string; note: string }[];
};

export const FACTIONS_EN: Record<string, { label: string; note: string }> = {
  wayne: {
    label: "Wayne Family",
    note: "Gotham's oldest philanthropic dynasty. The ancestral estate was donated as an orphanage; Bruce resides atop Wayne Tower and maintains a secret workshop below.",
  },
  city: {
    label: "City Administration & GCPD",
    note: "Gotham's municipal and law enforcement framework, including Mayor-Elect Bella Reál, Lieutenant Gordon, and honest patrolmen striving for institutional reform.",
  },
  falcone: {
    label: "Falcone Crime Family",
    note: "The criminal syndicate that ruled Gotham for three decades. Following Carmine's death, internal power struggles fractured the dynasty.",
  },
  under: {
    label: "The Underworld",
    note: "The reshuffled post-flood criminal landscape. Oz Cobb eliminated all rivals in Crown Point to crown himself the new kingpin of Gotham.",
  },
  arkham: {
    label: "Arkham State Hospital",
    note: "High-security psychiatric institution holding Gotham's most volatile criminal minds, including the Riddler, Sofia (formerly), and the unnamed inmate.",
  },
};

export const PEOPLE_EN: Record<string, LocalizedPersonData> = {
  thomas: {
    name: "Thomas Wayne",
    sub: "Surgeon / Mayoral Candidate",
    actor: "Luke Roberts",
    sections: [
      {
        heading: "Surgeon & Philanthropic Leader",
        body: "Thomas Wayne was a renowned thoracic surgeon and respected civic leader in Gotham. He converted his ancestral Wayne Manor into the Gotham Orphanage and pledged a multi-billion-dollar fund into the Gotham Renewal Trust as part of his mayoral campaign.",
      },
      {
        heading: "Family Secrets & Park Row Murders",
        body: "During the mayoral race, investigative reporter Edward Elliot uncovered Martha's concealed psychiatric hospitalizations. Seeking to shield his wife and protect his campaign, Thomas enlisted Carmine Falcone to intimidate the reporter. Falcone murdered Elliot instead, entangling Thomas with the mob. In roughly 2002, Thomas and Martha were gunned down outside the Monarch Theater, and the Renewal Fund was subsequently captured by Falcone to bribe officials.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Campaigns for mayor, dedicates Gotham Orphanage, and institutes the Gotham Renewal Trust." },
      { work: "Riddler: Year One", note: "Enlists Carmine Falcone to silence investigative journalist Edward Elliot." },
      { work: "The Batman (2022)", note: "Campaign recordings, financial ledgers, and the fatal alley shooting expose the Renewal shadow." },
    ],
  },
  martha: {
    name: "Martha Wayne",
    sub: "The Arkham Bloodline",
    actor: "Stella Stocker",
    sections: [
      {
        heading: "Ancient Dynasty & Arkham Legacy",
        body: "Departing from the mainstream Kane family lineage, Matt Reeves establishes Martha as the scion of Gotham's other founding family: the Arkhams (inspired by Batman: Earth One). The Arkhams established the State Hospital for psychiatric care in the early 18th century, meaning Bruce carries the intertwined bloodlines of Gotham's most influential and troubled dynasties.",
      },
      {
        heading: "Generational Trauma & Suppressed Records",
        body: "The Riddler's exposé revealed that Martha witnessed her mother shoot her father before taking her own life. The Arkham family wielded vast influence to seal the records, while Martha endured severe depression and repeated hospitalizations at Arkham State Hospital. This deep trauma became a fatal vulnerability exploited by political adversaries.",
      },
      {
        heading: "Tragedy in the Alley & The Shattered Myth",
        body: "In roughly 2002, Martha and Thomas were ambushed and shot dead in Park Row behind the Monarch Theater, leaving young Bruce orphaned. The murders sparked the genesis of Batman while dismantling the pristine myth of Wayne benevolence. Her Arkham heritage remains an enduring psychological shadow Bruce must confront.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Visits the soon-to-be-repurposed Wayne Manor alongside Thomas." },
      { work: "Riddler: Year One", note: "Journalist investigates the Arkham family history of severe mental illness." },
      { work: "The Batman (2022)", note: "Murdered in Park Row; her maternal ancestry forces Bruce to confront family shadows." },
    ],
  },
  bruce: {
    name: "Bruce Wayne",
    sub: "The Batman",
    actor: "Robert Pattinson",
    sections: [
      {
        heading: "Year Two as the Vigilante",
        body: "In his second year operating as the Batman, Bruce lives as a recluse by day and patrols the shadows by night, enacting brutal vigilante justice. Aided by Alfred's combat training and intelligence feeds, he initially defines himself strictly as 'Vengeance'.",
      },
      {
        heading: "'A Batman Kurt Cobain'",
        body: "Director Matt Reeves told Esquire: 'He's kind of a drug addict. His drug is his addiction to revenge. He's like a Batman Kurt Cobain.' Rejecting the billionaire playboy facade, Bruce is envisioned as a reclusive, grief-stricken figure dwelling inside a decaying Wayne Tower, listening to Nirvana's 'Something in the Way'. His grunge rock star edge reflects his struggle with unwanted public legacy.",
      },
      {
        heading: "From Vengeance to Hope",
        body: "Clashing with the Riddler forces Bruce to confront the corruption baked into his parents' legacy. When explosive sea wall charges flood Gotham Square Garden, Bruce severs a live high-voltage cable and ignites a flare in the dark waters, guiding stranded citizens to safety and evolving from an instrument of revenge into a beacon of hope.",
      },
      {
        heading: "Sequel Trajectory: Facing Systemic Retaliation",
        body: "In The Batman: Part II, Pattinson returns as Bruce Wayne faces escalating threats. Winter set footage reveals the Batmobile hunted through snowdrifts by GCPD and tactical SWAT units, hinting at public corruption hearings and deep psychological trials beneath the cowl.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Undergoes tactical conditioning, endurance martial arts, and builds prototype muscle cars." },
      { work: "The Batman (2022)", note: "Year Two vigilante solves Halloween serial murders and leads stadium flood rescues." },
      { work: "The Penguin (2024)", note: "Does not appear in person; the Bat-Signal illuminates the skyline in the finale." },
      { work: "The Batman: Part II", note: "Robert Pattinson returns as the sequel explores deeper psychological fractures." },
    ],
  },
  alfred: {
    name: "Alfred Pennyworth",
    sub: "Loyal Butler & Mentor",
    actor: "Andy Serkis",
    sections: [
      {
        heading: "Guardian & Technical Architect",
        body: "A former British intelligence operative, Alfred raised Bruce following the murders of Thomas and Martha Wayne. He trains Bruce in hand-to-hand combat and manages encrypted comms from the subterranean Batcave beneath the abandoned private railway station.",
      },
      {
        heading: "Surviving the Letter Bomb & Deep Bond",
        body: "Alfred decoded the Riddler's cyphers and narrowly survived a targeted letter-bomb intended for Bruce. While hospital-bound, he confessed the painful truth regarding Thomas Wayne, Carmine Falcone, and the dead reporter, reinforcing their profound father-son bond.",
      },
      {
        heading: "Field Support in the Cold",
        body: "Andy Serkis returns for Part II. Winter set leaks capture Alfred rushing across snow-covered bridge roadways to administer emergency chest compressions on an incapacitated Bruce, maintaining his vital role as Bruce's moral compass.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Supervises Bruce's studies and oversees early vehicle testing." },
      { work: "The Batman (2022)", note: "Decodes Riddler ciphers and survives the explosive letter bomb at Wayne Tower." },
      { work: "The Batman: Part II", note: "Andy Serkis returns; seen on set performing emergency CPR in Glasgow snow." },
    ],
  },
  bella: {
    name: "Bella Reál",
    sub: "Mayor-Elect of Gotham",
    actor: "Jayme Lawson",
    sections: [
      {
        heading: "The Reform Mandate",
        body: "A young, idealistic grassroots leader who challenged Mayor Don Mitchell Jr. on anti-corruption and social inequality. She survived targeted gunfire during the Gotham Square Garden flood rally, earning widespread public respect.",
      },
      {
        heading: "Governing a Submerged City",
        body: "Following the seawall disaster, Mayor Reál leads emergency reclamation and relief efforts. In Part II, she must navigate rising gang warfare and police militarization.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Runs on an anti-corruption reform platform, survives rally assassination attempt." },
      { work: "The Penguin (2024)", note: "Appears in televised press conferences directing FEMA disaster relief." },
      { work: "The Batman: Part II", note: "Jayme Lawson confirmed returning as Gotham's chief executive during reconstruction." },
    ],
  },
  gordon: {
    name: "Jim Gordon",
    sub: "GCPD Lieutenant",
    actor: "Jeffrey Wright",
    sections: [
      {
        heading: "The Honest Cop in a Rotting Force",
        body: "One of the few incorruptible detectives in the department, Gordon maintains a clandestine alliance with Batman, using the rooftop Bat-Signal to summon the vigilante to crime scenes.",
      },
      {
        heading: "Breaking the Falcone Machine",
        body: "Gordon arrested dirty cops, unmasked District Attorney Gil Colson's blackmail, and helped detain Carmine Falcone. In the aftermath of the seawall bombing, he spearheads GCPD triage operations.",
      },
      {
        heading: "Facing Winter Unrest",
        body: "Jeffrey Wright confirmed returning in Part II. On set outside London's St Paul's Cathedral, Gordon stands between raging demonstrators and City Hall figures amid escalating public fury.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Investigates low-level precinct graft and notices shadows on the streets." },
      { work: "The Batman (2022)", note: "Partners with Batman on the Riddler murders and arrests Carmine Falcone." },
      { work: "The Batman: Part II", note: "Jeffrey Wright returns; spotted escorting Bruce Wayne through protest crowds." },
    ],
  },
  martinez: {
    name: "Officer Martinez",
    sub: "GCPD Patrol Officer",
    actor: "Gil Perez-Abraham",
    sections: [
      {
        heading: "Precinct Loyalty & Vigilante Skepticism",
        body: "Initially hostile toward Batman's presence in GCPD headquarters, Martinez embodies the grounded street-level rank-and-file officers caught in Gotham's moral crossfire.",
      },
      {
        heading: "Crucial Clue & Stadium Defense",
        body: "Martinez helped Batman identify the carpet tucker used in Mayor Mitchell's murder and fought alongside Gordon during the arena flood, becoming a trusted precinct ally.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Identifies murder weapon; assists Gordon during the flood evacuation." },
      { work: "The Batman: Part II", note: "Gil Perez-Abraham confirmed returning to Gordon's precinct ranks." },
    ],
  },
  mitchell: {
    name: "Don Mitchell Jr.",
    sub: "Former Mayor of Gotham",
    actor: "Rupert Penry-Jones",
    sections: [
      {
        heading: "The First Victim",
        body: "Three-term mayor of Gotham whose public law-and-order rhetoric concealed deep ties to Carmine Falcone's illicit underworld syndicate.",
      },
      {
        heading: "Grisly Halloween Execution",
        body: "Bludgeoned to death by the Riddler in his private study on Halloween night, kicking off the serial killings that exposed citywide municipal kickbacks.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Murdered on Halloween; his funeral becomes the site of the car-bomb attack." },
    ],
  },
  colson: {
    name: "Gil Colson",
    sub: "Former District Attorney",
    actor: "Peter Sarsgaard",
    sections: [
      {
        heading: "The Complicit Prosecutor",
        body: "Gotham's top law enforcement official who suppressed indictments and looked the other way while Falcone laundered drug money through the Renewal Trust.",
      },
      {
        heading: "Execution at the Funeral",
        body: "Kidnapped and fitted with a collar bomb, Colson crashed Mayor Mitchell's memorial service. Refusing to name Falcone's police informant on camera to protect his family, he was killed when the explosive collar detonated.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Abducted by the Riddler and detonated at the City Hall funeral service." },
    ],
  },
  carmine: {
    name: "Carmine Falcone",
    sub: "Former Crime Patriarch ('The Roman')",
    actor: "John Turturro / Mark Strong",
    sections: [
      {
        heading: "The Puppet Master of Gotham",
        body: "Reigning supreme over Gotham for three decades, Falcone wielded the multi-billion Renewal fund to control judges, commissioners, and politicians, ruling from his luxury penthouse.",
      },
      {
        heading: "Assassination by the Riddler",
        body: "Exposed by Batman and Gordon as the confidential informant who betrayed Sal Maroni, Falcone was gunned down by Edward Nashton through a sniper rifle outside the Iceberg Lounge.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Brokers backdoor pacts with Thomas Wayne." },
      { work: "Riddler: Year One", note: "Employs forensic accountants to manipulate Renewal slush funds." },
      { work: "The Batman (2022)", note: "Unmasked as Gotham's real ruler; shot dead outside 44 Below." },
      { work: "The Penguin (2024)", note: "Appears in flashback sequences portrayed by Mark Strong." },
    ],
  },
  selina: {
    name: "Selina Kyle",
    sub: "Catwoman",
    actor: "Zoë Kravitz",
    sections: [
      {
        heading: "Feline Burglar with a Personal Vendetta",
        body: "A cat burglar operating inside 44 Below, Selina infiltrates mob circles to rescue her roommate Annika and uncover the truth of her estranged biological father, Carmine Falcone.",
      },
      {
        heading: "Alliance with the Bat",
        body: "Forming a passionate yet wary partnership with Batman, Selina saved his life during the arena shootouts and avenged Annika before departing Gotham on her motorcycle.",
      },
    ],
    appearances: [
      { work: "Prequel Novel", note: "Navigates 44 Below night shifts and underground cat burglary." },
      { work: "The Batman (2022)", note: "Partners with Batman, confronts Falcone, and departs the submerged city." },
    ],
  },
  annika: {
    name: "Annika Kosolov",
    sub: "Selina's Close Confidante",
    actor: "Hana Hrzic",
    sections: [
      {
        heading: "The Doomed Witness",
        body: "Waitress at 44 Below and Selina Kyle's roommate who witnessed Mayor Mitchell discussing Falcone's illicit secrets.",
      },
      {
        heading: "Murder & Trunk Discovery",
        body: "Abducted and strangled by Carmine Falcone, her body was discarded inside a car trunk at the docks, setting Selina on an unyielding path of vengeance.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Disappearance investigated by Batman and Selina; discovered deceased in trunk." },
    ],
  },
  sofia: {
    name: "Sofia Falcone",
    sub: "Falcone Heiress ('The Hangman')",
    actor: "Cristin Milioti",
    sections: [
      {
        heading: "The Scapegoat of Arkham",
        body: "Falsely framed by her father Carmine for the murders of young women, Sofia was locked in Arkham State Hospital for a decade, subjected to horrific electroshock torture.",
      },
      {
        heading: "The Rise of the Gigante Syndicate",
        body: "Released after Carmine's death, Sofia wiped out her treacherous male relatives with gas, rebranded the family under her mother's name Gigante, and engaged Oz Cobb in a bloody war for Crown Point.",
      },
      {
        heading: "Return to the Asylum",
        body: "Betrayed by Oz, Sofia is remanded back to Arkham State Hospital, where she receives an intriguing letter from her half-sister, Selina Kyle.",
      },
    ],
    appearances: [
      { work: "The Penguin (2024)", note: "Primary protagonist-antagonist battling Oz Cobb across eight episodes." },
    ],
  },
  oz: {
    name: "Oz Cobb",
    sub: "The Penguin / Crime Boss",
    actor: "Colin Farrell",
    sections: [
      {
        heading: "Ambitious Capo",
        body: "Under Carmine Falcone, Oz ran the Iceberg Lounge and the 44 Below VIP club while harboring grand designs to seize total control of Gotham's underworld.",
      },
      {
        heading: "The Bloody Ascent",
        body: "Following the seawall disaster, Oz outmaneuvered the Maronis and defeated Sofia Falcone, ruthlessly eliminating anyone who showed weakness.",
      },
      {
        heading: "Gotham's New Kingpin",
        body: "Now operating from a luxury Midtown penthouse with City Hall connections, Oz looks out over the Gotham skyline as the Bat-Signal lights the winter clouds.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Interrogated about 'el rata alada' and chased along the freeway." },
      { work: "The Penguin (2024)", note: "Stars in eight-episode saga ascending to the pinnacle of Gotham crime." },
      { work: "The Batman: Part II", note: "Colin Farrell confirmed returning; story picks up weeks after his triumph." },
    ],
  },
  victor: {
    name: "Victor Aguilar",
    sub: "Former Henchman & Confidant",
    actor: "Rhenzy Feliz",
    sections: [
      {
        heading: "From Flood Survivor to Mob Enforcer",
        body: "Orphaned when the seawall exploded in Crown Point, teenage Victor was caught trying to steal the rims off Oz's plum-colored Maserati and recruited as Oz's loyal driver.",
      },
      {
        heading: "Tragic Devotion",
        body: "Victor proved his loyalty in the drug labs and gunfights of the gang war, becoming like a son to Oz. However, fearing that love would leave him vulnerable, Oz brutally strangled Victor in the series finale.",
      },
    ],
    appearances: [
      { work: "The Penguin (2024)", note: "Oz Cobb's close companion and protégé across the eight-episode run." },
    ],
  },
  edward: {
    name: "Edward Nashton",
    sub: "The Riddler",
    actor: "Paul Dano",
    sections: [
      {
        heading: "The Vengeful Forensic Accountant",
        body: "Raised in squalor at the forgotten Gotham Orphanage while the Wayne billions were stolen by Falcone, Nashton weaponized forensic accounting to map the city's corruption.",
      },
      {
        heading: "The Terror Campaign",
        body: "Assassinated Mayor Mitchell, DA Colson, and Commissioner Savage before detonating seven bomb-laden vans along the seawall, submerging the city.",
      },
      {
        heading: "Cellmate in Arkham",
        body: "Incarcerated at Arkham State Hospital, he broke down upon realizing Batman did not share his vision, before finding companionship with the mysterious inmate in the adjoining cell.",
      },
    ],
    appearances: [
      { work: "Riddler: Year One", note: "Comic miniseries written by Paul Dano chronicling his descent into madness." },
      { work: "The Batman (2022)", note: "Primary antagonist orchestrating the puzzle murders and harbor bombings." },
    ],
  },
  joker: {
    name: "The Joker",
    sub: "Mysterious Arkham Inmate",
    actor: "Barry Keoghan",
    sections: [
      {
        heading: "The Inmate Next Door",
        body: "An unidentified psychopath suffering from a congenital facial deformity that locks his visage in a permanent grotesque grin, locked deep inside Arkham's high-security wing.",
      },
      {
        heading: "Deleted Interrogation & Riddler Alliance",
        body: "In a released deleted scene, Batman consulted him in Year One to profile the Riddler. In the theatrical cut, he befriends a weeping Nashton, declaring that Gotham loves a comeback story.",
      },
    ],
    appearances: [
      { work: "The Batman (2022)", note: "Appears in cellblock 44 whispering to Edward Nashton; extended Arkham scene released online." },
      { work: "The Batman: Part II", note: "Barry Keoghan rumored to reprise his role; official status unconfirmed." },
    ],
  },
};

export const RELATION_LABELS_EN: Record<string, string> = {
  "父子": "Father & Son",
  "母子": "Mother & Son",
  "夫妻": "Husband & Wife",
  "委托杀人": "Commissioned Mob Hit",
  "隐瞒精神病史": "Covered Up Psychiatric History",
  "收留与监护": "Guardian & Confidant",
  "战术与后勤": "Tactical & Logistics",
  "政治同盟": "Political Reform Allies",
  "暗号传唤": "Summoned via Bat-Signal",
  "互信盟友": "Trusted Precinct Allies",
  "嫌隙与怀疑": "Initial Friction & Suspicion",
  "刺杀目标": "First Assassination Target",
  "恐吓黑金": "Blackmailed Slush Funds",
  "洗钱与勒索": "Money Laundering & Control",
  "秘密父女": "Secret Estranged Father",
  "暗室眼线": "Club Infiltrator & Informant",
  "挚友密谋": "Roommates & Confidantes",
  "下令灭口": "Ordered Strangled & Trunked",
  "兄妹对立": "Rival Siblings",
  "冷酷清算": "Ruthless Purge of the Family",
  "黑道洗牌": "Underworld Turf War",
  "生死博弈": "Betrayal & Asylum Return",
  "收留与利用": "Mentored & Exploited",
  "冷血灭口": "Ruthless Sacrificial Murder",
  "知音挑衅": "Ciphered Provocation",
  "破案与抓捕": "Hunted Down & Apprehended",
  "牢房共鸣": "Asylum Cellblock Kinship",
};

export function getLocalizedPerson<
  T extends {
    id: string;
    name: string;
    sub: string;
    actor?: string;
    sections: { heading: string; body: string }[];
    appearances: { work: string; note: string; [key: string]: any }[];
  },
>(person: T, locale: Locale): T {
  if (locale === "zh") return person;
  const en = PEOPLE_EN[person.id];
  if (!en) return person;
  return {
    ...person,
    name: en.name,
    sub: en.sub,
    actor: en.actor ?? person.actor,
    sections: en.sections,
    appearances: person.appearances.map((a, i) => {
      const enApp = en.appearances[i];
      if (!enApp) return a;
      return {
        ...a,
        work: enApp.work,
        note: enApp.note,
      };
    }),
  };
}
