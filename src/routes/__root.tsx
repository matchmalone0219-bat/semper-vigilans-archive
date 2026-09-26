import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { HashTarget } from "@/components/hash-target";
import { Atmosphere } from "@/components/atmosphere";
import { SiteChrome } from "@/components/site-chrome";
import { FILM } from "@/data/film";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Batman小站《新蝙蝠侠2》专题档案 · Semper Vigilans";
const BASE_URL = import.meta.env.BASE_URL;
const IS_STATIC_BUILD = import.meta.env.MODE === "github-pages" || import.meta.env.MODE === "edgeone";
const PUBLIC_URL = import.meta.env.MODE === "edgeone"
  ? (import.meta.env.VITE_PUBLIC_URL || "https://archive.batcavecn.com/").replace(/\/?$/, "/")
  : "https://matchmalone0219-bat.github.io/semper-vigilans-archive/";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: `Batman小站旗下《新蝙蝠侠2》专题档案，持续整理制作动态、片场记录、主创访谈、人物关系与系列资料。北美定档 ${FILM.releaseLabel}。`,
      },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "Batman小站《新蝙蝠侠2》专题档案 · Semper Vigilans" },
      {
        property: "og:description",
        content: "Batman小站旗下《新蝙蝠侠2》专题档案：制作动态、片场记录、主创访谈、人物地点、装备与原著溯源。",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PUBLIC_URL },
      { property: "og:image", content: `${PUBLIC_URL}media/hero-winter.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: `${BASE_URL}favicon.svg` },
      { rel: "canonical", href: PUBLIC_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700;900&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      ...(!IS_STATIC_BUILD
        ? [
            { rel: "manifest", href: "/__grok/manifest.webmanifest" },
            { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
          ]
        : []),
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="zh-CN" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg font-sans text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <HashTarget />
          <Atmosphere />
          <SiteChrome>
            <Outlet />
          </SiteChrome>
        </AuthProvider>
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            className: "!bg-surface !text-fg !border-border !shadow-none font-sans",
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
