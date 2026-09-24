import React from 'react';

interface Props {
  className?: string;
  variant?: 'dark' | 'light';
  doctorName?: string;
  specialtyText?: string;
  subtitle?: string;
}

export const DoctorToothLogo: React.FC<Props> = ({
  className = '',
  variant = 'dark',
  doctorName = 'دکتر سعید قریشی',
  specialtyText = 'متخصص ارتودنسی و ناهنجاری‌های فکی',
  subtitle = 'Dr. Ghorashi'
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3.5 select-none text-right ${className}`} dir="rtl">
      {/* Precision Tooth Icon with Gold & Navy Dual Curved Contours */}
      <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Golden Aesthetic Accent Arc */}
          <path
            d="M50 14 C32 14 20 25 18 42 C16 57 24 72 32 86 C35 91 40 92 44 87 C48 82 50 72 52 72 C54 72 56 82 60 87 C64 92 69 91 72 86 C80 72 88 57 86 42 C84 25 72 14 50 14 Z"
            stroke={isLight ? '#f0cc66' : '#c9a64a'}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Navy Precision Line Arc */}
          <path
            d="M50 24 C38 24 30 32 29 44 C27 55 33 66 39 77 C41 80 44 80 46 76 C48 72 50 63 52 63 C54 63 56 72 58 76 C60 80 63 80 65 77 C71 66 77 55 75 44 C74 32 66 24 50 24 Z"
            stroke={isLight ? '#ffffff' : '#0b3b60'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central Crown Occlusal Groove Accent */}
          <path
            d="M38 34 C44 38 56 38 62 34"
            stroke={isLight ? '#f0cc66' : '#c9a64a'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`text-[12px] font-sans tracking-wider font-semibold leading-none mb-1 ${
            isLight ? 'text-amber-300' : 'text-[#0b3b60]'
          }`}
          style={{ fontFamily: 'sans-serif' }}
        >
          {subtitle}
        </span>
        <span
          className={`text-[17px] font-black leading-tight ${
            isLight ? 'text-white' : 'text-[#062d4b]'
          }`}
        >
          {doctorName}
        </span>
        <span
          className={`text-[11px] font-medium leading-tight mt-0.5 ${
            isLight ? 'text-slate-300' : 'text-[#718292]'
          }`}
        >
          {specialtyText}
        </span>
      </div>
    </div>
  );
};
