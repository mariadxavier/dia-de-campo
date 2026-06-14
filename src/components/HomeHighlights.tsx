'use client';
import { useEffect, useState } from 'react';
import { Chip, Image, LinkButton } from '@/src/components';
import ArrowLeft from '@/src/assets/icons/arrow-left-icon.svg';
import Arrow from '@/src/assets/icons/arrow-icon.svg';
import { NewsListItem } from '../types';

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
      className={`hidden lg:block absolute top-1/2 -translate-y-1/2 bg-(--color-faded-white) w-12 h-12 rounded-full border border-(--color-white)  ${
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
    <div className="flex justify-center gap-2 p-8 md:pt-12 lg:pt-14">
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

export default function HomeHighligths({heroItems}: {heroItems: NewsListItem[]}) {
  const AUTO_PLAY_INTERVAL_MS = 10000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = heroItems[currentIndex];
  function handlePrevious() {
    setCurrentIndex((previousIndex) => {
      if (previousIndex === 0) return heroItems.length - 1;
      return previousIndex - 1;
    });
  }

  function handleNext() {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % heroItems.length);
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % heroItems.length);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [AUTO_PLAY_INTERVAL_MS, heroItems]);

  return (
    <section className="size-full">
      <div className="relative w-full">
        <Image
          src={currentItem.coverImage}
          alt={currentItem.title}
          width={1000}
          height={540}
          className="w-full h-[540px] lg:h-[640px] brightness-60"
        />

        <div className="absolute flex flex-col w-full px-5 gap-3.5 md:gap-5 lg:gap-6 bottom-0 text-(--color-white)">
          <div className='flex flex-col gap-3.5 md:mx-14 md:w-2/3 lg:mx-26 lg:w-1/2'>
            <Chip text={currentItem.categoryName || 'Notícia'} textColor='--color-dark-green' />
            <h3 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold">{currentItem.title}</h3>
            <p className="text-sm md:text-[17px]">{currentItem.shortDescription}</p>
            <LinkButton
              href={currentItem.link || ''}
              className="flex items-center gap-2.5 text-(--color-white) text-sm md:text-[15px]"
            >
              <div className="p-2 rounded-full bg-(--color-yellow)">
                <Image src={Arrow.src} width={12} height={12} alt="Seguir para conteúdo" />
              </div>
              <p>Saiba mais</p>
            </LinkButton>
          </div>
          <CarouselDots
            total={heroItems.length}
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
