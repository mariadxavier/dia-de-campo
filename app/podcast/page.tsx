import { FeaturedPodcastSection, Pagination, PodcastList, PodcastPageHero } from "@/src/components";
import { buildSeoMetadata } from "@/src/helpers/BuildSeoMetadata";
import { countPodcastEpisodes, listPodcastEpisodes } from "@/src/server/services/podcastService";

export async function generateMetadata() {
  const content = {
    title: 'Podcasts',
    seo_title: 'Podcasts do Agronegócio e Abastecimento | Portal Dia de Campo',
    seo_description: 'Ouça especialistas discutindo inovação, tecnologia, abastecimento, gestão e os principais desafios e oportunidades do agronegócio brasileiro.',
    canonical_url: 'https://portaldiadecampo.com.br/podcast',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}
export default async function PodcastPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const ITEMS_PER_PAGE = 6;
  const pageStr = searchParams?.page;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const [episodes, totalCount] = await Promise.all([
    listPodcastEpisodes(ITEMS_PER_PAGE, offset),
    countPodcastEpisodes(),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const FEATURED_EPISODE = episodes[0];
  const episodeList = episodes.slice(1);
  
  return (
    <div className="flex flex-col flex-1 bg-(--color-dark-blue) pb-10 md:pb-16">
      <PodcastPageHero
        featuredEpisode={FEATURED_EPISODE}
        stats={{
          totalEpisodes: totalCount.toString(),
          avgDuration: "42 min",
          perWeek: "1x",
        }}
      />
      <FeaturedPodcastSection featuredEpisode={FEATURED_EPISODE} />
      <PodcastList episodeList={episodeList} />
      <Pagination currentPage={currentPage} totalPages={totalPages} colorTheme="--color-yellow"/>
    </div>
  );
}