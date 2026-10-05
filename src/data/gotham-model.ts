// Model coordinates share the existing Downtown basemap's 0–100 frame.
// Planar contours come from the basemap; relief heights are illustrative.
export const DOWNTOWN_MODEL = {
  width: 20,
  depth: (20 * 1314) / 1197,
  landHeight: 0.35,
  labels: {
    "wayne-tower": { zh: "韦恩塔", en: "Wayne Tower" },
    gsg: { zh: "体育馆", en: "Arena" },
    "city-hall": { zh: "市政厅", en: "City Hall" },
    "park-row": { zh: "派克街", en: "Park Row" },
    gcpd: { zh: "GCPD", en: "GCPD" },
    iceberg: { zh: "冰山俱乐部", en: "Iceberg" },
    "riddler-room": { zh: "谜语人公寓", en: "Riddler Apt." },
    "crown-point": { zh: "皇冠角", en: "Crown Point" },
    seawall: { zh: "防洪大堤", en: "Seawall" },
  },
} as const;

export const GCT_REFERENCE = {
  image: "/media/maps/gct-citypass-reference.jpeg",
  titleZh: "GCT CityPass 交通道具图",
  titleEn: "GCT CityPass Transit Prop",
  noteZh:
    "GCT CityPass 记录三城区的站点、线路与绿地，是上城和中城重绘的主要参考；下城同时结合电影设定图中的岸线、河道与港区。展开原图可对照各区域的交通地点。",
  noteEn:
    "GCT CityPass records stations, routes and green spaces across the three boroughs and guides the Uptown and Midtown reconstructions. Downtown also draws on the production setting map for shorelines, river and harbor. Expand the original to compare transit locations.",
  provenance: "User-supplied photograph · C9D0E694-4E8A-43AA-B3DE-EF600403F870.jpeg",
} as const;

export const DOWNTOWN_SETTING_REFERENCE = {
  image: "/media/maps/reeves-downtown-reference.webp",
} as const;
