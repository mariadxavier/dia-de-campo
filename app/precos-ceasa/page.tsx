import { BreadcrumbItem, CeasaBranchSelection, CeasaCotation } from "@/src/components";
// import PageHeader from "@/src/components/PageHeader";
import { buildSeoMetadata } from "@/src/helpers/BuildSeoMetadata";
import { listCeasaNames, listCeasaPrices } from "@/src/server/services/ceasaPricesService";

type Props = {
  searchParams: Promise<{
    ceasa?: string;
  }>;
};

export async function generateMetadata() {
  const content = {
    title: 'Preços CEASA',
    seo_title: 'Preços CEASA - Portal Dia de Campo',
    seo_description: 'Cotações atualizadas por central de abastecimento, produto e categoria',
    canonical_url: '/precos-ceasa',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function CeasaPricesPage({ searchParams }: Props) {
  const { ceasa } = await searchParams;
  // const prices = await listCeasaPrices(20, 0, ceasa || undefined);
  const branches = await listCeasaNames();
  // const BREADCRUMB: BreadcrumbItem[] = [
  //   { label: "Home", href: "/" },
  //   { label: "Preços CEASA", href: "/precos-ceasa" }
  // ];


  return (
    <div className="border-t-4 border-(--color-yellow)">
      {/* <PageHeader breadcrumb={BREADCRUMB} title="Preços CEASA" description="Cotações atualizadas por central de abastecimento, produto e categoria" hasSearch /> */}
      <CeasaBranchSelection branches={branches} selectedBranch={ceasa || 'CEASAMINAS - BELO HORIZONTE'} />
      <CeasaCotation />
    </div>

  );
}
