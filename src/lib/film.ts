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
  { label: "序列", value: `《新蝙蝠侠》（2022）直接续作，属于「${FILM.sagaNameZh}」（${FILM.sagaName}），与詹姆斯·古恩主导的 DCU 分开。` },
];

export type Certainty = "confirmed" | "hint" | "rumor";

export const PLOT: { tag: Certainty; text: string }[] = [
  {
    tag: "confirmed",
    text: "故事承接前作谜语人制造的高谭大洪水之后，城市仍在艰难重建与权力重组中；时间线紧接《企鹅人》第一季结局数周之后。",
  },
  {
    tag: "confirmed",
    text: "布鲁斯·韦恩将面临更加严峻的道德与身份考验——导演里夫斯表示，本片将深入剖析面具之下真实的人格与成长危机，而非单纯的街头义警打击犯罪。",
  },
  {
    tag: "hint",
    text: "2026 年 8 月 18 日起，剧组在苏格兰格拉斯哥封街拍摄冬季外景。18 至 20 日路透可见人造雪、圣诞灯、战损战车与高谭 SWAT 载具；20 日夜戏排练出现围堵战车与模拟直升机探照灯。故事季节为严冬。",
  },
  {
    tag: "hint",
    text: "影片工作代号「Semper Vigilans」（永远警惕）为拉丁格言，常被影迷推测为与高谭隐秘古老统治势力（如猫头鹰法庭）或高谭守夜人有关的暗线线索。",
  },
  {
    tag: "rumor",
    text: "关于新加盟演员的角色分配（如哈维·丹特、吉尔达·丹特等）及泥脸（Clayface）、急冻人（Mr. Freeze）或猫头鹰法庭登场的传闻在影迷圈广泛讨论，目前官方均尚未证实任何具体角色及反派设定。",
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
    note: "确认回归。高谭警局中尉，为数不多与蝙蝠侠并肩作战、值得信任的正义警官。",
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
    note: "确认回归。在《企鹅人》剧集中完成地下势力夺权后，以高谭黑道新霸主身份登场。",
    status: "confirmed",
    personId: "oz",
  },
  {
    role: "贝拉·蕾尔",
    roleEn: "Bella Reál",
    name: "洁米·劳森",
    nameEn: "Jayme Lawson",
    note: "确认回归。洪水危机后正式上任的高谭市新市长，致力于推行城市战后改革。",
    status: "confirmed",
    personId: "bella",
  },
  {
    role: "马丁内斯",
    roleEn: "Martinez",
    name: "吉尔·佩雷斯-亚伯拉罕",
    nameEn: "Gil Perez-Abraham",
    note: "确认回归。高谭警局巡警，在第一部中多次协助戈登与蝙蝠侠调查。",
    status: "confirmed",
    personId: "martinez",
  },
  {
    role: "新加盟演员（角色待定）",
    roleEn: "Undisclosed Role",
    name: "塞巴斯蒂安·斯坦",
    nameEn: "Sebastian Stan",
    note: "官方确认加盟。外界推测可能出演哈维·丹特（Harvey Dent），官方尚未正式公布具体角色。",
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
};

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
    body: "第一部主摄影正式启动。同年 3 月受全球新冠疫情影响被迫无限期停工；9 月复工后因帕丁森确诊再度短暂隔离两周，后转战英国利维斯登制片厂搭景与芝加哥外景实拍，于 2021 年 3 月顺利杀青。",
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
    body: `华纳将续集定档 2025 年 10 月 3 日。这是第一次公布的上映日，后来改了三次。官方把这一系列称作「${FILM.sagaNameZh}」（${FILM.sagaName}）。`,
    kind: "slate",
    source: "Variety",
  },
  {
    date: "2024.03.12",
    iso: "2024-03-12",
    title: "档期推迟至 2026 年 10 月 2 日",
    body: "受 2023 年好莱坞编剧与演员工会罢工影响，原定 2025 年 10 月 3 日改至 2026 年 10 月 2 日。制片厂棚期被占用，开机时间随之延后。",
    kind: "slate",
    source: "Deadline",
  },
  {
    date: "2024.09.19",
    iso: "2024-09-19",
    title: "衍生限定剧《企鹅人》HBO 开播",
    body: "法尔科内倒台后，奥兹·科布夺取地下控制权。剧集结局直接接到续集开拍前的高谭格局。",
    kind: "release",
    href: "/recap",
    hash: "the-penguin",
  },
  {
    date: "2024.12.27",
    iso: "2024-12-27",
    title: "档期再推迟至 2027 年 10 月 1 日",
    body: "华纳将 2026 年秋季档让给亚历杭德罗·冈萨雷斯·伊纳里图与汤姆·克鲁斯的新片。续集改至 2027 年 10 月 1 日，官方说法是给剧本打磨更多时间。",
    kind: "slate",
    source: "The Hollywood Reporter",
  },
  {
    date: "2025.06.27",
    iso: "2025-06-27",
    title: "导演公布剧本封面照片",
    body: "里夫斯在社交平台发出一张经过模糊处理的黑白剧本封面，封面带有蝙蝠标志与 The Batman: Part II 标题，并配文「Partners in Crime (Fighters)」点名联合编剧麦特森·汤姆林。",
    kind: "slate",
    source: "Matt Reeves / X",
    image: "/media/log/script.jpg",
  },
  {
    date: "2025.12",
    iso: "2025-12-03",
    title: "媒体报道斯嘉丽·约翰逊进入谈判",
    body: "好莱坞主流媒体报道斯嘉丽·约翰逊进入本片最终谈判阶段，角色当时保持高度保密。",
    kind: "cast",
    source: "影视行业公开报道",
  },
  {
    date: "2026.05.07",
    iso: "2026-05-07",
    title: "战车雪地胎测试",
    body: "里夫斯在 X 发出两张监视器截图，画面为蝙蝠战车在积雪路面上行驶，配文「#SnowTires」。这是开拍前的摄影机测试，也是官方第一次用画面确认故事发生在冬天。",
    kind: "shoot",
    source: "Matt Reeves / X",
    image: "/media/log/snowtires.jpg",
  },
  {
    date: "2026.05.13",
    iso: "2026-05-13",
    title: "导演宣布前作核心阵容全员回归",
    body: "里夫斯连续发出前作片段 GIF，确认罗伯特·帕丁森、杰弗里·怀特、安迪·瑟金斯、科林·法瑞尔、洁米·劳森与吉尔·佩雷斯-亚伯拉罕等前作核心卡司悉数回归。",
    kind: "cast",
    source: "Matt Reeves / X",
  },
  {
    date: "2026.05.14",
    iso: "2026-05-14",
    title: "导演宣布全新重磅加盟演员",
    body: "里夫斯正式宣布斯嘉丽·约翰逊、塞巴斯蒂安·斯坦、查尔斯·丹斯、塞巴斯蒂安·科赫与布莱恩·泰瑞·亨利等加盟《新蝙蝠侠2》，各演员的具体角色与设定目前保持保密，尚未正式公开。",
    kind: "cast",
    source: "Matt Reeves / X",
  },
  {
    date: "2026.05.20",
    iso: "2026-05-20",
    title: "利物浦第二组与技术勘景",
    body: "第二摄制组在伯肯黑德旧隧道与圣乔治大厅做技术勘景和试拍，测试冬季灯光与战车动态镜头。主摄影尚未开机。",
    kind: "shoot",
  },
  {
    date: "2026.06.12",
    iso: "2026-06-12",
    title: "主摄影于英国利维斯登正式开机",
    body: "影片在华纳兄弟利维斯登制片厂正式开拍，使用工作代号「Semper Vigilans」。外景拍摄涵盖英国伦敦、利物浦与格拉斯哥。",
    kind: "shoot",
  },
  {
    date: "2026.07.15",
    iso: "2026-07-15",
    title: "档期第三次调整至 2028 年 2 月 18 日",
    body: "华纳将 J.J. 艾布拉姆斯的 The Great Beyond 挪到 2027 年 10 月 1 日，续集顺延至 2028 年 2 月 18 日总统日档，IMAX 发行。至此三次改期：2025.10.03 → 2026.10.02 → 2027.10.01 → 2028.02.18。里夫斯同日放出帕丁森的摄影测试片段。",
    kind: "slate",
    source: "Deadline / Variety",
  },
  {
    date: "2026.08.18",
    iso: "2026-08-18",
    title: "苏格兰格拉斯哥街头实景拍摄开启",
    body: "剧组自 18 日起在市中心封街，取景布鲁米洛、格拉斯哥大桥、Kingston Bridge、North Street 与 Newton Street。临街店面换成高谭店招，公交站牌改为 Gotham 线路。现场出现高谭警局涂装的警车与 SWAT 载具，以及装配雪地胎、带撞击损伤的蝙蝠战车实车。",
    kind: "shoot",
    source: "BBC / Glasgow Live",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-lacys.jpg",
  },
  {
    date: "2026.08.19",
    iso: "2026-08-19",
    title: "战车在人造雪上试车",
    body: "19 日为排练日。战车在铺雪路面上做漂移与倒车测试，车尾加装摄影架。近景可见翼子板与车门的战损涂装。当地摄影师拍到全套战衣的蝙蝠侠在积雪街道上行走。",
    kind: "shoot",
    source: "当地片场路透，经影视媒体转发",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-car19.jpg",
  },
  {
    date: "2026.08.20",
    iso: "2026-08-20",
    title: "夜戏排练：SWAT 围堵战车",
    body: "20 日夜戏继续。公开视频显示高谭 SWAT 载具包围战车，现场测试模拟直升机探照灯的灯架；另有镜头拍到战车疑似被 SWAT 车顶撞。副驾驶曾出现一名金发女性，身份未经官方确认，不能据此写成斯嘉丽·约翰逊出镜。官方剧照仍未发布。",
    kind: "shoot",
    source: "当地片场路透，20 日社交媒体公开发布",
    href: "/gallery",
    hash: "part2",
    image: "/media/p2-batman.jpg",
  },
  {
    date: "2028.02.18",
    iso: "2028-02-18",
    title: "北美院线公映",
    body: "定档北美总统日假期，全线登陆 IMAX。这是三次改期后的现行日期。成片尚未拍完。",
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
