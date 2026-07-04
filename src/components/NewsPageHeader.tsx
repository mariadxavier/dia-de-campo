import { BreadcrumbItem } from './Breadcrumb';
import PageHeader from './PageHeader';

export default function NewsPageHeader() {
  const BREADCRUMB: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Notícias' }];

  return (
    <PageHeader
      title="Notícias do Hortifruti"
      breadcrumb={BREADCRUMB}
      description="Fique por dentro das principais notícias sobre abastecimento, produção agrícola, logística, comercialização, sustentabilidade e inovação no agronegócio brasileiro."
      hasSearch
    />
  );
}
