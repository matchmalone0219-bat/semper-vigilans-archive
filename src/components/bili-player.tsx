import { cn } from "@/lib/cn";
import type { LogVideo } from "@/lib/film";

export function BiliPlayer({
  video,
  className,
}: {
  video: LogVideo;
  className?: string;
}) {
  const src = `https://player.bilibili.com/player.html?isOutside=true&bvid=${video.bvid}&p=1&autoplay=0&high_quality=1&danmaku=0`;
  const href = `https://www.bilibili.com/video/${video.bvid}`;

  return (
    <figure className={cn("overflow-hidden border border-fg/10 bg-elevated", className)}>
      <div className="aspect-video w-full">
        <iframe
          src={src}
          title={video.title}
          className="size-full"
          allowFullScreen
          scrolling="no"
          frameBorder={0}
          allow="fullscreen; picture-in-picture"
        />
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2">
        <p className="text-xs leading-relaxed text-muted">{video.title}</p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 font-display text-[10px] font-semibold tracking-[0.18em] text-blood uppercase hover:text-fg"
        >
          在 B 站观看
        </a>
      </figcaption>
    </figure>
  );
}
