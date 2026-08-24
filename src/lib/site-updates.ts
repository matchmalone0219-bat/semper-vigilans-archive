export type SiteUpdate = {
  date: string;
  title: string;
  body: string;
  kind: "content" | "experience" | "maintenance";
};

export const SITE_UPDATE_KIND: Record<SiteUpdate["kind"], string> = {
  content: "内容",
  experience: "体验",
  maintenance: "维护",
};

export const SITE_UPDATES: SiteUpdate[] = [
  {
    date: "2026.08.24",
    title: "完成续集资料与来源审计",
    body: "重新核查档期、开拍、演员与英国外景资料；为核心事实补充来源，并将无法由公开证据支持的剧情判断降级为线索或传闻。",
    kind: "content",
  },
  {
    date: "2026.08.24",
    title: "来源链接、全站搜索与分享信息上线",
    body: "为重点拍摄日志和收藏品补充可核实的公开来源；新增跨栏目搜索，并完善页面摘要、分享卡片与资源路径。",
    kind: "experience",
  },
  {
    date: "2026.08.24",
    title: "修复 GitHub Pages 页面直达链接",
    body: "档案、人物、地点等已知页面现在拥有独立静态入口，分享或刷新子页面时可直接访问。",
    kind: "maintenance",
  },
  {
    date: "2026.08.23",
    title: "补充格拉斯哥雪地追逐片场记录",
    body: "新增 8 月 18 日至 23 日的封街、雪景、战车与哥谭警方车辆拍摄日志及图集索引。",
    kind: "content",
  },
];
