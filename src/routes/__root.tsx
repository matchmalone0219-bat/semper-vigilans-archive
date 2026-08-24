import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Atmosphere } from "@/components/atmosphere";
import { SiteChrome } from "@/components/site-chrome";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Semper Vigilans";
const BASE_URL = import.meta.env.BASE_URL;
const IS_GITHUB_PAGES = import.meta.env.MODE === "github-pages";
const PUBLIC_URL = "https://matchmalone0219-bat.github.io/semper-vigilans-archive/";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "《新蝙蝠侠2》非官方影迷档案库。北美定档 2028 年 2 月 18 日。",
      },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "Semper Vigilans · 《新蝙蝠侠2》影迷档案站" },
      {
        property: "og:description",
        content: "追踪《新蝙蝠侠2》的公开资料、人物地点、拍摄日志、装备与原著溯源。",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PUBLIC_URL },
      { property: "og:image", content: `${PUBLIC_URL}media/gotham.jpg` },
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
      ...(!IS_GITHUB_PAGES
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
