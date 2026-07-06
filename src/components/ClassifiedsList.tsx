import { ClassifiedListItem } from '../types';
import ClassifiedsPageArticle from './ClassifiedsPageArticle';
import EmptyList from './EmptyList';

export default function ClassifiedsList({
  classifieds,
  totalCount,
}: {
  classifieds: ClassifiedListItem[];
  totalCount: number;
}) {
  return (
    <section className="flex flex-col w-full gap-4 md:gap-8 py-9 px-5 md:p-8 lg:px-18">
      <div className='flex flex-col gap-1 md:flex-row md:justify-between'>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl text-(--color-dark-blue) lg:text-4xl">Anúncios em destaque</h1>
          <p className="text-(--color-gray) text-sm lg:text-base">
            Itens e oportunidades selecionados
          </p>
        </div>
        <div
          className={
            'rounded-lg w-fit p-2 lg:p-4 mt-2 font-bold flex justify-center items-center bg-(--color-white-shell) text-(--color-dark-green) border border-(--color-light-gray)'
          }
        >{`${totalCount} anúncios ativos no total`}</div>

      </div>
      {classifieds.length > 0 ? (
        <div className="flex flex-col gap-4 md:gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {classifieds.map((article) => (
            <ClassifiedsPageArticle key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
    </section>
  );
}
