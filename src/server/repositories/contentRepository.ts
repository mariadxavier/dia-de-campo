import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import {
  paginate,
  sortByFeaturedThenPublished,
} from "@/src/server/utils/sortWithFeatured";
import type { ContentType, ContentItemRow, SlotType } from "@/src/types";

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
  slot: SlotType = 'content',
): Promise<ContentItemRow[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("content_items")
    .select(CONTENT_SELECT)
    .eq("is_published", true)
    .eq("slot", slot);

  if (Array.isArray(type)) {
    query = query.in("type", type);
  } else {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as ContentItemRow[];
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
