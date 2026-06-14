import { getSupabaseAdmin } from '@/src/lib/supabase/server';
import { isPlacementActive } from '@/src/server/utils/sortWithFeatured';
import { ErrorHandler } from '@/src/utils/ErrorHandler';
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

  try {
    const { data, error } = await supabase
      .from('featured_placements')
      .select(PLACEMENT_SELECT)
      .eq('is_active', true)
      .order('priority', {
        ascending: true,
      });

    if (error) {
      return ErrorHandler.handle(error, 'findAllFeaturedPlacements', []);
    }

    return (data ?? []) as FeaturedPlacementRow[];
  } catch (error) {
    return ErrorHandler.handle(error, 'findAllFeaturedPlacements (fetch)', []);
  }
}

export async function findActiveFeaturedPlacements(): Promise<FeaturedPlacementRow[]> {
  const placements = await findAllFeaturedPlacements();

  const now = new Date();

  return placements.filter((placement) =>
    isPlacementActive(placement.starts_at, placement.ends_at, now),
  );
}

export async function findActiveFeaturedPriorityMapForContentType(
  contentType: ContentType | ContentType[],
): Promise<Map<string, number>> {
  const placements = await findActiveFeaturedPlacements();
  const types = Array.isArray(contentType) ? contentType : [contentType];

  const map = new Map<string, number>();

  for (const placement of placements) {
    if (!types.includes(placement.resource_type as ContentType)) {
      continue;
    }

    const existing = map.get(placement.resource_id);

    if (existing === undefined || placement.priority < existing) {
      map.set(placement.resource_id, placement.priority);
    }
  }

  return map;
}
