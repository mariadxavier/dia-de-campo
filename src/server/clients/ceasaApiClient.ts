// TODO: adaptar para conexão real API de preços CEASA
import type {
  ExternalCeasaPriceItem,
  ExternalCeasaPricesResponse,
} from "@/src/types";

function getCeasaApiUrl(): string {
  const url = process.env.CEASA_API_URL;

  if (!url) {
    throw new Error("CEASA_API_URL is not configured.");
  }

  return url;
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  const apiKey = process.env.CEASA_API_KEY;

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return headers;
}

function normalizeResponse(
  payload: ExternalCeasaPricesResponse,
): ExternalCeasaPriceItem[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.data ?? [];
}

export async function fetchCeasaPricesFromApi(): Promise<
  ExternalCeasaPriceItem[]
> {
  const response = await fetch(getCeasaApiUrl(), {
    headers: buildHeaders(),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `CEASA API responded with ${response.status}: ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as ExternalCeasaPricesResponse;
  return normalizeResponse(payload);
}
