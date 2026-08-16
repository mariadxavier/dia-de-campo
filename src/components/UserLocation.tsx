"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CONSENT_UPDATED_EVENT,
  hasGeolocationConsent,
  type ConsentPreferences,
} from "@/src/helpers/consent";

function requestNearestCeasa(router: ReturnType<typeof useRouter>) {
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      await fetch("/api/nearest-ceasa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      });
      router.refresh();
    },
    (err) => {
      console.error("[ERROR] Busca de CEASA mais próxima:", err);
    },
  );
}

export default function UserLocation() {
  const router = useRouter();

  useEffect(() => {
    const tryGeolocation = () => {
      if (!hasGeolocationConsent()) return;
      requestNearestCeasa(router);
    };

    tryGeolocation();

    const handleConsentUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ConsentPreferences>).detail;
      if (detail?.geolocation) {
        requestNearestCeasa(router);
      }
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdate);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdate);
  }, [router]);

  return null;
}
