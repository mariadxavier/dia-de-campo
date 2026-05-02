import Link from "next/link";
import PageDefinitions from "../helpers/PageDefinitions";
import { SocialMediaLink } from "@/src/components";

export default function SiteMap() {
  const mainPages = PageDefinitions.getMainPages();
  const institutionalPages = PageDefinitions.getinstitutionalPages();
  const columns = [
    { title: "Sitemap", pages: mainPages },
    { title: "Institucional", pages: institutionalPages },
  ];

  return (
    <div className="w-1/2">
      <div className="flex text-(--color-text-gray) w-full">
        {columns &&
          columns.map((column, idx) => (
            <div key={idx} className="flex flex-col gap-5 w-1/2">
              <h3 className="font-bold text-sm">{column.title.toLocaleUpperCase()}</h3>
              <nav aria-label="Mapa do Site">
                <ul className="flex flex-col gap-3">
                  {column.pages &&
                    column.pages.map((page, idx) => (
                      <li key={idx}>
                        <Link href={page.href}>{page.name}</Link>
                      </li>
                    ))}
                </ul>
              </nav>
              {columns.length -1 === idx && <SocialMediaLink />}
            </div>
          ))}
      </div>
    </div>
  );
}
