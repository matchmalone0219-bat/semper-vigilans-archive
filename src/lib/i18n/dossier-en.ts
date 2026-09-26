import type { Locale } from "./types";
import { FILM, type Certainty, type LogEntry, type LogKind, type PlotItem } from "@/data/film";

export const FACTS_EN: Record<
  string,
  { label: string; value: string; source?: string }
> = {
  "片名": {
    label: "Title",
    value: "The Batman: Part II",
  },
  "导演 / 编剧": {
    label: "Director / Screenplay",
    value: "Directed by Matt Reeves; written by Matt Reeves & Mattson Tomlin",
  },
  "摄影": {
    label: "Cinematography",
    value: "Erik Messerschmidt, ASC (Mank, Mindhunter)",
  },
  "配乐": {
    label: "Score",
    value:
      "Michael Giacchino. On July 28, 2026, the composer stated Reeves wouldn't do it without him, and Reeves replied '100%' confirming his return",
    source: "Matt Reeves @mattreevesLA",
  },
  "制片": {
    label: "Production",
    value: "DC Studios · 6th & Idaho · Dylan Clark Productions",
  },
  "发行": {
    label: "Distribution",
    value:
      `Worldwide theatrical release by Warner Bros. Pictures · North American release on ${FILM.releaseLabelEn} in IMAX & Dolby Cinema`,
    source: "Variety · 2026.07.16",
  },
  "片场制作代号": {
    label: "Working Title",
    value:
      "Semper Vigilans (Latin for 'Always Watchful'). This Latin motto has appeared on UK road signage",
    source: "STV News · Set Signage Report",
  },
  "主摄影": {
    label: "Principal Photography",
    value:
      "Director Matt Reeves shared the first slate photo on June 12, 2026, marking the official start of UK filming",
    source: "Director Social Dispatch · SuperHeroHype",
  },
  "公开外景": {
    label: "Filming Locations",
    value:
      "Liverpool, Glasgow, and London, UK. Glasgow city center hosted snow-covered road closures starting August 18; on September 13, the crew filmed courthouse protest scenes outside St Paul's Cathedral in London.",
    source: "STV News / The Herald · Road Restriction Notices",
  },
  "宇宙归属": {
    label: "Universe Canon",
    value:
      "Direct sequel to The Batman (2022), part of Matt Reeves' standalone 'The Batman Epic Crime Saga', distinct and separate from James Gunn's DCU.",
    source: "DC Studios Official Statement",
  },
  "前作全球票房": {
    label: "First Film Global Box Office",
    value:
      "$770,836,163 worldwide ($369,345,583 domestic, 47.9%; $401,490,580 international, 52.1%) against a $185M–$200M production budget. Debuted on HBO Max 45 days post-release, drawing 4.1 million smart TV households in its opening week.",
    source: "Box Office Mojo / Warner Bros.",
  },
  "电影工业与学院奖项": {
    label: "Industry Honors & Academy Awards",
    value:
      "Nominated for 3 Academy Awards at the 95th Oscars (Best Makeup & Hairstyling, Best Visual Effects, Best Sound); 4 BAFTA nominations (Cinematography, Production Design, Makeup & Hair, Special Visual Effects); Saturn Award winner for Best Costume Design; ASC Award nominee for Feature Film Cinematography.",
    source: "Academy of Motion Picture Arts and Sciences / BAFTA",
  },
  "实体蓝光与重磅特辑": {
    label: "Home Video & Bonus Featurettes",
    value:
      "Released on 4K Ultra HD, Blu-ray, and Digital. Key bonus materials include the 53-minute comprehensive documentary 'Vengeance In The Making', feature-length commentary by director Matt Reeves, two deleted scenes (Scene 52 Arkham Joker interrogation and Scene 56 Selina lounge standoff), Colin Farrell's 4-hour prosthetic makeup doc 'A Transformation: The Penguin', and stunt breakdown 'Anatomy of the Car Chase'.",
    source: "Warner Bros. Home Entertainment",
  },
};

export const PLOT_EN: Record<
  string,
  {
    text: string;
    source?: string;
    debunkedNote?: string;
    debunkedSource?: string;
  }
> = {
  "confirmed-after-penguin": {
    text: "The sequel directly follows The Batman and The Penguin. Colin Farrell revealed the story picks up a few weeks after Oz Cobb secures his grip over the Gotham underworld in the dead of winter.",
    source: "GamesRadar (quoting Colin Farrell)",
  },
  "confirmed-bruce-center": {
    text: "Director Matt Reeves confirmed that Robert Pattinson's Bruce Wayne will remain the emotional core of the sequel, diving deeper beneath the mask into the character's psyche.",
    source: "Variety (Director Interview)",
  },
  "set-glasgow-snow-chase": {
    text: "In August 2026, Glasgow street locations were blanketed with artificial snow and holiday garlands as the Batmobile engaged in high-speed drifts surrounded by GCPD patrol cars and SWAT armored tactical vans.",
    source: "The Independent / PA · Set Report",
  },
  "set-alfred-cpr": {
    text: "August 28 Glasgow bridge shoot: Alfred is seen kneeling in the snow performing emergency CPR on a fallen Bruce, while a blonde woman holding a young boy watches nearby. A reverse angle shows Bruce with his hands restrained.",
    source: "Set Leak · hoeBread36",
  },
  "set-batmobile-avoids-truck": {
    text: "August 29 night shoot: The Batmobile maneuvers to avoid an oncoming box truck on snow-slicked streets alongside GCPD patrol cars. Drone coverage captured extensive street closures and holiday lights beneath the Kingston Bridge.",
    source: "Set Leak · hoeBread36 / aylissab",
  },
  "set-suit-details": {
    text: "August 30 suit details: High-resolution set photos revealed stunt double Rick English in the updated Batsuit without the cowl, showing modular neck protection, layered ballistic chest plates, and heavy combat weathering.",
    source: "Set Leak · ross_sneddon",
  },
  "set-wrecked-batmobile": {
    text: "August 31 under Kingston Bridge: A heavily damaged stunt Batmobile with a crushed roof and shattered windshield was stationed alongside stunt cars fitted with rollover cages and drift skids.",
    source: "Set Leak · Fraser Wilson / mattatthecinema",
  },
  "set-gcpd-motorcycle": {
    text: "September 4 Glasgow night shoot: Stunt double Rick English in the updated cowl piloted a GCPD-marked tactical motorcycle through snowy streets, jumping over a patrol car and confronting armed officers. The suit bore stage blood and a distinct mustard-yellow tactical utility belt.",
    source: "Set Leak · ciaron97 / Jasraj Sidhu",
  },
  "set-london-protests": {
    text: "September 13 St Paul's Cathedral exterior: Robert Pattinson as Bruce Wayne was escorted by GCPD through an angry mob of protesters to a waiting Bentley. Jeffrey Wright (Gordon) and director Matt Reeves were on set. Protester placards referenced 'Court of Fowls' and 'Anarky'.",
    source: "IGN · London Set Photos Report",
  },
  "set-glasgow-prisoner-van": {
    text: "September 16 Glasgow dispatch: On snowy street sets near Bothwell Street, two GCPD officers escorted an unidentified individual into the back of a police SWAT transport van before driving away.",
    source: "Set Leak · cp_allan / The Batman Saga News",
  },
  "set-london-gcpd-motorcycle": {
    text: "September 20 London night shoot: The GCPD patrol motorcycle (GC-201) seen in Glasgow reappeared on a secure London street alongside a heavy pursuit camera vehicle equipped with multi-axis gyro rigs.",
    source: "Set Leak · UnBoxPHD / The Batman Saga News",
  },
  "rumor-semper-vigilans-court": {
    text: "The sequel's production working title 'Semper Vigilans' (Always Watchful) has led fans to speculate on Gotham's ancient shadow aristocracy, fueling theories about the Court of Owls.",
  },
  "rumor-court-of-fowls": {
    text: "Placards reading 'Court of Fowls / Court of Fouls' during the St Paul's Cathedral courthouse protest scenes prompted speculation regarding the Court of Owls; demonstrators in white masks also spurred rumors of radical anarchist Anarky.",
  },
  "rumor-new-cast-identities": {
    text: "Following the casting announcements of Scarlett Johansson and Sebastian Stan, speculation surged around classic roles such as Harvey Dent (Two-Face), Mr. Freeze, Clayface, or Court members. All new character roles remain strictly classified.",
  },
  "rumor-bruce-on-trial": {
    text: "Set leaks of Bruce Wayne restrained in Glasgow followed by London courthouse protest scenes where Bruce is escorted away under guard suggest Bruce Wayne or Wayne Enterprises may face public criminal prosecution or corruption hearings, potentially prosecuted by Harvey Dent.",
  },
  "rumor-mr-freeze": {
    text: "Between Matt Reeves' viral '#SnowTires' tease, extensive Glasgow snowfall dressing, and the flood aftermath from the first film, fan communities have theorized a grounded, realistic incarnation of Victor Fries (Mr. Freeze) exploiting frozen urban ruins.",
  },
  "debunked-cancelled": {
    text: "Due to extended script revisions and release delays, online rumors claimed The Batman: Part II had been quietly canceled by Warner Bros. or DC Studios.",
    source: "Newsweek · Cancellation Rumor Report",
    debunkedNote:
      "DC Studios co-head James Gunn firmly shut down the rumors in Rolling Stone ('The Batman: Part II is definitely not canceled'). Director Matt Reeves subsequently completed the script, and filming commenced in the UK in June 2026.",
    debunkedSource: "Rolling Stone · James Gunn Interview",
  },
  "debunked-clayface-script": {
    text: "Rumors alleged that Matt Reeves planned to feature Clayface as a grounded villain, but James Gunn ordered script revisions due to DCU's Creature Commandos utilizing the character.",
    source: "Social Media Wire · Culture Crave",
    debunkedNote:
      "James Gunn addressed the claims on Threads: 'Where do these rumors even come from? The script has always been the original one.' He clarified he never intervened or asked Reeves to alter Clayface.",
    debunkedSource: "James Gunn · Threads",
  },
  "debunked-back-to-back": {
    text: "Online speculation suggested the production team was filming The Batman: Part II and an unannounced Part III back-to-back to conserve budget and production schedules.",
    source: "MovieWeb · Rumor Report",
    debunkedNote:
      "In August 2026, when asked directly whether Part II and Part III were secretly shooting concurrently, James Gunn responded on Threads: 'I can deny.'",
    debunkedSource: "James Gunn · Threads",
  },
  "debunked-robin-2025": {
    text: "In August 2025, industry scoopers claimed Matt Reeves' newly delivered script featured Dick Grayson (Robin / The Boy Wonder) as Batman's active sidekick.",
    source: "IGN · Industry Rumor Report",
    debunkedNote:
      "James Gunn dismissed the rumor on Threads as 'nonsense,' noting that only six people had read the completed script at the time.",
    debunkedSource: "IGN · Quoting James Gunn",
  },
  "debunked-hush-main-villain": {
    text: "Widespread online reports claimed Thomas Elliot / Hush had been locked in as the primary villain, citing the flashing 'HUSH!' easter egg in the Riddler's 2022 exposé video.",
    source: "ComicBook · Rumor Report",
    debunkedNote:
      "James Gunn repeatedly stated that rumors of Hush as the sequel's villain were 'totally made up.' Matt Reeves has stressed that the villain choices remain intimately tied to Bruce's internal struggle.",
    debunkedSource: "ComicBook · Quoting James Gunn",
  },
  "debunked-merge-into-dcu": {
    text: "Early in DC Studios' formation, press reports suggested executives were pressuring Matt Reeves to fold his universe into the DCU, making Robert Pattinson the official DCU Batman.",
    source: "Variety · Industry Report",
    debunkedNote:
      "Both James Gunn and Matt Reeves emphatically denied the merger. The Batman Saga remains an independent Elseworlds franchise, while the DCU is developing its own Batman project, The Brave and the Bold.",
    debunkedSource: "DC Studios Official Roadmap",
  },
};

export const CAST_EN: Record<string, { note: string }> = {
  "Robert Pattinson": {
    note: "Confirmed returning. Director Matt Reeves noted the sequel will explore Bruce's inner life more deeply; set leaks confirm the Batmobile engaging GCPD in winter chases.",
  },
  "Jeffrey Wright": {
    note: "Confirmed returning. Wright was spotted as Jim Gordon outside St Paul's Cathedral on September 13; prior Glasgow night shoots revealed police pursuit units on alert.",
  },
  "Andy Serkis": {
    note: "Confirmed returning as Bruce's trusted butler and mentor. Stunt photos show Alfred performing emergency CPR on Bruce in the Glasgow snow; a body double stood in during London protest shoots while Serkis prepped Lord of the Rings: The Hunt for Gollum.",
  },
  "Colin Farrell": {
    note: "Confirmed returning. Following Oz Cobb's ruthless ascension in The Penguin, his underworld syndicate serves as a major tactical force in Gotham.",
  },
  "Jayme Lawson": {
    note: "Confirmed returning as Mayor Bella Reál, tasked with post-flood recovery and navigating escalating friction between City Hall and GCPD leadership.",
  },
  "Gil Perez-Abraham": {
    note: "Confirmed returning as Officer Martinez, Gordon's grounded and observant ally within the departmental ranks.",
  },
  "Sebastian Stan": {
    note: "Joined the cast in an undisclosed role. In a September 2026 Variety interview, Stan compared the atmosphere on set to The Godfather Part II and said filming would continue across the winter.",
  },
  "Scarlett Johansson": {
    note: "Joined the cast in an undisclosed role. Glasgow set photos also show a blonde woman riding in the Batmobile and watching the Kingston Bridge CPR scene.",
  },
  "Charles Dance": {
    note: "Joined the cast in an undisclosed role.",
  },
  "Sebastian Koch": {
    note: "Officially confirmed in an undisclosed lead role. Character details remain strictly classified under NDA.",
  },
  "Brian Tyree Henry": {
    note: "Officially confirmed in an undisclosed lead role. Character details remain strictly classified under NDA.",
  },
  "Barry Keoghan": {
    note: "The mysterious Arkham inmate / Joker from the 2022 film remains a possible returning figure after his final-scene exchange with the Riddler.",
  },
};

export const LOG_EN: Record<
  string,
  {
    title: string;
    body: string;
    locationLabel?: string;
    source?: string;
    /** Optional short English label for a log's video thumbnail. */
    videoTitle?: string;
  }
> = {
  "log-2013-08-22": {
    title: "Ben Affleck Cast as Batman in the DCEU",
    body: "Warner Bros. officially announced Ben Affleck had signed to play Batman across multiple DC films, debuting in Batman v Superman and Justice League while laying groundwork for a standalone feature.",
    source: "Variety",
  },
  "log-2015-07-09": {
    title: "Affleck & Geoff Johns Begin Writing Solo Batman Script",
    body: "Trades revealed Ben Affleck partnered with DC Chief Creative Officer Geoff Johns to pen a standalone Batman screenplay set in the DCEU, with Affleck planning to direct and star.",
    source: "Deadline",
  },
  "log-2016-04-12": {
    title: "CinemaCon: WB Officially Confirms Affleck-Helmed Solo Film",
    body: "Warner Bros. CEO Kevin Tsujihara officially confirmed on stage at CinemaCon that a standalone Batman film written, directed by, and starring Ben Affleck was greenlit under the working title 'The Batman'.",
    source: "The Hollywood Reporter",
  },
  "log-2016-08-29": {
    title: "Deathstroke Test Footage Released; Joe Manganiello Cast",
    body: "Ben Affleck shared unexpected test footage of a fully armored Deathstroke. Geoff Johns and WB subsequently confirmed Joe Manganiello was cast as the principal antagonist Slade Wilson.",
    source: "The Wall Street Journal",
  },
  "log-2017-01-30": {
    title: "Ben Affleck Steps Down as Director",
    body: "Affleck announced he would no longer direct The Batman, citing personal health considerations and the immense toll of directing and starring in a tentpole of this magnitude.",
    source: "Variety",
  },
  "log-2017-02-23": {
    title: "Matt Reeves Steps in as Director & Writer",
    body: "Warner Bros. officially confirmed Matt Reeves would replace Ben Affleck to write and direct the new Batman film. Reeves initiated a complete script overhaul, crafting a gritty, standalone detective noir set in Bruce Wayne's early crime-fighting days.",
    source: "Variety / The Hollywood Reporter",
  },
  "log-2019-01-30": {
    title: "Release Slated for 2021; Ben Affleck Retires From The Cowl",
    body: "Warner Bros. dated Matt Reeves' reboot for June 2021 focusing on a younger Bruce Wayne. Ben Affleck tweeted his blessing to the new team, formally concluding his tenure as Batman.",
    source: "Deadline",
  },
  "log-2019-05-16": {
    title: "Pattinson & Nicholas Hoult Emerge as Frontrunners in Burbank Screen Tests",
    body: "Reports confirmed the search narrowed to Robert Pattinson and Nicholas Hoult, who both underwent intensive 35mm camera tests wearing vintage Batsuits inside Warner Bros. Burbank soundstages.",
    source: "Variety / The Hollywood Reporter",
  },
  "log-2019-05-31": {
    title: "Robert Pattinson Officially Cast as Batman",
    body: "Following extensive screen tests, Robert Pattinson signed to lead the franchise as Bruce Wayne / Batman. Reeves praised Pattinson's blend of intensity, vulnerability, and craft in art-house cinema.",
    source: "Deadline / Warner Bros.",
  },
  "log-2020-01-27": {
    title: "The Batman Begins Principal Photography in London & Liverpool",
    body: "Director Matt Reeves shared the slate marking Day One of filming in London. The production subsequently utilized Liverpool's St George's Hall and Glasgow Necropolis for Gothic exteriors.",
    source: "Matt Reeves Social Dispatch",
  },
  "log-2022-03-04": {
    title: "The Batman Opens in Global Theaters",
    body: "The Batman debuted worldwide to critical and commercial acclaim, grossing over $770 million globally and establishing Reeves' gritty, grounded Gotham aesthetic.",
    source: "Box Office Mojo",
  },
  "log-2022-04-26": {
    title: "CinemaCon: Warner Bros. Announces Sequel Development",
    body: "At CinemaCon in Las Vegas, Warner Bros. Motion Picture Group officially confirmed The Batman: Part II was in active development with Matt Reeves and Robert Pattinson returning.",
    source: "Variety / The Hollywood Reporter",
  },
  "log-2023-01-31": {
    title: "Initial Release Date Slated for October 3, 2025",
    body: "DC Studios leaders James Gunn and Peter Safran announced the initial slate for DC Studios, formally designating The Batman Saga as an Elseworlds standalone franchise and slating Part II for October 2025.",
    source: "DC Studios Official Announcement",
  },
  "log-2024-03-12": {
    title: "Release Shifted to 2026 Following Hollywood Strikes",
    body: "In the wake of the 2023 WGA and SAG-AFTRA strikes, Warner Bros. adjusted its theatrical slate, moving Part II to October 2026 to grant Reeves and Tomlin adequate writing time.",
    source: "Variety",
  },
  "log-2024-09-19": {
    title: "The Penguin Limited Series Premieres on HBO",
    body: "Starring Colin Farrell as Oz Cobb, the eight-episode HBO original series launched to critical acclaim, chronicling the bloody power struggle for Gotham's underworld following Carmine Falcone's demise.",
    source: "HBO / Warner Bros. Discovery",
  },
  "log-2024-12-27": {
    title: "Release Calendar Adjustment to October 1, 2027",
    body: "Warner Bros. fine-tuned its tentpole production timetable, providing ample pre-production and VFX scheduling for the expansive sequel.",
    source: "Deadline",
  },
  "log-2025-06-27": {
    title: "Director Shares Completed Script Title Page",
    body: "Matt Reeves shared a photograph of the finalized script cover page co-written with Mattson Tomlin, confirming the screenplay was complete and heading into official prep.",
    source: "Matt Reeves Social Dispatch",
  },
  "log-2025-12-03": {
    title: "Press Reports Scarlett Johansson in Talks for Key Role",
    body: "Major entertainment outlets reported that Scarlett Johansson was in active discussions to join the sequel in a prominent undisclosed role.",
    source: "The Hollywood Reporter / Variety",
  },
  "log-2026-05-07": {
    title: "Reeves Teases Batmobile Snow Tires on Monitor",
    body: "Director Matt Reeves posted a behind-the-scenes monitor photo with the hashtag #SnowTires, revealing the rugged Batmobile fitted with heavy winter tread for upcoming cold-weather shoots.",
    source: "Matt Reeves Social Dispatch",
  },
  "log-2026-05-13": {
    title: "Returning Core Cast Officially Reconfirmed",
    body: "Warner Bros. confirmed the returns of Robert Pattinson, Jeffrey Wright, Andy Serkis, and Colin Farrell, re-establishing the foundational ensemble from the 2022 film.",
    source: "Variety",
  },
  "log-2026-05-14": {
    title: "All-Star Additions Announced for Sequel Ensemble",
    body: "DC Studios announced Scarlett Johansson, Sebastian Stan, Charles Dance, Sebastian Koch, and Brian Tyree Henry had joined the sequel cast in strictly confidential roles.",
    source: "Variety / Deadline",
  },
  "log-2026-05-20": {
    title: "Liverpool Location Scouting: St George's Hall & Tunnels",
    body: "Technical scout crews returned to Liverpool, surveying St George's Hall plateaus and tunnel access routes utilized during Gotham City Hall sequences in the first film.",
    source: "Liverpool Film Office Dispatch",
  },
  "log-2026-06-12": {
    title: "Director Shares First Slate Photo: Production Begins",
    body: "Matt Reeves shared a photograph of the custom production clapperboard at Leavesden Studios, formally declaring Day One of principal photography on The Batman: Part II in the UK.",
    source: "Matt Reeves Social Dispatch",
  },
  "log-2026-07-15": {
    title: `Release Date Slated for ${FILM.releaseLabelEn} with Test Footage`,
    videoTitle: `The Batman: Part II - First Teaser Footage · ${FILM.releaseLabelEn}`,
    body: `Warner Bros. set the worldwide theatrical release date for ${FILM.releaseLabelEn}, in IMAX and Dolby formats. Reeves unveiled camera test footage of Pattinson suited up in the updated cowl.`,
    source: "Variety",
  },
  "log-2026-08-18": {
    title: "Glasgow City Center Street Closures Begin",
    body: "Glasgow began multi-week street closures as crew dressed city avenues with deep artificial snowbanks, slush dressing, and holiday wreaths for winter nighttime action sequences.",
    source: "Glasgow City Council Traffic Order / STV News",
  },
  "log-2026-08-19": {
    title: "Batmobile Snow-Tread Testing & Stunt Rehearsals",
    body: "Stunt drivers conducted low-traction handling tests with the modified muscle-car Batmobile, tuning drift angles on snow-covered asphalt along Newton Street.",
    source: "Set Witness / STV News",
  },
  "log-2026-08-20": {
    title: "GCPD Cruisers & SWAT Vans Enclose Batmobile in Night Shoot",
    body: "Under floodlights, multiple GCPD patrol cruisers and tactical SWAT transports executed coordinated maneuvers boxing in the Batmobile amid falling artificial snow.",
    source: "Set Witness Dispatch",
  },
  "log-2026-08-21": {
    title: "Pitt Street Action: Batmobile High-Speed Pursuit",
    body: "Second unit teams captured high-speed pursuit footage along Pitt Street, with camera pursuit cranes tracking close to the Batmobile's roaring rear jet turbine.",
    source: "Set Witness / Glasgow Live",
  },
  "log-2026-08-22": {
    title: "Bothwell Street Night Shoot Rehearsals",
    body: "Bothwell Street was shut down for extensive night rehearsals involving stunt vehicles, pyrotechnic smoke effects, and wet-down snow rigs.",
    source: "Set Witness Dispatch",
  },
  "log-2026-08-23": {
    title: "Glasgow Street Drifts: High-Speed Police Chase Captured",
    body: "Bystanders filmed stunning footage of the Batmobile executing high-speed power-slides around snow-covered corners while pursued by three GCPD cruisers.",
    source: "Set Video Dispatches",
  },
  "log-2026-08-24": {
    title: "SWAT Tactical Encirclement: Blonde Passenger Sighted",
    body: "A row of GCPD SWAT tactical transports formed a barricade. High-res set photos captured a blonde female figure seated in the Batmobile's passenger cabin.",
    source: "Set Leak / PA Wire",
  },
  "log-2026-08-25": {
    title: "Stunt Double on Set: Reinforced Bumper Tested",
    body: "Stunt double Rick English appeared on set in full armor. The hero Batmobile featured a reinforced push-bumper for vehicle-ramming sequences in the snow.",
    source: "Set Leak / Glasgow Times",
  },
  "log-2026-08-27": {
    title: "Batmobile Rams Cruiser: Clear Cockpit Glimpses",
    body: "The Batmobile slammed through a GCPD squad car roadblock in a controlled practical collision, with detailed close-ups confirming both Batman and a female passenger inside.",
    source: "Set Leak Video",
  },
  "log-2026-08-28": {
    title: "Kingston Bridge Daylight Scene: Alfred Performs CPR on Bruce",
    body: "Dramatic daylight filming saw Andy Serkis' stunt double performing urgent chest compressions on an unconscious Bruce Wayne in the snow, with a luxury yacht moored on the River Clyde below.",
    source: "Set Leak / hoeBread36",
  },
  "log-2026-08-29": {
    title: "Batmobile Evades Delivery Truck in Nighttime Pursuit",
    body: "Night sequences filmed near North Street showed the Batmobile swerving past an oncoming box truck on slick streets, with drone cameras documenting city blocks covered in fake snow.",
    source: "Set Leak / The Batman Saga News",
  },
  "log-2026-08-30": {
    title: "Updated Batsuit Close-Up: Modular Collar & Armor Texture",
    body: "Stunt double Rick English was photographed in daylight revealing the updated suit's modular armored neck guard, segmented chest plates, and heavy combat abrasions.",
    source: "Set Leak / DC Film News",
  },
  "log-2026-08-31": {
    title: "Kingston Bridge Stunt Props: Damaged Batmobile on Site",
    body: "A heavily crushed stunt Batmobile shell with collapsed roof pillars and caved-in glass was delivered to the Kingston Bridge set beside rollover stunt rigs.",
    source: "Set Leak / Fraser Wilson",
  },
  "log-2026-09-04": {
    title: "Night Stunts: Updated Cowl & GCPD Tactical Motorcycle",
    videoTitle: "Set Leak: Modified Batsuit Riding GCPD Motorcycle",
    body: "Stunt rider Rick English operated a custom GCPD police motorcycle through snow-dusted streets, displaying the modified cowl, stage blood on the suit, and a yellow utility belt.",
    source: "Set Leak / ciaron97 / Jasraj Sidhu",
  },
  "log-2026-09-11": {
    title: "Sebastian Stan Praises Sequel: 'Godfather Part II' Ambition",
    videoTitle: "Stan on Joining The Batman Part II with Johnson",
    body: "At TIFF, Sebastian Stan lauded Matt Reeves' uncompromising vision, comparing the sequel's scope to The Godfather Part II and confirming filming would span a lengthy winter schedule.",
    source: "Variety TIFF Interview",
  },
  "log-2026-09-13": {
    title: "London Courthouse Protest: Bruce Escorted Outside St Paul's",
    videoTitle: "Set Leak: Bruce Wayne Escorted Through Protesters",
    locationLabel: "London · St. Paul's Cathedral Exterior",
    body: "Robert Pattinson as Bruce Wayne was escorted by GCPD through angry demonstrators outside St Paul's Cathedral. Crowd signs read 'Court of Fowls' and 'Anarky'. Jeffrey Wright was also on set.",
    source: "IGN London Set Report",
  },
  "log-2026-09-16": {
    title: "Glasgow Day Shoot Archive: GCPD SWAT Prisoner Transport",
    locationLabel: "Glasgow, Scotland · Bothwell Street SWAT Transport",
    body: "High-angle window footage from Bothwell Street documented GCPD officers loading an unidentified detainee into a police SWAT van on snow-covered roads.",
    source: "Set Leak / The Batman Saga News",
  },
  "log-2026-09-19": {
    title: "Batman Day: Director Shares Sequel Frame from London",
    locationLabel: "London · Official Production Still",
    body: "On Batman Day 2026, Matt Reeves shared an official framed widescreen still from London showing Batman against snowfall and an orange moon, confirming the tactile film-out process.",
    source: "Matt Reeves Social Dispatch",
  },
  "log-2026-09-20": {
    title: "London Night Shoot: GCPD Patrol Bike GC-201 & Camera Chase Rig",
    locationLabel: "London · Night Action Vehicle Unit",
    body: "Production resumed on a secure London street for night filming, with photographer UnBoxPHD capturing the GCPD patrol motorcycle alongside a heavy gyro-stabilized camera pursuit vehicle.",
    source: "Set Leak / UnBoxPHD",
  },
  "log-2026-09-22": {
    title: "Pattinson on Sequel: A Real Left Turn from the First Film",
    body: "While promoting Primetime, Pattinson told Collider that The Batman Part II represents a genuine left turn from the first movie while retaining its core atmosphere. He described the screenplay as exceptionally dense, noting Reeves already has the entire film mapped in his head, with cast members continually discovering layered details on set. No villains, specific scenes, or suits were discussed.",
    source: "Collider · Steve Weintraub Interview",
  },
  "log-2028-02-18": {
    title: "Theatrical Release Across North America",
    body: "The Batman: Part II opens nationwide in premium formats including IMAX and Dolby Cinema.",
    source: "Warner Bros. Pictures",
  },
};

export const LOG_KIND_EN: Record<LogKind, string> = {
  release: "Theatrical",
  cast: "Casting",
  shoot: "Production",
  slate: "Schedule",
};

export function getLocalizedFact(
  fact: {
    label: string;
    value: string;
    source?: string;
    sourceUrl?: string;
    sourceTier?: "official" | "press" | "set" | "archive";
  },
  locale: Locale,
) {
  if (locale === "zh") return fact;
  const en = FACTS_EN[fact.label];
  if (!en) return fact;
  return {
    ...fact,
    label: en.label,
    value: en.value,
    source: en.source ?? fact.source,
  };
}

export function getLocalizedPlot(item: PlotItem, locale: Locale): PlotItem {
  if (locale === "zh") return item;
  const en = PLOT_EN[item.id];
  if (!en) return item;
  return {
    ...item,
    text: en.text,
    source: en.source ?? item.source,
    debunkedNote: en.debunkedNote ?? item.debunkedNote,
    debunkedSource: en.debunkedSource ?? item.debunkedSource,
  };
}

export function getLocalizedCast(
  person: {
    role: string;
    roleEn: string;
    name: string;
    nameEn: string;
    note: string;
    status: "confirmed" | "rumor";
    personId?: string;
  },
  locale: Locale,
) {
  if (locale === "zh") return person;
  const en = CAST_EN[person.nameEn];
  return {
    ...person,
    name: person.nameEn,
    role: person.roleEn,
    note: en?.note ?? person.note,
  };
}

export function getLocalizedLog(event: LogEntry, locale: Locale): LogEntry {
  if (locale === "zh") return event;
  const en = LOG_EN[event.id];
  if (!en) return event;
  return {
    ...event,
    title: en.title,
    body: en.body,
    locationLabel: en.locationLabel ?? event.locationLabel,
    source: en.source ?? event.source,
  };
}

/** Home video cards use the same translations as the dossier; only short video labels are optional. */
export function getLocalizedLogVideoTitle(event: LogEntry, locale: Locale): string {
  const originalTitle = event.video?.title ?? event.title;
  if (locale === "zh") return originalTitle;
  const en = LOG_EN[event.id];
  return en?.videoTitle ?? en?.title ?? originalTitle;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatMonthHeading(month: string, locale: Locale): string {
  if (locale === "zh") {
    return `${month.slice(0, 4)} 年 ${Number(month.slice(5))} 月`;
  }
  const year = month.slice(0, 4);
  const mIndex = Number(month.slice(5)) - 1;
  const monthName = MONTH_NAMES[mIndex] ?? month.slice(5);
  return `${monthName} ${year}`;
}
