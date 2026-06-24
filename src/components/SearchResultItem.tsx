import Button from "./Button";

export default function SearchResultItem({ item, handleRedirect }: { item: any, handleRedirect: (href: string) => void }) {
    return (
        <Button className="w-full flex items-center gap-4 justify-between font-bold border border-(--color-light-gray) rounded-lg bg-(--color-white) p-4 shadow-md" onClick={() => handleRedirect(item.href)}>
            <div className="flex items-center gap-4">
                <p className="bg-(--color-light-green) w-7 h-7 rounded-full flex items-center justify-center text-(--color-green) text-[13px] p-2">{item.name.toUpperCase().slice(0, 1)}</p>
                <div className="flex flex-col w-full items-start">
                    <p className="text-(--color-green) text-[11px]">{item.category}</p>
                    <p className="text-sm text-(--color-dark-blue) text-left line-clamp-3">
                        {item.description}
                    </p>
                </div>
            </div>
            <p className="text-(--color-gray)">›</p>
        </Button>
    )
}