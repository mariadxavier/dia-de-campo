import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findPublishedContentBySlug, findPublishedContentByType } from "@/src/server/repositories/contentRepository";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import { mapToNewsDetail, mapToNewsListItem } from "@/src/server/mappers/contentMapper";
import type { NewsDetail, NewsListItem } from "@/src/types";

export async function listHomeHeros(
  offset: number,
): Promise<NewsListItem[]> {
  return getCached(cacheKeys.newsList(10, offset), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedContentByType("hero", 10, offset),
      findActiveFeaturedPriorityMapForContentType("hero"),
    ]);

    return rows.map((row) => mapToNewsListItem(row, featuredPriorityById));
  });
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  return getCached(cacheKeys.newsBySlug(slug), async () => {
    const [row, featuredPriorityById] = await Promise.all([
      findPublishedContentBySlug("hero", slug),
      findActiveFeaturedPriorityMapForContentType("hero"),
    ]);

    return row ? mapToNewsDetail(row, featuredPriorityById) : null;
  });
}
