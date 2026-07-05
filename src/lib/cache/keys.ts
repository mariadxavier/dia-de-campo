export const cacheKeys = {
  newsList: (limit: number, offset: number) =>
    `news:list:${limit}:${offset}`,
  newsBySlug: (slug: string) => `news:slug:${slug}`,
  technicalList: (limit: number, offset: number) =>
    `technical:list:${limit}:${offset}`,
  technicalBySlug: (slug: string) => `technical:slug:${slug}`,
  homeHeros: (limit: number, offset: number) => `home:heros:${limit}:${offset}`,
  ceasaPrices: (limit: number, offset: number) => `ceasa:prices:${limit}:${offset}`,
  ceasaPricesByCeasaAndProduct: (limit: number, offset: number, ceasaName: string, product: string) => `ceasa:prices:${limit}:${offset}:${ceasaName}:${product}`,
  ceasaPricesByCeasaName: (limit: number, offset: number, ceasaName: string) => `ceasa:prices:${limit}:${offset}:${ceasaName}`,
  ceasaNames: () => 'ceasa:names',
  ceasaProducts: (ceasaName: string) => `ceasa:products:${ceasaName}`,
  podcastList: (limit: number, offset: number) =>
    `podcast:list:${limit}:${offset}`,
  podcastBySlug: (slug: string) => `podcast:slug:${slug}`,
  classifiedList: (limit: number, offset: number, category: string, state: string) =>
    `classified:list:${limit}:${offset}:${category}:${state}`,
  classifiedBySlug: (slug: string) => `classified:slug:${slug}`,
  newsListFiltered: (limit: number, offset: number, category: string, period: string) =>
    `news:list:filtered:${limit}:${offset}:${category}:${period}`,
  newsCountFiltered: (category: string, period: string) =>
    `news:count:filtered:${category}:${period}`,
  newsCategoryCounts: (period: string) =>
    `news:category-counts:${period}`,
  technicalListFiltered: (limit: number, offset: number, category: string, period: string) =>
    `technical:list:filtered:${limit}:${offset}:${category}:${period}`,
  technicalCountFiltered: (category: string, period: string) =>
    `technical:count:filtered:${category}:${period}`,
  technicalCategoryCounts: (period: string) =>
    `technical:category-counts:${period}`,
  allActiveAdBanners: () => 'adBanners:all'
};
