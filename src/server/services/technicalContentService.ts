import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { countPublishedContentByType, findPublishedContentByCategory, findPublishedContentBySlug, findPublishedContentByType } from "@/src/server/repositories/contentRepository";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import { mapToNewsDetail, mapToNewsListItem } from "@/src/server/mappers/contentMapper";
import type { TechnicalContentDetail, TechnicalContentListItem } from "@/src/types";

export async function listTechnicalContent(
  limit: number,
  offset: number,
): Promise<TechnicalContentListItem[]> {
  return getCached(cacheKeys.technicalList(limit, offset), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedContentByType("technical", limit, offset),
      findActiveFeaturedPriorityMapForContentType("technical"),
    ]);

    return rows.map((row) => mapToNewsListItem(row, featuredPriorityById));
  });
}

export async function getTechnicalContentBySlug(
  slug: string,
): Promise<TechnicalContentDetail | null> {
  return getCached(cacheKeys.technicalBySlug(slug), async () => {
    const [row, featuredPriorityById] = await Promise.all([
      findPublishedContentBySlug("technical", slug),
      findActiveFeaturedPriorityMapForContentType("technical"),
    ]);

    return row ? mapToNewsDetail(row, featuredPriorityById) : null;
  });
}

export async function countTechnicalContent(): Promise<number> {
  return getCached(cacheKeys.technicalList(1, 0) + "_count", async () => {
    return countPublishedContentByType("technical");
  });
}

export async function getTechnicalContentByCategory(category: string, limit: number, offset: number): Promise<TechnicalContentListItem[]> {
  return getCached(cacheKeys.technicalList(limit, offset), async () => {
    const content = await findPublishedContentByCategory(category, "technical", limit, offset);
    return content.map(row => mapToNewsListItem(row));
  }); 
}

