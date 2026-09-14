import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LogVideo } from "@/data/film";

export function BiliPlayer({
  video,
  poster,
  className,
}: {
  video: LogVideo;
  poster?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const src = `https://player.bilibili.com/player.html?isOutside=true&bvid=${video.bvid}&p=1&autoplay=0&high_quality=1&danmaku=0`;
  const href = `https://www.bilibili.com/video/${video.bvid}`;
  const cover = poster ?? video.poster;

  return (
    <figure className={cn("overflow-hidden border border-fg/10 bg-elevated", className)}>
      <div className="aspect-video w-full">
        {cover && !playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative size-full cursor-pointer"
            aria-label={`播放：${video.title}`}
          >
            <img
              src={cover}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/20 to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-12 place-items-center rounded-full border border-fg/40 bg-bg/85 text-fg shadow-lg transition-transform group-hover:scale-110 group-hover:border-blood group-hover:bg-blood group-hover:text-white">
                <Play className="ml-0.5 size-5 fill-current" />
              </span>
            </span>
          </button>
        ) : (
          <iframe
            src={src}
            title={video.title}
            className="size-full"
            allowFullScreen
            scrolling="no"
            frameBorder={0}
            allow="fullscreen; picture-in-picture; autoplay"
          />
        )}
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
