import React, { useState } from 'react';
import { 
  Calendar, 
  Video, 
  Star, 
  Award, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowDown,
  Activity,
  Heart,
  ChevronLeft,
  Stethoscope,
  Building2,
  Image as ImageIcon,
  UserCheck,
  Check,
  TrendingUp,
  FileCheck,
  Layers,
  PhoneCall,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { Doctor } from '../../types';
import { ThemeStyles } from './themeConfig';

interface Props {
  doctor: Doctor;
  theme: ThemeStyles;
  onBookInPerson: () => void;
  onBookOnline: () => void;
}

export type HeroConceptId = 
  | 'concept-1'
  | 'concept-2'
  | 'concept-3'
  | 'concept-4'
  | 'concept-5'
  | 'concept-6'
  | 'concept-7'
  | 'concept-8'
  | 'concept-9'
  | 'concept-10';

interface HeroConceptMeta {
  id: HeroConceptId;
  number: number;
  title: string;
  shortDesc: string;
  tag: string;
}

const HERO_CONCEPTS: HeroConceptMeta[] = [
  { id: 'concept-1', number: 1, title: 'پایش بالینی و قلب آرام', shortDesc: 'اسپلیت اسکرین نامتقارن با پایشگر مینیمال نبض آبی', tag: 'Split Screen' },
  { id: 'concept-2', number: 2, title: 'بنتو گرید تخصص و اعتبار', shortDesc: 'چیدمان مدرن بنتو با باکس‌های تفکیک‌شده سابقه و رزرواسیون', tag: 'Bento Grid' },
  { id: 'concept-3', number: 3, title: 'نوبت‌دهی فوری و بدون اصطکاک', shortDesc: 'کاهش مقاومت ذهنی با رزرو مستقیم شعبه و ساعت در هیرو', tag: 'High-CRO' },
  { id: 'concept-4', number: 4, title: 'درگاه هدایت از علائم تا درمان', shortDesc: 'مسیردهی بیمار از درد قفسه سینه یا تپش قلب به درمان تخصصی', tag: 'Symptom Flow' },
  { id: 'concept-5', number: 5, title: 'مینیمال پرستیژ و سابقه سوئیس', shortDesc: 'طراحی سفید-آبی آکادمیک، الهام‌گرفته از دپارتمان زوریخ', tag: 'Swiss Minimal' },
  { id: 'concept-6', number: 6, title: 'نئومورفیسم پزشکی نرم', shortDesc: 'کارت‌های حجمی نرم، سایه‌های پودری آبی و لمس‌پذیری دیجیتال', tag: 'Soft Neumorphic' },
  { id: 'concept-7', number: 7, title: 'اثبات بالینی و سفر بیمار', shortDesc: 'تمرکز بر نتایج درمان، درصد رضایت و ۳۵۰۰+ آنژیوپلاستی موفق', tag: 'Social Proof' },
  { id: 'concept-8', number: 8, title: 'شبیه‌ساز تصویرسازی عروق', shortDesc: 'تصویرسازی وکتوری آناتومی قلب سالم با نورپردازی لاجوردی', tag: '3D Illustration' },
  { id: 'concept-9', number: 9, title: 'کارت شناور و هاب دسترسی جامع', shortDesc: 'کارت شناور با دسترسی سریع به درباره، خدمات، مراکز و گالری', tag: 'Glassmorphism' },
  { id: 'concept-10', number: 10, title: 'کنسیرژ تخصصی و ویزیت VIP', shortDesc: 'طراحی لوکس پزشکی با امکان رزرو مشاوره فوری و پشتیبانی مطب', tag: 'VIP Concierge' }
];

export const DoctorSiteHero: React.FC<Props> = ({
  doctor,
  theme,
  onBookInPerson,
  onBookOnline
}) => {
  const [selectedConcept, setSelectedConcept] = useState<HeroConceptId>('concept-1');
  const [selectedOfficeTab, setSelectedOfficeTab] = useState<'saadat' | 'vanak'>('saadat');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('تپش قلب و آریتمی');

  // Quick jump links required: درباره دکتر / خدمات / مراکز درمانی / گالری / نتایج
  const quickNavItems = [
    { label: 'درباره دکتر', href: '#about', icon: Stethoscope },
    { label: 'خدمات تخصصی', href: '#services', icon: Sparkles },
    { label: 'مراکز درمانی و مطب‌ها', href: '#offices', icon: Building2 },
    { label: 'گالری و تجهیزات', href: '#gallery', icon: ImageIcon },
    { label: 'نتایج و نظرات بیماران', href: '#reviews', icon: Award }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/50 via-sky-50/30 to-white">
      
      {/* 1. TOP INTERACTIVE CONCEPT SELECTOR BAR */}
      <div className="bg-slate-900 text-white border-b border-blue-950/60 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
              <span className="text-xs font-bold text-sky-200">
                طراحی تخصصی وبسایت {doctor.name}
              </span>
              <span className="text-[10px] bg-blue-800 text-sky-200 px-2 py-0.5 rounded-md font-medium">
                ۱۰ کانسپت استراتژیک Hero Section
              </span>
            </div>

            {/* Micro Navigation Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
              {HERO_CONCEPTS.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                    selectedConcept === concept.id
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title={concept.title}
                >
                  <span className="text-[10px] opacity-75">#{concept.number}</span>
                  <span className="truncate max-w-[110px]">{concept.title.split(' ')[0]} {concept.title.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. PERSISTENT FAST-ACCESS MEDICAL PILLS (درباره / خدمات / مراکز / گالری / نتایج) */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100/80 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              دسترسی سریع بخش‌های سایت:
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {quickNavItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-blue-200 px-2.5 py-1 rounded-lg transition-all shrink-0"
                >
                  <Icon className="w-3.5 h-3.5 text-blue-600" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC HERO SECTION - RENDERS THE CHOSEN CONCEPT (ALL 10 CONCEPTS) */}

      {/* ======================================================== */}
      {/* CONCEPT 1: پایش بالینی و قلب آرام (Split Screen & Waveform) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-1' && (
        <section className="relative pt-8 pb-16 md:pt-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Right Col: Messaging & Action */}
              <div className="lg:col-span-7 space-y-6 text-right">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/90 text-blue-900 border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>کد نظام پزشکی: ۴۸۱۲۵</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>۱۸ سال سابقه فوق‌تخصصی</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>فلوشیپ زوریخ سوئیس</span>
                  </span>
                </div>

                {/* Headline & Subheadline */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                    ضربان آرام، قلبی سالم و درمانی مطمئن با <span className="text-blue-700">{doctor.name}</span>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                    فوق تخصص بیماری‌های قلب و عروق و آنژیوپلاستی. تشخیص زودهنگام تنگی عروق، اکوکاردیوگرافی پیشرفته و تنظیم علمی فشار خون با دقیق‌ترین متدهای بالینی.
                  </p>
                </div>

                {/* Blue ECG Rhythm Waveform Illustration */}
                <div className="bg-white/90 p-3.5 rounded-2xl border border-blue-200/80 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">پایش آنلاین و نوبت‌دهی قطعی</div>
                      <div className="text-[11px] text-slate-500">نزدیک‌ترین زمان آزاد مطب سعادت‌آباد: امروز ساعت ۱۷:۳۰</div>
                    </div>
                  </div>
                  {/* Stylized Cyan-Blue SVG Waveform */}
                  <svg className="h-8 w-28 text-blue-600 hidden sm:block" viewBox="0 0 120 30" fill="none">
                    <path d="M0 15 H30 L35 5 L40 25 L45 8 L50 20 L55 15 H120" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={onBookInPerson}
                    className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>رزرو نوبت ویزیت حضوری</span>
                  </button>
                  <button
                    onClick={onBookOnline}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-xs transition-all cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>مشاوره آنلاین تصویری</span>
                  </button>
                </div>

                {/* Microcopy & Assurance */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    تایید آنی پیامکی
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    طرف قرارداد با کلیه بیمه‌های پایه و تکمیلی
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    امکان لغو یا تغییر زمان رایگان
                  </span>
                </div>
              </div>

              {/* Left Col: Medical Vector Card & Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Subtle Cyan Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-3xl blur-xl opacity-20" />
                  
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-blue-100">
                    <div className="relative h-88 sm:h-96 w-full overflow-hidden bg-slate-100">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-4 right-4 left-4 text-white space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                          <Stethoscope className="w-3.5 h-3.5" />
                          <span>فوق تخصص اینترونشنال کاردیولوژی</span>
                        </div>
                        <div className="text-xl font-black">{doctor.name}</div>
                        <div className="text-xs text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span>مطب سعادت‌آباد و کلینیک تخصصی ونک</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Clinical Metrics */}
                    <div className="p-4 bg-slate-50/90 border-t border-slate-100 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 text-center">
                      <div>
                        <div className="text-[11px] text-slate-500">رضایت مراجعین</div>
                        <div className="text-sm font-black text-blue-900 mt-0.5">۹۸.۹٪</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">تجربه تخصصی</div>
                        <div className="text-sm font-black text-blue-900 mt-0.5">۱۸ سال</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">آنژیوپلاستی موفق</div>
                        <div className="text-sm font-black text-blue-700 mt-0.5">+۳,۵۰۰</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 2: بنتو گرید تخصص و اعتبار (Cardio Bento Grid) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-2' && (
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                مرکز فوق‌تخصصی قلب و عروق
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                تخصص، دانش روز و درمان جامع قلب در یک نگاه
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                ترکیب تجربه بالینی درخشان دانشگاهی با تجهیزات پیشرفته تشخیصی جهت آسودگی خاطر بیماران
              </p>
            </div>

            {/* Bento Grid Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Bento 1: Doctor Identity & Main Booking CTA (Span 7) */}
              <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col justify-between space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-blue-100 shadow-sm shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-blue-600">وبسایت رسمی پزشک</div>
                    <h2 className="text-2xl font-black text-slate-900">{doctor.name}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      فوق تخصص اینترونشنال کاردیولوژی | رتبه اول بورد کشوری و فلوشیپ زوریخ
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                    <span>نزدیک‌ترین زمان‌های نوبت آزاد:</span>
                    <span className="text-blue-700 bg-blue-200/60 px-2 py-0.5 rounded-md">همین امروز</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-xl border border-blue-100 text-center font-bold text-slate-800">
                      سعادت‌آباد: امروز ۱۷:۳۰
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-blue-100 text-center font-bold text-slate-800">
                      مطب ونک: فردا ۱۰:۰۰
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onBookInPerson}
                    className="flex-1 py-3.5 px-6 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all text-center cursor-pointer"
                  >
                    رزرو اینترنتی نوبت حضوری
                  </button>
                  <button
                    onClick={onBookOnline}
                    className="py-3.5 px-5 rounded-xl font-bold text-sm bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 transition-all text-center cursor-pointer"
                  >
                    مشاوره تصویری
                  </button>
                </div>
              </div>

              {/* Bento 2: Academic & International Proof (Span 5) */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-sky-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white">مدارک و افتخارات علمی</h3>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      فوق تخصص اینترونشنال از دانشگاه علوم پزشکی تهران
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      فلوشیپ آنژیوپلاستی عروق پیچیده از زوریخ سوئیس
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      عضو پیوسته انجمن قلب آمریکا (Fellow of AHA)
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-sky-300">
                  <span>کد نظام پزشکی: ۴۸۱۲۵</span>
                  <a href="#about" className="hover:underline font-bold">مشاهده سوابق کامل ←</a>
                </div>
              </div>

              {/* Bento 3: Diagnostic Core (Span 4) */}
              <div className="md:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">اکوکاردیوگرافی رنگی و داپلر</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  بررسی دقیق عملکرد دریچه‌ها و عضلات قلب با دستگاه پیشرفته جنرال الکتریک در مطب.
                </p>
                <a href="#services" className="text-xs font-bold text-blue-600 inline-block pt-1 hover:underline">
                  جزئیات خدمات ←
                </a>
              </div>

              {/* Bento 4: Heart Intervention & Angioplasty (Span 4) */}
              <div className="md:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">آنژیوپلاستی و استنت‌گذاری</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  بیش از ۳۵۰۰ عمل موفق استنت‌گذاری عروق کرونر با استنت‌های دارویی نسل سوم.
                </p>
                <a href="#reviews" className="text-xs font-bold text-blue-600 inline-block pt-1 hover:underline">
                  مشاهده نظرات بیماران ←
                </a>
              </div>

              {/* Bento 5: Centers & GPS (Span 4) */}
              <div className="md:col-span-4 bg-white rounded-3xl p-5 border border-blue-100 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">مراکز درمانی فعال</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  مطب ۱: سعادت‌آباد | مطب ۲: ونک | بیمارستان‌های لاله، خاتم‌الانبیاء و دی.
                </p>
                <a href="#offices" className="text-xs font-bold text-blue-600 inline-block pt-1 hover:underline">
                  آدرس و ساعات کاری ←
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 3: نوبت‌دهی فوری و بدون اصطکاک (Frictionless Rapid Booking) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-3' && (
        <section className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-200/90 shadow-xl space-y-8">
              
              {/* Header */}
              <div className="text-center space-y-2 border-b border-slate-100 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  رزرو مستقیم کمتر از ۱ دقیقه
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  نوبت‌دهی آنلاین مطب فوق‌تخصصی قلب <span className="text-blue-700">{doctor.name}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                  لطفاً مرکز درمانی مورد نظر و نوع ویزیت را انتخاب نمایید تا نزدیک‌ترین زمان‌های در دسترس نمایش داده شوند.
                </p>
              </div>

              {/* Step 1: Choose Location */}
              <div className="space-y-3">
                <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">۱</span>
                  انتخاب مرکز ویزیت:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedOfficeTab('saadat')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                      selectedOfficeTab === 'saadat'
                        ? 'bg-blue-50/80 border-blue-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">مطب سعادت‌آباد</span>
                      {selectedOfficeTab === 'saadat' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500">تهران، سعادت‌آباد، طبقه ۴، واحد ۴۰۲</p>
                    <div className="text-[11px] font-bold text-blue-700 pt-1">اولین نوبت خالی: امروز ۱۷:۳۰</div>
                  </div>

                  <div
                    onClick={() => setSelectedOfficeTab('vanak')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                      selectedOfficeTab === 'vanak'
                        ? 'bg-blue-50/80 border-blue-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">کلینیک تخصصی ونک</span>
                      {selectedOfficeTab === 'vanak' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500">تهران، میدان ونک، ابتدای حقانی، پلاک ۴۰</p>
                    <div className="text-[11px] font-bold text-blue-700 pt-1">اولین نوبت خالی: فردا ۱۰:۰۰</div>
                  </div>
                </div>
              </div>

              {/* Step 2: Choose Service / Slot */}
              <div className="space-y-3">
                <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">۲</span>
                  خدمت تشخیصی یا درمانی:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['ویزیت عمومی و چکاپ قلب', 'اکوکاردیوگرافی رنگی', 'تست ورزش قلب', 'هولتر فشار و ریتم'].map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-center font-bold text-slate-700 hover:text-blue-800 transition-all cursor-pointer"
                      onClick={onBookInPerson}
                    >
                      {srv}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 space-y-0.5 text-center sm:text-right">
                  <div className="font-bold text-slate-800">تعرفه مصوب نظام پزشکی • پذیرش بیمه‌های تکمیلی</div>
                  <div>نوبت‌دهی کاملاً آنلاین بدون نیاز به پرداخت پیش‌پرداخت اولیه</div>
                </div>
                <button
                  onClick={onBookInPerson}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer text-center"
                >
                  ثبت نهایی و دریافت کد رهگیری
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 4: درگاه هدایت از علائم تا درمان (Symptom-to-Care Gateway) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-4' && (
        <section className="py-10 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-6 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-800/80 text-sky-200 border border-blue-600">
                    <Activity className="w-3.5 h-3.5 text-sky-300" />
                    سامانه هوشمند پایش اولیه علائم قلبی
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    احساس ناراحتی در قفسه سینه یا تپش قلب دارید؟
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    علائم قلبی هرگز نباید نادیده گرفته شوند. علامت اصلی خود را انتخاب فرمایید تا راهنمای تشخیصی و نوبت دکتر مریم حسینی برای شما فراهم شود.
                  </p>

                  {/* Symptom selector pills */}
                  <div className="space-y-2">
                    <div className="text-xs text-sky-300 font-bold">علامت خود را انتخاب فرمایید:</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'تپش قلب و آریتمی',
                        'درد یا سنگینی قفسه سینه',
                        'تنگی نفس هنگام فعالیت',
                        'فشار خون نامنظم و بالا',
                        'سرگیجه و احساس سیاهی رفتن چشم'
                      ].map((sym, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSymptom(sym)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedSymptom === sym
                              ? 'bg-blue-600 text-white shadow-md ring-1 ring-sky-300'
                              : 'bg-white/10 hover:bg-white/20 text-slate-200'
                          }`}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={onBookInPerson}
                      className="px-7 py-3.5 rounded-xl font-black text-sm bg-blue-500 hover:bg-blue-400 text-white shadow-lg transition-all cursor-pointer text-center"
                    >
                      رزرو نوبت بررسی {selectedSymptom}
                    </button>
                    <button
                      onClick={onBookOnline}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer text-center"
                    >
                      مشاوره اورژانسی آنلاین
                    </button>
                  </div>
                </div>

                {/* Left Card: Clinical Recommendation */}
                <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-md space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-extrabold text-sm">{doctor.name}</div>
                      <div className="text-xs text-blue-700 font-bold">فوق تخصص قلب و عروق</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 space-y-1">
                    <div className="text-xs font-bold text-blue-900">توصیه پزشک برای {selectedSymptom}:</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      بررسی نوار قلب (ECG)، اکوکاردیوگرافی داپلر و در صورت نیاز هولتر ۲۴ ساعته جهت ارزیابی سلامت عروق کرونر و ریتم قلب.
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>مدت زمان ویزیت:</span>
                      <strong className="text-slate-900">۳۰ الی ۴۵ دقیقه</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>تجهیزات مطب:</span>
                      <strong className="text-slate-900">اکو پیشرفته جنرال الکتریک</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 5: مینیمال پرستیژ و سابقه سوئیس (Swiss Minimalist Excellence) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-5' && (
        <section className="py-12 md:py-20 border-b border-slate-200/80 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-8 space-y-6 text-right">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                  <span>DR. MARYAM HOSSEINI, MD</span>
                  <span>•</span>
                  <span>INTERVENTIONAL CARDIOLOGY</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  استاندارد عالی طبابت و مراقبت فوق‌تخصصی قلب
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                  تلفیق ۱۸ سال تجربه بالینی دانشگاهی، دوره‌های تکمیلی آنژیوپلاستی عروق کرونر از زوریخ سوئیس و بهره‌گیری از تجهیزات استاندارد اروپایی در مطب سعادت‌آباد و کلینیک ونک.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    رتبه اول آزمون جامع بورد کشوری
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    عضو انجمن قلب آمریکا (AHA)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    پزشک برگزیده جشنواره بالینی
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={onBookInPerson}
                    className="px-8 py-4 rounded-xl font-extrabold text-sm bg-slate-950 hover:bg-slate-800 text-white shadow-sm transition-all cursor-pointer text-center"
                  >
                    دریافت نوبت ویزیت حضوری
                  </button>
                  <button
                    onClick={onBookOnline}
                    className="px-6 py-4 rounded-xl font-bold text-sm bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-all cursor-pointer text-center"
                  >
                    مشاوره آنلاین تصویری
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs space-y-3">
                  <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-full h-80 object-cover object-top"
                    />
                  </div>
                  <div className="text-center text-xs text-slate-500">
                    مطب سعادت‌آباد: طبقه ۴، واحد ۴۰۲ • تلفن: ۰۲۱-۲۲۱۴۵۶۷۸
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 6: نئومورفیسم پزشکی نرم (Soft Clinical Neumorphism) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-6' && (
        <section className="py-12 md:py-20 bg-slate-100/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-right">
                <div className="inline-block px-4 py-1.5 rounded-2xl bg-slate-100 text-blue-900 font-bold text-xs shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                  نئومورفیسم بالینی مدرن • پایش پیوسته قلب
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                  حس آسایش و اعتماد در درمان بیماری‌های قلب و عروق
                </h1>

                <p className="text-base text-slate-600 leading-relaxed">
                  طراحی بر پایه تعامل نرم و بدون استرس. نوبت‌های خالی را بررسی کنید، مدارک پزشکی قبلی خود را ارسال فرمایید و در محیطی آرام ویزیت شوید.
                </p>

                {/* Neumorphic Feature Strip */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-100 shadow-[4px_4px_10px_rgba(0,0,0,0.06),-4px_-4px_10px_rgba(255,255,255,0.9)] space-y-1">
                    <div className="font-bold text-xs text-blue-800">اکوکاردیوگرافی داپلر</div>
                    <div className="text-[11px] text-slate-500">سنجش دقیق تپش قلب و دریچه‌ها</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-100 shadow-[4px_4px_10px_rgba(0,0,0,0.06),-4px_-4px_10px_rgba(255,255,255,0.9)] space-y-1">
                    <div className="font-bold text-blue-800 text-xs">آنژیوگرافی و استنت</div>
                    <div className="text-[11px] text-slate-500">درمان انسداد عروق کرونر</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onBookInPerson}
                    className="px-7 py-3.5 rounded-2xl font-black text-sm bg-blue-600 text-white shadow-[4px_4px_12px_rgba(37,99,235,0.3),-2px_-2px_6px_rgba(255,255,255,0.5)] active:scale-98 transition-all cursor-pointer"
                  >
                    رزرو فوری نوبت مطب
                  </button>
                  <button
                    onClick={onBookOnline}
                    className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-slate-100 text-blue-900 shadow-[4px_4px_10px_rgba(0,0,0,0.06),-4px_-4px_10px_rgba(255,255,255,0.9)] transition-all cursor-pointer"
                  >
                    مشاوره آنلاین تصویری
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="p-4 rounded-3xl bg-slate-100 shadow-[10px_10px_25px_rgba(0,0,0,0.08),-10px_-10px_25px_rgba(255,255,255,0.9)]">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-72 h-88 rounded-2xl object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 7: اثبات بالینی و سفر بیمار (Evidence-Based Patient Results) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-7' && (
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5 text-right">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  اثبات بالینی و آمار درمان‌های موفق
                </span>

                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                  بیش از ۳,۵۰۰ زندگی نجات‌یافته با آنژیوپلاستی و مراقبت قلبی
                </h1>

                <p className="text-base text-slate-600 leading-relaxed">
                  مهم‌ترین سرمایه دکتر مریم حسینی، سلامت پایدار بیماران و رضایت ۹۸.۹ درصدی آنان است. با اطمینان از تجربه و تعهد پزشک، مسیر درمان خود را آغاز کنید.
                </p>

                {/* Social Proof Metric Row */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 py-2">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-2xl font-black text-blue-700">۹۸.۹٪</div>
                    <div className="text-[11px] text-slate-500 font-medium">رضایت مراجعین</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-2xl font-black text-blue-700">+۳,۵۰۰</div>
                    <div className="text-[11px] text-slate-500 font-medium">آنژیوپلاستی موفق</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-2xl font-black text-blue-700">۱۸ سال</div>
                    <div className="text-[11px] text-slate-500 font-medium">سابقه بالینی</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onBookInPerson}
                    className="px-7 py-3.5 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
                  >
                    رزرو نوبت ویزیت با پزشک
                  </button>
                  <a
                    href="#reviews"
                    className="px-5 py-3.5 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    مشاهده نظرات بیماران
                  </a>
                </div>
              </div>

              {/* Patient quote visual card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-3xl border border-blue-200 space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 mr-1">امتیاز ۴.۹ از ۵ (۳۴۲ نظر تاییدشده)</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  «پدرم با گرفتگی شدید سه رگ کرونر به خانم دکتر حسینی مراجعه کردند. با آرامش، تخصص بی‌نظیر و تعبیه استنت دارویی، حال پدرم کاملاً بهبود یافت. همیشه دعاگوی ایشان هستیم.»
                </blockquote>
                <div className="pt-2 border-t border-blue-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold">علیرضا م. (بیمار آنژیوپلاستی)</span>
                  <span className="text-[11px] text-slate-400">مراجعه به مطب سعادت‌آباد</span>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 8: شبیه‌ساز تصویرسازی عروق (Interactive 3D Vascular Insight) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-8' && (
        <section className="py-12 md:py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-sky-300 border border-blue-700">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  آناتومی و فیزیولوژی سلامت قلب
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  عروق کرونر باز، تنفس عمیق و کیفیت زندگی بالاتر
                </h1>

                <p className="text-base text-slate-300 leading-relaxed">
                  تنگی عروق قلب می‌تواند تدریجی و بی‌صدا پیشروی کند. با روش‌های اینترونشنال مدرن و بررسی دقیق جریان خون، از بروز سکته قلبی پیشگیری می‌کنیم.
                </p>

                {/* Anatomy Callout Pill Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-0.5">
                    <span className="text-sky-400 font-bold">عروق LAD و LCx</span>
                    <p className="text-[11px] text-slate-400">بررسی و درمان پیشرفته تنگی شریان اصلی</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-0.5">
                    <span className="text-sky-400 font-bold">پایش اکوی بافتی (TDI)</span>
                    <p className="text-[11px] text-slate-400">سنجش کسینوس قدرت انقباض بطن چپ</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onBookInPerson}
                    className="px-7 py-3.5 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all cursor-pointer"
                  >
                    رزرو وقت چکاپ قلب
                  </button>
                  <button
                    onClick={onBookOnline}
                    className="px-5 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-sky-200 border border-slate-700 transition-all cursor-pointer"
                  >
                    مشاوره تصویری آنژیوگرافی
                  </button>
                </div>
              </div>

              {/* Heart Medical Graphic Illustration */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-gradient-to-br from-blue-950 to-slate-900 border border-blue-800/50 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
                  {/* Stylized Cyan Vector Heart Anatomy */}
                  <div className="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full bg-sky-500/20 animate-ping absolute" />
                    <Heart className="w-16 h-16 text-sky-400 relative z-10" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-black text-base text-white">پایش اختصاصی سلامت قلب</div>
                    <div className="text-xs text-slate-400">تحت نظر دکتر مریم حسینی</div>
                  </div>
                  <div className="text-[11px] bg-blue-950/80 text-sky-300 px-3 py-1 rounded-full border border-blue-800">
                    ضربان نرمال: ۶۰ الی ۹۰ ضربه در دقیقه
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 9: کارت شناور و هاب دسترسی جامع (Floating Glassmorphism Hub) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-9' && (
        <section className="py-12 md:py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Background Medical Illustration Gradient */}
            <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="max-w-2xl space-y-4 relative z-10 text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                  درگاه رسمی دکتر مریم حسینی
                </span>
                <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white">
                  سلامت قلب شما، اولویت بیست‌وچهار ساعته ماست
                </h1>
                <p className="text-sm sm:text-base text-blue-50 leading-relaxed">
                  دسترسی مستقیم به زمان‌های خالی مطب، خدمات تخصصی اکو و آنژیو، گالری تجهیزات و تجارب درمان‌شدگان.
                </p>
              </div>

              {/* Floating Glassmorphic Hub Card */}
              <div className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-slate-900 shadow-xl border border-white/40 grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                <div className="sm:col-span-1 space-y-1 text-right">
                  <div className="text-xs text-slate-500 font-bold">پزشک معالج:</div>
                  <div className="text-base font-extrabold text-blue-900">{doctor.name}</div>
                  <div className="text-xs text-slate-600">فوق تخصص قلب و عروق</div>
                </div>

                <div className="sm:col-span-1 space-y-1 text-right border-r border-slate-200 pr-3">
                  <div className="text-xs text-slate-500 font-bold">مراکز درمانی:</div>
                  <div className="text-xs font-bold text-slate-800">مطب سعادت‌آباد و کلینیک ونک</div>
                  <div className="text-[11px] text-blue-600 font-medium">پوشش کامل بیمه‌ها</div>
                </div>

                <div className="sm:col-span-1 space-y-1 text-right border-r border-slate-200 pr-3">
                  <div className="text-xs text-slate-500 font-bold">نزدیک‌ترین ویزیت:</div>
                  <div className="text-xs font-extrabold text-blue-800">امروز ساعت ۱۷:۳۰</div>
                  <div className="text-[11px] text-slate-500">رزرو آنلاین و آنی</div>
                </div>

                <div className="sm:col-span-1 flex items-center justify-center">
                  <button
                    onClick={onBookInPerson}
                    className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer text-center"
                  >
                    رزرو نوبت اینترنتی
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* CONCEPT 10: کنسیرژ تخصصی و نوبت‌دهی VIP (Concierge VIP Care) */}
      {/* ======================================================== */}
      {selectedConcept === 'concept-10' && (
        <section className="py-12 md:py-20 bg-slate-950 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-900/50 text-sky-300 border border-blue-700/60">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              خدمات اختصاصی بیماران و پیگیری شخصی درمان
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                مراقبت پیوسته و ویزیت VIP قلب با <span className="text-sky-400">{doctor.name}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                بدون معطلی در صف انتظار مطب. هماهنگی اختصاصی زمان ویزیت، انجام اکوکاردیوگرافی و تست ورزش در یک جلسه و دسترسی دائمی به پرونده سلامت الکترونیک.
              </p>
            </div>

            {/* VIP Card Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-sky-400 flex items-center justify-center font-bold">۱</div>
                <h4 className="font-bold text-sm text-white">پذیرش مستقیم بدون انتظار</h4>
                <p className="text-xs text-slate-400 leading-relaxed">حضور در ساعت مقرر بدون تاخیر با پذیرش اختصاصی منشی.</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-sky-400 flex items-center justify-center font-bold">۲</div>
                <h4 className="font-bold text-sm text-white">چکاپ کامل در یک مراجعه</h4>
                <p className="text-xs text-slate-400 leading-relaxed">ویزیت، نوار قلب، اکو و تست ورزش هم‌زمان در یک نوبت.</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-sky-400 flex items-center justify-center font-bold">۳</div>
                <h4 className="font-bold text-sm text-white">پشتیبانی و تفسیر آنلاین</h4>
                <p className="text-xs text-slate-400 leading-relaxed">امکان ارسال پیام و آزمایش‌های بعدی به پزشک از طریق پرتال.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={onBookInPerson}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                رزرو نوبت ویژه حضوری
              </button>
              <button
                onClick={onBookOnline}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-sky-200 border border-slate-700 transition-all cursor-pointer"
              >
                رزرو مشاوره آنلاین تصویری
              </button>
            </div>

            <div className="text-xs text-slate-500">
              شماره مستقیم هماهنگی مطب: ۰۲۱-۲۲۱۴۵۶۷۸ • پشتیبانی واتس‌اپ: ۰۹۱۲۳۳۳۴۴۵۵
            </div>

          </div>
        </section>
      )}

      {/* 4. BOTTOM ANCHOR JUMP TO SUBSEQUENT SECTIONS */}
      <div className="py-3 bg-slate-50 border-t border-slate-200 text-center">
        <a
          href="#about"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
        >
          <span>مشاهده سوابق کامل بالینی، خدمات درمانی و آدرس مطب‌ها</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>

    </div>
  );
};
