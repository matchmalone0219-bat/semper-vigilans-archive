import { GEAR_COPY, LOADOUT, SUIT_OVERVIEW, VEHICLES } from "./gear-archive";

export type GearItem = {
  id: string;
  kicker: string;
  name: string;
  nameEn: string;
  seen: string;
  image: string;
  imageAlt: string;
  lede: string;
  body: string[];
};

export const GEAR_INTRO = GEAR_COPY.intro.zh;

export const GEAR: GearItem[] = [
  ...[SUIT_OVERVIEW, ...LOADOUT, ...VEHICLES].map((item, index) => ({
    id: item.id,
    kicker: `${String(index + 1).padStart(2, "0")} / ${item.category.zh}`,
    name: item.name.zh,
    nameEn: item.name.en,
    seen: "The Batman · 2022",
    image: item.plates[0]!.src,
    imageAlt: item.plates[0]!.title.zh,
    lede: item.summary.zh,
    body: [item.film.zh, item.design.zh],
  })),
  {
    id: "turbine",
    kicker: "引擎设计",
    name: "战车后置引擎",
    nameEn: "Rear engine design",
    seen: "The Batman · 2022",
    image: "/media/gear-archive/batmobile-a.jpg",
    imageAlt: "战车车尾与外露引擎概念设计",
    lede: "车尾外露的引擎与排气结构，是蝙蝠战车最醒目的机械细节之一。",
    body: ["模型与结构图将这一部分从车身中独立呈现，可以与载具档案中的整体设计对照。"],
  },
  {
    id: "corvette",
    kicker: "私人座驾",
    name: "雪佛兰 Corvette Stingray",
    nameEn: "Chevrolet Corvette Stingray",
    seen: "The Batman · 2022",
    image: "/media/corvette.jpg",
    imageAlt: "布鲁斯驾驶的黑色 Corvette",
    lede: "布鲁斯前往市长追悼会时驾驶的黑色跑车，延续了他公开身份中的家族与财富背景。",
    body: ["修长车身与蝙蝠战车的粗粝轮廓，呈现布鲁斯两种身份下不同的座驾形象。"],
  },
  {
    id: "cave",
    kicker: "地下车间",
    name: "地下车间 / 蝙蝠洞",
    nameEn: "The workshop / Batcave",
    seen: "The Batman · 2022",
    image: "/media/gear-cave.jpg",
    imageAlt: "韦恩塔地下的车间与隧道空间",
    lede: "地下铁路空间被改造成车间与调查工作区，布鲁斯在这里回放记录、分析物证和维护装备。",
    body: ["车辆、工作台与屏幕共同构成布鲁斯的工作环境。"],
  },
  {
    id: "signal",
    kicker: "哥谭信号",
    name: "蝙蝠信号灯",
    nameEn: "Bat-Signal",
    seen: "The Batman · 2022",
    image: "/media/gear-signal.jpg",
    imageAlt: "雨夜中的蝙蝠信号",
    lede: "投向夜空的蝙蝠轮廓，连接戈登与蝙蝠侠，也成为哥谭街头能够辨认的信号。",
    body: ["这一符号在城市上空出现时，同时指向合作、威慑与希望。"],
  },
];
