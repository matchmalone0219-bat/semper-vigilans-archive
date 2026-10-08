import { bilingual, type ArchiveGear, type GearPlate, type GearSource } from "./gear-archive";

const book = (sourceUrl: string): GearSource => ({
  source: "The Art of The Batman · Alextoons",
  sourceUrl,
  sourceTier: "archive",
});
const ENGINE = book("https://alextoons.com/blog/thebatmobile");
const CARS = book("https://alextoons.com/blog/brucewaynethebatman");
const CAVE = book("https://alextoons.com/blog/2022/9/28/the-art-of-the-batman-pt7");
const PREVIEWS: Record<string, string> = {
  "/media/gear-archive/ballistics-bench.jpg": "/media/gear-archive/ballistics-bench-preview.jpg",
  "/media/gear-archive/batarang-launcher.jpg": "/media/gear-archive/batarang-launcher-preview.jpg",
  "/media/gear-archive/engine-layout.jpg": "/media/gear-archive/engine-layout-preview.jpg",
  "/media/gear-archive/corvette-sheet.jpg": "/media/gear-archive/corvette-sheet-preview.jpg",
  "/media/gear-archive/cave-station.jpg": "/media/gear-archive/cave-station-preview.jpg",
  "/media/gear-archive/cave-workshop.jpg": "/media/gear-archive/cave-workshop-preview.jpg",
};

function plate(
  src: string,
  title: GearPlate["title"],
  caption: GearPlate["caption"],
  provenance?: GearSource,
): GearPlate {
  return {
    src,
    preview: PREVIEWS[src],
    title,
    caption,
    stage: bilingual(
      provenance ? "设定集图版" : "影片与现场图像",
      provenance ? "Art-book plate" : "Film and production imagery",
    ),
    credit: provenance ? "The Art of The Batman" : "The Batman · 2022",
    provenance: provenance ?? {
      source: "BatcaveCN · 现有专题图片库",
      sourceUrl: `https://github.com/matchmalone0219-bat/semper-vigilans-archive/blob/main/public${src}`,
      sourceTier: "archive",
    },
  };
}

export const WORKSHOP: ArchiveGear[] = [
  {
    id: "turbine",
    name: bilingual("战车后置引擎", "Rear engine design"),
    category: bilingual("引擎与传动", "Engine and drivetrain"),
    summary: bilingual(
      "外露的动力总成、车尾火光与低沉轰鸣，把蝙蝠战车的威慑力变成可见、可听的机械存在。",
      "Exposed machinery, rear flames and a deep roar make the Batmobile's intimidation both visible and audible.",
    ),
    film: bilingual(
      "追逐开始前，引擎先于车辆行动：黑暗中的启动与轰鸣，让车库里的改装车成为逼近敌人的猛兽。",
      "The engine acts before the car moves: its ignition and roar in the dark turn a workshop-built machine into a predator approaching its target.",
    ),
    design: bilingual(
      "结构草图围绕后轮上方的引擎布置展开，同时推敲重量分配、散热、支撑梁和变速箱的位置。",
      "The layout sketches place the engine above the rear wheels while exploring weight distribution, cooling, support beams and transmission placement.",
    ),
    filmDetails: [
      bilingual(
        "蝙蝠侠在冰山俱乐部外与企鹅人交锋后，战车在黑暗中启动。镜头先让引擎声、灯光和车尾喷出的火焰建立压力，再让整辆车冲入追逐；动力系统因此既是交通工具的核心，也是蝙蝠侠制造恐惧的手段。",
        "After Batman's confrontation with the Penguin outside the Iceberg Lounge, the Batmobile starts in the dark. Engine noise, lights and flames at the rear build tension before the car enters the chase. Its powertrain is both the heart of a vehicle and part of Batman's use of fear.",
      ),
      bilingual(
        "车尾没有用完整外壳遮住机械，管路、支架和排气口共同构成了车辆的后部轮廓。追逐中的雨水、烟雾和火光不断掠过这些结构，让战车保持粗粝的改装质感，也把影片中的加速和冲撞表现得更有分量。",
        "The rear machinery is left exposed, with pipes, supports and exhaust openings shaping the tail of the car. Rain, smoke and fire pass across these structures during the chase, preserving its rough custom-built character and giving its acceleration and impacts a sense of weight.",
      ),
    ],
    designDetails: [
      bilingual(
        "引擎草图用俯视与侧视来研究动力总成如何塞入车尾。图中把引擎放在后轮上方，旁注随即提出后轮承重与车辆重量分配的问题；支撑梁也被单独讨论，说明外露机械的造型需要与车架的连接方式一起考虑。",
        "Top and side views explore how the powertrain could fit into the rear of the car. Placing the engine above the rear wheels raises questions about rear-tyre loading and weight distribution in the handwritten notes. A separate note considers a support beam, linking the exposed machinery to the structure carrying it.",
      ),
      bilingual(
        "另一组旁注关注热量如何更快散去，以及传动部件占用的空间。草图尝试把管道安排在乘员座位旁，并提出部分引擎结构可能进入驾驶室后部；过大的变速箱也迫使布置继续调整。这些推敲展示了概念车从夸张轮廓走向具体空间安排的过程。",
        "Other notes ask how heat could be removed faster and how much space the transmission would require. They explore routing conduits beside the passenger seating and allowing part of the engine into the back of the cab. An oversized transmission creates another packaging problem. These studies show the dramatic silhouette being developed into a more specific spatial arrangement.",
      ),
    ],
    plates: [
      plate(
        "/media/engine.jpg",
        bilingual("战车车尾与外露动力总成", "Batmobile rear and exposed powertrain"),
        bilingual(
          "车尾火光照亮外露机械，蝙蝠侠站在战车旁。",
          "Fire at the rear lights the exposed machinery as Batman stands beside the car.",
        ),
      ),
      plate(
        "/media/gear-archive/engine-layout.jpg",
        bilingual("后置引擎结构草图", "Rear engine layout study"),
        bilingual(
          "俯视与侧视研究引擎、支撑结构和传动部件的位置，旁注记录重量分配与散热问题。",
          "Top and side studies explore the engine, supports and transmission, with notes on weight distribution and cooling.",
        ),
        ENGINE,
      ),
    ],
  },
  {
    id: "corvette",
    name: bilingual("雪佛兰 Corvette Sting Ray", "Chevrolet Corvette Sting Ray"),
    category: bilingual("布鲁斯的私人座驾", "Bruce's civilian car"),
    summary: bilingual(
      "布鲁斯前往市长追悼会时驾驶的黑色经典跑车，以修长车身和分体式后窗呈现韦恩家族继承人的公开形象。",
      "Bruce drives this black classic sports car to the mayor's memorial, its long body and split rear window framing the Wayne heir's public appearance.",
    ),
    film: bilingual(
      "Corvette 将布鲁斯从韦恩塔带到市长追悼会，让他以家族继承人的身份进入哥谭的公众视线。",
      "The Corvette takes Bruce from Wayne Tower to the mayor's memorial, bringing him into Gotham's public eye as the Wayne heir.",
    ),
    design: bilingual(
      "低矮车身、隆起的翼子板与分体式后窗，让这辆黑色跑车拥有鲜明的经典轮廓。",
      "A low body, raised fenders and a split rear window give the black sports car its distinctive classic silhouette.",
    ),
    filmDetails: [
      bilingual(
        "市长追悼会是布鲁斯少数以本人身份出现在公众面前的场景之一。黑色 Corvette 停在拥挤的街道上，他从车内走进媒体、警察与人群包围的现场；车辆连同他的服装和沉默姿态，构成了这个疏离的韦恩继承人的第一印象。",
        "The mayor's memorial is one of Bruce's few public appearances as himself. His black Corvette arrives on a crowded street, and he steps into a scene surrounded by reporters, police and mourners. The car, his clothes and his silence together shape the impression of a withdrawn Wayne heir.",
      ),
      bilingual(
        "这辆私人跑车与地下车间中的蝙蝠战车共同刻画布鲁斯对汽车的选择：前者保留完整、流畅的经典车身，后者则暴露支架和动力结构。两辆车都以深色为主，却分别属于追悼会上的公开露面与夜间行动。",
        "The civilian sports car and the Batmobile in the underground workshop reveal two sides of Bruce's automotive world. The Corvette retains a complete, flowing classic body, while the Batmobile exposes its supports and machinery. Both use dark finishes, but one belongs to a public appearance and the other to his night work.",
      ),
    ],
    designDetails: [
      bilingual(
        "设定集图版并置车辆的前部与后部，可以看到长发动机盖、隆起的前翼子板，以及沿车身向后收束的曲面。车漆在湿冷的街景中接近黑色，镀铬细节与灯具成为勾勒轮廓的少量亮点。",
        "The art-book plate pairs front and rear views, showing the long bonnet, raised front fenders and surfaces tapering toward the tail. The paint reads almost black in the wet street setting, with chrome details and lights providing small highlights that define the body.",
      ),
      bilingual(
        "后部最鲜明的识别点是中央分隔的后窗、圆形尾灯与收窄的车尾。前后视角让这辆私人座驾的造型得以完整呈现，也方便将它与蝙蝠战车的宽轮距、外露后部和大幅改装的车身作直观比较。",
        "At the rear, the divided window, round tail lights and narrowing tail are the clearest identifying features. The paired views show the civilian car as a complete design and invite comparison with the Batmobile's wide stance, exposed rear and extensively modified body.",
      ),
    ],
    plates: [
      plate(
        "/media/corvette.jpg",
        bilingual("黑色 Corvette 车身", "Black Corvette exterior"),
        bilingual(
          "拍摄现场的前侧视角，展现低矮车身、修长发动机盖与前轮拱。",
          "A front three-quarter view on location shows the low body, long bonnet and front wheel arches.",
        ),
      ),
      plate(
        "/media/gear-archive/corvette-sheet.jpg",
        bilingual("Corvette 前后视角", "Corvette front and rear views"),
        bilingual(
          "前后两组街景照片展示车头轮廓、分体式后窗与圆形尾灯。",
          "Paired street photographs show the nose, split rear window and round tail lights.",
        ),
        CARS,
      ),
    ],
  },
  {
    id: "cave",
    name: bilingual("地下车间 / 蝙蝠洞", "The workshop / Batcave"),
    category: bilingual("基地与调查工作区", "Base and investigation workspace"),
    summary: bilingual(
      "韦恩塔下的旧铁路空间容纳车辆、维修设备与调查屏幕，成为布鲁斯夜间行动的起点和返回之处。",
      "An old railway space beneath Wayne Tower holds vehicles, workshop equipment and investigation screens, serving as the starting point and return destination for Bruce's night work.",
    ),
    film: bilingual(
      "布鲁斯在这里回放隐形眼镜记录、研究线索、维护车辆，并把街头调查带回自己的工作台。",
      "Bruce reviews contact-lens recordings, studies clues and maintains vehicles here, bringing his street investigation back to the workbench.",
    ),
    design: bilingual(
      "旧车站的拱顶、立柱与轨道保留下来，临时搭建的工作区被嵌入这片巨大的地下空间。",
      "The old station's vaults, columns and tracks remain, with an improvised workspace inserted into the vast underground volume.",
    ),
    filmDetails: [
      bilingual(
        "布鲁斯结束夜间巡查后，沿地下通道返回韦恩塔下的基地。摩托车、蝙蝠战车、升降设备和工作台分布在同一片旧铁路空间里，通勤、维修与调查因而形成连续的行动路线：从哥谭街头进入隧道，再回到屏幕前整理线索。",
        "After his night patrol, Bruce returns through underground passages to the base beneath Wayne Tower. Motorcycles, the Batmobile, lifting equipment and workbenches occupy the same former railway space. Travel, maintenance and investigation form a continuous route from Gotham's streets, through the tunnels and back to the screens where he studies his findings.",
      ),
      bilingual(
        "隐形眼镜记录在这里转化为可反复观看的调查材料，屏幕把人物、现场和细节带回布鲁斯眼前。车间同时保留工具、电缆和正在处理的车辆，使侦探工作与装备维护始终发生在同一个环境里；阿尔弗雷德也在这里参与布鲁斯的调查。",
        "Contact-lens footage becomes material Bruce can review repeatedly, with screens bringing people, locations and details back into view. Tools, cables and vehicles under maintenance keep detective work and equipment upkeep in the same environment. Alfred also joins Bruce's investigation here.",
      ),
    ],
    designDetails: [
      bilingual(
        "空间图版首先建立旧车站的尺度：高大的拱顶、连续的立柱、台阶和轨道围住低矮的工作设施。保留下来的建筑体量远大于布鲁斯实际使用的区域，车间像是在历史结构中逐步搭建起来，呼应他仍在形成中的行动体系。",
        "The environment plates first establish the station's scale: tall vaults, repeated columns, stairs and tracks surround relatively low working equipment. The inherited architecture is much larger than the area Bruce actually uses. His workshop feels assembled gradually within an older structure, echoing an operation still taking shape.",
      ),
      bilingual(
        "另一幅设计把注意力转向车间布置：车辆平台、作业灯、悬挂线缆和金属步道将维修区组织起来。屏幕与工作台形成局部亮区，远处的拱廊则沉入阴影；这种照明让人物可以在庞大空间中工作，又保留了地下基地的深度与隐蔽感。",
        "A second design focuses on the workshop layout. A vehicle platform, task lights, hanging cables and metal walkways organize the maintenance area. Screens and benches create pools of light while distant arches recede into shadow, allowing people to work within the enormous space while preserving its depth and concealment.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-cave.jpg",
        bilingual("地下车间工作区", "Underground workshop workspace"),
        bilingual(
          "车辆升降区与调查屏幕置于同一组砖拱之下，电缆和工作灯连接各处设施。",
          "Vehicle maintenance and investigation screens share the brick-vaulted space, linked by cables and working lights.",
        ),
      ),
      plate(
        "/media/gear-archive/cave-station.jpg",
        bilingual("旧车站与地下基地", "Old station and underground base"),
        bilingual(
          "拱顶、台阶与立柱保留铁路建筑的尺度，工作区沿轨道展开。",
          "Vaults, stairs and columns retain the scale of the railway architecture, with work areas arranged along the tracks.",
        ),
        CAVE,
      ),
      plate(
        "/media/gear-archive/cave-workshop.jpg",
        bilingual("车辆维修区空间设计", "Vehicle workshop environment"),
        bilingual(
          "车辆平台、灯具、电缆与步道构成地下车间的维修设施。",
          "A vehicle platform, lights, cables and walkways form the maintenance facilities of the underground workshop.",
        ),
        CAVE,
      ),
    ],
  },
  {
    id: "signal",
    name: bilingual("蝙蝠信号灯", "Bat-Signal"),
    category: bilingual("联络与城市符号", "Communication and city symbol"),
    summary: bilingual(
      "一块装在探照灯上的蝙蝠形遮片，把戈登的联络信号投向云层，也让哥谭街头的人开始警惕阴影。",
      "A bat-shaped mask mounted on a searchlight projects Gordon's call into the clouds and makes people on Gotham's streets fear the shadows.",
    ),
    film: bilingual(
      "信号灯既是戈登呼叫蝙蝠侠的方式，也是让整座城市意识到他正在行动的警示。",
      "The signal is Gordon's way of calling Batman and a warning to the city that he is at work.",
    ),
    design: bilingual(
      "探照灯与粗粝的金属遮片直接组合，裸露的支架和灯面延续了本片装备的实用改装感。",
      "A searchlight and rough metal mask form a direct assembly, with exposed supports and lamp hardware continuing the film's practical, modified equipment aesthetic.",
    ),
    filmDetails: [
      bilingual(
        "影片开场，蝙蝠形轮廓出现在哥谭上空，街头的犯罪者随即开始注意那些看不清的角落。蝙蝠侠无需同时现身每一条街，信号就已经把他的存在传递出去；灯光与阴影共同建立了他在行动第二年积累的威慑。",
        "At the beginning of the film, the bat silhouette appears above Gotham and criminals start watching the corners they cannot see. Batman does not need to appear on every street at once: the signal announces his presence. Light and shadow together establish the fear he has built during his second year.",
      ),
      bilingual(
        "戈登通过这盏灯与蝙蝠侠保持联络，两人在高处会面，将城市上空的符号落回具体的合作关系。随着调查推进，信号灯所在的空间也成为交换线索与发生冲突的地点。到了影片结尾，蝙蝠侠对自身使命的理解发生变化，同一个蝙蝠符号也开始承载救援与希望的意义。",
        "Gordon uses the light to contact Batman, and their meetings high above the city connect the symbol to a working partnership. As the investigation develops, the signal's location becomes a place for sharing clues and confrontation. By the end, Batman's changing understanding of his mission also gives the bat symbol an association with rescue and hope.",
      ),
    ],
    designDetails: [
      bilingual(
        "灯具特写把蝙蝠轮廓还原成一个具体物件：金属遮片横置在圆形灯面前，固定结构与格栅清晰可见。形状通过阻挡光线投向天空，保留了探照灯本身的工业外观，也让戈登的联络装置显得可以在哥谭的现实环境中搭建出来。",
        "The close-up presents the bat silhouette as a physical object: a metal mask sits across the circular lamp, with its mounting and grille visible. By blocking part of the beam, it projects the shape into the sky while retaining the searchlight's industrial appearance. Gordon's device feels like something assembled within Gotham's existing environment.",
      ),
      bilingual(
        "雨水、深色金属与裸露连接处使它与蝙蝠侠的装备处于同一种材质语境。道具在近景中依靠遮片和支架成立，在远景中则依靠云层上的轮廓被辨认；从小型机械结构到城市尺度的图像，同一装置承担了两种不同的视觉任务。",
        "Rain, dark metal and exposed connections place the signal in the same material world as Batman's equipment. In close-up, its mask and supports make it tangible; in the distance, its outline against the clouds makes it recognizable. The same device works both as a piece of machinery and as an image at the scale of the city.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-signal.jpg",
        bilingual("探照灯与蝙蝠形遮片", "Searchlight and bat-shaped mask"),
        bilingual(
          "雨中的灯具特写，金属蝙蝠遮片固定在探照灯前方。",
          "A close view in the rain shows the metal bat mask mounted in front of the searchlight.",
        ),
      ),
    ],
  },
  {
    id: "ballistics-bench",
    name: bilingual("蝙蝠洞弹道试验台", "Batcave ballistics bench"),
    category: bilingual("工作台设备", "Workshop equipment"),
    usageLabel: bilingual("用途与构想", "Use & concept"),
    summary: bilingual(
      "固定架、凝胶块与目标框组成一套地下车间的试射布局。",
      "Fixed mounts, a gel block and target frames form an underground workshop testing layout.",
    ),
    film: bilingual(
      "弹道试验台为蝙蝠洞的装备开发提供一组工作场景构想。",
      "The ballistics bench proposes a working setup for equipment development in the Batcave.",
    ),
    design: bilingual(
      "Ballistics floor plan 图稿同时研究桌面固定、试射方向和目标架布置。",
      "The Ballistics floor plan study explores bench mounts, firing direction and target-frame placement.",
    ),
    filmDetails: [
      bilingual(
        "这组设备把地下车间从存放车辆和战衣的空间推进到试验场所。桌面上的器械由支架固定，前方留出目标与射击方向；图中还提出为凝胶块改用武器支架的方案，把测试物与发射位置纳入同一布局。",
        "The setup develops the underground workshop into a testing space as well as a place for vehicles and costumes. Bench devices sit in fixed mounts with targets and firing directions ahead. A note proposes repurposing a weapon stand for a gel block, placing the test material and launch position within one layout.",
      ),
      bilingual(
        "立式目标框和可悬挂的靶体让不同高度、不同器械拥有各自的测试位置。它们展示布鲁斯在出勤之前反复试验工具的工作环境，也让地下车间里的桌面、线缆和机械支架有了具体用途。",
        "Upright frames and hanging targets provide test positions for different heights and devices. They imagine Bruce trying equipment before patrol and give the workshop's tables, cables and mechanical mounts specific jobs.",
      ),
    ],
    designDetails: [
      bilingual(
        "俯视草图将三组位置标为 W1、W2、W3，并比较目标框沿桌面排列时的大小。另一张图把桌子转到端部方向，讨论固定、悬挂和对齐；这些草图关注的是工作空间怎样容纳试射，而非只为一件道具画外壳。",
        "The plan labels three positions W1, W2 and W3 and compares frame sizes along the bench. Another drawing turns the table end-on to study mounting, hanging and alignment. The sketches address the working space needed for tests rather than simply styling a prop casing.",
      ),
      bilingual(
        "立式框采用带脚座的钢架，内侧另有方形目标区域。下方着色图将固定器械、导线与桌面器材并排，延续蝙蝠洞由实用装置逐步搭建起来的视觉语言。",
        "The upright frame uses a steel structure on feet with a square target area inside. The render below lines up mounted devices, wiring and bench equipment, continuing the Batcave's appearance as a space assembled from practical apparatus.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/ballistics-bench.jpg",
        bilingual("弹道试验台布局", "Ballistics bench layout"),
        bilingual(
          "桌面、固定架、凝胶块与立式目标框的布局研究，下方展示工作台器械构想。",
          "Layout studies of the bench, mounts, gel block and upright targets, with a rendered equipment proposal below.",
        ),
        CAVE,
      ),
    ],
  },
  {
    id: "batarang-launcher",
    name: bilingual("蝙蝠镖试射装置", "Batarang test rig"),
    category: bilingual("工作台设备", "Workshop equipment"),
    usageLabel: bilingual("用途与构想", "Use & concept"),
    summary: bilingual(
      "固定底板上的弹簧、触发杆与接线，组成蝙蝠镖的机械试射构想。",
      "Springs, trigger rods and wiring on a fixed base form a mechanical Batarang testing proposal.",
    ),
    film: bilingual(
      "Batarang Mk VI 图稿将投射物、释放机构和工作台支架一起设计。",
      "The Batarang Mk VI study develops the projectile, release mechanism and bench supports together.",
    ),
    design: bilingual(
      "草图标出触发联动与通往控制面板的连接，下方着色图展示固定设备和前方支架。",
      "The sketch labels trigger linkages and a connection to a firing panel; the render shows the mounted apparatus and a stand ahead.",
    ),
    filmDetails: [
      bilingual(
        "蝙蝠镖被置于带弹簧和触发杆的固定装置中，底板、导线和前方支架共同形成试射场景。投射物与测试器械并列，让蝙蝠洞的工作台继续承担装备开发与试验。",
        "The Batarang sits in a fixed apparatus with springs and trigger rods. Its base, wiring and stand ahead form a testing setup, pairing the projectile with workshop equipment for development and trials.",
      ),
      bilingual(
        "图中将蝙蝠镖的翼形、开孔和释放方向放在同一个机械问题里：投射物怎样被固定，触发后怎样离开支架。这套试射构想与胸前可拆卸徽记刀分别展示了蝙蝠形工具的不同开发方向。",
        "Wing shape, cutouts and release direction are treated as one mechanical problem: how to hold the projectile and release it from its support. The test proposal and removable chest knife explore different directions for bat-shaped tools.",
      ),
    ],
    designDetails: [
      bilingual(
        "手绘稿标出 Trigger rods、Release links 和 spring loaded，并画出指向控制面板的连接。弹簧与联动件安装在有厚度的底板上，外侧保留清晰的机械固定点。",
        "The sketch labels Trigger rods, Release links and spring loaded, with a connection toward a firing panel. Springs and linkages sit on a substantial base with visible mechanical mounting points.",
      ),
      bilingual(
        "下方着色图继续保留线缆、底座和独立竖向支架，从另一角度展示装置之间的距离。蝙蝠镖的轮廓与工业构件同时可见，和弹道试验台一起构成地下车间的机械试验图景。",
        "The render retains cables, bases and a separate upright stand, revealing the spacing between components from another angle. Bat silhouettes remain visible alongside industrial fittings, extending the workshop testing imagery of the ballistics bench.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/batarang-launcher.jpg",
        bilingual("Batarang Mk VI 试射构想", "Batarang Mk VI testing proposal"),
        bilingual(
          "固定底板、弹簧、触发联动、接线与前方支架的设计研究。",
          "Design studies of the fixed base, springs, trigger linkages, wiring and stand ahead.",
        ),
        CAVE,
      ),
    ],
  },
];
