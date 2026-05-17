import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { mapPlacementToHomeFeaturedItem } from "@/src/server/mappers/featuredMapper";
import { findActiveFeaturedPlacementsForHome } from "@/src/server/repositories/featuredPlacementRepository";
import type { HomeFeaturedItem } from "@/src/types";

export async function listHomeFeaturedContent(): Promise<HomeFeaturedItem[]> {
  return getCached(cacheKeys.homeFeatured(), async () => {
    const placements = await findActiveFeaturedPlacementsForHome();

    return placements
      .map(mapPlacementToHomeFeaturedItem)
      .filter((item): item is HomeFeaturedItem => item !== null);
  });
}
