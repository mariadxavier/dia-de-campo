INSERT INTO categories (
  name,
  slug,
  seo_title,
  seo_description
)
VALUES
(
  'Tecnologia',
  'tecnologia',
  'Notícias de Tecnologia',
  'Últimas notícias sobre tecnologia e inovação.'
),
(
  'Política',
  'politica',
  'Notícias de Política',
  'Cobertura política nacional e internacional.'
),
(
  'Economia',
  'economia',
  'Notícias de Economia',
  'Mercado financeiro, negócios e economia.'
),
(
  'Esportes',
  'esportes',
  'Notícias de Esportes',
  'Futebol, basquete e esportes em geral.'
),
(
  'Cultura',
  'cultura',
  'Notícias de Cultura',
  'Cinema, música e entretenimento.'
),
(
  'Ciência',
  'ciencia',
  'Notícias de Ciência',
  'Pesquisas e descobertas científicas.'
),
(
  'Games',
  'games',
  'Notícias de Games',
  'Lançamentos e novidades do mundo gamer.'
);

INSERT INTO content_items (
  type,
  category_id,
  title,
  slug,
  short_description,
  cover_image_url,
  content,
  seo_title,
  seo_description,
  canonical_url,
  og_image_url,
  author,
  published_at,
  is_published,
  sort_order
)
SELECT
  data.type::content_type,
  c.id,
  data.title,
  data.slug,
  data.short_description,
  data.cover_image_url,
  data.content::jsonb,
  data.seo_title,
  data.seo_description,
  data.canonical_url,
  data.og_image_url,
  'Equipe Dia de Campo',
  now(),
  true,
  data.sort_order
FROM (
  VALUES

  (
    'news',
    'tecnologia',
    'OpenAI anuncia novo modelo multimodal',
    'openai-anuncia-modelo-multimodal',
    'Empresa revelou avanços em inteligência artificial.',
    'https://picsum.photos/1200/800?1',
    '[{"type":"paragraph","content":"A OpenAI anunciou um novo modelo multimodal com capacidades avançadas de processamento."}]',
    'OpenAI anuncia novo modelo',
    'Novo modelo multimodal da OpenAI.',
    'https://portal.com/noticias/openai-anuncia-modelo-multimodal',
    'https://picsum.photos/1200/630?1',
    1
  ),

  (
    'news',
    'economia',
    'Mercado financeiro fecha em alta nesta sexta',
    'mercado-financeiro-alta-sexta',
    'Ibovespa encerrou o dia em valorização.',
    'https://picsum.photos/1200/800?2',
    '[{"type":"paragraph","content":"O mercado financeiro fechou em alta impulsionado pelo setor bancário."}, {"type":"image","content":"https://picsum.photos/1200/800?6"}, {"type":"paragraph","content":"O mercado financeiro fechou em alta impulsionado pelo setor bancário. O mercado financeiro fechou em alta impulsionado pelo setor bancário. O mercado financeiro fechou em alta impulsionado pelo setor bancário. O mercado financeiro fechou em alta impulsionado pelo setor bancário. O mercado financeiro fechou em alta impulsionado pelo setor bancário."}, {"type":"subtitle","content":"O mercado financeiro fechou em alta impulsionado pelo setor bancário."}, {"type":"quote","content":"O mercado financeiro fechou em alta impulsionado pelo setor bancário."}, {"type":"paragraph","content":"O mercado financeiro fechou em alta impulsionado pelo setor bancário."}]',
    'Mercado financeiro em alta',
    'Ibovespa fecha positivo.',
    'https://portal.com/noticias/mercado-financeiro-alta-sexta',
    'https://picsum.photos/1200/630?2',
    2
  ),

  (
    'news',
    'esportes',
    'Seleção brasileira vence amistoso internacional',
    'brasil-vence-amistoso',
    'Time brasileiro venceu por 3 a 0.',
    'https://picsum.photos/1200/800?3',
    '[{"type":"paragraph","content":"A seleção brasileira apresentou ótimo desempenho em amistoso internacional."}]',
    'Brasil vence amistoso',
    'Vitória da seleção brasileira.',
    'https://portal.com/noticias/brasil-vence-amistoso',
    'https://picsum.photos/1200/630?3',
    3
  ),

  (
    'technical',
    'tecnologia',
    'Como funciona SSR no Next.js',
    'como-funciona-ssr-nextjs',
    'Entenda renderização server side.',
    'https://picsum.photos/1200/800?4',
    '[{"type":"paragraph","content":"SSR melhora SEO e performance em aplicações modernas."}]',
    'SSR no Next.js',
    'Aprenda SSR no Next.js.',
    'https://portal.com/tech/como-funciona-ssr-nextjs',
    'https://picsum.photos/1200/630?4',
    4
  ),

  (
    'technical',
    'tecnologia',
    'Introdução ao PostgreSQL',
    'introducao-postgresql',
    'Banco relacional moderno.',
    'https://picsum.photos/1200/800?5',
    '[{"type":"paragraph","content":"PostgreSQL é amplamente utilizado em aplicações modernas."}]',
    'Aprenda PostgreSQL',
    'Introdução ao PostgreSQL.',
    'https://portal.com/tech/introducao-postgresql',
    'https://picsum.photos/1200/630?5',
    5
  ),

  (
    'technical',
    'tecnologia',
    'Docker para desenvolvimento web',
    'docker-desenvolvimento-web',
    'Containers para aplicações modernas.',
    'https://picsum.photos/1200/800?6',
    '[{"type":"paragraph","content":"Docker facilita ambientes consistentes de desenvolvimento."}]',
    'Docker para iniciantes',
    'Aprenda Docker.',
    'https://portal.com/tech/docker-desenvolvimento-web',
    'https://picsum.photos/1200/630?6',
    6
  ),

  (
    'news',
    'cultura',
    'Nova plataforma de streaming cresce no Brasil',
    'streaming-cresce-brasil',
    'Serviço amplia participação no mercado.',
    'https://picsum.photos/1200/800?7',
    '[{"type":"paragraph","content":"A nova plataforma de streaming registrou crescimento recorde."}]',
    'Streaming cresce no Brasil',
    'Nova plataforma cresce rapidamente.',
    'https://portal.com/noticias/streaming-cresce-brasil',
    'https://picsum.photos/1200/630?7',
    7
  )

) AS data (
  type,
  category_slug,
  title,
  slug,
  short_description,
  cover_image_url,
  content,
  seo_title,
  seo_description,
  canonical_url,
  og_image_url,
  sort_order
)

JOIN categories c
  ON c.slug = data.category_slug;

INSERT INTO podcast_episodes (
  episode_number,
  title,
  slug,
  description,
  embed_url,
  embed_kind,
  author,
  seo_title,
  seo_description,
  canonical_url,
  og_image_url,
  published_at,
  is_published
)
VALUES

(
  '001',
  'O futuro da inteligência artificial',
  'podcast-futuro-ia',
  'Discussão sobre IA e inovação.',
  'https://spotify.com/episode/1',
  'spotify',
  'Equipe Tech',
  'Podcast sobre IA',
  'Debate sobre inteligência artificial.',
  'https://portal.com/podcast/podcast-futuro-ia',
  'https://picsum.photos/1200/630?11',
  now(),
  true
),

(
  '002',
  'Política e eleições em 2026',
  'podcast-eleicoes-2026',
  'Especialistas analisam cenário político.',
  'https://youtube.com/watch?v=2',
  'youtube',
  'Equipe Política',
  'Podcast eleições 2026',
  'Análise política atual.',
  'https://portal.com/podcast/podcast-eleicoes-2026',
  'https://picsum.photos/1200/630?12',
  now(),
  true
),

(
  '003',
  'Economia global e criptomoedas',
  'podcast-economia-cripto',
  'Mercado financeiro em debate.',
  'https://spotify.com/episode/3',
  'spotify',
  'Equipe Economia',
  'Economia e cripto',
  'Especial sobre mercado financeiro.',
  'https://portal.com/podcast/podcast-economia-cripto',
  'https://picsum.photos/1200/630?13',
  now(),
  true
),

(
  '004',
  'Champions League em análise',
  'podcast-champions-league',
  'Resumo da rodada europeia.',
  'https://spotify.com/episode/4',
  'audio',
  'Equipe Esportes',
  'Podcast Champions League',
  'Análise esportiva.',
  'https://portal.com/podcast/podcast-champions-league',
  'https://picsum.photos/1200/630?14',
  now(),
  true
),

(
  '005',
  'Cinema brasileiro em alta',
  'podcast-cinema-brasileiro',
  'Discussão sobre audiovisual nacional.',
  'https://youtube.com/watch?v=5',
  'youtube',
  'Equipe Cultura',
  'Podcast cinema nacional',
  'Cinema brasileiro em destaque.',
  'https://portal.com/podcast/podcast-cinema-brasileiro',
  'https://picsum.photos/1200/630?15',
  now(),
  true
),

(
  '006',
  'Cloud computing para iniciantes',
  'podcast-cloud-computing',
  'Introdução à computação em nuvem.',
  'https://spotify.com/episode/6',
  'spotify',
  'Equipe Infra',
  'Cloud computing',
  'Aprenda cloud computing.',
  'https://portal.com/podcast/podcast-cloud-computing',
  'https://picsum.photos/1200/630?16',
  now(),
  true
),

(
  '007',
  'SEO moderno para aplicações web',
  'podcast-seo-moderno',
  'Técnicas atuais de SEO.',
  'https://spotify.com/episode/7',
  'audio',
  'Equipe SEO',
  'SEO moderno',
  'SEO para aplicações web.',
  'https://portal.com/podcast/podcast-seo-moderno',
  'https://picsum.photos/1200/630?17',
  now(),
  true
);

INSERT INTO featured_placements (
  content_item_id,
  starts_at,
  ends_at,
  priority,
  client_name,
  campaign_name,
  is_active
)
SELECT
  id,
  now() - interval '1 day',
  now() + interval '30 days',
  1,
  'Portal Editorial',
  'Destaques Home',
  true
FROM content_items
LIMIT 4;

INSERT INTO featured_placements (
  podcast_episode_id,
  starts_at,
  ends_at,
  priority,
  client_name,
  campaign_name,
  is_active
)
SELECT
  id,
  now() - interval '1 day',
  now() + interval '15 days',
  2,
  'Podcast Network',
  'Podcasts em Destaque',
  true
FROM podcast_episodes
LIMIT 3;

INSERT INTO classifieds (
  title,
  slug,
  short_description,
  content,
  price,
  contact_name,
  contact_email,
  contact_phone,
  city,
  state,
  cover_image_url,
  seo_title,
  seo_description,
  canonical_url,
  og_image_url,
  is_published,
  published_at,
  expires_at,
  is_featured
)
VALUES

(
  'Notebook gamer à venda',
  'notebook-gamer-venda',
  'Notebook gamer seminovo.',
  '[{"type":"paragraph","content":"Notebook gamer com RTX e 16GB RAM."}]',
  4500.00,
  'Carlos Silva',
  'carlos@email.com',
  '31999999999',
  'Belo Horizonte',
  'MG',
  'https://picsum.photos/1200/800?21',
  'Notebook gamer',
  'Notebook gamer seminovo.',
  'https://portal.com/classificados/notebook-gamer-venda',
  'https://picsum.photos/1200/630?21',
  true,
  now(),
  now() + interval '30 days',
  true
),

(
  'Apartamento para aluguel',
  'apartamento-aluguel-centro',
  'Apartamento no centro.',
  '[{"type":"paragraph","content":"Apartamento próximo ao metrô e comércio."}]',
  2500.00,
  'Fernanda Lima',
  'fernanda@email.com',
  '31988888888',
  'São Paulo',
  'SP',
  'https://picsum.photos/1200/800?22',
  'Apartamento aluguel',
  'Apartamento disponível.',
  'https://portal.com/classificados/apartamento-aluguel-centro',
  'https://picsum.photos/1200/630?22',
  true,
  now(),
  now() + interval '45 days',
  false
),

(
  'Curso de programação web',
  'curso-programacao-web',
  'Aprenda React e Node.',
  '[{"type":"paragraph","content":"Curso completo de desenvolvimento web."}]',
  799.00,
  'Tech Academy',
  'contato@techacademy.com',
  '31977777777',
  'Rio de Janeiro',
  'RJ',
  'https://picsum.photos/1200/800?23',
  'Curso programação',
  'Curso completo.',
  'https://portal.com/classificados/curso-programacao-web',
  'https://picsum.photos/1200/630?23',
  true,
  now(),
  now() + interval '60 days',
  false
),

(
  'Bicicleta esportiva',
  'bicicleta-esportiva',
  'Bike aro 29 seminova.',
  '[{"type":"paragraph","content":"Bicicleta ideal para trilhas."}]',
  1800.00,
  'Ricardo Alves',
  'ricardo@email.com',
  '31966666666',
  'Curitiba',
  'PR',
  'https://picsum.photos/1200/800?24',
  'Bike esportiva',
  'Bicicleta seminova.',
  'https://portal.com/classificados/bicicleta-esportiva',
  'https://picsum.photos/1200/630?24',
  true,
  now(),
  now() + interval '20 days',
  false
),

(
  'Consultoria em marketing digital',
  'consultoria-marketing-digital',
  'Especialistas em crescimento online.',
  '[{"type":"paragraph","content":"Consultoria para empresas e startups."}]',
  1500.00,
  'Growth Agency',
  'contato@growth.com',
  '31955555555',
  'Belo Horizonte',
  'MG',
  'https://picsum.photos/1200/800?25',
  'Marketing digital',
  'Consultoria especializada.',
  'https://portal.com/classificados/consultoria-marketing-digital',
  'https://picsum.photos/1200/630?25',
  true,
  now(),
  now() + interval '90 days',
  true
),

(
  'Smartphone premium usado',
  'smartphone-premium-usado',
  'Celular em excelente estado.',
  '[{"type":"paragraph","content":"Smartphone com câmera avançada."}]',
  2800.00,
  'Eduardo Nunes',
  'eduardo@email.com',
  '31944444444',
  'Fortaleza',
  'CE',
  'https://picsum.photos/1200/800?26',
  'Smartphone premium',
  'Celular seminovo.',
  'https://portal.com/classificados/smartphone-premium-usado',
  'https://picsum.photos/1200/630?26',
  true,
  now(),
  now() + interval '15 days',
  false
),

(
  'Freelancer React e Node.js',
  'freelancer-react-node',
  'Desenvolvedor full stack.',
  '[{"type":"paragraph","content":"Projetos React, Next.js e Node.js."}]',
  5000.00,
  'Ana Souza',
  'ana@email.com',
  '31900000000',
  'Porto Alegre',
  'RS',
  'https://picsum.photos/1200/800?27',
  'Freelancer full stack',
  'Desenvolvimento web profissional.',
  'https://portal.com/classificados/freelancer-react-node',
  'https://picsum.photos/1200/630?27',
  true,
  now(),
  now() + interval '50 days',
  true
);