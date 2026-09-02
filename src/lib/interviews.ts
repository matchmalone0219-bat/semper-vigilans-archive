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
    portrait: "/media/cast/pattinson.jpg",
  },
  {
    id: "kravitz",
    name: "佐伊·克拉维茨",
    nameEn: "Zoë Kravitz",
    role: "瑟琳娜·凯尔 / 猫女",
    personId: "selina",
    portrait: "/media/cast/kravitz.jpg",
  },
  {
    id: "farrell",
    name: "科林·法瑞尔",
    nameEn: "Colin Farrell",
    role: "奥兹·科布 / 企鹅人",
    personId: "oz",
    portrait: "/media/cast/farrell.jpg",
  },
  {
    id: "wright",
    name: "杰弗里·怀特",
    nameEn: "Jeffrey Wright",
    role: "吉姆·戈登",
    personId: "gordon",
    portrait: "/media/cast/wright.jpg",
  },
  {
    id: "serkis",
    name: "安迪·瑟金斯",
    nameEn: "Andy Serkis",
    role: "阿尔弗雷德·潘尼沃斯",
    personId: "alfred",
    portrait: "/media/cast/serkis.jpg",
  },
  {
    id: "dano",
    name: "保罗·达诺",
    nameEn: "Paul Dano",
    role: "爱德华·纳什顿 / 谜语人",
    personId: "edward",
    portrait: "/media/cast/dano-v2.jpg",
  },
  {
    id: "milioti",
    name: "克里斯汀·米莉奥蒂",
    nameEn: "Cristin Milioti",
    role: "索菲亚·法尔科内",
    personId: "sofia",
    portrait: "/media/cast/milioti.jpg",
  },
  {
    id: "feliz",
    name: "伦齐·费利兹",
    nameEn: "Rhenzy Feliz",
    role: "维克托·阿吉拉尔",
    personId: "victor",
    portrait: "/media/cast/feliz-v2.jpg",
  },
  {
    id: "reeves",
    name: "马特·里夫斯",
    nameEn: "Matt Reeves",
    role: "导演 / 编剧",
    portrait: "/media/cast/reeves.jpg",
  },
  {
    id: "fraser",
    name: "格雷格·弗雷泽",
    nameEn: "Greig Fraser",
    role: "摄影指导",
    portrait: "/media/cast/fraser-v2.jpg",
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
      "他身上完全没有传统意义上的花花公子做派，无论作为布鲁斯还是蝙蝠侠，他都像个怪人，我总觉得这版设定带着更虚无的底色。一般故事里布鲁斯离家远赴各地受训、再以终极形态归来；而这部电影开场时他已经做了两年蝙蝠侠，哥谭的罪恶反而愈演愈烈。哥谭人甚至觉得他不过是这座烂透了的城市的又一个病灶罢了。",
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
      "以往的故事总说父母遇害是他成为蝙蝠侠的原因，但我想用更真实的方式去拆解它：他耗费经年累月搭建起这套精密的人格构筑，最终具象化为蝙蝠侠——但这绝不是什么健康的宣泄，甚至近乎药物成瘾。他其实是在自己身上拼命寻找某种希望，而不仅是给这座城市。",
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
      "最让我兴奋的是，他并非传统意义上的超级英雄。他身披斗篷却无法飞翔，与你我无异。如果说他真有什么超能力，那就是隐忍与承受——而且不仅是一种能力，更像一种被创伤强迫驱使的宿命，被无法释怀的过去死死推着向前。我想讲的不是他「如何成为蝙蝠侠」，而是他在「初为蝙蝠侠」的早期状态：他离完美还有很远。",
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
      "我确实是这么理解的——她和安妮卡之间存在某种浪漫关系。漫画里猫女本就有双性恋设定，这也是我诠释角色时的重要基底。",
    quoteEn:
      "That's definitely the way I interpreted that, that they had some kind of romantic relationship.",
    note: "克拉维茨确认自己将瑟琳娜与安妮卡的情感读解为浪漫亲密关系，延续漫画设定中的双性恋特质。",
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
      "我当时参考了「大学航空炸弹客」、俄克拉荷马城爆炸案，以及现实中那些在网络极端化温床中被异化的人。对我而言，他不是漫画里那种脸谱化的超级反派，而是一个被体制与社会彻底抛下、从而陷入狂热的边缘人。",
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
      "这个角色是尚未完全成型的「原型小丑」。妆容设计灵感回溯到了 1928 年默片经典《笑面人》。他先天患有无法停止微笑的疾病，从而形成了极度虚无的人生观，认为从他出生起生命就是一场残酷的玩笑。他与蝙蝠侠早已建立起宿敌羁绊，只是尚未正式自封为小丑。",
    quoteEn:
      "And for me, I think [it's] this idea that the Joker is not yet the Joker, but they already have this relationship. ... It's this idea of him being very incisive and brilliant and being able to get into your mind and basically having this nihilistic point of view that's like from his inception, from his birth, life has been a cruel joke on him. And this is his response, and he's eventually going to declare himself as a clown, declare himself as the Joker.",
    note: "导演确认片尾阿卡姆无名囚徒即本宇宙小丑的雏形；基奥甘与帕丁森在阿卡姆的未公映审讯删减片段后续由官方完整发布。",
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
      "长久以来，观众所习惯的阿尔弗雷德是一位耐心的绅士、管家、知己，以及布鲁斯·韦恩的父亲形象。但《新蝙蝠侠》里的阿尔弗雷德截然不同。马特做出了许多令人不安却极具突破性的选择，而这正是它与其他蝙蝠侠电影拉开距离的关键。",
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
      "我和马特一直在深入探讨「父职」到底意味着什么。阿尔弗雷德身上缺乏与生俱来的父性本能，他渴望成为父亲，却始终无法跨越那道鸿沟。在布鲁斯最无助的时刻，他没能守护好韦恩夫妇，因此终生背负着强烈的愧疚。他能把军旅生涯练就的格斗与生存技能倾囊相授，却给不了情感上的慰藉与引导。",
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
      "这部剧最让我着迷的地方在于，即便这些角色犯下累累恶行，你依然会不由自主地为他们揪心、甚至为他们摇旗呐喊。我最钟爱的影视作品莫过于此——让你坐立难安，并时刻动摇你对善恶立场的判断。",
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
      "这一切终究是心理上的凌迟。对索菲亚而言，向奥兹清算的终极一步是：「我要彻底毁了你，就像你当年摧毁我的心智一样，让你余生都在精神折磨中度过。」杀了他反而是一种解脱，他夺走了我最挚爱的人，索菲亚内心的悲痛与怒火是一个永远填不满的深渊。",
    quoteEn:
      "And it's all psychological. I mean, it's violent, too. But for Sofia, the final step with Oz is: I'm gonna ruin you. I'm going to ruin your brain for life the way mine has been. Death would be a relief for him. Which is what he did to me. He took the person I loved the most away. There's a bottomless pit to her grief and anger.",
    note: "对应《企鹅人》第 7 集审讯戏与结局对峙。米莉奥蒂在 Esquire 专访中完整展开索菲亚源自阿卡姆创伤的复仇逻辑。",
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
      "我们的确规划并满心期待能制作《企鹅人》第二季。关键在于必须打磨出一个我们认为真正立得住的好故事，这也是我们目前正在推进的。但眼下最首要的任务，是全力以赴把电影《新蝙蝠侠2》拍出来。",
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
      "我从第一页一字不落地读到了最后一页，这部剧本实在太恢弘了。在基调上，它不仅极度黑暗、甚至时而令人毛骨悚然，在心理刻画上更是厚重细腻、充满饱满的情感力量。我认为马特写出了一部当之无愧的当代类型片杰作。我只在其中出场两场戏，但这反而很棒——意味着我可以像纯粹的影迷一样去享受整部电影。",
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
      "我已经听到了一些风声，非常喜欢目前的构想。我对马特构筑哥谭世界观的深厚功力怀有无上敬意，迫不及待想沉浸到他的剧本中去。我相信这会是一段非常扎实、演起来淋漓尽致的体验，也定能让银幕前的观众大呼过瘾。",
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
    outlet: "Dark Knight News（转述 Josh Horowitz 访谈）",
    sourceUrl: "https://darkknightnews.com/2026/05/12/andy-serkis-on-alfreds-arc-in-the-batman-films/",
    quoteZh:
      "剧本太惊艳了，确实是一部非凡之作。当然，关于具体情节我绝不会透露半句。最令人欣慰的是我们终于协调好了档期——之前因为时间冲突差点无法回归。虽然拍摄节奏会非常紧凑，但我们一定能按期就位。",
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
      "这部续集即将投入拍摄，我感到无比振奋。筹备期间经历了诸多波折，耗时确实超出了我的预期，但我对正在打磨的作品感到极度自豪与激动，已经迫不及待想把它呈现在所有观众面前。",
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
      "从我跟马特第一次碰面起他就明确告诉我：‘我想拍一部 70 年代风格的黑色侦探电影。’这是一部真正的侦探片。说来惭愧，我以前甚至不知道蝙蝠侠在漫画里被称为「世界上最伟大的侦探」——但这套路子在电影里非常奏效。以往银幕上的蝙蝠侠往往一登场就大打出手；而在这部电影里，他需要深入对话，彼此间有大量真实的情感碰撞戏份。",
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
      "我不会把瑟琳娜定义为一个反派，因为她身上有太多灰色地带。我深深共情她的身世、她的过往与她的顽强。我塑造的这个角色，绝非单纯的英雄跟班，更不是紧身衣里博人眼球的漂亮花瓶——她是一个真正的幸存者。",
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
      "我没有去复刻以往银幕上的戈登形象。哥谭的原型是纽约，我参考了当时的纽约市长埃里克·亚当斯（他曾是一名警察）。但关于戈登的深层心理机制、情感轨迹以及他与蝙蝠侠的搭档羁绊，我主要溯源于原著漫画——1939 年 5 月《侦探漫画》第 27 期的第一个画格里，正是布鲁斯·韦恩与戈登同框，这条羁绊从 1939 年一直延续至今。",
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
      "在这个系列里，你会真切地感受到：这些故事与角色的真正归属者并不是演职人员，甚至不是以卓越才华编导本片的马特·里夫斯，而是千千万万的影迷。在以往参与的任何系列中，我都未曾见识过如此炽烈而持久的热爱。",
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
      "马特要求摄影机必须极度聚焦于主角身上，一切视听语言都必须由布鲁斯·韦恩的主观视点驱动。……对我而言，蝙蝠侠最迷人的特质在于他没有任何超能力——他既没有透视眼也不会飞翔，他所依仗的是惊人的决心、意志与智力。因此，任何传达这些特质的运镜，都必须经过深思熟虑且带着强烈的镜头意图。",
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
      "布鲁斯·韦恩隐匿于阴影之中——他绝不是大白天会在商场里闲逛的人。这是一部黑色电影，绝大部分场景发生在深夜。我起初最大的担忧是画面可能会暗到什么都看不清，于是我在网上搜寻了大量「黑暗却极具辨识度」的摄影参考，整理成一份名为《暗中有光》（Dark but Light）的视觉备忘录给马特和我自己。正因如此，画面中总会保留那一抹具有导向性的光晕。",
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
      "在蝙蝠车追逐战中，我追求的是类似《法国贩毒网》那种直击脏腑的混乱感。我要求摄影机尽可能刚性硬连接在车体上，保持绝对主观的视点，将镜头死死咬在这台在泥泞与暴雨中剧烈震颤的钢铁野兽上。你会感觉自己正与蝙蝠侠一同骑跨在引擎之上，而整台车随时都可能分崩离析。",
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
      "维克与奥兹在镜头前初次相遇，两人的羁绊逐渐加深；而在戏外，我和科林也是在片场结识，彼此的熟络完全同步于戏中关系的演进。在片场的大部分时间里，我接触到的完全就是「奥兹」——我面对科林本人的真实面孔说话大概不超过六七次。直到后来在监视器里看到成片，我才猛然惊觉：「天哪，原来这才是陪伴了我好几个月的那个搭档！」",
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
      "口吃是我在表演中最慎重对待的部分，我想以严谨、诚实的方式呈现它。我与口吃顾问马克·温斯基深入合作。剧集推进中维克的口吃确有变化，但这并不是因为他变自信就奇迹般痊愈了——那是一种常见的误解。维克的口吃属于终身性的，没有一成不变的规律；真正发生改变的，是他面对不同谈话对象时内心的安全感与舒适度。",
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
      "在内心深处，我有一部分其实很抗拒拍那场戏。但我明白主创的创作意图：在全剧尾声，必须亲手「扼杀」电影里那个尚带一丝滑稽与可爱的奥兹。我们有一种创作上的责任感——绝不能让这个恶徒成为一个讨喜的角色。带着这种心理上的终局决断，去践行这场戏所展现出的极致冷酷与残忍，对我来说真的是最艰难的拍摄经历。",
    quoteEn:
      "I mean, part of me didn't want to do it, you know? I knew that the general sentiment was that, by the end, they kind of wanted to, in a way, kill the Oz that we met in the film. I felt that there was a sense of creative responsibility that leaned towards, 'We cannot have this man as a likable character.' ... So, knowing that I was going into that kind of degree of psychological finality and embodying the character with a kind of a depth of cruelty that is articulated in that scene, it was tough, man.",
    note: "Collider 独家专访。大结局河畔勒死维克的戏份标志着奥兹在登顶哥谭黑帮王座前，彻底斩断了人性中仅存的软肋与温情。",
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
      "第一部的收尾将我们置于悬崖边缘，而《企鹅人》里的风云突变也会在续作中承接。我的核心探索方向之一，是进一步深挖布鲁斯·韦恩这个人物。第一部很大程度上聚焦于‘蝙蝠侠’的诞生；如果能拍成三部曲，我希望镜头始终紧紧扣在布鲁斯自身的心理世界上。许多经典的蝙蝠侠电影在讲完起源后，叙事重心往往就滑向了精彩的反派群像；而我绝不想让罗伯失去核心地位。挑选一个能真正刺痛他的过往、挖进他内心深处的反派，正是我们构思故事的驱动力。这种切入方式在以往的蝙蝠侠电影中从未真正出现过。",
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
      "我们从未探讨过让罗伯特版蝙蝠侠并入 DCU 主宇宙之类的事。尽管那也许会很有趣，但我真正想做的是把我亲手开启的故事完整讲完，抵达从最初就笃定的那个结局。我们正在与 DC 影业紧密合作推进《新蝙蝠侠2》，它虽然属于独立于主宇宙的「异世界」（Elseworlds）系列，但始终是 DC 宏大宇宙中不可分割的篇章。",
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
      "年底前我都会留在伦敦拍蝙蝠侠续集，进展挺顺利的。打戏一多，我确实真切感受到了自己的年纪。我真的会想：‘真要命，这可比以前吃力太多了。’ 但拍起来非常有意思，我也觉得这部电影会很棒。卡司阵容特别有趣，不过这确实是一场漫长的马拉松。",
    quoteEn:
      "I'm in London here till the end of the year doing a Batman sequel. It's good. I'm definitely feeling my age when fighting a lot. I'm literally like, 'Goddamn, this is significantly harder than it used to be.' But it's really fun. And I think the movie's going to be pretty great. It's got a really, really fun cast, but it's a marathon.",
    note: "2026 年 9 月 1 日《GQ》专访。时年 40 岁的帕丁森谈及拍摄高强度动作戏的体能挑战，并确认《新蝙蝠侠2》的拍摄周期将持续至 2026 年底。针对网络上‘这可能是他最后一部蝙蝠侠’的过度解读，采访原文仅为调侃打斗吃力与周期漫长，未涉及任何退出系列的表态。",
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
      "（被问及片场流出的骑摩托车路透是本人还是特技替身）我觉得那是替身。是在利物浦还是苏格兰那边拍的？……（记者提到有影迷推测那是布鲁斯的‘流浪者’便服身份）对，是我！那就是我。（笑）",
    quoteEn:
      "I think that's a stunt double. Is that something in Liverpool or Scotland or something? … [GQ: People were saying it was the drifter.] … Yeah, it's me! It's me. [Laughs]",
    note: "《GQ》记者 Cam Wolf 就外景流出的摩托车路透向其求证。帕丁森最初直言是替身演员，在记者转述影迷推测为‘流浪者’（The Drifter）便服造型后幽默改口认领。此处为演员受访时的即兴调侃，实际高危骑行与特技均由特技替身完成。",
  },
];

export function interviewsByPerson(personId: string): InterviewQuote[] {
  const speaker = SPEAKERS.find((s) => s.personId === personId);
  if (!speaker) return [];
  return INTERVIEWS.filter((q) => q.speakerId === speaker.id).sort((a, b) => b.iso.localeCompare(a.iso));
}
