import {
  NewsDetailContent,
  NewsDetailCoverImage,
  NewsDetailHeader,
  NewsDetailRecommendations,
} from '@/src/components';
import { getNewsBySlug } from '@/src/server/services/newsService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsDetail = await getNewsBySlug(slug);

  if (!newsDetail) {
    return notFound();
  }

  return (
    <>
      <NewsDetailHeader
        slug={slug}
        title={newsDetail.title}
        shortDescription={newsDetail.shortDescription}
        author={newsDetail.author}
        category={newsDetail.categoryName}
        releaseDate={newsDetail.publishedAt}
      />
      <NewsDetailCoverImage
        imgUrl={newsDetail.coverImage}
        imgAlt={newsDetail.seoTitle || newsDetail.title}
      />
      <NewsDetailContent content={newsDetail.content} />
      <NewsDetailRecommendations />
    </>
  );
}
