import { HomeSectionPodcast } from '../types';
import { Image } from '@/src/components';
import PlayerIcon from '@/src/assets/icons/player-icon.svg';

type PodcastSimpleViewerProps = {
  key: string | number;
  podcast: HomeSectionPodcast;
};

export default function PodcastSimpleViewer({ key, podcast }: PodcastSimpleViewerProps) {
  return (
    <div key={key} className="flex items-center p-3 gap-3 rounded-lg bg-(--color-urain-blue)">
      <p className="flex justify-center items-center w-10 h-10 bg-(--color-dark-gray) rounded-md text-(--color-yellow) font-bold text-xs">
        {podcast.episodeNumber}
      </p>
      <div className='flex flex-col gap-0.5'>
        <h3 className='text-xs text-(--color-white) font-semibold'>{podcast.title}</h3>
        <p className='text-xs text-(--color-gray)'>{podcast.duration}</p>
      </div>
      <Image src={PlayerIcon.src} alt="Tocar" width={32} height={32} />
    </div>
  );
}
