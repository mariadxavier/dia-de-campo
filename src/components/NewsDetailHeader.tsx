import { Breadcrumb, BreadcrumbItem, Chip } from '@/src/components';
import { DateHandler } from '../util/DateHandler';

type NewsDetailHeaderProps = {
  slug: string;
  title: string;
  shortDescription: string;
  author: string;
  category: string | null;
  releaseDate: string | null;
};
export default function NewsDetailHeader({
  slug,
  title,
  shortDescription,
  author,
  category,
  releaseDate,
}: NewsDetailHeaderProps) {
  const BREADCRUMB: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Notícias',
      href: '/noticias',
    },
    {
      label: category || 'Notícia',
      href: `/noticias/${slug}`,
    },
  ];
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-4 px-5 py-8 border-b border-(--color-light-gray) md:gap-6 md:px-10 md:py-14 md:w-3/4 lg:px-30 lg:py-24">
        <Breadcrumb items={BREADCRUMB} />
        <Chip text={category || 'Notícia'} />
        <h1 className="text-3xl font-bold text-(--color-dark-blue) md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <div className="flex flex-col gap-1.5 text-xs md:text-sm">
          <p className="text-(--color-dark-gray) text-md md:text-lg">{shortDescription}</p>
          <p className="font-semibold text-(--color-dark-blue)">Por {author}</p>
          {releaseDate && (
            <p className="text-(--color-gray)">{DateHandler.formatReleaseDate(releaseDate)}</p>
          )}
        </div>
      </div>
    </section>
  );
}
