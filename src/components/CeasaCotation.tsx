"use client";
import { CeasaPriceItem } from "../types/Ceasa";
import { CeasaMobileItem, CeasaPriceTable, Pagination } from "@/src/components";
import { useSearchParams } from "next/navigation";

export default function CeasaCotation({ ceasaName, items }: { ceasaName: string, items: CeasaPriceItem[] }) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pageStr = params.get('page')
    const page = typeof pageStr === 'string' ? parseInt(pageStr, 10) : 1;
    const currentPage = isNaN(page) || page < 1 ? 1 : page;
    const ITEMS_PER_PAGE = 5;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
    const paginatedItems = items.slice(offset, offset + ITEMS_PER_PAGE);

    return (
        <section className="flex flex-col gap-4 px-5 py-8 bg-(--color-white-dust)">
            <h1 className="font-bold text-2xl">
                Cotações em {ceasaName}
            </h1>
            <p className="text-(--color-gray) text-[13px]">Preços de referência por unidade comercial. Valores em reais e variação comparada ao fechamento anterior.</p>
            <div className="md:hidden flex flex-col gap-4">
                {paginatedItems && paginatedItems.map((item, idx) => (
                    <CeasaMobileItem
                        key={idx}
                        product={item.productName}
                        unity={item.unity || 'kg'}
                        variation={item.priceVariation || 0}
                        previousPrice={item.previousPrice || 0}
                        currentPrice={item.dailyPrice || 0}
                        branch={item.ceasaName}
                    />
                ))}
            </div>
            <div className="hidden md:block">
                {items &&
                    <CeasaPriceTable tableRows={paginatedItems} />
                }

            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} hasScroll={false} hasLoadMoreButton={false} />
        </section>
    );
}