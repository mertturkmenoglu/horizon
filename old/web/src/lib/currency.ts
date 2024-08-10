export const validCurrencies = ['USD', 'TRY'] as const;
export type TValidCurrency = (typeof validCurrencies)[number];

export const currencySymbols: Record<TValidCurrency, string> = {
  USD: '$',
  TRY: '₺',
};

export function isValidCurrency(curr: string): curr is TValidCurrency {
  return validCurrencies.includes(curr as any);
}

export function getCurrencySymbolOrDefault(curr: string): string {
  if (isValidCurrency(curr)) {
    return currencySymbols[curr];
  }

  return currencySymbols['USD'];
}
