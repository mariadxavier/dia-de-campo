'use client';
import { useEffect, useState } from 'react';
import { Image, LinkButton } from '@/src/components';
import Highlights from '../helpers/FeaturedContent';
import ArrowLeft from '@/src/assets/icons/arrow-left-icon.svg';
import Arrow from '@/src/assets/icons/arrow-icon.svg';

type CarouselArrowProps = {
  direction: 'previous' | 'next';
  onClick: () => void;
};

type CarouselDotsProps = {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
};

function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  const isPrevious = direction === 'previous';
  const label = isPrevious ? 'Voltar destaque' : 'Avancar destaque';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`hidden sm:block absolute top-1/2 -translate-y-1/2 bg-(--color-faded-white) w-12 h-12 rounded-full border border-(--color-white)  ${
        isPrevious ? 'left-4' : 'right-4'
      }`}
    >
      <Image
        src={ArrowLeft.src}
        width={24}
        height={24}
        alt={label}
        className={!isPrevious ? 'rotate-180 m-auto' : 'm-auto'}
      />
    </button>
  );
}

function CarouselDots({ total, currentIndex, onSelect }: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 p-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Ir para destaque ${index + 1}`}
          className={`h-0.75 rounded-full ${
            index === currentIndex ? 'w-7 bg-(--color-yellow)' : 'w-2 bg-(--color-gray)'
          }`}
        />
      ))}
    </div>
  );
}

export default function HomeHighligths() {
  const MOCK_HIGHLIGHTS = Highlights.getHighlights();
  const AUTO_PLAY_INTERVAL_MS = Highlights.getHighlightPlayInterval();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = MOCK_HIGHLIGHTS[currentIndex];

  function handlePrevious() {
    setCurrentIndex((previousIndex) => {
      if (previousIndex === 0) return MOCK_HIGHLIGHTS.length - 1;
      return previousIndex - 1;
    });
  }

  function handleNext() {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % MOCK_HIGHLIGHTS.length);
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % MOCK_HIGHLIGHTS.length);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [AUTO_PLAY_INTERVAL_MS, MOCK_HIGHLIGHTS]);

  return (
    <section className="size-full">
      <div className="relative w-full">
        <Image
          src={currentItem.imageSrc}
          alt={currentItem.title}
          width={1000}
          height={540}
          className="w-full h-[540px] brightness-60"
        />

        <div className="absolute px-5 gap-3.5 bottom-0 flex flex-col text-(--color-white) md:max-w-[640px]">
          <h4 className="text-xs bg-(--color-yellow) text-(--color-bg-blue) font-bold rounded-full p-2 w-fit">
            {currentItem.categoryName}
          </h4>
          <h3 className="text-3xl font-extrabold">{currentItem.title}</h3>
          <p>{currentItem.description}</p>
          <LinkButton
            href={currentItem.link || ''}
            className="flex items-center gap-2.5 text-(--color-white) text-sm"
          >
            <div className="p-2 rounded-full bg-(--color-yellow)">
              <Image src={Arrow.src} width={12} height={12} alt="Seguir para conteúdo" />
            </div>
            <p>Saiba mais</p>
          </LinkButton>
          <CarouselDots
            total={MOCK_HIGHLIGHTS.length}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </div>

        <CarouselArrow direction="previous" onClick={handlePrevious} />
        <CarouselArrow direction="next" onClick={handleNext} />
      </div>
    </section>
  );
}
