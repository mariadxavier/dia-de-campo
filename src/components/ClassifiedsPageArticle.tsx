'use client';
import { Image, Chip, Button } from '@/src/components';
import { ClassifiedListItem } from '@/src/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formatter } from '../util/Formatter';

type NewsArticleRowProps = {
  article: ClassifiedListItem;
  className?: string;
};

export default function ClassifiedsPageArticle({ article, className }: NewsArticleRowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('anuncio', article.slug);
    params.set('page', '1');
    (router.push(`?${params.toString()}`), { scroll: false });
  };

  return (
    <div
      onClick={() => handleChange()}
      className={`${className} flex-1 group shadow-md rounded-xl overflow-hidden bg-white`}
    >
      <article className="flex flex-col items-stretch">
        <Image
          src={article.coverImage}
          alt={article.title}
          width={400}
          height={300}
          className="w-full h-[150px] max-h-[150px] md:max-h-[172px] md:h-[172px] object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="flex flex-col p-3 gap-2 flex-1 min-w-0 md:p-5 md:gap-3 md:justify-between">
          <div className="flex flex-col gap-2">
            <Chip text={article.category} />
            <h3 className="text-sm font-bold text-(--color-dark-blue) leading-snug line-clamp-2 group-hover:text-(--color-green) transition-colors md:text-base md:font-extrabold md:leading-normal">
              {article.title}
            </h3>
            <p className="text-(--color-dark-green) font-bold text-xl md:text-2xl">
              {Formatter.currency(article.price)}
            </p>
            <p className="hidden md:block text-sm text-(--color-gray) leading-relaxed line-clamp-2 font-normal mt-1">
              {article.description}
            </p>
            <p className='text-(--color-gray) text-xs'>{`${article.city}, ${article.state}`}</p>
            <Button
              className={
                'rounded-lg w-[104px] h-[36px] md:w-[112px] mt-2 flex justify-center items-center bg-(--color-white-shell) text-(--color-dark-green) border border-(--color-light-gray)'
              }
              title={'Contatar'}
              onClick={handleChange}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
