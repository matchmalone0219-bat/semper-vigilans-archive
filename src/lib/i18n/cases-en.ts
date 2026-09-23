export const CASES_INTRO_EN =
  "A forensic review of the five landmark homicides and terror strikes from the inaugural case, cataloging crime scene evidence, murder weapons, cryptographic recordings, and the seawall breach. Includes the complete screenplay text of Bruce Wayne's Year Two 'Gotham Project' nocturnal journal and an in-depth breakdown of the 5-minute deleted Arkham interrogation.";

export interface CaseFileEn {
  title: string;
  victim: string;
  victimRole: string;
  date: string;
  location: string;
  summary: string;
  method: string;
  revelation: string;
  evidences: Record<string, { name: string; type: string; desc: string }>;
}

export const CASE_FILES_EN: Record<string, CaseFileEn> = {
  "case-01-mitchell": {
    title: "Homicide of Mayor Don Mitchell Jr.",
    victim: "Don Mitchell Jr.",
    victimRole: "Mayor of Gotham City (Three-Term Incumbent)",
    date: "October 31st · Halloween",
    location: "Mayor's Private Residence, 2nd Floor Study",
    summary:
      "On Halloween night, while watching election coverage in his study, Mayor Mitchell was ambushed by the Riddler lurking within the residence. The assailant fractured the victim's cranium with a blunt instrument, suffocated him by binding his face in industrial duct tape, and scrawled 'NO MORE LIES' in blood across the tape.",
    method: "Residential ambush · Blunt cranial trauma · Duct tape asphyxiation · Blood message scrawled on scene",
    revelation:
      "Directly exposed the collusion network between top municipal officials and Carmine Falcone's crime syndicate, pointing investigators toward the Iceberg Lounge laundering hub.",
    evidences: {
      "ev-01-card": {
        name: "First Riddle Card for the Batman",
        type: "Encrypted Document",
        desc: "Custom green envelope left at the scene inscribed 'To the Batman'. Inside card reads: 'What does a liar do when he's dead? He lies still.' Accompanied by the first sequence of geometric cipher symbols.",
      },
      "ev-01-knife": {
        name: "Industrial Duct Tape & Heavy Carpet Cutter",
        type: "Murder Tool",
        desc: "Heavy-duty industrial duct tape used to asphyxiate the mayor and scrawl blood text, alongside a carpet blade used for wire cutting. Recovered with zero latent prints.",
      },
      "ev-01-thumb": {
        name: "Severed Thumb with Encrypted USB Drive",
        type: "Digital Forensic Evidence",
        desc: "Found inside the mayor's vehicle in his garage. The assailant severed Mitchell's right thumb attached to a USB flash drive (a pun on 'Thumb Drive'). Decryption revealed covert photos of Mitchell exiting the Iceberg Lounge with Annika.",
      },
    },
  },
  "case-02-savage": {
    title: "Execution of Commissioner Pete Savage",
    victim: "Pete Savage",
    victimRole: "Gotham City Police Commissioner",
    date: "November 1st · Day After Halloween",
    location: "Abandoned Water Treatment Facility",
    summary:
      "Commissioner Savage was tased and abducted after leaving GCPD headquarters. The killer strapped him to an execution rig with a wired maze cage containing hungry rats fitted over his head, leaving an accusatory placard hanging over his chest as the rats gnawed through.",
    method: "Taser abduction · Mechanical rat trap rig · Asphyxiation and gnawing trauma · Broadcast video confession",
    revelation:
      "Confirmed that the highest tier of GCPD leadership had been co-opted by Carmine Falcone, with senior officers receiving illegal kickbacks for decades.",
    evidences: {
      "ev-02-cage": {
        name: "Custom Rat Maze Headgear Mechanism",
        type: "Lethal Trap Instrument",
        desc: "Hand-welded wire mesh head cage engineered with one-way baffles and bait funnels, mocking GCPD leadership as 'rats' (undercover informants for the mob).",
      },
      "ev-02-tape": {
        name: "Bribery Video Tape & Second Cipher",
        type: "Audiovisual Evidence",
        desc: "Tape recovered at the scene recording Commissioner Savage receiving illicit narcotics kickbacks from the Falcone family; cipher letter directed investigators toward the history of the Gotham Orphanage.",
      },
    },
  },
  "case-03-colson": {
    title: "Bombing of District Attorney Gil Colson",
    victim: "Gil Colson",
    victimRole: "Gotham City District Attorney",
    date: "November 2nd · Mayor's Memorial Service",
    location: "Gotham City Hall Cathedral Memorial Hall",
    summary:
      "Colson was fitted with a timed C4 explosive collar, his mouth taped shut, and forced to crash an SUV directly into Mayor Mitchell's memorial service. A phone rigged to his chest connected to the Riddler, who demanded answers to three riddles exposing judicial corruption. Colson refused the final question out of fear of Falcone retaliating against his family, and the collar detonated.",
    method: "C4 collar mechanism · Vehicular breach into congregation · Livestreamed trial · Timed detonation",
    revelation:
      "Colson confessed before dying that as DA, he repeatedly suppressed criminal investigations and money laundering indictments targeting the Gotham Renewal Fund.",
    evidences: {
      "ev-03-collar": {
        name: "C4 Explosive Collar Mechanism",
        type: "Explosive Device",
        desc: "Heavy industrial collar embedded with military-grade plastic explosives and an LCD countdown, rigged with anti-tamper mercury tilt switches.",
      },
      "ev-03-phone": {
        name: "Livestream Mobile & Interrogation Audio",
        type: "Communications Evidence",
        desc: "Handset taped to Colson's chest. Riddles inquired into: 1) the definition of bribery; 2) the Drops narcotic ring; 3) the true identity of the informant who sold out Salvatore Maroni.",
      },
    },
  },
  "case-04-annika": {
    title: "Abduction & Murder of Annika Kosolov",
    victim: "Annika Kosolov",
    victimRole: "Iceberg Lounge Hostess · Roommate to Selina Kyle",
    date: "November 4th",
    location: "Trunk of Abandoned Vehicle, Pier 39",
    summary:
      "Annika was abducted from her apartment and discovered strangled inside the trunk of a car. Investigations confirmed Annika inadvertently overheard while accompanying Mayor Mitchell that Carmine Falcone himself was the confidential police informant ('the rat'), prompting Falcone to personally silence her.",
    method: "Forcible abduction · Manual strangulation · Trunk concealment and disposal",
    revelation:
      "Completely shattered Falcone's facade as a 'legitimate businessman', provoking Selina Kyle's armed vendetta and causing Falcone to step out into street crosshairs.",
    evidences: {
      "ev-04-passport": {
        name: "Forged Detroit Passport & Escape Notes",
        type: "Personal Effects",
        desc: "Recovered from a hidden compartment in Selina's apartment. Travel itinerary and forged ID prepared by Annika in terror of mob retaliation.",
      },
      "ev-04-voicemail": {
        name: "44 Below Secret Voicemail",
        type: "Audio Recording",
        desc: "Voicemail left for Selina with ambient audio clearly recording the mayor divulging that Falcone is the real ruler and informant of Gotham.",
      },
      "ev-04-prints": {
        name: "Latent Neck Fingerprints of Carmine Falcone",
        type: "Forensic Evidence",
        desc: "Latent prints lifted from the victim's neck matching Carmine Falcone, confirming he personally choked her to death.",
      },
    },
  },
  "case-05-flood": {
    title: "Gotham Seawall Bombing & Arena Siege",
    victim: "The Citizens of Gotham · Mayor-Elect Bella Reál (Wounded Survivor)",
    victimRole: "Public Safety & Municipal Infrastructure",
    date: "November 5th · Election Night",
    location: "Gotham Perimeter Seawalls / Gotham Square Garden Arena",
    summary:
      "Though imprisoned in Arkham, the Riddler coordinated armed cultists via rataalada.com to detonate explosive-laden vans at seven key structural points along the seawall, inundating the city. Snipers perched on the catwalks of Gotham Square Garden fired upon evacuating refugees and Mayor-Elect Bella Reál.",
    method: "Seven synchronized vehicular detonations · Seawall destruction · Citywide inundation · Catwalk sniper ambush",
    revelation:
      "Plunged Gotham into an unprecedented humanitarian catastrophe, collapsing the old power regime. In the deluge, Batman completed his metamorphosis from 'vengeance incarnate' into a protector of hope.",
    evidences: {
      "ev-05-blueprint": {
        name: "Seawall Structural Demolition Blueprint",
        type: "Engineering Document",
        desc: "Municipal seawall construction blueprint discovered beneath the carpet in the Riddler's apartment, marking seven stress nodes and explosive yields.",
      },
      "ev-05-rifle": {
        name: "Cultist Sniper Rifles & Military Gas Masks",
        type: "Paramilitary Ordnance",
        desc: "Standardized gear seized from catwalk snipers, including military gas masks, hunting scopes, and high-caliber rifles.",
      },
      "ev-05-flare": {
        name: "Severed High-Voltage Cable & Emergency Flare Remnants",
        type: "Rescue Forensic Evidence",
        desc: "Remnants of the downed high-voltage cable severed by Batman's chest blade to prevent electrocution, along with spent red highway flares used to guide citizens out of floodwaters.",
      },
    },
  },
};

export interface BruceJournalEn {
  title: string;
  day: string;
  context: string;
}

export const BRUCE_JOURNALS_EN: Record<string, BruceJournalEn> = {
  "journal-oct-31": {
    title: "Halloween Patrol · Shadows of Fear",
    day: "Thursday, October 31st",
    context:
      "The opening monologue. Bruce sits at his dimly lit desk writing by hand as street violence and crime erupt across rain-slicked Gotham, capturing his mindset as a cold instrument of retribution.",
  },
  "journal-nov-01": {
    title: "Mayor's Homicide · The Labyrinth of Lies",
    day: "Friday, November 1st",
    context:
      "Recorded following the inspection of Mayor Mitchell's study. Bruce realizes his adversary is not a common thug, but a meticulous auditor holding the city elite's darkest secrets.",
  },
  "journal-nov-03": {
    title: "Attack on Wayne Tower · Family Debts",
    day: "Sunday, November 3rd",
    context:
      "Written at Alfred's bedside after the letter-bomb detonated, where Bruce learns the troubling past of Thomas Wayne and Carmine Falcone, facing a moral crisis regarding his legacy.",
  },
  "journal-nov-06": {
    title: "Spark of Hope · Moving Beyond Vengeance",
    day: "Wednesday, November 6th (Post-Flood)",
    context:
      "The film's closing monologue. After rescuing trapped citizens from the flooded arena, Bruce abandons punitive vengeance to emerge as an enduring beacon of hope for Gotham.",
  },
};

export const ARKHAM_SCENE_EN = {
  title: "Arkham Hospital 5-Minute Deleted Interrogation Breakdown",
  titleEn: "The Deleted Arkham Interrogation Scene Breakdown",
  actors: "Robert Pattinson (Batman) × Barry Keoghan (Unseen Inmate / The Joker)",
  setting: "Arkham State Hospital High-Security Psychiatric Cell",
  overview:
    "Weeks after the theatrical premiere, Warner Bros. officially unlocked a 5-minute unreleased scene on the viral website rataalada.com. Taking place midway through the second act when the Riddler investigation stalled, Bruce visits Arkham State Hospital with forensic case files to solicit a psychological profile from an incarcerated inmate (Barry Keoghan).",
  points: [
    {
      heading: "I. Psychological Warfare & Character Mirroring",
      body: "The inmate offers no easy clues; instead, he dissects Batman's subconscious, suggesting that Bruce's anxiety stems from secretly agreeing with the Riddler's moral crusade against hypocritical leaders. This psychological probing cuts directly to Bruce's fear that vigilantism breeds escalation.",
    },
    {
      heading: "II. Hyper-Realistic Pathological Prosthetics",
      body: "Director Matt Reeves revealed that this universe's Joker did not fall into a chemical vat; rather, he suffers from a congenital skin and facial muscular condition. The prosthetic team crafted patchy scalp hair loss, extensive skin ulcerations, and a perpetual deformed grin from permanent nerve trauma.",
    },
    {
      heading: "III. Reeves' Editorial Decision",
      body: "Reeves explained that while Pattinson and Keoghan's chemistry was electric, placing the scene in Act Two disrupted the detective momentum focused on the Riddler and risked prematurely shifting audience attention away from the seawall conspiracy.",
    },
  ],
};
