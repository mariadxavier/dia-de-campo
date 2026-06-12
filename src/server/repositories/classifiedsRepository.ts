import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import type { ClassifiedRow } from "@/src/types";

const CLASSIFIED_SELECT = `
  id,
  title,
  slug,
  short_description,
  content,
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
): Promise<ClassifiedRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
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

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ClassifiedRow[];
}

export async function findPublishedClassifiedBySlug(
  slug: string,
): Promise<ClassifiedRow | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("classifieds")
    .select(CLASSIFIED_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ClassifiedRow | null) ?? null;
}

export async function findFeaturedClassifieds(
  limit = 10,
): Promise<ClassifiedRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("classifieds")
    .select(CLASSIFIED_SELECT)
    .eq("is_published", true)
    .eq("is_featured", true)
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