import Link from 'next/link';
import Image from './Image';
import { ContentItemRow } from '@/src/types';
import { getCategoryBadgeColor } from '@/src/helpers/NewsPageData';

type NewsArticleRowProps = {
  article: ContentItemRow;
};

export default function NewsArticleRow({ article }: NewsArticleRowProps) {
  const categoryName = article.categories?.name ?? 'Notícia';
  const badgeColor = getCategoryBadgeColor(categoryName);

  return (
    <Link href={`/noticias/${article.slug}`} className="block group shadow-md rounded-xl overflow-hidden bg-white md:h-full">
      <article className="flex flex-row items-start gap-3 p-3 md:flex-col md:items-stretch md:gap-0 md:p-0 md:h-full">
        <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0 md:w-full md:h-48 md:rounded-none">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0 md:p-5 md:gap-3 md:justify-between">
          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full text-(--color-white) w-fit tracking-wide md:text-xs"
              style={{ backgroundColor: `var(${badgeColor})` }}
            >
              {categoryName.toLocaleUpperCase()}
            </span>

            <h3 className="text-sm font-bold text-(--color-dark-blue) leading-snug line-clamp-2 group-hover:text-(--color-green) transition-colors md:text-base md:font-extrabold md:leading-normal">
              {article.title}
            </h3>

            {article.short_description && (
              <p className="hidden md:block text-sm text-(--color-gray) leading-relaxed line-clamp-2 font-normal mt-1">
                {article.short_description}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
