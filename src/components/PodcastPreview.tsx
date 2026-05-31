import FeaturedContent from '../helpers/FeaturedContent';
import { Article, LinkButton, PodcastSimpleViewer } from '@/src/components';

export default function PodcastPreview() {
  const podcastHighlight = FeaturedContent.getHighlightPodcast();
  const podcastHighlightList = FeaturedContent.getHighlightPodcastList();
  return (
    <>
      {podcastHighlight && (
        <Article
          key={''}
          title={podcastHighlight.description}
          link={podcastHighlight.link}
          badge={`${podcastHighlight.episode} - DESTAQUE`}
          coverType={'podcast'}
          src={podcastHighlight.embedUrl}
          embedKind={podcastHighlight.embedKind}
          themeColor="--color-yellow"
          footnote={`${podcastHighlight.author}`}
          bgColor="--color-urain-blue"
        />
      )}
      {podcastHighlightList &&
        podcastHighlightList.map((podcast, idx) => (
          <PodcastSimpleViewer key={idx} podcast={podcast} />
        ))}
      <LinkButton href='/podcast' className='flex items-center justify-center p-3.5 rounded-full bg-(--color-yellow) text-(--color-dark-green)'>
        <p>Ver todos os episódios →</p>
      </LinkButton>
    </>
  );
}
