'use client';
import Link from 'next/link';
import FeaturedContent from '../helpers/FeaturedContent';
import { Formatter } from '../util/Formatter';
import { useMediaQuery } from '../context/MediaQuery';

export default function CeasaPreview() {
  const ceasaPricesHighlights = FeaturedContent.getHighlightCeasaPrices();
  const { isSmScreen, isMdScreen, isLgScreen } = useMediaQuery();

  return (
    <>
      {isSmScreen &&
        ceasaPricesHighlights.map((ceasaPrice, idx) => (
          <Link href={ceasaPrice.link} key={idx}>
            <article className="flex items-center w-full bg-(--color-white) p-4 gap-3 rounded-lg border border-(--color-faded-white)">
              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="font-bold text-sm">{ceasaPrice.title}</h3>
                <p className="text-(--color-gray) text-xs">{ceasaPrice.unity}</p>
              </div>
              <h2 className="font-bold text-(--color-dark-green)">
                {Formatter.currency(ceasaPrice.price)}
              </h2>
              <p
                className={`flex justify-center text-xs font-bold px-4 py-2 bg-(--color-light-green) text-(--color-green) rounded-full min-w-13`}
              >
                {ceasaPrice.priceVariation}
              </p>
            </article>
          </Link>
        ))}
      {(isMdScreen || isLgScreen) && (
        <div className='w-full overflow-hidden rounded-xl'>
          <table className="w-full">
            <thead className="bg-(--color-green) text-(--color-white) text-xs rounded-t-xl">
              <tr >
                <th className="text-left py-4 px-6">Produto</th>
                <th className="text-left py-4 px-6">Unidade</th>
                <th className="text-left py-4 px-6">Preço Hoje</th>
                <th className="text-left py-4 px-6">Variação</th>
              </tr>
            </thead>
            <tbody className="text-(--color-green) font-semibold text-xs rounded-b-xl">
              {ceasaPricesHighlights &&
                ceasaPricesHighlights.map((ceasaPrice, idx) => (
                  <tr key={idx} className="odd:bg-(--color-white-shell) even:bg-(--color-white)">
                    <td className="py-4 px-6">{ceasaPrice.title}</td>
                    <td className="py-4 px-6">{ceasaPrice.unity}</td>
                    <td className="py-4 px-6">{Formatter.currency(ceasaPrice.price)}</td>
                    <td className="py-4 px-6">
                      <span>{ceasaPrice.priceVariation}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
