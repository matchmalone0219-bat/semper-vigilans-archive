import type { RootKind, RootParallel, RootWork, CinemaWork } from "../roots";

export const ROOTS_INTRO_EN =
  "Matt Reeves' The Batman is not a mechanical adaptation of any single comic run, but an amalgamation of the psychological core and cinematic language of landmark works across DC history: Bruce's self-trial draws from Darwyn Cooke's Batman: Ego; grounded detective realism stems from Frank Miller's Batman: Year One; mob hegemony and festive serial killings inherit from The Long Halloween; Martha's Arkham lineage, institutionalization, and slaughter derive directly from Geoff Johns' Batman: Earth One; the climax seawall explosion creates intertextuality with Scott Snyder's Zero Year. In a February 18, 2022 Entertainment Weekly interview, Robert Pattinson named Dennis O'Neil's Batman: Shaman to explain the bat as something closer to a private rite than a practical tool; the same piece treats The Man Who Falls as the lighter reference. In cinematic grammar, Reeves cited 1970s street crime milestones including Chinatown, Taxi Driver, and The French Connection at DC FanDome; Bruce and Selina's dynamic was benchmarked by Reeves, Pattinson, and Kravitz against Alan J. Pakula's Klute; Pattinson viewed the 1993 animated feature Batman: Mask of the Phantasm as one of the rare works truly capturing 'being Batman as a curse'; and the Batmobile's visceral entry directly benchmarks John Carpenter's adaptation of Stephen King's Christine.";

export const ROOT_KIND_EN: Record<RootKind, string> = {
  confirmed: "Official Core Inspiration",
  cited: "Key Creator Reference",
  parallel: "Classic Motif Homage",
};

export const ROOT_METHOD_EN: { kind: RootKind; title: string; body: string }[] = [
  {
    kind: "confirmed",
    title: "Official Core Inspiration",
    body: "Explicitly designated by director Matt Reeves in interviews and press conferences as the primary psychological blueprint and spiritual core of the character.",
  },
  {
    kind: "cited",
    title: "Key Creator Reference",
    body: "Repeatedly cited and borrowed by the creative team for its crime syndicate hierarchy, serial suspense structure, or tactile street grit, shaping the screenplay deeply.",
  },
  {
    kind: "parallel",
    title: "Classic Motif Homage",
    body: "Key cinematic spectacles and narrative climaxes that share deep intertextuality and parallels with classic comic sequences, widely discussed by critics and fans.",
  },
];

export interface RootWorkEn {
  kicker: string;
  title: string;
  jump: string;
  creators: string;
  published: string;
  thesis: string;
  lede: string;
  sources: { label: string; note: string }[];
  parallels: RootParallel[];
  sections: { heading: string; body: string }[];
}

export const ROOTS_EN: Record<string, RootWorkEn> = {
  ego: {
    kicker: "01 / Psychological Core",
    title: "Batman: Ego",
    jump: "Ego",
    creators: "Written & Illustrated by Darwyn Cooke",
    published: "2000 · DC Prestige Graphic Novel",
    thesis: "Confirmed by the director: an introspective journey exploring how Bruce Wayne confronts his inner darkness and moral boundary in early vigilante years.",
    lede: "Batman: Ego is not a case-solving whodunit, but Reeves' core psychological entry point for young Bruce Wayne. The film inherits Bruce's painful self-interrogation over vigilantism and his journey toward redemption.",
    sources: [
      {
        label: "Esquire Interview",
        note: "Reeves elaborated on Ego as a vital influence in portraying Batman's internal torment.",
      },
      {
        label: "DC FanDome Official Panel",
        note: "The creative team reinforced Ego as the seminal text dissecting Bruce's childhood trauma.",
      },
    ],
    parallels: [
      {
        comic: "Bruce engages in a hallucinatory debate deep inside the cave with the manifestation of his shadow persona: the Batman.",
        film: "Bruce rigorously audits his missions through handwritten journals and review of helmet contact-lens footage.",
      },
      {
        comic: "Questions whether vigilantism defends justice or merely discharges unresolved thirst for vengeance.",
        film: "Opens with the ruthless claim 'I am vengeance', culminating in flood rescues and evolving into a beacon of hope.",
      },
      {
        comic: "Focuses on the internal tug-of-war between humanity and totem, de-emphasizing supervillain showdowns.",
        film: "Pattinson's restrained performance captures physical and psychological exhaustion of carrying an unbearable burden.",
      },
    ],
    sections: [
      {
        heading: "The Spiritual Blueprint",
        body: "Rather than reaching for mythological grandeur, Matt Reeves turned to Darwyn Cooke's 2000 masterpiece Batman: Ego. What fascinated Reeves was Bruce's unpolished, turbulent early state—fighting not just criminals, but the fury and destructive impulse born of childhood trauma.",
      },
      {
        heading: "Inner Shadow & Moral Self-Trial",
        body: "Following a compromised mission, Bruce confronts a monstrous manifestation of the Bat within his psyche. The graphic novel questions the moral boundaries of vigilantism: when vengeance becomes limitless violence, the border between hero and monster dissolves.",
      },
      {
        heading: "Cinematic Translation & Cathartic Arc",
        body: "The film translates this introspection into haunting audiovisual language: smeared charcoal eye grease, obsessive nocturnal reviews of recorded footage, and ultimately the red flare leading citizens through deluge, pivoting from vengeance to hope.",
      },
    ],
  },
  halloween: {
    kicker: "02 / Mob Narrative",
    title: "Batman: The Long Halloween",
    jump: "Halloween",
    creators: "Writer: Jeph Loeb · Artist: Tim Sale",
    published: "1996–1997 · 13-Issue Limited Series",
    thesis: "The Falcone syndicate's dominion, holiday serial homicides, and the unraveling of Gotham's traditional crime order.",
    lede: "Reeves cited this milestone series as the template for Gotham's social ecosystem: an oppressive background dominated by traditional mob dynasties and an investigation peeling back institutional corruption.",
    sources: [
      {
        label: "Interviews & Press Notes",
        note: "Reeves repeatedly confirmed The Long Halloween as the cornerstone of Gotham's dual power structure of mobsters and public officials.",
      },
    ],
    parallels: [
      {
        comic: "Carmine Falcone's crime empire permeates city hall, the GCPD, and the courts.",
        film: "Falcone secretly manipulates the Renewal fund, turning the mayor, commissioner, and DA into puppets.",
      },
      {
        comic: "The Holiday killer executes mob figures across a calendar year on holiday dates.",
        film: "The Riddler initiates targeted killings starting on Halloween, leaving cryptic ciphers at each scene.",
      },
      {
        comic: "Batman, Gordon, and DA Harvey Dent form a fragile investigative alliance.",
        film: "Focuses on early partnership and trust between Batman and Gordon testing systemic integrity.",
      },
    ],
    sections: [
      {
        heading: "The Crime Empire & Web of Power",
        body: "Loeb and Sale crafted a Gotham dominated by Carmine 'The Roman' Falcone. John Turturro's Falcone captures this essence: not a common street gangster, but an untouchable oligarch ruling from the Iceberg Lounge penthouse.",
      },
      {
        heading: "Hardboiled Detective Procedural",
        body: "The graphic novel adopts hardboiled noir pacing, using consecutive murders to force the detective to strip away illusions. The film mirrors this claustrophobic rhythm through crime scene forensics and cipher decryption.",
      },
      {
        heading: "The Breakdown of the Legal Order",
        body: "The Long Halloween charts the transition from traditional mafia to freakish supervillains, exposing the fragility of the rule of law and the cost of extrajudicial justice.",
      },
    ],
  },
  "year-one": {
    kicker: "03 / Gritty Realism",
    title: "Batman: Year One",
    jump: "Year One",
    creators: "Writer: Frank Miller · Artist: David Mazzucchelli",
    published: "1987 · Batman #404–407",
    thesis: "Muddy, tactile street aesthetics, early investigative methods, and the bond of trust between Batman and Gordon.",
    lede: "Miller and Mazzucchelli's landmark run pioneered Batman's grounded realism. While set in Year Two, the film deeply channels Year One's urban grit, handcrafted gear, and Gordon's moral stand.",
    sources: [
      {
        label: "Creative Team Interviews",
        note: "The filmmakers emphasized 1970s New Hollywood crime films alongside Year One as visual and thematic touchstones.",
      },
    ],
    parallels: [
      {
        comic: "Portrays Gotham as a documentary-like urban hellscape of rain, neon reflections, and real grime.",
        film: "Liverpool and Glasgow cold streetscapes, battle-scarred armor seams, and close-quarters brawling.",
      },
      {
        comic: "Bruce experiments with disguise, donning civilian drifter clothes to gather street intelligence.",
        film: "Bruce infiltrates the Iceberg Lounge in bomber jacket and beanie as 'The Drifter'.",
      },
      {
        comic: "An incorruptible Jim Gordon navigates a rotten GCPD, forming a secret alliance with the vigilante.",
        film: "Lieutenant Gordon defends Batman at crime scenes and officially activates the rooftop Bat-Signal.",
      },
    ],
    sections: [
      {
        heading: "Tactile, Weathered Street Aesthetics",
        body: "Miller and Mazzucchelli stripped away fantastical superhero varnish, setting Batman in a tactile city of rainfall, exhaust fumes, and neon reflections. The film faithfully adopts this physical authenticity: battered, hand-welded gear and a roaring combustion engine Batmobile.",
      },
      {
        heading: "Return to the Detective Essence",
        body: "Under Year One's spirit, the movie strips away omnipotent sci-fi tech, grounding Bruce in forensic photography, cipher breaking, wiretaps, and psychological profiling.",
      },
      {
        heading: "Symbiosis of Justice Inside and Outside Law",
        body: "The narrative chronicles the growing bond between Gordon and Batman—two lone crusaders navigating institutional rot until they stand together on the precinct roof.",
      },
    ],
  },
  "zero-year": {
    kicker: "04 / Cataclysm Intertextuality",
    title: "Batman: Zero Year",
    jump: "Zero Year",
    creators: "Writer: Scott Snyder · Artist: Greg Capullo",
    published: "2013–2014 · DC New 52 Run",
    thesis: "The Riddler weaponizes municipal infrastructure to plunge Gotham into deluge, creating striking parallels with the film's climax.",
    lede: "Zero Year reinvented the Riddler as an intellectual terrorist attacking the city's power grid and reservoir. The movie's climax—detonating seawalls to flood Gotham Square Garden—strongly echoes this comic cataclysm.",
    sources: [
      {
        label: "Film Criticism & Comic Lore",
        note: "Major film critics and historians noted the direct architectural and thematic parallels with Zero Year's flooding arc.",
      },
    ],
    parallels: [
      {
        comic: "Edward Nygma severs Gotham's power grid and demolishes reservoirs during a hurricane, turning the city into a sunken ruin.",
        film: "Riddler loyalists detonate seven synchronized vans to demolish seawalls, drowning downtown Gotham.",
      },
      {
        comic: "The Riddler views himself as an architect of rebirth, forcing society to rebuild from the rubble.",
        film: "Paul Dano's Riddler frames domestic terrorism as divine judgment stripping away privileged hypocrisy.",
      },
      {
        comic: "Bruce rises from the ruins to ignite hope across a devastated populace.",
        film: "Batman ignites a crimson emergency flare in the flooded arena, guiding trapped citizens out of darkness.",
      },
    ],
    sections: [
      {
        heading: "Villain Ambition & The Flooding Motif",
        body: "In Scott Snyder's Dark City arc, the Riddler operates on an infrastructural scale, exploiting urban vulnerabilities to declare the old order dead. The film adopts this catastrophic scale for its grand finale.",
      },
      {
        heading: "Heroic Rebirth Amidst Ruins",
        body: "The flood is both a visual spectacle and the pivotal crucible for Bruce's character arc: moving beyond punitive vengeance to step into the waters as a savior.",
      },
    ],
  },
  shaman: {
    kicker: "05 / Totem",
    title: "Batman: Shaman",
    jump: "Shaman",
    creators: "Writer: Dennis O'Neil · Pencils: Ed Hannigan · Inks: John Beatty",
    published: "1989–1990 · Legends of the Dark Knight #1–5",
    thesis: "The comic Pattinson used to step away from a practical explanation of the suit: the bat is what Bruce believes he is becoming.",
    lede: "The story sits in Batman's first weeks, alongside the opening of Year One. Before the mask, Bruce is left for dead in Alaska. A shaman in a ceremonial bat mask heals him with an old tale and makes him swear not to repeat it. Pattinson took the mysticism, not the cult murders.",
    sources: [
      {
        label: "Entertainment Weekly",
        note: "On February 18, 2022, Pattinson set Shaman against the practical account of the suit in the Nolan films.",
      },
    ],
    parallels: [
      {
        comic: "The shaman's bat tale is not a field manual. It makes the wounded man believe he is bound to the creature.",
        film: "Pattinson said that once the suit is on, Bruce believes it gives him power, even though he is an ordinary man.",
      },
      {
        comic: "The mask is kept in the cave as a reminder of what he has become.",
        film: "For the opening examination of a body, he wanted a crouching druid, not a tank.",
      },
    ],
    sections: [
      {
        heading: "The Mask and the Oath",
        body: "Bruce tracks the killer Tom Woodley with the bounty hunter Willy Doggett. Doggett is killed and Bruce collapses in the snow. A shaman and his daughter save him. Bruce later repeats the forbidden tale to an investigator his money is funding. A killer in the same Alaskan mask then appears in Gotham. When the fraud breaks, the mask stays in the cave.",
      },
      {
        heading: "What Pattinson Kept",
        body: "The film does not adapt the Chubala cult or the Alaska episode. Pattinson said he wanted another angle: becoming Batman is not a plan that has been reasoned through. It is closer to a witch doctor who believes the clothes themselves confer power. In his performance the suit is skin, not a prop.",
      },
    ],
  },
  "man-who-falls": {
    kicker: "06 / Short Parallel",
    title: "The Man Who Falls",
    jump: "Falls",
    creators: "Writer: Dennis O'Neil · Artist: Dick Giordano",
    published: "1989 · The one original story in Secret Origins of the World's Greatest Super-Heroes, 16 pages",
    thesis: "The lighter reference in the same interview. The well, the travels, and the bat at the window live in these sixteen pages. The Batman does not stage that origin.",
    lede: "This is the only new story in that origins collection. Young Bruce falls into a hole on the manor grounds, his parents are murdered, he leaves to study, and a bat crashes through the study window. Nolan's Batman Begins uses the well. Reeves' film begins in year two.",
    sources: [
      {
        label: "Entertainment Weekly",
        note: "The February 18, 2022 piece places The Man Who Falls after Shaman, as the lesser reference.",
      },
    ],
    parallels: [
      {
        comic: "After a bat breaks the window, Bruce decides to become Batman. The narration says he will keep falling.",
        film: "The film has neither the well nor the bat at the window. Pattinson uses the story only to say the choice feels like a dream, not a plan.",
      },
    ],
    sections: [
      {
        heading: "A Parallel, Not a Blueprint",
        body: "O'Neil gathers the scattered origin pages into one story: the hole, the murders, the years away, the bat at the glass. The comic Pattinson actually dwelt on is Shaman. The Man Who Falls marks how early that dream-logic is, and that the fall into the cave belongs to another film.",
      },
    ],
  },
};

export interface CinemaWorkEn {
  kicker: string;
  thesis: string;
  lede: string;
  parallels: { cinema: string; batman: string }[];
  breakdown: { heading: string; body: string }[];
}

export const CINEMA_ROOTS_EN: Record<string, CinemaWorkEn> = {
  chinatown: {
    kicker: "01 / Neo-Noir Masterpiece & Water Graft",
    thesis: "Municipal water corruption, a private eye trapped in oligarchic webs, and inescapable tragedy.",
    lede: "Matt Reeves repeatedly cited Chinatown as the primary narrative compass for The Batman. From the conspiracy hidden in the seawall to the detective's sense of helplessness against the ruling elite, the two films share deep structural DNA.",
    parallels: [
      {
        cinema: "PI Jake Gittes investigates an adultery case, gradually unearthing a monumental conspiracy by the Department of Water and Power.",
        batman: "Batman starts with photos of Mayor Mitchell, exposing Falcone's grip on the Renewal fund and Gotham's seawall infrastructure.",
      },
      {
        cinema: "Oligarch Noah Cross controls the city's water supply while hiding dark, incestuous family secrets.",
        batman: "Carmine Falcone pulls puppet strings from the Iceberg Lounge while concealing his secret paternity of Selina Kyle.",
      },
      {
        cinema: "Ends with New Hollywood disillusionment: 'Forget it, Jake, it's Chinatown.'",
        batman: "Bruce solves the riddle too late to prevent the seawall explosion, confronting the limits of solo vigilantism.",
      },
    ],
    breakdown: [
      {
        heading: "Infrastructural Corruption & Public Sins",
        body: "Chinatown anchored its malice in the lifeblood of urban survival—water. Reeves translated this motif: the flooded seawalls were built with substandard concrete by corrupt contractors, turning municipal graft into a literal deluge.",
      },
      {
        heading: "The Trapped, Fallible Detective",
        body: "Unlike omnipotent superheroes, Pattinson's Batman mirrors Jake Gittes: brilliant at deduction yet perpetually a step behind the mastermind, infusing the film with heavy, tragic realism.",
      },
    ],
  },
  "taxi-driver": {
    kicker: "02 / Psychological Alienation & Urban Vigilantism",
    thesis: "Rain-slicked monologues, handwritten diaries, and an isolated vigilante's descent into street violence.",
    lede: "Reeves cited Taxi Driver at DC FanDome as 'about the description of a place and getting into someone's head'. In the audio commentary, he stated Bruce must possess 'that Travis Bickle quality of keeping a journal'.",
    parallels: [
      {
        cinema: "Travis Bickle drives through nocturnal New York, pouring disgust for street decadence into his diary.",
        batman: "Bruce writes his 'Gotham Project' journal under a dim lamp, narrating how the city devours itself in the rain.",
      },
      {
        cinema: "Neon halos and damp asphalt fuel Travis's descent into violent self-righteous cleansing.",
        batman: "Greig Fraser's sodium vapor lighting and shallow depth-of-field depict Gotham as a claustrophobic abyss.",
      },
      {
        cinema: "Travis arms himself before a mirror, transforming from bystander to violent executioner.",
        batman: "Bruce suits up with tactical armor and camera contact lenses, treating vigilantism as a criminological experiment.",
      },
    ],
    breakdown: [
      {
        heading: "The Journalistic Subjective Voice",
        body: "Taxi Driver immerses the viewer entirely within its protagonist's feverish subjectivity. The Batman opens and closes with complete diary voiceovers, exposing Bruce's frayed mental state and obsession.",
      },
      {
        heading: "Year One's Taxi Driver Homage",
        body: "Frank Miller instructed David Mazzucchelli that early Batman should look like he 'won a Taxi Driver lookalike contest.' Reeves connected Pattinson's drifter jacket directly to this origin.",
      },
    ],
  },
  klute: {
    kicker: "03 / Catwoman Relationship · Neo-Noir Parallel",
    thesis: "A rigid investigator misjudges an unclassifiable woman, with both reshaping each other's moral horizons.",
    lede: "Reeves told Den of Geek that Klute was 'super important'. While writing Batman and Selina, he studied Alan J. Pakula's 1971 classic: Jane Fonda's Bree Daniels defies easy classification, while Donald Sutherland's Klute finds his binary worldview challenged.",
    parallels: [
      {
        cinema: "Klute assumes Bree fits into a neat moral box because of her world, only to be irrevocably altered by her.",
        batman: "Bruce sees the world in rigid black-and-white; Selina's moral complexity shatters his simplistic moral calculus.",
      },
      {
        cinema: "Bree refuses to be judged by the detective's rigid scale, owning her survival instinct and vulnerabilities.",
        batman: "Selina is a burglar and survivor fighting for her friend, refusing Batman's judgment and cracking open his absolutism.",
      },
      {
        cinema: "Pattinson described their dynamic: 'He's constantly negging her, and it strangely becomes seductive.'",
        batman: "Their rain-soaked encounters in apartments, rooftops, and the Iceberg Lounge crackle with friction and mutual need.",
      },
    ],
    breakdown: [
      {
        heading: "Endorsed by All Three Creators",
        body: "Reeves called Klute essential; Pattinson noted it was the very first discussion he had about the script; and Kravitz called it her bible for Selina.",
      },
      {
        heading: "Klute Meets Chinatown",
        body: "Reeves synthesized the dynamic: Klute provides the tension of misjudgment and mutual rewriting, while Chinatown provides the tragic revelation of generational exploitation.",
      },
    ],
  },
  "all-presidents-men": {
    kicker: "04 / Political Thriller & Audit Trail",
    thesis: "Following financial ledgers, covert parking garage rendezvous, and unyielding investigative journalism.",
    lede: "Discarding flashy gadgets, the film progresses like Pakula's investigative procedural: auditing ledgers, cross-referencing surveillance footage, and whispered exchanges in underground garages.",
    parallels: [
      {
        cinema: "Bob Woodward follows campaign money laundering to trace the Watergate conspiracy to the highest office.",
        batman: "Batman and Gordon audit orphan fund records and shell companies to expose the Renewal laundering operation.",
      },
      {
        cinema: "Reporters meet 'Deep Throat' in dimly lit, freezing underground parking structures.",
        batman: "Gordon and Batman hold clandestine rendezvous in abandoned parking decks and morgue hallways.",
      },
    ],
    breakdown: [
      {
        heading: "Follow the Money",
        body: "Establishing the Riddler as a former forensic accountant roots the detective procedural in institutional auditing, lending extraordinary realism to superhero fiction.",
      },
    ],
  },
  se7en: {
    kicker: "05 / Serial Killers & Ritualistic Judgment",
    thesis: "A killer executing corrupt figures by a codified list, ritualistic crime scene ciphers, and surrendering to orchestrate the endgame.",
    lede: "David Fincher's Se7en provided direct structural and aesthetic templates. Paul Dano's Riddler and Kevin Spacey's John Doe share striking philosophical and narrative parallels.",
    parallels: [
      {
        cinema: "A serial killer crafts macabre scenes corresponding to the Seven Deadly Sins, scrawling blood manifestos on walls.",
        batman: "The Riddler executes corrupt officials based on bribery lists, leaving signature greeting cards and bloody tape.",
      },
      {
        cinema: "John Doe turns himself in covered in blood, manipulating detectives into his final psychological trap.",
        batman: "The Riddler calmly drinks coffee waiting for arrest, drawing Batman to Arkham while his seawall bombs detonate.",
      },
    ],
    breakdown: [
      {
        heading: "The Ritual of a Rainy Crime Capital",
        body: "The relentless downpour, amber sodium lighting, and moldering handwritten journals in Se7en directly inspire the visual atmosphere of The Batman and the Riddler's squalid apartment.",
      },
    ],
  },
  "french-connection": {
    kicker: "06 / Benchmark of Practical Chase Sequences",
    thesis: "Eschewing CGI for visceral, bumper-mounted pursuit, raw engine roars, and documentary handheld framing.",
    lede: "For the torrential highway chase between the Batmobile and the Penguin, Reeves and cinematographer Greig Fraser benchmarked William Friedkin's 1971 classic, insisting on real stunt cars and rigid chassis mounts.",
    parallels: [
      {
        cinema: "Gene Hackman's Pontiac pursues an elevated train through Brooklyn beneath the tracks, delivering raw crash impacts.",
        batman: "The Batmobile weaves through storm-drenched traffic chasing Penguin's Maserati, using real pyro and practical collisions.",
      },
      {
        cinema: "Cameras bolted to front bumpers capture rough vibrations and water splashes, shattering Hollywood polish.",
        batman: "Fraser bolted custom waterproof rigs directly onto the chassis and hood, yielding terrifying low-angle velocity.",
      },
    ],
    breakdown: [
      {
        heading: "Triumph of Practical Mechanical Force",
        body: "Rejecting synthetic green-screen excess, The Batman resurrected 1970s stunt driving and mechanical roar, ensuring every collision carries genuine kinetic shock.",
      },
    ],
  },
  phantasm: {
    kicker: "07 / Animated Classic · A Curse, Not a Triumph",
    thesis: "Being Batman is an agonizing curse rather than heroic glory—Pattinson's cited touchstone.",
    lede: "Robert Pattinson stated in Premiere France that animated landmark Batman: Mask of the Phantasm was the singular film truly understanding that 'being Batman is a curse, a burden.'",
    parallels: [
      {
        cinema: "Bruce nearly chooses a peaceful life with Andrea Beaumont, only for tragedy to drag him back beneath the cowl.",
        batman: "Pattinson's Bruce possesses no playboy facade, pouring his entire existence into the night until Selina offers a fleeting glimpse of another life.",
      },
      {
        cinema: "The Phantasm executes mobsters, challenging Bruce on what reciprocal violence turns a crusader into.",
        batman: "The Riddler's followers adopt Batman's 'I am vengeance' battle cry, forcing Bruce to repudiate vengeance in the flood.",
      },
      {
        cinema: "Frames Batman as a tragic figure burdened by loss rather than an infallible superhero.",
        batman: "Concludes not with triumphant victory, but with breached seawalls and a drowning city.",
      },
    ],
    breakdown: [
      {
        heading: "Why Pattinson Singled Out Phantasm",
        body: "Pattinson emphasized that The Batman aligns with Phantasm's focus on internal turbulence rather than superficial heroics. Setting the film in Year Two anchors Bruce in an unpolished, vulnerable state.",
      },
      {
        heading: "The Phantasm and 'I Am Vengeance'",
        body: "The Phantasm's lethal efficiency mirrors the danger of Batman's methods being weaponized by extremists. Pivoting from vengeance to rescue in the arena is Bruce's direct answer to that curse.",
      },
    ],
  },
  christine: {
    kicker: "08 / Vehicular Horror · A Machine Alive in the Shadows",
    thesis: "Conceiving the Batmobile as a horror beast: emerging from gloom to terrify prey with engine roar and headlights.",
    lede: "In Empire, Reeves revealed he conceptualized the Batmobile as Stephen King and John Carpenter's Christine: an animalistic machine emerging from the dark to terrify targets.",
    parallels: [
      {
        cinema: "Christine starts up spontaneously in the dark, her twin headlights announcing predatory intent.",
        batman: "The Batmobile bursts out of blinding rain onto the expressway, afterburner blazing like a stalking predator.",
      },
      {
        cinema: "King and Carpenter treated the Plymouth Fury as a living beast whose revving engine is an animal growl.",
        batman: "Reeves mandated the Batmobile sound like a ferocious beast, weaponizing mechanical roar as an intimidation tactic.",
      },
      {
        cinema: "Terror arises not from futuristic gadgets, but from an unyielding heavy metal presence.",
        batman: "No sci-fi missiles or invisibility shields: pure mass, flame, and thunder in the rainy night.",
      },
    ],
    breakdown: [
      {
        heading: "Intimidation Over Exhibition",
        body: "Unlike typical superhero movies that showcase vehicles as shiny toys, Reeves concealed the Batmobile until midway, letting audience and criminal share visceral dread.",
      },
      {
        heading: "Synthesis with The French Connection",
        body: "Friedkin provided the physical stunt realism, while Carpenter provided psychological dread—yielding a Batmobile that feels both destructible and terrifyingly alive.",
      },
    ],
  },
};
