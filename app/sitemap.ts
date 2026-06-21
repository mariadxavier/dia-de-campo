import { MetadataRoute } from "next";
import { findAllPublishedContentSlugsAndTypes } from "@/src/server/repositories/contentRepository";
import { findAllPublishedClassifiedSlugs } from "@/src/server/repositories/classifiedsRepository";
import { findAllPublishedPodcastSlugs } from "@/src/server/repositories/podcastRepository";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.portaldiadecampo.com.br";

  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conteudo-tecnico`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/precos-ceasa`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/classificados`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    },
  ];

  let contentItems: Array<{ url: string; lastModified: Date; changeFrequency: "weekly"; priority: number }> = [];
  try {
    const publishedContents = await findAllPublishedContentSlugsAndTypes();
    contentItems = publishedContents.map((item) => {
      const path = item.type === "news" ? "/noticias" : "/conteudo-tecnico";
      return {
        url: `${baseUrl}${path}/${item.slug}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error generating sitemap content items:", error);
  }

  let classifiedItems: Array<{ url: string; lastModified: Date; changeFrequency: "weekly"; priority: number }> = [];
  try {
    const publishedClassifieds = await findAllPublishedClassifiedSlugs();
    classifiedItems = publishedClassifieds.map((item) => {
      return {
        url: `${baseUrl}/classificados/${item.slug}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Error generating sitemap classified items:", error);
  }

  let podcastItems: Array<{ url: string; lastModified: Date; changeFrequency: "weekly"; priority: number }> = [];
  try {
    const publishedPodcasts = await findAllPublishedPodcastSlugs();
    podcastItems = publishedPodcasts.map((item) => {
      return {
        url: `${baseUrl}/podcast/${item.slug}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Error generating sitemap podcast items:", error);
  }

  return [...staticPages, ...contentItems, ...classifiedItems, ...podcastItems];
}
