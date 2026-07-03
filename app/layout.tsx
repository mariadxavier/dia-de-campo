import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/src/components';
import type { Metadata } from 'next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portal Dia de Campo',
  description: 'O Portal Dia de Campo conecta produtores, atacadistas, centrais de abastecimento e profissionais do setor hortigranjeiro com notícias, conteúdo técnico, análises de mercado, podcasts e indicadores estratégicos.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
