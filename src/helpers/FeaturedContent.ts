import {
  CeasaPriceItem,
  ClassifiedListItem,
  ExternalCeasaPrice,
  NewsListItem,
  PodcastEpisodeItem,
  TechnicalContentListItem,
} from '../types';
import { listHomeHeros } from '../server/services/heroService';
import { listNews } from '../server/services/newsService';
import { listPodcastEpisodes } from '../server/services/podcastService';
import { listTechnicalContent } from '../server/services/technicalContentService';
import { listClassifieds } from '../server/services/classifiedsService';
import { listCeasaPrices } from '../server/services/ceasaPricesService';

class FeaturedContent {
  private playInterval = 10000;

  private orderByFeaturedPriority<T extends { featuredPriority: number | null }>(items: T[]): T[] {
    return items.sort((a, b) => (b.featuredPriority ?? 0) - (a.featuredPriority ?? 0));
  }

  public async getHomeHeros(): Promise<NewsListItem[]> {
    const heros = await listHomeHeros(0);
    return this.orderByFeaturedPriority(heros);
  }

  public getContentPlayInterval(): number {
    return this.playInterval;
  }

  public async getNews(): Promise<NewsListItem[]> {
    const news = await listNews(10, 0);
    return this.orderByFeaturedPriority(news);
  }

  public async getPodcasts(): Promise<PodcastEpisodeItem[]> {
    const podcasts = await listPodcastEpisodes(3, 1);
    return this.orderByFeaturedPriority(podcasts);
  }

  public async getMainPodcast(): Promise<PodcastEpisodeItem> {
    const podcast = await listPodcastEpisodes(1, 0);
    return podcast[0];
  }

  public async getClassifieds(): Promise<ClassifiedListItem[]> {
    const classifieds = await listClassifieds(10, 0);
    return this.orderByFeaturedPriority(classifieds);
  }

  public async getTechnicalContent(): Promise<TechnicalContentListItem[]> {
    const technicalContents = await listTechnicalContent(10, 0);
    return this.orderByFeaturedPriority(technicalContents);
  }
}

export default new FeaturedContent();
