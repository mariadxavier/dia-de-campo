import { cacheKeys } from "@/src/lib/cache/keys";
import { getCached } from "@/src/lib/cache/withCache";
import type { ExternalCeasaPricesResponse } from "@/src/types";
import { findCeasaPrices } from "../repositories/ceasaPricesRepository";

export async function listCeasaPrices({ limit, offset }: { limit: number, offset: number }): Promise<ExternalCeasaPricesResponse> {
  return getCached(cacheKeys.ceasaPrices(), async () => {
    const items = await findCeasaPrices(limit, offset);
    return items;
  });
}
