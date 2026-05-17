import type { HomeFeaturedItem } from "@/src/types/Content";
import type { FeaturedPlacementRow } from "@/src/types";

function getContentLink(
  type: "news" | "technical",
  slug: string,
): string {
  if (type === "news") {
    return `/noticias/${slug}`;
  }
  return `/conteudo-tecnico/${slug}`;
}

export function mapPlacementToHomeFeaturedItem(
  placement: FeaturedPlacementRow,
): HomeFeaturedItem | null {
  if (placement.content_items) {
    const content = placement.content_items;

    return {
      placementId: placement.id,
      resourceType: content.type,
      resourceId: content.id,
      priority: placement.priority,
      title: content.title,
      description: content.short_description,
      imageSrc: content.cover_image_url,
      categoryName: content.categories?.name ?? "",
      link: getContentLink(content.type, content.slug),
      clientName: placement.client_name,
      campaignName: placement.campaign_name,
    };
  }

  if (placement.podcast_episodes) {
    const episode = placement.podcast_episodes;

    return {
      placementId: placement.id,
      resourceType: "podcast",
      resourceId: episode.id,
      priority: placement.priority,
      title: episode.title,
      description: episode.description,
      imageSrc: "",
      categoryName: "Podcast",
      link: `/podcast/${episode.slug}`,
      clientName: placement.client_name,
      campaignName: placement.campaign_name,
      embedUrl: episode.embed_url,
      embedKind: episode.embed_kind,
      episode: episode.episode_number,
    };
  }

  return null;
}
