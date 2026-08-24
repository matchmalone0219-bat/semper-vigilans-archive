import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { FILM } from "@/lib/film";

const NAV = [
  { to: "/", label: "首页" },
  { to: "/dossier", label: "档案" },
  { to: "/cases", label: "卷宗" },
  { to: "/recap", label: "回顾" },
  { to: "/roots", label: "溯源" },
  { to: "/craft", label: "视听" },
  { to: "/gear", label: "装备" },
  { to: "/merch", label: "周边" },
  { to: "/gallery", label: "剧照" },
  { to: "/rataalada", label: "暗号" },
] as const;

function navActive(to: string, pathname: string) {
  if (to === "/dossier") {
    return (
      pathname === "/dossier" ||
      pathname.startsWith("/people") ||
      pathname.startsWith("/places")
    );
  }
  if (to === "/cases") {
    return pathname.startsWith("/cases");
  }
  if (to === "/recap") {
    return pathname.startsWith("/recap");
  }
  if (to === "/roots") {
    return pathname.startsWith("/roots");
  }
  if (to === "/craft") {
    return pathname.startsWith("/craft");
  }
  if (to === "/gear") {
    return pathname.startsWith("/gear");
  }
  if (to === "/merch") {
    return pathname.startsWith("/merch");
  }
  if (to === "/gallery") {
    return pathname.startsWith("/gallery");
  }
  if (to === "/rataalada") {
    return pathname.startsWith("/rataalada");
  }
  return pathname === to;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const isRata = pathname.startsWith("/rataalada");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <nav className="hidden items-center gap-3 lg:gap-5 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-150",
                  navActive(item.to, pathname) ? "text-fg font-bold text-blood" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="relative grid size-11 place-items-center text-fg md:hidden"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 bg-bg/95 pt-16 md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "py-2 font-sans text-2xl font-black tracking-tight",
                  navActive(item.to, pathname) ? "text-blood" : "text-muted",
                )}
              >
                {item.label}
              </Link>
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
            <p className="mt-1">《{FILM.titleZh}》（{FILM.titleEn}）非官方影迷档案库</p>
            <p className="mt-4 max-w-md text-pretty text-xs leading-relaxed text-faint">
              本站为影迷非商业交流网站，与华纳兄弟、DC
              Studios 及电影主创团队无官方合作关系。内容整理自公开新闻报道、片场路透及官方宣发物料，传闻均已标明出处。
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
