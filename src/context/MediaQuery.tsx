"use client"
import { useEffect, useState } from 'react';

export function useMediaQuery() {
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(false);
  const [isSmScreen, setIsSmScreen] = useState(false);

  useEffect(() => {
    const smMediaQuery = window.matchMedia('(max-width: 700px)');
    const mdMediaQuery = window.matchMedia('(min-width: 700px) and (max-width: 1023px)');
    const lgMediaQuery = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      setIsSmScreen(smMediaQuery.matches);
      setIsMdScreen(mdMediaQuery.matches);
      setIsLgScreen(lgMediaQuery.matches);
    };

    update();

    smMediaQuery.addEventListener('change', update);
    mdMediaQuery.addEventListener('change', update);
    lgMediaQuery.addEventListener('change', update);
    return () => {
      smMediaQuery.removeEventListener('change', update);
      mdMediaQuery.removeEventListener('change', update);
      lgMediaQuery.removeEventListener('change', update);
    };
  }, []);

  return {
    isSmScreen,
    isMdScreen,
    isLgScreen,
  };
}
