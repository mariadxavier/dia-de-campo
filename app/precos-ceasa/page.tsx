import { CeasaCotation, CeasaPageHeader, CeasaSelection } from "@/src/components";
import { buildSeoMetadata } from "@/src/helpers/BuildSeoMetadata";
import { listCeasaNames, listCeasaPrices, listCeasaPricesByCeasaNameAndProductSlug, listCeasaProductNames } from "@/src/server/services/ceasaPricesService";

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
  const { ceasa } = await searchParams;
  const { produto } = await searchParams;
  const branches = await listCeasaNames();
  const products = await listCeasaProductNames(ceasa || 'Todas as centrais');
  const finalProducts = [{ product_name: 'Todos os Produtos', product_slug: 'all' }, ...products]
  const finalBranches = ['Todas as centrais', ...branches];
  const prices = produto ? await listCeasaPricesByCeasaNameAndProductSlug(210, 0, ceasa || 'Todas as centrais', produto) : await listCeasaPrices(210, 0, ceasa || 'Todas as centrais');

  return (
    <div className="border-t-4 border-(--color-yellow)">
      <CeasaPageHeader />
      <div className="flex flex-col md:flex-row gap-5 py-5 lg:max-w-2/3">
        <CeasaSelection items={finalBranches} selectedItem={ceasa || 'Todas as centrais'} searchParam="ceasa" label="Selecione a central" />
        <CeasaSelection items={finalProducts} selectedItem={produto || 'all'} searchParam="produto" label="Selecione o produto" />
      </div>
      <CeasaCotation ceasaName={ceasa || 'AMA/BA - JUAZEIRO'} items={prices} />
    </div>

  );
}
