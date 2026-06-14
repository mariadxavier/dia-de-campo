import type { PodcastEpisodeItem } from "@/src/types";
import { EpisodeRow } from "@/src/components";
import Link from "next/link";


type PodcastListProps = {
    episodeList: PodcastEpisodeItem[];
};

export default function PodcastList({ episodeList }: PodcastListProps) {
    if (!episodeList || episodeList.length === 0) return null;

    return (
        <section className="w-full flex flex-col md:flex-row md:items-center gap-4 p-5 md:p-10 lg:p-16 md:gap-8">
            <div className="w-full flex flex-col gap-4 md:gap-6">
                <h2 className="text-2xl font-bold text-(--color-white)">
                    Todos os episódios
                </h2>
                <ul className="flex flex-col gap-4">
                    {episodeList.map((episode) => (
                        <EpisodeRow key={episode.id} episode={episode} />
                    ))}
                </ul>
            </div>
            <div className="flex flex-col text-(--color-white) gap-4 p-4 md:gap-6 group border border-(--color-faded-white) rounded-xl bg-(--color-urain-blue)">
                <h1 className="text-xl font-bold">Ouça no seu app favorito</h1>
                <p className="text-xs text-(--color-gray)">Assine o Podcast Dia de Campo e receba novos episódios assim que forem publicados</p>
                <div className="flex gap-2 items-center">
                    <Link href={'/podcast'} className="w-full text-center font-semibold text-sm p-2 rounded-lg border border-(--color-faded-white) bg-(--color-green)">Spotify</Link>
                    <Link href={'/podcast'} className="w-full text-center font-semibold text-sm p-2 rounded-lg border border-(--color-faded-white) bg-(--color-red)">Youtube</Link>
                </div>

            </div>
        </section>
    );
}
