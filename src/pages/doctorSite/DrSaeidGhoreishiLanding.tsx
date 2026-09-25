import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Doctor } from '../../types';
import { apiService } from '../../services/apiService';
import { bookingIntentService } from '../../services/bookingIntentService';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Share2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Building,
  User,
  ArrowUpRight
} from 'lucide-react';
import clinicHeroBg from '../../assets/images/clinic_hero_bg_1790232681712.jpg';
import drGhorashiSentPhotoBg from '../../assets/images/dr_ghorashi_sent_photo_bg_1790240799866.jpg';
import doctorClinicScene from '../../assets/images/doctor_clinic_scene_1790233258607.jpg';
import drGhorashiInterviewFrame from '../../assets/images/dr_ghorashi_interview_frame_1790235134649.jpg';
import orthoCase1 from '../../assets/images/ortho_case_1_1790235827023.jpg';
import orthoCase2 from '../../assets/images/ortho_case_2_1790235839809.jpg';
import orthoCase3 from '../../assets/images/ortho_case_3_1790235851793.jpg';
import orthoCase4 from '../../assets/images/ortho_case_4_1790235864551.jpg';
import patientAvatar1 from '../../assets/images/patient_avatar_1_1790237183139.jpg';
import patientAvatar2 from '../../assets/images/patient_avatar_2_1790237198545.jpg';
import patientAvatar3 from '../../assets/images/patient_avatar_3_1790237213386.jpg';
import clinicBranch1 from '../../assets/images/clinic_branch_1_1790237765427.jpg';
import clinicBranch2 from '../../assets/images/clinic_branch_2_1790237780521.jpg';
import clinicBranch3 from '../../assets/images/clinic_branch_3_1790237797898.jpg';
import clinicBranch4 from '../../assets/images/clinic_branch_4_1790237809761.jpg';
import clinicBranch5 from '../../assets/images/clinic_branch_5_1790237824353.jpg';

interface DrSaeidGhoreishiLandingProps {
  doctor?: Doctor;
  onOpenWizard?: () => void;
}

export const DrSaeidGhoreishiLanding: React.FC<DrSaeidGhoreishiLandingProps> = ({ 
  doctor,
  onOpenWizard 
}) => {
  const navigate = useNavigate();

  // Navigation and Interactive States
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('مشاوره تخصصی ارتودنسی');
  const [modalOffice, setModalOffice] = useState('مرکز تهران (شعبه ۱ - سعادت‌آباد)');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Form States
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingService, setBookingService] = useState('ارتودنسی ثابت');
  const [bookingOffice, setBookingOffice] = useState('تهران - سعادت‌آباد');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<{
    name: string;
    trackingCode: string;
    service: string;
    office: string;
  } | null>(null);

  // Modal Form States
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalRequestType, setModalRequestType] = useState('مشاوره ارتودنسی');
  const [modalNotes, setModalNotes] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccessNotice, setModalSuccessNotice] = useState<string | null>(null);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scrollspy to set active menu
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'services', 'about', 'results', 'clinics', 'booking', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sectionIds[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard escape listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        setVideoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;

    setBookingSubmitting(true);
    const trackingCode = `ORT-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      // Set booking intent for doctor
      bookingIntentService.save({
        doctorId: doctor?.id || 'doc-saeid-ghoreishi',
        doctorSlug: 'dr-saeid-ghoreishi',
        doctorName: 'دکتر سعید قریشی',
        selectedDate: new Date().toISOString().split('T')[0],
        returnUrl: '/site/dr-saeid-ghoreishi',
        visitType: 'in_person',
        symptomsNote: `ثبت نوبت اولیه آنلاین - خدمت: ${bookingService} - مرکز: ${bookingOffice}`
      });

      // Quick simulated creation in system
      setTimeout(() => {
        setBookingSubmitting(false);
        setBookingSuccessData({
          name: bookingName,
          trackingCode,
          service: bookingService,
          office: bookingOffice
        });
        setBookingName('');
        setBookingPhone('');
      }, 600);
    } catch {
      setBookingSubmitting(false);
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalPhone.trim()) return;

    setModalSubmitting(true);
    setTimeout(() => {
      setModalSubmitting(false);
      setModalSuccessNotice(`درخواست مشاوره برای ${modalName} با موفقیت ثبت شد. کارشناسان پذیرش کلینیک حداکثر تا ۲ ساعت آینده با شما تماس خواهند گرفت.`);
      setModalName('');
      setModalPhone('');
      setModalNotes('');
      setTimeout(() => {
        setModalSuccessNotice(null);
        setModalOpen(false);
      }, 3500);
    }, 700);
  };

  const openBookingModalWithPreselect = (officeName?: string, serviceName?: string) => {
    if (officeName) setModalOffice(officeName);
    if (serviceName) setModalService(serviceName);
    setModalOpen(true);
  };

  const casesData = [
    {
      id: 'case-1',
      title: 'اصلاح ناهنجاری فکی',
      duration: 'در ۱۸ ماه',
      image: orthoCase1,
      alt: 'اصلاح ناهنجاری فکی قبل و بعد'
    },
    {
      id: 'case-2',
      title: 'ارتودنسی ثابت',
      duration: 'در ۱۲ ماه',
      image: orthoCase2,
      alt: 'ارتودنسی ثابت قبل و بعد'
    },
    {
      id: 'case-3',
      title: 'ارتودنسی نامرئی',
      duration: 'در ۱۳ ماه',
      image: orthoCase3,
      alt: 'ارتودنسی نامرئی قبل و بعد'
    },
    {
      id: 'case-4',
      title: 'ارتودنسی فک بالا',
      duration: 'در ۱۶ ماه',
      image: orthoCase4,
      alt: 'ارتودنسی فک بالا قبل و بعد'
    }
  ];

  const clinicsData = [
    {
      id: 'clinic-1',
      title: 'مرکز تهران (شعبه ۱)',
      address: 'تهران، سعادت‌آباد، خیابان سرو غربی، پلاک ۱۶۱',
      phone: '۰۲۱-۲۲۸۸۶۹۰۰',
      rawPhone: '02122886900',
      image: clinicBranch1,
      mapUrl: 'https://maps.google.com/?q=35.7905,51.3789'
    },
    {
      id: 'clinic-2',
      title: 'مرکز تهران (شعبه ۲)',
      address: 'تهران، نیاوران، خیابان باهنر، پلاک ۱۴',
      phone: '۰۲۱-۲۲۸۸۶۹۰۲',
      rawPhone: '02122886902',
      image: clinicBranch2,
      mapUrl: 'https://maps.google.com/?q=35.8116,51.4682'
    },
    {
      id: 'clinic-3',
      title: 'مرکز تهران (شعبه ۳)',
      address: 'تهران، پاسداران، خیابان بوستان، پلاک ۴۸',
      phone: '۰۲۱-۲۲۸۸۶۹۰۳',
      rawPhone: '02122886903',
      image: clinicBranch3,
      mapUrl: 'https://maps.google.com/?q=35.7592,51.4555'
    },
    {
      id: 'clinic-4',
      title: 'مرکز قم (شعبه ۴)',
      address: 'قم، بلوار جمهوری، پلاک ۵۰',
      phone: '۰۲۵-۳۲۱۸۳۳۴۵',
      rawPhone: '02532183345',
      image: clinicBranch4,
      mapUrl: 'https://maps.google.com/?q=34.6401,50.8764'
    },
    {
      id: 'clinic-5',
      title: 'مرکز قم (شعبه ۵)',
      address: 'قم، بلوار صدوقی، مجتمع پزشکی نوآ',
      phone: '۰۲۵-۳۲۱۸۳۳۵۲',
      rawPhone: '02532183352',
      image: clinicBranch5,
      mapUrl: 'https://maps.google.com/?q=34.6291,50.8652'
    }
  ];

  const faqData = [
    {
      q: 'اولین جلسه مشاوره چگونه است؟',
      a: 'در جلسه اول، وضعیت دندان‌ها و فک به طور جامع معاینه می‌شود، نیازهای درمانی شفاف‌سازی شده، تصاویر فک و اسکن‌های داخل دهانی ارزیابی می‌شوند و در صورت نیاز برنامه زمان‌بندی و نوع سیستم ارتودنسی مناسب برای شما مشخص می‌گردد.'
    },
    {
      q: 'ارتودنسی برای چه سنی مناسب است؟',
      a: 'ارتودنسی محدودیت سنی ندارد! کودکان از سن ۷ سالگی جهت مداخله زودهنگام و هدایت رشد فک می‌توانند ویزیت شوند و بزرگسالان حتی تا سنین ۵۰ و ۶۰ سالگی با داشتن لثه‌های سالم می‌توانند از درمان‌های ارتودنسی ثابت یا نامرئی بهره‌مند شوند.'
    },
    {
      q: 'مدت درمان ارتودنسی چقدر است؟',
      a: 'مدت درمان به نوع و شدت ناهنجاری، سن، روش انتخابی (ثابت، نامرئی، لینگوال) و میزان همکاری بیمار در مراجعات دوره‌ای بستگی دارد. به طور متوسط درمان‌ها بین ۱۲ الی ۲۴ ماه به طول می‌انجامند.'
    },
    {
      q: 'آیا ارتودنسی نامرئی برای همه مناسب است؟',
      a: 'برای اکثر ناهنجاری‌های دندانی از خفیف تا متوسط، پلاک‌های شفاف نامرئی (Aligners) انتخابی بسیار عالی و راحت هستند. در ناهنجاری‌های شدید اسکلتی و جراحی فک، ترکیب روش‌ها پس از معاینه تخصصی به بیمار توصیه می‌شود.'
    }
  ];

  return (
    <div className="dr-ghorashi-page font-vazir text-[#173b56] bg-[#f8fbfd] min-h-screen selection:bg-[#0b3b60] selection:text-white" dir="rtl">
      {/* Page Scoped Styles Matching User's Design Exactly */}
      <style>{`
        .dr-ghorashi-page {
          --navy:#0b3b60; --navy2:#062d4b; --blue:#13537d; --gold:#c9a64a;
          --gold2:#e3c76c; --green:#75e51c; --ink:#173b56; --muted:#718292;
          --bg:#f8fbfd; --white:#fff; --line:#e6edf2; --shadow:0 14px 45px rgba(15,54,82,.10);
          --radius:22px; --container:1200px;
        }
        .container-custom {
          width: min(var(--container), calc(100% - 36px));
          margin: auto;
        }
        .btn-custom {
          border: 0;
          cursor: pointer;
          border-radius: 15px;
          padding: 12px 20px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.22s;
          white-space: nowrap;
        }
        .btn-primary-custom {
          background: #75e51c;
          color: #153d20;
          box-shadow: 0 8px 22px rgba(117,229,28,.18);
        }
        .btn-primary-custom:hover {
          transform: translateY(-2px);
          filter: saturate(1.08);
        }
        .btn-dark-custom {
          background: #0b3b60;
          color: #fff;
        }
        .btn-dark-custom:hover {
          background: #082f4e;
          transform: translateY(-2px);
        }
        .btn-outline-custom {
          background: #fff;
          color: #0b3b60;
          border: 1px solid #d9e4eb;
        }
        .btn-outline-custom:hover {
          background: #f0f6fa;
        }
        .hero-banner {
          position: relative;
          overflow: hidden;
          background: #f1f6fa;
        }
        .hero-banner-overlay {
          display: none;
        }
        .doctor-hero-photo {
          width: 100%;
          max-width: 580px;
          height: auto;
          object-fit: cover;
          border-radius: 1.25rem;
          box-shadow: 0 12px 30px -6px rgba(5, 38, 63, 0.12), 0 8px 12px -6px rgba(5, 38, 63, 0.06);
        }
        .wave-decor {
          display: none;
        }
        @media(max-width:850px){
          .hero-banner .hero-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .doctor-hero-photo {
            max-width: 100%;
            height: auto;
          }
        }
        @media(max-width:600px){
          .doctor-hero-photo {
            height: 380px;
            width: 310px;
          }
        }
      `}</style>

      {/* Cross-Platform Ecosystem Header Bar */}
      <div className="bg-slate-900 text-slate-200 py-1.5 px-4 text-xs border-b border-slate-800 flex items-center justify-between">
        <div className="container-custom flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-[11px] sm:text-xs">وب‌سایت اختصاصی پزشک عضو شبکه همرا کلینیک (HEMERA CLINIC)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/doctors"
              className="text-[11px] text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>جستجوی سایر متخصصین</span>
              <ChevronLeft className="w-3 h-3" />
            </Link>
            <Link
              to="/"
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-100 px-2.5 py-0.5 rounded-md font-bold transition-colors"
            >
              سامانه اصلی
            </Link>
          </div>
        </div>
      </div>

      {/* Topbar */}
      <div className="bg-[#04263f] text-white py-2 border-b border-[#083556]/60 select-none">
        <div className="container-custom min-h-[38px] flex items-center justify-between gap-4">
          {/* Right: Clinic Address & Location info in RTL (Positioned on the Right) */}
          <div className="flex items-center gap-3 text-xs text-white font-medium">
            <span className="text-[#f0bc3f] text-base leading-none">📍</span>
            <div className="flex items-center gap-1.5 text-white">
              <span>۵ مرکز درمانی در تهران و قم</span>
              <span className="w-4 h-4 rounded-full border border-white/50 grid place-items-center text-[9px] font-black text-white/90">
                ✱
              </span>
            </div>
            <span className="text-white/35 hidden md:inline">|</span>
            <span className="text-white/95 hidden md:inline">
              کلینیک مرکزی: تهران، سعادت‌آباد، میدان فرهنگ، بلوار ۲۴ متری، پلاک ۱۱، واحد ۲
            </span>
          </div>

          {/* Left: Social Media Icons in LTR (Positioned on the Left) */}
          <div className="flex items-center gap-4 text-white" dir="ltr" aria-label="شبکه‌های اجتماعی">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="text-white hover:text-[#f0bc3f] transition-colors p-0.5"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Telegram"
              className="text-white hover:text-[#f0bc3f] transition-colors p-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8-3.45 3.82-1.6 4.62-1.87 5.14-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.33z"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/989122886990" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="WhatsApp"
              className="text-white hover:text-[#f0bc3f] transition-colors p-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn"
              className="text-white hover:text-[#f0bc3f] transition-colors p-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube"
              className="text-white hover:text-[#f0bc3f] transition-colors p-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-[#edf1f4] shadow-xs">
        <div className="container-custom min-h-[84px] flex items-center justify-between gap-3 sm:gap-6">
          {/* Right: Brand Identity with Text and Tooth Icon (Positioned on the Far Right) */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-3 text-right select-none group shrink-0"
          >
            {/* Tooth Icon on the Left of the Text */}
            <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                {/* Tooth outline */}
                <path 
                  d="M 21 12 C 14 9 7 16 7 24 C 7 32 11 38 13 47 C 15 52 17 56 19 56 C 21 56 23 47 26 39 C 28 33 32 33 34 39 C 37 47 39 56 41 56 C 43 56 45 52 47 47 C 49 38 53 32 53 24 C 53 16 46 9 39 12 C 34 13.5 32 17 30 17 C 28 17 26 13.5 21 12 Z" 
                  stroke="#0b3b60" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Intertwining golden orthodontic arch curve */}
                <path 
                  d="M 5 36 C 11 44 20 49 30 49 C 40 49 49 44 55 36" 
                  stroke="#eab643" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 6 36 C 12 28 20 25 30 25 C 40 25 48 28 54 36" 
                  stroke="#eab643" 
                  strokeWidth="2.4" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col text-right leading-tight">
              <span className="font-extrabold text-base sm:text-[17.5px] text-[#0b3b60] tracking-tight">Dr. Ghorashi</span>
              <span className="font-black text-sm sm:text-[15px] text-[#0b3b60] mt-0.5">دکتر سعید قریشی</span>
              <span className="font-bold text-[9.5px] sm:text-[10px] text-[#1e4767] mt-0.5">متخصص ارتودنسی و ناهنجاری‌های فکی</span>
            </div>
          </a>

          {/* Center: Desktop Nav Menu */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 text-[13.5px] font-bold text-[#173b56]">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="text-[#c9a64a] font-extrabold flex flex-col items-center py-2 whitespace-nowrap relative group"
            >
              <span>خانه</span>
              <span className="w-5 h-[3px] bg-[#c9a64a] rounded-full mt-1"></span>
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="flex items-center gap-1 hover:text-[#0b3b60] transition-colors py-2 whitespace-nowrap"
            >
              <span>درباره دکتر قریشی</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className="hover:text-[#0b3b60] transition-colors py-2 whitespace-nowrap"
            >
              خدمات
            </a>
            <a 
              href="#clinics" 
              onClick={(e) => scrollToSection(e, 'clinics')}
              className="hover:text-[#0b3b60] transition-colors py-2 whitespace-nowrap"
            >
              مراکز درمانی
            </a>
            <a 
              href="#booking" 
              onClick={(e) => scrollToSection(e, 'booking')}
              className="hover:text-[#0b3b60] transition-colors py-2 whitespace-nowrap"
            >
              هزینه و شرایط درمان
            </a>
            <a 
              href="#results" 
              onClick={(e) => scrollToSection(e, 'results')}
              className="hover:text-[#0b3b60] transition-colors py-2 whitespace-nowrap"
            >
              نتایج درمان
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:text-[#0b3b60] transition-colors py-2 whitespace-nowrap"
            >
              مجله ارتودنسی
            </a>
          </nav>

          {/* Left: Action Pill Buttons (Positioned on the Far Left) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark Navy Pill Button: رزرو نوبت مشاوره */}
            <button 
              onClick={() => openBookingModalWithPreselect()}
              className="inline-flex items-center gap-2 bg-[#0c324c] hover:bg-[#082438] text-white font-black text-xs sm:text-[13.5px] px-4 sm:px-5 py-2.5 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>رزرو نوبت مشاوره</span>
              <Calendar className="w-4 h-4 text-white shrink-0" />
            </button>

            {/* Gold Pill Button: نوبت رایگان (Far Left edge of screen) */}
            <button 
              type="button"
              onClick={() => openBookingModalWithPreselect()}
              className="inline-flex items-center gap-2 bg-[#f0bc3f] hover:bg-[#e4b036] text-[#0c324c] font-black text-xs sm:text-[13.5px] px-4 sm:px-5 py-2.5 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>نوبت رایگان</span>
              <Phone className="w-4 h-4 fill-current rotate-[-15deg] shrink-0" />
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="xl:hidden bg-none border-0 text-2xl text-[#0b3b60] cursor-pointer p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="باز کردن منو"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#e5edf1] px-5 py-4 shadow-xl flex flex-col gap-2 font-bold text-sm">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="py-2.5 text-[#0b3b60] border-b border-slate-100"
            >
              خانه
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="py-2.5 text-slate-700 hover:text-[#0b3b60] border-b border-slate-100"
            >
              درباره دکتر قریشی
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className="py-2.5 text-slate-700 hover:text-[#0b3b60] border-b border-slate-100"
            >
              خدمات تخصصی
            </a>
            <a 
              href="#results" 
              onClick={(e) => scrollToSection(e, 'results')}
              className="py-2.5 text-slate-700 hover:text-[#0b3b60] border-b border-slate-100"
            >
              نتایج درمان‌ها
            </a>
            <a 
              href="#clinics" 
              onClick={(e) => scrollToSection(e, 'clinics')}
              className="py-2.5 text-slate-700 hover:text-[#0b3b60] border-b border-slate-100"
            >
              مراکز درمانی
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="py-2.5 text-slate-700 hover:text-[#0b3b60] border-b border-slate-100"
            >
              اطلاعات تماس
            </a>
            <div className="pt-3 flex gap-2">
              <button 
                type="button"
                onClick={() => { setMenuOpen(false); openBookingModalWithPreselect(); }}
                className="btn-custom btn-primary-custom flex-1 text-xs py-2.5"
              >
                نوبت رایگان
              </button>
              <button 
                onClick={() => { setMenuOpen(false); openBookingModalWithPreselect(); }}
                className="btn-custom btn-dark-custom flex-1 text-xs py-2.5"
              >
                رزرو مشاوره
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="home">
        {/* Hero Section */}
        <section className="hero-banner relative bg-gradient-to-b from-[#f8fafc] via-[#f1f6fa] to-[#edf3f8] py-8 lg:py-14 border-b border-slate-100">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10 hero-grid">
            {/* Doctor Column (RIGHT side on desktop: Col 1-6 in RTL) - Clean unedited photo */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex items-center justify-center relative select-none">
              <img 
                className="doctor-hero-photo w-full max-w-[580px] h-auto object-cover rounded-2xl shadow-xl border border-white" 
                src={drGhorashiSentPhotoBg}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/dr-ghorashi-hero-bg.jpg';
                }}
                alt="دکتر سعید قریشی متخصص ارتودنسی" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Text Column (LEFT side on desktop: Col 7-12 in RTL) */}
            <div className="lg:col-span-6 order-1 lg:order-2 py-4 sm:py-6 max-w-[560px] mx-auto text-center flex flex-col items-center justify-center">
              {/* Golden Subtitle */}
              <div className="text-[#c79a32] font-black text-sm sm:text-[15.5px] mb-2 tracking-normal">
                متخصص ارتودنسی و ناهنجاری‌های فکی
              </div>

              {/* Main Heading: دکتر سعید قریشی */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.15] text-[#05263f] tracking-tight mb-2">
                دکتر سعید قریشی
              </h1>

              {/* Second Heading: متخصص ارتودنسی در تهران */}
              <h2 className="text-2xl sm:text-3xl lg:text-[31px] font-black leading-tight text-[#072d4b] mb-4">
                متخصص ارتودنسی در تهران
              </h2>

              {/* Description paragraph (centered) */}
              <p className="text-[#3c576c] font-medium text-sm sm:text-[15px] leading-[1.85] max-w-[490px] mb-7 mx-auto">
                با بیش از ۲۰ سال تجربه در درمان‌های تخصصی ارتودنسی،
                <br className="hidden sm:inline" />
                با برنامه درمانی اختصاصی و استفاده از جدیدترین روش‌های علمی
                <br className="hidden sm:inline" />
                و تکنولوژی روز دنیا، لبخندی سالم و زیبا برای شما می‌سازم.
              </p>
              
              {/* CTA Action Buttons (side-by-side in RTL: Navy on right, Lime Green on left) */}
              <div className="flex items-center justify-center gap-3.5 sm:gap-4 mb-8 flex-wrap">
                {/* Dark Navy Pill Button: مشاهده نتایج درمان (Right in RTL) */}
                <a 
                  className="bg-[#05263f] hover:bg-[#031b2e] text-white font-bold text-sm sm:text-[15px] px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap" 
                  href="#results"
                  onClick={(e) => scrollToSection(e, 'results')}
                >
                  مشاهده نتایج درمان
                </a>

                {/* Bright Lime Green Pill Button: ارائه طرح درمان دندان (Left in RTL) */}
                <a 
                  className="bg-[#8be022] hover:bg-[#7ecc1b] text-[#05263f] font-black text-sm sm:text-[15px] px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(139,224,34,0.35)] transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap" 
                  href="#booking"
                  onClick={(e) => scrollToSection(e, 'booking')}
                >
                  ارائه طرح درمان دندان
                </a>
              </div>

              {/* Statistics Strip (3 items with dividers) */}
              <div className="flex items-center justify-center gap-0 max-w-[500px] mx-auto pt-2 select-none">
                {/* Item 1 (Right): ۴ مرکز درمانی */}
                <div className="flex flex-col items-center text-center px-4 sm:px-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#05263f] mb-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 2H9c-1.1 0-2 .9-2 2v3H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 8H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm6 12h-4v-2h2v-2h-2v-2h2v-2h-2V9h4v10zm2-12h-2V5h2v2z"/>
                  </svg>
                  <span className="font-black text-[#05263f] text-base sm:text-lg whitespace-nowrap">۴ مرکز درمانی</span>
                  <span className="font-semibold text-[#5a768c] text-xs mt-0.5 whitespace-nowrap">در تهران و قم</span>
                </div>

                {/* Divider 1 */}
                <div className="w-[1px] h-11 bg-[#cfdbe2] shrink-0"></div>

                {/* Item 2 (Center): رتبه برتر بورد تخصصی */}
                <div className="flex flex-col items-center text-center px-4 sm:px-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#05263f] mb-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span className="font-black text-[#05263f] text-base sm:text-lg whitespace-nowrap">رتبه برتر بورد تخصصی</span>
                  <span className="font-semibold text-[#5a768c] text-xs mt-0.5 whitespace-nowrap">در تهران و قم</span>
                </div>

                {/* Divider 2 */}
                <div className="w-[1px] h-11 bg-[#cfdbe2] shrink-0"></div>

                {/* Item 3 (Left): ۲۰+ سال تجربه */}
                <div className="flex flex-col items-center text-center px-4 sm:px-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#05263f] mb-1.5 fill-none stroke-[#05263f] stroke-[2.2]" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" strokeDasharray="3 2" />
                    <circle cx="12" cy="12" r="4" fill="#05263f" />
                  </svg>
                  <span className="font-black text-[#05263f] text-base sm:text-lg whitespace-nowrap">۲۰+ سال تجربه</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Value Trust Strip */}
        <section className="relative z-20 text-white select-none -mt-10 sm:-mt-14 md:-mt-20">
          {/* Asymmetric Wave Top Curve matching screenshot */}
          <div className="w-full overflow-hidden leading-none relative z-10 pointer-events-none -mb-[1px]">
            <svg 
              viewBox="0 0 1440 95" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-[45px] sm:h-[65px] md:h-[88px] block text-[#04243d]"
              preserveAspectRatio="none"
            >
              <path 
                d="M0,22 C340,76 780,88 1140,68 C1280,60 1380,48 1440,38 L1440,96 L0,96 Z" 
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Deep Navy Container with 4 Trust Items and Divider Lines */}
          <div className="bg-[#04243d] pt-2 pb-10 sm:pb-12 rounded-b-[28px] md:rounded-b-[40px] shadow-2xl">
            <div className="container-custom max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-6 lg:gap-0">
              {/* Item 1 (Right): تجربه، تخصص و اعتماد بیماران */}
              <div className="flex-1 w-full sm:w-auto flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 rounded-full border-[1.5px] border-[#dfa938] flex items-center justify-center text-[#dfa938] mb-3.5 transition-transform hover:scale-105">
                  <svg className="w-6 h-6 stroke-[#dfa938] fill-none stroke-[1.8]" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div className="text-white font-bold text-sm sm:text-[15px] leading-[1.6]">
                  <p>تجربه، تخصص و</p>
                  <p>اعتماد بیماران</p>
                </div>
              </div>

              {/* Vertical Divider 1 */}
              <div className="hidden lg:block w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0"></div>

              {/* Item 2 (Second from Right): استفاده از جدیدترین تکنولوژی‌های روز دنیا */}
              <div className="flex-1 w-full sm:w-auto flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 rounded-full border-[1.5px] border-[#dfa938] flex items-center justify-center text-[#dfa938] mb-3.5 transition-transform hover:scale-105">
                  <svg className="w-6 h-6 stroke-[#dfa938] fill-none stroke-[1.8]" viewBox="0 0 24 24">
                    <path d="M9 3h6v2.5l2.5 3v12a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 6.5 20.5V8.5L9 5.5V3z" />
                    <circle cx="12" cy="4.2" r="0.6" fill="#dfa938" />
                    <path d="M9.5 13.5l2.5-2.5 2.5 2.5-2.5 2.5z" />
                    <circle cx="12" cy="13.5" r="0.9" fill="#dfa938" />
                  </svg>
                </div>
                <div className="text-white font-bold text-sm sm:text-[15px] leading-[1.6]">
                  <p>استفاده از جدیدترین</p>
                  <p>تکنولوژی‌های روز دنیا</p>
                </div>
              </div>

              {/* Vertical Divider 2 */}
              <div className="hidden lg:block w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0"></div>

              {/* Item 3 (Third from Right / Second from Left): درمان‌های دقیق و با برنامه اختصاصی */}
              <div className="flex-1 w-full sm:w-auto flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 rounded-full border-[1.5px] border-[#dfa938] flex items-center justify-center text-[#dfa938] mb-3.5 transition-transform hover:scale-105">
                  <svg className="w-6 h-6 stroke-[#dfa938] fill-none stroke-[1.8]" viewBox="0 0 24 24">
                    <path d="M12 2.5L5 5.5v6.5c0 5 3.5 9 7 10 3.5-1 7-5 7-10V5.5L12 2.5z" />
                    <path d="M12 7.5v8M8.5 9.5l7 4M15.5 9.5l-7 4" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-white font-bold text-sm sm:text-[15px] leading-[1.6]">
                  <p>درمان‌های دقیق و</p>
                  <p>با برنامه اختصاصی</p>
                </div>
              </div>

              {/* Vertical Divider 3 */}
              <div className="hidden lg:block w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0"></div>

              {/* Item 4 (Far Left): ارتودنسی برای همه گروه‌های سنی */}
              <div className="flex-1 w-full sm:w-auto flex flex-col items-center text-center px-4">
                <div className="w-14 h-14 rounded-full border-[1.5px] border-[#dfa938] flex items-center justify-center text-[#dfa938] mb-3.5 transition-transform hover:scale-105">
                  <svg className="w-6 h-6 stroke-[#dfa938] fill-none stroke-[1.8]" viewBox="0 0 24 24">
                    <path d="M7 4C4.5 4 3 6 3 9c0 3.5 1.5 7 2.5 11 .6 2.2 1.8 2.5 2.5 2.5s1.5-2 2-4c.4-1.6 1.2-1.8 2-1.8s1.6.2 2 1.8c.5 2 1.3 4 2 4s1.9-.3 2.5-2.5c1-4 2.5-7.5 2.5-11 0-3-1.5-5-4-5-1.5 0-2.2.8-3 1.5-.8-.7-1.5-1.5-3-1.5z" />
                    <rect x="9.5" y="8" width="5" height="4" rx="1" />
                    <line x1="6.5" y1="10" x2="17.5" y2="10" />
                  </svg>
                </div>
                <div className="text-white font-bold text-sm sm:text-[15px] leading-[1.6]">
                  <p>ارتودنسی برای</p>
                  <p>همه گروه‌های سنی</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-[#f9fbfd] to-[#f4f7f9] relative" id="services">
          <div className="container-custom">
            {/* Header: Title Centered with Sparkle Accent, Button on Top-Right */}
            <div className="relative mb-10 text-center">
              {/* "مشاهده همه خدمات" Button on Top Right (in RTL right-0) */}
              <div className="flex justify-end mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-1 z-10">
                <a 
                  className="inline-flex items-center px-5 py-2 rounded-full border border-[#d5e2eb] bg-white text-[#05263f] text-xs font-bold hover:bg-[#f0f6fa] hover:border-[#b8d1e3] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-95" 
                  href="#booking"
                  onClick={(e) => scrollToSection(e, 'booking')}
                >
                  مشاهده همه خدمات
                </a>
              </div>

              {/* Centered Heading */}
              <div className="inline-flex flex-col items-center">
                <div className="flex items-center justify-center gap-1.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#05263f] tracking-tight">
                    خدمات ارتودنسی
                  </h2>
                  <span className="text-[#e5a519] text-xl font-bold -mt-3 select-none" aria-hidden="true">
                    ✨
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#738a9c] mt-2 font-medium">
                  ارائه‌ی کامل خدمات تخصصی ارتودنسی برای تمام سنین
                </p>
              </div>
            </div>

            {/* 7 Services Cards in exact RTL order from reference screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
              {[
                {
                  id: 'jaw-anomalies',
                  title: 'اصلاح ناهنجاری‌های فکی',
                  subtitle: 'جراحی و ارتودنسی ترکیبی',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 12c-4 3-5 10-2 18 2 5 4 10 7 10s4-7 7-12c3 5 4 12 7 12s5-5 7-10c3-8 2-15-2-18-4-3-8 0-12 3-4-3-8-6-12-3z" />
                    </svg>
                  )
                },
                {
                  id: 'invisalign-clear',
                  title: 'ارتودنسی نامرئی',
                  subtitle: 'الاینرهای شفاف',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 11c3-2 11-2 14 0 5 3 7 12 6 22-1 6-4 9-7 9s-3-4-6-7c-3 3-3 7-6 7s-6-3-7-9c-1-10 1-19 6-22z" />
                      <path d="M20 18h8M19 26h10M20 33h8" strokeDasharray="2 2" strokeWidth="1.8" />
                    </svg>
                  )
                },
                {
                  id: 'invisalign-hybrid',
                  title: 'ارتودنسی نامرئی',
                  subtitle: 'الاینرهای ترکیبی',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 14c-3 3-4 9-1 16 2 4 4 9 6 9s3-6 7-10c4 4 5 10 7 10s4-5 6-9c3-7 2-13-1-16-3-3-7 0-12 3-5-3-9-6-12-3z" />
                      <circle cx="18" cy="22" r="1.5" fill="currentColor" />
                      <circle cx="30" cy="22" r="1.5" fill="currentColor" />
                      <path d="M18 22h12" strokeDasharray="2 2" strokeWidth="1.5" />
                    </svg>
                  )
                },
                {
                  id: 'adult-ortho',
                  title: 'ارتودنسی بزرگسالان',
                  subtitle: 'بهبود فرم و عملکرد در هر سنی',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 13c3-4 15-4 18 0 4 5 5 14 3 23-1 5-4 7-6 7s-4-6-6-9c-2 3-4 9-6 9s-5-2-6-7c-2-9-1-18 3-23z" />
                      <path d="M21 21c1-1 5-1 6 0M20 28c2 2 6 2 8 0" strokeWidth="2" />
                    </svg>
                  )
                },
                {
                  id: 'fixed-braces',
                  title: 'ارتودنسی ثابت',
                  subtitle: 'با براکت‌های فلزی و سرامیکی',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 13c-4 3-5 10-2 17 2 5 4 10 6 10s4-7 7-11c3 4 5 11 7 11s4-5 6-10c3-7 2-14-2-17-4-3-8 0-11 3-3-3-7-6-11-3z" />
                      <rect x="20" y="20" width="8" height="8" rx="1.5" strokeWidth="2" />
                      <path d="M12 24h24" strokeWidth="2" />
                    </svg>
                  )
                },
                {
                  id: 'teen-ortho',
                  title: 'ارتودنسی نوجوانان',
                  subtitle: 'اصلاح لبخند و فک',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 20c6-3 22-3 28 0-3 12-11 18-14 18s-11-6-14-18z" />
                      <path d="M14 22c4 4 16 4 20 0" strokeWidth="2" />
                    </svg>
                  )
                },
                {
                  id: 'early-ortho',
                  title: 'ارتودنسی ثابت',
                  subtitle: 'درمان ناهنجاری‌های رشد',
                  svg: (
                    <svg className="w-11 h-11 text-[#083050]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 13c-4 3-5 9-2 16 2 5 3 9 6 9s4-6 6-10c2 4 4 10 6 10s4-4 6-9c3-7 2-13-2-16-4-3-7 0-10 3-3-3-6-6-10-3z" />
                      <path d="M18 20c2-1 8-1 12 0" strokeWidth="2" strokeDasharray="3 2" />
                    </svg>
                  )
                },
              ].map((srv) => (
                <article 
                  key={srv.id}
                  onClick={() => openBookingModalWithPreselect(undefined, srv.title)}
                  className="bg-white border border-[#edf2f6] rounded-[22px] py-6 px-3 sm:px-3.5 text-center min-h-[195px] sm:min-h-[205px] shadow-[0_4px_16px_rgba(5,38,63,0.03)] hover:shadow-[0_8px_25px_rgba(5,38,63,0.08)] hover:-translate-y-1.5 hover:border-[#d4e4f0] transition-all duration-300 cursor-pointer group flex flex-col items-center justify-between"
                >
                  {/* Clean Dental Line Icon */}
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {srv.svg}
                  </div>

                  {/* Text Details */}
                  <div className="mt-2 w-full">
                    <b className="text-[13px] sm:text-[13.5px] font-black block text-[#05263f] leading-snug group-hover:text-[#0a4b7a] transition-colors">
                      {srv.title}
                    </b>
                    <span className="text-[10px] sm:text-[10.5px] text-[#7e94a5] block mt-1.5 font-normal leading-tight">
                      {srv.subtitle}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 sm:py-20 bg-white relative overflow-hidden" id="about">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Column 1 on Desktop in RTL (RIGHT side of screen): Video Preview Card (Col 1-5) */}
              <div className="order-3 lg:order-1 lg:col-span-5">
                <div 
                  className="relative rounded-[28px] overflow-hidden min-h-[300px] sm:min-h-[330px] lg:min-h-[340px] shadow-[0_12px_36px_rgba(5,38,63,0.12)] border border-[#e4edf3] cursor-pointer group select-none bg-slate-900"
                  onClick={() => setVideoModalOpen(true)}
                >
                  {/* Doctor Video Thumbnail */}
                  <img 
                    src={drGhorashiInterviewFrame} 
                    alt="معرفی دکتر سعید قریشی و فلسفه درمان" 
                    className="w-full h-full object-cover min-h-[300px] sm:min-h-[330px] lg:min-h-[340px] grayscale contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/dr-ghorashi-interview.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark Cinematic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Decorative Warm Gold Blob in Bottom Right Corner */}
                  <div 
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#c99f4d]/40 blur-[14px] pointer-events-none z-10" 
                    aria-hidden="true"
                  />

                  {/* Decorative Gold Ring in Top Left Corner */}
                  <div 
                    className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-[#cca558]/35 pointer-events-none z-10" 
                    aria-hidden="true"
                  />

                  {/* Video Play Button & Caption in Lower Area */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-4">
                    {/* Play Button Icon with Frosted Glass Border */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-white/95 bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#05263f]/90 transition-all duration-300 shrink-0">
                      <svg className="w-5 h-5 text-white fill-white translate-x-0.5 drop-shadow" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Captions */}
                    <div className="text-right text-white">
                      <b className="block text-sm sm:text-base font-black tracking-tight drop-shadow-md">
                        معرفی دکتر قریشی
                      </b>
                      <span className="block text-[11px] sm:text-xs text-white/90 font-medium drop-shadow-sm mt-0.5">
                        و فلسفه درمان
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 on Desktop in RTL (CENTER of screen): 4 Features with Icon on Right and Text on Left (Col 6-8) */}
              <div className="order-2 lg:order-2 lg:col-span-3 flex flex-col justify-center gap-5 sm:gap-6">
                {[
                  {
                    title: 'تجهیزات مدرن و پیشرفته',
                    desc: 'درمان با تکنولوژی روز دنیا',
                    icon: (
                      <svg className="w-6 h-6 text-[#05263f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" strokeWidth="2.5" />
                      </svg>
                    )
                  },
                  {
                    title: 'تجربه و مهارت بالا',
                    desc: 'با بیش از ۲۰ سال سابقه',
                    icon: (
                      <svg className="w-6 h-6 text-[#05263f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="9" r="6" />
                        <path d="M12 6.5v5l3-2" />
                        <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
                      </svg>
                    )
                  },
                  {
                    title: 'برنامه درمانی اختصاصی',
                    desc: 'متناسب با شرایط هر بیمار',
                    icon: (
                      <svg className="w-6 h-6 text-[#05263f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" />
                        <path d="M9 12l2 2 4-4" />
                        <path d="M9 17h6" />
                      </svg>
                    )
                  },
                  {
                    title: 'تیم درمانی مجرب',
                    desc: 'در کنار دکتر قریشی',
                    icon: (
                      <svg className="w-6 h-6 text-[#05263f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M8.5 11.5a3.5 3.5 0 0 0 7 0" />
                      </svg>
                    )
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-end gap-3.5 group">
                    {/* Text on Left */}
                    <div className="text-right">
                      <b className="block text-[13.5px] sm:text-[14px] font-black text-[#05263f] leading-tight group-hover:text-[#0a4570] transition-colors">
                        {item.title}
                      </b>
                      <span className="block text-[11px] sm:text-[11.5px] text-[#748c9e] mt-1 font-normal">
                        {item.desc}
                      </span>
                    </div>

                    {/* Icon on Right */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] bg-white border border-[#e2ecf2] shadow-[0_2px_8px_rgba(5,38,63,0.03)] group-hover:shadow-[0_4px_14px_rgba(5,38,63,0.08)] group-hover:border-[#c5dbe9] group-hover:scale-105 flex items-center justify-center shrink-0 transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3 on Desktop in RTL (LEFT side of screen): Why Dr. Ghorashi Text & CTA (Col 9-12) */}
              <div className="order-1 lg:order-3 lg:col-span-4 lg:border-r lg:border-[#edf3f7] lg:pr-8 xl:pr-10 text-right flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <h3 className="text-2xl sm:text-[28px] font-black text-[#05263f] tracking-tight">
                      چرا دکتر قریشی؟
                    </h3>
                    <span className="text-[#e5a519] text-xl font-bold -mt-3 select-none" aria-hidden="true">
                      ✨
                    </span>
                  </div>

                  <p className="text-[13.5px] sm:text-[14px] text-[#556e82] leading-[2.1] font-normal mb-8">
                    دکتر سعید قریشی، متخصص ارتودنسی و ناهنجاری‌های فکی با بیش از ۲۰ سال تجربه، عضو هیئت علمی دانشگاه و دارای مدرک معتبر بین‌المللی، با بهره‌گیری از جدیدترین روش‌های درمانی و تیم حرفه‌ای، بهترین نتیجه را برای بیماران خود فراهم می‌کند.
                  </p>
                </div>

                <div>
                  <button 
                    type="button"
                    onClick={() => openBookingModalWithPreselect()}
                    className="bg-[#05263f] hover:bg-[#031b2e] text-white font-bold text-xs sm:text-[13px] px-7 py-3 rounded-full inline-flex items-center gap-2.5 shadow-[0_4px_14px_rgba(5,38,63,0.18)] transition-all hover:scale-[1.03] active:scale-95 group cursor-pointer"
                  >
                    <span>بیشتر درباره دکتر قریشی</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Results / Cases Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-[#f8fbfd] to-[#f3f7fa] relative overflow-hidden" id="results">
          {/* Subtle decorative background wave */}
          <div className="container-custom relative z-10">
            {/* Header: Title Centered, Button on Top-Left (in RTL) */}
            <div className="relative mb-9 text-center">
              {/* "مشاهده همه نتایج" Dark Navy Button on Top Left in RTL */}
              <div className="flex justify-start mb-3 sm:mb-0 sm:absolute sm:left-0 sm:top-1 z-10">
                <a 
                  className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#05263f] hover:bg-[#031b2e] text-white text-xs font-bold transition-all shadow-[0_3px_12px_rgba(5,38,63,0.18)] active:scale-95" 
                  href="#booking"
                  onClick={(e) => scrollToSection(e, 'booking')}
                >
                  مشاهده همه نتایج
                </a>
              </div>

              {/* Centered Heading & Subheading */}
              <div className="inline-flex flex-col items-center">
                <h2 className="text-2xl sm:text-[28px] font-black text-[#05263f] tracking-tight">
                  نتایج درمان‌های ارتودنسی
                </h2>
                <p className="text-xs sm:text-sm text-[#6c8598] mt-2 font-medium">
                  نمونه‌هایی از قبل و بعد درمان بیماران با رضایت کامل
                </p>
              </div>
            </div>

            {/* Carousel Row with Side Navigation Arrows */}
            <div className="relative flex items-center">
              {/* Left Arrow Button */}
              <button 
                type="button"
                onClick={() => setActiveCaseIndex((prev) => (prev === 0 ? casesData.length - 1 : prev - 1))}
                aria-label="مورد قبلی"
                className="hidden md:flex absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-[#dbe6ee] bg-white text-[#05263f] items-center justify-center shadow-md hover:bg-[#05263f] hover:text-white transition-all cursor-pointer select-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Right Arrow Button */}
              <button 
                type="button"
                onClick={() => setActiveCaseIndex((prev) => (prev === casesData.length - 1 ? 0 : prev + 1))}
                aria-label="مورد بعدی"
                className="hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-[#dbe6ee] bg-white text-[#05263f] items-center justify-center shadow-md hover:bg-[#05263f] hover:text-white transition-all cursor-pointer select-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* 4 Cards Grid (RTL layout matching the 4 reference cards) */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
                {casesData.map((item, idx) => (
                  <article 
                    key={item.id || idx}
                    onClick={() => {
                      setActiveCaseIndex(idx);
                      openBookingModalWithPreselect(undefined, item.title);
                    }}
                    className={`bg-white border rounded-[22px] p-2.5 pb-4 shadow-[0_4px_16px_rgba(5,38,63,0.04)] hover:shadow-[0_10px_28px_rgba(5,38,63,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                      activeCaseIndex === idx ? 'border-[#05263f]/40 ring-2 ring-[#05263f]/10' : 'border-[#edf3f7]'
                    }`}
                  >
                    {/* Split Before/After Macro Smile Image */}
                    <div className="relative rounded-[16px] overflow-hidden aspect-[16/9] w-full bg-slate-100 select-none">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/ortho-before-after.jpg';
                        }}
                      />
                      {/* Hairline Center Dividing Line */}
                      <div 
                        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-white/90 shadow-[0_0_2px_rgba(0,0,0,0.35)] pointer-events-none z-10" 
                        aria-hidden="true"
                      />
                    </div>

                    {/* Card Title & Subtitle */}
                    <div className="p-1 pt-3 text-center">
                      <b className="text-[13.5px] sm:text-[14px] font-black block text-[#05263f] leading-snug group-hover:text-[#0a4b7a] transition-colors">
                        {item.title}
                      </b>
                      <span className="block text-[11px] sm:text-xs text-[#718b9c] font-normal mt-1">
                        {item.duration}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 5 Dots Indicator Matching Reference */}
            <div className="flex justify-center items-center gap-1.5 mt-7 select-none">
              {[0, 1, 2, 3, 4].map((dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveCaseIndex(dotIdx % casesData.length)}
                  aria-label={`اسلاید ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    (activeCaseIndex % 5) === dotIdx 
                      ? 'w-2.5 h-2.5 bg-[#05263f]' 
                      : 'w-2 h-2 bg-[#cbd7e2] hover:bg-[#97abbb]'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-20 bg-white relative overflow-hidden" id="testimonials">
          <div className="container-custom">
            {/* Centered Heading */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-[28px] font-black text-[#05263f] tracking-tight">
                نظرات مراجعین
              </h2>
              <p className="text-xs sm:text-sm text-[#6c8598] mt-2 font-medium">
                رضایت بیماران، بزرگترین سرمایه ماست.
              </p>
            </div>

            {/* Testimonials Row with Side Navigation Arrows */}
            <div className="relative flex items-center">
              {/* Left Arrow Button */}
              <button 
                type="button"
                aria-label="نظر قبلی"
                className="hidden md:flex absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-[#dbe6ee] bg-white text-[#05263f] items-center justify-center shadow-md hover:bg-[#05263f] hover:text-white transition-all cursor-pointer select-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Right Arrow Button */}
              <button 
                type="button"
                aria-label="نظر بعدی"
                className="hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-[#dbe6ee] bg-white text-[#05263f] items-center justify-center shadow-md hover:bg-[#05263f] hover:text-white transition-all cursor-pointer select-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* 3 Testimonial Cards in Exact RTL Order from Reference Screenshot */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    id: 1,
                    text: 'از نتیجه درمانم خیلی راضی هستم. همه چیز دقیق و طبق برنامه پیش رفت.',
                    avatar: patientAvatar1,
                    alt: 'نظر بیمار ارتودنسی'
                  },
                  {
                    id: 2,
                    text: 'تجربه و مهارت دکتر قریشی واقعا قابل تحسین است. محیط کلینیک هم بسیار حرفه‌ای و آرامش‌بخش است.',
                    avatar: patientAvatar2,
                    alt: 'نظر بیمار ارتودنسی'
                  },
                  {
                    id: 3,
                    text: 'درمانم بسیار عالی پیش رفت و نتیجه نهایی فوق‌العاده بود از تیم دکتر قریشی خیلی ممنونم.',
                    avatar: patientAvatar3,
                    alt: 'نظر بیمار ارتودنسی'
                  }
                ].map((item) => (
                  <article 
                    key={item.id}
                    className="bg-white border border-[#edf2f6] rounded-[24px] p-6 sm:p-7 shadow-[0_4px_16px_rgba(5,38,63,0.03)] hover:shadow-[0_8px_25px_rgba(5,38,63,0.08)] hover:-translate-y-1 transition-all duration-300 min-h-[175px] flex flex-col justify-between group"
                  >
                    {/* Top Row: Patient Avatar (Right in RTL), 5 Stars (Center), User Icon Badge (Left in RTL) */}
                    <div className="flex items-center justify-between">
                      {/* Left: Round User Badge */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#e4edf3] bg-[#f8fafc] flex items-center justify-center text-[#557186] shadow-xs group-hover:border-[#c5dbe9] group-hover:text-[#05263f] transition-colors">
                        <User className="w-4 h-4 stroke-[1.9]" />
                      </div>

                      {/* Center: 5 Stars */}
                      <div className="flex items-center gap-1 text-[#f59e0b] text-sm select-none" aria-label="امتیاز ۵ از ۵">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      {/* Right: Circular Patient Avatar */}
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-[#e2ecf2] shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src={item.avatar} 
                          alt={item.alt}
                          className="w-full h-full object-cover grayscale"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/patient-avatar-1.jpg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom: Review Quote Text */}
                    <p className="text-[13px] sm:text-[13.5px] text-[#05263f] leading-[2.1] font-medium text-center mt-5 mb-1 px-1">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clinics Section */}
        <section className="py-16 sm:py-20 bg-white relative overflow-hidden" id="clinics">
          <div className="container-custom">
            {/* Header: Title on Right (RTL start), "مشاهده همه مراکز" Button on Left (RTL end) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9">
              {/* Right: Title & Subtitle */}
              <div className="text-right">
                <h2 className="text-2xl sm:text-[28px] font-black text-[#05263f] tracking-tight">
                  مراکز درمانی
                </h2>
                <p className="text-xs sm:text-sm text-[#6c8598] mt-1.5 font-medium">
                  ۵ مرکز درمانی در تهران و قم
                </p>
              </div>

              {/* Left: Dark Navy Pill Button */}
              <div>
                <button 
                  type="button"
                  onClick={() => openBookingModalWithPreselect()}
                  className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#05263f] hover:bg-[#031b2e] text-white text-xs font-bold transition-all shadow-[0_3px_12px_rgba(5,38,63,0.18)] active:scale-95 cursor-pointer" 
                >
                  مشاهده همه مراکز
                </button>
              </div>
            </div>

            {/* 5 Cards Row in Exact Screenshot LTR Alignment (1 on left, 5 on right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4" dir="ltr">
              {clinicsData.map((clinic) => (
                <article 
                  key={clinic.id} 
                  dir="rtl"
                  className="bg-white border border-[#edf2f6] rounded-[22px] p-2.5 sm:p-3 shadow-[0_4px_16px_rgba(5,38,63,0.03)] hover:shadow-[0_10px_26px_rgba(5,38,63,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-center group"
                >
                  <div>
                    {/* Clinic Panoramic Image */}
                    <div className="relative h-28 sm:h-29 rounded-[14px] overflow-hidden mb-3 bg-slate-100 select-none">
                      <img 
                        src={clinic.image} 
                        alt={clinic.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/ortho-clinic-exterior.jpg';
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-[12.5px] sm:text-[13px] font-black text-[#05263f] mb-1 group-hover:text-[#094775] transition-colors leading-snug">
                      {clinic.title}
                    </h3>

                    {/* Address */}
                    <p className="text-[10px] sm:text-[10.5px] text-[#7890a0] min-h-[30px] leading-relaxed mb-2.5 line-clamp-2 px-1">
                      {clinic.address}
                    </p>
                  </div>

                  <div>
                    {/* Phone Row */}
                    <div className="flex items-center justify-center gap-1.5 text-[11.5px] sm:text-xs font-bold text-[#05263f] mb-3 direction-ltr">
                      <span>{clinic.phone}</span>
                      <Phone className="w-3 h-3 text-[#05263f] fill-current" />
                    </div>

                    {/* "مشاهده روی نقشه" Pill Button with Map Icon */}
                    <a 
                      href={clinic.mapUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-2 px-3 border border-[#dce6ee] bg-white hover:bg-[#05263f] hover:text-white hover:border-[#05263f] text-[#05263f] text-[11px] font-bold rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs group/btn"
                    >
                      <span>مشاهده روی نقشه</span>
                      <MapPin className="w-3.5 h-3.5 stroke-[2] shrink-0" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#05263f] text-white pt-11 pb-5 border-t border-[#041c2f]" id="contact">
        <div className="container-custom">
          {/* Main 5-Column Grid matching reference image photo_2026-09-24_12-03-17.jpg in RTL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
            
            {/* Column 1 (Far Right in RTL): عضویت در خبرنامه */}
            <div className="text-right">
              <h4 className="text-xs sm:text-[13px] font-bold text-white mb-2">عضویت در خبرنامه</h4>
              <p className="text-[11px] text-[#8fa7b9] leading-relaxed mb-3">
                برای دریافت جدیدترین مقالات و اخبار ارتودنسی ایمیل خود را وارد کنید
              </p>

              {newsletterSubscribed ? (
                <div className="bg-white/10 text-emerald-300 text-[11px] py-2 px-3 rounded-full text-center border border-emerald-400/30">
                  ایمیل شما با موفقیت ثبت شد
                </div>
              ) : (
                <form 
                  className="flex items-center bg-white rounded-full p-1 pl-1 pr-3.5 shadow-sm max-w-[240px]"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubscribed(true);
                  }}
                >
                  <input 
                    placeholder="ایمیل شما" 
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full text-[11px] text-slate-800 placeholder-[#94a3b8] bg-transparent border-0 outline-none text-right font-medium"
                  />
                  <button 
                    type="submit"
                    aria-label="ارسال ایمیل"
                    className="w-7 h-7 rounded-full bg-[#8fa6b6] hover:bg-[#05263f] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Column 2 (Second from Right): خدمات ما */}
            <div className="text-right">
              <h4 className="text-xs sm:text-[13px] font-bold text-white mb-3">خدمات ما</h4>
              <ul className="space-y-2 text-[11.5px] text-[#8fa7b9]">
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">
                    ارتودنسی کودکان
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">
                    ارتودنسی بزرگسالان
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">
                    ارتودنسی نامرئی
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">
                    اصلاح ناهنجاری‌های فکی
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 (Center): دسترسی سریع */}
            <div className="text-right">
              <h4 className="text-xs sm:text-[13px] font-bold text-white mb-3">دسترسی سریع</h4>
              <ul className="space-y-2 text-[11.5px] text-[#8fa7b9]">
                <li>
                  <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors">
                    خانه
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">
                    درباره دکتر
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">
                    خدمات
                  </a>
                </li>
                <li>
                  <a href="#results" onClick={(e) => scrollToSection(e, 'results')} className="hover:text-white transition-colors">
                    نتایج درمان
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 (Second from Left): Contact Info */}
            <div className="text-right space-y-2.5">
              {/* Phone */}
              <div className="flex items-center gap-2 text-[11.5px] text-white">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="tel:02122886900" dir="ltr" className="hover:text-[#f0bc3f] transition-colors font-medium">
                  ۰۲۱-۲۲۸۸۶۹۰۰
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-[11px] text-[#8fa7b9]">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  تهران، سعادت‌آباد، میدان کاج، سرو غربی، پلاک ۱۶۱
                </span>
              </div>

              {/* Clinic Count */}
              <div className="flex items-center gap-2 text-[11px] text-[#8fa7b9]">
                <Clock className="w-3.5 h-3.5 text-[#e5b745] shrink-0" />
                <span>
                  ۵ مرکز درمانی در تهران و قم
                </span>
              </div>
            </div>

            {/* Column 5 (Far Left in RTL): Brand Block with White Tooth Icon on Left and Text on Right */}
            <div className="flex items-center gap-3.5" dir="ltr">
              {/* White Outlined Tooth Logo Symbol on Left */}
              <div className="w-12 h-12 shrink-0 select-none">
                <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                  <path
                    d="M 21 12 C 14 9 7 16 7 24 C 7 32 11 38 13 47 C 15 52 17 56 19 56 C 21 56 23 47 26 39 C 28 33 32 33 34 39 C 37 47 39 56 41 56 C 43 56 45 52 47 47 C 49 38 53 32 53 24 C 53 16 46 9 39 12 C 34 13.5 32 17 30 17 C 28 17 26 13.5 21 12 Z"
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M 5 36 C 11 44 20 49 30 49 C 40 49 49 44 55 36"
                    stroke="#ffffff"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 6 36 C 12 28 20 25 30 25 C 40 25 48 28 54 36"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Text starting right next to tooth */}
              <div className="text-left">
                <span className="block font-black text-white text-[15px] tracking-wide leading-tight">
                  Dr. Ghorashi
                </span>
                <span className="block font-extrabold text-white text-xs mt-1 leading-snug">
                  دکتر سعید قریشی
                </span>
                <span className="block text-[#8fa7b9] text-[10px] mt-0.5 leading-relaxed">
                  متخصص ارتودنسی و ناهنجاری‌های فکی
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Social Media Icons Row: Left is copyright, Right is social icons */}
          <div 
            className="border-t border-white/10 mt-10 pt-4 text-xs text-[#8fa7b9] flex flex-col sm:flex-row items-center justify-between gap-4"
            dir="ltr"
          >
            {/* Left in Screenshot: Copyright Text */}
            <p className="text-[11px] text-center sm:text-left m-0 text-[#8fa7b9]" dir="rtl">
              تمامی حقوق مادی و معنوی این سایت متعلق به دکتر سعید قریشی می‌باشد. | طراحی و توسعه: تیم تخصصی وب
            </p>

            {/* Right in Screenshot: Social Icons (Instagram, Telegram, WhatsApp, LinkedIn, YouTube) */}
            <div className="flex items-center gap-3.5 text-white shrink-0">
              {/* Instagram */}
              <a href="#" aria-label="اینستاگرام" className="text-white/80 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Telegram */}
              <a href="#" aria-label="تلگرام" className="text-white/80 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="#" aria-label="واتساپ" className="text-white/80 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" aria-label="لینکدین" className="text-white/80 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" aria-label="یوتیوب" className="text-white/80 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Bar for Mobile View */}
      <div className="fixed bottom-4 left-4 right-4 z-40 flex gap-2 sm:hidden shadow-2xl">
        <button 
          className="btn-custom btn-primary-custom flex-1 text-xs py-3 rounded-xl shadow-lg" 
          onClick={() => openBookingModalWithPreselect()}
        >
          رزرو نوبت رایگان
        </button>
        <button 
          className="btn-custom btn-dark-custom flex-1 text-xs py-3 rounded-xl shadow-lg"
          onClick={() => openBookingModalWithPreselect()}
        >
          مشاوره اختصاصی
        </button>
      </div>

      {/* Booking / Consultation Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-[#031623]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="w-full max-w-[520px] bg-white rounded-[24px] p-7 relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setModalOpen(false)}
              aria-label="بستن"
              className="absolute left-4 top-4 border-0 bg-[#f2f5f7] w-8 h-8 rounded-full cursor-pointer text-slate-600 hover:text-slate-900 grid place-items-center"
            >
              ×
            </button>

            <h3 className="text-lg font-extrabold text-[#0b3b60] mb-1">رزرو مشاوره اختصاصی</h3>
            <p className="text-xs text-[#718292] mb-5">
              اطلاعات خود را ثبت کنید تا هماهنگی زمان ویزیت توسط تیم پذیرش انجام پذیرد.
            </p>

            {modalSuccessNotice ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-xs border border-emerald-200 leading-relaxed text-center font-bold">
                {modalSuccessNotice}
              </div>
            ) : (
              <form className="grid gap-3" onSubmit={handleModalSubmit}>
                <input 
                  placeholder="نام و نام خانوادگی" 
                  required
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  className="border border-[#dfe8ed] rounded-xl p-3 text-xs outline-none bg-[#fbfdfe] focus:border-[#0b3b60]"
                />
                <input 
                  placeholder="شماره تماس (۰۹xxxxxxxxx)" 
                  required 
                  inputMode="tel"
                  value={modalPhone}
                  onChange={(e) => setModalPhone(e.target.value)}
                  className="border border-[#dfe8ed] rounded-xl p-3 text-xs outline-none bg-[#fbfdfe] focus:border-[#0b3b60]"
                />
                <select 
                  value={modalRequestType}
                  onChange={(e) => setModalRequestType(e.target.value)}
                  className="border border-[#dfe8ed] rounded-xl p-3 text-xs outline-none bg-[#fbfdfe] focus:border-[#0b3b60]"
                >
                  <option value="مشاوره ارتودنسی">مشاوره ارتودنسی</option>
                  <option value="طرح درمان">طرح درمان کامل</option>
                  <option value="پیگیری نوبت">پیگیری نوبت قبلی</option>
                  <option value="ویزیت فوری">ویزیت معاینه حضوری</option>
                </select>
                <textarea 
                  placeholder="توضیحات شما یا سوابق درمانی (اختیاری)"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="border border-[#dfe8ed] rounded-xl p-3 text-xs outline-none bg-[#fbfdfe] min-h-[90px] resize-y focus:border-[#0b3b60]"
                />
                <button 
                  className="btn-custom btn-primary-custom text-xs py-3.5 w-full rounded-xl cursor-pointer mt-1" 
                  type="submit"
                  disabled={modalSubmitting}
                >
                  {modalSubmitting ? 'در حال ارسال درخواست...' : 'ثبت درخواست'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Presentation Modal */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-slate-900 rounded-3xl p-6 text-white relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setVideoModalOpen(false)}
              className="absolute left-4 top-4 text-slate-300 hover:text-white w-8 h-8 rounded-full bg-slate-800 grid place-items-center"
            >
              ×
            </button>
            <h4 className="text-base font-bold mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              ویدیو معرفی و پیام دکتر سعید قریشی
            </h4>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center border border-slate-800">
              <img 
                src="https://images.pexels.com/photos/14235194/pexels-photo-14235194.jpeg?cs=srgb&dl=pexels-filipgrobgaard-14235194.jpg&fm=jpg" 
                alt="دکتر قریشی"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center p-6 bg-slate-900/80 rounded-2xl max-w-md border border-slate-700">
                <p className="text-sm font-bold text-white mb-2">«تعهد ما خلق لبخندی هماهنگ، زیبا و بدون بازگشت است.»</p>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  با بهره‌گیری از تکنیک‌های کم‌تهاجم و اسکنرهای دیجیتال، مسیر درمان ارتودنسی شما در کوتاه‌ترین زمان و با بیشترین راحتی طراحی خواهد شد.
                </p>
                <button
                  onClick={() => {
                    setVideoModalOpen(false);
                    openBookingModalWithPreselect();
                  }}
                  className="btn-custom btn-primary-custom text-xs py-2 px-5 rounded-xl inline-flex"
                >
                  شروع مشاوره حضوری
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
