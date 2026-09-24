import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Sparkles } from 'lucide-react';
import { Doctor, TreatmentResult } from '../../types';
import orthoBeforeAfterImg from '../../assets/images/ortho_before_after_1790166384733.jpg';

interface Props {
  doctor: Doctor;
  onViewAllResults?: () => void;
}

export const DoctorSiteTreatmentResults: React.FC<Props> = ({
  doctor,
  onViewAllResults
}) => {
  const defaultResults: TreatmentResult[] = [
    {
      id: 'res-1',
      title: 'اصلاح ناهنجاری فکی',
      durationText: 'در ۱۴ ماه',
      durationMonths: 14,
      beforeImage: orthoBeforeAfterImg,
      afterImage: orthoBeforeAfterImg,
      category: 'ارتودنسی جراحی'
    },
    {
      id: 'res-2',
      title: 'ارتودنسی ثابت',
      durationText: 'در ۱۲ ماه',
      durationMonths: 12,
      beforeImage: orthoBeforeAfterImg,
      afterImage: orthoBeforeAfterImg,
      category: 'براکت فلزی'
    },
    {
      id: 'res-3',
      title: 'ارتودنسی نامرئی',
      durationText: 'در ۱۳ ماه',
      durationMonths: 13,
      beforeImage: orthoBeforeAfterImg,
      afterImage: orthoBeforeAfterImg,
      category: 'الاینر شفاف'
    },
    {
      id: 'res-4',
      title: 'ارتودنسی فک بالا',
      durationText: 'در ۱۶ ماه',
      durationMonths: 16,
      beforeImage: orthoBeforeAfterImg,
      afterImage: orthoBeforeAfterImg,
      category: 'ارتودنسی پیشگیرانه'
    }
  ];

  const results = doctor.treatmentResults?.length ? doctor.treatmentResults : defaultResults;
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section id="results" className="py-16 sm:py-20 bg-[#f6fafc]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5 text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
              نتایج درمان‌های ارتودنسی
            </h2>
            <p className="text-xs sm:text-sm text-[#718292]">
              نمونه‌هایی از قبل و بعد درمان بیماران با رضایت کامل
            </p>
          </div>

          <button
            onClick={onViewAllResults}
            className="h-[42px] px-5 rounded-xl text-xs font-bold bg-[#0b3b60] hover:bg-[#072c4a] text-white shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه نتایج</span>
            <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* 4 Cards Carousel / Grid Container with Navigation Arrows */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveDot(prev => (prev > 0 ? prev - 1 : results.length - 1))}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-[#0b3b60] items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="مورد بعدی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveDot(prev => (prev < results.length - 1 ? prev + 1 : 0))}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-[#0b3b60] items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="مورد قبلی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {results.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5edf2] shadow-[0_8px_20px_rgba(20,52,75,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Before-After Image Representation with Split Comparison Line */}
                <div className="relative h-[160px] sm:h-[180px] bg-slate-100 overflow-hidden">
                  <img
                    src={item.beforeImage || orthoBeforeAfterImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Vertical Dividing Line & Before/After Badges */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-amber-400 shadow-md" />

                  <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    قبل
                  </span>

                  <span className="absolute bottom-2 left-2 bg-emerald-600/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    بعد
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 text-center space-y-1">
                  <h3 className="text-sm font-bold text-[#0b3b60]">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#718292]">
                    {item.durationText}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {results.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveDot(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeDot === i
                    ? 'w-6 bg-[#0b3b60]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`اسلاید ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
