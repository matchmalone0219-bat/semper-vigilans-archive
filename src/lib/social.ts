import { SOCIAL_DROPS, type SocialDrop, type SocialPlatform } from "@/data/social";

export const SORTED_SOCIAL_DROPS: SocialDrop[] = [...SOCIAL_DROPS].sort((a, b) =>
  b.iso.localeCompare(a.iso)
);

export const LATEST_SOCIAL_DROP: SocialDrop | undefined = SORTED_SOCIAL_DROPS[0];

export function getRecentSocialDrops(limit = 2, excludeId?: string): SocialDrop[] {
  return SORTED_SOCIAL_DROPS.filter((drop) => drop.id !== excludeId).slice(0, limit);
}

export function getSocialDropsByAuthor(authorId: string): SocialDrop[] {
  return SORTED_SOCIAL_DROPS.filter((drop) => drop.authorId === authorId);
}

export function getSocialDropsByPlatform(platform: SocialPlatform): SocialDrop[] {
  return SORTED_SOCIAL_DROPS.filter((drop) => drop.platform === platform);
}
