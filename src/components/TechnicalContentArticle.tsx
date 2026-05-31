import Link from 'next/link';
import { TechnicalContentListItem } from '../types';
import { Image } from '@/src/components';

type TechnicalContentArticleProps = {
  key: string | number;
  content: TechnicalContentListItem;
};
export default function TechnicalContentArticle({ key, content }: TechnicalContentArticleProps) {
  return (
    <Link href={content.link}>
      <article className="flex gap-3 p-3 rounded-lg bg-(--color-white)">
        <Image src={content.coverImage} width={64} height={64} alt={content.title} className='rounded-md' />
        <div className="flex flex-col gap-1.5 text-xs">
          <p className="w-fit flex items-center justify-center py-1 px-2 text-(--color-green) bg-(--color-light-green) rounded-full font-bold">
            {content.categoryName?.toLocaleUpperCase()}
          </p>
          <h3 className='font-bold text-(--color-dark-green)'>{content.title}</h3>
          <p className='text-(--color-gray)'>{`📅 Atualizado em ${content.publishedAt}`}</p>
        </div>
      </article>
    </Link>
  );
}
