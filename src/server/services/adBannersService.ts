import { cacheKeys } from '@/src/lib/cache/keys';
import { getCached } from '@/src/lib/cache/withCache';
import { AdBannerItem, AdBannerPosition } from '@/src/types';
import { findAllActiveAdBanners } from '../repositories/adBannersRepository';
import { mapToAdBannerItem } from '../mappers/adBannerMapper';
import { cache } from 'react';

export async function listAllActiveAdBanners(): Promise<AdBannerItem[]> {
  return getCached(cacheKeys.allActiveAdBanners(), async () => {
    const rows = await findAllActiveAdBanners();

    return rows.map((row) => mapToAdBannerItem(row));
  });
}

export const getCachedActiveAdBanners = cache(async (): Promise<AdBannerItem[]> => {
  return await listAllActiveAdBanners();
});

export async function getAdBannersByPosition(position: AdBannerPosition): Promise<AdBannerItem[]> {
  const allBanners = await getCachedActiveAdBanners();
  return allBanners.filter((banner) => banner.position === position);
}
