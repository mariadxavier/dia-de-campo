'use client';
import { BreadcrumbItem } from './Breadcrumb';
import NewsPageData from '@/src/helpers/NewsPageData';
import PageHeader from './PageHeader';

export default function NewsPageHeader() {
  const BREADCRUMB: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Notícias' }];
  const searchTags = NewsPageData.getSearchTags();
  function handleSearch() {
    // TODO: LIDAR COM BUSCA
  }
  
  return (
    <PageHeader
      title="Notícias do Hortifruti"
      breadcrumb={BREADCRUMB}
      description="Cobertura editorial sobre mercado, produção, pragas, clima e tecnologia no hortifruti."
      handleSearch={handleSearch}
      hasSearch
      searchTags={searchTags}
    />
  );
}
