import {
  NewsFilterTabs,
  NewsList,
  Pagination,
  NewsPageHeader
} from '@/src/components';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';
import { countNews, listNews } from '@/src/server/services/newsService';

export async function generateMetadata() {
  const content = {
    title: 'Notícias',
    seo_title: 'Notícias do Mercado Hortigranjeiro | Portal Dia de Campo',
    seo_description: 'Atualizações diárias sobre abastecimento, produção, comercialização e tendências que impactam o mercado hortigranjeiro e o agronegócio nacional.',
    canonical_url: 'https://portaldiadecampo.com.br/noticias',
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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
