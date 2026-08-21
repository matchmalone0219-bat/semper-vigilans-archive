export type MerchItem = {
  id: string;
  name: string;
  nameEn: string;
  maker: string;
  year: string;
  spec: string;
  image: string;
  imageAlt: string;
  body: string;
};

export type MerchGroup = {
  id: string;
  kicker: string;
  title: string;
  titleEn: string;
  intro: string;
  items: MerchItem[];
};

export const MERCH: MerchGroup[] = [
  {
    id: "figures",
    kicker: "01",
    title: "可动人偶",
    titleEn: "Action Figures",
    intro:
      "包含主流厂商官方授权的 1/6 珍藏级可动人偶、7 寸量产线及 Q 版乙烯模型，忠实还原 2022 年电影中的角色战衣、面部特征与配件细节。",
    items: [
      {
        id: "inart",
        name: "INART 1/6 蝙蝠侠珍藏人偶",
        nameEn: "The Batman 1/6 Collectible Figure",
        maker: "INART · Queen Studios",
        year: "2023",
        spec: "1/6 比例 · 常规版 / 植发豪华版",
        image: "/media/merch/inart.jpg",
        imageAlt: "INART 1/6 蝙蝠侠全身官方产品展示图",
        body: "Queen Studios 旗下高端可动人偶品牌 INART 打造。精准还原罗伯特·帕丁森面部轮廓，配备独立可动眼球系统与多款替换表情，豪华版特别附带手工植发头雕。战衣严格按照电影多层分件结构剪裁制作，真实还原金属护甲与布料质感。",
      },
      {
        id: "hottoys",
        name: "Hot Toys 蝙蝠侠与蝙蝠信号灯套装",
        nameEn: "Batman and Bat-Signal Set",
        maker: "Hot Toys",
        year: "2022",
        spec: "1/6 比例 · MMS641 豪华套装",
        image: "/media/merch/hottoys.jpg",
        imageAlt: "Hot Toys 1/6 蝙蝠侠站在点亮的蝙蝠信号灯旁",
        body: "Hot Toys 推出的 1/6 比例经典之作。配备全新开发的面罩头雕与可替换下半脸造型，豪华版特别附带可通电发光的 1/6 蝙蝠信号灯地台，以及抓钩枪、战术飞镖等丰富配件。",
      },
      {
        id: "mcfarlane-bruce",
        name: "麦克法兰 7 寸未戴面罩布鲁斯·韦恩",
        nameEn: "Bruce Wayne Unmasked (DC Multiverse)",
        maker: "McFarlane Toys",
        year: "2022",
        spec: "7 寸比例可动人偶",
        image: "/media/merch/mcfarlane-bruce.jpg",
        imageAlt: "McFarlane 7 寸未戴面罩布鲁斯人偶包装与配件",
        body: "麦克法兰 DC Multiverse 系列推出的「流浪者」便服造型布鲁斯·韦恩。还原了布鲁斯身穿飞行员夹克、背负双肩包、眼部留有深黑眼妆的经典便装形象，拥有 22 处高可动关节。",
      },
      {
        id: "mcfarlane-cast",
        name: "麦克法兰 7 寸核心角色阵容",
        nameEn: "Penguin / Catwoman / Bruce Set",
        maker: "McFarlane Toys",
        year: "2022",
        spec: "7 寸系列头雕与人偶",
        image: "/media/merch/mcfarlane-cast.jpg",
        imageAlt: "McFarlane 企鹅人、猫女与布鲁斯头雕特写展示",
        body: "麦克法兰为电影打造的入门级可动产品线，涵盖企鹅人、猫女、谜语人及战衣版蝙蝠侠，具备出色的性价比与丰富的可动把玩体验。",
      },
      {
        id: "funko",
        name: "Funko Pop! 电影全套乙烯玩偶",
        nameEn: "Pop! Movies · The Batman Series",
        maker: "Funko",
        year: "2022",
        spec: "乙烯公仔 · 包含常规款与 Rides 战车款",
        image: "/media/merch/funko.jpg",
        imageAlt: "Funko 官方公布的《新蝙蝠侠》全套 Pop! 玩偶",
        body: "Funko 官方授权系列，以经典 Q 版大头造型重塑了蝙蝠侠、猫女、企鹅人、谜语人以及驾驶蝙蝠战车的 Pop! Rides 系列，是流传极广的流行文化收藏品。",
      },
    ],
  },
  {
    id: "statues",
    kicker: "02",
    title: "高端雕像",
    titleEn: "Statues",
    intro:
      "日本顶级雕像品牌 Prime 1 Studio 联合 Blitzway 打造的 1/3 博物馆级限量树脂雕像，具备极高的面部逼真度与场景收藏价值。",
    items: [
      {
        id: "p1s",
        name: "Prime 1 Studio 1/3 博物馆级电影版蝙蝠侠",
        nameEn: "Museum Masterline × Blitzway",
        maker: "Prime 1 Studio × Blitzway",
        year: "2023",
        spec: "1/3 比例 · 高约 79 cm · 高级宝丽石树脂",
        image: "/media/merch/p1s.jpg",
        imageAlt: "Prime 1 Studio 与 Blitzway 合作的 1/3 蝙蝠侠全身雕像",
        body: "由 Prime 1 Studio 与顶级头雕工作室 Blitzway 强强联手打造。全高近 80 厘米，皮革纹理、硬质防弹板与金属战损细节分毫不差，完美还原帕丁森在电影中的冷峻神态，为殿堂级影迷收藏品。",
      },
      {
        id: "p1s-sae",
        name: "Prime 1 Studio 特殊艺术限定版雕像",
        nameEn: "Special Art Edition Deluxe",
        maker: "Prime 1 Studio",
        year: "2022",
        spec: "1/3 比例 · 高约 88 cm · 限量发行",
        image: "/media/merch/p1s-sae.jpg",
        imageAlt: "Prime 1 Studio 特殊艺术版红雨灯光效果全身雕像",
        body: "以传奇漫画家吉姆·李（Jim Lee）为 DC FanDome 创作的概念插画为灵感，结合电影实拍装甲细节，地台融合了高谭标志性滴水兽雕塑与红雨氛围灯效，极具艺术表现力。",
      },
    ],
  },
  {
    id: "vehicles",
    kicker: "03",
    title: "车模载具",
    titleEn: "Die-Cast Vehicles",
    intro:
      "涵盖 1/64、1/32、1/24 及 1/18 多种比例的蝙蝠战车合金模型，真实再现 1960–70 年代改装肌肉车底盘与外露喷气引擎结构。",
    items: [
      {
        id: "hotwheels",
        name: "风火轮 1:50 电影蝙蝠战车合金车模",
        nameEn: "Hot Wheels 1:50 Batman Series Batmobile",
        maker: "Hot Wheels · 美泰（Mattel）",
        year: "2022",
        spec: "1:50 比例合金车模",
        image: "/media/merch/hotwheels.jpg",
        imageAlt: "风火轮 1:50 蝙蝠战车合金模型细节",
        body: "美泰风火轮推出的中比例合金收藏车模。车身采用全金属压铸工艺，细致刻画了车头冲撞保险杠、外露后置引擎与双排气管细节，分量十足。",
      },
      {
        id: "jada-32",
        name: "Jada 1:32 合金蝙蝠战车",
        nameEn: "Jada Toys 1:32 Die-Cast Batmobile",
        maker: "Jada Toys · Hollywood Rides",
        year: "2022",
        spec: "1:32 比例合金模型",
        image: "/media/merch/jada-box.jpg",
        imageAlt: "Jada 1:32 合金战车包装盒与车身展示",
        body: "采用开门设计与真实橡胶轮胎，包装印有电影红黑标志性视觉，是大众市场最受欢迎的桌上展示车模之一。",
      },
      {
        id: "jada-18",
        name: "Jada 1:18 大比例合金战车带人偶",
        nameEn: "Jada Toys 1:18 Batmobile with Figure",
        maker: "Jada Toys",
        year: "2022",
        spec: "1:18 比例 · 车灯可亮 · 附金属蝙蝠侠人偶",
        image: "/media/merch/jada-18.jpg",
        imageAlt: "Jada 1:18 战车车灯点亮状态与金属人偶",
        body: "大比例旗舰款合金战车，车头大灯与尾部引擎均支持 LED 通电点亮，座舱内部精细还原了仪表台与防滚架，并随盒附赠同比例压铸金属蝙蝠侠人偶。",
      },
    ],
  },
  {
    id: "print",
    kicker: "04",
    title: "出版书籍",
    titleEn: "Books & Comics",
    intro:
      "包含官方艺术设定集、前传小说以及主演保罗·达诺亲笔编剧的衍生漫画，为深入探索里夫斯导剪宇宙的必读文献。",
    items: [
      {
        id: "artbook",
        name: "《新蝙蝠侠》官方艺术设定集",
        nameEn: "The Art of The Batman",
        maker: "Abrams Books · 詹姆斯·菲尔德 著",
        year: "2022",
        spec: "精装大开本 · 全彩印刷",
        image: "/media/merch/artbook.jpg",
        imageAlt: "《The Art of The Batman》精装设定集封面",
        body: "导演马特·里夫斯亲笔作序。全书收录数百张前期概念设计图、分镜头脚本、服装道具分解图与主创专访，详细记录了新高谭视觉构建的全过程。",
      },
      {
        id: "novel",
        name: "官方前传小说《蝙蝠侠之前》",
        nameEn: "Before the Batman: An Original Movie Novel",
        maker: "Random House · 大卫·卢曼 著",
        year: "2022",
        spec: "平装单行本 · 附彩插海报",
        image: "/media/merch/novel.jpg",
        imageAlt: "前传小说 Before the Batman 官方封面",
        body: "官方授权青少年衍生小说，重点讲述布鲁斯·韦恩早年改装战车、接受严苛体能训练，以及爱德华·纳什顿在孤儿院萌生仇恨的起源故事。",
      },
      {
        id: "riddler-book",
        name: "官方前传漫画《谜语人元年》",
        nameEn: "The Riddler: Year One",
        maker: "DC Black Label · 保罗·达诺 编剧",
        year: "2022–2023",
        spec: "6 期限定漫画单行本",
        image: "/media/merch/riddler-book.jpg",
        imageAlt: "《The Riddler: Year One》漫画封面",
        body: "由电影谜语人主演保罗·达诺亲自编剧、DC Black Label 出版的成人向限定漫画，以冰冷严谨的司法会计视角完整揭开「新生」基金贪腐黑幕与谜语人的黑化历程。",
      },
    ],
  },
  {
    id: "media",
    kicker: "05",
    title: "影音与原声",
    titleEn: "Home Video & Soundtrack",
    intro:
      "包含 4K UHD 超高清蓝光光盘及迈克尔·吉亚奇诺创作的电影官方原声大碟，完美呈现高动态影像与沉浸式声场。",
    items: [
      {
        id: "uhd",
        name: "《新蝙蝠侠》4K Ultra HD 收藏版",
        nameEn: "The Batman 4K Ultra HD + Blu-ray",
        maker: "Warner Bros. Home Entertainment",
        year: "2022",
        spec: "4K UHD + 蓝光双碟 + 杜比视界 / 杜比全景声",
        image: "/media/merch/uhd.jpg",
        imageAlt: "《新蝙蝠侠》4K Ultra HD 官方包装封面",
        body: "搭载原生 4K 极清画质、杜比视界（Dolby Vision）HDR 及杜比全景声音轨，完美还原摄影师埃里克·梅塞施密特标志性的高反差光影与雨夜质感，附带两小时深度幕后花絮。",
      },
      {
        id: "bluray",
        name: "《新蝙蝠侠》蓝光标准版",
        nameEn: "The Batman Blu-ray Edition",
        maker: "Warner Bros. Home Entertainment",
        year: "2022",
        spec: "1080P 全高清蓝光碟",
        image: "/media/merch/bluray.jpg",
        imageAlt: "《新蝙蝠侠》蓝光标准版封面",
        body: "面向大众影迷的标准蓝光光盘，收录电影正片及导演访谈、阿卡姆疯人院未曝光删减片段等珍贵内容。",
      },
      {
        id: "ost",
        name: "电影官方原声大碟 (OST)",
        nameEn: "Original Motion Picture Soundtrack",
        maker: "WaterTower Music · 迈克尔·吉亚奇诺 作曲",
        year: "2022",
        spec: "数字流媒体 / 双 CD / 黑胶唱片",
        image: "/media/merch/ost.jpg",
        imageAlt: "电影官方原声大碟封面",
        body: "奥斯卡获奖作曲家迈克尔·吉亚奇诺（Michael Giacchino）操刀配乐。以厚重深沉的四音符铜管旋律与阴郁压抑的弦乐交织，成功塑造出当代最具辨识度的蝙蝠侠主题曲。",
      },
    ],
  },
  {
    id: "posters",
    kicker: "06",
    title: "官方海报与艺术微喷",
    titleEn: "Official Posters & Prints",
    intro:
      "汇总院线公映海报、IMAX/杜比影院限定特典以及 Mondo 限量艺术丝网印刷画作，极具视觉冲击力与装裱收藏价值。",
    items: [
      {
        id: "poster-mondo",
        name: "Mondo 官方授权限量丝网海报",
        nameEn: "The Batman Screenprinted Poster by Mondo",
        maker: "Mondo · 弗朗切斯科·弗兰卡维拉 绘",
        year: "2022",
        spec: "24×36 英寸 · 手工丝网印刷 · 限时预售",
        image: "/media/merch/poster-mondo.jpg",
        imageAlt: "Mondo 官方丝网印刷海报，红黑主色调",
        body: "著名插画师弗朗切斯科·弗兰卡维拉（Francesco Francavilla）受 Mondo 邀请绘制。以极致纯粹的红黑双色勾勒出雨夜中喷射烈焰的蝙蝠战车与义警身影，极具复古新黑色漫画质感。",
      },
      {
        id: "poster-mondo-var",
        name: "Mondo 限量变体版丝网海报",
        nameEn: "The Batman Variant Screenprint",
        maker: "Mondo · 弗朗切斯科·弗兰卡维拉 绘",
        year: "2022",
        spec: "24×36 英寸 · 限量 325 张",
        image: "/media/merch/poster-mondo-var.jpg",
        imageAlt: "Mondo 变体版海报，红雨与蝙蝠头套特写",
        body: "变体限量版本，全球仅限量印制 325 张。画面采用特写构图，聚焦于暴雨中蝙蝠侠头套与血月映照下的坚毅侧脸，深受硬核海报藏家追捧。",
      },
      {
        id: "poster-imax",
        name: "IMAX 官方专属限定海报",
        nameEn: "IMAX Exclusive Poster Art",
        maker: "IMAX · 比尔·辛凯维奇（Bill Sienkiewicz）绘",
        year: "2022",
        spec: "IMAX 专属影院特制画面",
        image: "/media/merch/poster-imax.jpg",
        imageAlt: "比尔·辛凯维奇绘制的 IMAX 艺术海报",
        body: "由漫画界殿堂级大师比尔·辛凯维奇亲笔绘制。以红色蝙蝠轮廓为基底，融合了谜语人、猫女、企鹅人与戈登等主要角色的先锋拼贴画风，极具视觉张力。",
      },
      {
        id: "poster-dolby",
        name: "杜比影院 (Dolby Cinema) 专属海报",
        nameEn: "Dolby Cinema Exclusive Poster",
        maker: "Dolby Cinema",
        year: "2022",
        spec: "杜比影院专享收藏海报",
        image: "/media/merch/poster-dolby.jpg",
        imageAlt: "杜比影院专属海报，蝙蝠灯光芒下的背影",
        body: "杜比影院专属宣传海报。蝙蝠侠背对镜头伫立在凄冷夜雨中，身后探照灯射出强光打在夜空，画面巧妙融入杜比标志性的「D」字母外框设计。",
      },
      {
        id: "poster-wall",
        name: "「揭开真相」经典公映海报挂画",
        nameEn: "Unmask the Truth 24×36 Poster",
        maker: "Trends International",
        year: "2022",
        spec: "24×36 英寸标准挂画",
        image: "/media/merch/poster-wall.jpg",
        imageAlt: "装裱在画框中的「揭开真相」官方海报",
        body: "公映期间流传最广的官方主视觉海报：红字问号与密电符号涂鸦覆盖在蝙蝠侠冷峻的面庞之上，揭示了全片侦探解谜的核心主题。",
      },
      {
        id: "poster-rays",
        name: "「破晓微光」官方艺术挂画",
        nameEn: "Rays of Light Art Print",
        maker: "Trends International / Pyramid",
        year: "2022",
        spec: "24×36 英寸胶印挂画",
        image: "/media/merch/poster-rays.jpg",
        imageAlt: "蝙蝠侠伫立于束光之下的艺术挂画",
        body: "经典零售海报版本，蝙蝠侠伫立在一束垂直顶光之中，红黑渐变背景彰显出孤独守护者的英勇气质。",
      },
    ],
  },
];

export const MERCH_TEASERS = [
  MERCH[0].items[0],
  MERCH[1].items[0],
  MERCH[2].items[0],
];
