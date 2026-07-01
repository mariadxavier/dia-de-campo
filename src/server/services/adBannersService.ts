import { cacheKeys } from '@/src/lib/cache/keys';
import { getCached } from '@/src/lib/cache/withCache';
import { AdBannerItem, AdBannerPosition } from '@/src/types';
import { findAdBannersByPosition } from '../repositories/adBannersRepository';
import { mapToAdBannerItem } from '../mappers/adBannerMapper';

export async function listAdBannersByPosition(position: AdBannerPosition): Promise<AdBannerItem[]> {
  return getCached(cacheKeys.adBannersByPosition(position), async () => {
    const rows = await findAdBannersByPosition(position);

    return rows.map((row) => mapToAdBannerItem(row));
  });
}
