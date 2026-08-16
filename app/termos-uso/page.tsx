import { companyInfo } from '@/src/content/legal/companyInfo';
import { termsOfUseSections } from '@/src/content/legal/termsOfUseSections';
import LegalDocument from '@/src/components/LegalDocument';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';

export async function generateMetadata() {
  const content = {
    title: 'Termos de Uso',
    seo_title: 'Termos de Uso | Portal Dia de Campo',
    seo_description:
      'Leia os Termos de Uso do Portal Dia de Campo e conheça as regras para utilização dos nossos serviços.',
    canonical_url: new URL(
      '/termos-uso',
      process.env.NEXT_PUBLIC_APP_URL ?? 'https://portaldiadecampo.com.br',
    ).toString(),
    og_image_url: '',
  };

  return buildSeoMetadata(content);
}

export default function TermsOfUsePage() {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center bg-(--color-white-shell)">
      <LegalDocument
        title="Termos de Uso"
        lastUpdated={companyInfo.lastUpdated}
        sections={termsOfUseSections}
      />
    </div>
  );
}
