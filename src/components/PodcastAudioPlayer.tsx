"use client";
import type { PodcastEmbedKind } from "@/src/types/Home";
import { toSpotifyEmbedUrl, toYouTubeEmbedUrl } from "@/src/util/podcastEmbedUrl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PodcastAudioPlayerProps = {
  src: string;
  embedKind: PodcastEmbedKind;
  mediaTitle?: string;
  className?: string;
};

const IFRAME_ALLOW =
  "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share";

export default function PodcastAudioPlayer({
  src,
  embedKind,
  mediaTitle = "Player do podcast",
  className = "",
}: PodcastAudioPlayerProps) {
  const iframeSrc = useMemo(() => {
    if (embedKind === "spotify") return toSpotifyEmbedUrl(src);
    if (embedKind === "youtube") return toYouTubeEmbedUrl(src);
    return src;
  }, [embedKind, src]);

  if (embedKind === "spotify" || embedKind === "youtube") {
    const frameClass =
      embedKind === "spotify"
        ? "h-[152px] w-full max-w-[232px] shrink-0 overflow-hidden rounded-sm border border-white/90 bg-[#b0b3b8]"
        : "aspect-video w-full max-w-[min(100%,320px)] shrink-0 overflow-hidden rounded-sm border border-white/90 bg-black";

    return (
      <div className={`${frameClass} ${className}`}>
        <iframe
          title={mediaTitle}
          src={iframeSrc}
          width="100%"
          height="100%"
          className="block h-full w-full border-0"
          allow={IFRAME_ALLOW}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <DirectAudioPlayer src={src} className={className} />
  );
}

function DirectAudioPlayer({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const syncPlaying = useCallback(() => {
    const el = audioRef.current;
    setPlaying(el ? !el.paused : false);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [src]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().then(syncPlaying).catch(syncPlaying);
    } else {
      el.pause();
      syncPlaying();
    }
  }, [syncPlaying]);

  return (
    <div
      className={`relative aspect-square h-[192px] w-[192px] shrink-0 overflow-hidden rounded-sm bg-(--color-text-gray) ${className}`}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        className="pointer-events-none absolute h-px w-px opacity-0"
        aria-hidden
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#b0b3b8]"
        aria-label={playing ? "Pausar" : "Reproduzir episódio"}
      >
        <span className="relative flex h-[72px] w-[72px] items-center justify-center">
          <svg
            className="absolute text-[#7a7d82]"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            aria-hidden
          >
            <rect
              x="8"
              y="12"
              width="40"
              height="32"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.55"
            />
            <circle cx="18" cy="22" r="3" fill="currentColor" opacity="0.45" />
            <path
              d="M12 40 L22 30 L32 38 L44 26"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
          <svg
            className="relative z-10 text-white drop-shadow-sm"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden
          >
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="none"
            />
            {playing ? (
              <path
                fill="currentColor"
                d="M26 22h4v20h-4V22zm8 0h4v20h-4V22z"
              />
            ) : (
              <path fill="currentColor" d="M27 20 L27 44 L45 32 L27 20z" />
            )}
          </svg>
        </span>
      </button>
    </div>
  );
}
