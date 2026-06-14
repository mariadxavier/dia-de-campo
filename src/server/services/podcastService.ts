import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findPublishedPodcastEpisodes, countPublishedPodcastEpisodes } from "@/src/server/repositories/podcastRepository";
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
