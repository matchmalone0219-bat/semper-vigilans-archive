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

export const PLACES: Place[] = [
  {
    id: "orphanage",
    name: "哥谭孤儿院",
    nameEn: "Gotham Orphanage",
    also: "原旧韦恩庄园",
    image: "/media/orphanage.jpg",
    imageAlt: "布鲁斯·韦恩在孤儿院公开出席追思活动",
    status: "仍在运转",
    people: ["waynes", "bruce", "edward", "selina"],
    works: "前传小说 · 漫画《谜语人元年》 · 电影《新蝙蝠侠》",
    body: [
      "前身为历史悠久的韦恩庄园，托马斯·韦恩在参选市长期间将其捐赠并改建为收容孤儿的慈善福利机构。幼年爱德华·纳什顿在此度过了凄苦的童年；而布鲁斯·韦恩则在双亲遇害后搬迁至韦恩塔顶层。",
      "在第一部中，这栋年久失修的破败建筑成为谜语人揭露韦恩家族慈善黑幕的关键线索之一，也是布鲁斯在夜巡后极少数以真实身份公开出席的场合。",
    ],
  },
  {
    id: "wayne-tower",
    name: "韦恩塔",
    nameEn: "Wayne Tower",
    also: "布鲁斯住所兼家族总部",
    image: "/media/still-bruce.jpg",
    imageAlt: "褪下头套、眼部留有眼妆的布鲁斯·韦恩在韦恩塔内",
    status: "核心居所",
    people: ["bruce", "alfred"],
    works: "前传小说 · 电影《新蝙蝠侠》 · 电影《新蝙蝠侠2》",
    body: [
      "位于哥谭市中心的哥特式摩天大楼。在旧庄园捐出后，布鲁斯常年深居于顶层阁楼公寓中，并在阿尔弗雷德的照料下进行日常训练与案件研究。地下深处则连通着秘密车间。",
      "续集中布鲁斯将继续以韦恩塔为根据地，在日益动荡的冬日城市中开展调查。",
    ],
  },
  {
    id: "cave",
    name: "地下车间 / 蝙蝠洞",
    nameEn: "The Workshop / Cave",
    also: "地下机车库与作战中心",
    image: "/media/still-alfred.jpg",
    imageAlt: "阿尔弗雷德在地下车间内，后方停泊着蝙蝠战车",
    status: "秘密运营中",
    people: ["bruce", "alfred"],
    works: "电影《新蝙蝠侠》 · 艺术设定集",
    body: [
      "并非天然形成的地下溶洞，而是位于韦恩塔地底深处、依托旧城市地下铁路网络改建而成的重工业工作坊。配备战车维修槽、机械加工台、监控大屏与战术装备架。",
      "布鲁斯在此维护改装蝙蝠战车与战衣，并反复回放头套摄像机记录的夜巡第一人称视频进行案情复盘。续集片场拍摄的战车便出自此处。",
    ],
  },
  {
    id: "gcpd",
    name: "哥谭市警察局总部",
    nameEn: "GCPD Headquarters",
    also: "停尸间 · 楼顶信号灯",
    image: "/media/still-gordon.jpg",
    imageAlt: "吉姆·戈登在警局办公区内",
    status: "正常运转",
    people: ["gordon", "martinez", "bruce", "bella", "colson"],
    works: "电影《新蝙蝠侠》 · 电影《新蝙蝠侠2》",
    body: [
      "哥谭治安的核心指挥中枢，但在前作中暴露出系统性腐败问题。吉姆·戈登中尉在此任职，并多次力排众议将蝙蝠侠带入物证室与停尸间协助勘验线索。",
      "警局天台上架设了标志性的蝙蝠信号灯。第二部中戈登与马丁内斯警官均已确认回归，继续坚守警界正义防线。",
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
    image: "/media/still-falcone.jpg",
    imageAlt: "卡尔迈恩·法尔科内在豪华顶层公寓中",
    status: "原主人身亡已易手",
    people: ["carmine", "selina", "sofia"],
    works: "电影《新蝙蝠侠》",
    body: [
      "位于冰山俱乐部上方的奢华私人顶层公寓，是卡尔迈恩·法尔科内接见政要、发号施令的权力中心。在第一部高潮中，法尔科内在此被揭露为出卖马罗尼的告密者，随后在步出大楼时遭到枪杀。",
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
      "哥谭市大型综合体育馆。在选举日当晚，数千名避难市民与新任市长候选人贝拉·蕾尔聚集于此，遭到谜语人信徒的武装伏击并面临决堤海水灌入的灭顶之灾。",
      "蝙蝠侠在此跳入水中斩断带电电缆、点燃照明弹引导平民撤离，完成了从单纯的「复仇者」向城市守护者的蜕变。",
    ],
  },
  {
    id: "arkham",
    name: "阿卡姆州立医院 / 疯人院",
    nameEn: "Arkham State Hospital",
    also: "重刑精神犯收押机构",
    image: "/media/riddler.jpg",
    imageAlt: "谜语人身着囚服被关押在阿卡姆病房内",
    status: "高度戒备运转中",
    people: ["edward", "joker", "sofia"],
    works: "漫画《谜语人元年》 · 电影《新蝙蝠侠》 · 限定剧《企鹅人》",
    body: [
      "哥谭市关押极度危险重犯与连环杀手的特殊医疗机构。谜语人爱德华·纳什顿与神秘重犯（小丑）均关押于此；索菲亚·法尔科内亦曾被不公关押长达十年并在剧终再度被送回。",
      "作为哥谭阴暗罪恶的聚集地，阿卡姆始终是笼罩在整座城市上空的无形阴影。",
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
    image: "/media/peng-coat.jpg",
    imageAlt: "企鹅人奥兹在皇冠角仓库指挥手下",
    status: "已被企鹅人势力掌控",
    people: ["oz", "victor", "sofia"],
    works: "限定剧《企鹅人》",
    body: [
      "哥谭市贫困边缘社区，受大洪水灾害破坏最为严重。在《企鹅人》剧集中，这里成为奥兹藏匿违禁品、招兵买马并与索菲亚军队展开残酷巷战的主战场，见证了奥兹一步步登顶的全过程。",
    ],
  },
  {
    id: "city-hall",
    name: "哥谭市政厅",
    nameEn: "Gotham City Hall",
    also: "市长办公室与检察院办公楼",
    image: "/media/peng-office.jpg",
    imageAlt: "哥谭市政办公大厅与城市徽标",
    status: "正常运转",
    people: ["bella", "mitchell", "colson"],
    works: "电影《新蝙蝠侠》 · 限定剧《企鹅人》",
    body: [
      "哥谭市政治与行政最高中枢。前市长唐·米切尔与前检察官吉尔·科尔森曾在此办公并深涉法尔科内黑金网络；贝拉·蕾尔在第一部后宣誓就任新市长并在此推行灾后重建与反腐改革。",
    ],
  },
];

export const PLACE_MAP = Object.fromEntries(PLACES.map((p) => [p.id, p]));

export function placesOf(personId: string) {
  return PLACES.filter((p) => p.people.includes(personId));
}
