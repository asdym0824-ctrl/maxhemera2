import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Heart, Phone, MapPin, Mail, ShieldCheck, Clock, ChevronLeft, Activity, Lock, Cpu, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MedicalVectorPattern } from '../common/medicalPattern/MedicalVectorPattern';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isLoggedIn } = useAuth();

  const isStaffWorkspace = 
    (location.pathname === '/doctor' || (location.pathname.startsWith('/doctor/') && !location.pathname.startsWith('/doctors'))) ||
    location.pathname.startsWith('/secretary') ||
    location.pathname.startsWith('/reception') ||
    (location.pathname === '/clinic' || (location.pathname.startsWith('/clinic/') && !location.pathname.startsWith('/clinic-'))) ||
    location.pathname.startsWith('/admin');

  // Minimal professional status footer for staff workspaces
  if (isStaffWorkspace && isLoggedIn && currentUser.role !== 'patient') {
    return (
      <footer className="bg-slate-950 text-slate-400 py-4 border-t border-slate-800/80 mt-12 text-xs font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Activity className="w-4 h-4 text-blue-400" />
              سامانه سلامت همرا کلینیک (HEMERA CLINIC)
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              محیط کاربری پرسنل درمانی و اداری • توسعه‌یافته توسط هلدینگ HEMERA
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              ارتباط EMR رمزنگاری شده ۲۵۶ بیتی
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-blue-400" />
              موتور پردازش ابری HEMERA
            </span>
          </div>
        </div>
      </footer>
    );
  }

  // Rich public footer for patients and visitors
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-20 font-sans" dir="rtl">
      {/* Subtle Matte Medical Vector Pattern */}
      <MedicalVectorPattern opacity={0.032} variant="light" patternId="footer-med-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-600/20">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="font-bold text-2xl text-white tracking-tight">همرا کلینیک</span>
                <span className="text-[10px] font-black bg-blue-500/30 text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded-md mr-2">HEMERA CLINIC</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              پلتفرم یکپارچه مدیریت هوشمند سلامت و مراکز درمانی همرا کلینیک (پروژه سلامت هلدینگ HEMERA). ارائه‌دهنده خدمات تخصصی نوبت‌دهی، پرونده سلامت EMR و وب‌سایت اختصاصی پزشکان.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>پزشکان دارای تاییدیه نظام پزشکی</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>پذیرش ۲۴ ساعته آنلاین</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/doctors')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-500" />
                  جستجوی پزشکان متخصص
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/specialties')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-500" />
                  تخصص‌های پزشکی
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-500" />
                  خدمات و چکاپ‌های سلامت
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/telemedicine')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-500" />
                  مشاوره تلفنی و آنلاین
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/health')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-500" />
                  مجله و دانشنامه سلامت
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/clinic-branding')}
                  className="text-purple-300 hover:text-purple-200 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-purple-400" />
                  برندینگ و توسعه کلینیک
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-500" />
                  درباره ما (شرکت همرا)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1 cursor-pointer group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-emerald-500" />
                  <span>فرصت‌های شغلی</span>
                  <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded mr-1">
                    استخدام
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">سامانه‌ها و پرتال‌ها</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/patient')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-sky-500" />
                  پرونده الکترونیک بیمار
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/doctor')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-sky-500" />
                  پنل بالینی پزشکان
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/secretary')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-sky-500" />
                  میزکار پذیرش و تریاژ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/clinic')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-sky-500" />
                  مدیریت عملیات کلینیک
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-sky-500" />
                  کنسول ارشد مدیریت سیستم
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Support */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">ارتباط و پشتیبانی همرا</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              پاسخگویی ۲۴ ساعته، راهنمای نوبت‌دهی آنلاین و پشتیبانی مراجعین و مراکز درمانی همرا.
            </p>

            <div className="space-y-2 pt-0.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-[11px]">تهران، سعادت‌آباد، خیابان سرو غربی، پلاک ۴۴</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px]">مرکز تماس: ۰۲۱-۸۸۹۹۰۰۰۰</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px]">contact@hemeraclinic.ir</span>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="block text-[10.5px] font-bold text-slate-400">
                همرا در شبکه‌های اجتماعی:
              </span>
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-pink-500/60 hover:bg-pink-950/40 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 group"
                  title="اینستاگرام همرا کلینیک"
                  aria-label="اینستاگرام"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-sky-500/60 hover:bg-sky-950/40 text-slate-400 hover:text-sky-400 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 group"
                  title="کانال تلگرام همرا کلینیک"
                  aria-label="تلگرام"
                >
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/989120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 group"
                  title="پشتیبانی مستقیم در واتساپ"
                  aria-label="واتساپ"
                >
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 6.94C8.94 6.94 8.67 7 8.44 7.26C8.21 7.5 7.57 8.1 7.57 9.32C7.57 10.54 8.46 11.72 8.58 11.89C8.71 12.05 10.33 14.55 12.81 15.62C13.4 15.88 13.86 16.03 14.22 16.15C14.81 16.34 15.35 16.31 15.77 16.25C16.25 16.18 17.23 15.65 17.44 15.07C17.64 14.49 17.64 13.99 17.58 13.89C17.52 13.79 17.35 13.73 17.09 13.6C16.83 13.47 15.58 12.85 15.35 12.77C15.12 12.68 14.95 12.64 14.78 12.9C14.61 13.15 14.12 13.73 13.97 13.89C13.82 14.06 13.67 14.08 13.41 13.95C13.15 13.82 12.32 13.55 11.33 12.67C10.57 11.99 10.05 11.14 9.9 10.89C9.75 10.63 9.89 10.5 10.02 10.37C10.14 10.25 10.28 10.06 10.42 9.91C10.56 9.75 10.61 9.63 10.7 9.45C10.79 9.28 10.74 9.12 10.68 9C10.62 8.87 10.13 7.68 9.93 7.19C9.73 6.71 9.53 6.78 9.38 6.77L9.11 6.94Z"/>
                  </svg>
                </a>

                {/* Rubika */}
                <a
                  href="https://rubika.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-purple-500/60 hover:bg-purple-950/40 text-slate-400 hover:text-purple-400 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 group"
                  title="کانال روبیکا همرا کلینیک"
                  aria-label="روبیکا"
                >
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 2L3.5 6.88v9.76L12 21.52l8.5-4.88V6.88L12 2zm0 2.29l6.5 3.73v7.46L12 19.21l-6.5-3.73V8.02L12 4.29zm-1.25 3.71v3.5L7.75 9.75l3-1.75zm2.5 0l3 1.75-3 1.75V8zm-1.25 5.5l-3 1.75v-3.5l3 1.75zm2.5 0l3-1.75v3.5l-3-1.75z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© ۲۰۲۶ کلیه حقوق مادی و معنوی متعلق به شرکت دانش‌بنیان همرا (همرا کلینیک) می‌باشد.</p>
            <div className="flex items-center gap-2 text-slate-400">
              <button
                type="button"
                onClick={() => {
                  navigate('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-400 hover:text-blue-300 font-bold hover:underline cursor-pointer"
              >
                درباره شرکت همرا
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  navigate('/careers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>فرصت‌های شغلی</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                تماس و پشتیبانی
              </button>
            </div>
          </div>
          <p className="text-slate-500 max-w-xl text-center md:text-left leading-relaxed">
            اطلاعات ارائه‌شده در این پلتفرم جنبه آگاهی‌بخشی داشته و نباید جایگزین توصیه، تشخیص یا درمان مستقیم پزشکی گردد.
          </p>
        </div>
      </div>
    </footer>
  );
};
