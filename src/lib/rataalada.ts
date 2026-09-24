import { FILM } from "@/data/film";

export type PrizeStill = {
  kind?: "still";
  file: string;
  src: string;
  title: string;
  caption: string;
  provenance?: "historical" | "extended";
  originBadgeEn?: string;
  originBadgeZh?: string;
};

export type PrizeText = {
  kind: "text";
  file: string;
  title: string;
  body: string[];
  provenance?: "historical" | "extended";
  originBadgeEn?: string;
  originBadgeZh?: string;
};

export type Prize = PrizeStill | PrizeText;

export type RiddleOption = {
  key: "A" | "B" | "C" | "D";
  labelEn: string;
  labelZh: string;
  value: string;
};

export type Riddle = {
  id: string;
  prompt: string[];
  answers: string[];
  ok: string;
  options?: RiddleOption[];
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
  provenance: "historical" | "extended";
  originBadgeEn: string;
  originBadgeZh: string;
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
  `2021 年底，《新蝙蝠侠》官方病毒营销通过密码与宣传物料将影迷引向沉浸式解谜网站 rataalada.com（西班牙语意为「长翅膀的老鼠」，并在影片中形成 URL 谐音梗）。网站采用复古 CRT 终端式界面，影迷通过破解谜题逐步解锁哥谭档案。本页面依据公开存档复原 2021–2022 官方核心互动阶段（第 1、2、6、7 阶段与 GCPD 查封通告），并由本站补充第 3–5 阶段连贯谜题与轻量勘验证物，终局融入献给《新蝙蝠侠 2》（${FILM.releaseLabel}）的影迷致敬彩蛋。`;

export const COMMANDS: { cmd: string; hint: string }[] = [
  { cmd: "Y", hint: "开始挑战 / 确认" },
  { cmd: "HELP", hint: "查看指令帮助" },
  { cmd: "RIDDLE", hint: "重新显示当前谜题" },
  { cmd: "HINT", hint: "获取一条解谜线索" },
  { cmd: "LS", hint: "列出已解锁的机密文件" },
  { cmd: "OPEN <file>", hint: "查阅已解锁的图片文件" },
  { cmd: "CAT <file>", hint: "阅读已解锁的文本档案" },
  { cmd: "TIMELINE", hint: "查阅 2021-2022 真实 ARG 演进史" },
  { cmd: "ABOUT", hint: "终端背景与史料出处" },
  { cmd: "CLEAR", hint: "清空当前终端屏幕" },
  { cmd: "RESET", hint: "重置挑战进度" },
  { cmd: "SPOILER", hint: "直接解锁全部档案" },
];

const still = (
  file: string,
  src: string,
  title: string,
  caption: string,
  provenance: "historical" | "extended" = "extended",
  originBadgeZh?: string,
  originBadgeEn?: string,
): PrizeStill => ({
  file,
  src,
  title,
  caption,
  provenance,
  originBadgeZh,
  originBadgeEn,
});

const text = (
  file: string,
  title: string,
  body: string[],
  provenance: "historical" | "extended" = "extended",
  originBadgeZh?: string,
  originBadgeEn?: string,
): PrizeText => ({
  kind: "text",
  file,
  title,
  body,
  provenance,
  originBadgeZh,
  originBadgeEn,
});

export const TESTS: Test[] = [
  {
    id: "w1",
    kicker: "TEST 01",
    when: "2021.12 · 预告片先导阶段",
    note: "2021 年底预告片首波 3 道官方谜题，破解后解锁第一批哥谭监控与代换密码。",
    provenance: "historical",
    originBadgeEn: "Official 2021 ARG",
    originBadgeZh: "2021 官方历史原版",
    riddles: [
      {
        id: "street",
        prompt: ["I CAN BE EASY OR A DEAD END.", "BE CAREFUL WHEN YOU CROSS ME."],
        answers: ["street", "astreet", "streets", "thestreet", "街道", "路", "马路"],
        ok: "STREET.",
        options: [
          { key: "A", labelEn: "Crime Alley", labelZh: "犯罪小巷", value: "alley" },
          { key: "B", labelEn: "Street", labelZh: "街道 / 马路", value: "street" },
          { key: "C", labelEn: "Gotham Bridge", labelZh: "哥谭大桥", value: "bridge" },
          { key: "D", labelEn: "The Shadows", labelZh: "城市阴影", value: "shadows" },
        ],
      },
      {
        id: "law",
        prompt: ["THOSE WHO MAKE ME ARE LIKELY TO BREAK ME."],
        answers: ["law", "thelaw", "laws", "法律"],
        ok: "THE LAW.",
        options: [
          { key: "A", labelEn: "A Promise", labelZh: "政客诺言", value: "promise" },
          { key: "B", labelEn: "Corruption", labelZh: "警队腐败", value: "corruption" },
          { key: "C", labelEn: "The Law", labelZh: "法律", value: "the law" },
          { key: "D", labelEn: "Order", labelZh: "哥谭秩序", value: "order" },
        ],
      },
      {
        id: "batman",
        prompt: ["WHAT IS BLACK AND BLUE AND DEAD ALL OVER?"],
        answers: ["batman", "thebatman", "蝙蝠侠"],
        ok: "BATMAN.",
        options: [
          { key: "A", labelEn: "The Batman", labelZh: "蝙蝠侠", value: "batman" },
          { key: "B", labelEn: "A Corpse", labelZh: "受害尸体", value: "corpse" },
          { key: "C", labelEn: "The Night", labelZh: "暗夜", value: "night" },
          { key: "D", labelEn: "Vigilante", labelZh: "私刑者", value: "vigilante" },
        ],
      },
    ],
    prize: [
      "CONGRATULATIONS.",
      "HERE'S YOUR REWARD.",
      "UNLOCKED: GCPD SUSPECT SKETCH DOSSIER.",
      "TYPE OPEN SKETCH.IMG TO VIEW.",
    ],
    stills: [
      still(
        "SKETCH.IMG",
        "/media/gcpd-sketch.jpg",
        "警方通缉素描",
        "2021.12 官方原版首发奖励：哥谭警局目击者证供蝙蝠侠通缉素描三连图（原文件名 9-13_14-15-20_1-14.jpg）。",
        "historical",
        "2021 官方原版",
        "Official 2021 ARG",
      ),
      still("GOTHAM.IMG", "/media/gotham.jpg", "俯瞰哥谭", "哥谭天际线俯瞰视角照片。", "extended", "本站剧照适配", "Archive Adaptation"),
      still("SUBJECT.IMG", "/media/riddler.jpg", "出题嫌疑人", "嫌疑人档案：爱德华·纳什顿。", "extended", "本站剧照适配", "Archive Adaptation"),
    ],
    texts: [
      text(
        "CIPHER.TXT",
        "预告片解密密电",
        [
          "THE ORIGINAL JPG PATH WAS A CIPHER:",
          "/RPO/9-13_14-15-20_1-14.JPG",
          "A=1  B=2  ...  Z=26",
          "I M  TELLING  A N",
          "",
          "TRAILER CIPHER: YOU ARE EL RATA ALADA.",
          "RATA ALADA = WINGED RAT IN SPANISH.",
          "YOU ARE EL + RATAALADA.COM = URL.",
        ],
        "historical",
        "2021 官方原版",
        "Official 2021 ARG",
      ),
    ],
  },
  {
    id: "w2",
    kicker: "TEST 02",
    when: "2022.01 · 第二阶段",
    note: "涉及冰山俱乐部与哥谭地下黑金交易的官方加密挑战。",
    provenance: "historical",
    originBadgeEn: "Official 2022 ARG",
    originBadgeZh: "2022 官方历史原版",
    riddles: [
      {
        id: "iceberg",
        prompt: [
          "IT SINKS AND SWIMS.",
          "IT CAN BE ROTTEN EVEN WHEN IT'S ALL DRESSED UP.",
        ],
        answers: ["iceberg", "aniceberg", "theiceberg", "icebergs", "冰山"],
        ok: "ICEBERG.",
        options: [
          { key: "A", labelEn: "Sunken Ship", labelZh: "沉船游艇", value: "ship" },
          { key: "B", labelEn: "Iceberg", labelZh: "冰山 / 冰山俱乐部", value: "iceberg" },
          { key: "C", labelEn: "Dirty Money", labelZh: "地下黑钱", value: "money" },
          { key: "D", labelEn: "Diamond", labelZh: "走私钻石", value: "diamond" },
        ],
      },
      {
        id: "secret",
        prompt: ["THE MORE I'M REVEALED, THE LESS I EXIST."],
        answers: ["secret", "asecret", "secrets", "thesecret", "秘密"],
        ok: "SECRET.",
        options: [
          { key: "A", labelEn: "A Secret", labelZh: "秘密", value: "secret" },
          { key: "B", labelEn: "A Lie", labelZh: "谎言", value: "lie" },
          { key: "C", labelEn: "Silence", labelZh: "沉默", value: "silence" },
          { key: "D", labelEn: "Darkness", labelZh: "暗夜", value: "darkness" },
        ],
      },
      {
        id: "bribe",
        prompt: ["PAYBACK COMES TO ALL WHO ACCEPT ONE."],
        answers: ["bribe", "abribe", "bribes", "thebribe", "贿赂", "受贿", "贿"],
        ok: "BRIBE.",
        options: [
          { key: "A", labelEn: "Gang Contract", labelZh: "黑帮契约", value: "contract" },
          { key: "B", labelEn: "A Bribe", labelZh: "贿赂 / 赃款", value: "bribe" },
          { key: "C", labelEn: "Campaign Gift", labelZh: "竞选献金", value: "gift" },
          { key: "D", labelEn: "Betrayal", labelZh: "背叛", value: "betrayal" },
        ],
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
    note: "基于涅槃乐队插曲《Something in the Way》与政商权钱交易暗线构建的本站连贯过渡题。",
    provenance: "extended",
    originBadgeEn: "Archive Extension",
    originBadgeZh: "本站剧作暗线扩展",
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
        options: [
          { key: "A", labelEn: "Tears", labelZh: "眼泪", value: "tears" },
          { key: "B", labelEn: "Voices", labelZh: "声音", value: "voices" },
          { key: "C", labelEn: "Feelings", labelZh: "感情 / 感觉", value: "feelings" },
          { key: "D", labelEn: "Souls", labelZh: "灵魂", value: "souls" },
        ],
      },
      {
        id: "power",
        prompt: ["WHEN THE GAME IS ON, WHAT CORRUPTS ABSOLUTELY?"],
        answers: ["power", "powers", "权力", "权"],
        ok: "POWER.",
        options: [
          { key: "A", labelEn: "Greed", labelZh: "贪婪", value: "greed" },
          { key: "B", labelEn: "Power", labelZh: "权力", value: "power" },
          { key: "C", labelEn: "Drops Drug", labelZh: "滴眼剂毒品", value: "drops" },
          { key: "D", labelEn: "Gold", labelZh: "黄金", value: "gold" },
        ],
      },
      {
        id: "shadows",
        prompt: [
          "WITHOUT A DOUBT, GOTHAM'S ELITE LIVE HERE —",
          "BETWEEN LIGHT AND DARK.",
        ],
        answers: ["shadows", "shadow", "theshadows", "theshadow", "阴影", "暗处"],
        ok: "THE SHADOWS.",
        options: [
          { key: "A", labelEn: "Penthouse", labelZh: "顶层豪宅", value: "penthouse" },
          { key: "B", labelEn: "Sewers", labelZh: "地下暗渠", value: "sewers" },
          { key: "C", labelEn: "The Shadows", labelZh: "阴影之中", value: "the shadows" },
          { key: "D", labelEn: "City Hall", labelZh: "市政大楼", value: "cityhall" },
        ],
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
    note: "基于谜语人命名起源、拉丁语源与孤儿院心路历程构建的本站连贯过渡题。",
    provenance: "extended",
    originBadgeEn: "Archive Extension",
    originBadgeZh: "本站剧作暗线扩展",
    riddles: [
      {
        id: "darkness",
        prompt: [
          "WHEN I FALL, I RISE.",
          "THOUGH I AM NOT HUMAN, SOME SAY I HAVE A HEART.",
        ],
        answers: ["darkness", "thedarkness", "dark", "thedark", "黑暗"],
        ok: "DARKNESS.",
        options: [
          { key: "A", labelEn: "Darkness", labelZh: "黑暗", value: "darkness" },
          { key: "B", labelEn: "Fear", labelZh: "恐惧", value: "fear" },
          { key: "C", labelEn: "Gotham Empire", labelZh: "哥谭帝国", value: "empire" },
          { key: "D", labelEn: "Midnight", labelZh: "午夜钟声", value: "midnight" },
        ],
      },
      {
        id: "clue",
        prompt: ["GIVING YOU THIS WOULD BE GIVING YOU THE ANSWER."],
        answers: ["clue", "aclue", "clues", "theclue", "线索"],
        ok: "A CLUE.",
        options: [
          { key: "A", labelEn: "The Key", labelZh: "钥匙", value: "key" },
          { key: "B", labelEn: "A Clue", labelZh: "线索", value: "clue" },
          { key: "C", labelEn: "The Answer", labelZh: "破案答案", value: "answer" },
          { key: "D", labelEn: "Evidence", labelZh: "现场物证", value: "evidence" },
        ],
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
        options: [
          { key: "A", labelEn: "The Sphinx", labelZh: "斯芬克斯", value: "sphinx" },
          { key: "B", labelEn: "The Oracle", labelZh: "先知神谕", value: "oracle" },
          { key: "C", labelEn: "A Cipher", labelZh: "密码暗号", value: "cipher" },
          { key: "D", labelEn: "Enigma", labelZh: "谜团 / 谜语人", value: "enigma" },
        ],
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
    note: "基于阿卡姆家族与韦恩家族双孤儿阶级对照暗线构建的本站连贯过渡题。",
    provenance: "extended",
    originBadgeEn: "Archive Extension",
    originBadgeZh: "本站剧作暗线扩展",
    riddles: [
      {
        id: "puzzle",
        prompt: [
          "THE END IS IN THE MIDDLE, TWICE.",
          "TEST YOUR MIND AND TRY NOT TO GET BAFFLED BY ME.",
        ],
        answers: ["puzzle", "apuzzle", "puzzles", "thepuzzle", "谜题", "拼图"],
        ok: "A PUZZLE.",
        options: [
          { key: "A", labelEn: "A Puzzle", labelZh: "谜题 / 拼图", value: "puzzle" },
          { key: "B", labelEn: "A Maze", labelZh: "迷宫", value: "maze" },
          { key: "C", labelEn: "A Mirror", labelZh: "双面镜像", value: "mirror" },
          { key: "D", labelEn: "Labyrinth", labelZh: "地下暗道", value: "labyrinth" },
        ],
      },
      {
        id: "bruce",
        prompt: ["A MAN WORTH BILLIONS, IN A MANOR OF SPEAKING."],
        answers: ["brucewayne", "bruce", "wayne", "布鲁斯", "韦恩", "布鲁斯韦恩"],
        ok: "BRUCE WAYNE.",
        options: [
          { key: "A", labelEn: "Carmine Falcone", labelZh: "卡尔迈恩·法尔科内", value: "falcone" },
          { key: "B", labelEn: "Bruce Wayne", labelZh: "布鲁斯·韦恩", value: "bruce wayne" },
          { key: "C", labelEn: "Thomas Wayne", labelZh: "托马斯·韦恩", value: "thomas wayne" },
          { key: "D", labelEn: "Don Mitchell", labelZh: "市长唐·米切尔", value: "mitchell" },
        ],
      },
      {
        id: "son",
        prompt: [
          "FROM BIRTH TO DEATH. FROM BOY TO MAN.",
          "ALL THINGS CHANGE, BUT THIS IS ONE THING HE WILL ALWAYS BE.",
        ],
        answers: ["son", "ason", "theson", "儿子"],
        ok: "A SON.",
        options: [
          { key: "A", labelEn: "An Orphan", labelZh: "孤儿", value: "orphan" },
          { key: "B", labelEn: "An Heir", labelZh: "继承人", value: "heir" },
          { key: "C", labelEn: "A Son", labelZh: "儿子", value: "son" },
          { key: "D", labelEn: "A Brother", labelZh: "手足", value: "brother" },
        ],
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
    note: "电影上映当周发布的官方重磅谜题，解锁托马斯·韦恩「新生」慈善基金黑幕下载包（WHAT_AM_I.ZIP）。",
    provenance: "historical",
    originBadgeEn: "Official 2022 ARG",
    originBadgeZh: "2022 官方历史原版",
    riddles: [
      {
        id: "renewal",
        prompt: ["WHAT WAS NEW, IS NEW AGAIN.", "REBIRTH.", "RESTORATION.", "REFORMATION."],
        answers: ["renewal", "新生", "复兴"],
        ok: "RENEWAL.",
        options: [
          { key: "A", labelEn: "Vengeance", labelZh: "复仇誓约", value: "vengeance" },
          { key: "B", labelEn: "Renewal", labelZh: "「新生」救赎基金", value: "renewal" },
          { key: "C", labelEn: "Justice", labelZh: "哥谭正义", value: "justice" },
          { key: "D", labelEn: "Revolution", labelZh: "街头革命", value: "revolution" },
        ],
      },
      {
        id: "mask",
        prompt: ["FEAR HE WHO HIDES BEHIND ONE."],
        answers: ["mask", "amask", "masks", "themask", "面具"],
        ok: "A MASK.",
        options: [
          { key: "A", labelEn: "A Mask", labelZh: "面具", value: "mask" },
          { key: "B", labelEn: "Tactical Armor", labelZh: "防弹战甲", value: "armor" },
          { key: "C", labelEn: "False Identity", labelZh: "伪装身份", value: "identity" },
          { key: "D", labelEn: "A Cloak", labelZh: "黑色披风", value: "cloak" },
        ],
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
        options: [
          { key: "A", labelEn: "Conspiracy", labelZh: "政商阴谋", value: "conspiracy" },
          { key: "B", labelEn: "Illusion", labelZh: "虚假幻觉", value: "illusion" },
          { key: "C", labelEn: "Confusion", labelZh: "困惑 / 混淆", value: "confusion" },
          { key: "D", labelEn: "Gotham Chaos", labelZh: "全城暴动", value: "chaos" },
        ],
      },
    ],
    prize: [
      "FILES UNLOCKED.",
      "ARCHIVE ACCESS GRANTED: WHAT_AM_I",
      "KEY DECRYPTED: PROMISE",
    ],
    stills: [
      still("LEDGER.IMG", "/media/ledger.jpg", "黑金账簿", "第一部核心物证：被审计拆解的洗钱账本。"),
      still("MANOR.IMG", "/media/places/orphanage.jpg", "哥谭孤儿院", "旧韦恩庄园改建的哥谭孤儿院礼堂与调查现场。"),
    ],
  },
  {
    id: "w7",
    kicker: "TEST 07",
    when: "2022.03 · 阿卡姆彩蛋阶段",
    note: "直通阿卡姆疯人院高戒备病房的官方终极谜题，当年通关后解锁 5 分钟小丑删减片段。",
    provenance: "historical",
    originBadgeEn: "Official 2022 ARG",
    originBadgeZh: "2022 官方历史原版",
    riddles: [
      {
        id: "ha",
        prompt: [
          "IT'S NOT A JOKE, BUT SOMETIMES YOU NEED TO SHOUT TWICE TO REALLY MEAN IT.",
        ],
        answers: ["ha", "haha", "hahaha", "哈", "哈哈"],
        ok: "HA.",
        options: [
          { key: "A", labelEn: "Boom", labelZh: "炸堤爆鸣", value: "boom" },
          { key: "B", labelEn: "Ha (Ha Ha)", labelZh: "哈（哈哈）", value: "haha" },
          { key: "C", labelEn: "No", labelZh: "绝望哀求", value: "no" },
          { key: "D", labelEn: "Help", labelZh: "求救呼喊", value: "help" },
        ],
      },
      {
        id: "punchline",
        prompt: ["ONCE YOU'VE BEEN SET UP, IT HITS AT THE END.", "STRAIGHT UP."],
        answers: ["punchline", "thepunchline", "apunchline", "笑点", "包袱"],
        ok: "PUNCHLINE.",
        options: [
          { key: "A", labelEn: "A Bullet", labelZh: "致命子弹", value: "bullet" },
          { key: "B", labelEn: "The Verdict", labelZh: "终审判决", value: "verdict" },
          { key: "C", labelEn: "The Punchline", labelZh: "笑点 / 妙语包袱", value: "punchline" },
          { key: "D", labelEn: "Execution", labelZh: "处刑机关", value: "execution" },
        ],
      },
      {
        id: "joker",
        prompt: [["TO WIT: A WILDCARD IN THE TRUEST SENSE."][0]],
        answers: ["joker", "thejoker", "小丑"],
        ok: "JOKER.",
        options: [
          { key: "A", labelEn: "The Penguin", labelZh: "企鹅人", value: "penguin" },
          { key: "B", labelEn: "Two-Face", labelZh: "双面人", value: "twoface" },
          { key: "C", labelEn: "The Scarecrow", labelZh: "稻草人", value: "scarecrow" },
          { key: "D", labelEn: "The Joker", labelZh: "小丑 / 狂笑王牌", value: "joker" },
        ],
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

export const GCPD_TEXT = text(
  "GCPD.TXT",
  "网络查封通告",
  [
    "THIS DOMAIN HAS BEEN SEIZED",
    "",
    "THE DOMAIN FOR RATAALADA.COM AND YOUAREELRATAALADA.COM HAS BEEN SEIZED",
    "BY THE GOTHAM POLICE DEPARTMENT PURSUANT TO A SEIZURE WARRANT ISSUED",
    "BY THE GOTHAM CITY DISTRICT COURT UNDER THE AUTHORITY OF 18 U.S.C.",
    "§§ 981, 982, INTER ALIA, AS PART OF COORDINATED LAW ENFORCEMENT ACTION BY:",
    "",
    "GCPD",
    "GOTHAM CITY POLICE DEPARTMENT",
  ],
  "historical",
  "2022 官方原版",
  "Official 2022 ARG",
);

export const GOODBYE_TEXT = text(
  "GOODBYE.TXT",
  "官方终局留言",
  [
    "YOU SOLVED ALL THE RIDDLES.",
    "",
    "GOOD BYE <?>",
  ],
  "historical",
  "2022 官方原版",
  "Official 2022 ARG",
);

export const TRIBUTE_TEXT = text(
  "TRIBUTE.TXT",
  "续作致敬彩蛋",
  [
    "[ARCHIVE CURATOR NOTE / 档案注记]",
    "* 2022 官方原版片尾与网站最终留存文本为：'GOOD BYE <?>'。",
    "* 终局界面出现的 'SEE YOU IN 2028' 系本影迷档案站",
    `  向续作《新蝙蝠侠 2》（正式定档 ${FILM.releaseLabel}）献上的致敬彩蛋。`,
    "* 感谢你完成全部 7 阶段 21 道谜语人破译互动挑战。",
    "==================================================",
    "",
    "SEE YOU IN 2028 <?>",
  ],
  "extended",
  "本站致敬扩展",
  "Archive Fan Tribute",
);

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
  "",
  "PROVENANCE ARCHITECTURE:",
  "• HISTORICAL CORE (2021.12–2022.04):",
  "  PHASES 1, 2, 6, 7 & FINAL GCPD SEIZURE NOTICE.",
  "  AUTHENTIC WARNER BROS. VIRAL PROMOTION PUZZLES.",
  "• ARCHIVE CANON EXTENSION:",
  "  PHASES 3, 4, 5 DEVELOPED BY SEMPER VIGILANS",
  "  FOR CONTINUOUS IN-BROWSER NARRATIVE PROGRESSION.",
  "",
  "TYPE 'TIMELINE' TO READ THE REAL-WORLD 2022 ARG HISTORY.",
  "TYPE 'LS' TO VIEW UNLOCKED DOSSIERS.",
];

export const TIMELINE_LOGS = [
  "RATAALADA.COM VIRAL MARKETING TIMELINE (2021–2022)",
  "==================================================",
  "[2021.12] LAUNCH WITH 'THE BAT AND THE CAT' TRAILER",
  "  * CRT terminal debut with first 3 riddles (Phase 1).",
  "  * Rewarded with GCPD surveillance sketch & cipher.",
  "",
  "[2022.01] THE ICEBERG LOUNGE & CORRUPTION INQUIRY",
  "  * Interactive prompt: 'Have you been to the Iceberg Lounge?'",
  "  * Second riddle cluster (Phase 2) unmasking Falcone's racket.",
  "",
  "[2022.02] 0% -> 100% LOADING COUNTDOWN & ZIP DROP",
  "  * Global fans tracked real-time loading bar progress.",
  "  * Unlocked WHAT_AM_I.ZIP (Password: PROMISE), exposing",
  "    Thomas Wayne 2001 mayoral campaign corruption (Phase 6).",
  "",
  "[2022.03] THEATRICAL PREMIERE & ARKHAM DELETED SCENE",
  "  * End credits flashed 'GOOD BYE <?>' directing back to site.",
  "  * Phase 7 riddles unlocked Barry Keoghan Joker deleted scene.",
  "",
  "[2022.04] FINAL TAKEOVER: GCPD SEIZURE NOTICE",
  "  * Official viral campaign concluded with domain seizure warrant.",
  "",
  "==================================================",
  "[FAN ARCHIVE CURATION NOTES / 本站说明]",
  "* PHASES 3-5: Canonically crafted by Semper Vigilans Archive",
  "  using movie clues & Nirvana lyrics to bridge the timeline.",
  "* FINALE 'SEE YOU IN 2028': A fan tribute looking forward to",
  `  The Batman Part II (${FILM.releaseLabelEn}). Original was 'GOOD BYE <?>'.`,
  "* FORENSICS: Converted multi-gigabyte ZIP/video files to lightweight",
  "  instant web dossiers for frictionless gameplay.",
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
    out.push(GCPD_TEXT, GOODBYE_TEXT, TRIBUTE_TEXT);
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
  return allPrizes(progress).find((item) => {
    if (item.file === upper) return true;
    if (upper === "STREET.IMG" && item.file === "SKETCH.IMG") return true;
    if (upper === "9-13_14-15-20_1-14.JPG" && item.file === "SKETCH.IMG") return true;
    if ((upper === "2028.TXT" || upper === "NOTE.TXT") && item.file === "TRIBUTE.TXT") return true;
    return false;
  });
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
    source: "2021 年官方病毒营销暗网网址代码",
    sourceEn: "2021 Viral Marketing Web Cipher",
    cipherNote: "数字序列代换与西班牙语双关",
    decodedEn: "YOU ARE EL RATA ALADA -> URL: RATAALADA.COM",
    decodedZh: "“你是长翅膀的老鼠”（音译：You Are El = URL，指向解谜网站 rataalada.com）",
  },
];
