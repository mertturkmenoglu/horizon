export const validLangKeys = ['en', 'tr'] as const;

export type TLangKey = (typeof validLangKeys)[number];

export function isValidLangKey(key: string): key is TLangKey {
  for (const lang of validLangKeys) {
    if (key === lang) return true;
  }
  return false;
}
