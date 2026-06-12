import { getSupabaseAdmin } from '@/src/lib/supabase/server';
import { isPlacementActive } from '@/src/server/utils/sortWithFeatured';
import type { ContentType, FeaturedPlacementRow } from '@/src/types';

const PLACEMENT_SELECT = `
  id,
  resource_id,
  resource_type,
  starts_at,
  ends_at,
  priority,
  client_name,
  campaign_name,
  is_active,
  created_at
`;

async function findAllFeaturedPlacements(): Promise<FeaturedPlacementRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('featured_placements')
    .select(PLACEMENT_SELECT)
    .eq('is_active', true)
    .order('priority', {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as FeaturedPlacementRow[];
}

export async function findActiveFeaturedPlacements(): Promise<FeaturedPlacementRow[]> {
  const placements = await findAllFeaturedPlacements();

  const now = new Date();

  return placements.filter((placement) =>
    isPlacementActive(placement.starts_at, placement.ends_at, now),
  );
}

export async function findActiveFeaturedPriorityMapForContentType(
  contentType: ContentType,
): Promise<Map<string, number>> {
  const placements = await findActiveFeaturedPlacements();

  const map = new Map<string, number>();

  for (const placement of placements) {
    if (placement.resource_type !== contentType) {
      continue;
    }

    const existing = map.get(placement.resource_id);

    if (existing === undefined || placement.priority < existing) {
      map.set(placement.resource_id, placement.priority);
    }
  }

  return map;
}
