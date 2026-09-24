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
    stills: ["/media/portraits/thomas.jpg", "/media/portraits/waynes.jpg"],
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
    stills: ["/media/portraits/martha.jpg"],
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
    also: ["布鲁斯·韦恩", "蝙蝠侠", "夜巡义警", "柯特·柯本", "Kurt Cobain", "Nirvana"],
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
        heading: "「蝙蝠侠版柯特·柯本」",
        body: "里夫斯对 Esquire 说：「他就是一种瘾君子。他的药，是对复仇的成瘾。他像一个蝙蝠侠版的柯特·柯本。」这不是把布鲁斯写成摇滚明星传记，而是一套拒绝花花公子面具的隐士设定：衰败的韦恩塔、吉他与功放、看起来像明星却也能彻底隐居。视觉上，他接到格斯·范·桑特《最后的日子》里那个住在荒宅中的虚构柯本；听觉上，锚点是写第一幕时循环的涅槃《Something in the Way》。里夫斯自己划过界：不是觉得柯本就是蝙蝠侠，而是柯本与名声相处得很别扭，给布鲁斯加一层摇滚明星的锋芒说得通。歌曲进出场位置见幕后视听。",
      },
      {
        heading: "从复仇之火到希望之光",
        body: "在与谜语人的连环交锋中，布鲁斯被迫直面双亲过往的复杂阴影与家族神话的瓦解。在大洪水漫灌哥谭体育馆的至暗时刻，他跳入水中斩断高压电缆、点燃照明弹引导受困民众脱险，完成了从单纯以暴制暴的「复仇化身」向庇护市民的「希望灯塔」的精神飞跃。",
      },
      {
        heading: "续集展望：凛冬下的内心考验",
        body: "导演马特·里夫斯表示，《新蝙蝠侠2》将进一步聚焦布鲁斯·韦恩本人。雪地战车被 GCPD 与 SWAT 车辆包围的片场线索，则把一种更危险的可能性推到台前：布鲁斯不仅要对抗新敌人，还可能被哥谭体制重新视为必须清除的威胁。",
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
        body: "在第一部中，阿尔弗雷德替布鲁斯拆开暗藏炸药的信件而负伤。在病榻前两人坦诚相待，解开了历史心结。随着布鲁斯可能再次遭到警队围捕，阿尔弗雷德很可能继续镇守地下车间，承担情报、装备与撤离支援。",
      },
    ],
  },
  dory: {
    also: ["女管家朵莉", "Dory", "韦恩塔女管家", "朵莉", "Wayne Housekeeper"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "韦恩塔常驻女管家，负责起居打理与信件转交，在炸弹包裹爆炸后沉痛通知布鲁斯。", href: "/recap", hash: "the-batman" },
    ],
    places: ["wayne-tower"],
    stills: ["/media/portraits/dory.jpg"],
    sections: [
      {
        heading: "韦恩塔的忠诚守护者",
        body: "由桑德拉·狄金森（Sandra Dickinson）饰演。朵莉是布鲁斯·韦恩深居韦恩塔顶层期间为数不多能够近距离接触他的忠诚佣人与管家。她默默协助阿尔弗雷德照料这位生活毫无规律、拒绝扮演名流公子的年轻家主，代表了韦恩家宅内温情与人情味的最后一丝守候。",
      },
      {
        heading: "致命包裹与信件转交",
        body: "在谜语人将装有塑胶炸药的匿名包裹寄往韦恩塔时，朵莉签收并将其转交予阿尔弗雷德；当布鲁斯在外面察觉危险拼命致电警告时，电话那头朵莉颤抖着告知爆炸已经发生。该角色被广泛视为导演马特·里夫斯对 1966 年版《蝙蝠侠》经典管家哈丽特阿姨（Aunt Harriet）的当代致敬。",
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
    also: ["马丁内斯警官", "Officer Martinez", "GCPD 巡警"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "识别出致命地毯压脚铲凶器；并在体育馆洪灾中协助戈登疏散防守受困市民。", href: "/recap", hash: "the-batman" },
      { work: "电影《新蝙蝠侠2》", note: "吉尔·佩雷斯-亚伯拉罕确认回归，继续作为戈登警局的一线中坚力量。", href: "/dossier" },
    ],
    places: ["gcpd"],
    stills: ["/media/still-martinez.jpg"],
    sections: [
      {
        heading: "从戒备抵触到侦查互信",
        body: "在哥谭市警局总部勘验市长遇害现场时，马丁内斯警官最初对未经授权介入的蒙面义警抱有强烈戒备与敌对情绪，代表了身处哥谭道德火线与体制重压下恪尽职守的底层一线巡警。",
      },
      {
        heading: "识别致命凶器与体育馆生死防御",
        body: "在谜语人家中搜查时，马丁内斯凭借基层经验一眼认出凶手遗留工具为铺设地毯专用的压脚铲（Carpet Tucker），帮助蝙蝠侠揭开公寓暗格与密谋底图；在洪峰摧毁哥谭广场体育馆时，他与戈登并肩救援疏散民众，成长为值得信任的正义同盟。演员吉尔·佩雷斯-亚伯拉罕已确认在《新蝙蝠侠2》中回归。",
      },
    ],
  },
  savage: {
    also: ["皮特·萨维奇", "Pete Savage", "GCPD 局长", "萨维奇局长", "Police Commissioner Savage"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "哥谭市警局局长，严厉排斥蝙蝠侠，后遭谜语人以老鼠铁笼残忍处决并曝光涉毒黑金。", href: "/recap", hash: "the-batman" },
    ],
    places: ["gcpd", "city-hall"],
    stills: ["/media/portraits/savage.jpg"],
    sections: [
      {
        heading: "黑金泥潭中的警队最高长官",
        body: "由亚历克斯·费恩斯（Alex Ferns）饰演。哥谭市警察局（GCPD）局长，表面上在媒体前誓言将谋害市长的凶手绳之以法，并对戈登私自放任蒙面义警踏入市长犯罪现场大发雷霆。然而其威严的官方形象背后，早已沦为法尔科内黑道帝国的体制傀儡。",
      },
      {
        heading: "老鼠笼处决与毒品黑幕曝光",
        body: "作为谜语人「不要再说谎」清洗计划的第二名关键目标，萨维奇在警局外健身完毕后遭谜语人伏击绑架。谜语人将其头部扣入机关老鼠笼、用饥饿的下水道老鼠对其施以酷刑并残忍勒死，随后在全网直播其处决惨状并公开警方档案——证实萨维奇长期直接从法尔科内的「滴答」毒品网络中抽取巨额黑金红利，成为引爆警局体制信任危机的轰动大案。",
      },
    ],
  },
  bock: {
    also: ["麦肯齐·博克", "Chief Mackenzie Bock", "GCPD 重案组长", "博克警监", "Con O'Neill"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "GCPD 重案组主管警监，主导命案调查并多次在案发现场与警局总部与蝙蝠侠产生正面对峙。", href: "/recap", hash: "the-batman" },
      { work: "限定剧《企鹅人》", note: "继续以 GCPD 高级警官身份现身，处理洪灾后的城市治安与帮派冲突。", href: "/recap", hash: "the-penguin" },
    ],
    places: ["gcpd", "city-hall"],
    stills: ["/media/portraits/bock.jpg"],
    sections: [
      {
        heading: "恪守警纪的重案组铁腕指挥",
        body: "由康·奥尼尔（Con O'Neill）饰演。哥谭市警察局重案组（MCU）主管兼高级警监。与戈登私下倚重蒙面义警的做法相反，博克是一位深谙官僚体制与警察条例的资深指挥官，对蝙蝠侠介入警方机密刑事调查始终抱有根深蒂固的不信任与敌意。",
      },
      {
        heading: "总部围捕与权力接管",
        body: "在萨维奇局长遇害后，博克实质接管重案侦办与戒备指挥权。在检察官科尔森葬礼爆炸后，蝙蝠侠被带回警局总部审讯，博克率领重案组警探与 SWAT 特警步步紧逼，严厉要求强行摘下蝙蝠侠面具，迫使戈登假意出拳引发混乱掩护蝙蝠侠飞跃天台逃脱。该角色在限定剧《企鹅人》中延续登场，展现了灾后警局重整秩序的艰难维系。",
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
  kenzie: {
    also: ["威廉·肯齐", "William Kenzie", "GCPD 腐败警探", "黑警肯齐"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "法尔科内涉黑眼线，协助控制并谋害安妮卡，在码头被蝙蝠侠制服塞入汽车后备箱。", href: "/recap", hash: "the-batman" },
    ],
    places: ["gcpd", "iceberg"],
    stills: ["/media/still-morgue.jpg"],
    sections: [
      {
        heading: "法尔科内安插在警局的黑道内鬼",
        body: "威廉·肯齐表面上是哥谭市警局的资深警探，实则是黑帮教父卡尔迈恩·法尔科内以「滴答」黑金和毒品利润长期买通的高级眼线。他在警局内部监视调查进展，向黑帮通风报信，是警局内部体制性腐败的典型化身。",
      },
      {
        heading: "绑架安妮卡与后备箱人赃俱获",
        body: "在安妮卡意外窃听到法尔科内作为联邦线人出卖萨尔瓦多·马罗尼的秘密后，肯齐奉命参与围捕与灭口。在冰山俱乐部后巷与码头转运期间，肯齐被突袭的蝙蝠侠与瑟琳娜正面对决并迅速制服，随后被塞入汽车后备箱展开残酷审讯，直接坐实了警局高层与法尔科内犯罪集团的勾结网。",
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
  "mitchell-son": {
    also: ["米切尔市长之子", "Don Mitchell Jr.'s Son", "市长遗孤", "Archie Barnes"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "市长之子，在万圣节当晚目睹凶案后续，在市政厅葬礼中被布鲁斯舍身扑救。", href: "/recap", hash: "the-batman" },
    ],
    places: ["city-hall", "gsg"],
    stills: ["/media/portraits/mitchell-son.jpg"],
    sections: [
      {
        heading: "万圣节血案的少年遗孤",
        body: "由阿奇·巴恩斯（Archie Barnes）饰演。哥谭市长唐·米切尔年幼的儿子。在万圣节夜晚身穿红色忍者万圣服回家后目睹父亲惨死，成为连环杀手谜语人血洗哥谭官场的首位直接受害家属。在案发现场与布鲁斯·韦恩发生沉默而深切的眼神交汇，瞬间勾起布鲁斯童年在犯罪巷痛失双亲的创伤记忆。",
      },
      {
        heading: "教堂救赎与希望的投射",
        body: "在市政厅为市长举行追悼会时，遭项圈炸弹劫持的检察官科尔森驾车撞碎教堂大门，布鲁斯不顾自身安危飞身飞扑将市长之子掩护在身下，险死还生救其一命；在片尾体育馆洪峰漫灌时，蝙蝠侠再次向困在废墟中的他伸出救援之手，少年握紧蝙蝠侠手臂的特写标志着蝙蝠侠从单纯的「复仇使者」彻底转变为象征城市的「希望之光」。",
      },
    ],
  },
  annika: {
    also: ["安妮卡·科索洛夫", "瑟琳娜密友", "44 Below 服务生"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "冰山俱乐部服务生，因知晓告密者机密被法尔科内掐死。", href: "/recap", hash: "the-batman" },
    ],
    places: ["iceberg"],
    stills: ["/media/lounge.jpg"],
    sections: [
      {
        heading: "冰山俱乐部的无辜目击者",
        body: "爱沙尼亚籍移民，冰山俱乐部地下酒吧 44 Below 的服务生，同时也是瑟琳娜·凯尔相依为命的室友与密友。在陪伴市长唐·米切尔期间，她无意中得知了法尔科内正是当年向警方告密出卖马罗尼的“老鼠”这一足以颠覆哥谭政黑格局的致命机密。",
      },
      {
        heading: "后备箱藏尸与复仇导火索",
        body: "在机密泄露后遭法尔科内残忍掐死灭口并藏尸于码头汽车后备箱中。蝙蝠侠与瑟琳娜追踪毒资时发现了她的遗体。安妮卡的惨死彻底击碎了瑟琳娜对哥谭仅存的留恋，促使其拔枪对峙生父法尔科内，成为推动全片后半程黑幕爆发的关键死者。",
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
  twins: {
    also: ["双胞胎门卫", "The Twins", "冰山俱乐部保镖", "卡维尔兄弟", "Iceberg Bouncers"],
    appearances: [
      { work: "电影《新蝙蝠侠》", note: "把守冰山俱乐部地面正门与 44 Below 地下特权区，两次与蝙蝠侠爆发正面对决。", href: "/recap", hash: "the-batman" },
    ],
    places: ["iceberg"],
    stills: ["/media/lounge.jpg"],
    sections: [
      {
        heading: "冰山俱乐部的冷血门禁",
        body: "由查理·卡维尔与麦克斯·卡维尔饰演的双胞胎兄弟，是冰山俱乐部（Iceberg Lounge）及其中央地下会所「44 Below」的贴身保镖与守门人。他们体格强悍、面目冰冷，忠实执行法尔科内与企鹅人的门禁指令，拦截一切非特权访客。",
      },
      {
        heading: "入口肉搏与地下权力见证",
        body: "在《新蝙蝠侠》中，双胞胎两次成为蝙蝠侠暴力突破的前沿关卡：第一次蝙蝠侠强闯夜店寻找企鹅人，在昏暗雨夜正门将二人瞬间重击制服；第二次蝙蝠侠护送戈登直扑法尔科内巢穴，再次在电梯前迎战双胞胎。他们作为哥谭黑道食物链底层的铜墙铁壁，见证了法尔科内帝国的崩塌。",
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
        body: "在《企鹅人》八集剧集中，他击溃法尔科内与马罗尼家族核心势力，甚至灭口唯一信任的心腹维克托，彻底登顶哥谭地下新王。科林·法瑞尔确认回归。已经登顶地下世界的奥兹重新进入棋局后，城市重建、警政资源与黑市网络都可能成为他继续扩张的筹码。",
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
