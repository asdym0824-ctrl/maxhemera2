import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Users, 
  Navigation, 
  Activity, 
  ExternalLink, 
  ArrowLeft,
  X,
  Stethoscope,
  HeartPulse,
  Send,
  Sparkles
} from 'lucide-react';
import { Hospital, ClinicBranch } from '../../types';
import { formatToPersianDigits } from '../../utils/dateUtils';
import { ModalPortal } from '../common/ModalPortal';
import { MODAL_Z_INDEX } from '../../utils/modalManager';

export interface MedicalCenterItem {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'imaging_center' | 'day_surgery' | 'specialized';
  typeLabel: string;
  category: 'hospital' | 'clinic' | 'specialized';
  city: string;
  district: string;
  address: string;
  phone: string;
  emergencyPhone?: string;
  departments: string[];
  supportedInsurances: string[];
  activeDoctorsCount: number;
  hasEmergency24h: boolean;
  hasOnlineBooking: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  workingHours: string;
  isOpenNow: boolean;
  facilities?: string[];
  branchId?: string;
}

interface Props {
  hospitals: Hospital[];
  branches: ClinicBranch[];
  onSelectCenter?: (center: MedicalCenterItem) => void;
  onBookCenter?: (center: MedicalCenterItem) => void;
}

export const MedicalCentersHorizontalSection: React.FC<Props> = ({
  hospitals,
  branches,
  onBookCenter
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hospital' | 'clinic' | 'specialized'>('all');
  const [selectedCenter, setSelectedCenter] = useState<MedicalCenterItem | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerFormSuccess, setPartnerFormSuccess] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    centerName: '',
    centerType: 'بیمارستان خصوصی',
    city: 'تهران',
    contactPerson: '',
    phone: '',
    notes: ''
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Combine hospitals and branches into a unified, high-value list of medical centers
  const allCenters: MedicalCenterItem[] = React.useMemo(() => {
    const list: MedicalCenterItem[] = [];

    // 1. Add Hospitals
    hospitals.forEach((h, index) => {
      list.push({
        id: h.id || `hosp-${index}`,
        name: h.name,
        type: 'hospital',
        typeLabel: h.type || 'بیمارستان تخصصی و فوق تخصصی',
        category: 'hospital',
        city: h.city || 'تهران',
        district: h.district || 'تهران',
        address: h.address,
        phone: h.phone,
        emergencyPhone: h.emergencyPhone,
        departments: h.departments || ['قلب و عروق', 'ارتوپدی', 'جراحی عمومی', 'اورژانس'],
        supportedInsurances: h.supportedInsurances || ['تأمین اجتماعی', 'نیروهای مسلح (ساتا)', 'بیمه ایران', 'بیمه دانا'],
        activeDoctorsCount: h.activeDoctorsCount || 35,
        hasEmergency24h: h.hasEmergency24h ?? true,
        hasOnlineBooking: h.hasOnlineBooking ?? true,
        rating: h.rating || 4.8,
        reviewCount: 140 + index * 45,
        image: h.image || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=600',
        workingHours: 'شبانه‌روزی (۲۴ ساعته)',
        isOpenNow: true,
        facilities: ['اورژانس شبانه‌روزی', 'داروخانه شبانه‌روزی', 'بخش مراقبت‌های ویژه (ICU/CCU)', 'تصویربرداری و سی‌تی‌اسکن', 'پارکینگ اختصاصی']
      });
    });

    // 2. Add Clinic Branches
    branches.forEach((b, index) => {
      const isSpecialized = b.departments?.some(d => d.includes('تصویربرداری') || d.includes('ام‌آر‌آی') || d.includes('لیزر'));
      list.push({
        id: b.id || `branch-${index}`,
        branchId: b.id,
        name: b.name,
        type: isSpecialized ? 'specialized' : 'clinic',
        typeLabel: isSpecialized ? 'مرکز تصویربرداری و جراحی محدود' : 'درمانگاه تخصصی و فوق‌تخصصی',
        category: isSpecialized ? 'specialized' : 'clinic',
        city: b.city || 'تهران',
        district: b.district || 'تهران',
        address: b.address,
        phone: b.phone,
        emergencyPhone: b.emergencyPhone,
        departments: b.departments || ['پزشک عمومی', 'دندانپزشکی', 'قلب و عروق', 'آزمایشگاه'],
        supportedInsurances: b.supportedInsurances || ['تأمین اجتماعی', 'خدمات درمانی', 'بیمه ایران', 'بیمه البرز'],
        activeDoctorsCount: b.todayPresentDoctorsCount || 12,
        hasEmergency24h: b.workingHours?.includes('۲۴') || false,
        hasOnlineBooking: b.inPersonBookingEnabled ?? true,
        rating: 4.9,
        reviewCount: 95 + index * 30,
        image: b.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
        workingHours: b.workingHours || '۰۸:۰۰ الی ۲۲:۰۰',
        isOpenNow: b.isOpenNow ?? true,
        facilities: b.facilities || ['دسترسی آسان به مترو و اتوبوس', 'پذیرش بیمه‌های تکمیلی', 'پارکینگ اختصاصی', 'نوبت‌دهی بدون معطلی']
      });
    });

    return list;
  }, [hospitals, branches]);

  const filteredCenters = React.useMemo(() => {
    if (selectedCategory === 'all') return allCenters;
    return allCenters.filter(c => c.category === selectedCategory);
  }, [allCenters, selectedCategory]);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // In RTL, scrollLeft can be negative or positive depending on browser engine
    const absScroll = Math.abs(scrollLeft);
    const maxScroll = scrollWidth - clientWidth - 5;
    setCanScrollRight(absScroll > 10);
    setCanScrollLeft(absScroll < maxScroll);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [filteredCenters]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    // RTL: scrolling left is moving forward in Persian reading flow
    const sign = direction === 'left' ? -1 : 1;
    scrollContainerRef.current.scrollBy({
      left: sign * scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(updateScrollButtons, 350);
  };

  const handlePartnerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerFormData.centerName || !partnerFormData.phone) return;
    setPartnerFormSuccess(true);
    setTimeout(() => {
      setPartnerFormSuccess(false);
      setIsPartnerModalOpen(false);
      setPartnerFormData({
        centerName: '',
        centerType: 'بیمارستان خصوصی',
        city: 'تهران',
        contactPerson: '',
        phone: '',
        notes: ''
      });
    }, 2200);
  };

  return (
    <section 
      id="medical-centers-showcase" 
      className="relative bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-xs overflow-hidden"
    >
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 mb-2 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>شبکه جامع مراکز درمانی و بیمارستان‌ها</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-0.5" />
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            مراکز درمانی، بیمارستان‌ها و درمانگاه‌های همکار
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            دسترسی مستقیم به پزشکان مستقر، نوبت‌دهی آنلاین، بخش‌های پاراکلینیک و اورژانس شبانه‌روزی معتبرترین مراکز کشور
          </p>
        </div>

        {/* Top actions & scroll navigation buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsPartnerModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all cursor-pointer active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>درخواست همکاری مراکز</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/branches')}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <span>همه مراکز ({formatToPersianDigits(allCenters.length)})</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="مرکز قبلی"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                canScrollRight 
                  ? 'text-slate-700 hover:bg-slate-100 active:scale-95' 
                  : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="مرکز بعدی"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                canScrollLeft 
                  ? 'text-slate-700 hover:bg-slate-100 active:scale-95' 
                  : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90'
          }`}
        >
          همه مراکز ({formatToPersianDigits(allCenters.length)})
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('hospital')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategory === 'hospital'
              ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90'
          }`}
        >
          بیمارستان‌های تخصصی و فوق‌تخصصی ({formatToPersianDigits(allCenters.filter(c => c.category === 'hospital').length)})
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('clinic')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategory === 'clinic'
              ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90'
          }`}
        >
          درمانگاه‌ها و کلینیک‌های همرا ({formatToPersianDigits(allCenters.filter(c => c.category === 'clinic').length)})
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory('specialized')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategory === 'specialized'
              ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90'
          }`}
        >
          مراکز تصویربرداری و جراحی محدود ({formatToPersianDigits(allCenters.filter(c => c.category === 'specialized').length)})
        </button>
      </div>

      {/* Horizontal Centers Scroll Track */}
      <div 
        ref={scrollContainerRef}
        onScroll={updateScrollButtons}
        className="relative z-10 flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory focus:outline-none scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="w-[285px] sm:w-[325px] md:w-[350px] shrink-0 snap-start bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group select-none"
          >
            {/* Card Image Banner */}
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src={center.image}
                alt={center.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 flex-wrap">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-sm flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-400" />
                  <span>{center.typeLabel}</span>
                </span>
              </div>

              {center.hasEmergency24h && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-400/30 flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>اورژانس ۲۴ ساعته</span>
                  </span>
                </div>
              )}

              {/* Bottom Image Info: Name & Rating */}
              <div className="absolute bottom-2.5 right-3 left-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug drop-shadow-sm truncate">
                    {center.name}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-200 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="truncate">{center.city}، {center.district}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-400/90 text-slate-950 font-black text-xs px-2 py-0.5 rounded-lg shrink-0 shadow-xs">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{formatToPersianDigits(center.rating.toFixed(1))}</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3">
              {/* Highlights row */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span><strong>{formatToPersianDigits(center.activeDoctorsCount)}</strong> پزشک فعال</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{center.workingHours}</span>
                </div>
              </div>

              {/* Department tags */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 mb-1.5">بخش‌ها و تخصص‌های اصلی:</p>
                <div className="flex flex-wrap gap-1">
                  {center.departments.slice(0, 3).map((dep, i) => (
                    <span 
                      key={i}
                      className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {dep}
                    </span>
                  ))}
                  {center.departments.length > 3 && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                      +{formatToPersianDigits(center.departments.length - 3)} بخش دیگر
                    </span>
                  )}
                </div>
              </div>

              {/* Insurance info */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">
                  طرف قرارداد {formatToPersianDigits(center.supportedInsurances.length)} بیمه معتبر
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCenter(center)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-98 flex items-center justify-center gap-1"
                >
                  <span>اطلاعات و نوبت</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (center.phone) {
                      window.location.href = `tel:${center.phone.replace(/[^0-9]/g, '')}`;
                    } else {
                      setSelectedCenter(center);
                    }
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-98"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>تماس سریع</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Partnership Banner */}
      <div className="relative z-10 mt-3 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border">
        <div className="flex items-center gap-3 text-right">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              مدیر بیمارستان، کلینیک یا مرکز درمانی هستید؟
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              با پیوستن به شبکه اتوماسیون درمانگاه و بیمارستان همرا، سامانه نوبت‌دهی آنلاین و تریاژ هوشمند خود را راه‌اندازی کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsPartnerModalOpen(true)}
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
        >
          <span>پیوستن به همرا (همکاری مراکز)</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* Center Details Modal */}
      {/* ========================================================================= */}
      {selectedCenter && (
        <ModalPortal isOpen={!!selectedCenter} onClose={() => setSelectedCenter(null)}>
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
            style={{ zIndex: MODAL_Z_INDEX.BASE_MODAL }}
            onClick={() => setSelectedCenter(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 text-right space-y-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {selectedCenter.typeLabel}
                      </span>
                      {selectedCenter.hasEmergency24h && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                          اورژانس ۲۴ ساعته
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-base sm:text-lg text-slate-900 mt-1">
                      {selectedCenter.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCenter(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image & Key Stats */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={selectedCenter.image}
                  alt={selectedCenter.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3 left-3 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{selectedCenter.city}، {selectedCenter.district}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-lg text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{formatToPersianDigits(selectedCenter.rating.toFixed(1))}</span>
                    <span className="text-[10px] font-normal text-slate-800">
                      ({formatToPersianDigits(selectedCenter.reviewCount)} نظر)
                    </span>
                  </div>
                </div>
              </div>

              {/* Address & Contact Info */}
              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 border border-slate-100 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{selectedCenter.address}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>تلفن تماس: <strong>{selectedCenter.phone}</strong></span>
                  </div>
                  {selectedCenter.emergencyPhone && (
                    <div className="flex items-center gap-2 text-rose-700 font-bold">
                      <HeartPulse className="w-4 h-4 text-rose-600" />
                      <span>اورژانس: {selectedCenter.emergencyPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Departments */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span>دپارتمان‌ها و کلینیک‌های تخصصی فعال</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCenter.departments.map((dep, i) => (
                    <span 
                      key={i}
                      className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/70"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supported Insurances */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>بیمه‌های پایه و تکمیلی طرف قرارداد</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCenter.supportedInsurances.map((ins, i) => (
                    <span 
                      key={i}
                      className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80"
                    >
                      {ins}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              {selectedCenter.facilities && selectedCenter.facilities.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>امکانات و خدمات رفاهی مرکز</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                    {selectedCenter.facilities.map((fac, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCenter(null);
                    if (onBookCenter) {
                      onBookCenter(selectedCenter);
                    } else {
                      navigate(`/doctors?search=${encodeURIComponent(selectedCenter.name)}`);
                    }
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
                >
                  <Activity className="w-4 h-4" />
                  <span>مشاهده نوبت‌های فعال پزشکان این مرکز</span>
                </button>

                <a
                  href={`tel:${selectedCenter.phone.replace(/[^0-9]/g, '')}`}
                  className="sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس با پذیرش</span>
                </a>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* ========================================================================= */}
      {/* Partner Registration Modal (درخواست همکاری مراکز درمانی با همرا) */}
      {/* ========================================================================= */}
      {isPartnerModalOpen && (
        <ModalPortal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)}>
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
            style={{ zIndex: MODAL_Z_INDEX.BASE_MODAL }}
            onClick={() => !partnerFormSuccess && setIsPartnerModalOpen(false)}
          >
            <div 
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-5 sm:p-6 text-right space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">
                      درخواست همکاری مراکز درمانی و بیمارستان‌ها
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      سامانه اتوماسیون درمانگاهی و نوبت‌دهی هوشمند همرا
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {partnerFormSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">درخواست شما با موفقیت ثبت شد</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    کارشناسان واحد توسعه شبکه مراکز درمانی شرکت دانش‌بنیان همرا، حداکثر ظرف ۲۴ ساعت کاری با شما تماس خواهند گرفت.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePartnerFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">نام مرکز درمانی / بیمارستان / درمانگاه:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: بیمارستان تخصصی مهر / درمانگاه شبانه‌روزی رازی"
                      value={partnerFormData.centerName}
                      onChange={e => setPartnerFormData(prev => ({ ...prev, centerName: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-slate-800 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">نوع مرکز:</label>
                      <select
                        value={partnerFormData.centerType}
                        onChange={e => setPartnerFormData(prev => ({ ...prev, centerType: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-slate-800 outline-none transition-all"
                      >
                        <option value="بیمارستان خصوصی">بیمارستان خصوصی</option>
                        <option value="بیمارستان دولتی / آموزشی">بیمارستان دولتی / آموزشی</option>
                        <option value="درمانگاه و کلینیک شبانه‌روزی">درمانگاه و کلینیک شبانه‌روزی</option>
                        <option value="مرکز جراحی محدود">مرکز جراحی محدود</option>
                        <option value="مرکز جامع تصویربرداری">مرکز جامع تصویربرداری</option>
                        <option value="آزمایشگاه تشخیص پزشکی">آزمایشگاه تشخیص پزشکی</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">شهر و استان:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: تهران / اصفهان / شیراز"
                        value={partnerFormData.city}
                        onChange={e => setPartnerFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">نام و سمت مسئول پیگیری:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: دکتر حسینی (مدیریت درمان)"
                        value={partnerFormData.contactPerson}
                        onChange={e => setPartnerFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-slate-800 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">شماره تماس مستقیم / موبایل:</label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        placeholder="0912..."
                        value={partnerFormData.phone}
                        onChange={e => setPartnerFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-slate-800 outline-none transition-all text-left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">توضیحات بیشتر (اختیاری):</label>
                    <textarea
                      rows={2}
                      placeholder="تعداد پزشکان، بخش‌های فعال یا نیازمندی‌های سیستم نوبت‌دهی..."
                      value={partnerFormData.notes}
                      onChange={e => setPartnerFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-slate-800 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>ارسال درخواست عضویت در شبکه همرا</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
};
