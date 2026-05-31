export type ContentType = "news" | "technical";

export type PodcastEmbedKind = "audio" | "spotify" | "youtube";

export type FeaturedResourceType = "news" | "technical" | "podcast";

export type ContentBlock = {
  type: "paragraph";
  content: string;
};

export type ContentJson = ContentBlock[];

export type PaginationMeta = {
  limit: number;
  offset: number;
  total?: number;
};

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentItemRow = {
  id: string;
  type: ContentType;
  category_id: string | null;
  title: string;
  slug: string;
  short_description: string;
  cover_image_url: string;
  content: ContentJson;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  search_vector: unknown | null;
  published_at: string | null;
  is_published: boolean;
  sort_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  categories?: CategoryRow | null;
};

export type PodcastEpisodeRow = {
  id: string;
  episode_number: string;
  title: string;
  slug: string;
  description: string;
  embed_url: string;
  embed_kind: PodcastEmbedKind;
  author: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  published_at: string | null;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type FeaturedPlacementRow = {
  id: string;
  content_item_id: string | null;
  podcast_episode_id: string | null;
  starts_at: string;
  ends_at: string;
  priority: number;
  client_name: string | null;
  campaign_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  content_items?: ContentItemRow | null;
  podcast_episodes?: PodcastEpisodeRow | null;
};

export type ClassifiedRow = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  content: ContentJson;
  price: number | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  city: string | null;
  state: string | null;
  cover_image_url: string;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  expires_at: string | null;
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type NewsListItem = {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  categoryName: string | null;
  link: string;
  publishedAt: string | null;
  isFeatured: boolean;
  featuredPriority: number | null;
};

export type NewsDetail = NewsListItem & {
  content: ContentJson;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
};

export type TechnicalContentListItem = NewsListItem;

export type TechnicalContentDetail = NewsDetail;

export type PodcastEpisodeItem = {
  id: string;
  episode: string;
  title: string;
  description: string;
  embedUrl: string;
  embedKind: PodcastEmbedKind;
  author: string | null;
  link: string;
  publishedAt: string | null;
  isFeatured: boolean;
  featuredPriority: number | null;
};

export type HomeFeaturedItem = {
  placementId: string;
  resourceType: FeaturedResourceType;
  resourceId: string;
  priority: number;
  title: string;
  description: string;
  imageSrc: string;
  categoryName: string | null;
  link: string;
  clientName: string | null;
  campaignName: string | null;
  embedUrl?: string;
  embedKind?: PodcastEmbedKind;
  episode?: string;
};

export type ClassifiedListItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  city: string | null;
  state: string | null;
  price: number;
  link: string;
  publishedAt: string | null;
  isFeatured: boolean;
};

export type ClassifiedDetail = ClassifiedListItem & {
  content: ContentJson;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  expiresAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type NewsListResponse =
  PaginatedResponse<NewsListItem>;

export type TechnicalListResponse =
  PaginatedResponse<TechnicalContentListItem>;

export type PodcastListResponse =
  PaginatedResponse<PodcastEpisodeItem>;

export type ClassifiedListResponse =
  PaginatedResponse<ClassifiedListItem>;
