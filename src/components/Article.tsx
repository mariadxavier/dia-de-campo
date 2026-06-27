import Link from 'next/link';
import Image from './Image';
import { Chip, PodcastAudioPlayer } from '@/src/components';

type ArticleProps = {
  title: string;
  link: string;
  coverType: 'podcast' | 'image';
  src: string;
  mediaTitle?: string;
  badge: string | string[];
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
  mediaTitle,
  badge,
  bgColor = '--color-white',
  themeColor = '--color-green',
  footnote,
  className,
}: ArticleProps) {
  return (
    <Link href={link}>
      <article className={`flex flex-col rounded-xl shadow-md ${className} md:h-[380px] md:min-w-[232px] bg-(${bgColor})`}>
        {coverType === 'image' && (
          <Image
            src={src}
            alt={title}
            width={328}
            height={140}
            className="rounded-t-xl w-full md:min-h-[160px]"
          />
        )}

        {coverType === 'podcast' && src && (
          <PodcastAudioPlayer
            embedUrl={src}
            mediaTitle={mediaTitle}
            className="bg-(--color-gray) w-full rounded-xl"
          />
        )}

        <div className={`flex flex-col gap-2.5 md:gap-3 md:h-full p-4 bg-(${bgColor}) rounded-b-xl`}>
          {Array.isArray(badge) ? (
            badge.map((b, i) => <Chip key={i} text={b} badgeColor={themeColor} textColor={bgColor} />)
          ) : (
            <Chip text={badge} badgeColor={themeColor} textColor={bgColor} />
          )}
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
