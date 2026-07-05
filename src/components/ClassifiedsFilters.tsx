'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Filters from '../helpers/Filters';
import { ClassifiedCategories } from '../types';
import { UF } from '../types/Location';
import { useCallback } from 'react';

export default function ClassifiedsFilters({
  activeCategory,
  activeState,
}: {
  activeCategory: ClassifiedCategories;
  activeState: UF;
}) {
  const categories: ClassifiedCategories[] = Filters.classifiedsCategories;
  const states: UF[] = Filters.states;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildUrl = useCallback(
    (overrides: { categoria?: ClassifiedCategories; localizacao?: UF }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      if (overrides.categoria !== undefined) {
        if (overrides.categoria === 'todos') {
          params.delete('categoria');
        } else {
          params.set('categoria', overrides.categoria);
        }
      }

      if (overrides.localizacao !== undefined) {
        params.set('localizacao', overrides.localizacao);
      }

      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [searchParams, pathname],
  );

  const onCategoryChange = (value: ClassifiedCategories) => {
    router.push(buildUrl({ categoria: value }), {
      scroll: false
    });
  };

  const onStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: UF = (e.target.value) as UF;
    router.push(buildUrl({ localizacao: newValue }), {
      scroll: false
    });
  };

  return (
    <section className="flex flex-col w-full gap-4 md:gap-6 py-9 px-5 md:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl text-(--color-dark-blue)">Encontre o anúncio certo</h1>
        <p className="text-(--color-gray) text-sm lg:text-base">
          Filtre por categoria e localização.
        </p>
      </div>
      <p className="font-semibold txt-(--color-dark-blue) text-sm">Categorias</p>
      <div className="flex gap-1.5 flex-wrap">
        {categories.map((tab) => {
          const isActive = activeCategory === tab;
          return (
            <button
              key={tab}
              id={`classifieds-category-${tab}`}
              type="button"
              onClick={() => onCategoryChange(tab)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer
                ${
                  isActive
                    ? 'bg-(--color-green) text-(--color-white)'
                    : 'border border-(--color-gray)/30 text-(--color-dark-gray) hover:border-(--color-green) hover:text-(--color-green)'
                }
              `}
            >
              {tab.toLocaleUpperCase()}
            </button>
          );
        })}
      </div>
      <p className="font-semibold txt-(--color-dark-blue) text-sm">Localização</p>
      <div className="cursor-pointer bg-(--color-light-green) w-fit px-4 py-2 border border-(--color-green) rounded-full text-(--color-green)">
        <select
          className="cursor-pointer w-full border-none font-semibold text-[13px] outline-none"
          value={activeState}
          onChange={onStateChange}
        >
          {states &&
            states.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
    </section>
  );
}
