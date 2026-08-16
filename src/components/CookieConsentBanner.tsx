'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './Button';
import {
  CONSENT_UPDATED_EVENT,
  hasConsentDecision,
  setConsent,
  type ConsentPreferences,
} from '@/src/helpers/consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasConsentDecision());

    const handleConsentUpdate = () => {
      setVisible(!hasConsentDecision());
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdate);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdate);
  }, []);

  const saveConsent = (preferences: Omit<ConsentPreferences, 'timestamp'>) => {
    setConsent(preferences);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies e privacidade"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-(--color-midnight) bg-(--color-dark-blue) p-5 shadow-lg md:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 text-sm text-(--color-gray)">
          <p className="font-bold text-(--color-white)">Privacidade e cookies</p>
          <p>
            Utilizamos cookies funcionais para lembrar a CEASA selecionada e, com seu consentimento,
            geolocalização para sugerir a central mais próxima. Consulte nossa{' '}
            <Link href="/politica-privacidade" className="text-(--color-green) underline">
              Política de Privacidade
            </Link>{' '}
            e nossos{' '}
            <Link href="/termos-uso" className="text-(--color-green) underline">
              Termos de Uso
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            title="Aceitar todos"
            onClick={() => saveConsent({ functional: true, geolocation: true })}
            className="rounded-lg bg-(--color-green) px-4 py-2 text-sm text-(--color-white) hover:bg-(--color-dark-green)"
          />
          <Button
            title="Recusar opcionais"
            onClick={() => saveConsent({ functional: false, geolocation: false })}
            className="rounded-lg border border-(--color-gray) px-4 py-2 text-sm text-(--color-white) hover:bg-(--color-midnight)"
          />
        </div>
      </div>
    </div>
  );
}
