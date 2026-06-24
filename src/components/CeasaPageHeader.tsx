"use client";
import { BreadcrumbItem } from "./Breadcrumb";
import PageHeader from "./PageHeader";

export default function CeasaPageHeader() {
    const BREADCRUMB: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Preços CEASA", href: "/precos-ceasa" }
    ];
    const handleSearch = (search: string) => {
    }

    return (
        <PageHeader
            breadcrumb={BREADCRUMB}
            title="Preços CEASA"
            description="Consulte preços atualizados de frutas, legumes e verduras nas principais Centrais de Abastecimento do Brasil e acompanhe as movimentações do mercado."
            hasSearch
            searchPlaceholder="Buscar produto, ex: abacate"
        />
    )
}