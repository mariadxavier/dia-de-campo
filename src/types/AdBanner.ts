export type AdBannerRow = {
  id: string;
  title: string;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  open_new_tab: boolean;
  position: AdBannerPosition;
  starts_at: string | null;
  ends_at: string | null;
  priority: number;
  is_active: boolean;
  advertiser_name: string | null;
  campaign_name: string | null;
  created_at: string;
  updated_at: string;
}

export type AdBannerItem = {
  id: string;
  title: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  linkUrl: string | null;
  openNewTab: boolean;
  position: AdBannerPosition;
  startsAt: string | null;
  endsAt: string | null;
  priority: number;
  isActive: boolean;
  advertiserName: string | null;
  campaignName: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AdBannerPosition = 'header' | 'mid-content' | 'footer';
