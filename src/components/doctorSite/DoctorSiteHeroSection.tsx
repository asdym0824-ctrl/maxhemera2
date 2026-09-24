import React from 'react';
import { Award, Star, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../../types';
import doctorPortraitFallback from '../../assets/images/dr_saeid_ghorashi_portrait_1790166369131.jpg';

interface Props {
  doctor: Doctor;
  onMainCta: () => void;
  onSecondaryCta: () => void;
}

export const DoctorSiteHeroSection: React.FC<Props> = ({
  doctor,
  onMainCta,
  onSecondaryCta
}) => {
  const portraitUrl = doctor.portrait || doctor.avatar || doctorPortraitFallback;
  const clinicCount = doctor.clinicCount || doctor.clinics?.length || doctor.offices?.length || 4;
  const experienceYears = doctor.experienceYears || 20;

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-[#fbfdfd] via-[#eef5f8] to-[#dce9f0] min-h-[620px] pt-8 lg:pt-14 pb-16 lg:pb-24">
      {/* Background Subtle Medical Radial Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[540px]">
          
          {/* Right Column: Copy & Actions */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-right pt-2 lg:pt-0">
            {/* Eyebrow */}
            <div className="inline-block text-[#c9a64a] font-extrabold text-[15px] sm:text-[17px] tracking-wide">
              {doctor.subSpecialty || 'متخصص ارتودنسی و ناهنجاری‌های فکی'}
            </div>

            {/* Main Name & Title */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-[#0b3b60] leading-[1.25] tracking-tight">
                {doctor.name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#153d59] leading-[1.4]">
                {doctor.title || 'متخصص ارتودنسی در تهران'}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#617588] leading-[1.9] max-w-xl font-normal">
              {doctor.shortDescription ||
                doctor.bio ||
                'با بیش از ۲۰ سال تجربه در درمان‌های تخصصی ارتودنسی، با برنامه درمانی اختصاصی و استفاده از جدیدترین روش‌های علمی و تکنولوژی روز دنیا، لبخندی سالم و زیبا برای شما می‌سازم.'}
            </p>

            {/* Two Action Buttons (Lime-Green + Dark Navy) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Lime Green CTA Button */}
              <button
                onClick={onMainCta}
                className="h-[50px] px-6 sm:px-8 rounded-2xl font-black text-sm sm:text-[15px] bg-[#7ee719] hover:bg-[#72d615] text-[#0d3810] shadow-[0_10px_25px_rgba(126,231,25,0.28)] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                ارائه طرح درمان دندان
              </button>

              {/* Secondary Dark Navy CTA Button */}
              <button
                onClick={onSecondaryCta}
                className="h-[50px] px-6 sm:px-8 rounded-2xl font-black text-sm sm:text-[15px] bg-[#0b3b60] hover:bg-[#072d4c] text-white shadow-[0_10px_25px_rgba(11,59,96,0.22)] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                مشاهده نتایج درمان
              </button>
            </div>

            {/* Three Statistics Cards with Icons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 border-t border-[#dce5ea] max-w-lg">
              {/* Stat 1: Years of Experience */}
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/70 backdrop-blur-xs border border-white shadow-2xs text-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0b3b60] flex items-center justify-center mb-1.5">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-black text-[#0b3b60] leading-none">
                  {experienceYears}+ سال
                </span>
                <span className="text-[11px] sm:text-xs text-[#718292] font-semibold mt-1">
                  سال تجربه
                </span>
              </div>

              {/* Stat 2: Board Certified Rank */}
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/70 backdrop-blur-xs border border-white shadow-2xs text-center">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <span className="text-base sm:text-lg font-black text-[#0b3b60] leading-none">
                  رتبه برتر بورد
                </span>
                <span className="text-[11px] sm:text-xs text-[#718292] font-semibold mt-1">
                  تخصصی کشور
                </span>
              </div>

              {/* Stat 3: Clinic Count */}
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/70 backdrop-blur-xs border border-white shadow-2xs text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-base sm:text-lg font-black text-[#0b3b60] leading-none">
                  {clinicCount} مرکز درمانی
                </span>
                <span className="text-[11px] sm:text-xs text-[#718292] font-semibold mt-1">
                  در تهران و قم
                </span>
              </div>
            </div>
          </div>

          {/* Left Column: Doctor Portrait & Floating Credential Seal */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-end justify-center pt-6 lg:pt-0">
            {/* Subtle Clinical Backdrop Frame */}
            <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
              {/* Doctor Portrait Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                <img
                  src={portraitUrl}
                  alt={doctor.name}
                  className="w-full h-[430px] sm:h-[520px] object-cover object-top hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Floating Board Credential Badge on Right/Top */}
              <div className="absolute top-8 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-amber-300/60 flex items-center gap-3 max-w-[240px] sm:max-w-[260px] animate-in fade-in duration-500">
                {/* Gold Embossed Seal */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 p-0.5 shadow-md shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-amber-100 flex items-center justify-center text-white font-black text-xs">
                    ★
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-[13px] font-black text-[#0b3b60] leading-tight">
                    دارای بورد تخصصی ارتودنسی
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-[#718292] mt-0.5 leading-tight">
                    وزارت بهداشت، درمان و آموزش پزشکی
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
