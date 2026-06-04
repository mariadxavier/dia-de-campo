import {
  CeasaPreview,
  ClassifiedsPreview,
  HomeHighlights,
  HomeSection,
  NewsPreview,
  PartnerPreview,
  PodcastPreview,
  TechnicalContentPreview,
} from '@/src/components';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <HomeHighlights />
      <HomeSection
        sectionTitle="Últimas do Mercado"
        sectionLink="/noticias"
        sectionSubtitle="Cobertura editorial do setor"
        sectionLinkTitle="Ver todas as notícias"
        enableAutoScroll
      >
        <NewsPreview />
      </HomeSection>
      <HomeSection
        sectionTitle="Preços CEASA"
        sectionLink="/precos-ceasa"
        sectionLinkTitle="Ver preços por região"
        sectionSubtitle="Atualizado diariamente • CEASA-MG / SP / RJ"
        bgColor="--color-light-green"
      >
        <CeasaPreview />
      </HomeSection>
      <HomeSection
        sectionLink="/podcast"
        sectionLinkTitle="Ver todos os episódios"
        sectionTitle="Podcasts"
        sectionSubtitle="Entrevistas com especialistas do agro"
        bgColor="--color-bg-blue"
        sectionColor="--color-yellow"
      >
        <PodcastPreview />
      </HomeSection>
      <HomeSection
        sectionTitle="Classificados"
        sectionLink="/classificados"
        sectionSubtitle="Compra, venda e oportunidades"
        sectionLinkTitle="Ver todos os classificados"
        enableAutoScroll
      >
        <ClassifiedsPreview />
      </HomeSection>
      <HomeSection
        sectionTitle="Conteúdo Técnico"
        sectionLink="/conteudo-tecnico"
        sectionSubtitle="Guias, artigos e materiais de apoio"
        sectionLinkTitle="Ver biblioteca completa"
        bgColor="--color-light-green"
        enableAutoScroll
      >
        <TechnicalContentPreview />
      </HomeSection>

      <PartnerPreview />
    </div>
  );
}
