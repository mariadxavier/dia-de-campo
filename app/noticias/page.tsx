import {
  NewsFilterTabs,
  NewsHighlights,
  NewsList,
  NewsPagination,
} from '@/src/components';

export default function NewsPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-(--color-white-shell)">
      <NewsHighlights />
      <NewsFilterTabs />
      <NewsList />
      <NewsPagination />
    </div>
  );
}
