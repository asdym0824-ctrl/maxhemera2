import React from 'react';
import { MapPin, Phone, ExternalLink, ArrowLeft } from 'lucide-react';
import { Doctor, DoctorClinicItem } from '../../types';
import clinicInteriorImg from '../../assets/images/ortho_clinic_exterior_1790166409236.jpg';

interface Props {
  doctor: Doctor;
  onBookOffice?: (clinicName: string) => void;
  onViewAllClinics?: () => void;
}

export const DoctorSiteClinicsSection: React.FC<Props> = ({
  doctor,
  onBookOffice,
  onViewAllClinics
}) => {
  const defaultClinics: DoctorClinicItem[] = [
    {
      id: 'c1',
      name: 'مرکز تهران (شعبه ۱)',
      city: 'تهران',
      address: 'تهران، سعادت‌آباد، خیابان سرو غربی، مجتمع پزشکی، پلاک ۱۱۴',
      phone: '۰۲۱-۲۲۸۸۶۹۰۰',
      mapUrl: 'https://maps.google.com/?q=Saadat+Abad+Tehran',
      image: clinicInteriorImg,
      isCentral: true
    },
    {
      id: 'c2',
      name: 'مرکز تهران (شعبه ۲)',
      city: 'تهران',
      address: 'تهران، فرمانیه، کامرانیه شمالی، تقاطع لواسانی، پلاک ۴۸',
      phone: '۰۲۱-۲۲۸۸۶۹۰۲',
      mapUrl: 'https://maps.google.com/?q=Farmanieh+Tehran',
      image: clinicInteriorImg
    },
    {
      id: 'c3',
      name: 'مرکز تهران (شعبه ۳)',
      city: 'تهران',
      address: 'تهران، پاسداران، خیابان بوستان دوم، پلاک ۱۲',
      phone: '۰۲۱-۲۲۸۸۶۹۰۱',
      mapUrl: 'https://maps.google.com/?q=Pasdaran+Tehran',
      image: clinicInteriorImg
    },
    {
      id: 'c4',
      name: 'مرکز قم (شعبه ۴)',
      city: 'قم',
      address: 'قم، بلوار جمهوری اسلامی، ساختمان پزشکان، پلاک ۵۰',
      phone: '۰۲۵-۳۲۱۲۲۴۶۶',
      mapUrl: 'https://maps.google.com/?q=Qom+Jomhouri',
      image: clinicInteriorImg
    },
    {
      id: 'c5',
      name: 'مرکز قم (شعبه ۵)',
      city: 'قم',
      address: 'قم، میدان معلم، مجتمع پزشکان آریا، طبقه ۳، واحد ۴',
      phone: '۰۲۵-۳۲۱۲۸۳۵۲',
      mapUrl: 'https://maps.google.com/?q=Qom+Moallem',
      image: clinicInteriorImg
    }
  ];

  const clinics = doctor.clinics?.length ? doctor.clinics : defaultClinics;

  return (
    <section id="clinics" className="py-16 sm:py-20 bg-[#f6fafc]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6" dir="rtl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5 text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
              مراکز درمانی
            </h2>
            <p className="text-xs sm:text-sm text-[#718292]">
              {clinics.length} مرکز درمانی در تهران و قم
            </p>
          </div>

          <button
            onClick={onViewAllClinics}
            className="h-[42px] px-5 rounded-xl text-xs font-bold bg-[#0b3b60] hover:bg-[#072c4a] text-white shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه مراکز</span>
            <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* 5 Clinics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {clinics.map(clinic => (
            <div
              key={clinic.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#e6edf1] shadow-[0_8px_20px_rgba(20,52,75,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Clinic Image */}
              <div className="relative h-28 bg-slate-200 overflow-hidden">
                <img
                  src={clinic.image || clinicInteriorImg}
                  alt={clinic.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {clinic.isCentral && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                    شعبه مرکزی
                  </span>
                )}
              </div>

              {/* Clinic Info Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-right">
                <div className="space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0b3b60]">
                    {clinic.name}
                  </h3>
                  <p className="text-[11px] text-[#718292] leading-relaxed line-clamp-2 min-h-[34px]">
                    {clinic.address}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b3b60]">
                    <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span dir="ltr">{clinic.phone}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={clinic.mapUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold text-[#0b3b60] bg-slate-100 hover:bg-slate-200 text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-[#0b3b60]" />
                      <span>مسیریابی</span>
                    </a>

                    <button
                      onClick={() => onBookOffice?.(clinic.name)}
                      className="flex-1 py-2 px-2 rounded-xl text-[11px] font-bold text-white bg-[#0b3b60] hover:bg-[#072c4a] text-center transition-colors cursor-pointer"
                    >
                      نوبت
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
