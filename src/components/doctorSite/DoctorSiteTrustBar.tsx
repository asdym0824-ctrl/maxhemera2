import React from 'react';
import { Heart, Sparkles, ShieldCheck, Smile } from 'lucide-react';

export const DoctorSiteTrustBar: React.FC = () => {
  const trustItems = [
    {
      id: '1',
      title: 'تجربه، تخصص و اعتماد بیماران',
      subtitle: 'همراه شما تا رسیدن به لبخند ایده‌آل',
      icon: Heart
    },
    {
      id: '2',
      title: 'استفاده از جدیدترین تکنولوژی‌های روز دنیا',
      subtitle: 'تشخیص و درمان دیجیتال و دقیق‌تر',
      icon: Sparkles
    },
    {
      id: '3',
      title: 'درمان‌های دقیق و با برنامه اختصاصی',
      subtitle: 'متناسب با شرایط فیزیولوژیک هر بیمار',
      icon: ShieldCheck
    },
    {
      id: '4',
      title: 'ارتودنسی برای همه گروه‌های سنی',
      subtitle: 'کودک، نوجوان، جوان و بزرگسال',
      icon: Smile
    }
  ];

  return (
    <section className="bg-[#08273f] text-white py-6 border-y border-[#0e3b5e]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/10">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3.5 py-3 sm:py-2 px-3 lg:px-4 text-right ${
                  index !== 0 ? 'sm:pr-4 lg:pr-6' : ''
                }`}
              >
                {/* Circular Gold Icon Container */}
                <div className="w-11 h-11 rounded-full border border-amber-400/80 bg-white/5 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-300 leading-tight">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
