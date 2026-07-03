import {
  NewsFilterTabs,
  NewsList,
  Pagination,
  TechnicalContentPageHeader
} from '@/src/components';
import AdBanner from '@/src/components/AdBanner';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';
import { countTechnicalContent, getTechnicalContentCategoryCounts, listTechnicalContentFiltered } from '@/src/server/services/technicalContentService';
import { ContentPeriod } from '@/src/types';

export async function generateMetadata() {
  const content = {
    title: 'Conteúdo Técnico',
    seo_title: 'Conteúdo Técnico Especializado | Portal Dia de Campo',
    seo_description: 'Acesse conteúdos técnicos especializados, estudos de mercado e informações estratégicas para apoiar decisões e impulsionar resultados no setor hortigranjeiro.',
    canonical_url: new URL("/conteudo-tecnico", process.env.NEXT_PUBLIC_APP_URL ?? "https://portaldiadecampo.com.br").toString(),
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function TechnicalContentPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const VALID_PERIODS: ContentPeriod[] = ['hoje', 'esta-semana', 'este-mes', 'tudo'];
  const params = await searchParams;
  const pageStr = params?.page;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rawCategory = typeof params?.category === 'string' ? params.category : 'todos';
  const rawPeriod = typeof params?.period === 'string' ? params.period : 'tudo';

  const activeCategory = rawCategory || 'todos';
  const activePeriod: ContentPeriod = VALID_PERIODS.includes(rawPeriod as ContentPeriod)
    ? (rawPeriod as ContentPeriod)
    : 'tudo';

  const [technicalContent, totalCount, categoryList] = await Promise.all([
    listTechnicalContentFiltered(ITEMS_PER_PAGE, offset, activeCategory, activePeriod),
    countTechnicalContent(),
    getTechnicalContentCategoryCounts(activePeriod),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center bg-(--color-white-shell)">
      <TechnicalContentPageHeader />
      <AdBanner position="header" />
      <NewsFilterTabs
        totalResults={totalCount}
        categoryList={categoryList}
        activeCategory={activeCategory}
        activePeriod={activePeriod}
      />
      <NewsList newsList={technicalContent} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <AdBanner position="footer" />
    </div>
  );
}
