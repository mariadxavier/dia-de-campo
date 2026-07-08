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
      <div className='flex flex-col gap-4 py-6 px-4 w-full lg:grid lg:px-12 xl:px-18 lg:grid-cols-3 xl:grid-cols-4 lg:items-start justify-center'>
        <NewsDetailContent content={newsDetail.content} className='lg:col-span-2 xl:col-span-3' />
        <div className='flex flex-col md:flex-row lg:flex-col gap-4 justify-center w-full lg:col-span-1'>
          <NewsAuthorInfo author={newsDetail.author} biography={'Equipe editorial especializada em mercado, produção e serviços para o hortifruti brasileiro.'} href={'/noticias'} />
          <NewsReferences references={newsDetail.source} />
        </div>
      </div>
      {newsList &&
        <NewsDetailRecommendations recommended={newsList} />}
      <AdBanner position="footer" />
    </>
  );
}
