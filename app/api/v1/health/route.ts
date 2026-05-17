import { jsonOk, jsonError } from "@/src/lib/api/response";
import { pingRedis } from "@/src/lib/redis/client";
import { getSupabaseAdmin } from "@/src/lib/supabase/server";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("categories").select("id").limit(1);

    if (error) {
      return jsonError("SUPABASE_ERROR", error.message, 503);
    }

    const redisOk = await pingRedis();

    return jsonOk({
      status: "ok",
      supabase: true,
      redis: redisOk,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Health check failed.";
    return jsonError("HEALTH_CHECK_FAILED", message, 503);
  }
}
