import Link from 'next/link';
import Image from './Image';
import { NewsListItem, TechnicalContentListItem } from '@/src/types';
import { getCategoryBadgeColor } from '@/src/helpers/NewsPageData';
import Chip from './Chip';

type NewsArticleRowProps = {
  article: NewsListItem | TechnicalContentListItem;
  className?: string;
};

export default function NewsArticleRow({ article, className }: NewsArticleRowProps) {
  const categoryName = article.categoryName ?? 'Notícia';
  const badgeColor = getCategoryBadgeColor(categoryName);

  return (
    <Link href={`${article.type === 'news' ? '/noticias' : '/conteudo-tecnico'}/${article.slug}`} className={`${className} flex-1 group shadow-md rounded-xl overflow-hidden bg-white`}>
      <article className="flex flex-row items-start gap-3 p-3 md:flex-col md:items-stretch md:gap-0 md:p-0 md:h-full">
        <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0 md:w-full md:h-48 md:rounded-none">
          <Image
            src={article.coverImage}
            alt={article.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0 md:p-5 md:gap-3 md:justify-between">
          <div className="flex flex-col gap-2">
            <Chip text={categoryName} badgeColor={badgeColor} />

            <h3 className="text-sm font-bold text-(--color-dark-blue) leading-snug line-clamp-2 group-hover:text-(--color-green) transition-colors md:text-base md:font-extrabold md:leading-normal">
              {article.title}
            </h3>

            {article.shortDescription && (
              <p className="hidden md:block text-sm text-(--color-gray) leading-relaxed line-clamp-2 font-normal mt-1">
                {article.shortDescription}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
