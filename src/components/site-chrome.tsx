import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { FILM } from "@/lib/film";

const NAV = [
  { to: "/", label: "首页" },
  { to: "/dossier", label: "档案" },
  { to: "/gear", label: "装备" },
  { to: "/merch", label: "周边" },
  { to: "/recap", label: "回顾" },
  { to: "/roots", label: "原著" },
  { to: "/craft", label: "幕后" },
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
  if (to === "/recap") {
    return pathname === "/recap";
  }
  if (to === "/roots") {
    return pathname.startsWith("/roots");
  }
  if (to === "/craft") {
    return pathname.startsWith("/craft");
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
          <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-xs font-medium tracking-[0.22em] uppercase transition-colors duration-150",
                  navActive(item.to, pathname) ? "text-fg font-bold" : "text-muted hover:text-fg",
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
                  "py-2.5 font-sans text-2xl font-black tracking-tight",
                  navActive(item.to, pathname) ? "text-fg text-blood" : "text-muted",
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
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                影视档案
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/people" className="hover:text-fg">
                    人物名册
                  </Link>
                </li>
                <li>
                  <Link to="/places" className="hover:text-fg">
                    高谭地点
                  </Link>
                </li>
                <li>
                  <Link to="/dossier" hash="log" className="hover:text-fg">
                    拍摄日志
                  </Link>
                </li>
                <li>
                  <Link to="/recap" className="hover:text-fg">
                    前作回顾
                  </Link>
                </li>
                <li>
                  <Link to="/roots" className="hover:text-fg">
                    原著渊源
                  </Link>
                </li>
                <li>
                  <Link to="/craft" className="hover:text-fg">
                    幕后与视听
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                装备与画廊
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/gear" className="hover:text-fg">
                    蝙蝠侠装备
                  </Link>
                </li>
                <li>
                  <Link to="/merch" className="hover:text-fg">
                    官方周边
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-fg">
                    剧照图集
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
