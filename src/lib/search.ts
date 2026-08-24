import { GEAR } from "@/lib/gear";
import { LOG } from "@/lib/film";
import { MERCH } from "@/lib/merch";
import { PLACES } from "@/lib/places";
import { PEOPLE } from "@/lib/people";

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
  item("剧照与片场画廊", "第一部、企鹅人与续集路透", "/gallery", "栏目"),
  item("谜语人暗号终端", "互动谜题 Rataalada", "/rataalada", "互动"),
  item("站点更新", "新增内容、体验改进与维护记录", "/updates", "栏目"),
];

export const SEARCH_ITEMS: SearchItem[] = [
  ...PAGES,
  ...PEOPLE.map((person) =>
    item(
      person.name,
      [person.sub, person.actor].filter(Boolean).join(" · "),
      `/people/${person.id}`,
      "人物",
      person.bio.join(" "),
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
    group.items.map((merch) =>
      item(
        merch.name,
        `${merch.maker} · ${merch.year}`,
        `/merch#${merch.id}`,
        "收藏",
        `${merch.nameEn} ${merch.spec}`,
      ),
    ),
  ),
  ...LOG.map((entry) =>
    item(
      entry.title,
      `${entry.date} · ${entry.source ?? "拍摄日志"}`,
      `/dossier#log`,
      "日志",
      entry.body,
    ),
  ),
];

export function searchSite(query: string, limit = 12) {
  const terms = query.trim().toLocaleLowerCase("zh-CN").split(/\s+/).filter(Boolean);
  if (!terms.length) return PAGES.slice(0, limit);
  return SEARCH_ITEMS.filter((entry) =>
    terms.every((term) => entry.searchText.includes(term)),
  ).slice(0, limit);
}
