import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findPublishedContentBySlug, findPublishedContentByType } from "@/src/server/repositories/contentRepository";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import { mapToNewsDetail, mapToNewsListItem } from "@/src/server/mappers/contentMapper";
import type { NewsDetail, NewsListItem } from "@/src/types";

export async function listNews(
  limit: number,
  offset: number,
): Promise<NewsListItem[]> {
  return getCached(cacheKeys.newsList(limit, offset), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedContentByType("news", limit, offset),
      findActiveFeaturedPriorityMapForContentType("news"),
    ]);

    return rows.map((row) => mapToNewsListItem(row, featuredPriorityById));
  });
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  return getCached(cacheKeys.newsBySlug(slug), async () => {
    const [row, featuredPriorityById] = await Promise.all([
      findPublishedContentBySlug("news", slug),
      findActiveFeaturedPriorityMapForContentType("news"),
    ]);

    return row ? mapToNewsDetail(row, featuredPriorityById) : null;
  });
}
