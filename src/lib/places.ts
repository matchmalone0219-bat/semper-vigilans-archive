export type Place = {
  id: string;
  name: string;
  nameEn: string;
  also: string;
  image: string;
  imageAlt: string;
  status: string;
  people: string[];
  works: string;
  body: string[];
};

export const GOTHAM_CITY = {
  motto: "Sic Parvis Magna",
  mottoZh: "伟大源于微小",
  lede: "哥谭是一座被雨、雾与阶级固化的东北部港口都市：官僚腐败、贫富悬殊、巷弄终年潮湿。城市整体地势低于海平面，全赖港湾外的防洪大堤抵御海水——这座大堤一旦失守，整座城市便会遭受自身地理宿命的无情反噬。",
  facts: [
    { label: "市徽格言", value: "Sic Parvis Magna · 伟大源于微小" },
    { label: "地势特征", value: "整体地势低于海平面，依仗港湾防洪大堤抵御海水" },
    { label: "现任市长", value: "贝拉·蕾尔（2022 年大选胜选就任）" },
    { label: "前任市长", value: "唐·米切尔（任期约 2007–2022，万圣节遇害）" },
    { label: "建城记录", value: "市徽铭文记载为 1724 年；传说由建筑师威廉·哥谭奠基，宇宙内亦存争议" },
    { label: "视觉取景", value: "纽约都会骨架 · 格拉斯哥与利物浦街景天际线 · 伦敦实景" },
  ],
  boroughs: [
    { name: "下城区", nameEn: "Downtown", source: "电影《新蝙蝠侠》", note: "成片主舞台，拥有最完整的官方设定地图" },
    { name: "中城区", nameEn: "Midtown", source: "限定剧《企鹅人》", note: "剧中地图补完，电影尚未深入展开" },
    { name: "上城区", nameEn: "Uptown", source: "限定剧《企鹅人》", note: "剧中地图补完，电影尚未深入展开" },
  ],
  districts: [
    { name: "派克街", nameEn: "Park Row", note: "君主剧院后巷，韦恩夫妇遇刺身亡与犯罪巷原型" },
    { name: "皇冠角", nameEn: "Crown Point", note: "遭大洪水重创的沿河贫民街区，《企鹅人》火拼主战场" },
    { name: "布莱克门岛", nameEn: "Blackgate Isle", note: "关押重刑犯的近海岛屿监狱，萨尔瓦托·马罗尼曾囚禁于此" },
    { name: "哥谭广场", nameEn: "Gotham Square", note: "霓虹汇聚的繁华商圈，视觉原型参照纽约时代广场" },
    { name: "金融区", nameEn: "Financial District", note: "韦恩塔与各大财阀驻扎的都会核心" },
  ],
  families: [
    { name: "法尔科内家族", note: "卡尔迈恩·法尔科内掌控数十年的旧日黑金帝国，2022 年分崩离析" },
    { name: "马罗尼家族", note: "曾与法尔科内分庭抗礼的黑帮巨头，首领死于阿卡姆与企鹅人反扑" },
    { name: "吉甘特家族", note: "索菲亚回归后重组法尔科内残部改姓吉甘特，与企鹅人火拼后覆灭" },
    { name: "科布家族", note: "奥兹·科布（企鹅人）踩着各方尸骨登顶后建立的全新地下秩序" },
  ],
} as const;

export const PLACES: Place[] = [
  {
    id: "orphanage",
    name: "哥谭孤儿院",
    nameEn: "Gotham Orphanage",
    also: "原旧韦恩庄园",
    image: "/media/orphanage.jpg",
    imageAlt: "破败荒废的哥谭孤儿院旧址与调查现场",
    status: "仍在运转",
    people: ["waynes", "bruce", "edward", "selina"],
    works: "前传小说 · 漫画《谜语人元年》 · 电影《新蝙蝠侠》",
    body: [
      "前身为历史悠久的韦恩庄园，托马斯·韦恩在参选市长期间将其捐赠并改建为收容孤儿的慈善福利机构。幼年爱德华·纳什顿在此度过了凄苦的童年；而布鲁斯·韦恩则在双亲遇害后搬迁至韦恩塔顶层。",
      "在第一部中，这栋年久失修的荒废建筑成为谜语人揭露韦恩家族慈善黑幕的关键线索，蝙蝠侠与戈登在此勘验发现了指向托马斯·韦恩过往秘密的关键录像。",
    ],
  },
  {
    id: "park-row",
    name: "派克街 / 剧院后巷",
    nameEn: "Park Row",
    also: "君主剧院一带 · 韦恩夫妇遇刺处",
    image: "/media/places/park-row.jpg",
    imageAlt: "雨夜哥谭街巷，蝙蝠侠在潮湿路面上夜巡",
    status: "旧案现场",
    people: ["waynes", "bruce"],
    works: "前传小说 · 电影《新蝙蝠侠》",
    body: [
      "派克街（Park Row）是哥谭旧城区的一条狭窄街巷，邻近君主剧院（Monarch Theater）。2002 年前后，托马斯与玛莎·韦恩携幼年布鲁斯观影散场后步入后巷，遭持枪歹徒劫杀身亡。布鲁斯活了下来，这座城市没有。",
      "后巷因此成为里夫斯宇宙的创伤原点：它既是韦恩家族慈善神话破灭的裂痕，也是布鲁斯选择化身蝙蝠侠夜巡的理由。成片以雨夜、涂鸦与逼仄透视勾勒这条陋巷，将其塑造成一座流血的伤口，而非被供奉的纪念碑。",
    ],
  },
  {
    id: "wayne-tower",
    name: "韦恩塔",
    nameEn: "Wayne Tower",
    also: "布鲁斯住所兼家族总部",
    image: "/media/places/wayne-tower.jpg",
    imageAlt: "黄昏时分自高处俯瞰哥谭河岸与天际线",
    status: "核心居所",
    people: ["bruce", "alfred"],
    works: "前传小说 · 电影《新蝙蝠侠》 · 电影《新蝙蝠侠2》",
    body: [
      "位于哥谭金融区的哥特式摩天大楼。在旧庄园捐出后，布鲁斯常年深居于顶层阁楼公寓中，并在阿尔弗雷德的照料下进行日常体能训练与案件推演；大楼地底深处则连通着秘密车间。成片天际线中亦可辨识出如「Gotham Empire」等带有纽约帝国大厦风格的复古巨幅楼标。",
      "续集中韦恩塔将继续维系双重使命：白天是布鲁斯难以回避的显赫家族门面，黑夜中则是他抵御全城围剿、洞悉哥谭阴谋的绝对安全屋。",
    ],
  },
  {
    id: "cave",
    name: "地下车间 / 蝙蝠洞",
    nameEn: "The Workshop / Cave",
    also: "地下机车库与作战中心",
    image: "/media/places/cave.jpg",
    imageAlt: "韦恩塔地底车间，蝙蝠战车停在维修槽内，两侧是监控屏与工具台",
    status: "秘密运营中",
    people: ["bruce", "alfred"],
    works: "电影《新蝙蝠侠》 · 艺术设定集",
    body: [
      "并非天然形成的地下溶洞，而是位于韦恩塔地底深处、依托旧城市地下铁路网络改建而成的重工业工作坊。配备战车维修槽、机械加工台、监控大屏与战术装备架。",
      "布鲁斯在此维护战车与战衣，并回放头套摄像机记录的夜巡影像。续集片场出现的雪地胎、战损车身与追车调度，也暗示地下车间将再次成为战车维修、路线规划与紧急撤离的行动中枢。",
    ],
  },
  {
    id: "gcpd",
    name: "哥谭市警察局总部",
    nameEn: "GCPD Headquarters",
    also: "停尸间 · 楼顶信号灯",
    image: "/media/places/gcpd.jpg",
    imageAlt: "哥谭市警局屋顶亮起的蝙蝠信号灯",
    status: "正常运转",
    people: ["gordon", "martinez", "bruce", "bella", "colson"],
    works: "电影《新蝙蝠侠》 · 电影《新蝙蝠侠2》",
    body: [
      "哥谭治安的核心指挥中枢，但在前作中暴露出系统性腐败问题。吉姆·戈登在此任职，并多次力排众议将蝙蝠侠带入物证室与停尸间协助勘验线索。",
      "警局天台架设着标志性的蝙蝠信号灯。戈登与马丁内斯均确认回归，结合续集片场中警车与 SWAT 装甲车围剿战车的场面，预示着 GCPD 内部将面临新的动荡与立场考验。",
    ],
  },
  {
    id: "iceberg",
    name: "冰山俱乐部",
    nameEn: "Iceberg Lounge",
    also: "地下酒吧 44 Below",
    image: "/media/lounge.jpg",
    imageAlt: "冰山俱乐部华丽幽暗的内部大厅",
    status: "已被企鹅人接管",
    people: ["carmine", "oz", "selina", "sofia", "annika"],
    works: "漫画《谜语人元年》 · 电影《新蝙蝠侠》 · 限定剧《企鹅人》",
    body: [
      "哥谭市最著名的高端地下夜总会，表面上是政商名流寻欢作乐的场所，地下隐秘夹层「44 Below」则是法尔科内掌控毒品交易与政客受贿的秘密据点。",
      "卡尔迈恩·法尔科内遇刺后，该产业在限定剧《企鹅人》中成为黑帮激烈争夺的焦点，最终被奥兹·科布牢牢掌控，成为其黑帮帝国的指挥中枢。",
    ],
  },
  {
    id: "falcone",
    name: "法尔科内顶层豪宅",
    nameEn: "Falcone's Penthouse",
    also: "前黑帮教父私人官邸",
    image: "/media/places/falcone.jpg",
    imageAlt: "雨夜中的冰山俱乐部大楼外立面，法尔科内顶层豪宅位于此楼之上",
    status: "原主人身亡已易手",
    people: ["carmine", "selina", "sofia"],
    works: "电影《新蝙蝠侠》",
    body: [
      "位于冰山俱乐部上方的奢华私人顶层公寓，是卡尔迈恩·法尔科内接见政要、发号施令的权力中心。在第一部高潮中，法尔科内在此被揭露为出卖马罗尼的告密者，随后在步出大楼时遭到枪杀。",
    ],
  },
  {
    id: "seawall",
    name: "防洪大堤 / 港湾",
    nameEn: "Gotham Seawall",
    also: "低于海平面的城市生命线",
    image: "/media/places/seawall.jpg",
    imageAlt: "从阿卡姆窗口看见防洪大堤七点同步爆炸，火光映在河面上",
    status: "已溃坝，灾后抢修中",
    people: ["edward", "bruce", "bella"],
    works: "漫画《谜语人元年》 · 电影《新蝙蝠侠》",
    body: [
      "哥谭地势低于海平面，整座城全靠港湾外的防洪大堤把海水挡在外面。这座大堤既是地理事实，也是腐败工程：偷工减料与托马斯·韦恩当年的「哥谭新生」（Renewal）基金黑金缠在一起，让整座城市的生存命脉形同虚设。",
      "万圣节大选夜，谜语人信徒在七处关键承重受力点同步引爆装满炸药的货车，大堤瞬间溃决，海水倒灌入沿岸低洼街区与哥谭广场花园体育馆。从阿卡姆病房窗口望去，火光染红了海面——爱德华将他对特权阶层的审判化作了一场吞没全城的水文浩劫。",
    ],
  },
  {
    id: "gsg",
    name: "哥谭广场花园体育馆",
    nameEn: "Gotham Square Garden",
    also: "市政竞选集会点 · 洪灾避难所",
    image: "/media/flood.jpg",
    imageAlt: "洪水漫灌体育馆后，蝙蝠侠点燃照明弹引导受困市民",
    status: "已完成灾后清淤修复",
    people: ["bella", "bruce", "gordon", "edward"],
    works: "电影《新蝙蝠侠》",
    body: [
      "哥谭市大型综合体育馆，命名方式对标纽约麦迪逊广场花园，实景取自伦敦 O2 体育馆。城市地势低于海平面，大堤一破，积水便迅速灌入这处低洼集会点——大选夜数千名市民与当选市长贝拉·蕾尔在此避难，却遭遇谜语人信徒的武装伏击。",
      "蝙蝠侠在此斩断带电高压电缆跃入水中、点燃照明弹引导平民撤离，完成了从单纯的「复仇者」向城市守护者的蜕变救赎。",
    ],
  },
  {
    id: "arkham",
    name: "阿卡姆州立医院 / 疯人院",
    nameEn: "Arkham State Hospital",
    also: "重刑精神犯收押机构",
    image: "/media/places/arkham.jpg",
    imageAlt: "阿卡姆州立医院高戒备牢房，囚服背后印有院名",
    status: "高度戒备运转中",
    people: ["edward", "joker", "sofia"],
    works: "漫画《谜语人元年》 · 电影《新蝙蝠侠》 · 限定剧《企鹅人》",
    body: [
      "哥谭市关押极度危险重犯与连环杀手的特殊医疗机构。蝙蝠侠第一年捕获的神秘重犯（小丑）关押于此近一年；谜语人爱德华·纳什顿在炸坝后被收押至高戒备病房；索菲亚·法尔科内曾遭家族诬陷在此不公关押十年，并在《企鹅人》剧终再度被送回。",
      "作为哥谭阴暗罪恶与精神畸变的聚集地，阿卡姆始终是笼罩在整座城市上空的无形阴影。",
    ],
  },
  {
    id: "riddler-room",
    name: "谜语人出租公寓",
    nameEn: "Riddler's Apartment",
    also: "案情剪报墙与网络作案窝点",
    image: "/media/still-lair.jpg",
    imageAlt: "谜语人公寓内部密密麻麻的调查剪报与计划图纸",
    status: "警方已查封清空",
    people: ["edward", "bruce"],
    works: "漫画《谜语人元年》 · 电影《新蝙蝠侠》",
    body: [
      "位于冰山俱乐部正对面的狭窄公寓，谜语人在此秘密观察法尔科内的一举一动，收集政客腐败证据，张贴密密麻麻的剪报线索图，并向追随者发布线上暗杀指令与大堤爆破蓝图。在第一部中被警方搜查查封。",
    ],
  },
  {
    id: "crown-point",
    name: "皇冠角贫民区",
    nameEn: "Crown Point",
    also: "企鹅人发迹与火拼战场",
    image: "/media/places/crown-point.jpg",
    imageAlt: "洪水过后的皇冠角贫民区，车辆被冲积翻覆成堆",
    status: "已被企鹅人势力掌控",
    people: ["oz", "victor", "sofia"],
    works: "限定剧《企鹅人》",
    body: [
      "哥谭市贫困边缘社区，低于海平面的地势使这里在大堤溃坝后受创最重：车辆翻覆成堆，街区几乎被冲毁。在限定剧《企鹅人》中，奥兹在此藏匿 Bliss 货源、招兵买马，并挑动法尔科内残部与马罗尼势力巷战，最终把皇冠角变成自己登顶新王的踏板。",
    ],
  },
  {
    id: "city-hall",
    name: "哥谭市政厅",
    nameEn: "Gotham City Hall",
    also: "市长办公室与检察院办公楼",
    image: "/media/places/city-hall.jpg",
    imageAlt: "洪水漫灌后的哥谭市政厅柱廊、骑士铜像与 CITY HALL 字样",
    status: "正常运转",
    people: ["bella", "mitchell", "colson"],
    works: "电影《新蝙蝠侠》 · 限定剧《企鹅人》",
    body: [
      "哥谭市政治与行政最高中枢，古老的市政建筑上可见市徽格言 Sic Parvis Magna（伟大源于微小）。前市长唐·米切尔与前检察官吉尔·科尔森曾在此办公并深涉法尔科内黑金网络；贝拉·蕾尔在第一部后宣誓就任新市长，在此推行灾后重建与反腐改革。",
    ],
  },
];

export const PLACE_MAP = Object.fromEntries(PLACES.map((p) => [p.id, p]));

export function placesOf(personId: string) {
  return PLACES.filter((p) => p.people.includes(personId));
}
