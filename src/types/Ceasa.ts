export type CeasaPriceRow = {
  id: string;
  city: string;
  ibge_city_code: string | null;
  uf: string;
  ceasa_name: string;
  product_name: string;
  product_slug: string;
  unity: string | null;
  price_date: string;
  daily_price: number;
  previous_price: number | null;
  price_variation: number | null;
  created_at: string;
  updated_at: string;
};

export type CeasaPriceItem = {
  id: string;
  link: string;
  city: string;
  ibgeCode: string | null;
  uf: string;
  ceasaName: string;
  productName: string;
  productSlug: string;
  unity: string | null;
  priceDate: string;
  dailyPrice: number;
  previousPrice: number | null;
  priceVariation: number | null;
  updatedAt: string;
};

export type ExternalCeasaPrice = Omit<CeasaPriceRow, 'id' | 'created_at' | 'updated_at'>;

export type ExternalCeasaPricesResponse = ExternalCeasaPrice[];

export type CeasaProductOption = {
  product_name: string;
  product_slug: string;
};
