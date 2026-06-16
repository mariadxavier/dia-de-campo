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

    return (
        <section className="w-full flex flex-col gap-6 px-5 md:px-10 lg:px-16">
            <h1 className="text-(--color-white) text-2xl font-bold md:text-4xl">Episódio em destaque</h1>

            <article className="rounded-2xl overflow-hidden bg-(--color-urain-blue) border border-(--color-faded-white) flex flex-col md:flex-row md:items-center md:gap-6 md:p-5 lg:p-12">
                <div className="w-full h-full aspect-video bg-[#0e0e1a] flex items-center justify-center relative md:aspect-auto md:w-1/3 md:min-h-30 md:shrink-0 md:rounded-xl lg:min-h-40 xl:min-h-50">
                    <button
                        type="button"
                        aria-label="Reproduzir episódio"
                        className="absolute m-auto rounded-full bg-(--color-yellow) flex items-center justify-center hover:brightness-90 active:scale-95 transition-all duration-150 cursor-pointer"
                        style={{ width: 56, height: 56, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    >
                        <Image src={PlayIcon.src} alt="Tocar" width={32} height={32} />
                    </button>
                </div>
                <div className="flex flex-row w-full items-center lg:justify-between">
                    <div className="p-5 flex flex-col gap-3 md:p-0 md:gap-1 lg:gap-3">
                        <span className="text-[10px] font-bold tracking-widest text-(--color-yellow)">
                            {epLabel}
                        </span>

                        <h3 className="text-xl font-bold text-(--color-white) leading-snug line-clamp-3 lg:text-2xl">
                            {featuredEpisode.title}
                        </h3>

                        <p className="text-xs text-(--color-gray) leading-relaxed line-clamp-3 md:text-base">
                            {featuredEpisode.description}
                        </p>

                        <div className="flex gap-3 mt-1 flex-wrap">
                            <Link
                                href={featuredEpisode.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-none flex justify-center items-center px-5 py-2.5 rounded-xl bg-(--color-yellow) text-(--color-dark-blue) font-semibold text-sm hover:brightness-95 active:scale-95 transition-all duration-150"
                            >
                                Ouvir agora
                            </Link>
                            <button
                                type="button"
                                className="flex-1 md:flex-none flex justify-center items-center px-5 py-2.5 rounded-xl border border-(--color-faded-white) text-(--color-white) font-semibold text-sm hover:bg-white/5 active:scale-95 transition-all duration-150 cursor-pointer"
                            >
                                Adicionar à fila
                            </button>
                        </div>
                    </div>
                    <div className="hidden h-full lg:flex flex-col bg-(--color-dark-blue) px-6 py-10 gap-6 border border-(--color-faded-white) rounded-xl text-(--color-white)">
                        <p className="text-(--color-yellow) text-xs font-bold">CONVIDADO</p>
                        <p className="font-bold text-xl">{featuredEpisode.author}</p>
                    </div>
                </div>
            </article>
        </section>
    );
}