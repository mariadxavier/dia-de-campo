"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function CeasaBranchSelection({ branches, selectedBranch }: { branches: string[], selectedBranch: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("ceasa", e.target.value);
        router.push(`?${params.toString()}`);
    };
    return (
        <section className="flex flex-col px-5 py-8 w-full gap-4">
            <h1 className="font-bold text-lg">Selecione a central</h1>
            <div className="bg-(--color-light-green) px-4 py-2 border border-(--color-green) rounded-full text-(--color-green)">
                <select
                    className="w-full  border-none font-semibold text-[13px] outline-none"
                    value={selectedBranch}
                    onChange={handleChange}
                >
                    {branches && branches.map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}