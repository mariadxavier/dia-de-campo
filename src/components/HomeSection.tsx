"use client";
import { SectionTitle } from "@/src/components";
import Highlights from "@/src/helpers/Highlights";
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
  sectionLink?: string;
  sectionLinkTitle?: string;
  hasDivisor: boolean;
  children: ReactNode;
  bgColor?: string;
  childrenAutoScrollIntervalMs?: number;
};

export default function HomeSection({
  sectionTitle,
  sectionLink,
  sectionLinkTitle,
  hasDivisor,
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
    <section className={`flex w-full flex-col gap-8 bg-(${bgColor}) px-4 py-6`}>
      <SectionTitle
        title={sectionTitle}
        hasAction={!!sectionLink}
        actionHref={sectionLink}
        actionTitle={sectionLinkTitle || "ver mais"}
        hasDivisor={hasDivisor}
      />
      <div
        ref={scrollerRef}
        className="flex flex-nowrap justify-evenly gap-4 overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        {children}
      </div>
    </section>
  );
}
