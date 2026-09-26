import { FILM, LOG, type LogEntry } from "@/data/film";

export function pageTitle(page?: string) {
  return page ? `${page} · ${FILM.siteName}` : `Batman小站《${FILM.titleZh}》专题档案 · ${FILM.siteName}`;
}

export function logImages(entry: LogEntry): string[] {
  if (entry.images && entry.images.length > 0) return entry.images;
  return entry.image ? [entry.image] : [];
}

/** Poster for a log video — never the same still used as the shoot-card cover. */
export function logVideoPoster(entry: LogEntry): string {
  if (entry.video?.poster) return entry.video.poster;
  const imgs = logImages(entry);
  if (entry.kind === "shoot" && imgs.length > 1) return imgs[1];
  if (entry.kind !== "shoot" && entry.image) return entry.image;
  return "/media/log/p2-camera-test.jpg";
}

/** Carousel stills with the video poster stripped when it would otherwise duplicate. */
export function logCarouselImages(entry: LogEntry): string[] {
  const imgs = logImages(entry);
  if (!entry.video) return imgs;
  const poster = logVideoPoster(entry);
  if (imgs.length === 1 && imgs[0] === poster) return [];
  return imgs.filter((src) => src !== poster);
}

export function latestLog(now = Date.now()): LogEntry {
  const past = LOG.filter((e) => !e.upcoming && new Date(`${e.iso}T12:00:00Z`).getTime() <= now);
  return past[past.length - 1] ?? LOG[0];
}
