"use client";
import { SectionTitle } from "@/src/components";
import Highlights from "@/src/helpers/FeaturedContent";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const DEFAULT_CHILDREN_SCROLL_MS = Highlights.getHighlightPlayInterval();

type HomeSectionProps = {
  sectionTitle: string;
  sectionSubtitle?: string;
  sectionLink: string;
  sectionLinkTitle?: string;
  sectionColor?: string;
  children: ReactNode;
  bgColor?: string;
  childrenAutoScrollIntervalMs?: number;
};

export default function HomeSection({
  sectionTitle,
  sectionSubtitle,
  sectionLink,
  sectionLinkTitle = 'Ver mais',
  sectionColor = '--color-green',
  children,
  bgColor = "--color-white",
  childrenAutoScrollIntervalMs = DEFAULT_CHILDREN_SCROLL_MS,
}: HomeSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const [hasOverflow, setHasOverflow] = useState(false);

  const measureOverflow = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setHasOverflow(max > 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    measureOverflow();
    const ro = new ResizeObserver(measureOverflow);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children, measureOverflow]);

  useEffect(() => {
    stepRef.current = 0;
  }, [children]);

  useEffect(() => {
    if (!hasOverflow) return;
    const el = scrollerRef.current;
    if (!el) return;

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;
      const mid = max / 2;
      const sequence = [0, mid, max, mid];
      const i = stepRef.current % sequence.length;
      el.scrollTo({ left: sequence[i], behavior: "smooth" });
      stepRef.current = (stepRef.current + 1) % sequence.length;
    };

    const id = window.setInterval(tick, childrenAutoScrollIntervalMs);
    return () => window.clearInterval(id);
  }, [hasOverflow, children, childrenAutoScrollIntervalMs]);

  return (
    <section className={`flex w-full flex-col gap-8 bg-(${bgColor}) px-5 py-12`}>
      <SectionTitle
        title={sectionTitle}
        subtitle={sectionSubtitle}
        actionHref={sectionLink}
        actionTitle={sectionLinkTitle}
        sectionColor={sectionColor}
      />
      <div
        ref={scrollerRef}
        className="flex flex-col flex-nowrap justify-evenly gap-5 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {children}
      </div>
    </section>
  );
}
