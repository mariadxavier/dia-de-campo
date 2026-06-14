import Link from "next/link";

export default function RowNavigation({ items }: { items: { href: string, name: string }[] }) {
  return (
    <div className="hidden gap-3 lg:flex items-center lg:gap-6">
      {items.map((item) => (
        <Link href={item.href} key={item.href}>
          <p className="text-xs text-(--color-green)">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}