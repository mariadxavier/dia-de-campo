"use client";
import Link from "next/link";
import { Image } from "@/src/components";
import type { PodcastEpisodeItem } from "../types";
import PlayIcon from "@/src/assets/icons/play-icon.svg";
import { useMediaQuery } from "../context/MediaQuery";

export default function EpisodeRow({ episode }: { episode: PodcastEpisodeItem }) {
    const { isSmScreen, isMdScreen } = useMediaQuery();
    return (
        <li>
            <Link href={`${episode.link}#${isSmScreen || isMdScreen ? 'podcastKPI' : 'podcastHero'}`} className={`flex items-center gap-4 p-4 md:gap-6 group border rounded-xl bg-(--color-urain-blue) border-(--color-faded-white)`}>
                <span className="shrink-0 w-10 text-right text-sm font-bold text-(--color-yellow) tabular-nums">
                    {episode.episode.padStart(3, "0")}
                </span>
                <>
                    <button
                        type="button"
                        aria-label={`Reproduzir episódio ${episode.episode}`}
                        className="shrink-0 w-10 h-10 rounded-full bg-(--color-green) flex items-center justify-center hover:brightness-110 active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                        <Image src={PlayIcon.src} alt="Play" width={16} height={16} />
                    </button>
                </>

                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <h3 className="text-sm md:text-base font-bold text-(--color-white) leading-snug line-clamp-2 group-hover/title:text-(--color-yellow) transition-colors duration-150">
                        {episode.title}
                    </h3>
                    {episode.author && (
                        <p className="text-xs text-(--color-gray) truncate">
                            {episode.author}
                        </p>
                    )}
                </div>

                <span className="shrink-0 text-xs font-semibold text-(--color-yellow) whitespace-nowrap">
                    {episode.duration}
                </span>
            </Link>
        </li>
    );
}