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
      "集成高强度白光照明管与红光遇险求救信号的紧凑伸缩棒状装具，可收纳于腰带战术插套。",
      "A compact telescoping baton combining high-intensity white inspection illumination and red emergency signaling, holstered on the tactical duty belt.",
    ),
    film: b(
      "洪灾救援深渊中的希望灯塔：布鲁斯高擎猩红照明棒涉水领路，指引受困民众走出黑暗废墟。",
      "A beacon of salvation amidst flooded ruins: Bruce hoists a blazing crimson flare through waist-deep waters, guiding stranded survivors out of the dark.",
    ),
    design: b(
      "设定集图版拆解了高压电筒与化学信号棒的双重结构，通过滚花防滑握把与伸缩套管满足执勤携带要求。",
      "Art-book schematics break down the dual utility of inspection torch and chemical flare, using knurled grips and collapsible sleeves to fit duty belt holsters.",
    ),
    filmDetails: [
      b(
        "腰带照明工具在日常勘查中作为暗处搜索的重要光源。战术腰带同时配备紫外线荧光检测灯与束带式手铐，覆盖了微量血痕勘查与现场控制等执法全流程；而这根便携照明棒则提供了广角无死角的泛光照明。",
        "The belt lighting kit serves as an essential search asset in routine crime-scene sweeps. The tactical belt integrates forensic UV lights alongside zip-tie cuffs, spanning chemical trace forensics and subject containment; while this compact baton provides wide-angle flood lighting in subterranean dark.",
      ),
      b(
        "在体育馆穹顶坠落后的洪灾救援高潮中，布鲁斯点燃猩红照明棒，在齐腰深的水流中高高举起。跳跃的红光划破绝望的深渊，布鲁斯从带来恐惧的暗夜义警彻底蜕变为带领绝望人群走出死亡阴影的引领者，赋予了这一实用工具深刻的救赎隐喻。",
        "In the flooded stadium aftermath, Bruce strikes the crimson flare, holding it aloft through surging waters. The flickering red blaze pierces absolute despair: Batman ceases to be an engine of nocturnal vengeance and emerges as a protector leading the trapped toward daylight, charging this utilitarian tool with profound emotional resonance.",
      ),
    ],
    designDetails: [
      b(
        "工程手稿深入研究了照明棒的伸缩与快拆联动机制：发光管身可完全缩入耐磨外壳中，将整体长度缩短至 15 厘米以便插入腰带模组；金属尾盖设有双向锁止按键与防水 O 型密封圈，确保其在极端泥水浸泡下仍能稳定激发生效。",
        "Engineering drafts examine the telescoping extension and rapid-draw latching: the illuminator tube retracts flush into a rugged protective sleeve, trimming overall length to six inches for belt pouch stowage; while a dual-detent metal tailcap and watertight O-rings guarantee flawless activation even submerged in toxic floodwaters.",
      ),
      b(
        "着色概念图将驱动电路与高容量锂电池集中在带深滚花防滑纹理的铝合金手柄内部，发光部分采用磨砂扩散聚碳酸酯透镜。其严谨硬朗的工业倒角与耐磨阳极氧化黑处理，与腰带上其他单兵执勤装具保持着严密的家族化美学。",
        "Rendered concept plates pack driver electronics and high-drain lithium cells within an aggressively knurled aluminum handle, fronted by a frosted polycarbonate diffuser lens. Crisp beveled shoulders and hard-anodized black coatings visually harmonize the baton with every other weapon system on the utility belt.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/light-flare.jpg",
        b("照明与化学信号棒总成", "Illumination and signal baton assembly"),
        b(
          "伸缩双模套管、滚花铝合金握把与广角扩散发光体。",
          "Dual-mode telescoping sleeve, knurled aluminum handle, and wide-angle diffuser.",
        ),
      ),
    ],
  },
  {
    id: "adrenaline-injector",
    name: b("急救注射器", "Emergency injector"),
    category: b("急救工具", "Emergency equipment"),
    summary: b(
      "腰带应急快速自注射装置，内置肾上腺素强化药剂，专供在濒死重创下强行激活心肺与战斗机能。",
      "A rapid auto-injector holstered on the belt, primed with emergency adrenaline to reboot cardiopulmonary drive and combat reflex under catastrophic trauma.",
    ),
    film: b(
      "体育馆高空角斗中近距离中弹濒死，布鲁斯拔出注射器强行扎入大腿，在药剂狂暴泵入中嘶吼反杀暴徒。",
      "Taking point-blank buckshot in the stadium climax, a fading Bruce drives the injector into his thigh, roaring back to consciousness in a savage chemical surge.",
    ),
    design: b(
      "设定集揭示其为针对战损研制的单兵肾上腺素注射器，紧凑滚花合金圆筒带有液位观察窗与防误触机械保险。",
      "The art book designates it as a combat adrenaline auto-injector, encased in a knurled alloy cylinder with a fluid inspection window and mechanical safety interlock.",
    ),
    filmDetails: [
      b(
        "在哥谭广场花园顶棚的惨烈搏杀中，布鲁斯遭到步枪近距离重创，仰面跌落高悬的横梁命悬一线。在意识即将溃散的绝境下，他艰难掏出这枚装满亮绿色药剂的应急注射器，反手刺破战衣扎入大腿肌肉。狂暴的药剂泵入血管，剧烈的心跳与神经脉冲将他从死亡边缘强行拉回，爆发出惊人的肉体搏击力量。",
        "In the ferocious catwalk struggle atop Gotham Square Garden, Bruce absorbs a devastating close-quarters blast, hanging over the abyss near cardiac arrest. Fighting slipping consciousness, he wrenches this emerald-fluid injector from his belt and drives the needle through his suit into femoral muscle. The chemical surge jolts his cardiovascular system awake, igniting an adrenaline-fueled final assault.",
      ),
      b(
        "这个生死攸关的施药瞬间将超级英雄的‘血肉之躯’刻画得淋漓尽致：蝙蝠侠会流血、会骨折、会陷入休克，他依靠的不是超越常理的超自然体魄，而是准备周密的创伤医学装具与摧折不灭的钢铁意志。",
        "This harrowing self-injection underscores the brutal physical mortality at the core of Batman: he bleeds, breaks ribs, and goes into shock. He survives not through superhuman immunity, but through rigorous trauma medical preparation and sheer indomitable will.",
      ),
    ],
    designDetails: [
      b(
        "设定集结构剖面图拆解了注射器的内部机械：耐压合金保护筒内封装高纯度药液玻璃安瓿与高回弹触发弹簧，底部设有一触即发的强力冲压针头；药管中央开有长条形视窗，便于在暗光下快速核验药液存量与清澈度，两端滚花端盖具备出色的防滑抓握力。",
        "Art-book sectional blueprints break down the internal mechanics: a heavy-walled alloy canister houses a hermetic glass ampoule and a high-load firing spring that drives the penetrator needle through Kevlar; a longitudinal inspection window allows rapid fluid inventory in the dark, bookended by aggressively knurled caps for gloved purchase.",
      ),
      b(
        "道具造型兼具军规急救医疗笔与战术穿刺器的双重特征：明快的绿色视窗在纯黑战衣与腰带间构成醒目的功能标记，顶端按压机械解脱保险可在遭遇剧烈翻滚撞击时杜绝意外误触，展现出严谨的战地创伤医学工程考量。",
        "The prop design marries the ergonomics of a military auto-injector with a tactical strike tool: the vivid emerald window creates an unmistakable focal point against the matte black loadout, while a positive mechanical thumb lock eliminates accidental discharge during extreme combat falls.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/adrenaline-injector.jpg",
        b("战斗应急注射器内部剖面", "Combat adrenaline injector cross-section"),
        b(
          "耐压合金外壳、高载荷弹簧冲压针头与绿色液位观察窗。",
          "Alloy protective sleeve, high-load spring-driven needle, and emerald inspection window.",
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
      "扁平圆形定向爆破磁吸黏弹，配有渐进式环形倒计时灯与三联装快拔腰带夹，支持遥控或定时定点破障。",
      "Flat circular magnetic shaped charges featuring progressive LED countdown dials and a three-round rapid-draw belt clip for precision demolition.",
    ),
    film: b(
      "扩展自黏弹发射器的单兵手持破障体系：既可徒手吸附在装甲钢门上定时引爆，亦可与发射筒联动实现远距投送。",
      "An expansion of the sticky-charge system: deployed by hand via powerful magnetic bases or launched through the pneumatic gun for standoff standoff breaching.",
    ),
    design: b(
      "爆炸分解图呈现磁铁底盘、聚能装药腔与环形发光时钟；专用腰带夹通过背部插扣实现戴手套下的盲操抽取。",
      "Exploded schematics detail the magnetic foot, shaped-charge liner, and circular dial; a dedicated three-cell clip ensures blind one-handed extraction with gloved hands.",
    ),
    filmDetails: [
      b(
        "这套圆形磁吸黏弹将破障作业推向极致的高效与可控。扁平圆盘底座内嵌高强钕铁硼磁铁，能牢固吸附在任何钢铁门轴、通风锁扣或机械连杆上；顶端中央设有一触式按压激活钮，配合外圈环形倒计时灯带，让布鲁斯在分秒必争的突入行动中直观掌控安全撤离时间。",
        "These circular magnetic charges bring demolition down to surgical precision. High-grade neodymium magnets in the base latch securely onto structural iron beams, vault hinges, or steel grates; a central tactile arming plunger and outer circular LED dial give Bruce immediate visual feedback on detonation timing under heavy fire.",
      ),
      b(
        "专用三联装腰带夹挂载于后腰侧，开式卡槽设计支持单手自上而下快速滑脱拔取。布鲁斯无需视线脱离战场，即可在潜行移动中连续取出三枚黏弹完成多点同步定点布设，展现出特种突击作战的战术严密性。",
        "A three-round rapid-draw caddy rides on the rear hip, engineered with open guide channels for swift, blind upward slide extraction. Bruce can strip charges without breaking visual contact with hostiles, stringing synchronized multi-point breaches across fortified choke points.",
      ),
    ],
    designDetails: [
      b(
        "分层爆炸图清晰展现了弹体的工业微构架：顶部抗冲击阳极氧化铝外壳、内部微电子定时芯片与发光二极管环、聚能微型爆炸装药层以及底部橡胶包裹的高强磁性吸盘。各层之间设有精密防潮密封圈，确保其在哥谭连绵阴雨中绝不短路失灵。",
        "Layered exploded diagrams reveal the internal micro-architecture: a CNC-machined top housing, timing microprocessor board with LED ring, shaped-charge payload, and rubberized magnetic base. Precision elastomeric gaskets between tiers guarantee complete waterproof reliability in Gotham's perpetual downpours.",
      ),
      b(
        "草图阶段还探讨了更方正的弹体与腰带夹轮廓，最终定型为边缘倒圆的紧凑圆饼造型。这一改动不仅降低了在腰间剧烈运动时的钩挂风险，更使其外径恰好吻合气动黏弹发射枪的发射筒内径，完成了‘手抛吸附’与‘枪射投送’两套系统的口径通用化。",
        "Early concept explorations evaluated bulkier rectangular charge profiles before converging on chamfered disc geometry. This profile eliminates snag hazards on belt webbing while matching the bore diameter of the pneumatic launcher barrel, standardizing ammunition between manual magnetic placement and stand-off launching.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/magnetic-charge.jpg",
        b("聚能黏弹与三联装快拔腰带夹", "Shaped charges and three-round rapid-draw clip"),
        b("钕铁硼磁吸底座、环形渐进发光时钟与盲拔腰带插槽。", "Neodymium magnetic foot, circular progressive LED timer, and blind-draw belt slots."),
      ),
      plate(
        "/media/gear-archive/magnetic-charge-sketch.jpg",
        b("黏弹微架构分层工程图", "Exploded micro-architecture schematics"),
        b("微电子定时芯片、聚能破障装药腔与弹性密封圈分解。", "Timing microprocessor board, shaped-charge payload, and elastomeric seals."),
      ),
    ],
  },
  {
    id: "compact-nunchucks",
    name: b("紧凑双节棍", "Compact nunchucks"),
    category: b("近战装具", "Close-combat equipment"),
    usageLabel: USE,
    summary: b(
      "收纳为一体化实心短棍、旋转解锁后拉出内置高抗拉链条的紧凑双节棍（Nunchucks），专为狭窄空间非致命格斗而设。",
      "A close-combat weapon stowing as a continuous solid baton that twists to unlock an internal high-tensile chain (compact nunchucks) for non-lethal strikes in confined spaces.",
    ),
    film: b(
      "收纳于腰带侧后方的高隐蔽近战兵器构想：在走廊与车厢等狭窄死角中瞬间变招，以沉重合金挥击瓦解持械暴徒。",
      "A high-concealment melee concept stowed at the rear belt: twisting open in tight corridors and vehicles to disarm armed assailants with devastating kinetic momentum.",
    ),
    design: b(
      "手绘线稿研究了双柄自锁卡榫、内部弹簧收线与链条伸展力学，使一件高烈度打击器械完美伪装在腰带的几何线条中。",
      "Sketches explore dual-handle detents, internal spring retractors, and chain kinematics, camouflaging a high-impact kinetic striking weapon within the belt's geometry.",
    ),
    filmDetails: [
      b(
        "这件双节棍（nunchucks）设计为布鲁斯在面对多名近身持械暴徒时提供了更具破坏力的非致命制敌手段。平素紧凑合拢为一根毫无多余外露件的短金属警棍插在腰间，一旦遭遇近身围堵，手腕轻拧即可顺畅解开轴心卡榫，在呼啸破风声中抽拉出高强度金属链节，凭借杠杆重击瓦解刀斧攻击。",
        "This compact nunchucks weapon grants Bruce explosive non-lethal stopping power against multiple armed assailants in confined quarters. Carried on the belt as a seamless, rigid short baton, a flick of the wrist releases internal retention catches to draw out the steel chain, generating tremendous kinetic whip to shatter blades and blunt trauma defenses.",
      ),
      b(
        "在狭窄巷道、楼梯转角或车厢内部等无法大幅度挥舞长兵器的死角，双节棍的变向打击与柔性绞杀特性能瞬间克制持械手腕。它与蝙蝠侠不使用火器的自设底线深度契合，是纯粹依靠体能、技巧与动能守恒压制罪恶的物理延伸。",
        "In stairwells and tight entryways where long weapons foul on walls, the articulated chain offers instantaneous angles of attack and joint entanglements to neutralize armed wrists. Deeply aligned with Bruce's refusal to use firearms, the weapon is a pure mechanical amplifier of human biomechanics and kinetic skill.",
      ),
    ],
    designDetails: [
      b(
        "概念手稿着重攻关了‘短棍到双截棍’的无缝形变工程：两段棍身在中部通过高精度四分之一圈旋转卡扣（Quarter-turn twist lock）咬合；拉开时，内置的高抗拉特种钢链与阻尼导套顺畅滑出，棍身内壁设有防缠绕自回位限位器，杜绝链环在高速挥击时产生死结。",
        "Concept drawings engineer a flawless transformation from baton to flail: the two handles lock flush via a quarter-turn twist-detent mechanism; upon separation, heavy welded steel chain links and swivel bushings deploy smoothly from internal recesses, engineered with anti-twist limits to eliminate chain knotting during high-velocity whips.",
      ),
      b(
        "着色图版展现了精细的表面人机工程学：棍体两端加工有菱形交叉滚花与指槽凹痕，提供高摩擦力握持；深沉哑光黑与端部抛光钛合金保护箍形成鲜明对比，在满足腰带紧凑横向挂载空间的同时，展现出韦恩私制格斗装备的严密工业美感。",
        "Render plates showcase fine tactical ergonomics: diamond knurling and shallow finger grooves maximize traction across both handles; matte black coating contrasts with heat-treated titanium end caps, fitting cleanly into the utility belt's horizontal carry envelope with uncompromising bespoke industrial precision.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/nunchucks.jpg",
        b("双节棍收纳短棍与链条展开姿态", "Nunchucks stowed baton and deployed chain configuration"),
        b(
          "四分之一圈旋转解脱榫、内置高抗拉特种钢链与腰带横置挂载方案。",
          "Quarter-turn twist detent, internal high-tensile steel chain, and horizontal belt carriage.",
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
      "嵌入战术手套指端的微型高压电击电弧发生器，掌面与指腹维持触觉感知以兼顾取证搜查。",
      "Micro high-voltage arc discharge electrodes embedded in tactical glove tips, leaving palms and finger pads unhindered for forensic trace recovery.",
    ),
    film: b(
      "近身锁喉与贴身制敌时的致命弱点打击：指尖触碰瞬间释放脉冲电流使目标肌肉痉挛，同时不剥夺搜查细小线索的指间触感。",
      "Precision electroshock delivered during close-quarters grappling: pulsed arcs paralyze target musculature on contact without compromising tactile sensitivity for minute clues.",
    ),
    design: b(
      "设定集图版展示了指尖电极嵌入、手背导线排布与实物道具手套，实现了格斗致残与物证勘验的精密共存。",
      "Art-book plates pair fingertip electrodes and dorsal wire routings with prop photography, achieving an elegant coexistence of incapacitating combat and forensic dexterity.",
    ),
    filmDetails: [
      b(
        "指部电击器将近距瘫痪手段无缝融入蝙蝠侠的手部格斗技。在近身缠斗或锁喉擒拿时，指尖微型电极可在触及目标神经丛或颈动脉窦的瞬间释放高频电弧脉冲，在零距离令暴徒神经中枢骤停、肌肉剧烈痉挛而失去抵抗，省去了拔取外部电击枪的繁琐动作。",
        "The finger taser integrates silent incapacitation straight into Batman's hand-to-hand combat system. In close clinch grappling or chokes, micro-electrodes at the fingertips discharge high-voltage pulsed currents into neural clusters or carotid arteries, incapacitating hostiles instantly without needing to draw an external stun gun.",
      ),
      b(
        "更为关键的是其对侦探工作的兼顾：布鲁斯是暗夜侦探，需要拾取凶案现场极其微小的字条、细绳与化学残渣。设计团队将电击电极严格限制在指甲外缘与指尖顶端，指腹依然保留高敏度触觉感知与抓握摩擦力，使执法武力与精细勘查完美共存。",
        "Critically, the tool never compromises detective tradecraft: Bruce must collect fragile cipher slips, severed cords, and chemical traces. By keeping electrodes strictly on nail margins and fingertips, the pulp of his fingers retains high tactile fidelity, letting lethal combat capability coexist with delicate crime-scene handling.",
      ),
    ],
    designDetails: [
      b(
        "图版深入研讨了微型电极的电气布置：柔性高绝缘扁平导线沿手背指关节自然顺延，避开频繁弯折的手指内侧；高压脉冲逆变电容与微型电池组被巧妙隐藏在护腕硬质夹层内，由大拇指轻触食指侧面的微动开关单点触发，杜绝握拳时的误触短路。",
        "Blueprints detail the electrical circuitry: flexible flat insulated leads route along the back of the knuckles, bypassing high-friction flex zones inside the palm; pulse inverter capacitors and micro-power cells tuck within the wrist bracer, activated via an index-finger micro-switch to eliminate short circuits while clenching fists.",
      ),
      b(
        "实物道具照片清晰记录了手套表面的分层质感：重磅牛皮与防割凯夫拉内衬上贴附着薄型合金导电触片，外露走线展现出布鲁斯在工作台上手工焊制改装的真实痕迹。这种‘不加修饰的裸露改装感’使其与纯科幻超级英雄道具划清了本质界限。",
        "Photographs of the physical costume glove capture realistic layered textures: thin conductive alloy contacts bond over heavy leather and slash-proof Kevlar, with exposed hand-soldered leads testifying to Bruce's solitary work at the bench. This raw, unadorned aesthetic separates the equipment decisively from sci-fi fantasy.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/finger-taser.jpg",
        b("战术手套电击系统与实物改装", "Tactical glove electroshock system and prop modifications"),
        b(
          "指尖电弧触点、手背柔性绝缘导线与保留指腹触觉的皮革掌面。",
          "Fingertip arc contacts, flexible dorsal leads, and tactile-preserving leather palm.",
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
      "外装于护臂储架的高抗拉特种钢投掷短刺（Bō-Shuriken），辅以外侧储架与单手快速拔取卡槽。",
      "High-tensile steel throwing rods (Bō-Shuriken) mounted on the outer gauntlet rack, secured in quick-release tension clips.",
    ),
    film: b(
      "出勤随身远距压制飞行道具：自前臂外侧顺势拔出甩掷，精准破坏探照灯源、击落危险引信或致残敌方持械手腕。",
      "A carried projectile for standoff suppression: drawn effortlessly from the outer forearm to shatter floodlights, sever cords, or disable armed wrists.",
    ),
    design: b(
      "手绘线稿明确将其注记为 throwing sticks 与 bō-shuriken；双侧分工使外侧五联装短刺与掌侧弹簧抓钩互不干扰。",
      "Sketches explicitly designate the fittings as throwing sticks and bō-shuriken; bilateral architecture isolates the five outer rods from the inner spring grapnel.",
    ),
    filmDetails: [
      b(
        "护臂外侧成排装载的高抗拉钢制投掷短刺（Bō-Shuriken），是蝙蝠侠在不使用火器的前提下实现中远距离战术压制的利器。在潜行渗透或正面遭遇战中，布鲁斯可顺着挥臂动作从前臂储架上行云流水般拔出钢刺甩手飞掷，精准击碎高处探照灯具、切断悬吊缆绳或击穿敌方持枪手腕。",
        "The parallel high-tensile steel throwing rods (Bō-Shuriken) mounted along the outer gauntlet afford standoff kinetic suppression without resorting to firearms. In infiltration sweeps, Bruce draws these spikes in one fluid sweeping motion to smash overhead floodlights, sever counterweight cables, or disable weapon hands across the room.",
      ),
      b(
        "这些短刺在全身装甲轮廓中形成了极具辨识度的前臂线条。它们既是取用迅速的锋利暗器，也是前臂外侧天然的防劈砍格挡加强筋，在近身战中能直接弹开砍刀和钢管的横扫，将武器携带与肢体防御合二为一。",
        "These cylindrical steel spikes form a menacing visual signature along the forearm. Functioning simultaneously as rapid-draw throwing weapons and rigid sacrificial ribs to deflect machete chops, they merge ammunition carriage and limb armor into one solid assembly.",
      ),
    ],
    designDetails: [
      b(
        "Glyn Dillon 在手稿中明确使用了东方古武术‘棒手里剑’（Bō-Shuriken）与‘投掷棒’（Throwing Sticks）的原始技术注记。外侧储架可容纳 5 枚高硬度双头穿甲钢刺，每枚钢刺均经过精密动平衡车削，尾部带有细密防滑滚花以便双指牢固夹持，尖端经过高频淬火具备极强的穿甲贯穿力。",
        "Glyn Dillon's notes explicitly apply the martial terminology of Bō-Shuriken and throwing sticks. The outer rack houses five high-hardness double-ended armor-piercing spikes, each spin-balanced on a lathe with knurled tails for two-finger pinching and induction-hardened chisel tips for maximum structural penetration.",
      ),
      b(
        "结构设计图着重展示了外侧储架与护臂基座的安装逻辑：储架底板通过阻尼弹簧卡簧分别锁紧 5 枚短刺，外力拔出顺滑而剧烈冲撞中绝不脱落；储架下方垫有双道缝线厚单宁布与缓冲胶垫，与掌侧的抓钩发射滑轨形成物理绝缘，确保双方在极端作战中各自独立运转。",
        "Engineering schematics demonstrate how the outer rack integrates onto the bracer: spring-tensioned leaf detents retain each spike, releasing smoothly upon an intentional draw while resisting dislodgement during hard falls; heavy double-stitched denim cushions the base, keeping the dart magazine completely isolated from the palm grapnel.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/forearm-spikes.jpg",
        b("外侧五联装手里剑与实物装具", "Outer five-spike rack and prop assembly"),
        b("高频淬火穿甲双头钢刺、成排阻尼卡簧与防割单宁衬垫。", "Induction-hardened double-ended steel spikes, leaf detents, and heavy denim lining."),
        4,
      ),
      plate(
        "/media/gear-archive/gauntlet-release.jpg",
        b("五枚短刺储架与快速拔取工程草图", "Five-spike rack and rapid-draw engineering sketches"),
        b(
          "外侧储架装配逻辑、F-Lock 战术扣带与内侧滑轨物理绝缘结构。",
          "Outer rack mounting, F-Lock tactical webbing, and guide rail physical isolation.",
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
      "参考现代特警执勤标准的高强度聚合物束带式手铐，轻质折叠收纳于腰带附包，专供群体制服与快速拘押。",
      "High-strength polymer zip-tie cuffs modeled on modern SWAT duty gear, folded into belt pouches for rapid multiple-suspect restraint.",
    ),
    film: b(
      "现场调查与瓦解犯罪链条的控制装具：在突袭后将失去抵抗的暴徒迅速约束，确保现场物证与人证处于可控状态。",
      "Tactical restraint hardware: swiftly binding subdued suspects after dynamic entries to secure suspects and preserve forensic integrity.",
    ),
    design: b(
      "摒弃笨重金属手铐，选用柔性特种尼龙双联环束带，完美呼应出勤第二年强调机动性、自足性与现实执法质感的装备体系。",
      "Rejecting bulky steel handcuffs in favor of flexible dual-loop nylon ties, matching the mobility and realism of Year Two street-level policing.",
    ),
    filmDetails: [
      b(
        "束带式手铐是蝙蝠侠执法工具链中不可或缺的控制环节。在突袭地下赌场、废弃码头或走廊遭遇战中，面对多名被击倒失去抵抗的嫌疑人，布鲁斯从腰带侧袋抽出轻巧的双联环高强度束带，单手即可完成双腕反剪死锁，彻底切断暴徒反扑或销毁证据的可能。",
        "Zip-tie cuffs form the vital restraint phase of Batman's operational loop. Following dynamic sweeps through illicit dens, flooded basements, or dockside warehouses, Bruce strips lightweight dual-loop ties from his belt pouches, binding suspects' wrists behind their backs in seconds to freeze the scene.",
      ),
      b(
        "相较于传统沉重的金属钢铐，这种高强度工业尼龙束带几乎不占重量与腰带空间，使布鲁斯能够随身携带多达数十副，在不依赖 GCPD 巡警支援的情况下独自完成整间屋子的人员控制，彰显了这位独行侠冷静冷酷的专业执法素养。",
        "Unlike bulky steel chain cuffs, high-tensile nylon flex-cuffs add negligible weight and bulk, allowing Bruce to pack dozens of restraints. He can secure an entire room of subdued hostiles single-handedly without waiting for police backup, epitomizing the ruthless procedural discipline of a solo vigilante.",
      ),
    ],
    designDetails: [
      b(
        "设计团队深入调研了美国一线特警与特种部队在城市反恐中携带的现役执勤装备（Duty Gear）。腰带收纳袋采用哑光黑色粗帆布与加厚皮革拼接而成，内部设有分隔收纳插槽，使折叠成扁平‘U’型的双环束带能像战术弹匣一样顺畅插拔，绝不在行动中卡带。",
        "The design department studied frontline SWAT and special operations duty kit. Belt pouches combine matte black heavy canvas and reinforced leather with internal divider sleeves, stowing flat U-folded zip-cuffs like magazines for snag-free deployment.",
      ),
      b(
        "设定集图版强调了整条腰带的系统化配重：束带式手铐与紫外线取证笔、多用途工具钳等非杀伤性工具统一分配在左侧战术袋中，与右侧重型穿甲短刺、黏弹发射器形成严格的重力与功能平衡，反映出布鲁斯在装备配置上极度理性的战术逻辑。",
        "Art-book loadout spreads emphasize calculated belt weight distribution: flex-cuffs, UV forensics, and multi-tools populate the left-hand pouches to counterbalance heavy breaching charges and the grapnel on the right, evidencing Bruce's rigorous tactical discipline.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/belt.jpg",
        b("腰带多功能装具矩阵布局", "Multi-role duty belt matrix layout"),
        b("哑光黑粗帆布分隔附包、双联环特警高强度束带与快拆金属锁扣。", "Matte black canvas divider pouches, dual-loop SWAT flex-cuffs, and rapid buckles."),
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
      "连接记录镜片与车间主机的三防便携数据终端与浸润式感应读取底座，实现前线侦查视频的极速转存与解密。",
      "A rugged field terminal and inductive fluid-well docking station bridging recording lenses with mainframes for instant data retrieval and decryption.",
    ),
    film: b(
      "完成潜入任务后回收视网膜镜片影像：将隐形眼镜浸入读取槽，现场录制的声画数据瞬时投射至分析大屏，拼合犯罪网络拼图。",
      "Recovering retinal lens feeds after missions: seating the contact lens into the dock transfers captured audio and video to the analysis wall, connecting syndicate clues.",
    ),
    design: b(
      "Matthew Savage 的概念稿细致推敲了圆柱感应舱、旋转防尘锁扣与军规加固外壳，构建出令科技隐形于现实的硬核外设系统。",
      "Matthew Savage's concept drafts detail cylindrical inductive docks, rotating dust covers, and hardened enclosures, grounding advanced tech in rugged peripherals.",
    ),
    filmDetails: [
      b(
        "镜片读取器是整套微型光学情报网的关键解密枢纽。当瑟琳娜结束冰山俱乐部的惊险潜入后，布鲁斯在现场或车间将微型隐形眼镜小心夹入读取器的特制浸润凹槽中；设备通过圆周微型触点与感应线圈瞬间激活镜片内置闪存，将未压缩的高清第一人称影像直接导入控制台进行多源分析。",
        "The lens reader is the decryption nexus of the micro-optic intelligence network. Following Selina's tense infiltration of the club, Bruce seats the spent contact lens into the reader's fluid dock; inductive pin arrays interface with onboard flash storage, streaming uncompressed POV footage onto the analysis consoles.",
      ),
      b(
        "这一装置将‘单兵现场侦查’无缝链接到‘情报研判中枢’。布鲁斯与阿尔弗雷德得以在安全屋中逐帧倒回关键画面、放大涉案嫌疑人佩戴的特殊袖扣或文件公章，使现场惊险捕捉的蛛丝马迹转化为不可辩驳的铁证。",
        "The hardware bridges field reconnaissance with investigative analysis. Back in the sanctuary, Bruce and Alfred scrub through crucial frames, magnifying cuff links, ledger seals, and whispered conversations to forge indisputable chains of evidence.",
      ),
    ],
    designDetails: [
      b(
        "Matthew Savage 在 Lens Reader 2.0 手稿中详尽推演了微观接触界面的工程实现：读取仓内设有一圈微型镀金探针触点与电感能量发射线圈，能够自适应镜片周边的同心导电线路；外部配有高精度旋转开合防尘盖与硅胶减震衬套，确保在颠簸的车内也能完成无损数据拷贝。",
        "Matthew Savage's Lens Reader 2.0 sheets map the microscopic interface: the dock integrates gold-plated pogo pins and inductive power coils that self-align with the lens's concentric traces; a rotating dust seal and shock-mounted sleeve ensure data transfers proceed without corruption even in transit.",
      ),
      b(
        "除车间台式读取基座外，设计团队还专门推演了可随身携带的军规加固便携手持终端：深色阳极氧化铝外壳配有橡胶防撞角与物理按键，腰带侧袋可随时收纳备用加密固态存储卡，赋予布鲁斯在任何突发恶劣环境下独立提取并销毁情报的战术自由。",
        "Alongside the workshop desktop dock, the art book explores a hardened field terminal: an anodized aluminum shell with rubber bumpers and physical keys, paired with belt-carried encrypted SSD modules to give Bruce field extraction and sanitization capability under adverse conditions.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/lens-reader-study.jpg",
        b("浸润式读取底座与便携加固终端", "Fluid-well dock and hardened field terminal"),
        b(
          "圆周镀金探针触点、旋转防尘密封盖与战术数据转存接口推演。",
          "Gold pogo-pin arrays, rotating dust cover, and tactical data-transfer interfaces.",
        ),
      ),
    ],
  },
  {
    id: "surveillance-earpiece",
    name: b("监听耳机", "Surveillance earpiece"),
    category: b("通讯设备", "Communications"),
    summary: b(
      "微型骨传导隐藏式入耳监听耳机，与隐形眼镜协同作业，构筑第一人称视线追踪与实时暗中战术语音通讯。",
      "A miniature bone-conduction covert in-ear transceiver pairing with recording lenses to enable live POV tracking and whispered tactical comms.",
    ),
    film: b(
      "瑟琳娜卧底潜入时的暗中护航生命线：布鲁斯在场外通过耳机实时指引逃脱路线与应对话术，化解一次次致命试探。",
      "The covert lifeline during Selina's undercover infiltration: Bruce whispers escape routes and conversational counters into her ear, dodging lethal mob interrogations.",
    ),
    design: b(
      "手绘线稿细致模拟耳廓人体工学贴合弧度与深色隐蔽外壳，与大型光学监视基站同图呈现，构筑立体监控体系。",
      "Drafts model concha ergonomics and darkened covert shells, presented alongside heavy optical surveillance stations to form an integrated listening network.",
    ),
    filmDetails: [
      b(
        "这枚隐形监听耳机是布鲁斯与瑟琳娜在深入虎穴时的战术生命线。当瑟琳娜穿梭于充斥着持枪保镖与嗜血政客的贵宾包厢时，布鲁斯的冷静指令通过微型耳机直接送入她的耳道——无论是提醒她身后逼近的保镖，还是教她在法官面前虚与委蛇，这件道具在悄无声息中化解了一次次致命危机。",
        "This covert in-ear transceiver serves as Selina's lifeline behind enemy lines. As she maneuvers through VIP lounges crawling with mob enforcers, Bruce whispers steady tactical directions into her ear canal—spotting trailing muscle and feeding counter-lines to disarm suspicious officials.",
      ),
      b(
        "声音与画面的精密同步彻底改变了潜入行动的节奏：布鲁斯在车间通过视网膜镜片‘看她所看’，通过微型耳机‘语其所言’。两件微型道具让身处暗处的蝙蝠侠如同幽灵般如影随形，实现了跨越物理隔绝的深度控场。",
        "Flawless audio-visual synchrony redefines undercover infiltration: Bruce sees what Selina sees via the retinal lens, directing her movements through the earpiece. The paired microsystems project Batman's phantom presence across walls, controlling the encounter from afar.",
      ),
    ],
    designDetails: [
      b(
        "概念图纸深入推敲了耳机的耳廓解剖学适配：微型外壳采用亲肤哑光黑色医用树脂，依照人体外耳道三维弧度精细塑形，确保塞入后极度隐蔽且在剧烈奔跑甩头时绝不松脱；内置微型受话器与防风噪滤波麦克风，即使在低声耳语时也能保持极高信噪比。",
        "Concept drawings engineer precise auricular fit: cast in skin-safe matte black medical resin shaped to human concha anatomy, the earpiece seats invisibly and resists expulsion during running; an integrated bone-conduction receiver and noise-filtering mic capture faint whispers with crystal fidelity.",
      ),
      b(
        "该图版将微型个人耳塞与更庞大的远程光学侦查设备并列于同一张纸面上：从几毫米大小的入耳单元，到带有散热格栅、重型镜头筒与精密微调旋钮的三脚架远程基站，生动展示了布鲁斯在暗夜中从微观单兵互联到宏观城市监视的完整技术储备。",
        "The sheet pairs the micro in-ear bud with heavy tripod-mounted optical surveillance stations: from millimeter-scale covert transducers to heavy zoom lenses with cooling ribs, illustrating Bruce's comprehensive spectrum of technological capability from micro-comms to citywide reconnaissance.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/earpiece-study.jpg",
        b("耳道骨传导耳机与远程光学基站", "Concha transceiver and long-range optical stations"),
        b(
          "下部为人体耳廓仿生哑光树脂耳机，上部为长焦透镜侦查装置。",
          "Lower studies of concha-molded resin earpiece; upper studies of telephoto optics.",
        ),
      ),
    ],
  },
  {
    id: "drifter-kit",
    name: b("流浪者侦查装束", "Drifter surveillance outfit"),
    category: b("便装侦查", "Undercover surveillance"),
    summary: b(
      "兜帽工装外套、重型耐磨帆布裤、暗面骑行头盔与收纳战衣的双肩包，构筑布鲁斯遁入哥谭市井平民人群的流浪者装束（Drifter Kit）。",
      "A hooded workwear jacket, heavy canvas trousers, dark helmet, and backpack stowing the Batsuit, composing the Drifter surveillance outfit for vanishing into Gotham crowds.",
    ),
    film: b(
      "游走于豪门阔少与披甲义警之间的第三身份：在市长遇刺后的混乱街头低调勘查，用血丝双眼与随身日记记录哥谭溃烂的肌理。",
      "A third identity suspended between reclusive billionaire and armored specter: walking crime-scene perimeters to log Gotham's rot in a leather journal.",
    ),
    design: b(
      "罗伯特·帕丁森与服装设计师 Jacqueline Durran 深入调研曼哈顿码头工人工装；化妆师 Naomi Donne 以疲惫真实的病态阴郁妆容剥离一切明星光环。",
      "Robert Pattinson and Jacqueline Durran drew directly on Manhattan dock worker uniforms; Naomi Donne crafted an unpolished, hollow-eyed makeup that strips away heroic glamour.",
    ),
    filmDetails: [
      b(
        "‘流浪者’是布鲁斯在韦恩家族显赫继承人与披甲暗夜义警之间构筑的第三重人格。在穿上沉重战衣之前，他身披宽大洗褪色的深色工装外套，兜帽深压遮蔽冷峻眉目，骑着平民机车自如穿梭于犯罪现场周边的封锁线与底层集市。他像一个无家可归的街头幽灵般隐入人群，冷静观察着警察、记者与市民的微表情，将所见所思密密麻麻记录在随身日记之中。",
        "The 'Drifter' is the vital third identity Bruce inhabits between the recluse billionaire and the armored vigilante. Before donning the heavy Batsuit, he slips into an oversized faded workwear jacket, hood pulled low over shadowed eyes, gliding through police cordons on a civilian bike. Vanishing into crowds like an urban phantom, he studies the faces of cops and mobsters, noting observations in his journal.",
      ),
      b(
        "这种极具生活质感的侦查装束解决了‘如何将重装战衣带至战场’的现实难题：沉重的蝙蝠战衣被严密折叠打包进背后的磨损重磅帆布双肩包内。正如帕丁森所言，这就像是‘粗粝肮脏版的超人钻进电话亭’，在肮脏逼仄的暗巷深处完成由疲惫流浪者向可怖复仇化身的蜕变。",
        "This grounded surveillance attire solves the logistical puzzle of hauling heavy combat gear into the field: the Batsuit travels rolled inside a scuffed canvas backpack. As Pattinson described it, the sequence is 'the grimy version of Superman going into the phone box,' transforming in damp alley corners from an exhausted vagrant into an engine of vengeance.",
      ),
    ],
    designDetails: [
      b(
        "服装设计总监 Jacqueline Durran 透露，帕丁森深度主导了这套服装的研发逻辑：‘在现代人群中隐形的终极方式，就是穿上一套随处可见的工装制服。’帕丁森特别指出纽约曼哈顿码头工人耐磨工装（Dock Workers' Workwear）的粗糙质感，深蓝与炭灰色重磅水洗帆布、宽大下摆以及毫无辨识度的大众款式，让任何监视者都会在扫视人流时直接将其忽略。",
        "Costume designer Jacqueline Durran revealed that Pattinson drove the conceptual evolution of the disguise: 'What makes you invisible in a modern crowd is wearing some sort of uniform.' Pattinson specifically cited the workwear of Manhattan dock workers—faded navy and charcoal canvas, relaxed utilitarian silhouettes, and utterly generic cuts that allow a watcher to sweep over him unnoticed.",
      ),
      b(
        "化妆设计总监 Naomi Donne 更是坚决摒弃了一切好莱坞传统男主角的精致妆造，为流浪者布鲁斯设计了凹陷眼窝、苍白皮肤与暗黑疲惫眼妆，散发着终年缺乏阳光照射与深陷创伤执念的悲凉质感；搭配一顶毫无特征的磨砂全盔，完美实现了从步行穿越人潮到疾速驾车脱险的无缝潜伏闭环。",
        "Makeup designer Naomi Donne deliberately discarded all flattering leading-man aesthetics, crafting sunken eye hollows, pallid skin, and smudged black makeup reflecting perpetual sunlight deprivation and obsessive trauma; paired with a featureless matte motorcycle helmet, the disguise creates a seamless loop from walking the streets to rapid motorized extraction.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/drifter-outfit.jpg",
        b("曼哈顿码头工人工装与流浪者伪装", "Manhattan dock workwear and Drifter disguise"),
        b(
          "水洗耐磨粗帆布兜帽外套、战衣收纳双肩包与去明星化的真实疲惫妆容。",
          "Washed heavy canvas workwear, suit-carrying backpack, and unpolished realistic makeup.",
        ),
        8,
      ),
    ],
  },
];
