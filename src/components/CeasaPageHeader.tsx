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
            description="Cotações atualizadas por central de abastecimento, produto e categoria"
            hasSearch
            handleSearch={handleSearch}
            searchPlaceholder="Buscar produto, ex: abacate"
        />
    )
}