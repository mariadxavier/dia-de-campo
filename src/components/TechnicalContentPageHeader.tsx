'use client';
import { BreadcrumbItem } from './Breadcrumb';
import NewsPageData from '@/src/helpers/NewsPageData';
import PageHeader from './PageHeader';

export default function NewsPageHeader() {
    const BREADCRUMB: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Conteúdo Técnico' }];
    const searchTags = NewsPageData.getSearchTags();
    const handleSearch = (query: string) => {
        // TODO: LIDAR COM BUSCA
        console.log(query)
    }

    return (
        <PageHeader
            title="Conteúdo Técnico"
            breadcrumb={BREADCRUMB}
            description="Artigos, estudos, análises e materiais técnicos desenvolvidos para produtores, gestores, centrais de abastecimento e profissionais do agronegócio."
            handleSearch={handleSearch}
            hasSearch
            searchTags={searchTags}
            searchPlaceholder='Buscar artigo...'
        />
    );
}
