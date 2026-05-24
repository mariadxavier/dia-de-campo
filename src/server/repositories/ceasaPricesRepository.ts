import { getSupabaseAdmin } from "@/src/lib/supabase/server";

import type {
  CeasaPriceRow,
} from "@/src/types";

const CEASA_SELECT = `
  id,
  city,
  ibge_city_code,
  uf,
  ceasa_name,
  product_name,
  product_slug,
  unity,
  price_date,
  daily_price,
  previous_price,
  price_variation,
  created_at,
  updated_at
`;

export async function findCeasaPrices(
  limit: number,
  offset: number,
): Promise<CeasaPriceRow[]> {
  const supabase =
    getSupabaseAdmin();

  const { data, error } =
    await supabase
      .from("ceasa_prices")
      .select(CEASA_SELECT)
      .order("product_name")
      .range(
        offset,
        offset + limit - 1,
      );

  if (error) {
    throw new Error(error.message);
  }

  return (
    (data ?? []) as CeasaPriceRow[]
  );
}

export async function findCeasaPricesByProduct(
  productSlug: string,
): Promise<CeasaPriceRow[]> {
  const supabase =
    getSupabaseAdmin();

  const { data, error } =
    await supabase
      .from("ceasa_prices")
      .select(CEASA_SELECT)
      .eq(
        "product_slug",
        productSlug,
      )
      .order("daily_price", {
        ascending: true,
      });

  if (error) {
    throw new Error(error.message);
  }

  return (
    (data ?? []) as CeasaPriceRow[]
  );
}

export async function findCeasaPricesByUF(
  uf: string,
): Promise<CeasaPriceRow[]> {
  const supabase =
    getSupabaseAdmin();

  const { data, error } =
    await supabase
      .from("ceasa_prices")
      .select(CEASA_SELECT)
      .eq(
        "uf",
        uf.toUpperCase(),
      )
      .order("product_name");

  if (error) {
    throw new Error(error.message);
  }

  return (
    (data ?? []) as CeasaPriceRow[]
  );
}
