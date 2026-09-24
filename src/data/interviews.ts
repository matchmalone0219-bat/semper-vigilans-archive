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
  roleEn?: string;
  personId?: string;
  portrait?: string;
};

export const SPEAKERS: InterviewSpeaker[] = [
  {
    id: "pattinson",
    name: "罗伯特·帕丁森",
    nameEn: "Robert Pattinson",
    role: "布鲁斯·韦恩 / 蝙蝠侠",
    roleEn: "Bruce Wayne / Batman",
    personId: "bruce",
    portrait: "/media/cast/pattinson.jpg",
  },
  {
    id: "kravitz",
    name: "佐伊·克拉维茨",
    nameEn: "Zoë Kravitz",
    role: "瑟琳娜·凯尔 / 猫女",
    roleEn: "Selina Kyle / Catwoman",
    personId: "selina",
    portrait: "/media/cast/kravitz.jpg",
  },
  {
    id: "farrell",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    role: "奥兹·科布 / 企鹅人",
    roleEn: "Oz Cobb / The Penguin",
    personId: "oz",
    portrait: "/media/cast/farrell.jpg",
  },
  {
    id: "wright",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    role: "吉姆·戈登",
    roleEn: "Jim Gordon",
    personId: "gordon",
    portrait: "/media/cast/wright.jpg",
  },
  {
    id: "serkis",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    role: "阿尔弗雷德·潘尼沃斯",
    roleEn: "Alfred Pennyworth",
    personId: "alfred",
    portrait: "/media/cast/serkis.jpg",
  },
  {
    id: "dano",
    name: "保罗·达诺",
    nameEn: "Paul Dano",
    role: "爱德华·纳什顿 / 谜语人",
    roleEn: "Edward Nashton / The Riddler",
    personId: "edward",
    portrait: "/media/cast/dano-v2.jpg",
  },
  {
    id: "milioti",
    name: "克里斯汀·米莉奥蒂",
    nameEn: "Cristin Milioti",
    role: "索菲亚·法尔科内",
    roleEn: "Sofia Falcone",
    personId: "sofia",
    portrait: "/media/cast/milioti.jpg",
  },
  {
    id: "feliz",
    name: "伦齐·费利兹",
    nameEn: "Rhenzy Feliz",
    role: "维克托·阿吉拉尔",
    roleEn: "Victor Aguilar",
    personId: "victor",
    portrait: "/media/cast/feliz-v2.jpg",
  },
  {
    id: "reeves",
    name: "马特·里夫斯",
    nameEn: "Matt Reeves",
    role: "导演 / 编剧",
    roleEn: "Director / Writer",
    portrait: "/media/cast/reeves.jpg",
  },
  {
    id: "fraser",
    name: "格雷格·弗雷泽",
    nameEn: "Greig Fraser",
    role: "摄影指导",
    roleEn: "Director of Photography",
    portrait: "/media/cast/fraser-v2.jpg",
  },
  {
    id: "stan",
    name: "塞巴斯蒂安·斯坦",
    nameEn: "Sebastian Stan",
    role: "《新蝙蝠侠2》主演（角色未公布）",
    roleEn: "Lead Cast, The Batman: Part II (Undisclosed Role)",
    portrait: "/media/cast/stan.jpg",
  },
];

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
    id: "pattinson-collider-2026-left-turn",
    speakerId: "pattinson",
    work: "part2",
    date: "2026.09.22",
    iso: "2026-09-22",
    outlet: "Collider",
    sourceUrl:
      "https://collider.com/the-batman-part-2-script-update-robert-pattinson/",
    quoteZh:
      "这部片子很有野心。我的意思是，第一部是对蝙蝠侠电影的一种全新尝试，而这一部则是另一种……相较第一部，它确实是一次‘急转弯’（real left turn），但在某种程度上它又保留了第一部那种感觉的一些要素。但它感觉真的非常有野心，我很期待看到成片最终呈现出来是什么样。",
    quoteEn:
      "It's so ambitious. I mean, the first one was a different take on a Batman movie, and this one is another… It's a real left turn from the first one, but somehow it keeps elements of the kind of feel of it. But it just feels really ambitious, and I'm excited to see how it turns out.",
    note:
      "【本站整理】2026 年 9 月多伦多国际电影节（TIFF）期间接受 Collider 专访。当被问及塞巴斯蒂安·斯坦此前盛赞续集的发言时，帕丁森给出了上述回应。对话聚焦于风格定位，帕丁森用「real left turn」形容续集相对于前作的风格转向，同时表示仍保留了第一部的一些感觉基调。谈话未涉及具体剧情与反派身份；《TheWrap》与《Variety》等媒体随后跟进报道。",
  },
  {
    id: "pattinson-collider-2026-dense-script",
    speakerId: "pattinson",
    work: "part2",
    date: "2026.09.22",
    iso: "2026-09-22",
    outlet: "Collider",
    sourceUrl:
      "https://collider.com/the-batman-part-2-script-update-robert-pattinson/",
    quoteZh:
      "当你看到它时，剧本非常密（incredibly dense）。马特·里夫斯就是那种显然已经在脑子里装好了整部电影所有东西的导演……里面的内容太多了，几乎不可能一次性把它全装下，但随着你不断去了解，你就会感觉：‘哦，原来你完全清楚自己想拿这个做什么。’这种感觉真的很酷。",
    quoteEn:
      "When you see it, the script is incredibly dense, and it's like he's just one of those directors who it's really obvious that he has the entire thing in his head already… There's so much in it that it's almost impossible to encompass the whole thing, but when you keep finding out, you're like, 'Oh, no, you know exactly what you want to do with this.' There's just something so cool about it.",
    note:
      "【本站整理】同场专访中，帕丁森用「incredibly dense」形容剧本内容密度，并表示里夫斯显然已经对整部电影要如何处理有清楚构想。",
  },
  {
    id: "pattinson-gq-weirdo",
    speakerId: "pattinson",
    work: "batman",
    date: "2022.02",
    iso: "2022-02-08",
    outlet: "GQ",
    sourceUrl: "https://www.gq.com/story/robert-pattinson-march-cover-profile",
    quoteZh:
      "他完全没有花花公子形象，所以无论作为布鲁斯还是蝙蝠侠都有点怪。我一直觉得这里有一种更虚无主义的倾向。……故事已经来到他当蝙蝠侠的第二年，而自从布鲁斯成为蝙蝠侠后，犯罪反而变得更严重。哥谭人觉得他只是这一切糟糕现状的另一个症状。",
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
      "其他故事都会说，父母的死亡是布鲁斯成为蝙蝠侠的原因，但我想用一种我认为更真实的方式把这件事拆开来看。……他花了很多年构建出一套复杂的东西，最终形成了蝙蝠侠这个人格。但他所做的并不健康，几乎就像药物成瘾。……他是在自己身上寻找某种希望，而不只是给这座城市寻找希望。",
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
      "他并不是传统意义上的超级英雄。他有披风，但不会飞。他和你我一样。但如果说他有什么超能力，那就是承受的能力。而且不只是能力，也是一种强迫性的驱动力。……我想讲的不是他如何成为蝙蝠侠，而是他成为蝙蝠侠早期的状态——那时的他离完美还很远。",
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
      "我确实是这么理解的——她们之间存在某种浪漫关系。",
    quoteEn:
      "That's definitely the way I interpreted that, that they had some kind of romantic relationship.",
    note:
      "【本站整理】克拉维茨明确表示，她将瑟琳娜与安妮卡的关系理解为带有浪漫性质；漫画设定背景不属于这句直接引语本身。",
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
      "我当时想到的是“大学航空炸弹客”，想到的是俄克拉荷马城爆炸案，也想到那些在网络上被激进化的人。",
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
      "对我来说，这个想法是：小丑还没有成为“小丑”，但他们之间已经有了这种关系。……他非常敏锐、聪明，能够进入你的脑子里，并且基本上持有一种虚无主义的观点：从一开始、从他出生起，生命对他就是一个残酷的玩笑。这就是他的回应，而他最终会宣称自己是个小丑，宣称自己就是“小丑”。",
    quoteEn:
      "And for me, I think [it's] this idea that the Joker is not yet the Joker, but they already have this relationship. ... It's this idea of him being very incisive and brilliant and being able to get into your mind and basically having this nihilistic point of view that's like from his inception, from his birth, life has been a cruel joke on him. And this is his response, and he's eventually going to declare himself as a clown, declare himself as the Joker.",
    note:
      "【本站整理】里夫斯在采访中说明，片尾阿卡姆囚徒仍处于“尚未成为小丑”的阶段；华纳随后公开了蝙蝠侠与该囚徒的阿卡姆删减审讯片段。",
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
      "我们已经习惯了某一种阿尔弗雷德·潘尼沃斯：他是一位耐心的绅士、管家、知己，也是布鲁斯·韦恩的父亲形象。但《新蝙蝠侠》里的阿尔弗雷德并不是这样的。",
    quoteEn:
      "We've become accustomed to a particular kind of Alfred Pennyworth. He's a patient gentleman, a butler, a confidant, and father figure to Bruce Wayne. That isn't the Alfred that we are given in The Batman.",
  },
  {
    id: "serkis-dkn-father",
    speakerId: "serkis",
    work: "batman",
    date: "2026.05",
    iso: "2026-05-12",
    outlet: "Dark Knight News（转述 Josh Horowitz 访谈）",
    sourceUrl: "https://darkknightnews.com/2026/05/12/andy-serkis-on-alfreds-arc-in-the-batman-films/",
    quoteZh:
      "阿尔弗雷德代表着一种……他缺乏父性的本能，但又想拥有它，却始终做不到。在布鲁斯最需要他的时候，他没能守护好布鲁斯的父母，所以一直背负着这种愧疚。……他可以教布鲁斯各种技能……但教不了他情感上的能力。",
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
      "我很喜欢这部剧的一点是，即便如此，你还是会发现自己在为这些人加油。我最喜欢的电影或电视剧会让你一直保持警觉，也会让你不断产生疑问。",
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
      "而且这一切都是心理上的。我是说，它也很暴力。但对索菲亚来说，面对奥兹的最后一步就是：我要毁掉你。我要让你的大脑余生都被毁掉，就像我的一样。死亡对他反而会是一种解脱。他当年对我做的就是这个。他夺走了我最爱的人。她的悲痛和愤怒像一个没有底的深坑。",
    quoteEn:
      "And it's all psychological. I mean, it's violent, too. But for Sofia, the final step with Oz is: I'm gonna ruin you. I'm going to ruin your brain for life the way mine has been. Death would be a relief for him. Which is what he did to me. He took the person I loved the most away. There's a bottomless pit to her grief and anger.",
    note:
      "【本站整理】对应《企鹅人》后段索菲亚与奥兹的对峙。米莉奥蒂将索菲亚的目标概括为让奥兹长期承受与自己相似的心理创伤，而非简单杀死他。",
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
      "我们的计划和希望当然是再做一季《企鹅人》。我们只需要想出一个我们认为真正合适的点子，而这正是我们目前在做的事。",
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
      "我从第一页一直读到最后一页，真的非常精彩。……从基调上说，它很黑暗，有时甚至很吓人；从心理层面说，它很有分量、很细腻，而且很有情感。……我真的觉得他写出了一部当代类型片杰作。我只在里面有两场戏，这很好，因为这意味着我可以享受电影剩下的部分。",
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
      "我已经听到了一些消息。……我很喜欢我听到的东西。我非常尊重马特构建哥谭世界的能力，所以我很期待进去看看他写了什么。我相信这些内容会很丰富，演起来也会很有满足感，理想情况下观众看起来也会如此。",
    quoteEn:
      "I've heard some things. … I'm liking what I'm hearing. And I have huge respect for Matt's Gotham-building skills. So I'm excited to jump in there and read what he has, which I'm sure will be rich and satisfying to play, and ideally for audiences to take in as well.",
    note:
      "【本站整理】怀特当时表示自己尚未读到完整剧本，这段评价主要基于已听到的内容以及对里夫斯构建哥谭世界能力的信任。",
  },
  {
    id: "serkis-dkn-script",
    speakerId: "serkis",
    work: "part2",
    date: "2026.05",
    iso: "2026-05-12",
    outlet: "Dark Knight News（转述 Josh Horowitz 访谈）",
    sourceUrl: "https://darkknightnews.com/2026/05/12/andy-serkis-on-alfreds-arc-in-the-batman-films/",
    quoteZh:
      "太棒了。真的是一个很好的剧本。还是那句话，我不会透露任何具体内容。实际上，很棒的一点是我能参与，因为我们已经把档期协调好了。时间会很紧，但我们能做到。",
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
      "今年我们会开拍，我对此非常兴奋。期间发生了很多事情，花的时间也比我原本希望的更长，但我对我们正在做的东西非常兴奋，所以真的等不及和大家分享。",
    quoteEn:
      "This year we're gonna be shooting and I'm very excited about it. There's been a lot of stuff going on and it's taking longer than I would have wanted, but I'm super-excited about what we're doing, so I really can't wait to share that with everybody.",
  },
  {
    id: "pattinson-gq-detective",
    speakerId: "pattinson",
    work: "batman",
    date: "2022.02",
    iso: "2022-02-08",
    outlet: "GQ",
    sourceUrl: "https://www.gq.com/story/robert-pattinson-march-cover-profile",
    quoteZh:
      "从我第一次和马特见面起，他就说：‘我想拍一部 70 年代风格的黑色侦探故事。’这就是一部侦探故事。我觉得自己像个傻瓜，因为我以前甚至不知道蝙蝠侠被称为‘世界上最伟大的侦探’，我这辈子从没听过——但放在电影里真的很成立。通常你看到蝙蝠侠时，他一出现就开始打人。但在这里，他会和人交谈，角色之间也有情感戏。",
    quoteEn:
      "It was what Matt was saying from the first meeting I had with him: ‘I want to do a ’70s noir detective story.’ This is a detective story. And I feel like an idiot, because I didn't even know that Batman was ‘the world's greatest detective’; I hadn't heard that in my life before—but it really plays. Normally, when you see Batman he arrives and beats people up. But he's having conversations, and there are emotional scenes between them.",
  },
  {
    id: "kravitz-complex-survivor",
    speakerId: "kravitz",
    work: "batman",
    date: "2022.02",
    iso: "2022-02-24",
    outlet: "Complex",
    sourceUrl:
      "https://www.complex.com/pop-culture/a/khal/becoming-catwoman-the-batman-zoe-kravitz-featurette-exclusive",
    quoteZh:
      "我不会称她为反派，因为这里面有很多灰色地带。我能共情凯尔的故事、她的过去和她的力量。我真的找到了一个不只是跟班、也不只是穿紧身衣的漂亮女孩的角色。她是一个幸存者。",
    quoteEn:
      "I wouldn't call her a villain, because there is so much in the gray. I felt for Kyle's story, her past, her strength. I really found a character who was more than just a sidekick or more than just a good-looking girl in a tight outfit. She's a survivor.",
  },
  {
    id: "wright-thr-comics",
    speakerId: "wright",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-04",
    outlet: "The Hollywood Reporter",
    sourceUrl:
      "https://www.hollywoodreporter.com/movies/movie-features/the-batman-jeffrey-wright-gordon-1235104401/",
    quoteZh:
      "我更多依靠的是漫画，因为在 1939 年 5 月《侦探漫画》第 27 期的第一个画格里，就是布鲁斯·韦恩和戈登，所以戈登从那时到今天有一条很长的脉络。……当然，哥谭是以纽约为原型的，所以我也参考了当时的纽约市长埃里克·亚当斯，他是一位我很欣赏的前警察。……但在角色的底层心理、情感历程，以及他与蝙蝠侠的关系上，我主要还是依靠漫画。",
    quoteEn:
      "I relied more on the comics because in the first panel of DC No. 27, May 1939, is Bruce Wayne and Gordon, so there's a long arc for Gordon from then until today. … Of course, Gotham is fashioned after New York City, so I looked at the current mayor of New York City, Eric Adams, who is a former cop I admired. … I largely relied on the comics for the underlying psychology and emotional journey that the character undergoes and for the relationship with the Batman.",
  },
  {
    id: "wright-thr-fans",
    speakerId: "wright",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-04",
    outlet: "The Hollywood Reporter",
    sourceUrl:
      "https://www.hollywoodreporter.com/movies/movie-features/the-batman-jeffrey-wright-gordon-1235104401/",
    quoteZh:
      "在这个系列里，有一种感觉是：这些故事和角色真正的拥有者不是我们，不是参与这些电影制作的人，甚至也不是如此出色地写出剧本并执导成片的马特·里夫斯，而是影迷。我参与过的其他系列里，从没感受过像这个系列这样强烈的热情。",
    quoteEn:
      "There's a sense with this franchise that the true owners of these stories and these characters are not us. It's not those of us who take part in the making of these films. It's not even Matt Reeves, who so brilliantly crafted this script and realized it through his direction. But rather, this belongs to the fans. I've never experienced the level of passion and intensity for a franchise as I have with this.",
  },
  {
    id: "fraser-iw-pov",
    speakerId: "fraser",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-07",
    outlet: "IndieWire",
    sourceUrl:
      "https://www.indiewire.com/features/general/the-batman-cinematography-greig-fraser-matt-reeves-interview-1234704530/",
    quoteZh:
      "他希望确保我们把注意力高度集中在主角身上。一切都必须由布鲁斯·韦恩的视角来驱动。……对我来说，蝙蝠侠有趣的一点是他没有超能力。他没有透视眼，也不会飞。他拥有的是惊人的决心、意志和智力，所以任何传达这些特质的摄影机运动都必须经过仔细考虑，并且有明确意图。",
    quoteEn:
      "He wanted to make sure that we were extremely focused on our main character. Everything had to be driven by Bruce Wayne's point of view. … The fun thing to me about Batman is that he has no super powers. He doesn't have x-ray vision and he can't fly. What he has is incredible determination and will and intelligence, so any camera movement conveying that has to be very considered and intentional.",
  },
  {
    id: "fraser-iw-darklight",
    speakerId: "fraser",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-07",
    outlet: "IndieWire",
    sourceUrl:
      "https://www.indiewire.com/features/general/the-batman-cinematography-greig-fraser-matt-reeves-interview-1234704530/",
    quoteZh:
      "布鲁斯·韦恩生活在阴影里——他不是那种白天会在购物中心里闲逛的人。这是一部黑色电影，大部分内容发生在夜晚。我担心画面会暗到什么都看不清，所以我在网上搜集了很多虽然黑暗但仍然看得清的图片，整理成一份给马特、也给我自己看的文档，我把它叫作《Dark but Light》。",
    quoteEn:
      "Bruce Wayne lives in the shadows — he isn't a guy who walks around shopping centers during the day. This is a noir film, and most of it is set at night. My concern was that it might be hard to see anything, so I scoured the internet for images that were dark but easy to see, and I collected them in a document for Matt — and for myself — that I called ‘Dark but Light.’",
  },
  {
    id: "reeves-iw-chase",
    speakerId: "reeves",
    work: "batman",
    date: "2022.03",
    iso: "2022-03-07",
    outlet: "IndieWire",
    sourceUrl:
      "https://www.indiewire.com/features/general/the-batman-cinematography-greig-fraser-matt-reeves-interview-1234704530/",
    quoteZh:
      "我想要那种直观、强烈的混乱感，所以希望摄影机尽可能固定在车体上，尽量采用硬连接。[这个视点]完全是主观的，牢牢固定在这辆剧烈震动的车上，穿过泥土和雨水这些很有触感的环境。你会觉得自己和他一起坐在发动机上，而这辆车随时都可能散架。",
    quoteEn:
      "I wanted to feel that kind of visceral chaos, so I wanted the cameras to be mounted, everything a hard mount as much as it could be. [The point of view] is totally subjective and hard fixed to this vibrating beast of a car driving through visceral elements of dirt and rain, and you feel like you're sitting on that engine with him, and the car could come apart at any minute.",
  },
  {
    id: "feliz-time-oz",
    speakerId: "feliz",
    work: "penguin",
    date: "2024.11",
    iso: "2024-11-11",
    outlet: "TIME",
    sourceUrl: "https://time.com/7174484/the-penguin-finale-rhenzy-feliz-interview/",
    quoteZh:
      "维克托和奥兹也是在镜头前第一次见面，他们的关系逐渐发展，这和我与科林经历的过程很相似。……我主要是以奥兹的身份认识他的。……我和科林本人面对面说话可能不到七次，大概六次。……后来我第一次在画面里看到奥兹时，突然有种感觉，我当时想：‘天哪，原来这就是我几个月来一直相处的那个人。’",
    quoteEn:
      "Victor and Oz are meeting each other on camera for the first time as well, and their relationship is growing, and that really resembled what me and Colin were going through. … I mostly got to know him as Oz. … I've spoken to Colin's face maybe less than seven times, six times. … When I saw Oz for the first time on camera, it kind of hit me, and I was like, “Oh my god, there's the guy I've been spending months and months and months with.”",
  },
  {
    id: "feliz-time-stutter",
    speakerId: "feliz",
    work: "penguin",
    date: "2024.11",
    iso: "2024-11-11",
    outlet: "TIME",
    sourceUrl: "https://time.com/7174484/the-penguin-finale-rhenzy-feliz-interview/",
    quoteZh:
      "这是我最担心的部分：怎样以一种认真、诚实的方式来表现口吃。……维克托的口吃在剧集中确实会变化，但并不是因为他变得更自信了，那是一种误解。……维克托属于口吃不会消失的人。有时它并没有什么固定规律。真正会变化的是你说话时整体的舒适程度。",
    quoteEn:
      "That was what I was most worried about: trying to do the stutter in a thoughtful, honest way. … The stutter does change throughout the show, but not because he gets more confident. That's a misconception. … Victor is one of the people whom it doesn't go away for. There's no rhyme or reason sometimes. What does change is your comfort with speaking in general.",
  },
  {
    id: "farrell-collider-vic",
    speakerId: "farrell",
    work: "penguin",
    date: "2024.11",
    iso: "2024-11-11",
    outlet: "Collider",
    sourceUrl:
      "https://collider.com/the-penguin-finale-victor-death-scene-explained-colin-farrell/",
    quoteZh:
      "我是说，我内心有一部分不想拍那场戏。你知道，我明白总体的想法是，到最后，他们某种程度上想要杀掉我们在电影里认识的那个奥兹。我觉得这里有一种创作责任，倾向于认为：‘我们不能让这个人成为一个讨喜的角色。’……所以，当我知道自己要进入那种心理上的终局状态，并让角色体现出那场戏里表现出来的那种残酷深度时，真的很难。",
    quoteEn:
      "I mean, part of me didn't want to do it, you know? I knew that the general sentiment was that, by the end, they kind of wanted to, in a way, kill the Oz that we met in the film. I felt that there was a sense of creative responsibility that leaned towards, 'We cannot have this man as a likable character.' ... So, knowing that I was going into that kind of degree of psychological finality and embodying the character with a kind of a depth of cruelty that is articulated in that scene, it was tough, man.",
    note:
      "【本站整理】法瑞尔谈到大结局杀死维克托的戏时，强调主创不希望奥兹最终仍被观众当作一个讨喜角色，并形容那场戏的残酷程度让拍摄很艰难。",
  },
  {
    id: "reeves-hsc-bruce",
    speakerId: "reeves",
    work: "part2",
    date: "2025.09",
    iso: "2025-09-18",
    outlet: "Happy Sad Confused / ScreenRant",
    sourceUrl:
      "https://screenrant.com/the-batman-2-matt-reeves-teases-villain-robert-pattinson-in-dcu/",
    quoteZh:
      "我知道《新蝙蝠侠》的结尾把我们留在了一个临界点上，《企鹅人》里发生的事情也是如此。……我想探索的一件事，是进一步深入布鲁斯·韦恩这个角色。第一部故事很大程度上是在讲“蝙蝠侠”。我一直希望……这些电影都聚焦在他的角色身上。……我从来不想让罗伯离开这些故事的中心。选择一个合适的反派，让故事能够深入这些问题、进入他的过去和生活，这推动了我们的讨论。……我只能说，这在电影里以前从未真正做过。",
    quoteEn:
      "I knew with the way [The Batman] ended, it was leaving us on the precipice. Also, the way events happen in [The Penguin]. … One of the explorations for me was to do something that pushes even further into the character of Bruce Wayne. The first story is so much about The Batman. I always wanted … the movies to be focused on his character. … I never wanted to lose Rob at the center of these stories. Picking the right villain that digs into what that does and goes into his past and his life, that was what drove that discussion. … I will say, it's never really been done in a movie before.",
  },
  {
    id: "reeves-hsc-elseworlds",
    speakerId: "reeves",
    work: "part2",
    date: "2025.09",
    iso: "2025-09-18",
    outlet: "Happy Sad Confused / ScreenRant",
    sourceUrl:
      "https://screenrant.com/the-batman-2-matt-reeves-teases-villain-robert-pattinson-in-dcu/",
    quoteZh:
      "我们没有谈过类似的事情。……我真正想做的是把我们已经开始的这些故事讲完，并抵达我从一开始就希望抵达的结局。……我们正在和他们一起推进《新蝙蝠侠2》。我是说，它属于 DC，所以它是 Elseworlds，但它也是 DC，因此同样属于他们。",
    quoteEn:
      "We haven't talked about anything like that. … What I really want to do is play out these stories that we began and arrive at the conclusion I've hoped we would arrive at from the beginning. … We're working with them on [The Batman 2]. I mean, it's a DC, so, like, it's Elseworld, but it is DC, so it's theirs as well.",
  },
  {
    id: "pattinson-gq-2026-marathon",
    speakerId: "pattinson",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-01",
    outlet: "GQ",
    sourceUrl: "https://www.gq.com/story/robert-pattinson-interview-jaeger-lecoultre-campaign",
    quoteZh:
      "我会在伦敦待到年底拍一部蝙蝠侠续集。挺好的。大量打斗确实让我开始感受到自己的年龄。我真的会想：‘该死，这比以前明显难多了。’但拍起来很有趣。我也觉得这部电影会很棒。它有一群非常有趣的演员，不过这确实是一场马拉松。",
    quoteEn:
      "I'm in London here till the end of the year doing a Batman sequel. It's good. I'm definitely feeling my age when fighting a lot. I'm literally like, 'Goddamn, this is significantly harder than it used to be.' But it's really fun. And I think the movie's going to be pretty great. It's got a really, really fun cast, but it's a marathon.",
    note:
      "【本站整理】2026 年 9 月 1 日《GQ》专访。帕丁森表示自己会在伦敦拍摄续集至年底，并以玩笑口吻谈到动作戏比过去更吃力；原话没有涉及退出系列或“最后一部蝙蝠侠”的表态。",
  },
  {
    id: "pattinson-gq-2026-drifter",
    speakerId: "pattinson",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-01",
    outlet: "GQ",
    sourceUrl: "https://www.gq.com/story/robert-pattinson-interview-jaeger-lecoultre-campaign",
    quoteZh:
      "我觉得那是特技替身。是在利物浦还是苏格兰那边拍的？……（GQ：大家说那是“流浪者”。）……对，是我！是我。（笑）",
    quoteEn:
      "I think that's a stunt double. Is that something in Liverpool or Scotland or something? … [GQ: People were saying it was the drifter.] … Yeah, it's me! It's me. [Laughs]",
    note:
      "【本站整理】记者询问片场摩托车画面时，帕丁森先判断为特技替身，听到“流浪者”说法后又笑着改口认领。这段回答具有明显即兴玩笑语气，不能单独作为画面人物身份的确认依据。",
  },
  {
    id: "pattinson-mymovies-direction",
    speakerId: "pattinson",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-06",
    outlet: "MYmovies.it",
    sourceUrl:
      "https://www.ign.com/articles/the-batman-part-2-goes-in-another-totally-different-direction-robert-pattinson-teases",
    quoteZh:
      "马特刚写出了一个很棒的剧本。我觉得第一部……要把蝙蝠侠重新塑造成一个新的东西很难，然后这一部又走向了另一个完全不同的方向。我只是在看一些镜头的回放……它看起来和第一部不一样。",
    quoteEn:
      "Matt just wrote this amazing script. I think the first one was… it's difficult to reinvent Batman as this new thing. And then to go in another totally different direction. I'm just looking at the playback on certain things… it looks different to the first one.",
    note:
      "【本站整理】帕丁森在宣传新片期间谈到续集剧本与片场回放，明确表示第二部走向与第一部不同，且已看到的镜头“看起来和第一部不一样”。",
  },
  {
    id: "pattinson-mymovies-radical",
    speakerId: "pattinson",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-06",
    outlet: "MYmovies.it",
    sourceUrl:
      "https://www.ign.com/articles/the-batman-part-2-goes-in-another-totally-different-direction-robert-pattinson-teases",
    quoteZh:
      "真的很棒。剧本发生了相当激进的变化。华纳和 DC 都支持它，这很酷，简直有点疯狂。我觉得马特可能是唯一一个大家会允许这么做的人，因为这算是对蝙蝠侠一次非常激进的重新讲述。我觉得大家会对此感到兴奋。",
    quoteEn:
      "It's just amazing. It's a quite radical change of the script. It's cool that Warner's behind it, and DC. It's just crazy. I think Matt is the only person who anybody would allow to do it, because it's kind of a really radical retelling of Batman. I think people are going to be excited by it.",
    note:
      "【本站整理】同场谈话中，帕丁森用「radical」形容剧本变化与对蝙蝠侠故事的重新讲述，并提到华纳与 DC 对该方向的支持；谈话未透露具体剧情或反派身份。",
  },
  {
    id: "stan-variety-godfather",
    speakerId: "stan",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-11",
    outlet: "Variety",
    sourceUrl:
      "https://variety.com/2026/film/awards/sebastian-stan-fjord-maga-the-batman-2-godfather-1236859214/",
    quoteZh:
      "我有时走进片场，环顾四周，会想：我觉得我们他妈是在拍《教父2》。我真的不想把它捧得太高，但我确实觉得最后会有回报。",
    quoteEn:
      "I go to set sometimes and I look around and I’m like, I think we’re making fucking ‘Godfather Part Two,’ I really don’t want to raise it up, but I do feel like it’s going to be a payoff.",
    note:
      "【本站整理】2026 年 9 月 11 日《Variety》专访。斯坦以《教父2》作现场感受的夸张类比，同时仍未公开自己的具体角色，也没有回应外界关于哈维·丹特的猜测。",
  },
  {
    id: "stan-variety-grounded",
    speakerId: "stan",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-11",
    outlet: "Variety",
    sourceUrl:
      "https://variety.com/2026/film/awards/sebastian-stan-fjord-maga-the-batman-2-godfather-1236859214/",
    quoteZh:
      "在真正看到它之前，人们不可能完全理解这部电影是什么样。……关于这些角色、关于这部电影是什么，有很多猜测，但我觉得最后会有不错的回报——它非常扎实，也非常真实，这正是我喜欢它的地方。你会想稍微透露一点，但我们还有很长时间。",
    quoteEn:
      "There’s no way people will fully grasp how this movie is until they see it. … There’s a lot of speculation about these roles, about what this movie is, but I think it’s going to be a good payoff — it’s really grounded and real, and that’s what I loved about it. You want to tease it a little, but we still have a long time.",
    note:
      "【本站整理】同篇专访中，斯坦强调外界在成片公开前难以完整理解影片，并用「grounded and real」概括自己喜欢的质感；具体角色仍处于保密状态。",
  },
  {
    id: "stan-variety-gunn",
    speakerId: "stan",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-11",
    outlet: "Variety",
    sourceUrl:
      "https://variety.com/2026/film/awards/sebastian-stan-fjord-maga-the-batman-2-godfather-1236859214/",
    quoteZh:
      "两件事同时发生了。我接到电话去见马特·里夫斯，他看过《学徒》而且很喜欢，然后说：‘我想和你聊聊这部新电影。’与此同时，我也联系了詹姆斯·古恩，说：‘听着，兄弟，我就是想让你知道——我还在，我状态很好，我准备好了。’然后事情就这么发生了。",
    quoteEn:
      "Two things happened at the same time. I got a call to go meet Matt Reeves, who had seen The Apprentice and loved it and said, 'I want to talk to you about this new movie.' And at the same time, I'd reached out to James Gunn and said, 'Listen, man, I’m just letting you know — I’m here, I’m alive and well, I’m ready to rock.' And then it happened.",
    note:
      "【本站整理】斯坦回忆加盟过程：里夫斯因看过《学徒》约他会面，同时他也主动向詹姆斯·古恩表达合作意愿，之后促成了此次加盟。",
  },
  {
    id: "stan-screenrant-winter",
    speakerId: "stan",
    work: "part2",
    date: "2026.09",
    iso: "2026-09-11",
    outlet: "ScreenRant（TIFF 红毯）",
    sourceUrl: "https://www.superherohype.com/news/692533-sebastian-stan-provides-the-batman-2-production-timeline",
    quoteZh:
      "很长时间。这个冬天会很漫长。",
    quoteEn: "A very long time. It's a long winter.",
    note:
      "【本站整理】TIFF 红毯受访时，斯坦只明确表示拍摄还会持续“很长时间”，并称“这个冬天会很漫长”；更具体的拍摄安排应以片场日志和官方通告分别核对。",
  },
];
