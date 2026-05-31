import { NewsletterForm, SiteMap, Copyright, SocialMediaLink } from '@/src/components';

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col gap-6 bg-(--color-bg-blue) p-5">
        <SocialMediaLink />
        <NewsletterForm />
        <SiteMap />
      </footer>
      <Copyright />
    </>
  );
}
