import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Portal Dia de Campo",
        "short_name": "Dia de Campo",
        "description": "O Portal Dia de Campo conecta produtores, atacadistas, centrais de abastecimento e profissionais do setor hortigranjeiro com notícias, conteúdo técnico, análises de mercado, podcasts e indicadores estratégicos.",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#008542",
        "icons": [
            {
                "src": "/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                "src": "/icon-192-maskable.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/icon-512-maskable.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ]
    }
}