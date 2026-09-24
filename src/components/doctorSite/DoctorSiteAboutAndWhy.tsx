import React, { useState } from 'react';
import { ArrowLeft, Play, Sparkles, Building, Award, ClipboardCheck, Users, X } from 'lucide-react';
import { Doctor } from '../../types';
import videoThumbFallback from '../../assets/images/dr_ghorashi_video_thumb_1790166396258.jpg';

interface Props {
  doctor: Doctor;
  onMoreAboutClick?: () => void;
}

export const DoctorSiteAboutAndWhy: React.FC<Props> = ({
  doctor,
  onMoreAboutClick
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoThumb = doctor.video?.thumbnail || videoThumbFallback;

  const whyFeatures = [
    {
      id: 'f1',
      title: 'تجهیزات مدرن و پیشرفته',
      subtitle: 'درمان با جدیدترین تکنولوژی‌های روز دنیا',
      icon: Building
    },
    {
      id: 'f2',
      title: 'تجربه و مهارت بالا',
      subtitle: 'با بیش از ۲۰ سال سابقه فعالیت درخشان',
      icon: Award
    },
    {
      id: 'f3',
      title: 'برنامه درمانی اختصاصی',
      subtitle: 'طراحی پلن درمانی متناسب با شرایط هر بیمار',
      icon: ClipboardCheck
    },
    {
      id: 'f4',
      title: 'تیم درمانی مجرب',
      subtitle: `همراهی صمیمانه و حرفه‌ای در کنار ${doctor.name}`,
      icon: Users
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-[#f8fbfd] to-white border-y border-[#edf2f5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right & Middle Columns: Why Choose & 4 Feature Items */}
          <div className="lg:col-span-7 space-y-8 text-right">
            {/* Header & Bio */}
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 text-amber-500 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>مزایای رقابتی و استانداردهای کلینیکی</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b3b60]">
                چرا {doctor.name}؟
              </h2>

              <p className="text-sm sm:text-[15px] text-[#617588] leading-[2] max-w-2xl">
                {doctor.longDescription ||
                  doctor.bio ||
                  `${doctor.name}، متخصص ارتودنسی و ناهنجاری‌های فکی با بیش از ۲۰ سال تجربه، عضو هیئت علمی دانشگاه و دارای مدرک معتبر بین‌المللی، با بهره‌گیری از جدیدترین روش‌های درمانی و تیم حرفه‌ای، بهترین نتیجه را برای بیماران خود فراهم می‌کند.`}
              </p>
            </div>

            {/* 4 Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {whyFeatures.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#edf1f4] shadow-xs hover:border-[#c9a64a]/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#eef6fa] text-[#0b3b60] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#0b3b60]">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#718292] leading-tight">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onMoreAboutClick}
                className="h-[46px] px-6 rounded-xl text-xs sm:text-sm font-bold bg-[#0b3b60] hover:bg-[#062d4b] text-white shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>بیشتر درباره {doctor.name}</span>
                <ArrowLeft className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

          {/* Left Column: Video Presentation Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group bg-slate-900 aspect-4/3 sm:aspect-16/11">
              <img
                src={videoThumb}
                alt={`معرفی ${doctor.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062d4b]/95 via-transparent to-black/20" />

              {/* Centered Pulsating Play Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white text-[#0b3b60] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                aria-label="پخش ویدیو"
              >
                <Play className="w-7 h-7 fill-[#0b3b60] text-[#0b3b60] mr-1" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 right-5 left-5 z-20 text-right">
                <div className="text-base sm:text-lg font-black text-white leading-snug">
                  {doctor.video?.title || `معرفی ${doctor.name}`}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  {doctor.video?.caption || 'فلسفه درمان و استانداردهای کلینیکی'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 sm:p-6 text-right bg-[#062d4b] text-white flex items-center justify-between border-b border-white/10">
              <span className="font-bold text-sm">ویدیوی رسمی معرفی {doctor.name}</span>
              <span className="text-xs text-amber-300">مدت زمان: ۰۳:۴۵</span>
            </div>
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
              <img
                src={videoThumb}
                alt="پخش ویدیو"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-white text-[#0b3b60] flex items-center justify-center shadow-xl animate-pulse">
                  <Play className="w-7 h-7 fill-[#0b3b60] ml-1" />
                </div>
                <p className="text-xs sm:text-sm max-w-md text-slate-200">
                  ویدیو در حال پخش است. در نسخه عملیاتی این بخش به آپارات یا پلیر استریم ویدیوی کلینیک متصل خواهد بود.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
