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

export function pageTitle(page?: string) {
  return page ? `${page} · ${FILM.siteName}` : `${FILM.siteName} · 《${FILM.titleZh}》影迷档案站`;
}

export const FACTS: { label: string; value: string }[] = [
  { label: "片名", value: "The Batman: Part II / 《新蝙蝠侠2》" },
  { label: "导演 / 编剧", value: "马特·里夫斯（Matt Reeves），联合编剧麦特森·汤姆林（Mattson Tomlin）" },
  { label: "摄影", value: "埃里克·梅塞施密特（Erik Messerschmidt）" },
  { label: "配乐", value: "迈克尔·吉亚奇诺（Michael Giacchino，预计回归）" },
  { label: "制片", value: "DC Studios · 6th & Idaho · Dylan Clark Productions" },
  { label: "发行", value: "华纳兄弟发行 · 现行北美档期 2028 年 2 月 18 日 · IMAX。此前三次改期：2025.10.03、2026.10.02、2027.10.01。" },
  { label: "工作标题", value: "Semper Vigilans（拉丁语：永远警惕）" },
  { label: "主摄影", value: "2026 年 6 月 12 日于英国利维斯登制片厂（Leavesden）正式开拍" },
  { label: "外景", value: "英国伦敦、利物浦、格拉斯哥" },
  { label: "序列", value: `《新蝙蝠侠》（2022）直接续作，属于「${FILM.sagaNameZh}」（${FILM.sagaName}），与詹姆斯·古恩主导的 DCU 宇宙相互独立。` },
];

export type Certainty = "confirmed" | "hint" | "rumor";

export const PLOT: { tag: Certainty; text: string }[] = [
  {
    tag: "confirmed",
    text: "故事承接前作谜语人制造的哥谭大洪水之后，城市仍在艰难重建与权力重组中；时间线紧接限定剧《企鹅人》第一季结局数周之后。",
  },
  {
    tag: "confirmed",
    text: "布鲁斯·韦恩将面临更加严峻的道德与身份考验——导演里夫斯表示，本片将进一步深入剖析面具之下真实的人格与成长危机，而非单纯停留在街头打击犯罪。",
  },
  {
    tag: "hint",
    text: "2026 年 8 月中旬起，剧组在苏格兰格拉斯哥封街实拍冬季外景。现场布置了大量人造雪景、圣诞彩灯以及战损版蝙蝠战车、哥谭警车与特警装甲车，并完成了多组雪地高速追逐与交火特技拍摄，证实续集故事背景设定于严冬。",
  },
  {
    tag: "hint",
    text: "影片工作代号「Semper Vigilans」（永远警惕）为经典拉丁格言，常被影迷推测为与哥谭隐秘古老统治势力（如猫头鹰法庭）或哥谭守夜人有关的暗线线索。",
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
    note: "确认回归。续集将更聚焦于布鲁斯·韦恩本人的内心挣扎与身份认同。",
    status: "confirmed",
    personId: "bruce",
  },
  {
    role: "吉姆·戈登",
    roleEn: "Jim Gordon",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    note: "确认回归。哥谭市警局副局长 / 中尉，为数不多与蝙蝠侠并肩作战、值得信任的正义警官。",
    status: "confirmed",
    personId: "gordon",
  },
  {
    role: "阿尔弗雷德·潘尼沃斯",
    roleEn: "Alfred Pennyworth",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    note: "确认回归。布鲁斯的管家、导师兼前英国情报人员，韦恩庄园唯一的后方支柱。",
    status: "confirmed",
    personId: "alfred",
  },
  {
    role: "奥兹 / 企鹅人",
    roleEn: "Oz Cobb / Penguin",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    note: "确认回归。在《企鹅人》剧集中完成地下势力夺权后，以哥谭黑道新霸主身份登场。",
    status: "confirmed",
    personId: "oz",
  },
  {
    role: "贝拉·蕾尔",
    roleEn: "Bella Reál",
    name: "洁米·劳森",
    nameEn: "Jayme Lawson",
    note: "确认回归。洪水危机后正式上任的哥谭市新市长，致力于推行城市灾后改革与反腐。",
    status: "confirmed",
    personId: "bella",
  },
  {
    role: "马丁内斯",
    roleEn: "Martinez",
    name: "吉尔·佩雷斯-亚伯拉罕",
    nameEn: "Gil Perez-Abraham",
    note: "确认回归。哥谭市警局巡警，在第一部中多次协助戈登与蝙蝠侠调查。",
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
    source: "Matt Reeves / X",
    image: "/media/log/snowtires.jpg",
  },
  {
    date: "2026.05.13",
    iso: "2026-05-13",
    title: "导演宣布前作核心阵容全员回归",
    body: "里夫斯发布前作片段回顾，确认罗伯特·帕丁森、杰弗里·怀特、安迪·瑟金斯、科林·法瑞尔、洁米·劳森与吉尔·佩雷斯-亚伯拉罕等前作核心主演悉数回归。",
    kind: "cast",
    source: "Matt Reeves / X",
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
    source: "Matt Reeves / X",
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
    title: "利物浦第二摄制组技术勘景与试拍",
    body: "第二摄制组在伯肯黑德旧隧道与圣乔治大厅进行技术勘景和试拍，测试冬季灯光效果与战车动态镜头。",
    kind: "shoot",
  },
  {
    date: "2026.06.12",
    iso: "2026-06-12",
    title: "主摄影于英国利维斯登正式开机",
    body: "影片在华纳兄弟利维斯登制片厂正式开拍，使用工作代号「Semper Vigilans」。外景拍摄涵盖英国伦敦、利物浦与格拉斯哥等地。",
    kind: "shoot",
  },
  {
    date: "2026.07.15",
    iso: "2026-07-15",
    title: "档期调整至 2028 年 2 月 18 日",
    body: "华纳调整档期安排，续集正式定档 2028 年 2 月 18 日北美总统日假期，全线登陆 IMAX。里夫斯同日公布了罗伯特·帕丁森的摄影测试片段。",
    kind: "slate",
    source: "Deadline / Variety · 视频转自 B 站",
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
    body: "剧组自 8 月 18 日起在格拉斯哥市中心封街拍摄，取景范围覆盖布鲁米洛、格拉斯哥大桥、金斯顿大桥等多处街道。临街店铺招牌与公交站牌均已替换为哥谭市标志，现场出现了哥谭警车、特警车辆以及装配雪地胎与战损涂装的蝙蝠战车实车。",
    kind: "shoot",
    source: "BBC / Glasgow Live",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-lacys.jpg",
    images: [
      "/media/p2-lacys.jpg",
      "/media/car.jpg",
      "/media/p2-trailer.jpg",
      "/media/p2-swat.jpg",
      "/media/log/p2-bothwell-snow.jpg",
      "/media/log/p2-crane-cops.jpg",
    ],
  },
  {
    date: "2026.08.19",
    iso: "2026-08-19",
    title: "战车雪地路况测试与特技排练",
    body: "拍摄进入排练阶段，蝙蝠战车在铺满人造雪的路面上进行漂移与倒车特技测试，车尾加装了外挂摄影机支架。现场可见身着全套蝙蝠战衣的演员在雪景街道中穿行。",
    kind: "shoot",
    source: "当地片场路透报道",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-car19.jpg",
    images: [
      "/media/p2-car19.jpg",
      "/media/p2-dmg1.jpg",
      "/media/p2-dmg2.jpg",
      "/media/p2-snow1.jpg",
      "/media/p2-snow3.jpg",
      "/media/log/p2-crane-crew.jpg",
    ],
  },
  {
    date: "2026.08.20",
    iso: "2026-08-20",
    title: "夜戏拍摄：特警车辆围堵蝙蝠战车",
    body: "夜间拍摄持续进行，现场记录到哥谭特警（SWAT）装甲车辆包围蝙蝠战车的动态戏份，并测试了模拟直升机空中探照的灯光装置。现场有多辆警车与战车参与排练。",
    kind: "shoot",
    source: "当地片场路透公开报道",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-batman.jpg",
    images: [
      "/media/p2-batman.jpg",
      "/media/p2-snow4.jpg",
      "/media/p2-snow2.jpg",
      "/media/log/p2-swat-day.jpg",
      "/media/log/p2-firetruck.jpg",
      "/media/log/p2-us-flags.jpg",
    ],
  },
  {
    date: "2026.08.21",
    iso: "2026-08-21",
    title: "皮特街（Pitt Street）外景：战车追逐与特技实拍",
    body: "夜间拍摄转至皮特街与博思韦尔街西段。特技替身 Rick English 驾驶蝙蝠战车完成高速追逐戏份，现场有全套战衣替身出镜。白天街面依然保留人造雪景与哥谭市警车、消防车等布景道具。",
    kind: "shoot",
    source: "当地片场路透报道",
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
    source: "BBC 封路通告 / 当地路透报道",
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
    title: "格拉斯哥片场：雪地追逐与枪战戏实拍",
    body: "片场拍摄进入新阶段，现场路透记录了蝙蝠战车在人工降雪与湿滑路面上的漂移特技，并有哥谭警车列队围堵与交火场景。替身演员佩戴头套完成高难度驾驶动作，日间街道上持续有哥谭警车与 SWAT 特警装甲车待命。",
    kind: "shoot",
    source: "当地片场路透报道 · 视频转自 B 站",
    href: "/gallery",
    hash: "part2",
    image: "/media/log/p2-escape-1.jpg",
    images: [
      "/media/log/p2-escape-1.jpg",
      "/media/log/p2-escape-2.jpg",
      "/media/log/p2-escape-3.jpg",
      "/media/log/p2-chase-still.jpg",
      "/media/p2-batman.jpg",
      "/media/p2-snow4.jpg",
    ],
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
    body: "影片正式定档北美总统日假期公映，全线登陆 IMAX 影厅。",
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
