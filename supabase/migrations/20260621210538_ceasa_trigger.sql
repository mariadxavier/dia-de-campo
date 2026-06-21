CREATE TRIGGER ceasa_prices_updated_at
BEFORE UPDATE ON ceasa_prices
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();