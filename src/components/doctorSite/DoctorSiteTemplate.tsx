import React, { useState, useEffect } from 'react';
import { Doctor } from '../../types';
import { DoctorSiteTopBar } from './DoctorSiteTopBar';
import { DoctorSiteNavBar } from './DoctorSiteNavBar';
import { DoctorSiteHeroSection } from './DoctorSiteHeroSection';
import { DoctorSiteTrustBar } from './DoctorSiteTrustBar';
import { DoctorSiteServicesGrid } from './DoctorSiteServicesGrid';
import { DoctorSiteAboutAndWhy } from './DoctorSiteAboutAndWhy';
import { DoctorSiteTreatmentResults } from './DoctorSiteTreatmentResults';
import { DoctorSiteTestimonialsSection } from './DoctorSiteTestimonialsSection';
import { DoctorSiteClinicsSection } from './DoctorSiteClinicsSection';
import { DoctorSiteAppointmentCTA } from './DoctorSiteAppointmentCTA';
import { DoctorSiteFAQSection } from './DoctorSiteFAQSection';
import { DoctorSiteFooterSection } from './DoctorSiteFooterSection';
import { SubdomainSimulationBar } from './SubdomainSimulationBar';
import { CheckCircle2, X, Calendar, Phone } from 'lucide-react';

interface Props {
  doctor: Doctor;
  allDoctors?: Doctor[];
}

export const DoctorSiteTemplate: React.FC<Props> = ({
  doctor,
  allDoctors = []
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalInitialService, setBookingModalInitialService] = useState('');
  const [modalPatientName, setModalPatientName] = useState('');
  const [modalPatientPhone, setModalPatientPhone] = useState('');
  const [modalSelectedBranch, setModalSelectedBranch] = useState('مرکز سعادت‌آباد');
  const [modalSuccess, setModalSuccess] = useState(false);

  // Scroll to section handler
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenBookingModal = (serviceName?: string) => {
    setBookingModalInitialService(serviceName || 'مشاوره و ارتودنسی');
    setModalSuccess(false);
    setIsBookingModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalPatientName || !modalPatientPhone) return;
    setModalSuccess(true);
  };

  // Synchronize document title and meta
  useEffect(() => {
    const pageTitle = `${doctor.name} | ${doctor.title || 'متخصص ارتودنسی و ناهنجاری‌های فکی'}`;
    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      doctor.seoDescription || doctor.shortDescription || doctor.bio || pageTitle
    );
  }, [doctor]);

  return (
    <div className="min-h-screen bg-white text-[#173b56] font-sans antialiased selection:bg-[#c9a64a] selection:text-white" dir="rtl">
      {/* 0. Subdomain Simulation Bar (dr-saeid-ghorashi.hospital.ir) */}
      <SubdomainSimulationBar
        currentDoctor={doctor}
        availableDoctors={allDoctors.length > 0 ? allDoctors : [doctor]}
      />

      {/* 1. Top Information Bar */}
      <DoctorSiteTopBar doctor={doctor} />

      {/* 2. Main Navigation Header */}
      <DoctorSiteNavBar
        doctor={doctor}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onBookClick={handleOpenBookingModal}
        onFreeAppointmentClick={() => handleNavigateSection('booking')}
      />

      {/* 3. Hero Section */}
      <DoctorSiteHeroSection
        doctor={doctor}
        onMainCta={() => handleNavigateSection('booking')}
        onSecondaryCta={() => handleNavigateSection('results')}
      />

      {/* 4. Doctor Advantages / Trust Indicators */}
      <DoctorSiteTrustBar />

      {/* 5. Medical Services Section */}
      <DoctorSiteServicesGrid
        doctor={doctor}
        onSelectService={(serviceTitle) => handleOpenBookingModal(serviceTitle)}
        onViewAll={() => handleNavigateSection('booking')}
      />

      {/* 6. About Doctor & Why Choose & Video Presentation */}
      <DoctorSiteAboutAndWhy
        doctor={doctor}
        onMoreAboutClick={() => handleNavigateSection('booking')}
      />

      {/* 7. Treatment Results / Before & After Section */}
      <DoctorSiteTreatmentResults
        doctor={doctor}
        onViewAllResults={() => handleNavigateSection('booking')}
      />

      {/* 8. Patient Testimonials Section */}
      <DoctorSiteTestimonialsSection doctor={doctor} />

      {/* 9. Medical Centers / Clinics Section */}
      <DoctorSiteClinicsSection
        doctor={doctor}
        onBookOffice={(clinicName) => {
          setModalSelectedBranch(clinicName);
          handleOpenBookingModal(`ویزیت در ${clinicName}`);
        }}
        onViewAllClinics={() => handleNavigateSection('clinics')}
      />

      {/* 10. Appointment CTA Banner & Form */}
      <DoctorSiteAppointmentCTA
        doctor={doctor}
        onAppointmentSuccess={() => {}}
      />

      {/* 11. FAQ Section */}
      <DoctorSiteFAQSection doctor={doctor} />

      {/* 12. Footer Section */}
      <DoctorSiteFooterSection
        doctor={doctor}
        onNavigateSection={handleNavigateSection}
      />

      {/* Interactive Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0b3b60] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>رزرو نوبت مشاوره با {doctor.name}</span>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-right">
              {modalSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-black text-[#0b3b60]">
                    درخواست نوبت شما با موفقیت ثبت شد
                  </h3>
                  <p className="text-xs text-[#617588] leading-relaxed">
                    منشی کلینیک {doctor.name} جهت تایید نهایی روز و ساعت ویزیت با شماره شما تماس خواهد گرفت.
                  </p>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#0b3b60] text-white font-bold text-xs hover:bg-[#062d4b] transition-colors cursor-pointer"
                  >
                    متوجه شدم
                  </button>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div className="text-xs text-[#718292] leading-relaxed">
                    لطفاً اطلاعات تماس خود را وارد نمایید. پذیرش کلینیک با شما تماس خواهد گرفت.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b3b60] mb-1">
                      نام و نام خانوادگی بیمار
                    </label>
                    <input
                      type="text"
                      required
                      value={modalPatientName}
                      onChange={(e) => setModalPatientName(e.target.value)}
                      placeholder="مثال: رضا کریمی"
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#0b3b60] focus:ring-1 focus:ring-[#0b3b60]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b3b60] mb-1">
                      شماره تلفن همراه
                    </label>
                    <input
                      type="tel"
                      required
                      value={modalPatientPhone}
                      onChange={(e) => setModalPatientPhone(e.target.value)}
                      placeholder="۰۹۱۲..."
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#0b3b60] focus:ring-1 focus:ring-[#0b3b60]"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b3b60] mb-1">
                      مرکز درمانی انتخابی
                    </label>
                    <select
                      value={modalSelectedBranch}
                      onChange={(e) => setModalSelectedBranch(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#0b3b60]"
                    >
                      <option value="مرکز سعادت‌آباد">تهران - شعبه سعادت‌آباد</option>
                      <option value="مرکز پاسداران">تهران - شعبه پاسداران</option>
                      <option value="مرکز فرمانیه">تهران - شعبه فرمانیه</option>
                      <option value="مرکز قم - جمهوری">قم - شعبه بلوار جمهوری</option>
                      <option value="مرکز قم - معلم">قم - شعبه میدان معلم</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b3b60] mb-1">
                      علت یا خدمت مورد نظر
                    </label>
                    <input
                      type="text"
                      value={bookingModalInitialService}
                      onChange={(e) => setBookingModalInitialService(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#0b3b60]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-[#0b3b60] hover:bg-[#062d4b] text-white font-bold text-xs transition-colors shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>ثبت نوبت مشاوره</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
