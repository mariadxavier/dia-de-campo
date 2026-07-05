import { BreadcrumbItem, ClassifiedModal, ClassifiedsFilters, ClassifiedsList, Pagination } from '@/src/components';
import AdBanner from '@/src/components/AdBanner';
import PageHeader from '@/src/components/PageHeader';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';
import { countAllClassifieds, getFullClassifiedBySlug, listClassifieds } from '@/src/server/services/classifiedsService';
import { ClassifiedCategories, ClassifiedListItem } from '@/src/types';
import { UF } from '@/src/types/Location';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export async function generateMetadata() {
  const content = {
    title: 'Conteúdo Técnico',
    seo_title: 'Classificados Agro | Negócios e Oportunidades',
    seo_description:
      'Conecte-se a novas oportunidades de negócios no agronegócio através dos Classificados do Portal Dia de Campo.',
    canonical_url: new URL(
      '/classificados',
      process.env.NEXT_PUBLIC_APP_URL ?? 'https://portaldiadecampo.com.br',
    ).toString(),
    og_image_url: '',
  };

  return buildSeoMetadata(content);
}

type Props = {
  searchParams: Promise<{
    anuncio?: string;
    categoria?: ClassifiedCategories;
    localizacao?: UF;
    page?: string;
  }>;
};

export default async function ClassifiedsPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const uf = cookieStore.get('uf')?.value;
  const resolvedSearchParams = await searchParams;
  const { page: pageStr, categoria, localizacao, anuncio } = resolvedSearchParams;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const rawCategory = typeof categoria === 'string' ? categoria : 'todos';
  const activeCategory = rawCategory || 'todos';
  const activeState = (localizacao ?? (uf as UF)) as UF;
  const breadCrumb: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Classificados' }];
  let currentClassified: ClassifiedListItem | null = null;
  if (anuncio) {
    currentClassified = await getFullClassifiedBySlug(anuncio);
  }


  const [classifieds, totalCount] = await Promise.all([
    listClassifieds(ITEMS_PER_PAGE, offset, activeCategory, activeState),
    countAllClassifieds(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  return (
    <div className="relative flex flex-col w-full flex-1 items-center justify-center bg-(--color-white-shell)">
      <PageHeader
        breadcrumb={breadCrumb}
        title="Classificados"
        description="Encontre oportunidades para compra, venda e divulgação de produtos, equipamentos, serviços e soluções voltadas ao agronegócio."
        hasSearch
      />
      <Suspense fallback={null}>
        <ClassifiedModal classifiedData={currentClassified} />
      </Suspense>
      <AdBanner position="header" />
      <ClassifiedsFilters activeCategory={activeCategory} activeState={activeState} />
      <ClassifiedsList classifieds={classifieds} totalCount={totalCount} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <AdBanner position="footer" />
    </div>
  );
}
