import { jsonError, jsonOk } from "@/src/lib/api/response";
import { getNewsBySlug } from "@/src/server/services/newsService";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const data = await getNewsBySlug(slug);

    if (!data) {
      return jsonError("NOT_FOUND", "News article not found.", 404);
    }

    return jsonOk(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch news.";
    return jsonError("NEWS_FETCH_FAILED", message, 500);
  }
}
