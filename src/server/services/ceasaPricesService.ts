import { cacheKeys } from '@/src/lib/cache/keys';
import { getCached } from '@/src/lib/cache/withCache';
import type { CeasaPriceItem } from '@/src/types';
import { findCeasaPrices } from '../repositories/ceasaPricesRepository';
import { mapToCeasaPriceItem } from '../mappers/ceasaMapper';

export async function listCeasaPrices(limit: number, offset: number): Promise<CeasaPriceItem[]> {
  return getCached(cacheKeys.ceasaPrices(limit, offset), async () => {
    const rows = await findCeasaPrices(limit, offset);

    return rows.map((row) => mapToCeasaPriceItem(row));
  });
}
