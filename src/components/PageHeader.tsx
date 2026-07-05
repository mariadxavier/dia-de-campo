'use client';
import { ReactNode, useEffect, useState } from 'react';
import SearchIcon from '@/src/assets/icons/search-icon.svg';
import ArrowIcon from '@/src/assets/icons/arrow-icon.svg';
import Image from './Image';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { SearchResult } from '../types';
import SearchResultItem from './SearchResultItem';

type PageHeaderProps = {
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  hasSearch?: boolean;
  secondarySection?: ReactNode;
  searchPlaceholder?: string;
};

export default function PageHeader({
  title,
  description,
  breadcrumb,
  hasSearch,
  secondarySection,
  searchPlaceholder,
}: PageHeaderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const onClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setResults([]);
    setSearchQuery('');
  }

  const handleRedirect = (href: string) => {
    setResults([]);
    setSearchQuery('');
    router.push(href);
  }

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&path=${pathname}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, pathname]);

  return (
    <>
      <section
        className="size-full xl:h-[500px] bg-cover bg-center text-(--color-white)"
        style={{ backgroundImage: 'url(/bokeh-bg.png)' }}
      >
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!searchQuery.trim()) return;
                }}
                className="relative flex items-center gap-3 border border-(--color-gray)/30 rounded-lg p-1.5 bg-(--color-white)"
              >
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
                  placeholder={searchPlaceholder || "Buscar..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-xs md:text-sm outline-none bg-transparent text-(--color-dark-gray) placeholder:text-(--color-gray)"
                />
                <button
                  type='reset'
                  className={searchQuery ? "cursor-pointer shrink-0 text-(--color-dark-green) bg-(--color-light-green) border border-[#BDE5CB] rounded-full w-11 h-11" : "hidden"}
                  onClick={onClose}
                >
                  X
                </button>
                <button
                  id="news-search-button"
                  type="submit"
                  aria-label="Buscar"
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
                {(hasSearch) && (
                  <div className={searchQuery.trim() ? "absolute top-17 left-[-1] z-1 shadow-xl w-full max-w-[800px]" : "hidden"}>
                    <div className={`flex flex-col gap-2 w-full bg-(--color-white-shell) rounded-xl p-3`}>
                      <h2 className={"font-bold text-(--color-dark-blue) text-sm"}>Resultados em {breadcrumb.at(-1)?.label}</h2>
                      <h3 className='text-(--color-gray) text-xs'>para &quot;<span>{searchQuery}</span>&quot;</h3>
                      <ul className="flex flex-col gap-2 ">
                        {results &&
                          results.map((item, idx) => (
                            <li key={idx} >
                              <SearchResultItem item={item} handleRedirect={handleRedirect} />
                            </li>
                          ))}

                        <li key="empty" className={results && results.length > 0 ? 'hidden' : 'flex h-100 items-center justify-center'}>
                          <p className="text-(--color-gray)">{searchQuery.trim() ? `Nenhum resultado encontrado para "${searchQuery}"` : 'Realize uma busca para ver os resultados'}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
        {secondarySection}
      </section>
    </>
  );
}
