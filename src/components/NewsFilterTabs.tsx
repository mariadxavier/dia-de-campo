'use client';
import NewsPageData from '@/src/helpers/NewsPageData';
import { useState } from 'react';
import FilterIcon from '@/src/assets/icons/filter-icon.svg';
import { Image } from '@/src/components';

export default function NewsFilterTabs({ totalResults }: { totalResults: number }) {
  const categoryTabs = NewsPageData.getCategoryTabs();
  const TIME_FILTERS = [
    { label: 'Hoje', value: 'hoje' },
    { label: 'Esta semana', value: 'esta-semana' },
    { label: 'Este mês', value: 'este-mes' },
    { label: 'Tudo', value: 'tudo' },
  ];
  const [activeCategory, setActiveCategory] = useState('todos');
  const [activeTimeFilter, setActiveTimeFilter] = useState('esta-semana');

  // todo: lidar com filtros de categorias e tempo de publicação
  const onCategoryChange = (slug: string) => {
    setActiveCategory(slug);
  };
  const onTimeFilterChange = (value: string) => {
    setActiveTimeFilter(value);
  };

  return (
    <div className="w-full flex flex-col gap-3 p-5 text-(--color-dark-gray)">
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm font-semibold">{totalResults.toLocaleString('pt-BR')} notícias</p>
        <button
          id="news-filter-toggle"
          type="button"
          // todo: adicionar filtros de busca
          className="flex items-center gap-1.5 text-xs text-(--color-dark-gray) hover:bg-(--color-green) transition-colors cursor-pointer rounded-full py-1.5 px-3 bg-(--color-white-dust)"
        >
          <Image src={FilterIcon.src} alt={'Filtrar'} width={12} height={12} />
          Filtros
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
        {categoryTabs.map((tab) => {
          const isActive = activeCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              id={`news-category-${tab.slug}`}
              type="button"
              onClick={() => onCategoryChange(tab.slug)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer
                ${
                  isActive
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
          const isActive = activeTimeFilter === filter.value;
          return (
            <button
              key={filter.value}
              id={`news-time-${filter.value}`}
              type="button"
              onClick={() => onTimeFilterChange(filter.value)}
              className={`
                whitespace-nowrap shrink-0  px-2.5 py-1.25 rounded-full text-[11px] transition-colors cursor-pointer text-(--color-dark-gray)
                ${
                  isActive
                    ? 'bg-(--color-light-yellow) border border-(--color-yellow)  font-semibold '
                    : ' hover:bg-(--color-light-yellow) border border-(--color-gray)'
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
