import type { PodcastEpisodeItem } from "@/src/types/Content";
import type { PodcastEpisodeRow } from "@/src/types";

export function mapToPodcastEpisodeItem(
  row: PodcastEpisodeRow,
  featuredPriorityById?: Map<string, number>,
): PodcastEpisodeItem {
  const priority = featuredPriorityById?.get(row.id);

  return {
    id: row.id,
    episode: row.episode_number,
    duration: `${row.episode_time_duration} min`,
    title: row.title,
    description: row.description,
    embedUrl: row.embed_url,
    embedKind: row.embed_kind,
    link: `/podcast/${row.slug}`,
    publishedAt: row.published_at,
    isFeatured: priority !== undefined,
    featuredPriority: priority ?? null,
    author: row.author
  };
}
