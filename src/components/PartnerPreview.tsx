import Link from 'next/link';
import KPICard from './KPICard';

export default function PartnerPreview() {
  return (
    <section className="flex flex-col md:flex-row w-full py-12 px-5 gap-5 md:gap-16 bg-(--color-green) md:px-10 md:py-20 lg:px-20 lg:py-24">
      <div className="flex flex-col gap-5 md:w-1/2">
        <p className="w-fit rounded-full py-1 px-3 font-bold flex items-center justify-center text-(--color-dark-green) bg-(--color-yellow) text-xs">
          📣 PARA PARCEIROS
        </p>
        <h1 className="text-(--color-white) text-3xl md:text-4xl font-bold">
          Alcance quem decide no agro brasileiro
        </h1>
        <p className="text-(--color-white) text-xs md:text-sm">
          Mais de 30.000 produtores, distribuidores e compradores acessam nosso portal mensalmente.
        </p>
        <Link
          href="?contato=true"
          scroll={false}
          className="hidden md:flex text-sm rounded-full items-center justify-center p-3.5 text-(--color-dark-green) bg-(--color-yellow) w-fit"
        >
          Quero anunciar
        </Link>
      </div>
      <div className="grid grid-rows-2 grid-cols-2 gap-2.5 md:w-1/2">
        <KPICard value="60+" description="Mercados atacadistas e centrais de abastecimento" />
        <KPICard value="30k+" description="Visitantes/mês" />
        <KPICard value="300+" description="Empresas e serviços cadastrados" />
        <KPICard value="100+" description="Artigos técnicos e materiais educativos" />
      </div>
      <Link
        href="?contato=true"
        scroll={false}
        className="md:hidden text-sm rounded-full flex items-center justify-center p-3.5 text-(--color-dark-green) bg-(--color-yellow)"
      >
        Quero anunciar
      </Link>
    </section>
  );
}
