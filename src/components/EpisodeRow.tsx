"use client";
import Link from "next/link";
import { Image } from "@/src/components";
import { useCallback, useRef, useState } from "react";
import type { PodcastEpisodeItem } from "../types";
import PlayIcon from "@/src/assets/icons/play-icon.svg";
import PauseIcon from "@/src/assets/icons/pause-icon.svg";

export default function EpisodeRow({ episode }: { episode: PodcastEpisodeItem }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    const isEmbedded =
        episode.embedKind === "spotify" || episode.embedKind === "youtube";

    const togglePlay = useCallback(() => {
        const el = audioRef.current;
        if (!el) return;
        if (el.paused) {
            void el.play().catch(() => { });
        } else {
            el.pause();
        }
        setPlaying((prev) => !prev);
    }, []);

    return (
        <li className={`flex items-center gap-4 p-4 md:gap-6 group border rounded-xl bg-(--color-urain-blue) border-(${playing ? '--color-yellow' : '--color-faded-white'})`}>
            <span className="shrink-0 w-10 text-right text-sm font-bold text-(--color-yellow) tabular-nums">
                {episode.episode.padStart(3, "0")}
            </span>

            {isEmbedded ? (
                <Link
                    href={episode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir episódio ${episode.episode}`}
                    className="shrink-0 w-10 h-10 rounded-full bg-(--color-green) flex items-center justify-center hover:brightness-110 active:scale-95 transition-all duration-150"
                >
                    <Image src={PlayIcon.src} alt="Play" width={20} height={20} />
                </Link>
            ) : (
                <>
                    {episode.embedKind === "audio" && (
                        <audio
                            ref={audioRef}
                            src={episode.embedUrl}
                            preload="none"
                            className="hidden"
                            aria-hidden
                            onEnded={() => setPlaying(false)}
                        />
                    )}
                    <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={playing ? "Pausar episódio" : `Reproduzir episódio ${episode.episode}`}
                        className="shrink-0 w-10 h-10 rounded-full bg-(--color-green) flex items-center justify-center hover:brightness-110 active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                        {playing ? <Image src={PauseIcon.src} alt="Pausar" width={16} height={16} /> : <Image src={PlayIcon.src} alt="Play" width={16} height={16} />}
                    </button>
                </>
            )}

            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <Link href={episode.link} className="group/title">
                    <h3 className="text-sm md:text-base font-bold text-(--color-white) leading-snug line-clamp-2 group-hover/title:text-(--color-yellow) transition-colors duration-150">
                        {episode.title}
                    </h3>
                </Link>
                {episode.author && (
                    <p className="text-xs text-(--color-gray) truncate">
                        {episode.author}
                    </p>
                )}
            </div>

            <span className="shrink-0 text-xs font-semibold text-(--color-yellow) whitespace-nowrap">
                {episode.duration}
            </span>
        </li>
    );
}