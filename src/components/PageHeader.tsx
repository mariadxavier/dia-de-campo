'use client';
import React, { ReactNode, useState } from 'react';
import SearchIcon from '@/src/assets/icons/search-icon.svg';
import ArrowIcon from '@/src/assets/icons/arrow-icon.svg';
import Image from './Image';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

type PageHeaderProps = {
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  hasSearch?: boolean;
  searchTags?: string[];
  handleSearch: () => void;
  secondarySection?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  breadcrumb,
  hasSearch,
  handleSearch,
  secondarySection,
  searchTags,
}: PageHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && hasSearch) {
      handleSearch?.();
    }
  }

  return (
    <section className="size-full xl:h-[500px] bg-(--color-dark-green) text-(--color-white)">
      <div className="flex flex-col size-full xl:justify-between md:w-4/5 lg:w-2/3 py-10 px-5 md:py-14 md:px-12 lg:py-18 lg:px-20 gap-4 md:gap-6">
        <Breadcrumb items={breadcrumb} currentItemColor="--color-yellow" />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8.5 md:mb-2 lg:mb-0">
            {title}
          </h1>
          <p className="text-[13px]">{description}</p>
        </div>
        {hasSearch && (
          <>
            <div className="flex items-center gap-3 border border-(--color-gray)/30 rounded-lg p-1.5 bg-(--color-white)">
              <Image
                src={SearchIcon.src}
                alt="Buscar"
                width={18}
                height={18}
                className="ml-1 shrink-0"
              />
              <input
                id="news-search-input"
                type="text"
                placeholder="Buscar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-xs md:text-sm outline-none bg-transparent text-(--color-dark-gray) placeholder:text-(--color-gray)"
              />
              <button
                id="news-search-button"
                type="button"
                onClick={handleSearch}
                aria-label="Buscar notícias"
                className="w-11 h-11 md:w-fit md:px-7 rounded-full bg-(--color-green) flex items-center justify-center shrink-0 hover:bg-(--color-dark-green) cursor-pointer"
              >
                <Image
                  src={ArrowIcon.src}
                  alt="Buscar"
                  width={14}
                  height={14}
                  className="brightness-0 invert md:hidden"
                />
                <p className="hidden md:block text-sm">Buscar</p>
              </button>
            </div>
            {searchTags && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-(--color-gray)">Mais buscados:</span>
                {searchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-(--color-white) bg-(--color-faded-white) hover:bg-(--color-green) transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {secondarySection}
    </section>
  );
}
