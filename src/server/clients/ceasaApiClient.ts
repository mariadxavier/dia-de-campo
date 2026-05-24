import type {
  ExternalCeasaPrice,
  ExternalCeasaPricesResponse,
} from "@/src/types";

function getCeasaApiUrl(): string {
  const url = process.env.CEASA_API_URL;

  if (!url) {
    throw new Error(
      "CEASA_API_URL is not configured.",
    );
  }

  return url;
}

function buildHeaders(): HeadersInit {
  return {
    Accept: "text/plain",
  };
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

function parseRow(row: string): ExternalCeasaPrice | null {
  const columns = row
    .split(";")
    .map((value) => value.trim());

  if (columns.length !== 8) return null;

  const [
    municipio_ceasa,
    cod_ibge_municipio,
    uf_ceasa,
    dsc_ceasa,
    dsc_produto,
    sig_unidade_medida,
    data_preco,
    preco_diario,
  ] = columns;

  if (!municipio_ceasa || !uf_ceasa || !dsc_produto || !data_preco ||!preco_diario) return null;

  const normalizedDate = data_preco.trim().replace(" ", "T").replace(/\//g, "-");

  const parsedDate = new Date(normalizedDate);

  if (Number.isNaN(parsedDate.getTime())) return null;

  const parsedPrice = Number(preco_diario.replace(",", "."));

  if (Number.isNaN(parsedPrice)) return null;

  const productName = dsc_produto.toUpperCase();

  return {
    city: municipio_ceasa,
    ibge_city_code: cod_ibge_municipio,
    uf: uf_ceasa.toUpperCase(),
    ceasa_name: dsc_ceasa,
    product_name: productName,
    product_slug: slugify(productName),
    unity: sig_unidade_medida,
    price_date: parsedDate.toISOString().split("T")[0],
    daily_price: parsedPrice,
    previous_price: null,
    price_variation: null,
  };
}

function normalizeResponse(
  text: string,
): ExternalCeasaPricesResponse {
  const lines = text.split("\n");

  const [, ...rows] = lines;

  const latestMap = new Map<string, ExternalCeasaPrice>();

  for (const row of rows) {
    if (!row.trim()) {
      continue;
    }

    const parsed = parseRow(row);

    if (!parsed) {
        console.warn(
          "[CEASA] Invalid row:",
          row,
        );
      continue;
    }

    const key = [
      parsed.uf,
      parsed.city,
      parsed.product_name,
    ].join("_");

    const existing = latestMap.get(key);

    if (!existing) {
      latestMap.set(key, parsed);
      continue;
    }

    const currentDate = new Date(parsed.price_date).getTime();

    const existingDate = new Date(existing.price_date).getTime();

    if (currentDate > existingDate) {
      latestMap.set(key, {
        ...parsed,
        previous_price:
          existing.daily_price,

        price_variation:
          parsed.daily_price -
          existing.daily_price,
      });
    }
  }

  return Array.from(
    latestMap.values(),
  );
}

export async function fetchCeasaPricesFromApi(): Promise<ExternalCeasaPricesResponse> {
  const response = await fetch(
    getCeasaApiUrl(),
    {
      headers: buildHeaders(),

      next: {
        revalidate: 86400,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `CEASA API responded with ${response.status}`,
    );
  }

  const text = await response.text();

  return normalizeResponse(text);
}