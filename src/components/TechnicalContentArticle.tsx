import Link from 'next/link';
import { TechnicalContentListItem } from '../types';
import { Image } from '@/src/components';

type TechnicalContentArticleProps = {
  content: TechnicalContentListItem;
};
export default function TechnicalContentArticle({ content }: TechnicalContentArticleProps) {
  return (
    <Link href={content.link}>
      <article className="flex lg:flex-col gap-3 p-3 lg:p-0 lg:gap-0 rounded-lg bg-(--color-white) items-center lg:items-start lg:h-[456px]">
        <Image
          src={content.coverImage}
          width={600}
          height={296}
          alt={content.title}
          className="rounded-md lg:rounded-b-none w-[64px] h-[64px] lg:w-full lg:h-[296px]"
        />
        <div className="flex flex-col gap-1.5 text-xs lg:p-5 lg:gap-2.5">
          <p className="w-fit flex items-center justify-center py-1 px-2 text-(--color-green) bg-(--color-light-green) rounded-full font-bold text-[10px]">
            {content.categoryName?.toLocaleUpperCase()}
          </p>
          <h3 className="font-bold lg:text-sm text-(--color-dark-green) line-clamp-2">{content.title}</h3>
          <p className="text-(--color-gray)">{`📅 Atualizado em ${content.publishedAt}`}</p>
        </div>
      </article>
    </Link>
  );
}
