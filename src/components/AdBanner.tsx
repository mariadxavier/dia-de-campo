import { AdBannerItem, AdBannerPosition } from "../types";
import { getAdBannersByPosition } from "../server/services/adBannersService";
import AdBannerCarousel from "./AdBannerCarousel";

interface AdBannerProps {
  position?: AdBannerPosition;
  adBanners?: AdBannerItem[];
  adBanner?: AdBannerItem;
  interval?: number;
}

export default async function AdBanner({
  position = "mid-content",
  adBanners,
  adBanner,
  interval = 5000,
}: AdBannerProps) {
  const items = adBanners && adBanners.length > 0
    ? adBanners
    : adBanner
    ? [adBanner]
    : await getAdBannersByPosition(position);

  if (items.length === 0) return null;

  return <AdBannerCarousel adBanners={items} interval={interval} />;
}
