'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Image } from '@/src/components';
import ArrowIcon from '../assets/icons/arrow-icon.svg';

type NewsPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function NewsPagination({ currentPage, totalPages }: NewsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function getVisiblePages(): (number | '...')[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }

    return pages;
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8 px-5">
      {currentPage < totalPages && (
        <button
          id="news-load-more"
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-(--color-green) text-(--color-green) text-sm font-semibold hover:bg-(--color-green) hover:text-(--color-white) transition-colors cursor-pointer"
        >
        Carregar mais notícias
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5">
          <path
            d="M7 2v10M2 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </button>
      )}

      <nav className="flex items-center gap-1" aria-label="Paginação">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          className={`bg-(${currentPage === 1 ? '--color-white-dust)' : '--color-green) hover:text-(--color-green)'} w-9 h-9 flex items-center justify-center rounded-lg text-(--color-gray) fill-(--color-gray) transition-colors cursor-pointer disabled:cursor-default`}
        >
          <Image
            src={ArrowIcon.src}
            alt="Página anterior"
            className="rotate-180"
            width={12}
            height={12}
          />
        </button>

        {getVisiblePages().map((page, idx) =>
          page === '...' ? (
            <span
              key={`dots-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-xs text-(--color-gray)"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`
                w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${
                  currentPage === page
                    ? 'bg-(--color-green) text-(--color-white)'
                    : 'text-(--color-dark-gray) hover:bg-(--color-light-green) hover:text-(--color-green)'
                }
              `}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
          className={`bg-(${currentPage === totalPages ? '--color-white-dust)' : '--color-green) hover:text-(--color-green)'} w-9 h-9 flex items-center justify-center rounded-lg text-(--color-gray) fill-(--color-gray) transition-colors cursor-pointer disabled:cursor-default`}
        >
          <Image
            src={ArrowIcon.src}
            alt="Página anterior"
            width={12}
            height={12}
          />
        </button>
      </nav>
    </div>
  );
}
