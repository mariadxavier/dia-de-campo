"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollapseMenuButton({ onClick }: { onClick: () => void }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        onClick();
    }

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return <button
        onClick={handleClick}
        className="relative flex h-10 w-10 items-center justify-center"
        aria-label="Menu"
    >
        <span className={`absolute h-0.5 w-6 bg-(--color-green) transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-2"} `} />
        <span className={`absolute h-0.5 w-6 bg-(--color-green) transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"} `} />
        <span className={`absolute h-0.5 w-6 bg-(--color-green) transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-2"} `} />
    </button>
}