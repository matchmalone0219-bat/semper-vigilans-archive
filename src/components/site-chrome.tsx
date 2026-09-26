import { Fragment, type ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { FILM } from "@/data/film";
import { rootsNavSection } from "@/lib/roots";
import { SiteSearchButton } from "@/components/site-search";
import { ScrollToTop } from "@/components/scroll-to-top";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n, type TranslationDictionary } from "@/lib/i18n";

const BATCAVECN_URL = "https://www.batcavecn.com/";

interface NavChild {
  to: string;
  hash?: string;
  label: string;
  dividerBefore?: boolean;
}

interface NavItem {
  to: string;
  label: string;
  paths?: string[];
  children?: NavChild[];
}

function getNav(t: TranslationDictionary): NavItem[] {
  return [
    {
      to: "/dossier",
      label: t.nav.dossier,
      paths: ["/dossier", "/people", "/places", "/map", "/cases"],
      children: [
        { to: "/dossier", hash: "facts", label: t.nav.facts },
        { to: "/dossier", hash: "plot", label: t.nav.plot },
        { to: "/dossier", hash: "cast", label: t.nav.cast },
        { to: "/dossier", hash: "relations", label: t.nav.relationsNav },
        { to: "/dossier", hash: "features", label: t.nav.features },
        { to: "/dossier", hash: "drama", label: t.nav.productionOdyssey },
        { to: "/dossier", hash: "log", label: t.nav.log },
        { to: "/people", label: t.nav.people, dividerBefore: true },
        { to: "/places", label: t.nav.places },
        { to: "/cases", label: t.nav.cases },
      ],
    },
    {
      to: "/recap",
      label: t.nav.universe,
      paths: ["/recap", "/gear"],
      children: [
        { to: "/recap", hash: "gotham-timeline", label: t.nav.timeline },
        { to: "/recap", hash: "the-batman", label: t.nav.theBatman },
        { to: "/recap", hash: "the-penguin", label: t.nav.thePenguin },
        { to: "/roots", hash: "comics", label: t.nav.dcComics },
        { to: "/roots", hash: "riddles", label: t.nav.riddleStudies },
        { to: "/roots", hash: "lore", label: t.nav.cityLore },
        { to: "/gear", label: t.nav.gear, dividerBefore: true },
      ],
    },
    {
      to: "/craft",
      label: t.nav.production,
      paths: ["/craft", "/gallery", "/interviews"],
      children: [
        { to: "/roots", hash: "cinema", label: t.nav.noirCinema },
        { to: "/craft", hash: "score", label: t.nav.score },
        { to: "/craft", hash: "soundtrack-list", label: t.nav.soundtrack },
        { to: "/craft", hash: "lens", label: t.nav.cinematography },
        { to: "/craft", hash: "map", label: t.nav.locations },
        { to: "/gallery", label: t.nav.gallery, dividerBefore: true },
        { to: "/interviews", label: t.nav.interviews },
      ],
    },
    {
      to: "/merch",
      label: t.nav.collectibles,
      paths: ["/merch"],
      children: [
        { to: "/merch", hash: "figures", label: t.nav.figures },
        { to: "/merch", hash: "props", label: t.nav.props },
        { to: "/merch", hash: "statues", label: t.nav.statues },
        { to: "/merch", hash: "vehicles", label: t.nav.vehicles },
        { to: "/merch", hash: "lego", label: t.nav.lego },
        { to: "/merch", hash: "print", label: t.nav.comics },
        { to: "/merch", hash: "media", label: t.nav.media },
        { to: "/merch", hash: "posters", label: t.nav.posters },
        { to: "/merch", hash: "prints", label: t.nav.artPrints },
        { to: "/merch", hash: "fashion", label: t.nav.fashion },
        { to: "/merch", hash: "lifestyle", label: t.nav.lifestyle },
        { to: "/merch", hash: "toys", label: t.nav.toys },
        { to: "/merch", hash: "miniatures", label: t.nav.miniatures },
      ],
    },
    { to: "/rataalada", label: t.nav.cipher },
  ];
}

function navActive(item: NavItem, pathname: string, hash: string) {
  if (pathname === "/roots" || pathname.startsWith("/roots/")) {
    const section = rootsNavSection(hash);
    if (item.to === "/recap") return section === "world";
    if (item.to === "/craft") return section === "craft";
    return false;
  }
  const paths = item.paths ? item.paths : [item.to];
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const navItems = useMemo(() => getNav(t), [t]);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isHome = pathname === "/";
  const isRata = pathname.startsWith("/rataalada");
  const isSearch = pathname === "/search";

  useEffect(() => {
    let rafId: number | null = null;

    function updateProgress() {
      rafId = null;
      const el = document.documentElement;
      const total = el.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      } else {
        setScrollProgress(0);
      }
    }

    function onScroll() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateProgress);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      const goSearch = () => {
        if (isSearch) {
          document.querySelector<HTMLInputElement>("[data-site-search-input]")?.focus();
          return;
        }
        navigate({ to: "/search" });
      };
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        goSearch();
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        goSearch();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearch, navigate]);

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
          <nav className="relative z-10 hidden min-w-0 items-center gap-3 lg:gap-5 md:ml-auto md:flex">
            {navItems.map((item) => (
              <div key={item.to} className="group relative flex h-16 items-center">
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1 border-b-2 py-2 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-150",
                    navActive(item, pathname, hash) ? "border-blood font-bold text-fg" : "border-transparent text-muted hover:border-blood hover:text-fg",
                  )}
                >
                  {item.label}
                  {item.children && item.children.length > 0 ? (
                    <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
                  ) : null}
                </Link>
                {item.children && item.children.length > 0 ? (
                  <div className="pointer-events-none absolute left-1/2 top-[calc(100%-1px)] max-h-[calc(100vh-4.5rem)] min-w-48 -translate-x-1/2 overflow-y-auto overscroll-contain border border-fg/15 border-t-2 border-t-blood bg-surface/95 p-1.5 opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_16px_color-mix(in_oklab,var(--color-blood)_12%,transparent)] backdrop-blur-md transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    {item.children.map((child) => {
                      const isSelected =
                        pathname.replace(/\/$/, "") === child.to && hash.replace(/^#/, "") === (child.hash ?? "");
                      return (
                        <div key={`${child.to}-${child.hash ?? child.label}`}>
                          {child.dividerBefore ? (
                            <div className="my-1 border-t border-fg/10" aria-hidden="true" />
                          ) : null}
                          <Link
                            to={child.to}
                            hash={child.hash}
                            data-selected={isSelected}
                            activeOptions={{ exact: true, includeHash: true }}
                            className={cn(
                              "archive-nav-link block whitespace-nowrap px-3 py-2 text-xs font-medium tracking-[0.14em] transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-fg",
                              isSelected ? "bg-elevated/70 font-semibold text-fg" : "text-muted",
                            )}
                          >
                            {child.label}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="relative z-[91] flex shrink-0 items-center gap-1.5 md:ml-4">
            <a
              href={BATCAVECN_URL}
              className="hidden items-center px-2 py-2 font-display text-[10px] font-semibold tracking-[0.18em] text-faint uppercase transition-colors hover:text-fg xl:inline-flex"
            >
              BATCAVECN ↗
            </a>
            <SiteSearchButton />
            <LanguageToggle />
            <button
              type="button"
              className="relative grid size-11 place-items-center text-fg md:hidden"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {/* Crimson Scroll Reading Progress Indicator */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-blood transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-surface pt-16 md:hidden">
          <div className="border-b border-fg/10 p-4">
            <LanguageToggle variant="full" />
            <a
              href={BATCAVECN_URL}
              className="mt-3 inline-flex font-display text-xs font-semibold tracking-[0.16em] text-blood uppercase"
            >
              {locale === "zh" ? "← 返回 Batman小站" : "← Back to BatcaveCN"}
            </a>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-6">
            {navItems.map((item) => (
              <div key={item.to} className="border-b border-fg/10 py-3 last:border-0">
                <Link
                  to={item.to}
                  className={cn(
                    "font-sans text-2xl font-black tracking-tight",
                    navActive(item, pathname, hash) ? "text-blood" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {item.children.map((child) => {
                      const isSelected =
                        pathname.replace(/\/$/, "") === child.to && hash.replace(/^#/, "") === (child.hash ?? "");
                      const key = `${child.to}-${child.hash ?? child.label}`;
                      return (
                        <Fragment key={key}>
                          {child.dividerBefore ? (
                            <div className="my-1 basis-full border-t border-fg/10" aria-hidden="true" />
                          ) : null}
                          <Link
                            to={child.to}
                            hash={child.hash}
                            data-selected={isSelected}
                            activeOptions={{ exact: true, includeHash: true }}
                            className={cn(
                              "archive-nav-link inline-flex items-center border px-2.5 py-1.5 text-xs font-medium tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-fg",
                              isSelected
                                ? "border-blood/60 bg-blood/10 font-semibold text-fg"
                                : "border-fg/10 bg-fg/[0.03] text-muted hover:border-fg/25 hover:bg-fg/[0.08] hover:text-fg",
                            )}
                          >
                            {child.label}
                          </Link>
                        </Fragment>
                      );
                    })}
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
              {t.footer.siteDesc}
            </p>
            <a
              href={BATCAVECN_URL}
              className="mt-3 inline-flex font-display text-xs font-semibold tracking-[0.14em] text-blood uppercase transition-colors hover:text-fg"
            >
              {locale === "zh" ? "← 返回 Batman小站" : "← Back to BatcaveCN"}
            </a>
            <p className="mt-4 max-w-md text-pretty text-xs leading-relaxed text-faint">
              {t.footer.disclaimer}
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                {t.footer.sections.dossier}
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/dossier" className="hover:text-fg">
                    {t.nav.dossier}
                  </Link>
                </li>
                <li>
                  <Link to="/cases" className="hover:text-fg">
                    {t.nav.cases}
                  </Link>
                </li>
                <li>
                  <Link to="/people" className="hover:text-fg">
                    {t.nav.people}
                  </Link>
                </li>
                <li>
                  <Link to="/places" className="hover:text-fg">
                    {t.nav.places}
                  </Link>
                </li>
                <li>
                  <Link to="/recap" className="hover:text-fg">
                    {t.nav.timeline}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                {t.footer.sections.artAndRoots}
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/roots" className="hover:text-fg">
                    {t.nav.dcComics}
                  </Link>
                </li>
                <li>
                  <Link to="/craft" className="hover:text-fg">
                    {t.nav.production}
                  </Link>
                </li>
                <li>
                  <Link to="/craft" hash="map" className="hover:text-fg">
                    {t.nav.locations}
                  </Link>
                </li>
                <li>
                  <Link to="/craft" hash="soundtrack-list" className="hover:text-fg">
                    {t.nav.soundtrack}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                {t.footer.sections.interactive}
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link to="/gear" className="hover:text-fg">
                    {t.nav.gear}
                  </Link>
                </li>
                <li>
                  <Link to="/merch" className="hover:text-fg">
                    {t.nav.collectibles}
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-fg">
                    {t.nav.gallery}
                  </Link>
                </li>
                <li>
                  <Link to="/rataalada" className="hover:text-fg">
                    {t.nav.cipher}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {!isRata && <ScrollToTop />}
    </div>
  );
}
