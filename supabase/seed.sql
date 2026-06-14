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
  slot,
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
  data.slot::content_slot,
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
    'content',
    'mercado',
    'Mercado de tecnologia registra crescimento no primeiro semestre',
    'mercado-tecnologia-crescimento-primeiro-semestre',
    'Empresas ampliam investimentos em inovação e transformação digital.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    '[
      {
        "type": "paragraph",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt, velit at vulputate hendrerit, justo arcu gravida purus, sed feugiat augue purus et magna."
      },
      {
        "type": "image",
        "content": "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      },
      {
        "type": "subtitle",
        "content": "Investimentos continuam em alta"
      },
      {
        "type": "paragraph",
        "content": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent facilisis odio vel lorem varius, non luctus metus dignissim."
      },
      {
        "type": "quote",
        "content": "A transformação digital deixou de ser diferencial e passou a ser requisito competitivo."
      },
      {
        "type": "paragraph",
        "content": "Donec euismod eros nec sem efficitur, non vestibulum velit malesuada. Sed consequat tincidunt turpis, eget faucibus tortor faucibus vitae."
      }
    ]'::jsonb,
    'Mercado de tecnologia cresce em ritmo acelerado',
    'Empresas ampliam investimentos em inovação durante o semestre.',
    '/noticias/mercado-tecnologia-crescimento-primeiro-semestre',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    now() - interval '2 days',
    true,
    1
),
(
  'news',
  'hero',
  'tecnologia',
  'Nova solução logística reduz tempo de entrega em grandes centros',
  'nova-solucao-logistica-reduz-tempo-entrega',
  'Operadoras relatam ganhos significativos de eficiência.',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
  '[
    {
      "type": "paragraph",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, augue sit amet facilisis dignissim, mauris metus malesuada nisi, eget placerat tortor libero eget nulla."
    },
    {
      "type": "subtitle",
      "content": "Resultados observados nos primeiros testes"
    },
    {
      "type": "paragraph",
      "content": "Morbi pharetra velit vitae justo malesuada, vitae sollicitudin nisl dignissim. Suspendisse potenti. Fusce ac tincidunt nibh."
    },
    {
      "type": "image",
      "content": "https://images.unsplash.com/photo-1553413077-190dd305871c"
    },
    {
      "type": "quote",
      "content": "A redução no tempo médio de entrega superou as expectativas iniciais."
    },
    {
      "type": "paragraph",
      "content": "Sed gravida, tortor sed pellentesque efficitur, erat justo malesuada eros, nec viverra leo purus et lorem."
    }
  ]'::jsonb,
  'Logística ganha eficiência com nova tecnologia',
  'Projeto reduz prazos e melhora experiência dos consumidores.',
  '/noticias/nova-solucao-logistica-reduz-tempo-entrega',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
  now() - interval '5 days',
  true,
  2
),
(
  'news',
  'hero',
  'tecnologia',
  'Setor de energia investe em fontes renováveis para próxima década',
  'setor-energia-fontes-renovaveis-proxima-decada',
  'Empresas anunciam novos projetos voltados à sustentabilidade.',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
  '[
    {
      "type": "paragraph",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu velit a nibh cursus hendrerit. Nullam ullamcorper metus eget ex condimentum, sit amet pulvinar turpis volutpat."
    },
    {
      "type": "image",
      "content": "https://images.unsplash.com/photo-1509391366360-2e959784a276"
    },
    {
      "type": "subtitle",
      "content": "Meta é ampliar participação das renováveis"
    },
    {
      "type": "paragraph",
      "content": "Aliquam erat volutpat. Donec ullamcorper magna sed orci fermentum, nec aliquet velit placerat. Integer vitae ultrices tortor."
    },
    {
      "type": "quote",
      "content": "A sustentabilidade será um dos pilares estratégicos dos próximos anos."
    },
    {
      "type": "paragraph",
      "content": "Mauris volutpat, arcu vitae vulputate pellentesque, neque ligula porttitor augue, quis luctus risus turpis nec lorem."
    }
  ]'::jsonb,
  'Investimentos em energia renovável avançam',
  'Companhias anunciam projetos focados em sustentabilidade.',
  '/noticias/setor-energia-fontes-renovaveis-proxima-decada',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
  now() - interval '7 days',
  true,
  3
),
(
  'news',
  'content',
  'tecnologia',
  'Pesquisa aponta aumento no consumo de conteúdo digital',
  'pesquisa-aumento-consumo-conteudo-digital',
  'Levantamento mostra mudanças no comportamento dos usuários.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  '[
    {
      "type": "paragraph",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius nisl non mauris pulvinar, at ullamcorper orci malesuada."
    },
    {
      "type": "subtitle",
      "content": "Streaming lidera crescimento"
    },
    {
      "type": "paragraph",
      "content": "Nam porttitor lacus et neque faucibus, nec pellentesque lorem malesuada. Integer pretium tempor libero, sed feugiat massa."
    },
    {
      "type": "quote",
      "content": "Os hábitos digitais continuam evoluindo em ritmo acelerado."
    },
    {
      "type": "image",
      "content": "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
    },
    {
      "type": "paragraph",
      "content": "Praesent aliquet metus vitae nunc pulvinar, nec facilisis nunc aliquet. Nulla facilisi."
    }
  ]'::jsonb,
  'Consumo de conteúdo digital cresce novamente',
  'Pesquisa revela aumento expressivo no uso de plataformas digitais.',
  '/noticias/pesquisa-aumento-consumo-conteudo-digital',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  now() - interval '10 days',
  true,
  4
),
(
  'technical',
  'content',
  'tecnologia',
  'Empresas apostam em inteligência artificial para otimizar processos',
  'empresas-apostam-inteligencia-artificial-otimizar-processos',
  'Automação e análise de dados lideram os investimentos corporativos.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  '[
    {
      "type": "paragraph",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis tristique tortor. Donec convallis pretium felis."
    },
    {
      "type": "image",
      "content": "https://images.unsplash.com/photo-1676276376926-5935d0d36f14"
    },
    {
      "type": "subtitle",
      "content": "IA deixa de ser tendência e vira estratégia"
    },
    {
      "type": "paragraph",
      "content": "Suspendisse sed velit non urna malesuada suscipit. Vivamus consequat sapien et lacus faucibus, sed pretium augue convallis."
    },
    {
      "type": "quote",
      "content": "A inteligência artificial já impacta diretamente indicadores operacionais."
    },
    {
      "type": "paragraph",
      "content": "Curabitur ut nibh vitae libero eleifend posuere. Sed feugiat, turpis vel luctus aliquet, velit lectus tincidunt augue, ac luctus magna augue sed libero."
    }
  ]'::jsonb,
  'IA impulsiona eficiência operacional nas empresas',
  'Organizações ampliam investimentos em inteligência artificial.',
  '/noticias/empresas-apostam-inteligencia-artificial-otimizar-processos',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  now() - interval '1 day',
  true,
  5
),
  (
    'technical',
    'hero',
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
    now(),
    true,
    6
  ),
  (
    'technical',
    'content',
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
    now(),
    true,
    7
  ),
  (
    'technical',
    'content',
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
    now(),
    true,
    8
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
  published_at,
  is_published,
  sort_order
)

JOIN categories c
  ON c.slug = data.category_slug;

INSERT INTO podcast_episodes (
  episode_number,
  episode_time_duration,
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
  '3',
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
  '5',
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
  '8',
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
  '5',
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
  '5',
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
  '5',
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
  '5',
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
  resource_type,
  resource_id,
  starts_at,
  ends_at,
  priority,
  client_name,
  campaign_name,
  is_active
)
VALUES

-- NEWS

(
  'news',
  '316cc0af-d654-4225-af73-be8eb8df88e8',
  now() - interval '7 days',
  now() + interval '30 days',
  100,
  'Portal Editorial',
  'Teste de notícia destaque',
  true
),

(
  'news',
  '59ce9795-4578-4df7-8a48-9d32729ad191',
  now() - interval '3 days',
  now() + interval '20 days',
  90,
  'Portal Editorial',
  'Tecnologia em Evidência',
  true
),

(
  'news',
  '7b87db63-435c-4c1f-9d05-e9af27d85688',
  now() - interval '1 day',
  now() + interval '15 days',
  80,
  'Portal Editorial',
  'Notícias Relevantes',
  true
),

-- TECHNICAL CONTENT

(
  'technical',
  '4d5e9718-88ea-4d41-8242-b92bf3f4a697',
  now() - interval '5 days',
  now() + interval '45 days',
  95,
  'Equipe Técnica',
  'Conteúdo Técnico Premium',
  true
),

(
  'technical',
  'a0bcd99a-f22c-40ab-a038-ab73390353ab',
  now() - interval '2 days',
  now() + interval '30 days',
  85,
  'Equipe Técnica',
  'Aprendizado Full Stack',
  true
),

(
  'technical',
  'e73ec644-c01e-47a5-9705-dd80175dcd5c',
  now() - interval '1 day',
  now() + interval '25 days',
  75,
  'Equipe Técnica',
  'Dev Experience',
  true
),

-- PODCASTS

(
  'podcast',
  '16af19cf-2a06-4f7c-94ae-612153099b75',
  now() - interval '10 days',
  now() + interval '60 days',
  70,
  'Podcast Oficial',
  'Temporada IA',
  true
),

(
  'podcast',
  '2ed893d7-a0b3-470a-b315-dd887bf38ce2',
  now() - interval '4 days',
  now() + interval '45 days',
  65,
  'Podcast Oficial',
  'Especial Política',
  true
),

(
  'podcast',
  '34bb4db6-5006-415c-a172-b3e27848e1af',
  now() - interval '2 days',
  now() + interval '30 days',
  60,
  'Podcast Oficial',
  'Mercado e Tendências',
  true
),

-- CLASSIFIEDS

(
  'classified',
  '4824500a-039c-44cd-97ac-4b1302c54d5e',
  now() - interval '1 day',
  now() + interval '20 days',
  50,
  'Carlos Silva',
  'Notebook Gamer Destaque',
  true
),

(
  'classified',
  '72f538d7-8bb9-494a-97aa-8cc42641f89b',
  now() - interval '2 days',
  now() + interval '25 days',
  40,
  'Fernanda Lima',
  'Imóvel em Destaque',
  true
),

(
  'classified',
  '74dd97b5-07f2-4874-af48-3eba07684064',
  now() - interval '3 days',
  now() + interval '30 days',
  30,
  'Growth Agency',
  'Serviços Profissionais',
  true
);

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