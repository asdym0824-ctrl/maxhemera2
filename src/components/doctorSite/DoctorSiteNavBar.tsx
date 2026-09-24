import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, ChevronDown } from 'lucide-react';
import { Doctor } from '../../types';
import { DoctorToothLogo } from './DoctorToothLogo';

interface Props {
  doctor: Doctor;
  activeSection?: string;
  onNavigateSection: (sectionId: string) => void;
  onBookClick: (note?: string) => void;
  onFreeAppointmentClick?: () => void;
}

export const DoctorSiteNavBar: React.FC<Props> = ({
  doctor,
  activeSection = 'hero',
  onNavigateSection,
  onBookClick,
  onFreeAppointmentClick
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'خانه' },
    {
      id: 'about',
      label: `درباره ${doctor.name.replace(/^دکتر\s*/, 'دکتر ')}`,
      hasDropdown: true,
      children: [
        { id: 'about', label: 'زندگینامه و مدارک علمی' },
        { id: 'why-doctor', label: 'چرا این پزشک؟' },
        { id: 'video-intro', label: 'ویدیو معرفی و فلسفه درمان' }
      ]
    },
    { id: 'services', label: 'خدمات' },
    { id: 'clinics', label: 'مراکز درمانی' },
    { id: 'booking', label: 'هزینه و شرایط درمان' },
    { id: 'results', label: 'نتایج درمان' },
    { id: 'faq', label: 'مجله ارتودنسی' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    setAboutDropdownOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#edf1f4] shadow-[0_3px_18px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[80px] flex items-center justify-between gap-4" dir="rtl">
        {/* Right: Brand Logo */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="cursor-pointer shrink-0 transition-opacity hover:opacity-95"
        >
          <DoctorToothLogo
            doctorName={doctor.name}
            specialtyText={doctor.specialtyName || 'متخصص ارتودنسی و ناهنجاری‌های فکی'}
            subtitle={doctor.slug ? `Dr. ${doctor.slug.replace(/^dr-/, '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}` : 'Dr. Specialist'}
          />
        </div>

        {/* Center: Navigation Menu (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6 text-[14px] font-semibold text-[#466276]">
          {menuItems.map(item => {
            const isActive = activeSection === item.id;

            if (item.hasDropdown) {
              return (
                <div key={item.id} className="relative group py-6">
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    className={`flex items-center gap-1 transition-colors hover:text-[#0b3b60] ${
                      isActive ? 'text-[#0b3b60] font-bold' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0b3b60] transition-transform group-hover:rotate-180" />
                  </button>
                  {isActive && (
                    <span className="absolute bottom-3 right-0 left-0 h-[3px] bg-[#c9a64a] rounded-full" />
                  )}

                  {/* Dropdown Menu */}
                  <div className="absolute top-[75px] right-0 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top duration-200 z-50">
                    {item.children?.map(sub => (
                      <button
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick(sub.id);
                        }}
                        className="w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#466276] hover:text-[#0b3b60] hover:bg-slate-50 transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-6 transition-colors hover:text-[#0b3b60] ${
                  isActive ? 'text-[#0b3b60] font-bold' : ''
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-3 right-0 left-0 h-[3px] bg-[#c9a64a] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Left: Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 mr-auto">
          {/* Yellow/Golden Primary Button */}
          <button
            onClick={() => {
              if (onFreeAppointmentClick) onFreeAppointmentClick();
              else onBookClick('نوبت رایگان');
            }}
            className="h-[44px] px-4 rounded-xl text-xs font-black bg-[#f0b938] hover:bg-[#e3ac2c] text-[#062d4b] shadow-[0_6px_20px_rgba(240,185,56,0.25)] hover:shadow-lg transition-all transform active:scale-98 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#062d4b]" />
            <span>نوبت رایگان</span>
          </button>

          {/* Deep Navy Dark Button */}
          <button
            onClick={() => onBookClick('رزرو نوبت مشاوره')}
            className="h-[44px] px-4 rounded-xl text-xs font-black bg-[#0b3b60] hover:bg-[#062d4b] text-white shadow-[0_6px_20px_rgba(11,59,96,0.2)] hover:shadow-lg transition-all transform active:scale-98 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>رزرو نوبت مشاوره</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 rounded-xl text-[#0b3b60] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="منوی موبایل"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200" dir="rtl">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-[#0b3b60]'
                  : 'text-[#466276] hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                if (onFreeAppointmentClick) onFreeAppointmentClick();
                else onBookClick('نوبت رایگان');
              }}
              className="w-full py-3 rounded-xl text-xs font-black bg-[#f0b938] text-[#062d4b] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>نوبت رایگان</span>
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onBookClick('رزرو نوبت مشاوره');
              }}
              className="w-full py-3 rounded-xl text-xs font-black bg-[#0b3b60] text-white flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>رزرو نوبت مشاوره</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
