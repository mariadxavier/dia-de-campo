'use client';
import { BreadcrumbItem } from './Breadcrumb';
import NewsPageData from '@/src/helpers/NewsPageData';
import PageHeader from './PageHeader';

export default function NewsPageHeader() {
  const BREADCRUMB: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Notícias' }];
  const searchTags = NewsPageData.getSearchTags();
  const handleSearch = (query: string) => {
    // TODO: LIDAR COM BUSCA
  }

  return (
    <PageHeader
      title="Notícias do Hortifruti"
      breadcrumb={BREADCRUMB}
      description="Fique por dentro das principais notícias sobre abastecimento, produção agrícola, logística, comercialização, sustentabilidade e inovação no agronegócio brasileiro."
      handleSearch={handleSearch}
      hasSearch
      searchTags={searchTags}
    />
  );
}
