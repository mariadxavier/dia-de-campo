import { Inter } from 'next/font/google'
import "./globals.css";
import { Header, Footer } from "@/src/components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className='mt-16'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
