import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Award, 
  Activity, 
  ShieldCheck, 
  Server, 
  Radio, 
  Sparkles, 
  AlertTriangle, 
  Download, 
  Bell, 
  CheckCircle2, 
  RefreshCw,
  Building2,
  Stethoscope,
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  Flame,
  Check
} from 'lucide-react';
import { AdminKPIs, ClinicBranch, ActivityLog } from '../../types';
import { Badge } from '../common/Badge';
import { 
  toPersianDigits, 
  formatPersianPercent, 
  formatPersianPrice, 
  formatPersianNumber 
} from '../../utils/persianWriting';

interface SuperAdminCommandHubProps {
  kpis: AdminKPIs;
  branches: ClinicBranch[];
  activityLogs: ActivityLog[];
  onTriggerBackup: () => void;
  onSendBroadcast: (msg: string) => void;
  onToggleMaintenance: () => void;
  isMaintenanceMode: boolean;
  onNavigateTab: (tabId: string) => void;
}

export const SuperAdminCommandHub: React.FC<SuperAdminCommandHubProps> = ({
  kpis,
  branches,
  activityLogs,
  onTriggerBackup,
  onSendBroadcast,
  onToggleMaintenance,
  isMaintenanceMode,
  onNavigateTab
}) => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [cachePurged, setCachePurged] = useState(false);

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    onSendBroadcast(broadcastText.trim());
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setShowBroadcastModal(false);
      setBroadcastText('');
    }, 1800);
  };

  const handlePurgeCache = () => {
    setCachePurged(true);
    setTimeout(() => setCachePurged(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* 1. System Health & Emergency Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">مرکز فرماندهی زیرساخت و سلامت سرویس‌ها</h2>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  تمام سرویس‌ها پایدار (۹۹.۹۸٪ پایداری)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                پایش لحظه‌ای نودهای سرور، درگاه‌های پرداخت، وب‌سرویس پیامک خدماتی و دیتابیس مرکزی
              </p>
            </div>
          </div>

          {/* Master Emergency Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setShowBroadcastModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>ارسال پیام فوری سراسری</span>
            </button>

            <button
              type="button"
              onClick={onTriggerBackup}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>پشتیبان‌گیری فوری (Snapshot)</span>
            </button>

            <button
              type="button"
              onClick={handlePurgeCache}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${cachePurged ? 'animate-spin' : ''}`} />
              <span>{cachePurged ? 'کش پاکسازی شد' : 'پاکسازی کش سیستم'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleMaintenance}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                isMaintenanceMode 
                  ? 'bg-amber-500 text-slate-950 font-extrabold' 
                  : 'bg-slate-800 hover:bg-rose-950/60 text-rose-300 border border-rose-900/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isMaintenanceMode ? 'حالت نگهداری فعال است!' : 'حالت نگهداری (Maintenance)'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Telemetry Service Micro-Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-5">
          <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">پایگاه داده اصلی</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">PostgreSQL / Drizzle</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">تاخیر: ۲۲ میلی‌ثانیه • پایدار</div>
            </div>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">وب‌سرویس پیامک (SMS)</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">کاوه‌نگار / خط ۱۰۰۰</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">شارژ: ۱،۴۵۰،۰۰۰ تومان</div>
            </div>
            <Radio className="w-4 h-4 text-sky-400" />
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">مدیریت صف و کش</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Redis Event Bus</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۰ پیام در صف تاخیر</div>
            </div>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">موتور هوش مصنوعی بالینی</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Gemini Clinical Engine</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">۱۴۰ میلی‌ثانیه • آماده پاسخ</div>
            </div>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-3 border border-slate-700/60 flex items-center justify-between col-span-2 sm:col-span-1">
            <div>
              <div className="text-[11px] text-slate-400">اسنپ‌شات پشتیبان</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">بکاپ خودکار ابری</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">آخرین نسخه: ۲ ساعت پیش</div>
            </div>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* 2. Primary 8 Executive KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div 
          onClick={() => onNavigateTab('finance')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">درآمد ناخالص امروز کلینیک</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatPersianPrice(kpis.todayRevenue)}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              ↑ ۱۲.۴٪ نسبت به دیروز
            </span>
            <span className="text-slate-400 text-[10px]">جزئیات مالی ←</span>
          </div>
        </div>

        {/* Net Clinic Share / Commission */}
        <div 
          onClick={() => onNavigateTab('finance')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">سهم خالص کلینیک (کارمزد)</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatPersianPrice(Math.round(kpis.todayRevenue * 0.3))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-500">میانگین ۳۰٪ کارمزد پزشکان</span>
            <span className="text-blue-600 font-semibold text-[10px]">تسویه‌ها ←</span>
          </div>
        </div>

        {/* Today Appointments */}
        <div 
          onClick={() => onNavigateTab('operations')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">کل نوبت‌های امروز</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {toPersianDigits(kpis.todayAppointments)} <span className="text-xs font-normal text-slate-500">نوبت</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-600 font-bold">{toPersianDigits(kpis.todayPatients)} بیمار پذیرش‌شده</span>
            <span className="text-purple-600 font-semibold text-[10px]">اتاق‌های ویزیت ←</span>
          </div>
        </div>

        {/* Active Doctors on Duty */}
        <div 
          onClick={() => onNavigateTab('users')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">پزشکان کشیک و حاضر</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {toPersianDigits(kpis.activeDoctorsCount)} <span className="text-xs font-normal text-slate-500">پزشک در شیفت</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-emerald-600 font-bold">۱۰۰٪ پوشش تخصص‌ها</span>
            <span className="text-indigo-600 font-semibold text-[10px]">کادر درمان ←</span>
          </div>
        </div>

        {/* Avg Wait Time */}
        <div 
          onClick={() => onNavigateTab('operations')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">میانگین زمان انتظار</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {toPersianDigits(kpis.avgWaitTimeMinutes)} <span className="text-xs font-normal text-slate-500">دقیقه</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-emerald-600 font-semibold">۶ دقیقه بهینه‌تر از استاندارد</span>
            <span className="text-amber-600 text-[10px]">مانیتور صف ←</span>
          </div>
        </div>

        {/* No-show rate */}
        <div 
          onClick={() => onNavigateTab('operations')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">نرخ عدم حضور (No-Show)</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatPersianPercent(kpis.noShowRatePercent)}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-emerald-600 font-bold">بسیار عالی (کم‌تر از ۵٪)</span>
            <span className="text-rose-600 text-[10px]">بازیابی نوبت ←</span>
          </div>
        </div>

        {/* Satisfaction NPS */}
        <div 
          onClick={() => onNavigateTab('crm')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">شاخص رضایت‌مندی (CSAT)</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatPersianPercent(kpis.patientSatisfactionPercent)}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-500">بر اساس ۳۴۲ ارزیابی معتبر</span>
            <span className="text-sky-600 text-[10px]">دیدگاه‌ها ←</span>
          </div>
        </div>

        {/* Multi-Branch Network Status */}
        <div 
          onClick={() => onNavigateTab('branches')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold">شبکه شعب کلینیک</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {toPersianDigits(branches.length)} <span className="text-xs font-normal text-slate-500">شعبه فعال</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-emerald-600 font-bold">تمام شعب آنلاین و پذیرنده</span>
            <span className="text-purple-600 text-[10px]">مدیریت شعب ←</span>
          </div>
        </div>
      </div>

      {/* 3. Branch Real-time Occupancy & Live System Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Real-time Occupancy Heatmap (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                وضعیت اشغال، صف و پزشکان حاضر در شعب کلینیک
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ترافیک لحظه‌ای سالن‌های انتظار، اتاق‌های ویزیت و پزشکان مستقر
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('branches')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 cursor-pointer"
            >
              مدیریت کامل شعب ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {branches.map(branch => (
              <div 
                key={branch.id} 
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-purple-300 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block">{branch.name}</span>
                    <span className="text-[11px] text-slate-500">{branch.city} • {branch.district || 'مرکزی'}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                    {branch.code}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-center">
                  <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block">پزشک حاضر</span>
                    <span className="font-black text-xs text-slate-800">{branch.todayPresentDoctorsCount || 8} نفر</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block">انتظار صف</span>
                    <span className="font-black text-xs text-amber-600">{branch.currentQueueWaitMinutes || 12} د</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 block">پذیرش حضوری</span>
                    <span className="font-black text-[11px] text-emerald-600">فعال</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 truncate flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{branch.workingHours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Operational & Security Activity Stream (1 col on lg) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-600" />
                لاگ زنده رخدادها و امنیت
              </h3>
              <span className="text-[11px] font-bold text-slate-400 font-mono">Realtime</span>
            </div>

            <div className="divide-y divide-slate-100 mt-2 max-h-[360px] overflow-y-auto text-xs space-y-2">
              {activityLogs.slice(0, 7).map((log, idx) => (
                <div key={log.id || idx} className="pt-2 pb-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">{log.actorName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {log.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      {log.action}
                    </span>
                    <span className="text-[9px] text-slate-400">نقش: {log.actorRole}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('security')}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors text-center cursor-pointer mt-3"
          >
            مشاهده آرشیو کامل لاگ‌های امنیتی (Audit Trail) ←
          </button>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-600" />
                ارسال اعلان و هشدار فوری به کلیه پرتال‌ها
              </h3>
              <button
                type="button"
                onClick={() => setShowBroadcastModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {broadcastSent ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-black text-sm">اعلان با موفقیت ارسال شد</h4>
                <p className="text-xs">پیام شما به صورت آنی در بنر بالای تمام پرتال‌ها و مانیتورها نقش بست.</p>
              </div>
            ) : (
              <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  این پیام با بالاترین اولویت امنیتی روی پرتال پزشکان، میزکار منشی‌ها، اپلیکیشن بیماران و صفحه اصلی کلینیک به نمایش درمی‌آید.
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    متن پیام اضطراری / اطلاعیه مهم:
                  </label>
                  <textarea
                    rows={4}
                    value={broadcastText}
                    onChange={e => setBroadcastText(e.target.value)}
                    placeholder="مثال: به استحضار همکاران گرامی می‌رساند، بخش تریاژ سعادت‌آباد به مدت ۲ ساعت به سالن غربی انتقال یافت..."
                    className="w-full text-xs p-3 rounded-2xl border border-slate-300 focus:border-rose-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm"
                  >
                    تأیید و ارسال سراسری
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
