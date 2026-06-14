'use client';
import { SectionTitle } from '@/src/components';
import { type ReactNode, useEffect } from 'react';
import { useAutoHorizontalScroll } from '../context/AutoHorizontalScroll';

const DEFAULT_CHILDREN_SCROLL_MS = 10000;

type HomeSectionProps = {
  sectionTitle: string;
  sectionSubtitle?: string;
  sectionLink: string;
  sectionLinkTitle?: string;
  sectionColor?: string;
  children: ReactNode;
  bgColor?: string;
  childrenAutoScrollIntervalMs?: number;
  enableAutoScroll?: boolean;
};

export default function HomeSection({
  sectionTitle,
  sectionSubtitle,
  sectionLink,
  sectionLinkTitle = 'Ver mais',
  sectionColor = '--color-green',
  children,
  bgColor = '--color-white',
  childrenAutoScrollIntervalMs = DEFAULT_CHILDREN_SCROLL_MS,
  enableAutoScroll = false,
}: HomeSectionProps) {
  const { scrollerRef, reset } = useAutoHorizontalScroll({
    enabled: enableAutoScroll,
    intervalMs: childrenAutoScrollIntervalMs,
  });

  useEffect(() => {
    reset();
  }, [children, reset]);

  return (
    <section
      className={`flex w-full flex-col gap-8 bg-(${bgColor}) px-5 py-12 md:px-10 md:py-20 lg:px-20 lg:py-24`}
    >
      <SectionTitle
        title={sectionTitle}
        subtitle={sectionSubtitle}
        actionHref={sectionLink}
        actionTitle={sectionLinkTitle}
        sectionColor={sectionColor}
      />
      <div
        ref={scrollerRef}
        className="flex flex-col md:flex-row flex-nowrap gap-5 md:gap-6 overflow-auto scroll-smooth p-1"
      >
        {children}
      </div>
    </section>
  );
}
