export type EvidenceItem = {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  desc: string;
  image?: string;
};

export type CaseFile = {
  id: string;
  caseNo: string;
  title: string;
  titleEn: string;
  victim: string;
  victimRole: string;
  date: string;
  location: string;
  status: "solved" | "closed" | "catastrophe";
  summary: string;
  method: string;
  evidences: EvidenceItem[];
  revelation: string;
};

export const CASE_FILES: CaseFile[] = [
  {
    id: "case-01-mitchell",
    caseNo: "GCPD-2022-1031-A",
    title: "市长唐·米切尔官邸残杀案",
    titleEn: "Homicide of Mayor Don Mitchell Jr.",
    victim: "唐·米切尔 (Don Mitchell Jr.)",
    victimRole: "高谭市现任市长（三届连任）",
    date: "10 月 31 日 · 万圣节第一夜",
    location: "市长私人官邸二楼书房",
    status: "solved",
    summary: "万圣节当夜，市长在书房观看竞选新闻时遭遇潜伏室内的谜语人袭击。凶手使用重型钝器击碎其颅骨，随后使用工业管道胶带将其头部紧紧缠裹窒息致死，并在封口胶带上用鲜血涂写「NO MORE LIES」（不要再说谎）。",
    method: "入室潜伏伏击 · 钝器重击颅骨 · 胶带面部封死 · 鲜血题字",
    evidences: [
      {
        id: "ev-01-card",
        name: "首张致蝙蝠侠问号贺卡",
        nameEn: "First Riddle Card for the Batman",
        type: "加密文书",
        desc: "现场显眼位置留下的绿色定制信封，封面手写「To the Batman」。内卡谜面为：‘当谎言不再是谎言？——当它变成审判时。’ 下方附有第一串几何代换密码。",
      },
      {
        id: "ev-01-knife",
        name: "军用级特种地毯切割刀",
        nameEn: "Carpet Cutting Tool",
        type: "凶器工具",
        desc: "谜语人在《谜语人元年》中购入的重型地毯割刀，刀刃锋利，用于切断电线并切割现场物证胶带，未留下任何指纹。",
      },
      {
        id: "ev-01-thumb",
        name: "切断的拇指与挂载加密 U 盘",
        nameEn: "Severed Thumb & USB Flash Drive",
        type: "数字物证",
        desc: "在市长停泊于车库的座驾中发现。凶手切下市长右手拇指并串联加密闪存盘（谐音‘Thumb Drive’）。破译后解密出市长与安妮卡出入冰山俱乐部的偷拍密照。",
      },
    ],
    revelation: "直接撕开了高谭最高政要与卡尔迈恩·法尔科内地下黑帮的勾结链条，引出冰山俱乐部洗钱窝点。",
  },
  {
    id: "case-02-savage",
    caseNo: "GCPD-2022-1101-B",
    title: "警察局长萨维奇迷宫老鼠处决案",
    titleEn: "Execution of Commissioner Pete Savage",
    victim: "彼得·萨维奇 (Pete Savage)",
    victimRole: "高谭市警察局局长 (Police Commissioner)",
    date: "11 月 1 日 · 万圣节次日",
    location: "废弃水厂地下管网",
    status: "solved",
    summary: "警察局长萨维奇在离开警局后遭谜语人电击迷晕绑架。凶手将其固定于特制刑架上，头部套入装有多只饥饿大鼠的铁丝迷宫头套，迫使老鼠啃咬面部致死，并在尸体胸前悬挂指控标语。",
    method: "电击绑架 · 机械老鼠刑具 · 窒息与撕咬致死 · 现场吊挂录像",
    evidences: [
      {
        id: "ev-02-cage",
        name: "特制铁丝迷宫头套装置",
        nameEn: "Custom Rat Maze Trap",
        type: "致命刑具",
        desc: "手工焊接的精密铁丝网头笼，内部设计有单向隔板与引诱老鼠的机关，呼应凶手对警方沦为黑帮‘老鼠’（告密者）的嘲弄。",
      },
      {
        id: "ev-02-tape",
        name: "分赃录像带与第二封谜语信",
        nameEn: "Bribery Video Tape & Second Cipher",
        type: "视听证据",
        desc: "现场留下的 VHS 录像带，播放萨维奇局长私下收受法尔科内家族巨额毒品分红的密谈录音；信函谜题指向高谭孤儿院历史。",
      },
    ],
    revelation: "证实高谭警界最高指挥层已被法尔科内深度渗透，警局内部多名高级警官长期收受黑金分红。",
  },
  {
    id: "case-03-colson",
    caseNo: "GCPD-2022-1102-C",
    title: "地方检察官科尔森项圈炸弹案",
    titleEn: "Bombing of District Attorney Gil Colson",
    victim: "吉尔·科尔森 (Gil Colson)",
    victimRole: "高谭市地方检察官 (District Attorney)",
    date: "11 月 2 日 · 市长追悼会",
    location: "高谭市政大教堂追悼大厅",
    status: "solved",
    summary: "科尔森被套上军用定时项圈炸药装置，被胶带封口并强行驱车撞入市长唐·米切尔的官方追悼会。胸前绑有写给蝙蝠侠的手机。谜语人通过视频连线要求其回答三道关乎司法黑幕的谜题，科尔森因恐惧法尔科内报复家人拒绝回答最后一道题，被当众炸死。",
    method: "C4 项圈定时炸弹 · 车辆强冲集会 · 线上直播公审 · 定时引爆",
    evidences: [
      {
        id: "ev-03-collar",
        name: "C4 塑胶炸药定时项圈锁",
        nameEn: "C4 Explosive Collar Mechanism",
        type: "爆炸装置",
        desc: "工业级重型金属项圈，内嵌军用级塑胶炸药与倒计时液晶屏，具备防拆卸水银倾斜开关，密码错误或超时立即引爆。",
      },
      {
        id: "ev-03-phone",
        name: "现场连线手机与三问录音",
        nameEn: "Crime Scene Mobile & Three-Riddle Audio",
        type: "通信物证",
        desc: "挂在科尔森胸前的主机。三道谜题分别为：①司法受贿的定义；②滴剂毒品交易黑幕；③出卖萨尔瓦多·马罗尼的真正告密者身份。",
      },
    ],
    revelation: "科尔森临死前承认自己作为地方检察官，曾多次非法压制针对「新生」慈善基金的司法调查与洗钱指控。",
  },
  {
    id: "case-04-annika",
    caseNo: "GCPD-2022-1104-D",
    title: "安妮卡·科索洛夫绑架谋杀案",
    titleEn: "Abduction & Murder of Annika Kosolov",
    victim: "安妮卡·科索洛夫 (Annika Kosolov)",
    victimRole: "冰山俱乐部服务生 · 瑟琳娜室友",
    date: "11 月 4 日",
    location: "废弃码头汽车后备箱",
    status: "solved",
    summary: "安妮卡在出租屋内遭到绑架，随后被发现掐死并藏尸于废弃汽车后备箱中。调查证实，安妮卡因在陪伴市长米切尔期间无意中偷听到法尔科内就是警方秘密告密者（“老鼠”）的绝密真相，遭到卡尔迈恩·法尔科内亲自灭口。",
    method: "入室绑架 · 徒手掐颈窒息 · 车辆藏尸抛弃",
    evidences: [
      {
        id: "ev-04-passport",
        name: "底特律伪造护照与出逃便签",
        nameEn: "Forged Passport & Escape Notes",
        type: "个人物品",
        desc: "在瑟琳娜公寓夹层中搜获，安妮卡因极度恐惧黑帮追杀而准备逃离高谭的行程记录与假身份证明。",
      },
      {
        id: "ev-04-voicemail",
        name: "44 Below 贵宾室秘密通话录音",
        nameEn: "44 Below Secret Voicemail",
        type: "录音证据",
        desc: "安妮卡生前留给瑟琳娜的语音留言，背景音清晰录下市长透露‘法尔科内才是整座城市真正掌控者与线人’的关键对话。",
      },
      {
        id: "ev-04-prints",
        name: "尸体颈部卡尔迈恩·法尔科内指纹",
        nameEn: "Carmine Falcone Latent Fingerprints",
        type: "法医物证",
        desc: "GCPD 法医物证室从死者颈部软组织提取到的潜伏指纹，铁证如山证实系法尔科内本人亲手掐死。",
      },
    ],
    revelation: "彻底拆穿了法尔科内作为“正直商人”的伪装，促使瑟琳娜持枪复仇，并导致法尔科内走出俱乐部被狙杀。",
  },
  {
    id: "case-05-flood",
    caseNo: "GCPD-2022-1105-E",
    title: "防洪大堤决堤与哥谭体育馆袭击惨案",
    titleEn: "Gotham Seawall Bombing & Arena Siege",
    victim: "高谭市全体市民 · 贝拉·蕾尔市长（受袭幸存）",
    victimRole: "公共安全与市政基础设施",
    date: "11 月 5 日 · 选举日决算之夜",
    location: "高谭市外围防洪大堤 / 哥谭广场花园体育馆",
    status: "catastrophe",
    summary: "谜语人虽已关押于阿卡姆，但其通过暗网 rataalada.com 召集的多名武装追随者，在全城 7 处关键防洪大堤受力点同步引爆满载炸药的货车，导致防洪墙彻底溃坝，海水席卷整座城市。信徒埋伏于哥谭广场花园体育馆钢架顶部，居高临下狙击避难市民与新当选市长贝拉·蕾尔。",
    method: "7车同步定向爆破 · 破坏大堤水文设施 · 淹没全城 · 穹顶狙击扫射",
    evidences: [
      {
        id: "ev-05-blueprint",
        name: "防洪大堤受力与定向爆破蓝图",
        nameEn: "Seawall Structural Demolition Blueprint",
        type: "工程图纸",
        desc: "在谜语人公寓地毯下搜出的市政防洪大堤结构施工图，精确标注了 7 处地基受力弱点与炸药当量计算公式。",
      },
      {
        id: "ev-05-rifle",
        name: "信徒统一配备的狙击步枪与防毒面罩",
        nameEn: "Riddler Cult Sniper Rifles & Gas Masks",
        type: "武装军火",
        desc: "在体育馆穹顶击毙与生擒的数十名信徒装备，全部佩戴谜语人同款军用防毒面罩、防风眼镜与大口径狩猎步枪。",
      },
      {
        id: "ev-05-flare",
        name: "蝙蝠侠斩断电缆与引路照明弹残骸",
        nameEn: "Severed Cable & Road Flare Remnants",
        type: "救援物证",
        desc: "蝙蝠侠用胸前折叠战术刀割断坠落水中的高压主电缆排除漏电，并点燃红色军用照明弹带领被困民众撤离的现场物证。",
      },
    ],
    revelation: "高谭市全城陷入百年不遇的严重洪涝灾难，旧体制彻底崩解；蝙蝠侠在绝境中完成了从「复仇化身」向「希望守护者」的升华。",
  },
];

export type JournalEntry = {
  id: string;
  date: string;
  day: string;
  title: string;
  excerptZh: string;
  excerptEn: string;
  context: string;
};

export const BRUCE_JOURNALS: JournalEntry[] = [
  {
    id: "journal-oct-31",
    date: "10 月 31 日",
    day: "星期四 (Thursday, October 31st)",
    title: "万圣节夜巡 · 恐惧的阴影",
    excerptZh:
      "“雨夜中的城市在自我吞噬。两条命案，抢劫，袭击，街头泛滥着滴剂。两年来，雨夜已经变成了我的主场。他们认为我隐匿在阴影中……但我就是阴影本身。每当那道光打上云层，不仅是一声召唤，更是一个警告。在这个城市里，恐惧是最好的武器。”",
    excerptEn:
      "“Thursday, October 31st. The city streets are crowded for the holiday. Even with the rain. Hidden in the chaos is the element, waiting to strike like snakes. And I'm there too. Watching. Two years of nights have turned me into a nocturnal animal. I must choose my targets carefully. It's a big city. I can't be everywhere. But they don't know where I am. We have a signal now, for when I'm needed. When that light hits the sky, it's not just a call-it's a warning. To them. Fear is a tool. They think I am hiding in the shadows. But I am the shadows.”",
    context: "电影开场独白。布鲁斯坐在昏暗的书桌前手写日记，背景交织着万圣节雨夜高谭街头的暴力与罪恶，展现其最初将自己定义为冷酷「复仇者」的心态。",
  },
  {
    id: "journal-nov-01",
    date: "11 月 1 日",
    day: "星期五 (Friday, November 1st)",
    title: "市长案发 · 谎言的迷宫",
    excerptZh:
      "“死者是市长。现场留下了一封写给我的信。戈登相信我，但整个警局都在防备我。这个城市已经从根部彻底烂透，每个人都在撒谎。如果说市长是不干净的，那么谁又是干净的？这不仅仅是连环暗杀，这是一个针对整个体制的审判。”",
    excerptEn:
      "“November 1st. The mayor is dead. The crime scene was meant for me to see. Gordon knows it. The police don't trust me, but they have no choice. The killer calls himself the Riddler. He knows about the lies. In a city where everyone is lying, truth becomes a weapon. Who else is on his list?”",
    context: "勘验完市长官邸案发现场后写下的记录。布鲁斯开始意识到对手并非寻常暴徒，而是掌握着高层不可告人秘密的精密审计者。",
  },
  {
    id: "journal-nov-03",
    date: "11 月 3 日",
    day: "星期日 (Sunday, November 3rd)",
    title: "庄园遭袭 · 家族债务的重负",
    excerptZh:
      "“阿尔弗雷德在医院抢救。谜语人的信件几乎杀了他。托马斯·韦恩……我的父亲，他也不是无暇的圣徒。复仇不能洗清过去的债务，它只会让这座城市继续流血。我以为我是在惩罚罪恶，但我所守护的名字本身就带着阴影。”",
    excerptEn:
      "“November 3rd. Alfred is in the hospital. The bomb was meant for me. I was forced to face the truth about Thomas Wayne. My father made mistakes. He wasn't a saint. Vengeance cannot pay a debt that was incurred decades ago. If I only punish, what am I saving?”",
    context: "阿尔弗雷德拆开炸弹信件负伤后，布鲁斯在病榻前得知父亲曾委托法尔科内封杀记者的往事，遭遇了义警生涯最深重的人格与道德危机。",
  },
  {
    id: "journal-nov-06",
    date: "11 月 6 日",
    day: "星期三 · 洪灾余波 (Post-Flood)",
    title: "希望的火种 · 告别复仇",
    excerptZh:
      "“洪水淹没了街区，但它也冲刷掉了谎言。那些人在水中向我伸出手，他们眼神里流露的不再是恐惧，而是希望。夜巡仍将继续。这座城市依然伤痕累累，重建将无比艰难。但我不能再只是复仇的化身。他们需要的是一道光。”",
    excerptEn:
      "“Wednesday, November 6th. The city is scarred. The waters washed away the old order, but left behind thousands who need help. When I reached out into the water and they took my hand, I saw it in their eyes: not terror, but hope. I used to think fear was the answer. Now I know. Vengeance won't change the past. It won't change the city. I have to become more. I have to be a beacon of hope.”",
    context: "电影结尾终局独白。在经历了决堤漫灌的现场生死救援后，布鲁斯彻底放下了最初中二残酷的复仇执念，完成向正义灯塔的心理蜕变。",
  },
];

export const ARKHAM_SCENE = {
  title: "阿卡姆疯人院 5 分钟删减审讯解析",
  titleEn: "The Deleted Arkham Interrogation Scene Breakdown",
  actors: "罗伯特·帕丁森 (蝙蝠侠) × 巴里·基奥甘 (神秘重犯 / 小丑)",
  setting: "阿卡姆疯人院重症监护病房 (Arkham State Hospital High-Security Cell)",
  overview:
    "在《新蝙蝠侠》院线公映数周后，华纳官方在病毒网站 rataalada.com 释放出一支长达 5 分钟的未公映删减片段。场景发生在第二幕中期，布鲁斯在面对谜语人的连环暗杀陷入僵局时，带着谜语人现场留下的物证档案来到阿卡姆疯人院，向已被关押的神秘重犯（巴里·基奥甘饰）寻求心理侧写。",
  points: [
    {
      heading: "一、 心理攻防与人物镜像",
      body: "重犯并未直接提供线索，而是无情剖析蝙蝠侠的潜意识：他指出蝙蝠侠之所以对谜语人感到恐惧，是因为在内心深处，蝙蝠侠其实暗自赞同谜语人对贪腐政客的审判。这一段心理侧写直接击中了布鲁斯关于‘义警行动是否在助长私刑’的深层焦虑。",
    },
    {
      heading: "二、 畸形生理化妆美学",
      body: "导演马特·里夫斯透露，本宇宙的小丑形象并未沿用传统的‘掉入化工厂变异’设定，而是设定为患有罕见先天性面部肌肉与皮肤病症。化妆团队为其设计了后脑斑驳脱发、全身溃烂疤痕以及由于永久性神经损伤而形成的固定畸形笑容，极具病态写实感。",
    },
    {
      heading: "三、 导演删减原因考量",
      body: "里夫斯在专访中解释，虽然这段 5 分钟戏份极其精彩且帕丁森与基奥甘的对戏张力拉满，但放在电影第二幕会打乱整部电影以‘侦破谜语人主线’为核心的叙事节奏，并过早分散观众对谜语人终局大坝阴谋的注意力，因此最终决定移出成片，作为官方拓展物料释出。",
    },
  ],
};
