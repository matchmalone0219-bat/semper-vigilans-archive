import {
  FACTIONS,
  NODE_MAP,
  NODES,
  PORTRAITS,
  edgesOf,
  type RelNode,
} from "@/lib/relations";

export type Appearance = {
  work: string;
  note: string;
  href: "/recap" | "/dossier" | "/gallery";
  hash?: string;
};

export type PersonFile = {
  also: string[];
  appearances: Appearance[];
  places: string[];
  stills: string[];
  sections: { heading: string; body: string }[];
};

export const FILES: Record<string, PersonFile> = {
  waynes: {
    also: ["托马斯·韦恩", "玛莎·韦恩", "阿卡姆家族"],
    appearances: [
      { work: "官方前传小说", note: "竞选市长、建立哥谭孤儿院、设立「新生」慈善基金。", href: "/recap", hash: "before" },
      { work: "漫画《谜语人元年》", note: "封口调查记者、玛莎家族精神病史、巷中遇害。", href: "/recap", hash: "year-one" },
      { work: "电影《新蝙蝠侠》", note: "作为核心背景人物出现，账本与录像带揭开历史内幕。", href: "/recap", hash: "the-batman" },
    ],
    places: ["orphanage", "wayne-tower"],
    stills: ["/media/orphanage.jpg"],
    sections: [
      {
        heading: "名门慈善家背后的真相",
        body: "托马斯·韦恩曾是哥谭备受尊敬的外科医生与慈善巨擘，他将老宅韦恩庄园捐出改建为哥谭孤儿院，并设立「新生」慈善基金。然而在后续调查中证实，该基金在托马斯遇害后沦为法尔科内买通政界与司法高层的洗钱工具。",
      },
      {
        heading: "家族隐秘与遇刺悲剧",
        body: "玛莎·韦恩（原姓阿卡姆）拥有深厚的家族精神病史。托马斯在竞选期间曾设法阻止记者报道此事，间接卷入黑帮利益瓜葛。两人在剧院后巷遇刺身亡，成为布鲁斯走上义警之路的起点，也让哥谭陷入长达数十年的权力失序。",
      },
    ],
  },
  bruce: {
    also: ["布鲁斯·韦恩", "蝙蝠侠", "夜巡义警"],
    appearances: [
      { work: "官方前传小说", note: "青少年时期的战术体能训练，手工改装肌肉车原型。", href: "/recap", hash: "before" },
      { work: "电影《新蝙蝠侠》", note: "义警生涯第二年，万圣节连环命案侦破与大洪灾救援。", href: "/recap", hash: "the-batman" },
      { work: "限定剧《企鹅人》", note: "未正面出场，剧终蝙蝠信号灯再次照亮城市夜空。", href: "/recap", hash: "the-penguin" },
      { work: "电影《新蝙蝠侠2》", note: "罗伯特·帕丁森确认回归，深入展现面具下的内心抉择。", href: "/dossier" },
    ],
    places: ["wayne-tower", "cave", "orphanage", "gcpd", "gsg"],
    stills: [
      "/media/gotham.jpg",
      "/media/still-bruce.jpg",
      "/media/still-sunset.jpg",
      "/media/street.jpg",
      "/media/flood.jpg",
      "/media/orphanage.jpg",
    ],
    sections: [
      {
        heading: "义警生涯第二年",
        body: "布鲁斯化身蝙蝠侠的第二年，白天深居简出，夜晚在街头以严苛私刑打击暴力犯罪。在阿尔弗雷德的训练与后勤支持下，他最初将自己视为纯粹的「复仇」代名词。",
      },
      {
        heading: "从复仇之火到希望之光",
        body: "在与谜语人的交锋中，布鲁斯被迫面对家族历史的阴影，并在大洪水漫灌体育馆的危急时刻奋力救出受困平民。他由此领悟到，哥谭不仅需要对罪恶的惩戒，更需要象征光明与希望的守护者。",
      },
      {
        heading: "续集展望：凛冬下的内心考验",
        body: "导演马特·里夫斯表示，《新蝙蝠侠2》将进一步聚焦布鲁斯·韦恩本人。片场公开画面显示冬季视觉元素与蝙蝠战车回归，但具体道德抉择和剧情冲突仍未公开。",
      },
    ],
  },
  alfred: {
    also: ["阿尔弗雷德·潘尼沃斯", "前情报特工", "韦恩家族管家"],
    appearances: [
      { work: "官方前传小说", note: "负责布鲁斯的体能格斗、侦查技能与机械工程训练。", href: "/recap", hash: "before" },
      { work: "电影《新蝙蝠侠》", note: "常驻地下车间，在炸弹袭击中为保护布鲁斯受伤。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "安迪·瑟金斯确认回归，具体剧情尚未公开。", href: "/dossier" },
    ],
    places: ["wayne-tower", "cave"],
    stills: ["/media/still-alfred.jpg"],
    sections: [
      {
        heading: "亦师亦友的后方支柱",
        body: "阿尔弗雷德拥有深厚的军事情报背景。在韦恩夫妇遇害后，他承担起抚养布鲁斯的重任，教授其侦查推理、近身格斗与战术工程等全方位技能。",
      },
      {
        heading: "生死相托的深厚羁绊",
        body: "在第一部中，阿尔弗雷德替布鲁斯拆开暗藏炸药的信件而负伤。在病榻前两人坦诚相待，解开了历史心结。安迪·瑟金斯已确认回归，但续集中的具体行动尚未公开。",
      },
    ],
  },
  bella: {
    also: ["贝拉·蕾尔", "哥谭市长"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "年轻改革派候选人，在枪击与洪灾浩劫中幸存并当选。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "洁米·劳森确认回归，具体剧情尚未公开。", href: "/dossier" },
    ],
    places: ["gsg", "city-hall"],
    stills: ["/media/flood.jpg"],
    sections: [
      {
        heading: "哥谭灾后改革的领军者",
        body: "贝拉·蕾尔作为年轻改革派政治家，在竞选集会枪击与决堤洪灾中幸存并当选市长。影片表现了她的反腐立场；续集将如何呈现灾后治理尚未公开。",
      },
    ],
  },
  gordon: {
    also: ["吉姆·戈登", "GCPD 警官", "戈登中尉"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "哥谭警局中尉，力排众议与蝙蝠侠并肩调查破案。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "杰弗里·怀特确认回归，坚守体制内正义防线。", href: "/dossier" },
    ],
    places: ["gcpd", "gsg"],
    stills: ["/media/still-gordon.jpg", "/media/still-morgue.jpg", "/media/court.jpg", "/media/signal.jpg"],
    sections: [
      {
        heading: "警界清流与正义同盟",
        body: "作为腐败警局内部难能可贵的正直警官，戈登中尉敏锐察觉到蝙蝠侠在破获连环大案中的侦探价值，顶住压力将其带入现场勘验，并在局顶亲自点亮蝙蝠信号灯。杰弗里·怀特已确认在续集中回归。",
      },
    ],
  },
  martinez: {
    also: ["马丁内斯警官", "GCPD 巡警"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "多次协助戈登与蝙蝠侠调查的基层警官。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "吉尔·佩雷斯-亚伯拉罕确认回归。", href: "/dossier" },
    ],
    places: ["gcpd"],
    stills: ["/media/still-martinez.jpg"],
    sections: [
      {
        heading: "尽职尽责的基层力量",
        body: "哥谭市警局恪尽职守的基层警官，在第一部多次协助戈登维持现场秩序并参与搜查，已确认在《新蝙蝠侠2》中继续登场。",
      },
    ],
  },
  colson: {
    also: ["吉尔·科尔森", "前地方检察官", "受贿官员"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "被谜语人绑缚项圈炸弹，在市长葬礼上当众处决身亡。", href: "/recap", hash: "the-batman" },
    ],
    places: ["gcpd", "city-hall"],
    stills: ["/media/still-colson.jpg", "/media/still-colson-funeral.jpg"],
    sections: [
      {
        heading: "深陷黑金泥潭的地方检察官",
        body: "由彼得·萨斯加德（Peter Sarsgaard）饰演。作为哥谭市最高检察官，他长期接受卡尔迈恩·法尔科内的大额贿赂，对黑帮犯罪活动睁一只眼闭一只眼，并多次打压针对「新生」基金的司法审计。",
      },
      {
        heading: "项圈炸弹与悲惨结局",
        body: "在市长唐·米切尔的葬礼上，被谜语人绑上定时炸弹项圈并驱车撞入追悼大厅。面对谜语人要求其说出出卖马罗尼的警局告密者身份（即法尔科内）的通牒，科尔森因恐惧法尔科内报复家人而拒绝开口，被当场炸死。",
      },
    ],
  },
  mitchell: {
    also: ["唐·米切尔", "前哥谭市长"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "万圣节当夜在官邸遇害，成为谜语人首桩暗杀受害者。", href: "/recap", hash: "the-batman" },
    ],
    places: ["city-hall"],
    stills: ["/media/still-mitchell.jpg"],
    sections: [
      {
        heading: "谜语人连环暗杀的序幕",
        body: "由鲁伯特·彭利-琼斯（Rupert Penry-Jones）饰演。哥谭市三届连任的市长，表面上高调宣扬反腐与治安，暗中却与法尔科内及冰山俱乐部勾结。在万圣节当晚于家中遭谜语人残忍杀害，并在脸上涂满「不要再说谎」的血字。",
      },
    ],
  },
  annika: {
    also: ["安妮卡·科索洛夫", "瑟琳娜密友"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "冰山俱乐部服务生，因知晓告密者机密被法尔科内掐死。", href: "/recap", hash: "the-batman" },
    ],
    places: ["iceberg"],
    stills: ["/media/lounge.jpg"],
    sections: [
      {
        heading: "无辜卷入黑帮内幕的牺牲者",
        body: "瑟琳娜·凯尔的室友兼挚友，来自东欧并在冰山俱乐部担任服务生。因在陪伴市长米切尔期间无意中得知法尔科内就是警方的告密者（“老鼠”），随即遭到法尔科内亲手掐死并藏尸于汽车后备箱中，直接触发了猫女的复仇行动。",
      },
    ],
  },
  carmine: {
    also: ["卡尔迈恩·法尔科内", "罗马人", "黑道教父"],
    appearances: [
      { work: "漫画《谜语人元年》", note: "黑金洗钱与控制市政高层的幕后黑手。", href: "/recap", hash: "year-one" },
      { work: "电影《新蝙蝠侠》", note: "在冰山俱乐部顶层掌控全城，后遭谜语人远程暗杀。", href: "/recap", hash: "the-batman" },
      { work: "限定剧《企鹅人》", note: "身故后遗留的黑帮帝国引发各派惨烈争夺。", href: "/recap", hash: "the-penguin" },
    ],
    places: ["iceberg", "falcone"],
    stills: ["/media/still-falcone.jpg", "/media/lounge.jpg"],
    sections: [
      {
        heading: "曾经的哥谭地下皇帝",
        body: "以冰山俱乐部为据点掌控毒品网络与市政贿赂链条，曾出卖马罗尼成为警方的秘密线人。在第一部真相大白走出俱乐部时遭谜语人狙杀，其死直接引发了地下黑帮势力的全面洗牌。",
      },
    ],
  },
  selina: {
    also: ["瑟琳娜·凯尔", "猫女"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "冰山俱乐部服务生兼神偷，协助蝙蝠侠后前往布鲁德海文。", href: "/recap", hash: "the-batman" },
      { work: "限定剧《企鹅人》", note: "未正面出场，剧末向阿卡姆中的索菲亚寄送来信。", href: "/recap", hash: "the-penguin" },
      { work: "电影《新蝙蝠侠2》", note: "官方尚未正式宣布是否回归。", href: "/dossier" },
    ],
    places: ["iceberg", "orphanage"],
    stills: [
      "/media/still-selina-apt.jpg",
      "/media/still-cat-mask.jpg",
      "/media/rooftop.jpg",
      "/media/still-cat-bike.jpg",
      "/media/selina.jpg",
    ],
    sections: [
      {
        heading: "身手矫健的暗夜游侠",
        body: "卡尔迈恩·法尔科内的私生女，为了查明好友失踪案潜入冰山俱乐部，与蝙蝠侠多次交锋并结成默契搭档。在解决恩怨后骑行机车离开哥谭，前往布鲁德海文（Blüdhaven）。",
      },
      {
        heading: "后续暗线与人物牵绊",
        body: "在《企鹅人》剧集结尾中，被收押阿卡姆的索菲亚收到来自瑟琳娜的亲笔信，表明两人的姐妹羁绊与故事暗线仍未终结。",
      },
    ],
  },
  sofia: {
    also: ["索菲亚·法尔科内", "绞刑吏"],
    appearances: [
      { work: "限定剧《企鹅人》", note: "核心主角之一，出狱后清洗家族并与奥兹展开生死火并。", href: "/recap", hash: "the-penguin" },
      { work: "电影《新蝙蝠侠2》", note: "官方尚未宣布回归。", href: "/dossier" },
    ],
    places: ["arkham", "iceberg", "crown-point"],
    stills: ["/media/peng-sofia.jpg"],
    sections: [
      {
        heading: "沉冤受屈的家族长女",
        body: "卡尔迈恩之女，曾被父亲嫁祸为连环杀手关押于阿卡姆疯人院十年。在剧集《企鹅人》中出狱后发动狠辣反扑清洗家族，但在与奥兹的权力争夺中落败，再次被关回阿卡姆。",
      },
    ],
  },
  oz: {
    also: ["奥兹·科布", "企鹅人"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "法尔科内手下得力干将，在枪林弹雨中保全自身。", href: "/recap", hash: "the-batman" },
      { work: "限定剧《企鹅人》", note: "主线主角，通过周密谋略扫清对手登顶黑道王座。", href: "/recap", hash: "the-penguin" },
      { work: "电影《新蝙蝠侠2》", note: "科林·法瑞尔确认回归，具体戏份尚未公开。", href: "/dossier" },
    ],
    places: ["iceberg", "crown-point"],
    stills: [
      "/media/lounge.jpg",
      "/media/peng-lounge2.jpg",
      "/media/peng-back.jpg",
      "/media/peng-gun.jpg",
      "/media/peng-coat.jpg",
      "/media/peng-office.jpg",
    ],
    sections: [
      {
        heading: "底层摸爬滚打的野心家",
        body: "本宇宙设定名为奥兹·科布（Oz Cobb）。在前作中作为黑帮中层管理，凭借精明、残忍与极强的生存本领在法尔科内倒台后的乱局中迅速借势崛起。",
      },
      {
        heading: "铁血登顶与地下新王",
        body: "在《企鹅人》八集剧集中，他击溃法尔科内与马罗尼家族核心势力，甚至灭口了唯一信任的心腹维克托以消除自身软肋，最终进入哥谭权力上层。科林·法瑞尔已确认回归，但作用仍未公开。",
      },
    ],
  },
  victor: {
    also: ["维克托·阿吉拉尔", "企鹅人副手"],
    appearances: [{ work: "限定剧《企鹅人》", note: "主要角色，跟随奥兹并在终局遇害。", href: "/recap", hash: "the-penguin" }],
    places: ["crown-point", "iceberg"],
    stills: ["/media/still-victor.jpg"],
    sections: [
      {
        heading: "街头少年的悲剧宿命",
        body: "在洪灾中失去家人的贫困少年，因偷窃企鹅人车轮而被奥兹收留并成为其心腹助手。在奥兹登顶王座之夜，奥兹为了彻底消除自身的情感软肋亲手将其灭口，展现了黑帮争斗极度冰冷的一面。",
      },
    ],
  },
  edward: {
    also: ["爱德华·纳什顿", "谜语人"],
    appearances: [
      { work: "官方前传小说", note: "孤儿院成长的童年阴影与仇恨萌芽。", href: "/recap", hash: "before" },
      { work: "漫画《谜语人元年》", note: "担任司法会计师时期发现城市黑幕与黑化全过程。", href: "/recap", hash: "year-one" },
      { work: "电影《新蝙蝠侠》", note: "策划连环暗杀与大堤决口，现关押于阿卡姆疯人院。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "官方尚未宣布回归。", href: "/dossier" },
    ],
    places: ["orphanage", "arkham", "riddler-room"],
    stills: ["/media/riddler.jpg", "/media/still-lair.jpg", "/media/still-riddler-unmask.jpg"],
    sections: [
      {
        heading: "账本深处的罪犯",
        body: "曾在哥谭孤儿院度过凄苦童年，成年后担任司法会计师。在审核账目时发现了「新生」基金与官匪勾结的巨大黑幕，深感体制腐败无药可救，化身谜语人向权贵阶层发起血腥复仇。",
      },
      {
        heading: "与蝙蝠侠的思想镜像",
        body: "谜语人最初将蝙蝠侠视为同道中人，两人分别代表了遭受体制伤害后走向不同极端的两面镜子。在炸毁防洪大坝后被收押于阿卡姆疯人院高戒备病房。",
      },
    ],
  },
  joker: {
    also: ["神秘重犯", "小丑 (未正式定名)"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "阿卡姆疯人院邻近病房囚徒，与谜语人展开对话。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "传闻待定，官方尚未确认加盟。", href: "/dossier" },
    ],
    places: ["arkham"],
    stills: ["/media/portraits/joker.jpg"],
    sections: [
      {
        heading: "阿卡姆高戒备病房的神秘低语",
        body: "在《新蝙蝠侠》成片结尾中登场，由巴里·基奥甘饰演。作为已被关押的神秘重犯，他在牢房中与受挫的谜语人隔墙展开意味深长的对话。续集中是否会正式出场仍待官方公布。",
      },
    ],
  },
};

export type Person = RelNode &
  PersonFile & {
    portrait?: { src: string; note?: string };
    factionLabel: string;
  };

export function getPerson(id: string): Person | null {
  const node = NODE_MAP[id];
  if (!node) return null;
  const file = FILES[id] ?? { also: [], appearances: [], places: [], stills: [], sections: [] };
  const faction = FACTIONS.find((f) => f.id === node.faction);
  return {
    ...node,
    ...file,
    portrait: PORTRAITS[id],
    factionLabel: faction?.label ?? node.faction,
  };
}

export const PEOPLE = NODES.map((n) => getPerson(n.id)).filter((p): p is Person => p !== null);

export function relatedPeople(id: string) {
  return edgesOf(id)
    .map((e) => ({ ...e, person: getPerson(e.other) }))
    .filter((e) => e.person);
}
