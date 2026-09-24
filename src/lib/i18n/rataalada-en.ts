export const RATA_INTRO_EN =
  "In late 2021, Warner Bros.' viral marketing campaign for The Batman used cryptic clues to lead fans to the alternate-reality game rataalada.com ('rat with wings' in Spanish). The site presented a vintage CRT-style terminal where fans solved the Riddler's puzzles to unlock Gotham files. This page reconstructs the 2021–2022 official ARG milestones (Phases 1, 2, 6, 7 and the GCPD seizure notice), with Phases 3–5 and web-adapted stills curated by this archive for continuous progression, concluding with a fan tribute to The Batman Part II (2028).";

export const COMMANDS_EN: Record<string, string> = {
  Y: "Begin challenge / confirm",
  HELP: "Display terminal command manual",
  RIDDLE: "Redisplay the current active riddle",
  HINT: "Obtain an investigative hint",
  LS: "List unlocked classified dossiers",
  "OPEN <file>": "View an unlocked image file",
  "CAT <file>": "Read an unlocked text document",
  TIMELINE: "View real-world 2021–2022 ARG evolution timeline",
  ABOUT: "Terminal background and history",
  CLEAR: "Clear the current terminal screen",
  RESET: "Reset game challenge progress",
  SPOILER: "Instantly unlock all dossiers",
};

export const CIPHER_SHAPES_EN: Record<string, string> = {
  双竖梯形: "Double vertical trapezoid",
  右上直角折线: "Upper-right right-angle fold",
  对角斜交叉线: "Diagonal cross",
  向左直角折线: "Left-facing right angle",
  实心菱形: "Solid diamond",
  双横平行线: "Double horizontal bars",
  中心圆点: "Centered dot",
  四角向内箭头: "Inward four-point arrow",
  单斜短杠: "Single forward slash",
  空心等边三角: "Hollow equilateral triangle",
  三竖平行短线: "Triple vertical bars",
  右上倒折钩: "Upper-right inverted hook",
  双层同心方块: "Concentric double squares",
  横贯双向箭头: "Transverse bidirectional arrow",
  空心正圆环: "Hollow circle",
  实心正方形: "Solid square",
  带底托三角符: "Triangle with base pediment",
  右向下斜折线: "Rightward downward chevron",
  左向带尾弧钩: "Left-hooked arc with tail",
  中心十字交叉: "Central cross",
  底边向上方框: "Open-top square bracket",
  带中横竖折线: "Vertical chevron with crossbar",
  三重波浪横线: "Triple wave horizontal lines",
  斜向交叉乘号: "Diagonal multiplication cross",
  顶端分叉竖杆: "Top-forked vertical staff",
  双重折返之字折线: "Double recurring zigzag",
};


export const RATA_STILLS_EN: Record<string, { title: string; caption: string }> = {
  "STREET.IMG": {
    title: "Batman in the Rain",
    caption: "GCPD surveillance record: Batman patrolling Gotham on a rain-soaked night.",
  },
  "GOTHAM.IMG": {
    title: "Gotham Overlook",
    caption: "An elevated view across Gotham's skyline.",
  },
  "SUBJECT.IMG": {
    title: "Riddle Suspect",
    caption: "Suspect file: Edward Nashton.",
  },
  "FALCONE.IMG": {
    title: "Underworld Patriarch",
    caption: "Carmine Falcone, the power behind the Iceberg Lounge.",
  },
  "SHADOW.IMG": {
    title: "Between Light and Dark",
    caption: "Gotham's skyline falling into shadow at sunset.",
  },
  "LAIR.IMG": {
    title: "Hidden Lair",
    caption: "The Riddler's apartment, covered wall-to-wall with political clippings and investigative notes.",
  },
  "WAYNE.IMG": {
    title: "Behind the Cowl",
    caption: "Bruce Wayne alone in contemplation.",
  },
  "SON.IMG": {
    title: "Thomas Wayne",
    caption: "Archive image from Thomas Wayne's mayoral campaign.",
  },
  "ARKHAM.IMG": {
    title: "Martha Wayne",
    caption: "Archive portrait of Martha Wayne, née Arkham.",
  },
  "LEDGER.IMG": {
    title: "Corruption Ledger",
    caption: "A key piece of evidence tied to Gotham's laundering and payoff network.",
  },
  "MANOR.IMG": {
    title: "Gotham Orphanage",
    caption: "The former Wayne property repurposed as Gotham's orphanage.",
  },
  "INMATE.IMG": {
    title: "Unseen Inmate",
    caption: "A mysterious face from a neighboring high-security Arkham cell.",
  },
  "CELL.IMG": {
    title: "Forensic Examination",
    caption: "Evidence imagery from Gotham's morgue investigation.",
  },
  "LOUNGE.IMG": {
    title: "Iceberg Lounge",
    caption: "The main floor of Falcone's underworld entertainment hub.",
  },
  "ZOO.IMG": {
    title: "Private Lounge",
    caption: "A private room used by Oz Cobb inside the club.",
  },
};
