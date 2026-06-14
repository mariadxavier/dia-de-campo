import {
  NewsDetailContent,
  NewsDetailCoverImage,
  NewsDetailHeader,
  NewsDetailRecommendations,
} from '@/src/components';
import { generateContentMetadata } from '@/src/helpers/BuildSeoMetadata';
import { getTechnicalContentByCategory, getTechnicalContentBySlug } from '@/src/server/services/technicalContentService';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateContentMetadata(() => getTechnicalContentBySlug(slug));
}

export default async function TechnicalContentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getTechnicalContentBySlug(slug);
  if (!content) {
    return notFound();
  }
  
  const contentList = await getTechnicalContentByCategory(content.categoryName, 3, 0);

  return (
    <>
      <NewsDetailHeader
        type="technical"
        slug={slug}
        title={content.title}
        shortDescription={content.shortDescription}
        author={content.author}
        category={content.categoryName}
        releaseDate={content.publishedAt}
      />
      <NewsDetailCoverImage
        imgUrl={content.coverImage}
        imgAlt={content.seoTitle || content.title}
      />
      <NewsDetailContent content={content.content} />
      {contentList &&
        <NewsDetailRecommendations recommended={contentList} />}
    </>
  );
}
