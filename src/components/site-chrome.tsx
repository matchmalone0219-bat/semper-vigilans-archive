import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { FILM } from "@/lib/film";

const NAV = [
  {
    to: "/dossier",
    label: "电影档案",
    paths: ["/dossier", "/people", "/places", "/map", "/cases"],
    children: [
      { to: "/dossier", hash: "facts", label: "公开信息" },
      { to: "/dossier", hash: "plot", label: "故事线索" },
      { to: "/dossier", hash: "cast", label: "演员阵容" },
      { to: "/dossier", hash: "log", label: "拍摄日志" },
      { to: "/people", label: "人物名册" },
      { to: "/places", label: "哥谭地点" },
    ],
  },
  {
    to: "/recap",
    label: "世界观",
    paths: ["/recap", "/roots", "/gear"],
    children: [
      { to: "/recap", hash: "the-batman", label: "前作《新蝙蝠侠》" },
      { to: "/recap", hash: "the-penguin", label: "衍生剧《企鹅人》" },
      { to: "/recap", hash: "roots", label: "漫画原著" },
      { to: "/recap", hash: "gotham-timeline", label: "世界观时间线" },
    ],
  },
  {
    to: "/craft",
    label: "幕后",
    paths: ["/craft", "/gallery", "/interviews"],
    children: [
      { to: "/craft", hash: "score", label: "电影配乐" },
      { to: "/craft", hash: "soundtrack-list", label: "插曲与古典乐" },
      { to: "/craft", hash: "lens", label: "光影摄影" },
      { to: "/craft", hash: "map", label: "取景巡礼" },
      { to: "/gallery", label: "剧照与片场画廊" },
      { to: "/interviews", label: "人物访谈" },
    ],
  },
  {
    to: "/merch",
    label: "收藏",
    paths: ["/merch"],
    children: [
      { to: "/merch", hash: "figures", label: "可动人偶" },
      { to: "/merch", hash: "props", label: "道具复刻" },
      { to: "/merch", hash: "statues", label: "收藏雕像" },
      { to: "/merch", hash: "vehicles", label: "载具模型" },
      { to: "/merch", hash: "print", label: "出版读物" },
      { to: "/merch", hash: "media", label: "影音收藏" },
      { to: "/merch", hash: "posters", label: "艺术海报" },
    ],
  },
  { to: "/rataalada", label: "暗号" },
] as const;

function navActive(item: (typeof NAV)[number], pathname: string) {
  const paths = "paths" in item ? item.paths : [item.to];
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const isRata = pathname.startsWith("/rataalada");

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isRata) {
    return <div className="relative min-h-svh">{children}</div>;
  }

  return (
    <div className="relative min-h-svh">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-200",
          isHome
            ? "border-transparent bg-gradient-to-b from-bg/80 to-transparent"
            : "border-fg/10 bg-bg/85 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            to="/"
            className="font-display text-sm font-extrabold tracking-[0.16em] text-blood uppercase sm:text-lg"
          >
            {FILM.siteName}
          </Link>
          <nav className="hidden items-center gap-3 lg:gap-5 md:ml-auto md:flex">
            {NAV.map((item) => (
              <div key={item.to} className="group relative flex h-16 items-center">
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-150",
                    navActive(item, pathname) ? "font-bold text-blood" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {"children" in item && item.children.length > 0 ? (
                    <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
                  ) : null}
                </Link>
                {"children" in item && item.children.length > 0 ? (
                  <div className="pointer-events-none absolute left-1/2 top-[calc(100%-1px)] min-w-44 -translate-x-1/2 border border-fg/10 bg-bg/95 p-2 opacity-0 shadow-2xl backdrop-blur-md transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.to}-${"hash" in child ? child.hash : child.label}`}
                        to={child.to}
                        hash={"hash" in child ? child.hash : undefined}
                        className="block whitespace-nowrap px-3 py-2 text-xs tracking-[0.12em] text-muted hover:bg-surface hover:text-fg"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-1 md:ml-4">
            <button
              type="button"
              className="relative grid size-11 place-items-center text-fg md:hidden"
              aria-label={open ? "关闭菜单" : "打开菜单"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 bg-bg/95 pt-16 md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {NAV.map((item) => (
              <div key={item.to} className="border-b border-fg/10 py-3 last:border-0">
                <Link
                  to={item.to}
                  className={cn(
                    "font-sans text-2xl font-black tracking-tight",
                    navActive(item, pathname) ? "text-blood" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.to}-${"hash" in child ? child.hash : child.label}`}
                        to={child.to}
                        hash={"hash" in child ? child.hash : undefined}
                        className="text-sm tracking-[0.12em] text-faint hover:text-fg"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      ) : null}

      <div className={cn(!isHome && "pt-14 sm:pt-16")}>{children}</div>

      <footer className="border-t border-fg/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-extrabold tracking-[0.16em] text-blood uppercase">
              {FILM.siteName}
            </p>
            <p className="mt-1">
              《{FILM.titleZh}》（{FILM.titleEn}）非官方影迷档案库
            </p>
            <p className="mt-4 max-w-md text-pretty text-xs leading-relaxed text-faint">
              本站为影迷非商业交流网站，与华纳兄弟、DC Studios
              及电影主创团队无官方合作关系。内容整理自公开新闻报道、片场路透及官方宣发物料，传闻均已标明出处。
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                影视与刑侦档案
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/dossier" className="hover:text-fg">
                    电影档案库
                  </Link>
                </li>
                <li>
                  <Link to="/cases" className="hover:text-fg">
                    重案卷宗与物证
                  </Link>
                </li>
                <li>
                  <Link to="/people" className="hover:text-fg">
                    人物名册
                  </Link>
                </li>
                <li>
                  <Link to="/places" className="hover:text-fg">
                    哥谭地点
                  </Link>
                </li>
                <li>
                  <Link to="/recap" className="hover:text-fg">
                    前作与宇宙编年
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                艺术与视听溯源
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/roots" className="hover:text-fg">
                    原著与影史溯源
                  </Link>
                </li>
                <li>
                  <Link to="/craft" className="hover:text-fg">
                    幕后视听与配乐
                  </Link>
                </li>
                <li>
                  <Link to="/craft" hash="map" className="hover:text-fg">
                    英伦取景巡礼
                  </Link>
                </li>
                <li>
                  <Link to="/craft" hash="soundtrack-list" className="hover:text-fg">
                    插曲与古典乐全表
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                装备与图集互动
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/gear" className="hover:text-fg">
                    蝙蝠侠装备库
                  </Link>
                </li>
                <li>
                  <Link to="/merch" className="hover:text-fg">
                    官方周边与收藏
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-fg">
                    剧照与片场画廊
                  </Link>
                </li>
                <li>
                  <Link to="/rataalada" className="hover:text-fg">
                    谜语人暗号终端
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
