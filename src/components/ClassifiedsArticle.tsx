import { ClassifiedListItem } from '../types';
import { Formatter } from '../util/Formatter';

type ClassifiedsArticleProps = {
  classified: ClassifiedListItem;
};

export default function ClassifiedsArticle({ classified }: ClassifiedsArticleProps) {
  return (
    <article className="cursor-pointer flex flex-col gap-2.5 p-4 w-full rounded-lg border-t-3 border-(--color-green) shadow-md md:h-[240px] md:justify-between md:min-w-[280px]" onClick={() => window.location.href = `/classificados?anuncio=${classified.slug}`}>
      <h3 className="text-(--color-dark-green)">{classified.title}</h3>
      <div className="flex gap-2 text-xs md:flex-col">
        <p className="text-(--color-gray)">
          📍 {classified.city}, {classified.state}
        </p>
        <p className="text-(--color-green) font-bold md:text-sm">{Formatter.currency(classified.price)}</p>
      </div>
    </article>
  );
}
