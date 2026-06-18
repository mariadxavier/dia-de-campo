import { cacheKeys } from '@/src/lib/cache/keys';
import { getCached } from '@/src/lib/cache/withCache';
import type { CeasaPriceItem, CeasaProductOption } from '@/src/types';
import { findCeasaNames, findCeasaPrices, findCeasaPricesByCeasaAndProduct, findCeasaPricesByCeasaName, findCeasaProductsByCeasaName, } from '../repositories/ceasaPricesRepository';
import { mapToCeasaPriceItem } from '../mappers/ceasaMapper';

export async function listCeasaPrices(limit: number, offset: number, ceasaName?: string): Promise<CeasaPriceItem[]> {
  if (ceasaName) {
    return getCached(cacheKeys.ceasaPricesByCeasaName(limit, offset, ceasaName), async () => {
      const rows = await findCeasaPricesByCeasaName(limit, offset, ceasaName);

      return rows.map((row) => mapToCeasaPriceItem(row));
    });
  }
  return getCached(cacheKeys.ceasaPrices(limit, offset), async () => {
    const rows = await findCeasaPrices(limit, offset);

    return rows.map((row) => mapToCeasaPriceItem(row));
  });
}

export async function listCeasaNames(): Promise<string[]> {
  return getCached(cacheKeys.ceasaNames(), async () => {
    const rows = await findCeasaNames();
    return rows;
  });
}

export async function listProductNames(limit: number, offset: number, ceasaName: string,): Promise<CeasaProductOption[]> {
  return getCached(cacheKeys.ceasaProducts(ceasaName), async () => {
    const rows = await findCeasaProductsByCeasaName(ceasaName, limit, offset);
    return rows;
  });
}

export async function listCeasaPricesByCeasaNameAndProductSlug(limit: number, offset: number, ceasaName: string, productSlug: string): Promise<CeasaProductOption[]> {
  return getCached(cacheKeys.ceasaPricesByCeasaAndProduct(limit, offset, ceasaName, productSlug), async () => {
    const rows = await findCeasaPricesByCeasaAndProduct(ceasaName, productSlug, limit, offset);
    return rows;
  });
}

