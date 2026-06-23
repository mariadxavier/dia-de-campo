import { Formatter } from "../util/Formatter";

type CeasaMobileItemProps = {
  product: string;
  unity: string;
  variation: number;
  previousPrice: number;
  currentPrice: number;
  branch: string;
}

export default function CeasaMobileItem({
  product,
  unity,
  variation,
  previousPrice,
  currentPrice,
  branch,
}: CeasaMobileItemProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            {product}
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            {unity}
          </p>
          <span className="mt-1 text-xs text-gray-400">{branch}</span>
        </div>

        <div className={`rounded-full px-3 py-1 bg-${variation > 0 ? 'red' :'green'}-100`}>
          <span className={`text-sm font-semibold text-${variation > 0 ? 'red' :'green-600'}`}>
            {variation > 0 ? "+" : ""}
            {variation.toFixed(1).replace(".", ",")}%
          </span>
        </div>
      </div>

      <div className="my-2 border-t border-gray-200" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400">Preço atual</p>
          <p className="mt-1 text-sm font-bold text-green-700">
            {Formatter.currency(currentPrice)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Preço anterior</p>
          <p className="mt-1 text-sm font-semibold">
            {Formatter.currency(previousPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}