CREATE INDEX ceasa_prices_ceasa_name_idx
ON ceasa_prices (ceasa_name);

CREATE INDEX ceasa_prices_ceasa_product_idx
ON ceasa_prices (
  ceasa_name,
  product_name
);

CREATE INDEX ceasa_prices_ceasa_slug_idx
ON ceasa_prices (
  ceasa_name,
  product_slug
);