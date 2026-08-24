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
    value: "马特·里夫斯（Matt Reeves）执导，并与麦特森·汤姆林（Mattson Tomlin）联合编剧",
  },
  { label: "摄影", value: "埃里克·梅塞施密特（Erik Messerschmidt，代表作《曼克》《心灵猎人》）" },
  { label: "配乐", value: "奥斯卡得主迈克尔·吉亚奇诺（Michael Giacchino）是否回归目前备受全球影迷瞩目，官方尚未正式公开配乐人选" },
  { label: "制片", value: "DC Studios · 6th & Idaho · Dylan Clark Productions" },
  {
    label: "发行",
    value: "华纳兄弟全球发行 · 现已重磅锁定 2028 年 2 月 18 日北美公映（总统日黄金档），全线登陆 IMAX 与杜比大银幕",
    source: "Variety · 2026.07.16",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-2-release-date-2028-first-footage-pattinson-38605/",
    sourceTier: "press",
  },
  {
    label: "片场制作代号",
    value: "Semper Vigilans（意为“永远警惕”）。该拉丁格言多次现身英国片场标识，极具黑暗骑士守望者与古老密谋气息",
    source: "STV News · 片场标识报道",
    sourceUrl: "https://news.stv.tv/west-central/is-glasgow-transforming-into-gotham-for-the-batman-part-ii-filming",
    sourceTier: "set",
  },
  {
    label: "主摄影",
    value: "导演里夫斯于 2026 年 6 月 12 日亲自公开首张正式场记板照片，宣布续集在英国正式开机！",
    source: "导演公开贴文 · SuperHeroHype",
    sourceUrl: "https://www.superherohype.com/movies/672044-the-batman-2-director-matt-reeves-announces-filming-start-with-new-photo",
    sourceTier: "press",
  },
  {
    label: "公开外景",
    value: "英国利物浦与苏格兰格拉斯哥。格拉斯哥市中心现已开启大规模封街拍摄，整座城市秒变暴雪中的哥谭！",
    source: "STV News · Glasgow 现场直击",
    sourceUrl: "https://news.stv.tv/west-central/is-glasgow-transforming-into-gotham-for-the-batman-part-ii-filming",
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
    text: "故事紧承第一部与 HBO 爆款限定剧《企鹅人》的结局。主演科林·法瑞尔透露，续集大约从企鹅人夺取黑道王座数周之后的严冬接续，混乱冰封的哥谭即将迎来权力洗牌！",
    source: "GamesRadar（引述科林·法瑞尔）",
    sourceUrl: "https://www.gamesradar.com/entertainment/dc-movies/the-batman-part-2-takes-place-a-few-weeks-after-the-penguin-according-to-star-colin-farrell/",
    sourceTier: "press",
  },
  {
    tag: "confirmed",
    text: "导演马特·里夫斯明确表示，罗伯特·帕丁森饰演的布鲁斯·韦恩将继续稳居故事绝对核心，剧情将深入剥离面具之下凡人内心的创伤与挣扎。",
    source: "Variety（导演深度访谈）",
    sourceUrl: "https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/",
    sourceTier: "press",
  },
  {
    tag: "hint",
    text: "2026 年 8 月格拉斯哥外景现场，全城铺满厚重的人造雪与节日霓虹，战损蝙蝠战车在警车与 SWAT 特警装甲车的重重包围下疯狂漂移突围！巨型探照灯自高空直射锁定，预示着一场火爆刺激的冬夜警匪大追捕——蝙蝠侠或将直面整座城市的火力封锁。",
    source: "The Independent / PA · 片场一线报道",
    sourceUrl: "https://www.the-independent.com/news/uk/home-news/glasgow-gotham-city-matt-reeves-scarlett-johansson-swat-b3036595.html",
    sourceTier: "set",
  },
  {
    tag: "rumor",
    text: "片场代号「Semper Vigilans」（永远警惕）引爆影迷狂欢：这句带有浓厚古典暗黑与守望者意味的拉丁格言，直指哥谭百年地下势力的古老密谋，被广泛猜测暗示着「猫头鹰法庭」等重量级幕后势力的崛起！",
  },
  {
    tag: "rumor",
    text: "随着斯嘉丽·约翰逊、塞巴斯蒂安·斯坦等巨星重磅加盟，关于新任检察官哈维·丹特、急冻人（Mr. Freeze）、泥脸（Clayface）及猫头鹰法庭的猜想引爆全网，续集的哥谭反派矩阵呼之欲出！",
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
    note: "确认回归！导演透露续集将更深入布鲁斯的内心世界；雪地追车与警方围捕或将把这位年轻义警逼向信念与体制的极限对抗。",
    status: "confirmed",
    personId: "bruce",
  },
  {
    role: "吉姆·戈登",
    roleEn: "Jim Gordon",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    note: "确认回归！片场路透中哥谭警队对战车痛下杀手，戈登局长或将再次被架在腐败体制与黑暗骑士盟约之间左右为难。",
    status: "confirmed",
    personId: "gordon",
  },
  {
    role: "阿尔弗雷德·潘尼沃斯",
    roleEn: "Alfred Pennyworth",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    note: "确认回归！布鲁斯最坚实的精神导师与后勤支柱，继续坐镇地下蝙蝠洞。",
    status: "confirmed",
    personId: "alfred",
  },
  {
    role: "奥兹 / 企鹅人",
    roleEn: "Oz Cobb / Penguin",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    note: "确认回归！在《企鹅人》登顶地下教父后，奥兹庞大的黑道帝国与政商网络将成为续集最危险的暗黑变量。",
    status: "confirmed",
    personId: "oz",
  },
  {
    role: "贝拉·蕾尔",
    roleEn: "Bella Reál",
    name: "洁米·劳森",
    nameEn: "Jayme Lawson",
    note: "确认回归！灾后新市长面临整顿治安与清算腐败的巨大考验，她与蝙蝠侠之间的默契将面临严峻现实抉择。",
    status: "confirmed",
    personId: "bella",
  },
  {
    role: "马丁内斯",
    roleEn: "Martinez",
    name: "吉尔·佩雷斯-亚伯拉罕",
    nameEn: "Gil Perez-Abraham",
    note: "确认回归！基层警官马丁内斯见证了体制动荡，若 GCPD 内部因追杀蝙蝠侠而分裂，他将成为戈登最关键的一线盟友。",
    status: "confirmed",
    personId: "martinez",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·斯坦",
    nameEn: "Sebastian Stan",
    note: "重磅加盟！全网热议其可能出演关键角色（如新任地方检察官哈维·丹特或神秘势力骨干），具体身份高度保密中。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "斯嘉丽·约翰逊",
    nameEn: "Scarlett Johansson",
    note: "重磅加盟！好莱坞顶流巨星空降新哥谭，神秘角色引爆全球影迷疯狂猜想。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "查尔斯·丹斯",
    nameEn: "Charles Dance",
    note: "重磅加盟！英国老戏骨霸气进驻，或将饰演掌控哥谭古老财富命脉的显赫家主或幕后首脑。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·科赫",
    nameEn: "Sebastian Koch",
    note: "重磅加盟！德国影帝级戏骨加盟，角色深不可测。",
    status: "confirmed",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "布莱恩·泰瑞·亨利",
    nameEn: "Brian Tyree Henry",
    note: "重磅加盟！实力派悍将加盟，为续集增添强劲戏剧张力。",
    status: "confirmed",
  },
  {
    role: "小丑 (未正式定名)",
    roleEn: "Joker",
    name: "巴里·基奥甘",
    nameEn: "Barry Keoghan",
    note: "阿卡姆疯人院神秘重犯。第一部结尾曾与谜语人展开渗人对话，续集是否会掀起更大混乱备受瞩目。",
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
    title: "马特·里夫斯正式接棒执导新版《蝙蝠侠》",
    body: "华纳兄弟官方确认马特·里夫斯接替本·阿弗莱克执导新版《蝙蝠侠》。里夫斯全面重写剧本，决定脱离原有 DCEU 框架，打造聚焦年轻时期、写实冷峻的新黑色侦探独立宇宙（Elseworlds）。",
    kind: "slate",
    source: "Variety / The Hollywood Reporter",
  },
  {
    date: "2019.05.31",
    iso: "2019-05-31",
    title: "罗伯特·帕丁森正式签约成为新一代蝙蝠侠",
    body: "华纳官方宣布罗伯特·帕丁森当选新一代布鲁斯·韦恩 / 蝙蝠侠！随后杰弗里·怀特（饰戈登）、保罗·达诺（饰谜语人）、佐伊·克拉维茨（饰猫女）与科林·法瑞尔（饰企鹅人）等黄金阵容相继敲定。",
    kind: "cast",
    source: "Deadline",
  },
  {
    date: "2020.01.27",
    iso: "2020-01-27",
    title: "第一部于英国伦敦与利物浦盛大开机",
    body: "第一部主摄影正式启动！拍摄期间虽历经全球疫情停工与复工，全剧组转战利维斯登制片厂搭景与芝加哥外景实拍，最终于 2021 年 3 月顺利杀青。",
    kind: "shoot",
    source: "Variety",
  },
  {
    date: "2022.03.04",
    iso: "2022-03-04",
    title: "《新蝙蝠侠》全球公映斩获 7.7 亿美元票房",
    body: "马特·里夫斯执导的《新蝙蝠侠》全球震撼公映，全球总票房突破 7.7 亿美元，凭借卓越的暗黑侦探悬疑叙事与视听美学赢得全球影迷与评论界盛赞。",
    kind: "release",
    href: "/recap",
    hash: "the-batman",
  },
  {
    date: "2022.04.26",
    iso: "2022-04-26",
    title: "CinemaCon 官方重磅宣布续集立项",
    body: "华纳兄弟在拉斯维加斯 CinemaCon 上正式宣布续集立项！马特·里夫斯继续执掌导筒与编剧，罗伯特·帕丁森确认回归披挂上阵。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2023.01.31",
    iso: "2023-01-31",
    title: "北美档期首次定档 2025 年 10 月 3 日",
    body: `华纳将续集首次定档 2025 年 10 月 3 日，并正式将该独立宇宙命名为「${FILM.sagaNameZh}」（${FILM.sagaName}）。`,
    kind: "slate",
    source: "Variety",
  },
  {
    date: "2024.03.12",
    iso: "2024-03-12",
    title: "受好莱坞大罢工影响，档期推迟至 2026 年",
    body: "受好莱坞编剧与演员工会大罢工影响，影片原定档期顺延至 2026 年 10 月 2 日，制片筹备与剧本打磨随之延期。",
    kind: "slate",
    source: "Deadline",
  },
  {
    date: "2024.09.19",
    iso: "2024-09-19",
    title: "限定剧《企鹅人》HBO 开播口碑大爆",
    body: "由科林·法瑞尔主演的衍生限定剧开播即引爆口碑！在法尔科内倒台后，奥兹·科布步步为营夺取哥谭地下黑道王座，大结局无缝衔接续集前瞻格局。",
    kind: "release",
    href: "/recap",
    hash: "the-penguin",
  },
  {
    date: "2024.12.27",
    iso: "2024-12-27",
    title: "华纳调整排片计划，续集顺延至 2027 年秋",
    body: "为给剧本精雕细琢和庞大的实景搭建留出更充裕的时间，华纳宣布续集改档至 2027 年 10 月 1 日。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2025.06.27",
    iso: "2025-06-27",
    title: "导演公布官方剧本封面照片",
    body: "里夫斯在社交平台分享了一张剧本封面照片，带有蝙蝠标志与 The Batman: Part II 标题，并配文「Partners in Crime (Fighters)」致谢联合编剧麦特森·汤姆林，宣告剧本正式完稿！",
    kind: "slate",
    source: "Matt Reeves / X",
    image: "/media/log/script.jpg",
  },
  {
    date: "2025.12",
    iso: "2025-12-03",
    title: "媒体报道斯嘉丽·约翰逊进入加盟谈判",
    body: "好莱坞主流媒体独家爆料：漫威一姐斯嘉丽·约翰逊进入本片最终谈判阶段，角色信息保持高度绝密！",
    kind: "cast",
    source: "影视行业公开报道",
  },
  {
    date: "2026.05.07",
    iso: "2026-05-07",
    title: "导演晒出战车雪地胎监视器画面！",
    body: "里夫斯在社交平台晒出监视器截图：蝙蝠战车在积雪路面上咆哮疾驰，配文「#SnowTires」，首次向全世界官宣续集故事将设定在凛冽暴雪的严冬！",
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
    title: "导演官宣前作原班核心人马全员回归！",
    body: "里夫斯发布前作高光剪辑，正式宣布罗伯特·帕丁森、杰弗里·怀特、安迪·瑟金斯、科林·法瑞尔、洁米·劳森与吉尔·佩雷斯-亚伯拉罕等核心主演悉数回归！",
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
    title: "导演官宣全新豪华全明星加盟阵容！",
    body: "里夫斯正式宣布斯嘉丽·约翰逊、塞巴斯蒂安·斯坦、查尔斯·丹斯、塞巴斯蒂安·科赫与布莱恩·泰瑞·亨利加盟《新蝙蝠侠2》，超级豪华阵容引爆全网狂欢！",
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
    title: "利物浦外景启动：圣乔治大厅与深邃隧道夜戏打响！",
    body: "圣乔治大厅周边布设起重型灯光设备与摄制车队， Queensway 隧道彻夜封锁进行高速摄影。结合战车雪地测试动态，预示着电影将上演一段从市政核心一路杀入幽暗地下隧道的惊险追逐！",
    kind: "shoot",
    source: "Explore Liverpool · 现场报道",
    sourceUrl: "https://explore-liverpool.com/filming-for-the-batman-part-ii-takes-over-liverpools-st-georges-hall-overnight/",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
  },
  {
    date: "2026.06.12",
    iso: "2026-06-12",
    title: "导演晒场记板官宣：《新蝙蝠侠2》正式开机！",
    body: "马特·里夫斯在社交平台发布首张官方场记板照片，宣布续集在英国正式开拍！全球影迷翘首以盼的黑暗骑士史诗新篇章全面启航！",
    kind: "shoot",
    source: "导演公开贴文 · SuperHeroHype",
    sourceUrl: "https://www.superherohype.com/movies/672044-the-batman-2-director-matt-reeves-announces-filming-start-with-new-photo",
    sourceTier: "press",
    verifiedAt: "2026.08.24",
  },
  {
    date: "2026.07.15",
    iso: "2026-07-15",
    title: "定档 2028 年 2 月 18 日！帕丁森首段摄影测试曝光",
    body: "华纳官方宣布续集锁定 2028 年 2 月 18 日北美公映（总统日小长假黄金档），全线登陆 IMAX 巨幕！里夫斯同日公布了罗伯特·帕丁森令人屏息的全新摄影测试片段！",
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
    title: "格拉斯哥秒变哥谭！市中心实景封街大戏震撼开启",
    body: "格拉斯哥市中心彻底披上哥谭的冬日暗黑外衣：全街区铺设厚重积雪与复古节日店招，满载雪地防滑胎的蝙蝠战车轰鸣进驻，为期数周的硬核实拍大戏正式拉开帷幕！",
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
    title: "雪地极限漂移！蝙蝠战车特技排练炸裂现场",
    body: "全黑改装肌肉战车在湿滑积雪街道上疯狂漂移、急停甩尾，后置涡轮与特制车尾摄影机贴地狂飙！身穿战衣的特技演员穿梭于风雪之中，硬核机械质感拉满！",
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
    title: "全城大包围！SWAT装甲车与警车列队夜袭蝙蝠侠",
    body: "哥谭特警（SWAT）重型防暴装甲车与多辆警车在夜色中组成铜墙铁壁，高空探照灯犹如直升机天眼死死咬住蝙蝠战车！现场气氛剑拔弩张，蝙蝠侠再次沦为哥谭警方的全城头号通缉目标！",
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
    title: "皮特街封街追车实拍：蝙蝠战车撞破重围高速狂飙",
    body: "战车高速切弯撕裂夜幕，战损前脸在警车与消防车的重重围剿中强行突破！多机位连续拍摄展现了极具冲击力的高速实拍质感，电影标志性的新黑色速度与激情呼之欲出！",
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
    title: "博思韦尔街通宵实拍：冬日哥谭大场面全面铺开",
    body: "剧组开启连夜通宵拍摄模式，博思韦尔街全线改造为霓虹闪烁却杀机四伏的冬夜哥谭。巨型摄影吊臂与电影灯光彻夜通明，警车呼啸巡弋，实拍规模空前庞大！",
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
    title: "格拉斯哥片场直击：雪地狂飙！战车突围哥谭警方重火力围攻",
    body: "重磅现场路透视频曝光！蝙蝠战车在漫天飞雪与湿滑路面上极限甩尾突围，与哥谭警车、SWAT 特警装甲车展开正面火拼与高速周旋。火光闪烁、引擎轰鸣，展现出极为劲爆的冬夜大逃杀视觉盛宴！",
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
    title: "全球引爆！《新蝙蝠侠2》全线登陆大银幕",
    body: "续集正式锁定 2028 年 2 月 18 日北美公映，IMAX 与杜比影院全线开画，带领全球影迷再度踏入那座罪恶与希望交织的黑暗都会！",
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
