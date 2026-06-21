import Link from "next/link";

export default function FooterComercialContact({ className }: { className?: string }) {
    return <div className={`flex flex-col gap-3 bg-(--color-urain-blue) p-4 rounded-xl border border-(--color-faded-white) ${className}`}>
        <h1 className="font-bold text-(--color-white)">Atendimento comercial</h1>
        <p className="text-xs text-(--color-gray)">Mídia, publicidade, parcerias e soluções para marcas do agro</p>
        <Link
            href="?contato=true"
            scroll={false} className="text-nowrap shrink-0 bg-(--color-green) text-(--color-white) text-sm rounded-lg w-fit px-5 py-2">
            Falar com comercial
        </Link>
    </div>
}