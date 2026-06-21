import { SiteMap, Copyright, SocialMediaLink, FooterComercialContact } from '@/src/components';

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col md:flex-row gap-6 bg-(--color-bg-blue) p-5 md:p-12 lg:p-20">
        <SocialMediaLink />
        <FooterComercialContact className='lg:hidden' />
        <SiteMap />
        <FooterComercialContact className='hidden lg:flex' />
      </footer>
      <Copyright />
    </>
  );
}
