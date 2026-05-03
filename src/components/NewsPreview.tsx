import { Image } from "@/src/components";
import Highlights from "../helpers/Highlights";
import Link from "next/link";
export default function NewsPreview() {
  const newsHighlights = Highlights.getHighlightNews();
  return (
    <>
      {newsHighlights &&
        newsHighlights.map((news, idx) => (
          <Link href={news.link} key={idx}>
            <article className="flex flex-col gap-2">
              <Image
                src={news.coverImage}
                alt={news.title}
                width={328}
                height={246}
                className="min-w-[328px] h-[246px]"
              />
              <h3 className="text-(--color-yellow) font-bold text-xs">
                {news.categoryName}
              </h3>
              <h2 className="font-bold text-lg/5">{news.title}</h2>
              <p className="text-sm">{news.shortDescription}</p>
            </article>
          </Link>
        ))}
    </>
  );
}
