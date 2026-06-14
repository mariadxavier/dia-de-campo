import {
  NewsFilterTabs,
  NewsList,
  NewsPagination,
  NewsPageHeader
} from '@/src/components';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';
import { countNews, listNews } from '@/src/server/services/newsService';

export async function generateMetadata() {
  const content = {
    title: 'Notícias',
    seo_title: 'Notícias - Portal Dia de Campo',
    seo_description: 'Fique por dentro das últimas notícias do agronegócio com o Portal Dia de Campo. Atualizações diárias, tendências de mercado e conteúdo técnico especializado para impulsionar o seu negócio.',
    canonical_url: '/noticias',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pageStr = searchParams?.page;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const [news, totalCount] = await Promise.all([
    listNews(ITEMS_PER_PAGE, offset),
    countNews(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-(--color-white-shell)">
      <NewsPageHeader />
      <NewsFilterTabs totalResults={totalCount} />
      <NewsList newsList={news} />
      <NewsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
