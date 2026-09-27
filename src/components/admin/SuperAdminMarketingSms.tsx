import React, { useState } from 'react';
import { 
  Megaphone, 
  Send, 
  Ticket, 
  Radio, 
  Plus, 
  CheckCircle2, 
  Users, 
  Percent, 
  Calendar, 
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { 
  toPersianDigits, 
  formatPersianPrice, 
  formatPersianNumber 
} from '../../utils/persianWriting';

interface PromoCodeItem {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscountAmount: number;
  usageCount: number;
  maxUsageLimit: number;
  expiryDate: string;
  status: 'active' | 'expired';
}

export const SuperAdminMarketingSms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'promos'>('campaigns');
  
  // Campaign Form State
  const [targetAudience, setTargetAudience] = useState('all');
  const [campaignTitle, setCampaignTitle] = useState('کمپین چکاپ سلامت پاییزه همرا کلینیک');
  const [smsMessage, setSmsMessage] = useState('مراجع گرامی همرا کلینیک، به مناسبت هفته سلامت، ۲۰٪ تخفیف برای چکاپ‌های کامل قلب و گوارش برای شما در نظر گرفته شده است. رزرو نوبت: hamrahclinic.ir/checkup');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);

  // Promo Codes State
  const [promoCodes, setPromoCodes] = useState<PromoCodeItem[]>([
    { id: 'promo-1', code: 'SALAMAT20', discountPercent: 20, maxDiscountAmount: 150000, usageCount: 84, maxUsageLimit: 200, expiryDate: '۱۴۰۵/۰۸/۳۰', status: 'active' },
    { id: 'promo-2', code: 'HEMERA_VIP', discountPercent: 30, maxDiscountAmount: 300000, usageCount: 42, maxUsageLimit: 50, expiryDate: '۱۴۰۵/۰۹/۱۵', status: 'active' },
    { id: 'promo-3', code: 'NOROOZ1405', discountPercent: 15, maxDiscountAmount: 100000, usageCount: 150, maxUsageLimit: 150, expiryDate: '۱۴۰۵/۰۱/۲۰', status: 'expired' },
    { id: 'promo-4', code: 'FIRSTCARE', discountPercent: 25, maxDiscountAmount: 120000, usageCount: 119, maxUsageLimit: 500, expiryDate: '۱۴۰۵/۱۲/۲۹', status: 'active' }
  ]);

  // New promo modal
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState<number>(20);
  const [newMaxCap, setNewMaxCap] = useState<number>(200000);
  const [newLimit, setNewLimit] = useState<number>(100);
  const [newExpiry, setNewExpiry] = useState('۱۴۰۵/۰۹/۳۰');

  const handleLaunchBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      setTimeout(() => setBroadcastDone(false), 4000);
    }, 1500);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const item: PromoCodeItem = {
      id: `promo-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discountPercent: newDiscount,
      maxDiscountAmount: newMaxCap,
      usageCount: 0,
      maxUsageLimit: newLimit,
      expiryDate: newExpiry,
      status: 'active'
    };

    setPromoCodes(prev => [item, ...prev]);
    setShowAddPromo(false);
    setNewCode('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
            <Megaphone className="w-4 h-4" />
            مرکز پیامک، بازاریابی و کدهای تخفیف کلینیک
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">مدیریت کمپین‌های جلب بیمار و کدهای تخفیف درمانی</h2>
          <p className="text-xs text-slate-500 mt-1">
            ارسال پیامک‌های انبوه با خط خدماتی بدون مسدودی بلک‌لیست، پایش نرخ تبدیل و ایجاد کوپن‌های ویزیت
          </p>
        </div>

        {/* SMS Gateway Telemetry */}
        <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-normal">خط خدماتی ۱۰۰۰۸۸۹۹</span>
            <span className="text-emerald-300">اعتبار: {formatPersianPrice(1450000)}</span>
          </div>
        </div>
      </div>

      {/* Internal Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'campaigns' 
              ? 'bg-rose-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          کمپین‌های پیامک اطلاع‌رسانی و چکاپ
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('promos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'promos' 
              ? 'bg-rose-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          کدهای تخفیف و کوپن‌های درمانی ({toPersianDigits(promoCodes.length)})
        </button>
      </div>

      {/* TAB 1: SMS CAMPAIGNS */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {broadcastDone && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>کمپین پیامکی با موفقیت به ۲٬۴۵۰ شماره تلفن همراه با خط ۱۰۰۰ ارسال شد.</span>
            </div>
          )}

          <form onSubmit={handleLaunchBroadcast} className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 space-y-4 max-w-2xl text-xs">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-rose-600" />
              تنظیم و شلیک کمپین پیامک هوشمند به مراجعین
            </h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">گروه هدف مخاطبان (Target Segment):</label>
              <select
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:border-rose-500 focus:outline-none bg-white"
              >
                <option value="all">کلیه بیماران ثبت‌شده در سیستم (۲٬۴۵۰ نفر)</option>
                <option value="vip">بیماران باشگاه طلایی و VIP (۴۸۰ نفر)</option>
                <option value="followup">بیماران دارای موعد پیگیری یا چکاپ (۳۲۰ نفر)</option>
                <option value="cardio">مراجعین بخش قلب و عروق (۶۱۰ نفر)</option>
                <option value="no_show">بیماران با نوبت لغو شده ماه گذشته (۸۵ نفر)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">عنوان داخلی کمپین:</label>
              <input
                type="text"
                required
                value={campaignTitle}
                onChange={e => setCampaignTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between font-bold text-slate-700 mb-1">
                <span>متن پیامک (ارسال با خط خدماتی ۱۰۰۰۸۸۹۹ بدون مسدودی تبلیغات):</span>
                <span className="text-[11px] text-slate-400 font-mono">طول متن: ۲ بخش پیامکی</span>
              </div>
              <textarea
                rows={4}
                required
                value={smsMessage}
                onChange={e => setSmsMessage(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-300 focus:border-rose-500 focus:outline-none bg-white leading-relaxed text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-[11px] text-slate-500">
                هزینه تخمینی کمپین: <strong className="text-slate-900 font-bold">{formatPersianPrice(245000)}</strong> (کسر از اعتبار پنل)
              </span>

              <button
                type="submit"
                disabled={isBroadcasting}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isBroadcasting ? 'در حال ارسال پیامک‌ها...' : 'ارسال نهایی پیامک‌ها'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: PROMO CODES */}
      {activeTab === 'promos' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddPromo(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ایجاد کد تخفیف جدید</span>
            </button>
          </div>

          <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5">کد تخفیف</th>
                  <th className="p-3.5">درصد تخفیف</th>
                  <th className="p-3.5">سقف تخفیف</th>
                  <th className="p-3.5">میزان استفاده / سقف</th>
                  <th className="p-3.5">تاریخ انقضا</th>
                  <th className="p-3.5">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {promoCodes.map(promo => (
                  <tr key={promo.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-mono font-black text-rose-700 text-sm">
                      {promo.code}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {toPersianDigits(promo.discountPercent)}٪ تخفیف
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">
                      حداکثر {formatPersianPrice(promo.maxDiscountAmount)}
                    </td>
                    <td className="p-3.5 text-slate-800">
                      <span className="font-bold">{toPersianDigits(promo.usageCount)}</span> از {toPersianDigits(promo.maxUsageLimit)} بار
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono">
                      {toPersianDigits(promo.expiryDate)}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        promo.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {promo.status === 'active' ? '🟢 فعال' : 'منقضی شده'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Promo Modal */}
      {showAddPromo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-rose-600" />
                تعریف کد تخفیف جدید ویزیت
              </h3>
              <button
                type="button"
                onClick={() => setShowAddPromo(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">کد تخفیف (لاتین):</label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={newCode}
                  onChange={e => setNewCode(e.target.value.toUpperCase())}
                  placeholder="NEWCARE30"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-sm focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">درصد تخفیف ({newDiscount}٪):</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newDiscount}
                    onChange={e => setNewDiscount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">سقف تخفیف (تومان):</label>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={newMaxCap}
                    onChange={e => setNewMaxCap(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">سقف تعداد دفعات استفاده:</label>
                  <input
                    type="number"
                    value={newLimit}
                    onChange={e => setNewLimit(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">تاریخ انقضا:</label>
                  <input
                    type="text"
                    value={newExpiry}
                    onChange={e => setNewExpiry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPromo(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm"
                >
                  ثبت کد تخفیف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
