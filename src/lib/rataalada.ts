export type PrizeStill = {
  kind?: "still";
  file: string;
  src: string;
  title: string;
  caption: string;
};

export type PrizeText = {
  kind: "text";
  file: string;
  title: string;
  body: string[];
};

export type Prize = PrizeStill | PrizeText;

export type Riddle = {
  id: string;
  prompt: string[];
  answers: string[];
  ok: string;
};

export type Test = {
  id: string;
  kicker: string;
  when: string;
  note: string;
  riddles: Riddle[];
  prize: string[];
  stills: PrizeStill[];
  texts?: PrizeText[];
};

export type Progress = {
  started: boolean;
  solved: string[];
  lounge: boolean;
  loading: boolean;
  seizure: boolean;
};

export type Beat =
  | { kind: "invite" }
  | { kind: "riddle"; test: Test; riddle: Riddle; index: number }
  | { kind: "lounge" }
  | { kind: "loading" }
  | { kind: "seizure" }
  | { kind: "done" };

export const RATA_INTRO =
  "2021 年底《新蝙蝠侠》首支预告片中隐藏了一串神秘密码，指向华纳官方设立的沉浸式解谜网站 rataalada.com（西班牙语意为「长翅膀的老鼠」，谐音 URL）。网站采用经典黑客命令行终端界面，影迷需逐一破解谜语人的密码挑战以解锁哥谭机密文件。本页面完整复刻了当年全套解谜挑战，并附带谜语人 26 个几何密码符号全对照表。";

export const COMMANDS: { cmd: string; hint: string }[] = [
  { cmd: "Y", hint: "开始挑战 / 确认" },
  { cmd: "HELP", hint: "查看指令帮助" },
  { cmd: "RIDDLE", hint: "重新显示当前谜题" },
  { cmd: "HINT", hint: "获取一条解谜线索" },
  { cmd: "LS", hint: "列出已解锁的机密文件" },
  { cmd: "OPEN <file>", hint: "查阅已解锁的图片文件" },
  { cmd: "CAT <file>", hint: "阅读已解锁的文本档案" },
  { cmd: "ABOUT", hint: "终端背景介绍" },
  { cmd: "CLEAR", hint: "清空当前终端屏幕" },
  { cmd: "RESET", hint: "重置挑战进度" },
  { cmd: "SPOILER", hint: "直接解锁全部档案" },
];

const still = (
  file: string,
  src: string,
  title: string,
  caption: string,
): PrizeStill => ({ file, src, title, caption });

const text = (file: string, title: string, body: string[]): PrizeText => ({
  kind: "text",
  file,
  title,
  body,
});

export const TESTS: Test[] = [
  {
    id: "w1",
    kicker: "TEST 01",
    when: "2021.12 · 预告片先导阶段",
    note: "预告片首波谜题，破解三道谜题即可解锁第一批哥谭目击档案。",
    riddles: [
      {
        id: "street",
        prompt: ["I CAN BE EASY OR A DEAD END.", "BE CAREFUL WHEN YOU CROSS ME."],
        answers: ["street", "astreet", "streets", "thestreet", "街道", "路", "马路"],
        ok: "STREET.",
      },
      {
        id: "law",
        prompt: ["THOSE WHO MAKE ME ARE LIKELY TO BREAK ME."],
        answers: ["law", "thelaw", "laws", "法律"],
        ok: "THE LAW.",
      },
      {
        id: "batman",
        prompt: ["WHAT IS BLACK AND BLUE AND DEAD ALL OVER?"],
        answers: ["batman", "thebatman", "蝙蝠侠"],
        ok: "BATMAN.",
      },
    ],
    prize: [
      "CONGRATULATIONS.",
      "HERE'S YOUR REWARD.",
      "UNLOCKED: GCPD SURVEILLANCE DOSSIER.",
      "TYPE OPEN STREET.IMG TO VIEW.",
    ],
    stills: [
      still("STREET.IMG", "/media/street.jpg", "雨中战衣", "哥谭警方监控记录：雨夜巡逻中的蝙蝠侠。"),
      still("GOTHAM.IMG", "/media/gotham.jpg", "俯瞰哥谭", "哥谭天际线俯瞰视角照片。"),
      still("SUBJECT.IMG", "/media/riddler.jpg", "出题嫌疑人", "嫌疑人档案：爱德华·纳什顿。"),
    ],
    texts: [
      text("CIPHER.TXT", "预告片解密密电", [
        "THE ORIGINAL JPG PATH WAS A CIPHER:",
        "/RPO/9-13_14-15-20_1-14.JPG",
        "A=1  B=2  ...  Z=26",
        "I M  TELLING  A N",
        "",
        "TRAILER CIPHER: YOU ARE EL RATA ALADA.",
        "RATA ALADA = WINGED RAT IN SPANISH.",
        "YOU ARE EL + RATAALADA.COM = URL.",
      ]),
    ],
  },
  {
    id: "w2",
    kicker: "TEST 02",
    when: "2022.01 · 第二阶段",
    note: "涉及冰山俱乐部与哥谭地下黑金交易的加密挑战。",
    riddles: [
      {
        id: "iceberg",
        prompt: [
          "IT SINKS AND SWIMS.",
          "IT CAN BE ROTTEN EVEN WHEN IT'S ALL DRESSED UP.",
        ],
        answers: ["iceberg", "aniceberg", "theiceberg", "icebergs", "冰山"],
        ok: "ICEBERG.",
      },
      {
        id: "secret",
        prompt: ["THE MORE I'M REVEALED, THE LESS I EXIST."],
        answers: ["secret", "asecret", "secrets", "thesecret", "秘密"],
        ok: "SECRET.",
      },
      {
        id: "bribe",
        prompt: ["PAYBACK COMES TO ALL WHO ACCEPT ONE."],
        answers: ["bribe", "abribe", "bribes", "thebribe", "贿赂", "受贿", "贿"],
        ok: "BRIBE.",
      },
    ],
    prize: ["FILES UNLOCKED.", "THE ICEBERG LOUNGE IS JUST THE BEGINNING."],
    stills: [
      still("FALCONE.IMG", "/media/still-falcone.jpg", "地下教父", "卡尔迈恩·法尔科内：冰山俱乐部的实际掌控者。"),
    ],
  },
  {
    id: "w3",
    kicker: "TEST 03",
    when: "2022.01 · 第三阶段",
    note: "针对哥谭特权阶层与黑金内幕的深度谜题。",
    riddles: [
      {
        id: "feelings",
        prompt: [
          "UNDERNEATH THE BRIDGE THE TARP HAS SPRUNG A LEAK.",
          "IT'S OKAY TO EAT FISH BECAUSE THEY DON'T HAVE ANY...",
          "WHAT?",
        ],
        answers: ["feelings", "feeling", "感情", "感觉"],
        ok: "FEELINGS.",
      },
      {
        id: "power",
        prompt: ["WHEN THE GAME IS ON, WHAT CORRUPTS ABSOLUTELY?"],
        answers: ["power", "powers", "权力", "权"],
        ok: "POWER.",
      },
      {
        id: "shadows",
        prompt: [
          "WITHOUT A DOUBT, GOTHAM'S ELITE LIVE HERE —",
          "BETWEEN LIGHT AND DARK.",
        ],
        answers: ["shadows", "shadow", "theshadows", "theshadow", "阴影", "暗处"],
        ok: "THE SHADOWS.",
      },
    ],
    prize: ["FILES UNLOCKED.", "POWER CORRUPTS. THE SHADOWS KEEP THE RECEIPT."],
    stills: [
      still("SHADOW.IMG", "/media/still-sunset.jpg", "光与暗之间", "落日余晖中哥谭城市的阴影天际线。"),
    ],
  },
  {
    id: "w4",
    kicker: "TEST 04",
    when: "2022.02 · 第四阶段",
    note: "探索谜语人命名起源与犯罪心路历程。",
    riddles: [
      {
        id: "darkness",
        prompt: [
          "WHEN I FALL, I RISE.",
          "THOUGH I AM NOT HUMAN, SOME SAY I HAVE A HEART.",
        ],
        answers: ["darkness", "thedarkness", "dark", "thedark", "黑暗"],
        ok: "DARKNESS.",
      },
      {
        id: "clue",
        prompt: ["GIVING YOU THIS WOULD BE GIVING YOU THE ANSWER."],
        answers: ["clue", "aclue", "clues", "theclue", "线索"],
        ok: "A CLUE.",
      },
      {
        id: "enigma",
        prompt: [
          "I'M GREEK. I'M LATIN. I'M 500 YEARS OLD.",
          "I SPEAK IN RIDDLES.",
          "WHAT AM I?",
        ],
        answers: ["enigma", "anenigma", "theenigma", "谜", "谜团"],
        ok: "ENIGMA.",
      },
    ],
    prize: ["FILES UNLOCKED.", "HE NAMED HIMSELF AFTER THE WORD."],
    stills: [
      still("LAIR.IMG", "/media/still-lair.jpg", "秘密巢穴", "谜语人公寓内部密密麻麻的政客调查剪报墙。"),
    ],
  },
  {
    id: "w5",
    kicker: "TEST 05",
    when: "2022.02 · 第五阶段",
    note: "针对韦恩家族继承人布鲁斯·韦恩的针对性谜题。",
    riddles: [
      {
        id: "puzzle",
        prompt: [
          "THE END IS IN THE MIDDLE, TWICE.",
          "TEST YOUR MIND AND TRY NOT TO GET BAFFLED BY ME.",
        ],
        answers: ["puzzle", "apuzzle", "puzzles", "thepuzzle", "谜题", "拼图"],
        ok: "A PUZZLE.",
      },
      {
        id: "bruce",
        prompt: ["A MAN WORTH BILLIONS, IN A MANOR OF SPEAKING."],
        answers: ["brucewayne", "bruce", "wayne", "布鲁斯", "韦恩", "布鲁斯韦恩"],
        ok: "BRUCE WAYNE.",
      },
      {
        id: "son",
        prompt: [
          "FROM BIRTH TO DEATH. FROM BOY TO MAN.",
          "ALL THINGS CHANGE, BUT THIS IS ONE THING HE WILL ALWAYS BE.",
        ],
        answers: ["son", "ason", "theson", "儿子"],
        ok: "A SON.",
      },
    ],
    prize: ["FILES UNLOCKED.", "THE ORPHAN AND THE HEIR."],
    stills: [
      still("WAYNE.IMG", "/media/still-bruce.jpg", "褪下头套", "布鲁斯·韦恩独处沉思的高清档案图。"),
      still("SON.IMG", "/media/portraits/thomas.jpg", "托马斯·韦恩", "托马斯·韦恩竞选演说档案。"),
      still("ARKHAM.IMG", "/media/portraits/martha.jpg", "玛莎·韦恩", "玛莎·韦恩（原姓阿卡姆）档案照。"),
    ],
  },
  {
    id: "w6",
    kicker: "TEST 06",
    when: "2022.03 · 首映公映周",
    note: "电影上映当周发布的重磅谜题，解锁托马斯·韦恩的「新生」慈善基金黑幕。",
    riddles: [
      {
        id: "renewal",
        prompt: ["WHAT WAS NEW, IS NEW AGAIN.", "REBIRTH.", "RESTORATION.", "REFORMATION."],
        answers: ["renewal", "新生", "复兴"],
        ok: "RENEWAL.",
      },
      {
        id: "mask",
        prompt: ["FEAR HE WHO HIDES BEHIND ONE."],
        answers: ["mask", "amask", "masks", "themask", "面具"],
        ok: "A MASK.",
      },
      {
        id: "confusion",
        prompt: [
          "I AM FIRST A FRAUD OR A TRICK.",
          "OR PERHAPS A BLEND OF THE TWO.",
          "THAT'S UP TO YOUR MISINTERPRETATION.",
        ],
        answers: ["confusion", "困惑", "混淆"],
        ok: "CONFUSION.",
      },
    ],
    prize: [
      "FILES UNLOCKED.",
      "ARCHIVE ACCESS GRANTED: WHAT_AM_I",
      "KEY DECRYPTED: PROMISE",
    ],
    stills: [
      still("LEDGER.IMG", "/media/ledger.jpg", "黑金账簿", "第一部核心物证：被审计拆解的洗钱账本。"),
      still("MANOR.IMG", "/media/orphanage.jpg", "哥谭孤儿院", "旧韦恩庄园改建的哥谭孤儿院外景。"),
    ],
  },
  {
    id: "w7",
    kicker: "TEST 07",
    when: "2022.03 · 阿卡姆彩蛋阶段",
    note: "直通阿卡姆疯人院高戒备病房的终极谜题挑战。",
    riddles: [
      {
        id: "ha",
        prompt: [
          "IT'S NOT A JOKE, BUT SOMETIMES YOU NEED TO SHOUT TWICE TO REALLY MEAN IT.",
        ],
        answers: ["ha", "haha", "hahaha", "哈", "哈哈"],
        ok: "HA.",
      },
      {
        id: "punchline",
        prompt: ["ONCE YOU'VE BEEN SET UP, IT HITS AT THE END.", "STRAIGHT UP."],
        answers: ["punchline", "thepunchline", "apunchline", "笑点", "包袱"],
        ok: "PUNCHLINE.",
      },
      {
        id: "joker",
        prompt: [["TO WIT: A WILDCARD IN THE TRUEST SENSE."][0]],
        answers: ["joker", "thejoker", "小丑"],
        ok: "JOKER.",
      },
    ],
    prize: [
      "ALL FILES UNLOCKED.",
      "INTERROGATION ARCHIVE GRANTED.",
      "EVERY ENDING IS A NEW BEGINNING.",
    ],
    stills: [
      still("INMATE.IMG", "/media/portraits/joker-v2.jpg", "神秘囚徒", "阿卡姆疯人院邻近病房的神秘面孔。"),
      still("CELL.IMG", "/media/still-morgue.jpg", "法医勘验", "第一部法医停尸间现场取证档案。"),
    ],
    texts: [
      text("ARKHAM.TXT", "阿卡姆机密档案", [
        "ARKHAM STATE HOSPITAL.",
        "HIGH SECURITY CELL BLOCK.",
        "A CONVERSATION ACROSS THE WALL.",
        "THE TRUTH AWAITS IN THE DARK.",
      ]),
    ],
  },
];

export const LOUNGE_STILLS: PrizeStill[] = [
  still("LOUNGE.IMG", "/media/lounge.jpg", "冰山俱乐部大厅", "法尔科内家族的核心娱乐据点。"),
  still("ZOO.IMG", "/media/peng-lounge2.jpg", "俱乐部包厢", "奥兹·科布查验账目的秘密会客室。"),
];

export const LOUNGE_TEXT = text("LOUNGE.TXT", "冰山俱乐部调查报告", [
  "HAVE YOU EVER BEEN TO THE ICEBERG LOUNGE?",
  "A PLACE WHERE LIGHT MEETS DARKNESS.",
  "OSWALD COBB RUNS THE FLOOR NOW.",
  "THE KINGDOM HAS CHANGED HANDS.",
]);

export const LOADING_TEXT = text("WHAT_AM_I.TXT", "托马斯·韦恩竞选录像", [
  "ARCHIVE LOG: WHAT_AM_I",
  "DECRYPTION KEY: PROMISE",
  "",
  "CONTENTS: THOMAS WAYNE CAMPAIGN RECORD.",
  "THE PROMISE OF RENEWAL.",
  "A CITY'S SHADOW BEHIND THE LIGHT.",
]);

export const PROMISE_TEXT = text("PROMISE.TXT", "解密证书", [
  "STAY VIGILANT.",
  "THE CIPHER HAS BEEN DECRYPTED.",
  "TRUTH PREVAILS IN THE SHADOWS.",
]);

export const GCPD_TEXT = text("GCPD.TXT", "网络查封通告", [
  "GOTHAM CITY POLICE DEPARTMENT",
  "CYBERCRIME & FORENSIC DIVISION",
  "",
  "OPERATION COMPLETED.",
  "SERVER LOGS SECURED.",
]);

export const GOODBYE_TEXT = text("GOODBYE.TXT", "终局留言", [
  "YOU SOLVED ALL THE RIDDLES.",
  "",
  "SEE YOU IN 2028 <?>",
]);

export const BOOT = [
  "RATAALADA.COM TERMINAL",
  "SYSTEM STATUS: ONLINE",
  "IDENTITY: ANONYMOUS",
  "READY FOR INPUT.",
  "",
];

export const INVITE = [
  "LET'S PLAY A GAME.",
  "JUST ME AND YOU.",
  "",
  "ARE YOU READY TO PLAY? (Y/N)",
];

export const ABOUT = [
  "RATA ALADA = 'WINGED RAT' IN SPANISH.",
  "OFFICIAL ARG PROMOTION ARCHIVE (2021–2022).",
  "ALL 7 TEST PHASES RESTORED.",
  "SOLVE RIDDLES TO UNLOCK HIDDEN STILLS & LOGS.",
];

export const WRONG = [
  "INCORRECT.",
  "THINK DEEPER.",
  "LOOK CLOSER AT THE EVIDENCE.",
  "TRY AGAIN.",
];

export const BETWEEN_TESTS = [
  "PHASE COMPLETED.",
  "DECRYPTING NEXT CLUSTER...",
  "STAY VIGILANT.",
  "",
  "NEW RIDDLES READY.",
];

const STORAGE_KEY = "sv-rataalada-v2";

export const EMPTY_PROGRESS: Progress = {
  started: false,
  solved: [],
  lounge: false,
  loading: false,
  seizure: false,
};

export function normalizeAnswer(raw: string) {
  return raw.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

export function testComplete(test: Test, solved: string[]) {
  return test.riddles.every((riddle) => solved.includes(riddle.id));
}

export function nextBeat(progress: Progress): Beat {
  if (!progress.started) return { kind: "invite" };

  for (let i = 0; i < TESTS.length; i++) {
    const test = TESTS[i];
    if (!test) continue;
    const unsolved = test.riddles.find((riddle) => !progress.solved.includes(riddle.id));
    if (unsolved) {
      if (i >= 1 && !progress.lounge) return { kind: "lounge" };
      if (i >= 6 && !progress.loading) return { kind: "loading" };
      return {
        kind: "riddle",
        test,
        riddle: unsolved,
        index: test.riddles.indexOf(unsolved),
      };
    }
    if (i === 0 && !progress.lounge) return { kind: "lounge" };
    if (i === 5 && !progress.loading) return { kind: "loading" };
  }

  if (!progress.seizure) return { kind: "seizure" };
  return { kind: "done" };
}

export function allPrizes(progress: Progress): Prize[] {
  const out: Prize[] = [];
  for (const test of TESTS) {
    if (!testComplete(test, progress.solved)) continue;
    out.push(...test.stills);
    if (test.texts) out.push(...test.texts);
  }
  if (progress.lounge) {
    out.push(...LOUNGE_STILLS, LOUNGE_TEXT);
  }
  if (progress.loading) {
    out.push(LOADING_TEXT, PROMISE_TEXT);
  }
  if (progress.seizure) {
    out.push(GCPD_TEXT, GOODBYE_TEXT);
  }
  return out;
}

export function stillsFor(progress: Progress): PrizeStill[] {
  return allPrizes(progress).filter((item): item is PrizeStill => item.kind !== "text");
}

export function textsFor(progress: Progress): PrizeText[] {
  return allPrizes(progress).filter((item): item is PrizeText => item.kind === "text");
}

export function findPrize(progress: Progress, name: string): Prize | undefined {
  const upper = name.trim().toUpperCase();
  return allPrizes(progress).find((item) => item.file === upper);
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      started: Boolean(parsed.started),
      solved: Array.isArray(parsed.solved)
        ? parsed.solved.filter((id): id is string => typeof id === "string")
        : [],
      lounge: Boolean(parsed.lounge),
      loading: Boolean(parsed.loading),
      seizure: Boolean(parsed.seizure),
    };
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export function saveProgress(progress: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* ignore quota */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function allSolvedProgress(): Progress {
  return {
    started: true,
    solved: TESTS.flatMap((test) => test.riddles.map((riddle) => riddle.id)),
    lounge: true,
    loading: true,
    seizure: true,
  };
}

export function isYes(raw: string) {
  const v = normalizeAnswer(raw);
  return v === "y" || v === "yes" || v === "是" || v === "好" || v === "开始";
}

export function isNo(raw: string) {
  const v = normalizeAnswer(raw);
  return v === "n" || v === "no" || v === "否" || v === "不";
}

export function hintFor(id: string) {
  switch (id) {
    case "street":
      return "YOU CROSS IT. SOMETIMES IT CROSSES YOU.";
    case "law":
      return "WRITTEN BY PEOPLE WHO DO NOT KEEP IT.";
    case "batman":
      return "BLACK. BRUISED. NOT A JOKE ABOUT NEWSPAPERS.";
    case "iceberg":
      return "A CLUB. A FLOATING LIE. OSWALD'S FLOOR.";
    case "secret":
      return "ONCE EVERYBODY KNOWS IT, IT DIES.";
    case "bribe":
      return "MONEY THAT BUYS A FAVOR AND A TARGET.";
    case "feelings":
      return "NIRVANA WROTE THE FIRST TWO LINES. THE FISH HAVE NONE.";
    case "power":
      return "ABSOLUTELY.";
    case "shadows":
      return "NOT THE LIGHT. NOT THE DARK. THE PLACE BETWEEN.";
    case "darkness":
      return "NIGHT FALLS. THEN IT RISES AGAIN.";
    case "clue":
      return "THE THING I AM NOT GOING TO GIVE YOU.";
    case "enigma":
      return "A MACHINE. A WORD. A MAN WHO WEARS GLASSES.";
    case "puzzle":
      return "Z AND Z SIT IN THE MIDDLE OF THE WORD.";
    case "bruce":
      return "MANOR. MANNER. BILLIONS. A BOY IN A CAVE.";
    case "son":
      return "EVEN AFTER THE ALLEY, THIS IS STILL TRUE.";
    case "renewal":
      return "A FUND. A LIE. A WORD ON A CAMPAIGN SIGN.";
    case "mask":
      return "MORE THAN ONE PERSON IN THIS CITY WEARS ONE.";
    case "confusion":
      return "CON PLUS FUSION. A TRICK AND A FRAUD.";
    case "ha":
      return "SAY IT TWICE. NOT THE WHOLE LAUGH.";
    case "punchline":
      return "AFTER THE SETUP. THE HIT.";
    case "joker":
      return "ARKHAM. THE OTHER CELL.";
    default:
      return "LOOK AGAIN.";
  }
}

export type CipherEntry = {
  letter: string;
  symbol: string;
  shapeName: string;
};

export const RIDDLER_CIPHER_ALPHABET: CipherEntry[] = [
  { letter: "A", symbol: "⬡", shapeName: "六边形" },
  { letter: "B", symbol: "⊞", shapeName: "带十字方块" },
  { letter: "C", symbol: "▲", shapeName: "实心三角" },
  { letter: "D", symbol: "◬", shapeName: "带点三角" },
  { letter: "E", symbol: "⬟", shapeName: "五边形" },
  { letter: "F", symbol: "◪", shapeName: "半阴影方块" },
  { letter: "G", symbol: "◈", shapeName: "空心菱形" },
  { letter: "H", symbol: "⬗", shapeName: "实心菱形" },
  { letter: "I", symbol: "◩", shapeName: "对角方块" },
  { letter: "J", symbol: "⬢", shapeName: "实心六角" },
  { letter: "K", symbol: "▽", shapeName: "倒三角" },
  { letter: "L", symbol: "◸", shapeName: "左上直角" },
  { letter: "M", symbol: "◹", shapeName: "右上直角" },
  { letter: "N", symbol: "◺", shapeName: "左下直角" },
  { letter: "O", symbol: "◿", shapeName: "右下直角" },
  { letter: "P", symbol: "⬠", shapeName: "空心五边形" },
  { letter: "Q", symbol: "⬘", shapeName: "右阴影菱形" },
  { letter: "R", symbol: "⬙", shapeName: "左阴影菱形" },
  { letter: "S", symbol: "◭", shapeName: "垂直半分三角" },
  { letter: "T", symbol: "◮", shapeName: "水平半分三角" },
  { letter: "U", symbol: "⬔", shapeName: "左半分方块" },
  { letter: "V", symbol: "⬕", shapeName: "右半分方块" },
  { letter: "W", symbol: "⬖", shapeName: "上半分方块" },
  { letter: "X", symbol: "⬗", shapeName: "下半分方块" },
  { letter: "Y", symbol: "⬡", shapeName: "内圈六角" },
  { letter: "Z", symbol: "⬢", shapeName: "外圈六角" },
];

export type DecodedMessage = {
  id: string;
  source: string;
  sourceEn: string;
  cipherNote: string;
  decodedEn: string;
  decodedZh: string;
};

export const DECODED_MESSAGES: DecodedMessage[] = [
  {
    id: "card-01",
    source: "市长案发现场首封贺卡",
    sourceEn: "Mayor Mitchell Crime Scene Card",
    cipherNote: "手写几何符号代换加密",
    decodedEn: "HE LIES STILL",
    decodedZh: "“他依然躺在那里 / 他依旧在撒谎”（双关：Lies Still 既指尸体静止，亦指谎言未休）",
  },
  {
    id: "card-02",
    source: "局长萨维奇案发现场信函",
    sourceEn: "Commissioner Savage Crime Scene Card",
    cipherNote: "手写几何符号代换加密",
    decodedEn: "YOU ARE A PART OF THIS TOO",
    decodedZh: "“你也是这套腐败体制的一份子”",
  },
  {
    id: "card-03",
    source: "托马斯·韦恩竞选录像暗码",
    sourceEn: "Thomas Wayne Video Overlay Cipher",
    cipherNote: "暗网视频末尾逐帧闪烁代码",
    decodedEn: "THE SINS OF MY FATHER",
    decodedZh: "“我父亲犯下的罪孽”",
  },
  {
    id: "trailer-cipher",
    source: "预告片首发暗网网址代码",
    sourceEn: "Main Teaser Trailer Post-Credit Cipher",
    cipherNote: "数字序列代换与西班牙语双关",
    decodedEn: "YOU ARE EL RATA ALADA -> URL: RATAALADA.COM",
    decodedZh: "“你是长翅膀的老鼠”（音译：You Are El = URL，指向解谜网站 rataalada.com）",
  },
];
