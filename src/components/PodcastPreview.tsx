import Highlights from "../helpers/Highlights";
import { PodcastAudioPlayer, LinkButton } from "@/src/components";

export default function PodcastPreview() {
  const podcastHighlight = Highlights.getHighlightPodcast();
    return (
        <>
        {podcastHighlight && (
            <article className="flex w-2/3 gap-4 border border-(--color-text-gray) bg-(--color-white-shell) p-4">
              <PodcastAudioPlayer
                src={podcastHighlight.embedUrl}
                embedKind={podcastHighlight.embedKind}
                mediaTitle={podcastHighlight.title}
              />
              <div className="flex flex-col gap-4">
                <h3 className="text-yellow text-sm font-bold">
                  {podcastHighlight.episode.toLocaleUpperCase()}
                </h3>
                <h2 className="text-2xl font-bold">{podcastHighlight.title}</h2>
                <p>{podcastHighlight.description}</p>
                <LinkButton
                  className={"bg-(--color-black) text-(--color-white) w-[240px]"}
                  children="Ouvir todos os episódios"
                  href={"/podcast"}
                />
              </div>
            </article>
          )}
        </>
    );
}