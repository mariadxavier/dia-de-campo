"use client";
import { ImgHTMLAttributes, useMemo, useState } from "react";
import fallbackImage from "../assets/images/fallback.svg";
import NextImage from "next/image";

const FALLBACK_IMAGE_SRC = fallbackImage;

type ImageProps = {
  src: ImgHTMLAttributes<HTMLImageElement>["src"];
  alt: string;
  width: number;
  height: number;
  className?: string;
};
export default function Image({ src, alt, width, height, className }: ImageProps) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = useMemo(() => {
    if (hasError) {
      return FALLBACK_IMAGE_SRC;
    }

    return typeof src === "string" && src.trim()
      ? src
      : FALLBACK_IMAGE_SRC;
  }, [src, hasError]);

  return (
    <NextImage
      className={`object-cover object-center overflow-hidden ${className}`}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setHasError(true)}
    />
  );
}
