import { CollapseMenu, Image, LinkButton } from "@/src/components";
import Logo from "../assets/images/logo.svg";
import SearchIcon from "../assets/icons/search-icon.svg";
import PageDefnitions from "../helpers/PageDefinitions";

export default function Header() {
  const pages = PageDefnitions.getAllPages();

  return (
    <header className="bg-white w-full flex justify-between items-center py-3 px-5 gap-3">
      <div className="flex gap-3 items-center">
      <CollapseMenu items={pages} />
        <Image src={Logo.src} alt="Dia de Campo" width={86} height={40} />
      </div>
      <div className="flex gap-3 items-center">
        <div>
          <Image src={SearchIcon.src} alt="Buscar" width={24} height={24} />
        </div>
        <LinkButton href={'/contato'} className="p-2 text-(--color-white) bg-(--color-green) rounded-full">
          <p>Anuncie</p>
        </LinkButton>
      </div>
    </header>
  );
}
