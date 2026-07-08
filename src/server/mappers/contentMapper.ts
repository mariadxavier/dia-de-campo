import type { NewsDetail, NewsListItem, ContentItemRow } from "@/src/types";

function getCategoryName(row: ContentItemRow): string {
  return row.categories?.name ?? "";
}

function getContentLink(type: ContentItemRow["type"], slug: string): string {
  if (type === "news") {
    return `/noticias/${slug}`;
  }
  return `/conteudo-tecnico/${slug}`;
}

export function mapToNewsListItem(
  row: ContentItemRow,
  featuredPriorityById?: Map<string, number>,
): NewsListItem {
  const priority = featuredPriorityById?.get(row.id);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    type: row.type,
    shortDescription: row.short_description,
    coverImage: row.cover_image_url,
    categoryName: getCategoryName(row),
    link: getContentLink(row.type, row.slug),
    publishedAt: row.published_at,
    isFeatured: priority !== undefined,
    featuredPriority: priority ?? null,
  };
}

export function mapToNewsDetail(
  row: ContentItemRow,
  featuredPriorityById?: Map<string, number>,
): NewsDetail {
  return {
    ...mapToNewsListItem(row, featuredPriorityById),
    author: row.author,
    content: row.content,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    canonicalUrl: row.canonical_url,
    ogImageUrl: row.og_image_url,
    source: row.source,
  };
}
