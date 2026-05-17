// TODO: adaptar para conexão real API de preços CEASA
import type { CeasaPriceItem, ExternalCeasaPriceItem } from "@/src/types";

export function mapExternalCeasaPriceItem(
  item: ExternalCeasaPriceItem,
): CeasaPriceItem {
  return {
    id: item.id ?? item.slug,
    uf: item.uf,
    productTitle: item.productTitle,
    slug: item.slug,
    link: `/precos-ceasa/${item.slug}`,
    price: Number(item.price),
    priceVariation: Number(item.priceVariation),
  };
}
