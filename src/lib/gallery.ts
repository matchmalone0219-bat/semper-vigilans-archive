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
      "《新蝙蝠侠》官方媒体剧照。由马特·里夫斯执导，奥斯卡最佳摄影格雷格·弗雷泽（Greig Fraser）掌镜，呈现出冷峻写实的黑色电影美学。",
    stills: [
      {
        src: "/media/gotham.jpg",
        title: "俯瞰哥谭",
        caption: "蝙蝠侠伫立于摩天楼顶俯瞰整座哥谭市，展现其作为暗夜守护者的经典视角。",
        source: "华纳官方剧照 · Inverse",
      },
      {
        src: "/media/still-sunset.jpg",
        title: "黄昏剪影",
        caption: "夕阳余晖中的蝙蝠侠侧影，耳廓轮廓与哥谭天际线交融。",
        source: "华纳官方剧照 · The New Yorker",
      },
      {
        src: "/media/street.jpg",
        title: "雨中战衣",
        caption: "暴雨中战衣特写，展现出厚重防弹装甲未抛光、带有实战磨损的粗粝工业质感。",
        source: "华纳官方剧照 · CBR",
      },
      {
        src: "/media/rooftop.jpg",
        title: "屋顶对谈",
        caption: "布鲁斯与瑟琳娜在天台倚栏对谈，是第一部中两人探寻彼此立场的关键戏份。",
        source: "华纳官方剧照 · Frame.io / Vulture",
      },
      {
        src: "/media/still-selina-apt.jpg",
        title: "瑟琳娜公寓",
        caption: "脱下面具后的瑟琳娜·凯尔，在简陋公寓中整理调查线索。",
        source: "华纳官方剧照 · Heroic Hollywood",
      },
      {
        src: "/media/still-cat-mask.jpg",
        title: "猫女夜行",
        caption: "戴上面罩的瑟琳娜·凯尔，造型写实精炼，以敏捷身手穿梭于夜色之中。",
        source: "华纳官方剧照 · /Film",
      },
      {
        src: "/media/still-cat-bike.jpg",
        title: "机车夜巡",
        caption: "雨夜街道上的骑行特写，记录瑟琳娜在哥谭街头的穿梭身影。",
        source: "华纳官方剧照 · /Film",
      },
      {
        src: "/media/selina.jpg",
        title: "离开哥谭",
        caption: "落日余晖下，瑟琳娜骑行机车告别哥谭前往布鲁德海文。",
        source: "华纳官方剧照 · Salon",
      },
      {
        src: "/media/court.jpg",
        title: "警局现身",
        caption: "吉姆·戈登中尉顶住警局内部压力，将蝙蝠侠带入案发现场协同办案。",
        source: "华纳官方剧照 · IndieWire",
      },
      {
        src: "/media/still-morgue.jpg",
        title: "停尸间勘验",
        caption: "戈登中尉与蝙蝠侠在停尸间共同核对死者伤痕与现场物证。",
        source: "华纳官方剧照 · The Hollywood Reporter",
      },
      {
        src: "/media/still-gordon.jpg",
        title: "吉姆·戈登",
        caption: "杰弗里·怀特饰演的吉姆·戈登中尉，是哥谭警界坚守正义底线的核心盟友。",
        source: "华纳官方剧照 · ScreenRant",
      },
      {
        src: "/media/riddler.jpg",
        title: "谜语人",
        caption: "保罗·达诺饰演的连环罪犯谜语人潜入市长官邸，制造了震惊全城的首桩命案。",
        source: "华纳官方剧照 · Entertainment Weekly",
      },
      {
        src: "/media/still-lair.jpg",
        title: "谜语人巢穴",
        caption: "蝙蝠侠搜查谜语人租住的公寓，墙面密密麻麻贴满了针对政要的剪报与财务线索。",
        source: "华纳官方剧照 · Business Insider",
      },
      {
        src: "/media/still-falcone.jpg",
        title: "法尔科内",
        caption: "约翰·特托罗饰演的黑道教父卡尔迈恩·法尔科内，在冰山俱乐部顶层操控整座城市的黑金网络。",
        source: "华纳官方剧照 · CinemaBlend",
      },
      {
        src: "/media/engine.jpg",
        title: "蝙蝠战车",
        caption: "由布鲁斯亲手改装的美式重型肌肉车，配备后置喷气涡轮与防滚架，充满强悍的机械力量感。",
        source: "华纳官方剧照 · Hagerty",
      },
      {
        src: "/media/still-alfred.jpg",
        title: "阿尔弗雷德与地下车间",
        caption: "安迪·瑟金斯饰演阿尔弗雷德，在韦恩塔地下车间为布鲁斯提供情报与后勤支援。",
        source: "华纳官方剧照 · Frame.io",
      },
      {
        src: "/media/still-bruce.jpg",
        title: "卸下头套",
        caption: "摘下头套后的布鲁斯·韦恩，眼眶周围仍留有夜巡油彩，展现义警高强度作战后的真实疲态。",
        source: "华纳官方剧照 · CinemaBlend",
      },
      {
        src: "/media/orphanage.jpg",
        title: "孤儿院追思",
        caption: "布鲁斯·韦恩罕见地以家族继承人身份在白天公开露面，出席旧庄园改建的孤儿院活动。",
        source: "华纳官方剧照 · MovieWeb",
      },
      {
        src: "/media/flood.jpg",
        title: "洪灾救援",
        caption: "大坝决堤后，布鲁斯在哥谭体育馆跳入水中救援受困民众，完成了向正义守护者的精神跨越。",
        source: "华纳官方剧照 · CinemaBlend",
      },
      {
        src: "/media/signal.jpg",
        title: "蝙蝠信号灯",
        caption: "架设于哥谭市警察局楼顶的探照灯，投射在云层上的蝙蝠徽记成为正义与希望的象征。",
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
      "HBO / Max 限定剧《企鹅人》官方剧照。故事时间紧承电影大洪水数周之后，记录了奥兹·科布在权力真空期步步为营登上黑道王座的历程。",
    stills: [
      {
        src: "/media/lounge.jpg",
        title: "冰山俱乐部",
        caption: "法尔科内倒台后，奥兹·科布现身冰山俱乐部，开始谋划填补地下权力真空。",
        source: "HBO 官方剧照",
      },
      {
        src: "/media/peng-lounge2.jpg",
        title: "接管账目",
        caption: "奥兹坐上俱乐部主理人位置，开始系统核查并整合原属于法尔科内家族的财务账目。",
        source: "HBO 官方剧照 · British GQ / Fandom",
      },
      {
        src: "/media/peng-back.jpg",
        title: "黑道新秀",
        caption: "身着西装的奥兹逐步通过手腕与威慑建立起在各派势力中的话语权。",
        source: "HBO 官方剧照 · Deadline",
      },
      {
        src: "/media/peng-smoke.jpg",
        title: "街头交涉",
        caption: "奥兹在街头与各方势力周旋，步步为营推进自己的商业版图。",
        source: "HBO 官方剧照 · Collider",
      },
      {
        src: "/media/peng-gun.jpg",
        title: "街头枪火",
        caption: "雨夜交火与街头对峙，展现了奥兹在黑道争霸中残酷果决的一面。",
        source: "HBO 官方剧照 · Television Academy",
      },
      {
        src: "/media/peng-sofia.jpg",
        title: "索菲亚·法尔科内",
        caption: "克里斯汀·米莉欧蒂饰演的索菲亚结束十年冤狱回归，强势重组家族势力。",
        source: "HBO 官方剧照 · Bleeding Cool",
      },
      {
        src: "/media/peng-coat.jpg",
        title: "地下据点",
        caption: "奥兹在皇冠角仓库秘密设立新型毒品加工基地，作为夺权的核心依托。",
        source: "HBO 官方剧照 · TechRadar",
      },
      {
        src: "/media/peng-office.jpg",
        title: "入主顶层",
        caption: "剧集尾声，奥兹成功扳倒对手，正式入主俯瞰哥谭的顶层豪宅。",
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
      "《新蝙蝠侠2》格拉斯哥片场一手路透直击！现场记录了雪夜哥谭的震撼全貌：狂暴的战车雪地漂移、GCPD 警车列阵封锁、SWAT 特警装甲车夜间突袭，带你提前领略续集硬核凌厉的视觉风暴！",
    stills: [
      {
        src: "/media/log/p2-escape-1.jpg",
        title: "战车雪地狂暴漂移",
        caption:
          "蝙蝠战车在漫天飞雪的格拉斯哥街头完成狂暴的高速甩尾，警灯闪烁与引擎轰鸣瞬间撕裂夜幕！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/log/p2-escape-2.jpg",
        title: "警车列队重重包围",
        caption: "哥谭市警局（GCPD）警车阵列在湿滑积雪路面上拉起钢铁封锁线，将蝙蝠战车逼入绝境！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/log/p2-escape-3.jpg",
        title: "雪地高速撕裂突围",
        caption: "战衣替身全速轰油门驾驶战车从警车包围圈中硬核杀出，极速漂移尽显新哥谭车神的狂野本色！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/log/p2-bothwell-snow.jpg",
        title: "博思韦尔街暴雪实景",
        caption: "整条博思韦尔街（Bothwell Street）被厚重积雪覆盖，复古警车穿行其间，瞬间将现实苏格兰化作暴风雪中的罪恶之都。",
        source: "片场照片 · The Herald / Colin Mearns",
      },
      {
        src: "/media/log/p2-gotham-sign.jpg",
        title: "哥谭地标与复古街景",
        caption: "哥谭市专属街道路牌与复古商业霓虹彻夜点亮，冷峻压抑的冬日都会氛围拉满！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/log/p2-firetruck.jpg",
        title: "特警与重型消防车待命",
        caption: "美式经典消防车与警用巡逻车列队封街，好莱坞顶级工业实拍的宏大调度一览无遗！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-batman.jpg",
        title: "暗夜骑士雪中现身",
        caption:
          "全套重型装甲战衣在雪夜中霸气现身，肩部与胸前防弹板在寒光下充满冷冽的实战威慑力！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-snow4.jpg",
        title: "重型摄影吊臂贴地穿梭",
        caption:
          "重型移动摄影吊臂紧贴战车低空穿梭，实拍捕捉最令人窒息的高速贴地特写！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-snow3.jpg",
        title: "特制外挂机位捕捉狂飙",
        caption:
          "车身两侧与尾部挂满专业摄影支架，准备记录最硬核真实的雪地飞车第一视角！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-snow1.jpg",
        title: "雪夜封街俯瞰全景",
        caption:
          "从高处俯瞰积雪街道上的战车与剧组机位，整条街道已被完全改造成暴雪笼罩下的哥谭战场。",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-car19.jpg",
        title: "狰狞肌肉战车实车近景",
        caption:
          "白天静止状态下的蝙蝠战车展露狰狞肌肉线条，雪地防滑钉胎与深黑哑光装甲力量感爆棚！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-dmg1.jpg",
        title: "前脸撞击与实战战损",
        caption:
          "全钢冲撞前杠布满实战刮痕与凹坑，浓郁的改装肌肉车硬派美学呼之欲出！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/p2-swat.jpg",
        title: "SWAT 特警装甲巨兽",
        caption:
          "车身印有重型特警 SWAT 涂装的防暴装甲巨兽威严盘踞，哥谭治安危机全面升级！",
        source: "片场照片 · 当地路透报道",
      },
      {
        src: "/media/car.jpg",
        title: "战车运抵市区重磅亮相",
        caption:
          "蝙蝠战车由平板拖车运抵格拉斯哥外景现场，全尺寸实车一亮相便引发全城影迷围观！",
        source: "片场照片 · 苏格兰太阳报",
      },
      {
        src: "/media/p2-trailer.jpg",
        title: "全钢防滚架与后置引擎",
        caption: "侧面近距离特写展露出手工焊装的加固防滚架与粗犷外露机械，充满重工业蒸汽朋克气息。",
        source: "片场照片 · 苏格兰太阳报",
      },
      {
        src: "/media/p2-lacys.jpg",
        title: "Lacy's 哥谭复古百货街景",
        caption:
          "沿街老式商铺被彻底改造成哥谭市标志性的复古百货公司与餐厅，沉浸感十足。",
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
