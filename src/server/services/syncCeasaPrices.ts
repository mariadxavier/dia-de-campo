import "dotenv/config";
import { getSupabaseAdmin } from "@/src/lib/supabase/server";
import { fetchCeasaPricesFromApi } from "@/src/server/clients/ceasaApiClient";
import { ErrorHandler } from "@/src/util/ErrorHandler";

export async function syncCeasaPrices(): Promise<void> {
  const supabase = getSupabaseAdmin();

  const rows = await fetchCeasaPricesFromApi();

  if (!rows.length) return;

  const { error } = await supabase
    .from("ceasa_prices")
    .upsert(rows, {
      onConflict:
        "uf,city,product_name",
    });

  if (error) {
    ErrorHandler.handle(error, "Erro ao sincronizar preços da CEASA", []);
    throw new Error(error.message);
  }
}