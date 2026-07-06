import { Metadata } from 'next';

type SeoEntity = {
  title: string;
  short_description?: string;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  og_image_url?: string | null;
  cover_image_url?: string | null;
};

function toAbsoluteUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://portaldiadecampo.com.br';
  return `${base.replace(/\/$/, '')}${url}`;
}

export function buildSeoMetadata(content: SeoEntity): Metadata {
  const ogImageUrl = toAbsoluteUrl(content.og_image_url ?? content.cover_image_url);

  return {
    title: content.seo_title ?? content.title,

    description: content.seo_description ?? content.short_description,

    alternates: {
      canonical: content.canonical_url,
    },

    openGraph: {
      title: content.seo_title ?? content.title,

      description: content.seo_description ?? content.short_description,

      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: content.title,
            },
          ]
        : [],
    },
  };
}

export async function generateContentMetadata(loader: () => Promise<any>): Promise<Metadata> {
  const content = await loader();

  if (!content) {
    return {
      title: 'Conteúdo não encontrado',
    };
  }

  return buildSeoMetadata(content);
}
