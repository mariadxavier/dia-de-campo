import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { countContentGroupedByCategory, countPublishedContentByType, countPublishedContentFiltered, findPublishedContentByCategory, findPublishedContentBySlug, findPublishedContentByType, findPublishedContentFiltered } from "@/src/server/repositories/contentRepository";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import { mapToNewsDetail, mapToNewsListItem } from "@/src/server/mappers/contentMapper";
import type { CategoryCount, ContentPeriod, TechnicalContentDetail, TechnicalContentListItem } from "@/src/types";

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

export async function listTechnicalContentFiltered(
  limit: number,
  offset: number,
  categorySlug?: string,
  period: ContentPeriod = 'tudo',
): Promise<TechnicalContentListItem[]> {
  return getCached(
    cacheKeys.technicalListFiltered(limit, offset, categorySlug ?? 'todos', period),
    async () => {
      const rows = await findPublishedContentFiltered(limit, offset, categorySlug, period, 'technical');
      return rows.map((row) => mapToNewsDetail(row));
    },
  );
}

export async function countTechnicalContentFiltered(
  categorySlug?: string,
  period: ContentPeriod = 'tudo',
): Promise<number> {
  return getCached(
    cacheKeys.technicalCountFiltered(categorySlug ?? 'todos', period),
    async () => countPublishedContentFiltered(categorySlug, period, 'technical'),
  );
}

export async function getTechnicalContentCategoryCounts(
  period: ContentPeriod = 'tudo',
): Promise<CategoryCount[]> {
  return getCached(
    cacheKeys.technicalCategoryCounts(period),
    async () => countContentGroupedByCategory(period, 'technical'),
  );
}

