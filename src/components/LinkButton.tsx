import Link from "next/link";
import { ReactNode } from "react";

export default function LinkButton({children, href, className}: {children: ReactNode, href: string, className?: string}) {
    return(
        <Link className={`p-4 font-bold text-sm ${className}`} href={href}>{children}</Link>
    )
}