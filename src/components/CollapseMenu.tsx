"use client";
import Link from "next/link";
import { CollapseMenuButton, CollapseMenuPartnerCard } from "@/src/components";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  items: {
    href: string;
    name: string;
  }[];
};

export default function CollapseMenu({ items }: NavLinkProps) {
  const pathname = usePathname();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleMenuExpanded = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  useEffect(() => {
    setIsMenuExpanded(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuExpanded]);

  return (
    <div className="lg:hidden flex items-center">
      <CollapseMenuButton onClick={toggleMenuExpanded} />
      {isMenuExpanded &&
        <div className="flex flex-col gap-3 w-screen h-screen absolute z-999 bg-(--color-white-shell) top-16 left-0 p-5 shadow-xl">
          <h1 className="text-(--color-bg-blue) text-2xl font-bold">Menu</h1>
          <p className="text-sm text-(--color-gray)">Acesse as principais áreas do Dia de Campo</p>
          <nav>
            <ul className="flex flex-col gap-6 bg-(--color-white) p-4 divide-b-4 divide-(--color-gray)">
              {items &&
                items.map((item, idx) => (
                  <li key={idx} >
                    <Link className="flex items-center gap-4  justify-between font-bold text-(--color-green) text-sm" href={item.href}>
                      <div className="flex items-center gap-4">

                        <p className="bg-(--color-yellow) w-7 h-7 rounded-full flex items-center justify-center text-(--color-green) text-xs">{item.name.toUpperCase().slice(0, 2)}</p>
                        <p>
                          {item.name.toUpperCase()}
                        </p>
                      </div>
                      <p className="text-(--color-gray)">›</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <CollapseMenuPartnerCard />
        </div>
      }
    </div>
  );
}
