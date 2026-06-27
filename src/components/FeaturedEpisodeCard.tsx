"use client";
import { useEffect, useState } from "react";
import { PodcastEpisodeItem } from "@/src/types";
import Chip from "./Chip";

export default function FeaturedEpisodeCard({ episode }: { episode: PodcastEpisodeItem }) {
    const [highlight, setHighlight] = useState(false);
    const IFRAME_ALLOW = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share";

    useEffect(() => {
        setHighlight(true);

        const timeout = setTimeout(() => {
            setHighlight(false);
        }, 900);

        return () => clearTimeout(timeout);
    }, [episode]);


    return (
        <div className={`w-full rounded-2xl overflow-hidden bg-(--color-urain-blue) border border-white/5 shadow-2xl transition-all ${highlight ? "animate-highlight" : ""}`}>
            <div className="flex flex-col items-start justify-around gap-4 p-5 pb-4">
                <iframe
                    title={episode.title}
                    src={(episode.spotifyUrl || episode.youtubeUrl || '')}
                    width="100%"
                    height="100%"
                    allow={IFRAME_ALLOW}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="aspect-video"
                />
                <div className="flex flex-col justify-center gap-2 min-w-0">
                    <Chip text={`Ep. ${episode.episode} - Destaque`} textColor="--color-dark-blue" />
                    <h2 className="text-sm md:text-lg font-bold text-(--color-white) leading-snug line-clamp-3">
                        {episode.title}
                    </h2>
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
        </div>
    );
}