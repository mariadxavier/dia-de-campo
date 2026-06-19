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

  private viewCounts: Record<string, number> = {
    'feat-1': 3400,
  };

  public getCategoryTabs(): NewsCategoryTab[] {
    return this.categoryTabs;
  }

  public getSearchTags(): string[] {
    return this.searchTags;
  }
}

export default new NewsPageData();
