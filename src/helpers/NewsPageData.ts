import { ContentItemRow, CategoryRow } from '../types';

const CATEGORY_COLOR_MAP: Record<string, `--color-${string}`> = {
  Mercado: '--color-green',
  Produção: '--color-green',
  Clima: '--color-vibrant-blue',
  Pragas: '--color-red',
  Tecnologia: '--color-green',
  Política: '--color-red',
};

export function getCategoryBadgeColor(categoryName: string | null | undefined): `--color-${string}` {
  if (!categoryName) return '--color-green';
  return CATEGORY_COLOR_MAP[categoryName] ?? '--color-green';
}

export function formatPublishedDate(isoDate: string | null): string {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const day = date.getDate();
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${day} ${months[date.getMonth()]}`;
}

function cat(id: string, name: string, slug: string): CategoryRow {
  return {
    id,
    name,
    slug,
    seo_title: null,
    seo_description: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  };
}

const CATEGORIES: Record<string, CategoryRow> = {
  mercado: cat('1', 'Mercado', 'mercado'),
  producao: cat('2', 'Produção', 'producao'),
  clima: cat('3', 'Clima', 'clima'),
  pragas: cat('4', 'Pragas', 'pragas'),
  tecnologia: cat('5', 'Tecnologia', 'tecnologia'),
  politica: cat('6', 'Política', 'politica'),
};

function row(
  partial: Pick<ContentItemRow, 'id' | 'title' | 'slug' | 'short_description' | 'cover_image_url' | 'published_at' | 'sort_order'> & { categories: CategoryRow },
): ContentItemRow {
  return {
    type: 'news',
    category_id: partial.categories.id,
    content: [],
    seo_title: null,
    seo_description: null,
    canonical_url: null,
    og_image_url: null,
    search_vector: null,
    is_published: true,
    created_by: null,
    created_at: partial.published_at ?? '2026-05-01T00:00:00Z',
    updated_at: partial.published_at ?? '2026-05-01T00:00:00Z',
    ...partial,
  };
}

export type NewsCategoryTab = {
  name: string;
  slug: string;
  count: number;
};

class NewsPageData {
  private categoryTabs: NewsCategoryTab[] = [
    { name: 'Todos', slug: 'todos', count: 2487 },
    { name: 'Mercado', slug: 'mercado', count: 642 },
    { name: 'Produção', slug: 'producao', count: 518 },
    { name: 'Pragas', slug: 'pragas', count: 315 },
    { name: 'Clima', slug: 'clima', count: 274 },
    { name: 'Tecnologia', slug: 'tecnologia', count: 198 },
    { name: 'Política', slug: 'politica', count: 540 },
  ];

  private searchTags: string[] = ['tomate', 'alface', 'goiaba', 'CEASA-MG'];

  private featuredArticle: ContentItemRow = row({
    id: 'feat-1',
    title: 'Preços do tomate disparam 40% nas centrais de abastecimento do Sudeste',
    slug: 'precos-tomate-disparam-40-centrais-sudeste',
    short_description:
      'Estiagem prolongada empurrou o tomate aos maiores patamares do ano. Análise mostra variação de até 65%.',
    cover_image_url:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=500&fit=crop',
    published_at: '2026-05-10T09:00:00Z',
    sort_order: 0,
    categories: CATEGORIES.mercado,
  });

  private articles: ContentItemRow[] = [
    row({
      id: '2',
      title: 'Novas técnicas de irrigação reduzem custo em 30%',
      slug: 'novas-tecnicas-irrigacao-reduzem-custo',
      short_description:
        'Tecnologia de irrigação por gotejamento inteligente promete revolucionar o setor.',
      cover_image_url:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      published_at: '2026-05-08T14:00:00Z',
      sort_order: 1,
      categories: CATEGORIES.producao,
    }),
    row({
      id: '3',
      title: 'Frente fria avança e afeta lavouras de MG e SP',
      slug: 'frente-fria-avanca-afeta-lavouras',
      short_description:
        'Temperaturas devem cair significativamente nas principais regiões produtoras.',
      cover_image_url:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      published_at: '2026-05-08T10:00:00Z',
      sort_order: 2,
      categories: CATEGORIES.clima,
    }),
    row({
      id: '4',
      title: 'Alerta: mosca-branca ameaça safra de tomate',
      slug: 'alerta-mosca-branca-ameaca-safra-tomate',
      short_description:
        'Produtores devem redobrar a atenção com o controle biológico da praga.',
      cover_image_url:
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
      published_at: '2026-05-07T08:30:00Z',
      sort_order: 3,
      categories: CATEGORIES.pragas,
    }),
    row({
      id: '5',
      title: 'Sensores IoT chegam ao cultivo de hortifruti em larga escala',
      slug: 'sensores-iot-chegam-cultivo-hortifruti',
      short_description:
        'Dispositivos conectados permitem monitoramento em tempo real das condições do solo.',
      cover_image_url:
        'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
      published_at: '2026-05-06T11:00:00Z',
      sort_order: 4,
      categories: CATEGORIES.tecnologia,
    }),
    row({
      id: '6',
      title: 'Governo amplia crédito rural para pequenos produtores',
      slug: 'governo-amplia-credito-rural-pequenos-produtores',
      short_description:
        'Novas linhas de financiamento facilitam o acesso ao crédito para agricultura familiar.',
      cover_image_url:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      published_at: '2026-05-05T16:00:00Z',
      sort_order: 5,
      categories: CATEGORIES.politica,
    }),
  ];

  private readTimes: Record<string, number> = {
    'feat-1': 5,
    '2': 4,
    '3': 4,
    '4': 3,
    '5': 6,
    '6': 7,
  };

  private viewCounts: Record<string, number> = {
    'feat-1': 3400,
  };

  public getCategoryTabs(): NewsCategoryTab[] {
    return this.categoryTabs;
  }

  public getSearchTags(): string[] {
    return this.searchTags;
  }

  public getTotalResults(): number {
    return 2487;
  }

  public getFeaturedArticle(): ContentItemRow {
    return this.featuredArticle;
  }

  public getArticles(): ContentItemRow[] {
    return this.articles;
  }

  public getReadTime(id: string): number {
    return this.readTimes[id] ?? 4;
  }

  public getViewCount(id: string): number | undefined {
    return this.viewCounts[id];
  }

  public getTotalPages(): number {
    return 125;
  }
}

export default new NewsPageData();
