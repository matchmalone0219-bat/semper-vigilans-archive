export type RootKind = "confirmed" | "cited" | "parallel";

export const ROOT_KIND: Record<RootKind, string> = {
  confirmed: "官方确认核心灵感",
  cited: "主创访谈重点提及",
  parallel: "经典母题考据对照",
};

export const ROOT_METHOD: { kind: RootKind; title: string; body: string }[] = [
  {
    kind: "confirmed",
    title: "官方确认核心灵感",
    body: "导演马特·里夫斯在公开专访与发布会中明确点名，作为电影角色心理构建与精神内核的核心原著蓝本。",
  },
  {
    kind: "cited",
    title: "主创访谈重点提及",
    body: "主创团队多次引述并借鉴其黑帮家族体系、连环悬疑破案结构或写实街头质感，对剧本创作产生了深远影响。",
  },
  {
    kind: "parallel",
    title: "经典母题考据对照",
    body: "电影中的关键视觉奇观或情节高潮与漫画经典桥段具有高度相似的互文性，为影迷与评论界广泛讨论的对比素材。",
  },
];

export type RootParallel = {
  comic: string;
  film: string;
};

export type RootWork = {
  id: string;
  kicker: string;
  title: string;
  titleEn: string;
  jump: string;
  creators: string;
  published: string;
  kind: RootKind;
  image: string;
  imageAlt: string;
  quote?: string;
  quoteZh?: string;
  quoteSrc?: string;
  thesis: string;
  lede: string;
  sources: { label: string; note: string }[];
  parallels: RootParallel[];
  sections: { heading: string; body: string }[];
};

export const ROOTS_INTRO =
  "马特·里夫斯执导的《新蝙蝠侠》并非对单一漫画篇目的机械改编，而是融合了 DC 漫画史上数部标杆作品的精神内核与犯罪片电影语言：布鲁斯的自我审判汲取自达温·库克的《蝙蝠侠：自我》；写实侦探风貌源自弗兰克·米勒的《蝙蝠侠：元年》；黑帮统治与节庆连环谜案承袭自《漫长的万圣节》；玛莎改姓阿卡姆、灭门与住院则直接取自杰夫·约翰斯的《蝙蝠侠：地球一号》；终局大堤决口与《零年》形成互文。帕丁森在 2022 年 2 月 18 日的 Entertainment Weekly 访问中点名丹尼斯·奥尼尔的《蝙蝠侠：萨满》，用来说明他把蝙蝠理解成近乎巫术的自我转化；同篇将《坠落之人》列为较轻的参照。电影语言上，里夫斯在 DC FanDome 点名《唐人街》《出租车司机》《法国贩毒网》等 1970 年代街头犯罪片；布鲁斯与瑟琳娜的对手戏被他、帕丁森与克拉维茨共同对标帕库拉的《柳巷芳草》（Klute）；帕丁森另将 1993 年动画长片《蝙蝠侠：幻影的面具》视为少数真正写出「成为蝙蝠侠是一种诅咒」的作品；战车出场则明确对标斯蒂芬·金原著、约翰·卡朋特执导的《克里斯汀》。";

export const ROOTS: RootWork[] = [
  {
    id: "ego",
    kicker: "01 / 心理内核",
    title: "蝙蝠侠：自我",
    titleEn: "Batman: Ego",
    jump: "自我",
    creators: "达温·库克（Darwyn Cooke）编绘",
    published: "2000 年 · DC 经典单行本",
    kind: "confirmed",
    image: "/media/roots/ego.jpg",
    imageAlt: "《蝙蝠侠：自我》达温·库克绘本封面",
    quote:
      "I wanted to get into the mindset of the character. One of the cool deep dive ones was Ego. He's confronting the beast that is Batman.",
    quoteZh:
      "我想深入到这个角色的思维状态里。《自我》是其中一部很适合深入挖掘的作品。布鲁斯在里面面对的，是那个名为“蝙蝠侠”的野兽。",
    quoteSrc: "导演马特·里夫斯，Esquire 专访与 DC FanDome 官方发言",
    thesis: "导演明确确认的心理构建蓝本：探讨布鲁斯·韦恩如何在义警初期直面内心阴暗面与道德边界。",
    lede: "《蝙蝠侠：自我》并非案件侦破故事，而是里夫斯构建年轻布鲁斯心理世界的核心切入点。影片深刻继承了布鲁斯对义警身份的正当性拷问与自我救赎历程。",
    sources: [
      {
        label: "Esquire 专访",
        note: "里夫斯详细阐述了《自我》对展现蝙蝠侠心理挣扎的重要启发。",
      },
      {
        label: "DC FanDome 官方发布会",
        note: "主创团队再次将《自我》确立为挖掘布鲁斯内心创伤的关键文献。",
      },
    ],
    parallels: [
      {
        comic: "布鲁斯在蝙蝠洞深处与具象化的内心暗黑人格「蝙蝠侠」展开激烈辩论。",
        film: "布鲁斯通过手写夜巡日记、反复查看头盔实录录像，对每一次行动展开痛苦复盘与内省。",
      },
      {
        comic: "质疑义警私刑究竟是捍卫正义，还是在宣泄无法释怀的复仇欲望。",
        film: "开场冷酷宣称「我是复仇」，在洪灾救援中救助受困市民，最终升华为守护城市的希望象征。",
      },
      {
        comic: "聚焦于人性与图腾之间的撕扯，淡化超级反派对决。",
        film: "帕丁森的演绎极具内敛与脆弱感，不仅打击罪犯，更深入展现凡人承受沉重使命时的创伤状态。",
      },
    ],
    sections: [
      {
        heading: "导演确立的精神蓝本",
        body: "在筹备《新蝙蝠侠》期间，马特·里夫斯并未直接沿用传统大片偏爱的神话式设定，而是将目光投向达温·库克 2000 年出版的心理学名作《蝙蝠侠：自我》。里夫斯看重的是布鲁斯尚未完全成熟时的挣扎状态——他不仅在对抗罪犯，更在对抗自身由于童年创伤而衍生出的愤怒与毁灭冲动。",
      },
      {
        heading: "漫画核心：内心恐惧与自我审判",
        body: "在漫画中，经历了一次打击犯罪失利的布鲁斯在洞穴中陷入幻觉，与象征原始恐惧、暴力与毁灭本能的黑影展开对话。作品通过这一具象化的心理剧，深刻探讨了义警行动的道德界限：如果为了打击罪恶而无休止地释放暴力，英雄与恶徒的界限又在哪里。",
      },
      {
        heading: "电影的影像化呈现与蜕变弧光",
        body: "电影将这一内省过程转化为极具质感的视听语言：布鲁斯眼眶周围残存的深黑眼妆、在昏暗车间内反复回看的第一人称镜头，均展现出其近乎强迫症般的精神自省。全片的高潮并非仅仅打倒谜语人，而是在洪水灾难中接过照明弹带领市民突围，完成从「复仇化身」向「正义图腾」的心理蜕变。",
      },
    ],
  },
  {
    id: "halloween",
    kicker: "02 / 黑帮叙事",
    title: "蝙蝠侠：漫长的万圣节",
    titleEn: "Batman: The Long Halloween",
    jump: "万圣节",
    creators: "编剧：杰夫·洛布（Jeph Loeb） · 作画：蒂姆·塞尔（Tim Sale）",
    published: "1996–1997 年 · 13 期经典限定剧集",
    kind: "cited",
    image: "/media/roots/halloween.jpg",
    imageAlt: "《蝙蝠侠：漫长的万圣节》经典封面",
    thesis: "法尔科内黑帮家族统治、连环节庆谋杀案以及传统黑道秩序崩解的经典源流。",
    lede: "里夫斯多次将本作列为构建哥谭社会生态的范本。电影汲取了其由传统黑手党家族掌控整座城市的压抑背景，以及通过连环凶案逐层剖开政商司法腐败的严密叙事结构。",
    sources: [
      {
        label: "主创专访与社交媒体推荐",
        note: "里夫斯多次确认《漫长的万圣节》是构思哥谭黑白两道权力架构的基石。",
      },
    ],
    parallels: [
      {
        comic: "卡尔迈恩·法尔科内的黑帮帝国全面渗透市政、警方与司法体系。",
        film: "法尔科内暗中操纵「新生」基金，将市长、警察局长与地区检察官纳为利益傀儡。",
      },
      {
        comic: "神秘连环杀手「节日」按美国节假日顺序暗杀黑帮核心成员，跨度历时一年。",
        film: "谜语人以万圣节为始发起针对腐败权贵的密集连环暗杀，并在现场留下定制加密谜语。",
      },
      {
        comic: "蝙蝠侠、戈登警官与地方检察官结成匡扶正义的调查铁三角。",
        film: "第一部聚焦于蝙蝠侠与戈登的早期信任建立，展现体制内外的正义求索。",
      },
    ],
    sections: [
      {
        heading: "黑帮帝国与权势网络",
        body: "洛布与塞尔在漫画中塑造了一个由「罗马人」卡尔迈恩·法尔科内一手遮天的哥谭市。电影高度继承了这一设定：约翰·特托罗饰演的法尔科内并非寻常街头混混，而是高坐于冰山俱乐部顶层、能够任意操纵全城政客与执法高层的隐形市长，增强了故事的冷硬犯罪质感。",
      },
      {
        heading: "连环杀手与硬汉派侦探叙事",
        body: "漫画采用硬汉派侦探小说的推进方式，通过连环命案迫使主角层层抽丝剥茧。电影中谜语人针对市长、局长与检察官的精准处决，在悬疑节奏上致敬了漫画中节日杀手带来的窒息感，将打击犯罪的过程还原为严密的刑侦推理与现场物证勘验。",
      },
      {
        heading: "法治秩序的拷问与原著映射",
        body: "《漫长的万圣节》最核心的主题在于探讨传统黑帮与新兴超级反派交替时期，法律体系的脆弱与失序。漫画中体制内外正义力量在黑帮与私刑夹缝中的艰难博弈，始终是理解哥谭社会生态与权力变迁的重要参考坐标。",
      },
    ],
  },
  {
    id: "year-one",
    kicker: "03 / 街头写实",
    title: "蝙蝠侠：元年",
    titleEn: "Batman: Year One",
    jump: "元年",
    creators: "编剧：弗兰克·米勒（Frank Miller） · 作画：大卫·马祖凯利（David Mazzucchelli）",
    published: "1987 年 · 《蝙蝠侠》第 404–407 期",
    kind: "cited",
    image: "/media/roots/year-one.jpg",
    imageAlt: "《蝙蝠侠：元年》豪华版精装封面",
    thesis: "泥泞粗粝的街头纪实美学、早期硬核侦探手法与戈登警官的生死信任同盟。",
    lede: "米勒与马祖凯利的里程碑之作开创了蝙蝠侠写实主义的先河。电影虽然将时间线设定在义警生涯第二年，但在市井质感、装备手工感与警民合作信任线上深刻传承了《元年》的精髓。",
    sources: [
      {
        label: "主创访谈",
        note: "主创团队反复强调 1970 年代新好莱坞犯罪片与《元年》写实风格对视听语言的指导作用。",
      },
    ],
    parallels: [
      {
        comic: "将哥谭描绘为充满雨水、霓虹反光与真实泥泞的罪恶街区，极具纪实色彩。",
        film: "利物浦与格拉斯哥的湿冷街景、带接缝的战术防暴装甲与近身缠斗搏击。",
      },
      {
        comic: "布鲁斯尚在摸索侦探办案方法，多次通过便装潜伏深入底层搜集情报。",
        film: "身着飞行员夹克的「流浪者」便服潜入冰山俱乐部，依靠物证勘验与实地盘问推进线索。",
      },
      {
        comic: "刚正不阿的戈登警官在腐败警局内部艰难抉择，最终与暗夜义警结成同盟。",
        film: "戈登中尉力排众议与蝙蝠侠并肩进出案发现场，并在片尾正式启用楼顶蝙蝠信号灯。",
      },
    ],
    sections: [
      {
        heading: "写实泥泞的视觉质感",
        body: "弗兰克·米勒与大卫·马祖凯利打破了早期漫画的奇幻滤镜，将哥谭还原为一座充斥着雨水、尾气与霓虹灯影的现代化工业都市。电影在视觉美学上全面承袭了这一质感：罗伯特·帕丁森的战衣带有手工焊接与实战磨损痕迹，战车散发着美式肌肉车的轰鸣与机油味，呈现出极具说服力的物理真实感。",
      },
      {
        heading: "回归硬核侦探本质",
        body: "在《元年》的精神指引下，电影回归了蝙蝠侠最初「世界最伟大侦探」的设定。布鲁斯不再依赖全知全能的超级黑科技，而是依靠法医物证、密电破解、实地盯梢与心理攻防一步步逼近真相，确立了里夫斯宇宙独特的探案基调。",
      },
      {
        heading: "体制内外的正义共鸣",
        body: "影片深刻刻画了戈登中尉与蝙蝠侠之间的默契发展。两人同为哥谭体制内外的孤勇者，从最初的相互试探到后期的生死相托，最终在警局天台点亮蝙蝠信号灯，为整座黑夜笼罩的城市确立了正义的坐标。",
      },
    ],
  },
  {
    id: "zero-year",
    kicker: "04 / 灾难互文",
    title: "蝙蝠侠：零年",
    titleEn: "Batman: Zero Year",
    jump: "零年",
    creators: "编剧：斯科特·斯奈德（Scott Snyder） · 作画：格雷格·卡普洛（Greg Capullo）",
    published: "2013–2014 年 · DC New 52 系列",
    kind: "parallel",
    image: "/media/roots/zero-year.jpg",
    imageAlt: "《蝙蝠侠：零年》官方漫画封面",
    thesis: "谜语人通过破坏城市核心基础设施引发毁灭性水患，与电影终局形成精彩的经典母题互文。",
    lede: "《零年》重构了谜语人的反派定位，将其塑造为破坏城市电网与大坝的高智商思想罪犯。电影第一部结尾防洪大堤被毁、海水倒灌体育馆的情节，与漫画中的末日水患形成了引人入胜的艺术呼应。",
    sources: [
      {
        label: "主流影视评论与原著考据",
        note: "各大专业影视媒体普遍指出大坝决堤与灾后救赎情节在结构上与《零年》的高度互文。",
      },
    ],
    parallels: [
      {
        comic: "谜语人爱德华·尼格玛切断全城供电并在飓风期间引爆水库，令哥谭陷入汪洋与无政府状态。",
        film: "谜语人追随者引爆装满炸药的货车炸毁防洪大堤，海水席卷整座城市。",
      },
      {
        comic: "谜语人自视为城市的重塑者，企图通过极端毁灭迫使哥谭社会从废墟中洗牌重建。",
        film: "保罗·达诺版谜语人将恐怖袭击包装为对特权阶层的末日审判，撕开系统性腐败的遮羞布。",
      },
      {
        comic: "布鲁斯在满目疮痍的废墟中挺身而出，成为照亮全城的正义象征。",
        film: "蝙蝠侠在漫灌的体育馆中点燃红色照明弹引导市民撤离，完成了向守护者的精神升华。",
      },
    ],
    sections: [
      {
        heading: "反派格局与水患母题",
        body: "在斯科特·斯奈德笔下的《零年·黑暗之城》篇章中，谜语人展现出超越常规罪犯的战略破坏力。他利用哥谭的地理与基础设施弱点制造滔天水患，以此宣告旧秩序的瓦解。电影在终局巧妙借用了这一灾难母题，增强了全片对抗的灾难压迫感。",
      },
      {
        heading: "灾难废墟中的英雄觉醒",
        body: "水患不仅是视觉奇观，更是推动布鲁斯角色弧光转变的关键催化剂。在两部作品中，毁灭性的洪灾都成为了试金石：面对绝境中的苦难平民，蝙蝠侠放下了单纯以暴制暴的复仇执念，毅然走向人群前线，真正成为了城市不可或缺的希望灯塔。",
      },
    ],
  },
  {
    id: "shaman",
    kicker: "05 / 图腾",
    title: "蝙蝠侠：萨满",
    titleEn: "Batman: Shaman",
    jump: "萨满",
    creators: "编剧：丹尼斯·奥尼尔（Dennis O'Neil） · 铅笔：埃德·汉尼根（Ed Hannigan） · 勾线：约翰·贝蒂（John Beatty）",
    published: "1989–1990 年 · 《Legends of the Dark Knight》第 1–5 期",
    kind: "cited",
    image: "/media/roots/shaman.jpg",
    imageAlt: "《Legends of the Dark Knight》第 1 期封面，乔治·普拉特绘，标题为 Shaman",
    quote:
      "It's almost a dream state the whole time. I was like, 'Oh, that hasn't really been touched on.' There's a kind of mysticism to it.",
    quoteZh: "整本几乎都在梦境里。我想，这一点还没人真正拍过。里面有一种神秘主义。",
    quoteSrc: "罗伯特·帕丁森，Entertainment Weekly，2022 年 2 月 18 日",
    thesis: "帕丁森用来离开诺兰式实用解释的一篇：蝙蝠不是吓罪犯的工具，而是布鲁斯相信自己正在变成的东西。",
    lede: "故事发生在蝙蝠侠活动的头几周，贴着《元年》的开头。成名之前的布鲁斯在阿拉斯加重伤，一位萨满戴着仪式蝙蝠面具，用一则古传说把他治好，并要他发誓不把故事说出去。帕丁森借的是这层神秘主义，不是邪教凶案的情节。",
    sources: [
      {
        label: "Entertainment Weekly",
        note: "2022 年 2 月 18 日，帕丁森把《萨满》和诺兰电影里对战衣的实用解释对照着讲。",
      },
    ],
    parallels: [
      {
        comic: "萨满的蝙蝠传说不是战术教材。它让伤者相信自己和这只生物连在一起。",
        film: "帕丁森说穿上这套衣服之后，布鲁斯会相信自己获得了力量，哪怕他其实只是个普通人。",
      },
      {
        comic: "面具后来留在蝙蝠洞里，提醒他已经变成的那个东西。",
        film: "开场俯身验尸时，他想要的是德鲁伊的姿态，而不是一身坦克式的战甲。",
      },
    ],
    sections: [
      {
        heading: "阿拉斯加的面具与誓言",
        body: "布鲁斯跟随赏金猎人威利·多格特追杀手汤姆·伍德利，多格特被杀，他自己在雪地里倒下。萨满和女儿救了他。他后来把不该外传的传说告诉了一名由韦恩资助的调查者。哥谭随后出现戴着同款阿拉斯加面具的凶手，骗局揭开后，那张面具留在洞穴里。",
      },
      {
        heading: "帕丁森取走的部分",
        body: "电影没有改编丘巴拉邪教，也没有把阿拉斯加写进剧情。帕丁森说他要找的是另一个角度：成为蝙蝠侠不是一套讲得通的计划，而更接近巫医相信衣服本身会带来力量。战衣在他的演法里不是道具，是皮肤。",
      },
    ],
  },
  {
    id: "man-who-falls",
    kicker: "06 / 短对照",
    title: "坠落之人",
    titleEn: "The Man Who Falls",
    jump: "坠落",
    creators: "编剧：丹尼斯·奥尼尔（Dennis O'Neil） · 作画：迪克·乔达诺（Dick Giordano）",
    published: "1989 年 · 《Secret Origins of the World's Greatest Super-Heroes》中的新作，16 页",
    kind: "parallel",
    image: "/media/roots/man-who-falls.jpg",
    imageAlt: "迪克·乔达诺所绘，一只蝙蝠撞破窗户",
    thesis: "同一篇访问里较轻的参照。坠洞、游历和窗前的蝙蝠收在这十六页里；《新蝙蝠侠》不拍这段起源。",
    lede: "这是那本起源选集里唯一的新故事。幼年布鲁斯跌进庄园的洞，父母遇刺，少年出走学艺，归来后一只蝙蝠撞破书房的窗户。诺兰的《侠影之谜》用了坠洞。里夫斯这部从义警第二年进入。",
    sources: [
      {
        label: "Entertainment Weekly",
        note: "2022 年 2 月 18 日的同一篇访问把《坠落之人》放在《萨满》之后，作为次要参照。",
      },
    ],
    parallels: [
      {
        comic: "蝙蝠撞破窗户之后，布鲁斯决定成为蝙蝠侠。叙述说他此后会一直坠落。",
        film: "影片没有坠洞，也没有这场窗前的蝙蝠。帕丁森只是用它说明：选择本身像一场梦，而不是一份计划。",
      },
    ],
    sections: [
      {
        heading: "对照，不是蓝本",
        body: "奥尼尔把此前分散的起源页收成一篇：洞、丧亲、游历、窗户上的蝙蝠。帕丁森点名的重点仍是《萨满》。《坠落之人》说明同一件事的来路更早，也说明坠洞属于另一部电影。",
      },
    ],
  },
];

export type CinemaWork = {
  id: string;
  kicker: string;
  title: string;
  titleEn: string;
  director: string;
  year: string;
  thesis: string;
  lede: string;
  image?: string;
  imageAlt?: string;
  quote?: string;
  quoteZh?: string;
  quoteSrc?: string;
  parallels: { cinema: string; batman: string }[];
  breakdown: { heading: string; body: string }[];
};

export const CINEMA_ROOTS: CinemaWork[] = [
  {
    id: "chinatown",
    kicker: "01 / 新黑色电影新好莱坞巅峰",
    title: "唐人街",
    titleEn: "Chinatown",
    director: "罗曼·波兰斯基（Roman Polanski）",
    year: "1974 年",
    thesis: "城市水利基础设施贪腐、私家侦探受困权贵网罗以及无法扭转的宿命悲剧。",
    lede: "马特·里夫斯多次公开将《唐人街》奉为第一部剧本创作的最核心灵感。从哥谭防洪大坝暗藏的黑幕，到侦探被上层阶级肆意玩弄的无力感，两部作品在结构与主旨上高度契合。",
    image: "/media/roots/chinatown.jpg",
    imageAlt: "《唐人街》1974 年美国半开张海报：杰克·尼科尔森与费·唐纳薇",
    quote:
      "Chinatown was a key one, because in Chinatown, Jake Gittes, in investigating the series of crimes that were part of that story, he discovers the depth of corruption of Los Angeles. So in that way, it is like a classic noir.",
    quoteZh:
      "《唐人街》是关键的一部：杰克·吉蒂斯调查那一系列案件时，发现了洛杉矶腐败的深度。所以在这个意义上，它就是一部经典黑色电影。",
    quoteSrc: "马特·里夫斯，DC FanDome",
    parallels: [
      {
        cinema: "私家侦探杰克·吉蒂斯（Jack Gittes）顺着一起看似普通的通奸案，层层揭开洛杉矶水务局侵吞公共资源的惊天阴谋。",
        batman: "蝙蝠侠从市长唐·米切尔的私情密照入手，逐步撕开法尔科内掌控百亿「新生」基金与哥谭水利大坝的腐败巨网。",
      },
      {
        cinema: "权贵寡头诺亚·克罗斯（Noah Cross）不仅一手遮天控制全城水源，更隐瞒着丑陋的家族乱伦丑闻。",
        batman: "卡尔迈恩·法尔科内高居冰山俱乐部顶层操纵政客，同时隐瞒了自己与猫女瑟琳娜的父女血缘机密。",
      },
      {
        cinema: "结局充满新好莱坞典型的幻灭感：‘算了，杰克，这里是唐人街。’",
        batman: "布鲁斯竭尽全力破案，却依然未能阻止大坝决堤与城市覆灭，被迫面对个人英雄主义的极限与体制重塑的漫长痛苦。",
      },
    ],
    breakdown: [
      {
        heading: "水利贪腐与公共罪恶",
        body: "《唐人街》将罪恶的根源锚定在城市生存必不可少的公共资源——水资源上。里夫斯在《新蝙蝠侠》中巧妙转译了这一母题：谜语人炸毁的防洪大堤正是当年贪腐官员偷工减料的产物，滔天洪水象征着被掩盖的谎言彻底冲垮了虚伪的繁华。",
      },
      {
        heading: "深陷迷局的孤胆侦探",
        body: "不同于传统大片中全知全能的超级英雄，罗伯特·帕丁森饰演的蝙蝠侠如同杰克·吉蒂斯一样，虽然推理严密，却屡屡慢了凶手一步，甚至沦为各方势力博弈的棋子。这种‘侦探在城市迷宫中受挫’的硬汉派叙事，为影片注入了极其稀缺的现实重量。",
      },
    ],
  },
  {
    id: "taxi-driver",
    kicker: "02 / 心理异化与街头审视",
    title: "出租车司机",
    titleEn: "Taxi Driver",
    director: "马丁·斯科塞斯（Martin Scorsese）",
    year: "1976 年",
    thesis: "雨夜独白、手写日记、孤独义警在污秽街头的自我审视与精神异化。",
    lede: "里夫斯在 DC FanDome 把《出租车司机》说成「对一个地方的描述，以及钻进某个人的脑子里」。导演评论音轨里他更直接：布鲁斯要有「特拉维斯·比克尔那种写日记的气质」。帕丁森版开场透过雨夜车窗审视街头、以日记体画外音自称「复仇」，就是这条主观视点。米勒在《元年》纪念版批注里要求把早期蝙蝠侠画成「赢了《出租车司机》模仿大赛」的样子——里夫斯读到这句时公开笑认，两条线索在此会合。",
    image: "/media/roots/taxi-driver.jpg",
    imageAlt: "《出租车司机》1976 年官方海报：罗伯特·德尼罗走在纽约街头",
    quote: "I wanted him to have this almost Travis Bickle-like quality of keeping a journal.",
    quoteZh: "我想让他带上一点特拉维斯·比克尔那种写日记的气质。",
    quoteSrc: "马特·里夫斯，《新蝙蝠侠》导演评论音轨",
    parallels: [
      {
        cinema: "退伍老兵特拉维斯在失眠的雨夜驾驶黄色出租车穿梭于纽约街头，通过手写日记倾泻对街头堕落与腐朽的厌恶。",
        batman: "布鲁斯在地下车间借着昏暗台灯书写《哥谭项目》夜巡日记，画外音冷酷宣称城市在雨夜里自我吞噬。",
      },
      {
        cinema: "特拉维斯眼中的城市充斥着霓虹光晕、潮湿路面与道德沦丧，最终促使其走上极端暴力「清洗」之路。",
        batman: "格雷格·弗雷泽运用钠黄街灯、失焦虚化与浅景深镜头，将哥谭塑造成一座布满泥泞与阴郁窒息感的异化深渊。",
      },
      {
        cinema: "特拉维斯以军装、枪械与镜前独白完成自我武装，把自己从旁观者改造成执行者。",
        batman: "布鲁斯以战衣、隐形眼镜记录与日记完成同一仪式：把私刑冲动包装成「犯罪学实验」，直到洪水救援才被迫走出主观洞穴。",
      },
    ],
    breakdown: [
      {
        heading: "日记体主观视点",
        body: "《出租车司机》最经典的艺术特色在于让观众完全沉浸在主角极度偏执的主观视角中。《新蝙蝠侠》罕见地在开场与收尾使用完整的日记画外音，直白剖开布鲁斯深陷仇恨、濒临精神崩溃的真实内心。里夫斯把这本日记称作布鲁斯的「犯罪学实验记录」——他要看见自己对这座城市究竟产生了什么影响，也因此看见自己正在变成什么。音轨里他还提到一份真实的新警察夜班日记：那名新警写自己正在变成「夜行动物」，这句话几乎原样写进了开场独白。",
      },
      {
        heading: "《元年》里那一格「出租车司机模仿赛」",
        body: "弗兰克·米勒写给大卫·马祖凯利的批注要求早期蝙蝠侠「看起来就像赢了《出租车司机》模仿大赛」。里夫斯在 Esquire 专访中确认，《元年》里布鲁斯第一次上街打击犯罪的那一格，正是他把帕丁森版便装流浪者、飞行员夹克与雨夜街头视点连到斯科塞斯的起点。",
      },
    ],
  },
  {
    id: "klute",
    kicker: "03 / 猫女关系 · 新黑色对照",
    title: "柳巷芳草",
    titleEn: "Klute",
    director: "艾伦·J·帕库拉（Alan J. Pakula）",
    year: "1971 年",
    thesis: "正直侦探误判一个不愿被归类的女人，二人在对峙里互相改写对方的世界观。",
    lede: "里夫斯对 Den of Geek 说：「《柳巷芳草》（Klute）极其重要。」写蝙蝠侠与瑟琳娜时，他反复回看帕库拉 1971 年这部新黑色：简·方达饰演的布里·丹尼尔斯（Bree Daniels）既不是蛇蝎美人，也不是良心未泯的交际花；唐纳德·萨瑟兰饰演的约翰·克鲁特（John Klute）是一根直肠子，先把她放进「某种人」的盒子，又无法不被她改写。帕丁森说，他与里夫斯关于剧本的第一场谈话就是「这剧本里有多少《克鲁特》」；克拉维茨则把这部电影当成猫女调性的「圣经」。里夫斯后来补了一句：蝙蝠侠与猫女是「《克鲁特》混上《唐人街》」。",
    image: "/media/roots/klute.jpg",
    imageAlt: "《柳巷芳草》1971 年官方海报：简·方达回望镜头",
    quote:
      "Klute was super important. When I was writing, I watched a bunch of noirs… and there was something in that movie that spoke to me when I was writing about Batman and Selina Kyle.",
    quoteZh:
      "《克鲁特》极其重要。写剧本时我看了一批黑色电影……这部片子里有某种东西，正好对着我在写的蝙蝠侠与瑟琳娜。",
    quoteSrc: "马特·里夫斯，Den of Geek 专访",
    parallels: [
      {
        cinema: "克鲁特是一根直肠子：先假定布里因为身处那个世界就「是某种人」，随后又无法不被她吸引、被她改写。",
        batman: "帕丁森说布鲁斯的世界观极度二元——只有坏人与全然无辜，中间什么都没有；瑟琳娜一出现，他就不断想把她塞进「罪犯」的盒子。",
      },
      {
        cinema: "布里既不是蛇蝎美人，也不是良心未泯的交际花；她清楚自己的破绽，也拒绝被侦探的道德量表打分。",
        batman: "瑟琳娜是窃贼、是幸存者、是为失踪友人动手的人。她不需要蝙蝠侠拯救，也不接受他的审判，却在对峙里把他的绝对主义撕开第一道缝。",
      },
      {
        cinema: "帕丁森形容两人关系「他一直在 neg 她，而这事莫名其妙地变得性感」；怒气本身就是磁力。",
        batman: "公寓对质、雨夜天台、冰山俱乐部里那句「你根本不了解我」——第一部把猫鼠戏写成互相激怒、又互相需要的磁场，而不是传统的英雄收编反派。",
      },
    ],
    breakdown: [
      {
        heading: "三个人都点了这部的名",
        body: "里夫斯说写剧本时《克鲁特》「极其重要」；帕丁森说这是他和导演关于剧本的第一场谈话；克拉维茨把这部电影当成瑟琳娜调性与两人关系的「圣经」。在主创点名的影史参照里，很少有一部像这样被导演、蝙蝠侠与猫女三方同时认领。",
      },
      {
        heading: "《克鲁特》混上《唐人街》",
        body: "里夫斯自己把蝙蝠侠与猫女概括成这个配方：克鲁特提供误判与被改写，唐人街提供费·唐纳薇那种「你以为她是蛇蝎、深入后才发现她的故事很惨」的翻转。法尔科内血缘揭开之后，布鲁斯才看清自己对瑟琳娜的道德审判有多廉价——这不是爱情戏的甜点，而是侦探功课的一部分。",
      },
    ],
  },
  {
    id: "all-presidents-men",
    kicker: "04 / 政治悬疑与审计追踪",
    title: "总统班底",
    titleEn: "All the President's Men",
    director: "艾伦·J·帕库拉（Alan J. Pakula）",
    year: "1976 年",
    thesis: "遵循财务资金流水审计贪腐、阴暗地下车库秘密接头与冷峻纪实新闻调查。",
    lede: "在案件调查推进方式上，本片摒弃了传统大片的炫目黑科技，而是像帕库拉的经典政治惊悚片一样，依靠原始账本核对、闭路电视录像比对与深夜地下车库线人密会推进案情。里夫斯在宣传期发布会上说：戈登与蝙蝠侠「某种意义上就是」伍德沃德与伯恩斯坦——「腐败究竟能爬多高？」",
    image: "/media/roots/presidents-men.jpg",
    imageAlt: "《总统班底》1976 年英国四开海报：达斯汀·霍夫曼与罗伯特·雷德福",
    quote:
      "There's a way in which Lieutenant Gordon and Batman in this movie are Bob Woodward and Carl Bernstein in All the President's Men. I mean, this whole thing about corruption and how high does it go?",
    quoteZh:
      "某种意义上，这部电影里的戈登中尉和蝙蝠侠就是《总统班底》里的伍德沃德与伯恩斯坦。我是说，整件事就是：腐败究竟能爬多高？",
    quoteSrc: "马特·里夫斯，电影宣传期发布会",
    parallels: [
      {
        cinema: "华盛顿邮报记者鲍勃·伍德沃德顺着竞选洗钱支票‘Follow the Money’，步步逼近水门事件最高权力中枢。",
        batman: "蝙蝠侠与戈登顺着《谜语人元年》中的收容所账本与海滨实业空壳公司，层层查清百亿「新生」基金的洗钱路线。",
      },
      {
        cinema: "记者与神秘线人‘深喉’（Deep Throat）在昏暗阴冷的地下停车场进行充满戒备的密会。",
        batman: "戈登中尉与蝙蝠侠多次在废弃地下车库、警局停尸间与雨夜天台低语交换机密物证，极具新好莱坞纪实张力。",
      },
    ],
    breakdown: [
      {
        heading: "‘追查资金流向’（Follow the Money）",
        body: "本片将谜语人设定为一名前司法会计师，这一绝妙设定让整部电影的探案逻辑深深植根于财务审计与政经制度黑幕，使超英题材具备了罕见的严肃现实主义厚度。",
      },
    ],
  },
  {
    id: "se7en",
    kicker: "05 / 连环杀手与仪式审判",
    title: "七宗罪",
    titleEn: "Se7en",
    director: "大卫·芬奇（David Fincher）",
    year: "1995 年",
    thesis: "连环杀手按名单处决权贵、雨夜现场留下仪式化线索、凶手主动投案并在牢房掌控全局。",
    lede: "大卫·芬奇的《七宗罪》为本片的连环暗杀结构与视觉基调提供了直接参照。保罗·达诺饰演的谜语人与凯文·史派西饰演的约翰·多伊（John Doe）在作案哲学与终局设计上具有高度互文性。里夫斯另将真实的黄道十二宫杀手（Zodiac Killer）称为谜语人的「现实世界类比」：暗号、自制头套与向媒体投递，共同构成了谜语人更贴近现实罪案的那一面。",
    image: "/media/roots/se7en.jpg",
    imageAlt: "《七宗罪》1995 年官方海报：布拉德·皮特与摩根·弗里曼分立雨夜两侧",
    parallels: [
      {
        cinema: "连环杀手根据天主教‘七宗罪’教义精心设计现场死法，并在凶案现场墙壁留下血字题词。",
        batman: "谜语人按哥谭受贿权贵名单依次处决市长、局长与检察官，并在现场留下定制问号贺卡与血字封条。",
      },
      {
        cinema: "约翰·多伊在完成一系列谋杀后浑身是血从容走进警局自首，实际上将警探引向其早已策划好的终极心理死局。",
        batman: "谜语人在冰山俱乐部对街的餐馆从容喝咖啡等待警方逮捕，将蝙蝠侠引至阿卡姆牢房，而真正的终局大坝灾难在外面按时引爆。",
      },
    ],
    breakdown: [
      {
        heading: "雨夜罪恶之城的仪式感",
        body: "《七宗罪》中连绵不绝的阴雨、压抑昏黄的室内光线与散发着霉味的手写笔记本，在《新蝙蝠侠》中得到了直接的视觉继承与风格致敬。谜语人出租公寓内搜获的数百本手写密电日记，正是对芬奇美学最纯正的致敬。",
      },
    ],
  },
  {
    id: "french-connection",
    kicker: "06 / 纯实拍公路追逐典范",
    title: "法国贩毒网",
    titleEn: "The French Connection",
    director: "威廉·弗莱德金（William Friedkin）",
    year: "1971 年",
    thesis: "摒弃绿幕特效的纯实战实拍公路追逐、引擎咆哮与粗粝纪实手持镜头。",
    lede: "第一部中最为影迷津津乐道的战车雨夜追击企鹅人戏份，导演里夫斯与摄影弗雷泽明确以威廉·弗莱德金 1971 年的经典公路追逐为标杆，坚持全实车特技与车体机位拍摄。DC FanDome 上他把这部片子和《唐人街》放在一起，说那种「粗糙、有缺陷的人性」来自这类 70 年代街头警匪片。",
    image: "/media/roots/french-connection.jpg",
    imageAlt: "《法国贩毒网》1971 年官方海报：吉恩·哈克曼举枪冲前",
    quote:
      "That kind of idea of that gritty, flawed humanity of it, that was very much inspired by those kinds of movies like The French Connection and other cop movies like that.",
    quoteZh: "那种粗糙、有缺陷的人性，很大程度上就是受《法国贩毒网》这类警匪片启发。",
    quoteSrc: "马特·里夫斯，DC FanDome",
    parallels: [
      {
        cinema: "吉恩·哈克曼驾驶庞蒂亚克在布鲁克林高架桥下疯狂追击高架轻轨列车，纯实拍镜头带来扑面而来的车祸震颤感。",
        batman: "蝙蝠侠驾驶后置涡轮战车在暴雨滂沱的高速公路上疯狂穿插追击企鹅人的玛莎拉蒂，火舌喷涌与连环追尾全部采用特技实拍。",
      },
      {
        cinema: "摄影机被直接绑在保险杠与副驾驶座，粗暴的颠簸与刮擦声打破了一切好莱坞商业片的平滑感。",
        batman: "格雷格·弗雷泽将特制防水摄影机直接焊死在战车引擎盖与底盘上，利用低机位与水花泼溅打造出极具压迫感的速度奇观。",
      },
    ],
    breakdown: [
      {
        heading: "实拍机械质感的胜利",
        body: "在 CGI 特效泛滥的当代超英电影中，《新蝙蝠侠》反其道而行之，复活了 1970 年代新好莱坞纯粹依靠引擎马力、特技车手与硬核摄影机位的实拍美学，让战车的每一次撞击与咆哮都具备真实的物理破坏力。",
      },
    ],
  },
  {
    id: "phantasm",
    kicker: "07 / 动画长片 · 诅咒而非凯旋",
    title: "蝙蝠侠：幻影的面具",
    titleEn: "Batman: Mask of the Phantasm",
    director: "埃里克·拉多姆斯基（Eric Radomski）与布鲁斯·蒂姆（Bruce Timm）",
    year: "1993 年",
    thesis: "成为蝙蝠侠是一种诅咒与负担，而不是英雄凯旋——帕丁森点名的真人电影罕见先例。",
    lede: "罗伯特·帕丁森在《Premiere France》专访中明确表示：漫画里的蝙蝠侠更不稳定、读起来其实很悲伤，而以往真人电影总是把英雄面推到前面。「在我看来，唯一做到这一点的，就是动画长片《蝙蝠侠：幻影的面具》。我看的时候突然明白：成为蝙蝠侠是一种诅咒，是一种负担。」这部 1993 年院线动画由《蝙蝠侠动画系列》原班人马制作，把布鲁斯写成一个几乎放弃誓言、又被旧爱与私刑幻影逼回斗篷的人。",
    image: "/media/roots/phantasm.jpg",
    imageAlt: "《蝙蝠侠：幻影的面具》主视觉：蝙蝠侠张开斗篷，幻影面具悬浮于云层",
    quote: "When I saw it, it clicked: Being Batman is a kind of curse, it's a burden.",
    quoteZh: "我看的时候突然明白：成为蝙蝠侠是一种诅咒，是一种负担。",
    quoteSrc: "罗伯特·帕丁森，《Premiere France》专访",
    parallels: [
      {
        cinema: "布鲁斯在父母墓前立誓后，几乎选择与安德烈娅·博蒙特（Andrea Beaumont）过普通人的生活；她突然离开，才迫使他重新戴上头套。",
        batman: "帕丁森版布鲁斯几乎没有花花公子面具，把整个人生压进夜巡；与瑟琳娜短暂靠近时，那条「也可以不当蝙蝠侠」的缝隙被重新打开，又迅速合上。",
      },
      {
        cinema: "幻影以致命私刑清扫黑帮，媒体与警方一度分不清他与蝙蝠侠；布鲁斯必须直面「以暴制暴会把自己变成什么」。",
        batman: "谜语人把蝙蝠侠的复仇修辞原样还给城市：追随者高喊「我是复仇」，把义警图腾拧成恐怖符号，逼布鲁斯在洪水里改口。",
      },
      {
        cinema: "影片把蝙蝠侠写成背负诅咒的人，而不是每次都能赢的城市守护神；凯旋被改写成失去。",
        batman: "第一部结尾不是解开所有谜题，而是大坝已溃、城市已淹——侦探赢了推理，仍救不下整座哥谭。",
      },
    ],
    breakdown: [
      {
        heading: "帕丁森为什么单点这一部",
        body: "在同一采访里，帕丁森强调《新蝙蝠侠》的调性与以往真人蝙蝠侠电影无关，却与《幻影的面具》相通：它捕捉的是角色内部的翻涌，而不是披风落地的英姿。里夫斯把故事放在义警生涯第二年，正是为了停在「尚未成为最好的自己」的位置——这与动画里那个仍会在墓园动摇的布鲁斯是同一条心理轴线。",
      },
      {
        heading: "私刑幻影与「我是复仇」",
        body: "幻影以更冷酷的私刑效率让蝙蝠侠显得「还不够黑」。第一部把同一命题交给谜语人与他的追随者：如果城市需要的是清洗而不是守护，蝙蝠侠的存在本身就会被复制、被极端化。洪水体育馆里那句从「复仇」转向救援的转变，是对动画里那条诅咒的一次正面回答。",
      },
    ],
  },
  {
    id: "christine",
    kicker: "08 / 恐怖载具 · 从阴影里活过来的车",
    title: "克里斯汀",
    titleEn: "Christine",
    director: "约翰·卡朋特（John Carpenter），改编自斯蒂芬·金（Stephen King）",
    year: "1983 年",
    thesis: "把战车写成恐怖片里的活物：从阴影中现身，以引擎与车灯恐吓猎物。",
    lede: "里夫斯在《Empire》专访中谈战车设计时，没有先提肌肉车或科幻载具，而是点名斯蒂芬·金的《克里斯汀》：「它必须从阴影里现身来威慑，所以我几乎是把它想成斯蒂芬·金的《克里斯汀》。我喜欢车本身作为恐怖形象、以动物性的出场把被追的人吓破胆。」他随即补了一句：「这部电影绝对有恐怖片的一面。」卡朋特 1983 年的电影把 1958 年普利茅斯·怒火（Plymouth Fury）拍成会自行点火、自行狩猎的活物；第一部雨夜战车从黑暗里喷出火舌追上企鹅人，走的就是这条恐怖片逻辑，而不是超级英雄的载具展示。",
    image: "/media/roots/christine.jpg",
    imageAlt: "《克里斯汀》1983 年官方海报：黑暗中只剩一对车灯逼近",
    quote:
      "It has to make an appearance out of the shadows to intimidate, so I thought of it almost like Stephen King's Christine. I liked the idea of the car itself as a horror figure, making an animalistic appearance to really scare the hell out of the people Batman's pursuing. There is absolutely a horror genre aspect to this movie.",
    quoteZh:
      "它必须从阴影里现身来威慑，所以我几乎是把它想成斯蒂芬·金的《克里斯汀》。我喜欢车本身作为恐怖形象、以动物性的出场把被追的人吓破胆。这部电影绝对有恐怖片的一面。",
    quoteSrc: "马特·里夫斯，《Empire》杂志专访",
    parallels: [
      {
        cinema: "克里斯汀在夜色中自行发动，只以一对远光灯宣告自己还活着；猎物还没看清车身，就已经被锁定。",
        batman: "战车第一次完整出场不是停在蝙蝠洞里展览，而是在暴雨高速公路上从黑暗中冲出，涡轮喷口喷火，把企鹅人的玛莎拉蒂变成猎物。",
      },
      {
        cinema: "金与卡朋特把汽车写成有脾气、会复仇的动物，引擎声就是咆哮。",
        batman: "里夫斯要求战车「听起来像野兽」：后置发动机的机械嘶吼先于车身到达，让载具本身成为蝙蝠侠恐吓战术的一部分。",
      },
      {
        cinema: "《克里斯汀》的恐怖不在刀枪，而在一辆不该有生命的机器突然具备了意志。",
        batman: "这部战车没有导弹、没有隐形；它吓人的是物理存在本身——重量、火焰、雨夜里那两盏灯。",
      },
    ],
    breakdown: [
      {
        heading: "出场即恐吓，而不是展示",
        body: "超级英雄电影习惯把载具当玩具亮相。《克里斯汀》给里夫斯的提示是相反的：先让观众和罪犯一起害怕，再让他们看清这是什么。第一部把战车藏到中段，又用实拍撞击与车体机位把它拍成会呼吸的金属动物，正是这条思路的落地。",
      },
      {
        heading: "与《法国贩毒网》并不矛盾",
        body: "追逐戏的拍摄方法来自弗莱德金的实车公路片，出场哲学却来自卡朋特的恐怖片：一个负责物理真实，一个负责心理恐惧。两者叠在同一场雨夜里，战车才既是能撞烂的机器，又是哥谭罪人眼前的活物。",
      },
    ],
  },
];

export type LoreEasterEgg = {
  id: string;
  name: string;
  nameEn: string;
  category: "corp" | "character" | "geography";
  categoryZh: string;
  categoryEn: string;
  discovery: string;
  discoveryEn: string;
  comicSignificance: string;
  comicSignificanceEn: string;
  loreImpact: string;
  loreImpactEn: string;
};

export const LORE_EASTER_EGGS: LoreEasterEgg[] = [
  {
    id: "gothcorp",
    name: "急冻人企业暗线（GothCorp）",
    nameEn: "GothCorp Industrial Clue",
    category: "corp",
    categoryZh: "城市工业暗线",
    categoryEn: "Corporate Lore",
    discovery: "影片中哥谭街道与废弃仓库外墙的背景广告牌上，多次显现跨国科技财阀「GothCorp」的专属公司标识。",
    discoveryEn: "Prominently featured across background billboards and industrial wall postings throughout urban Gotham.",
    comicSignificance: "在经典漫画与《蝙蝠侠动画系列》（BTAS）设定中，GothCorp 是低温冷冻生物学巨头，也是维克多·弗里斯博士（Victor Fries）遭遇事故黑化为经典反派「急冻人（Mr. Freeze）」的发源地。",
    comicSignificanceEn: "In DC lore and BTAS canon, GothCorp is the cryogenic conglomerate where Dr. Victor Fries suffered the lab disaster transforming him into Mr. Freeze.",
    loreImpact: "导演马特·里夫斯曾多次在访谈中提到，希望在写实基调下探索急冻人的可行性，GothCorp 的实体存在为未来的冷酷反派登场埋下了极具说服力的环境伏笔。",
    loreImpactEn: "Reeves has repeatedly expressed interest in grounding Mr. Freeze within this realistic world, making GothCorp's corporate footprint a compelling narrative seed.",
  },
  {
    id: "ace-chemicals",
    name: "艾斯化工厂（Ace Chemicals）",
    nameEn: "Ace Chemicals Industrial Landmark",
    category: "corp",
    categoryZh: "标志性工业地标",
    categoryEn: "Industrial Landmark",
    discovery: "出现在哥谭港口工业区背景海报与货运装箱单上的化工厂名录中。",
    discoveryEn: "Appears on shipping crates, port manifest posters, and background industrial harbor signage.",
    comicSignificance: "DC 漫画历史上最著名的犯罪地标之一，在《致命玩笑》（The Killing Joke）中作为红头罩（Red Hood）跌入化学废料池蜕变为「小丑（Joker）」的标志性原点。",
    comicSignificanceEn: "One of the most fateful locations in DC lore: the chemical processing plant where the Red Hood tumbled into a vat of toxic waste, birthing the Joker.",
    loreImpact: "确立了哥谭高污染、缺乏监管的重化工业带历史，与阿卡姆牢房里关押的神秘小丑遥相呼应。",
    loreImpactEn: "Validates Gotham's corrosive and unregulated industrial underbelly, serving as a dark geographic twin to the Joker imprisoned within Arkham.",
  },
  {
    id: "edward-elliot",
    name: "爱德华·埃利奥特与缄默暗线（Edward Elliot / Hush）",
    nameEn: "Edward Elliot & The Hush Clue",
    category: "character",
    categoryZh: "家族渊源与宿怨",
    categoryEn: "Family Lineage",
    discovery: "谜语人揭发韦恩家族丑闻的视频中，被法尔科内谋杀的独立记者名为爱德华·埃利奥特（Edward Elliot），视频画面更在托马斯·韦恩脸上闪现巨大的红色英文单词「HUSH」（封口/缄默）。",
    discoveryEn: "Riddler's expose video names the slain journalist as Edward Elliot, with the word 'HUSH' flashing violently in blood-red text over Thomas Wayne's face.",
    comicSignificance: "在漫画中，埃利奥特家族是与韦恩、凯恩、阿卡姆齐名的哥谭建城四大望族之一。爱德华·埃利奥特正是经典反派「缄默」（Hush / 托马斯·埃利奥特）的曾祖父。",
    comicSignificanceEn: "In DC lore, the Elliots are one of Gotham's founding elite dynasties. Edward Elliot is the direct great-grandfather of Thomas Elliot, aka the villain Hush.",
    loreImpact: "电影不仅揭开了法尔科内介入韦恩家族的黑历史，更通过'HUSH'血字彩蛋为未来可能的家族复仇线索预埋了戏剧张力。",
    loreImpactEn: "Directly bridges Falcone's illicit protection of Thomas Wayne with the generational blood feud that defines the classic Hush storyline.",
  },
  {
    id: "sister-cities",
    name: "姊妹城市互文：布鲁德海文与大都会（Blüdhaven & Metropolis）",
    nameEn: "Sister Cities: Blüdhaven & Metropolis",
    category: "geography",
    categoryZh: "DC 地理宇宙坐标",
    categoryEn: "Geographic Expansion",
    discovery: "片中报纸提及邻近都会「大都会（Metropolis）」；片尾瑟琳娜在公墓骑机车与蝙蝠侠分道扬镳时，明确提出自己准备搬往「布鲁德海文（Blüdhaven）」。",
    discoveryEn: "Local newspapers reference Metropolis, while Selina explicitly informs Batman during their cemetery farewell that she is departing for Blüdhaven.",
    comicSignificance: "大都会为超人守护的理想城邦；布鲁德海文则是哥谭南郊充斥工业污染与黑道统治的姊妹港口城，漫画中亦是夜翼（Nightwing / 迪克·格雷森）的驻守之地。",
    comicSignificanceEn: "Metropolis stands as the shining home of Superman, while Blüdhaven is the gritty industrial harbor to the south, famously guarded by Nightwing (Dick Grayson).",
    loreImpact: "表明马特·里夫斯构建的虽是独立写实的犯罪传奇，但世界观依然严谨根植于 DC 经典地理版图之中。",
    loreImpactEn: "Demonstrates that while Reeves' universe remains a grounded crime epic, it is precisely anchored within the broader DC geographic universe.",
  },
];

export type RiddleLoreItem = {
  id: string;
  kicker: string;
  kickerEn: string;
  title: string;
  titleEn: string;
  prompt: string;
  promptEn: string;
  answer: string;
  answerEn: string;
  targetScene: string;
  targetSceneEn: string;
  literalMeaning: string;
  literalMeaningEn: string;
  linguisticTrap: string;
  linguisticTrapEn: string;
  narrativeTruth: string;
  narrativeTruthEn: string;
  image: string;
  imageAlt: string;
  imageAltEn: string;
  imageCaption: string;
  imageCaptionEn: string;
  kind: "card" | "scene";
};

export const RIDDLE_LORE: RiddleLoreItem[] = [
  {
    id: "liar-still",
    kicker: "01 / 市长豪宅命案首发",
    kickerEn: "01 / Mayor Mitchell Crime Scene",
    title: "说谎者死后：静止与欺瞒的双重双关",
    titleEn: "He Lies Still: The Double Polysemy of Death & Deceit",
    prompt: "What does a liar do when he's dead?",
    promptEn: "What does a liar do when he's dead?",
    answer: "HE LIES STILL.（他依然撒谎 / 他躺着不动）",
    answerEn: "HE LIES STILL.",
    targetScene: "市长唐·米切尔被杀现场，停尸间尸体与留给蝙蝠侠的绿色猫头鹰谜语卡。",
    targetSceneEn: "Mayor Don Mitchell's murder scene, morgue autopsy, and the green owl card for the Batman.",
    literalMeaning: "死人断气后平躺于地或停尸床上，生理上毫无生命体征、一动不动（Lies still）。",
    literalMeaningEn: "A corpse lies motionless on the ground or the morgue slab, physically lifeless.",
    linguisticTrap: "英语中‘Lie’具备双重释义：既是‘平躺（Lie down）’，也是‘撒谎（Tell lies）’；而‘Still’既是‘静止不动的’，也是副词‘依然、仍然’。中文翻译只能顾及其一，完全无法传达这句黑色幽默的精妙暗号。",
    linguisticTrapEn: "English 'Lie' is polysemous: both 'to recline horizontally' and 'to speak untruths'. Similarly, 'Still' means both 'motionless' and 'continually'. A single sentence yields two grammatical truths.",
    narrativeTruth: "米切尔市长虽然已被谜语人处决，但他生前参与掩盖的百亿‘新生救赎基金’黑幕、与黑帮教父法尔科内的勾结谎言，在死后依旧如毒瘤般支配着整座哥谭市，因此‘死后依然在对全城说谎’。",
    narrativeTruthEn: "Though Mayor Mitchell is dead, the colossal Renewal Fund embezzlement and his mafia collusion continue to deceive Gotham. Even in the grave, his political deceit lies still intact.",
    image: "/media/case-riddle-card.jpg",
    imageAlt: "市长谋杀案现场遗留的绿色猫头鹰谜语贺卡道具",
    imageAltEn: "The green owl greeting riddle card left at Mayor Mitchell's crime scene",
    imageCaption: "案发现场实物：市长遇害后摆放在尸体旁、写有给蝙蝠侠谜语的道具卡",
    imageCaptionEn: "Physical prop: The handwritten riddle card addressed To the Batman beside Mitchell's corpse",
    kind: "card",
  },
  {
    id: "savage-justice",
    kicker: "02 / 警察局长萨维奇鼠笼案",
    kickerEn: "02 / Commissioner Savage Maze Trap",
    title: "正义之名：蒙眼女神与诗意惩戒",
    titleEn: "Justice: Blind Goddess & Poetic Retribution",
    prompt: "It can be cruel, poetic, or blind. But when it's denied, it's violence you may find.",
    promptEn: "It can be cruel, poetic, or blind. But when it's denied, it's violence you may find.",
    answer: "JUSTICE.（正义）",
    answerEn: "JUSTICE.",
    targetScene: "码头集装箱废弃大楼，局长皮特·萨维奇被注入水滴毒剂、套上饥饿鼠笼机关。",
    targetSceneEn: "Abandoned harbor works: Commissioner Pete Savage trapped in the head rat cage.",
    literalMeaning: "抽象法律与社会概念，指代维持公平裁决与邪恶受惩的社会契约。",
    literalMeaningEn: "The abstract moral and legal concept of societal fairness and retribution.",
    linguisticTrap: "本题完全基于西方法理成语典故：‘Blind justice’源于西方正义女神朱斯蒂提亚蒙眼执秤的雕像典故（不偏不倚但亦可沦为对罪恶视而不见的借口）；‘Poetic justice’是经典戏剧术语，特指‘善恶终有报、以其人之道还治其人之身’的讽刺性报应。",
    linguisticTrapEn: "Rooted in classical legal idioms: 'Blind justice' (Lady Justice blindfolded) and 'Poetic justice' (an ironic, deserved retribution). Translated literally, Chinese audiences miss the established idioms.",
    narrativeTruth: "萨维奇局长充当黑帮走狗、对底层孤儿院与毒品泛滥视而不见（Blind）；谜语人用饿鼠啃噬他的面部作为最严酷的讽刺报应（Poetic & Cruel）；当体制内的正义被腐败阻断（Denied），狂暴的极端私刑便席卷哥谭。",
    narrativeTruthEn: "Savage enabled Falcone's empire and ignored urban decay (blind); the Riddler devises the rat trap as ironic vengeance (poetic & cruel). Denied legitimate justice, violence erupts.",
    image: "/media/case-rat-cage.jpg",
    imageAlt: "萨维奇局长受刑头部鼠笼机关与现场迷宫卡片",
    imageAltEn: "The head rat cage contraption and maze riddle card for Pete Savage",
    imageCaption: "刑具道具实拍：萨维奇局长案发现场复杂的机械鼠笼与迷宫手写卡",
    imageCaptionEn: "Production prop: The rat-cage head apparatus and handwritten maze card",
    kind: "card",
  },
  {
    id: "rata-alada",
    kicker: "03 / 飞天大鼠世纪悬案",
    kickerEn: "03 / The Flying Rat & Spanish Grammar Riddle",
    title: "西语语法、URL谐音与猛禽内鬼的三重反转",
    titleEn: "El Rata Alada: Spanish Grammar, URL Homophone & Falcone",
    prompt: "You Are El Rata Alada（你是有翅膀的大鼠 / 飞天大鼠）",
    promptEn: "You Are El Rata Alada",
    answer: "URL / 鸽子俚语 / 卡尔迈恩·法尔科内（FALCONE）",
    answerEn: "URL / Stool Pigeon / Carmine Falcone",
    targetScene: "冰山俱乐部后巷集装箱质询、企鹅人被绑后备箱嘲弄警探、44 Below 顶层黑手揭晓。",
    targetSceneEn: "Alleyway interrogation, Penguin mocking bad Spanish in car trunk, and 44 Below confrontation.",
    literalMeaning: "字面为‘长着翅膀的大鼠’，蝙蝠侠一度坚信谜语人是在冲着自己这个‘蝙蝠’喊话。",
    literalMeaningEn: "Literally 'a rat with wings'; Batman initially presumes it targets him as a bat.",
    linguisticTrap: "全片最高难度的三重语言迷局：① 西语名词阴阳性：西语‘老鼠（Rata）’为阴性词，定冠词必须用‘La’，企鹅人疯狂嘲讽两人西语没及格；② 读音双关：‘You Are El’连读正是英文缩写‘U-R-L’（网络网址），指向暗网域名 rataalada.com；③ 城市俚语：在纽约与哥谭俚语中，‘Flying rat’特指脏乱传播病菌的城市野鸽（Pigeon），而黑帮黑话中‘Stool pigeon’与‘Rat’皆指代‘告密者/警方内鬼’。",
    linguisticTrapEn: "A masterclass triple linguistic twist: 1) Spanish noun gender: 'Rata' is feminine (La rata); Penguin mocks Batman and Gordon's bad Spanish; 2) Phonetic URL: 'You-Are-El' spells URL (web address rataalada.com); 3) Urban & mob slang: 'Flying rat' is urban slang for city pigeons, while 'stool pigeon' and 'rat' both mean a police informant.",
    narrativeTruth: "企鹅人抗辩称企鹅是不能飞的鸟，真正的‘长着翅膀的告密耗子’正是黑道教父卡尔迈恩·法尔科内（Carmine Falcone）：‘Falcon’英文本意即为猛禽‘猎鹰/游隼’！二十年前正是法尔科内向警方告密出卖宿敌马罗尼，披着猛禽外皮充当警队线人，窃取了整座城市的统治权。",
    narrativeTruthEn: "The true 'rat with wings' is Carmine Falcone: a falcon is a raptor with wings. Twenty years prior, Falcone was the GCPD's secret informant who snitched on Maroni, seizing the city under the guise of the Renewal Fund.",
    image: "/media/still-falcone.jpg",
    imageAlt: "冰山俱乐部顶层包厢内的黑道教父卡尔迈恩·法尔科内",
    imageAltEn: "Mob patriarch Carmine Falcone in the upper sanctum of the Iceberg Lounge",
    imageCaption: "真正主谋：代号‘猛禽（Falcon）’、出卖马罗尼并暗中操纵市政内阁二十年的巨型内鬼",
    imageCaptionEn: "The real informant: Codename Falcon, the winged underworld boss who snitched on Maroni",
    kind: "scene",
  },
  {
    id: "colson-bribe",
    kicker: "04 / 地方检察官项圈炸弹第一问",
    kickerEn: "04 / DA Colson Collar Bomb · Riddle 1",
    title: "视而不见的代价：司法语境下的封口黑金",
    titleEn: "Price for Your Blind Eye: The Judicial Bribe",
    prompt: "If you are justice, please do not lie. What is the price for your blind eye?",
    promptEn: "If you are justice, please do not lie. What is the price for your blind eye?",
    answer: "BRIBE.（受贿金 / 封口费）",
    answerEn: "BRIBE.",
    targetScene: "市政大厅市长追悼会现场，被绑上定时炸弹项圈的科尔森在全城直播下受审。",
    targetSceneEn: "City Hall memorial service: Colson strapped into collar bomb on live livestream.",
    literalMeaning: "收受钱财对犯罪行为隐瞒不报的非法资金。",
    literalMeaningEn: "Illicit financial compensation given to overlook a crime.",
    linguisticTrap: "源自英语常用成语‘Turn a blind eye’（睁一只眼闭一只眼、视而不见）。谜语人将法理意义上的‘正义蒙眼（Justice is blind）’讽刺性地偷换为检察官在金钱面前的‘自愿失明’。",
    linguisticTrapEn: "Derives from the English idiom 'turn a blind eye'. The Riddler weaponizes Lady Justice's impartial blindness into corrupt willful blindness bought by cash.",
    narrativeTruth: "科尔森作为哥谭首席检察官，本应起诉罪犯，但他收受了法尔科内集团发放的巨额封口费，对涉毒酒吧 44 Below、黑帮洗钱与命案全面装聋作哑，其薪酬本质就是‘失明赎金’。",
    narrativeTruthEn: "As DA, Colson was tasked with prosecuting crime, yet pocketed Falcone's hush money to overlook 44 Below and police corruption. His conscience had an exact retail price.",
    image: "/media/case-colson-collar.jpg",
    imageAlt: "地方检察官科尔森颈部锁定的 C4 炸弹项圈装置",
    imageAltEn: "The C4 neck collar bomb device locked onto DA Gil Colson",
    imageCaption: "致命装置：项圈锁孔直连引爆芯片，倒计时逼迫检察官当众供出黑金内幕",
    imageCaptionEn: "Lethal hardware: Wired collar bomb forcing the DA to confess judicial bribes under countdown",
    kind: "scene",
  },
  {
    id: "bruce-manor",
    kicker: "05 / 针对韦恩家族的信件",
    kickerEn: "05 / Letter to the Wayne Legacy",
    title: "庄园同音梗：阶级特权与世袭罪孽",
    titleEn: "In a Manor of Speaking: The Wayne Homophone Pun",
    prompt: "A man worth billions, in a manor of speaking.",
    promptEn: "A man worth billions, in a manor of speaking.",
    answer: "BRUCE WAYNE.（布鲁斯·韦恩）",
    answerEn: "BRUCE WAYNE.",
    targetScene: "市长案现场搜出的手写贺卡信封，表面盖有给蝙蝠侠的红火漆问号印章。",
    targetSceneEn: "Sealed greeting card envelope addressed to the Batman with wax-sealed question mark.",
    literalMeaning: "继承了数以十亿计巨额财富、居住在古老哥特庄园中的豪门贵公子。",
    literalMeaningEn: "A billionaire scion residing in a sprawling dynastic estate.",
    linguisticTrap: "纯粹的英语同音异形梗（Homophone）：日常用语‘in a manner of speaking’意为‘可以说是 / 在某种意义上讲’；谜语人故意将发音完全相同的‘manner（方式）’偷换为‘manor（庄园 / 韦恩庄园 Wayne Manor）’，使这句口语具有了严密的地理与身份指向。",
    linguisticTrapEn: "A pure auditory homophone pun: English idiom 'in a manner of speaking' (so to speak) is mutated into 'manor' (Wayne Manor). The phonetics are identical, embedding the target's geography directly into speech.",
    narrativeTruth: "不仅锁定了布鲁斯·韦恩的刺杀目标，更揭露了孤儿爱德华·纳什顿与孤儿布鲁斯·韦恩的天壤之别：布鲁斯在仆人伺候、恒温暖气与豪华庄园里‘受创伤’，而孤儿院的孩子们却在老鼠咬食与寒冬暴毙中挣扎。庄园既是韦恩家族特权的符号，也是哥谭深层罪孽的温床。",
    narrativeTruthEn: "Contrasts the two orphans: Bruce mourned in heated towers and Wayne Manor with Alfred, while Nashton and orphans froze in rat-infested squalor. The manor is both sanctuary and crime scene.",
    image: "/media/case-for-batman.jpg",
    imageAlt: "印有红色火漆印与问号的致蝙蝠侠手写信封",
    imageAltEn: "The red wax-sealed 'To the Batman' handcrafted card and cipher envelope",
    imageCaption: "证物实拍：谜语人亲手以古法火漆封缄的信封，内附指引走向韦恩家族黑历史的密码卡",
    imageCaptionEn: "Evidence prop: Wax-sealed envelope containing the cipher card exposing the Wayne family sins",
    kind: "card",
  },
  {
    id: "arkham-black-and-blue",
    kicker: "06 / 阿卡姆病房终极交锋",
    kickerEn: "06 / Arkham Hospital Interrogation",
    title: "颠覆经典童谣：遍体鳞伤与复仇同盟的幻灭",
    titleEn: "Black, Blue & Dead All Over: Subverting the Nursery Riddle",
    prompt: "What's black, and blue, and dead all over? ... YOU. If you think you can stop what's coming.",
    promptEn: "What's black, and blue, and dead all over? ... YOU. If you think you can stop what's coming.",
    answer: "YOU.（蝙蝠侠 / 布鲁斯·韦恩）",
    answerEn: "YOU (BATMAN).",
    targetScene: "阿卡姆州立医院强化玻璃审讯室，纳什顿身穿囚服、隔窗与蝙蝠侠展开面对面心理战。",
    targetSceneEn: "Arkham State Hospital: Edward Nashton in prison garb confronting Batman across reinforced glass.",
    literalMeaning: "一个满身漆黑战甲、被打得青一块紫一块、即将彻底命丧大水与暴乱的人。",
    literalMeaningEn: "A figure clad in black armor, battered purple, about to drown in the oncoming flood.",
    linguisticTrap: "① 经典童谣字谜颠覆：全美家喻户晓的儿童谜语‘What is black and white, and red all over?（什么东西黑白相间且全红？）’答案是‘报纸（A newspaper，因 read 与 red 同音）’。谜语人将其病态魔改为‘Black and Blue’与‘Dead all over’；② 俚语‘Black and blue’：在英语中是固定成语，特指‘鼻青脸肿、遍体鳞伤（Beaten black and blue）’，兼指蝙蝠侠漫画经典黑蓝战甲与两年义警带来的创伤肉体。",
    linguisticTrapEn: "1) Subversion of the universal English nursery riddle 'What is black and white and red all over? (A newspaper, punning on read/red)', darkened into 'dead all over'; 2) Idiom 'black and blue': means severely bruised and battered from combat, perfectly matching Batman's Year Two bruised body.",
    narrativeTruth: "此处的戏剧张力达到全片顶点：蝙蝠侠一度因对方提及‘布鲁斯·韦恩’而冷汗直流，误以为真身暴露；但谜语人随即愤怒控诉‘布鲁斯是唯一逃脱惩治的蛀虫’，证明谜语人根本不知蝙蝠侠就是布鲁斯！谜语人自认是蝙蝠侠的灵魂同盟，直到蝙蝠侠冷酷骂他‘疯子’，谜语人才精神崩溃，在绝望中撕心裂肺唱起《圣母颂》。",
    narrativeTruthEn: "The pinnacle of misdirection: Batman freezes thinking his identity is blown when Nashton mentions Bruce Wayne, only to discover Riddler has no clue. Riddler saw Batman as his partner in vengeance; being called a psychopath shatters his delusions, prompting the chilling Ave Maria scream.",
    image: "/media/still-riddler-unmask.jpg",
    imageAlt: "阿卡姆州立医院病房隔着玻璃注视的爱德华·纳什顿",
    imageAltEn: "Edward Nashton unmasked staring through the glass at Arkham State Hospital",
    imageCaption: "审讯现场：摘下战术面具的爱德华·纳什顿，在强化玻璃另一侧等待水淹哥谭的终局到来",
    imageCaptionEn: "Interrogation still: Unmasked Edward Nashton behind reinforced glass awaiting the seawall explosion",
    kind: "scene",
  },
  {
    id: "joker-friend",
    kicker: "07 / 阿卡姆隔壁尾声彩蛋",
    kickerEn: "07 / Arkham Adjoining Cell Epilogue",
    title: "小丑的赠礼：废墟与深渊中的‘朋友’",
    titleEn: "A Friend: The Joker's Arkham Riddle of Solace",
    prompt: "The less of them you have, the more one is worth... What is it?",
    promptEn: "The less of them you have, the more one is worth... What is it?",
    answer: "A FRIEND.（朋友）",
    answerEn: "A FRIEND.",
    targetScene: "大水淹城后，因计划未完全杀死布鲁斯·韦恩而在阿卡姆痛哭的纳什顿，听到隔壁传来的狂笑。",
    targetSceneEn: "Arkham cell epilogue: Weeping Nashton hears the manic laughter of the unseen prisoner next door.",
    literalMeaning: "千金难买、在孤独人生中屈指可数却重逾万钧的情感羁绊。",
    literalMeaningEn: "A rare emotional bond whose scarcity makes each one infinitely precious.",
    linguisticTrap: "经典的英语哲学悖论谜题（Scarcity Value Riddle）：表面是供求关系的经济学法则（数量越少，单价越高），谜底却陡然落在感性维度的‘挚友（Friend）’。在中文里若脱离了阿卡姆绝境语境，容易被视作寻常格言。",
    linguisticTrapEn: "A classic scarcity-value philosophical riddle: adopts economic phrasing (less supply = higher worth) only to pivot into intimacy ('a friend').",
    narrativeTruth: "小丑（巴里·基奥汉 饰）在阿卡姆最黑暗的隔壁牢房对谜语人唱出的赠礼。哥谭视他们为反社会畸形怪物，世人弃之如敝履；但在阿卡姆的疯人深渊中，两大超级恶棍达成了知己般的灵魂共振，标志着阿卡姆宿命罪恶同盟的正式结成。",
    narrativeTruthEn: "Whispered by the Joker (Barry Keoghan) from the adjoining cell to comfort a despondent Riddler. Though despised by Gotham, they are bound by shared madness, cementing the rogue alliance for the sequel.",
    image: "/media/still-riddler-lair.jpg",
    imageAlt: "谜语人藏身处俯瞰大堤爆破点与留下的狙击阵地",
    imageAltEn: "The Riddler's apartment vantage point overlooking the flooded Gotham",
    imageCaption: "终局回响：窗外洪水漫灌、谋划宣告告一段落，阿卡姆隔壁传来的刺耳小丑笑声拉开续集序幕",
    imageCaptionEn: "Epilogue echo: From the flooded vantage point to Arkham's cells, the Joker's laugh welcomes a new friend",
    kind: "scene",
  },
];

/** `/roots` hash → top-nav parent. Comics default to 世界观; cinema lineage to 幕后. */
export function rootsNavSection(hash: string): "world" | "craft" {
  const id = hash.replace(/^#/, "");
  if (id === "cinema" || CINEMA_ROOTS.some((work) => work.id === id)) return "craft";
  return "world";
}
