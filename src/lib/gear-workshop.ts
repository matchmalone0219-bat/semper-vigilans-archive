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
      "后置双涡轮增压大排量 V8 引擎与中央喷气推力喷口的狂暴动力总成，以滚烫排气、烈焰回火与野兽低吼构成战车的动力心脏。",
      "A savage mid-rear twin-turbo V8 powertrain paired with a central jet afterburner, driving the Batmobile with searing exhaust, backfire flames, and predatory rumble.",
    ),
    film: bilingual(
      "暴雨暗巷中先声夺人的压迫狂潮：双涡轮泄压阀锐啸与车尾喷薄而出的炽烈火光，将改装野兽的冲刺加速烙印在企鹅人恐惧的瞳孔中。",
      "Psychological shock in the rain-soaked alley: screaming turbo blow-off valves and erupting jet flames brand the charging beast into the Penguin's terrified gaze.",
    ),
    design: bilingual(
      "结构草图深入推敲后轴上方动力总成布置、高导热冷却管线走位、大截面支撑加强梁以及侵入乘员舱的变速箱包络空间。",
      "Layout drafts analyze powertrain packaging over the rear axle, high-capacity cooling conduits, heavy chassis trusses, and cabin-encroaching transmission clearance.",
    ),
    filmDetails: [
      bilingual(
        "在冰山俱乐部后巷，蝙蝠战车以引擎声浪作为先发制人的心理兵器。在车辆尚未起步前，沉重低沉的怠速回响与双涡轮增压器吸入冷空气的尖锐啸叫在砖墙间剧烈回荡；随后，中央喷气推进器在黑暗中猛然点火，一道湛蓝与炽橘交织的烈焰撕裂雨幕，将企鹅人及其保镖的防御意志彻底碾碎，随即爆发出冲撞一切的毁灭级扭矩。",
        "Outside the Iceberg Lounge, the Batmobile deploys its acoustic powertrain as psychological artillery. Before wheel slip occurs, idling V8 bass notes and screaming twin-turbo compressor whistles resonate off wet masonry; then the central jet ignites, a blue-orange inferno ripping through rain sheets to break the mob's nerve before unleashing devastating torque.",
      ),
      bilingual(
        "车尾结构完全摒弃了平整的外覆件，粗大弯曲的不锈钢排气管、外露中冷导管、减震器塔顶与重载发动机悬置支架在雨水与泥浆中肆意蒸腾着高温白雾。每一次公路急加速与火海穿行，都伴随着排气尾管喷出的剧烈回火，将实战改装车的暴力机械美学推向顶峰。",
        "The rear chassis discards cosmetic body panels, leaving mandrel-bent stainless exhaust manifolds, intercooler pipes, and structural engine trusses sizzling in hot steam through mud and spray. Every snap of the throttle vents violent backfire flames, elevating the raw kinematics of a purpose-built combat machine to screen legend.",
      ),
    ],
    designDetails: [
      bilingual(
        "概念草图通过严谨的俯视与侧视图深入推敲了这套怪兽级引擎的空间布局：手绘旁注明确指出将巨大引擎重心直接压在后轴上方（Engine sits over axle），以最大化后轮抓地力，但随即引发了后桥过载与全车配重平衡的严峻工程挑战；为此，Chinlund 特别设计了横跨车体肩部的重型加强横梁，死死锁紧后悬挂支点与动力总成。",
        "Concept blueprints analyze spatial packaging through rigorous orthographic drafts: handwritten notes dictate placing the heavy block directly over the rear axle to maximize launch traction, immediately introducing severe axle loading challenges; Chinlund countered this by integrating heavy tubular crossmembers tying the rear suspension uprights to the chassis spine.",
      ),
      bilingual(
        "另一组手绘注释重点攻坚了极度苛刻的热管理与传动通道布局：为了让大功率引擎在连续极端狂飙中迅速降温，设计团队将粗壮的冷却管道直接排布在副驾驶乘员舱侧壁（Cooling conduit next to passenger section），甚至允许部分传动系统与变速箱外壳侵入座舱后部空间。这些为了追求纯粹性能而妥协的硬核工程痕迹，构成了战车无可替代的硬核工业质感。",
        "Further technical notes tackle extreme cooling and transmission clearance: to prevent thermal meltdown under sustained boost, massive coolant lines route alongside the passenger cell, with oversized gearbox housings encroaching directly into the rear cabin. These uncompromising packaging solutions endow the Batmobile with visceral, authentic racing engineering.",
      ),
    ],
    plates: [
      plate(
        "/media/engine.jpg",
        bilingual("战车后置双涡轮 V8 动力总成", "Batmobile rear twin-turbo V8 powertrain"),
        bilingual(
          "车尾喷气推力喷口火光照亮外露机械，蝙蝠侠伫立在战车旁。",
          "Jet afterburner flames light exposed machinery as Batman stands beside the car.",
        ),
      ),
      plate(
        "/media/gear-archive/engine-layout.jpg",
        bilingual("后置引擎结构布局与热管理草图", "Rear engine layout and thermal management drafts"),
        bilingual(
          "俯视与侧视图推敲引擎后轴重心、乘员舱冷却管道及支撑横梁。",
          "Top and side drafts analyzing axle loading, cabin coolant lines, and support crossmembers.",
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
      "布鲁斯出席市长追悼会时驾驶的 1963 年雪佛兰 Corvette Sting Ray 黑色经典跑车，以修长车头与标志性分体式后窗彰显豪门公子的疏离气场。",
      "Bruce's black 1963 Chevrolet Corvette Sting Ray driven to the mayoral memorial, projecting reclusive billionaire stature with its split rear window.",
    ),
    film: bilingual(
      "冷雨街道上驶入悼念现场的黑色孤骑：修长低趴的车身穿行于媒体闪光灯与严密警卫之间，在公众视线中勾勒出韦恩继承人孑然一身的阴郁阴影。",
      "A solitary dark silhouette arriving through the downpour: long low-slung lines gliding through flashing cameras and police barricades, framing Bruce's brooding public persona.",
    ),
    design: bilingual(
      "修长的隆起发动机盖、肌肉感轮拱与传世分体式后窗，与地下车间粗粝外露的蝙蝠战车形成文明与野性的极具张力对偶。",
      "The sculpted hood, flared fenders, and historic split rear glass stand in deliberate contrast to the exposed, savage Batmobile in the subterranean garage.",
    ),
    filmDetails: [
      bilingual(
        "市长追悼会是布鲁斯在全片中罕见以真实身份暴露于公众强光之下的关键场景。这辆光亮如墨的黑色 Corvette Sting Ray 缓缓滑停在市政大厅外的拥挤长街上，布鲁斯身着修长黑风衣从车中步出，在刺眼的记者闪光灯、低语的政客与警惕的警员注视下默默穿行。这辆充满古典尊贵气质的跑车，成为了这位遗世独立豪门孤儿最体面的公开护甲。",
        "The mayor's memorial is the rare instance where Bruce steps into the blinding glare of public scrutiny. This glossy obsidian Corvette Sting Ray glides to the curb outside city hall, Bruce emerging in tailored black wool to walk a gauntlet of flashing cameras, whispering officials, and uneasy cops. The classical pedigree of the automobile acts as formal armor shielding a wounded recluse.",
      ),
      bilingual(
        "这辆私人座驾与地下车间内由他亲手改造的蝙蝠战车在叙事中构成了深刻的双重镜像：前者是一件线条流丽、保存完好但被束之高阁的顶级工业艺术遗产，代表着他试图逃避的韦恩家族名望；后者则是布鲁斯割裂优雅文明、以重锤钢管拼凑出的暴力复仇图腾。同一位车主，驾驭着两台分处哥谭光明与黑暗两极的黑色机械。",
        "The civilian sports car and the handmade Batmobile form a poignant psychological mirror: the Corvette is an immaculate, flowing sculpture inherited from a gilded dynasty he avoids; while the Batmobile is a savage weapon forged from welded steel and fury. A single driver operating two black machines at opposite poles of Gotham's soul.",
      ),
    ],
    designDetails: [
      bilingual(
        "设定集图版展示了实拍选用的 1963 年款分窗双门跑车（Split-window Coupe）外观细节：修长前发动机舱盖在阴郁天色下折射出如水墨般的深沉黑光，高高耸起的两侧前轮拱如同潜伏肌肉，车身腰线沿侧门急剧向内收拢至车尾，在镀铬保险杠与极简圆形尾灯的映衬下展现出 1960 年代美国汽车工业巅峰时期的优雅比例。",
        "Art-book spreads document the 1963 Split-Window Coupe selected for filming: an elongated hood reflecting deep ink-like gloss under overcast skies, twin front fenders arching like tensed sinew, and a pinched waist tapering back to delicate round taillights and chrome accents that epitomize the pinnacle of 1960s American grand touring elegance.",
      ),
      bilingual(
        "最富盛名的中央立柱分体式后车窗（Split Rear Window）在街景特写中格外醒目。前后两重视角的摄影并列，不仅确立了布鲁斯在公开场合高贵而克制的品位，更与蝙蝠战车外露管路、宽幅赛车热熔胎和粗暴钢架形成了强烈的美学对撞，直观呈现了角色内心撕裂的精神图景。",
        "The famed split rear window takes center stage in street-level cinematography. Paired front and rear photographs establish Bruce's aristocratic restraint, setting up a visceral aesthetic counterpoint against the exposed plumbing and crash bars of the Batmobile to embody his fractured internal duality.",
      ),
    ],
    plates: [
      plate(
        "/media/corvette.jpg",
        bilingual("黑色 1963 Corvette Sting Ray 跑车", "Black 1963 Corvette Sting Ray Coupe"),
        bilingual(
          "阴雨外景展现低矮流线车身、修长前舱盖与隆起肌肉轮拱。",
          "Location photography highlighting the low-slung body, elongated hood, and flared fenders.",
        ),
      ),
      plate(
        "/media/gear-archive/corvette-sheet.jpg",
        bilingual("Corvette 经典分体式后窗与前后视角", "Corvette split rear window and paired views"),
        bilingual(
          "前后街景照片呈现传世分窗结构、极简圆形尾灯与镀铬线条。",
          "Paired street photos showcasing the historic split window, round tail lamps, and chrome details.",
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
      "隐匿于韦恩塔地底的废弃私人地下车站，高耸砖石拱廊容纳升降机车架、调查显示器阵列与重型改装工作台。",
      "A decommissioned private subway station beneath Wayne Tower, housing vehicle lifts, investigation display banks, and heavy fabrication benches.",
    ),
    film: bilingual(
      "暗夜执勤归来的庇护所与研判中枢：在这里冲洗泥泞战车、缝补撕裂战衣、反复逐帧解密视网膜录像，将街头线索编织成破案铁证。",
      "Sanctuary and investigative brain center: washing mud from the car, repairing armor, and scrubbing through retinal feeds to assemble the syndicate puzzle.",
    ),
    design: bilingual(
      "艺术指导 James Chinlund 依托历史车站挑高拱券与旧轨道，以工业钢架、垂落管线与局部作业照明勾勒出仍在生长的私法基地。",
      "James Chinlund repurposed towering historic railway vaults and disused tracks with steel gantries and hanging power conduits to forge an evolving garage base.",
    ),
    filmDetails: [
      bilingual(
        "地下车间是布鲁斯从暗夜杀戮回到现实沉淀的唯一据点。沿着幽深的废弃铁路线骑行潜入，映入眼帘的是哥谭百年前旧铁路站台高耸宏大的红砖拱顶与锈蚀轨道。在这片尘封的地下遗迹中，战车维修平台、多联装工业监视器阵列与重型机床错落铺展，构筑起集载具维护、弹道试验与法医情报研判于一体的战备心脏。",
        "The underground workshop is Bruce's sole sanctuary after long nocturnal hunts. Gliding in along abandoned rail lines, the vast brick vaults and rusted tracks of Gotham's decommissioned private terminal rise overhead. Embedded within this industrial ruin sit vehicle lifts, surveillance display walls, and heavy machine benches—a unified nerve center for vehicle fabrication, ballistics, and forensic synthesis.",
      ),
      bilingual(
        "这个空间绝非一尘不染的高科技科幻基地，而处处弥漫着机油、冷却液、焊渣与湿冷地气的真实车间质感。在这里，阿尔弗雷德与布鲁斯并肩伫立在微光屏幕前破解谜语人的密码信件，地面上随处可见散落的扳手、测试凝胶与防弹板样品，见证着这个年轻义警在孤独中逐步构筑整套自研装备的漫长历程。",
        "This space rejects sterile sci-fi cliches, filled instead with the scent of motor oil, coolant, welding slag, and damp subterranean air. Here Alfred stands beside Bruce parsing the Riddler's ciphers before glowing monitors, surrounded by scattered wrenches, ballistic gelatin molds, and test plates that trace the solitary evolution of his equipment.",
      ),
    ],
    designDetails: [
      bilingual(
        "艺术指导 James Chinlund 确立了‘在历史遗迹中寄生搭建’的空间哲学：旧私人车站宏大的体量远超布鲁斯的实际使用面积，因此他仅在中央轨道区搭建了紧凑的钢结构步道平台与升降作业架。远处未被照亮的巨型拱廊沉没在重重黑暗之中，赋予了地下基地深邃不可测的纵深感与庇护安全感。",
        "Production designer James Chinlund established an architectural concept of 'parasitic construction': the gargantuan scale of the old railway terminal dwarfs Bruce's actual working footprint, so he erected compact steel catwalks and lifts over the central rail bed, leaving distant arched galleries shrouded in shadow to create vast spatial depth.",
      ),
      bilingual(
        "车间照明系统遵循严密的功能分区：悬挂式高流明工作射灯精准聚焦于车辆机舱与调查台面，其余广阔区域则维持低照度自然暗光。纵横交错的供电电缆、压缩空气气管沿立柱与金属梁随意捆扎延展，这种未经雕饰的工业粗粝感，完美映射出出勤第二年蝙蝠侠仍在不断迭代、未臻完美的行动体系。",
        "The lighting layout adheres to strict functional zoning: hanging high-lumen floodlights pool sharply over vehicle bays and investigation terminals, leaving the surrounding perimeter in ambient twilight. Bundled high-voltage power lines and pneumatic conduits clamp across stone columns, an unfinished industrial footprint reflecting a Year Two vigilante system still under construction.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-cave.jpg",
        bilingual("地下车间核心维护与研判区", "Underground workshop core maintenance and recon hub"),
        bilingual(
          "红砖拱顶下并置战车液压升降台与多联装监视大屏，垂落线缆点亮工位。",
          "Brick-vaulted space uniting hydraulic car lifts and surveillance banks under hanging work lights.",
        ),
      ),
      plate(
        "/media/gear-archive/cave-station.jpg",
        bilingual("废弃私人铁路车站空间全貌", "Decommissioned private railway station architecture"),
        bilingual(
          "百年前高挑拱廊与铁轨废墟衬托出战备基地寄生搭建的深邃纵深。",
          "Centuries-old vaulted galleries and track beds framing the parasitic depth of the garage base.",
        ),
        CAVE,
      ),
      plate(
        "/media/gear-archive/cave-workshop.jpg",
        bilingual("战车重工维修平台与作业环境", "Vehicle heavy maintenance platform and environment"),
        bilingual(
          "工业钢架平台、高压气管接头、防跳弹挡板与纵横电缆网络。",
          "Structural steel gantries, pneumatic fittings, deflection screens, and cable networks.",
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
      "装设于废弃大楼天台的老式防空探照灯，前方固定一块粗粝重钢切割蝙蝠遮片，将戈登的联络代号投射于低垂铅云之上。",
      "A vintage industrial searchlight on an abandoned rooftop fitted with a heavy torch-cut steel bat mask, projecting Gordon's summons onto the low cloud deck.",
    ),
    film: bilingual(
      "划破哥谭阴霾长夜的恐惧利剑：无需出现在每条街道，悬于苍穹的蝙蝠徽记已让黑暗角落中的罪犯胆战心惊、草木皆兵。",
      "A sword of terror slicing through Gotham's murky sky: without patrolling every alley, the crest burned into the clouds turns every shadow into a perceived strike.",
    ),
    design: bilingual(
      "摒弃平整高科技工业外壳，选用锈蚀铸铁探照灯体、螺栓角钢支架与粗糙气割金属遮光片，赋予其纯粹的城市现实改装质感。",
      "Discarding sleek fixtures, the design uses pitted cast iron, bolted angle-iron mounts, and a torch-cut silhouette to ground the summons in urban realism.",
    ),
    filmDetails: [
      bilingual(
        "影片开篇，蝙蝠信号灯的照亮确立了整座城市的恐惧法则。戈登转动重型电闸，巨大的光束穿透雨夜在铅色浓云上投下一枚残破的蝙蝠阴影。街道上的劫匪、瘾君子与涂鸦暴徒仰望夜空，纷纷惊恐地退入阴影——信号灯不仅是一通联络电话，更是一种弥漫在哥谭夜空中的无形威慑，让蝙蝠侠的存在渗透至每一个没有路灯的街角。",
        "The opening sequence establishes the Bat-Signal as Gotham's law of terror. Gordon throws a heavy breaker switch, projecting an immense beam that casts a jagged bat silhouette against rain-swollen clouds. Thugs, muggers, and street gangs look up and retreat into the dark—the signal is an inescapable psychic deterrent turning every unlit alley into an ambush.",
      ),
      bilingual(
        "在废弃大楼顶层风雨飘摇的天台上，这盏信号灯是布鲁斯与戈登跨越体制隔阂的秘密交汇点。两人在刺骨寒风与灯光下交换案情卷宗，在整座城市的注视下缔结信任；而至片尾大洪水退去后，同一道划破夜空的光芒，已悄然从复仇的恐吓演变为引导哥谭重生的希望象征。",
        "Perched atop a decaying roof in the gale, the light serves as the illicit junction point between Bruce and Gordon. Standing beside the glaring arc, they trade homicide files under the gaze of the city; by the time the floodwaters recede in the finale, that same silhouette in the sky has subtly transformed from an emblem of vengeance into a beacon of rebirth.",
      ),
    ],
    designDetails: [
      bilingual(
        "概念图纸与特写镜头揭示了这盏信号灯令人震撼的实体细节：它直接脱胎于二战时期的重型防空碳弧探照灯，灯罩前方并非精细注模的塑料片，而是一块由厚重角钢通过粗糙焊点固定在防护网前的厚碳钢蝙蝠遮板。边缘带有明显的气割灼烧毛刺与工业打磨痕迹，散发着戈登在暗中艰难攒造的战术粗粝感。",
        "Concept drawings and macro footage reveal the tangible construction: adapted from a surplus wartime carbon-arc searchlight, its face mounts a heavy carbon-steel bat silhouette torch-cut by hand and welded across the protective wire grille. Slag marks along the cut edges ground the beacon in Gordon's clandestine urban improvisation.",
      ),
      bilingual(
        "铸铁基座、外露转向手摇齿轮、剥落的工业油漆与常年淋雨留下的锈迹斑斑，使其与哥谭灰暗湿冷的城市基调融为一体。近景中它是触手可及的沉重机械器械，远景中则是横贯天际的超现实图腾，完美串联起微观机械装置与宏观城市视觉两重任务。",
        "The cast-iron yoke, exposed geared traverse wheels, peeling enamel, and rain-induced patina integrate the light directly into Gotham's decaying concrete texture. Up close it is a heavy mechanical appliance; from afar, a colossal atmospheric brand uniting micro-mechanical engineering with city-scale iconography.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-signal.jpg",
        bilingual("碳弧探照灯与粗钢气割蝙蝠遮片", "Carbon-arc searchlight with torch-cut steel bat mask"),
        bilingual(
          "暴雨天台特写展现厚重角钢支架、气割粗粝毛刺与防护钢网。",
          "Rain-lashed rooftop macro revealing heavy angle-iron brackets, torch slag, and protective mesh.",
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
      "地下车间弹道试验台（Ballistics Bench），由重型工作台基座、多工位定位夹具、武器支架与立式凝胶测速靶架组成，供防弹测试与武器校准。",
      "The Batcave ballistics bench layout: heavy worktables, multi-station clamps, repurposed weapon rests, and ballistic gel target frames for impact testing.",
    ),
    film: bilingual(
      "蝙蝠洞内战备研发的真实注脚：在实战出勤前测试胸甲防弹极限、测定枪弹侵彻力与校准自制抛射武器的杀伤散布。",
      "An authentic glimpse into Batcave R&D: stress-testing armor plate tolerances, bullet penetration, and calibrating bespoke projectile dispersions.",
    ),
    design: bilingual(
      "Ballistics floor plan 图稿标注 W1、W2、W3 试射工位与靶架布局，展现车间从单一改装走向严谨物理测试的实战演进。",
      "The Ballistics floor plan schematics map W1, W2, and W3 firing stations alongside gel frames, charting the workshop's evolution into a testing facility.",
    ),
    filmDetails: [
      bilingual(
        "这组弹道试验台将韦恩塔地下车间从单纯的机械装配所升华为严谨的特种军工实验室。在面对哥谭街头层出不穷的各色枪械威胁前，布鲁斯在此架设测速仪与靶架，以标准弹道凝胶块模拟人体组织，反复测试战衣胸甲分块对近距离手枪弹、霰弹与突击步枪弹头的抗冲击极限，确保每一次出勤都建立在精确的数据把握之上。",
        "This ballistics testing station elevates the Wayne Tower garage into a military-grade R&D laboratory. Confronting diverse ballistic threats on Gotham's streets, Bruce mounts chronographs and gel blocks to simulate tissue trauma, testing how chest armor tiles handle point-blank buckshot and rifle rounds to anchor every patrol in empirical survival data.",
      ),
      bilingual(
        "工作台上散落的测量标尺、变形弹头、高速摄像记录仪与高压气管接头，展现出一个凡人为了弥补肉体脆弱所付出的近乎偏执的努力。他必须确切知晓每一块凯夫拉衬垫和钛合金插板的屈服极限，才能在枪林弹雨的走廊交火中冷静迎着火舌发起反击。",
        "Calipers, deformed slugs, high-speed camera mounts, and pneumatic lines scattered across the heavy bench testify to Bruce's obsessive efforts to reinforce his mortal vulnerability. Only by knowing the exact yield limits of every Kevlar insert and titanium plate can he advance into hallway crossfire with cold tactical certainty.",
      ),
    ],
    designDetails: [
      bilingual(
        "Ballistics floor plan 概念设计图详尽标注了测试基地的平面流线：主工作台沿纵向设立了 W1、W2、W3 三个连续试验工位，分别对应不同口径武器与抛射装具的固定卡座；图上特别手绘标注利用退役武器支架改装夹持大型弹道凝胶块（Repurpose weapon stand for gel block），将靶标与击发基线严格校准在同一水平轴线上。",
        "The Ballistics floor plan documents a rigorous testing layout: the main bench arranges W1, W2, and W3 firing stations along its axis, matching universal clamps for diverse calibers and launchers; notes specifically prescribe repurposing weapon stands to support ballistic gel blocks, aligning target and bore axes with laser precision.",
      ),
      bilingual(
        "立式目标靶框采用加厚角钢焊接脚座，内侧设有可调节悬挂导轨，能够灵活固定各型陶瓷防弹插板或纤维复合材料样件进行穿透测试。下方着色渲染图展示了工作台上纵横排布的传感器线缆、坚固的虎钳底座与沉重的防跳弹挡板，延续了蝙蝠洞依靠实用工业设备一步步手工搭建起来的粗粝真实感。",
        "Upright target frames feature welded angle-iron outriggers and adjustable suspension tracks, securing ceramic strike plates or composite test panels for penetration trials. Rendered perspectives depict sensor harnesses, heavy bench vices, and sacrificial deflector plates, reinforcing the Batcave's identity as a workshop built bolt-by-bolt from industrial hardware.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/ballistics-bench.jpg",
        bilingual("弹道试验台平面流线与测速工位", "Ballistics bench layout and firing stations"),
        bilingual(
          "W1/W2/W3 多工位基座、改装武器支架夹持凝胶块与立式角钢靶架布局。",
          "W1/W2/W3 multi-station mounts, repurposed gel stands, and angle-iron target frames.",
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
      "固定于工作台的 Batarang Mk VI 机械试射装置，集成重型滑轨底板、预紧弹簧、触发联动杆与控制面板电缆，用于测试蝙蝠镖的空气动力与出鞘姿态。",
      "The Batarang Mk VI bench testing rig: heavy rail plate, preloaded springs, trigger linkages, and control wiring for calibrating Batarang aerodynamics and ejection kinematics.",
    ),
    film: bilingual(
      "蝙蝠镖投射武器的实验室验证原型：在出勤定型前，通过工作台机械装置测试翼形配重、开孔气动阻力与飞掷出膛的瞬间弹道。",
      "Lab validation for the Batarang projectile: testing wing balance, aerodynamic cutouts, and launch kinematics on a bench rig before field deployment.",
    ),
    design: bilingual(
      "手绘结构图详实标注 Trigger rods、Release links 与 Spring loaded 联动机构，与胸前磁吸折刀并列呈现蝙蝠形武器的双向探索。",
      "Sketches document Trigger rods, Release links, and Spring loaded mechanisms, charting twin development paths alongside the chest emblem knife.",
    ),
    filmDetails: [
      bilingual(
        "这套试射台架见证了经典武器‘蝙蝠镖’（Batarang）在出勤第二年漫长而严谨的研发演进。在将蝙蝠镖作为随身常态化装备之前，布鲁斯必须在地下车间内测试多种翼形切角、配重中心与双翼负空间开孔对飞掷姿态的影响，通过恒定弹簧推力反复激发，排除任何气动偏航与自旋失稳隐患。",
        "This test rig captures the methodical evolution of the classic Batarang during Bruce's second year. Prior to standardizing the weapon in his belt loadout, he systematically evaluated wing bevels, center of mass, and negative cutouts under consistent mechanical spring thrust, eliminating aerodynamic yaw and rotational instability.",
      ),
      bilingual(
        "它与胸前磁吸可拆卸蝙蝠徽记折刀构成了蝙蝠图腾武器的双向研发路径：一端是用于徒手切割、重击与自卫的多功能近战刀具，另一端则是经过严格弹道风洞式机械测试的远程投掷飞镖。两者共同展示了布鲁斯将恐惧象征转化为实用武器的工程全貌。",
        "The rig represents a twin track alongside the chest emblem knife: one branch forging a close-quarters utility blade for cutting cables and self-defense; the other perfecting an aerodynamic standoff throwing dart through bench testing. Together they showcase Bruce's obsessive drive to weaponize his symbol of fear.",
      ),
    ],
    designDetails: [
      bilingual(
        "概念设计手稿标明了该装置的代号‘Batarang Mk VI’，并以极其精密的机械剖面标注出触发杆（Trigger rods）、解脱连杆（Release links）与重载储能弹簧组（Spring loaded）。蝙蝠镖本体被平稳卡在具有精密限位槽的厚重滑块底座上，一旦扳动联动销，弹簧便会以设定的恒定初速将飞镖平稳弹出滑轨。",
        "Concept drafts designate the prototype 'Batarang Mk VI', annotating trigger rods, release links, and heavy-duty preloaded spring packs. The Batarang clamps flush into precision guide grooves on a heavy sled; tripping the mechanical sear vents stored energy to launch the dart down the rails at calibrated velocities.",
      ),
      bilingual(
        "手稿右侧清晰绘有通往远程发射控制台的线缆连接（Lead to firing panel），确保测试人员可以在安全观测距离外记录击发瞬间的动态。下方着色渲染图展现了底座牢固锚固在重型工作台面上的全貌，前方配备独立立式支撑架以接收或阻截镖体，将传统超英漫画中的随手飞镖还原为高度严肃的机械工程原型。",
        "Sketches detail cable conduits routing to an off-table firing panel (Lead to firing panel), allowing remote observation during launches. Render plates illustrate the rig anchored to the workbench with an upright catcher stand ahead, transforming the superhero throwing bat into a rigorously engineered mechanical projectile.",
      ),
    ],
    plates: [
      plate(
        "/media/gear-archive/batarang-launcher.jpg",
        bilingual("Batarang Mk VI 机械试射装置手稿", "Batarang Mk VI mechanical testing rig drafts"),
        bilingual(
          "预紧弹簧滑轨、触发联动杆、控制面板电缆与前方阻截架研究。",
          "Preloaded spring sled, trigger linkages, control wiring, and upright catcher stand.",
        ),
        CAVE,
      ),
    ],
  },
];
