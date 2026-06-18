export function toSpotifyEmbedUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname !== "open.spotify.com") return trimmed;
    if (u.pathname.startsWith("/embed/")) return trimmed;
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length >= 2) {
      const [kind, id] = segments;
      const allowed = new Set([
        "episode",
        "track",
        "album",
        "playlist",
        "show",
        "artist",
      ]);
      if (allowed.has(kind) && id) {
        return `https://open.spotify.com/embed/${kind}/${id}${u.search}`;
      }
    }
  } catch {
    return trimmed;
  }
  return trimmed;
}

export function toYouTubeEmbedUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname.startsWith("/embed/")) return trimmed;
      const v = u.searchParams.get("v");
      if (v) {
        const base =
          host === "youtube-nocookie.com"
            ? "https://www.youtube-nocookie.com"
            : "https://www.youtube.com";
        return `${base}/embed/${v}`;
      }
      const shorts = u.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shorts?.[1])
        return `https://www.youtube.com/embed/${shorts[1]}`;
      const live = u.pathname.match(/^\/live\/([^/?]+)/);
      if (live?.[1])
        return `https://www.youtube.com/embed/${live[1]}`;
    }

    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
  } catch {
    return trimmed;
  }
  return trimmed;
}
