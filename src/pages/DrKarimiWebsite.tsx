import React, { useState, useEffect, useId } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  Play,
  X,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Award,
  ShieldCheck,
  Smile,
  ArrowLeft,
  Navigation,
  Send,
  UserCheck,
  Check,
  ChevronRight,
  Info,
  CalendarCheck,
  Menu,
  Heart
} from 'lucide-react';
import drKarimiPortrait from '../assets/images/dr_alireza_karimi_1790165091893.jpg';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  duration: string;
  idealFor: string;
  benefits: string[];
}

interface CaseItem {
  id: string;
  title: string;
  category: 'jaw' | 'fixed' | 'clear' | 'adult';
  duration: string;
  age: string;
  diagnosis: string;
  solution: string;
  beforeImg: string;
  afterImg: string;
}

interface ClinicBranch {
  id: string;
  name: string;
  branchName: string;
  city: string;
  address: string;
  phone: string;
  telNumber: string;
  workingDays: string;
  workingHours: string;
  image: string;
  lat: number;
  lng: number;
}

interface Testimonial {
  id: string;
  name: string;
  service: string;
  branch: string;
  rating: number;
  comment: string;
  date: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const DrKarimiWebsite: React.FC = () => {
  // Navigation & Scroll Spy
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [selectedClinicMap, setSelectedClinicMap] = useState<ClinicBranch | null>(null);
  const [isSuccessBookingOpen, setIsSuccessBookingOpen] = useState<boolean>(false);
  const [lastBookingCode, setLastBookingCode] = useState<string>('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Filter state for Results
  const [caseFilter, setCaseFilter] = useState<'all' | 'jaw' | 'fixed' | 'clear' | 'adult'>('all');
  const [caseSlideIndex, setCaseSlideIndex] = useState<number>(0);

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Booking Form State
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingService, setBookingService] = useState<string>('ارتودنسی ثابت');
  const [bookingBranch, setBookingBranch] = useState<string>('تهران - سعادت‌آباد (مرکزی)');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSubmitting, setBookingSubmitting] = useState<boolean>(false);

  // Consultation Modal Form State
  const [consultName, setConsultName] = useState<string>('');
  const [consultPhone, setConsultPhone] = useState<string>('');
  const [consultType, setConsultType] = useState<string>('مشاوره تخصصی ارتودنسی');
  const [consultDesc, setConsultDesc] = useState<string>('');
  const [consultSubmitting, setConsultSubmitting] = useState<boolean>(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  // New review form state
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewTreatment, setReviewTreatment] = useState<string>('ارتودنسی ثابت');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  // Services data (7 core orthodontic services)
  const services: ServiceItem[] = [
    {
      id: 'srv-1',
      title: 'اصلاح ناهنجاری‌های فکی',
      shortDesc: 'تشخیص و درمان تخصصی',
      fullDesc: 'درمان پیشرفته ناهنجاری‌های اسکلتی فک بالا و پایین (کلاس ۲، کلاس ۳ و اپن‌بایت) با هماهنگی کامل بین ارتودنسی و جراحی فک و صورت (ارتوسرجری).',
      icon: '⌁',
      duration: '۱۴ الی ۲۴ ماه',
      idealFor: 'افراد با عدم تقارن فک، جلوزدگی یا عقب‌ماندگی فکین و مشکلات تنفسی و جویدن',
      benefits: ['اصلاح کامل نمای نیم‌رخ صورت', 'بهبود تنفس و تکلم', 'پایداری طولانی‌مدت درمان']
    },
    {
      id: 'srv-2',
      title: 'ارتودنسی نامرئی',
      shortDesc: 'لبخند زیبا بدون سیم',
      fullDesc: 'استفاده از الاینرها و پلاک‌های شفاف دیجیتال (Invisalign) که کاملاً بدون دیده شدن روی دندان‌ها قرار گرفته و در هنگام غذا خوردن قابل خارج کردن هستند.',
      icon: '♧',
      duration: '۹ الی ۱۶ ماه',
      idealFor: 'بزرگسالان، مدیران، اساتید و افرادی که تمایلی به دیده شدن براکت‌های فلزی ندارند',
      benefits: ['کاملاً نامرئی و شفاف', 'راحتی بالا در بهداشت دهان و مسواک زدن', 'بدون محدودیت غذایی']
    },
    {
      id: 'srv-3',
      title: 'ارتودنسی متحرک',
      shortDesc: 'برای شرایط منتخب',
      fullDesc: 'پلاک‌های متحرک تخصصی ارتوپدی فک برای کودکان و نوجوانان در سنین رشد جهت هدایت استخوان فک و جلوگیری از جراحی‌های سخت در بزرگسالی.',
      icon: '♢',
      duration: '۶ الی ۱۲ ماه',
      idealFor: 'کودکان ۷ تا ۱۲ سال جهت هدایت رشد فک و رفع تنگی کام',
      benefits: ['قابلیت خارج کردن حین غذا و مسواک', 'پیشگیری از ناهنجاری‌های شدید در آینده', 'طراحی اختصاصی با رنگ‌های جذاب برای کودکان']
    },
    {
      id: 'srv-4',
      title: 'ارتودنسی لینگوال',
      shortDesc: 'کاملاً پشت دندان',
      fullDesc: 'نصب براکت‌های ارتودنسی در سطح پشتی (زبانی) دندان‌ها به صورتی که از نمای روبه‌رو کاملاً مخفی و نامرئی هستند.',
      icon: '✧',
      duration: '۱۲ الی ۱۸ ماه',
      idealFor: 'افرادی که نهایت ظرافت و پنهان‌بودن صددرصدی دستگاه ارتودنسی را می‌خواهند',
      benefits: ['پنهان بودن کامل براکت‌ها از زاویه روبه‌رو', 'دقت فوق‌العاده بالا با دستگاه‌های سفارشی', 'طراحی اختصاصی براکت بر اساس قوس دندانی شما']
    },
    {
      id: 'srv-5',
      title: 'ارتودنسی ثابت',
      shortDesc: 'دقیق و قابل پیش‌بینی',
      fullDesc: 'استاندارد طلایی ارتودنسی با استفاده از براکت‌های مدرن سرامیکی شفاف و براکت‌های مینیاتوری کم‌اصطکاک دیمون برای حرکات میلی‌متری و دقیق دندان‌ها.',
      icon: '◈',
      duration: '۱۲ الی ۱۸ ماه',
      idealFor: 'انواع نامنظمی‌های دندانی، شلوغی شدید و بستن فواصل دندانی',
      benefits: ['کنترل دقیق سه‌بعدی ریشه دندان', 'قابلیت انتخاب براکت سرامیکی همرنگ دندان', 'کوتاه‌ترین زمان برای موارد پیچیده']
    },
    {
      id: 'srv-6',
      title: 'ارتودنسی کودکان',
      shortDesc: 'مراقبت در سن مناسب',
      fullDesc: 'ارتودنسی پیشگیرانه (Phase I) از سن ۷ سالگی برای پایش روند رویش دندان‌های دائمی، ترک عادات مخرب (مثل مکیدن انگشت) و فضایاب‌ها.',
      icon: '♢',
      duration: '۸ الی ۱۴ ماه',
      idealFor: 'کودکان در سنین رویش دندان‌های دائمی (۷ تا ۱۰ سال)',
      benefits: ['جلوگیری از کشیدن دندان در آینده', 'اصلاح الگوی بلع و تنفس', 'افزایش اعتمادبه‌نفس کودک در مدرسه']
    },
    {
      id: 'srv-7',
      title: 'ارتودنسی بزرگسالان',
      shortDesc: 'طراحی لبخند حرفه‌ای',
      fullDesc: 'درمان‌های ارتودنسی بدون محدودیت سنی با در نظر گرفتن سلامت لثه و بافت پریودنتال برای آماده‌سازی ایمپلنت، لمینت یا زیبایی لبخند.',
      icon: '♙',
      duration: '۱۰ الی ۱۸ ماه',
      idealFor: 'افراد بالای ۲۰ تا ۶۰ سال که خواهان لبخندی جوان، سالم و متقارن هستند',
      benefits: ['هماهنگی با درمان‌های پروتز و ایمپلنت', 'بدون آسیب به ریشه با نیروهای ملایم بیولوژیک', 'جوان‌سازی فرم لب‌ها و یک‌سوم پایین صورت']
    }
  ];

  // Cases data
  const cases: CaseItem[] = [
    {
      id: 'case-1',
      title: 'اصلاح ناهنجاری فکی کلاس ۳',
      category: 'jaw',
      duration: 'در ۱۴ ماه',
      age: '۲۲ سال',
      diagnosis: 'جلو بودن فک پایین و آندربایت قدامی شدید با مشکل در جویدن غذا',
      solution: 'درمان ترکیبی ارتودنسی تخصصی بدون کشیدن دندان و اصلاح شیب دندان‌های قدامی',
      beforeImg: 'https://images.pexels.com/photos/6529107/pexels-photo-6529107.jpeg?cs=srgb&dl=pexels-cottonbro-6529107.jpg&fm=jpg',
      afterImg: 'https://images.pexels.com/photos/6529056/pexels-photo-6529056.jpeg?cs=srgb&dl=pexels-cottonbro-6529056.jpg&fm=jpg'
    },
    {
      id: 'case-2',
      title: 'ارتودنسی ثابت براکت سرامیکی',
      category: 'fixed',
      duration: 'در ۱۳ ماه',
      age: '۱۹ سال',
      diagnosis: 'کراودینگ (نامنظمی و چرخش دندان‌های نیش و پیشین فک بالا)',
      solution: 'ارتودنسی ثابت با براکت‌های سرامیکی همرنگ دندان و الاستیک‌های بین‌فکی',
      beforeImg: 'https://images.pexels.com/photos/6529056/pexels-photo-6529056.jpeg?cs=srgb&dl=pexels-cottonbro-6529056.jpg&fm=jpg',
      afterImg: 'https://images.pexels.com/photos/6528855/pexels-photo-6528855.jpeg?cs=srgb&dl=pexels-cottonbro-6528855.jpg&fm=jpg'
    },
    {
      id: 'case-3',
      title: 'ارتودنسی بزرگسال و بستن فاصله (دیاستم)',
      category: 'adult',
      duration: 'در ۱۳ ماه',
      age: '۳۱ سال',
      diagnosis: 'فاصله چند میلی‌متری بین دندان‌های پیشین و شیب نامتعادل قوس دندانی',
      solution: 'ارتودنسی نامرئی با پلاک‌های شفاف دیجیتال بدون تراش دندان',
      beforeImg: 'https://images.pexels.com/photos/6528855/pexels-photo-6528855.jpeg?cs=srgb&dl=pexels-cottonbro-6528855.jpg&fm=jpg',
      afterImg: 'https://images.pexels.com/photos/6529107/pexels-photo-6529107.jpeg?cs=srgb&dl=pexels-cottonbro-6529107.jpg&fm=jpg'
    },
    {
      id: 'case-4',
      title: 'ارتودنسی فک بالا و رفع بایت عمیق',
      category: 'jaw',
      duration: 'در ۱۶ ماه',
      age: '۲۶ سال',
      diagnosis: 'دیپ‌بایت شدید به گونه‌ای که دندان‌های پایین حین بسته شدن مخفی می‌شدند',
      solution: 'اینتروژن دندان‌های قدامی و اکسپنشن قوس بالا با نتایج لبخند هالیوودی',
      beforeImg: 'https://images.pexels.com/photos/6529107/pexels-photo-6529107.jpeg?cs=srgb&dl=pexels-cottonbro-6529107.jpg&fm=jpg',
      afterImg: 'https://images.pexels.com/photos/7422520/pexels-photo-7422520.jpeg?cs=srgb&dl=pexels-emerickalil-7422520.jpg&fm=jpg'
    }
  ];

  const filteredCases = cases.filter(c => caseFilter === 'all' || c.category === caseFilter);

  // Clinics data (5 centers in Tehran and Qom)
  const clinics: ClinicBranch[] = [
    {
      id: 'clinic-1',
      name: 'مرکز تهران (شعبه ۱ - مرکزی)',
      branchName: 'شعبه سعادت‌آباد',
      city: 'تهران',
      address: 'تهران، سعادت‌آباد، میدان فرهنگ، بلوار ۲۴ متری پاک، پلاک ۱۲، طبقه ۳',
      phone: '۰۲۱-۲۲۸۸۶۹۹۰',
      telNumber: '+982122886990',
      workingDays: 'شنبه، دوشنبه، چهارشنبه',
      workingHours: '۱۵:۰۰ الی ۲۰:۳۰',
      image: 'https://images.pexels.com/photos/7422520/pexels-photo-7422520.jpeg?cs=srgb&dl=pexels-emerickalil-7422520.jpg&fm=jpg',
      lat: 35.7876,
      lng: 51.3789
    },
    {
      id: 'clinic-2',
      name: 'مرکز تهران (شعبه ۲)',
      branchName: 'شعبه ولیعصر',
      city: 'تهران',
      address: 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، جنب کوچه آبشار، مجتمع پزشکی ساعی، واحد ۱۰',
      phone: '۰۲۱-۲۲۸۸۶۹۹۱',
      telNumber: '+982122886991',
      workingDays: 'یکشنبه و سه‌شنبه',
      workingHours: '۱۴:۳۰ الی ۲۰:۰۰',
      image: 'https://images.pexels.com/photos/6529107/pexels-photo-6529107.jpeg?cs=srgb&dl=pexels-cottonbro-6529107.jpg&fm=jpg',
      lat: 35.7342,
      lng: 51.4112
    },
    {
      id: 'clinic-3',
      name: 'مرکز تهران (شعبه ۳)',
      branchName: 'شعبه ونک',
      city: 'تهران',
      address: 'تهران، میدان ونک، ابتدای خیابان ملاصدرا، جنب بیمارستان بقیه‌الله، ساختمان ونک، طبقه ۲',
      phone: '۰۲۱-۲۲۸۸۶۹۹۲',
      telNumber: '+982122886992',
      workingDays: 'شنبه و دوشنبه صبح',
      workingHours: '۰۹:۳۰ الی ۱۳:۳۰',
      image: 'https://images.pexels.com/photos/6529056/pexels-photo-6529056.jpeg?cs=srgb&dl=pexels-cottonbro-6529056.jpg&fm=jpg',
      lat: 35.7571,
      lng: 51.4087
    },
    {
      id: 'clinic-4',
      name: 'مرکز تهران (شعبه ۴)',
      branchName: 'شعبه میرداماد',
      city: 'تهران',
      address: 'تهران، بلوار میرداماد، جنب ایستگاه مترو میرداماد، مجتمع تجاری پزشکی رز، واحد ۳۰۴',
      phone: '۰۲۱-۲۲۸۸۶۹۹۳',
      telNumber: '+982122886993',
      workingDays: 'پنج‌شنبه‌ها',
      workingHours: '۰۹:۰۰ الی ۱۶:۰۰',
      image: 'https://images.pexels.com/photos/14235194/pexels-photo-14235194.jpeg?cs=srgb&dl=pexels-filipgrobgaard-14235194.jpg&fm=jpg',
      lat: 35.7621,
      lng: 51.4298
    },
    {
      id: 'clinic-5',
      name: 'مرکز قم (شعبه ۵)',
      branchName: 'شعبه بلوار امین قم',
      city: 'قم',
      address: 'قم، بلوار امین، کوچه ۲۱، مجتمع پزشکی صبا، طبقه ۴، واحد ۴۰۲',
      phone: '۰۲۵-۳۲۸۸۶۹۹۴',
      telNumber: '+982532886994',
      workingDays: 'سه‌شنبه و چهارشنبه صبح',
      workingHours: '۱۰:۰۰ الی ۱۴:۰۰',
      image: 'https://images.pexels.com/photos/7422520/pexels-photo-7422520.jpeg?cs=srgb&dl=pexels-emerickalil-7422520.jpg&fm=jpg',
      lat: 34.6291,
      lng: 50.8712
    }
  ];

  // Testimonials data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 't-1',
      name: 'مریم احمدی',
      service: 'ارتودنسی نامرئی',
      branch: 'شعبه سعادت‌آباد',
      rating: 5,
      comment: 'تجربه من از مراجعه به دکتر علیرضا کریمی بسیار فوق‌العاده بود. همه چیز با جزئیات کامل و شبیه‌سازی سه‌بعدی توضیح داده شد و روند درمانم کاملاً شفاف و بی‌دغدغه پیش رفت.',
      date: '۲ هفته پیش'
    },
    {
      id: 't-2',
      name: 'سارا محمدی',
      service: 'اصلاح ناهنجاری فکی',
      branch: 'شعبه ونک',
      rating: 5,
      comment: 'از نتیجه درمان ارتودنسی‌ام بعد از ۱۴ ماه بی‌نهایت راضی هستم. فرم لبخند و پروفایل صورتم کاملاً متحول شد. تیم کلینیک همواره با صبوری و احترام پیگیر وضعیت براکت‌ها بودند.',
      date: '۱ ماه پیش'
    },
    {
      id: 't-3',
      name: 'نگار رضایی',
      service: 'ارتودنسی ثابت سرامیکی',
      branch: 'شعبه ولیعصر',
      rating: 5,
      comment: 'محیط کلینیک فوق‌العاده آرام، استریل و منظم است. از همان جلسه اول معاینه احساس اطمینان کردم چون برای تک‌تک مراحل درمانم تقویم و برنامه زمان‌بندی دقیق ارائه دادند.',
      date: '۳ هفته پیش'
    }
  ]);

  // FAQs
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'اولین جلسه مشاوره و معاینه ارتودنسی چگونه است؟',
      answer: 'در جلسه اول، دکتر علیرضا کریمی وضعیت قرارگیری فک‌ها و دندان‌ها را به دقت معاینه کرده، رادیوگرافی‌های لازم (OPG و لترال سفالومتری) یا اسکن سه‌بعدی را بررسی می‌کنند. سپس گزینه‌های درمانی (ثابت، نامرئی، ارتوپدی فک)، زمان تقریبی و برنامه هزینه‌ها به صورت شفاف به شما اعلام می‌شود.'
    },
    {
      id: 'faq-2',
      question: 'ارتودنسی برای چه سنی مناسب است و بهترین زمان مراجعه کی است؟',
      answer: 'ارتودنسی هیچ محدودیت سنی برای بزرگسالان ندارد؛ تا زمانی که لثه و استخوان نگهدارنده دندان سالم باشد، دندان‌ها در هر سنی قابلیت حرکت دارند. با این حال، انجمن ارتودنتیست‌ها سن ۷ سالگی را بهترین زمان برای اولین ویزیت پیشگیرانه کودکان توصیه می‌کند تا در صورت نیاز به هدایت رشد استخوان فک، بدون جراحی مداخله شود.'
    },
    {
      id: 'faq-3',
      question: 'مدت درمان ارتودنسی چقدر است و آیا نیاز به کشیدن دندان هست؟',
      answer: 'طول درمان بسته به نوع و شدت ناهنجاری، معمولاً بین ۱۲ تا ۲۴ ماه متغیر است. با روش‌های نوین ارتودنسی و اسکنرهای مدرن، در بیش از ۸۵ درصد موارد نیازی به کشیدن دندان سالم نیست و تلاش تیم ما حداکثر حفظ دندان‌های طبیعی شماست.'
    },
    {
      id: 'faq-4',
      question: 'آیا ارتودنسی نامرئی (پلاک شفاف Invisalign) برای همه مناسب است؟',
      answer: 'پلاک‌های شفاف برای اکثر ناهنجاری‌های خفیف تا متوسط و حتی برخی موارد پیچیده بزرگسالان بسیار مناسب هستند. این پلاک‌ها هنگام غذا خوردن خارج می‌شوند و کاملاً نامرئی هستند. تصمیم نهایی پس از اسکن دیجیتال در جلسه اول معاینه مشخص خواهد شد.'
    },
    {
      id: 'faq-5',
      question: 'آیا پرداخت هزینه درمان ارتودنسی به صورت اقساط امکان‌پذیر است؟',
      answer: 'بله، در کلیه مراکز تحت نظارت دکتر علیرضا کریمی، هزینه درمان ارتودنسی به صورت اقساط ماهانه در طول دوره درمان و بدون کارمزد اضافی تقسیط می‌شود. همچنین مدارک و صورتحساب رسمی جهت دریافت هزینه از بیمه‌های تکمیلی ارائه می‌گردد.'
    }
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'results', 'clinics', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) {
      alert('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }

    setBookingSubmitting(true);
    setTimeout(() => {
      const code = 'KR-' + Math.floor(10000 + Math.random() * 90000);
      setLastBookingCode(code);
      setBookingSubmitting(false);
      setIsSuccessBookingOpen(true);
      // Reset
      setBookingName('');
      setBookingPhone('');
      setBookingNotes('');
    }, 600);
  };

  // Handle Consultation Modal Submit
  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName.trim() || !consultPhone.trim()) {
      alert('لطفاً نام و شماره همراه خود را وارد کنید.');
      return;
    }

    setConsultSubmitting(true);
    setTimeout(() => {
      setConsultSubmitting(false);
      setIsConsultModalOpen(false);
      alert(`درخواست مشاوره شما با موفقیت ثبت شد.\nهمکاران ما در اولین فرصت با شماره ${consultPhone} تماس خواهند گرفت.`);
      setConsultName('');
      setConsultPhone('');
      setConsultDesc('');
    }, 500);
  };

  // Handle Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      alert('لطفاً یک ایمیل معتبر وارد کنید.');
      return;
    }
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  // Handle Review Submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newReview: Testimonial = {
      id: 't-' + Date.now(),
      name: reviewName,
      service: reviewTreatment,
      branch: 'شعبه سعادت‌آباد',
      rating: reviewRating,
      comment: reviewComment,
      date: 'هم‌اکنون'
    };

    setTestimonials([newReview, ...testimonials]);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setIsReviewModalOpen(false);
      setReviewName('');
      setReviewComment('');
    }, 1500);
  };

  // Pre-fill clinic in booking form
  const selectClinicForBooking = (clinicName: string) => {
    setBookingBranch(clinicName);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-[#173b56] font-sans antialiased overflow-x-hidden selection:bg-[#0b3b60] selection:text-white" dir="rtl">
      
      {/* 1. TOPBAR */}
      <div className="bg-[#062d4b] text-white text-[13px] py-2 border-b border-[#0b3b60]/50 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4.5 flex flex-wrap justify-between items-center gap-3">
          {/* Top Info */}
          <div className="flex items-center gap-4 text-xs sm:text-[13px] text-slate-200">
            <span className="inline-flex items-center gap-1.5 font-medium bg-[#0b3b60]/70 px-2.5 py-0.5 rounded-full text-amber-300 border border-amber-400/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>۵ مرکز درمانی در تهران و قم</span>
            </span>
            <span className="hidden md:inline text-slate-300">
              کلینیک مرکزی: تهران، سعادت‌آباد، میدان فرهنگ، بلوار ۲۴ متری پاک
            </span>
          </div>

          {/* Social Links & Fast Contact */}
          <div className="flex items-center gap-4">
            <a
              href="tel:02122886990"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">۰۲۱-۲۲۸۸۶۹۹۰</span>
            </a>
            <div className="hidden sm:flex items-center gap-3 text-sm text-slate-300 border-r border-slate-700 pr-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
                title="اینستاگرام دکتر کریمی"
              >
                ◎
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
                title="کانال تلگرام"
              >
                ➤
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
                title="واتس‌اپ پشتیبانی"
              >
                ◉
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
                title="لینکدین تخصصی"
              >
                in
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
                title="ویدیوهای یوتیوب"
              >
                ▶
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HEADER */}
      <header className="bg-white/95 backdrop-blur-md sticky top-[37px] z-30 border-b border-[#edf1f4] shadow-sm transition-all">
        <div className="max-w-[1200px] mx-auto px-4.5 min-h-[78px] flex items-center justify-between gap-4">
          
          {/* Brand & Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0b3b60] to-[#13537d] flex items-center justify-center text-amber-300 font-black text-xl shadow-md border border-amber-400/30 group-hover:scale-105 transition-transform">
              <span>ک</span>
            </div>
            <div>
              <div className="text-[#0b3b60] font-black text-lg sm:text-xl tracking-tight leading-none group-hover:text-[#13537d] transition-colors">
                دکتر علیرضا کریمی
              </div>
              <div className="text-[11px] text-[#718292] font-semibold mt-1">
                متخصص ارتودنسی و ناهنجاری‌های فک و صورت
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-[#466276]">
            <a
              href="#home"
              className={`py-6 relative transition-colors ${
                activeSection === 'home' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              خانه
              {activeSection === 'home' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
            <a
              href="#about"
              className={`py-6 relative transition-colors ${
                activeSection === 'about' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              درباره دکتر کریمی
              {activeSection === 'about' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
            <a
              href="#services"
              className={`py-6 relative transition-colors ${
                activeSection === 'services' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              خدمات
              {activeSection === 'services' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
            <a
              href="#results"
              className={`py-6 relative transition-colors ${
                activeSection === 'results' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              نتایج درمان
              {activeSection === 'results' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
            <a
              href="#clinics"
              className={`py-6 relative transition-colors ${
                activeSection === 'clinics' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              مراکز درمانی
              {activeSection === 'clinics' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
            <a
              href="#faq"
              className={`py-6 relative transition-colors ${
                activeSection === 'faq' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              سوالات متداول
              {activeSection === 'faq' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
            <a
              href="#contact"
              className={`py-6 relative transition-colors ${
                activeSection === 'contact' ? 'text-[#0b3b60]' : 'hover:text-[#0b3b60]'
              }`}
            >
              تماس
              {activeSection === 'contact' && (
                <span className="absolute bottom-3 right-0 w-full h-[3px] bg-[#c9a64a] rounded-full" />
              )}
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#booking"
              className="bg-[#75e51c] text-[#153d20] hover:brightness-105 active:scale-95 text-xs sm:text-sm font-extrabold px-3.5 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl transition-all shadow-md shadow-[#75e51c]/25 cursor-pointer whitespace-nowrap"
            >
              نوبت رایگان
            </a>
            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="hidden sm:inline-flex bg-[#0b3b60] hover:bg-[#062d4b] text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              رزرو مشاوره
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0b3b60] hover:bg-slate-100 rounded-xl"
              aria-label="باز کردن منو"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-lg animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-1 text-sm font-bold text-[#466276]">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                خانه
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                درباره دکتر کریمی
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                خدمات ارتودنسی
              </a>
              <a
                href="#results"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                نتایج درمان
              </a>
              <a
                href="#clinics"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                مراکز درمانی
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                سوالات متداول
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 hover:text-[#0b3b60]"
              >
                تماس با کلینیک
              </a>
              <div className="pt-2 border-t border-slate-100 mt-1 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConsultModalOpen(true);
                  }}
                  className="flex-1 bg-[#0b3b60] text-white py-2 rounded-xl text-center text-xs font-bold"
                >
                  رزرو مشاوره اختصاصی
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section id="home" className="karimi-hero pt-8 sm:pt-14 pb-20 relative">
        <div className="max-w-[1200px] mx-auto px-4.5 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
          
          {/* Hero Copy (Left on RTL = right side in flow) */}
          <div className="lg:col-span-7 text-right">
            <div className="inline-flex items-center gap-2 text-[#c9a64a] font-extrabold text-sm sm:text-base mb-2 bg-[#c9a64a]/10 px-3.5 py-1 rounded-full border border-[#c9a64a]/20">
              <Sparkles className="w-4 h-4 text-[#c9a64a]" />
              <span>متخصص ارتودنسی و ناهنجاری‌های فکی</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0b3b60] tracking-tight leading-[1.25] mb-2">
              دکتر علیرضا کریمی
            </h1>

            <h2 className="text-xl sm:text-3xl font-extrabold text-[#153d59] leading-snug mb-5">
              متخصص ارتودنسی در تهران
            </h2>

            <p className="text-sm sm:text-base text-[#617588] leading-relaxed max-w-xl mb-8">
              با بیش از ۲۰ سال تجربه در درمان‌های تخصصی ارتودنسی، با بهره‌گیری از جدیدترین روش‌های علمی و تکنولوژی روز، دنیای لبخندی سالم و زیبا را برای شما می‌سازم.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#services"
                className="karimi-btn-primary px-6 sm:px-8 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base text-[#153d20] inline-flex items-center gap-2"
              >
                <span>ارائه طرح درمان دندان</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
              <a
                href="#results"
                className="karimi-btn-dark px-6 sm:px-8 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base text-white inline-flex items-center gap-2"
              >
                <span>مشاهده نتایج درمان</span>
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 border-t border-[#dce5ea] pt-6 max-w-lg">
              <div className="text-center sm:text-right">
                <b className="block text-2xl sm:text-3xl font-black text-[#0b3b60]">۲۰+</b>
                <span className="text-xs sm:text-sm text-[#718292] font-medium">سال تجربه بالینی</span>
              </div>
              <div className="text-center sm:text-right border-x border-[#d7e0e6] px-2 sm:px-4">
                <b className="block text-2xl sm:text-3xl font-black text-[#c9a64a]">★ رتبه برتر</b>
                <span className="text-xs sm:text-sm text-[#718292] font-medium">بورد تخصصی کشور</span>
              </div>
              <div className="text-center sm:text-right">
                <b className="block text-2xl sm:text-3xl font-black text-[#0b3b60]">۵ مرکز</b>
                <span className="text-xs sm:text-sm text-[#718292] font-medium">در تهران و قم</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Doctor Photo + Floating Credential */}
          <div className="lg:col-span-5 flex justify-center items-end relative">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              {/* Soft decorative backdrop card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b3b60]/20 via-transparent to-transparent rounded-3xl -z-10 blur-sm transform scale-95" />
              
              <img
                src={drKarimiPortrait}
                alt="دکتر علیرضا کریمی متخصص ارتودنسی"
                className="w-full h-auto max-h-[540px] object-cover object-top rounded-3xl shadow-2xl border-4 border-white/80"
              />

              {/* Floating Credential Seal */}
              <div className="absolute -bottom-4 sm:bottom-6 right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#c9a64a]/30 flex items-center gap-3 max-w-[270px] animate-in fade-in zoom-in-95 duration-500">
                <div className="w-11 h-11 rounded-full border-2 border-[#c9a64a] bg-amber-50 flex items-center justify-center text-[#c9a64a] font-black text-lg flex-shrink-0 shadow-inner">
                  ✦
                </div>
                <div>
                  <b className="block text-xs sm:text-sm font-black text-[#0b3b60] leading-tight">
                    دارای بورد تخصصی ارتودنسی
                  </b>
                  <small className="block text-[10px] sm:text-xs text-[#718292] mt-0.5">
                    وزارت بهداشت و آموزش پزشکی
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider into trust section */}
        <div className="karimi-wave" />
      </section>

      {/* 4. TRUST SECTION */}
      <section className="bg-[#0b3b60] text-white pt-10 pb-12 relative z-20">
        <div className="max-w-[1200px] mx-auto px-4.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/15">
            
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 px-2 sm:px-4">
              <div className="w-12 h-12 rounded-full border border-[#c9a64a]/70 text-[#e3c76c] flex items-center justify-center text-xl flex-shrink-0 bg-white/5">
                ♡
              </div>
              <div>
                <b className="block text-sm sm:text-base font-extrabold text-white">تجربه، تخصص و اعتماد</b>
                <span className="text-xs text-[#c8d5df] block mt-0.5">همراه شما تا رسیدن به لبخند ایده‌آل</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 px-2 sm:px-4">
              <div className="w-12 h-12 rounded-full border border-[#c9a64a]/70 text-[#e3c76c] flex items-center justify-center text-xl flex-shrink-0 bg-white/5">
                ✦
              </div>
              <div>
                <b className="block text-sm sm:text-base font-extrabold text-white">جدیدترین تکنولوژی روز دنیا</b>
                <span className="text-xs text-[#c8d5df] block mt-0.5">اسکن سه‌بعدی و تشخیص دیجیتال</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 px-2 sm:px-4">
              <div className="w-12 h-12 rounded-full border border-[#c9a64a]/70 text-[#e3c76c] flex items-center justify-center text-xl flex-shrink-0 bg-white/5">
                ♙
              </div>
              <div>
                <b className="block text-sm sm:text-base font-extrabold text-white">درمان دقیق و با برنامه</b>
                <span className="text-xs text-[#c8d5df] block mt-0.5">طرح درمان متناسب با شرایط هر بیمار</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 px-2 sm:px-4">
              <div className="w-12 h-12 rounded-full border border-[#c9a64a]/70 text-[#e3c76c] flex items-center justify-center text-xl flex-shrink-0 bg-white/5">
                ⌁
              </div>
              <div>
                <b className="block text-sm sm:text-base font-extrabold text-white">ارتودنسی تمام گروه‌های سنی</b>
                <span className="text-xs text-[#c8d5df] block mt-0.5">کودک، نوجوان و بزرگسال</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VISUAL STRIP */}
      <section className="bg-white py-10 sm:py-12 border-b border-[#edf1f4]">
        <div className="max-w-[1200px] mx-auto px-4.5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            <a
              href="#results"
              className="md:col-span-6 relative block min-h-[220px] rounded-3xl overflow-hidden shadow-lg group"
            >
              <img
                src="https://images.pexels.com/photos/6529107/pexels-photo-6529107.jpeg?cs=srgb&dl=pexels-cottonbro-6529107.jpg&fm=jpg"
                alt="درمان تخصصی ارتودنسی"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03192a]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <b className="text-lg sm:text-xl font-black">درمان تخصصی ارتودنسی</b>
                <small className="text-slate-200 text-xs sm:text-sm mt-1">تمرکز بر دقت، سلامت و زیبایی لبخند</small>
              </div>
            </a>

            <a
              href="#services"
              className="md:col-span-3 relative block min-h-[220px] rounded-3xl overflow-hidden shadow-lg group"
            >
              <img
                src="https://images.pexels.com/photos/6529056/pexels-photo-6529056.jpeg?cs=srgb&dl=pexels-cottonbro-6529056.jpg&fm=jpg"
                alt="تکنولوژی و درمان دقیق"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03192a]/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <b className="text-base font-black">تکنولوژی و درمان دقیق</b>
                <small className="text-slate-200 text-xs mt-1">تجهیزات مدرن و پروتکل اختصاصی</small>
              </div>
            </a>

            <a
              href="#clinics"
              className="md:col-span-3 relative block min-h-[220px] rounded-3xl overflow-hidden shadow-lg group"
            >
              <img
                src="https://images.pexels.com/photos/7422520/pexels-photo-7422520.jpeg?cs=srgb&dl=pexels-emerickalil-7422520.jpg&fm=jpg"
                alt="محیط آرام و حرفه‌ای کلینیک"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03192a]/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <b className="text-base font-black">محیط آرام و حرفه‌ای</b>
                <small className="text-slate-200 text-xs mt-1">فضای درمانی تمیز، استریل و مجهز</small>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4.5">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[#c9a64a] font-extrabold text-xs sm:text-sm block mb-1">
                راهکارهای درمانی و زیبایی
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b3b60]">
                خدمات ارتودنسی
              </h2>
              <p className="text-[#718292] text-xs sm:text-sm mt-1">
                ارائه کامل خدمات تخصصی ارتودنسی برای تمام سنین با متدهای روز بین‌المللی
              </p>
            </div>
            <a
              href="#booking"
              className="text-xs sm:text-sm font-extrabold text-[#0b3b60] hover:text-[#c9a64a] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>مشاهده و رزرو خدمات</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {/* 7 Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            {services.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="bg-white border border-[#edf1f4] hover:border-[#c9a64a]/50 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center group cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#f4f8fa] group-hover:bg-[#0b3b60] group-hover:text-amber-300 text-[#0b3b60] flex items-center justify-center text-2xl font-bold transition-colors">
                  {srv.icon}
                </div>
                <div>
                  <b className="block text-xs sm:text-sm font-bold text-[#0b3b60] leading-snug group-hover:text-[#13537d]">
                    {srv.title}
                  </b>
                  <span className="block text-[10px] sm:text-xs text-[#718292] mt-1 line-clamp-1">
                    {srv.shortDesc}
                  </span>
                </div>
                <div className="text-[10px] text-[#c9a64a] font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <span>جزئیات</span>
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 7. ABOUT SECTION (چرا دکتر کریمی؟) */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-[#f4f9fb] border-y border-[#edf2f5]">
        <div className="max-w-[1200px] mx-auto px-4.5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* About Copy Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#edf2f5]">
              <span className="text-xs sm:text-sm font-extrabold text-[#c9a64a] block mb-1">
                آشنایی با پزشک و استانداردهای درمانی
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0b3b60] mb-4">
                چرا دکتر علیرضا کریمی؟
              </h3>
              <p className="text-xs sm:text-sm text-[#667b8b] leading-relaxed mb-6">
                دکتر علیرضا کریمی، متخصص ارتودنسی و ناهنجاری‌های فک و صورت، با بیش از ۲۰ سال تجربه بالینی، عضو فدراسیون جهانی ارتودنسی (WFO) و انجمن ارتودنتیست‌های ایران است. رویکرد ما بر پایه تشخیص دقیق سه‌بعدی، حفظ حداکثری دندان‌های طبیعی و ایجاد تجربه‌ای بدون درد، شفاف و قابل اعتماد برای بیماران عزیز است.
              </p>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#f8fbfd] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#eef6fa] text-[#0b3b60] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ▦
                  </div>
                  <div>
                    <b className="block text-xs sm:text-sm font-bold text-[#0b3b60]">تجهیزات مدرن و پیشرفته</b>
                    <span className="text-[11px] text-[#718292]">درمان با اسکنرهای سه‌بعدی و کدکم</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#f8fbfd] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#eef6fa] text-[#0b3b60] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ✦
                  </div>
                  <div>
                    <b className="block text-xs sm:text-sm font-bold text-[#0b3b60]">تجربه و مهارت بالا</b>
                    <span className="text-[11px] text-[#718292]">بیش از دو دهه فعالیت تخصصی</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#f8fbfd] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#eef6fa] text-[#0b3b60] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ♙
                  </div>
                  <div>
                    <b className="block text-xs sm:text-sm font-bold text-[#0b3b60]">برنامه درمانی اختصاصی</b>
                    <span className="text-[11px] text-[#718292]">شبیه‌سازی قبل و بعد نتیجه درمان</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#f8fbfd] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#eef6fa] text-[#0b3b60] flex items-center justify-center font-bold text-lg flex-shrink-0">
                    ♡
                  </div>
                  <div>
                    <b className="block text-xs sm:text-sm font-bold text-[#0b3b60]">تیم درمانی مجرب</b>
                    <span className="text-[11px] text-[#718292]">همراهی از مشاوره تا لبخند نهایی</span>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsConsultModalOpen(true)}
                  className="karimi-btn-dark px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>بیشتر درباره دکتر کریمی و رزرو نوبت</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Preview Card */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[400px] shadow-2xl group cursor-pointer border-4 border-white"
              >
                <img
                  src="https://images.pexels.com/photos/14235194/pexels-photo-14235194.jpeg?cs=srgb&dl=pexels-filipgrobgaard-14235194.jpg&fm=jpg"
                  alt="محیط کلینیک تخصصی دکتر علیرضا کریمی"
                  className="w-full h-full object-cover filter grayscale-[0.3] brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#0b3b60] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#75e51c] group-hover:text-[#153d20] transition-all">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 mr-1 fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0b3b60] via-[#0b3b60]/70 to-transparent p-6 text-white text-right">
                  <b className="block text-base sm:text-lg font-black">معرفی دکتر علیرضا کریمی</b>
                  <span className="text-xs text-slate-200 block mt-0.5">
                    کلیک کنید: مشاهده تور کلینیک و توضیحات شیوه درمان
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. RESULTS / CASES SECTION */}
      <section id="results" className="py-20 bg-[#f6fafc]">
        <div className="max-w-[1200px] mx-auto px-4.5">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[#c9a64a] font-extrabold text-xs sm:text-sm block mb-1">
                گالری قبل و بعد درمان
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b3b60]">
                نتایج درمان‌های ارتودنسی
              </h2>
              <p className="text-[#718292] text-xs sm:text-sm mt-1">
                نمونه‌هایی از نتایج درمان بیماران با رعایت کامل اصول تخصصی و رضایت حداکثری
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 self-start sm:self-auto bg-white p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setCaseFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  caseFilter === 'all' ? 'bg-[#0b3b60] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => setCaseFilter('jaw')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  caseFilter === 'jaw' ? 'bg-[#0b3b60] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ناهنجاری فک
              </button>
              <button
                onClick={() => setCaseFilter('fixed')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  caseFilter === 'fixed' ? 'bg-[#0b3b60] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ارتودنسی ثابت
              </button>
              <button
                onClick={() => setCaseFilter('adult')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  caseFilter === 'adult' ? 'bg-[#0b3b60] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                بزرگسالان
              </button>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCases.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="bg-white border border-[#e5edf2] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={item.beforeImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#0b3b60]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {item.duration}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
                    مشاهده قبل و بعد
                  </div>
                </div>

                <div className="p-4 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <b className="block text-sm font-bold text-[#0b3b60] leading-snug group-hover:text-[#13537d]">
                      {item.title}
                    </b>
                    <span className="block text-[#718292] text-xs mt-1">
                      طول درمان: {item.duration}
                    </span>
                  </div>
                  <button className="mt-3 text-xs text-[#0b3b60] font-extrabold flex items-center justify-center gap-1 group-hover:text-amber-600">
                    <span>بررسی پرونده پزشکی</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-6 h-2 rounded-full bg-[#0b3b60]" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4.5">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[#c9a64a] font-extrabold text-xs sm:text-sm block mb-1">
                دیدگاه بیماران
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b3b60]">
                نظرات مراجعین
              </h2>
              <p className="text-[#718292] text-xs sm:text-sm mt-1">
                رضایت و لبخند شاد مراجعین، سرمایه اصلی تیم درمانی ماست
              </p>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="karimi-btn-dark px-4 py-2 rounded-xl text-xs font-bold self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              <span>+ ثبت نظر شما</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="bg-white border border-[#e6edf1] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between text-amber-400 text-sm mb-3">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{t.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#64798a] leading-relaxed mb-6 italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0b3b60] to-[#13537d] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <b className="block text-xs sm:text-sm font-bold text-[#0b3b60]">
                      {t.name}
                    </b>
                    <span className="block text-[11px] text-[#718292]">
                      مراجع {t.service} ({t.branch})
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 10. CLINICS SECTION (مراکز درمانی ۵ گانه) */}
      <section id="clinics" className="py-20 bg-[#f6fafc] border-y border-[#edf1f4]">
        <div className="max-w-[1200px] mx-auto px-4.5">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[#c9a64a] font-extrabold text-xs sm:text-sm block mb-1">
                دسترسی آسان در سراسر پایتخت و استان قم
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b3b60]">
                مراکز درمانی
              </h2>
              <p className="text-[#718292] text-xs sm:text-sm mt-1">
                ۵ مرکز درمانی مجهز و استاندارد در تهران و قم
              </p>
            </div>
            <a
              href="#booking"
              className="text-xs sm:text-sm font-extrabold text-[#0b3b60] hover:text-[#c9a64a] inline-flex items-center gap-1.5"
            >
              <span>رزرو در نزدیک‌ترین شعبه</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {clinics.map((clinic) => (
              <article
                key={clinic.id}
                className="bg-white border border-[#e6edf1] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 overflow-hidden relative">
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#0b3b60]/90 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {clinic.city}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xs sm:text-sm font-black text-[#0b3b60] leading-snug mb-1">
                      {clinic.name}
                    </h3>
                    <p className="text-[11px] text-[#718292] min-h-[38px] leading-relaxed mb-3">
                      {clinic.address}
                    </p>

                    <a
                      href={`tel:${clinic.telNumber}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b3b60] hover:text-[#c9a64a] mb-2"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0b3b60]" />
                      <span>{clinic.phone}</span>
                    </a>

                    <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 mb-3">
                      <div className="font-semibold text-slate-700">روزهای حضور: {clinic.workingDays}</div>
                      <div>ساعت: {clinic.workingHours}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedClinicMap(clinic)}
                    className="border border-[#d9e4eb] hover:bg-slate-50 text-[#0b3b60] text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#0b3b60]" />
                    <span>مسیریابی</span>
                  </button>
                  <button
                    onClick={() => selectClinicForBooking(clinic.name)}
                    className="bg-[#0b3b60] hover:bg-[#062d4b] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>نوبت</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 11. BOOKING FORM SECTION (شروع یک لبخند جدید) */}
      <section id="booking" className="py-20 bg-[#f6fafc]">
        <div className="max-w-[1200px] mx-auto px-4.5">
          <div className="bg-gradient-to-tr from-[#0b3b60] via-[#0b3b60] to-[#0d527b] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#75e51c]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Form Intro */}
              <div className="lg:col-span-5 text-right">
                <span className="text-[#e5ca72] font-black text-sm block mb-1">
                  شروع یک لبخند جدید
                </span>
                <h2 className="text-2xl sm:text-4xl font-black mb-4 leading-snug">
                  برای مشاوره و طرح درمان اقدام کنید
                </h2>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6">
                  فرم را تکمیل کنید؛ تیم پذیرش جهت هماهنگی روز و ساعت مناسب در نزدیک‌ترین شعبه با شما تماس می‌گیرد.
                </p>

                <div className="space-y-3 border-t border-white/15 pt-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#75e51c] flex-shrink-0" />
                    <span>مشاوره و ارزیابی اولیه کاملاً رایگان</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#75e51c] flex-shrink-0" />
                    <span>ارائه برنامه تقسیط بدون بهره برای کلیه خدمات ارتودنسی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#75e51c] flex-shrink-0" />
                    <span>امکان صدور مدارک برای شرکت‌های بیمه تکمیلی</span>
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleBookingSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="مثال: علیرضا محمدی"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#75e51c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      شماره تماس همراه *
                    </label>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="۰۹۱۲..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#75e51c]"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      نوع خدمت ارتودنسی
                    </label>
                    <select
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full bg-[#0b3b60] border border-white/20 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#75e51c]"
                    >
                      <option value="ارتودنسی ثابت">ارتودنسی ثابت (براکت سرامیکی/فلزی)</option>
                      <option value="ارتودنسی نامرئی">ارتودنسی نامرئی (الاینر شفاف)</option>
                      <option value="اصلاح ناهنجاری‌های فکی">اصلاح ناهنجاری فکی (ارتوسرجری)</option>
                      <option value="ارتودنسی کودکان">ارتودنسی کودکان (پیشگیری)</option>
                      <option value="ارتودنسی بزرگسالان">ارتودنسی بزرگسالان</option>
                      <option value="مشاوره عمومی ارتودنسی">معاینه و مشاوره عمومی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      مرکز درمانی مدنظر
                    </label>
                    <select
                      value={bookingBranch}
                      onChange={(e) => setBookingBranch(e.target.value)}
                      className="w-full bg-[#0b3b60] border border-white/20 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#75e51c]"
                    >
                      <option value="تهران - سعادت‌آباد (مرکزی)">تهران - سعادت‌آباد (مرکزی)</option>
                      <option value="تهران - خیابان ولیعصر">تهران - خیابان ولیعصر</option>
                      <option value="تهران - ونک">تهران - ونک</option>
                      <option value="تهران - میرداماد">تهران - میرداماد</option>
                      <option value="قم - بلوار امین">قم - بلوار امین</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      توضیحات یا زمان ترجیحی (اختیاری)
                    </label>
                    <input
                      type="text"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="روزهای مدنظر شما جهت هماهنگی..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#75e51c]"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={bookingSubmitting}
                      className="w-full bg-[#75e51c] hover:brightness-105 active:scale-[0.99] text-[#153d20] font-black text-sm sm:text-base py-3.5 rounded-2xl shadow-xl shadow-[#75e51c]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {bookingSubmitting ? (
                        <span>در حال ارسال اطلاعات...</span>
                      ) : (
                        <>
                          <span>ثبت درخواست نوبت رایگان</span>
                          <ArrowLeft className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 12. FAQ SECTION */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-[850px] mx-auto px-4.5">
          
          <div className="text-center mb-12">
            <span className="text-[#c9a64a] font-extrabold text-xs sm:text-sm block mb-1">
              راهنمای مراجعین
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b3b60]">
              سوالات متداول
            </h2>
            <p className="text-[#718292] text-xs sm:text-sm mt-1">
              پاسخ به رایج‌ترین سوالات شما درباره روند درمان ارتودنسی
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="border border-[#e4ebef] rounded-2xl bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4.5 px-5 flex items-center justify-between text-right text-sm sm:text-base font-extrabold text-[#0b3b60] hover:text-[#13537d] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`text-xl font-light text-[#c9a64a] transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#718292] leading-relaxed border-t border-slate-50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer id="contact" className="bg-[#062d4b] text-white pt-14 pb-8 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4.5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            
            {/* Col 1: Bio */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0b3b60] to-[#13537d] flex items-center justify-center text-amber-300 font-black text-lg border border-amber-400/30">
                  <span>ک</span>
                </div>
                <div>
                  <b className="text-white text-lg font-black block">دکتر علیرضا کریمی</b>
                  <span className="text-xs text-slate-300">متخصص ارتودنسی و ناهنجاری‌های فک و صورت</span>
                </div>
              </div>
              <p className="text-xs text-[#b9cbd7] leading-relaxed mb-4">
                با بیش از ۲۰ سال تجربه بالینی و دانشگاهی. ارائه خدمات تخصصی با تمرکز بر تشخیص دقیق دیجیتال، برنامه درمانی اختصاصی و تجربه‌ای آرام و مطمئن برای بیمار.
              </p>
              <div className="text-xs text-[#e3c76c] font-bold">
                ☎ تلفن کلینیک مرکزی: ۰۲۱-۲۲۸۸۶۹۹۰
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-extrabold text-white mb-4">خدمات ارتودنسی</h4>
              <ul className="space-y-2 text-xs text-[#b9cbd7]">
                <li><a href="#services" className="hover:text-amber-300 transition-colors">ارتودنسی ثابت</a></li>
                <li><a href="#services" className="hover:text-amber-300 transition-colors">ارتودنسی نامرئی</a></li>
                <li><a href="#services" className="hover:text-amber-300 transition-colors">اصلاح ناهنجاری فکی</a></li>
                <li><a href="#services" className="hover:text-amber-300 transition-colors">ارتودنسی کودکان</a></li>
                <li><a href="#services" className="hover:text-amber-300 transition-colors">ارتودنسی بزرگسالان</a></li>
              </ul>
            </div>

            {/* Col 3: Quick links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-extrabold text-white mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-xs text-[#b9cbd7]">
                <li><a href="#about" className="hover:text-amber-300 transition-colors">درباره دکتر کریمی</a></li>
                <li><a href="#results" className="hover:text-amber-300 transition-colors">نتایج درمان</a></li>
                <li><a href="#clinics" className="hover:text-amber-300 transition-colors">مراکز درمانی ۵ گانه</a></li>
                <li><a href="#booking" className="hover:text-amber-300 transition-colors">نوبت رایگان</a></li>
                <li><a href="#faq" className="hover:text-amber-300 transition-colors">سوالات متداول</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter & Contact */}
            <div className="lg:col-span-4">
              <h4 className="text-sm font-extrabold text-white mb-2">عضویت در خبرنامه آموزشی</h4>
              <p className="text-xs text-[#b9cbd7] mb-3">
                برای دریافت نکات بهداشت دهان و دندان، تخفیف‌های دوره‌ای و آخرین مقالات، ایمیل خود را ثبت کنید.
              </p>

              {newsletterSuccess ? (
                <div className="bg-emerald-800/60 border border-emerald-500/50 text-emerald-200 text-xs p-3 rounded-xl">
                  ایمیل شما با موفقیت در خبرنامه ثبت گردید. با تشکر!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex bg-white rounded-xl overflow-hidden p-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="ایمیل شما (example@gmail.com)"
                    className="flex-1 px-3 py-2 text-xs text-slate-800 outline-none placeholder-slate-400"
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    className="bg-[#c9a64a] hover:bg-[#b08e3a] text-white px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    ثبت
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>📍 تهران و قم</span>
                <span className="text-amber-300 font-bold">پاسخگویی: شنبه تا چهارشنبه ۹ تا ۲۰</span>
              </div>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#92aaba]">
            <span>
              © تمامی حقوق مادی و معنوی برای وب‌سایت دکتر علیرضا کریمی محفوظ است.
            </span>
            <span className="flex items-center gap-1.5">
              <span>طراحی رابط کاربری RTL • واکنش‌گرا (Responsive) • معتبر پزشکی</span>
            </span>
          </div>

        </div>
      </footer>

      {/* 14. FLOATING ACTION BAR FOR MOBILE */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex gap-2">
        <a
          href="#booking"
          className="flex-1 bg-[#75e51c] text-[#153d20] font-black text-xs py-3 rounded-2xl text-center shadow-lg shadow-black/20 flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>رزرو نوبت رایگان</span>
        </a>
        <button
          onClick={() => setIsConsultModalOpen(true)}
          className="flex-1 bg-[#0b3b60] text-white font-black text-xs py-3 rounded-2xl text-center shadow-lg shadow-black/20 flex items-center justify-center gap-1.5 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>مشاوره اختصاصی</span>
        </button>
      </div>

      {/* 15. MODAL: CONSULTATION REQUEST */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 bg-[#031623]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-100">
            <button
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute left-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-[#c9a64a] text-xs font-bold block mb-1">مشاوره با تیم دکتر علیرضا کریمی</span>
              <h3 className="text-xl font-black text-[#0b3b60]">رزرو مشاوره اختصاصی</h3>
              <p className="text-xs text-[#718292] mt-1">
                اطلاعات خود را ثبت کنید تا کارشناسان ما جهت هماهنگی تماس حاصل نمایند.
              </p>
            </div>

            <form onSubmit={handleConsultSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  placeholder="مثال: نرگس رضایی"
                  className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">شماره همراه تماس *</label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  value={consultPhone}
                  onChange={(e) => setConsultPhone(e.target.value)}
                  placeholder="۰۹..."
                  dir="ltr"
                  className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">موضوع مشاوره</label>
                <select
                  value={consultType}
                  onChange={(e) => setConsultType(e.target.value)}
                  className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                >
                  <option value="مشاوره تخصصی ارتودنسی">مشاوره تخصصی ارتودنسی</option>
                  <option value="بررسی طرح درمان و شبیه‌سازی">بررسی طرح درمان و شبیه‌سازی</option>
                  <option value="ارتودنسی نامرئی">ارتودنسی نامرئی و الاینرها</option>
                  <option value="جراحی فک و ارتوسرجری">جراحی فک و ارتوسرجری</option>
                  <option value="پیگیری درمان قبلی">پیگیری وضعیت درمان</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">توضیحات تکمیلی (اختیاری)</label>
                <textarea
                  value={consultDesc}
                  onChange={(e) => setConsultDesc(e.target.value)}
                  placeholder="سن بیمار یا سابقه درمان قبلی..."
                  rows={3}
                  className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                />
              </div>

              <button
                type="submit"
                disabled={consultSubmitting}
                className="w-full bg-[#75e51c] hover:brightness-105 text-[#153d20] font-black py-3 rounded-xl transition-all cursor-pointer shadow-md text-sm mt-2"
              >
                {consultSubmitting ? 'در حال ثبت...' : 'ثبت درخواست مشاوره'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 16. MODAL: SUCCESS BOOKING RECEIPT */}
      {isSuccessBookingOpen && (
        <div className="fixed inset-0 bg-[#031623]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-[#0b3b60] mb-2">درخواست نوبت شما ثبت شد!</h3>
            <p className="text-xs text-[#718292] mb-4 leading-relaxed">
              اطلاعات شما با موفقیت در سامانه پذیرش دکتر علیرضا کریمی ثبت گردید. کارشناسان ما تا ساعاتی دیگر جهت تایید نهایی زمان ویزیت با شما تماس خواهند گرفت.
            </p>

            <div className="bg-[#f8fbfd] p-3.5 rounded-2xl border border-slate-200 mb-6">
              <span className="text-xs text-slate-500 block">کد پیگیری نوبت شما:</span>
              <b className="text-lg font-black text-[#0b3b60] tracking-wider mt-1 block" dir="ltr">
                {lastBookingCode}
              </b>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsSuccessBookingOpen(false)}
                className="flex-1 bg-[#0b3b60] text-white py-2.5 rounded-xl font-bold text-xs"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 17. MODAL: SERVICE DETAIL */}
      {selectedService && (
        <div className="fixed inset-0 bg-[#031623]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-100">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute left-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0b3b60] text-amber-300 flex items-center justify-center text-2xl font-bold">
                {selectedService.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0b3b60]">{selectedService.title}</h3>
                <span className="text-xs text-slate-500 font-semibold">طول دوره: {selectedService.duration}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {selectedService.fullDesc}
            </p>

            <div className="bg-[#f8fbfd] p-3.5 rounded-2xl border border-slate-200 mb-4 text-xs">
              <b className="text-[#0b3b60] block mb-1">مناسب برای چه افرادی؟</b>
              <span className="text-slate-600 leading-relaxed">{selectedService.idealFor}</span>
            </div>

            <div className="space-y-1.5 mb-6 text-xs text-slate-700">
              <b className="text-[#0b3b60] block mb-1">مزایای کلیدی:</b>
              {selectedService.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <a
                href="#booking"
                onClick={() => {
                  setBookingService(selectedService.title);
                  setSelectedService(null);
                }}
                className="flex-1 bg-[#75e51c] text-[#153d20] text-center py-2.5 rounded-xl font-black text-xs"
              >
                رزرو نوبت برای این خدمت
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 18. MODAL: CLINIC MAP & DIRECTIONS */}
      {selectedClinicMap && (
        <div className="fixed inset-0 bg-[#031623]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-slate-100 text-right">
            <button
              onClick={() => setSelectedClinicMap(null)}
              className="absolute left-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-[#c9a64a] block mb-1">{selectedClinicMap.city}</span>
            <h3 className="text-lg font-black text-[#0b3b60] mb-2">{selectedClinicMap.name}</h3>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              📍 {selectedClinicMap.address}
            </p>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-5 text-xs text-slate-700">
              <div className="font-bold text-[#0b3b60] mb-1">اطلاعات تماس و حضور:</div>
              <div>تلفن: {selectedClinicMap.phone}</div>
              <div>روزهای حضور: {selectedClinicMap.workingDays}</div>
              <div>ساعت پذیرش: {selectedClinicMap.workingHours}</div>
            </div>

            <div className="space-y-2">
              <a
                href={`https://neshan.org/maps/@${selectedClinicMap.lat},${selectedClinicMap.lng},16z`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#0b3b60] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#062d4b] transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>مسیریابی با نشان</span>
              </a>
              <a
                href={`https://balad.ir/location?latitude=${selectedClinicMap.lat}&longitude=${selectedClinicMap.lng}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-slate-100 text-slate-800 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <span>مسیریابی با بلد</span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedClinicMap.lat},${selectedClinicMap.lng}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-slate-100 text-slate-800 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 19. MODAL: VIDEO TOUR */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-[#031623]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 max-w-2xl w-full relative shadow-2xl border border-slate-700 text-white">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute left-4 top-4 w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-2">معرفی کلینیک و روش‌های درمانی دکتر علیرضا کریمی</h3>
            <p className="text-xs text-slate-400 mb-4">
              نگاهی به تجهیزات اسکن دیجیتال سه‌بعدی، فضای استریل و تکنولوژی‌های مدرن ارتودنسی
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
              <img
                src="https://images.pexels.com/photos/14235194/pexels-photo-14235194.jpeg?cs=srgb&dl=pexels-filipgrobgaard-14235194.jpg&fm=jpg"
                alt="نمای ویدیو"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#75e51c] text-[#153d20] flex items-center justify-center mx-auto mb-3 shadow-xl">
                  <Play className="w-7 h-7 mr-1 fill-current" />
                </div>
                <div className="font-extrabold text-sm">ویدیو معرفی و رویکرد تشخیصی</div>
                <small className="text-slate-300 text-xs block mt-1">
                  پخش در سرور کلینیک آماده پخش است
                </small>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
              <span>مدت زمان: ۲:۴۵ دقیقه</span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 20. MODAL: CASE DETAIL (BEFORE/AFTER) */}
      {selectedCase && (
        <div className="fixed inset-0 bg-[#031623]/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl border border-slate-100">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute left-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-[#c9a64a] block mb-1">
              پرونده درمانی | {selectedCase.duration}
            </span>
            <h3 className="text-lg font-black text-[#0b3b60] mb-4">
              {selectedCase.title}
            </h3>

            {/* Images side-by-side or comparison */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 relative">
                <img
                  src={selectedCase.beforeImg}
                  alt="قبل از درمان"
                  className="w-full h-36 object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                  قبل از شروع
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-emerald-300 relative">
                <img
                  src={selectedCase.afterImg}
                  alt="پس از پایان درمان"
                  className="w-full h-36 object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                  نتیجه نهایی ({selectedCase.duration})
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-[#f8fbfd] p-4 rounded-2xl border border-slate-200 mb-5">
              <div>
                <b className="text-[#0b3b60]">سن بیمار: </b>
                <span className="text-slate-700">{selectedCase.age}</span>
              </div>
              <div>
                <b className="text-[#0b3b60]">تشخیص اولیه: </b>
                <span className="text-slate-700">{selectedCase.diagnosis}</span>
              </div>
              <div>
                <b className="text-[#0b3b60]">طرح درمان انجام شده: </b>
                <span className="text-slate-700">{selectedCase.solution}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="#booking"
                onClick={() => setSelectedCase(null)}
                className="flex-1 bg-[#75e51c] text-[#153d20] text-center py-2.5 rounded-xl font-black text-xs"
              >
                مشاوره برای شرایط مشابه
              </a>
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 21. MODAL: SUBMIT NEW REVIEW */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-[#031623]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-slate-100">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute left-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-[#0b3b60] mb-2">ثبت تجربه درمان شما</h3>
            <p className="text-xs text-slate-500 mb-4">
              دیدگاه شما به سایر مراجعین در انتخاب مسیر درمان کمک می‌کند.
            </p>

            {reviewSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-center text-xs font-bold">
                نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد. با تشکر!
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="مثال: پیام صالحی"
                    className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نوع درمان</label>
                  <select
                    value={reviewTreatment}
                    onChange={(e) => setReviewTreatment(e.target.value)}
                    className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                  >
                    <option value="ارتودنسی ثابت">ارتودنسی ثابت</option>
                    <option value="ارتودنسی نامرئی">ارتودنسی نامرئی</option>
                    <option value="اصلاح فک">اصلاح ناهنجاری فک</option>
                    <option value="ارتودنسی کودکان">ارتودنسی کودکان</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">امتیاز شما</label>
                  <div className="flex gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setReviewRating(s)}
                        className="cursor-pointer text-amber-400"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">متن نظر شما</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="تجربه خود از برخورد پرسنل، محیط کلینیک و نتیجه درمان را بنویسید..."
                    className="w-full bg-[#fbfdfe] border border-[#dfe8ed] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0b3b60] text-white font-bold py-2.5 rounded-xl hover:bg-[#062d4b] transition-colors cursor-pointer text-xs"
                >
                  ارسال نظر
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DrKarimiWebsite;
