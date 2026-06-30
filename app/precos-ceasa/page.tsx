import { BreadcrumbItem, CeasaCotation, CeasaSelection } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import { buildSeoMetadata } from "@/src/helpers/BuildSeoMetadata";
import { listCeasaNames, listCeasaPrices, listCeasaPricesByCeasaNameAndProductSlug, listCeasaProductNames } from "@/src/server/services/ceasaPricesService";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<{
    ceasa?: string;
    produto?: string;
    page?: string;
  }>;
};

export async function generateMetadata() {
  const content = {
    title: 'Preços CEASA',
    seo_title: 'Preços CEASA Atualizados | Cotações Hortigranjeiras',
    seo_description: 'Monitore os preços CEASA e acompanhe diariamente as cotações dos principais produtos hortigranjeiros comercializados no país.',
    canonical_url: '/precos-ceasa',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function CeasaPricesPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const ceasaName = cookieStore.get("selected-ceasa")?.value;
  const { ceasa, produto } = await searchParams;
  const ceasaSelection = ceasa || ceasaName || 'Todas as centrais';
  const branches = await listCeasaNames();
  const products = await listCeasaProductNames(ceasaSelection);
  const finalProducts = [{ product_name: 'Todos os Produtos', product_slug: 'all' }, ...products]
  const finalBranches = ['Todas as centrais', ...branches];
  const prices = produto ? await listCeasaPricesByCeasaNameAndProductSlug(210, 0, ceasaSelection, produto) : await listCeasaPrices(210, 0, ceasaSelection);
  const BREADCRUMB: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Preços CEASA", href: "/precos-ceasa" }
  ];

  return (
    <div className="border-t-4 border-(--color-yellow)">
      <PageHeader
        breadcrumb={BREADCRUMB}
        title="Preços CEASA"
        description="Monitore os preços CEASA e acompanhe diariamente as cotações dos principais produtos hortigranjeiros comercializados no país."
        hasSearch
        searchPlaceholder="Buscar produto, ex: abacate"
      />
      <div className="flex flex-col md:flex-row gap-5 py-5 lg:max-w-2/3">
        <CeasaSelection items={finalBranches} selectedItem={ceasaSelection} searchParam="ceasa" label="Selecione a central" />
        <CeasaSelection items={finalProducts} selectedItem={produto || 'all'} searchParam="produto" label="Selecione o produto" />
      </div>
      <CeasaCotation ceasaName={ceasaSelection} items={prices} />
    </div>

  );
}
