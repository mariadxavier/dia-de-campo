import { companyInfo } from '@/src/content/legal/companyInfo';
import { privacyPolicySections } from '@/src/content/legal/privacyPolicySections';
import LegalDocument from '@/src/components/LegalDocument';
import { buildSeoMetadata } from '@/src/helpers/BuildSeoMetadata';

export async function generateMetadata() {
  const content = {
    title: 'Política de Privacidade',
    seo_title: 'Política de Privacidade | Portal Dia de Campo',
    seo_description:
      'Saiba como o Portal Dia de Campo coleta, utiliza e protege seus dados pessoais, em conformidade com a LGPD.',
    canonical_url: new URL(
      '/politica-privacidade',
      process.env.NEXT_PUBLIC_APP_URL ?? 'https://portaldiadecampo.com.br',
    ).toString(),
    og_image_url: '',
  };

  return buildSeoMetadata(content);
}

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center bg-(--color-white-shell)">
      <LegalDocument
        title="Política de Privacidade"
        lastUpdated={companyInfo.lastUpdated}
        sections={privacyPolicySections}
      />
    </div>
  );
}
