import KPICard from './KPICard';
import LinkButton from './LinkButton';

export default function PartnerPreview() {
  return (
    <section className="flex flex-col py-12 px-5 gap-5 bg-(--color-green)">
      <p className="w-fit rounded-full py-1 px-3 font-bold flex items-center justify-center text-(--color-dark-green) bg-(--color-yellow)">
      📣 PARA PARCEIROS
      </p>
      <h1 className='text-(--color-white) text-3xl font-bold'>Alcance quem decide no agro brasileiro</h1>
      <p className='text-(--color-white) text-xs'>
        Mais de 50.000 produtores, distribuidores e compradores acessam nosso portal mensalmente.
      </p>
      <div className="grid grid-rows-2 grid-cols-2 gap-2.5">
        <KPICard metricDescription="Visitantes/mês" metricValue="50k+" />
        <KPICard metricDescription="Visitantes/mês" metricValue="50k+" />
        <KPICard metricDescription="Visitantes/mês" metricValue="50k+" />
        <KPICard metricDescription="Visitantes/mês" metricValue="50k+" />
      </div>
      <LinkButton href="/contato" className='text-sm rounded-full flex items-center justify-center p-3.5 text-(--color-dark-green) bg-(--color-yellow)'>
        <p>Quero anunciar</p>
      </LinkButton>
      <LinkButton href="/contato" className='text-sm rounded-full flex items-center justify-center p-3.5 bg-(--color-faded-white) text-(--color-white) border border-(--color-white)'>
        <p>Falar com o comercial</p>
      </LinkButton>
    </section>
  );
}
