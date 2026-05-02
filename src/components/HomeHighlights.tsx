"use client";
import { useEffect, useState } from "react";
import { Button, Image } from "@/src/components";
import ArrowLeft from "@/src/assets/icons/arrow-left-icon.svg";
import Highlights from "../helpers/Highlights";
import { HighlightItem } from "../types";

const MOCK_HIGHLIGHTS: HighlightItem[] = Highlights.getHighlights();

const AUTO_PLAY_INTERVAL_MS = Highlights.getHighlightPlayInterval();

type CarouselArrowProps = {
  direction: "previous" | "next";
  onClick: () => void;
};

function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "Voltar destaque" : "Avancar destaque";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 bg-(--color-white) text-(--color-black) w-13 h-13 ${
        isPrevious ? "left-4" : "right-4"
      }`}
    >
      <Image
        src={ArrowLeft.src}
        width={"24px"}
        height={"24px"}
        alt={label}
        className={!isPrevious ? "rotate-180 m-auto" : "m-auto"}
      />
    </button>
  );
}

type CarouselDotsProps = {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
};

function CarouselDots({ total, currentIndex, onSelect }: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 p-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Ir para destaque ${index + 1}`}
          className={`w-2.5 h-2.5 rounded-full ${
            index === currentIndex
              ? "bg-(--color-leaf-green)"
              : "bg-(--color-light-gray)"
          }`}
        />
      ))}
    </div>
  );
}

export default function HomeHighligths() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = MOCK_HIGHLIGHTS[currentIndex];

  function handlePrevious() {
    setCurrentIndex((previousIndex) => {
      if (previousIndex === 0) return MOCK_HIGHLIGHTS.length - 1;
      return previousIndex - 1;
    });
  }

  function handleNext() {
    setCurrentIndex(
      (previousIndex) => (previousIndex + 1) % MOCK_HIGHLIGHTS.length,
    );
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % MOCK_HIGHLIGHTS.length,
      );
    }, AUTO_PLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="size-full">
      <div className="relative w-full">
        <Image
          src={currentItem.imageSrc}
          alt={currentItem.title}
          width={1000}
          height={700}
          className="w-full h-[700px]"
        />

        <div className="absolute bottom-8 left-[84px] flex flex-col gap-4 py-6 px-9 text-(--color-black) bg-(--color-white) max-w-[610px]">
          <h4 className="text-xs text-(--color-yellow) font-bold">
            DESTAQUE • {currentItem.categoryName.toLocaleUpperCase()}
          </h4>
          <h3 className="text-4xl font-extrabold">{currentItem.title}</h3>
          <p className="text-lg">{currentItem.description}</p>
          <Button
            className="bg-(--color-black) text-(--color-white)"
            title="LER MATÉRIA COMPLETA"
          />
        </div>

        <CarouselArrow direction="previous" onClick={handlePrevious} />
        <CarouselArrow direction="next" onClick={handleNext} />
      </div>

      <CarouselDots
        total={MOCK_HIGHLIGHTS.length}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />
    </section>
  );
}
