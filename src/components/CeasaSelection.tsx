"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CeasaProductOption } from "../types";

export default function CeasaSelection({ items, selectedItem, searchParam, label }: { items: string[] | CeasaProductOption[], selectedItem: string, searchParam: string, label: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(searchParam, e.target.value);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };
    return (
        <section className="flex flex-col px-5 w-full gap-4">
            <h1 className="font-bold text-lg">{label}</h1>
            <div className="bg-(--color-light-green) px-4 py-2 border border-(--color-green) rounded-full text-(--color-green)">
                <select
                    className="w-full  border-none font-semibold text-[13px] outline-none"
                    value={selectedItem}
                    onChange={handleChange}
                >
                    {items && items.map((item) => (
                        <option key={typeof item === "string" ? item : item.product_slug} value={typeof item === "string" ? item : item.product_slug}>{typeof item === "string" ? item : item.product_name}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}