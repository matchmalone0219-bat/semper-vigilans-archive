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
  thomas: {
    also: ["托马斯·韦恩", "韦恩家族", "参选市长"],
    appearances: [
      { work: "官方前传小说", note: "竞选市长、建立哥谭孤儿院、设立「新生」慈善基金。", href: "/recap", hash: "before" },
      { work: "漫画《谜语人元年》", note: "委托法尔科内封口调查记者。", href: "/recap", hash: "year-one" },
      { work: "电影《新蝙蝠侠》", note: "竞选录像、账本与后巷遇刺，揭开慈善黑幕。", href: "/recap", hash: "the-batman" },
    ],
    places: ["orphanage", "wayne-tower", "park-row", "arkham"],
    stills: ["/media/orphanage.jpg", "/media/still-sunset.jpg"],
    sections: [
      {
        heading: "外科医生与慈善巨擘",
        body: "托马斯·韦恩曾是哥谭备受尊敬的知名外科医生。他将家族老宅韦恩庄园捐建为哥谭孤儿院，并注资设立百亿美元规模的「新生」慈善基金，以此作为回馈社会的公共项目并宣布竞选市长。",
      },
      {
        heading: "名门隐秘与后巷枪声",
        body: "在竞选市长期间，调查记者爱德华·埃利奥特计划公开玛莎深层的家族精神病史。托马斯为保护妻子并维护竞选声誉，委托黑道头目卡尔迈恩·法尔科内出面施压威慑；然而法尔科内擅自将记者杀害灭口，使托马斯被迫卷入黑帮利益瓜葛。2002 年前后，托马斯与玛莎在派克街剧院后巷遭枪击遇害。其身故后，百亿美元规模的「新生」基金彻底沦为法尔科内收买政法高层的洗钱工具。",
      },
    ],
  },
  martha: {
    also: ["玛莎·韦恩", "玛莎·阿卡姆", "阿卡姆家族"],
    appearances: [
      { work: "官方前传小说", note: "随托马斯走访即将改建的韦恩庄园。", href: "/recap", hash: "before" },
      { work: "漫画《谜语人元年》", note: "阿卡姆家族精神病史被记者追查。", href: "/recap", hash: "year-one" },
      { work: "电影《新蝙蝠侠》", note: "后巷遇刺；身世成为布鲁斯必须面对的家族阴影。", href: "/recap", hash: "the-batman" },
    ],
    places: ["orphanage", "park-row", "arkham"],
    stills: ["/media/portraits/martha.jpg", "/media/orphanage.jpg"],
    sections: [
      {
        heading: "旧日豪门与阿卡姆血脉",
        body: "区别于主宇宙的凯恩家族设定，马特·里夫斯宇宙中玛莎出身于哥谭另一大历史名门——阿卡姆家族（设定参考自《蝙蝠侠：地球一号》）。阿卡姆家族早在 18 世纪初便创立了收治重症精神疾患的州立医院，两大家族的联姻使布鲁斯·韦恩自出生起便承载着哥谭建城以来最显赫亦最具争议的血脉交织。",
      },
      {
        heading: "家族创伤与隐秘病史",
        body: "谜语人公开的调查档案揭露：玛莎幼年时亲历母亲杀害父亲后自杀的惨剧，家族随后动用权势掩盖了这起命案。玛莎在成长过程中长期受精神疾病困扰，多次出入阿卡姆州立医院接受治疗，相关诊疗记录亦被家族严密封锁。这一深层秘密成为日后政敌与黑帮操弄的隐秘软肋，也揭示了哥谭名流光鲜表象下的沉重创伤。",
      },
      {
        heading: "后巷悲剧与神话破灭",
        body: "2002 年前后，玛莎与托马斯在君主剧院散场后于派克街后巷遭持枪劫杀，年幼的布鲁斯目睹双亲遇难。这起悬案不仅促成了蝙蝠侠的诞生，更彻底打破了韦恩家族纯粹无暇的慈善神话。随着真相大白，母亲血脉背后的阿卡姆历史，成为布鲁斯在探寻正义真谛时必须直面的深层心理阴影。",
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
    places: ["wayne-tower", "cave", "orphanage", "gcpd", "gsg", "park-row", "seawall", "arkham"],
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
        body: "在与谜语人的连环交锋中，布鲁斯被迫直面双亲过往的复杂阴影与家族神话的瓦解。在大洪水漫灌哥谭体育馆的至暗时刻，他跳入水中斩断高压电缆、点燃照明弹引导受困民众脱险，完成了从单纯以暴制暴的「复仇化身」向庇护市民的「希望灯塔」的精神飞跃。",
      },
      {
        heading: "续集展望：凛冬下的内心考验",
        body: "导演马特·里夫斯表示，《新蝙蝠侠2》将进一步聚焦布鲁斯·韦恩本人。雪地战车被 GCPD 与 SWAT 车辆包围的片场线索，则让本站更倾向于一种危险走向：布鲁斯不仅要对抗新敌人，还可能被哥谭体制重新视为必须清除的威胁。",
      },
    ],
  },
  alfred: {
    also: ["阿尔弗雷德·潘尼沃斯", "前情报特工", "韦恩家族管家"],
    appearances: [
      { work: "官方前传小说", note: "负责布鲁斯的体能格斗、侦查技能与机械工程训练。", href: "/recap", hash: "before" },
      { work: "电影《新蝙蝠侠》", note: "常驻地下车间，在炸弹袭击中为保护布鲁斯受伤。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "安迪·瑟金斯确认回归，预计继续担任布鲁斯的后方核心。", href: "/dossier" },
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
        body: "在第一部中，阿尔弗雷德替布鲁斯拆开暗藏炸药的信件而负伤。在病榻前两人坦诚相待，解开了历史心结。随着布鲁斯可能再次遭到警队围捕，本站预计阿尔弗雷德会继续镇守地下车间，承担情报、装备与撤离支援。",
      },
    ],
  },
  bella: {
    also: ["贝拉·蕾尔", "哥谭市长"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "年轻改革派候选人，在枪击与洪灾浩劫中幸存并当选。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "洁米·劳森确认回归，预计身处灾后重建与警政冲突中心。", href: "/dossier" },
    ],
    places: ["gsg", "city-hall", "seawall"],
    stills: ["/media/flood.jpg"],
    sections: [
      {
        heading: "哥谭灾后改革的领军者",
        body: "贝拉·蕾尔作为年轻改革派政治家，在枪击与洪灾中幸存并当选市长。严冬、灾后重建与疑似警队追捕蝙蝠侠的线索叠在一起，使她很可能成为续集中最难站队的人：既要恢复秩序，也必须决定哥谭是否仍需要一个不受体制控制的义警。",
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
      { work: "电影《新蝙蝠侠2》", note: "克里斯汀·米莉奥蒂已明确表示不会回归续集。", href: "/dossier" },
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
      { work: "电影《新蝙蝠侠2》", note: "科林·法瑞尔确认回归，以黑道新王身份重新进入棋局。", href: "/dossier" },
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
        body: "在《企鹅人》八集剧集中，他击溃法尔科内与马罗尼家族核心势力，甚至灭口唯一信任的心腹维克托，彻底登顶哥谭地下新王。科林·法瑞尔确认回归后，本站判断他不会只是客串：城市重建、警政资源与黑市网络都可能成为奥兹继续扩张的筹码。",
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
    places: ["orphanage", "arkham", "riddler-room", "seawall"],
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
    stills: ["/media/portraits/joker-v2.jpg"],
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
