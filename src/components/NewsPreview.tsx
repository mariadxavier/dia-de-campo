import { Article, LinkButton } from '@/src/components';
import FeaturedContent from '../helpers/FeaturedContent';
export default function NewsPreview() {
  const newsHighlights = FeaturedContent.getHighlightNews();
  return (
    <>
      {newsHighlights &&
        newsHighlights.map((news, idx) => (
          <Article
            key={idx}
            title={news.title}
            link={news.link}
            coverType="image"
            src={news.coverImage}
            badge={news.categoryName}
            footnote="10 mai 2026 • 5 min"
          />
        ))}
      <LinkButton
        href="/noticias"
        className="flex md:hidden items-center justify-center p-3.5 rounded-full bg-(--color-white-shell) text-(--color-green)"
      >
        <h3>Ver todas as notícias →</h3>
      </LinkButton>
    </>
  );
}
