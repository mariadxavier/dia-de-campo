import NewsPageData from '../helpers/NewsPageData';
import { NewsArticleRow, NewsFeaturedCard } from '@/src/components';

export default function NewsList() {
  const articles = NewsPageData.getArticles();
  return (
    <section className="flex flex-col gap-4 md:gap-8 py-9 px-5 md:p-8">
      <NewsFeaturedCard />
      <div className='flex flex-col gap-4 md:gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {articles.map((article) => (
          <NewsArticleRow
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}
