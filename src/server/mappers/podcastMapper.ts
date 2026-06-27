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
    spotifyUrl: row.spotify_url,
    youtubeUrl: row.youtube_url,
    link: `/podcast?episode=${row.slug}`,
    publishedAt: row.published_at,
    isFeatured: priority !== undefined,
    featuredPriority: priority ?? null,
    author: row.author
  };
}
