import {
  NewsAuthorInfo,
  NewsDetailContent,
  NewsDetailCoverImage,
  NewsDetailHeader,
  NewsDetailRecommendations,
  NewsReferences,
} from '@/src/components';
import AdBanner from '@/src/components/AdBanner';
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
      <div className='flex flex-col gap-4 py-6 px-4 w-full lg:grid lg:px-12 xl:px-18 lg:grid-cols-3 xl:grid-cols-4 lg:items-start justify-center'>
        <NewsDetailContent content={content.content} className='lg:col-span-2 xl:col-span-3' />
        <div className='flex flex-col md:flex-row lg:flex-col gap-4 justify-center w-full lg:col-span-1'>
          <NewsAuthorInfo author={content.author} biography={'Equipe editorial especializada em mercado, produção e serviços para o hortifruti brasileiro.'} href={'/noticias'} />
          <NewsReferences references={content.source} />
        </div>
      </div>

      {contentList &&
        <NewsDetailRecommendations recommended={contentList} />}
      <AdBanner position="footer" />
    </>
  );
}
