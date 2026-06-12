import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import type { ClassifiedDetail, ClassifiedListItem, } from "@/src/types";
import { findPublishedClassifiedBySlug, findPublishedClassifieds } from "../repositories/classifiedsRepository";
import { mapToClassifiedDetail, mapToClassifiedListItem } from "../mappers/classifiedMapper";

export async function listClassifieds(
  limit: number,
  offset: number,
): Promise<ClassifiedListItem[]> {
  return getCached(cacheKeys.classifiedList(limit, offset), async () => {
    const [rows, featuredPriorityById] = await Promise.all([
      findPublishedClassifieds(limit, offset),
      findActiveFeaturedPriorityMapForContentType("classified"),
    ]);

    return rows.map((row) => mapToClassifiedListItem(row, featuredPriorityById));
  });
}

export async function getClassifiedBySlug(slug: string): Promise<ClassifiedDetail | null> {
  return getCached(cacheKeys.classifiedBySlug(slug), async () => {
    const [row, featuredPriorityById] = await Promise.all([
      findPublishedClassifiedBySlug(slug),
      findActiveFeaturedPriorityMapForContentType("classified"),
    ]);

    return row ? mapToClassifiedDetail(row, featuredPriorityById) : null;
  });
}
