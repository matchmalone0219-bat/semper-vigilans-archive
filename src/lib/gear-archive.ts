export type Bilingual = { zh: string; en: string };
export const bilingual = (zh: string, en: string): Bilingual => ({ zh, en });
export type GearSource = {
  source: string;
  sourceUrl: string;
  sourceTier: "official" | "archive";
};
export type GearPlate = {
  src: string;
  preview?: string;
  title: Bilingual;
  caption: Bilingual;
  stage: Bilingual;
  credit: string;
  provenance: GearSource;
};
export type ArchiveGear = {
  id: string;
  name: Bilingual;
  category: Bilingual;
  summary: Bilingual;
  film: Bilingual;
  design: Bilingual;
  filmDetails?: Bilingual[];
  designDetails?: Bilingual[];
  plates: GearPlate[];
  hotspot?: { x: number; y: number };
};

const BOOK_3: GearSource = {
  source: "The Art of The Batman · Alextoons",
  sourceUrl: "https://alextoons.com/blog/2022/8/26/the-art-of-the-batman-pt3",
  sourceTier: "archive",
};
const BOOK_4: GearSource = {
  ...BOOK_3,
  sourceUrl: "https://alextoons.com/blog/2022/8/29/the-art-of-the-batman-pt4",
};
const BOOK_5: GearSource = {
  ...BOOK_3,
  sourceUrl: "https://alextoons.com/blog/2022/9/2/the-art-of-the-batman",
};
const DILLON: GearSource = {
  source: "Concept Art Association · Glyn Dillon",
  sourceUrl:
    "https://www.conceptartassociation.com/2022-caa-finalists/grapple-gunharpoon-the-batman",
  sourceTier: "official",
};
const SAVAGE: GearSource = {
  source: "Matthew Savage · The Batman",
  sourceUrl: "https://www.mattsavconcept.com/portfolio/the-batman",
  sourceTier: "official",
};
const THORP: GearSource = {
  source: "Ash Thorp · ALT Creative",
  sourceUrl: "https://www.altcinc.com/work/batman",
  sourceTier: "official",
};
const CONCEPT = bilingual("概念设计", "Concept design");
const SHEET = bilingual("设定集图版", "Art-book plate");

const PLATE_PREVIEWS: Record<string, string> = {
  "/media/gear-archive/body.jpg": "/media/gear-archive/body-preview.jpg",
  "/media/gear-archive/suit.jpg": "/media/gear-archive/suit-preview.jpg",
  "/media/gear-archive/cowl.jpg": "/media/gear-archive/cowl-preview.jpg",
  "/media/gear-archive/emblem.jpg": "/media/gear-archive/emblem-preview.jpg",
  "/media/gear-archive/belt.jpg": "/media/gear-archive/belt-preview.jpg",
  "/media/gear-archive/gauntlet-sketch.jpg": "/media/gear-archive/gauntlet-sketch-preview.jpg",
  "/media/gear-archive/sticky-sketch.jpg": "/media/gear-archive/sticky-sketch-preview.jpg",
  "/media/gear-archive/sticky-render.jpg": "/media/gear-archive/sticky-render-preview.jpg",
};

function plate(
  src: string,
  zh: string,
  en: string,
  captionZh: string,
  captionEn: string,
  credit: string,
  provenance: GearSource,
  stage = CONCEPT,
): GearPlate {
  return {
    src,
    preview: PLATE_PREVIEWS[src],
    title: bilingual(zh, en),
    caption: bilingual(captionZh, captionEn),
    credit,
    provenance,
    stage,
  };
}

export const BODY_PLATE = plate(
  "/media/gear-archive/belt.jpg",
  "战衣正背面三维设计",
  "Front and rear Batsuit 3D designs",
  "《The Art of The Batman》战衣概念图；身体节点用于浏览相关装备。",
  "A Batsuit concept from The Art of The Batman; body markers open related equipment records.",
  "The Art of The Batman",
  BOOK_4,
);

export const SUIT_OVERVIEW: ArchiveGear = {
  id: "suit",
  name: bilingual("蝙蝠战衣", "Batsuit"),
  category: bilingual("战衣结构", "Suit construction"),
  summary: bilingual(
    "分块护甲、系带与贴身内层共同构成这套战衣的轮廓。",
    "Segmented armor, lacing and a fitted underlayer define this Batsuit.",
  ),
  film: bilingual(
    "2022 年《新蝙蝠侠》中，战衣的装甲轮廓与垂落披风贯穿夜间巡逻、近身搏斗和洪灾救援。",
    "In The Batman (2022), the armored silhouette and hanging cape accompany night patrols, close combat and the flood rescue.",
  ),
  design: bilingual(
    "设定集收录的创作者说明提到俄罗斯压力服的系带，以及马术防护背心的分块思路。两者都围绕穿着者的活动空间展开。",
    "The art book discusses lacing inspired by Russian pressure suits and the segmented construction of equestrian protective vests, both informing freedom of movement.",
  ),
  plates: [
    plate(
      "/media/gear-archive/body.jpg",
      "战衣全身概念图",
      "Full-body Batsuit concept",
      "战衣与垂落披风的概念造型。",
      "Concept silhouette of the Batsuit and hanging cape.",
      "The Art of The Batman",
      BOOK_4,
    ),
    plate(
      "/media/gear-archive/suit.jpg",
      "战衣与活动结构",
      "Batsuit and mobility",
      "全身设计与战衣结构说明。",
      "Full-body design with construction notes for the suit.",
      "The Art of The Batman",
      BOOK_3,
      SHEET,
    ),
  ],
};

export const LOADOUT: ArchiveGear[] = [
  {
    id: "cowl",
    name: bilingual("蝙蝠头罩", "Cowl"),
    category: bilingual("头部", "Head"),
    hotspot: { x: 64, y: 12 },
    summary: bilingual(
      "尖耳、外露下颌与缝线塑造近距离可辨认的头罩轮廓。",
      "Pointed ears, an exposed jaw and seam details shape the cowl's close-up silhouette.",
    ),
    film: bilingual(
      "头罩保留眼睛与下颌的表演空间。布鲁斯摘下头罩时，眼周黑妆仍留在脸上。",
      "The cowl leaves the eyes and jaw visible for performance. Bruce's black eye makeup remains when he removes it.",
    ),
    design: bilingual(
      "头部设计图集中展示正侧面轮廓、面部折线与颈部衔接。可将这些细节与全身设计中的肩颈结构对照。",
      "The cowl studies explore front and side profiles, facial planes and the neck transition, which can be compared with the full-body shoulder construction.",
    ),
    plates: [
      plate(
        "/media/gear-archive/cowl.jpg",
        "头罩造型研究",
        "Cowl studies",
        "不同角度的头部与颈部设计。",
        "Head and neck designs from several angles.",
        "The Art of The Batman",
        BOOK_4,
        SHEET,
      ),
    ],
  },
  {
    id: "chest-blade",
    name: bilingual("胸前蝙蝠徽记", "Chest emblem"),
    category: bilingual("胸部", "Chest"),
    hotspot: { x: 67, y: 32 },
    summary: bilingual(
      "嵌在胸甲上的蝙蝠轮廓，也是一件可以取下使用的切割工具。",
      "The bat silhouette set into the chest armor doubles as a removable cutting tool.",
    ),
    film: bilingual(
      "在哥谭广场花园的洪灾救援中，布鲁斯取下胸前徽记，用它切断悬垂的电缆。",
      "During the Gotham Square Garden flood rescue, Bruce removes the emblem to cut a hanging electrical cable.",
    ),
    design: bilingual(
      "设定集将徽记轮廓研究与胸甲造型并置，展示标志如何融入分块护甲。",
      "The art book places emblem studies beside chest-armor designs, showing how the symbol fits into the segmented suit.",
    ),
    plates: [
      plate(
        "/media/gear-archive/emblem.jpg",
        "徽记与胸甲",
        "Emblem and chest armor",
        "徽记轮廓及其在胸甲上的位置。",
        "Emblem silhouettes and their placement on the chest armor.",
        "The Art of The Batman",
        BOOK_3,
        SHEET,
      ),
    ],
  },
  {
    id: "cape",
    name: bilingual("披风与翼装", "Cape & wingsuit"),
    category: bilingual("背部", "Back"),
    hotspot: { x: 84, y: 26 },
    summary: bilingual(
      "垂落的披风勾勒剪影，警局楼顶的翼装脱险则展现另一种机动方式。",
      "The hanging cape defines the silhouette; the police-rooftop wingsuit escape introduces another mode of movement.",
    ),
    film: bilingual(
      "布鲁斯从警局楼顶跃下，以翼装穿行楼宇之间，随后打开降落伞。落地时的碰撞让这次脱险带着鲜明的危险感。",
      "Bruce jumps from the police rooftop in a wingsuit, then deploys a parachute. The collision on landing gives the escape a palpable sense of danger.",
    ),
    design: bilingual(
      "全身概念图表现了披风在肩部的固定位置、垂坠方向，以及它对护甲轮廓的遮挡。翼装的使用另见影片场景。",
      "The full-body concept shows the cape's shoulder attachment, drape and overlap with the armor. The wingsuit is considered separately through its film appearance.",
    ),
    plates: [BODY_PLATE],
  },
  {
    id: "gauntlet",
    name: bilingual("战术护臂", "Gauntlets"),
    category: bilingual("前臂", "Forearms"),
    hotspot: { x: 90, y: 51 },
    summary: bilingual(
      "前臂护具将外侧条状配件、绑带与腕部活动空间组合在一起。",
      "The forearm assembly brings together external rod-like fittings, straps and room for wrist movement.",
    ),
    film: bilingual(
      "护臂是战衣近战轮廓的一部分。双臂抬起、出拳或操作工具时，前臂装具与手套保持相邻而独立的结构。",
      "The gauntlets form part of the suit's close-combat silhouette, sitting beside the gloves as Batman raises his arms, punches or handles tools.",
    ),
    design: bilingual(
      "手绘稿逐项研究护臂上的配件与固定方式；独立数字图则展示护臂、抓钩与握持姿态之间的关系。",
      "The sketches study individual fittings and attachment methods; the digital sheet relates the gauntlet to the grapnel and its firing grip.",
    ),
    plates: [
      plate(
        "/media/gear-archive/grapnel.jpg",
        "护臂与抓钩组合",
        "Gauntlet and grapnel assembly",
        "护臂外观、展开机构与手持姿态。",
        "Gauntlet exterior, deployed assembly and hand-held configuration.",
        "Glyn Dillon",
        DILLON,
      ),
      plate(
        "/media/gear-archive/gauntlet-sketch.jpg",
        "护臂手绘结构稿",
        "Gauntlet construction sketches",
        "带原始注记的前臂装具研究。",
        "Forearm assembly studies with original annotations.",
        "The Art of The Batman",
        BOOK_4,
        SHEET,
      ),
    ],
  },
  {
    id: "grapnel",
    name: bilingual("抓钩发射器", "Grapnel launcher"),
    category: bilingual("腕部工具", "Wrist-mounted tool"),
    hotspot: { x: 43, y: 53 },
    summary: bilingual(
      "借助抓钩与线缆，在建筑高差之间完成攀升和悬挂。",
      "A grapnel and cable provide a means of ascending and hanging across vertical spaces.",
    ),
    film: bilingual(
      "终局体育馆段落中，抓钩帮助蝙蝠侠抵达高处的钢结构，将行动从看台延伸到建筑上方。",
      "In the stadium finale, the grapnel helps Batman reach the overhead steelwork, taking the action above the stands.",
    ),
    design: bilingual(
      "Glyn Dillon 的图版同时展示前臂收纳、展开部件与发射姿态，适合观察工具如何从战衣中取用。",
      "Glyn Dillon's sheet shows forearm storage, deployed components and the firing stance, illustrating how the tool is accessed from the suit.",
    ),
    plates: [
      plate(
        "/media/gear-archive/grapnel.jpg",
        "抓钩与鱼叉设计",
        "Grapple gun / harpoon",
        "抓钩发射器与护臂的设计图。",
        "Design sheet for the grapnel launcher and gauntlet.",
        "Glyn Dillon",
        DILLON,
      ),
    ],
  },
  {
    id: "belt",
    name: bilingual("实用腰带", "Utility belt"),
    category: bilingual("腰部", "Waist"),
    hotspot: { x: 62, y: 55 },
    summary: bilingual(
      "黑色装具带、扣具和收纳袋，把小型工具集中在腰部。",
      "A black equipment belt, buckle and pouches keep small tools at the waist.",
    ),
    film: bilingual(
      "腰带与大腿侧装具共同构成战衣的收纳区域，在全身镜头中保留了执勤装备的实用轮廓。",
      "The belt and thigh equipment form the suit's storage area, retaining the practical silhouette of duty gear in full-body shots.",
    ),
    design: bilingual(
      "Glyn Dillon 在设定集说明中提到军警装备的参考方向。三维图版可以同时观察扣具、腰袋和大腿绑带的布局。",
      "Glyn Dillon's art-book commentary describes military and police equipment as references. The 3D plate shows the buckle, pouches and thigh straps together.",
    ),
    plates: [
      plate(
        "/media/gear-archive/belt.jpg",
        "腰带与装具布局",
        "Belt and equipment layout",
        "战衣三维设计中的正面与背面装具。",
        "Front and rear equipment placement in the suit's 3D design.",
        "The Art of The Batman",
        BOOK_4,
        SHEET,
      ),
    ],
  },
  {
    id: "contact-lens",
    name: bilingual("记录隐形眼镜", "Recording contact lenses"),
    category: bilingual("侦查工具", "Surveillance"),
    summary: bilingual(
      "镜片、收纳盒与读取器构成一组用于观察和回放的侦查道具。",
      "Lenses, a storage case and a reader form a surveillance and playback kit.",
    ),
    film: bilingual(
      "布鲁斯使用镜片记录调查过程，也让瑟琳娜佩戴镜片进入俱乐部，在外部观察她所见的场景并与她通话。",
      "Bruce uses the lenses during his investigation and has Selina wear them inside the club, watching what she sees and speaking with her from outside.",
    ),
    design: bilingual(
      "Matthew Savage 的独立设计稿将镜片、收纳盒与读取器分别展开，可以比较微型道具的外观与整套使用流程。",
      "Matthew Savage's separate sheets develop the lenses, case and reader, linking the appearance of the miniature prop to the wider workflow.",
    ),
    plates: [
      plate(
        "/media/gear-archive/lens.jpg",
        "记录镜片",
        "Recording lenses",
        "镜片的环形细节与表面图案。",
        "Circular details and surface patterns of the lenses.",
        "Matthew Savage",
        SAVAGE,
      ),
      plate(
        "/media/gear-archive/lens-case.jpg",
        "镜片收纳盒",
        "Lens case",
        "收纳盒的开合与内部布局。",
        "Case opening and internal layout.",
        "Matthew Savage",
        SAVAGE,
      ),
      plate(
        "/media/gear-archive/lens-reader.jpg",
        "镜片读取器",
        "Lens reader",
        "读取器的外壳与接口设计。",
        "Reader enclosure and interface design.",
        "Matthew Savage",
        SAVAGE,
      ),
    ],
  },
  {
    id: "sticky-bomb-gun",
    name: bilingual("黏弹发射器", "Sticky bomb gun"),
    category: bilingual("随身工具", "Portable tool"),
    summary: bilingual(
      "紧凑的握把与筒状主体，体现战衣之外的独立工具设计。",
      "A compact grip and cylindrical body define this stand-alone tool.",
    ),
    film: bilingual(
      "爆破工具属于布鲁斯的随身装备，用于需要破开障碍的行动环节。",
      "Demolition tools belong to Bruce's portable equipment for breaching obstacles.",
    ),
    design: bilingual(
      "两张设定集图版分别呈现带注记的机械草图和着色方案。比较握把、筒体与装载部位，可以看到从结构研究到外观呈现的变化。",
      "Two art-book plates present annotated mechanical sketches and a rendered proposal. The grip, barrel and loading area trace the move from construction studies to appearance.",
    ),
    plates: [
      plate(
        "/media/gear-archive/sticky-render.jpg",
        "黏弹枪外观方案",
        "Sticky bomb gun render",
        "机械草稿与着色外观并置。",
        "Mechanical sketches alongside a rendered design.",
        "The Art of The Batman",
        BOOK_5,
        SHEET,
      ),
      plate(
        "/media/gear-archive/sticky-sketch.jpg",
        "黏弹枪结构研究",
        "Sticky bomb gun construction",
        "握把、筒体与零件拆分。",
        "Grip, barrel and component studies.",
        "The Art of The Batman",
        BOOK_5,
        SHEET,
      ),
    ],
  },
];

export const VEHICLES: ArchiveGear[] = [
  {
    id: "car",
    name: bilingual("蝙蝠战车", "Batmobile"),
    category: bilingual("载具", "Vehicle"),
    summary: bilingual(
      "低伏的肌肉车轮廓与外露机械结构，构成这一代战车的视觉重心。",
      "A low muscle-car silhouette and exposed machinery define this Batmobile.",
    ),
    film: bilingual(
      "蝙蝠侠在雨夜驾车追逐企鹅人，战车的车头、尾焰与引擎声共同构成登场时的压迫感。",
      "Batman pursues the Penguin in the rain; the car's front end, exhaust flames and engine sound shape its imposing entrance.",
    ),
    design: bilingual(
      "Ash Thorp 的作品集收录多轮战车探索。这里选取车身设计图的不同角度，保留概念阶段的身份。",
      "Ash Thorp's portfolio documents successive design explorations. These views show the body design from different angles as concept work.",
    ),
    plates: [
      plate(
        "/media/gear-archive/batmobile-a.jpg",
        "蝙蝠战车 · 视角一",
        "Batmobile · view 01",
        "车身比例与外部轮廓。",
        "Body proportions and exterior silhouette.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/batmobile-b.jpg",
        "蝙蝠战车 · 视角二",
        "Batmobile · view 02",
        "同组车身设计的另一视角。",
        "Another view from the body-design series.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
    ],
  },
  {
    id: "batcycle",
    name: bilingual("蝙蝠机车", "Batcycle"),
    category: bilingual("载具", "Vehicle"),
    summary: bilingual(
      "与战衣配套的黑色机车，轮廓紧凑、机械结构外露。",
      "A compact black motorcycle paired with the Batsuit, with exposed mechanical elements.",
    ),
    film: bilingual(
      "机车承担城市中的快速移动，也出现在布鲁斯与瑟琳娜告别的道路段落中。",
      "The motorcycle carries Batman through the city and appears in Bruce and Selina's farewell on the road.",
    ),
    design: bilingual(
      "设计图集中呈现车架、轮胎与前部轮廓之间的关系，不同角度有助于阅读整体比例。",
      "The designs relate the frame, tires and front-end silhouette; multiple views reveal the overall proportions.",
    ),
    plates: [
      plate(
        "/media/gear-archive/batcycle-a.jpg",
        "蝙蝠机车 · 视角一",
        "Batcycle · view 01",
        "机车整体设计。",
        "Overall motorcycle design.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/batcycle-b.jpg",
        "蝙蝠机车 · 视角二",
        "Batcycle · view 02",
        "车身结构的补充视角。",
        "An additional view of the bike's construction.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
    ],
  },
  {
    id: "drifter",
    name: bilingual("流浪者机车", "Drifter motorcycle"),
    category: bilingual("载具", "Vehicle"),
    summary: bilingual(
      "与便装布鲁斯相连的机车，具有日常骑行与街头改装的外观。",
      "Bruce's civilian motorcycle has the appearance of an everyday, street-customized ride.",
    ),
    film: bilingual(
      "布鲁斯以便装穿行哥谭时，机车延续了兜帽与外套所建立的街头形象。",
      "When Bruce travels through Gotham in civilian clothes, the motorcycle extends the street-level identity established by his hood and jacket.",
    ),
    design: bilingual(
      "Ash Thorp 的 Drifter 图组展示油箱、坐垫、车灯和外露车架的组合，与蝙蝠机车的造型可并列比较。",
      "Ash Thorp's Drifter series develops the tank, seat, lamp and exposed frame, offering a useful comparison with the Batcycle.",
    ),
    plates: [
      plate(
        "/media/gear-archive/drifter-a.jpg",
        "流浪者机车 · 视角一",
        "Drifter · view 01",
        "便装机车设计。",
        "Civilian motorcycle design.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/drifter-b.jpg",
        "流浪者机车 · 视角二",
        "Drifter · view 02",
        "车架与车身的另一视角。",
        "Another view of the frame and body.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
    ],
  },
];

type GearDetails = Pick<ArchiveGear, "filmDetails" | "designDetails">;

const ARCHIVE_DETAILS: Record<string, GearDetails> = {
  suit: {
    filmDetails: [
      bilingual(
        "这套战衣属于布鲁斯成为蝙蝠侠的第二年：它还没有被打磨成一套无懈可击的制服，而是会磨损、沾污、留下弹痕的工作装备。装甲片保护胸腹与关键部位，贴身层、绑带和披风则让它能够在追逐、近战和洪灾救援之间持续使用。",
        "The suit belongs to Bruce's second year as Batman. It is still a working kit rather than an invulnerable uniform, carrying grime, wear and bullet marks from use. Armor protects the torso and other vital areas, while the underlayer, straps and cape let it move between pursuit, close combat and flood rescue.",
      ),
      bilingual(
        "设定集中的创作方向把战衣放在‘可以继续发展’的阶段：它借用了防暴装备、军事服装和早期蝙蝠侠轮廓，但没有抹去穿着者的身体限制。这让帕丁森的动作、受伤和笨重感都成为角色的一部分。",
        "The art-book direction keeps the suit in a stage that can still evolve. It borrows from riot and military equipment as well as early Batman silhouettes, without hiding the wearer's physical limits. Pattinson's movement, injuries and occasional heaviness therefore become part of the character.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 与 Pierre Bohanna 的说明把俄罗斯压力服的系带、马术防护背心的分块和现实中的执勤装备放在同一个设计问题里：护甲要有分量，但身体仍要能转身、抬臂和落地。",
        "Glyn Dillon and Pierre Bohanna connect the lacing of Russian pressure suits, the segmentation of equestrian protective vests and real duty gear through one design question: armor must feel substantial while the body can still turn, raise an arm and land.",
      ),
      bilingual(
        "因此图版里的缝线、绑带和接缝不是装饰性的纹理。它们把护甲、软质内层和披风固定在同一个可穿戴系统里，也解释了为什么这套战衣看起来像是布鲁斯亲手改装出来的原型。",
        "The seams, straps and joins in the plates are therefore more than surface texture. They connect armor, soft underlayers and cape into one wearable system, helping the suit read as a prototype Bruce has assembled and modified himself.",
      ),
    ],
  },
  cowl: {
    filmDetails: [
      bilingual(
        "头罩让眼睛、鼻梁和下颌保留表演空间，所以布鲁斯摘下它时，脸上的黑色眼妆仍然把两个身份连在一起。外露的下颌也让头罩更像一件贴着真人面部工作的装备，而不是封闭的面具。",
        "The cowl leaves the eyes, nose bridge and jaw available for performance. When Bruce removes it, the black eye makeup still connects the two identities. The exposed jaw also makes the cowl feel like equipment working against a real face rather than a sealed mask.",
      ),
      bilingual(
        "电影中的头罩轮廓因此既要让眼神可见，也要在雨夜和低照度环境里保持蝙蝠的辨识度。尖耳、眉骨和向颈部收紧的线条共同承担了这项工作。",
        "The film cowl must keep the eyes readable while retaining a bat-like identity in rain and low light. The pointed ears, brow and tightening lines toward the neck carry that burden together.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 形容早期头罩草图有近似头骨的凹陷与眼窝。这个方向让头罩显得像从布鲁斯自己的面部和恐惧意象里长出来，而不是把一个光滑的橡胶模具套在头上。",
        "Glyn Dillon describes the early cowl drawing as having skull-like indentations and eye sockets. The direction makes it feel grown from Bruce's own face and fear imagery rather than placed over him as a smooth rubber mold.",
      ),
      bilingual(
        "设定集还把材料感推向皮革和手工制作的方向。正侧面图中的折线、颈部活动区与下颌边缘，都是把‘自己做出来的头罩’落实为结构细节的地方。",
        "The art book also pushes the material toward leather and hand construction. The planes in the front and side views, the flexible neck area and the jaw edge turn the idea of a self-made cowl into physical detail.",
      ),
    ],
  },
  "chest-blade": {
    filmDetails: [
      bilingual(
        "胸前徽记第一次出现时像护甲的一部分，到了哥谭广场花园的救援段落才显出它的另一种用途：布鲁斯可以把它从胸前取下，切断挡路的电缆。符号、护甲和工具在同一个动作里合并。",
        "The chest emblem first reads as part of the armor, then reveals another use during the Gotham Square Garden rescue: Bruce removes it and cuts through a cable in his way. Symbol, armor and tool merge in one action.",
      ),
      bilingual(
        "这也让蝙蝠标志不再只是被动的识别图案，而是一个会被手掌拿住、贴近障碍物工作的部件。影片只给出短暂使用，设定页则补足了它作为随身工具的想象空间。",
        "The bat symbol is no longer only a passive identifier; it becomes a component that can be held and brought to an obstruction. The film gives it a brief use, while the design pages extend its life as a carried tool.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 的设计思路是让徽记在需要时可以成为武器：蝙蝠翅膀的负形被推向刀片般的切割轮廓。它既要远看像蝙蝠，又要近看像一件可以脱离胸甲的金属部件。",
        "Glyn Dillon's design direction lets the emblem become a weapon when needed: the negative space of the bat wings is pushed toward a blade-like cutting silhouette. It must read as a bat from a distance and as a detachable metal part up close.",
      ),
      bilingual(
        "图版把徽记轮廓、胸部正面和拆下后的形态放在相邻位置，说明这个符号如何从平面图形转成有厚度、有边缘、可以握持的胸甲零件。",
        "The plates place emblem silhouettes beside the chest front and the removed form, showing how a flat graphic becomes a thick, edged and hand-held piece of chest armor.",
      ),
    ],
  },
  cape: {
    filmDetails: [
      bilingual(
        "披风在大多数夜间镜头里承担的是剪影功能：它从肩部垂下，遮住一部分护甲，也让站立、行走和迎风时的蝙蝠轮廓更完整。披风的重量感与战衣的装甲感保持在同一个身体上。",
        "In most night scenes, the cape works through silhouette. It drops from the shoulders, hides part of the armor and completes the bat shape when Bruce stands, walks or faces the wind. Its sense of weight belongs to the same body as the armor.",
      ),
      bilingual(
        "警局楼顶的翼装则把这套轮廓转成真正的机动工具。布鲁斯从楼顶跃下、打开翼面并在落地前展开降落伞，披风的戏剧形象在这里变成一次带有明显失控风险的逃生。",
        "The wingsuit sequence on the police rooftop turns that silhouette into a real mobility tool. Bruce jumps, opens the wing surface and deploys a parachute before landing; the cape's dramatic image becomes an escape with visible risk of losing control.",
      ),
    ],
    designDetails: [
      bilingual(
        "全身图版首先确定披风从肩部落下的起点、宽度和垂坠方向。它不只是给人物加上一块黑色背景，而是会遮挡护甲、改变侧面轮廓并参与动作阅读的软质结构。",
        "The full-body plates first establish where the cape leaves the shoulders, how wide it is and how it falls. It is not simply a black backdrop; it is a soft structure that hides armor, changes the side silhouette and participates in reading the movement.",
      ),
      bilingual(
        "与战衣分块设计放在一起看，披风的固定点和颈部活动区尤其重要：它必须随身体转动，又不能破坏头罩、肩甲和背部线条之间的连续性。",
        "Seen alongside the segmented suit, the cape attachment and neck mobility are especially important. It must follow the body without breaking the continuity between cowl, shoulders and back.",
      ),
    ],
  },
  gauntlet: {
    filmDetails: [
      bilingual(
        "护臂在影片里不是一件独立炫技的武器，而是近战姿态和随身工具的连接件。抬臂、出拳、握住抓钩或贴近线索时，护臂都要保持保护性，同时不抢走手部动作的清晰度。",
        "In the film, the gauntlets are not a separate showpiece weapon; they connect close-combat posture to the carried tools. When Batman raises an arm, punches, grips the grapnel or examines a clue, they protect without obscuring the hand action.",
      ),
      bilingual(
        "它们与袖口、手套和腰带的黑色装备语言保持一致，让整套战衣看起来像持续穿着、持续调整的执勤系统，而不是由互不相干的道具拼成。",
        "They share the black equipment language of the cuffs, gloves and belt, making the suit read as a continuously worn and adjusted duty system rather than unrelated props assembled together.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 的护臂说明把一个实际问题放在中心：特技协调需要护具不妨碍灵活手指去检查线索，同时还要能承载电击等功能。保护、灵活和功能被压缩在同一段前臂空间里。",
        "Glyn Dillon's gauntlet notes center on a practical problem: stunt work needs dexterous fingers for examining clues, while the forearm piece may also carry a function such as an electrical charge. Protection, dexterity and utility share the same small volume.",
      ),
      bilingual(
        "手绘稿中的条状构件、绑带和腕部接口，配合数字图里的展开状态和握持姿态，展示了护臂从外观概念走向可操作道具的过程。",
        "The rods, straps and wrist interfaces in the sketches, together with the deployed and held poses in the digital sheet, show the gauntlet moving from surface concept toward a usable prop.",
      ),
    ],
  },
  grapnel: {
    filmDetails: [
      bilingual(
        "抓钩发射器把蝙蝠侠的行动从地面拉到建筑结构之间：它可以帮助布鲁斯攀升、横越空隙或在终局体育馆接近上方钢架。线缆带来的不是超能力，而是一次次需要判断角度和落点的危险移动。",
        "The grapnel launcher pulls Batman's movement from the ground into the spaces between buildings. It helps Bruce climb, cross gaps and reach the overhead steelwork in the stadium finale. The cable brings no superpower; every move still depends on angle and landing point.",
      ),
      bilingual(
        "它在影片里的存在感来自取用速度：从前臂附近拿出、对准目标、发射并在下一次动作前收回。工具因此成为战衣动作节奏的一部分。",
        "Its film presence comes from speed of access: draw it from the forearm area, aim, fire and recover it before the next movement. The tool becomes part of the suit's action rhythm.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 的图版把发射器、鱼叉、线缆和前臂收纳关系拆开来展示。设计重点不是把它做成夸张的科幻枪，而是让机械部件在黑色战衣上有明确的取用方向和工作姿态。",
        "Glyn Dillon's sheet separates the launcher, harpoon, cable and forearm storage relationship. The aim is not an exaggerated science-fiction gun, but mechanical parts with a clear access direction and working pose against the black suit.",
      ),
      bilingual(
        "把它与护臂手绘稿并读，可以看到工具如何从一件单独的概念图，转成会和手腕、绑带以及手指动作互相限制的穿戴式部件。",
        "Read beside the gauntlet sketches, the tool moves from an isolated concept into a wearable part constrained by the wrist, straps and finger movement.",
      ),
    ],
  },
  belt: {
    filmDetails: [
      bilingual(
        "腰带与大腿侧装具构成整套战衣最明确的收纳区。它们让布鲁斯在不切换到独立背包的情况下携带小型工具，也把人物的行动方式拉回军警装备的现实语境。",
        "The belt and thigh rigs form the suit's clearest storage zone. They let Bruce carry small tools without changing to a separate pack, grounding his way of working in the reality of military and police equipment.",
      ),
      bilingual(
        "同页图版还把头罩颈部的活动构件画成近似椎骨的连续结构。这个细节和腰带并列出现，说明‘能装东西’与‘能自由转动’在这套战衣里是同一个设计目标。",
        "The same plate draws the cowl's neck pieces as a linked, almost vertebral structure. Placed beside the belt, the detail shows that carrying equipment and moving freely are part of the same suit-design goal.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 的方向是放弃传统黄色或金色漫画腰带，转向从退役军用、警用装备寻找现实参照的黑色皮革装具。扣具、腰袋和大腿绑带因此更像可以在现实世界里采购、改装和反复使用的物件。",
        "Glyn Dillon's direction moves away from the traditional yellow or gold comic-book belt toward black leather equipment informed by ex-military and police gear. The buckles, pouches and thigh straps feel like objects that could be sourced, modified and repeatedly used in the real world.",
      ),
      bilingual(
        "正背面三维图的价值在于能同时看到收纳布局和颈部活动区。它把黑色皮革、扣具和软质连接件放在同一张图里，补足了影片近景不容易看清的结构关系。",
        "The front-and-back 3D plate is useful because it shows storage layout and neck mobility together. It places black leather, hardware and soft connections in one view, filling in relationships that are hard to read in film close-ups.",
      ),
    ],
  },
  "contact-lens": {
    filmDetails: [
      bilingual(
        "记录隐形眼镜把布鲁斯的侦查变成一种远程协作：瑟琳娜进入俱乐部后，镜片记录她看到的内容，布鲁斯在外部通过画面观察并与她通话。道具让‘看见’本身成为剧情行动。",
        "The recording contact lenses turn Bruce's investigation into remote collaboration. Once Selina enters the club, the lenses capture what she sees while Bruce watches from outside and speaks with her. The prop makes seeing itself part of the action.",
      ),
      bilingual(
        "这套工具也延续了蝙蝠侠把现场观察、回放和身份识别连接起来的工作方式。它不是单纯的高科技装饰，而是让布鲁斯能够在不进入现场的情况下参与其中。",
        "The kit extends Batman's habit of connecting field observation, playback and identification. It is not just high-tech decoration; it lets Bruce participate without physically entering the room.",
      ),
    ],
    designDetails: [
      bilingual(
        "Matthew Savage 的图稿把镜片、收纳盒和读取器分别展开。镜片是佩戴端，盒子负责收纳与保护，读取器则把拍摄结果带回可查看的设备，三者合起来才是完整道具流程。",
        "Matthew Savage's sheets develop the lenses, case and reader separately. The lens is the worn end, the case stores and protects it, and the reader brings the captured material back to a viewable device; together they form the prop workflow.",
      ),
      bilingual(
        "从镜片的环形细节到盒内的排列方式，图版把一个很小的道具拆成了可以被摄影机、演员和后期共同使用的视觉系统。",
        "From the circular lens detail to the arrangement inside the case, the plates break a tiny prop into a visual system that can serve the camera, the actors and the edit.",
      ),
    ],
  },
  "sticky-bomb-gun": {
    filmDetails: [
      bilingual(
        "黏弹发射器属于布鲁斯的破障工具，用在需要从远处处理目标、或需要先在障碍物上布置黏弹的行动里。它把战衣的近身装备扩展成更有距离感的工具。",
        "The sticky bomb gun is Bruce's breaching tool, used when a target must be handled from a distance or a sticky charge needs to be placed on an obstacle first. It extends the suit's close-range kit into a tool with reach.",
      ),
      bilingual(
        "设定说明提到两种部署方式：可以手动放置并设定，也可以从弹筒发射；触发逻辑以空气压力为基础。这个差异让工具既能精确处理，也能在动作场面里快速使用。",
        "The design notes describe two deployment modes: a charge can be placed and set by hand, or fired from the cartridge. Its triggering logic is based on air pressure, allowing both deliberate placement and fast action use.",
      ),
    ],
    designDetails: [
      bilingual(
        "两张图版分别承担结构研究和外观呈现：手绘稿拆开握把、筒体、装载处与内部零件，着色图再把这些部件压回一件可以被布鲁斯握持的黑色工具。",
        "The two plates divide the work between construction and appearance. The sketches separate the grip, barrel, loading area and internal parts; the render compresses them back into a black tool Bruce can hold.",
      ),
      bilingual(
        "因此它看起来像战衣系统里临时改装出的装备，既有机械逻辑，也保留了电影道具需要的清晰轮廓。握把、筒口和装载位置在不同阶段始终是阅读重点。",
        "It consequently feels like equipment modified for the suit's system, with mechanical logic and a clear silhouette for the camera. The grip, muzzle and loading position remain the key reading points across the stages.",
      ),
    ],
  },
  car: {
    filmDetails: [
      bilingual(
        "蝙蝠战车的登场不是普通追车镜头：雨夜、车灯、尾焰和低沉引擎声把它塑造成企鹅人眼中的威胁。它先以恐吓和压迫感出现，再用肌肉车的加速和重量完成追逐。",
        "The Batmobile's entrance is more than a routine chase. Rain, headlights, exhaust flames and the low engine note turn it into a threat in the Penguin's view. It arrives through intimidation, then follows through with the acceleration and weight of a muscle car.",
      ),
      bilingual(
        "影片里的车因此像布鲁斯本人一样仍在成形：它不是一辆未来科技展示车，而是把私人改装、机械暴力和街头追捕绑定在一起的早期战备载具。",
        "The car therefore feels like Bruce himself is still forming. It is not a showcase of future technology, but an early tactical vehicle tying private modification, mechanical violence and street pursuit together.",
      ),
    ],
    designDetails: [
      bilingual(
        "Matt Reeves 给出的核心方向是让战车的用途一眼可见：它必须让人害怕、让人退缩，同时又要是一辆能够真正完成追逐的肌肉车。Ash Thorp 的多轮探索围绕这个功能目标反复调整车身比例和前脸表情。",
        "Matt Reeves's core direction was that the car's purpose should be immediately clear: it must terrify and intimidate while still performing as a muscle car. Ash Thorp's successive explorations adjust the body proportions and front-end expression around that functional brief.",
      ),
      bilingual(
        "作品集中的不同视角把低伏车身、外露机械和宽大的车头拆成可比较的设计阶段。并列观看时，可以看到它如何从概念轮廓收束成一辆有明确驾驶方向和攻击姿态的车。",
        "The portfolio's multiple views make the low body, exposed machinery and broad front end comparable across stages. Seen together, they show the concept narrowing into a car with a clear direction of travel and an attacking stance.",
      ),
    ],
  },
  batcycle: {
    filmDetails: [
      bilingual(
        "蝙蝠机车把战衣的黑色、低调和机械感压缩到两轮载具上。它承担城市中的快速移动，也让布鲁斯和瑟琳娜在道路段落里的关系落回更私人、更接近地面的尺度。",
        "The Batcycle compresses the suit's black, low-profile and mechanical language into a two-wheel vehicle. It handles fast movement through the city and returns Bruce and Selina's road scenes to a more private, grounded scale.",
      ),
      bilingual(
        "与战车相比，机车没有用巨大车身制造压迫，而是用窄身、速度和骑手姿态表现蝙蝠侠的另一种机动性。",
        "Compared with the car, the motorcycle does not intimidate through size. It expresses another kind of Batman mobility through a narrow body, speed and the rider's posture.",
      ),
    ],
    designDetails: [
      bilingual(
        "Ash Thorp 的机车图组把车架、轮胎、前部结构和骑手接触点放在同一个比例问题里。它必须看起来可以在哥谭街道上转向和停下，同时保留与战衣相配的黑色工业感。",
        "Ash Thorp's motorcycle studies treat the frame, tires, front structure and rider contact points as one proportion problem. It must appear steerable and stoppable on Gotham streets while retaining an industrial blackness that belongs with the suit.",
      ),
      bilingual(
        "不同角度的价值在于读出车架如何承托身体：前轮方向、座垫高度和裸露的机械件共同决定这辆车是‘可骑的工具’，而不是缩小版战车。",
        "The multiple views reveal how the frame supports the body. Front-wheel direction, seat height and exposed mechanics make the bike read as a rideable tool rather than a scaled-down Batmobile.",
      ),
    ],
  },
  drifter: {
    filmDetails: [
      bilingual(
        "流浪者机车属于便装布鲁斯的移动方式。它没有把身份直接写成蝙蝠标志，而是延续兜帽、外套和街头骑行的外观，让‘布鲁斯在城市里移动’与‘蝙蝠侠出勤’保持可见的距离。",
        "The Drifter motorcycle belongs to Bruce in civilian clothes. It does not announce the identity through a bat symbol; it continues the hood, jacket and street-riding look, keeping visible distance between Bruce moving through the city and Batman on patrol.",
      ),
      bilingual(
        "这辆车把人物的私人生活和蝙蝠侠装备放在同一个哥谭街区里：同样是黑色、改装和机械，但用途从战斗转向日常穿行。",
        "The bike places Bruce's private life and Batman's equipment in the same Gotham neighborhood. It shares black paint, modification and machinery with the vigilante kit, while its purpose shifts to everyday travel.",
      ),
    ],
    designDetails: [
      bilingual(
        "Drifter 图组的重点是油箱、坐垫、车灯和外露车架之间的街头改装关系。它没有追求完整包覆的未来感，而是保留能被看见、被修理、被替换的部件。",
        "The Drifter studies focus on the street-custom relationship between tank, seat, lamp and exposed frame. They avoid a fully enclosed futuristic look, keeping parts visible, repairable and replaceable.",
      ),
      bilingual(
        "把它与蝙蝠机车并列，差异不只在造型：蝙蝠机车服务于身份和行动，Drifter 服务于布鲁斯的日常伪装。两组设计共同说明这部电影如何用载具区分同一个人的两种生活。",
        "Placed beside the Batcycle, the difference is more than styling. The Batcycle serves identity and action; the Drifter serves Bruce's daily cover. Together the two designs show how the film separates two lives belonging to one person through vehicles.",
      ),
    ],
  },
};

for (const item of [SUIT_OVERVIEW, ...LOADOUT, ...VEHICLES]) {
  Object.assign(item, ARCHIVE_DETAILS[item.id]);
}

export const GEAR_COPY = {
  eyebrow: bilingual("THE BATMAN · 2022", "THE BATMAN · 2022"),
  title: bilingual("战备档案", "Tactical archive"),
  intro: bilingual(
    "从战衣的一处细节，走进工具、结构与创作过程。",
    "Explore the tools, construction and creative work behind the Batsuit.",
  ),
  loadout: bilingual("随身装备", "Loadout"),
  overview: bilingual("战衣总览", "Suit overview"),
  markerHint: bilingual("选择身体节点或装备目录", "Select a body marker or an equipment record"),
  bodyCaption: bilingual(
    "战衣三维设计 · The Art of The Batman",
    "Batsuit 3D design · The Art of The Batman",
  ),
  film: bilingual("影片使用", "In the film"),
  design: bilingual("设计过程", "Design process"),
  enlarge: bilingual("放大图版", "Enlarge plate"),
  vehicles: bilingual("载具档案", "Vehicle archive"),
  vehicleIntro: bilingual(
    "从肌肉车到街头机车，以不同角度阅读载具设计。",
    "Explore the vehicle designs from muscle car to street motorcycle, across multiple views.",
  ),
  related: bilingual("车间与关联档案", "Workshop & related records"),
  relatedIntro: bilingual(
    "继续探索载具动力、布鲁斯的私人座驾与哥谭的信号。",
    "Continue into the vehicle's machinery, Bruce's civilian car and Gotham's signal.",
  ),
};
