export const companyInfo = {
  legalName: '[RAZÃO SOCIAL]',
  cnpj: '[CNPJ]',
  address: '[ENDEREÇO COMPLETO]',
  city: '[CIDADE/UF]',
  jurisdiction: '[COMARCA/UF]',
  contactEmail: process.env.NEXT_PUBLIC_COMERCIAL_EMAIL_ADDRESS ?? 'contato@portaldiadecampo.com.br',
  portalName: 'Portal Dia de Campo',
  portalUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://portaldiadecampo.com.br',
  lastUpdated: '16 de agosto de 2026',
} as const;

export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};
