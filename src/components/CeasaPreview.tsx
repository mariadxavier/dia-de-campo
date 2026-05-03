import Link from "next/link";
import Highlights from "../helpers/Highlights";
import { Formatter } from "../util/Formatter";
import { Image } from "@/src/components";

export default function CeasaPreview() {
  const ceasaPricesHighlights = Highlights.getHighlightCeasaPrices();

  return (
    <>
      {ceasaPricesHighlights &&
        ceasaPricesHighlights.map((ceasaPrice, idx) => (
          <Link href={ceasaPrice.link} key={idx}>
            <article className="bg-(--color-white) flex flex-col p-4 gap-4 border border-(--color-text-gray) min-w-[260px]">
              <div className="flex gap-3">
                <p className="p-2 rounded-full text-xs text-(--color-yellow) bg-(--color-gray)">
                  {ceasaPrice.uf}
                </p>
                <h3 className="font-bold text-sm">{ceasaPrice.title}</h3>
              </div>
              <h2 className="text-xl font-extraboold">
                {Formatter.currency(ceasaPrice.price)}
              </h2>
              <div className="flex ceasaPrices-center gap-1">
                <Image
                  src={ceasaPrice.priceVariationIcon}
                  width={20}
                  height={20}
                  alt={"Variação de preço"}
                />
                <p className="text-sm font-bold text-(--color-green)">
                  {ceasaPrice.priceVariation}
                </p>
              </div>
            </article>
          </Link>
        ))}
    </>
  );
}
