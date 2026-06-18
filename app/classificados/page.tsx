import PageHeader from "@/src/components/PageHeader";

export default function ClassifiedsPage() {
  return (
    <>
      <PageHeader title="Classificados" description="Anuncie, encontre e negocie em um só lugar" breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Classificados' }]} handleSearch={() => { }} />
    </>
  );
}
