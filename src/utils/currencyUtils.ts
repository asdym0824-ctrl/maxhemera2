import { toPersianDigits } from './persianWriting';

export function formatToman(amount: number): string {
  if (amount >= 1_000_000_000) {
    const b = (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, '');
    return `${toPersianDigits(Number(b).toLocaleString('fa-IR'))} میلیارد تومان`;
  }
  if (amount >= 1_000_000) {
    const m = (amount / 1_000_000).toFixed(1).replace(/\.0$/, '');
    return `${toPersianDigits(Number(m).toLocaleString('fa-IR'))} میلیون تومان`;
  }
  if (amount >= 1_000) {
    const k = (amount / 1_000).toFixed(0);
    return `${toPersianDigits(Number(k).toLocaleString('fa-IR'))} هزار تومان`;
  }
  return `${toPersianDigits(amount.toLocaleString('fa-IR'))} تومان`;
}

export function formatPriceWithSeparators(amount: number): string {
  return `${toPersianDigits(amount.toLocaleString('fa-IR'))} تومان`;
}
