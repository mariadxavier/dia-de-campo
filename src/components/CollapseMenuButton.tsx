"use client";

export default function CollapseMenuButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {

    return <button
        onClick={onClick}
        className="relative flex h-10 w-10 items-center justify-center cursor-pointer"
        aria-label="Menu"
    >
        <span className={`absolute h-0.5 w-6 bg-(--color-green) transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-2"} `} />
        <span className={`absolute h-0.5 w-6 bg-(--color-green) transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"} `} />
        <span className={`absolute h-0.5 w-6 bg-(--color-green) transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-2"} `} />
    </button>
}