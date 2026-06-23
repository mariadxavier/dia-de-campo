import { getSupabaseAdmin } from '@/src/lib/supabase/server';

import type { CeasaPriceRow, CeasaProductOption } from '@/src/types';

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

export async function findCeasaPrices(limit: number, offset: number): Promise<CeasaPriceRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('ceasa_prices')
    .select(CEASA_SELECT)
    .order('product_name')
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CeasaPriceRow[];
}

export async function findCeasaPricesByCeasaName(
  limit: number,
  offset: number,
  ceasaName: string,
): Promise<CeasaPriceRow[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('ceasa_prices')
    .select(CEASA_SELECT)
    .order('product_name')
    .range(offset, offset + limit - 1);

  if (ceasaName !== 'Todas as centrais') {
    query = query.eq('ceasa_name', ceasaName.toUpperCase());
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CeasaPriceRow[];
}

export async function findCeasaPricesByProduct(productSlug: string): Promise<CeasaPriceRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('ceasa_prices')
    .select(CEASA_SELECT)
    .eq('product_slug', productSlug)
    .order('daily_price', {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CeasaPriceRow[];
}

export async function findCeasaPricesByCeasaAndProduct(
  ceasaName: string,
  productSlug: string,
  limit: number,
  offset: number,
): Promise<CeasaPriceRow[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('ceasa_prices')
    .select(CEASA_SELECT)
    .order('product_name', {
      ascending: true,
    })
    .range(offset, offset + limit - 1);

  if (productSlug !== 'all') {
    query = query.eq('product_slug', productSlug);
  }
  if (ceasaName !== 'Todas as centrais') {
    query = query.eq('ceasa_name', ceasaName.toUpperCase());
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CeasaPriceRow[];
}

export async function findCeasaProductsByCeasaName(
  ceasaName: string,
): Promise<CeasaProductOption[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc(
    'get_ceasa_products',
    {
      p_ceasa_name:
        ceasaName === 'Todas as centrais'
          ? null
          : ceasaName,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item: CeasaPriceRow) => ({
    product_name: item.product_name,
    product_slug: item.product_slug,
  }));
}

export async function findCeasaNames(): Promise<string[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('get_ceasa_names');

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as { ceasa_name: string }[];

  return rows.map((row) => row.ceasa_name);
}
