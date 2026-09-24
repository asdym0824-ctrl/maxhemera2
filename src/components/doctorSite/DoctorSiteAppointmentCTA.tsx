import React, { useState } from 'react';
import { Doctor } from '../../types';
import { CheckCircle2, Sparkles, Send } from 'lucide-react';

interface Props {
  doctor: Doctor;
  onAppointmentSuccess?: (data: any) => void;
}

export const DoctorSiteAppointmentCTA: React.FC<Props> = ({
  doctor,
  onAppointmentSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('ارتودنسی ثابت');
  const [clinic, setClinic] = useState('مرکز سعادت‌آباد (مرکزی)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitted(true);
    if (onAppointmentSuccess) {
      onAppointmentSuccess({ fullName, phone, service, clinic });
    }
  };

  return (
    <section id="booking" className="py-12 sm:py-16 bg-[#f6fafc]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0b3b60] via-[#0d4b75] to-[#062d4b] p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-blue-900/40 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Right Copy */}
            <div className="lg:col-span-6 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>شروع یک لبخند جدید</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                برای مشاوره و طرح درمان اقدام کنید
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg">
                فرم درخواست را تکمیل نمایید؛ کارشناسان پذیرش کلینیک‌های {doctor.name} در سریع‌ترین زمان جهت هماهنگی با شما تماس خواهند گرفت.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-amber-200">
                <span>✓ ویزیت و ارزیابی تشخیصی اولیه</span>
                <span>✓ امکان پرداخت اقساطی هزینه درمان</span>
              </div>
            </div>

            {/* Left Form */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-white">درخواست نوبت شما ثبت شد</h3>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    همکاران ما در واحد پذیرش {doctor.name} تا ساعاتی دیگر جهت تایید نوبت با شماره {phone} تماس حاصل خواهند کرد.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                    }}
                    className="mt-2 text-xs font-bold text-amber-300 underline hover:text-amber-200"
                  >
                    ثبت درخواست نوبت جدید
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 mb-1 text-right">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="مثال: علی محمدی"
                      className="w-full h-11 px-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-slate-300 text-xs focus:outline-hidden focus:border-amber-300 focus:bg-white/20 transition-all text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 mb-1 text-right">
                      شماره تماس همراه
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                      className="w-full h-11 px-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-slate-300 text-xs focus:outline-hidden focus:border-amber-300 focus:bg-white/20 transition-all text-right"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 mb-1 text-right">
                      نوع خدمت مورد نظر
                    </label>
                    <select
                      value={service}
                      onChange={e => setService(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#083457] border border-white/25 text-white text-xs focus:outline-hidden focus:border-amber-300 transition-all text-right"
                    >
                      <option value="ارتودنسی ثابت">ارتودنسی ثابت</option>
                      <option value="ارتودنسی نامرئی">ارتودنسی نامرئی (الاینر شفاف)</option>
                      <option value="ارتودنسی متحرک">ارتودنسی متحرک</option>
                      <option value="اصلاح ناهنجاری فک">اصلاح ناهنجاری فک</option>
                      <option value="مشاوره تخصصی">مشاوره تخصصی ارتودنسی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 mb-1 text-right">
                      شعبه و مرکز درمانی
                    </label>
                    <select
                      value={clinic}
                      onChange={e => setClinic(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#083457] border border-white/25 text-white text-xs focus:outline-hidden focus:border-amber-300 transition-all text-right"
                    >
                      <option value="مرکز سعادت‌آباد (مرکزی)">مرکز سعادت‌آباد (مرکزی)</option>
                      <option value="مرکز فرمانیه (کامرانیه)">مرکز فرمانیه (کامرانیه)</option>
                      <option value="مرکز پاسداران (بوستان)">مرکز پاسداران (بوستان)</option>
                      <option value="مرکز قم (بلوار جمهوری)">مرکز قم (بلوار جمهوری)</option>
                      <option value="مرکز قم (میدان معلم)">مرکز قم (میدان معلم)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full h-12 rounded-xl text-sm font-black bg-[#7ee719] hover:bg-[#72d615] text-[#0d3810] shadow-[0_8px_20px_rgba(126,231,25,0.3)] hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>ثبت درخواست نوبت رایگان</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
