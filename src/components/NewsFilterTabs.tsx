'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { CategoryCount, ContentPeriod } from '../types';

type Props = {
  totalResults: number;
  categoryList: CategoryCount[];
  activeCategory: string;
  activePeriod: ContentPeriod;
};

const TIME_FILTERS: { label: string; value: ContentPeriod }[] = [
  { label: 'Hoje', value: 'hoje' },
  { label: 'Esta semana', value: 'esta-semana' },
  { label: 'Este mês', value: 'este-mes' },
  { label: 'Tudo', value: 'tudo' },
];

export default function NewsFilterTabs({
  totalResults,
  categoryList,
  activeCategory,
  activePeriod,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildUrl = useCallback(
    (overrides: { category?: string; period?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      if (overrides.category !== undefined) {
        if (overrides.category === 'todos') {
          params.delete('category');
        } else {
          params.set('category', overrides.category);
        }
      }

      if (overrides.period !== undefined) {
        if (overrides.period === 'tudo') {
          params.delete('period');
        } else {
          params.set('period', overrides.period);
        }
      }

      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [searchParams],
  );

  const onCategoryChange = (slug: string) => {
    router.push(buildUrl({ category: slug }));
  };

  const onTimeFilterChange = (value: ContentPeriod) => {
    router.push(buildUrl({ period: value }));
  };

  return (
    <div className="w-full flex flex-col gap-3 p-5 text-(--color-dark-gray)">
      <p className="text-xs md:text-sm font-semibold">{totalResults.toLocaleString('pt-BR')} notícias</p>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
        {categoryList.map((tab) => {
          const isActive = activeCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              id={`news-category-${tab.slug}`}
              type="button"
              onClick={() => onCategoryChange(tab.slug)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer
                ${isActive
                  ? 'bg-(--color-green) text-(--color-white)'
                  : 'border border-(--color-gray)/30 text-(--color-dark-gray) hover:border-(--color-green) hover:text-(--color-green)'
                }
              `}
            >
              {tab.name}
              <span className={`text-[10px] ${isActive ? 'opacity-80' : 'text-(--color-gray)'}`}>
                {tab.count.toLocaleString('pt-BR')}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 overflow-auto">
        <p className='text-xs text-(--color-gray)'>Período: </p>
        {TIME_FILTERS.map((filter) => {
          const isActive = activePeriod === filter.value;
          return (
            <button
              key={filter.value}
              id={`news-time-${filter.value}`}
              type="button"
              onClick={() => { onTimeFilterChange(filter.value); }}
              className={`
                whitespace-nowrap shrink-0 px-2.5 py-1.25 rounded-full text-[11px] transition-colors cursor-pointer text-(--color-dark-gray)
                ${isActive
                  ? 'bg-(--color-light-yellow) border border-(--color-yellow) font-semibold'
                  : 'hover:bg-(--color-light-yellow) border border-(--color-gray)'
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
