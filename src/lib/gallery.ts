export type Still = {
  src: string;
  title: string;
  caption: string;
  source: string;
};

export type GalleryGroup = {
  id: "film" | "penguin" | "part2";
  kicker: string;
  title: string;
  titleEn: string;
  intro: string;
  stills: Still[];
};

export const GALLERIES: GalleryGroup[] = [
  {
    id: "film",
    kicker: "2022",
    title: "第一部",
    titleEn: "The Batman",
    intro:
      "华纳兄弟发给媒体的官方剧照。拍摄于 2020–2021 年，马特·里夫斯执导，摄影格雷格·弗雷泽（Greig Fraser）。图下注明转载出处。",
    stills: [
      {
        src: "/media/gotham.jpg",
        title: "俯瞰高谭",
        caption: "蝙蝠侠站在高处俯瞰城市。第一部多次使用这一机位。",
        source: "华纳官方剧照 · Inverse",
      },
      {
        src: "/media/still-sunset.jpg",
        title: "黄昏剪影",
        caption: "蝙蝠侠剪影贴在落日上，耳廓剪影与城市天际线重合。",
        source: "华纳官方剧照 · The New Yorker",
      },
      {
        src: "/media/street.jpg",
        title: "雨中战衣",
        caption: "雨水从头盔流下。本版战衣刻意做成未抛光、带磨损的战术装，而非干净盔甲。",
        source: "华纳官方剧照 · CBR",
      },
      {
        src: "/media/rooftop.jpg",
        title: "屋顶对谈",
        caption: "布鲁斯与瑟琳娜在屋顶，摩托车停在栏杆边。第一部中两人少数正面对话的场面之一。",
        source: "华纳官方剧照 · Frame.io / Vulture",
      },
      {
        src: "/media/still-selina-apt.jpg",
        title: "瑟琳娜公寓",
        caption: "摘下面具之前的瑟琳娜·凯尔。该住所后来被谜语人追随者闯入。",
        source: "华纳官方剧照 · Heroic Hollywood",
      },
      {
        src: "/media/still-cat-mask.jpg",
        title: "猫女夜巡",
        caption: "蒙面后的瑟琳娜。本版猫女不使用耳饰造型，仅以头套遮面。",
        source: "华纳官方剧照 · /Film",
      },
      {
        src: "/media/still-cat-bike.jpg",
        title: "摩托",
        caption: "头盔、雨、车灯。她离开高谭之前最后的机动。",
        source: "华纳官方剧照 · /Film",
      },
      {
        src: "/media/selina.jpg",
        title: "离开高谭",
        caption: "日落时分。瑟琳娜前往布鲁德海文。电影将此处理为真正离场，而非续集预告。",
        source: "华纳官方剧照 · Salon",
      },
      {
        src: "/media/court.jpg",
        title: "警局",
        caption: "戈登把一个不愿公开身份的人带进现场。两人的合作从这里开始被同事看见。",
        source: "华纳官方剧照 · IndieWire",
      },
      {
        src: "/media/still-morgue.jpg",
        title: "停尸间",
        caption: "戈登和蝙蝠侠一起看物证。这版戈登不是花瓶政委，是还在验伤的警探。",
        source: "华纳官方剧照 · The Hollywood Reporter",
      },
      {
        src: "/media/still-gordon.jpg",
        title: "吉姆·戈登",
        caption: "杰弗里·怀特饰演。第一部中为 GCPD 中尉，少数愿意与蝙蝠侠合作的警官。",
        source: "华纳官方剧照 · ScreenRant",
      },
      {
        src: "/media/riddler.jpg",
        title: "谜语人",
        caption: "市长家里。保罗·达诺这一版把谜语人写成会寄录像带的国内恐怖分子。",
        source: "华纳官方剧照 · Entertainment Weekly",
      },
      {
        src: "/media/still-lair.jpg",
        title: "谜语人巢穴",
        caption: "蝙蝠侠进入谜语人公寓。墙上为剪报、照片与针对高谭政要的调查材料。",
        source: "华纳官方剧照 · Business Insider",
      },
      {
        src: "/media/still-falcone.jpg",
        title: "法尔科内",
        caption: "约翰·特托罗。冰山俱乐部顶层，手杖、墨镜、整座城的账本。",
        source: "华纳官方剧照 · CinemaBlend",
      },
      {
        src: "/media/engine.jpg",
        title: "战车",
        caption: "后置涡轮、滚笼、没有画上去的蝙蝠。第一部追逐戏用的就是这一辆。",
        source: "华纳官方剧照 · Hagerty",
      },
      {
        src: "/media/still-alfred.jpg",
        title: "阿尔弗雷德与地下车间",
        caption: "安迪·瑟金斯饰演阿尔弗雷德。韦恩塔地下，战车停在后方。庄园已捐作孤儿院。",
        source: "华纳官方剧照 · Frame.io",
      },
      {
        src: "/media/still-bruce.jpg",
        title: "卸下头套",
        caption: "头套摘下后眼窝仍有黑色妆容。画面用于交代夜巡对身体的损耗。",
        source: "华纳官方剧照 · CinemaBlend",
      },
      {
        src: "/media/orphanage.jpg",
        title: "孤儿院",
        caption: "布鲁斯·韦恩公开露面。妆是夜巡留下的，不是造型。",
        source: "华纳官方剧照 · MovieWeb",
      },
      {
        src: "/media/flood.jpg",
        title: "洪水之后",
        caption: "终场。妆容被雨水冲花，城市仍遭水淹。布鲁斯首次在白天走进人群救援。",
        source: "华纳官方剧照 · CinemaBlend",
      },
      {
        src: "/media/signal.jpg",
        title: "蝙蝠信号灯",
        caption: "预告片与海报使用过的画面。第一部将蝙蝠信号灯留到终场才启用。",
        source: "华纳官方物料 · TheWrap",
      },
    ],
  },
  {
    id: "penguin",
    kicker: "2024",
    title: "企鹅人",
    titleEn: "The Penguin",
    intro:
      "HBO / Max 剧集官方剧照。劳伦·勒弗兰克编剧，接在第一部洪水数周之后。科林·法瑞尔继续演奥兹·科布，克里斯汀·米莉欧蒂演索菲亚·法尔科内。",
    stills: [
      {
        src: "/media/lounge.jpg",
        title: "冰山俱乐部",
        caption: "奥兹出现在冰山俱乐部。剧集从法尔科内死后的权力真空写起。",
        source: "HBO 官方剧照",
      },
      {
        src: "/media/peng-lounge2.jpg",
        title: "账本",
        caption: "灯光、酒水与玻璃桌。奥兹已坐上经营者的位置，处理接手后的账目。",
        source: "HBO 官方剧照 · British GQ / Fandom",
      },
      {
        src: "/media/peng-back.jpg",
        title: "白西装",
        caption: "奥兹背对镜头。投影与灯球显示其开始用场面建立威慑。",
        source: "HBO 官方剧照 · Deadline",
      },
      {
        src: "/media/peng-smoke.jpg",
        title: "点火",
        caption: "奥兹给对面点烟。剧集把许多权力交接写成这种街边的小动作。",
        source: "HBO 官方剧照 · Collider",
      },
      {
        src: "/media/peng-gun.jpg",
        title: "紫车",
        caption: "雨中、枪支与被打开的车门。奥兹的行动已从俱乐部内转到街上。",
        source: "HBO 官方剧照 · Television Academy",
      },
      {
        src: "/media/peng-sofia.jpg",
        title: "索菲亚",
        caption: "克里斯汀·米莉奥蒂饰演索菲亚·法尔科内。出狱后重新介入家族生意。",
        source: "HBO 官方剧照 · Bleeding Cool",
      },
      {
        src: "/media/peng-coat.jpg",
        title: "仓库",
        caption: "仓库内的奥兹。此时他已不再是第一部中开车逃窜的中层。",
        source: "HBO 官方剧照 · TechRadar",
      },
      {
        src: "/media/peng-office.jpg",
        title: "市政",
        caption: "市政厅场景。剧集结尾表明奥兹的目标已超出夜总会本身。",
        source: "HBO 官方剧照 · Forbes",
      },
    ],
  },
  {
    id: "part2",
    kicker: "2026",
    title: "第二部路透",
    titleEn: "The Batman: Part II",
    intro:
      "《新蝙蝠侠2》目前没有官方剧照。以下为 2026 年 8 月 18 日至 23 日格拉斯哥外景见报、并在社交媒体公开发布的片场照片。工作标题 Semper Vigilans。",
    stills: [
      {
        src: "/media/log/p2-escape-1.jpg",
        title: "战车突围",
        caption:
          "2026 年 8 月 23 日夜。战车在人造雪上甩尾，高谭警车列队开火。当地称为第五夜。",
        source: "片场照片 · 当地路透 8 月 23 日",
      },
      {
        src: "/media/log/p2-escape-2.jpg",
        title: "警车列队",
        caption: "GCPD 涂装车辆在湿滑路面上围堵战车。同一夜追逐戏。",
        source: "片场照片 · 当地路透 8 月 23 日",
      },
      {
        src: "/media/log/p2-escape-3.jpg",
        title: "湿路追逐",
        caption: "战车从警车阵列中穿出。替身戴头套驾驶。",
        source: "片场照片 · 当地路透 8 月 23 日",
      },
      {
        src: "/media/log/p2-bothwell-snow.jpg",
        title: "Bothwell Street 雪景",
        caption: "格拉斯哥 Bothwell Street 铺上人造雪，路边停着高谭警车。",
        source: "片场照片 · The Herald / Colin Mearns",
      },
      {
        src: "/media/log/p2-gotham-sign.jpg",
        title: "Gotham 路牌",
        caption: "剧组换上 Gotham 路牌。格拉斯哥市中心临时改成高谭冬景。",
        source: "片场照片 · 当地路透",
      },
      {
        src: "/media/log/p2-firetruck.jpg",
        title: "高谭消防车",
        caption: "美式消防车与 GCPD 涂装出现在封街路段。",
        source: "片场照片 · 当地路透",
      },
      {
        src: "/media/p2-batman.jpg",
        title: "战衣上街",
        caption:
          "2026 年 8 月 20 日。全套战衣的蝙蝠侠走在铺雪的格拉斯哥街道上。目前没有官方剧照，这是当地公开发布的片场照片。",
        source: "片场照片 · 当地路透 8 月 20 日",
      },
      {
        src: "/media/p2-snow4.jpg",
        title: "战车与摄影吊臂",
        caption:
          "战衣演员站在战车旁，积雪路面，上方是摄影吊臂。对应冬季追逐与围堵戏的排练。",
        source: "片场照片 · 当地路透 8 月 20 日",
      },
      {
        src: "/media/p2-snow3.jpg",
        title: "加装摄影架的战车",
        caption:
          "车尾外挂摄影架，后置涡轮与滚笼仍是第一部同款结构。用于雪地动态镜头。",
        source: "片场照片 · 当地路透 8 月 20 日",
      },
      {
        src: "/media/p2-snow1.jpg",
        title: "雪地俯拍",
        caption:
          "高处拍到战车停在人造雪与积水路面，周围是摄制组。格拉斯哥市中心临时改成高谭冬景。",
        source: "片场照片 · 当地路透 8 月 20 日",
      },
      {
        src: "/media/p2-car19.jpg",
        title: "日间街景中的战车",
        caption:
          "8 月 19 日白天。战车停在封路后的格拉斯哥街道，车身可见撞击损伤与雪地胎。",
        source: "片场照片 · 当地路透 8 月 19 日",
      },
      {
        src: "/media/p2-dmg1.jpg",
        title: "战损车头",
        caption:
          "前保险杠与翼子板的撞击痕迹近景。与 18 日运入市区时的涂装一致，设计没有换代。",
        source: "片场照片 · 当地路透 8 月 19 日",
      },
      {
        src: "/media/p2-swat.jpg",
        title: "高谭 SWAT 载具",
        caption:
          "车身喷有 Gotham City Police / SWAT。20 日夜戏视频中，同类载具参与围堵战车的排练。",
        source: "片场照片 · 当地路透 8 月 18–20 日",
      },
      {
        src: "/media/car.jpg",
        title: "战车运入市区",
        caption:
          "战车被平板车运进格拉斯哥市中心。车门和翼子板有撞击损伤，轮胎换成雪地胎。",
        source: "片场照片 · 苏格兰太阳报",
      },
      {
        src: "/media/p2-trailer.jpg",
        title: "开拍前侧面",
        caption: "同一辆车的侧面。滚笼、后轮、被磨白的漆。当地媒体在 18 日开拍前后拍到。",
        source: "片场照片 · 苏格兰太阳报",
      },
      {
        src: "/media/p2-lacys.jpg",
        title: "Lacy's 店招",
        caption:
          "剧组在临街装上绿色雨篷和店名。格拉斯哥的店面被临时改成高谭的百货与餐馆。",
        source: "片场照片 · Yahoo / 当地媒体",
      },
    ],
  },
];

export const STILLS = GALLERIES.flatMap((g) =>
  g.stills.map((s) => ({
    src: s.src,
    title: s.title,
    kicker: `${g.kicker} / ${g.title}`,
    caption: s.caption,
  })),
);

export const STILL_MAP: Record<string, Still> = Object.fromEntries(
  GALLERIES.flatMap((g) => g.stills.map((s) => [s.src, s])),
);

export function resolveStills(srcs: string[]): Still[] {
  return srcs.map((src) => STILL_MAP[src]).filter((s): s is Still => Boolean(s));
}

export const STILL_TEASERS = [
  GALLERIES[0].stills[0],
  GALLERIES[1].stills[0],
  GALLERIES[2].stills[0],
].map((s, i) => ({
  ...s,
  kicker: GALLERIES[i].titleEn,
}));
