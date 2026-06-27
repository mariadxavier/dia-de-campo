"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLocation() {
    const router = useRouter();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const params = {
                latitude: coords.latitude,
                longitude: coords.longitude,
            }
            await fetch("/api/nearest-ceasa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });
            router.refresh();
        }, (err) => {
            console.error("[ERROR] Busca de CEASA mais próxima:", err);
        });
    }, []);

    return null;
}