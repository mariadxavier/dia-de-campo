import type { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/src/lib/api/response";
import { paginationSchema } from "@/src/lib/api/validation";
import { listPodcastEpisodes } from "@/src/server/services/podcastService";

export async function GET(request: NextRequest) {
  const parsed = paginationSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!parsed.success) {
    return jsonError("VALIDATION_ERROR", parsed.error.message, 400);
  }

  try {
    const { limit, offset } = parsed.data;
    const data = await listPodcastEpisodes(limit, offset);

    return jsonOk(data, { limit, offset });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to list podcast episodes.";
    return jsonError("PODCAST_LIST_FAILED", message, 500);
  }
}
