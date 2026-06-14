import Link from 'next/link';
import Image from './Image';
import {
  getCategoryBadgeColor,
  formatPublishedDate,
} from '@/src/helpers/NewsPageData';
import Chip from './Chip';
import Button from './Button';
import type { NewsListItem, TechnicalContentListItem } from '@/src/types';

export default function NewsFeaturedCard({ article }: { article: NewsListItem | TechnicalContentListItem }) {
  const categoryName = article.categoryName ?? 'Notícia';
  const badgeColor = getCategoryBadgeColor(categoryName);
  const readTime = '5';

  return (
    <Link href={`/${article.type === 'news' ? 'noticias' : 'conteudo-tecnico'}/${article.slug}`} className="block group">
      <article className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-(--color-white) shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-full md:w-2/3 lg:max-h-[400px] xl:w-1/2 aspect-[16/10] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            width={600}
            height={400}
            className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <Chip text="Destaque" badgeColor="--color-yellow" />
            <Chip text={categoryName} badgeColor={badgeColor} />
          </div>

          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-(--color-dark-blue) leading-snug group-hover:text-(--color-green) transition-colors">
            {article.title}
          </h2>

          <p className="text-sm text-(--color-gray) leading-relaxed line-clamp-3">
            {article.shortDescription}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-(--color-gray) pt-1">
            <span>{formatPublishedDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{readTime} min</span>
          </div>
          <Button
            title={`Ler ${article.type === 'news' ? 'matéria completa' : 'artigo completo'} →`}
            className="hidden md:block bg-(--color-green) w-fit rounded-full text-(--color-white) py-2.5 px-5 text-xs"
          />
        </div>
      </article>
    </Link>
  );
}
