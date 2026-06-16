"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PodcastEpisodeItem } from "@/src/types";
import Link from "next/link";
import Chip from "./Chip";
import Image from "./Image";
import PlayerIcon from '@/src/assets/icons/player-icon.svg';
import PlayIcon from '@/src/assets/icons/play-icon.svg';
import PauseIcon from '@/src/assets/icons/pause-icon.svg';

function ImageIcon() {
    return (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="#A7A9BC" strokeWidth="1.5" opacity="0.5" />
        <circle cx="10" cy="12" r="2" fill="#A7A9BC" opacity="0.4" />
        <path d="M6 24 L12 18 L18 22 L26 14" stroke="#A7A9BC" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </svg>)
}

export default function FeaturedEpisodeCard({ episode }: { episode: PodcastEpisodeItem }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(18);

    const isEmbedded =
        episode.embedKind === "spotify" || episode.embedKind === "youtube";

    const syncState = useCallback(() => {
        const el = audioRef.current;
        if (!el) return;
        setPlaying(!el.paused);
        if (el.duration) setProgress((el.currentTime / el.duration) * 100);
    }, []);

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        el.addEventListener("play", syncState);
        el.addEventListener("pause", syncState);
        el.addEventListener("ended", syncState);
        el.addEventListener("timeupdate", syncState);
        return () => {
            el.removeEventListener("play", syncState);
            el.removeEventListener("pause", syncState);
            el.removeEventListener("ended", syncState);
            el.removeEventListener("timeupdate", syncState);
        };
    }, [syncState]);

    const togglePlay = useCallback(() => {
        const el = audioRef.current;
        if (!el) return;
        if (el.paused) {
            void el.play().catch(() => { });
        } else {
            el.pause();
        }
    }, []);

    return (
        <div className="w-full rounded-2xl overflow-hidden bg-(--color-urain-blue) border border-white/5 shadow-2xl">
            <div className="flex items-center justify-around gap-4 p-5 pb-4">
                <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-(--color-urain-blue) flex items-center justify-center">
                    <ImageIcon />
                </div>
                <div className="flex flex-col justify-center gap-2 min-w-0">
                    <Chip text={`Ep. ${episode.episode} - Destaque`} textColor="--color-dark-blue" />
                    <h2 className="text-sm md:text-lg font-bold text-(--color-white) leading-snug line-clamp-3">
                        {episode.title}
                    </h2>
                </div>
                <div className="w-11 h-11 lg:hidden shrink-0 whitespace-nowrap cursor-pointer">
                    <Image src={PlayerIcon.src} alt="Tocar" width={44} height={44} />
                </div>
            </div>

            <div className="px-5 pb-3 flex flex-col gap-1">
                {episode.author && (
                    <p className="hidden md:blocktext-xs text-(--color-gray)">{episode.author}</p>
                )}
                <p className="text-xs font-semibold text-(--color-yellow)">
                    {episode.duration}
                </p>
            </div>

            <div className="px-5 pb-4">
                <div className="w-full h-1 rounded-full bg-white/10">
                    <div
                        className="h-full rounded-full bg-(--color-yellow) transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="hidden md:flex items-center justify-between px-5 py-4 border-t border-white/5">
                <div className="flex items-center gap-3">

                    {isEmbedded ? (
                        <Link
                            href={episode.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Abrir episódio"
                            className="w-11 h-11 rounded-full bg-(--color-yellow) flex items-center justify-center shrink-0 hover:brightness-90 active:scale-95 transition-all duration-150"
                        >
                            <Image src={PlayerIcon.src} alt="Tocar" width={44} height={44} />
                        </Link>
                    ) : (
                        <>
                            {episode.embedKind === "audio" && (
                                <audio
                                    ref={audioRef}
                                    src={episode.embedUrl}
                                    preload="metadata"
                                    className="hidden"
                                    aria-hidden
                                />
                            )}
                            <button
                                type="button"
                                onClick={togglePlay}
                                aria-label={playing ? "Pausar episódio" : "Reproduzir episódio"}
                                className="w-11 h-11 rounded-full bg-(--color-yellow) flex items-center justify-center shrink-0 hover:brightness-90 active:scale-95 transition-all duration-150 cursor-pointer"
                            >
                                {playing ? <Image src={PauseIcon.src} alt="Pause" width={20} height={20} /> : <Image src={PlayIcon.src} alt="Play" width={20} height={20} />}
                            </button>
                        </>
                    )}

                    <div className="flex flex-col">
                        <span className="text-[10px] text-(--color-gray) leading-none mb-0.5">
                            Agora tocando
                        </span>
                        <span className="text-xs font-semibold text-(--color-white) leading-tight">
                            Podcast Dia de Campo
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigator.share?.({ title: episode.title, url: episode.link })
                    }
                    className="text-xs font-semibold text-(--color-yellow) border border-white/20 px-4 py-2 rounded-lg hover:bg-white/5 active:scale-95 transition-all duration-150 cursor-pointer whitespace-nowrap"
                >
                    Compartilhar
                </button>
            </div>
        </div>
    );
}