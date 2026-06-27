type PodcastAudioPlayerProps = {
  embedUrl: string;
  mediaTitle?: string;
  className?: string;
};

const IFRAME_ALLOW = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share";

export default function PodcastAudioPlayer({
  embedUrl,
  mediaTitle = "Player do podcast",
  className = "",
}: PodcastAudioPlayerProps) {

  const frameClass = "h-[152px] md:h-[200px] w-full shrink-0 overflow-hidden rounded-t-xl";

  return (
    <div className={`${frameClass} ${className}`}>
      <iframe
        title={mediaTitle}
        src={embedUrl}
        width="100%"
        height="100%"
        allow={IFRAME_ALLOW}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
