import {
  AdBanner,
  CeasaPreview,
  HomeHighlights,
  HomeSection,
  NewsPreview,
  PodcastPreview,
} from "@/src/components";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <HomeHighlights />
      <HomeSection
        sectionTitle="Notícias e conteúdo técnico"
        sectionLink="/noticias"
        hasDivisor
      >
        <NewsPreview />
      </HomeSection>
      <AdBanner refSection="mid-content" />
      <HomeSection
        sectionTitle="Preços CEASA & Mercado"
        sectionLink="/precos-ceasa"
        hasDivisor={false}
        bgColor="--color-white-shell"
      >
        <CeasaPreview />
      </HomeSection>
      <HomeSection sectionTitle="Agro podcast" hasDivisor>
        <div className="flex w-full gap-4 justify-between">
          <PodcastPreview />
          <div className="w-1/3">
            <AdBanner refSection="sidebar" />
          </div>
        </div>
      </HomeSection>
    </div>
  );
}
