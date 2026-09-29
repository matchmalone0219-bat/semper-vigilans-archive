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
  textZh?: string;
  textEn?: string;
  contextZh?: string;
  contextEn?: string;
  sourceKind: "creator" | "repost";
  image?: string;
  imageAlt?: string;
  imageAltEn?: string;
  verified: boolean;
};

export const SOCIAL_DROPS: SocialDrop[] = [
  {
    id: "perez-london-2026",
    authorId: "martinez",
    authorName: "吉尔·佩雷斯-亚伯拉罕",
    authorNameEn: "Gil Perez-Abraham",
    authorHandle: "@gilperezabraham",
    authorRole: "马丁内斯警官",
    authorRoleEn: "Officer Martinez",
    avatar: "/media/portraits/martinez.jpg",
    platform: "instagram",
    platformLabel: "Instagram",
    date: "2026.09.25",
    iso: "2026-09-25",
    url: "https://www.instagram.com/gilperezabraham/",
    contextZh: "2026 年 9 月 25 日，吉尔·佩雷斯-亚伯拉罕发布了一张伦敦石板路自拍；相关转载将这张照片与《新蝙蝠侠2》的伦敦拍摄联系起来。",
    contextEn: "On September 25, 2026, Gil Perez-Abraham posted a selfie on a London cobblestone street; reposts linked the image to The Batman: Part II's London production.",
    sourceKind: "repost",
    image: "/media/social/perez-london-2026.jpg",
    imageAlt: "吉尔·佩雷斯-亚伯拉罕在伦敦石板路上的自拍",
    imageAltEn: "Gil Perez-Abraham's selfie on a London cobblestone street",
    verified: true,
  },
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
    sourceKind: "creator",
    contextZh: "马特·里夫斯在 2026 年蝙蝠侠日发布罗伯特·帕丁森身着战衣的全新官方物料剪影，持续为《新蝙蝠侠2》预热。",
    contextEn: "Matt Reeves marked Batman Day 2026 by sharing an official silhouette of Robert Pattinson suited up as the Dark Knight for The Batman: Part II.",
    image: "/media/social/reeves-batman-day-2026.jpg",
    imageAlt: "马特·里夫斯 2026 年蝙蝠侠日发布的战衣剪影",
    imageAltEn: "Silhouette Matt Reeves posted on Batman Day 2026",
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
    date: "2025.08.30",
    iso: "2025-08-30",
    url: "https://www.instagram.com/jfreewright/",
    textZh: "🦇",
    textEn: "🦇",
    sourceKind: "creator",
    contextZh: "2025年8月30日，杰弗里·怀特在 Instagram 发出这只带密码锁的黑色收纳包，配文只有一个蝙蝠表情。外界把它读成《新蝙蝠侠2》的剧本包。",
    contextEn: "On August 30, 2025 Jeffrey Wright posted this combination-lock pouch on Instagram, captioned only with a bat emoji. It was widely read as the pouch for The Batman: Part II script.",
    image: "/media/social/wright-script-bag-2025.jpg",
    imageAlt: "杰弗里·怀特 Instagram 上的密码锁收纳包",
    imageAltEn: "The combination-lock pouch Jeffrey Wright posted on Instagram",
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
    date: "2025.06.27",
    iso: "2025-06-27",
    url: "https://x.com/mattreevesLA",
    textZh: "犯罪搭档（打击犯罪的搭档）。",
    textEn: "Partners in Crime (Fighters)",
    sourceKind: "creator",
    contextZh: "马特·里夫斯与联合编剧马特森·汤姆林合影宣布《新蝙蝠侠2》最终剧本正式定稿交付。",
    contextEn: "Matt Reeves and co-writer Mattson Tomlin confirmed the completion of The Batman: Part II screenplay.",
    image: "/media/social/reeves-script-2025.jpg",
    imageAlt: "里夫斯与汤姆林合影，前景是盖着蝙蝠标志的剧本",
    imageAltEn: "Reeves and Tomlin with the finished script and bat emblem in the foreground",
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
    date: "2026.02.15",
    iso: "2026-02-15",
    url: "https://x.com/mattsontomlin",
    textZh: "我们拼尽全力去讲述一个配得上这个角色的故事。全新，且充满危险。",
    textEn: "We worked exceptionally hard to tell a story worthy of the character. Something new and dangerous.",
    sourceKind: "creator",
    contextZh: "马特森·汤姆林在剧本交付后分享创作心境，强调续集将进一步深入哥谭黑暗且凶险的层面。",
    contextEn: "Mattson Tomlin reflected on the script submission, highlighting a darker and more perilous direction for the sequel.",
    verified: true,
  },
];
