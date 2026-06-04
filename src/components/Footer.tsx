import { SiteMap, Copyright, SocialMediaLink } from '@/src/components';

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col md:flex-row gap-6 bg-(--color-bg-blue) p-5 md:p-12 lg:p-20">
        <SocialMediaLink />
        <SiteMap />
      </footer>
      <Copyright />
    </>
  );
}
