"use client";
import { ImgHTMLAttributes, useEffect, useMemo, useState } from "react";
import fallbackImage from "../assets/images/fallback.svg";

const FALLBACK_IMAGE_SRC = fallbackImage;

type ImageProps = {
  src: ImgHTMLAttributes<HTMLImageElement>["src"];
  alt: string;
  width: number | string;
  height: number | string;
  className?: string;
};
export default function Image({ src, alt, width, height, className }: ImageProps) {
  const initialSrc = useMemo(() => {
    return typeof src === "string" && src.trim() ? src : FALLBACK_IMAGE_SRC;
  }, [src]);

  const [imageSrc, setImageSrc] = useState(initialSrc);

  useEffect(() => {
    setImageSrc(initialSrc);
  }, [initialSrc]);

  return (
    <img
      className={`object-cover object-center ${className} overflow-hidden`}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImageSrc(FALLBACK_IMAGE_SRC)}
    />
  );
}
