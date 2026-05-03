import { NewsletterForm, SiteMap, Copyright, AdBanner } from "@/src/components";

export default function Footer() {
  return (
    <footer className="bg-(--color-green)">
      <AdBanner bgColor="--color-dark-green" refSection="footer" />
      <div>
        <div className="flex justify-between p-4 gap-8">
          <div className="w-1/2 flex flex-col py-4 gap-9 items-end">
            <p className="text-(--color-light-gray) w-1/3">
              A principal fonte de informação para o agronegócio. Notícias,
              cotações e conteúdo técnico de qualidade para o produtor rural
            </p>
            <NewsletterForm />
          </div>
          <SiteMap />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}
