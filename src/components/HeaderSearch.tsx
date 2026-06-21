"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Image } from "@/src/components";
import SearchIcon from '@/src/assets/icons/search-icon.svg';

type SearchResult = {
    href: string;
    category: string;
    description: string;
    name: string;
}

export default function HeaderSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pesquisa = searchParams.get('pesquisa') || '';
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpened, setIsOpened] = useState(false);
    
    const onClose = () => {
        setIsOpened(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("pesquisa");
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    const handleRedirect = (href: string) => {
        setIsOpened(false);
        onClose();
        router.push(href);
    }

    useEffect(() => {
        if (!pesquisa || pesquisa.length <= 0) {
            setResults([]);
            setSearchQuery("");
            return;
        }

        const fetchResults = async () => {
            const response = await fetch(`/api/search?q=${pesquisa}`);
            const data = await response.json();
            setResults(data);
        };

        fetchResults();
    }, [pesquisa]);


    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        if(isOpened){
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpened]);

    return (
        <div>
            <Button onClick={() => setIsOpened(true)} className='flex items-center outline-none'>
                <Image src={SearchIcon.src} alt="Buscar" width={24} height={24} className="m-auto" />
            </Button>

            <div className={isOpened ? "flex flex-col gap-3 w-screen h-dvh absolute z-999 bg-(--color-white-shell) top-0 left-0 py-8 px-4 shadow-xl" : "hidden"}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2 items-center text-xs border border-(--color-green) rounded-lg p-2">
                        🔍
                        <input type="text" className="outline-none placeholder:text-(--color-gray)" placeholder="Buscar" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                    </div>
                    <Link href={`?pesquisa=${searchQuery.toLocaleLowerCase()}`} className="font-semibold bg-(--color-yellow) text-(--color-dark-green) p-2 rounded-full text-xs">
                        Pesquisar
                    </Link>
                    <button className="shrink-0 text-(--color-dark-green) bg-(--color-light-green) border border-[#BDE5CB] rounded-full w-7 h-7" onClick={onClose}>X</button>
                </div>
                <h2 className={`font-bold text-(--color-dark-blue) ${pesquisa ? '' : 'hidden'}`}>Resultados para "<span>{pesquisa}</span>"</h2>
                <ul className="flex flex-col gap-3">
                    {results &&
                        results.map((item, idx) => (
                            <li key={idx} >
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
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}