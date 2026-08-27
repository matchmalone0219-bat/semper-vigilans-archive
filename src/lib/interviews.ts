export type InterviewWork = "batman" | "penguin" | "part2";

export const WORK_LABEL: Record<InterviewWork, string> = {
  batman: "第一部《新蝙蝠侠》",
  penguin: "限定剧《企鹅人》",
  part2: "《新蝙蝠侠2》",
};

export type InterviewSpeaker = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  personId?: string;
  portrait?: string;
};

export const SPEAKERS: InterviewSpeaker[] = [
  {
    id: "pattinson",
    name: "罗伯特·帕丁森",
    nameEn: "Robert Pattinson",
    role: "布鲁斯·韦恩 / 蝙蝠侠",
    personId: "bruce",
    portrait: "/media/portraits/bruce.jpg",
  },
  {
    id: "kravitz",
    name: "佐伊·克拉维茨",
    nameEn: "Zoë Kravitz",
    role: "瑟琳娜·凯尔 / 猫女",
    personId: "selina",
    portrait: "/media/portraits/selina.jpg",
  },
  {
    id: "farrell",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    role: "奥兹·科布 / 企鹅人",
    personId: "oz",
    portrait: "/media/portraits/oz.jpg",
  },
  {
    id: "wright",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    role: "吉姆·戈登",
    personId: "gordon",
    portrait: "/media/portraits/gordon.jpg",
  },
  {
    id: "serkis",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    role: "阿尔弗雷德·潘尼沃斯",
    personId: "alfred",
    portrait: "/media/portraits/alfred.jpg",
  },
  {
    id: "dano",
    name: "保罗·达诺",
    nameEn: "Paul Dano",
    role: "爱德华·纳什顿 / 谜语人",
    personId: "edward",
    portrait: "/media/portraits/edward.jpg",
  },
  {
    id: "milioti",
    name: "克里斯汀·米莉奥蒂",
    nameEn: "Cristin Milioti",
    role: "索菲亚·法尔科内",
    personId: "sofia",
    portrait: "/media/portraits/sofia.jpg",
  },
  {
    id: "reeves",
    name: "马特·里夫斯",
    nameEn: "Matt Reeves",
    role: "导演 / 编剧",
    portrait: "/media/still-bruce.jpg",
  },
];

export const SPEAKER_MAP = Object.fromEntries(SPEAKERS.map((s) => [s.id, s]));

export type InterviewQuote = {
  id: string;
  speakerId: string;
  work: InterviewWork;
  date: string;
  iso: string;
  outlet: string;
  sourceUrl: string;
  quoteZh: string;
  quoteEn: string;
  note?: string;
};

export const INTERVIEWS: InterviewQuote[] = [
  {
    id: "pattinson-gq-weirdo",
    speakerId: "pattinson",
    work: "batman",
    date: "2022.02",
    iso: "2022-02-08",
    outlet: "GQ",
    sourceUrl: "https://www.gq.com/story/robert-pattinson-march-cover-profile",
    quoteZh:
      "他完全没有花花公子那一套，所以布鲁斯是怪人，蝙蝠侠也是怪人。我一直觉得这里有更虚无的一面。一般故事里布鲁斯离家、受训、再以完成体回来；这部片是他当蝙蝠侠已经两年，犯罪反而更严重。哥谭人觉得他也只是这座城市一团糟的又一个症状。",
    quoteEn:
      "He doesn't have a playboy persona at all, so he's kind of a weirdo as Bruce and a weirdo as Batman, and I kept thinking there's a more nihilistic slant to it. … It's two years into it, and the crime has gotten worse since Bruce started being Batman. The people of Gotham think that he's just another symptom of how shit everything is.",
  },
  {
    id: "pattinson-gq-addiction",
    speakerId: "pattinson",
    work: "batman",
    date: "2022.02",
    iso: "2022-02-08",
    outlet: "GQ",
    sourceUrl: "https://www.gq.com/story/robert-pattinson-march-cover-profile",
    quoteZh:
      "别的故事都说父母遇害就是他成为蝙蝠侠的原因。我想用更真实的方式拆开这件事：他用很多年搭起这套精密的人格，最后落成蝙蝠侠——但这不是一件健康的事。几乎像药物成瘾。他其实是在自己身上找一点希望，而不只是给这座城市。",
    quoteEn:
      "All the other stories say the death of his parents is why Bruce becomes Batman, but I was trying to break that down in what I thought was a real way. … He's created this intricate construction for years and years, which has culminated in this Batman persona. But it's not like a healthy thing that he's done. Almost like a drug addiction. … He's trying to find some element of hope, in himself, and not just the city.",
  },
  {
    id: "reeves-esquire-endure",
    speakerId: "reeves",
    work: "batman",
    date: "2020.08",
    iso: "2020-08-24",
    outlet: "Esquire UK / DC FanDome",
    sourceUrl: "https://www.esquire.com/uk/culture/a33752700/what-is-the-batman-based-on/",
    quoteZh:
      "让我兴奋的是：他不是传统意义上的超级英雄。他有披风，但不会飞。他跟你我一样。如果非说他有超能力，那就是忍耐——不只是能力，更是一种强迫。被过去、被自己无法解决的东西推着往前走。我想讲的不是他如何成为蝙蝠侠，而是他刚当上蝙蝠侠的早期：离完美还很远。",
    quoteEn:
      "He isn't a superhero in the traditional sense. He has a cape but he can't fly. He's like you and me. But if he has a superpower, it's the ability to endure. And not just the ability, but the kind of compulsion. … To tell a version of Batman that wasn't about how he became Batman, but about the early days of how he is Batman — and he is so far from being perfect.",
  },
  {
    id: "kravitz-pedestrian-bi",
    speakerId: "kravitz",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-01",
    outlet: "Pedestrian",
    sourceUrl: "https://www.pedestrian.tv/entertainment/is-catwoman-bisexual-the-batman/",
    quoteZh:
      "我就是这样理解的：她和安妮卡之间有某种浪漫关系。猫女在漫画里本来就是双性恋，我也按这个方向去演。",
    quoteEn:
      "That's definitely the way I interpreted that, that they had some kind of romantic relationship.",
    note: "克拉维茨确认自己把瑟琳娜读成双性恋，对应片中她与安妮卡的关系。",
  },
  {
    id: "dano-ew-radical",
    speakerId: "dano",
    work: "batman",
    date: "2022.02",
    iso: "2022-02-18",
    outlet: "Entertainment Weekly",
    sourceUrl: "https://ew.com/movies/the-batman-paul-dano-riddler-interview/",
    quoteZh:
      "我想的是大学航空炸弹客，想的是俄克拉荷马城，想的是那些在网上被极端化的人。对我来说他不是漫画里那种超级反派，而是一个被体制彻底抛下的人。",
    quoteEn:
      "I was thinking about the Unabomber. I was thinking about Oklahoma City. I was thinking about the kind of people who get radicalized on the internet.",
  },
  {
    id: "reeves-ign-joker",
    speakerId: "reeves",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-03",
    outlet: "IGN",
    sourceUrl: "https://www.ign.com/articles/the-batman-joker-scene-spoilers-barry-keoghan",
    quoteZh:
      "里夫斯向 IGN 确认：基奥甘片尾那个无名囚徒，就是这个宇宙里的原型小丑。妆容受到默片《笑面人》影响。他拍了两场与蝙蝠侠的戏，前面那场后来剪掉了。",
    quoteEn:
      "Although Keoghan is officially credited as “Unnamed Arkham Prisoner,” Reeves confirmed to IGN that this character is indeed a proto-Joker. Keoghan actually filmed two scenes as this proto-Joker but the filmmaker ended up cutting the earlier scene.",
    note: "导演确认片尾阿卡姆囚徒即本宇宙小丑的早期形态；基奥甘成片戏份被刻意压在阴影里。",
  },
  {
    id: "serkis-kutv-alfred",
    speakerId: "serkis",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-03",
    outlet: "KUTV / ABC6",
    sourceUrl: "https://abc6onyourside.com/news/entertainment/interview-andy-serkis-the-batman",
    quoteZh:
      "观众习惯的阿尔弗雷德是耐心的绅士、管家、知己和父亲。这部片给的不是那一个。里夫斯做了很多会让人不安的选择，而这正是它和其他蝙蝠侠电影分开的地方。",
    quoteEn:
      "We've become accustomed to a particular kind of Alfred Pennyworth. He's a patient gentleman, a butler, a confidant, and father figure to Bruce Wayne. That isn't the Alfred that we are given in The Batman.",
  },
  {
    id: "serkis-dkn-father",
    speakerId: "serkis",
    work: "batman",
    date: "2026.05",
    iso: "2026-05-12",
    outlet: "Dark Knight News（转述 Horwitz 访谈）",
    sourceUrl: "https://darkknightnews.com/2026/05/12/andy-serkis-on-alfreds-arc-in-the-batman-films/",
    quoteZh:
      "我和马特一直在谈「父亲」到底是什么。阿尔弗雷德缺某种父性本能，他想要，却到不了。布鲁斯最需要他的时候，他没能守住他的父母，他一直背着这份愧疚。他能教体能、教他当过兵学来的东西，却教不了情感。",
    quoteEn:
      "Alfred represented a sort of… he had a lack of paternal instinct but wanted it, but couldn't ever get there. And at the moment of greatest need for Bruce, he wasn't there for his parents. And so he was carrying that guilt. … He could teach him skills … but not emotional skills.",
  },
  {
    id: "milioti-esquire-rooting",
    speakerId: "milioti",
    work: "penguin",
    date: "2024.11",
    iso: "2024-11-03",
    outlet: "Esquire",
    sourceUrl:
      "https://www.esquire.com/entertainment/tv/a62766673/cristin-milioti-the-penguin-sofia-falcone-interview/",
    quoteZh:
      "我很喜欢这部剧的一点是：尽管这些人做了那些事，你还是会发现自己在为他们加油。我最喜欢的电影和剧，会让你坐立不安，会让你搞不清自己到底该站在哪一边。",
    quoteEn:
      "Something that I really love about our show is that you find yourself rooting for these people despite that. My favorite movies or television shows keep you on your toes and make you wonder.",
  },
  {
    id: "milioti-esquire-ruin",
    speakerId: "milioti",
    work: "penguin",
    date: "2024.11",
    iso: "2024-11-03",
    outlet: "Esquire",
    sourceUrl:
      "https://www.esquire.com/entertainment/tv/a62766673/cristin-milioti-the-penguin-sofia-falcone-interview/",
    quoteZh:
      "对索菲亚来说，对奥兹的最后一步是：我要毁了你。我要用当初毁掉我脑子的方式，把你的脑子也毁掉一辈子。死太便宜了。",
    quoteEn:
      "But for Sofia, the final step with Oz is: I'm gonna ruin you. I'm going to ruin your brain for life the way mine has been. Death would be a …",
    note: "对应第 7 集审讯戏。原文在 Esquire 专访中完整展开索菲亚对阿卡姆经历的报复逻辑。",
  },
  {
    id: "reeves-mtv-penguin-s2",
    speakerId: "reeves",
    work: "penguin",
    date: "2025.01",
    iso: "2025-01-14",
    outlet: "MTV News（Winter Is Coming 转述）",
    sourceUrl:
      "https://winteriscoming.net/director-matt-reeves-explains-the-waits-for-the-batman-part-ii-and-the-penguin-season",
    quoteZh:
      "我们的计划和希望，绝对是再做一季《企鹅人》。只是必须先找到我们觉得对的那个故事。眼下优先的是把电影拍出来。",
    quoteEn:
      "Our plan and our hope is absolutely to do another season [of The Penguin]. We just have to come up with the idea that we think is the right idea, which is what we're working on.",
  },
  {
    id: "farrell-sr-part2",
    speakerId: "farrell",
    work: "part2",
    date: "2026.06",
    iso: "2026-06-10",
    outlet: "ScreenRant",
    sourceUrl: "https://screenrant.com/batman-part-2-colin-farrell-penguin-how-many-scenes-terrifying/",
    quoteZh:
      "我把剧本从头看到尾，真的很好。马特不只写出了阴暗、有时吓人、心理上很沉、层次很多的东西，而且是有感觉的。我觉得他写了一部当代类型片里的杰作。我只演两场，这样也好，我可以当观众把剩下的看完。",
    quoteEn:
      "I got to read from the first to last page and it's really magnificent. … Not only tonally, a really kind of dark and at times terrifying piece, and not only psychologically weighty and nuanced, but really feeling. … I just think he wrote kind of a contemporary genre masterpiece, really. I'm only in two scenes, which is great because it means I can enjoy the rest of the film.",
  },
  {
    id: "wright-denofgeek",
    speakerId: "wright",
    work: "part2",
    date: "2025.08",
    iso: "2025-08-15",
    outlet: "Den of Geek（MPA The Credits 转述）",
    sourceUrl:
      "https://www.motionpictures.org/2025/08/jeffrey-wright-teases-jim-gordons-role-in-the-batman-part-ii/",
    quoteZh:
      "我听到了一些东西。我对马特搭建哥谭的本事非常尊敬，所以我很期待跳进去读他写的东西。我相信会很丰厚，演起来会过瘾，理想情况下观众看起来也会过瘾。",
    quoteEn:
      "I've heard some things. … I'm liking what I'm hearing. And I have huge respect for Matt's Gotham-building skills. So I'm excited to jump in there and read what he has, which I'm sure will be rich and satisfying to play, and ideally for audiences to take in as well.",
    note: "当时怀特表示自己尚未读完全本剧本，评价来自剧组转述与对里夫斯的信任。",
  },
  {
    id: "serkis-dkn-script",
    speakerId: "serkis",
    work: "part2",
    date: "2026.05",
    iso: "2026-05-12",
    outlet: "Dark Knight News（转述 Horwitz 访谈）",
    sourceUrl: "https://darkknightnews.com/2026/05/12/andy-serkis-on-alfreds-arc-in-the-batman-films/",
    quoteZh:
      "剧本非常好，真的。我什么剧情都不会说。而且最棒的是我排得过来——档期一度撞车，差点回不了续集。会很紧，但我们会赶到。",
    quoteEn:
      "It's amazing. It's a great script, it really is. And again, I'm not going to say anything whatsoever about it. And actually, the great thing is I'm going to be able to do it because we figured the schedule out. So it's going to be tight, but we'll get there.",
  },
  {
    id: "reeves-mtv-part2",
    speakerId: "reeves",
    work: "part2",
    date: "2025.01",
    iso: "2025-01-14",
    outlet: "MTV News（Winter Is Coming 转述）",
    sourceUrl:
      "https://winteriscoming.net/director-matt-reeves-explains-the-waits-for-the-batman-part-ii-and-the-penguin-season",
    quoteZh:
      "今年我们就要开拍了，我非常兴奋。中间发生了很多事，花的时间比我想的长，但我对我们正在做的东西超级兴奋，等不及拿出来给大家看。",
    quoteEn:
      "This year we're gonna be shooting and I'm very excited about it. There's been a lot of stuff going on and it's taking longer than I would have wanted, but I'm super-excited about what we're doing, so I really can't wait to share that with everybody.",
  },
];

export function interviewsByPerson(personId: string): InterviewQuote[] {
  const speaker = SPEAKERS.find((s) => s.personId === personId);
  if (!speaker) return [];
  return INTERVIEWS.filter((q) => q.speakerId === speaker.id);
}
