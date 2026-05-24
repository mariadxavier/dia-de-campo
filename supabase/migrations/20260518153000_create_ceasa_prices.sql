CREATE TABLE ceasa_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  ibge_city_code TEXT,
  uf TEXT NOT NULL,
  ceasa_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  unity TEXT,
  price_date DATE NOT NULL,
  daily_price NUMERIC(10,2) NOT NULL,
  previous_price NUMERIC(10,2),
  price_variation NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ceasa_prices_unique_idx
ON ceasa_prices (
  uf,
  city,
  product_name
);

CREATE INDEX ceasa_prices_product_slug_idx
ON ceasa_prices (product_slug);