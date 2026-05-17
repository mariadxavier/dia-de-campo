import { jsonError, jsonOk } from "@/src/lib/api/response";
import { listCeasaPrices } from "@/src/server/services/ceasaPricesService";

export async function GET() {
  try {
    const data = await listCeasaPrices();
    return jsonOk(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to list CEASA prices.";
    return jsonError("CEASA_LIST_FAILED", message, 500);
  }
}
