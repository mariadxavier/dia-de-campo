import { CollapseMenu, Image, LinkButton, RowNavigation } from '@/src/components';
import Logo from '../assets/images/logo.svg';
import SearchIcon from '../assets/icons/search-icon.svg';
import PageDefnitions from '../helpers/PageDefinitions';
import Link from 'next/link';

export default function Header() {
  const pages = PageDefnitions.getPagesToShowOnMenu();

  return (
    <header className="bg-white relative w-full flex justify-between items-center py-3 px-5 gap-3 md:px-10 lg:px-15 xl:px-30">
      <div className="flex gap-3 md:gap-6 lg:gap-8 items-center">
        <CollapseMenu items={pages} />
        <Link href={'/'}>
          <Image src={Logo.src} alt="Dia de Campo" width={86} height={40} />
        </Link>
        <RowNavigation items={pages} />
      </div>
      <div className="flex gap-3 items-center">
        <div>
          <Image src={SearchIcon.src} alt="Buscar" width={24} height={24} />
        </div>
        <LinkButton
          href={'/contato'}
          className="py-2 px-3.5 text-(--color-white) bg-(--color-green) rounded-full text-xs font-semibold md:py-2.5 md:px-5"
        >
          <p>Anuncie</p>
        </LinkButton>
      </div>
    </header>
  );
}
