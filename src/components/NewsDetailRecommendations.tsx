import NewsPageData from '../helpers/NewsPageData';
import NewsArticleRow from './NewsArticleRow';

export default function NewsDetailRecommendations() {
  const recommendedArticles = NewsPageData.getArticles().slice(0, 3);
  return (
    <section className="w-full flex flex-col px-5 py-8 gap-5 bg-(--color-white-shell) md:gap-6 md:px-10 md:py-14 lg:px-30 lg:py-24">
      <h1 className="text-(--color-dark-blue font-bold text-2xl md:text-3xl xl:text-4xl)">
        Leia também
      </h1>
      <div className=" w-full flex flex-col md:flex-row gap-5 md:gap-8">
        {recommendedArticles &&
          recommendedArticles.map((article, idx) => <NewsArticleRow key={idx} article={article} />)}
      </div>
    </section>
  );
}
