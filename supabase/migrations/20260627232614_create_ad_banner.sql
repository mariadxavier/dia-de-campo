CREATE TYPE banner_position AS ENUM (
    'header',
    'mid-content',
    'footer'
);

CREATE TABLE ad_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title TEXT NOT NULL,

  image_url TEXT NOT NULL,
  mobile_image_url TEXT,

  link_url TEXT,
  open_new_tab BOOLEAN NOT NULL DEFAULT true,

  position banner_position NOT NULL,

  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,

  priority INT NOT NULL DEFAULT 0,

  is_active BOOLEAN NOT NULL DEFAULT true,

  advertiser_name TEXT,
  campaign_name TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER banners_updated_at
BEFORE UPDATE ON ad_banners
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();