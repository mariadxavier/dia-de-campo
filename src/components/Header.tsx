import { Image, NavLink, AdBanner } from "@/src/components";
import logo from "../assets/images/logo-max.svg";
import SearchIcon from "../assets/icons/search-icon.svg";
import PageDefnitions from "../helpers/PageDefinitions";

export default function Header() {
  const pages = PageDefnitions.getAllPages();

  return (
    <>
      <AdBanner bgColor="--color-white-shell" refSection="top" />
      <header className="bg-white w-full flex justify-evenly items-center p-4">
        <div>
          <Image src={logo.src} alt="Logo" width={'197px'} height={'75px'} />
        </div>
        <NavLink items={pages} />
        <div>
          <Image src={SearchIcon.src} alt="Buscar" width={'24px'} height={'24px'} />
        </div>
      </header>
    </>
  );
}
