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
  classifiedList: (limit: number, offset: number) =>
    `classified:list:${limit}:${offset}`,
  classifiedBySlug: (slug: string) => `classified:slug:${slug}`,
};
