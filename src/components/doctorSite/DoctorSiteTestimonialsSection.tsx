import React, { useState } from 'react';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import { Doctor, DoctorTestimonial } from '../../types';

interface Props {
  doctor: Doctor;
}

export const DoctorSiteTestimonialsSection: React.FC<Props> = ({ doctor }) => {
  const defaultTestimonials: DoctorTestimonial[] = [
    {
      id: 't1',
      patientName: 'مریم احمدی',
      patientRole: 'مراجع ارتودنسی',
      treatmentType: 'ارتودنسی نامرئی',
      rating: 5,
      comment:
        'درمانم بسیار عالی پیش رفت و نتیجه نهایی فوق‌العاده بود. از تیم دکتر قریشی خیلی ممنونم، همیشه صبور و پاسخگو بودند.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 't2',
      patientName: 'سارا محمدی',
      patientRole: 'مراجع ارتودنسی',
      treatmentType: 'اصلاح ناهنجاری فک',
      rating: 5,
      comment:
        'تجربه و مهارت دکتر قریشی واقعاً قابل تحسین است. محیط کلینیک هم بسیار حرفه‌ای و آرامش‌بخش است و حس اطمینان کامل می‌دهد.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 't3',
      patientName: 'نگار رضایی',
      patientRole: 'مراجع ارتودنسی',
      treatmentType: 'ارتودنسی ثابت بزرگسال',
      rating: 5,
      comment:
        'از نتیجه درمانم خیلی راضی هستم. همه چیز دقیق و طبق برنامه پیش رفت و الان با اعتماد به نفس کامل لبخند می‌زنم.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120'
    }
  ];

  const testimonials = doctor.testimonials?.length ? doctor.testimonials : defaultTestimonials;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
            نظرات مراجعین
          </h2>
          <p className="text-xs sm:text-sm text-[#718292]">
            رضایت بیماران، بزرگترین سرمایه تیم درمانی ماست.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid with Slider Controls */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e6edf1] shadow-[0_8px_25px_rgba(20,52,75,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-[#617588] leading-[2] mb-6 font-normal">
                  «{t.comment}»
                </p>

                {/* Patient Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'}
                      alt={t.patientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0b3b60]">
                      {t.patientName}
                    </div>
                    <div className="text-[10px] text-[#718292]">
                      {t.treatmentType}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
