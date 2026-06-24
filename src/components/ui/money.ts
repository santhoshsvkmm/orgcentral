// ─────────────────────────────────────────────────────────────────────────────
// OrgCentral — Money Type
// All monetary values stored in MINOR units (cents, fils, paisa, etc.)
// Use formatMoney() for display — never manipulate raw amounts in UI
// ─────────────────────────────────────────────────────────────────────────────

export interface Money {
  /** Amount in minor units: $12.50 → 1250 | ¥500 → 500 | KWD 1.234 → 1234 */
  amount: number;
  /** ISO 4217 currency code */
  currency: string;
}

/** Currencies with non-standard decimal places */
const CURRENCY_DECIMALS: Record<string, number> = {
  // Zero decimal
  JPY: 0, KRW: 0, VND: 0, IDR: 0, CLP: 0, HUF: 0, TWD: 0, RWF: 0, UGX: 0,
  // Three decimal
  KWD: 3, BHD: 3, OMR: 3, JOD: 3, TND: 3,
  // Default: 2
};

export function getCurrencyDecimals(currency: string): number {
  return CURRENCY_DECIMALS[currency.toUpperCase()] ?? 2;
}

export function toMinorUnits(amount: number, currency: string): number {
  return Math.round(amount * Math.pow(10, getCurrencyDecimals(currency)));
}

export function fromMinorUnits(amount: number, currency: string): number {
  return amount / Math.pow(10, getCurrencyDecimals(currency));
}

export function money(amount: number, currency: string): Money {
  return { amount: toMinorUnits(amount, currency), currency };
}

export function moneyFromMinor(amount: number, currency: string): Money {
  return { amount, currency };
}

export function formatMoney(m: Money, locale: string): string {
  const value = fromMinorUnits(m.amount, m.currency);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: m.currency,
    minimumFractionDigits: getCurrencyDecimals(m.currency),
    maximumFractionDigits: getCurrencyDecimals(m.currency),
  }).format(value);
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error(`Currency mismatch: ${a.currency} vs ${b.currency}`);
  return { amount: a.amount + b.amount, currency: a.currency };
}

export function subtractMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error(`Currency mismatch: ${a.currency} vs ${b.currency}`);
  return { amount: a.amount - b.amount, currency: a.currency };
}

export function multiplyMoney(m: Money, factor: number): Money {
  return { amount: Math.round(m.amount * factor), currency: m.currency };
}

export function isZeroMoney(m: Money): boolean {
  return m.amount === 0;
}

export function zeroMoney(currency: string): Money {
  return { amount: 0, currency };
}

/** Convert to another currency using a snapshot exchange rate */
export function convertMoney(m: Money, toCurrency: string, rate: number): Money {
  if (m.currency === toCurrency) return m;
  const srcDecimals = getCurrencyDecimals(m.currency);
  const dstDecimals = getCurrencyDecimals(toCurrency);
  const srcValue = m.amount / Math.pow(10, srcDecimals);
  const dstValue = srcValue * rate;
  return { amount: Math.round(dstValue * Math.pow(10, dstDecimals)), currency: toCurrency };
}

/** Common construction currencies with display info */
export const CONSTRUCTION_CURRENCIES = [
  { code: 'USD', name: 'US Dollar',         symbol: '$',    flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro',              symbol: '€',    flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound',     symbol: '£',    flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham',        symbol: 'AED',  flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal',       symbol: 'SAR',  flag: '🇸🇦' },
  { code: 'QAR', name: 'Qatari Riyal',      symbol: 'QAR',  flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar',     symbol: 'KWD',  flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar',    symbol: 'BHD',  flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial',        symbol: 'OMR',  flag: '🇴🇲' },
  { code: 'INR', name: 'Indian Rupee',      symbol: '₹',    flag: '🇮🇳' },
  { code: 'PKR', name: 'Pakistani Rupee',   symbol: '₨',    flag: '🇵🇰' },
  { code: 'JPY', name: 'Japanese Yen',      symbol: '¥',    flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan',      symbol: '¥',    flag: '🇨🇳' },
  { code: 'SGD', name: 'Singapore Dollar',  symbol: 'S$',   flag: '🇸🇬' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$',   flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar',   symbol: 'CA$',  flag: '🇨🇦' },
  { code: 'ZAR', name: 'South African Rand',symbol: 'R',    flag: '🇿🇦' },
  { code: 'NGN', name: 'Nigerian Naira',    symbol: '₦',    flag: '🇳🇬' },
  { code: 'EGP', name: 'Egyptian Pound',    symbol: 'EGP',  flag: '🇪🇬' },
  { code: 'TRY', name: 'Turkish Lira',      symbol: '₺',    flag: '🇹🇷' },
] as const;
