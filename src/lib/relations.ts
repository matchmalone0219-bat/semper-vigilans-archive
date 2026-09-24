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
  desc?: string;
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
    x: 750,
    y: 36,
    note: "哥谭执法与行政体系，包含新任市长贝拉、正直警官戈登、重案组指挥层以及涉黑腐败高层。",
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
    x: 120,
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
    x: 120,
    y: 204,
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
    x: 120,
    y: 308,
    status: "alive",
    faction: "wayne",
    actor: "罗伯特·帕丁森",
    bio: [
      "化身义警的第二年。白天深居简出，夜晚以「复仇」之名巡行街头打击罪恶。里夫斯把他写成拒绝花花公子面具的隐士，并明说「像一个蝙蝠侠版的柯特·柯本」；《Something in the Way》是这条塑形的听觉锚点。在经历万圣节连环命案与洪灾救援后，他逐渐领悟到除了复仇，城市更需要象征希望的守护者。",
      "罗伯特·帕丁森已确认回归，故事会更聚焦面具下的布鲁斯。结合雪地战车遭警车与 SWAT 围堵的片场线索，他可能同时面对新敌人、城市体制与自身道德边界的三重夹击。",
    ],
  },
  {
    id: "alfred",
    name: "阿尔弗雷德",
    sub: "潘尼沃斯",
    x: 120,
    y: 412,
    status: "alive",
    faction: "wayne",
    actor: "安迪·瑟金斯",
    bio: [
      "布鲁斯最信任的导师与后方管家。在第一部炸弹袭击中幸存；安迪·瑟金斯已确认回归，预计继续承担地下车间的情报、装备与撤离支援。",
    ],
  },
  {
    id: "dory",
    name: "女管家朵莉",
    sub: "韦恩塔常驻女管家",
    x: 330,
    y: 308,
    status: "alive",
    faction: "wayne",
    actor: "桑德拉·狄金森",
    bio: [
      "韦恩塔顶层的常驻女管家与佣人，默默打理布鲁斯·韦恩的起居与信件，见证年轻家主的孤僻执念。在炸弹信件寄达时签收并转交阿尔弗雷德，险些一同遇难。",
    ],
  },
  {
    id: "bella",
    name: "贝拉·蕾尔",
    sub: "哥谭新任市长",
    x: 540,
    y: 108,
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
    x: 540,
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
    x: 540,
    y: 320,
    status: "alive",
    faction: "city",
    actor: "吉尔·佩雷斯-亚伯拉罕",
    bio: [
      "哥谭警局基层正直巡警，对义警最初抱有强烈戒备，但在搜查中凭专业经验识别出地毯裁刀关键凶器，并在体育馆洪灾中并肩疏散受困市民，已确认在续集中回归。",
    ],
  },
  {
    id: "savage",
    name: "皮特·萨维奇",
    sub: "GCPD 前任警察局长",
    x: 750,
    y: 108,
    status: "dead",
    faction: "city",
    actor: "亚历克斯·费恩斯",
    bio: [
      "哥谭市警察局长，严厉排斥蒙面义警介入办案。暗中深度接受法尔科内「滴答」毒品黑金贿赂，后遭谜语人以老鼠铁笼残忍处决并全网直播其涉腐罪证。",
    ],
  },
  {
    id: "bock",
    name: "麦肯齐·博克",
    sub: "GCPD 重案组主管警监",
    x: 750,
    y: 214,
    status: "alive",
    faction: "city",
    actor: "康·奥尼尔",
    bio: [
      "哥谭警局重案组（MCU）主管兼高级警监，深谙体制条例，恪守警察程序正义。在萨维奇遇害后主导全城戒备，在总部曾率重案组与特警围堵蝙蝠侠并欲强摘其面具。",
    ],
  },
  {
    id: "kenzie",
    name: "威廉·肯齐",
    sub: "GCPD 涉黑警探",
    x: 750,
    y: 320,
    status: "alive",
    faction: "city",
    actor: "彼得·麦克唐纳",
    bio: [
      "哥谭警局深涉黑金的资深警探，暗中为法尔科内效力并参与绑架安妮卡，最终在码头被蝙蝠侠制服关入汽车后备箱。",
    ],
  },
  {
    id: "mitchell",
    name: "唐·米切尔",
    sub: "前哥谭市长",
    x: 960,
    y: 108,
    status: "dead",
    faction: "city",
    actor: "鲁伯特·彭利-琼斯",
    bio: [
      "前任哥谭市长，万圣节首位遇害者。其官邸遇害后流出的密照直接牵扯出冰山俱乐部与权贵洗钱黑幕。",
    ],
  },
  {
    id: "mitchell-son",
    name: "米切尔市长之子",
    sub: "市长遗孤",
    x: 960,
    y: 214,
    status: "alive",
    faction: "city",
    actor: "阿奇·巴恩斯",
    bio: [
      "前市长唐·米切尔年幼的儿子。在万圣节目击凶案后与布鲁斯发生创伤共鸣；在追悼会险遭炸弹汽车碾压时被布鲁斯舍身扑救，在体育馆洪灾中见证蝙蝠侠化为希望象征。",
    ],
  },
  {
    id: "colson",
    name: "吉尔·科尔森",
    sub: "前地方检察官",
    x: 960,
    y: 320,
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
    x: 120,
    y: 560,
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
    x: 120,
    y: 680,
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
    y: 680,
    status: "dead",
    faction: "falcone",
    actor: "哈娜·赫尔齐奇",
    bio: [
      "瑟琳娜的室友兼挚友。因意外得知法尔科内是告密者的机密遭到法尔科内亲手灭口，成为激发猫女反抗黑帮的导火索。",
    ],
  },
  {
    id: "sofia",
    name: "索菲亚·法尔科内",
    sub: "法尔科内家族长女",
    x: 330,
    y: 560,
    status: "arkham",
    faction: "falcone",
    actor: "克里斯汀·米莉奥蒂",
    bio: [
      "卡尔迈恩之女，曾被父亲陷害关押阿卡姆十年。在《企鹅人》中出狱后发动家族清洗，但在与奥兹的夺权中落败，再次被收押回阿卡姆。",
    ],
  },
  {
    id: "twins",
    name: "双胞胎门卫",
    sub: "冰山俱乐部保镖",
    x: 330,
    y: 430,
    status: "alive",
    faction: "falcone",
    actor: "查理 & 麦克斯·卡维尔",
    bio: [
      "冰山俱乐部与地下会所 44 Below 的标志性双胞胎贴身守卫，曾两度在入口与蝙蝠侠爆发正面对决。",
    ],
  },
  {
    id: "oz",
    name: "奥兹·科布",
    sub: "企鹅人",
    x: 540,
    y: 560,
    status: "alive",
    faction: "under",
    actor: "科林·法瑞尔",
    bio: [
      "原法尔科内手下得力干将。在限定剧《企鹅人》中扫清对手、登顶哥谭地下新王；科林·法瑞尔确认回归，奥兹的黑市网络与政治关系也由此重新进入续集棋局。",
    ],
  },
  {
    id: "victor",
    name: "维克托·阿吉拉尔",
    sub: "企鹅人前副手",
    x: 540,
    y: 680,
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
    y: 560,
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
    y: 680,
    status: "rumor",
    faction: "arkham",
    actor: "巴里·基奥甘",
    bio: [
      "关押在阿卡姆疯人院的神秘重犯，第一部结尾曾隔墙与谜语人展开意味深长的对话。续集是否出场官方未确认。",
    ],
  },
];

export const EDGES: RelEdge[] = [
  {
    a: "thomas",
    b: "martha",
    label: "夫妻",
    kind: "bond",
    desc: "哥谭韦恩家族与阿卡姆家族的名门联姻，二人于 2002 年前后在派克街剧院后巷遇刺身亡。",
  },
  {
    a: "bruce",
    b: "thomas",
    label: "父子",
    kind: "blood",
    desc: "父亲生前设立百亿慈善基金并曾参选市长，其留下的遗产与涉黑传闻成为布鲁斯调查的核心谜团。",
  },
  {
    a: "bruce",
    b: "martha",
    label: "母子",
    kind: "blood",
    desc: "母亲出身阿卡姆家族的精神创伤史曾被托马斯试图隐瞒，是布鲁斯深埋心中的情感创伤。",
  },
  {
    a: "thomas",
    b: "carmine",
    label: "封口交易",
    kind: "foe",
    desc: "竞选期间托马斯委托法尔科内警告调查玛莎病史的记者，随后记者遇害，埋下家族涉黑阴影。",
  },
  {
    a: "bruce",
    b: "alfred",
    label: "抚养与导师",
    kind: "bond",
    desc: "父母遇害后唯一的抚养者与情报后方管家，在第一部炸弹暗杀中幸存并向布鲁斯坦承当年真相。",
  },
  {
    a: "bruce",
    b: "gordon",
    label: "正义盟友",
    kind: "ally",
    desc: "警局中唯一的正直战友，以蝙蝠信号灯联络布鲁斯，共同破获连环大案并开启制度抗争。",
  },
  {
    a: "gordon",
    b: "martinez",
    label: "警局同僚",
    kind: "ally",
    desc: "基层正直巡警，多次在命案现场与物证调查中协助戈登与蝙蝠侠维持秩序。",
  },
  {
    a: "bruce",
    b: "martinez",
    label: "线索互信",
    kind: "ally",
    desc: "从最初警局总部的敌对阻拦，到谜语人公寓认出关键地毯铲凶器并合力救援洪灾民众，建立起战壕互信。",
  },
  {
    a: "kenzie",
    b: "gordon",
    label: "警队内鬼",
    kind: "foe",
    desc: "身处同一警局却暗中为法尔科内通风报信，代表了哥谭警局深层体制性腐败。",
  },
  {
    a: "kenzie",
    b: "carmine",
    label: "黑金买通",
    kind: "foe",
    desc: "法尔科内安插在警局的涉黑耳目与打手，长期领取高额封口费并在法庭与街头为黑帮扫除障碍。",
  },
  {
    a: "bruce",
    b: "kenzie",
    label: "制服后备箱",
    kind: "foe",
    desc: "参与绑架安妮卡并在冰山俱乐部后门被蝙蝠侠和瑟琳娜截获制服，塞入汽车后备箱严加审讯。",
  },
  {
    a: "gordon",
    b: "bella",
    label: "市政合作",
    kind: "ally",
    desc: "新市长贝拉·蕾尔在洪灾后推行警队法制改革，戈登成为其重建城市秩序的关键依靠。",
  },
  {
    a: "bruce",
    b: "bella",
    label: "洪灾救援",
    kind: "ally",
    desc: "在体育馆集会遭遇谜语人信徒枪击时，蝙蝠侠斩断高压电缆在水中将其与受困市民救下。",
  },
  {
    a: "bruce",
    b: "selina",
    label: "复杂情感 / 前搭档",
    kind: "bond",
    desc: "在调查冰山俱乐部与法尔科内案中相识并互相吸引，恩怨了结后猫女告别哥谭远赴布鲁德海文。",
  },
  {
    a: "selina",
    b: "annika",
    label: "密友与室友",
    kind: "bond",
    desc: "瑟琳娜深爱的室友与密友，因探听到法尔科内是告密者的机密遭到谋害，促使瑟琳娜誓死复仇。",
  },
  {
    a: "carmine",
    b: "annika",
    label: "杀人灭口",
    kind: "kill",
    desc: "得知安妮卡知晓自己出卖马罗尼的秘密后，法尔科内亲手将其灭口弃尸。",
  },
  {
    a: "edward",
    b: "mitchell",
    label: "首桩暗杀",
    kind: "kill",
    desc: "万圣节当夜谜语人在市长官邸残忍杀死唐·米切尔，留下写给蝙蝠侠的加密谜语揭开清洗序幕。",
  },
  {
    a: "edward",
    b: "colson",
    label: "项圈炸弹处决",
    kind: "kill",
    desc: "在市长葬礼上给受贿检察官科尔森套上项圈炸弹，因其拒绝供出告密者而当众远程引爆。",
  },
  {
    a: "carmine",
    b: "colson",
    label: "黑金贿赂控制",
    kind: "foe",
    desc: "法尔科内用巨额黑金与毒品深度控制检察官科尔森，使其成为黑帮在司法系统的傀儡。",
  },
  {
    a: "selina",
    b: "carmine",
    label: "父女血缘",
    kind: "blood",
    desc: "卡尔迈恩年轻时抛弃的私生女，瑟琳娜潜入冰山俱乐部后当面与法尔科内清算弑母旧恨。",
  },
  {
    a: "sofia",
    b: "carmine",
    label: "父女血缘",
    kind: "blood",
    desc: "法尔科内家族长女，十年前被亲生父亲诬陷并关入阿卡姆疯人院，出狱后誓言血洗家族。",
  },
  {
    a: "selina",
    b: "sofia",
    label: "同父异母姐妹",
    kind: "blood",
    desc: "两人同为卡尔迈恩·法尔科内的亲生女儿，分别在街头与豪门阴影中生长。",
  },
  {
    a: "selina",
    b: "sofia",
    label: "狱中信件联络",
    kind: "bond",
    desc: "在限定剧《企鹅人》结局中，远在布鲁德海文的瑟琳娜向阿卡姆重度病房中的索菲亚寄去了关键信件。",
  },
  {
    a: "twins",
    b: "carmine",
    label: "贴身守卫",
    kind: "ally",
    desc: "法尔科内设立在 44 Below 私人顶层包厢入口的最严密守门人，执行严苛的面部识别与搜身。",
  },
  {
    a: "bruce",
    b: "twins",
    label: "入口肉搏",
    kind: "foe",
    desc: "布鲁斯两度硬闯冰山俱乐部正门与 44 Below，均在门厅与双胞胎爆发激烈的近身肉搏与骨裂格斗。",
  },
  {
    a: "twins",
    b: "oz",
    label: "门禁控制",
    kind: "ally",
    desc: "协助奥兹·科布维持俱乐部地面迎宾与地下VIP会员筛选，是冰山俱乐部安保防线的绝对中枢。",
  },
  {
    a: "oz",
    b: "carmine",
    label: "旧部反噬",
    kind: "foe",
    desc: "曾是法尔科内麾下的副官与跟班，在卡尔迈恩遇刺后迅速自立门户、争夺家族遗留权力版图。",
  },
  {
    a: "oz",
    b: "sofia",
    label: "夺权死敌",
    kind: "foe",
    desc: "在剧集《企鹅人》中围绕哥谭黑道霸权展开残酷博弈，最终奥兹设计将索菲亚再次送回阿卡姆。",
  },
  {
    a: "oz",
    b: "victor",
    label: "灭口清除",
    kind: "kill",
    desc: "登顶黑道之夜，奥兹为了不让自己拥有任何情感软肋，在桥下亲手掐死了忠心耿耿的徒弟维克托。",
  },
  {
    a: "bruce",
    b: "oz",
    label: "潜在冲突对立",
    kind: "foe",
    desc: "企鹅人已成为哥谭地下世界的实际掌控者，在《新蝙蝠侠2》中二人注定将发生全方位交锋。",
  },
  {
    a: "bruce",
    b: "edward",
    label: "互为宿敌",
    kind: "foe",
    desc: "谜语人以蝙蝠侠为引线刺杀权贵并炸毁海堤，在阿卡姆审讯室二人隔窗直面两套正义观的撕裂。",
  },
  {
    a: "edward",
    b: "carmine",
    label: "狙击暗杀",
    kind: "kill",
    desc: "在法尔科内走出俱乐部被警方逮捕的瞬间，谜语人从高层公寓远程狙杀了他，揭开腐败总根源。",
  },
  {
    a: "edward",
    b: "joker",
    label: "邻格囚徒",
    kind: "rumor",
    desc: "第一部结尾阿卡姆邻近病房中神秘囚徒与精神崩溃的谜语人隔墙交谈，暗示未来的邪恶结盟。",
  },
  {
    a: "bruce",
    b: "dory",
    label: "照料起居",
    kind: "bond",
    desc: "打理布鲁斯在韦恩塔顶层的起居与邮件，曾为其转交谜语人的带血信件并见证年轻家主的孤僻执念。",
  },
  {
    a: "alfred",
    b: "dory",
    label: "协同主管",
    kind: "ally",
    desc: "与阿尔弗雷德共同维持韦恩庄园与顶层塔楼运转；在炸弹信件寄达时险些一同罹难。",
  },
  {
    a: "mitchell",
    b: "mitchell-son",
    label: "市长父子",
    kind: "blood",
    desc: "市长唐·米切尔之子，万圣节目击惨剧现场的幼年遗孤。",
  },
  {
    a: "bruce",
    b: "mitchell-son",
    label: "创伤投射 / 舍身相救",
    kind: "bond",
    desc: "布鲁斯在命案现场与其发生深刻的心灵共鸣；在追悼会舍身扑救其免遭汽车撞击，在体育馆洪水中向其伸出希望之手。",
  },
  {
    a: "colson",
    b: "mitchell-son",
    label: "葬礼惊魂",
    kind: "foe",
    desc: "科尔森被项圈炸弹劫持驱车撞入市长追悼大厅，险些当场碾压市长遗孀与幼子。",
  },
  {
    a: "savage",
    b: "gordon",
    label: "斥责义警",
    kind: "foe",
    desc: "萨维奇局长严厉斥责戈登私自带蒙面义警进入市长案发现场；二人因办案程序与体制立场严重对立。",
  },
  {
    a: "savage",
    b: "carmine",
    label: "毒品分红",
    kind: "foe",
    desc: "警局最高指挥官，长期接受法尔科内「滴答」毒品黑金贿赂，为其提供体制庇护。",
  },
  {
    a: "edward",
    b: "savage",
    label: "老鼠笼处决",
    kind: "kill",
    desc: "谜语人连环暗杀的第二位受害者，在警局外被绑架并遭饥饿老鼠铁笼处决，生前涉黑视频被公开示众。",
  },
  {
    a: "bock",
    b: "gordon",
    label: "警监同僚",
    kind: "ally",
    desc: "重案组长与调查负责人，在萨维奇遇害后主导警局戒备与现场封控，对戈登与义警的合作多次质询但恪守警纪。",
  },
  {
    a: "bock",
    b: "bruce",
    label: "总部围捕",
    kind: "foe",
    desc: "在科尔森引爆后率重案组与特警在警局总部围堵蝙蝠侠并欲揭开其面具，迫使戈登假意出拳助其脱身。",
  },
  {
    a: "bock",
    b: "savage",
    label: "直接下属",
    kind: "ally",
    desc: "曾作为重案组长向萨维奇局长直接汇报案情，在其遇害后接管凶案侦办指挥权。",
  },
];

export const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n]));

export const PORTRAITS: Record<string, { src: string; note?: string }> = {
  thomas: { src: "/media/portraits/thomas.jpg", note: "卢克·罗伯茨 饰 托马斯·韦恩" },
  martha: { src: "/media/portraits/martha.jpg", note: "斯特拉·斯托克 饰 玛莎·韦恩" },
  bruce: { src: "/media/portraits/bruce.jpg", note: "罗伯特·帕丁森 饰 布鲁斯·韦恩" },
  alfred: { src: "/media/portraits/alfred.jpg", note: "安迪·瑟金斯 饰 阿尔弗雷德" },
  dory: { src: "/media/portraits/dory.jpg", note: "桑德拉·狄金森 饰 女管家朵莉" },
  bella: { src: "/media/portraits/bella.jpg", note: "洁米·劳森 饰 贝拉·蕾尔" },
  gordon: { src: "/media/portraits/gordon.jpg", note: "杰弗里·怀特 饰 吉姆·戈登" },
  martinez: { src: "/media/portraits/martinez.jpg", note: "吉尔·佩雷斯-亚伯拉罕 饰 马丁内斯" },
  bock: { src: "/media/portraits/bock.jpg", note: "康·奥尼尔 饰 麦肯齐·博克警监" },
  savage: { src: "/media/portraits/savage.jpg", note: "亚历克斯·费恩斯 饰 皮特·萨维奇局长" },
  colson: { src: "/media/portraits/colson.jpg", note: "彼得·萨斯加德 饰 吉尔·科尔森" },
  mitchell: { src: "/media/portraits/mitchell.jpg", note: "鲁伯特·彭利-琼斯 饰 唐·米切尔市长" },
  "mitchell-son": { src: "/media/portraits/mitchell-son.jpg", note: "阿奇·巴恩斯 饰 米切尔市长之子" },
  annika: { src: "/media/portraits/annika.jpg", note: "哈娜·赫尔日奇 饰 安妮卡·科索洛夫" },
  carmine: { src: "/media/portraits/carmine.jpg", note: "约翰·特托罗 饰 卡尔迈恩·法尔科内" },
  selina: { src: "/media/portraits/selina.jpg", note: "佐伊·克拉维茨 饰 瑟琳娜·凯尔" },
  sofia: { src: "/media/portraits/sofia.jpg", note: "克里斯汀·米莉奥蒂 饰 索菲亚·法尔科内" },
  oz: { src: "/media/portraits/oz.jpg", note: "科林·法瑞尔 饰 奥兹·科布" },
  victor: { src: "/media/portraits/victor.jpg", note: "伦齐·费利兹 饰 维克托·阿吉拉尔" },
  edward: { src: "/media/portraits/edward.jpg", note: "保罗·达诺 饰 谜语人" },
  joker: { src: "/media/portraits/joker-v2.jpg", note: "巴里·基奥甘 饰 阿卡姆神秘重犯" },
  kenzie: { src: "/media/portraits/kenzie.jpg", note: "彼得·麦克唐纳 饰 威廉·肯齐" },
  twins: { src: "/media/portraits/twins.jpg", note: "查理 & 麦克斯·卡维尔 饰 双胞胎门卫" },
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
