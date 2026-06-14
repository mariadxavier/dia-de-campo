import {
  NewsFilterTabs,
  NewsList,
  NewsPagination,
  TechnicalContentPageHeader
} from '@/src/components';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';
import { countTechnicalContent, listTechnicalContent } from '@/src/server/services/technicalContentService';

export async function generateMetadata() {
  const content = {
    title: 'Conteúdo Técnico',
    seo_title: 'Conteúdo Técnico - Portal Dia de Campo',
    seo_description: 'Fique por dentro do conteúdo técnico do agronegócio com o Portal Dia de Campo. Atualizações diárias, tendências de mercado e conteúdo técnico especializado para impulsionar o seu negócio.',
    canonical_url: '/conteudo-tecnico',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function TechnicalContentPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pageStr = searchParams?.page;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const [technicalContent, totalCount] = await Promise.all([
    listTechnicalContent(ITEMS_PER_PAGE, offset),
    countTechnicalContent(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center bg-(--color-white-shell)">
      <TechnicalContentPageHeader />
      <NewsFilterTabs totalResults={totalCount} />
      <NewsList newsList={technicalContent} />
      <NewsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
