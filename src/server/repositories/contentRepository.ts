import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { findActiveFeaturedPriorityMapForContentType } from "@/src/server/repositories/featuredPlacementRepository";
import {
  paginate,
  sortByFeaturedThenPublished,
} from "@/src/server/utils/sortWithFeatured";
import type { ContentType, ContentItemRow } from "@/src/types";

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
  type: ContentType,
  limit: number,
  offset: number,
): Promise<ContentItemRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("content_items")
    .select(CONTENT_SELECT)
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

export async function findPublishedContentBySlug(
  type: ContentType,
  slug: string,
): Promise<ContentItemRow | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("content_items")
    .select(CONTENT_SELECT)
    .eq("type", type)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ContentItemRow | null) ?? null;
}
