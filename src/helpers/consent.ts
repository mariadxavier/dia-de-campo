export const CONSENT_STORAGE_KEY = 'dia-de-campo-consent';
export const CONSENT_UPDATED_EVENT = 'dia-de-campo-consent-updated';

export type ConsentPreferences = {
  functional: boolean;
  geolocation: boolean;
  timestamp: string;
};

export function getConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function setConsent(preferences: Omit<ConsentPreferences, 'timestamp'>): ConsentPreferences {
  const consent: ConsentPreferences = {
    ...preferences,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: consent }));

  return consent;
}

export function hasConsentDecision(): boolean {
  return getConsent() !== null;
}

export function hasGeolocationConsent(): boolean {
  return getConsent()?.geolocation === true;
}

export function hasFunctionalConsent(): boolean {
  return getConsent()?.functional === true;
}
