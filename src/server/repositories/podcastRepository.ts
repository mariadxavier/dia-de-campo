import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { findActiveFeaturedPriorityMapForPodcasts } from "@/src/server/repositories/featuredPlacementRepository";
import {
  paginate,
  sortByFeaturedThenPublished,
} from "@/src/server/utils/sortWithFeatured";
import type { PodcastEpisodeRow } from "@/src/types/database";

export async function findPublishedPodcastEpisodes(
  limit: number,
  offset: number,
): Promise<PodcastEpisodeRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("podcast_episodes")
    .select("*")
    .eq("is_published", true);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as PodcastEpisodeRow[];
  const featuredPriorityById = await findActiveFeaturedPriorityMapForPodcasts();
  const sorted = sortByFeaturedThenPublished(rows, featuredPriorityById);

  return paginate(sorted, limit, offset);
}
