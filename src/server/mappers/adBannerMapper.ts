import type { AdBannerItem, AdBannerRow} from '@/src/types';

export function mapToAdBannerItem(row: AdBannerRow): AdBannerItem {
  return {
  id: row.id,
  title: row.title,
  imageUrl: row.image_url,
  mobileImageUrl: row.mobile_image_url,
  linkUrl: row.link_url,
  openNewTab: row.open_new_tab,
  position: row.position,
  startsAt: row.starts_at,
  endsAt: row.ends_at,
  priority: row.priority,
  isActive: row.is_active,
  advertiserName: row.advertiser_name,
  campaignName: row.campaign_name,
  createdAt: row.created_at,
  updatedAt: row.updated_at 
  };
}
