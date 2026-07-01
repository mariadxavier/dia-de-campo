import { getSupabaseAdmin } from '@/src/lib/supabase/server';

import type { AdBannerItem, AdBannerRow } from '@/src/types';

const ADBANNER_SELECT = `
  id,
  title,
  image_url,
  mobile_image_url,
  link_url,
  open_new_tab,
  position,
  starts_at,
  ends_at,
  priority,
  is_active,
  advertiser_name,
  campaign_name,
  created_at,
  updated_at
`;

export async function findAdBannersByPosition(position: string): Promise<AdBannerRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('ad_banners')
    .select(ADBANNER_SELECT)
    .eq('position', position)
    .eq('is_active', true)
    .lt('starts_at', new Date().toISOString())
    .or(`ends_at.is.null,ends_at.gte.${new Date().toISOString()}`)
    .order('priority');

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdBannerRow[];
}
