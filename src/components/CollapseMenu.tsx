"use client";
import Link from "next/link";
import MenuIcon from "@/src/assets/icons/sandwich-menu-icon.svg";
import { Image, ActionButton } from "@/src/components";
import { useState } from "react";

type NavLinkProps = {
  items: {
    href: string;
    name: string;
  }[];
};

export default function CollapseMenu({ items }: NavLinkProps) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const toggleMenuExpanded = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };
  return (
    <div className="lg:hidden relative flex items-center">
      <ActionButton action={toggleMenuExpanded}>
        <Image src={MenuIcon.src} alt={"Menu"} width={24} height={24} />
      </ActionButton>
      {isMenuExpanded &&
        <nav className="absolute z-999 bg-(--color-white) top-12 p-4">
          <ul className="flex flex-col gap-6 items-center">
            {items &&
              items.map((item, idx) => (
                <li key={idx} >
                  <Link className="font-bold text-(--color-green) text-sm" href={item.href}>
                    {item.name.toUpperCase()}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      }
    </div>
  );
}
