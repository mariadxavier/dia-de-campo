import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const { latitude, longitude } = await request.json();

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: "Latitude e longitude são obrigatórias" },
                { status: 400 }
            );
        }

        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase.rpc("find_nearest_ceasa", {
            lat: latitude,
            lng: longitude,
        });

        if (error) {
            return NextResponse.json(
                { error: "Erro ao buscar CEASA mais próxima", details: error.message },
                { status: 500 }
            );
        }

        if (!data || data.length === 0) {
            return NextResponse.json(
                { error: "Nenhuma CEASA encontrada próxima à localização" },
                { status: 404 }
            );
        }

        const ceasa = data[0];
        const response = NextResponse.json({
            ceasa
        });

        response.cookies.set(
            "selected-ceasa",
            ceasa.name
        );

        return response;
    } catch (error) {
        console.error("Erro inesperado na rota /api/nearest-ceasa:", error);

        return NextResponse.json(
            { error: "Erro inesperado no servidor", details: (error as Error).message },
            { status: 500 }
        );
    }
}