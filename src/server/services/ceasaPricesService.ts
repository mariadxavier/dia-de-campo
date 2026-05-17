import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import { fetchCeasaPricesFromApi } from "@/src/server/clients/ceasaApiClient";
import { mapExternalCeasaPriceItem } from "@/src/server/mappers/ceasaMapper";
import type { CeasaPriceItem } from "@/src/types";

export async function listCeasaPrices(): Promise<CeasaPriceItem[]> {
  return getCached(cacheKeys.ceasaPrices(), async () => {
    const items = await fetchCeasaPricesFromApi();
    return items.map(mapExternalCeasaPriceItem);
  });
}
