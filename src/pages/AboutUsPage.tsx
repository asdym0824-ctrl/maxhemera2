import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Award, 
  Users, 
  Calendar, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Heart, 
  Stethoscope, 
  Activity, 
  Check,
  ChevronLeft,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Cpu,
  Lock,
  Zap,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Smile,
  BarChart3,
  Layers,
  FileText,
  BadgeCheck,
  Headphones,
  Laptop
} from 'lucide-react';
import { Doctor } from '../types';

interface AboutUsPageProps {
  doctors?: Doctor[];
  onOpenBookingModal?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  doctors = [],
  onOpenBookingModal
}) => {
  const navigate = useNavigate();

  // Active tab for dual audience: Patients vs Doctors/Clinics
  const [activeAudienceTab, setActiveAudienceTab] = useState<'patients' | 'doctors'>('patients');

  // Interactive Contact & Partnership Form
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    phone: '',
    type: 'patient_inquiry', // 'patient_inquiry' | 'doctor_join' | 'clinic_partnership'
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name.trim() || !partnerForm.phone.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTrackingNumber('HM-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitSuccess(true);
      setPartnerForm({
        name: '',
        phone: '',
        type: 'patient_inquiry',
        message: ''
      });
    }, 600);
  };

  const keyMilestones = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      number: '+۵۰',
      label: 'پزشک و فوق‌تخصص عضو',
      description: 'نخبگان علمی و اعضای هیئت علمی دانشگاه‌های علوم پزشکی'
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600" />,
      number: '+۱۵۰,۰۰۰',
      label: 'نوبت و مشاوره موفق',
      description: 'ثبت و پیگیری آنلاین بدون نیاز به انتظار تلفنی یا حضوری'
    },
    {
      icon: <Building2 className="w-6 h-6 text-purple-600" />,
      number: '۴ مرکز',
      label: 'درمانگاه و شعبه فعال',
      description: 'مراکز مجهز در تهران و قم با سیستم‌های متصل اتوماسیون'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      number: '۹۸.۶٪',
      label: 'شاخص رضایت مراجعین',
      description: 'بر اساس نظرسنجی‌های تاییدشده پس از انجام ویزیت'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 text-right pb-16 font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* 1. Hero Banner: Inspired by Darmankade (درمانکده) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-xl">
        {/* Ambient lighting glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-bold backdrop-blur-md">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>شرکت دانش‌بنیان همرا (HEMERA) • پیشگام سیستم‌های اتوماسیون سلامت</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.3] tracking-tight">
            داستان همرا؛ پلی هوشمند میان <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              مردم، پزشکان و مراکز درمانی
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            ایده اولیه همرا با یک دغدغه مهم شکل گرفت: پایان دادن به سردرگمی مراجعین در فرآیند نوبت‌دهی و تجمیع یکپارچه پزشکان، درمانگاه‌ها و خدمات سلامت در یک پلتفرم هوشمند. همرا به عنوان یک شرکت دانش‌بنیان در حوزه طراحی سیستم‌های پیشرفته اتوماسیون، دسترسی مردم به درمان را آسان و زیرساخت مدیریت بالینی پزشکان را متحول ساخته است.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onOpenBookingModal ? onOpenBookingModal() : navigate('/doctors')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>دریافت اینترنتی نوبت پزشک</span>
            </button>

            <a
              href="#about-story"
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition-all flex items-center gap-2"
            >
              <span>آشنایی با ایده اولیه و فلسفه ما</span>
              <ChevronLeft className="w-4 h-4 text-blue-400" />
            </a>

            <a
              href="tel:02188990000"
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs sm:text-sm px-4 py-3.5 rounded-2xl transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>پشتیبانی: ۰۲۱-۸۸۹۹۰۰۰۰</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Milestones Stats Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMilestones.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {item.number}
            </div>
            <div className="font-bold text-xs sm:text-sm text-slate-800">
              {item.label}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      {/* 3. The Genesis Idea: How & Why Hamrah Was Born (مشابه صفحه درباره ما درمانکده) */}
      <section id="about-story" className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ایده شکل‌گیری و رسالت همرا</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-snug">
            ایده اولیه همرا چه بود و چگونه متولد شد؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            در نظام سنتی درمان، بیماران همواره با چالش‌هایی چون صف‌های طویل، اشغال مداوم خطوط تلفنی مطب‌ها، عدم شفافیت در نوبت‌های خالی و گم شدن مدارک کاغذی روبرو بودند. از سوی دیگر، پزشکان و مدیران درمانگاه‌ها ساعت‌های بی‌شماری را صرف هماهنگی دستی نوبت‌ها، مدیریت تماس‌های منشی و مستندسازی پرونده‌های حجیم می‌کردند.
          </p>
        </div>

        {/* The Two Pillars: Before vs After (The Solution) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: چالش‌های پیش از همرا */}
          <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-rose-950">دغدغه‌های درمان سنتی</h3>
                <span className="text-[11px] text-rose-700">اتلاف وقت، ابهام و دشواری دسترسی</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                <span>ساعت‌ها معطلی در اتاق انتظار و سردرگمی بیماران برای یافتن نزدیک‌ترین درمانگاه یا پزشک مورد نظر.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                <span>کنسلی مکرر نوبت‌ها به علت عدم سیستم یادآوری هوشمند و آسیب مالی به درمانگاه‌ها.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                <span>گم شدن تصاویر پزشکی، آزمایش‌ها و تاریخچه بالینی بیماران در پرونده‌های سنتی کاغذی.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: پاسخ دانش‌بنیان همرا */}
          <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-emerald-950">راهکار نوآورانه پلتفرم همرا</h3>
                <span className="text-[11px] text-emerald-700">شفافیت، اتوماسیون کامل و دسترسی همگانی</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                <span>تجمیع برترین متخصصان و درمانگاه‌ها با تقویم زنده زمان‌های خالی در کمتر از ۲ دقیقه.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                <span>طراحی اتوماسیون اداری و تریاژ برای پزشکان و منشی‌ها جهت کاهش ۹۵ درصدی خطای انسانی.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                <span>پرونده سلامت ابری امن با امکان ذخیره‌سازی آزمایش‌ها، نسخه‌ها و تصاویر رادیولوژی.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Company Identity: شرکت دانش‌بنیان در حوزه طراحی سیستم‌های اتوماسیون */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>هویت مهندسی و نرم‌افزاری</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black leading-snug">
            شرکت دانش‌بنیان همرا؛ طراح پیشرفته‌ترین سیستم‌های اتوماسیون سلامت
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            شرکت همرا یک شرکت دانش‌بنیان تخصصی در توسعه نرم‌افزارهای اتوماسیون پزشکی، سیستم‌های مدیریت اطلاعات بیمارستانی (HIS)، پرونده الکترونیک سلامت (EMR) و وب‌سایت‌های پزشکی است. تیم مهندسی همرا با تلفیق دانش پزشکی بالینی و مدرن‌ترین پشته‌های فناوری ابری، سامانه‌هایی پایدار، سریع و مقیاس‌پذیر برای مراکز درمانی خلق کرده است.
          </p>
        </div>

        {/* Tech Stack Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">اتوماسیون بدون وقفه نوبت‌دهی</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              هماهنگی آنی بین نوبت‌های اینترنتی، پذیرش حضوری و تماس‌های تلفنی بدون تداخل در تقویم پزشک.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">امنیت اطلاعات و حریم خصوصی</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              رمزنگاری ۲۵۶ بیتی کلیه پرونده‌ها و سوابق پزشکی با استاندارد بین‌المللی تبادل سلامت الکترونیک.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">سایت‌های اختصاصی پزشکان</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              طراحی خودکار پورتال‌های بالینی و برندینگ مستقل با رزومه، گالری نتایج درمان و پذیرش مستقیم.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dual Services Tab: Services to People vs Services to Doctors (خدمات به مردم و پزشکان) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
        <div className="text-center sm:text-right space-y-2">
          <span className="text-xs font-black text-blue-600 uppercase">ارزش‌آفرینی دوطرفه</span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900">
            خدمات پلتفرم همرا به جامعه مراجعین و جامعه پزشکی
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            همرا دو بال اصلی دارد: خدمت‌رسانی آسان و شفاف به عموم مردم و تجهیز حرفه‌ای پزشکان و درمانگاه‌ها به اتوماسیون هوشمند.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto sm:mx-0">
          <button
            type="button"
            onClick={() => setActiveAudienceTab('patients')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeAudienceTab === 'patients'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>خدمات همرا به مردم و بیماران</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAudienceTab('doctors')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeAudienceTab === 'doctors'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>خدمات همرا به پزشکان و کلینیک‌ها</span>
          </button>
        </div>

        {/* Tab Content: Patients */}
        {activeAudienceTab === 'patients' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">نوبت‌دهی آنلاین ۲۴ ساعته</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                مشاهده برنامه حضور پزشک، انتخاب ساعت دلخواه و تایید نهایی نوبت در کمتر از چند کلیک بدون نیاز به تماس تلفنی.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">مشاوره آنلاین تصویری و متنی</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ویزیت غیرحضوری با پزشک معالج، ارسال آزمایش‌ها و سونوگرافی از خانه بدون نیاز به سفر به پایتخت.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">پوشش بیمه و شفافیت مالی</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                استعلام هوشمند بیمه‌های طرف قرارداد (تامین اجتماعی، خدمات درمانی و تکمیلی) پیش از مراجعه به مرکز.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content: Doctors & Clinics */}
        {activeAudienceTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">اتوماسیون منشی و صف ویزیت</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                مدیریت خودکار صف مراجعین، ارسال پیامک یادآوری هوشمند به بیماران و کاهش چشمگیر لغو نوبت‌ها.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">وب‌سایت اختصاصی و سئو برند</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارائه پورتال با نام و دامنه اختصاصی پزشک، نمایش سوابق علمی و مقالات بدون هزینه طراحی سایت جداگانه.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-black text-sm text-slate-900">تراز مالی و تسویه مکانیزه</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                داشبورد حسابداری یکپارچه، تفکیک سهم پزشک و درمانگاه، پیگیری اسناد بیمه و گزارش‌گیری سودآوری.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 6. Featured Clinical Case Study: Dr. Saeid Ghorashi Center */}
      <section className="bg-gradient-to-r from-[#05263f] to-[#0c3c5f] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center lg:text-right max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#8be022] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مرکز تخصصی همکار برگزیده</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            نمونه پیاده‌سازی موفق اتوماسیون همرا: مرکز تخصصی دکتر سعید قریشی
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            کلینیک ارتودنسی دکتر سعید قریشی با ۴ شعبه فعال در تهران و قم، با بهره‌گیری از زیرساخت ابری همرا، سالانه پاسخگوی هزاران نوبت مشاوره، ویزیت و درمان تخصصی بدون تداخل و با رضایت حداکثری مراجعین است.
          </p>
        </div>

        <Link
          to="/site/dr-saeid-ghoreishi"
          className="shrink-0 bg-[#8be022] hover:bg-[#7ecc1b] text-[#05263f] font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <span>مشاهده سایت اختصاصی دکتر قریشی</span>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </section>

      {/* 7. Contact & Partnership Form (همکاری با پزشکان و پشتیبانی مراجعین) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5" />
            <span>ارتباط با دفتر مرکزی همرا</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            ارسال پیام، مشاوره یا درخواست همکاری پزشکان و مراکز درمانی
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            چنانچه پزشک، مدیر مرکز درمانی یا بیمار هستید، کارشناسان همرا در کمتر از ۲ ساعت کاری پاسخگوی شما خواهند بود.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-black text-slate-900 text-base">درخواست شما با موفقیت در سامانه همرا ثبت گردید</h3>
              <p className="text-xs text-slate-600">
                کد رهگیری پیگیری پیام: <strong className="font-mono text-emerald-800">{trackingNumber}</strong>
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.name}
                    onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    placeholder="مثال: دکتر علیرضا رضایی"
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه *</label>
                  <input
                    type="tel"
                    required
                    value={partnerForm.phone}
                    onChange={e => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-left font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نوع درخواست یا موضوع</label>
                <select
                  value={partnerForm.type}
                  onChange={e => setPartnerForm({ ...partnerForm, type: e.target.value })}
                  className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                >
                  <option value="patient_inquiry">پیگیری نوبت، استعلام درمان یا سوال بیماران</option>
                  <option value="doctor_join">عضویت پزشک و ایجاد مطب اینترنتی در همرا</option>
                  <option value="clinic_partnership">اتوماسیون درمانگاه، آزمایشگاه و تصویربرداری</option>
                  <option value="tech_partnership">همکاری فنی، پژوهشی و دانش‌بنیان</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن توضیحات یا پیام شما</label>
                <textarea
                  rows={3}
                  value={partnerForm.message}
                  onChange={e => setPartnerForm({ ...partnerForm, message: e.target.value })}
                  placeholder="توضیحات خود را مرقوم فرمایید..."
                  className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>در حال ثبت...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال پیام به دبیرخانه همرا</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Headquarters Details */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">دفتر مرکزی شرکت همرا:</span>
              <span>تهران، سعادت‌آباد، خیابان سرو غربی، پلاک ۴۴، ساختمان فناوری همرا</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">مرکز تماس و امور پزشکان:</span>
              <span className="font-mono dir-ltr">۰۲۱-۸۸۹۹۰۰۰۰ (داخلی ۲)</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800 block">پست الکترونیک رسمی:</span>
              <span className="font-mono">contact@hemeraclinic.ir</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
