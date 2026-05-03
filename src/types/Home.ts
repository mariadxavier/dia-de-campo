export type HighlightItem = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  categoryName: string;
};

export type HomeSectionNews = {
    coverImage: string;
    categoryName: string;
    title: string;
    shortDescription: string;
    link: string;
}

export type HomeSectionCeasaPrices = {
  uf: string;
  title: string;
  link: string;
  price: number;
  priceVariation: number;
  priceVariationIcon: string;
};

export type PodcastEmbedKind = "audio" | "spotify" | "youtube";

export type HomeSectionPodcast = {
  episode: string;
  title: string;
  description: string;
  embedUrl: string;
  embedKind: PodcastEmbedKind;
  link: string;
};
