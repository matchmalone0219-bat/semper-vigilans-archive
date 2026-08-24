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

export const CONTENT_REVIEWED_AT = "2026.08.24";

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
    value: "马特·里夫斯（Matt Reeves），联合编剧麦特森·汤姆林（Mattson Tomlin）",
  },
  { label: "摄影", value: "埃里克·梅塞施密特（Erik Messerschmidt）" },
  { label: "配乐", value: "尚未见华纳兄弟或 DC Studios 正式公开确认" },
  { label: "制片", value: "DC Studios · 6th & Idaho · Dylan Clark Productions" },
  {
    label: "发行",
    value: "华纳兄弟发行 · 现行北美档期 2028 年 2 月 18 日。此前档期为 2025.10.03、2026.10.02、2027.10.01。",
    source: "Variety · 2026.07.16",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-2-release-date-2028-first-footage-pattinson-38605/",
    sourceTier: "press",
  },
  {
    label: "片场制作代号（报道）",
    value: "Semper Vigilans（常译“永远警惕”）；已见于片场标识，华纳兄弟尚未单独公开确认其性质",
    source: "STV News · 片场标识报道",
    sourceUrl: "https://news.stv.tv/west-central/is-glasgow-transforming-into-gotham-for-the-batman-part-ii-filming",
    sourceTier: "set",
  },
  {
    label: "主摄影",
    value: "导演于 2026 年 6 月 12 日公开首个正式场记画面并宣布开拍；制作在英国进行",
    source: "导演公开贴文 · SuperHeroHype 转述",
    sourceUrl: "https://www.superherohype.com/movies/672044-the-batman-2-director-matt-reeves-announces-filming-start-with-new-photo",
    sourceTier: "press",
  },
  {
    label: "公开外景",
    value: "利物浦曾有摄制活动报道；格拉斯哥外景已由当地道路限制与现场报道交叉确认",
    source: "STV News · Glasgow 道路限制",
    sourceUrl: "https://news.stv.tv/west-central/is-glasgow-transforming-into-gotham-for-the-batman-part-ii-filming",
    sourceTier: "press",
  },
  {
    label: "序列",
    value: `《新蝙蝠侠》（2022）直接续作，属于「${FILM.sagaNameZh}」（${FILM.sagaName}），与詹姆斯·古恩主导的 DCU 宇宙相互独立。`,
    source: "DC · DC Studios 项目说明",
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
    text: "故事位于《新蝙蝠侠》与限定剧《企鹅人》之后。科林·法瑞尔曾表示，续集大约从《企鹅人》结局数周后接续；具体时间跨度仍以成片或后续官方资料为准。",
    source: "GamesRadar（引述科林·法瑞尔）",
    sourceUrl: "https://www.gamesradar.com/entertainment/dc-movies/the-batman-part-2-takes-place-a-few-weeks-after-the-penguin-according-to-star-colin-farrell/",
    sourceTier: "press",
  },
  {
    tag: "confirmed",
    text: "导演里夫斯表示，续集会把罗伯特·帕丁森饰演的布鲁斯·韦恩继续置于故事中心，并更多观察面具之下的人物；具体冲突与人物弧线仍未披露。",
    source: "Variety（导演采访）",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/",
    sourceTier: "press",
  },
  {
    tag: "hint",
    text: "2026 年 8 月，格拉斯哥片场铺满人造雪并挂起节日装饰，战损版蝙蝠战车、哥谭警车与 SWAT 装甲车密集同场。结合雪地漂移、警车列队与探照灯调度，本站倾向把这组镜头解读为一场规模不小的冬夜追捕：蝙蝠侠很可能正被 GCPD 或某支已失控的特警力量围堵。",
    source: "The Independent / PA · 片场报道",
    sourceUrl: "https://www.the-independent.com/news/uk/home-news/glasgow-gotham-city-matt-reeves-scarlett-johansson-swat-b3036595.html",
    sourceTier: "set",
  },
  {
    tag: "rumor",
    text: "片场标识出现制作代号「Semper Vigilans」（永远警惕）。这句带有古老守望意味的拉丁格言，很容易让人联想到哥谭长期潜伏的统治势力、守夜人传统，乃至影迷呼声极高的猫头鹰法庭；它也可能只是制作代号，但这个联想值得保留。",
  },
  {
    tag: "rumor",
    text: "关于新加盟演员的角色分配（如哈维·丹特等经典角色）及泥脸（Clayface）、急冻人（Mr. Freeze）或猫头鹰法庭登场的传闻在影迷圈广泛讨论，目前官方尚未证实具体反派设定。",
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
    note: "确认回归。导演表示续集会更聚焦布鲁斯本人；本站推测雪地追捕会把他推向义警身份与城市体制的正面冲突。",
    status: "confirmed",
    personId: "bruce",
  },
  {
    role: "吉姆·戈登",
    roleEn: "Jim Gordon",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    note: "确认回归。片场疑似警队围堵蝙蝠战车，戈登可能再次被夹在 GCPD 体制与蝙蝠侠同盟之间。",
    status: "confirmed",
    personId: "gordon",
  },
  {
    role: "阿尔弗雷德·潘尼沃斯",
    roleEn: "Alfred Pennyworth",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    note: "确认回归。布鲁斯的管家与导师，也是其最重要的后方支柱。",
    status: "confirmed",
    personId: "alfred",
  },
  {
    role: "奥兹 / 企鹅人",
    roleEn: "Oz Cobb / Penguin",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    note: "确认回归。《企鹅人》结局后已是地下新王，本站预计他的黑市与政商网络会成为续集的重要变量。",
    status: "confirmed",
    personId: "oz",
  },
  {
    role: "贝拉·蕾尔",
    roleEn: "Bella Reál",
    name: "洁米·劳森",
    nameEn: "Jayme Lawson",
    note: "确认回归。作为灾后市长，她很可能要在恢复秩序、约束警队与是否容忍蝙蝠侠之间作出选择。",
    status: "confirmed",
    personId: "bella",
  },
  {
    role: "马丁内斯",
    roleEn: "Martinez",
    name: "吉尔·佩雷斯-亚伯拉罕",
    nameEn: "Gil Perez-Abraham",
    note: "确认回归。若 GCPD 内部因追捕蝙蝠侠而分裂，他可能成为戈登阵营最值得观察的基层警员。",
    status: "confirmed",
    personId: "martinez",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·斯坦",
    nameEn: "Sebastian Stan",
    note: "官方确认加盟。外界推测可能出演关键角色，官方尚未正式公布具体设定。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "斯嘉丽·约翰逊",
    nameEn: "Scarlett Johansson",
    note: "官方确认加盟。角色信息保持高度保密，官方尚未正式公布具体角色。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "查尔斯·丹斯",
    nameEn: "Charles Dance",
    note: "官方确认加盟。英国资深演员，官方尚未正式公布具体角色。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·科赫",
    nameEn: "Sebastian Koch",
    note: "官方确认加盟。德国知名演员，官方尚未正式公布具体角色。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "布莱恩·泰瑞·亨利",
    nameEn: "Brian Tyree Henry",
    note: "官方确认加盟。实力派知名演员，官方尚未正式公布具体角色。",
    status: "confirmed",
  },
  {
    role: "小丑 (未正式定名)",
    roleEn: "Joker",
    name: "巴里·基奥甘",
    nameEn: "Barry Keoghan",
    note: "阿卡姆疯人院神秘囚犯。第一部结尾曾与谜语人展开对话，续集是否出场官方未确认。",
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
    title: "马特·里夫斯正式接任导演与制片",
    body: "华纳兄弟官方确认马特·里夫斯接替本·阿弗莱克执导新版《蝙蝠侠》。里夫斯全面重写剧本，决定脱离原有 DCEU 框架，打造聚焦年轻时期、写实冷峻的新黑色侦探独立宇宙（Elseworlds）。",
    kind: "slate",
    source: "Variety / The Hollywood Reporter",
  },
  {
    date: "2019.05.31",
    iso: "2019-05-31",
    title: "罗伯特·帕丁森正式签约出演蝙蝠侠",
    body: "华纳官方宣布罗伯特·帕丁森成为新一代布鲁斯·韦恩 / 蝙蝠侠饰演者。随后杰弗里·怀特（饰戈登）、保罗·达诺（饰谜语人）、佐伊·克拉维茨（饰猫女）与科林·法瑞尔（饰企鹅人）等主要阵容相继敲定。",
    kind: "cast",
    source: "Deadline",
  },
  {
    date: "2020.01.27",
    iso: "2020-01-27",
    title: "第一部于英国伦敦与利物浦开机",
    body: "第一部主摄影正式启动。拍摄期间经历疫情停工与复工，转战英国利维斯登制片厂搭景与芝加哥外景实拍，于 2021 年 3 月顺利杀青。",
    kind: "shoot",
    source: "Variety",
  },
  {
    date: "2022.03.04",
    iso: "2022-03-04",
    title: "《新蝙蝠侠》全球公映斩获 7.7 亿美元票房",
    body: "马特·里夫斯执导的《新蝙蝠侠》全球公映，全球总票房突破 7.7 亿美元，凭借卓越的暗黑侦探悬疑叙事与视听美学赢得全球影迷与评论界盛赞。",
    kind: "release",
    href: "/recap",
    hash: "the-batman",
  },
  {
    date: "2022.04.26",
    iso: "2022-04-26",
    title: "CinemaCon 宣布开发续集",
    body: "华纳兄弟在拉斯维加斯 CinemaCon 正式宣布续集立项。马特·里夫斯继续担任编剧兼导演，罗伯特·帕丁森确认回归。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2023.01.31",
    iso: "2023-01-31",
    title: "北美档期首次公布：2025 年 10 月 3 日",
    body: `华纳将续集首次定档 2025 年 10 月 3 日。官方把这一系列正式命名为「${FILM.sagaNameZh}」（${FILM.sagaName}）。`,
    kind: "slate",
    source: "Variety",
  },
  {
    date: "2024.03.12",
    iso: "2024-03-12",
    title: "档期推迟至 2026 年 10 月 2 日",
    body: "受好莱坞编剧与演员工会罢工影响，影片原定 2025 年 10 月 3 日档期顺延至 2026 年 10 月 2 日，制片筹备与开机时间随之调整。",
    kind: "slate",
    source: "Deadline",
  },
  {
    date: "2024.09.19",
    iso: "2024-09-19",
    title: "衍生限定剧《企鹅人》HBO 开播",
    body: "在卡尔迈恩·法尔科内倒台后，奥兹·科布逐步扫清对手夺取哥谭地下黑道控制权。剧集结局无缝衔接至续集开拍前的哥谭格局。",
    kind: "release",
    href: "/recap",
    hash: "the-penguin",
  },
  {
    date: "2024.12.27",
    iso: "2024-12-27",
    title: "档期再调整至 2027 年 10 月 1 日",
    body: "华纳调整排片计划，为剧本精细打磨预留更充足的时间，续集顺延至 2027 年 10 月 1 日。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2025.06.27",
    iso: "2025-06-27",
    title: "导演公布剧本封面照片",
    body: "里夫斯在社交平台分享了一张经过模糊处理的剧本封面照片，封面带有蝙蝠标志与 The Batman: Part II 标题，并配文「Partners in Crime (Fighters)」致谢联合编剧麦特森·汤姆林。",
    kind: "slate",
    source: "Matt Reeves / X",
    image: "/media/log/script.jpg",
  },
  {
    date: "2025.12",
    iso: "2025-12-03",
    title: "媒体报道斯嘉丽·约翰逊进入加盟谈判",
    body: "好莱坞主流媒体报道斯嘉丽·约翰逊进入本片最终谈判阶段，角色信息保持高度保密。",
    kind: "cast",
    source: "影视行业公开报道",
  },
  {
    date: "2026.05.07",
    iso: "2026-05-07",
    title: "导演公布战车雪地胎测试画面",
    body: "里夫斯在社交平台发布了两张监视器截图，画面为蝙蝠战车在积雪路面上行驶，配文「#SnowTires」，官方首次确认续集故事发生在冬季。",
    kind: "shoot",
    source: "Variety（转述导演公开贴文）",
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
    title: "导演宣布全新重磅加盟演员",
    body: "里夫斯正式宣布斯嘉丽·约翰逊、塞巴斯蒂安·斯坦、查尔斯·丹斯、塞巴斯蒂安·科赫与布莱恩·泰瑞·亨利等加盟《新蝙蝠侠2》，各演员的具体角色与设定目前保持保密。",
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
    title: "利物浦第二摄制组勘景：隧道追车线索浮现",
    body: "圣乔治大厅周边出现制作车辆与大规模灯光设备，摄制活动还延伸至 Queensway Tunnel。结合蝙蝠战车已经进入雪地测试阶段，这批素材很可能服务于冬季夜间追车、隧道高速穿行或从市政区一路逃往地下通道的动作段落。",
    kind: "shoot",
    source: "Explore Liverpool · 现场报道",
    sourceUrl: "https://explore-liverpool.com/filming-for-the-batman-part-ii-takes-over-liverpools-st-georges-hall-overnight/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
  },
  {
    date: "2026.06.12",
    iso: "2026-06-12",
    title: "导演公开场记画面并宣布正式开拍",
    body: "里夫斯发布首个正式场记画面并宣布影片开拍。公开报道确认制作在英国进行；该贴文本身没有说明首日拍摄的具体摄影棚或场景。",
    kind: "shoot",
    source: "导演公开贴文 · SuperHeroHype 转述",
    sourceUrl: "https://www.superherohype.com/movies/672044-the-batman-2-director-matt-reeves-announces-filming-start-with-new-photo",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
  },
  {
    date: "2026.07.15",
    iso: "2026-07-15",
    title: "档期调整至 2028 年 2 月 18 日",
    body: "华纳调整档期安排，续集现行北美档期为 2028 年 2 月 18 日。里夫斯同日公布了罗伯特·帕丁森的摄影测试片段。",
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
    title: "苏格兰格拉斯哥市中心实景封街拍摄启动",
    body: "剧组自 8 月 18 日起在格拉斯哥市中心展开外景工作。当地报道确认多条道路限制，并记录到哥谭市标识、人造雪和节日装饰；蝙蝠战车也被拍到运抵或行驶于市区。",
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
    body: "蝙蝠战车在铺满人造雪的路面完成漂移、急停与倒车特技，车尾外挂摄影支架捕捉高速动态；全套战衣替身也在雪景街道中穿行。整组调度明显不只是静态过场，更像一场从潜行迅速升级为失控追逐的冬夜行动。",
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
    title: "夜戏拍摄：特警车辆围堵蝙蝠战车",
    body: "哥谭特警（SWAT）装甲车、多辆警车与蝙蝠战车在夜间形成包围式站位，大型探照灯模拟直升机从空中锁定目标。按现场车辆关系推演，这很可能是 GCPD 对蝙蝠侠发起的高强度围捕，甚至暗示戈登暂时失去对警队的控制。",
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
    title: "皮特街（Pitt Street）外景：战车追逐与特技实拍",
    body: "夜戏转至皮特街与博思韦尔街西段，战衣替身驾驶蝙蝠战车完成高速过弯与追逐调度，哥谭警车、消防车则封住街区多个方向。连续机位与战损车身透露出这场追逐可能跨越数个街区，并以强行冲破封锁收尾。",
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
    title: "博思韦尔街（Bothwell Street）封街夜戏拍摄",
    body: "根据当地市政通告，剧组开启了连续夜戏拍摄窗口（每日 19:30 至次日 05:00）。博思韦尔街与惠灵顿街全面改造为哥谭冬季风貌，现场布设了大型摄影吊臂、专业照明灯架，哥谭警车彻夜进行排练与拍摄。",
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
    title: "格拉斯哥片场：雪地追逐与交火戏推演",
    body: "连续片场视频显示，蝙蝠战车在人工降雪与湿滑路面上漂移突围，哥谭警车与 SWAT 装甲车列队封锁路线。部分车辆站位与灯光节奏很像围堵交火场面；本站推测这可能是蝙蝠侠遭警队全面追捕，或双方在更大威胁介入后被迫于混战中破局。",
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
    date: "2028.02.18",
    iso: "2028-02-18",
    title: "北美院线公映",
    body: "影片现行北美档期为 2028 年 2 月 18 日；最终发行规格以华纳兄弟临近上映时公布的信息为准。",
    kind: "release",
    upcoming: true,
  },
];

export function latestLog(now = Date.now()): LogEntry {
  const past = LOG.filter((e) => !e.upcoming && new Date(`${e.iso}T12:00:00Z`).getTime() <= now);
  return past[past.length - 1] ?? LOG[0];
}

export const CERTAINTY_LABEL: Record<Certainty, string> = {
  confirmed: "公开确认",
  hint: "片场线索",
  rumor: "传闻推测",
};
