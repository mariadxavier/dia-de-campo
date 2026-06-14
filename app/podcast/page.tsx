import { PodcastList, PodcastPageHero } from "@/src/components";
import { buildSeoMetadata } from "@/src/helpers/BuildSeoMetadata";
import { countPodcastEpisodes, listPodcastEpisodes } from "@/src/server/services/podcastService";

export async function generateMetadata() {
  const content = {
    title: 'Podcasts',
    seo_title: 'Podcasts - Portal Dia de Campo',
    seo_description: 'Conversas com especialistas, lideranças e produtores sobre mercado, CEASA, produção e tecnologia no campo.',
    canonical_url: '/podcast',
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}
export default async function PodcastPage() {
  const [episodes, totalCount] = await Promise.all([
    listPodcastEpisodes(6, 0),
    countPodcastEpisodes(),
  ]);
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
      <PodcastList episodeList={episodeList} />
    </div>
  );
}