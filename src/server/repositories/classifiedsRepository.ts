import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import type { ClassifiedCategories, ClassifiedRow } from "@/src/types";
import { UF } from "@/src/types/Location";

const CLASSIFIED_SELECT = `
  id,
  title,
  slug,
  category,
  description,
  price,
  contact_name,
  contact_email,
  contact_phone,
  city,
  state,
  cover_image_url,
  seo_title,
  seo_description,
  canonical_url,
  og_image_url,
  is_published,
  published_at,
  expires_at,
  is_featured,
  created_by,
  created_at,
  updated_at
`;

export async function findPublishedClassifieds(
  limit: number,
  offset: number,
  category: ClassifiedCategories,
  state: UF
): Promise<ClassifiedRow[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
  .from("classifieds")
  .select(CLASSIFIED_SELECT)
  .eq("is_published", true)
  .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
  .order("is_featured", {
    ascending: false,
  })
  .order("published_at", {
    ascending: false,
  })
  .range(offset, offset + limit - 1);

  if ( category !== 'todos') {
    query = query.eq("category", category);
  }

  if ( state !== 'Todo o Brasil') {
    query = query.eq("state", state);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ClassifiedRow[];
}

export async function findPublishedClassifiedBySlug(slug: string): Promise<ClassifiedRow | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("classifieds")
    .select(CLASSIFIED_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? null;
}

export async function findClassifiedsByCity(
  city: string,
  limit = 50,
): Promise<ClassifiedRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("classifieds")
    .select(CLASSIFIED_SELECT)
    .eq("city", city)
    .eq("is_published", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("published_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ClassifiedRow[];
}

export async function findClassifiedsByState(
  state: string,
  limit = 50,
): Promise<ClassifiedRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("classifieds")
    .select(CLASSIFIED_SELECT)
    .eq("state", state.toUpperCase())
    .eq("is_published", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("published_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ClassifiedRow[];
}

export async function countClassifieds(): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { count, error } = await supabase
    .from("classifieds")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function findAllPublishedClassifiedSlugs(): Promise<Array<{ slug: string; updated_at: string }>> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("classifieds")
    .select("slug, updated_at")
    .eq("is_published", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Array<{ slug: string; updated_at: string }>;
}
