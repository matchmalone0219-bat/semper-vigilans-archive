export const CRAFT_INTRO =
  "《新蝙蝠侠》系列以独特的视听语言树立了新黑色电影（Neo-Noir）的美学标杆：低沉浑厚的铜管动机、高对比度的湿冷街景、变形宽银幕镜头的边缘像差以及充满工业质感的实景取景。本专题深度解析迈克尔·吉亚奇诺（Michael Giacchino）的电影配乐创作、格雷格·弗雷泽与埃里克·梅塞施密特的光影摄影美学，并附带英国主要取景地的实景巡礼指南。";

export type ThemeCue = {
  id: string;
  jump: string;
  title: string;
  titleEn: string;
  kind: string;
  image: string;
  imageAlt: string;
  when: string;
  lede: string;
  sections: { heading: string; body: string }[];
};

export const THEMES: ThemeCue[] = [
  {
    id: "batman-theme",
    jump: "蝙蝠侠主题",
    title: "四音符核心蝙蝠侠主题",
    titleEn: "The Batman Theme",
    kind: "迈克尔·吉亚奇诺 原创配乐",
    image: "/media/gotham.jpg",
    imageAlt: "蝙蝠侠伫立于高处俯瞰雨夜高谭",
    when: "开场夜巡、飞车追逐与终局救援等关键场景",
    lede: "以低沉有力的四音符下沉音型（Ostinato）为核心，由重低音铜管与钢琴交替敲击推进，精准烘托出蝙蝠侠如巨浪般不可阻挡的执念与压迫感。",
    sections: [
      {
        heading: "配器编曲与录音背景",
        body: "奥斯卡获奖作曲家迈克尔·吉亚奇诺于 2021 年在伦敦传奇的阿比路录音室（Abbey Road Studios）完成录制。配乐编制大幅削减了传统高音木管，强化了低音铜管、定音鼓与沉重钢琴的交织。全曲不仅包含充满威慑力的四音符复仇动机，更在中段延展出一段哀婉深沉的韦恩家族管弦乐副旋律，赋予了角色深沉的悲剧宿命感。",
      },
      {
        heading: "视听结合与情绪渲染",
        body: "四音符动机在片中并非简单作为英雄登场时的胜利号角，而是伴随着沉重脚步声在黑暗雨夜中步步逼近的心理震慑。在韦恩塔独处与手写日记的文戏段落中，吉亚奇诺则运用细腻的钢琴独奏变奏，展现出布鲁斯面具之下脆弱未愈的凡人心理。",
      },
    ],
  },
  {
    id: "catwoman",
    jump: "猫女主题",
    title: "猫女抒情主题",
    titleEn: "Catwoman Theme",
    kind: "迈克尔·吉亚奇诺 原创配乐",
    image: "/media/still-cat-mask.jpg",
    imageAlt: "身着便服佩戴面具的瑟琳娜·凯尔",
    when: "冰山俱乐部潜入、天台幽会与墓地告别",
    lede: "融合了 1970 年代经典黑色电影的慢板爵士弦乐风格，优雅、神秘且略带伤感，完美契合猫女瑟琳娜·凯尔复杂多面的游侠特质。",
    sections: [
      {
        heading: "创作灵感与风格定位",
        body: "吉亚奇诺在创作中致敬了杰瑞·戈德史密斯在《唐人街》中的经典黑色电影配乐手法。主创团队刻意避免了浮夸的动作鼓点，转而采用柔滑流转的慢速弦乐群，为瑟琳娜的出场营造出如同雨夜烟雾般迷离优雅的独特氛围。",
      },
      {
        heading: "与蝙蝠侠主题的对位交织",
        body: "在天台对话与墓地分别的段落中，猫女主题的流动弦乐与蝙蝠侠深沉的铜管动机交相辉映，细腻刻画出两个孤独灵魂在罪恶都市中相互吸引却又背道而驰的复杂情感纠葛。",
      },
    ],
  },
  {
    id: "ave-maria",
    jump: "圣母颂变奏",
    title: "《圣母颂》黑暗变奏曲",
    titleEn: "Ave Maria (Dark Variations)",
    kind: "舒伯特经典原曲 + 吉亚奇诺改编变奏",
    image: "/media/riddler.jpg",
    imageAlt: "谜语人作案现场",
    when: "孤儿院合唱、市长凶案现场与阿卡姆对话",
    lede: "舒伯特传世经典圣乐《圣母颂》被巧妙植入为谜语人的标志性听觉符号，通过神圣童声与扭曲暗黑配器的反差碰撞出令人不寒而栗的惊悚氛围。",
    sections: [
      {
        heading: "童年创伤的听觉投射",
        body: "在剧情设定中，《圣母颂》是爱德华·纳什顿童年在高谭孤儿院唱诗班演唱的曲目。吉亚奇诺在电影开场与凶杀案现场反复引入这段清澈圣洁的童声合唱，深刻暗示了凶手对童年苦难的病态执念与扭曲心理。",
      },
      {
        heading: "黑暗交响的变奏重塑",
        body: "在后半段决战与阿卡姆收押场景中，吉亚奇诺使用无词女高音、冰冷钢片琴与发暗的低音弦乐对原曲旋律进行了解构与重组，使原本圣洁的赞美诗彻底异化为充满悬疑压迫感的反派心理交响曲。",
      },
    ],
  },
  {
    id: "nirvana",
    jump: "Nirvana 经典",
    title: "涅槃乐队《Something in the Way》",
    titleEn: "Something in the Way by Nirvana",
    kind: "官方精选插曲（1991 年经典名作）",
    image: "/media/still-bruce.jpg",
    imageAlt: "布鲁斯·韦恩卸下头套后的落寞神情",
    when: "影片序幕布鲁斯独白与终局大洪水救援",
    lede: "涅槃乐队（Nirvana）主唱柯特·柯本（Kurt Cobain）的经典原声吉他低吟，成为全片最具辨识度的灵魂插曲，定调了布鲁斯孤独、迷茫却矢志不渝的心路历程。",
    sections: [
      {
        heading: "角色塑造的核心精神锚点",
        body: "导演马特·里夫斯在编写剧本时频繁聆听涅槃乐队的作品，柯特·柯本那种兼具脆弱感与毁灭性爆发力的摇滚气质，直接启发了罗伯特·帕丁森版布鲁斯·韦恩的形象定位——一个深居高楼、沉溺于伤痛与执念的摇滚隐士。",
      },
      {
        heading: "全片情绪的首尾呼应",
        body: "歌曲在开场伴随布鲁斯的夜巡日记独白缓缓流淌，勾勒出高谭街头的凋敝与主角内心的孤独；在终局洪灾救援中再度响起时，低沉的大提琴声伴随着蝙蝠侠走向被困民众的身影，完美完成了从阴暗迷茫到点亮希望的史诗闭环。",
      },
    ],
  },
];

export type SoundtrackTrack = {
  title: string;
  artist: string;
  scene: string;
  type: "classical" | "song" | "club" | "choir";
};

export const SOUNDTRACK_TRACKS: SoundtrackTrack[] = [
  {
    title: "《Ave Maria》（圣母颂）",
    artist: "蒂芬男童合唱团（Tiffin Boys' Choir）",
    scene: "开场谜语人暗中监视市长官邸；孤儿院托马斯·韦恩竞选录像背景合唱",
    type: "choir",
  },
  {
    title: "《Something in the Way》",
    artist: "Nirvana（涅槃乐队）",
    scene: "序幕布鲁斯夜巡日记独白；骑行机车穿过街头；终局大洪水体育馆救援与结语",
    type: "song",
  },
  {
    title: "《第五钢琴协奏曲“皇帝”：第二乐章》",
    artist: "路德维希·凡·贝多芬（Ludwig van Beethoven）",
    scene: "阿尔弗雷德在韦恩塔地下车间尝试破译谜语人留下的密码线索",
    type: "classical",
  },
  {
    title: "《Dido's Lament》（狄多的哀歌）",
    artist: "亨利·珀塞尔 / 蒂芬男童合唱团",
    scene: "高谭市政厅圣乔治大厅内，市长唐·米切尔隆重追悼会现场合唱",
    type: "classical",
  },
  {
    title: "《福雷安魂曲：在天堂》（In paradisum）",
    artist: "蒙特威尔第合唱团 / 约翰·加德纳指挥",
    scene: "阿尔弗雷德在韦恩塔顶层拆开寄给布鲁斯的信件，炸弹爆炸瞬间",
    type: "classical",
  },
  {
    title: "《I Have But One Heart》（我只有一颗心）",
    artist: "阿尔·马蒂诺（Al Martino，经典黑帮电影《教父》同款插曲）",
    scene: "布鲁斯在冰山俱乐部顶层豪宅质问卡尔迈恩·法尔科内关于双亲的历史真相",
    type: "song",
  },
  {
    title: "《Volare (Nel Blu Di Pinto Di Blu)》",
    artist: "迪恩·马丁（Dean Martin）",
    scene: "瑟琳娜·凯尔在顶层包厢拔枪对峙生父卡尔迈恩·法尔科内",
    type: "song",
  },
  {
    title: "《Frisk》",
    artist: "Patrick Topping & Kevin Saunderson",
    scene: "蝙蝠侠首次闯入冰山俱乐部，在入口处与双胞胎保镖展开近身格斗",
    type: "club",
  },
  {
    title: "《Tesla》",
    artist: "Corvad",
    scene: "蝙蝠侠在冰山俱乐部贵宾吧台正面逼问企鹅人奥兹",
    type: "club",
  },
  {
    title: "《Hot 44》",
    artist: "Baauer",
    scene: "蝙蝠侠在冰山俱乐部地下酒吧 44 Below 昏暗舞池中穿梭调查",
    type: "club",
  },
  {
    title: "《Troop》",
    artist: "Peggy Gou",
    scene: "冰山俱乐部地下夜总会强节奏电子舞曲背景音",
    type: "club",
  },
  {
    title: "《Darkroom》",
    artist: "Peggy Gou",
    scene: "布鲁斯以真实身份第二次进入冰山俱乐部寻找法尔科内",
    type: "club",
  },
  {
    title: "《Dark》",
    artist: "Alesso",
    scene: "瑟琳娜佩戴智能隐形眼镜进入冰山俱乐部执行秘密侦察任务",
    type: "club",
  },
  {
    title: "《Ave Maria》（清唱狂笑版）",
    artist: "保罗·达诺（Paul Dano 饰演谜语人）",
    scene: "阿卡姆疯人院高戒备病房内，谜语人隔着防弹玻璃向蝙蝠侠狂笑清唱",
    type: "song",
  },
];

export type LensNote = {
  heading: string;
  body: string;
};

export const LENS = {
  intro:
    "《新蝙蝠侠》由奥斯卡摄影大师格雷格·弗雷泽（Greig Fraser）掌镜，开创了极具辨识度的新黑色电影摄影风格；续作《新蝙蝠侠2》则由奥斯卡最佳摄影得主埃里克·梅塞施密特（Erik Messerschmidt，《曼克》《心灵猎人》）接任。以下从光学镜头、照明设计与构图美学三个维度深度解析本系列的光影艺术。",
  stills: [
    { src: "/media/street.jpg", caption: "雨夜高反差：湿滑柏油路面将钠灯反射为条状高光" },
    { src: "/media/still-rain2.jpg", caption: "大光圈浅景深：特制变形宽银幕镜头呈现出锐利的中心画质与柔美的边缘光斑" },
    { src: "/media/gotham.jpg", caption: "高谭全景纵深：低照度环境下以城市自身灯火作为唯美光源" },
    { src: "/media/p2-snow1.jpg", caption: "格拉斯哥冬季实拍：续集将摄影焦点由深秋暴雨转向凛冽风雪" },
  ],
  fraser: [
    {
      heading: "ARRI 特制定制变形宽银幕镜头",
      body: "格雷格·弗雷泽采用 ARRI Alexa LF 大画幅摄影机，搭配由 ARRI Rental 专门调校的定制版 Alfa 系列变形宽银幕镜头（2.39:1 画幅）。镜头中心具备极高的解析锐度，而边缘部分保留了自然的彗差、暗角与像散，使画面呈现出类似胶片时代的有机质感与电影感。",
    },
    {
      heading: "新黑色电影的现场实用光美学",
      body: "全片几乎不依赖大面积人工柔光箱，而是大量利用高谭场景内部的真实光源——高压钠灯的橙黄反光、霓虹招牌的冷红冷蓝、车头大灯以及湿润积水的镜面反射。曝光严格压制在低照度区域，暗部深邃而不失层次，营造出极度逼真的夜间犯罪现场氛围。",
    },
    {
      heading: "极具张力的几何剪影构图",
      body: "弗雷泽多次采用中心透视与大剪影构图，将蝙蝠侠修长的耳廓与高谭哥特式摩天楼天际线巧妙融为一体。在著名的飞车追逐戏中，变形镜头带来的横向蓝色眩光在雨幕中穿透而出，带来了震撼人心的视觉冲击力。",
    },
  ] satisfies LensNote[],
  messerschmidt: [
    {
      heading: "奥斯卡得主接棒掌镜续作",
      body: "埃里克·梅塞施密特曾凭借《曼克》斩获奥斯卡最佳摄影奖，并以大卫·芬彻导演作品《心灵猎人》《杀手》中严谨精准的用光与冷峻克制的构图著称。他的加盟预示着《新蝙蝠侠2》将延续并深化硬核悬疑侦探片的影像质感。",
    },
    {
      heading: "冬日风雪下的全新光影挑战",
      body: "在 2026 年 8 月苏格兰格拉斯哥的实景拍摄中，摄制组布置了大量人造积雪、雾气发生器与强力探照灯矩阵。从片场线索来看，梅塞施密特将在保留前作冷峻反差的基础上，进一步探索漫天飞雪与白昼阴云下的全新影调表达。",
    },
  ] satisfies LensNote[],
};

export type LocationPin = {
  id: string;
  name: string;
  nameEn: string;
  filmAs: string;
  work: string;
  image: string;
  imageAlt: string;
  body: string;
  visit: string;
  placeId?: string;
};

export type LocationCity = {
  id: string;
  city: string;
  cityEn: string;
  note: string;
  pins: LocationPin[];
};

export const CITIES: LocationCity[] = [
  {
    id: "liverpool",
    city: "利物浦",
    cityEn: "Liverpool",
    note: "利物浦是《新蝙蝠侠》宇宙中高谭市政中心与宏伟新古典主义建筑的核心取景地。",
    pins: [
      {
        id: "st-georges",
        name: "圣乔治大厅",
        nameEn: "St George's Hall",
        filmAs: "高谭市政厅 / 市长追悼会外景",
        work: "电影《新蝙蝠侠》 · 电影《新蝙蝠侠2》",
        image: "/media/craft/st-georges.jpg",
        imageAlt: "利物浦圣乔治大厅新古典主义宏伟柱廊",
        body: "圣乔治大厅东立面拥有壮丽的古希腊罗马柱廊与青铜雕像，在第一部中作为市长唐·米切尔隆重追悼会的外景现场；2026 年 5 月剧组再次封街在此拍摄《新蝙蝠侠2》的夜景大戏。",
        visit: "位于利物浦市中心 Lime Street 车站对面，为英国一级保护建筑，外部广场常年开放供游客与影迷拍照打卡。",
      },
      {
        id: "liver-building",
        name: "皇家利物大厦",
        nameEn: "Royal Liver Building",
        filmAs: "高谭市警局 (GCPD) 屋顶天台",
        work: "电影《新蝙蝠侠》",
        image: "/media/craft/liver-building.jpg",
        imageAlt: "利物浦皇家利物大厦双钟楼顶层",
        placeId: "gcpd",
        body: "利物浦著名的三女神建筑之一。其顶部钟楼天台正是第一部中蝙蝠侠被特警围堵、随后张开滑翔翼一跃而下的经典取景地。",
        visit: "坐落于利物浦滨河 Pier Head 码头区，游客可漫步滨海步道远眺大厦全貌，亦可预约参与钟楼顶层深度导览游览。",
      },
      {
        id: "anfield",
        name: "安菲尔德公墓",
        nameEn: "Anfield Cemetery",
        filmAs: "高谭墓园哥特式地下隧道",
        work: "电影《新蝙蝠侠》",
        image: "/media/still-cat-bike.jpg",
        imageAlt: "猫女骑行机车穿过墓园隧道",
        body: "公墓入口区域拥有静谧古朴的维多利亚哥特式石砌隧道，在电影中作为蝙蝠侠与瑟琳娜完成墓地会面后骑行机车离开的隐秘通道。",
        visit: "位于利物浦北部 Cherry Lane，为历史悠久的公共墓园，日间开放公众步入参观，请保持安静与庄重。",
      },
      {
        id: "queensway",
        name: "王后通道隧道",
        nameEn: "Queensway Tunnel",
        filmAs: "《新蝙蝠侠2》冬季飞车隧道外景",
        work: "电影《新蝙蝠侠2》",
        image: "/media/p2-trailer.jpg",
        imageAlt: "隧道外景实拍准备中的蝙蝠战车",
        body: "横跨默西河连接利物浦与伯肯黑德的著名跨江公路隧道。2026 年 5 月剧组封闭整条隧道，在此完成了《新蝙蝠侠2》多场高难度冬季极速追逐夜戏实拍。",
        visit: "正常通行城市主要交通干道，日常驾车可通过该隧道体验与电影同款的工业管道回廊感。",
      },
    ],
  },
  {
    id: "glasgow",
    city: "格拉斯哥",
    cityEn: "Glasgow",
    note: "苏格兰最大城市格拉斯哥以厚重的维多利亚红砂岩建筑与工业桥梁闻名，是《新蝙蝠侠2》冬日实景拍摄的核心大本营。",
    pins: [
      {
        id: "necropolis",
        name: "格拉斯哥墓园",
        nameEn: "Glasgow Necropolis",
        filmAs: "高谭大公墓与叹息桥",
        work: "电影《新蝙蝠侠》",
        image: "/media/craft/necropolis.jpg",
        imageAlt: "格拉斯哥墓园叹息桥与远处的纪念碑群",
        body: "叹息桥（Bridge of Sighs）与维多利亚纪念碑群构成了第一部结尾极具诗意的场景：布鲁斯与瑟琳娜在此互诉衷肠后分道扬镳，各自骑行机车穿过林立的墓碑群。",
        visit: "毗邻格拉斯哥大教堂，全天免费向公众开放步道，是俯瞰格拉斯哥全城全景与追溯电影名场面的绝佳去处。",
      },
      {
        id: "glasgow-bridge",
        name: "格拉斯哥大桥",
        nameEn: "Glasgow Bridge",
        filmAs: "冬日高谭大桥与战车突围现场",
        work: "电影《新蝙蝠侠2》",
        image: "/media/p2-snow2.jpg",
        imageAlt: "铺满人造积雪的格拉斯哥大桥实拍现场",
        body: "横跨克莱德河（River Clyde）连接南北两岸的核心桥梁。2026 年 8 月中旬，剧组封桥铺设人造积雪与高谭路标，拍摄了蝙蝠战车在大雪中极速冲破封锁线的重头戏。",
        visit: "跨河主要市政桥梁，行人可通过宽阔的人行步道步行过桥，轻松打卡片场同款机位视角。",
      },
      {
        id: "broomielaw",
        name: "布鲁米洛滨河街区",
        nameEn: "Broomielaw",
        filmAs: "高谭冬日商业街与警匪对峙区",
        work: "电影《新蝙蝠侠2》",
        image: "/media/p2-snow1.jpg",
        imageAlt: "布鲁米洛街区雪景实拍俯瞰图",
        body: "克莱德河北岸著名的历史沿河大道。剧组将整条街区的沿街商铺重新装修改装为高谭市的百货大楼与餐厅，并在此完成了装甲特警车队与战车对峙的夜战实拍。",
        visit: "位于格拉斯哥核心滨河区域，沿途拥有开阔的步行绿道与现代咖啡厅，交通极为便利。",
      },
    ],
  },
  {
    id: "london",
    city: "伦敦",
    cityEn: "London",
    note: "英国首都伦敦为第一部提供了丰富的古老哥特府邸、废弃工业遗址与地下铁路车间内景支撑。",
    pins: [
      {
        id: "two-temple",
        name: "双殿官邸",
        nameEn: "Two Temple Place",
        filmAs: "高谭市长唐·米切尔豪华府邸",
        work: "电影《新蝙蝠侠》",
        image: "/media/craft/two-temple.jpg",
        imageAlt: "伦敦双殿维多利亚哥特式华丽外立面",
        body: "建于 1895 年的维多利亚晚期新哥特式奢华建筑。在电影开场中，这里作为市长官邸出场，谜语人在此完成了震惊全城的第一桩密室凶杀案。",
        visit: "位于 Victoria Embankment 泰晤士河北岸，不定期举办艺术展览并对公众开放参观，古典雕刻与彩色玻璃极为精美。",
      },
      {
        id: "kingsway",
        name: "霍尔本国王通道电车隧道",
        nameEn: "Kingsway Tramway Subway",
        filmAs: "地下车间 / 战车出入通道",
        work: "电影《新蝙蝠侠》",
        image: "/media/still-lair.jpg",
        imageAlt: "地下电车隧道改建的工作车间",
        placeId: "cave",
        body: "伦敦霍尔本地下长达数百米的一处废弃有轨电车隧道，其粗犷斑驳的混凝土拱门与铁轨被改建为蝙蝠侠驶入地下车间的隐秘通道。",
        visit: "属于伦敦历史地下保护遗迹，平时不对外开放，但伦敦交通博物馆（London Transport Museum）每年会定期组织专属探秘导览项目。",
      },
      {
        id: "lethaby",
        name: "莱瑟比楼",
        nameEn: "Lethaby Building",
        filmAs: "高谭警局室内",
        work: "电影《新蝙蝠侠》",
        image: "/media/still-gordon.jpg",
        imageAlt: "吉姆·戈登。",
        placeId: "gcpd",
        body: "霍尔本 Southampton Row 与 Theobalds Road 转角，原圣马丁艺术学校。六边形楼梯对应蝙蝠侠逃上屋顶的室内。屋顶跳跃外景则用了利物浦皇家利物大厦钟楼，两城拼在同一栋「GCPD」上。",
        visit: "建筑在用。只能拍外立面，不能当警局参观。",
      },
      {
        id: "mills",
        name: "千年磨坊工业遗址",
        nameEn: "Millennium Mills",
        filmAs: "废弃码头工业厂房 / 审讯企鹅人现场",
        work: "电影《新蝙蝠侠》",
        image: "/media/still-mud.jpg",
        imageAlt: "工业水泥立柱构筑的阴暗审讯现场",
        body: "位于东伦敦皇家维多利亚码头的巨型废弃面粉厂工业遗址。其极具包豪斯与粗野主义风格的水泥立柱矩阵，正是蝙蝠侠与戈登在飞车追逐后将企鹅人倒吊审讯的名场面取景地。",
        visit: "坐落于 Royal Victoria Dock 码头区，游客可在隔江步道与对岸缆车上近距离饱览这座标志性工业历史遗迹。",
      },
      {
        id: "printworks",
        name: "Printworks 艺术中心 (原夜总会)",
        nameEn: "Printworks London",
        filmAs: "冰山俱乐部大厅内景",
        work: "电影《新蝙蝠侠》",
        image: "/media/lounge.jpg",
        imageAlt: "冰山俱乐部灯光幽暗的酒吧大厅",
        placeId: "iceberg",
        body: "伦敦著名的老报业印刷厂改建的文化场地。其狭长幽深的工业大厅与昏暗的走廊结构，被剧组精心改造为法尔科内掌控的冰山俱乐部内景，完美呈现了迷离纸醉金迷的黑帮巢穴质感。",
        visit: "位于南伦敦 Surrey Quays，目前作为综合性音乐与文化艺术中心运营，可关注官方排期参与各项文化活动。",
      },
    ],
  },
];

export const ALIASES: { heard: string; mapsTo: string; body: string }[] = [
  {
    heard: "利物浦大教堂",
    mapsTo: "st-georges",
    body: "电影中宏伟的市长追悼会外景实拍于利物浦圣乔治大厅（St George's Hall）的古典柱廊前，室内悼念大厅则由制片厂大型摄影棚实景搭建。",
  },
  {
    heard: "高谭市政大堂",
    mapsTo: "st-georges",
    body: "高谭市政厅的外立面与宽阔台阶均取景自利物浦圣乔治大厅，是串联前作与续集的核心地标之一。",
  },
  {
    heard: "国王通道地下隧道",
    mapsTo: "kingsway",
    body: "第一部中蝙蝠战车出入的地下隧道实拍于伦敦霍尔本的废弃电车隧道（Kingsway Tramway Subway）；而《新蝙蝠侠2》的过江追车戏则取景于利物浦的王后通道隧道（Queensway Tunnel）。",
  },
  {
    heard: "双桥区市长官邸",
    mapsTo: "two-temple",
    body: "第一部开场市长唐·米切尔的遇害官邸取景于伦敦泰晤士河北岸的著名维多利亚哥特建筑双殿官邸（Two Temple Place）。",
  },
  {
    heard: "金丝雀码头地下通道",
    mapsTo: "mills",
    body: "蝙蝠侠与戈登在飞车追逐后审讯企鹅人的高大立柱厂房，取景于东伦敦维多利亚码头的千年磨坊（Millennium Mills）工业遗址。",
  },
];
