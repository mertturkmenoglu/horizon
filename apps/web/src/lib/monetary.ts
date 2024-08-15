export const PriceUnitsArr = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'INR',
  'BRL',
  'CZK',
  'TRY',
] as const;

export type PriceUnit = (typeof PriceUnitsArr)[number];

export const WorkTimespanArr = [
  'HOURLY',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
] as const;

export type WorkTimespan = (typeof WorkTimespanArr)[number];
