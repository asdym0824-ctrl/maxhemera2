import React from 'react';
import { MapPin, Phone, Instagram, Send, MessageCircle, Linkedin, Youtube } from 'lucide-react';
import { Doctor } from '../../types';

interface Props {
  doctor: Doctor;
}

export const DoctorSiteTopBar: React.FC<Props> = ({ doctor }) => {
  const social = doctor.socialLinks || doctor.websiteConfig?.socialLinks;
  const centralOffice = doctor.clinics?.find(c => c.isCentral) || doctor.clinics?.[0] || doctor.offices?.[0];
  const clinicCount = doctor.clinicCount || doctor.clinics?.length || doctor.offices?.length || 5;

  return (
    <div className="bg-[#062d4b] text-white text-[13px] border-b border-[#0a385c] relative z-40">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 min-h-[44px] flex flex-wrap items-center justify-between gap-3 py-1.5" dir="rtl">
        {/* Right Info: Clinics Notice & Central Clinic Address */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 text-slate-200 text-xs sm:text-[13px]">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{clinicCount} مرکز درمانی در تهران و قم</span>
          </div>

          <span className="hidden md:inline text-slate-500">|</span>

          <div className="text-slate-300 truncate max-w-[320px] sm:max-w-md lg:max-w-xl text-[11px] sm:text-xs">
            <span className="font-semibold text-white ml-1">کلینیک مرکزی:</span>
            <span>{centralOffice?.address || 'تهران، سعادت‌آباد، میدان فرهنگ، بلوار ۲۴ متری، پلاک ۱۱، واحد ۲'}</span>
          </div>
        </div>

        {/* Left Links: Social Media Icons in LTR order */}
        <div className="flex items-center gap-3.5 text-slate-300 mr-auto shrink-0" dir="ltr">
          <a
            href={social?.instagram || 'https://instagram.com'}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-amber-300 transition-colors p-1"
            title="اینستاگرام دکتر"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={social?.telegram || 'https://telegram.org'}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="hover:text-amber-300 transition-colors p-1"
            title="کانال تلگرام"
          >
            <Send className="w-4 h-4" />
          </a>
          <a
            href={social?.whatsapp || 'https://whatsapp.com'}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hover:text-amber-300 transition-colors p-1"
            title="واتساپ پشتیبانی"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={social?.linkedin || 'https://linkedin.com'}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-amber-300 transition-colors p-1"
            title="صفحه لینکدین"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={social?.youtube || 'https://youtube.com'}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="hover:text-amber-300 transition-colors p-1"
            title="کانال یوتیوب"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
