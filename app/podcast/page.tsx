import { FeaturedPodcastSection, Pagination, PodcastList, PodcastPageHero } from "@/src/components";
import AdBanner from "@/src/components/AdBanner";
import { buildSeoMetadata } from "@/src/helpers/BuildSeoMetadata";
import PodcastCalcs from "@/src/helpers/PodcastCalcs";
import { countPodcastEpisodes, findPodcastBySlug, listPodcastEpisodes } from "@/src/server/services/podcastService";

type Props = {
  searchParams: Promise<{
    episode?: string;
    page?: string;
    playing?: boolean;
  }>;
};

export async function generateMetadata() {
  const content = {
    title: 'Podcasts',
    seo_title: 'Podcasts do Agronegócio e Abastecimento | Portal Dia de Campo',
    seo_description: 'Ouça especialistas discutindo inovação, tecnologia, abastecimento, gestão e os principais desafios e oportunidades do agronegócio brasileiro.',
    canonical_url: new URL("/podcast", process.env.NEXT_PUBLIC_APP_URL ?? "https://portaldiadecampo.com.br").toString(),
    og_image_url: '',
  }

  return buildSeoMetadata(content)
}

export default async function PodcastPage({ searchParams }: Props) {
  const ITEMS_PER_PAGE = 6;
  const { episode: episodeSlug, page: pageStr } = await searchParams;
  const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let episodes: Awaited<ReturnType<typeof listPodcastEpisodes>> = [];
  let totalCount = 0;
  let featuredEpisodeResult: Awaited<ReturnType<typeof findPodcastBySlug>> = null;

  try {
    [episodes, totalCount] = await Promise.all([
      listPodcastEpisodes(ITEMS_PER_PAGE, offset),
      countPodcastEpisodes(),
    ]);

    if (episodeSlug) {
      featuredEpisodeResult = await findPodcastBySlug(episodeSlug);
    }
  } catch {
    episodes = [];
    totalCount = 0;
    featuredEpisodeResult = null;
  }

  const hasEpisodes = episodes.length > 0;
  const featuredEpisode = featuredEpisodeResult ?? (hasEpisodes ? episodes[0] : null);
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const averageDuration = PodcastCalcs.getPodcastAverageDuration(episodes);

  return (
    <div className="flex flex-col flex-1 bg-(--color-dark-blue) pb-10 md:pb-16">
      <PodcastPageHero
        featuredEpisode={featuredEpisode}
        stats={{
          totalEpisodes: totalCount.toString(),
          avgDuration: `${averageDuration} min`,
          perWeek: "1x",
        }}
      />
      <AdBanner position="mid-content" />
      {featuredEpisode && <FeaturedPodcastSection featuredEpisode={featuredEpisode} />}
      <PodcastList episodeList={episodes} />
      {totalCount > ITEMS_PER_PAGE && (
        <Pagination hasScroll={false} currentPage={currentPage} totalPages={totalPages} colorTheme="--color-yellow" />
      )}
      <AdBanner position="footer" />
    </div>
  );
}
