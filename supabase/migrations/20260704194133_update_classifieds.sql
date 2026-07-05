CREATE TYPE classified_category_type AS ENUM (
  'vagas',
  'insumos',
  'servicos',
  'produtos',
  'maquinas'
);

ALTER TABLE classifieds
ADD COLUMN description TEXT,
ADD COLUMN category classified_category_type;

UPDATE classifieds
SET description = short_description
WHERE description IS NULL;

UPDATE classifieds
SET category = 'produtos'
WHERE category IS NULL;

ALTER TABLE classifieds
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN category SET NOT NULL;

ALTER TABLE classifieds
DROP COLUMN short_description,
DROP COLUMN content;