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
    <div className="flex justify-between md:justify-around gap-6 text-(--color-gray) w-full">
      {columns &&
        columns.map((column, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h3 className="font-bold text-sm text-(--color-white) after:content-[''] relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-8 after:rounded-full after:bg-(--color-green)">{column.title}</h3>
            <nav aria-label="Mapa do Site">
              <ul className="flex flex-col gap-2 font-xs">
                {column.pages &&
                  column.pages.map((page, idx) => (
                    <li key={idx}>
                      <Link href={page.href} className='text-xs'>{page.name}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        ))}
    </div>
  );
}
