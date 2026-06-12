import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import {
  paginate,
  sortByFeaturedThenPublished,
} from "@/src/server/utils/sortWithFeatured";
import type { PodcastEpisodeRow } from "@/src/types";
import { findActiveFeaturedPriorityMapForContentType } from "./featuredPlacementRepository";

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
  const featuredPriorityById = await findActiveFeaturedPriorityMapForContentType('podcast');
  const sorted = sortByFeaturedThenPublished(rows, featuredPriorityById);

  return paginate(sorted, limit, offset);
}
