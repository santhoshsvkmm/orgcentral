'use client';
import { useTenant } from '@/contexts/TenantContext';
import { formatMoney, getCurrencyDecimals, type Money } from '@/types/money';

export function useMoney() {
  const { tenant } = useTenant();
  const { locale, currency } = tenant;

  function format(m: Money): string {
    return formatMoney(m, locale);
  }

  function formatAmount(amount: number, cur?: string): string {
    return formatMoney({ amount, currency: cur ?? currency }, locale);
  }

  /** Format a plain number (already in major units, e.g. 12.50) as currency */
  function formatRaw(value: number, cur?: string): string {
    const c = cur ?? currency;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: c,
      minimumFractionDigits: getCurrencyDecimals(c),
      maximumFractionDigits: getCurrencyDecimals(c),
    }).format(value);
  }

  function formatCompact(value: number, cur?: string): string {
    const c = cur ?? currency;
    const symbol = new Intl.NumberFormat(locale, { style: 'currency', currency: c })
      .formatToParts(0)
      .find(p => p.type === 'currency')?.value ?? c;

    if (Math.abs(value) >= 1_000_000) return `${symbol}${(value / 1_000_000).toFixed(1)}M`;
    if (Math.abs(value) >= 1_000) return `${symbol}${(value / 1_000).toFixed(0)}K`;
    return formatRaw(value, c);
  }

  return { format, formatAmount, formatRaw, formatCompact, currency, locale };
}
