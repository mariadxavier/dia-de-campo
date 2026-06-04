import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './MediaQuery';

type UseAutoHorizontalScrollProps = {
  enabled?: boolean;
  intervalMs?: number;
};

export function useAutoHorizontalScroll({
  enabled = true,
  intervalMs = 5000,
}: UseAutoHorizontalScrollProps = {}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const { isMdScreen } = useMediaQuery();

  const [hasOverflow, setHasOverflow] = useState(false);

  const reset = useCallback(() => {
    stepRef.current = 0;
  }, []);

  const measureOverflow = useCallback(() => {
    const el = scrollerRef.current;

    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    setHasOverflow(maxScroll > 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;

    if (!el) return;

    measureOverflow();

    const observer = new ResizeObserver(measureOverflow);

    observer.observe(el);

    return () => observer.disconnect();
  }, [measureOverflow]);

  useEffect(() => {
    if (!enabled || !isMdScreen || !hasOverflow) {
      return;
    }

    const el = scrollerRef.current;

    if (!el) return;

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth;

      if (max <= 8) return;

      const mid = max / 2;

      const sequence = [0, mid, max, mid];

      const nextPosition = sequence[stepRef.current % sequence.length];

      el.scrollTo({
        left: nextPosition,
        behavior: 'smooth',
      });

      stepRef.current += 1;
    };

    const interval = window.setInterval(tick, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [enabled, intervalMs, hasOverflow, isMdScreen]);

  return {
    scrollerRef,
    hasOverflow,
    reset,
  };
}
