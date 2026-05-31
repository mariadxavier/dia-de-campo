import Link from 'next/link';
import PageDefinitions from '../helpers/PageDefinitions';

export default function SiteMap() {
  const mainPages = PageDefinitions.getMainPages();
  const institutionalPages = PageDefinitions.getinstitutionalPages();
  const columns = [
    { title: 'Portal', pages: mainPages },
    { title: 'Serviços', pages: institutionalPages },
  ];

  return (
    <div className="flex flex-col gap-6 text-(--color-gray) w-full">
      {columns &&
        columns.map((column, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-(--color-white)">{column.title}</h3>
            <nav aria-label="Mapa do Site">
              <ul className="flex flex-col gap-2 font-xs">
                {column.pages &&
                  column.pages.map((page, idx) => (
                    <li key={idx}>
                      <Link href={page.href}>{page.name}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        ))}
    </div>
  );
}
