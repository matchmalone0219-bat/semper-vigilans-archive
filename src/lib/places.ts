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
  lede: "哥谭是一座被雨、雾与阶级锁死的东北部港口都市：官僚腐败、贫富悬殊、巷弄终年潮湿。城市本身低于海平面，港湾外筑防洪大堤才把海水挡在外面——这座堤一旦失守，整座城就会被自己的地理惩罚。",
  facts: [
    { label: "市徽格言", value: "Sic Parvis Magna · 伟大源于微小" },
    { label: "地势", value: "低于海平面，港湾以外筑防洪大堤" },
    { label: "现任市长", value: "贝拉·蕾尔（2022 年大选当选）" },
    { label: "前任市长", value: "唐·米切尔（约 2007–2022 万圣节遇害）" },
    { label: "建城传说", value: "有记载称 1724 年由建筑师威廉·哥谭奠基，此说在宇宙内亦存争议" },
    { label: "旧豪门", value: "韦恩家族与阿卡姆家族并立；阿卡姆家约在建城前后创办州立医院" },
    { label: "取景参照", value: "纽约都会骨架 · 格拉斯哥天际线 · 利物浦与伦敦实景" },
  ],
  boroughs: [
    { name: "下城区", nameEn: "Downtown", source: "电影《新蝙蝠侠》", note: "成片主舞台，设定地图最完整" },
    { name: "中城区", nameEn: "Midtown", source: "限定剧《企鹅人》", note: "剧中地图补出，电影未展开" },
    { name: "上城区", nameEn: "Uptown", source: "限定剧《企鹅人》", note: "剧中地图补出，电影未展开" },
  ],
  districts: [
    { name: "派克街", nameEn: "Park Row", note: "剧院后巷，韦恩夫妇遇刺处" },
    { name: "皇冠角", nameEn: "Crown Point", note: "洪水重创的贫民区，企鹅人火拼主场" },
    { name: "布莱克门岛", nameEn: "Blackgate Isle", note: "重刑监狱，萨尔瓦托·马罗尼曾关押于此" },
    { name: "哥谭广场", nameEn: "Gotham Square", note: "霓虹商圈，造型参照纽约时代广场" },
    { name: "金融区", nameEn: "Financial District", note: "韦恩塔所在的都会核心" },
  ],
  families: [
    { name: "韦恩家族", note: "实业与慈善。托马斯参选市长，旧庄园捐建孤儿院" },
    { name: "阿卡姆家族", note: "玛莎母系名门。创办阿卡姆州立医院，家族病史曾被长期隐瞒封锁" },
    { name: "法尔科内家族", note: "卡尔迈恩治下的旧黑帮秩序，2022 年覆灭" },
    { name: "马罗尼家族", note: "与法尔科内并立，首领曾囚于布莱克门" },
    { name: "吉甘特家族", note: "法尔科内残部重组，与企鹅人火拼后溃败" },
    { name: "科布家族", note: "奥兹登顶后的新黑帮，现为地下秩序" },
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
    people: ["thomas", "martha", "bruce", "edward", "selina"],
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
    people: ["thomas", "martha", "bruce"],
    works: "前传小说 · 电影《新蝙蝠侠》",
    body: [
      "派克街是哥谭旧城区的一条狭窄巷弄，邻近君主剧院。2002 年前后，托马斯与玛莎·韦恩携幼年布鲁斯看完电影后，在此遭持枪歹徒枪杀。布鲁斯活了下来，这座城市没有。",
      "后巷因此成为本宇宙的创伤原点：它既是韦恩慈善神话的断裂处，也是布鲁斯选择成为蝙蝠侠的理由。成片以雨夜、涂鸦与逼仄透视还原这条巷子，而不是一座被供奉的纪念碑。",
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
      "位于哥谭金融区的哥特式摩天大楼。旧庄园捐出后，布鲁斯常年深居于顶层阁楼，并在阿尔弗雷德照料下训练与办案；地底连通秘密车间。成片天际线里还可见「Gotham Empire」一类纽约帝国大厦式的巨幅楼标。",
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
      "布鲁斯在此维护战车与战衣，并回放智能隐形眼镜记录的夜巡影像。续集片场出现的雪地胎、战损车身与追车调度，也暗示地下车间将再次成为战车维修、路线规划与紧急撤离的行动中枢。",
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
      "哥谭治安的核心指挥中枢，但在前作中暴露出系统性腐败问题。吉姆·戈登中尉在此任职，并多次力排众议将蝙蝠侠带入物证室与停尸间协助勘验线索。",
      "警局天台架设着标志性的蝙蝠信号灯。戈登与马丁内斯均确认回归，结合片场中警车与 SWAT 装甲车围剿战车的场面，预示着 GCPD 内部将面临新的动荡与考验。",
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
      "卡尔迈恩·法尔科内遇刺后，该产业在剧集《企鹅人》中成为黑帮激烈争夺的焦点，最终被奥兹·科布牢牢掌控，成为其黑帮帝国的指挥中枢。",
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
      "哥谭低于海平面，整座城靠港湾外的防洪大堤把海水挡在外面。堤坝既是地理事实，也是腐败工程：偷工减料与「新生」基金黑金缠在一起，把城市的生存交给一张纸。",
      "万圣节大选夜，谜语人信徒在七处受力点同步引爆炸药货车，大堤溃坝，海水灌入低洼街区与哥谭广场花园体育馆。从阿卡姆病房窗口能看见河面上的火光——爱德华把自己的城市审判写成了水文灾难。",
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
      "哥谭市大型综合体育馆，命名方式对标纽约麦迪逊广场花园，实景取自伦敦 O2 体育馆。城市低于海平面，大堤一破，积水便灌向这处低洼集会点——选举夜数千市民与当选市长贝拉·蕾尔在此避难，却遭遇谜语人信徒伏击。",
      "蝙蝠侠在此跳入水中斩断带电电缆、点燃照明弹引导平民撤离，完成了从单纯的「复仇者」向城市守护者的蜕变。",
    ],
  },
  {
    id: "arkham",
    name: "阿卡姆州立医院 / 疯人院",
    nameEn: "Arkham State Hospital",
    also: "阿卡姆家族产业 · 重刑精神犯收押",
    image: "/media/places/arkham.jpg",
    imageAlt: "阿卡姆州立医院高戒备牢房，囚服背后印有院名",
    status: "高度戒备运转中",
    people: ["martha", "edward", "joker", "sofia"],
    works: "漫画《谜语人元年》 · 电影《新蝙蝠侠》 · 限定剧《企鹅人》",
    body: [
      "由哥谭历史名门阿卡姆家族于 18 世纪初创立，起初为收治重症精神疾患的医疗机构，后演变为主管收押极度危险刑事重犯的高戒备精神病院。官方命名为阿卡姆州立医院（Arkham State Hospital）。",
      "玛莎·阿卡姆早年因家族变故受创，曾在此长期接受治疗与疗养，家族亦动用权势封锁了相关诊疗档案。二十年后，这处高戒备机构相继关押了谜语人爱德华·纳什顿、神秘重犯（小丑）以及蒙冤受屈十年的索菲亚·法尔科内。",
      "作为哥谭精神秩序与极恶罪犯的集中地，阿卡姆不仅承载着韦恩母系的古老血脉历史，也是始终笼罩在整座罪恶都市上空的无形阴影。",
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
      "位于冰山俱乐部正对面的狭窄公寓，谜语人在此秘密观察法尔科内一举一动，收集政客腐败证据，张贴密密麻麻的剪报线索图，并向追随者发布线上暗杀指令与大坝爆破蓝图。在第一部中被警方搜查查封。",
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
      "哥谭市贫困边缘社区，低于海平面的地势使这里在大堤溃坝后受创最重：车辆翻覆成堆，街区几乎被冲毁。在《企鹅人》中，奥兹在此藏匿货源、招兵买马，并挑动法尔科内残部与马罗尼势力巷战，最终把皇冠角变成自己登顶的踏板。",
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
      "哥谭市政治与行政最高中枢，市政建筑上可见市徽格言 Sic Parvis Magna。前市长唐·米切尔与前检察官吉尔·科尔森曾在此办公并深涉法尔科内黑金网络；贝拉·蕾尔在第一部后宣誓就任新市长，推行灾后重建与反腐改革。",
    ],
  },
];

export const PLACE_MAP = Object.fromEntries(PLACES.map((p) => [p.id, p]));

export function placesOf(personId: string) {
  return PLACES.filter((p) => p.people.includes(personId));
}
