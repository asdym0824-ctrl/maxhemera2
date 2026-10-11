import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Send, 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  MessageCircle, 
  Building2, 
  Compass, 
  HeartHandshake, 
  ExternalLink,
  ChevronRight,
  Check,
  Stethoscope,
  Smile,
  BadgeCheck,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { Doctor } from '../../types';
import drGhorashiHdHero from '../../assets/images/dr_ghorashi_hd_hero_1790512460920.jpg';
import clinicBranch1 from '../../assets/images/clinic_branch_1_1790237765427.jpg';
import clinicBranch2 from '../../assets/images/clinic_branch_2_1790237780521.jpg';
import clinicBranch3 from '../../assets/images/clinic_branch_3_1790237797898.jpg';
import clinicBranch4 from '../../assets/images/clinic_branch_4_1790237809761.jpg';

interface DrSaeidGhoreishiAboutPageProps {
  doctor?: Doctor;
  onOpenBooking?: () => void;
  onBackToHome?: () => void;
}

export const DrSaeidGhoreishiAboutPage: React.FC<DrSaeidGhoreishiAboutPageProps> = ({
  doctor,
  onOpenBooking,
  onBackToHome
}) => {
  const navigate = useNavigate();

  // Branch selector state for mobile & desktop
  const [selectedBranchId, setSelectedBranchId] = useState<'saadat' | 'farmanieh' | 'motahari' | 'qom'>('saadat');

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    branch: 'saadat',
    serviceType: 'ortho_invisible',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const branches = [
    {
      id: 'saadat',
      name: 'شعبه سعادت‌آباد (مرکز تخصصی اصلی)',
      shortName: 'سعادت‌آباد',
      area: 'غرب و شمال غرب تهران',
      address: 'تهران، سعادت‌آباد، میدان فرهنگ، بلوار ۲۴ متری، پلاک ۱۱، طبقه دوم، واحد ۳',
      phone: '۰۲۱-۲۲۸۸۶۹۰۰',
      telLink: 'tel:02122886900',
      hours: 'شنبه تا چهارشنبه: ۱۰:۰۰ الی ۲۰:۰۰',
      image: clinicBranch1,
      mapQuery: 'https://maps.google.com/?q=Tehran+Saadat+Abad+Farhang+Square',
      neshanQuery: 'https://neshan.org/maps/search/سعادت+آباد+میدان+فرهنگ',
      features: ['مجهز به اسکنر سه‌بعدی iTero', 'پارکینگ اختصاصی مراجعین', 'بخش اختصاصی کودکان و نوجوانان']
    },
    {
      id: 'farmanieh',
      name: 'شعبه فرمانیه (اندرزگو)',
      shortName: 'فرمانیه',
      area: 'شمال و شمال شرق تهران',
      address: 'تهران، فرمانیه، بلوار اندرزگو، نبش کوچه حسینی، ساختمان پزشکان پایتخت، طبقه ۴',
      phone: '۰۲۱-۲۲۶۹۰۱۰۰',
      telLink: 'tel:02122690100',
      hours: 'یکشنبه و سه‌شنبه: ۱۵:۰۰ الی ۲۱:۰۰',
      image: clinicBranch2,
      mapQuery: 'https://maps.google.com/?q=Tehran+Andarzgoo+Boulevard',
      neshanQuery: 'https://neshan.org/maps/search/فرمانیه+اندرزگو',
      features: ['کلینیک تخصصی اینویزلاین و پلاک شفاف', 'نوبت‌دهی اختصاصی VIP', 'دسترسی سریع از بزرگراه صدر']
    },
    {
      id: 'motahari',
      name: 'شعبه مطهری (مرکز تهران)',
      shortName: 'مطهری',
      area: 'مرکز تهران و دسترسی آسان مترو',
      address: 'تهران، خیابان استاد مطهری، خیابان فجر (جم سابق)، ساختمان شماره ۱۴، واحد ۵',
      phone: '۰۲۱-۸۸۴۵۳۲۰۰',
      telLink: 'tel:02188453200',
      hours: 'دوشنبه و چهارشنبه: ۱۴:۰۰ الی ۱۹:۳۰',
      image: clinicBranch3,
      mapQuery: 'https://maps.google.com/?q=Tehran+Motahari+Street+Fajr',
      neshanQuery: 'https://neshan.org/maps/search/مطهری+خیابان+فجر',
      features: ['نزدیک به ایستگاه مترو مصلای تهران', 'ویزیت ارتوسرجری و ناهنجاری‌های فک', 'پذیرش بیمه‌های تکمیلی']
    },
    {
      id: 'qom',
      name: 'شعبه قم (مرکز تخصصی استان قم)',
      shortName: 'قم (بلوار امین)',
      area: 'استان قم و شهرهای مرکزی ایران',
      address: 'قم، بلوار امین، نبش کوچه ۱۰، مجتمع پزشکان نور، طبقه ۳، واحد ۹',
      phone: '۰۲۵-۳۲۹۲۱۵۰۰',
      telLink: 'tel:02532921500',
      hours: 'پنج‌شنبه‌ها: ۰۹:۰۰ الی ۱۸:۰۰ (با تعیین وقت قبلی)',
      image: clinicBranch4,
      mapQuery: 'https://maps.google.com/?q=Qom+Amin+Boulevard',
      neshanQuery: 'https://neshan.org/maps/search/قم+بلوار+امین',
      features: ['برنامه‌ریزی فشرده برای مراجعین شهرستانی', 'مشاوره اولیه ارتودنسی دیجیتال', 'ارائه تسهیلات پرداخت اقساطی']
    }
  ];

  const currentBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = 'GH-' + Math.floor(100000 + Math.random() * 900000);
      setTrackingCode(code);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        branch: 'saadat',
        serviceType: 'ortho_invisible',
        message: ''
      });
    }, 600);
  };

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      navigate('/site/dr-saeid-ghoreishi');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#05263f] selection:text-white" dir="rtl">
      
      {/* Top Breadcrumb & Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#05263f] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="بازگشت به صفحه اصلی"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <button type="button" onClick={handleBack} className="hover:text-sky-700 transition-colors">
                  صفحه اصلی دکتر قریشی
                </button>
                <span>/</span>
                <span className="text-[#05263f] font-bold">درباره‌ی ما و اطلاعات تماس</span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-[#05263f] mt-0.5">
                درباره‌ی ما و ارتباط مستقیم با کلینیک
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenBooking ? onOpenBooking() : navigate('/site/dr-saeid-ghoreishi')}
              className="bg-[#05263f] hover:bg-[#031b2e] text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#8be022]" />
              <span className="hidden xs:inline">رزرو نوبت مشاوره</span>
              <span className="xs:hidden">رزرو نوبت</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-b from-[#05263f] via-[#073252] to-[#0a426d] text-white py-12 sm:py-16 px-4 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,224,34,0.12),transparent_40%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(223,169,56,0.12),transparent_40%)] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Right text column */}
            <div className="lg:col-span-7 text-center lg:text-right space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#8be022] text-xs sm:text-sm font-black shadow-sm">
                <Sparkles className="w-4 h-4 text-[#8be022]" />
                <span>مرکز فوق تخصصی ارتودنسی و ارتوپدی فک و صورت</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black leading-[1.3] tracking-tight">
                درباره‌ی ما و تمامی راه‌های <br className="hidden sm:inline" />
                <span className="text-[#8be022]">ارتباط مستقیم و حضوری</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-[1.9] max-w-2xl mx-auto lg:mx-0">
                مرکز ارتودنسی دکتر سعید قریشی با بیش از ۲ دهه فعالیت درخشان، ارائه جدیدترین فناوری‌های دیجیتال (اینویزلاین و سیستم‌های دیمون) و حضور فعال در ۴ مرکز مجهز تهران و قم، در کنار شماست تا لذت داشتن لبخندی استاندارد، متقارن و ماندگار را تجربه کنید.
              </p>

              {/* Fast stats row */}
              <div className="pt-2 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-[#8be022]">+۱۵,۰۰۰</span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium">لبخند متحول‌شده</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-[#dfa938]">۴ مرکز</span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium">تهران و قم</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <span className="block text-lg sm:text-2xl font-black text-sky-400">۲۰+ سال</span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium">تجربه و رتبه برتر بورد</span>
                </div>
              </div>
            </div>

            {/* Left Doctor Portrait Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden p-2.5 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md border border-white/30 shadow-2xl">
                <div className="relative h-[340px] sm:h-[380px] rounded-2xl overflow-hidden bg-[#05263f]">
                  <img
                    src={drGhorashiHdHero}
                    alt="دکتر سعید قریشی متخصص ارتودنسی"
                    className="w-full h-full object-cover object-[78%_center]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05263f] via-transparent to-transparent opacity-90"></div>

                  <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#05263f] shadow-lg text-right">
                    <div className="flex items-center justify-between">
                      <div className="font-black text-sm sm:text-base">دکتر سعید قریشی</div>
                      <BadgeCheck className="w-5 h-5 text-sky-600 fill-current" />
                    </div>
                    <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                      رتبه اول بورد تخصصی و عضو انجمن ارتودنتیست‌های آمریکا
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">

        {/* Section 1: Quick Action Contact Channels (۴ کارت ارتباط فوری) */}
        <section className="space-y-4">
          <div className="text-center sm:text-right">
            <h2 className="text-xl sm:text-2xl font-black text-[#05263f]">
              راه‌های ارتباط مستقیم و سریع با ما
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              جهت دریافت نوبت، مشاوره فوری یا ارسال تصاویر، از روش‌های زیر با ما در ارتباط باشید:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Phone Hotline */}
            <a
              href="tel:02122886900"
              className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-[#05263f]/30 group active:scale-95"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#05263f] flex items-center justify-center mb-3 group-hover:bg-[#05263f] group-hover:text-white transition-colors">
                <Phone className="w-6 h-6 fill-current" />
              </div>
              <div className="text-xs font-bold text-slate-400">خط تلفن ویژه منشی</div>
              <div className="text-lg font-black text-[#05263f] mt-0.5">۰۲۱-۲۲۸۸۶۹۰۰</div>
              <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>پاسخگویی سریع در ساعات کاری</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/989120000000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-500/40 group active:scale-95"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-400">پشتیبانی واتس‌اپ</div>
              <div className="text-lg font-black text-[#05263f] mt-0.5">ارسال عکس دندان</div>
              <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <span>بررسی آنلاین بدون نیاز به حضور</span>
              </div>
            </a>

            {/* Direct Consultation / Booking */}
            <button
              type="button"
              onClick={() => onOpenBooking ? onOpenBooking() : navigate('/site/dr-saeid-ghoreishi')}
              className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-[#dfa938]/40 group text-right active:scale-95 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#b5861b] flex items-center justify-center mb-3 group-hover:bg-[#dfa938] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-400">نوبت‌دهی آنلاین</div>
              <div className="text-lg font-black text-[#05263f] mt-0.5">مشاوره حضوری</div>
              <div className="text-xs text-[#b5861b] font-bold mt-2 flex items-center gap-1">
                <span>رزرو ۲۴ ساعته اینترنتی</span>
              </div>
            </button>

            {/* Emergency & Overseas Patients */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-400">بیماران شهرستان و خارج</div>
              <div className="text-lg font-black text-[#05263f] mt-0.5">ویزیت اختصاصی</div>
              <div className="text-xs text-purple-600 font-bold mt-2 flex items-center gap-1">
                <span>برنامه‌ریزی فشرده تک‌جلسه‌ای</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Branches & Clinics Information (مراکز درمانی با آدرس و تلفن) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-center sm:text-right">
            <div>
              <span className="text-xs font-black text-[#b5861b] uppercase tracking-wider">مراکز درمانی ۴ گانه</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#05263f] mt-0.5">
                آدرس دقیق شعب، ساعات حضور و شماره تلفن‌ها
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              برای مشاهده اطلاعات هر مرکز، شعبه مورد نظر خود را لمس کنید:
            </p>
          </div>

          {/* Branch Tabs (Mobile-Friendly Pill Carousel) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [scrollbar-width:none]">
            {branches.map(branch => {
              const isActive = branch.id === selectedBranchId;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setSelectedBranchId(branch.id as any)}
                  className={`px-4 sm:px-6 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#05263f] text-white border-[#05263f] shadow-md scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${isActive ? 'text-[#8be022]' : 'text-slate-400'}`} />
                  <span>{branch.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Branch Detailed Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Branch Details */}
              <div className="lg:col-span-7 space-y-4 text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-black">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>{currentBranch.area}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#05263f]">
                  {currentBranch.name}
                </h3>

                {/* Address block */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400">آدرس دقیق:</span>
                    <span className="text-xs sm:text-sm font-bold text-[#05263f] leading-relaxed">
                      {currentBranch.address}
                    </span>
                  </div>
                </div>

                {/* Hours & Phone block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] font-bold text-slate-400">ساعات حضور دکتر:</span>
                      <span className="text-xs font-black text-[#05263f]">
                        {currentBranch.hours}
                      </span>
                    </div>
                  </div>

                  <a
                    href={currentBranch.telLink}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/70 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 fill-current" />
                    <div>
                      <span className="block text-[11px] font-bold text-slate-500">تلفن مستقیم رزرو:</span>
                      <span className="text-xs font-black text-emerald-800 dir-ltr">
                        {currentBranch.phone}
                      </span>
                    </div>
                  </a>
                </div>

                {/* Branch Features */}
                <div className="pt-1">
                  <span className="block text-xs font-bold text-slate-400 mb-2">امکانات و ویژگی‌های این مرکز:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentBranch.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Navigation Buttons */}
                <div className="pt-3 flex flex-wrap gap-2.5">
                  <a
                    href={currentBranch.telLink}
                    className="flex-1 min-w-[140px] bg-[#05263f] hover:bg-[#031b2e] text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#8be022]" />
                    <span>تماس فوری با این شعبه</span>
                  </a>

                  <a
                    href={currentBranch.neshanQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] bg-slate-100 hover:bg-slate-200 text-[#05263f] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>مسیریابی با نشان / بلد</span>
                  </a>

                  <a
                    href={currentBranch.mapQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center transition-all"
                    title="گوگل مپ"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Branch Image Showcase */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video sm:aspect-4/3 bg-slate-100">
                  <img
                    src={currentBranch.image}
                    alt={currentBranch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 right-3 text-white text-right">
                    <span className="text-xs font-medium text-slate-200">نمای داخلی کلینیک</span>
                    <h4 className="text-sm font-black">{currentBranch.shortName}</h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 3: About Dr. Saeid Ghorashi & Clinic Standards (پیشینه و استانداردهای کلینیک) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-3xl text-right space-y-3">
            <span className="text-xs font-black text-[#b5861b] uppercase tracking-wider">درباره پیشینه و استانداردهای ما</span>
            <h2 className="text-xl sm:text-3xl font-black text-[#05263f]">
              تعهد به ظرافت، دقت علمی و آرامش بیماران
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              مرکز تخصصی ارتودنسی دکتر سعید قریشی بر پایه ۳ اصل بنا شده است: ارائه باکیفیت‌ترین درمان‌های علمی منطبق بر دستورالعمل‌های انجمن ارتودنتیست‌های آمریکا (AAO)، استفاده حداکثری از ابزارهای نامرئی و راحتی حداکثری مراجعین بدون نیاز به جراحی‌های غیرضروری یا کشیدن دندان.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-right space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#b5861b] flex items-center justify-center font-black">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-[#05263f]">رتبه برتر بورد تخصصی</h3>
              <p className="text-xs text-slate-500 leading-normal">
                دانش‌آموخته برتر دوره‌های دندانپزشکی و فلوشیپ‌های تکمیلی ارتوسرجری و پلاک‌های شفاف در داخل و خارج از کشور.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-right space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-[#05263f]">عضویت در فدراسیون جهانی (WFO)</h3>
              <p className="text-xs text-slate-500 leading-normal">
                عضو رسمی فدراسیون جهانی ارتودنتیست‌ها و انجمن ارتودنتیست‌های آمریکا (AAO) با تبادل مداوم متدهای درمانی روز دنیا.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-right space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-black">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-[#05263f]">حفظ ۱۰۰٪ دندان‌های طبیعی</h3>
              <p className="text-xs text-slate-500 leading-normal">
                اولویت بنیادین در درمان‌های دکتر قریشی، بهره‌گیری از براکت‌های دیمون و پلاک‌های متحرک بدون نیاز به کشیدن دندان‌های سالم است.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Contact & Inquiry Form (فرم ارتباط مستقیم و پیام با کلینیک) */}
        <section className="bg-gradient-to-br from-[#05263f] to-[#0a3556] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Form Introduction */}
            <div className="lg:col-span-5 text-right space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#8be022] text-xs font-bold">
                <Send className="w-3.5 h-3.5" />
                <span>فرم ارتباط مستقیم و استعلام نوبت</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black leading-snug">
                پیام خود را مستقیم به منشی و تیم دکتر قریشی ارسال کنید
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                سوال درباره هزینه درمان، زمان‌بندی ویزیت یا نوع ارتودنسی مناسب خود دارید؟ فرم زیر را تکمیل نمایید تا کارشناسان بالینی در اسرع وقت با شما تماس بگیرند.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8be022] shrink-0" />
                  <span>بررسی پیام‌ها در کمتر از ۲ ساعت کاری</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8be022] shrink-0" />
                  <span>پاسخگویی اختصاصی و ارسال پیامک تایید</span>
                </div>
              </div>
            </div>

            {/* Actual Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-5 sm:p-7 text-slate-800 shadow-lg">
                {submitSuccess ? (
                  <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-[#05263f]">پیام شما با موفقیت ثبت شد</h3>
                      <p className="text-xs text-slate-500">
                        کارشناسان کلینیک دکتر قریشی در اسرع وقت با شماره همراه شما تماس خواهند گرفت.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 inline-block text-xs font-bold text-slate-700">
                      کد پیگیری درخواست: <span className="font-mono text-blue-700">{trackingCode}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                      >
                        ارسال پیام دیگر
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 text-right">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="مثال: علی رضایی"
                          className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#05263f] focus:bg-white transition-all text-right"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#05263f] focus:bg-white transition-all text-left font-mono"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">انتخاب شعبه ترجیحی</label>
                        <select
                          value={formData.branch}
                          onChange={e => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#05263f] focus:bg-white transition-all text-right"
                        >
                          <option value="saadat">شعبه سعادت‌آباد (مرکزی)</option>
                          <option value="farmanieh">شعبه فرمانیه (اندرزگو)</option>
                          <option value="motahari">شعبه مطهری (مرکز تهران)</option>
                          <option value="qom">شعبه قم (بلوار امین)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">موضوع یا نوع درمان</label>
                        <select
                          value={formData.serviceType}
                          onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                          className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#05263f] focus:bg-white transition-all text-right"
                        >
                          <option value="ortho_invisible">ارتودنسی نامرئی (پلاک‌های شفاف اینویزلاین)</option>
                          <option value="ortho_damon">ارتودنسی دیمون و سرامیکی همرنگ دندان</option>
                          <option value="ortho_fixed">ارتودنسی ثابت معمولی و متالیک</option>
                          <option value="orthognathic">جراحی فک و درمان ناهنجاری اسکلتی (ارتوسرجری)</option>
                          <option value="general_inquiry">استعلام هزینه و شرایط پرداخت اقساطی</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">پیام، سوال یا توضیحات شما</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="سوال یا شرایط دندان‌های خود را اینجا بنویسید..."
                        className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#05263f] focus:bg-white transition-all text-right resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#8be022] hover:bg-[#7ecc1b] text-[#05263f] font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>در حال ارسال پیام...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>ارسال مستقیم پیام به کلینیک</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Frequent Questions about Contact & Appointments */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-right space-y-4">
          <div className="flex items-center gap-2 text-[#05263f]">
            <HelpCircle className="w-5 h-5 text-[#b5861b]" />
            <h2 className="text-lg sm:text-xl font-black">پرسش‌های متداول مراجعین درباره ارتباط با ما</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-[#05263f]">آیا مشاوره و معاینه اولیه رایگان است؟</div>
              <p className="text-slate-500">
                بله، مشاوره حضوری اولیه و ارائه طرح درمان مقدماتی همراه با برآورد دقیق هزینه‌ها در مطب‌های دکتر قریشی رایگان انجام می‌شود.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-[#05263f]">نوبت‌دهی اضطراری شکستگی براکت یا سیم چگونه است؟</div>
              <p className="text-slate-500">
                در صورت بروز هرگونه مشکل اضطراری یا پارگی سیم، از طریق تماس تلفنی با نزدیک‌ترین شعبه یا واتس‌اپ کلینیک، نوبت همان روز برای شما هماهنگ خواهد شد.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-[#05263f]">آیا بیماران شهرستان می‌توانند با یک جلسه درمان را شروع کنند؟</div>
              <p className="text-slate-500">
                بله، با ارسال عکس‌های دندان‌پزشکی در واتس‌اپ و هماهنگی قبلی، قالب‌گیری دیجیتال و نصب پلاک در یک سفر نیم‌روزه برنامه‌ریزی می‌شود.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="font-bold text-[#05263f]">شرایط پرداخت اقساطی هزینه ارتودنسی چگونه است؟</div>
              <p className="text-slate-500">
                هزینه درمان در اقساط ماهانه در طول دوره درمان (معمولاً ۱۲ تا ۲۴ ماه) بدون کارمزد دریافت می‌شود.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Return Strip */}
      <footer className="bg-slate-900 text-white py-8 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="text-sm font-bold text-slate-300">
            وبسایت رسمی دکتر سعید قریشی - متخصص برجسته ارتودنسی و ارتوپدی فک و صورت
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <button type="button" onClick={handleBack} className="hover:text-white transition-colors cursor-pointer">
              صفحه اصلی
            </button>
            <span>•</span>
            <a href="tel:02122886900" className="hover:text-white transition-colors">
              تلفن تماس: ۰۲۱-۲۲۸۸۶۹۰۰
            </a>
            <span>•</span>
            <span>کلیه حقوق محفوظ است © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
