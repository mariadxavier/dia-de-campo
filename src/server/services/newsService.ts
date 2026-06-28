import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import {
  findPublishedContentBySlug,
  findPublishedContentByType,
  countPublishedContentByType,
  findPublishedContentByCategory,
  findPublishedContentFiltered,
  countPublishedContentFiltered,
  countContentGroupedByCategory,
} from "@/src/server/repositories/contentRepository";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import { mapToNewsDetail, mapToNewsListItem } from "@/src/server/mappers/contentMapper";
import type { CategoryCount, ContentPeriod, NewsDetail, NewsListItem } from "@/src/types";

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

export async function countNews(): Promise<number> {
  return getCached(cacheKeys.newsList(1, 0) + "_count", async () => {
    return countPublishedContentByType("news");
  });
}

export async function getNewsByCategory(category: string, limit: number, offset: number): Promise<NewsListItem[]> {
  return getCached(cacheKeys.newsList(limit, offset), async () => {
    const content = await findPublishedContentByCategory(category, "news", limit, offset);
    return content.map(row => mapToNewsListItem(row));
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

export async function listNewsFiltered(
  limit: number,
  offset: number,
  categorySlug?: string,
  period: ContentPeriod = 'tudo',
): Promise<NewsListItem[]> {
  return getCached(
    cacheKeys.newsListFiltered(limit, offset, categorySlug ?? 'todos', period),
    async () => {
      const rows = await findPublishedContentFiltered(limit, offset, categorySlug, period, 'news');
      return rows.map((row) => mapToNewsListItem(row));
    },
  );
}

export async function countNewsFiltered(
  categorySlug?: string,
  period: ContentPeriod = 'tudo',
): Promise<number> {
  return getCached(
    cacheKeys.newsCountFiltered(categorySlug ?? 'todos', period),
    async () => countPublishedContentFiltered(categorySlug, period, 'news'),
  );
}

export async function getNewsCategoryCounts(
  period: ContentPeriod = 'tudo',
): Promise<CategoryCount[]> {
  return getCached(
    cacheKeys.newsCategoryCounts(period),
    async () => countContentGroupedByCategory(period, 'news'),
  );
}
