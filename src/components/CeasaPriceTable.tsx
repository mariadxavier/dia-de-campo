'use client';
import { CeasaPriceItem } from '../types';
import { Formatter } from '../util/Formatter';
import { useRouter } from 'next/navigation';

type CeasaPriceTableProps = {
  tableRows: CeasaPriceItem[];
};

export default function CeasaPriceTable({ tableRows }: CeasaPriceTableProps) {
  const router = useRouter();
  const formatVariation = (val: number) => {
    const formatted = Math.abs(val).toFixed(2).replace('.', ',');
    if (val > 0) return `+${formatted}%`;
    if (val < 0) return `-${formatted}%`;
    return `${formatted}%`;
  };

  return (
    <table className="w-full">
      <thead className="bg-(--color-green) text-(--color-white) text-xs rounded-t-xl">
          <tr>
            <th className="text-left py-4 px-6">CEASA</th>
            <th className="text-left py-4 px-6">Produto</th>
            <th className="text-left py-4 px-6">Unidade</th>
            <th className="text-left py-4 px-6">Preço Hoje</th>
            <th className="text-left py-4 px-6">Variação</th>
          </tr>
      </thead>
      <tbody className="text-(--color-green) font-semibold text-xs rounded-b-xl">
        {tableRows &&
          tableRows.map((row, idx) => (
            <tr key={idx} className="odd:bg-(--color-white-shell) even:bg-(--color-white) cursor-pointer" onClick={() => router.push(row.link)}>
              <td className="py-4 px-6">{row.ceasaName}</td>
              <td className="py-4 px-6">{row.productName}</td>
              <td className="py-4 px-6">{row.unity}</td>
              <td className="py-4 px-6">{Formatter.currency(row.dailyPrice)}</td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center justify-center font-bold px-3 py-1 rounded-full text-[11px] min-w-[70px] ${(row.priceVariation || 0) <= 0
                    ? 'bg-(--color-light-green) text-(--color-green)'
                    : 'bg-(--color-light-red) text-(--color-red)'
                  }`}
                  >
                  {formatVariation(row.priceVariation || 0)}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
