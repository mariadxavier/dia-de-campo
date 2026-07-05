import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import type { ClassifiedCategories, ClassifiedListItem, } from "@/src/types";
import { countClassifieds, findPublishedClassifiedBySlug, findPublishedClassifieds } from "../repositories/classifiedsRepository";
import { mapToClassifiedListItem } from "../mappers/classifiedMapper";
import { UF } from "@/src/types/Location";

export async function listClassifieds(
  limit: number,
  offset: number,
  category: ClassifiedCategories = 'todos',
  state: UF = 'Todo o Brasil'
): Promise<ClassifiedListItem[]> {
  return getCached(cacheKeys.classifiedList(limit, offset, category, state), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedClassifieds(limit, offset, category, state),
      findActiveFeaturedPriorityMapForContentType("classified"),
    ]);

    return rows.map((row) => mapToClassifiedListItem(row, featuredPriorityById));
  });
}

export async function countAllClassifieds(): Promise<number> {
  return getCached(cacheKeys.classifiedList(1, 0, 'all', 'all') + "_count", async () => {
    return countClassifieds();
  });
}

export async function getFullClassifiedBySlug(slug: string): Promise<ClassifiedListItem | null> {
  return getCached(cacheKeys.classifiedBySlug(slug), async () => {
    const row = await findPublishedClassifiedBySlug(slug);
    if (!row) {
      return null;
    }
    const featuredPriorityById = await findActiveFeaturedPriorityMapForContentType("classified");
    return mapToClassifiedListItem(row, featuredPriorityById);
  });
}