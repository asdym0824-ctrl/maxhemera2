import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  CreditCard, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send,
  Building2,
  Stethoscope,
  Receipt
} from 'lucide-react';
import { Doctor } from '../../types';
import { 
  toPersianDigits, 
  formatPersianPrice, 
  formatPersianNumber 
} from '../../utils/persianWriting';

interface DoctorSettlementRecord {
  doctorId: string;
  doctorName: string;
  specialtyName: string;
  avatar: string;
  iban: string;
  consultationCount: number;
  grossRevenue: number;
  doctorSharePercent: number;
  doctorShareAmount: number;
  clinicShareAmount: number;
  status: 'pending' | 'settled' | 'under_review';
  settledAt?: string;
  trackingRef?: string;
}

interface SuperAdminFinanceEngineProps {
  doctors: Doctor[];
}

export const SuperAdminFinanceEngine: React.FC<SuperAdminFinanceEngineProps> = ({ doctors }) => {
  const [activeTab, setActiveTab] = useState<'settlements' | 'insurances' | 'transactions'>('settlements');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSettlement, setSelectedSettlement] = useState<DoctorSettlementRecord | null>(null);
  const [settleSuccessMsg, setSettleSuccessMsg] = useState<string | null>(null);

  // Initial settlements data grounded on doctors list
  const [settlements, setSettlements] = useState<DoctorSettlementRecord[]>(() => {
    return doctors.slice(0, 10).map((doc, idx) => {
      const visits = 24 + (idx * 7);
      const fee = doc.consultationFee || 280000;
      const gross = visits * fee;
      const docSharePercent = idx % 2 === 0 ? 70 : 75;
      const docAmount = Math.round(gross * (docSharePercent / 100));
      const clinicAmount = gross - docAmount;
      const isSettled = idx === 0 || idx === 3;

      return {
        doctorId: doc.id,
        doctorName: doc.name,
        specialtyName: doc.specialtyName,
        avatar: doc.avatar,
        iban: `IR${(idx + 10).toString().padStart(2, '0')}0170000000123456789012`,
        consultationCount: visits,
        grossRevenue: gross,
        doctorSharePercent: docSharePercent,
        doctorShareAmount: docAmount,
        clinicShareAmount: clinicAmount,
        status: isSettled ? 'settled' : idx === 4 ? 'under_review' : 'pending',
        settledAt: isSettled ? 'دیروز ساعت ۱۶:۳۰' : undefined,
        trackingRef: isSettled ? `PAYA-${984210 + idx}` : undefined
      };
    });
  });

  // Insurance claims summary
  const insuranceClaims = [
    { id: 'tamin', name: 'سازمان تأمین اجتماعی', totalClaims: 184, amount: 48500000, status: 'تأیید اسناد مالی', action: 'صدور حواله تسویه' },
    { id: 'salamat', name: 'بیمه سلامت ایرانیان', totalClaims: 142, amount: 36200000, status: 'در انتظار بازرسی اسناد', action: 'پیگیری پرونده' },
    { id: 'iran', name: 'بیمه تکمیلی ایران', totalClaims: 96, amount: 62100000, status: 'آماده پرداخت چک', action: 'دریافت حواله' },
    { id: 'dana', name: 'بیمه تکمیلی دانا', totalClaims: 74, amount: 44800000, status: 'تأیید نسخه الکترونیک', action: 'صدور صورتحساب' },
    { id: 'sata', name: 'خدمات درمانی نیروهای مسلح (ساتا)', totalClaims: 88, amount: 51300000, status: 'تأیید امور مالی', action: 'تسویه کامل' }
  ];

  const handleSettlePayout = (record: DoctorSettlementRecord) => {
    setSelectedSettlement(record);
  };

  const handleConfirmPayout = () => {
    if (!selectedSettlement) return;
    const refCode = `PAYA-${Math.floor(100000 + Math.random() * 900000)}`;

    setSettlements(prev => prev.map(s => 
      s.doctorId === selectedSettlement.doctorId 
        ? { ...s, status: 'settled', trackingRef: refCode, settledAt: 'هم‌اکنون' } 
        : s
    ));

    setSettleSuccessMsg(`حواله پایا به شماره پیگیری ${refCode} به حساب ${selectedSettlement.doctorName} با موفقیت صادر شد.`);
    setSelectedSettlement(null);
    setTimeout(() => setSettleSuccessMsg(null), 4000);
  };

  const totalGross = settlements.reduce((sum, s) => sum + s.grossRevenue, 0);
  const totalDoctorPayable = settlements.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.doctorShareAmount, 0);
  const totalClinicRevenue = settlements.reduce((sum, s) => sum + s.clinicShareAmount, 0);

  const filteredSettlements = settlements.filter(s => 
    s.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.specialtyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <DollarSign className="w-4 h-4" />
            امور مالی، تسهیم کارمزد و تسویه‌حساب (Financial Clearing OS)
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">مدیریت تسویه‌حساب با پزشکان و مطالبات بیمه‌ها</h2>
          <p className="text-xs text-slate-500 mt-1">
            محاسبه خودکار سهم پزشک (کمیسیون)، صدور حواله‌های پایا و پایش اسناد بیمه
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const json = JSON.stringify(settlements, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `hamrah-financial-report-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>خروجی اکسل و صورت‌های مالی</span>
        </button>
      </div>

      {settleSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{settleSuccessMsg}</span>
        </div>
      )}

      {/* Finance Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>درآمد ناخالص تجمیعی کل دوره</span>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatPersianPrice(totalGross)}
          </div>
          <div className="text-[11px] text-slate-500">از محل {toPersianDigits(settlements.reduce((sum, s) => sum + s.consultationCount, 0))} ویزیت در کلیه شعب</div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div className="flex items-center justify-between text-amber-700 text-xs font-bold">
            <span>مطالبات آماده پرداخت پزشکان</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900">
            {formatPersianPrice(totalDoctorPayable)}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">حواله پایا برای {toPersianDigits(settlements.filter(s => s.status === 'pending').length)} پزشک آماده صدور است</div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold">
            <span>سهم سود خالص کلینیک</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900">
            {formatPersianPrice(totalClinicRevenue)}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">میانگین ۳۰٪ کارمزد سازمانی کلینیک</div>
        </div>
      </div>

      {/* Internal Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('settlements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'settlements' 
              ? 'bg-emerald-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          دفتر کل تسویه‌حساب پزشکان ({toPersianDigits(settlements.length)})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('insurances')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'insurances' 
              ? 'bg-emerald-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          خط اعتباری و مطالبات بیمه‌ای ({toPersianDigits(insuranceClaims.length)})
        </button>
      </div>

      {/* TAB 1: DOCTOR SETTLEMENT LEDGER */}
      {activeTab === 'settlements' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام پزشک یا تخصص برای بررسی حسابداری..."
              className="w-full pl-3 pr-10 py-2.5 rounded-2xl border border-slate-300 text-xs focus:border-emerald-500 focus:outline-none bg-slate-50/40"
            />
          </div>

          <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5">پزشک معالج</th>
                  <th className="p-3.5">تعداد ویزیت</th>
                  <th className="p-3.5">درآمد ناخالص</th>
                  <th className="p-3.5">سهم پزشک (درصد)</th>
                  <th className="p-3.5">سهم کلینیک</th>
                  <th className="p-3.5">وضعیت تسویه</th>
                  <th className="p-3.5 text-center">اقدام تسویه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSettlements.map(record => (
                  <tr key={record.doctorId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={record.avatar}
                          alt={record.doctorName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-extrabold text-slate-900">{record.doctorName}</div>
                          <div className="text-[11px] text-slate-500">{record.specialtyName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-slate-800">
                      {toPersianDigits(record.consultationCount)} ویزیت
                    </td>

                    <td className="p-3.5 font-extrabold text-slate-900">
                      {formatPersianPrice(record.grossRevenue)}
                    </td>

                    <td className="p-3.5">
                      <span className="font-black text-emerald-700">{formatPersianPrice(record.doctorShareAmount)}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">({toPersianDigits(record.doctorSharePercent)}٪ سهم پزشک)</span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-purple-700">{formatPersianPrice(record.clinicShareAmount)}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">({toPersianDigits(100 - record.doctorSharePercent)}٪ کلینیک)</span>
                    </td>

                    <td className="p-3.5">
                      {record.status === 'settled' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            تسویه شده
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{record.trackingRef}</span>
                        </div>
                      ) : record.status === 'under_review' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" />
                          بررسی اسناد
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          آماده پرداخت
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-center">
                      {record.status === 'settled' ? (
                        <span className="text-[11px] text-slate-400 font-medium">حواله صادر شده</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSettlePayout(record)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-xs text-xs cursor-pointer active:scale-95"
                        >
                          صدور حواله پایا
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INSURANCE CLAIMS PIPELINE */}
      {activeTab === 'insurances' && (
        <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-3.5">بیمه‌گر طرف قرارداد</th>
                <th className="p-3.5">تعداد پرونده‌های ارسالی</th>
                <th className="p-3.5">مبلغ مطالبات تجمیعی</th>
                <th className="p-3.5">وضعیت پیگیری اسناد</th>
                <th className="p-3.5 text-center">اقدام امور مالی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {insuranceClaims.map(claim => (
                <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{claim.name}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{toPersianDigits(claim.totalClaims)} پرونده ویزیت</td>
                  <td className="p-3.5 font-black text-blue-700 text-sm">{formatPersianPrice(claim.amount)}</td>
                  <td className="p-3.5">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold text-[11px] border border-blue-100">
                      {claim.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSettleSuccessMsg(`صورتحساب تجمیعی ${claim.name} به مبلغ ${formatPersianPrice(claim.amount)} جهت وصول صادر گردید.`);
                        setTimeout(() => setSettleSuccessMsg(null), 4000);
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
                    >
                      {claim.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payout Confirmation Modal */}
      {selectedSettlement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                تأیید صدور حواله پایا برای پزشک
              </h3>
              <button
                type="button"
                onClick={() => setSelectedSettlement(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">پزشک ذینفع:</span>
                  <span className="font-bold text-slate-900">{selectedSettlement.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">شماره شبا (IBAN):</span>
                  <span className="font-mono text-slate-700 font-bold" dir="ltr">{selectedSettlement.iban}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">کارکرد ماهانه:</span>
                  <span className="font-bold text-slate-800">{toPersianDigits(selectedSettlement.consultationCount)} ویزیت</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1 text-center">
                <span className="text-xs text-emerald-700 block">مبلغ قابل واریز (خالص سهم پزشک):</span>
                <span className="text-2xl font-black block">
                  {formatPersianPrice(selectedSettlement.doctorShareAmount)}
                </span>
                <span className="text-[11px] text-emerald-600 block mt-1">
                  (محاسبه شده بر مبنای {toPersianDigits(selectedSettlement.doctorSharePercent)}٪ سهم پزشک از کل {formatPersianPrice(selectedSettlement.grossRevenue)})
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                با فشردن دکمه زیر، سند مالی در سیستم حسابداری همرا کلینیک ثبت گردیده و دستور پرداخت الکترونیک بین‌بانکی پایا به بانک عامل ارسال خواهد شد.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedSettlement(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayout}
                  className="px-5 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm"
                >
                  تأیید نهایی و صدور حواله پایا
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
