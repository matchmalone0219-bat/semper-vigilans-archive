import { GEAR } from "@/lib/gear";
import { CERTAINTY_LABEL, LOG, PLOT, type PlotItem } from "@/data/film";
import { MERCH } from "@/lib/merch";
import { PLACES } from "@/lib/places";
import { PEOPLE } from "@/lib/people";
import { CINEMA_ROOTS, RIDDLE_LORE, ROOTS, ROOT_KIND } from "@/lib/roots";
import { CITIES, LENS, THEMES } from "@/lib/craft";
import { PRODUCTION_PHASES } from "@/data/production";

export type SearchItem = {
  title: string;
  subtitle: string;
  href: string;
  kind: string;
  searchText: string;
};

function item(
  title: string,
  subtitle: string,
  href: string,
  kind: string,
  keywords = "",
): SearchItem {
  return {
    title,
    subtitle,
    href,
    kind,
    searchText: `${title} ${subtitle} ${keywords}`.toLocaleLowerCase("zh-CN"),
  };
}

const PAGES = [
  item("电影档案", "信息、线索、演员与拍摄日志", "/dossier", "栏目", "新蝙蝠侠2"),
  item("重案卷宗与物证", "谜语人案件与关键证物", "/cases", "栏目"),
  item("前作与宇宙编年", "电影、剧集、小说与漫画回顾", "/recap", "栏目"),
  item("原著与影史溯源", "漫画影响、电影渊源与证据等级", "/roots", "栏目"),
  item("幕后与视听", "摄影、配乐、取景与声音", "/craft", "栏目"),
  item("蝙蝠侠装备库", "战衣、战车与战术工具", "/gear", "栏目"),
  item("官方周边与收藏品", "人偶、道具、雕像与载具", "/merch", "栏目"),
  item("全站档案检索", "人物、地点、装备、日志与线索", "/search", "栏目", "搜索"),
  item("剧照与片场画廊", "第一部、企鹅人与续集路透", "/gallery", "栏目"),
  item("谜语人暗号终端", "互动谜题 Rataalada", "/rataalada", "互动"),
];

export function plotHref(plot: PlotItem) {
  return plot.id ? `/dossier#${plot.id}` : "/dossier#plot";
}

export function plotToSearchItem(plot: PlotItem): SearchItem {
  const title = plot.text.length > 36 ? `${plot.text.slice(0, 36)}…` : plot.text;
  return item(
    title,
    `${CERTAINTY_LABEL[plot.tag]} · 故事线索`,
    plotHref(plot),
    "线索",
    [
      plot.id ?? "",
      plot.text,
      plot.source ?? "",
      CERTAINTY_LABEL[plot.tag],
      plot.tag,
      plot.tag === "debunked" ? "DEBUNKED" : "",
      plot.debunkedNote ?? "",
      plot.debunkedSource ?? "",
      plot.text.includes("缄默") ? "静默 Hush" : "",
    ].join(" "),
  );
}

export const SEARCH_ITEMS: SearchItem[] = [
  ...PAGES,
  ...PLOT.map(plotToSearchItem),
  ...PEOPLE.map((person) =>
    item(
      person.name,
      [person.sub, person.actor].filter(Boolean).join(" · "),
      `/people/${person.id}`,
      "人物",
      `${person.bio.join(" ")} ${person.also.join(" ")}`,
    ),
  ),
  ...PLACES.map((place) =>
    item(
      place.name,
      `${place.nameEn} · ${place.status}`,
      `/places/${place.id}`,
      "地点",
      `${place.also} ${place.works}`,
    ),
  ),
  ...GEAR.map((gear) =>
    item(gear.name, gear.nameEn, `/gear#${gear.id}`, "装备", `${gear.seen} ${gear.lede}`),
  ),
  ...MERCH.flatMap((group) =>
    group.items.flatMap((merch) => [
      item(
        merch.name,
        `${merch.maker} · ${merch.year}`,
        `/merch#${merch.id}`,
        "收藏",
        `${merch.nameEn} ${merch.spec}`,
      ),
      ...(merch.covers ?? []).map((cover) =>
        item(
          cover.title,
          `${cover.coverArtist} · ${cover.releaseDate}`,
          `/merch#${cover.id}`,
          "收藏",
          `${cover.coverArtist} ${cover.issue} ${merch.nameEn} movie variant`,
        ),
      ),
    ]),
  ),
  ...LOG.map((entry) =>
    item(
      entry.title,
      `${entry.date} · ${entry.source ?? "拍摄日志"}`,
      `/dossier#${entry.id}`,
      "日志",
      entry.body,
    ),
  ),
  ...ROOTS.map((work) =>
    item(
      work.title,
      `${work.titleEn} · ${ROOT_KIND[work.kind]}`,
      `/roots#${work.id}`,
      "溯源",
      `${work.creators} ${work.thesis} ${work.lede} ${work.quoteZh ?? ""} ${work.jump}`,
    ),
  ),
  ...RIDDLE_LORE.map((riddle) =>
    item(
      riddle.title,
      `${riddle.titleEn} · 谜语与语言考据`,
      `/roots#${riddle.id}`,
      "谜题考据",
      [
        riddle.kicker,
        riddle.kickerEn,
        riddle.prompt,
        riddle.promptEn,
        riddle.answer,
        riddle.answerEn,
        riddle.linguisticTrap,
        riddle.linguisticTrapEn,
        riddle.narrativeTruth,
        riddle.narrativeTruthEn,
      ].join(" "),
    ),
  ),
  ...PRODUCTION_PHASES.map((phase) =>
    item(
      phase.title,
      `${phase.period} · ${phase.tag}`,
      "/dossier#drama",
      "制作史",
      [
        phase.summary,
        ...phase.bulletPoints,
        ...(phase.keyQuotes ?? []).flatMap((quote) => [quote.speaker, quote.role, quote.text]),
      ].join(" "),
    ),
  ),
  ...CINEMA_ROOTS.map((film) =>
    item(
      film.title,
      `${film.titleEn} · ${film.year}`,
      `/roots#${film.id}`,
      "溯源",
      [
        film.director,
        film.thesis,
        film.lede,
        film.quoteZh ?? "",
        film.titleEn,
        film.id === "phantasm" ? "phantom 动画电影 mask of the phantom 幻影面具" : "",
        film.id === "klute" ? "克鲁特 猫女 selina" : "",
        film.id === "christine" ? "克里斯汀的魅力 卡朋特 战车 金" : "",
        film.id === "taxi-driver" ? "特拉维斯 比克尔 travis bickle 日记" : "",
      ].join(" "),
    ),
  ),
  ...THEMES.map((theme) =>
    item(
      theme.title,
      theme.titleEn,
      `/craft#${theme.id}`,
      "视听",
      [
        theme.kind,
        theme.lede,
        theme.quoteZh ?? "",
        theme.sections.map((section) => `${section.heading} ${section.body}`).join(" "),
        theme.id === "nirvana"
          ? "Kurt Cobain 柯特·柯本 柯本 Nirvana Last Days 最后的日子 Something in the Way 隐士"
          : "",
      ].join(" "),
    ),
  ),
  ...LENS.stills.map((still) =>
    item(
      still.caption.split("：")[0] ?? still.posted,
      `${still.credit} · ${still.posted}`,
      "/craft#lens",
      "光影",
      `梅塞施密特 Messerschmidt 勘景 光影摄影 ${still.caption} ${still.alt} spherical 球形镜头 Runcorn 兰康`,
    ),
  ),
  item(
    "光影摄影档案",
    "弗雷泽与梅塞施密特 · 开拍前勘景",
    "/craft#lens",
    "栏目",
    "cinematography Greig Fraser Erik Messerschmidt northwest LEDs spring mist 球形镜头 变形宽银幕 勘景照 Instagram",
  ),
  ...CITIES.flatMap((city) =>
    city.pins.map((pin) =>
      item(
        pin.name,
        `${pin.nameEn} · ${pin.filmAs}`,
        `/craft#${pin.id}`,
        "取景",
        `${city.city} ${city.cityEn} ${pin.work} ${pin.body} ${pin.visit} ${pin.nameEn}`,
      ),
    ),
  ),
];

export function searchSite(query: string, limit = 12) {
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  const terms = normalized.split(/\s+/).filter(Boolean);
  if (!terms.length) return PAGES.slice(0, limit);

  const score = (entry: SearchItem) => {
    const title = entry.title.toLocaleLowerCase("zh-CN");
    if (title === normalized) return 5;
    if (title.startsWith(normalized)) return 4;
    if (title.includes(normalized)) return 3;
    if (terms.every((term) => title.includes(term))) return 2;
    if (entry.subtitle.toLocaleLowerCase("zh-CN").includes(normalized)) return 1;
    return 0;
  };
  return SEARCH_ITEMS.filter((entry) =>
    terms.every((term) => entry.searchText.includes(term)),
  ).sort((a, b) => score(b) - score(a)).slice(0, limit);
}
