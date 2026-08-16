'use client';

import Link from 'next/link';
import { ClassifiedListItem } from '../types';
import ClassifiedsArticle from './ClassifiedsArticle';
import EmptyList from './EmptyList';
import { EMPTY_CONTENT_MESSAGE } from '@/src/helpers/EmptyMessages';

export default function ClassifiedsPreview({
  featuredClassifieds,
}: {
  featuredClassifieds: ClassifiedListItem[];
}) {
  if (!featuredClassifieds || featuredClassifieds.length === 0) {
    return <EmptyList message={EMPTY_CONTENT_MESSAGE} />;
  }

  return (
    <div className="flex flex-col w-full gap-5 md:gap-6 px-0.5">
      <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
        {featuredClassifieds.map((classified, idx) => (
          <ClassifiedsArticle key={idx} classified={classified} />
        ))}
      </div>
      <Link
        href="?contato=true"
        scroll={false}
        className="p-3.5 md:px-7 max-w-[190px] flex items-center justify-center rounded-full bg-(--color-green) text-(--color-white)"
      >
        Publicar anúncio
      </Link>
    </div>
  );
}
