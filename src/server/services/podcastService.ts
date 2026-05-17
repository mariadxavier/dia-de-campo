import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findPublishedPodcastEpisodes } from "@/src/server/repositories/podcastRepository";
import { findActiveFeaturedPriorityMapForPodcasts } from "@/src/server/repositories/featuredPlacementRepository";
import { mapToPodcastEpisodeItem } from "@/src/server/mappers/podcastMapper";
import type { PodcastEpisodeItem } from "@/src/types";

export async function listPodcastEpisodes(
  limit: number,
  offset: number,
): Promise<PodcastEpisodeItem[]> {
  return getCached(cacheKeys.podcastList(limit, offset), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedPodcastEpisodes(limit, offset),
      findActiveFeaturedPriorityMapForPodcasts(),
    ]);

    return rows.map((row) =>
      mapToPodcastEpisodeItem(row, featuredPriorityById),
    );
  });
}
