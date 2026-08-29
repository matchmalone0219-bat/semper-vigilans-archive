export const FILM = {
  siteName: "Semper Vigilans",
  siteNameZh: "永远警惕",
  titleZh: "新蝙蝠侠2",
  titleEn: "The Batman: Part II",
  workingTitle: "Semper Vigilans",
  workingTitleZh: "永远警惕",
  sagaName: "The Batman Epic Crime Saga",
  sagaNameZh: "蝙蝠侠史诗犯罪传奇",
  releaseLabel: "2028 年 2 月 18 日",
  releaseIso: "2028-02-18T05:00:00.000Z",
  format: "史诗犯罪传奇",
} as const;

export const CONTENT_REVIEWED_AT = "2026.08.29";

export function pageTitle(page?: string) {
  return page ? `${page} · ${FILM.siteName}` : `${FILM.siteName} · 《${FILM.titleZh}》影迷档案站`;
}

export const FACTS: {
  label: string;
  value: string;
  source?: string;
  sourceUrl?: string;
  sourceTier?: "official" | "press" | "set";
}[] = [
  { label: "片名", value: "The Batman: Part II / 《新蝙蝠侠2》" },
  {
    label: "导演 / 编剧",
    value: "马特·里夫斯（Matt Reeves）执导，并与麦特森·汤姆林（Mattson Tomlin）联合编剧",
  },
  { label: "摄影", value: "埃里克·梅塞施密特（Erik Messerschmidt，代表作《曼克》《心灵猎人》）" },
  { label: "配乐", value: "迈克尔·吉亚奇诺（Michael Giacchino）是否回归目前尚未正式公布" },
  { label: "制片", value: "DC Studios · 6th & Idaho · Dylan Clark Productions" },
  {
    label: "发行",
    value: "华纳兄弟全球发行 · 北美定档 2028 年 2 月 18 日，全线登陆 IMAX 与杜比影院",
    source: "Variety · 2026.07.16",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-2-release-date-2028-first-footage-pattinson-38605/",
    sourceTier: "press",
  },
  {
    label: "片场制作代号",
    value: "Semper Vigilans（意为“永远警惕”）。该拉丁格言已见于英国片场标识",
    source: "STV News · 片场标识报道",
    sourceUrl: "https://news.stv.tv/west-central/is-glasgow-transforming-into-gotham-for-the-batman-part-ii-filming",
    sourceTier: "set",
  },
  {
    label: "主摄影",
    value: "导演里夫斯于 2026 年 6 月 12 日公开首张场记板照片，宣布续集在英国正式开拍",
    source: "导演公开贴文 · SuperHeroHype",
    sourceUrl: "https://www.superherohype.com/movies/672044-the-batman-2-director-matt-reeves-announces-filming-start-with-new-photo",
    sourceTier: "press",
  },
  {
    label: "公开外景",
    value: "英国利物浦与苏格兰格拉斯哥。格拉斯哥市中心自 8 月 18 日起展开实景封街拍摄，道路通告显示外景将持续至 9 月上旬。",
    source: "STV News / The Herald · 道路限制通告",
    sourceUrl: "https://www.heraldscotland.com/news/26411083.glasgow-road-closures-place-batman-part-ii-filming/",
    sourceTier: "press",
  },
  {
    label: "宇宙归属",
    value: `《新蝙蝠侠》（2022）直接续作，属于独立拓展的「${FILM.sagaNameZh}」（${FILM.sagaName}），与詹姆斯·古恩主导的 DCU 宇宙相互独立。`,
    source: "DC Studios 官方说明",
    sourceUrl: "https://www.dc.com/blog/2023/01/31/james-gunn-and-peter-safran-on-building-a-new-dc-universe",
    sourceTier: "official",
  },
];

export type Certainty = "confirmed" | "hint" | "rumor";

export const PLOT: {
  tag: Certainty;
  text: string;
  source?: string;
  sourceUrl?: string;
  sourceTier?: "official" | "press" | "set";
}[] = [
  {
    tag: "confirmed",
    text: "故事紧承第一部与限定剧《企鹅人》。科林·法瑞尔透露，续集大约从企鹅人夺取黑道控制权数周后的冬季接续。",
    source: "GamesRadar（引述科林·法瑞尔）",
    sourceUrl: "https://www.gamesradar.com/entertainment/dc-movies/the-batman-part-2-takes-place-a-few-weeks-after-the-penguin-according-to-star-colin-farrell/",
    sourceTier: "press",
  },
  {
    tag: "confirmed",
    text: "导演马特·里夫斯表示，罗伯特·帕丁森饰演的布鲁斯·韦恩将继续作为故事核心，剧情会进一步深入面具之下的人物内心。",
    source: "Variety（导演访谈）",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/",
    sourceTier: "press",
  },
  {
    tag: "hint",
    text: "2026 年 8 月格拉斯哥外景现场铺设了人造雪与节日装饰，蝙蝠战车在警车与 SWAT 装甲车包围下进行高速漂移与追逐戏拍摄，呈现出冬夜警队围捕蝙蝠侠的动作场面。",
    source: "The Independent / PA · 片场报道",
    sourceUrl: "https://www.the-independent.com/news/uk/home-news/glasgow-gotham-city-matt-reeves-scarlett-johansson-swat-b3036595.html",
    sourceTier: "set",
  },
  {
    tag: "hint",
    text: "8 月 28 日格拉斯哥大桥日戏：阿尔弗雷德为倒地的布鲁斯做心肺复苏，金发女性怀抱男孩在旁观看；第二次拍摄中布鲁斯双手似被铐住。同场河面停有悬挂旗帜的游艇。",
    source: "片场路透 · hoeBread36",
    sourceUrl: "https://x.com/hoeBread36/status/2093421237095543188",
    sourceTier: "set",
  },
  {
    tag: "rumor",
    text: "片场制作代号为「Semper Vigilans」（永远警惕）。这句拉丁格言被影迷广泛联想至哥谭古老势力，引发关于猫头鹰法庭等潜在剧情走向的讨论。",
  },
  {
    tag: "rumor",
    text: "斯嘉丽·约翰逊、塞巴斯蒂安·斯坦等新演员加盟后，关于哈维·丹特、急冻人、泥脸或猫头鹰法庭登场的传闻较为集中，具体角色有待官方正式揭晓。",
  },
];

export const CAST: {
  role: string;
  roleEn: string;
  name: string;
  nameEn: string;
  note: string;
  status: "confirmed" | "rumor";
  personId?: string;
}[] = [
  {
    role: "布鲁斯·韦恩 / 蝙蝠侠",
    roleEn: "Bruce Wayne / Batman",
    name: "罗伯特·帕丁森",
    nameEn: "Robert Pattinson",
    note: "确认回归。导演透露续集将更深入布鲁斯的内心世界；片场路透显示战车将在雪夜直面警队的围捕追逐。",
    status: "confirmed",
    personId: "bruce",
  },
  {
    role: "吉姆·戈登",
    roleEn: "Jim Gordon",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    note: "确认回归。片场出现警队围堵战车的场面，戈登在警局内部的角色与立场将是一大看点。",
    status: "confirmed",
    personId: "gordon",
  },
  {
    role: "阿尔弗雷德·潘尼沃斯",
    roleEn: "Alfred Pennyworth",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    note: "确认回归。布鲁斯的管家与导师。8 月 28 日格拉斯哥大桥日戏可见他为倒地的布鲁斯做心肺复苏，随后责备对方落到这步田地。",
    status: "confirmed",
    personId: "alfred",
  },
  {
    role: "奥兹 / 企鹅人",
    roleEn: "Oz Cobb / Penguin",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    note: "确认回归。在《企鹅人》登顶地下黑道后，奥兹的势力网络将成为续集的重要变量。",
    status: "confirmed",
    personId: "oz",
  },
  {
    role: "贝拉·蕾尔",
    roleEn: "Bella Reál",
    name: "洁米·劳森",
    nameEn: "Jayme Lawson",
    note: "确认回归。作为灾后新市长，她将面临恢复城市秩序与约束警队的重任。",
    status: "confirmed",
    personId: "bella",
  },
  {
    role: "马丁内斯",
    roleEn: "Martinez",
    name: "吉尔·佩雷斯-亚伯拉罕",
    nameEn: "Gil Perez-Abraham",
    note: "确认回归。基层警官马丁内斯见证了警局内部动荡，是戈登在警队的一线盟友。",
    status: "confirmed",
    personId: "martinez",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·斯坦",
    nameEn: "Sebastian Stan",
    note: "官方确认加盟。具体饰演角色目前保持保密。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "斯嘉丽·约翰逊",
    nameEn: "Scarlett Johansson",
    note: "官方确认加盟。具体饰演角色保持保密。8 月 27 日圣文森特街夜戏高清路透中，战车副驾驶现身金发女性乘客；8 月 28 日大桥日戏又有金发女性怀抱男孩在复苏现场旁观。外界普遍推断为约翰逊或其特技替身，官方尚未公布角色身份。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "查尔斯·丹斯",
    nameEn: "Charles Dance",
    note: "官方确认加盟。具体饰演角色目前保持保密。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·科赫",
    nameEn: "Sebastian Koch",
    note: "官方确认加盟。具体饰演角色目前保持保密。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "布莱恩·泰瑞·亨利",
    nameEn: "Brian Tyree Henry",
    note: "官方确认加盟。具体饰演角色目前保持保密。",
    status: "confirmed",
  },
  {
    role: "小丑 (未正式定名)",
    roleEn: "Joker",
    name: "巴里·基奥甘",
    nameEn: "Barry Keoghan",
    note: "阿卡姆疯人院神秘囚犯。第一部结尾曾与谜语人展开对话，续集是否登场官方尚未确认。",
    status: "rumor",
    personId: "joker",
  },
];

export type LogKind = "release" | "cast" | "shoot" | "slate";

export const LOG_KIND: Record<LogKind, string> = {
  release: "上映",
  cast: "演员",
  shoot: "拍摄",
  slate: "档期",
};
export type LogVideo = {
  platform: "bilibili";
  bvid: string;
  title: string;
};

export type LogEntry = {
  date: string;
  iso: string;
  title: string;
  body: string;
  kind: LogKind;
  source?: string;
  sourceUrl?: string;
  sourceTier?: "official" | "press" | "set";
  verifiedAt?: string;
  href?: "/gallery" | "/dossier" | "/recap";
  hash?: string;
  upcoming?: boolean;
  image?: string;
  images?: string[];
  video?: LogVideo;
};

export function logImages(entry: LogEntry): string[] {
  if (entry.images && entry.images.length > 0) return entry.images;
  return entry.image ? [entry.image] : [];
}

export const LOG: LogEntry[] = [
  {
    date: "2017.02.23",
    iso: "2017-02-23",
    title: "马特·里夫斯接任导演与编剧",
    body: "华纳兄弟官方确认马特·里夫斯接替本·阿弗莱克执导新版《蝙蝠侠》。里夫斯全面重写剧本，打造聚焦年轻时期、写实冷峻的新黑色侦探独立宇宙（Elseworlds）。",
    kind: "slate",
    source: "Variety / The Hollywood Reporter",
  },
  {
    date: "2019.05.31",
    iso: "2019-05-31",
    title: "罗伯特·帕丁森签约出演蝙蝠侠",
    body: "华纳官方宣布罗伯特·帕丁森成为新一代布鲁斯·韦恩 / 蝙蝠侠饰演者。随后杰弗里·怀特、保罗·达诺、佐伊·克拉维茨与科林·法瑞尔等主要阵容相继敲定。",
    kind: "cast",
    source: "Deadline",
  },
  {
    date: "2020.01.27",
    iso: "2020-01-27",
    title: "第一部于英国伦敦与利物浦开机",
    body: "第一部主摄影正式启动。拍摄期间经历疫情停工与复工，转战英国利维斯登制片厂与芝加哥外景实拍，于 2021 年 3 月顺利杀青。",
    kind: "shoot",
    source: "Variety",
  },
  {
    date: "2022.03.04",
    iso: "2022-03-04",
    title: "《新蝙蝠侠》全球公映",
    body: "马特·里夫斯执导的《新蝙蝠侠》全球公映，全球总票房突破 7.7 亿美元，凭借暗黑侦探悬疑叙事与视听美学收获广泛好评。",
    kind: "release",
    href: "/recap",
    hash: "the-batman",
  },
  {
    date: "2022.04.26",
    iso: "2022-04-26",
    title: "CinemaCon 宣布开发续集",
    body: "华纳兄弟在拉斯维加斯 CinemaCon 正式宣布续集立项，马特·里夫斯继续担任编剧兼导演，罗伯特·帕丁森确认回归。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2023.01.31",
    iso: "2023-01-31",
    title: "北美档期首次定档 2025 年 10 月 3 日",
    body: `华纳将续集首次定档 2025 年 10 月 3 日，并将该系列正式命名为「${FILM.sagaNameZh}」（${FILM.sagaName}）。`,
    kind: "slate",
    source: "Variety",
  },
  {
    date: "2024.03.12",
    iso: "2024-03-12",
    title: "受好莱坞罢工影响，档期推迟至 2026 年",
    body: "受好莱坞编剧与演员工会罢工影响，影片原定档期顺延至 2026 年 10 月 2 日，制片筹备与开机时间随之调整。",
    kind: "slate",
    source: "Deadline",
  },
  {
    date: "2024.09.19",
    iso: "2024-09-19",
    title: "限定剧《企鹅人》HBO 开播",
    body: "由科林·法瑞尔主演的衍生限定剧开播。在法尔科内倒台后，奥兹·科布逐步掌控哥谭地下黑道，结局直接承接续集开拍前的哥谭格局。",
    kind: "release",
    href: "/recap",
    hash: "the-penguin",
  },
  {
    date: "2024.12.27",
    iso: "2024-12-27",
    title: "档期调整至 2027 年 10 月 1 日",
    body: "华纳调整排片计划，为剧本精细打磨预留更充足的时间，续集顺延至 2027 年 10 月 1 日。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2025.06.27",
    iso: "2025-06-27",
    title: "导演公布剧本封面照片",
    body: "里夫斯在社交平台分享了一张剧本封面照片，带有蝙蝠标志与 The Batman: Part II 标题，并配文「Partners in Crime (Fighters)」致谢联合编剧麦特森·汤姆林。",
    kind: "slate",
    source: "Matt Reeves / X",
    image: "/media/log/script.jpg",
  },
  {
    date: "2025.12",
    iso: "2025-12-03",
    title: "媒体报道斯嘉丽·约翰逊洽谈加盟",
    body: "好莱坞主流媒体报道斯嘉丽·约翰逊进入本片加盟谈判阶段，角色信息保持保密。",
    kind: "cast",
    source: "影视行业公开报道",
  },
  {
    date: "2026.05.07",
    iso: "2026-05-07",
    title: "导演公布战车雪地胎监视器画面",
    body: "里夫斯在社交平台发布监视器截图，画面为蝙蝠战车在积雪路面上行驶，配文「#SnowTires」，确认续集故事发生在冬季。",
    kind: "shoot",
    source: "Variety（汇总导演公开贴文）",
    sourceUrl: "https://au.variety.com/2026/film/global/the-batman-part-2-matt-reeves-batmobile-36369/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
    image: "/media/log/snowtires.jpg",
  },
  {
    date: "2026.05.13",
    iso: "2026-05-13",
    title: "导演宣布前作核心阵容全员回归",
    body: "里夫斯发布前作片段回顾，确认罗伯特·帕丁森、杰弗里·怀特、安迪·瑟金斯、科林·法瑞尔、洁米·劳森与吉尔·佩雷斯-亚伯拉罕等前作核心主演悉数回归。",
    kind: "cast",
    source: "Variety（汇总导演公开贴文）",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
    image: "/media/log/x-cast-return-01.jpg",
    images: [
      "/media/log/x-cast-return-01.jpg",
      "/media/log/x-cast-return-02.jpg",
      "/media/log/x-cast-return-03.jpg",
      "/media/log/x-cast-return-04.jpg",
      "/media/log/x-cast-return-05.jpg",
      "/media/log/x-cast-return-06.jpg",
    ],
  },
  {
    date: "2026.05.14",
    iso: "2026-05-14",
    title: "导演宣布全新加盟演员阵容",
    body: "里夫斯正式宣布斯嘉丽·约翰逊、塞巴斯蒂安·斯坦、查尔斯·丹斯、塞巴斯蒂安·科赫与布莱恩·泰瑞·亨利加盟《新蝙蝠侠2》，各演员具体角色尚未公开。",
    kind: "cast",
    source: "Variety（汇总导演公开贴文）",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
    image: "/media/log/x-cast-new-01.jpg",
    images: [
      "/media/log/x-cast-new-01.jpg",
      "/media/log/x-cast-new-02.jpg",
      "/media/log/x-cast-new-03.jpg",
      "/media/log/x-cast-new-04.jpg",
      "/media/log/x-cast-new-05.jpg",
      "/media/log/x-cast-new-06.jpg",
    ],
  },
  {
    date: "2026.05.20",
    iso: "2026-05-20",
    title: "利物浦外景拍摄：圣乔治大厅与隧道夜戏",
    body: "圣乔治大厅周边出现制作车队与大型灯光设备，Queensway 隧道亦封锁进行夜间拍摄，可能用于拍摄冬季夜间追车或地下通道穿行动作戏。",
    kind: "shoot",
    source: "Explore Liverpool · 现场报道",
    sourceUrl: "https://explore-liverpool.com/filming-for-the-batman-part-ii-takes-over-liverpools-st-georges-hall-overnight/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
  },
  {
    date: "2026.06.12",
    iso: "2026-06-12",
    title: "导演公布场记板宣布正式开机",
    body: "里夫斯发布首张官方场记板照片，宣布《新蝙蝠侠2》在英国正式开机拍摄。",
    kind: "shoot",
    source: "导演公开贴文 · SuperHeroHype",
    sourceUrl: "https://www.superherohype.com/movies/672044-the-batman-2-director-matt-reeves-announces-filming-start-with-new-photo",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
  },
  {
    date: "2026.07.15",
    iso: "2026-07-15",
    title: "档期定为 2028 年 2 月 18 日，公布测试片段",
    body: "华纳调整档期安排，续集定档 2028 年 2 月 18 日北美公映，全线登陆 IMAX。里夫斯同日公布罗伯特·帕丁森的摄影测试片段；影迷对照第一部剪影指出头套耳廓变长，导演回复「You are not crazy.」予以确认。",
    kind: "slate",
    source: "Variety · 视频转自 B 站",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-2-release-date-2028-first-footage-pattinson-38605/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
    video: {
      platform: "bilibili",
      bvid: "BV1BTKG6mEUQ",
      title: "DC《新蝙蝠侠2》首曝镜头 · 定档 2028 年 2 月 18 日",
    },
  },
  {
    date: "2026.08.18",
    iso: "2026-08-18",
    title: "格拉斯哥市中心实景封街拍摄启动",
    body: "剧组在格拉斯哥市中心展开外景拍摄，现场铺设了人造积雪与复古节日招牌，换装雪地防滑胎的蝙蝠战车运抵现场。",
    kind: "shoot",
    source: "The Independent / PA",
    sourceUrl: "https://www.the-independent.com/bulletin/culture/batman-part-2-filming-glasgow-robert-pattinson-b3035085.html",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-lacys.jpg",
    images: ["/media/p2-lacys.jpg", "/media/car.jpg", "/media/p2-trailer.jpg", "/media/p2-swat.jpg", "/media/log/p2-bothwell-snow.jpg", "/media/log/p2-crane-cops.jpg"],
  },
  {
    date: "2026.08.19",
    iso: "2026-08-19",
    title: "战车雪地路况测试与特技排练",
    body: "蝙蝠战车在积雪路面上完成漂移、急停与倒车特技，车尾外挂摄影支架捕捉高速动态；全套战衣替身亦在雪景街道中穿行排练。",
    kind: "shoot",
    source: "公开片场照片与视频",
    sourceTier: "set",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-car19.jpg",
    images: ["/media/p2-car19.jpg", "/media/p2-dmg1.jpg", "/media/p2-dmg2.jpg", "/media/p2-snow1.jpg", "/media/p2-snow3.jpg", "/media/log/p2-crane-crew.jpg"],
  },
  {
    date: "2026.08.20",
    iso: "2026-08-20",
    title: "特警车辆与警车围堵蝙蝠战车夜戏",
    body: "哥谭特警（SWAT）装甲车、多辆警车与蝙蝠战车在夜间形成包围站位，高空大型探照灯模拟空中锁定，现场拍摄警队对蝙蝠战车的围捕戏份。",
    kind: "shoot",
    source: "公开片场照片与视频",
    sourceTier: "set",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-batman.jpg",
    images: ["/media/p2-batman.jpg", "/media/p2-snow4.jpg", "/media/p2-snow2.jpg", "/media/log/p2-swat-day.jpg", "/media/log/p2-firetruck.jpg", "/media/log/p2-us-flags.jpg"],
  },
  {
    date: "2026.08.21",
    iso: "2026-08-21",
    title: "皮特街外景：战车追逐与特技实拍",
    body: "夜戏转至皮特街与博思韦尔街西段，战衣替身驾驶蝙蝠战车完成高速过弯与追逐调度，哥谭警车、消防车在街区多方向封路配合。",
    kind: "shoot",
    source: "公开片场照片与视频",
    sourceTier: "set",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-gcpd-line.jpg",
    images: [
      "/media/log/p2-gcpd-line.jpg",
      "/media/log/p2-gcpd-night.jpg",
      "/media/log/p2-gotham-sign.jpg",
      "/media/log/p2-bothwell-look.jpg",
      "/media/log/p2-fire-cops.jpg",
      "/media/log/p2-cop-close.jpg",
    ],
  },
  {
    date: "2026.08.22",
    iso: "2026-08-22",
    title: "博思韦尔街封街夜戏排练与拍摄",
    body: "剧组开启连续夜戏拍摄窗口（每日 19:30 至次日 05:00），博思韦尔街布设了大型摄影吊臂与照明灯架，哥谭警车彻夜进行调度与拍摄。",
    kind: "shoot",
    source: "STV News · 道路限制与现场报道",
    sourceUrl: "https://news.stv.tv/west-central/is-glasgow-transforming-into-gotham-for-the-batman-part-ii-filming",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-bothwell-snow2.jpg",
    images: [
      "/media/log/p2-bothwell-snow2.jpg",
      "/media/log/p2-wet-flag.jpg",
      "/media/log/p2-22-street.jpg",
      "/media/log/p2-22-lane.jpg",
      "/media/log/p2-swat-day2.jpg",
      "/media/log/p2-crane-cops.jpg",
    ],
  },
  {
    date: "2026.08.23",
    iso: "2026-08-23",
    title: "格拉斯哥片场：雪地漂移与警队追逐实拍",
    body: "现场路透记录了蝙蝠战车在积雪路面完成漂移过弯，并有哥谭警车与 SWAT 特警装甲车列队封锁街道。从现场车辆调度来看，这场夜戏呈现了警队围捕蝙蝠侠的追车场面。",
    kind: "shoot",
    source: "公开片场视频 · B 站转载",
    sourceUrl: "https://www.bilibili.com/video/BV1Xm8a6sEKv",
    sourceTier: "set",
    verifiedAt: "2026.08.24",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-escape-1.jpg",
    images: ["/media/log/p2-escape-1.jpg", "/media/log/p2-escape-2.jpg", "/media/log/p2-escape-3.jpg", "/media/log/p2-chase-still.jpg", "/media/p2-batman.jpg", "/media/p2-snow4.jpg"],
    video: {
      platform: "bilibili",
      bvid: "BV1Xm8a6sEKv",
      title: "片场路透：哥谭警方围攻蝙蝠战车",
    },
  },
  {
    date: "2026.08.24",
    iso: "2026-08-24",
    title: "特警装甲车列阵围堵战车，副驾驶出现神秘金发乘客",
    body: "现场记录了新一组夜戏实拍画面：蝙蝠战车停靠在哥谭特警（SWAT）装甲车与警车阵列之中。现场路透捕捉到战车副驾驶坐有一名金发女性，具体身份官方尚未公布，外界推测可能与新加盟演员（如斯嘉丽·约翰逊）的角色相关。当晚战车由特技替身瑞克·英格利希（Rick English）驾驶，帕丁森本人未现身外景。",
    kind: "shoot",
    source: "片场路透 · ross_sneddon / sydd.91",
    sourceUrl: "https://x.com/TheBatmanSagaNW/status/2092037411794497961",
    sourceTier: "set",
    verifiedAt: "2026.08.26",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-24-swat1.jpg",
    images: [
      "/media/log/p2-24-swat1.jpg",
      "/media/log/p2-24-swat2.jpg",
      "/media/log/p2-24-swat3.jpg",
      "/media/log/p2-24-swat4.jpg",
      "/media/log/p2-24-car.jpg",
      "/media/log/p2-24-blonde.jpg",
    ],
  },
  {
    date: "2026.08.25",
    iso: "2026-08-25",
    title: "战衣替身夜戏现身，战车加装前防撞杠完成雪地漂移",
    body: "特技替身瑞克·英格利希（Rick English）身着全套蝙蝠战衣现身格拉斯哥夜戏现场，展现了续集战衣清晰的装甲细节。拍摄中，战车前脸加装了拍摄专用的冲撞防护杠，在积雪路面上完成原地定圆漂移以配合警队围捕调度。当地市政道路通告显示，布鲁米洛大道与格拉斯哥大桥的实拍将持续至 8 月底，华盛顿街的外景则将延续至 9 月上旬。",
    kind: "shoot",
    source: "片场路透 · marcossabino / kt_perspective",
    sourceUrl: "https://x.com/TheBatmanSagaNW/status/2092400275726254590",
    sourceTier: "set",
    verifiedAt: "2026.08.26",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-25-suit1.jpg",
    images: [
      "/media/log/p2-25-suit1.jpg",
      "/media/log/p2-25-suit2.jpg",
      "/media/log/p2-25-bumper.jpg",
      "/media/log/p2-24-car.jpg",
      "/media/p2-batman.jpg",
      "/media/log/p2-24-swat4.jpg",
    ],
  },
  {
    date: "2026.08.27",
    iso: "2026-08-27",
    title: "战车撞击警车突围实拍，高清路透现驾驶席与金发副驾",
    body: "剧组在格拉斯哥圣文森特街一带继续展开高强度夜戏。现场路透记录了蝙蝠战车在多辆哥谭警车合围下撞击突围的实拍过程：战车前脸加装特制冲撞钢梁，车身覆满泥污与实战刮擦痕迹。高清近景中可透过挡风玻璃辨认出驾驶席的蝙蝠头套轮廓及副驾驶座的金发女性乘客，外界普遍推测为帕丁森与约翰逊（或二人特技替身），目前官方尚未正式确认角色身份。次日清晨现场亦保留了多辆车头深度凹陷撞毁的 GCPD 巡逻警车。",
    kind: "shoot",
    source: "片场路透 · hoeBread36 / kt_perspective",
    sourceUrl: "https://x.com/TheBatmanSagaNW/status/2093128181200945606",
    sourceTier: "set",
    verifiedAt: "2026.08.28",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-27-front.jpg",
    images: [
      "/media/log/p2-27-front.jpg",
      "/media/log/p2-27-rear.jpg",
      "/media/log/p2-27-wide.jpg",
      "/media/log/p2-27-gcpd1.jpg",
      "/media/log/p2-27-gcpd2.jpg",
      "/media/log/p2-27-gcpd3.jpg",
    ],
  },
  {
    date: "2026.08.28",
    iso: "2026-08-28",
    title: "大桥日戏：阿尔弗雷德为倒地的布鲁斯做心肺复苏",
    body: "剧组转至格拉斯哥大桥（Glasgow Bridge）与克莱德河沿岸拍摄日戏。现场路透可见安迪·瑟金斯饰演的阿尔弗雷德跪在雪地上，为倒地的布鲁斯做心肺复苏，随后责备他落到这步田地；一旁金发女性怀抱一名男孩观看。第二次拍摄中布鲁斯双手似被铐住。同场河面停有悬挂旗帜的游艇，外界猜测或与新加盟角色有关，官方尚未说明。",
    kind: "shoot",
    source: "片场路透 · hoeBread36",
    sourceUrl: "https://x.com/hoeBread36/status/2093421237095543188",
    sourceTier: "set",
    verifiedAt: "2026.08.29",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-28-cpr.jpg",
    images: [
      "/media/log/p2-28-cpr.jpg",
      "/media/log/p2-28-boat1.jpg",
      "/media/log/p2-28-boat2.jpg",
      "/media/log/p2-28-flag.jpg",
      "/media/log/p2-28-boat3.jpg",
      "/media/log/p2-28-boat-night.jpg",
    ],
  },
  {
    date: "2028.02.18",
    iso: "2028-02-18",
    title: "北美院线公映",
    body: "影片现行北美档期为 2028 年 2 月 18 日，全线登陆 IMAX 与各大院线。",
    kind: "release",
    upcoming: true,
  },
];

export function latestLog(now = Date.now()): LogEntry {
  const past = LOG.filter((e) => !e.upcoming && new Date(`${e.iso}T12:00:00Z`).getTime() <= now);
  return past[past.length - 1] ?? LOG[0];
}

export const CERTAINTY_LABEL: Record<Certainty, string> = {
  confirmed: "官方确认",
  hint: "片场线索",
  rumor: "传闻推测",
};
