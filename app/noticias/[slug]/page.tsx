import {
  NewsDetailContent,
  NewsDetailCoverImage,
  NewsDetailHeader,
  NewsDetailRecommendations,
} from '@/src/components';
import { generateContentMetadata } from '@/src/helpers/BuildSeoMetadata';
import { getNewsByCategory, getNewsBySlug } from '@/src/server/services/newsService';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateContentMetadata(() => getNewsBySlug(slug));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsDetail = await getNewsBySlug(slug);
  if (!newsDetail) {
    return notFound();
  }

  const newsList = await getNewsByCategory(newsDetail.categoryName, 3, 0);

  return (
    <>
      <NewsDetailHeader
        type='news'
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
      <div className='flex flex-col items-center'>
        <NewsDetailContent content={newsDetail.content} />
      </div>
      {newsList &&
        <NewsDetailRecommendations recommended={newsList} />}
    </>
  );
}
