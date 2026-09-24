export type ProductionPhase = {
  id: string;
  period: string;
  tag: string;
  title: string;
  summary: string;
  bulletPoints: string[];
  keyStatements?: {
    speaker: string;
    role: string;
    text: string;
    source: string;
    sourceUrl?: string;
  }[];
  source: string;
  sourceUrl?: string;
};

export type ScriptComparison = {
  dimension: string;
  affleckScript: string;
  reevesReboot: string;
};

export type ScreenTestCandidate = {
  name: string;
  suitWorn: string;
  strengths: string;
  outcome: string;
  laterDcuFate: string;
};

export type ScreenTestDuel = {
  title: string;
  date: string;
  location: string;
  summary: string;
  candidates: ScreenTestCandidate[];
  details: string[];
};

export const PRODUCTION_PHASES: ProductionPhase[] = [
  {
    id: "affleck-era",
    period: "2013 — 2016",
    tag: "DCEU 原案阶段",
    title: "本·阿弗莱克自编自导自演与“丧钟”复仇原案",
    summary:
      "自 2013 年签约加盟 DCEU 饰演年长蝙蝠侠后，华纳与阿弗莱克于 2015 年启动独立电影筹备。大本与 DC 首席创意官杰夫·琼斯联合执笔剧本，原定以阿卡姆疯人院为主舞台，讲述雇佣兵丧钟系统性摧毁布鲁斯·韦恩人生的硬核复仇故事。",
    bulletPoints: [
      "华纳兄弟 CEO 凯文·辻原在 2016 年 CinemaCon 正式官宣该片由本·阿弗莱克全权自编自导自演，暂定片名为《The Batman》。",
      "2016 年 8 月，大本在伦敦《正义联盟》片场无预警公开丧钟身穿战甲的测试片段；9 月杰夫·琼斯正式确认乔·曼根尼罗饰演主要反派斯莱德·威尔逊（Slade Wilson）。",
      "原案剧本深度根植于 DCEU 宇宙体系，设定阿卡姆疯人院暴动，玛格特·罗比饰演的哈莉·奎茵及其他经典反派曾计划客串出场。",
      "曼根尼罗透露故事受大卫·芬奇《心理游戏》（The Game）启发，丧钟因将儿子之死归咎于蝙蝠侠，潜入哥谭逐一瓦解布鲁斯的财产、社交圈及精神防线。",
    ],
    keyStatements: [
      {
        speaker: "本·阿弗莱克",
        role: "原定导演 / 编剧 / 蝙蝠侠",
        text: "阿弗莱克表示，是否亲自执导取决于剧本素材和人物是否合适；若条件合适，他愿意执导这种规模的项目。",
        source: "Yahoo News · 2016.03",
        sourceUrl: "https://www.yahoo.com/news/batman-v-superman-yields-unlikely-female-hero-224254500.html",
      },
      {
        speaker: "乔·曼根尼罗",
        role: "原定反派「丧钟」饰演者",
        text: "曼根尼罗将原案形容为黑暗的心理故事，丧钟会像恐怖片中的捕食者一样追猎布鲁斯，并逐步拆解他的生活。",
        source: "Collider 专访",
        sourceUrl: "https://collider.com/joe-manganiello-ben-affleck-batman-movie-details/",
      },
    ],
    source: "Variety / The Hollywood Reporter",
    sourceUrl: "https://variety.com/2015/film/news/ben-affleck-solo-batman-movie-1201537304/",
  },
  {
    id: "creative-crisis",
    period: "2017 — 2018",
    tag: "危机与转折",
    title: "个人健康危机、大本辞去导筒与马特·里夫斯全面接盘",
    summary:
      "经历《夜行人生》票房失利、个人健康挑战以及《正义联盟》重拍动荡的重压，阿弗莱克于 2017 年 1 月辞去导演职务。华纳随后接洽马特·里夫斯，里夫斯提出坚决弃用现有剧本并拥有完全创作自主权，项目彻底脱胎换骨。",
    bulletPoints: [
      "阿弗莱克后来回忆，一位友人读过剧本后虽认可文本本身，却提醒他若再次承受类似此前制作经历的巨大压力，可能危及自己的戒酒与健康状态。",
      "2017 年 1 月 30 日，大本正式宣布卸下导筒，最初保留主演与制片人身份，表示希望全力专注于塑造角色。",
      "2017 年 2 月 23 日，凭借《猩球崛起：黎明之战》广受赞誉的马特·里夫斯正式签约担任编剧与导演兼制片人。",
      "关键转折：里夫斯向华纳高层提出明确前提——不沿用阿弗莱克与杰夫·琼斯的动作惊悚剧本，全盘重写，将故事回溯至布鲁斯·韦恩义警生涯早期的“第二年”。",
    ],
    keyStatements: [
      {
        speaker: "本·阿弗莱克",
        role: "原定主演 / 编剧",
        text: "阿弗莱克后来表示，自己始终没能找到一个令他满意、真正可行的剧本版本，因此认为应让其他创作者接手。",
        source: "Jimmy Kimmel Live 访谈",
        sourceUrl: "https://variety.com/2019/film/news/ben-affleck-retires-batman-jimmy-kimmel-1203140590/",
      },
      {
        speaker: "马特·里夫斯",
        role: "导演 / 联合编剧",
        text: "里夫斯表示，阿弗莱克原剧本本身成立且以动作为主，但并非自己想拍的版本；若接手，他希望从蝙蝠侠主观视角拍成黑色侦探调查故事。",
        source: "Esquire 专访",
        sourceUrl: "https://www.esquire.com/entertainment/movies/a38753232/matt-reeves-the-batman-interview/",
      },
    ],
    source: "Variety / The Hollywood Reporter",
    sourceUrl: "https://variety.com/2017/film/news/matt-reeves-the-batman-director-ben-affleck-1201994998/",
  },
  {
    id: "screen-test-reboot",
    period: "2019",
    tag: "重构与角逐",
    title: "脱离 DCEU 独立立项，帕丁森与霍尔特进入最终试镜",
    summary:
      "2019 年 1 月大本正式挂袍，华纳宣布影片定档 2021 年。里夫斯将项目重构为独立于既有 DCEU 故事线的新版本。经过数月遴选，罗伯特·帕丁森与尼古拉斯·霍尔特进入最终竞争并接受镜头测试。",
    bulletPoints: [
      "2019 年 1 月 30 日，华纳宣布新版《蝙蝠侠》定档，大本在社交媒体转发并祝福新团队，宣告 DCEU 蝙蝠侠时代正式告一段落。",
      "里夫斯在撰写剧本时便以罗伯特·帕丁森在独立电影《好时光》（Good Time）中癫狂、脆弱且专注的银幕特质作为布鲁斯·韦恩的原型参考。",
      "2019 年 5 月中旬，遴选缩窄至罗伯特·帕丁森与尼古拉斯·霍尔特（Nicholas Hoult）两位英国男演员，两人均进入最终镜头测试阶段。",
      "试镜细节：帕丁森后来公开回忆，自己的镜头测试使用了方·基默《永远的蝙蝠侠》（1995）时期的旧战衣，并需要多名工作人员协助穿戴；霍尔特则与他一同进入最终镜头测试。",
      "2019 年 5 月 31 日，华纳兄弟与里夫斯正式批准罗伯特·帕丁森出演布鲁斯·韦恩，开启新黑色侦探纪元。",
    ],
    keyStatements: [
      {
        speaker: "罗伯特·帕丁森",
        role: "布鲁斯·韦恩 / 蝙蝠侠",
        text: "帕丁森回忆镜头测试时穿旧战衣需要多人协助，穿着非常闷热，但战衣上身后会立刻带来强烈的力量感。",
        source: "Variety 封面故事",
        sourceUrl: "https://variety.com/2019/film/features/robert-pattinson-batman-the-lighthouse-tenet-1203319822/",
      },
      {
        speaker: "尼古拉斯·霍尔特",
        role: "决选试镜演员（现 DCU 莱克斯·卢瑟）",
        text: "霍尔特后来肯定里夫斯的构想与成片，也称赞帕丁森对角色的演绎。",
        source: "Variety · GQ España 访谈转述",
        sourceUrl: "https://variety.com/2023/film/news/nicholas-hoult-lost-batman-top-gun-maverick-mission-impossible-7-1235586687/",
      },
    ],
    source: "Deadline / Variety",
    sourceUrl: "https://deadline.com/2019/05/robert-pattinson-batman-warner-bros-matt-reeves-1202624838/",
  },
  {
    id: "pandemic-crucible",
    period: "2020 — 2022",
    tag: "实拍淬炼",
    title: "两度疫情停摆、StageCraft 虚拟制片突围与 7.7 亿票房凯旋",
    summary:
      "影片于 2020 年 1 月在英伦开机，随即遭遇新冠疫情全球大流行冲击。剧组经历停工、主演确诊隔离、开创性应用 StageCraft LED 虚拟天幕等重重考验，最终历时两年淬炼完成，收获全球口碑与票房双丰收。",
    bulletPoints: [
      "2020 年 3 月 14 日，因全球新冠疫情蔓延，刚在伦敦和利物浦拍摄七周的剧组被迫无限期停工。",
      "2020 年 9 月 1 日英伦利维斯登片场复工，仅 3 天后罗伯特·帕丁森确诊感染新冠，剧组紧急隔离两周；剧组利用隔离期全力建造实体布景与道具设备。",
      "为解决疫情期间跨国实景拍摄限制，格雷格·弗雷泽与工业光魔（ILM）开创性引入 StageCraft 虚拟 LED 天幕系统，在室内实现哥谭市政厅楼顶黄昏真实环境光渲染。",
      "2021 年 3 月 13 日历时 14 个月艰难长跑终告杀青；2022 年 3 月全球公映斩获 7.71 亿美元票房，并荣获 3 项奥斯卡金像奖提名。",
    ],
    keyStatements: [
      {
        speaker: "马特·里夫斯",
        role: "导演",
        text: "里夫斯回顾疫情时期的制作过程时，将其形容为一场艰难的生存战，并表示种种阻碍反而促使团队更专注于故事的人性与真实感。",
        source: "The Hollywood Reporter 封面长访",
        sourceUrl: "https://www.hollywoodreporter.com/movies/movie-features/the-batman-matt-reeves-robert-pattinson-1235087595/",
      },
    ],
    source: "Deadline / Variety",
    sourceUrl: "https://deadline.com/2020/09/batman-uk-production-halts-covid-19-1234569959/",
  },
];

export const SCRIPT_COMPARISONS: ScriptComparison[] = [
  {
    dimension: "宇宙归属与联动",
    affleckScript: "DCEU 主宇宙正传；紧承《蝙蝠侠大战超人》与《正义联盟》，包含与自杀小队、哈莉·奎茵及正义联盟成员的世界观联动。",
    reevesReboot: "完全独立的「异世界」（Elseworlds）；摒弃任何超能力神明英雄，构建封闭写实、自成一体的“蝙蝠侠史诗犯罪传奇”。",
  },
  {
    dimension: "核心故事类型",
    affleckScript: "高烈度动作心理惊悚片；以密闭空间生死搏杀与高科技交锋为核心，兼具詹姆斯·邦德式的动作大片节奏。",
    reevesReboot: "新黑色悬疑侦探片（Neo-Noir Detective）；受《唐人街》《十二宫》启发，聚焦“世界第一侦探”的现场勘验与心理剖析。",
  },
  {
    dimension: "核心反派与冲突",
    affleckScript: "雇佣兵丧钟（Slade Wilson / 乔·曼根尼罗）；为子复仇，从外部物理打击并逐一渗透破坏布鲁斯的社会与精神世界。",
    reevesReboot: "连环杀手谜语人（Edward Nashton / 保罗·达诺）；草根阶层反体制恐怖分子，揭露哥谭四十年伪善救赎基金与家族腐败。",
  },
  {
    dimension: "主要舞台与场景",
    affleckScript: "阿卡姆疯人院（Arkham Asylum）；以疯人院失控与恶棍暴动为核心危机，兼顾布鲁斯在哥谭的豪华私宅与韦恩庄园。",
    reevesReboot: "哥谭市阴雨街头、烂尾摩天楼与冰山俱乐部地下；韦恩家族隐入阴郁的韦恩塔老宅，罪恶深植于警局与市政厅腐败网。",
  },
  {
    dimension: "布鲁斯·韦恩心境",
    affleckScript: "人到中年、义警生涯逾二十载的倦怠硬汉；经历罗宾之死与长期创伤，作风残暴且满心愤世嫉俗。",
    reevesReboot: "义警生涯“第二年”（Year Two）的年轻隐士；精神处于创伤偏执期，尚未学会成为哥谭希望，仅自视为纯粹的“复仇”。",
  },
  {
    dimension: "美学与战车设计",
    affleckScript: "重装甲、军工重火力的超级战车与高科技碳纤维战衣，配备喷气机与重型武器阵列。",
    reevesReboot: "手工焊接改装的肌肉车（1969 道奇战马底盘 + 雪佛兰大缸发动机）与战痕累累的手工皮革装甲战衣，极度写实接地。",
  },
];

export const SCREEN_TEST_DUEL: ScreenTestDuel = {
  title: "伯班克最终镜头试镜（May 2019）",
  date: "2019 年 5 月底",
  location: "华纳兄弟加州伯班克片场（Warner Bros. Studios, Burbank, CA）",
  summary:
    "在敲定主演之前，罗伯特·帕丁森与尼古拉斯·霍尔特进入最终竞争并接受镜头测试。帕丁森后来公开回忆，自己的试镜使用了方·基默时期的旧蝙蝠战衣。",
  candidates: [
    {
      name: "罗伯特·帕丁森（Robert Pattinson）",
      suitWorn: "方·基默《永远的蝙蝠侠》（1995）战衣",
      strengths: "凭借在《好时光》与《大都会》中的精湛发挥，具备里夫斯梦寐以求的“摇滚明星般的孤僻、绝望与危险爆发力”；面具下深邃眼神与骨相极其契合黑色侦探气质。",
      outcome: "2019 年 5 月 31 日，华纳正式确认罗伯特·帕丁森出演新版布鲁斯·韦恩 / 蝙蝠侠。",
      laterDcuFate: "主演《新蝙蝠侠》全系列长片三部曲及衍生犯罪宇宙。",
    },
    {
      name: "尼古拉斯·霍尔特（Nicholas Hoult）",
      suitWorn: "最终镜头测试",
      strengths: "英伦实力派演员，戏路跨度极广（《疯狂的麦克斯4》《真宠》），并进入华纳与里夫斯的最终候选范围。",
      outcome: "进入最终竞争，但角色最终由罗伯特·帕丁森获得；霍尔特此后也公开谈及这次落选经历。",
      laterDcuFate: "2023 年被詹姆斯·古恩钦点，加盟新 DCU 宇宙在《超人》（2025）中饰演宿敌莱克斯·卢瑟（Lex Luthor）。",
    },
  ],
  details: [
    "帕丁森在后续采访中回忆，旧式橡胶战衣需要约五名工作人员协助穿戴，并让他在测试过程中大量出汗。",
    "霍尔特与帕丁森都进入最终竞争并接受镜头测试。",
    "2019 年 5 月 31 日，华纳正式确认帕丁森获得角色；霍尔特随后在采访中多次谈及这次最终试镜与落选经历。",
  ],
};
