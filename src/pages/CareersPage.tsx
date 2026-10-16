import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Users, 
  Award, 
  Coffee, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  FileText, 
  Search, 
  PhoneCall, 
  Megaphone, 
  Headphones, 
  BarChart, 
  ExternalLink,
  ChevronLeft,
  X
} from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string; // تمام وقت، پاره وقت، هیبرید
  location: string;
  experience: string;
  icon: React.ReactNode;
  iconBg: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const CareersPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState<JobPosition | null>(null);

  // Resume submission form state
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    jobId: '',
    experienceYears: '1-3',
    linkedinOrBio: '',
    coverNote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const jobOpenings: JobPosition[] = [
    {
      id: 'seo-specialist',
      title: 'کارشناس سئو (SEO Specialist)',
      department: 'مارکتینگ و فناوری',
      type: 'تمام‌وقت (حضوری / هیبرید)',
      location: 'تهران، سعادت‌آباد',
      experience: 'حداقل ۲ سال سابقه مرتبط',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50 text-blue-600',
      summary: 'تحلیل، تدوین و اجرای استراتژی‌های سئو داخلی و خارجی برای پلتفرم جامع همرا، وب‌سایت‌های پزشکان و مجله سلامت.',
      responsibilities: [
        'تحقیق کلمات کلیدی تخصصی در حوزه‌های سلامت و تخصص‌های بالینی',
        'بهینه‌سازی سئو آن‌پیج (On-Page) و ساختار فنی سایت (Technical SEO)',
        'اجرای کمپین‌های لینک‌سازی هدفمند و باکیفیت پزشکی',
        'مانیتورینگ مداوم عملکرد با Google Search Console و Google Analytics 4',
        'همکاری مستمر با تیم تولید محتوا جهت بهبود رتبه مقالات تخصصی'
      ],
      requirements: [
        'تسلط عمیق بر مفاهیم سئو تکنیکال و الگوریتم‌های گوگل (E-E-A-T)',
        'تجربه کار با ابزارهای Ahrefs ،SEMrush ،Screaming Frog',
        'آشنایی مناسب با HTML ،CSS و مفاهیم Core Web Vitals',
        'سابقه فعالیت موفق در وب‌سایت‌های پربازدید یا پزشکی امتیاز محسوب می‌شود'
      ],
      benefits: [
        'حقوق رقابتی متناسب با شایستگی',
        'پاداش عملکرد بر اساس KPIهای ارتقای رتبه و ترافیک',
        'بیمه تامین اجتماعی و بیمه درمان تکمیلی VIP از روز اول',
        'دسترسی به دوره‌های آموزشی و منابع بین‌المللی سئو'
      ]
    },
    {
      id: 'call-center',
      title: 'کارشناس کال سنتر و پذیرش تلفنی',
      department: 'امور مراجعین و تریاژ',
      type: 'تمام‌وقت (شیفت‌های منظم)',
      location: 'تهران، سعادت‌آباد',
      experience: '۱ سال سابقه در مرکز تماس یا درمانگاه',
      icon: <PhoneCall className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-emerald-50 text-emerald-600',
      summary: 'پاسخگویی به تماس‌های مراجعین، راهنمایی فرآیند نوبت‌دهی آنلاین، استعلام بیمه‌ها و هماهنگی با منشی درمانگاه‌ها.',
      responsibilities: [
        'پاسخگویی سریع، باحوصله و استاندارد به تماس‌های ورودی بیماران',
        'ثبت دقیق نوبت‌ها و استعلام ساعات حضور پزشکان در پنل نرم‌افزاری همرا',
        'پیگیری لغو یا جابجایی نوبت‌ها و اطلاع‌رسانی پیامکی به مراجعین',
        'ثبت بازخوردها و تیکت‌های پشتیبانی در سیستم CRM'
      ],
      requirements: [
        'روابط عمومی عالی، فن بیان شیوا و گوش دادن فعال',
        'توانایی مدیریت استرس و پاسخگویی به مراجعین نگران',
        'آشنایی مناسب با تایپ کامپیوتر و سامانه‌های اداری',
        'روحیه کار تیمی، مسئولیت‌پذیری و صبوری بالا'
      ],
      benefits: [
        'حقوق ثابت منظم + پاداش کیفیت پاسخگویی و رضایت تماس‌گیرندگان',
        'بیمه تامین اجتماعی و بیمه تکمیلی',
        'محیط کاری شاداب و مجهز به تجهیزات ارگونومیک کال سنتر',
        'آموزش‌های تخصصی ارتباط با بیمار و تریاژ اولیه'
      ]
    },
    {
      id: 'sales-rep',
      title: 'نماینده فروش و توسعه بازار (B2B)',
      department: 'فروش و جذب مراکز',
      type: 'تمام‌وقت',
      location: 'تهران (با امکان ماموریت استانی)',
      experience: '۲ تا ۳ سال سابقه فروش B2B',
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-50 text-purple-600',
      summary: 'مذاکره و جذب پزشکان، درمانگاه‌ها، آزمایشگاه‌ها و مراکز تصویربرداری جهت اتصال به سیستم اتوماسیون همرا.',
      responsibilities: [
        'شناسایی و برقراری ارتباط هدفمند با پزشکان متخصص و مدیران کلینیک‌ها',
        'برگزاری جلسات حضوری و دموی آنلاین قابلیت‌های اتوماسیون همرا',
        'پیگیری قراردادهای همکاری تا مرحله استقرار نرم‌افزار',
        'حضور در کنگره‌ها، سمینارهای علوم پزشکی و نمایشگاه‌های سلامت'
      ],
      requirements: [
        'مهارت‌های مذاکره پیشرفته، متقاعدسازی و بستن قرارداد',
        'سابقه فعالیت در حوزه سلامت، تجهیزات پزشکی یا نرم‌افزارهای سازمانی',
        'آراستگی ظاهری و لحن حرفه‌ای در مذاکره با جامعه پزشکی',
        'توانایی خودمدیریتی و پیگیری مستمر لیدهای فروش'
      ],
      benefits: [
        'حقوق ثابت پایه عالی + پورسانت فروش فوق‌العاده بدون سقف',
        'بیمه تکمیلی و پوشش کامل ماموریت‌ها',
        'ارائه تجهیزات کاری (لپ‌تاپ سازمانی، سیم‌کارت شرکتی)',
        'امکان ارتقای سریع به سرپرست فروش مناطق'
      ]
    },
    {
      id: 'customer-support',
      title: 'کارشناس پشتیبانی و رضایت مشتریان',
      department: 'پشتیبانی فنی و ارتباط با مشتری',
      type: 'تمام‌وقت (پشتیبانی چرخشی)',
      location: 'تهران، سعادت‌آباد',
      experience: 'حداقل ۱ سال سابقه پشتیبانی نرم‌افزار',
      icon: <Headphones className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-50 text-amber-600',
      summary: 'حل مسائل کاربران (بیماران و پزشکان)، راهنمایی استفاده از پنل و پیگیری رفع ایرادات با تیم فنی.',
      responsibilities: [
        'پاسخگویی به چت آنلاین، تیکت‌ها و تماس‌های فنی پزشکان و بیماران',
        'راهنمایی پزشکان در نحوه ثبت پرونده، گزارش‌های مالی و سیستم نسخه‌نویسی',
        'ثبت باگ‌ها و ارجاع دقیق به تیم توسعه محصول در ابزارهای ردیابی',
        'سنجش میزان رضایت کاربران (CSAT) و ارائه گزارش‌های بهینه‌سازی'
      ],
      requirements: [
        'آشنایی مناسب با مفاهیم وب، نرم‌افزارهای ابری و مرورگرها',
        'حل مسئله سریع و آرامش در مواجهه با چالش‌های فنی کاربران',
        'مهارت نگارش متون پشتیبانی محترمانه و دقیق',
        'انعطاف‌پذیری در شیفت‌های عصرگاهی یا تعطیلات'
      ],
      benefits: [
        'حقوق شفاف به همراه مزایای شیفت و تعطیل‌کاری',
        'بیمه کامل از بدو استخدام',
        'فضای رشد شغلی به سمت مدیر محصول یا تحلیل‌گر کسب‌وکار',
        'محیط دوستانه و تیم پشتیبانی منسجم'
      ]
    },
    {
      id: 'digital-marketing',
      title: 'کارشناس دیجیتال مارکتینگ',
      department: 'مارکتینگ و برندینگ',
      type: 'تمام‌وقت',
      location: 'تهران، سعادت‌آباد',
      experience: 'حداقل ۲ سال سابقه در دیجیتال مارکتینگ',
      icon: <Megaphone className="w-6 h-6 text-rose-600" />,
      iconBg: 'bg-rose-50 text-rose-600',
      summary: 'طراحی، اجرا و تحلیل کمپین‌های تبلیغاتی آنلاین، بهینه‌سازی کانال‌های جذب کاربر و مدیریت شبکه‌های اجتماعی همرا.',
      responsibilities: [
        'مدیریت کمپین‌های Google Ads، تبلیغات همسان (Native) و ریتارگتینگ',
        'بهینه‌سازی نرخ تبدیل صفحات فرود (CRO و A/B Testing)',
        'تدوین تقویم محتوایی و نظارت بر کمپین‌های شبکه‌های اجتماعی',
        'تحلیل دقیق داده‌های جذب و هزینه به ازای جذب (CPA / CAC)'
      ],
      requirements: [
        'تسلط بر Google Ads ،Google Analytics 4 و پنل‌های تبلیغاتی داخلی',
        'درک قوی از رفتار کاربران آنلاین و قیف بازاریابی سلامت',
        'توانایی کار با ابزارهای رصد و گزارش‌سازی داده‌ها (Looker Studio)',
        'خلاقیت، تحلیل‌گری و روحیه آزمون و خطای مداوم'
      ],
      benefits: [
        'حقوق عالی و متناسب با رشد KPIهای کمپین‌ها',
        'بودجه تبلیغاتی مکفی برای اجرای ایده‌های نوآورانه',
        'بیمه تامین اجتماعی و بیمه تکمیلی',
        'امکان دورکاری پاره‌وقت در صورت توافق'
      ]
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(j => j.department.includes(selectedDepartment));

  const handleOpenApplyModal = (job: JobPosition) => {
    setJobToApply(job);
    setFormState(prev => ({ ...prev, jobId: job.id }));
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName.trim() || !formState.phone.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTrackingId('JOB-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitSuccess(true);
      setFormState({
        fullName: '',
        phone: '',
        email: '',
        jobId: '',
        experienceYears: '1-3',
        linkedinOrBio: '',
        coverNote: ''
      });
    }, 700);
  };

  return (
    <div className="space-y-12 sm:space-y-16 text-right pb-20 font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-bold backdrop-blur-md">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>فرصت‌های شغلی و استخدام در شرکت دانش‌بنیان همرا</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.3] tracking-tight">
            در کنار هم، آینده <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              سلامت الکترونیک و اتوماسیون ایران را بسازیم
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            ما در شرکت دانش‌بنیان همرا، تیمی پرشور از متخصصان فناوری، سلامت و ارتباطات هستیم که برای ساده‌سازی دسترسی مردم به پزشکان و تحول دیجیتال درمانگاه‌ها تلاش می‌کنیم. اگر علاقه‌مند به کار در محیطی پویا، یادگیرنده و ارزش‌آفرین هستید، جای شما در خانواده همرا خالی است.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#positions"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>مشاهده موقعیت‌های شغلی فعال ({jobOpenings.length} موقعیت)</span>
            </a>

            <Link
              to="/about"
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition-all flex items-center gap-2"
            >
              <span>درباره شرکت همرا و فرهنگ سازمانی</span>
              <ChevronLeft className="w-4 h-4 text-blue-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Perks & Culture (چرا همرا؟) */}
      <section className="space-y-6">
        <div className="text-center sm:text-right space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase">مزایای همکاری و فرهنگ سازمانی</span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900">
            چرا پیوستن به شرکت دانش‌بنیان همرا؟
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900">رشد شغلی و یادگیری مداوم</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              فعالیت در لبه فناوری‌های سلامت ابری، دوره‌های آموزشی مستمر و امکان ارتقای جایگاه متناسب با عملکرد.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900">بیمه تکمیلی و امنیت شغلی</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              بیمه تامین اجتماعی، پوشش کامل بیمه درمان تکمیلی از نخستین روز کاری و پرداخت منظم و شفاف حقوق.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900">محیط دوستانه و منعطف</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              فرهنگ باز و صمیمی، فضای استراحت و پذیرایی، بدون سلسله‌مراتب دست‌وپاگیر سنتی با ساعت کاری متوازن.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900">اثرگذاری واقعی بر سلامت جامعه</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              نتیجه کار شما مستقیماً لبخند و رضایت صدها هزار بیمار و مراجع در سراسر کشور را در پی خواهد داشت.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Job Openings Section (موقعیت‌های شغلی فعال) */}
      <section id="positions" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">فرصت‌های استخدامی</span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">
              موقعیت‌های شغلی مورد نیاز
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              جهت مشاهده شرح وظایف یا ارسال رزومه، موقعیت شغلی مد نظر را انتخاب کنید:
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartment === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              همه موقعیت‌ها ({jobOpenings.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedDepartment('مارکتینگ')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartment === 'مارکتینگ'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مارکتینگ و سئو
            </button>
            <button
              type="button"
              onClick={() => setSelectedDepartment('فروش')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartment === 'فروش'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فروش و توسعه بازار
            </button>
            <button
              type="button"
              onClick={() => setSelectedDepartment('پشتیبانی')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartment === 'پشتیبانی'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              کال سنتر و پشتیبانی
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${job.iconBg} flex items-center justify-center shrink-0`}>
                    {job.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {job.department}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {job.summary}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  مشاهده جزئیات
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenApplyModal(job)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs text-center flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ارسال رزومه</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95" 
            onClick={e => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${selectedJob.iconBg} flex items-center justify-center`}>
                  {selectedJob.icon}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">{selectedJob.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{selectedJob.department}</span>
                    <span>•</span>
                    <span>{selectedJob.location}</span>
                    <span>•</span>
                    <span>{selectedJob.type}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900">شرح و خلاصه موقعیت شغلی:</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedJob.summary}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900">شرح وظایف و مسئولیت‌ها:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900">شرایط احراز و مهارت‌های مورد نیاز:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900">مزایا و تسهیلات همرا:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedJob.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                بستن
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetJob = selectedJob;
                  setSelectedJob(null);
                  handleOpenApplyModal(targetJob);
                }}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال رزومه برای این موقعیت</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Resume Submission Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setApplyModalOpen(false)}>
          <div 
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 text-right" 
            onClick={e => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">فرم ارسال رزومه و همکاری</h3>
                <span className="text-xs text-blue-600 font-bold">{jobToApply?.title || 'همکاری با همرا'}</span>
              </div>
              <button
                type="button"
                onClick={() => setApplyModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-base text-slate-900">رزومه شما با موفقیت ثبت شد</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    تیم منابع انسانی شرکت همرا رزومه شما را بررسی کرده و در صورت انطباق، با شما تماس خواهد گرفت.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
                  کد رهگیری درخواست استخدام: <span className="font-mono text-blue-700">{trackingId}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setApplyModalOpen(false);
                  }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  متوجه شدم
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={e => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="مثال: سارا محمدی"
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-left font-mono"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">پست الکترونیک (ایمیل)</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-left font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">موقعیت شغلی درخواستی</label>
                    <select
                      value={formState.jobId}
                      onChange={e => setFormState({ ...formState, jobId: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                    >
                      {jobOpenings.map(j => (
                        <option key={j.id} value={j.id}>{j.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">میزان سابقه کار مرتبط</label>
                    <select
                      value={formState.experienceYears}
                      onChange={e => setFormState({ ...formState, experienceYears: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                    >
                      <option value="less-than-1">کمتر از ۱ سال (کارآموز)</option>
                      <option value="1-3">۱ تا ۳ سال (متوسط)</option>
                      <option value="3-5">۳ تا ۵ سال (حرفه‌ای)</option>
                      <option value="more-than-5">بیش از ۵ سال (ارشد)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">لینک رزومه آنلاین، گیت‌هاب یا لینکدین</label>
                  <input
                    type="url"
                    value={formState.linkedinOrBio}
                    onChange={e => setFormState({ ...formState, linkedinOrBio: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-left font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">خلاصه سوابق و پیام شما</label>
                  <textarea
                    rows={3}
                    value={formState.coverNote}
                    onChange={e => setFormState({ ...formState, coverNote: e.target.value })}
                    placeholder="درباره پروژه‌های قبلی، مهارت‌ها و دلایل علاقه‌مندی به همکاری با همرا بنویسید..."
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>در حال ارسال اطلاعات...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ثبت درخواست و ارسال به منابع انسانی</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
