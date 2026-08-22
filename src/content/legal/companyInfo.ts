export const companyInfo = {
  legalName: 'BHZ MIDIA E RESULTADO UNIPESSOAL LTDA',
  cnpj: '23.695.706/0001-10',
  address: 'R CICLOPICA, 47 - CAICARA ADELAIDE - CEP: 30750-390',
  city: 'BELO HORIZONTE/MG',
  jurisdiction: 'BELO HORIZONTE/MG',
  contactEmail: 'contato@portaldiadecampo.com.br',
  portalName: 'Portal Dia de Campo',
  portalUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://portaldiadecampo.com.br',
  lastUpdated: '22 de agosto de 2026',
} as const;

export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};
