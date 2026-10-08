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
  annotation?: {
    x: number;
    y: number;
    width: number;
    height: number;
    text: Bilingual;
  };
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
  usageLabel?: Bilingual;
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
const BOOK_CAR: GearSource = {
  ...BOOK_3,
  sourceUrl: "https://alextoons.com/blog/thebatmobile",
};
const BOOK_BRUCE: GearSource = {
  ...BOOK_3,
  sourceUrl: "https://alextoons.com/blog/brucewaynethebatman",
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
  "/media/gear-archive/suit-underlayer.jpg": "/media/gear-archive/suit-underlayer-preview.jpg",
  "/media/gear-archive/chest-knife-sketch.jpg":
    "/media/gear-archive/chest-knife-sketch-preview.jpg",
  "/media/gear-archive/chest-knife-prototypes.jpg":
    "/media/gear-archive/chest-knife-prototypes-preview.jpg",
  "/media/gear-archive/batmobile-frame.jpg": "/media/gear-archive/batmobile-frame-preview.jpg",
  "/media/gear-archive/batmobile-rear-structure.jpg":
    "/media/gear-archive/batmobile-rear-structure-preview.jpg",
  "/media/gear-archive/drifter-bike-study.jpg":
    "/media/gear-archive/drifter-bike-study-preview.jpg",
  "/media/gear-archive/body.jpg": "/media/gear-archive/body-preview.jpg",
  "/media/gear-archive/suit.jpg": "/media/gear-archive/suit-preview.jpg",
  "/media/gear-archive/cowl.jpg": "/media/gear-archive/cowl-preview.jpg",
  "/media/gear-archive/emblem.jpg": "/media/gear-archive/emblem-preview.jpg",
  "/media/gear-archive/belt.jpg": "/media/gear-archive/belt-preview.jpg",
  "/media/gear-archive/gauntlet-sketch.jpg": "/media/gear-archive/gauntlet-sketch-preview.jpg",
  "/media/gear-archive/sticky-sketch.jpg": "/media/gear-archive/sticky-sketch-preview.jpg",
  "/media/gear-archive/sticky-render.jpg": "/media/gear-archive/sticky-render-preview.jpg",
  "/media/gear-archive/cape-motion.jpg": "/media/gear-archive/cape-motion-preview.jpg",
  "/media/gear-archive/gauntlet-assembly.jpg": "/media/gear-archive/gauntlet-assembly-preview.jpg",
  "/media/gear-archive/forearm-spikes.jpg": "/media/gear-archive/forearm-spikes-preview.jpg",
  "/media/gear-archive/gauntlet-release.jpg": "/media/gear-archive/gauntlet-release-preview.jpg",
  "/media/gear-archive/gauntlet-trigger.jpg": "/media/gear-archive/gauntlet-trigger-preview.jpg",
  "/media/gear-archive/harpoon-study.jpg": "/media/gear-archive/harpoon-study-preview.jpg",
};

const PLATE_ANNOTATIONS: Record<string, NonNullable<GearPlate["annotation"]>> = {
  "/media/gear-archive/chest-knife-sketch.jpg": {
    x: 1.2,
    y: 29,
    width: 39.5,
    height: 14.4,
    text: bilingual(
      "折叠刀闭锁时嵌入胸甲，构成蝙蝠标志。它以强力磁吸固定，可快速抽离，作为破障与近战的战术刀使用。",
      "Folded into the chest plate, the knife forms Batman’s emblem. Magnets hold it in place; he can detach it as a tactical knife.",
    ),
  },
  "/media/gear-archive/cowl.jpg": {
    x: 64.3,
    y: 4,
    width: 31,
    height: 23.8,
    text: bilingual(
      "头罩早期草图借鉴了头骨的凹陷与眼窝骨相。材质选用天然皮革手工缝制，呈现出布鲁斯自制装备的粗粝感，彻底摒弃传统橡胶模具的观感。",
      "Early cowl drawings drew on the hollows and eye sockets of a skull. Hand-stitched leather conveys a homemade artifact, dispensing with smooth molded rubber.",
    ),
  },
  "/media/gear-archive/belt.jpg": {
    x: 5.6,
    y: 4.7,
    width: 35.7,
    height: 27.6,
    text: bilingual(
      "腰带取材于军警装备，采用实用的黑色硬质皮革。头罩颈部则引入仿生椎骨分片结构，随头部灵活偏转，为近战格斗保留充分的活动空间。",
      "The belt takes its practical black-leather form from military and police equipment. Vertebra-like pieces at the cowl’s neck articulate freely for head turning in combat.",
    ),
  },
  "/media/gear-archive/gauntlet-sketch.jpg": {
    x: 46.5,
    y: 80,
    width: 48.5,
    height: 16,
    text: bilingual(
      "抓钩装置收纳于前臂内侧导轨，兼具格挡防护与出鞘击发功能。它与护臂深度集成，动作灵感源自电影《出租车司机》袖内滑出手枪的机械弹射机构。",
      "The grapnel sits inside the forearm, serving as armor before sliding into the hand to fire. Its costume integration recalls the sleeve-mounted gun in Taxi Driver.",
    ),
  },
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
    annotation: PLATE_ANNOTATIONS[src],
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
  "三维概念装具总成；正面分布防弹胸甲、模块化装具带与护臂，背面展示高压飞行服系带与脊柱缓冲布局。",
  "3D concept loadout assembly: segmented ballistic chest plates, modular belt and gauntlets in front, with flight-suit lacing and spinal dampening across the rear.",
  "The Art of The Batman",
  BOOK_4,
);

export const SUIT_OVERVIEW: ArchiveGear = {
  id: "suit",
  name: bilingual("蝙蝠战衣", "Batsuit"),
  category: bilingual("战衣结构", "Suit construction"),
  summary: bilingual(
    "以防暴分块装甲、高压服系带与高耐磨内层构建的重装外骨骼原型，专为抵御零距离枪弹与高强度近战而生。",
    "A heavy prototype exoskeleton marrying segmented riot plating, flight-suit lacing, and abrasion-resistant underlayers to withstand point-blank gunfire and grueling melee.",
  ),
  film: bilingual(
    "出勤第二年的实战护具：弹痕凹坑、擦伤与泥水浸润其上，在暴烈肉搏与洪灾救援中直面肉体凡胎的生理极限。",
    "Year Two working armor bearing ballistic dents, abrasions, and grime, confronting the mortal physiological limits of its wearer across brutal brawls and flood rescues.",
  ),
  design: bilingual(
    "Glyn Dillon 与 Pierre Bohanna 融合俄罗斯高空压力服侧背系带与专业马术防护背心分块，兼顾重型防护与躯干大幅度搏击延展。",
    "Glyn Dillon and Pierre Bohanna fused Russian high-altitude pressure-suit lacing with segmented equestrian protective vests, balancing heavy ballistic coverage with extreme torso combat mobility.",
  ),
  plates: [
    plate(
      "/media/gear-archive/turntable-cape.jpg",
      "带披风的战衣四视图",
      "Batsuit four-view sheet with cape",
      "正视、侧视、背视与四分之三透视呈现重磅披风垂坠姿态与护甲各角度空间包络。",
      "Front, side, rear, and three-quarter perspectives show the heavy cape drape and spatial envelope of the armor.",
      "The Batman · 用户提供图像",
      {
        source: "用户提供 · 战衣四视图",
        sourceUrl:
          "https://github.com/matchmalone0219-bat/semper-vigilans-archive/blob/main/public/media/gear-archive/turntable-cape.jpg",
        sourceTier: "archive",
      },
    ),
    plate(
      "/media/gear-archive/body.jpg",
      "战衣全身概念图",
      "Full-body Batsuit concept",
      "暗夜剪影与全装具状态下的重装防暴战术形态。",
      "Nocturnal silhouette and heavy-duty tactical form under full loadout.",
      "The Art of The Batman",
      BOOK_4,
    ),
    plate(
      "/media/gear-archive/suit.jpg",
      "战衣与活动结构",
      "Batsuit and mobility",
      "全身硬质分块装甲与关节活动空隙的工程注记。",
      "Engineering annotations on rigid armor tiles and joint articulation clearances.",
      "The Art of The Batman",
      BOOK_3,
      SHEET,
    ),
    plate(
      "/media/gear-archive/suit-underlayer.jpg",
      "战衣内层与背部系带",
      "Batsuit underlayer and back lacing",
      "BM_21 服装实物与概念图揭示胸甲卸下后的调节系带、风琴褶弹性区与防割贴身结构。",
      "Costume photography (BM_21) and concept art expose the adjustment lacing, pleated flex bellows, and slash-proof under-suit beneath the chest plates.",
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
      "厚质植鞣皮手工缝合而成的深陷骨相头罩，配备仿生仿椎骨节活动颈圈，实现转头自由与实战抗击。",
      "A hand-stitched thick leather cowl with sunken cranial planes and an articulated bionic vertebra neck collar, granting unhindered head rotation and blunt-force protection.",
    ),
    film: bilingual(
      "硬朗折线紧贴面部骨骼，外露下颌与深邃眼周让视线表演极具杀伤力，摘下头罩后眼周残存的油彩更彰显执法的病态投入。",
      "Crisp angular contours hug the facial skull while an exposed jaw and shadowed eyes focus Bruce's penetrating gaze, with smeared black eye makeup underscoring obsessive nocturnal commitment.",
    ),
    design: bilingual(
      "摒弃传统乳胶注模的光滑质感，选用手工皮革拼接与深陷眼眶雕琢，颈部多节活动甲片彻底解决了历代战衣转头受阻的机械痼疾。",
      "Rejecting smooth molded latex, the cowl adopts hand-pieced leather with deep skull-like indentations, while articulated neck vertebrae permanently resolve the head-turning mobility limitations of previous Batsuits.",
    ),
    plates: [
      plate(
        "/media/gear-archive/cowl.jpg",
        "头罩造型研究",
        "Cowl studies",
        "不同视角展现眼窝骨相凹陷、手工针脚折面与仿椎骨活动护颈。",
        "Multi-angle studies displaying sunken orbital sockets, hand-stitched leather planes, and articulated vertebra neck plates.",
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
      "嵌入胸甲凹槽的高强度磁吸蝙蝠徽记，可瞬间拔出并展开为双刃战术折叠刀（Blade 20），兼具身份图腾与重型破障功用。",
      "A high-strength magnetized bat emblem recessed into the chest armor, instantly detachable and deploying into a dual-bevel folding tactical knife (Blade 20) for emergency breaching.",
    ),
    film: bilingual(
      "哥谭广场花园终局救援中，布鲁斯从胸膛拔出这柄磁吸折刀，斩断悬垂的万伏高压落水绝缘电缆，令图腾升华为舍身救赎的工具。",
      "In the Gotham Square Garden flood finale, Bruce unholsters this magnetized folding blade to sever a dangling live high-voltage cable, transforming the vengeance icon into an instrument of life-saving sacrifice.",
    ),
    design: bilingual(
      "Glyn Dillon 将蝙蝠双翼的负空间雕琢为极度锋利的切割双刃，机加工实物样件验证了磁力定位卡槽的插拔公差与折叠铰链强度。",
      "Glyn Dillon sharpened the negative space of the bat wings into high-angle cutting bevels, using machined physical prototypes to calibrate magnetic retention tolerances and folding hinge shear strength.",
    ),
    plates: [
      plate(
        "/media/gear-archive/emblem.jpg",
        "徽记与胸甲",
        "Emblem and chest armor",
        "胸甲深槽预留卡位与双翼负空间开刃轮廓。",
        "Recessed chest pocket retention and sharpened wing negative-space profiles.",
        "The Art of The Batman",
        BOOK_3,
        SHEET,
      ),
      plate(
        "/media/gear-archive/chest-knife-sketch.jpg",
        "胸前刀的折叠与握持研究",
        "Chest knife folding and grip studies",
        "Blade 20 工程草图标注刀脊加强筋、防滑齿纹与折叠定位销，阐明高强磁吸底座固定原理。",
        "Blade 20 engineering drafts detailing spine gussets, jimping, and detent pins, explaining high-strength magnetic retention.",
        "The Art of The Batman",
        BOOK_3,
        SHEET,
      ),
      plate(
        "/media/gear-archive/chest-knife-prototypes.jpg",
        "徽记刀轮廓与实物样件",
        "Emblem knife profiles and physical samples",
        "数控铣削金属样件展示刃部厚度、转轴铰链与抗反光发黑涂层。",
        "CNC-milled metal prototypes demonstrating blade thickness, pivot hinges, and anti-glare blackened finishes.",
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
      "高密度重磅垂坠披风与一体化紧急翼装滑翔系统，兼顾幽灵般的暗夜剪影与高空跳伞的生死逃逸。",
      "A high-density draping cape integrated with an emergency wingsuit deployment system, balancing spectral nocturnal presence with a high-risk aerial escape.",
    ),
    film: bilingual(
      "警局顶楼被重围时的亡命一跃：披风骤然绷紧为冲压式翼装掠过摩天楼峡谷，低空开伞撞击迫降将飞行的脆弱致命感推向极致。",
      "A desperate plunge off the police headquarters roof: the cape snaps into a ram-air wingsuit gliding through concrete canyons, before a turbulent parachute landing lays bare the mortal hazards of flight.",
    ),
    design: bilingual(
      "四视图与俯身动态稿确立了布料自肩甲褶皱垂落的重力走势与遮蔽逻辑，翼装则以现代极限跳伞织物和机械束带还原其自制原型的粗粝感。",
      "Four-view and crouching motion sheets define the gravitational drape and armor coverage originating from shoulder pleats, while the wingsuit channels extreme skydiving textiles and mechanical webbing to reflect a homebrewed prototype.",
    ),
    plates: [
      plate(
        "/media/gear-archive/cape-real.jpg",
        "披风服装实物",
        "Physical costume cape",
        "电影服装实物背重视角：厚质仿真皮革与密织防水布料自立领与肩甲褶皱垂落，展现出具压迫感的暗夜幽灵剪影。",
        "Rear view of the production film costume: heavy faux leather and dense water-resistant textile draping from the stand-up collar and shoulder pleats, presenting an imposing, spectral nocturnal silhouette.",
        "The Batman · 电影服装档案",
        {
          source: "The Batman · 电影服装实物档案",
          sourceUrl: "https://titanbooks.com/70868-the-art-of-the-batman/",
          sourceTier: "archive",
        },
        SHEET,
      ),
      plate(
        "/media/gear-archive/wingsuit-sketch.jpg",
        "翼装展开概念手稿",
        "Wingsuit deployment concept sketches",
        "Glyn Dillon 绘制的翼装变形三阶段解构手稿：展示披风如何拉伸套入双臂袖套与双腿绑带，在冲压充气作用下化身为极限滑翔翼装的粗粝机械逻辑。",
        "Three-stage wingsuit deployment study by Glyn Dillon: demonstrating how the cape zips along the sleeves, loops over the legs, and snaps into a ram-air wingsuit for emergency high-altitude gliding.",
        "The Art of The Batman · Glyn Dillon",
        DILLON,
        CONCEPT,
      ),
    ],
  },
  {
    id: "gauntlet",
    name: bilingual("战术护臂", "Gauntlets"),
    category: bilingual("前臂", "Forearms"),
    hotspot: { x: 90, y: 51 },
    summary: bilingual(
      "整合外侧五联装高抗拉钢手里剑（Bō-Shuriken）与腕内弹簧滑轨发射机构的重装前臂护甲，辅以双道缝线重单宁布内衬与 F-Lock 战术扣。",
      "Heavy forearm armor integrating five outer high-tensile steel Bō-Shuriken rods and an inner spring slide track, lined with double-stitched heavy denim and secured by F-Lock tactical buckles.",
    ),
    film: bilingual(
      "前臂护具在重拳挥击时充当格挡硬盾，掌侧发射器在弹簧滑轨驱动下出鞘送至掌心，与战术手套紧密咬合构筑攻防一体的中枢。",
      "The gauntlet acts as a rigid parrying shield during strikes, with the palm-side launcher riding forward on spring slide tracks into the grip to form an integrated offensive and defensive hub.",
    ),
    design: bilingual(
      "设计稿深入拆解了腕部弹簧滑轨释放、外侧五联装储架、掌面扳机联动与抗冲击重单宁衬垫，使隐藏工具的瞬间就位兼备严密机械逻辑。",
      "Technical sketches break down the spring-loaded wrist slider release, outer five-spike rack, palm trigger linkage, and shock-absorbing heavy denim lining, anchoring instant tool deployment in rigorous mechanics.",
    ),
    plates: [
      plate(
        "/media/gear-archive/grapnel.jpg",
        "护臂与抓钩组合",
        "Gauntlet and grapnel assembly",
        "双臂护甲总成、掌心出鞘姿态与手套指节咬合状态。",
        "Bilateral forearm assembly, deployed grip posture, and glove knuckle integration.",
        "Glyn Dillon",
        DILLON,
      ),
      plate(
        "/media/gear-archive/gauntlet-sketch.jpg",
        "护臂手绘结构稿",
        "Gauntlet construction sketches",
        "手绘原始注记标注外侧手里剑储架、双道缝线单宁布与 F-Lock 扣带。",
        "Original handwritten notes specifying the outer Bō-Shuriken rack, double-stitched denim, and F-Lock straps.",
        "The Art of The Batman",
        BOOK_4,
        SHEET,
      ),
      plate(
        "/media/gear-archive/gauntlet-assembly.jpg",
        "护臂展开与掌侧结构",
        "Gauntlet deployment and palm-side assembly",
        "小臂内侧弹簧滑轨滑块与外侧钢刺储架的物理隔离结构。",
        "Physical separation between inner spring-loaded slider rails and outer throwing-rod brackets.",
        "The Art of The Batman",
        BOOK_4,
        SHEET,
      ),
      plate(
        "/media/gear-archive/gauntlet-trigger.jpg",
        "护臂扳机与挂载点",
        "Gauntlet trigger and attachment points",
        "掌侧触发行程、卷盘制动销与贴合腕骨的弧形底板。",
        "Palm-side trigger stroke, spool brake pawl, and carpal-contoured baseplate.",
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
      "藏于护臂内侧的微型高压抓钩发射器与合金鱼叉系统，赋予布鲁斯纵向穿梭摩天楼钢架与绝境攀升的机动能力。",
      "A high-pressure micro grapnel launcher and alloy harpoon stowed beneath the gauntlet, granting Bruce vertical ascension across skyscraper girders and structural heights.",
    ),
    film: bilingual(
      "决战体育馆穹顶的高空纵跃与钢梁悬挂：从袖内瞬间翻出击发，线缆受力紧绷将蝙蝠侠急速拽向黑暗高处，化绝险为制胜先机。",
      "High-altitude leaps and beam hangs across the stadium rafters: flicked from the sleeve to fire in a split second, its taught steel cable hoists Batman into darkness, seizing the tactical high ground.",
    ),
    design: bilingual(
      "Glyn Dillon 与 Matthew Savage 将鱼叉穿甲头、紧凑高转速收线卷盘与前臂隐蔽导轨熔铸为一体，凸显自制特种装备的精密机械质感。",
      "Glyn Dillon and Matthew Savage integrated a penetrative harpoon head, high-torque miniature retrieval reel, and concealed forearm guide rail into a cohesive piece of precision garage engineering.",
    ),
    plates: [
      plate(
        "/media/gear-archive/grapnel.jpg",
        "抓钩与鱼叉设计",
        "Grapple gun / harpoon",
        "条状合金发射总成、倒刺鱼叉头与符合握持手型的击发基线。",
        "Linear alloy launcher assembly, barbed penetrator dart, and ergonomic firing line.",
        "Glyn Dillon",
        DILLON,
      ),
      plate(
        "/media/gear-archive/harpoon-study.jpg",
        "鱼叉头与卷盘研究",
        "Harpoon head and reel studies",
        "实物道具与工程图纸对比展现收线绞盘齿轮组与微型高压喷口。",
        "Prop photos beside blueprints detailing the retrieval spool gear train and micro-pressure muzzle.",
        "The Art of The Batman",
        BOOK_5,
        SHEET,
      ),
    ],
  },
  {
    id: "belt",
    name: bilingual("实用腰带", "Utility belt"),
    category: bilingual("腰部", "Waist"),
    hotspot: { x: 62, y: 55 },
    summary: bilingual(
      "借鉴军警特勤标准的黑色模块化战术腰带，集成快拆金属锁扣、模组化硬壳附包与大腿防滑固定带。",
      "A modular black tactical duty belt derived from military and SWAT standards, featuring rapid-release metal buckles, rigid pouches, and anti-slip thigh drop rigs.",
    ),
    film: bilingual(
      "紧锁于战衣腰腹的核心收纳矩阵：随手取用投掷爆破、急救止痛与夜视侦查工具，赋予暗夜执勤持续高效的作战续航。",
      "The central storage matrix girding the torso: instant access to breaching charges, trauma medicals, and night-vision gear ensures extended operational endurance on night patrol.",
    ),
    design: bilingual(
      "彻底告别漫画传统的黄金亮色，选用退役军警重磅黑色皮革与高强度考杜拉尼龙，建立可采购、易维护的现代执法装具逻辑。",
      "Abandoning the comic book's gold-yellow palette, the design adopts surplus SWAT black leather and rugged Cordura nylon, grounding the loadout in real-world procurement and maintenance.",
    ),
    plates: [
      plate(
        "/media/gear-archive/belt.jpg",
        "腰带与装具布局",
        "Belt and equipment layout",
        "三维概念模型呈现前后腰袋配重、快拆锁扣与大腿绑带工位。",
        "3D model demonstrating front-to-back pouch counterweights, quick-release buckles, and thigh rigs.",
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
      "集成视网膜级微型摄像头、虹膜生物识别与低照度录像的侦查隐形眼镜系统，连通后方情报基座实现虚实情报穿透。",
      "A surveillance contact lens system integrating retinal micro-cameras, biometric facial recognition, and low-light feeds, tethered to Wayne Tower data docks.",
    ),
    film: bilingual(
      "协助瑟琳娜潜入冰山俱乐部深处：以第一人称主观视点实时猎杀高层权贵的罪恶隐秘，将侦查前线与暗中策应紧密交织。",
      "Facilitating Selina's infiltration into the depths of the Iceberg Lounge: streaming first-person POV to expose corrupt elites while coordinating her every move from the shadows.",
    ),
    design: bilingual(
      "Matthew Savage 打造了微型环形同心电路镜片、密封便携收纳盒与工业风转存读取基座，完整呈现前沿微电子道具的工业闭环。",
      "Matthew Savage developed concentric micro-circuitry lenses, a hermetic travel container, and a rugged field data dock, completing a credible microelectronic prop ecosystem.",
    ),
    plates: [
      plate(
        "/media/gear-archive/lens.jpg",
        "记录镜片",
        "Recording lenses",
        "镜片边缘蚀刻的同心金线回路与微观电感耦合触点。",
        "Concentric gold circuit traces and inductive micro-contacts etched along the optic.",
        "Matthew Savage",
        SAVAGE,
      ),
      plate(
        "/media/gear-archive/lens-case.jpg",
        "镜片收纳盒",
        "Lens case",
        "防潮防震密封收纳盒内部双仓结构与浸润液槽。",
        "Dual-chamber shockproof travel case with fluid-filled resting wells.",
        "Matthew Savage",
        SAVAGE,
      ),
      plate(
        "/media/gear-archive/lens-reader.jpg",
        "镜片读取器",
        "Lens reader",
        "铣削铝合金外壳、镀金探针触点阵列与高带宽传输接口。",
        "Milled aluminum chassis with gold pogo-pin arrays and high-bandwidth interfaces.",
        "Matthew Savage",
        SAVAGE,
      ),
    ],
  },
  {
    id: "sticky-bomb-gun",
    usageLabel: bilingual("用途与构想", "Use & concept"),
    name: bilingual("黏弹发射器", "Sticky bomb gun"),
    category: bilingual("随身工具", "Portable tool"),
    summary: bilingual(
      "以气压推进发射模块化微型破障黏弹的紧凑战术发射器，专为远距离定点爆破与建筑结构瓦解而生。",
      "A compact tactical launcher utilizing pneumatic air propulsion to fire modular sticky charges for remote breaching and structural demolition.",
    ),
    film: bilingual(
      "战衣之外的独立重型破障手持工具：在突击攻坚中发射磁吸黏弹，实现对铁门、承重柱与机电中枢的定点摧毁。",
      "An independent heavy breaching tool beyond the suit: firing magnetic adhesive charges during assaults to dismantle steel gates, load-bearing pillars, and electrical relays.",
    ),
    design: bilingual(
      "Jamie Wilkinson 提出气压推进气瓶与侧向供气导管构想，机械线稿与工业渲染图并置呈现了粗粝坚固的单兵爆破武器演进。",
      "Jamie Wilkinson devised the pneumatic gas canister and lateral feed-tube layout, with mechanical drafts and industrial renders charting the evolution of a rugged breaching weapon.",
    ),
    plates: [
      plate(
        "/media/gear-archive/sticky-render.jpg",
        "黏弹枪外观方案",
        "Sticky bomb gun render",
        "亚光黑硬质阳极氧化着色外观，展现顶部高压气瓶仓与粗壮发射管。",
        "Matte black hard-coat render highlighting the top gas canister bay and heavy launch tube.",
        "The Art of The Batman",
        BOOK_5,
        SHEET,
      ),
      plate(
        "/media/gear-archive/sticky-sketch.jpg",
        "黏弹枪结构研究",
        "Sticky bomb gun construction",
        "工程草图拆解侧面供气管路（Gas Fed Tubes）、气动稳压阀与扳机保险机构。",
        "Engineering sketches dissecting lateral gas-feed tubes, regulators, and trigger safeties.",
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
      "以重型防撞通体钢梁为脊柱、外露后置双涡轮 V8 引擎与喷气推力为核心的粗粝改装肌肉战车，化身为雨夜哥谭的机械恶兽。",
      "A brutalized custom muscle car built around a massive full-length crash steel spine, an exposed twin-turbo V8, and rear jet propulsion—manifesting as a mechanical terror through rain-slicked Gotham.",
    ),
    film: bilingual(
      "公路追击企鹅人的雨夜狂飙：低沉轰鸣与排气烈焰压碎黑夜，坚不可摧的冲撞钢梁在烈火中破空飞跃，确立哥谭最可怕的机械威慑。",
      "The rain-slicked highway hunt for the Penguin: thunderous exhaust rumbles and jet backfires rip through the darkness, as an impenetrable crash frame punches through fireballs to establish Gotham's ultimate vehicular fear.",
    ),
    design: bilingual(
      "Ash Thorp 与 James Chinlund 确立‘功能第一’的重工改装理念；实拍制作打造 4 辆特技车，兼顾跳跃冲撞与前部火焰特效机位。",
      "Ash Thorp and James Chinlund established a 'function-first' heavy-modification doctrine; four stunt vehicles were built for production, reconciling massive jumps with front-mounted flame rigs.",
    ),
    plates: [
      plate(
        "/media/gear-archive/batmobile-a.jpg",
        "蝙蝠战车 · 视角一",
        "Batmobile · view 01",
        "低矮宽体剪影、前冲保险杠与棱角分明的重装防暴前脸。",
        "Low-slung widebody silhouette, aggressive push-bumper, and chiseled front prow.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/batmobile-frame.jpg",
        "战车车架与防滚结构",
        "Batmobile frame and roll cage",
        "透视草图解析从前防撞杠贯穿至车尾的巨型通体防撞钢梁与乘员舱防滚笼架。",
        "Perspective drafts mapping the massive full-length steel crash spine and cabin roll cage.",
        "The Art of The Batman",
        BOOK_CAR,
        SHEET,
      ),
      plate(
        "/media/gear-archive/batmobile-rear-structure.jpg",
        "后部承力结构与轮胎研究",
        "Rear structure and tyre studies",
        "工程草图推敲后悬挂行程、引擎防弹防护板、冷却间隙与特制蝙蝠纹热熔轮胎。",
        "Drafts analyzing rear suspension travel, ballistic engine shielding, cooling clearances, and custom bat-tread tires.",
        "The Art of The Batman",
        BOOK_CAR,
        SHEET,
      ),
      plate(
        "/media/gear-archive/batmobile-b.jpg",
        "蝙蝠战车 · 视角二",
        "Batmobile · view 02",
        "斜后方透视展现后轮上方外露双涡轮增压总成与中央喷气喷口布局。",
        "Rear three-quarter view highlighting the twin-turbo block over the axle and central jet nozzle.",
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
      "与战衣同源的黑色高机动突击机车，以紧凑窄身、裸露机械与极简涂装穿透哥谭复杂的狭窄街巷。",
      "A high-mobility tactical motorcycle sharing the Batsuit's DNA, navigating Gotham's dense alleys with a compact frame, exposed mechanicals, and stark black livery.",
    ),
    film: bilingual(
      "穿梭于常规四轮载具无法逾越的建筑缝隙与暗巷，在公路终局与瑟琳娜并辔告别，寄托蝙蝠侠在暗夜中的另一重敏捷维度。",
      "Slicing through alley gaps and architectural choke points impassable to cars, before parting ways with Selina along sunrise roads to reveal Batman's agile persona.",
    ),
    design: bilingual(
      "Ash Thorp 将紧凑车架、倒置前叉与厚重轮胎熔铸为一体，追求贴地骑乘姿态与纯粹机械力量感。",
      "Ash Thorp fused a tight trellis frame, inverted forks, and chunky tires to create a low-slung riding stance steeped in mechanical heft.",
    ),
    plates: [
      plate(
        "/media/gear-archive/batcycle-a.jpg",
        "蝙蝠机车 · 视角一",
        "Batcycle · view 01",
        "俯冲进攻性人机骑乘三角、倒置前叉减震与极简防弹整流罩。",
        "Forward-leaning attack riding triangle, inverted forks, and minimalist ballistic fairing.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/batcycle-b.jpg",
        "蝙蝠机车 · 视角二",
        "Batcycle · view 02",
        "侧面机械透视呈现紧凑发动机中置包络、外露链条与重载后摇臂。",
        "Profile perspective revealing compact engine packaging, exposed drive chain, and heavy swingarm.",
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
      "以 Honda CB750 车架为基底深度改装的 Café Racer 复古街跑，秉承‘功能第一、零件易修’美学，助布鲁斯以平民身份隐匿潜行。",
      "A stripped-down Café Racer built on a Honda CB750 frame, championing a 'function-first, easily repairable' aesthetic to keep Bruce invisible on Gotham's streets.",
    ),
    film: bilingual(
      "兜帽工装与街头改装机车浑然一体：让布鲁斯在穿上重装战衣之前，以未被察觉的街头骑手姿态搜集哥谭最阴暗角落的情报。",
      "The hooded workwear and street-custom motorcycle merge seamlessly: allowing Bruce to gather intelligence in Gotham's darkest corners as an unnoticed rider before donning the armor.",
    ),
    design: bilingual(
      "艺术指导 James Chinlund 盛赞其为布鲁斯自制审美的核心跳动心脏；其紧凑精炼的裸露车架线条直接反哺了蝙蝠机车与战车的研发。",
      "Production designer James Chinlund celebrated the bike as the beating heart of Bruce's design aesthetic, its lean exposed chassis directly informing the Batcycle and Batmobile.",
    ),
    plates: [
      plate(
        "/media/gear-archive/drifter-a.jpg",
        "流浪者机车 · 视角一",
        "Drifter · view 01",
        "扁平修长油箱、经典双摇篮钢管车架与复古平直座垫构成的街跑形态。",
        "Café racer stance defined by an elongated tank, double-cradle steel frame, and flat bench saddle.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/drifter-b.jpg",
        "流浪者机车 · 视角二",
        "Drifter · view 02",
        "外露机械部件与高位排气管，便于日常徒手快速检修火花塞与油路。",
        "Exposed mechanicals and high pipes allowing rapid roadside maintenance of plugs and carburetors.",
        "Ash Thorp / ALT Creative",
        THORP,
      ),
      plate(
        "/media/gear-archive/drifter-bike-study.jpg",
        "Honda CB750 基础与 Café Racer 改装",
        "Honda CB750 base and Café Racer design",
        "Honda CB750 原型基础与改装构想，展现‘零件随时可换、结构毫无多余’的自修车库哲学。",
        "Honda CB750 donor base and modification studies embodying an unadorned garage-built philosophy.",
        "The Art of The Batman",
        BOOK_BRUCE,
        SHEET,
      ),
    ],
  },
];

type GearDetails = Pick<ArchiveGear, "filmDetails" | "designDetails">;

const ARCHIVE_DETAILS: Record<string, GearDetails> = {
  suit: {
    filmDetails: [
      bilingual(
        "这套战衣属于布鲁斯出勤第二年的战术原型：它绝非无懈可击的完美战甲，而是一套留满弹坑、裂口与油泥的硬核工装。胸部与主要脏器由重型分块装甲严密覆盖，在走廊交火中能够硬抗霰弹枪近距离轰击；而内衬贴身层与外置绑带则确保他在高空跃降、极限冲刺和洪灾重水中能够维持连续作战。",
        "This suit is Bruce's Year Two tactical prototype: far from an immaculate uniform, it is a battle-worn working kit pitted with ballistic scars, gouges, and grime. Heavy segmented plates guard the chest and vital organs—stopping point-blank shotgun blasts in hallway ambushes—while the fitted underlayer and exterior strapping sustain mobility across roof jumps, sprints, and floodwaters.",
      ),
      bilingual(
        "影片彻底剥离了超级英雄装备的‘无敌光环’，将穿着者的生理局限转化为真实的银幕压迫感。沉重的防弹插板带来了不可避免的自重负担与迟滞钝感，每一次格挡、摔击和踉跄受创都清晰可辨，展现出一个凡人在血肉之躯与钢铁护甲夹缝中苦苦支撑的实战质感。",
        "The film strips away all invulnerable superhero armor tropes, turning mortal physical limits into visceral screen tension. Heavy ballistic plates carry palpable mass and fatigue; every parry, bone-crunching slam, and staggering impact registers physically, portraying a mortal man operating at the bleeding edge between flesh and forged steel.",
      ),
    ],
    designDetails: [
      bilingual(
        "设计总监 Glyn Dillon 与服装总监 Pierre Bohanna 面临的核心命题是‘重装防御与极端敏捷的妥协’。他们借鉴俄罗斯高空压力服的侧肋与后背系带系统，使护甲能随剧烈呼吸和体格起伏自由收放；同时解构现代马术越野防护背心（Equestrian Vest）的分块浮动结构，将胸腹护甲切分为彼此咬合又互不阻碍的多边形滑移模块。",
        "Costume supervisors Glyn Dillon and Pierre Bohanna tackled the central challenge of reconciling heavy armor with extreme agility. They adapted the side and back lacing from Russian high-altitude pressure suits, allowing the rig to expand with heavy breathing and exertion, while deconstructing modern equestrian shock vests into segmented, floating ballistic tiles that articulate without pinching.",
      ),
      bilingual(
        "整套战衣的明缝粗线、工业卡扣与织物折痕均具备明确的工程荷载用途。它们并非平面美术的装饰性肌理，而是承担着分摊防弹板撞击动能、固定内层防割衬垫与锚定披风拉力的机械系统，直观呈现出布鲁斯在韦恩塔地下车间手工车削、铆接与缝制的粗粝工程起源。",
        "Visible heavy-gauge stitching, industrial buckles, and fabric seams serve strict mechanical load-bearing functions. Rather than cosmetic surface styling, they distribute ballistic impact forces, secure slash-proof inner liners, and anchor cape tension, immediately establishing the suit as a hand-machined, riveted, and stitched prototype built in the Wayne Tower workshop.",
      ),
      bilingual(
        "服装实物（BM_21）清晰展示了卸下胸甲后的贴身连体结构：背部脊柱两侧贯穿连续调节系带，肩背交界处嵌入高弹力风琴褶膨胀区，确保布鲁斯在全力挥拳与侧向翻滚时背阔肌不受牵拉。前胸硬壳护甲与后背柔性拉伸区的精密配合，实现了高强度防弹与格斗动态自由度的精密闭环。",
        "The physical costume garment (BM_21) reveals the underlying construction once the chest plates are removed: dual continuous adjustment lacing flanking the spine, with elastic bellows inserts across the shoulder blades so the latissimus dorsi can fully extend during punches and rolls. Rigid front plating and a flexible rear harness form a seamless functional loop between ballistic coverage and combat articulation.",
      ),
    ],
  },
  cowl: {
    filmDetails: [
      bilingual(
        "头罩精确勾勒出鼻梁、眉弓与下颌的骨骼起伏，完全剔除遮蔽情感的僵硬面具感。雨夜审讯与现场勘验中，布鲁斯的冰冷目光从深凹眼窝中直刺目标；摘下头罩后未擦拭的黑色油彩，则无缝缝合了暗夜判官与枯槁继承人之间的撕裂人格。",
        "The cowl tightly traces the cranial ridge, brow, and jawline, doing away with the rigid stiffness of traditional hero masks. In rain-soaked interrogations and crime scenes, Bruce's gaze pierces outward from deep ocular hollows; stripped bare, his sweat-smeared black cosmetic makeup exposes the fractured psyche between urban reaper and hollowed heir.",
      ),
      bilingual(
        "紧绷的皮革外壳在低照度街灯与枪火映照下泛出哑光质感，耳部短促尖锐的几何折角不仅构筑了辨识度极高的恐惧图腾，更在近距离头部撞击与地面缠斗中承受着直接的钝器刮蹭。",
        "The taut leather shell yields a muted, matte sheen under sodium streetlamps and muzzle flashes. Sharp angular ear profiles cast an unmistakable terror silhouette, while the rugged hide absorbs direct scuffs and blunt abrasions during close-quarters headbutts and ground grappling.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 在初始草图中直接赋予了头罩类似死神颅骨的解剖学凹陷：太阳穴深陷、眼眶开阔硬挺、颧骨折面冷峻。这种雕塑语言让头罩仿佛是从布鲁斯痛苦紧绷的面孔与恐惧意象中直接硬化而生，彻底摆脱了批量工业模具套在头上的塑料轻浮感。",
        "In his earliest concept sketches, Glyn Dillon endowed the cowl with skull-like anatomical depressions: hollowed temples, stark orbital cutouts, and severe zygomatic planes. The sculptural form feels forged directly from Bruce's own strained bone structure and psychic terror, dispensing entirely with the buoyant plasticity of factory-molded rubber.",
      ),
      bilingual(
        "制作团队敲定采用厚质天然皮革进行立体分片剪裁与重磅针脚手工缝线。粗粝的手作针脚、皮革受压后的细密微皱以及边缘包边处理，赋予了这件头盔令人信服的‘车间自制’工业实体质感，忠实还原了布鲁斯在工作台上孤身打磨成型的器物灵魂。",
        "The fabrication team committed to thick full-grain leather, sculpted through multi-panel patterning and hand-stitched with heavy industrial thread. Visible saddle stitches, natural hide grain under tension, and reinforced rolled edges endow the cowl with a convincing handmade workshop reality—embodying an artifact Bruce chiseled and stitched alone at his workbench.",
      ),
      bilingual(
        "为了彻底解决历代银幕蝙蝠侠因一体式橡胶领无法扭头的结构痼疾，颈部创新性地引入了重叠咬合的仿生颈椎鳞片（Vertebra-like plates）。这些铰接硬片随着头部左右偏转与仰卧位自然滑移，既构筑了无懈可击的防割喉保护层，又赋予帕丁森 180 度毫无阻滞的实战观察视野。",
        "To permanently solve the infamous screen limitation where rigid rubber cowls prevented actors from turning their necks, the collar introduces overlapping bionic vertebra-like articulated plates. These interlocking tiles slide smoothly across each other as the head turns and tilts, providing impenetrable slash protection to the throat while granting Pattinson full, effortless 180-degree combat vision.",
      ),
    ],
  },
  "chest-blade": {
    filmDetails: [
      bilingual(
        "胸前徽记初登场时宛如战衣胸膛铸就的冷硬装甲纹章；直至体育馆穹顶崩塌的决战终局，它才爆发出真正的战术使命：面对坠向洪流、即将电击数十名市民的万伏高压落水绝缘电缆，布鲁斯毫不犹豫地自胸口拔下这柄磁吸双刃折刀，飞身凌空斩断电缆。符号在这一刹那从宣泄仇恨的恐惧印记蜕变为斩断死神的实用器械。",
        "The chest emblem initially reads as a cold cast insignia forged into the breastplate. Only in the cathedral-like rafters of the flooded stadium does its true tactical purpose erupt: facing a snapped live high-voltage cable threatening dozens stranded below, Bruce unholsters the magnetized blade and hurls himself into the air to shear the cable. In that instant, the emblem ceases to be a symbol of vengeance and becomes a lifesaving cutting tool.",
      ),
      bilingual(
        "这种将身份图腾与应急求生工具合二为一的实战哲学，彻底瓦解了以往蝙蝠标志仅具被动象征意义的刻板印象。它是一件在危急关头能被戴着厚重手套的大手瞬间抽离、贴身破障割绳的高碳钢部件，每一寸金属倒角都服务于最残酷的物理破坏力。",
        "This philosophy of merging identity with emergency extraction shatters the convention of passive superhero crests. It is a high-carbon steel component designed to be wrenched loose by heavily gloved hands to hack lines and breach barricades under extreme duress, with every beveled edge calculated for raw physical shearing power.",
      ),
    ],
    designDetails: [
      bilingual(
        "主概念设计师 Glyn Dillon 认为，布鲁斯绝不会在战衣上缝制毫无意义的皮革软标。他敏锐地捕捉到蝙蝠双翼的外扩轮廓天然具备折刀手柄与双刃锋刃的对称几何，将双翼展开的负空间推向内凹开刃的战术刀锋。它必须在百米开外呈现令人战栗的蝙蝠剪影，而在近距离掌中则是一柄毫无花哨的机械凶器。",
        "Lead concept artist Glyn Dillon reasoned that Bruce would never stitch a decorative soft badge onto combat gear. He noted that the outstretched bat wings naturally mirrored the symmetrical geometry of folding knife grips and dual cutting bevels, grinding the negative wing space into keen inner edges. It reads as a chilling bat silhouette from afar and an uncompromising mechanical weapon in the hand.",
      ),
      bilingual(
        "徽记折刀（工程代号 Blade 20）通过精密高强磁吸底座牢靠嵌合在胸甲中央深槽中，在疾速冲刺与近身中弹时纹丝不动，但在手指扣紧刀脊施加特定角度拉力时即可顺畅出鞘。Blade 20 迭代手稿重点攻关了刀脊加强筋、指槽防滑纹路与折叠转轴自锁销，使蝙蝠双翼在贴胸状态下平整如甲，拔出后迅速锁死为刚性长刃。",
        "The folding emblem knife (designated Blade 20) docks flush into a recessed cavity via high-strength magnets—remaining rigidly locked during sprints and ballistic impacts, yet releasing cleanly when gripped at a calibrated angle. The Blade 20 technical sheets refined spine gussets, ergonomic jimping, and folding detent locks, ensuring the wings lie flat as armor on the chest yet lock rigidly into a formidable cutting instrument.",
      ),
      bilingual(
        "设定集收录的机加工实物样板详尽呈现了其从 2D 矢量标志到金属硬质构件的研发历程：边缘倒角、减重开孔与铰链转轴均经过数控铣削验证，并对比了氧化发黑与战术拉丝涂层的抗反光性能。这是一件经过严格工程验证的实体装备，而非仅仅停留在概念图上的虚构摆设。",
        "Machined physical samples in the art book document the engineering evolution from 2D vector logo to tactile metal hardware: CNC-milled edge bevels, skeletonized lightening holes, and pivot pins were stress-tested alongside matte black oxide and brushed tactical coatings to eliminate specular glare. It is a rigorously vetted mechanical component rather than conceptual set dressing.",
      ),
    ],
  },
  cape: {
    filmDetails: [
      bilingual(
        "在常规的夜间潜行与站立镜头中，重磅特制织物披风自肩背垂直倾泻而下，巧妙遮覆了部分侧腹与后腰装具，在哥谭雨雾中勾勒出如鬼魅般的巨大三角剪影。布料吸饱雨水后的沉重垂坠感与行走时的迟滞拖曳，赋予了蝙蝠侠一种宛如哥特雕像复活般的厚重体量感。",
        "In routine night stalking, the heavy specialized weave cascades vertically from the shoulders and back, shrouding side-torso and belt equipment to forge a spectral triangular silhouette through Gotham's drizzle. The dragging heft of water-soaked fabric lends Batman the imposing physical presence of an awakened Gothic gargoyle.",
      ),
      bilingual(
        "而在市警局天台遭特警重围时，这件戏剧化的幽灵外袍被瞬间切换为机械极限逃生装置：布鲁斯拽下拉环，披风内层骨架与束带瞬间绷紧为翼装翼面，载着他在摩天楼峡谷间高速俯冲滑翔。在穿过高架桥底打开减速伞时，剧烈的高速撞击、翻滚重创与踉跄逃逸，彻底打破了传统披风滑翔‘宛如魔术’的轻盈幻想，呈现出近乎自杀式极限运动的生死搏命。",
        "Cornered on the GCPD roof, this phantom mantle instantaneously transforms into a mechanical escape rig: pulling deployment lanyards, the internal harness tensioning snaps the fabric into a taut wingsuit that hurtles through concrete canyons. Deploying a parachute beneath an overpass, the violent high-speed collision, rolling impact, and staggering limping escape shatter all illusions of magical gliding, revealing the raw mortality of extreme BASE jumping.",
      ),
    ],
    designDetails: [
      bilingual(
        "战衣带披风四视图（Turntable Sheet）精确标定了披风与躯干骨骼的工程比例：肩部褶皱向锁骨与胸甲外缘自然收紧，后背布料沿脊椎中心线形成垂直聚拢的深槽折痕，侧视图则严格留出双臂挥拳与拔取腰带工具的物理净空，确保宽大的织物绝不会缠绕前臂武器发射机构。",
        "The caped four-view turntable sheet calibrated exact engineering proportions between fabric and skeleton: shoulder folds tuck neatly against clavicles and chest armor, rear drapes form deep vertical flutes down the spine, and side views guarantee physical clearance for punching and belt access so expansive cloth never fouls forearm deployment rails.",
      ),
      bilingual(
        "俯身动态研究稿深入解构了披风在低伏潜行与冲刺俯身时的空气动力学表现：当躯干前倾压低重心时，披风面料如翅膀般自然向两侧滑落展宽，下摆边缘的多重不规则破损撕裂线在运动中扰乱敌方射击瞄准线，使披风从静态遮蔽物转化为动态伪装体。",
        "Crouching motion studies deconstruct the aerodynamics of fabric during low-profile stalking and sprints: leaning forward with a dropped center of gravity, the cape billows outward like bat wings, its jagged torn hem disrupting enemy aim points in motion and elevating the mantle from static shroud to active optical camouflage.",
      ),
    ],
  },
  gauntlet: {
    filmDetails: [
      bilingual(
        "护臂是蝙蝠战衣在近战视线焦点中最具破坏力的装具。在走廊和夜总会的狭窄空间肉搏中，厚重的淬火合金外壳屡次直接架开暴徒的铁棍重击与刺刀劈刺；沉重的合金棱角与手套指节在出拳时连成一体，将每一记直拳转化为具备破骨杀伤力的重锤。",
        "The gauntlets are the most destructive visual component of the Batsuit in hand-to-hand combat. In claustrophobic hallway and nightclub scuffles, the hardened alloy shell repeatedly deflects iron pipes and knife slashes; the heavy chiseled angles work seamlessly with armored glove knuckles to deliver bone-shattering blunt-force strikes.",
      ),
      bilingual(
        "两臂护甲的外观完全继承了整套战衣的实用战术语言：暗黑哑光涂层、工业级防滑滚花与防暴绑带，使护臂与大腿战术袋、重型作战靴形成严密的视觉统一。它不是华而不实的科幻臂铠，而是一套历经成百上千次街头血战反复加固的自制战术护件。",
        "Their surface treatment continues the suit's utilitarian ethos: matte black finish, industrial knurling, and riot-control strapping unify the forearms with thigh rigs and heavy boots. These are not ornamental sci-fi bracers, but field-tested armor plates rebuilt and reinforced through hundreds of brutal street encounters.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 与道具团队为护臂制定了严密的双侧分工：外侧安装容纳 5 枚高抗拉钢制投掷手里剑（Bō-Shuriken）的特制金属储架；腕部内侧则暗藏高精度弹簧滑轨，一旦拨动释放拨片，内置的抓钩发射器便会沿着前臂轨道瞬间向前弹射出鞘，直接卡入掌心虎口就绪发射。",
        "Glyn Dillon and the prop department engineered a strict bilateral division: the outer flank carries a dedicated metal rack for five high-tensile steel throwing rods (Bō-Shuriken); the underside houses a precision spring-loaded slide track, allowing the grapnel launcher to snap forward along the sleeve rail directly into the palm when tripped.",
      ),
      bilingual(
        "手绘结构图详尽标注了其内部工程细节：护甲内衬采用双道牢固缝线的重磅单宁耐磨布（Double stitched inner denim），外侧通过高强度 F-Lock 战术扣带紧扣小臂肌肉群，以化解抓钩发射与近战格挡带来的巨大剪切扭力；掌侧布局巧妙绕开手腕骨突，确保手掌在紧握方向盘或攀爬钢架时维持百分之百的活动度。",
        "Technical detail sketches document the underlying engineering: the base is lined with double-stitched heavy denim to cushion shock, secured around forearm musculature via high-strength F-Lock tactical webbing to absorb violent recoil and torsional twist, while contouring around the carpal bones leaves the wrist fully articulated for driving and climbing.",
      ),
    ],
  },
  grapnel: {
    filmDetails: [
      bilingual(
        "抓钩发射器将蝙蝠侠的作战维度从二维泥泞街道强行提升至哥谭摩天建筑的立体空域。在终局体育馆激战中，面对居高临下的步枪齐射，布鲁斯抬腕击发抓钩，倒钩利刃瞬间贯穿顶棚角钢，高扭力微型马达在轰鸣中将他的重装身躯猛烈提拉离地，逆转了地对空的致命被动。",
        "The grapnel hoists Batman's tactical domain from muddy two-dimensional streets into the towering vertical airspace of Gotham architecture. Facing rifle crossfire in the stadium finale, Bruce fires upward: the barbed harpoon bites deep into overhead structural steel, and a high-torque miniature motor yanks his armored frame aloft, reversing lethal high-ground disadvantage.",
      ),
      bilingual(
        "影片对抓钩的展现毫无超现实的违和轻巧，每一次攀升都伴随着绞盘承受上百公斤自重的刺耳金属啸叫、手臂肌肉承受拉力的剧烈颤抖以及线缆摆动撞向横梁的沉重回弹。这是凡人借助冷硬机械向重力发起的殊死挑战。",
        "The film depicts grapnel ascents with visceral physics rather than effortless superhero fantasy: every climb is accompanied by the screech of a stressed winch supporting hundreds of pounds, strained tendon vibrations, and jarring pendulum impacts against steel girders. It is a mortal defying gravity through unforgiving industrial engineering.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 的工程图版摒弃了科幻电影常见的宽体外置‘手枪式’抓钩，将其压缩为极度紧凑的条状合金总成。折叠鱼叉尖端配备倒刺锁定翼，高抗拉特种钢缆紧密缠绕在耐磨陶瓷导环卷盘内，发射管口精准指向握把前沿，形成了符合人体工学的自然直臂瞄准基线。",
        "Glyn Dillon's blueprint discarded bulky handheld sci-fi grapple pistols in favor of an ultra-compact linear alloy assembly. The folding harpoon head incorporates hardened locking barbs, high-tensile braided steel line wound on ceramic-guided spool drums, and a muzzle bore collinear with the wrist axis for intuitive point shooting.",
      ),
      bilingual(
        "设定集图版与实物道具对比揭示了鱼叉收放的机械联动：击发机构由前臂掌侧微动拨片触发，通过微型高压气瓶或火药底火将鱼叉高速推出；击中锚固后卷盘离合器瞬间锁紧，提供超过半吨的瞬时破断载荷。发射器外壳的战术倒角与护臂轨道槽严丝合缝，确保其在剧烈翻滚时绝无卡滞。",
        "Art-book plates beside physical prop photographs detail the firing sequence: the trigger is actuated via a micro-switch at the inner wrist, venting compressed gas or pyrotechnic impulse to launch the dart; once anchored, a centrifugal clutch locks the drum, rated for over a half-ton of instantaneous shock load. Beveled casing contours mate flush with forearm tracks to eliminate jams under violent combat tumble.",
      ),
    ],
  },
  belt: {
    filmDetails: [
      bilingual(
        "这条战术腰带与大腿侧装具构成了蝙蝠战衣唯一的移动武器库。在连续数小时的街头猎凶与雨夜搜捕中，布鲁斯无需任何外部后勤补给，仅凭腰间触手可及的特种附包即可完成破门突入、近距制服、线索取证与紧急止血，展现出孤狼执法者的战备自足。",
        "This tactical belt and thigh sub-loads constitute the Batsuit's sole mobile armory. Over continuous hours of nocturnal hunting and wet alley sweeps, Bruce requires zero supply drops, accessing breaching charges, non-lethal restraints, forensic swabs, and trauma meds from belt pouches to maintain lone-wolf operational independence.",
      ),
      bilingual(
        "在全身镜头中，哑光黑的装具包、厚实金属五金件与沉重大腿系带紧紧包裹着臀腿线条，将超级英雄的华丽幻想彻底拉回了特警突击队员上街执行高危反恐任务的冷峻现实情境之中。",
        "In wide shots, matte black pouches, utilitarian metal hardware, and heavy drop-leg straps hug the thighs and waist, wrenching superhero fantasy into the grim reality of a lone SWAT breacher mounting high-risk urban counter-terror entries.",
      ),
    ],
    designDetails: [
      bilingual(
        "Glyn Dillon 在设计之初便坚决确立了‘现实采购与手工魔改’路线。他摒弃了早期影视中带有科幻卡通感的亮黄塑料胶囊腰带，大量调研欧美退役军警特种装具，采用耐磨重磅植鞣皮与军规织带手工拼接，搭配快拆战术安全锁扣，使装具包即使在高速奔跑中也不会晃动击打躯干。",
        "Glyn Dillon established a strict 'surplus sourcing and custom modding' doctrine from day one. Rejecting the bright yellow sci-fi capsule belts of earlier adaptations, he researched retired SWAT tactical rigs, combining abrasion-resistant heavy leather with military-spec webbing and rapid-release buckles to prevent pouch bounce during dead sprints.",
      ),
      bilingual(
        "3D 三维概念图版与工具展开图详尽展示了空间的严苛微积分：三联装黏弹快拔夹、折叠双节棍套、抗冲击医用药筒、紫外线取证笔与高容量便携存储卡各安其位。所有附包的外沿尺寸与手指开合行程均经过人机工程学精密校准，确保戴手套时单手盲操准确率达到极致。",
        "3D concept models and equipment plates map out strict spatial ergonomics: a three-round magnetic charge caddy, folding nunchuck holster, shockproof medical syringe sheath, forensic UV pen, and high-capacity flash storage docks each occupy dedicated sectors. Every pouch lid and retention clasp is calibrated for flawless blind one-handed manipulation while wearing heavy combat gloves.",
      ),
    ],
  },
  "contact-lens": {
    filmDetails: [
      bilingual(
        "这套记录隐形眼镜将布鲁斯的暗夜侦探行动提升为高维度的协同侦查。当瑟琳娜戴着镜片潜入冰山俱乐部贵宾包厢时，布鲁斯在场外监听车内同步接收她眼中的每一帧画面——面部生物识别算法瞬时比对出腐败法官、警界内鬼与黑帮头目，将微型视网膜镜片化为刺入哥谭罪恶权力核心的手术刀。",
        "These recording contact lenses elevate Bruce's detective work into a synchronized remote recon operation. As Selina slips into the Iceberg Lounge's inner sanctum wearing the lenses, Bruce monitors her direct optical feed from his surveillance perch—biometric algorithms instantly unmasking corrupt judges, compromised cops, and mobsters, turning the retinal glass into a scalpel piercing Gotham's syndicate.",
      ),
      bilingual(
        "它在全片中重新定义了‘看见’的权力：不仅记录当下的罪证，更在夜深人静的地下车间内被反复逐帧回放、交叉索引。布鲁斯通过他人的双眼凝视深渊，使物证收集超越了常规物理探查的局限。",
        "The lenses redefine ocular power across the film: rather than merely observing crimes, footage is logged, indexed, and scrutinized frame-by-frame back in the underground workshop. Bruce gazes into the abyss through surrogate eyes, transcending the physical boundaries of conventional police forensics.",
      ),
    ],
    designDetails: [
      bilingual(
        "概念艺术家 Matthew Savage 为这一微型道具建立了高度可信的工业设计逻辑。镜片表面蚀刻有精密同心环微型线路与电感耦合充电接点，边缘极度纤薄以满足人体角膜耐受度；透明材质在特定侧光下折射出极具科技质感的微弱金色环状回路，既满足摄影机特写的视觉表现力，又符合严苛的微电子逻辑。",
        "Concept artist Matthew Savage crafted an exceptionally believable industrial aesthetic for this miniature prop. Concentric gold traces and inductive charging pads are etched across the lens periphery, engineered with microscopically thin margins for corneal tolerance; the optic catches glancing light with a subtle amber circuit ring, satisfying cinema macro lenses while remaining grounded in real-world microelectronics.",
      ),
      bilingual(
        "从便携式密封圆盒到车间内的重型镜片读取基座（Lens Reader），Savage 构筑了无懈可击的工作流链条：镜片取下后卡入带微型触点的浸润凹槽，读取器外壳采用铣削阳极氧化铝合金与三防密封圈，高速数据接口将未压缩原始视频直接导入韦恩塔主机，展现出韦恩工业顶尖技术秘密应用于私法执勤的独特背景。",
        "From the hermetic carry pill to the heavy desktop docking reader in the workshop, Savage mapped out an unbroken data chain: spent lenses seat into fluid-filled wells with gold contact pins, housed in CNC-milled anodized aluminum shells with weatherproof seals, transmitting uncompressed RAW video straight to the Wayne Tower mainframes.",
      ),
    ],
  },
  "sticky-bomb-gun": {
    filmDetails: [
      bilingual(
        "黏弹发射器属于布鲁斯随身武器库中的攻坚利器。面对加固防盗门或坚固障碍物，蝙蝠侠无需靠近即可在安全距离内将一枚高爆磁吸黏弹精准投送至目标铰链或锁具核心，凭借定向聚能爆破瞬间撕裂防线，为突入创造战术窗口。",
        "The sticky bomb gun is the heavy breach asset in Bruce's tactical quiver. Facing fortified blast doors or barricades, Batman projects a high-explosive magnetic charge against hinge pins or locks from standoff distance, breaching defenses with shaped-charge precision to force an instant tactical breach.",
      ),
      bilingual(
        "工具的实战逻辑突出了‘多用途投送’：黏弹既可手工直接贴附目标设定延时，也可装填入发射筒借助高压气体激发射出。这种双模部署让布鲁斯在瞬息万变的近距遭遇战中拥有极高的战术容错率。",
        "Its combat logic emphasizes dual-mode deployment: charges can be planted silently by hand with manual delay timers, or muzzle-loaded into the launcher barrel for pneumatic stand-off delivery. This flexibility grants Bruce immense tactical latitude in fluid, close-quarters breaches.",
      ),
    ],
    designDetails: [
      bilingual(
        "概念设计师 Jamie Wilkinson 在手绘线稿中详细拆解了其气动机械内核：筒身顶部整合高压微型气瓶仓，侧面布置平行气动导管（Gas Fed Tubes）与稳压阀；握把借鉴竞技气手枪的人机握持弧度，扳机联动双重保险机构，粗壮的短筒枪管可直接承受弹体初速膛压。",
        "Concept designer Jamie Wilkinson dissected the pneumatic core in annotated drafts: a high-pressure micro-canister chamber sits atop the receiver, flanked by parallel gas-feed conduits and pressure regulators; the ergonomic grip borrows from competition air pistols, pairing a double-action safety sear with a thick-walled launch tube.",
      ),
      bilingual(
        "设定集图版展示了从机械零件线稿到哑光黑硬质着色方案的转化。机匣表面的滚花防滑纹理、侧面外露管线与高对比度警示刻度，摒弃了一切流线型科幻装饰，使其宛如重工业车床加工出的专用破障工业母机，散发着冷酷的致命工业美感。",
        "The art-book sheets illustrate the transition from mechanical breakdown schematics to matte-black industrial renders. Knurled receiver textures, exposed high-pressure tubing, and high-visibility measurement scales abandon sleek sci-fi aesthetics in favor of a lathe-turned industrial breaching tool.",
      ),
    ],
  },
  car: {
    filmDetails: [
      bilingual(
        "在冰山俱乐部后巷的雨夜狂飙中，蝙蝠战车完成震撼全片的登场。在引擎点火之前，低沉如困兽咆哮的排气轰鸣、双涡轮增压泄压阀的锐啸与车尾喷出的幽蓝烈焰，首先在心理层面摧垮了企鹅人的防线；而在随后逆行公路上的疯狂碰撞中，战车更是凭借碾碎一切的重装吨位逆向穿透重重火海，完成犹如恶魔觉醒般的破空飞跃。",
        "In the rain-soaked alleys behind the Iceberg Lounge, the Batmobile executes a legendary cinematic entrance. Before moving an inch, the guttural roar of its exhaust, twin-turbo blow-off whistles, and blue jet afterburner flame terrorize the Penguin psychologically; during the reverse-flow highway carnage that follows, its sheer unyielding tonnage punches clean through wall-of-fire tanker explosions.",
      ),
      bilingual(
        "这辆战车绝非纤尘不染的高科技超跑，而是一台充满机油味、钣金焊缝与狂暴扭矩的工业巨兽。车头凹陷的刮痕、后轮甩起的泥浆与外露排气管的高温热浪，生动诠释了布鲁斯在地下车间耗时数百个不眠之夜亲手锻造出的复仇利刃。",
        "This machine is no pristine supercar; it is an industrial beast reeking of motor oil, unground welds, and savage torque. Dents across the prow, mud flung by rear slicks, and shimmering heatwaves off exposed manifolds manifest hundreds of sleepless nights Bruce spent fabricating his vengeance tool in the subterranean dark.",
      ),
    ],
    designDetails: [
      bilingual(
        "艺术指导 James Chinlund 与概念设计师 Ash Thorp 为战车确立了核心骨骼结构：一条从前保险杠一路贯穿至车尾的巨型重载钢结构中梁（Massive steel spine/element）。这根脊柱大梁充当终极吸能与抗撞击核心，确保车辆在数吨重力下高速撞击卡车或硬着陆飞跃时，乘员舱的防滚架完好无损。",
        "Production designer James Chinlund and concept artist Ash Thorp anchored the vehicle around a defining structural backbone: a massive heavy-duty tubular steel spine running unbroken from the front push-bumper to the rear tail. This central spine acts as the primary impact absorption beam, ensuring the cabin roll-cage survives brutal high-speed collisions and structural landings intact.",
      ),
      bilingual(
        "后置引擎舱的布局是设计团队攻关的机械焦点：后轮上方悬置大排量裸露双涡轮 V8 发动机，外侧紧邻粗大散热管道架与中央喷气推进推力喷口。手绘旁注详实记录了前后轴荷分配、发动机后方防弹保护、传动轴贯通乘员舱以及极端排气散热等现实机械难题，最终将所有工程妥协转化为充满攻击性的暴力美学。",
        "The exposed mid-rear engine bay represented the ultimate mechanical challenge: a massive twin-turbo V8 mounted directly over the rear axle, flanked by heavy cooling conduit trusses and a central jet thruster nozzle. Handwritten engineering notes debate axle weight distribution, ballistic protection for the rear block, cabin conduit packaging, and thermal management, transforming structural packaging constraints into aggressive, purposeful aesthetics.",
      ),
      bilingual(
        "为了满足严苛的实拍需求，特效团队打造了 4 辆各司其职的实体战车：3 辆搭载澎湃汽油引擎用于完成漂移甩尾、高速特技与腾空飞跃；第 4 辆则创新性地采用全电动底盘，其静音低振动特性不仅便于夜间城市拍摄，更在车头空出巨大的机舱空间，用于容纳制造前脸喷火特技的液化气喷射罐与控制管路。",
        "To meet demanding physical filming conditions, the effects team constructed four distinct full-scale vehicles: three high-output gasoline units built for power slides, drifts, and extreme ramp jumps; and a bespoke electric-drive rig whose silent operation facilitated night location work while freeing up front-end volume to house the liquefied gas tanks and burner hardware driving front-flame practical stunts.",
      ),
    ],
  },
  batcycle: {
    filmDetails: [
      bilingual(
        "蝙蝠机车是布鲁斯在哥谭最复杂的拥堵路网中保持机动的利刃。它摒弃了战车庞大车身带来的通行局限，能够以极高车速在废弃铁轨、施工管道与狭窄回廊中穿梭自如；紧凑轴距与低重心设计让蝙蝠侠能够将身躯紧贴油箱，化身为一道融入柏油路面的黑色闪电。",
        "The Batcycle is Bruce's surgical instrument for cutting through Gotham's congested grid. Free from the dimensional footprint of the Batmobile, it rockets through abandoned rail beds, construction tunnels, and narrow arcades; its compact wheelbase and dropped center of gravity allow Batman to tuck tightly over the tank like a streak of black lightning.",
      ),
      bilingual(
        "在影片尾声破晓时分的公路段落中，蝙蝠机车与瑟琳娜的座驾并辔疾驰，在晨雾中分道扬镳。两辆机车的引擎轰鸣在空旷公路上共振，将冷酷的执法机器沉淀为角色之间心照不宣的情感见证。",
        "In the dawn highway sequence near the finale, the Batcycle cruises wheel-to-wheel with Selina's bike before diverging into the morning mist. Their twin engine notes resonate across empty asphalt, transforming a cold combat weapon into a silent witness to unvoiced parting.",
      ),
    ],
    designDetails: [
      bilingual(
        "Ash Thorp 在概念探索中聚焦于机车车架、宽扁轮胎与骑手人机三角的极致平衡。车体前脸采用了几乎没有装饰的纯几何装甲护板，车把、倒置减震与仪表盘高度紧缩，营造出一种紧绷、俯冲且极具压迫感的进攻性骑姿。",
        "Ash Thorp's conceptual studies focused on the ergonomic rider triangle between frame, wide tires, and controls. The minimalist front cowl features stark geometric armor plate, while clip-on handlebars and inverted forks tuck tightly into the chassis to establish an aggressive, forward-crouching attack posture.",
      ),
      bilingual(
        "与流浪者机车相比，蝙蝠机车搭载了更具防御性的强化车体与特种防弹涂层，但两车依然共享着同一种工业自制语言：外露的排气管、金属链条与坚固脚踏均清晰展示着齿轮运转的物理机制，让载具始终保持为‘战衣的动力延伸’。",
        "Compared with the civilian Drifter bike, the Batcycle incorporates reinforced ballistic armor and tactical anti-radar coatings, yet both share the same handmade garage DNA: exposed exhaust header pipes, drive chain, and rugged pegs celebrate raw mechanical kinematics, functioning as a motorized extension of the Batsuit.",
      ),
    ],
  },
  drifter: {
    filmDetails: [
      bilingual(
        "流浪者机车是布鲁斯穿行哥谭市井的掩护载具。当他脱下披风与重铠、套上宽大的兜帽工装穿过人流密集的广场与码头时，这辆低调平实的街头机车让他完全融入数以万计的蓝领骑手之中，既不会引起巡警盘查，也不会让暗处的黑帮分子联想到韦恩家族的显赫财富。",
        "The Drifter bike serves as Bruce's urban stealth transport. Shedding cape and armor for oversized workwear to traverse crowded plazas and docks, this unassuming street machine disguises him among thousands of blue-collar commuters, drawing neither police scrutiny nor mob suspicion toward the Wayne billionaire lineage.",
      ),
      bilingual(
        "这种平民化移动方式在叙事上构成了布鲁斯从‘凡人观察者’向‘暗夜判官’转变的缓冲地带。后座背包内沉甸甸地装着蝙蝠战衣，他驾驶这辆机车静静注视着城市的罪恶流动，并在暗巷深处完成致命身份的瞬间蜕变。",
        "This civilian mobility creates a narrative threshold between mortal observer and nocturnal vigilante. With his Batsuit stowed in a heavy canvas backpack strapped behind him, he surveys the city's corrupt currents before pulling into an alley to complete his dark metamorphosis.",
      ),
    ],
    designDetails: [
      bilingual(
        "艺术指导 James Chinlund 明确指出，这辆基于本田 Honda CB750 车架打造的 Café Racer 是布鲁斯工程审美的跳动心脏：‘功能第一、便于维修’。布鲁斯背弃家族显赫财富，在地下车间全凭双手打造所有工具，因此他必须选择一辆部件完全外露、结构坚固且能随时随地更换火花塞与机油的实用机械。",
        "Production designer James Chinlund highlighted that this Café Racer, built around a Honda CB750 chassis, represents the beating heart of Bruce's design philosophy: 'function first, easily repairable.' Having turned his back on family luxury, Bruce builds everything with his bare hands, requiring an unpretentious platform with exposed mechanicals where spark plugs, carburetors, and lines can be maintained anywhere.",
      ),
      bilingual(
        "长形扁平油箱、手工缝线复古座垫与外露双摇篮车架构建了其极其紧凑精炼的机械线条。Chinlund 透露，正是这辆 Drifter 身上展现出的剥离装饰、裸露机械与工业骨架的设计语汇，深度反哺并启发了后续蝙蝠机车（Batcycle）与蝙蝠战车（Batmobile）的开发，使三款载具统一在同一个硬核改装者的精神内核之下。",
        "A classic elongated tank, hand-stitched flat saddle, and exposed double-cradle steel frame form a lean mechanical outline. Chinlund noted that the stripped-down, exposed-machinery language established on the Drifter bike directly informed the development of both the Batcycle and the Batmobile, unifying all three vehicles under the aesthetic of a singular, obsessed garage craftsman.",
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
    "以战备工程、材料机理与实战闭环重构的战术档案，收录战衣、随身工具、载具及地下车间试验设备。",
    "Tactical dossier grounded in engineering, materials, and field combat, cataloging the Batsuit, portable tools, vehicles, and subterranean workshop testing rigs.",
  ),
  tools: bilingual("随身工具与侦查装具", "Portable tools & surveillance kit"),
  toolIntro: bilingual(
    "涵盖腰带携带的破障、照明、急救与非致命近战装具，以及布鲁斯融入街头暗访的流浪者侦查体系。",
    "Spanning belt-carried breaching, lighting, trauma medicine, and non-lethal melee tools alongside Bruce's covert street surveillance outfit.",
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
    "从重载通体防撞钢梁的肌肉战车，到极简自制街头机车，全景解构哥谭巡逻载具的动力与车架工程。",
    "From the heavy crash-spined muscle car to stripped-down street motorcycles, deconstructing the powertrain and chassis engineering of Gotham patrol vehicles.",
  ),
  related: bilingual("车间与关联档案", "Workshop & related records"),
  relatedIntro: bilingual(
    "深入战车后置双涡轮 V8 动力总成、蝙蝠洞弹道与机械试射台、布鲁斯私人跑车及哥谭夜空的警报图腾。",
    "Examining the Batmobile's rear twin-turbo V8 powertrain, Batcave ballistics and projectile test rigs, Bruce's civilian sports car, and the Bat-Signal.",
  ),
};
