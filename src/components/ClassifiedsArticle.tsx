import { ClassifiedListItem } from '../types';
import { Formatter } from '../util/Formatter';

type ClassifiedsArticleProps = {
  key: string | number;
  classified: ClassifiedListItem;
};
export default function ClassifiedsArticle({ key, classified }: ClassifiedsArticleProps) {
  return (
    <article className="flex flex-col gap-2.5 p-4 w-full rounded-lg border-t-3 border-(--color-green) shadow-md">
      <h3 className="text-(--color-dark-green)">{classified.title}</h3>
      <div className="flex gap-2 text-xs">
        <p className="text-(--color-gray)">
          📍 {classified.city}, {classified.state}
        </p>
        <p className="text-(--color-green) font-bold">{Formatter.currency(classified.price)}</p>
      </div>
    </article>
  );
}
