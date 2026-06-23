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