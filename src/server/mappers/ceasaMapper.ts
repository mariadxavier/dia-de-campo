import type { CeasaPriceItem, CeasaPriceRow } from '@/src/types';

function getCeasaLink(productSlug: string, uf: string): string {
  return `/ceasa/${uf.toLowerCase()}/${productSlug}`;
}

export function mapToCeasaPriceItem(row: CeasaPriceRow): CeasaPriceItem {
  return {
    id: row.id,
    link: getCeasaLink(row.product_slug, row.uf),

    city: row.city,
    ibgeCode: row.ibge_city_code,
    uf: row.uf,

    ceasaName: row.ceasa_name,

    productName: row.product_name,
    productSlug: row.product_slug,

    unity: row.unity,

    priceDate: row.price_date,

    dailyPrice: row.daily_price,
    previousPrice: row.previous_price,
    priceVariation: row.price_variation,

    updatedAt: row.updated_at,
  };
}
