import {
  CeasaPreview,
  // ClassifiedsPreview,
  HomeHighlights,
  HomeSection,
  NewsPreview,
  PartnerPreview,
  PodcastPreview,
  TechnicalContentPreview,
} from '@/src/components';
import UserLocation from '@/src/components/UserLocation';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';
import FeaturedContent from '@/src/helpers/FeaturedContent';
import { listCeasaPrices } from '@/src/server/services/ceasaPricesService';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const content = {
    title: 'Portal Dia de Campo',
    seo_title: 'Portal Dia de Campo | Informação Estratégica para o Mercado Hortigranjeiro',
    seo_description: 'O Portal Dia de Campo conecta produtores, atacadistas, centrais de abastecimento e profissionais do setor hortigranjeiro com notícias, conteúdo técnico, análises de mercado, podcasts e indicadores estratégicos.',
    canonical_url: 'https://portaldiadecampo.com.br/',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function Home() {
  const heroItems = await FeaturedContent.getHomeHeros();
  const featuredNews = await FeaturedContent.getNews();
  const podcastList = await FeaturedContent.getPodcasts();
  const mainPodcast = await FeaturedContent.getMainPodcast();
  // const featuredClassifieds = await FeaturedContent.getClassifieds();
  const technicalContent = await FeaturedContent.getTechnicalContent();
  const cookieStore = await cookies();
  const ceasaName = cookieStore.get("selected-ceasa")?.value;
  const ceasaItems = await listCeasaPrices(7, 0, ceasaName ?? "Todas as centrais");

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <UserLocation />
      <HomeHighlights heroItems={heroItems} />
      <HomeSection
        sectionTitle="Últimas do Mercado"
        sectionLink="/noticias"
        sectionSubtitle="Cobertura editorial do setor"
        sectionLinkTitle="Ver todas as notícias"
        enableAutoScroll
      >
        <NewsPreview articles={featuredNews} />
      </HomeSection>
      <HomeSection
        sectionTitle="Preços CEASA"
        sectionLink="/precos-ceasa"
        sectionLinkTitle="Ver preços por região"
        sectionSubtitle="Atualizado diariamente • CEASA-MG / SP / RJ"
        bgColor="--color-light-green"
      >
        <CeasaPreview ceasaItems={ceasaItems} />
      </HomeSection>
      <HomeSection
        sectionLink="/podcast"
        sectionLinkTitle="Ver todos os episódios"
        sectionTitle="Podcasts"
        sectionSubtitle="Entrevistas com especialistas do agro"
        bgColor="--color-bg-blue"
        sectionColor="--color-yellow"
      >
        <PodcastPreview mainPodcast={mainPodcast} podcastList={podcastList} />
      </HomeSection>
      {/* <HomeSection
        sectionTitle="Classificados"
        sectionLink="/classificados"
        sectionSubtitle="Compra, venda e oportunidades"
        sectionLinkTitle="Ver todos os classificados"
        enableAutoScroll
      >
        <ClassifiedsPreview featuredClassifieds={featuredClassifieds} />
      </HomeSection> */}
      <HomeSection
        sectionTitle="Conteúdo Técnico"
        sectionLink="/conteudo-tecnico"
        sectionSubtitle="Guias, artigos e materiais de apoio"
        sectionLinkTitle="Ver biblioteca completa"
        bgColor="--color-light-green"
        enableAutoScroll
      >
        <TechnicalContentPreview technicalContent={technicalContent} />
      </HomeSection>

      <PartnerPreview />
    </div>
  );
}
