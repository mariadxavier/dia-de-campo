import { jsonError, jsonOk } from "@/src/lib/api/response";
import { getTechnicalContentBySlug } from "@/src/server/services/technicalContentService";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const data = await getTechnicalContentBySlug(slug);

    if (!data) {
      return jsonError("NOT_FOUND", "Technical content not found.", 404);
    }

    return jsonOk(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch technical content.";
    return jsonError("TECHNICAL_FETCH_FAILED", message, 500);
  }
}
