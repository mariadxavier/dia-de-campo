import Link from "next/link";
import { ReactNode } from "react";

export default function LinkButton({children, href, className}: {children: ReactNode, href: string, className?: string}) {
    return(
        <Link className={`font-bold text-xs ${className}`} href={href}>{children}</Link>
    )
}