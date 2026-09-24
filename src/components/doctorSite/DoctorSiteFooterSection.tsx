import React, { useState } from 'react';
import { Instagram, Send, MessageCircle, Linkedin, Youtube, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { Doctor } from '../../types';
import { DoctorToothLogo } from './DoctorToothLogo';

interface Props {
  doctor: Doctor;
  onNavigateSection?: (sectionId: string) => void;
}

export const DoctorSiteFooterSection: React.FC<Props> = ({
  doctor,
  onNavigateSection
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const social = doctor.socialLinks || doctor.websiteConfig?.socialLinks;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer id="contact" className="bg-[#041c2e] text-white pt-14 pb-8 border-t border-[#092c47]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <DoctorToothLogo
              variant="light"
              doctorName={doctor.name}
              specialtyText={doctor.specialtyName || 'متخصص ارتودنسی و ناهنجاری‌های فکی'}
              subtitle={doctor.slug ? `Dr. ${doctor.slug.replace(/^dr-/, '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}` : 'Dr. Specialist'}
            />

            <p className="text-xs text-slate-300 leading-[2] max-w-sm pt-2">
              {doctor.shortDescription ||
                'متخصص ارتودنسی و ناهنجاری‌های فکی. ارائه خدمات تخصصی با تمرکز بر تشخیص دقیق، برنامه درمانی اختصاصی و تجربه آرام برای بیمار.'}
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-white">شماره تماس مرکزی:</span>
                <span dir="ltr">۰۲۱-۲۲۸۸۶۹۰۰</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>تهران، سعادت‌آباد، میدان فرهنگ، ساختمان طلیعه، پلاک ۱۱۲</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white border-b border-white/10 pb-2 inline-block">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {['hero', 'about', 'services', 'results', 'clinics', 'faq'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigateSection?.(id)}
                    className="hover:text-amber-300 transition-colors text-right cursor-pointer"
                  >
                    {id === 'hero' && 'صفحه اصلی'}
                    {id === 'about' && `درباره ${doctor.name}`}
                    {id === 'services' && 'خدمات ارتودنسی'}
                    {id === 'results' && 'نتایج قبل و بعد'}
                    {id === 'clinics' && 'مراکز درمانی'}
                    {id === 'faq' && 'سوالات متداول'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white border-b border-white/10 pb-2 inline-block">
              خدمات ما
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigateSection?.('services')} className="hover:text-amber-300 transition-colors">
                  ارتودنسی ثابت
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('services')} className="hover:text-amber-300 transition-colors">
                  ارتودنسی نامرئی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('services')} className="hover:text-amber-300 transition-colors">
                  ارتودنسی کودکان
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('services')} className="hover:text-amber-300 transition-colors">
                  ارتودنسی بزرگسالان
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection?.('services')} className="hover:text-amber-300 transition-colors">
                  اصلاح ناهنجاری‌های فکی
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (3.5 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-black text-white border-b border-white/10 pb-2 inline-block">
              عضویت در خبرنامه
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              برای دریافت جدیدترین مقالات، مشاوره‌های بهداشتی و اطلاعیه‌های کلینیک ایمیل خود را وارد کنید:
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-xl text-xs">
                ایمیل شما با موفقیت در فهرست خبرنامه ثبت شد.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="ایمیل شما..."
                  className="flex-1 bg-transparent px-3 text-xs text-white placeholder-slate-400 focus:outline-hidden text-right"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="bg-[#c9a64a] hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="ارسال ایمیل"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>© {new Date().getFullYear()} تمامی حقوق مادی و معنوی این وبسایت متعلق به {doctor.name} می‌باشد.</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300" dir="ltr">
            <a href={social?.instagram || '#'} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors p-1" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={social?.telegram || '#'} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors p-1" aria-label="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href={social?.whatsapp || '#'} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors p-1" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={social?.linkedin || '#'} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors p-1" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={social?.youtube || '#'} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors p-1" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
