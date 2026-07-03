"use client";

import { useEffect, useState } from "react";
import { AdBannerItem, AdBannerPosition } from "../types";
import Image from "next/image";

interface AdBannerCarouselProps {
  adBanners: AdBannerItem[];
  interval?: number;
}

export default function AdBannerCarousel({
  adBanners,
  interval = 5000,
}: AdBannerCarouselProps) {
  const sizeBySectionMap = new Map<AdBannerPosition, string>([
    ["header", "w-[320px] h-[100px] md:w-[728px] md:h-[90px]"],
    ["mid-content", "w-[300px] h-[250px] lg:w-[970px] lg:h-[250px]"],
    ["footer", "w-[300px] h-[250px] lg:w-[970px] lg:h-[250px]"],
  ]);

  const placeholderLabelMap = new Map<AdBannerPosition, { mobile: string; desktop: string; mobileType: string; desktopType: string }>([
    [
      "header",
      {
        mobile: "320 × 100 px",
        desktop: "728 × 90 px",
        mobileType: "Large Mobile Banner · Mobile",
        desktopType: "Leaderboard · Desktop",
      },
    ],
    [
      "mid-content",
      {
        mobile: "300 × 250 px",
        desktop: "970 × 250 px",
        mobileType: "Medium Rectangle · Mobile",
        desktopType: "Large Leaderboard · Desktop",
      },
    ],
    [
      "footer",
      {
        mobile: "300 × 250 px",
        desktop: "970 × 250 px",
        mobileType: "Medium Rectangle · Mobile",
        desktopType: "Large Leaderboard · Desktop",
      },
    ],
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (adBanners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setFade(false);
      const fadeTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % adBanners.length);
        setFade(true);
      }, 300);

      return () => clearTimeout(fadeTimeout);
    }, interval);

    return () => clearInterval(timer);
  }, [adBanners.length, interval, isPaused]);

  if (adBanners.length === 0) return null;

  const currentAd = adBanners[currentIndex] || adBanners[0];
  const sizeClass = sizeBySectionMap.get(currentAd.position) || "";
  const placeholderInfo = placeholderLabelMap.get(currentAd.position) || {
    mobile: "300 × 250 px",
    desktop: "970 × 250 px",
    mobileType: "Medium Rectangle · Mobile",
    desktopType: "Large Leaderboard · Desktop",
  };

  if (currentAd.imageUrl) {
    const hasMobileImage = !!currentAd.mobileImageUrl;
    return (
      <div className="flex justify-center w-full bg-(--color-white-shell) py-6 px-4">
        <a
          href={currentAd.linkUrl || "#"}
          target={currentAd.openNewTab ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`relative block ${sizeClass} overflow-hidden rounded-xl shadow-sm transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {hasMobileImage ? (
            <>
              <div className="hidden md:block relative w-full h-full">
                <Image
                  src={currentAd.imageUrl}
                  alt={currentAd.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="block md:hidden relative w-full h-full">
                <Image
                  src={currentAd.mobileImageUrl!}
                  alt={currentAd.title}
                  fill
                  className="object-cover"
                />
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={currentAd.imageUrl}
                alt={currentAd.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </a>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full bg-(--color-white-shell) py-6 px-4">
      <div
        className={`flex flex-col items-center justify-center bg-(--color-white) border-2 border-dashed border-[#b4c3d0] rounded-2xl p-4 text-center ${sizeClass}`}
      >
        <div className="inline-flex items-center gap-1.5 bg-[#ecf0f4] px-4 py-1 rounded-full mb-2">
          <span className="text-sm">📢</span>
          <span className="text-[#4a5f78] text-[10px] md:text-[11px] font-bold tracking-wider uppercase">
            Espaço Publicitário
          </span>
        </div>

        <h4 className="text-xl md:text-2xl font-bold text-[#1e293b] mb-1">
          <span className="md:hidden">{placeholderInfo.mobile}</span>
          <span className="hidden md:inline">{placeholderInfo.desktop}</span>
        </h4>

        <p className="text-[10px] md:text-xs text-[#64748b]">
          <span className="md:hidden">Google Ads · {placeholderInfo.mobileType}</span>
          <span className="hidden md:inline">Google Ads · {placeholderInfo.desktopType}</span>
        </p>
      </div>
    </div>
  );
}
