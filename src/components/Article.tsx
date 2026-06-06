import Link from 'next/link';
import Image from './Image';
import { PodcastEmbedKind } from '../types';
import { Chip, PodcastAudioPlayer } from '@/src/components';

type ArticleProps = {
  title: string;
  link: string;
  coverType: 'podcast' | 'image';
  src: string;
  embedKind?: PodcastEmbedKind;
  mediaTitle?: string;
  badge: string;
  bgColor?: `--color-${string}`;
  themeColor?: `--color-${string}`;
  footnote: string;
  className?: string;
};

export default function Article({
  title,
  link,
  coverType,
  src,
  embedKind,
  mediaTitle,
  badge,
  bgColor = '--color-white',
  themeColor = '--color-green',
  footnote,
  className,
}: ArticleProps) {
  return (
    <Link href={link} className='w-full'>
      <article className={`flex flex-col rounded-xl shadow-md ${className} md:h-[380px]`}>
        {coverType === 'image' && (
          <Image
            src={src}
            alt={title}
            width={328}
            height={140}
            className="rounded-t-xl md:w-full md:min-h-[160px]"
          />
        )}

        {coverType === 'podcast' && embedKind && (
          <PodcastAudioPlayer
            src={src}
            embedKind={embedKind}
            mediaTitle={mediaTitle}
            className="bg-(--color-gray) w-full rounded-t-xl"
          />
        )}

        <div className={`flex flex-col gap-2.5 md:gap-3 md:h-full p-4 bg-(${bgColor}) rounded-b-xl`}>
          <Chip text={badge} badgeColor={themeColor} textColor={bgColor} />
          <div className='flex flex-col gap-2.5 md:gap-3 md:justify-between md:h-full'>
            <h2
              className={`text-(${themeColor === '--color-yellow' ? '--color-white' : themeColor}) font-bold text-lg/5.5 line-clamp-3`}
            >
              {title}
            </h2>
            <p className="text-xs text-(--color-gray)">{footnote}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
