import type {
    ClassifiedListItem,
    ClassifiedRow,
  } from "@/src/types";
  
  function getClassifiedLink(slug: string): string {
    return `/classificados?anuncio=${slug}`;
  }
  
  export function mapToClassifiedListItem(
    row: ClassifiedRow,
    featuredPriorityById?: Map<string, number>,
  ): ClassifiedListItem {
    const priority = featuredPriorityById?.get(row.id);
  
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category,
      description: row.description,
      coverImage: row.cover_image_url,
      city: row.city,
      state: row.state,
      price: row.price ?? 0,
      link: getClassifiedLink(row.slug),
      publishedAt: row.published_at,
      isFeatured: priority !== undefined,
      featuredPriority: priority ?? null,
      contactName: row.contact_name,
      contactEmail: row.contact_email,
      contactPhone: row.contact_phone,
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
      canonicalUrl: row.canonical_url,
      ogImageUrl: row.og_image_url,
    };
  }
