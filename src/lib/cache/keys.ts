export const cacheKeys = {
  newsList: (limit: number, offset: number) =>
    `news:list:${limit}:${offset}`,
  newsBySlug: (slug: string) => `news:slug:${slug}`,
  technicalList: (limit: number, offset: number) =>
    `technical:list:${limit}:${offset}`,
  technicalBySlug: (slug: string) => `technical:slug:${slug}`,
  homeFeatured: () => "featured:home",
  ceasaPrices: () => "ceasa:prices",
  podcastList: (limit: number, offset: number) =>
    `podcast:list:${limit}:${offset}`,
};
