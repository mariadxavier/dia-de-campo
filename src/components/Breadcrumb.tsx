import { Fragment } from 'react';
import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  currentItemColor?: string;
};

export default function Breadcrumb({ items, currentItemColor = '--color-green' }: BreadcrumbProps) {

  return (
    <nav className="flex items-center gap-1.5 text-xs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={index}>
            {index > 0 && <span className="text-(--color-gray)">›</span>}
            {isLast || !item.href ? (
              <span className={`text-(${currentItemColor}) font-semibold`}>{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-(--color-gray) hover:text-(--color-dark-gray) transition-colors"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
