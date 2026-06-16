import Link from 'next/link';
import { Breadcrumb, Chip, FeaturedEpisodeCard, KPICard } from '@/src/components';
import type { PodcastEpisodeItem } from '@/src/types';

type PodcastPageHeroProps = {
  featuredEpisode: PodcastEpisodeItem;
  stats: {
    totalEpisodes: string;
    avgDuration: string;
    perWeek: string;
  };
};

const BREADCRUMB = [{ label: 'Home', href: '/' }, { label: 'Podcast' }];

export default function PodcastPageHero({ featuredEpisode, stats }: PodcastPageHeroProps) {
  return (
    <section className="flex flex-col gap-10 items-center w-full mx-auto px-5 py-10 text-(--color-white) border-t-4 border-(--color-yellow) md:px-10 lg:px-16 md:py-14 lg:py-18 lg:flex-row lg:gap-16 xl:gap-26">
      <div className="lg:w-3/5 flex flex-col gap-6 lg:gap-8">
        <Breadcrumb items={BREADCRUMB} />
        <Chip text="Podcast" textColor="--color-dark-blue" />

        <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight">
          Podcast Dia de Campo
        </h1>

        <p className="text-[15px] md:text-base text-(--color-light-green) leading-relaxed max-w-md">
          Conversas com especialistas, lideranças e produtores sobre mercado, CEASA, produção e
          tecnologia no campo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={featuredEpisode.link}
            className="flex items-center justify-center text-nowrap px-6 py-3.5 rounded-xl bg-(--color-yellow) text-(--color-dark-blue) font-semibold text-sm hover:brightness-95 active:scale-95 transition-all duration-150 w-full sm:w-auto"
          >
            Ouvir episódio em destaque
          </Link>
          <Link
            href="/podcast"
            className="text-nowrap flex items-center justify-center px-6 py-3.5 rounded-xl border border-(--color-gray)/30 text-(--color-white) font-semibold text-sm hover:bg-white/5 active:scale-95 transition-all duration-150 w-full sm:w-auto"
          >
            Ver todos os episódios
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-2">
          <KPICard
            value={stats.totalEpisodes}
            description="Episódios publicados"
            className="lg:min-w-[150px] border border-(--color-faded-white)"
            cardColor="--color-urain-blue"
            textColor="--color-white"
          />
          <KPICard
            value={stats.avgDuration}
            description="Tempo médio"
            className="lg:min-w-[150px] border border-(--color-faded-white)"
            cardColor="--color-urain-blue"
            textColor="--color-white"
          />
          <KPICard
            value={stats.perWeek}
            description="Novos episódios por semana"
            className="lg:min-w-[150px] border border-(--color-faded-white)"
            cardColor="--color-urain-blue"
            textColor="--color-white"
          />
        </div>
      </div>
      <div className='lg:w-2/5'>
        <FeaturedEpisodeCard episode={featuredEpisode} />
      </div>
    </section>
  );
}
