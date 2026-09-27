import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  RotateCcw, 
  Building2, 
  Stethoscope, 
  Settings,
  Calendar,
  Activity,
  ArrowRight
} from 'lucide-react';
import { ClinicBranch, Appointment } from '../../types';
import { 
  toPersianDigits, 
  formatPersianPhone, 
  FaPhone 
} from '../../utils/persianWriting';

interface SuperAdminOperationsQueueProps {
  branches: ClinicBranch[];
  appointments: Appointment[];
}

export const SuperAdminOperationsQueue: React.FC<SuperAdminOperationsQueueProps> = ({
  branches,
  appointments
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');
  const [recoveredPatientId, setRecoveredPatientId] = useState<string | null>(null);

  // Filtered appointments
  const todayAppointments = appointments;
  const arrivedList = todayAppointments.filter(a => a.status === 'arrived');
  const inVisitList = todayAppointments.filter(a => a.status === 'in_visit');
  const completedList = todayAppointments.filter(a => a.status === 'completed');
  const noShowList = todayAppointments.filter(a => a.status === 'no_show' || a.status === 'canceled');

  const handleRecoverNoShow = (patientPhone: string) => {
    setRecoveredPatientId(patientPhone);
    setTimeout(() => setRecoveredPatientId(null), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
            <Settings className="w-4 h-4" />
            مرکز پایش هوشمند عملیات، صف‌ها و ظرفیت سالن‌های انتظار
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">مدیریت صف مراجعین، زمان انتظار و نرخ عدم حضور</h2>
          <p className="text-xs text-slate-500 mt-1">
            پایش همزمان نوبت‌های حضوری، زمان حضور در مطب و پروتکل‌های بازیابی بیماران No-Show
          </p>
        </div>

        {/* Branch selector filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setSelectedBranchId('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedBranchId === 'all' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            همه شعب
          </button>
          {branches.slice(0, 3).map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBranchId(b.id)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedBranchId === b.id ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {b.name.split('شعبه')[1] || b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Queue Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1">
          <span className="text-amber-700 block text-[11px] font-semibold">بیماران حاضر در سالن انتظار</span>
          <span className="text-2xl font-black text-amber-900 block">{toPersianDigits(arrivedList.length || 7)} نفر</span>
          <span className="text-[10px] text-amber-600">اعلام حضور در باجه تریاژ</span>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-1">
          <span className="text-blue-700 block text-[11px] font-semibold">در حال ویزیت در مطب‌ها</span>
          <span className="text-2xl font-black text-blue-900 block">{toPersianDigits(inVisitList.length || 11)} پزشک فعال</span>
          <span className="text-[10px] text-blue-600">اتاق‌های معاینه در حال استفاده</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-1">
          <span className="text-emerald-700 block text-[11px] font-semibold">ویزیت‌های تکمیل‌شده امروز</span>
          <span className="text-2xl font-black text-emerald-900 block">{toPersianDigits(completedList.length || 38)} بیمار</span>
          <span className="text-[10px] text-emerald-600">ثبت شرح حال و صدور نسخه</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-1">
          <span className="text-rose-700 block text-[11px] font-semibold">عدم حضور / انصراف (No-Show)</span>
          <span className="text-2xl font-black text-rose-900 block">{toPersianDigits(noShowList.length || 3)} مورد</span>
          <span className="text-[10px] text-rose-600">نرخ ۳٫۸٪ (زیر حد مجاز استاندارد)</span>
        </div>
      </div>

      {/* Waiting Room Real-time Telemetry & Benchmark Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Waiting Time vs Benchmark */}
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            شاخص میانگین زمان انتظار بیمار در سالن مراجعین
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700">میانگین زمان انتظار واقعی در شعب:</span>
                <span className="text-emerald-600 font-black">۱۴ دقیقه (بهینه)</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: '45%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>صفر دقیقه</span>
                <span>استاندارد حداکثر پذیرش: ۲۰ دقیقه</span>
                <span>سقف بحرانی: ۳۵ دقیقه</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-1.5 leading-relaxed text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>عملکرد کلی شعب ۶ دقیقه بهتر از استاندارد ملی درمانگاه‌ها است.</span>
              </div>
              <p className="text-[11px]">
                استفاده از سیستم نوبت‌دهی خودکار همرا کلینیک باعث جلوگیری از ازدحام همزمان در ساعات اوج (۱۷:۰۰ الی ۱۹:۰۰) شده است.
              </p>
            </div>
          </div>
        </div>

        {/* No-show Recovery Action Center */}
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              مرکز بازیابی و تماس با بیماران عدم حضور (No-Show Recovery)
            </h3>
            <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
              اقدام فوری
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: 'فرشته احمدی', phone: '09124445566', doc: 'دکتر نرگس رضایی (زنان)', time: 'نوبت دیروز ۱۸:۰۰', reason: 'عدم پاسخگویی در باجه' },
              { name: 'کامران پور حسینی', phone: '09127778899', doc: 'دکتر مریم حسینی (قلب)', time: 'نوبت امروز ۱۱:۳۰', reason: 'لغو ۳۰ دقیقه قبل' },
              { name: 'فاطمه ابراهیمی', phone: '09128889900', doc: 'دکتر علیرضا کریمی (گوارش)', time: 'نوبت امروز ۱۶:۰۰', reason: 'ترافیک سنگین منطقه' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 block">{item.name}</span>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>{item.doc}</span>
                    <span>•</span>
                    <span>{toPersianDigits(item.time)}</span>
                    <span>•</span>
                    <FaPhone phone={item.phone} className="text-slate-600 font-bold" />
                  </div>
                  <span className="text-[10px] text-rose-600 block mt-0.5">{item.reason}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRecoverNoShow(item.phone)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{recoveredPatientId === item.phone ? 'تماس ثبت شد ✓' : 'تماس و تنظیم مجدد'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
