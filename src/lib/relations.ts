export type NodeStatus = "alive" | "dead" | "gone" | "arkham" | "rumor";
export type EdgeKind = "blood" | "bond" | "ally" | "foe" | "kill" | "rumor";

export const STATUS_LABEL: Record<NodeStatus, string> = {
  alive: "在世",
  dead: "已故",
  gone: "离开哥谭",
  arkham: "关押于阿卡姆",
  rumor: "传闻待定",
};

export const KIND_LABEL: Record<EdgeKind, string> = {
  blood: "血缘",
  bond: "羁绊 / 密友",
  ally: "盟友 / 合作",
  foe: "敌对 / 腐败",
  kill: "致命冲突 / 谋杀",
  rumor: "潜在关联",
};

export type RelNode = {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  status: NodeStatus;
  faction: string;
  actor?: string;
  bio: string[];
};

export type RelEdge = {
  a: string;
  b: string;
  label: string;
  kind: EdgeKind;
};

export const FACTIONS: {
  id: string;
  label: string;
  x: number;
  y: number;
  note: string;
}[] = [
  {
    id: "wayne",
    label: "韦恩家族",
    x: 100,
    y: 36,
    note: "哥谭历史悠久的豪门。旧庄园曾捐建为孤儿院，布鲁斯深居韦恩塔顶层并在此建立地下车间。",
  },
  {
    id: "city",
    label: "市政与警方 (GCPD)",
    x: 520,
    y: 36,
    note: "哥谭执法与行政体系，包含新任市长贝拉、正直警官戈登以及第一部中涉案的受贿官员。",
  },
  {
    id: "falcone",
    label: "法尔科内家族",
    x: 100,
    y: 456,
    note: "曾掌控哥谭数十年的黑道帝国。卡尔迈恩死后，其家族残余势力与后人仍深远影响城市走向。",
  },
  {
    id: "under",
    label: "地下黑道",
    x: 520,
    y: 456,
    note: "权力洗牌后的黑帮新格局。企鹅人奥兹·科布在剧集中铲除对手，强势登顶哥谭黑道新王。",
  },
  {
    id: "arkham",
    label: "阿卡姆疯人院",
    x: 860,
    y: 456,
    note: "关押哥谭极度危险重犯的州立医疗机构，谜语人、索菲亚（曾收押）及神秘囚徒均在此停留。",
  },
];

export const NODES: RelNode[] = [
  {
    id: "thomas",
    name: "托马斯·韦恩",
    sub: "外科医生 / 参选市长",
    x: 140,
    y: 108,
    status: "dead",
    faction: "wayne",
    actor: "卢克·罗伯茨",
    bio: [
      "哥谭声名显赫的外科医生与慈善巨擘，曾参选市长并将老宅捐建为孤儿院，设立百亿「新生」慈善基金。",
      "竞选期间为阻止记者报道玛莎的家族精神病史，他委托法尔科内施压，导致记者遇害。2002 年前后他与妻子在派克街后巷遇刺身亡。",
    ],
  },
  {
    id: "martha",
    name: "玛莎·韦恩",
    sub: "阿卡姆家族",
    x: 140,
    y: 198,
    status: "dead",
    faction: "wayne",
    actor: "斯特拉·斯托克",
    bio: [
      "原姓阿卡姆，出身哥谭历史名门阿卡姆家族。幼年经历父母双亡的惨剧，长期受精神创伤困扰并多次入住阿卡姆州立医院。",
      "托马斯为掩盖其病史卷入黑道交易。2002 年前后与丈夫在剧院后巷遇劫身亡，其家族隐秘成为布鲁斯必须面对的心灵阴影。",
    ],
  },
  {
    id: "bruce",
    name: "布鲁斯·韦恩",
    sub: "蝙蝠侠",
    x: 140,
    y: 300,
    status: "alive",
    faction: "wayne",
    actor: "罗伯特·帕丁森",
    bio: [
      "化身义警的第二年。白天深居简出，夜晚以「复仇」之名巡行街头打击罪恶。在经历万圣节连环命案与洪灾救援后，他逐渐领悟到除了复仇，城市更需要象征希望的守护者。",
      "罗伯特·帕丁森已确认回归，故事会更聚焦面具下的布鲁斯。结合雪地战车遭警车与 SWAT 围堵的片场线索，他可能同时面对新敌人、城市体制与自身道德边界的三重夹击。",
    ],
  },
  {
    id: "alfred",
    name: "阿尔弗雷德",
    sub: "潘尼沃斯",
    x: 140,
    y: 408,
    status: "alive",
    faction: "wayne",
    actor: "安迪·瑟金斯",
    bio: [
      "布鲁斯最信任的导师与后方管家。在第一部炸弹袭击中幸存；安迪·瑟金斯已确认回归，预计继续承担地下车间的情报、装备与撤离支援。",
    ],
  },
  {
    id: "bella",
    name: "贝拉·蕾尔",
    sub: "哥谭新任市长",
    x: 480,
    y: 118,
    status: "alive",
    faction: "city",
    actor: "洁米·劳森",
    bio: [
      "年轻改革派政治家，在枪击与洪灾中幸存并当选市长。洁米·劳森确认回归后，她很可能被置于灾后重建、警队强硬执法与蝙蝠侠义警身份的冲突中心。",
    ],
  },
  {
    id: "gordon",
    name: "吉姆·戈登",
    sub: "GCPD 警官",
    x: 480,
    y: 214,
    status: "alive",
    faction: "city",
    actor: "杰弗里·怀特",
    bio: [
      "哥谭警局中难能可贵的正直警官，力排众议与蝙蝠侠并肩破获连环大案，并在局顶亲自点亮蝙蝠信号灯，已确认在续集中回归。",
    ],
  },
  {
    id: "martinez",
    name: "马丁内斯警官",
    sub: "GCPD 巡警",
    x: 480,
    y: 340,
    status: "alive",
    faction: "city",
    actor: "吉尔·佩雷斯-亚伯拉罕",
    bio: [
      "恪尽职守的基层警官，在第一部多次协助戈登与蝙蝠侠维持现场秩序与物证调查，已确认在续集中回归。",
    ],
  },
  {
    id: "mitchell",
    name: "唐·米切尔",
    sub: "前哥谭市长",
    x: 680,
    y: 118,
    status: "dead",
    faction: "city",
    actor: "鲁伯特·彭利-琼斯",
    bio: [
      "前任哥谭市长，万圣节首位遇害者。其官邸遇害后流出的密照直接牵扯出冰山俱乐部与权贵洗钱黑幕。",
    ],
  },
  {
    id: "colson",
    name: "吉尔·科尔森",
    sub: "前地方检察官",
    x: 680,
    y: 214,
    status: "dead",
    faction: "city",
    actor: "彼得·萨斯加德",
    bio: [
      "前任哥谭地方检察官，深度卷入法尔科内黑金网络。在市长葬礼上被项圈炸弹劫持，因拒绝供出告密者被当众引爆身亡。",
    ],
  },
  {
    id: "carmine",
    name: "卡尔迈恩·法尔科内",
    sub: "前黑帮教父",
    x: 140,
    y: 540,
    status: "dead",
    faction: "falcone",
    actor: "约翰·特托罗",
    bio: [
      "曾统治哥谭数十年的黑帮教父。在第一部结尾被揭露为向警方出卖马罗尼的秘密线人（“老鼠”），走出俱乐部时遭谜语人狙杀。",
    ],
  },
  {
    id: "selina",
    name: "瑟琳娜·凯尔",
    sub: "猫女",
    x: 100,
    y: 660,
    status: "gone",
    faction: "falcone",
    actor: "佐伊·克拉维茨",
    bio: [
      "法尔科内的私生女。身手敏捷的神偷与独行侠，曾协助蝙蝠侠办案。解决恩怨后离开哥谭前往布鲁德海文（Blüdhaven）。",
    ],
  },
  {
    id: "annika",
    name: "安妮卡·科索洛夫",
    sub: "瑟琳娜密友",
    x: 330,
    y: 660,
    status: "dead",
    faction: "falcone",
    bio: [
      "瑟琳娜的室友兼挚友。因意外得知法尔科内是告密者的机密遭到法尔科内亲手灭口，成为激发猫女反抗黑帮的导火索。",
    ],
  },
  {
    id: "sofia",
    name: "索菲亚·法尔科内",
    sub: "法尔科内家族长女",
    x: 320,
    y: 540,
    status: "arkham",
    faction: "falcone",
    actor: "克里斯汀·米莉奥蒂",
    bio: [
      "卡尔迈恩之女，曾被父亲陷害关押阿卡姆十年。在《企鹅人》中出狱后发动家族清洗，但在与奥兹的夺权中落败，再次被收押回阿卡姆。",
    ],
  },
  {
    id: "oz",
    name: "奥兹·科布",
    sub: "企鹅人",
    x: 540,
    y: 540,
    status: "alive",
    faction: "under",
    actor: "科林·法瑞尔",
    bio: [
      "原法尔科内手下得力干将。在限定剧《企鹅人》中扫清对手、登顶哥谭地下新王；科林·法瑞尔确认回归，本站预计他将把黑市网络与政治关系一并带入续集棋局。",
    ],
  },
  {
    id: "victor",
    name: "维克托·阿吉拉尔",
    sub: "企鹅人前副手",
    x: 540,
    y: 660,
    status: "dead",
    faction: "under",
    actor: "伦齐·费利兹",
    bio: [
      "出身贫民区的街头少年，在剧集中被奥兹收为副手。在奥兹登顶王座之夜因奥兹不愿保留情感软肋而被其残忍灭口。",
    ],
  },
  {
    id: "edward",
    name: "爱德华·纳什顿",
    sub: "谜语人",
    x: 880,
    y: 540,
    status: "arkham",
    faction: "arkham",
    actor: "保罗·达诺",
    bio: [
      "前司法会计师，策划了针对哥谭权贵的连环暗杀与炸毁防洪大堤惨剧。现羁押于阿卡姆疯人院高戒备病房。",
    ],
  },
  {
    id: "joker",
    name: "小丑 (未正式定名)",
    sub: "神秘囚犯",
    x: 880,
    y: 660,
    status: "rumor",
    faction: "arkham",
    actor: "巴里·基奥甘",
    bio: [
      "关押在阿卡姆疯人院的神秘重犯，第一部结尾曾隔墙与谜语人展开意味深长的对话。续集是否出场官方未确认。",
    ],
  },
];

export const EDGES: RelEdge[] = [
  { a: "thomas", b: "martha", label: "夫妻", kind: "bond" },
  { a: "bruce", b: "thomas", label: "父子", kind: "blood" },
  { a: "bruce", b: "martha", label: "母子", kind: "blood" },
  { a: "thomas", b: "carmine", label: "封口交易", kind: "foe" },
  { a: "bruce", b: "alfred", label: "抚养与导师", kind: "bond" },
  { a: "bruce", b: "gordon", label: "正义盟友", kind: "ally" },
  { a: "gordon", b: "martinez", label: "警局同僚", kind: "ally" },
  { a: "gordon", b: "bella", label: "市政合作", kind: "ally" },
  { a: "bruce", b: "bella", label: "洪灾救援", kind: "ally" },
  { a: "bruce", b: "selina", label: "复杂情感 / 前搭档", kind: "bond" },
  { a: "selina", b: "annika", label: "密友与室友", kind: "bond" },
  { a: "carmine", b: "annika", label: "杀人灭口", kind: "kill" },
  { a: "edward", b: "mitchell", label: "首桩暗杀", kind: "kill" },
  { a: "edward", b: "colson", label: "项圈炸弹处决", kind: "kill" },
  { a: "carmine", b: "colson", label: "黑金贿赂控制", kind: "foe" },
  { a: "selina", b: "carmine", label: "父女血缘", kind: "blood" },
  { a: "sofia", b: "carmine", label: "父女血缘", kind: "blood" },
  { a: "selina", b: "sofia", label: "同父异母姐妹", kind: "blood" },
  { a: "selina", b: "sofia", label: "狱中信件联络", kind: "bond" },
  { a: "oz", b: "carmine", label: "旧部反噬", kind: "foe" },
  { a: "oz", b: "sofia", label: "夺权死敌", kind: "foe" },
  { a: "oz", b: "victor", label: "灭口清除", kind: "kill" },
  { a: "bruce", b: "oz", label: "潜在冲突对立", kind: "foe" },
  { a: "bruce", b: "edward", label: "互为宿敌", kind: "foe" },
  { a: "edward", b: "carmine", label: "狙击暗杀", kind: "kill" },
  { a: "edward", b: "joker", label: "邻格囚徒", kind: "rumor" },
];

export const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n]));

export const PORTRAITS: Record<string, { src: string; note?: string }> = {
  thomas: { src: "/media/portraits/thomas.jpg", note: "卢克·罗伯茨 饰 托马斯·韦恩" },
  martha: { src: "/media/portraits/martha.jpg", note: "斯特拉·斯托克 饰 玛莎·韦恩" },
  bruce: { src: "/media/portraits/bruce.jpg", note: "罗伯特·帕丁森 饰 布鲁斯·韦恩" },
  alfred: { src: "/media/portraits/alfred.jpg", note: "安迪·瑟金斯 饰 阿尔弗雷德" },
  bella: { src: "/media/portraits/bella.jpg", note: "洁米·劳森 饰 贝拉·蕾尔" },
  gordon: { src: "/media/portraits/gordon.jpg", note: "杰弗里·怀特 饰 吉姆·戈登" },
  martinez: { src: "/media/portraits/martinez.jpg", note: "吉尔·佩雷斯-亚伯拉罕 饰 马丁内斯" },
  colson: { src: "/media/portraits/colson.jpg", note: "彼得·萨斯加德 饰 吉尔·科尔森" },
  mitchell: { src: "/media/portraits/mitchell.jpg", note: "鲁伯特·彭利-琼斯 饰 唐·米切尔市长" },
  annika: { src: "/media/portraits/annika.jpg", note: "哈娜·赫尔日奇 饰 安妮卡·科索洛夫" },
  carmine: { src: "/media/portraits/carmine.jpg", note: "约翰·特托罗 饰 卡尔迈恩·法尔科内" },
  selina: { src: "/media/portraits/selina.jpg", note: "佐伊·克拉维茨 饰 瑟琳娜·凯尔" },
  sofia: { src: "/media/portraits/sofia.jpg", note: "克里斯汀·米莉奥蒂 饰 索菲亚·法尔科内" },
  oz: { src: "/media/portraits/oz.jpg", note: "科林·法瑞尔 饰 奥兹·科布" },
  victor: { src: "/media/portraits/victor.jpg", note: "伦齐·费利兹 饰 维克托·阿吉拉尔" },
  edward: { src: "/media/portraits/edward.jpg", note: "保罗·达诺 饰 谜语人" },
  joker: { src: "/media/portraits/joker-v2.jpg", note: "巴里·基奥甘 饰 阿卡姆神秘重犯" },
};

export function edgesOf(id: string) {
  return EDGES.filter((e) => e.a === id || e.b === id).map((e) => ({
    ...e,
    other: e.a === id ? e.b : e.a,
  }));
}

export function nodesIn(faction: string) {
  return NODES.filter((n) => n.faction === faction);
}
