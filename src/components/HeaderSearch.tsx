"use client";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Image, SearchResultItem } from "@/src/components";
import SearchIcon from '@/src/assets/icons/search-icon.svg';
import { useMediaQuery } from "../context/MediaQuery";
import type { SearchResult } from "@/src/types";

export default function HeaderSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pesquisa = searchParams.get('pesquisa') || '';
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpened, setIsOpened] = useState(false);
    const pathname = usePathname();
    const desktopInputRef = useRef<HTMLInputElement>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);
    const { isSmScreen } = useMediaQuery();
    const params = new URLSearchParams(searchParams.toString());

    const handleSearch = () => {
        params.set(
            "pesquisa",
            searchQuery,
        );

        router.replace(
            `${pathname}?${params.toString()}`,
            { scroll: false }
        );
    }

    const clearSearch = () => {
        params.delete("pesquisa");
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    const onClose = () => {
        clearSearch();
        setIsOpened(false);

    }

    const handleRedirect = (href: string) => {
        onClose();
        router.push(href);
    }

    useEffect(() => {
        onClose();
    }, [pathname]);

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

        if (isOpened) {
            document.body.style.overflow = "hidden";
            if (!isSmScreen) {
                desktopInputRef.current?.focus();
            } else {
                mobileInputRef.current?.focus();
            }
        }

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpened]);

    useEffect(() => {
        if (searchQuery.length <= 0 || !searchQuery || !isOpened) {
            clearSearch();
        } else {
            handleSearch();
        }
    }, [searchQuery]);

    return (
        <div>
            {/* Desktop inline search bar */}
            <div className={`hidden md:flex gap-2 items-center text-xs overflow-hidden transition-all duration-300 ease-in-out ${isOpened ? 'border border-(--color-green) rounded-lg px-2 py-1 w-52' : 'w-7 border-transparent'}`}>
                <Button onClick={() => setIsOpened(!isOpened)} className='flex items-center outline-none shrink-0'>
                    <Image src={SearchIcon.src} alt="Buscar" width={24} height={24} className="m-auto" />
                </Button>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!searchQuery.trim()) return;
                        handleSearch();
                    }}
                >
                    <input
                        ref={desktopInputRef}
                        type="text"
                        className={`bg-transparent outline-none placeholder:text-(--color-gray) transition-all duration-300 ${isOpened ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                        placeholder="Buscar"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        tabIndex={isOpened ? 0 : -1}
                    />
                </form>
            </div>
            {/* Mobile icon only */}
            <Button onClick={() => setIsOpened(true)} className='flex items-center outline-none md:hidden'>
                <Image src={SearchIcon.src} alt="Buscar" width={24} height={24} className="m-auto" />
            </Button>


            <div onClick={onClose} className={`cursor-pointer w-screen h-dvh absolute z-999 top-0 md:top-16 left-0 py-8 px-4 md:py-4 md:px-10 lg:px-16 xl:px-20 shadow-xl bg-(--color-white-shell) md:bg-black/50 transition-all duration-200 ease-out ${isOpened ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div onClick={(e) => e.stopPropagation()} className="cursor-default flex flex-col gap-3 bg-(--color-white-shell) md:p-5 md:rounded-lg">
                    {/* Mobile */}
                    <div className="flex items-center justify-between w-full md:hidden">
                        <div className="flex gap-2 items-center text-xs border border-(--color-green) rounded-lg p-2">
                            🔍
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!searchQuery.trim()) return;
                                    handleSearch();
                                }}
                            >
                                <input
                                    ref={mobileInputRef}
                                    type="text"
                                    className="outline-none placeholder:text-(--color-gray)"
                                    placeholder="Buscar"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                    tabIndex={isOpened ? 0 : -1}
                                />
                            </form>
                        </div>
                        <Link href={`?pesquisa=${searchQuery.toLocaleLowerCase()}`} className="font-semibold bg-(--color-yellow) text-(--color-dark-green) p-2 rounded-full text-xs">
                            Pesquisar
                        </Link>
                        <button className="cursor-pointer shrink-0 text-(--color-dark-green) bg-(--color-light-green) border border-[#BDE5CB] rounded-full w-7 h-7" onClick={onClose}>X</button>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className={"font-bold text-(--color-dark-blue)"}>Resultados para "<span>{pesquisa}</span>"</h2>
                        <button className="cursor-pointer hidden md:block shrink-0 text-(--color-dark-green) bg-(--color-light-green) border border-[#BDE5CB] rounded-full w-7 h-7" onClick={onClose}>X</button>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {results &&
                            results.map((item, idx) => (
                                <li key={idx} >
                                    <SearchResultItem item={item} handleRedirect={handleRedirect} />
                                </li>
                            ))}

                        <li key="empty" className={results && results.length > 0 ? 'hidden' : 'flex h-100 items-center justify-center'}>
                            <p className="text-(--color-gray)">{(searchQuery && pesquisa.length > 0) ? `Nenhum resultado encontrado para "${pesquisa}"` : 'Realize uma busca para ver os resultados'}</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}