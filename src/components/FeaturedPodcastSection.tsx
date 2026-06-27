"use client";
import Link from "next/link";
import { PodcastEpisodeItem } from "../types";
import Image from 'next/image';
import PlayIcon from "@/src/assets/icons/play-icon.svg";

type FeaturedPodcastSectionProps = {
    featuredEpisode: PodcastEpisodeItem;
}

export default function FeaturedPodcastSection({ featuredEpisode }: FeaturedPodcastSectionProps) {
    const epLabel = `EP. ${featuredEpisode.episode.padStart(3, "0")}`;
    const IFRAME_ALLOW = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share";


    return (
        <section className="w-full flex flex-col gap-6 px-5 md:px-10 lg:px-16">
            <h1 className="text-(--color-white) text-2xl font-bold md:text-4xl">Episódio em destaque</h1>

            <article className="rounded-2xl overflow-hidden bg-(--color-urain-blue) border border-(--color-faded-white) flex flex-col xl:flex-row md:items-center md:gap-6 md:p-5 lg:p-12">
                <iframe
                    title={featuredEpisode.title}
                    src={featuredEpisode.spotifyUrl || featuredEpisode.youtubeUrl || ''}
                    width="100%"
                    height="100%"
                    allow={IFRAME_ALLOW}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="aspect-video max-h-80 scrollbar-none"
                />
                <div className="flex flex-col w-full items-start lg:justify-between p-5 gap-3 md:p-0 md:gap-1 lg:gap-3">

                    <span className="text-[10px] font-bold tracking-widest text-(--color-yellow)">
                        {epLabel}
                    </span>

                    <h3 className="text-xl font-bold text-(--color-white) leading-snug line-clamp-3 lg:text-2xl">
                        {featuredEpisode.title}
                    </h3>

                    <p className="text-xs text-(--color-gray) leading-relaxed line-clamp-3 md:text-base">
                        {featuredEpisode.description}
                    </p>

                    <div className="flex gap-3 mt-1 flex-nowrap">
                        <Link
                        // TODO: adicionar link do spotify oficial
                            href={featuredEpisode.link}
                            rel="noopener noreferrer"
                            className="text-nowrap flex-1 md:flex-none flex justify-center items-center px-5 py-2.5 rounded-xl bg-(--color-yellow) text-(--color-dark-blue) font-semibold text-sm hover:brightness-95 active:scale-95 transition-all duration-150"
                        >
                            Salvar no Spotify
                        </Link>
                        <button
                        // TODO: adicionar link de compartilhamento
                            type="button"
                            className="flex-1 md:flex-none flex justify-center items-center px-5 py-2.5 rounded-xl border border-(--color-faded-white) text-(--color-white) font-semibold text-sm hover:bg-white/5 active:scale-95 transition-all duration-150 cursor-pointer"
                        >
                            Compartilhar
                        </button>
                    </div>
                </div>
            </article>
        </section>
    );
}