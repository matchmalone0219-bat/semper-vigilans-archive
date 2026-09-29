export type SocialPlatform = "x" | "instagram" | "threads" | "bluesky";

export type SocialDrop = {
  id: string;
  authorId: string;
  authorName: string;
  authorNameEn: string;
  authorHandle: string;
  authorRole: string;
  authorRoleEn: string;
  avatar?: string;
  platform: SocialPlatform;
  platformLabel: string;
  date: string;
  iso: string;
  url: string;
  textZh: string;
  textEn: string;
  contextZh?: string;
  contextEn?: string;
  verified: boolean;
};

export const SOCIAL_DROPS: SocialDrop[] = [
  {
    id: "reeves-batman-day-2026",
    authorId: "reeves",
    authorName: "马特·里夫斯",
    authorNameEn: "Matt Reeves",
    authorHandle: "@mattreevesLA",
    authorRole: "导演 / 编剧 / 制片人",
    authorRoleEn: "Director / Writer / Producer",
    avatar: "/media/cast/reeves.jpg",
    platform: "x",
    platformLabel: "X (Twitter)",
    date: "2026.09.19",
    iso: "2026-09-19",
    url: "https://x.com/mattreevesLA",
    textZh: "蝙蝠侠日快乐 🦇",
    textEn: "Happy Batman Day 🦇",
    contextZh: "马特·里夫斯在 2026 年蝙蝠侠日发布罗伯特·帕丁森身着战衣的全新官方物料剪影，持续为《新蝙蝠侠2》预热。",
    contextEn: "Matt Reeves marked Batman Day 2026 by sharing an official silhouette of Robert Pattinson suited up as the Dark Knight for The Batman: Part II.",
    verified: true,
  },
  {
    id: "fraser-camera-test",
    authorId: "fraser",
    authorName: "格雷格·弗雷泽",
    authorNameEn: "Greig Fraser",
    authorHandle: "@greigfraser_dp",
    authorRole: "摄影指导",
    authorRoleEn: "Director of Photography",
    avatar: "/media/cast/fraser-v2.jpg",
    platform: "instagram",
    platformLabel: "Instagram",
    date: "2026.06.15",
    iso: "2026-06-15",
    url: "https://www.instagram.com/greigfraser_dp/",
    textZh: "穿过镜头再次步入阴影。第一卷胶片开机。",
    textEn: "Back through the lens into the shadows. Camera roll 1.",
    contextZh: "奥斯卡最佳摄影格雷格·弗雷泽分享摄影机开机与光学镜头测试，重返哥谭的阴影美学。",
    contextEn: "Academy Award-winning cinematographer Greig Fraser teased UK optical and camera testing for the sequel.",
    verified: true,
  },
  {
    id: "wright-gordon-script-prep",
    authorId: "wright",
    authorName: "杰弗里·怀特",
    authorNameEn: "Jeffrey Wright",
    authorHandle: "@jfreewright",
    authorRole: "主演（饰演 吉姆·戈登局长）",
    authorRoleEn: "Jim Gordon",
    avatar: "/media/cast/wright.jpg",
    platform: "instagram",
    platformLabel: "Instagram",
    date: "2025.09.12",
    iso: "2025-09-12",
    url: "https://www.instagram.com/jfreewright/",
    textZh: "为文化底蕴做些背景阅读……我们回到了哥谭。",
    textEn: "Background reads for the culture... We back in Gotham.",
    contextZh: "杰弗里·怀特在社交平台展示绝密剧本收纳包，确认已收到加密剧本并正式启动戈登局长角色备战。",
    contextEn: "Jeffrey Wright confirmed receiving his encrypted script binder and preparing to reprise Jim Gordon in The Batman: Part II.",
    verified: true,
  },
  {
    id: "reeves-tomlin-script-complete",
    authorId: "reeves",
    authorName: "马特·里夫斯",
    authorNameEn: "Matt Reeves",
    authorHandle: "@mattreevesLA",
    authorRole: "导演 / 编剧 / 制片人",
    authorRoleEn: "Director / Writer / Producer",
    avatar: "/media/cast/reeves.jpg",
    platform: "x",
    platformLabel: "X (Twitter)",
    date: "2025.06.28",
    iso: "2025-06-28",
    url: "https://x.com/mattreevesLA",
    textZh: "打击罪犯的搭档（编剧）。为我们创作的故事深感自豪。",
    textEn: "Partners in crime (fighters). Very proud of what we made.",
    contextZh: "马特·里夫斯与联合编剧马特森·汤姆林合影宣布《新蝙蝠侠2》最终剧本正式定稿交付。",
    contextEn: "Matt Reeves and co-writer Mattson Tomlin confirmed the completion of The Batman: Part II screenplay.",
    verified: true,
  },
  {
    id: "tomlin-script-tone",
    authorId: "tomlin",
    authorName: "马特森·汤姆林",
    authorNameEn: "Mattson Tomlin",
    authorHandle: "@mattsontomlin",
    authorRole: "联合编剧",
    authorRoleEn: "Co-Writer, The Batman: Part II",
    platform: "x",
    platformLabel: "X (Twitter)",
    date: "2025.06.28",
    iso: "2025-06-28",
    url: "https://x.com/mattsontomlin",
    textZh: "我们拼尽全力去讲述一个配得上这个角色的故事。全新，且充满危险。",
    textEn: "We worked exceptionally hard to tell a story worthy of the character. Something new and dangerous.",
    contextZh: "马特森·汤姆林在剧本交付后分享创作心境，强调续集将进一步深入哥谭黑暗且凶险的层面。",
    contextEn: "Mattson Tomlin reflected on the script submission, highlighting a darker and more perilous direction for the sequel.",
    verified: true,
  },
];
