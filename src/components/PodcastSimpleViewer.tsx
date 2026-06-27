import { Image } from '@/src/components';
import PlayerIcon from '@/src/assets/icons/player-icon.svg';
import { PodcastEpisodeItem } from '../types';
import Link from 'next/link';

type PodcastSimpleViewerProps = {
  podcast: PodcastEpisodeItem;
};

export default function PodcastSimpleViewer({ podcast }: PodcastSimpleViewerProps) {
  return (
    <Link href={podcast.link}>
      <div className="flex items-center h-16 md:h-20 p-3 gap-3 rounded-lg bg-(--color-urain-blue) justify-between">
        <div className='flex items-center gap-3'>
          <p className="flex justify-center items-center w-10 h-10 bg-(--color-dark-gray) rounded-md text-(--color-yellow) font-bold text-xs">
            {podcast.episode}
          </p>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xs text-(--color-white) font-semibold">{podcast.title}</h3>
            <p className="md:hidden text-xs text-(--color-gray)">{podcast.duration}</p>
            <p className="hidden md:inline-block text-xs text-(--color-gray)">{`🎙️ ${podcast.author}`}</p>
          </div>
        </div>
        <div className='flex gap-3'>
          <p className='hidden md:flex items-center text-xs font-semibold text-(--color-yellow)'>{podcast.duration}</p>
          <Image src={PlayerIcon.src} alt="Tocar" width={32} height={32} className='md:w-9 md:h-9' />
        </div>
      </div>
    </Link>
  );
}
