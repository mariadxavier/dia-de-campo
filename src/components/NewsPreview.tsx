'use client';
import { Article, LinkButton } from '@/src/components';
import NewsPageData, { getCategoryBadgeColor, formatPublishedDate } from '../helpers/NewsPageData';
import { useMediaQuery } from '../context/MediaQuery';
import { NewsListItem } from '../types';

export default function NewsPreview({ articles }: { articles: NewsListItem[] }) {
  const { isLgScreen } = useMediaQuery();

  return (
    <>
      {articles.map((news, idx) => {
        const isActive = isLgScreen && idx === 0;
        const badgeColor = getCategoryBadgeColor(news.categoryName);

        const footnoteText = isActive
          ? `${formatPublishedDate(news.publishedAt)}`
          : `${formatPublishedDate(news.publishedAt)}`;

        const cardWidthClass = isLgScreen
          ? isActive
            ? 'lg:w-[480px] lg:min-w-[480px]'
            : 'lg:w-[280px] lg:min-w-[280px]'
          : 'w-full md:w-[280px] md:min-w-[280px]';

        const articleClassName = `w-full h-full md:min-w-0 transition-all duration-500 ${
          isActive
            ? 'lg:shadow-xl [&_h2]:lg:text-2xl [&_h2]:lg:leading-snug [&_img]:lg:h-[220px]'
            : '[&_h2]:lg:text-sm [&_h2]:lg:leading-snug [&_img]:lg:h-[140px]'
        }`;

        return (
          <div
            key={news.id}
            className={`transition-all duration-500 ease-in-out shrink-0 ${cardWidthClass}`}
          >
            <Article
              title={news.title}
              link={`/noticias/${news.slug}`}
              coverType="image"
              src={news.coverImage}
              badge={news.categoryName ?? 'Notícia'}
              themeColor={badgeColor}
              footnote={footnoteText}
              className={articleClassName}
            />
          </div>
        );
      })}
      <LinkButton
        href="/noticias"
        className="flex md:hidden items-center justify-center p-3.5 rounded-full bg-(--color-white-shell) text-(--color-green)"
      >
        <h3>Ver todas as notícias →</h3>
      </LinkButton>
    </>
  );
}
