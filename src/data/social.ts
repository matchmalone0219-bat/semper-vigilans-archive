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
    textZh: "配文未随转载保留。",
    textEn: "The caption was not kept in the reposts.",
    contextZh: "2026年9月25日，他在 Instagram 发出这张伦敦石板路自拍。转载把它读成前来拍摄《新蝙蝠侠2》。原帖完整配文没有留下来，这里不补写。",
    contextEn: "On September 25, 2026 he posted this London street selfie. Reposts read it as his arrival to film The Batman: Part II. The full caption was not preserved, so none is invented here.",
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
    contextZh: "马特·里夫斯在 2026 年蝙蝠侠日发布罗伯特·帕丁森身着战衣的全新官方物料剪影，持续为《新蝙蝠侠2》预热。",
    contextEn: "Matt Reeves marked Batman Day 2026 by sharing an official silhouette of Robert Pattinson suited up as the Dark Knight for The Batman: Part II.",
    image: "/media/social/reeves-batman-day-2026.jpg",
    imageAlt: "马特·里夫斯 2026 年蝙蝠侠日发布的战衣剪影",
    imageAltEn: "Silhouette Matt Reeves posted on Batman Day 2026",
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
    date: "2025.08.30",
    iso: "2025-08-30",
    url: "https://www.instagram.com/jfreewright/",
    textZh: "🦇",
    textEn: "🦇",
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
    date: "2025.06.28",
    iso: "2025-06-28",
    url: "https://x.com/mattreevesLA",
    textZh: "打击罪犯的搭档（编剧）。为我们创作的故事深感自豪。",
    textEn: "Partners in crime (fighters). Very proud of what we made.",
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
