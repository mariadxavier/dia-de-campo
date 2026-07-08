CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE content_type AS ENUM (
  'news',
  'technical'
);

CREATE TYPE content_slot AS ENUM (
  'hero', 
  'content'
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,

  seo_title TEXT,
  seo_description TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type content_type NOT NULL,
  slot content_slot NOT NULL DEFAULT 'content',
  
  category_id UUID
    REFERENCES categories(id)
    ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT NOT NULL DEFAULT '',
  content JSONB NOT NULL,

  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  source TEXT NOT NULL,

  search_vector tsvector,

  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,

  sort_order INT NOT NULL DEFAULT 0,

  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT published_content_requires_date CHECK (
    (is_published = false)
    OR
    (published_at IS NOT NULL)
  )
);

CREATE TABLE podcast_episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_number TEXT NOT NULL,
  episode_time_duration TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  spotify_url TEXT,
  youtube_url TEXT,

  author TEXT,

  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,

  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,

  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT published_podcast_requires_date CHECK (
    (is_published = false)
    OR
    (published_at IS NOT NULL)
  )
);

CREATE TYPE featured_resource_type AS ENUM (
  'news',
  'technical',
  'podcast',
  'classified',
  'hero'
);

CREATE TABLE featured_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type featured_resource_type NOT NULL,
  resource_id UUID NOT NULL,

  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,

  priority INT NOT NULL DEFAULT 0,

  client_name TEXT,
  campaign_name TEXT,

  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT featured_placements_valid_range CHECK (
    ends_at > starts_at
  )
);

CREATE TABLE classifieds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  content JSONB NOT NULL,

  price NUMERIC(12,2),

  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  city TEXT,
  state TEXT,

  cover_image_url TEXT NOT NULL DEFAULT '',

  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,

  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  is_featured BOOLEAN NOT NULL DEFAULT false,

  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT classifieds_valid_dates CHECK (
    expires_at IS NULL
    OR
    expires_at > published_at
  )
);

CREATE INDEX content_items_type_published_idx
ON content_items (
  type,
  is_published,
  published_at DESC NULLS LAST
);

CREATE INDEX content_items_slug_idx
ON content_items (slug);

CREATE INDEX content_items_search_idx
ON content_items
USING GIN(search_vector);

CREATE INDEX podcast_episodes_published_idx
ON podcast_episodes (
  is_published,
  published_at DESC NULLS LAST
);

CREATE INDEX featured_placements_active_idx
ON featured_placements (
  starts_at,
  ends_at,
  priority
);

CREATE INDEX classifieds_status_idx
ON classifieds (
  is_published,
  published_at DESC NULLS LAST
);

CREATE INDEX classifieds_city_idx
ON classifieds (city);

CREATE INDEX classifieds_expires_idx
ON classifieds (expires_at);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER content_items_updated_at
BEFORE UPDATE ON content_items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER podcast_episodes_updated_at
BEFORE UPDATE ON podcast_episodes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER featured_placements_updated_at
BEFORE UPDATE ON featured_placements
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER classifieds_updated_at
BEFORE UPDATE ON classifieds
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION update_content_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector(
      'portuguese',
      COALESCE(NEW.title, '') || ' ' ||
      COALESCE(NEW.short_description, '')
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER content_items_search_vector_trigger
BEFORE INSERT OR UPDATE ON content_items
FOR EACH ROW
EXECUTE FUNCTION update_content_search_vector();

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE classifieds ENABLE ROW LEVEL SECURITY;

CREATE POLICY public_read_categories
ON categories
FOR SELECT
USING (true);

CREATE POLICY public_read_content_items
ON content_items
FOR SELECT
USING (is_published = true);

CREATE POLICY public_read_podcast_episodes
ON podcast_episodes
FOR SELECT
USING (is_published = true);

CREATE POLICY public_read_classifieds
ON classifieds
FOR SELECT
USING (
  is_published = true
  AND (
    expires_at IS NULL
    OR expires_at > now()
  )
);

CREATE POLICY public_read_featured_placements
ON featured_placements
FOR SELECT
USING (
  is_active = true
  AND starts_at <= now()
  AND ends_at >= now()
  AND (
    (
      resource_id IS NOT NULL
      AND EXISTS (
        SELECT 1
        FROM content_items ci
        WHERE ci.id = featured_placements.resource_id
        AND ci.is_published = true
      )
    )
    OR
    (
      resource_id IS NOT NULL
      AND EXISTS (
        SELECT 1
        FROM classifieds ci
        WHERE ci.id = featured_placements.resource_id
        AND ci.is_published = true
      )
    )
    OR
    (
      resource_id IS NOT NULL
      AND EXISTS (
        SELECT 1
        FROM podcast_episodes pe
        WHERE pe.id = featured_placements.resource_id
        AND pe.is_published = true
      )
    )
  )
);

CREATE POLICY authenticated_insert_content_items
ON content_items
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY authenticated_update_own_content_items
ON content_items
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY authenticated_delete_own_content_items
ON content_items
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY authenticated_insert_podcast_episodes
ON podcast_episodes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY authenticated_update_own_podcast_episodes
ON podcast_episodes
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY authenticated_delete_own_podcast_episodes
ON podcast_episodes
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY authenticated_insert_classifieds
ON classifieds
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY authenticated_update_own_classifieds
ON classifieds
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY authenticated_delete_own_classifieds
ON classifieds
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);
