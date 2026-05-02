import Link from "next/link";

type NavLinkProps = {
  items: {
    href: string;
    name: string;
  }[];
};

export default function NavLink({ items }: NavLinkProps) {
  return (
    <nav>
      <ul className="flex gap-6 items-center">
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
  );
}
