export const cacheKeys = {
  newsList: (limit: number, offset: number) =>
    `news:list:${limit}:${offset}`,
  newsBySlug: (slug: string) => `news:slug:${slug}`,
  technicalList: (limit: number, offset: number) =>
    `technical:list:${limit}:${offset}`,
  technicalBySlug: (slug: string) => `technical:slug:${slug}`,
  homeFeatured: () => "featured:home",
  ceasaPrices: (limit: number, offset: number) => `ceasa:prices:${limit}:${offset}`,
  podcastList: (limit: number, offset: number) =>
    `podcast:list:${limit}:${offset}`,
  classifiedList: (limit: number, offset: number) =>
    `classified:list:${limit}:${offset}`,
  classifiedBySlug: (slug: string) => `classified:slug:${slug}`,
};
