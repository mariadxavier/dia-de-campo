import { jsonError, jsonOk } from "@/src/lib/api/response";
import { listHomeFeaturedContent } from "@/src/server/services/featuredService";

export async function GET() {
  try {
    const data = await listHomeFeaturedContent();
    return jsonOk(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to list home featured content.";
    return jsonError("HOME_FEATURED_LIST_FAILED", message, 500);
  }
}
