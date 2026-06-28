import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import {
  paginate,
  sortByFeaturedThenPublished,
} from "@/src/server/utils/sortWithFeatured";
import type { ContentType, ContentItemRow, SlotType, CategoryCount, ContentPeriod } from "@/src/types";

const CONTENT_SELECT = `
  *,
  categories (
    id,
    name,
    slug,
    created_at
  )
`;

export async function findPublishedContentByType(
  type: ContentType | ContentType[],
  limit: number,
  offset: number,
  slot: SlotType | 'all' = 'all',
): Promise<ContentItemRow[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("content_items")
    .select(CONTENT_SELECT)
    .eq("is_published", true);

  if (slot !== 'all') {
    query = query.eq("slot", slot);
  }

  if (Array.isArray(type)) {
    query = query.in("type", type);
  } else {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  let rows = (data ?? []) as ContentItemRow[];
  const featuredPriorityById =
    await findActiveFeaturedPriorityMapForContentType(type);

  const sorted = sortByFeaturedThenPublished(rows, featuredPriorityById);

  return paginate(sorted, limit, offset);
}

export async function findPublishedContentBySlug(
  type: ContentType,
  slug: string,
): Promise<ContentItemRow | null> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("content_items")
    .select(CONTENT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .eq("type", type);

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ContentItemRow | null) ?? null;
}

export async function countPublishedContentByType(type: ContentType): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { count, error } = await supabase
    .from("content_items")
    .select("*", { count: "exact", head: true })
    .eq("type", type)
    .eq("is_published", true);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function findPublishedContentByCategory(categoryName: string, type: ContentType, limit: number, offset: number): Promise<ContentItemRow[]> {
  const supabase = getSupabaseAdmin();

  const { data: categoryData, error: catError } = await supabase
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .maybeSingle();

  if (catError || !categoryData) {
    return [];
  }

  const { data, error } = await supabase
    .from("content_items")
    .select(CONTENT_SELECT)
    .eq("category_id", categoryData.id)
    .eq("type", type)
    .eq("is_published", true);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as ContentItemRow[];
  const featuredPriorityById =
    await findActiveFeaturedPriorityMapForContentType(type);
  const sorted = sortByFeaturedThenPublished(rows, featuredPriorityById);

  return paginate(sorted, limit, offset);
}

export async function findAllPublishedContentSlugsAndTypes(): Promise<Array<{ slug: string; type: ContentType; updated_at: string }>> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("content_items")
    .select("slug, type, updated_at")
    .eq("is_published", true);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Array<{ slug: string; type: ContentType; updated_at: string }>;
}

function periodToDateFilter(period: ContentPeriod): string | null {
  const now = new Date();
  switch (period) {
    case 'hoje': {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return start.toISOString();
    }
    case 'esta-semana': {
      const start = new Date(now);
      start.setDate(now.getDate() - 7);
      return start.toISOString();
    }
    case 'este-mes': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return start.toISOString();
    }
    case 'tudo':
    default:
      return null;
  }
}

export async function findPublishedContentFiltered(
  limit: number,
  offset: number,
  categorySlug?: string,
  period: ContentPeriod = 'tudo',
  type: ContentType = 'news',
): Promise<ContentItemRow[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('content_items')
    .select(CONTENT_SELECT)
    .eq('type', type)
    .eq('is_published', true);

  if (categorySlug && categorySlug !== 'todos') {
    query = query.eq('categories.slug', categorySlug);
  }

  const dateFrom = periodToDateFilter(period);
  if (dateFrom) {
    query = query.gte('published_at', dateFrom);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  let rows = (data ?? []) as ContentItemRow[];

  if (categorySlug && categorySlug !== 'todos') {
    rows = rows.filter((r) => r.categories?.slug === categorySlug);
  }

  const featuredPriorityById = await findActiveFeaturedPriorityMapForContentType(type);
  const sorted = sortByFeaturedThenPublished(rows, featuredPriorityById);

  return paginate(sorted, limit, offset);
}

export async function countPublishedContentFiltered(
  categorySlug?: string,
  period: ContentPeriod = 'tudo',
  type: ContentType = 'news',
): Promise<number> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('content_items')
    .select(CONTENT_SELECT, { count: 'exact', head: false })
    .eq('type', type)
    .eq('is_published', true);

  if (categorySlug && categorySlug !== 'todos') {
    query = query.eq('categories.slug', categorySlug);
  }

  const dateFrom = periodToDateFilter(period);
  if (dateFrom) {
    query = query.gte('published_at', dateFrom);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  let rows = (data ?? []) as ContentItemRow[];

  if (categorySlug && categorySlug !== 'todos') {
    rows = rows.filter((r) => r.categories?.slug === categorySlug);
  }

  return rows.length;
}

export async function countContentGroupedByCategory(
  period: ContentPeriod = 'tudo',
  type: ContentType = 'news',
): Promise<CategoryCount[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('content_items')
    .select(CONTENT_SELECT)
    .eq('type', type)
    .eq('is_published', true);

  const dateFrom = periodToDateFilter(period);
  if (dateFrom) {
    query = query.gte('published_at', dateFrom);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as ContentItemRow[];

  const map = new Map<string, CategoryCount>();
  for (const row of rows) {
    const cat = row.categories;
    if (!cat) continue;
    const existing = map.get(cat.slug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(cat.slug, { name: cat.name, slug: cat.slug, count: 1 });
    }
  }

  const byCategory = Array.from(map.values()).sort((a, b) => b.count - a.count);

  return [
    { name: 'Todos', slug: 'todos', count: rows.length },
    ...byCategory,
  ];
}
