import { HomeSectionCeasaPrices } from '../types';
import { Formatter } from '../util/Formatter';

type CeasaPriceTableProps = {
  tableRows: HomeSectionCeasaPrices[];
};

export default function CeasaPriceTable({ tableRows }: CeasaPriceTableProps) {
  const formatVariation = (val: number) => {
    const formatted = Math.abs(val).toFixed(1).replace('.', ',');
    if (val > 0) return `+${formatted}%`;
    if (val < 0) return `-${formatted}%`;
    return `${formatted}%`;
  };

  return (
    <table className="w-full">
      <thead className="bg-(--color-green) text-(--color-white) text-xs rounded-t-xl">
        <tr>
          <th className="text-left py-4 px-6">Produto</th>
          <th className="text-left py-4 px-6">Unidade</th>
          <th className="text-left py-4 px-6">Preço Hoje</th>
          <th className="text-left py-4 px-6">Variação</th>
        </tr>
      </thead>
      <tbody className="text-(--color-green) font-semibold text-xs rounded-b-xl">
        {tableRows &&
          tableRows.map((row, idx) => (
            <tr key={idx} className="odd:bg-(--color-white-shell) even:bg-(--color-white)">
              <td className="py-4 px-6">{row.title}</td>
              <td className="py-4 px-6">{row.unity}</td>
              <td className="py-4 px-6">{Formatter.currency(row.price)}</td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center justify-center font-bold px-3 py-1 rounded-full text-[11px] min-w-[70px] ${
                    row.priceVariation <= 0
                      ? 'bg-(--color-light-green) text-(--color-green)'
                      : 'bg-(--color-light-red) text-(--color-red)'
                  }`}
                >
                  {formatVariation(row.priceVariation)}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
