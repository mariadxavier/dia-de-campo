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
