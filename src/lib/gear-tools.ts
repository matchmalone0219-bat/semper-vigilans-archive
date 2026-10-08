import { bilingual as b, type ArchiveGear, type GearPlate } from "./gear-archive";

const PREVIEWS: Record<string, string> = {
  "/media/gear-archive/belt.jpg": "/media/gear-archive/belt-preview.jpg",
  "/media/gear-archive/magnetic-charge-sketch.jpg":
    "/media/gear-archive/magnetic-charge-sketch-preview.jpg",
  "/media/gear-archive/magnetic-charge.jpg": "/media/gear-archive/magnetic-charge-preview.jpg",
  "/media/gear-archive/nunchucks.jpg": "/media/gear-archive/nunchucks-preview.jpg",
  "/media/gear-archive/finger-taser.jpg": "/media/gear-archive/finger-taser-preview.jpg",
  "/media/gear-archive/light-flare.jpg": "/media/gear-archive/light-flare-preview.jpg",
  "/media/gear-archive/adrenaline-injector.jpg":
    "/media/gear-archive/adrenaline-injector-preview.jpg",
  "/media/gear-archive/lens-reader-study.jpg": "/media/gear-archive/lens-reader-study-preview.jpg",
  "/media/gear-archive/earpiece-study.jpg": "/media/gear-archive/earpiece-study-preview.jpg",
  "/media/gear-archive/drifter-outfit.jpg": "/media/gear-archive/drifter-outfit-preview.jpg",
  "/media/gear-archive/forearm-spikes.jpg": "/media/gear-archive/forearm-spikes-preview.jpg",
  "/media/gear-archive/gauntlet-release.jpg": "/media/gear-archive/gauntlet-release-preview.jpg",
};

function plate(
  src: string,
  title: GearPlate["title"],
  caption: GearPlate["caption"],
  part = 5,
): GearPlate {
  return {
    src,
    preview: PREVIEWS[src],
    title,
    caption,
    stage: b("设定集图版", "Art-book plate"),
    credit: "The Art of The Batman",
    provenance: {
      source: "The Art of The Batman · Alextoons",
      sourceUrl:
        part === 4
          ? "https://alextoons.com/blog/2022/8/29/the-art-of-the-batman-pt4"
          : part === 8
            ? "https://alextoons.com/blog/brucewaynethebatman"
            : "https://alextoons.com/blog/2022/9/2/the-art-of-the-batman",
      sourceTier: "archive",
    },
  };
}

const USE = b("用途与构想", "Use & concept");

export const TOOLS: ArchiveGear[] = [
  {
    id: "light-flare",
    name: b("照明与信号棒", "Light & flare"),
    category: b("照明工具", "Lighting"),
    usageLabel: USE,
    summary: b(
      "可收纳于腰带的棒状照明工具，将灯管、握持端与电源压缩为一体。",
      "A belt-carried lighting tool combines its light tube, grip and power supply in one compact form.",
    ),
    film: b(
      "照明和发出信号是腰带工具的一部分；洪灾救援中的红色照明棒也成为带领人群的视觉中心。",
      "Lighting and signaling belong to the belt's toolkit; the red flare in the flood rescue becomes a visual guide for the crowd.",
    ),
    design: b(
      "Light and Flare 图版研究抽出、延长和收回的棒状结构。",
      "The Light and Flare plate explores a rod-shaped tool that can be withdrawn, extended and stowed.",
    ),
    filmDetails: [
      b(
        "腰带上的照明装备延续警用执勤工具的思路。设定说明把紫外灯与束带式手铐并列，覆盖搜查现场和控制目标等不同需要。",
        "The belt's lighting equipment follows police duty gear. The design commentary places UV lighting alongside zip-tie cuffs, covering different needs in searching a scene and restraining a subject.",
      ),
      b(
        "洪灾救援里，布鲁斯举起红色照明棒，在断电与积水的环境中引导幸存者。Light and Flare 图版中的白光灯管则展示另一种照明构想：细长发光面与有纹理的握持端组合，收纳时缩短整体长度。",
        "During the flood rescue, Bruce raises a red flare to guide survivors through darkness and water. The white tube in the Light and Flare study explores another lighting form: a long illuminated surface and textured grip, shortened for storage.",
      ),
    ],
    designDetails: [
      b(
        "草图比较了灯管从外壳抽出的状态，以及上下部件分离的方案。尺寸标记、侧面剖视和收纳轮廓把工具从一根发光棒推进到能够放入腰带装具的物件。",
        "The sketches compare a light tube withdrawn from its housing with a proposal whose upper and lower sections separate. Dimensions, side sections and the stowed outline develop it into an object that fits the belt.",
      ),
      b(
        "着色图把电子部件集中在握持端，发光区域留出连续的长条表面。深色外壳上的滚花纹理与金属端部，延续整套腰带工具的机械外观。",
        "The render concentrates electronics in the grip, leaving a continuous illuminated tube. Knurled dark housing and metal ends continue the mechanical appearance of the belt tools.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/light-flare.jpg",
        b("灯管展开与收纳", "Light tube deployment and storage"),
        b(
          "伸缩方案、握持端与发光状态。",
          "Extension proposals, grip and illuminated configurations.",
        ),
      ),
    ],
  },
  {
    id: "adrenaline-injector",
    name: b("急救注射器", "Emergency injector"),
    category: b("急救工具", "Emergency equipment"),
    summary: b(
      "腰带携带的紧凑注射装置，为紧急情况准备。",
      "A compact belt-carried injector kept for emergencies.",
    ),
    film: b(
      "体育馆决战中，布鲁斯受创后取出注射器给自己注射，随后重新投入战斗。",
      "In the stadium battle, an injured Bruce injects himself before returning to the fight.",
    ),
    design: b(
      "设定集将其解释为紧急使用的肾上腺素注射装置。",
      "The art book describes it as an adrenaline injector for emergencies.",
    ),
    filmDetails: [
      b(
        "在哥谭广场花园，布鲁斯遭到近距离枪击，倒下后取出装有绿色液体的小型注射器，对自己施用。这个动作让随身急救装备直接进入决战的动作链条。",
        "At Gotham Square Garden, Bruce is hit at close range. After falling, he takes a small injector containing green liquid and administers it to himself, bringing emergency equipment directly into the battle's action.",
      ),
      b(
        "设定集的用途说明将它定位为紧急肾上腺素注射装置，既可以供布鲁斯自用，也可以用于他需要帮助的人。它与照明、侦查工具一起，扩展了腰带承担的任务。",
        "The art-book explanation frames it as an emergency adrenaline injector for Bruce or another person who needs help. Alongside lighting and surveillance tools, it broadens the belt's role.",
      ),
    ],
    designDetails: [
      b(
        "剖面草图拆开了保护外壳、内部药筒和针端的关系。外壳近似短圆筒，着色方案用绿色窗口与端盖，让道具在深色腰带上仍有可辨认的功能细节。",
        "The sectional sketch separates the protective shell, internal cartridge and needle end. A short cylindrical body, green window and end cap give the prop recognizable details against the dark belt.",
      ),
      b(
        "图版同时绘制完整收纳外形与内部结构，强调它是一件可以携带的独立道具。其紧凑比例、滚花外壳和金属端部与其他腰带工具保持一致。",
        "The plate shows both the closed carrying form and its internal assembly, treating it as a self-contained portable prop. Compact proportions, knurled housing and metal ends match the other belt tools.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/adrenaline-injector.jpg",
        b("注射器结构研究", "Injector construction study"),
        b(
          "紧凑圆筒外壳、内部药筒与着色方案。",
          "Compact cylindrical housing, internal cartridge and rendered proposal.",
        ),
      ),
    ],
  },
  {
    id: "magnetic-charge",
    name: b("磁吸黏弹与腰带夹", "Magnetic charges & belt clip"),
    category: b("爆破工具", "Breaching equipment"),
    usageLabel: USE,
    summary: b(
      "圆形黏弹以磁性底面附着目标，腰带夹容纳三枚备用弹。",
      "Circular charges use a magnetic base, with a belt clip holding three spares.",
    ),
    film: b(
      "这组设计把黏弹从发射器延伸到手动布置和腰带补给。",
      "The proposal extends the sticky-charge system into hand placement and belt-carried spares.",
    ),
    design: b(
      "爆炸视图与三枚装夹具分别研究单个道具和携带方式。",
      "Exploded views and a three-charge clip study the individual prop and its carrying arrangement.",
    ),
    filmDetails: [
      b(
        "圆形黏弹的概念把附着、启动和状态显示集中在一个扁平物件上。图版绘有磁性底面、顶部按钮与环形倒计时显示；另一组草图考虑它如何与黏弹发射器衔接。",
        "The circular charge concept combines attachment, activation and status display in a flat object. The plate shows a magnetic base, top button and circular countdown display; another sketch considers its connection to the sticky bomb gun.",
      ),
      b(
        "腰带夹的方案可放置三枚黏弹，背面通过夹具挂在腰带上，并为取用留出开口。携带布局因此与部署方式一起设计，而不是把黏弹当成一件孤立的手持道具。",
        "The belt-clip proposal carries three charges, attaches at the rear and leaves access openings. Carrying and deployment are developed together rather than treating the charge as an isolated hand-held object.",
      ),
    ],
    designDetails: [
      b(
        "手绘爆炸图将上壳、外圈、内部组件和磁性底面分层排列，并以剖视与不同图形比较倒计时显示。着色图进一步尝试圆形轮廓、暗色侧壁与金属底面的搭配。",
        "The exploded sketch layers the upper shell, outer ring, internal components and magnetic base. Sections and alternate graphics explore the countdown display; the render develops a circular form with dark sidewalls and a metal base.",
      ),
      b(
        "三枚装腰带夹与圆形磁吸方案同页并列，夹具草图还保留较方正的弹体外形。不同外形展示了携带容积与道具造型在开发中的变化。",
        "The three-charge clip sits beside the circular magnetic proposal, while its sketches retain a more angular charge shape. The variations show carrying volume and prop form evolving during development.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/magnetic-charge.jpg",
        b("黏弹与三枚装腰带夹", "Charges and three-charge belt clip"),
        b("磁性底面、环形显示与腰带取用位置。", "Magnetic base, circular display and belt access."),
      ),
      plate(
        "/media/gear-archive/magnetic-charge-sketch.jpg",
        b("黏弹分层草图", "Exploded charge sketches"),
        b("外壳、底面及显示布局研究。", "Studies of the shell, base and display layout."),
      ),
    ],
  },
  {
    id: "compact-nunchucks",
    name: b("紧凑双节棍", "Compact nunchucks"),
    category: b("近战装具", "Close-combat equipment"),
    usageLabel: USE,
    summary: b(
      "两段握柄合并为一根短棍，展开后由内部链条连接。",
      "Two handles stow as one short rod and separate on an internal chain.",
    ),
    film: b(
      "双节棍构想为腰带增加一种可快速展开的近战工具。",
      "The nunchucks proposal adds a quickly deployable close-combat tool to the belt.",
    ),
    design: b(
      "草图与着色方案围绕合拢收纳、旋转解锁和链条展开。",
      "Sketches and renders explore closed storage, twist release and chain deployment.",
    ),
    filmDetails: [
      b(
        "收纳时，两段握柄沿同一轴线合拢，在腰带上呈现为一根短棍。使用构想是解开连接部位，将两端分离后露出链条，使携带外形与使用外形产生明确变化。",
        "Stowed, the handles meet along one axis and appear as a short rod on the belt. The proposed use releases the joint and separates the ends to expose the chain, creating a clear change between carrying and working forms.",
      ),
      b(
        "图版将合拢状态、拉开状态和弯折后的链条连接并列，同时以腰带与人物小图交代携带比例。这件工具的设计重点是让近战装具能融入日常的腰部收纳。",
        "Closed, separated and articulated chain configurations sit beside small belt and figure studies. The design focuses on fitting close-combat equipment into the suit's regular waist storage.",
      ),
    ],
    designDetails: [
      b(
        "手绘稿研究扭转后拉开的释放动作，以及内部弹簧和链条的收纳关系。握柄表面分区提供抓握纹理，中央接缝在合拢时保持连续轮廓。",
        "The sketches study a twist-and-pull release and the storage relationship of the internal spring and chain. Patterned handle sections provide grip while the center joint keeps the closed silhouette continuous.",
      ),
      b(
        "着色方案以黑色主体和金属链节呈现两段工具，端部与中间连接处保留清晰的机械分界。图中的展开箭头帮助说明外观如何随取用动作变化。",
        "The render uses dark handles and metal chain links, with clear mechanical divisions at the ends and central joint. Deployment arrows show how the appearance changes during access.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/nunchucks.jpg",
        b("双节棍收纳与展开", "Nunchucks stowed and deployed"),
        b(
          "合拢短棍、链条连接与腰带携带研究。",
          "Closed rod, chain connection and belt-carry studies.",
        ),
      ),
    ],
  },
  {
    id: "finger-taser",
    name: b("指部电击器", "Finger taser"),
    category: b("手套装具", "Glove equipment"),
    usageLabel: USE,
    summary: b(
      "电击部件集中在指端，手套仍保留检查线索所需的灵活度。",
      "Electrical components sit at the fingertips while the glove retains dexterity for examining clues.",
    ),
    film: b(
      "电击功能与侦探工作需要的手指动作被放进同一套手部装具。",
      "Electrical capability and the finger movement needed for detective work share one glove assembly.",
    ),
    design: b(
      "Finger Taser 图版并列展示指端方案、线路与实物手套。",
      "The Finger Taser plate combines fingertip studies, wiring and the physical glove.",
    ),
    filmDetails: [
      b(
        "指部电击器把近距离电击的构想放到手套上。展示图以指端电弧说明功能，线路沿手背与腕部连接，使手掌仍能握持工具、触碰物件。",
        "The finger taser places a close-range electrical concept on the glove. A fingertip arc illustrates the function, while wiring runs over the hand and wrist so the palm remains available to hold tools and touch objects.",
      ),
      b(
        "这套装具面对的另一项要求是侦查动作：布鲁斯需要灵活的手指拾取线索。设计因此控制指端部件的体积，让电击功能与手部细小动作共存。",
        "The assembly also has to serve investigative gestures: Bruce needs dexterous fingers to pick up clues. The design limits the bulk at the fingertips so electrical utility can coexist with fine movement.",
      ),
    ],
    designDetails: [
      b(
        "两组指端小图比较了电极在手套表面的排列，整只手套的展示图则把腕部线路纳入观察。功能不只靠一块突出的机械件表达，而是分布到指端和手背。",
        "Small fingertip studies compare electrode placement, while the complete glove study includes the wrist wiring. The function is distributed over fingers and hand rather than expressed through one large protruding part.",
      ),
      b(
        "实物照片保留了手背上的片状部件与外露连接线。与护臂并读时，可以看到保护前臂的硬结构和需要灵活活动的手指，采用了不同的装具密度。",
        "The prop photograph retains plate-like hand components and exposed leads. Beside the gauntlet, it shows different equipment densities for a protected forearm and fingers that need to move freely.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/finger-taser.jpg",
        b("电击手套设计", "Electrical glove design"),
        b(
          "指端电极、手背线路与实物手套。",
          "Fingertip electrodes, hand wiring and physical glove.",
        ),
      ),
    ],
  },
  {
    id: "throwing-spikes",
    name: b("护臂投掷短刺", "Forearm throwing spikes"),
    category: b("前臂挂载", "Forearm fittings"),
    usageLabel: USE,
    summary: b(
      "护臂外侧的细长短刺，以成排储架与绑带固定。",
      "Slender spikes sit in parallel racks and straps on the outer gauntlet.",
    ),
    film: b(
      "投掷短刺的设计将前臂空间用作随身携带区。",
      "The throwing-spike design uses the forearm as a carrying zone.",
    ),
    design: b(
      "草图将这些构件标为 throwing sticks 与 bō-shuriken，另有容纳五枚短刺的储架方案。",
      "The sketches label the fittings throwing sticks and bō-shuriken, with another proposal carrying five spikes.",
    ),
    filmDetails: [
      b(
        "护臂手绘稿直接把外侧成排的细长构件命名为投掷棒与棒形手里剑。它们与掌侧抓钩分处前臂两侧，让护臂同时承担保护、携带和工具取用。",
        "The gauntlet sketch identifies the parallel outer fittings as throwing sticks and bō-shuriken. Separate from the palm-side grapnel, they let the forearm assembly serve protection, carrying and access.",
      ),
      b(
        "另一页研究了能容纳五枚投掷短刺的外侧储架，图中还绘出背衬与绑带。全身设计里的金属杆由此获得更具体的工具用途与收纳结构。",
        "Another page studies an outer rack holding five throwing spikes, with backing and straps. The rods in the full-body design gain a more specific tool function and storage structure.",
      ),
    ],
    designDetails: [
      b(
        "数字图与实物照片展示尖端方向、成排间距和固定位置；手绘稿则关注储架如何贴合前臂，以及绑带如何围绕底板形成承托。",
        "Digital views and the prop photograph show tip direction, spacing and attachment, while sketches examine how the rack fits the forearm and how straps support its base.",
      ),
      b(
        "同页的掌侧机构另行研究弹簧前送与快速释放，强调护臂不同区域有不同用途。短刺储架与抓钩机构共用装具空间，但保持各自的取用方向。",
        "The palm-side mechanism on the same page separately explores spring-forward movement and quick release. The spike rack and grapnel share the assembly while keeping distinct access directions.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/forearm-spikes.jpg",
        b("护臂短刺与实物装具", "Forearm spikes and physical assembly"),
        b("外侧成排挂载与腕部结构。", "Parallel outer fittings and wrist construction."),
        4,
      ),
      plate(
        "/media/gear-archive/gauntlet-release.jpg",
        b("五枚短刺储架草图", "Five-spike rack sketch"),
        b(
          "外侧储架、绑带与掌侧快速释放研究。",
          "Outer rack, straps and palm-side quick-release studies.",
        ),
        4,
      ),
    ],
  },
  {
    id: "zip-tie-cuffs",
    name: b("束带式手铐", "Zip-tie cuffs"),
    category: b("腰带工具", "Belt equipment"),
    usageLabel: USE,
    summary: b(
      "警用执勤腰带的参考延伸到用于约束目标的轻便束带。",
      "Police duty-belt references extend to lightweight restraints.",
    ),
    film: b(
      "束带式手铐属于设定集说明中的腰带携带清单。",
      "Zip-tie cuffs form part of the belt inventory described in the art book.",
    ),
    design: b(
      "腰带以美国警用装具为参照，混合帆布与皮革收纳袋。",
      "The belt draws on American police equipment, combining canvas and leather pouches.",
    ),
    filmDetails: [
      b(
        "腰带的用途说明把束带式手铐与紫外灯作为随身工具的两个例子：前者用于约束，后者服务现场检查。这让腰带拥有执勤工具包的功能范围。",
        "The belt commentary names zip-tie cuffs and UV lighting as two examples of carried tools: one for restraint, the other for scene examination. The belt therefore takes on the range of a duty toolkit.",
      ),
      b(
        "轻便束带与护甲、抓钩和爆破装具承担不同任务。它们补上行动中的控制环节，也使蝙蝠侠的装备不只围绕打击和移动展开。",
        "Lightweight restraints serve a different purpose from armor, grapnels and breaching equipment. They cover the control stage of an encounter, extending the kit beyond striking and movement.",
      ),
    ],
    designDetails: [
      b(
        "装具袋参考美国警察与特警上街执勤时携带的工具。帆布、皮革和黑色扣具形成易于分区的收纳系统，束带式手铐属于这套携带逻辑。",
        "The pouches refer to tools carried by American police and SWAT on the street. Canvas, leather and dark hardware create compartmentalized storage, with zip-tie cuffs belonging to that carrying logic.",
      ),
      b(
        "全身正背面设计提供腰袋与大腿绑带的总体位置；Light and Flare 页的文字进一步列出腰带工具。两组资料把外观布局与携带用途连接起来。",
        "The full-body front and back study supplies the overall pouch and thigh-strap placement; the Light and Flare commentary names belt tools. Together they connect the visual layout to its carrying purpose.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/belt.jpg",
        b("腰带收纳布局", "Belt storage layout"),
        b("正背面腰袋与大腿装具的位置。", "Front and rear pouch and thigh-equipment placement."),
        4,
      ),
    ],
  },
  {
    id: "lens-reader",
    name: b("镜片读取器与数据终端", "Lens reader & data terminal"),
    category: b("侦查设备", "Surveillance equipment"),
    usageLabel: USE,
    summary: b(
      "任务结束后读取记录镜片，把现场影像接回分析设备。",
      "Reads the recording lens after a mission and brings field imagery back into the analysis system.",
    ),
    film: b(
      "记录镜片的后续读取与回放，形成从现场观察到分析的链条。",
      "Lens reading and playback complete the chain from field observation to analysis.",
    ),
    design: b(
      "读取器草图研究镜片接触面、数据传输与便携终端。",
      "Reader sketches explore the lens contact surface, data transfer and a portable terminal.",
    ),
    filmDetails: [
      b(
        "镜片读取器承担任务后的数据回收：布鲁斯将记录镜片放入设备，影像转入存储介质，再交给监看与分析设备处理。它与佩戴端的镜片共同组成侦查系统。",
        "The reader handles post-mission data recovery: Bruce places the recording lens in the device, transfers imagery to storage and brings it into surveillance and analysis equipment. Reader and lens form one investigative system.",
      ),
      b(
        "设定构想还考虑把存储卡带在腰带上，并以硬壳监看设备保护终端。侦查装备由此横跨眼部、腰部与车间，而不是只剩一副微型镜片。",
        "The concept also places a memory card on the belt and protects the terminal in hard-shell surveillance equipment. The kit spans eye, waist and workshop rather than ending at a miniature lens.",
      ),
    ],
    designDetails: [
      b(
        "Lens Reader 2.0 草图把镜片圆周的接触区、读取口与底座分开研究，还提出圆柱式小型设备和方形底座的不同组合。",
        "The Lens Reader 2.0 sketch separates the contact area around the lens, reading aperture and base, exploring combinations of a small cylindrical device and square dock.",
      ),
      b(
        "便携性是草图反复考虑的问题：读取口、旋转开合件、按键和接口需要被放进能够携带的外壳。图中的大型硬壳终端构想则延续军用监看设备的外观参照。",
        "Portability recurs in the sketches: aperture, rotating closure, controls and ports must fit a carryable enclosure. The larger hard-shell terminal proposal continues the reference to military surveillance equipment.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/lens-reader-study.jpg",
        b("读取器与便携终端草图", "Reader and portable terminal sketches"),
        b(
          "镜片接触区、读取口与底座的不同组合。",
          "Different combinations of lens contact area, aperture and dock.",
        ),
      ),
    ],
  },
  {
    id: "surveillance-earpiece",
    name: b("监听耳机", "Surveillance earpiece"),
    category: b("通讯设备", "Communications"),
    summary: b(
      "与记录镜片配合，让瑟琳娜在俱乐部里与布鲁斯保持联系。",
      "Pairs with the recording lenses to keep Selina in contact with Bruce inside the club.",
    ),
    film: b(
      "瑟琳娜潜入俱乐部时佩戴耳机，布鲁斯通过画面监看并向她传递信息。",
      "Selina wears an earpiece inside the club while Bruce watches the feed and speaks to her.",
    ),
    design: b(
      "耳机草图研究贴耳外形、连接部件与佩戴方向。",
      "Earpiece sketches study the close-fitting form, connection parts and wearing orientation.",
    ),
    filmDetails: [
      b(
        "瑟琳娜进入俱乐部后，记录镜片传回她的视角，耳机提供布鲁斯的声音。两件微型道具一起，让布鲁斯能够在外部参与她与目标人物的接触。",
        "Once Selina enters the club, the recording lenses relay her view and the earpiece carries Bruce's voice. Together the miniature props let him participate in her encounters from outside.",
      ),
      b(
        "镜片负责观察，耳机负责即时沟通。这个分工把影像与声音连接起来，也让侦查行动能够在交谈进行时调整方向。",
        "The lens provides observation and the earpiece provides immediate communication. Their division of roles links image and sound so the investigation can respond while a conversation is unfolding.",
      ),
    ],
    designDetails: [
      b(
        "图版下半部以耳部小图、正侧轮廓和不同分件外形研究佩戴方式。外壳需要贴合耳部，同时给电子元件和连接件留出空间。",
        "The lower half of the plate studies wearing through an ear diagram, profiles and component shapes. The shell has to sit close to the ear while allowing space for electronics and connections.",
      ),
      b(
        "耳机与更大的光学设备草图并列，使个人佩戴端和监看端出现在同一页。形体从耳部的小型外壳延伸到带镜头、散热与控制部件的装置。",
        "The earpiece appears beside studies for larger optical equipment, bringing worn and monitoring devices onto one page. The forms range from a small ear shell to assemblies with lenses, ventilation and controls.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/earpiece-study.jpg",
        b("耳机与光学设备研究", "Earpiece and optical equipment studies"),
        b(
          "下半部为耳机佩戴与外壳方案，上半部研究光学设备。",
          "The lower portion studies earpiece fit and housing; the upper portion explores optical equipment.",
        ),
      ),
    ],
  },
  {
    id: "drifter-kit",
    name: b("流浪者侦查装束", "Drifter surveillance outfit"),
    category: b("便装侦查", "Undercover surveillance"),
    summary: b(
      "兜帽、工装、背包和骑行装备，让布鲁斯以第三种身份穿行哥谭。",
      "A hood, workwear, backpack and riding kit let Bruce move through Gotham under a third identity.",
    ),
    film: b(
      "流浪者装束让布鲁斯在穿上战衣之前观察街头，接近人群而不暴露身份。",
      "The Drifter outfit lets Bruce observe the streets and approach crowds before putting on the Batsuit.",
    ),
    design: b(
      "造型结合《元年》的便装侦查与现代工人的制服，以融入人群为目标。",
      "The look combines Year One's undercover approach with modern workers' uniforms to blend into a crowd.",
    ),
    filmDetails: [
      b(
        "流浪者处在公众熟悉的韦恩继承人与披甲义警之间。兜帽压低面部轮廓，宽松外套遮住身体，骑行头盔和机车让他能够穿行不同街区。这种装束服务于观察、跟踪与接近现场，随后才切换为蝙蝠侠的行动。",
        "The Drifter sits between the publicly recognizable Wayne heir and the armored vigilante. A hood obscures his face, a loose jacket conceals his body, and a riding helmet and motorcycle carry him between neighborhoods. The outfit supports observation, following leads and approaching a scene before he acts as Batman.",
      ),
      b(
        "布鲁斯把街头观察记进日记，并用背包携带战衣。侦查与出勤因此连成一个过程：先以便装进入城市、记录人群与地点，再取出装备完成身份转换。背包承担运输，日记保留观察，两者都属于这套低调的行动方式。",
        "Bruce records street observations in a journal and carries the Batsuit in a backpack. Surveillance and patrol become one process: he enters the city in civilian clothes, records people and places, then takes out his equipment to change identity. The backpack handles transport and the journal preserves observations.",
      ),
    ],
    designDetails: [
      b(
        "《蝙蝠侠：元年》中布鲁斯穿便装上街的构想，提供了流浪者身份的起点。服装设计进一步考虑一个人怎样在现代人群中变得不起眼；帕丁森提出曼哈顿码头工人的工装与制服，让兜帽外套显得有日常用途，也避免穿出韦恩家族继承人的辨识度。",
        "Bruce's civilian street work in Batman: Year One provided the starting point. Costume design then asked what makes someone inconspicuous in a modern crowd. Pattinson suggested Manhattan dock workers' workwear and uniforms, giving the hooded jacket an everyday purpose without the recognizable appearance of the Wayne heir.",
      ),
      b(
        "妆容也配合这种隐匿：它保留疲惫、阴沉和不修饰的状态，与工装的现实质感相接。机车和头盔则延续同一个目标，让整套侦查装束从步行到骑行都维持普通街头骑手的轮廓。",
        "Makeup supports the disguise through a tired, withdrawn and unpolished appearance that belongs with the workwear. The bike and helmet continue the same brief, keeping the silhouette of an ordinary street rider whether Bruce is walking or riding.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/drifter-outfit.jpg",
        b("兜帽与工装造型", "Hooded workwear costume"),
        b(
          "压低的兜帽、深色外套和自然垂落的衣身，构成流浪者的街头轮廓。",
          "A lowered hood, dark jacket and loose garment shape form the Drifter's street silhouette.",
        ),
        8,
      ),
    ],
  },
];
