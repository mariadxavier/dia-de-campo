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

export function buildSeoMetadata(content: SeoEntity): Metadata {
  return {
    title: content.seo_title ?? content.title,

    description: content.seo_description ?? content.short_description,

    alternates: {
      canonical: content.canonical_url,
    },

    openGraph: {
      title: content.seo_title ?? content.title,

      description: content.seo_description ?? content.short_description,

      images: [
        {
          url: content.og_image_url ?? content.cover_image_url ?? '',
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
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
