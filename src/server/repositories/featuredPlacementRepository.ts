import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { isPlacementActive } from "@/src/server/utils/sortWithFeatured";
import type { ContentType, FeaturedPlacementRow } from "@/src/types";

const PLACEMENT_SELECT = `
  id,
  content_item_id,
  podcast_episode_id,
  starts_at,
  ends_at,
  priority,
  client_name,
  campaign_name,
  created_at,
  content_items (
    *,
    categories (
      id,
      name,
      slug,
      created_at
    )
  ),
  podcast_episodes (*)
`;

function buildActivePlacementPriorityMap(
  placements: FeaturedPlacementRow[],
  options: {
    contentType?: ContentType;
    podcastOnly?: boolean;
  },
): Map<string, number> {
  const map = new Map<string, number>();
  const now = new Date();

  for (const placement of placements) {
    if (!isPlacementActive(placement.starts_at, placement.ends_at, now)) {
      continue;
    }

    if (options.podcastOnly) {
      if (!placement.podcast_episode_id || !placement.podcast_episodes) {
        continue;
      }

      const episode = placement.podcast_episodes;

      if (!episode.is_published) {
        continue;
      }

      const existing = map.get(episode.id);

      if (existing === undefined || placement.priority < existing) {
        map.set(episode.id, placement.priority);
      }

      continue;
    }

    if (!placement.content_item_id || !placement.content_items) {
      continue;
    }

    const content = placement.content_items;

    if (!content.is_published) {
      continue;
    }

    if (options.contentType && content.type !== options.contentType) {
      continue;
    }

    const existing = map.get(content.id);

    if (existing === undefined || placement.priority < existing) {
      map.set(content.id, placement.priority);
    }
  }

  return map;
}

export async function findAllFeaturedPlacements(): Promise<FeaturedPlacementRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("featured_placements")
    .select(PLACEMENT_SELECT)
    .order("priority", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as unknown as FeaturedPlacementRow[];
}

export async function findActiveFeaturedPlacementsForHome(): Promise<
  FeaturedPlacementRow[]
> {
  const placements = await findAllFeaturedPlacements();
  const now = new Date();

  return placements
    .filter((placement) =>
      isPlacementActive(placement.starts_at, placement.ends_at, now),
    )
    .filter((placement) => {
      if (placement.content_items) {
        return placement.content_items.is_published;
      }
      if (placement.podcast_episodes) {
        return placement.podcast_episodes.is_published;
      }
      return false;
    })
    .sort((a, b) => a.priority - b.priority);
}

export async function findActiveFeaturedPriorityMapForContentType(
  contentType: ContentType,
): Promise<Map<string, number>> {
  const placements = await findAllFeaturedPlacements();
  return buildActivePlacementPriorityMap(placements, { contentType });
}

export async function findActiveFeaturedPriorityMapForPodcasts(): Promise<
  Map<string, number>
> {
  const placements = await findAllFeaturedPlacements();
  return buildActivePlacementPriorityMap(placements, { podcastOnly: true });
}
