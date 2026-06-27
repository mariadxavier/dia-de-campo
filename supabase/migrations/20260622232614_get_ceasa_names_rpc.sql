CREATE OR REPLACE FUNCTION get_ceasa_names()
RETURNS TABLE(ceasa_name TEXT) AS $$
  SELECT DISTINCT ceasa_name FROM ceasa_prices ORDER BY ceasa_name;
$$ LANGUAGE sql STABLE;

create or replace function get_ceasa_products(
  p_ceasa_name text default null
)
returns table (
  product_name text,
  product_slug text
)
language sql
as $$
  select distinct
    product_name,
    product_slug
  from ceasa_prices
  order by product_name;
$$;

BEGIN;

CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION update_content_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector(
      'portuguese',
      unaccent(
        COALESCE(NEW.title, '') || ' ' ||
        COALESCE(NEW.short_description, '')
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

UPDATE content_items
SET search_vector =
  to_tsvector(
    'portuguese',
    unaccent(
      COALESCE(title, '') || ' ' ||
      COALESCE(short_description, '')
    )
  );

COMMIT;