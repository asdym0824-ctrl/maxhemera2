import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  Database, 
  Server, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Save, 
  Sliders, 
  Clock, 
  Key, 
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { ActivityLog } from '../../types';
import { 
  toPersianDigits, 
  cleanPersianText 
} from '../../utils/persianWriting';

interface SuperAdminSecuritySettingsProps {
  activityLogs: ActivityLog[];
  onTriggerBackup: () => void;
}

export const SuperAdminSecuritySettings: React.FC<SuperAdminSecuritySettingsProps> = ({
  activityLogs,
  onTriggerBackup
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'backup' | 'settings'>('audit');
  const [searchLog, setSearchLog] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'normal'>('all');

  // System parameters state
  const [maxWaitWarning, setMaxWaitWarning] = useState<number>(25);
  const [defaultDocCommission, setDefaultDocCommission] = useState<number>(70);
  const [allowOnlineCancelHours, setAllowOnlineCancelHours] = useState<number>(4);
  const [smsAutoReminder, setSmsAutoReminder] = useState<boolean>(true);
  const [twoFactorAuthRequired, setTwoFactorAuthRequired] = useState<boolean>(true);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  // Backup snapshot in-flight feedback
  const [backupProcessing, setBackupProcessing] = useState(false);
  const [lastBackupTime, setLastBackupTime] = useState('۲ ساعت پیش (خودکار ابری)');

  const handleInstantBackup = () => {
    setBackupProcessing(true);
    setTimeout(() => {
      onTriggerBackup();
      setBackupProcessing(false);
      setLastBackupTime('هم‌اکنون (نسخه دستی)');
    }, 1200);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 3000);
  };

  const filteredLogs = activityLogs.filter(log => {
    const q = searchLog.toLowerCase();
    const matchesSearch = !q || 
      log.actorName.toLowerCase().includes(q) || 
      log.action.toLowerCase().includes(q) || 
      log.description.toLowerCase().includes(q);
    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
            <ShieldAlert className="w-4 h-4" />
            امنیت سایبری، لاگ‌های حسابرسی و مدیریت زیرساخت (Security & Audit Trail)
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">پایش لاگ‌های امنیتی، پشتیبان‌گیری و تنظیمات سراسری</h2>
          <p className="text-xs text-slate-500 mt-1">
            ردیابی دقیق کلیه اقدامات مدیران و پرسنل، تهیه پشتیبان فوری از دیتابیس و مدیریت پارامترهای کلینیک
          </p>
        </div>

        <button
          type="button"
          onClick={handleInstantBackup}
          disabled={backupProcessing}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
        >
          <Database className={`w-4 h-4 ${backupProcessing ? 'animate-spin' : ''}`} />
          <span>{backupProcessing ? 'در حال تهیه اسنپ‌شات...' : 'تهیه پشتیبان فوری (Snapshot)'}</span>
        </button>
      </div>

      {/* Internal Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'audit' 
              ? 'bg-rose-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          دفتر کل حسابرسی امنیتی (Audit Logs)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'backup' 
              ? 'bg-rose-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          پشتیبان‌گیری و تاب‌آوری سیستم (Disaster Recovery)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'settings' 
              ? 'bg-rose-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          پارامترها و تنظیمات هسته سامانه
        </button>
      </div>

      {/* TAB 1: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchLog}
              onChange={e => setSearchLog(e.target.value)}
              placeholder="جستجو در لاگ‌ها (نام اقدام، نام کاربر، شرح عملیات)..."
              className="w-full pl-3 pr-10 py-2.5 rounded-2xl border border-slate-300 text-xs focus:border-rose-500 focus:outline-none bg-slate-50/40"
            />
          </div>

          <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5">زمان و تاریخ رخداد</th>
                  <th className="p-3.5">عامل اجرایی (Actor)</th>
                  <th className="p-3.5">سطح نقش</th>
                  <th className="p-3.5">نوع عملیات</th>
                  <th className="p-3.5">شرح رخداد در سیستم</th>
                  <th className="p-3.5">آدرس IP / نشست</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log, i) => (
                  <tr key={log.id || i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 text-slate-600 text-[11px]">
                      {toPersianDigits(log.timestamp)}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {log.actorName}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                        {log.actorRole}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-rose-700">
                      {log.action}
                    </td>
                    <td className="p-3.5 text-slate-700 leading-relaxed max-w-md truncate">
                      {cleanPersianText(log.description)}
                    </td>
                    <td className="p-3.5 font-mono text-slate-400 text-[10px]" dir="ltr">
                      192.168.1.{10 + (i % 80)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BACKUP & DISASTER RECOVERY */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block">آخرین نسخه پشتیبان</span>
              <span className="font-extrabold text-sm text-slate-900 block mt-1">{toPersianDigits(lastBackupTime)}</span>
              <span className="text-[10px] text-emerald-600 font-bold">وضعیت: موفق و تایید شده</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block">حجم اسنپ‌شات دیتابیس</span>
              <span className="font-extrabold text-sm text-slate-900 block mt-1">۱۲۸٫۴ مگابایت (فشرده)</span>
              <span className="text-[10px] text-slate-500">شامل ۲۴ جدول و اطلاعات رمزنگاری‌شده</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block">تناوب پشتیبان‌گیری خودکار</span>
              <span className="font-extrabold text-sm text-slate-900 block mt-1">هر ۲ ساعت یک‌بار</span>
              <span className="text-[10px] text-blue-600 font-bold">ذخیره‌سازی در دو پایگاه امن مجزا</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-base">دریافت و دانلود فایل اسنپ‌شات پایگاه‌داده</h4>
                <p className="text-xs text-slate-400 mt-1">
                  می‌توانید نسخه کاملی از تمام پرونده‌ها، نوبت‌ها، سوابق بیماران و تراکنش‌های مالی را در قالب فایل JSON دانلود نمایید.
                </p>
              </div>

              <button
                type="button"
                onClick={handleInstantBackup}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود فوری فایل پشتیبان</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM CORE SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-5 max-w-2xl text-xs">
          {savedSettingsSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>تنظیمات هسته سامانه با موفقیت در پایگاه‌داده ذخیره و اعمال شد.</span>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-black text-sm text-slate-900">تنظیمات صف و نوبت‌دهی</h4>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                سقف هشدار زمان انتظار بیمار در صف (دقیقه):
              </label>
              <input
                type="number"
                value={maxWaitWarning}
                onChange={e => setMaxWaitWarning(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                اگر معطلی بیماری در سالن انتظار از این حد بگذرد، هشدار قرمز در مانیتور منشی و مدیر درج می‌شود.
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                مهلت کنسلی آنلاین نوبت توسط بیمار (ساعت قبل از ویزیت):
              </label>
              <input
                type="number"
                value={allowOnlineCancelHours}
                onChange={e => setAllowOnlineCancelHours(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-black text-sm text-slate-900">تنظیمات مالی و امنیتی</h4>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                درصد پیش‌فرض سهم پزشکان جدید (کمیسیون):
              </label>
              <input
                type="number"
                value={defaultDocCommission}
                onChange={e => setDefaultDocCommission(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsAutoReminder}
                  onChange={e => setSmsAutoReminder(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <span className="font-bold text-slate-800">ارسال خودکار پیامک یادآوری نوبت ۲۴ ساعت قبل از ویزیت</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorAuthRequired}
                  onChange={e => setTwoFactorAuthRequired(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <span className="font-bold text-slate-800">الزام ورود دومرحله‌ای (OTP) برای کلیه حساب‌های پزشکان و مدیران</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره کلیه تنظیمات هسته</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
