import { EmptyList, NewsArticleRow, NewsFeaturedCard } from '@/src/components';
import type { NewsListItem } from '@/src/types';

export default function NewsList({ newsList }: { newsList: NewsListItem[] }) {
  const featuredCard = newsList[0];
  const articles = newsList.slice(1);

  return (
    <section className="flex flex-col w-full gap-4 md:gap-8 py-9 px-5 md:p-8">
      {newsList.length > 0 ? (
        <>
        <NewsFeaturedCard article={featuredCard} />
        <div className='flex flex-col gap-4 md:gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {articles.map((article) => (
            <NewsArticleRow
              key={article.id}
              article={article}
            />
          ))}
        </div>
        </>
        
      ) : (
        <EmptyList />
      )}
    </section>
  );
}
