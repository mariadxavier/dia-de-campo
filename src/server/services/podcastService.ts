import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findPublishedPodcastEpisodes, countPublishedPodcastEpisodes, findPublishedPodcastBySlug } from "@/src/server/repositories/podcastRepository";
import { mapToPodcastEpisodeItem } from "@/src/server/mappers/podcastMapper";
import type { PodcastEpisodeItem } from "@/src/types";
import { findActiveFeaturedPriorityMapForContentType } from "../repositories/featuredPlacementRepository";

export async function countPodcastEpisodes(): Promise<number> {
  return getCached(cacheKeys.podcastList(1, 0) + "_count", async () => {
    return countPublishedPodcastEpisodes();
  });
}

export async function listPodcastEpisodes(
  limit: number,
  offset: number,
): Promise<PodcastEpisodeItem[]> {
  return getCached(cacheKeys.podcastList(limit, offset), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedPodcastEpisodes(limit, offset),
      findActiveFeaturedPriorityMapForContentType("podcast"),
    ]);

    return rows.map((row) =>
      mapToPodcastEpisodeItem(row, featuredPriorityById),
    );
  });
}

export async function findPodcastBySlug(slug: string): Promise<PodcastEpisodeItem | null> {
  return getCached(cacheKeys.podcastBySlug(slug), async () => {
    const row = await findPublishedPodcastBySlug(slug);
    if (!row) {
      return null;
    }
    const featuredPriorityById = await findActiveFeaturedPriorityMapForContentType("podcast");
    return mapToPodcastEpisodeItem(row, featuredPriorityById);
  });
}
