export type FeaturedPriorityMap = Map<string, number>;

export function isPlacementActive(
  startsAt: string,
  endsAt: string,
  now = new Date(),
): boolean {
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  const current = now.getTime();
  return current >= start && current <= end;
}

export function sortByFeaturedThenPublished<T extends { id: string; published_at?: string | null }>(
  items: T[],
  featuredPriorityById: FeaturedPriorityMap,
): T[] {
  return [...items].sort((a, b) => {
    const aPriority = featuredPriorityById.get(a.id);
    const bPriority = featuredPriorityById.get(b.id);
    const aFeatured = aPriority !== undefined;
    const bFeatured = bPriority !== undefined;

    if (aFeatured && bFeatured) {
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
    } else if (aFeatured) {
      return -1;
    } else if (bFeatured) {
      return 1;
    }

    const aDate = a.published_at ? new Date(a.published_at).getTime() : 0;
    const bDate = b.published_at ? new Date(b.published_at).getTime() : 0;
    return bDate - aDate;
  });
}

export function paginate<T>(items: T[], limit: number, offset: number): T[] {
  return items.slice(offset, offset + limit);
}
