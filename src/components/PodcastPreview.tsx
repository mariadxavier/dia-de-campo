import FeaturedContent from '../helpers/FeaturedContent';
import { Article, LinkButton, PodcastSimpleViewer } from '@/src/components';

export default function PodcastPreview() {
  const podcastHighlight = FeaturedContent.getHighlightPodcast();
  const podcastHighlightList = FeaturedContent.getHighlightPodcastList();
  return (
    <div className='flex flex-col items-center w-full m-auto max-w-[480px] lg:max-w-none lg:items-start gap-5 lg:gap-8 lg:flex-row'>

      {podcastHighlight && (
        <Article
          title={podcastHighlight.description}
          link={podcastHighlight.link}
          badge={`${podcastHighlight.episode} - DESTAQUE`}
          coverType={'podcast'}
          src={podcastHighlight.embedUrl}
          embedKind={podcastHighlight.embedKind}
          themeColor="--color-yellow"
          footnote={`${podcastHighlight.author}`}
          bgColor="--color-urain-blue"
          className={'sm:min-w-[380px] w-full md:max-w-[480px] xl:max-w-[640px]'}
        />
      )}
      <div className='flex flex-col gap-6 w-full'>
        {podcastHighlightList &&
          podcastHighlightList.map((podcast, idx) => (
            <PodcastSimpleViewer key={idx} podcast={podcast} />
          ))}
      </div>
      <LinkButton
        href="/podcast"
        className="md:hidden flex items-center justify-center p-3.5 rounded-full bg-(--color-yellow) text-(--color-dark-green) whitespace-nowrap shrink-0"
      >
        <p>Ver todos os episódios →</p>
      </LinkButton>
    </div>

  );
}
