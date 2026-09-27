/**
 * Comprehensive Persian Writing, Orthography, and Typography Toolkit
 * Standardized based on ali2000hos/persian-writing guidelines:
 * - Persian Digits normalization (۰۱۲۳۴۵۶۷۸۹) and English conversion
 * - Orthography rules: Zero-Width Non-Joiner (نیم‌فاصله - ZWNJ: \u200C)
 * - Verbal prefixes (می‌، نمی‌) & Plural suffixes (ها، های، هایی)
 * - Comparative/superlative suffixes (تر، ترین)
 * - Medical & Administrative compound terms (نوبت‌دهی، سوپر‌ادمین، تله‌مدیسین، ...)
 * - Persian Punctuation (گیومه « »، ویرگول ،، نقطه‌ویرگول ؛، علامت سوال ؟)
 * - Arabic to standard Persian character unification (ی، ک، هٔ)
 * - Financial formatting (تومان با جداکننده ارقام فارسی ٬ یا ،)
 * - Percentages (علامت ٪ فارسی)
 * - Phone numbers & Bidi safety in RTL layout
 */

import React from 'react';

export const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;
export const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

/**
 * Converts Latin (0-9) and Arabic (٠-٩) digits to Persian digits (۰-۹).
 * Example: "12450" -> "۱۲۴۵۰"
 */
export function toPersianDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  const str = String(input);
  return str
    .replace(/[0-9]/g, (w) => PERSIAN_DIGITS[+w])
    .replace(/[٠-٩]/g, (w) => PERSIAN_DIGITS[ARABIC_DIGITS.indexOf(w as any)]);
}

/**
 * Converts Persian (۰-۹) and Arabic (٠-٩) digits to standard Latin digits (0-9)
 * Used for technical computations, database queries, and URL slugs.
 */
export function toEnglishDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  const str = String(input);
  return str
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}

/**
 * Formats a percentage value according to Persian typography rules:
 * e.g. 12.4 -> "۱۲٫۴٪" (digit + Persian momayyez/point + Persian percent sign)
 */
export function formatPersianPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return '۰٪';
  const cleanVal = typeof value === 'number' ? value : parseFloat(toEnglishDigits(String(value))) || 0;
  const numFormatted = cleanVal.toLocaleString('fa-IR', {
    maximumFractionDigits: 1
  });
  return `${toPersianDigits(numFormatted)}٪`;
}

/**
 * Formats a number with Persian thousands separators and Persian digits.
 * e.g. 1245000 -> "۱٬۲۴۵٬۰۰۰" or "۱،۲۴۵،۰۰۰"
 */
export function formatPersianNumber(value: number | string | null | undefined, separator: string = '٬'): string {
  if (value === null || value === undefined) return '۰';
  const cleanNum = typeof value === 'number' ? value : parseFloat(toEnglishDigits(String(value))) || 0;
  
  // Format with standard grouping
  const parts = Math.floor(Math.abs(cleanNum)).toString().split('');
  let result = '';
  let count = 0;
  for (let i = parts.length - 1; i >= 0; i--) {
    result = parts[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = separator + result;
    }
  }
  
  const sign = cleanNum < 0 ? '-' : '';
  const decimalPart = String(cleanNum).includes('.') 
    ? '٫' + String(cleanNum).split('.')[1] 
    : '';

  return toPersianDigits(`${sign}${result}${decimalPart}`);
}

/**
 * Formats monetary amounts in Tomans with Persian digits and separator.
 * e.g. 280000 -> "۲۸۰٬۰۰۰ تومان"
 */
export function formatPersianPrice(amount: number | string | null | undefined, unit: string = 'تومان'): string {
  if (amount === null || amount === undefined) return `۰ ${unit}`;
  return `${formatPersianNumber(amount)} ${unit}`;
}

/**
 * Formats phone numbers (mobile or landline) with standard Persian digits and grouping,
 * wrapped safely for RTL contexts to prevent direction reversal.
 * e.g. "09123456789" -> "۰۹۱۲-۳۴۵-۶۷۸۹"
 * e.g. "02188776655" -> "۰۲۱-۸۸۷۷-۶۶۵۵"
 */
export function formatPersianPhone(phone: string | null | undefined): string {
  if (!phone) return '';
  const raw = toEnglishDigits(phone).replace(/\D/g, '');
  
  if (raw.length === 11 && raw.startsWith('09')) {
    // Iranian Mobile: 09XX-XXX-XXXX
    const formatted = `${raw.slice(0, 4)}-${raw.slice(4, 7)}-${raw.slice(7)}`;
    return toPersianDigits(formatted);
  }
  
  if (raw.length === 11 && raw.startsWith('0')) {
    // Iranian Landline with area code: 0XX-XXXX-XXXX
    const formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
    return toPersianDigits(formatted);
  }
  
  if (raw.length === 10 && raw.startsWith('9')) {
    const formatted = `۰${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
    return toPersianDigits(formatted);
  }

  return toPersianDigits(phone);
}

/**
 * Formats an Iranian 10-digit National Code (کد ملی) with Persian digits.
 * e.g. "0012345678" -> "۰۰۱-۲۳۴۵۶۷-۸"
 */
export function formatPersianNationalId(nationalId: string | null | undefined): string {
  if (!nationalId) return '';
  const raw = toEnglishDigits(nationalId).replace(/\D/g, '');
  if (raw.length === 10) {
    return toPersianDigits(`${raw.slice(0, 3)}-${raw.slice(3, 9)}-${raw.slice(9)}`);
  }
  return toPersianDigits(nationalId);
}

/**
 * Formats Iranian bank card number:
 * e.g. "6037997112345678" -> "۶۰۳۷-۹۹۷۱-۱۲۳۴-۵۶۷۸"
 */
export function formatPersianCardNumber(card: string | null | undefined): string {
  if (!card) return '';
  const raw = toEnglishDigits(card).replace(/\D/g, '');
  if (raw.length === 16) {
    return toPersianDigits(`${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-${raw.slice(12)}`);
  }
  return toPersianDigits(card);
}

/**
 * Normalizes text to standard Persian orthography based on ali2000hos/persian-writing rules:
 * 1. Arabic Yeh and Kaf conversion (ي -> ی, ك -> ک)
 * 2. ZWNJ (نیم‌فاصله \u200C) for "می‌", "نمی‌", "‌ها", "‌های", "‌تر", "‌ترین", "به‌صورت", "به‌طور", etc.
 * 3. Persian punctuation (، ؛ ؟ « »)
 * 4. Compound terms standardization
 */
export function cleanPersianText(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Unify Arabic Yeh & Kaf & Heh into standard Persian
  cleaned = cleaned
    .replace(/\u064A/g, 'ی') // Arabic Yeh
    .replace(/\u0649/g, 'ی') // Arabic Alef Maksura
    .replace(/\u0643/g, 'ک') // Arabic Kaf
    .replace(/\u06C0/g, 'هٔ') // Persian heh with hamza
    .replace(/(\w)ه\s+ی(\s|[.,،؛:!?؟]|$)/g, '$1هٔ$2') // e.g. خانه ی -> خانهٔ
    .replace(/(\w)ه\s+ای(\s|[.,،؛:!?؟]|$)/g, '$1ه‌ای$2'); // e.g. نمونه ای -> نمونه‌ای

  // 2. Normalize ZWNJ for verbal prefixes (می and نمی)
  cleaned = cleaned
    .replace(/(^|\s)می\s+/g, '$1می\u200C')
    .replace(/(^|\s)نمی\s+/g, '$1نمی\u200C');

  // 3. Normalize ZWNJ for plural suffixes (ها, های, هایی, هایمان, هایتان, هایشان)
  cleaned = cleaned
    .replace(/([^\s])\s+ها(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cها$2')
    .replace(/([^\s])\s+های(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cهای$2')
    .replace(/([^\s])\s+هایی(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cهایی$2')
    .replace(/([^\s])\s+هایمان(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cهایمان$2')
    .replace(/([^\s])\s+هایتان(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cهایتان$2')
    .replace(/([^\s])\s+هایشان(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cهایشان$2');

  // 4. Normalize ZWNJ for comparative/superlative suffixes (تر and ترین)
  cleaned = cleaned
    .replace(/([^\s])\s+تر(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cتر$2')
    .replace(/([^\s])\s+ترین(\s|[.,،؛:!?؟]|$)/g, '$1\u200Cترین$2');

  // 5. Negative prefix "بی"
  cleaned = cleaned
    .replace(/(^|\s)بی\s+([آ-ی])/g, '$1بی\u200C$2');

  // 6. Prepositional phrases with "به"
  cleaned = cleaned
    .replace(/(^|\s)به\s+صورت(\s)/g, '$1به\u200Cصورت$2')
    .replace(/(^|\s)به\s+طور(\s)/g, '$1به\u200Cطور$2')
    .replace(/(^|\s)به\s+عنوان(\s)/g, '$1به\u200Cعنوان$2')
    .replace(/(^|\s)به\s+ویژه(\s)/g, '$1به\u200Cویژه$2')
    .replace(/(^|\s)به\s+موقع(\s)/g, '$1به\u200Cموقع$2')
    .replace(/(^|\s)به\s+روزرسانی(\s|[.,،؛:!?؟]|$)/g, '$1به\u200Cروزرسانی$2')
    .replace(/(^|\s)به\s+روز\s+رسانی(\s|[.,،؛:!?؟]|$)/g, '$1به\u200Cروزرسانی$2');

  // 7. Medical, healthcare, and platform compound words ZWNJ
  const compoundPatterns: [RegExp, string][] = [
    [/(^|\s)سوپر\s+ادمین(\s|[.,،؛:!?؟]|$)/g, '$1سوپر\u200Cادمین$2'],
    [/(^|\s)نوبت\s+دهی(\s|[.,،؛:!?؟]|$)/g, '$1نوبت\u200Cدهی$2'],
    [/(^|\s)تله\s+مدیسین(\s|[.,،؛:!?؟]|$)/g, '$1تله\u200Cمدیسین$2'],
    [/(^|\s)پیش\s+فرض(\s|[.,،؛:!?؟]|$)/g, '$1پیش\u200Cفرض$2'],
    [/(^|\s)پیش\s+نمایش(\s|[.,،؛:!?؟]|$)/g, '$1پیش\u200Cنمایش$2'],
    [/(^|\s)تسویه\s+حساب(\s|[.,،؛:!?؟]|$)/g, '$1تسویه\u200Cحساب$2'],
    [/(^|\s)فوق\s+تخصص(\s|[.,،؛:!?؟]|$)/g, '$1فوق\u200Cتخصص$2'],
    [/(^|\s)فوق\s+العاده(\s|[.,،؛:!?؟]|$)/g, '$1فوق\u200Cالعاده$2'],
    [/(^|\s)اطلاع\s+رسانی(\s|[.,،؛:!?؟]|$)/g, '$1اطلاع\u200Cرسانی$2'],
    [/(^|\s)پایگاه\s+داده(\s|[.,،؛:!?؟]|$)/g, '$1پایگاه\u200Cداده$2'],
    [/(^|\s)پشتیبان\s+گیری(\s|[.,،؛:!?؟]|$)/g, '$1پشتیبان\u200Cگیری$2'],
    [/(^|\s)چشم\s+پزشکی(\s|[.,،؛:!?؟]|$)/g, '$1چشم\u200Cپزشکی$2'],
    [/(^|\s)دندان\s+پزشکی(\s|[.,،؛:!?؟]|$)/g, '$1دندان\u200Cپزشکی$2'],
    [/(^|\s)روان\s+پزشکی(\s|[.,،؛:!?؟]|$)/g, '$1روان\u200Cپزشکی$2'],
    [/(^|\s)تصویر\s+برداری(\s|[.,،؛:!?؟]|$)/g, '$1تصویربرداری$2'],
    [/(^|\s)هم\s+اکنون(\s|[.,،؛:!?؟]|$)/g, '$1هم\u200Cاکنون$2'],
    [/(^|\s)دست\s+اندرکاران(\s|[.,،؛:!?؟]|$)/g, '$1دست\u200Cاندرکاران$2'],
    [/(^|\s)گفت\s+و\s+گو(\s|[.,،؛:!?؟]|$)/g, '$1گفت\u200Cوگو$2'],
    [/(^|\s)گفت\s+وگو(\s|[.,،؛:!?؟]|$)/g, '$1گفت\u200Cوگو$2'],
    [/(^|\s)صورت\s+حساب(\s|[.,،؛:!?؟]|$)/g, '$1صورت\u200Cحساب$2'],
    [/(^|\s)کارت\s+خوان(\s|[.,،؛:!?؟]|$)/g, '$1کارت\u200Cخوان$2'],
    [/(^|\s)زیر\s+سیستم(\s|[.,،؛:!?؟]|$)/g, '$1زیر\u200Cسیستم$2'],
    [/(^|\s)چند\s+شعبه\s+ای(\s|[.,،؛:!?؟]|$)/g, '$1چند\u200Cشعبه\u200Cای$2'],
    [/(^|\s)چند\s+منظوره(\s|[.,،؛:!?؟]|$)/g, '$1چند\u200Cمنظوره$2'],
    [/(^|\s)پیام\s+رسان(\s|[.,،؛:!?؟]|$)/g, '$1پیام\u200Cرسان$2'],
    [/(^|\s)کد\s+ملی(\s|[.,،؛:!?؟]|$)/g, '$1کدملی$2'],
    [/(^|\s)خود\s+کار(\s|[.,،؛:!?؟]|$)/g, '$1خودکار$2']
  ];

  for (const [regex, replacement] of compoundPatterns) {
    cleaned = cleaned.replace(regex, replacement);
  }

  // 8. Persian Punctuation fixes
  cleaned = cleaned
    .replace(/([ء-يآ-ی])\s*,\s*/g, '$1، ') // Comma after Persian word -> Persian Virgul
    .replace(/([ء-يآ-ی])\s*;\s*/g, '$1؛ ') // Semicolon -> Persian semicolon
    .replace(/([ء-يآ-ی])\s*\?\s*/g, '$1؟ ') // Question mark -> Persian question mark
    .replace(/"([^"]+)"/g, '«$1»') // Quotes to Persian Guillemets
    .replace(/\s+([،؛.؟!»])/g, '$1') // Remove space before punctuation
    .replace(/([«])\s+/g, '$1'); // Remove space after opening guillemet

  return cleaned.trim();
}

/**
 * Universal helper to Persianize both text orthography and embedded digits.
 * e.g. fa("درخواست 12 ویزیت انجام شد") -> "درخواست ۱۲ ویزیت انجام شد"
 */
export function fa(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  const text = typeof input === 'number' ? String(input) : input;
  const orthographyCleaned = cleanPersianText(text);
  return toPersianDigits(orthographyCleaned);
}

/**
 * React Component for safe Persian Number display with Bidi protection.
 */
export interface PersianNumberProps {
  value: number | string | null | undefined;
  className?: string;
  prefix?: string;
  suffix?: string;
  isPrice?: boolean;
  priceUnit?: string;
  isPercent?: boolean;
}

export const FaNum: React.FC<PersianNumberProps> = ({
  value,
  className = '',
  prefix = '',
  suffix = '',
  isPrice = false,
  priceUnit = 'تومان',
  isPercent = false
}) => {
  let formatted = '';
  if (isPrice) {
    formatted = formatPersianPrice(value, priceUnit);
  } else if (isPercent) {
    formatted = formatPersianPercent(value);
  } else {
    formatted = formatPersianNumber(value);
  }

  return React.createElement(
    'span',
    { className: `inline-block font-sans tabular-nums ${className}` },
    prefix ? React.createElement('span', { className: 'ml-1' }, prefix) : null,
    formatted,
    suffix ? React.createElement('span', { className: 'mr-1' }, suffix) : null
  );
};

/**
 * React Component for Phone numbers rendered with Persian digits and safe RTL order.
 */
export const FaPhone: React.FC<{ phone: string | null | undefined; className?: string }> = ({
  phone,
  className = ''
}) => {
  if (!phone) return null;
  return React.createElement(
    'bdi',
    { dir: 'ltr', className: `inline-block font-sans tracking-wide ${className}` },
    formatPersianPhone(phone)
  );
};
