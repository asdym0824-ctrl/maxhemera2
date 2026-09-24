import React from 'react';
import { Doctor } from '../../types';
import { ArrowLeft, Sparkles, Activity, Shield, Smile, Eye, Layers, Compass } from 'lucide-react';

interface Props {
  doctor: Doctor;
  onSelectService?: (serviceName: string) => void;
  onViewAll?: () => void;
}

export const DoctorSiteServicesGrid: React.FC<Props> = ({
  doctor,
  onSelectService,
  onViewAll
}) => {
  // Default 7 Orthodontic Services matching اتود.jpg
  const defaultServices = [
    {
      id: 'srv-1',
      title: 'اصلاح ناهنجاری‌های فکی',
      subtitle: 'جراحی و ارتودنسی ترکیبی',
      icon: Activity
    },
    {
      id: 'srv-2',
      title: 'ارتودنسی نامرئی',
      subtitle: 'الاینرهای شفاف',
      icon: Eye
    },
    {
      id: 'srv-3',
      title: 'ارتودنسی متحرک',
      subtitle: 'برای شرایط منتخب',
      icon: Layers
    },
    {
      id: 'srv-4',
      title: 'ارتودنسی لینگوال',
      subtitle: 'کاملاً پشت دندان',
      icon: Compass
    },
    {
      id: 'srv-5',
      title: 'ارتودنسی ثابت',
      subtitle: 'دقیق و قابل پیش‌بینی',
      icon: Shield
    },
    {
      id: 'srv-6',
      title: 'ارتودنسی کودکان',
      subtitle: 'مراقبت در سن مناسب',
      icon: Smile
    },
    {
      id: 'srv-7',
      title: 'ارتودنسی بزرگسالان',
      subtitle: 'طراحی لبخند حرفه‌ای',
      icon: Sparkles
    }
  ];

  const services = doctor.detailedServices?.length
    ? doctor.detailedServices.map((ds, idx) => ({
        id: ds.id,
        title: ds.title,
        subtitle: ds.description?.slice(0, 32) || 'درمان تخصصی و استاندارد',
        icon: defaultServices[idx % defaultServices.length].icon
      }))
    : defaultServices;

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5 text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
              خدمات ارتودنسی
            </h2>
            <p className="text-xs sm:text-sm text-[#718292]">
              ارائه‌ی کامل خدمات تخصصی ارتودنسی برای تمام سنین
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b3b60] hover:text-[#062d4b] bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه خدمات</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#0b3b60]" />
          </button>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {services.map(srv => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={() => onSelectService?.(srv.title)}
                className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#edf1f4] hover:border-[#c9a64a]/50 shadow-[0_6px_20px_rgba(11,59,96,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-[#f4f8fa] group-hover:bg-[#0b3b60] text-[#0b3b60] group-hover:text-amber-300 flex items-center justify-center mb-3 transition-colors duration-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-[13px] font-bold text-[#0b3b60] group-hover:text-[#062d4b] leading-snug line-clamp-2">
                  {srv.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[10px] sm:text-[11px] text-[#718292] mt-1 line-clamp-1 leading-tight">
                  {srv.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
