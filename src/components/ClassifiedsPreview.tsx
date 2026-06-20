'use client';

import { ClassifiedListItem } from '../types';
import Button from './Button';
import ClassifiedsArticle from './ClassifiedsArticle';
import { useContactModal } from '../context/ContactModal';

export default function ClassifiedsPreview({
  featuredClassifieds,
}: {
  featuredClassifieds: ClassifiedListItem[];
}) {
  const { openContactModal } = useContactModal();
  return (
    <div className="flex flex-col w-full gap-5 md:gap-6 px-0.5">
      <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
        {featuredClassifieds &&
          featuredClassifieds.map((classified, idx) => (
            <ClassifiedsArticle key={idx} classified={classified} />
          ))}
      </div>
      <Button
        title='Publicar anúncio'
        className="p-3.5 md:px-7 max-w-[190px] flex items-center justify-center rounded-full bg-(--color-green) text-(--color-white)"
        onClick={() => {openContactModal()}}
      />
    </div>
  );
}
