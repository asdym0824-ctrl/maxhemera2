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
  HelpCircle
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

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    department: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const branches = [
    {
      name: 'شعبه سعادت‌آباد (مرکز تخصصی ارتودنسی و جراحی)',
      address: 'تهران، سعادت‌آباد، میدان فرهنگ، بلوار ۲۴ متری، پلاک ۱۱',
      phone: '۰۲۱-۲۲۸۸۶۹۰۰',
      telLink: 'tel:02122886900',
      hours: 'شنبه تا چهارشنبه ۱۰:۰۰ الی ۲۰:۰۰'
    },
    {
      name: 'شعبه فرمانیه (اندرزگو)',
      address: 'تهران، فرمانیه، بلوار اندرزگو، نبش کوچه حسینی، ساختمان پزشکان پایتخت',
      phone: '۰۲۱-۲۲۶۹۰۱۰۰',
      telLink: 'tel:02122690100',
      hours: 'یکشنبه و سه‌شنبه ۱۵:۰۰ الی ۲۱:۰۰'
    },
    {
      name: 'شعبه مطهری (مرکز تهران)',
      address: 'تهران، خیابان استاد مطهری، خیابان فجر، ساختمان شماره ۱۴',
      phone: '۰۲۱-۸۸۴۵۳۲۰۰',
      telLink: 'tel:02188453200',
      hours: 'دوشنبه و چهارشنبه ۱۴:۰۰ الی ۱۹:۳۰'
    },
    {
      name: 'شعبه قم (مرکز تخصصی بلوار امین)',
      address: 'قم، بلوار امین، نبش کوچه ۱۰، مجتمع پزشکان نور',
      phone: '۰۲۵-۳۲۹۲۱۵۰۰',
      telLink: 'tel:02532921500',
      hours: 'پنج‌شنبه‌ها ۰۹:۰۰ الی ۱۸:۰۰'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTrackingNumber('HM-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitSuccess(true);
      setContactForm({
        name: '',
        phone: '',
        department: 'general',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="space-y-10 sm:space-y-14 text-right" dir="rtl">
      
      {/* Breadcrumb Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs sm:text-sm font-black">
            <Heart className="w-4 h-4 text-blue-600" />
            <span>سامانه سلامت همرا کلینیک</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            درباره‌ی ما و اطلاعات کامل ارتباطی
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl font-medium">
            همرا کلینیک شبکه تخصصی مراکز پزشکی و درمانی کشور است که دسترسی آسان، شفاف و هوشمند بیماران به برترین پزشکان، دپارتمان‌های پاراکلینیک و نوبت‌دهی آنلاین را فراهم آورده است.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="tel:02122886900"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>تماس فوری با خط ویژه: ۰۲۱-۲۲۸۸۶۹۰۰</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBookingModal ? onOpenBookingModal() : navigate('/doctors')}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>دریافت نوبت اینترنتی</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Values & Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 font-black">
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className="block text-xl sm:text-2xl font-black text-slate-900">+۵۰</span>
          <span className="text-xs text-slate-500 font-medium">پزشک و فوق تخصص</span>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-black">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="block text-xl sm:text-2xl font-black text-slate-900">۴ مرکز</span>
          <span className="text-xs text-slate-500 font-medium">تهران و قم</span>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2 font-black">
            <Activity className="w-6 h-6" />
          </div>
          <span className="block text-xl sm:text-2xl font-black text-slate-900">+۱۵۰,۰۰۰</span>
          <span className="text-xs text-slate-500 font-medium">نوبت و مشاوره موفق</span>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="block text-xl sm:text-2xl font-black text-slate-900">۱۰۰٪</span>
          <span className="text-xs text-slate-500 font-medium">طرف قرارداد بیمه‌های اصلی</span>
        </div>
      </div>

      {/* Branches & Clinics with Direct Contacts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase">اطلاعات شعب و مطب‌ها</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            آدرس دقیق و شماره تلفن‌های شعب
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {branches.map((branch, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.name}</span>
              </h3>

              <div className="text-xs text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{branch.address}</span>
              </div>

              <div className="text-xs text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{branch.hours}</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                <a
                  href={branch.telLink}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-800"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>{branch.phone}</span>
                </a>

                <a
                  href={`https://neshan.org/maps/search/${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
                >
                  <span>مسیریابی</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Doctor: Dr. Saeid Ghorashi Showcase Link */}
      <div className="bg-gradient-to-r from-[#05263f] to-[#0a3556] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#8be022] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پرتال اختصاصی پزشک برجسته</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            وبسایت و رزومه رسمی دکتر سعید قریشی
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            جهت مشاهده گالری قبل و بعد ارتودنسی، درمان‌های نوین بدون کشیدن دندان، ویدیوهای مصاحبه و رزرو نوبت ویزیت دکتر سعید قریشی کلیک کنید.
          </p>
        </div>

        <Link
          to="/site/dr-saeid-ghoreishi"
          className="shrink-0 bg-[#8be022] hover:bg-[#7ecc1b] text-[#05263f] font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          ورود به وبسایت دکتر قریشی ←
        </Link>
      </div>

      {/* Contact Form & Messaging */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-blue-600">پاسخگویی سریع</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ارسال پیام یا پرسش به همرا کلینیک
            </h2>
            <p className="text-xs text-slate-500">
              همکاران ما در بخش پذیرش و مشاوره در کوتاه‌ترین زمان پاسخگوی شما خواهند بود.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-black text-slate-900 text-base">پیام شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-slate-600">
                کد رهگیری پیام شما: <strong className="font-mono text-emerald-800">{trackingNumber}</strong>
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="مثال: مریم کریمی"
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-left font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">دپارتمان یا بخش مرتبط</label>
                <select
                  value={contactForm.department}
                  onChange={e => setContactForm({ ...contactForm, department: e.target.value })}
                  className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right"
                >
                  <option value="general">مشاوره عمومی و راهنمایی نوبت</option>
                  <option value="orthodontics">مرکز ارتودنسی دکتر سعید قریشی</option>
                  <option value="cardiology">کلینیک قلب و عروق</option>
                  <option value="radiology">بخش تصویربرداری و ام‌آر‌آی</option>
                  <option value="insurance">امور بیمه و مالی</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">متن پیام یا پرسش</label>
                <textarea
                  rows={3}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="متن پیام خود را بنویسید..."
                  className="w-full text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-right resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>در حال ثبت...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال پیام به مرکز پشتیبانی</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
