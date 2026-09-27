import React, { useState } from 'react';
import { 
  Stethoscope, 
  DollarSign, 
  Plus, 
  Edit3, 
  Search, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  FileText,
  Percent,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Specialty, ServiceItem, InsuranceCompany } from '../../types';
import { 
  toPersianDigits, 
  formatPersianPrice, 
  formatPersianNumber, 
  formatPersianPercent 
} from '../../utils/persianWriting';

interface SuperAdminTariffCatalogProps {
  specialties: Specialty[];
  services: ServiceItem[];
  insurances: InsuranceCompany[];
  onUpdateServiceTariff: (serviceId: string, basePrice: number, doctorSharePercent: number) => void;
  onAddService: (newService: ServiceItem) => void;
}

interface ServiceTariffItem {
  id: string;
  title: string;
  category: string;
  basePrice: number;
  doctorSharePercent: number; // e.g. 70
  clinicSharePercent: number; // e.g. 30
  durationMinutes: number;
  insuranceSupported: boolean;
}

export const SuperAdminTariffCatalog: React.FC<SuperAdminTariffCatalogProps> = ({
  specialties,
  services,
  insurances,
  onUpdateServiceTariff,
  onAddService
}) => {
  const [activeTab, setActiveTab] = useState<'tariffs' | 'specialties' | 'insurances'>('tariffs');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample or state-based service tariffs
  const [tariffList, setTariffList] = useState<ServiceTariffItem[]>([
    { id: 'srv-1', title: 'ویزیت تخصصی و معاینه بالینی حضوری', category: 'ویزیت و مشاوره', basePrice: 280000, doctorSharePercent: 70, clinicSharePercent: 30, durationMinutes: 20, insuranceSupported: true },
    { id: 'srv-2', title: 'ویزیت فوق تخصصی و کمیسیون پزشکی', category: 'ویزیت و مشاوره', basePrice: 380000, doctorSharePercent: 75, clinicSharePercent: 25, durationMinutes: 30, insuranceSupported: true },
    { id: 'srv-3', title: 'مشاوره تصویری آنلاین (تله‌مدیسین)', category: 'پزشکی آنلاین', basePrice: 220000, doctorSharePercent: 80, clinicSharePercent: 20, durationMinutes: 20, insuranceSupported: false },
    { id: 'srv-4', title: 'اکوکاردیوگرافی داپلر رنگی قلب', category: 'پاراکلینیک و تصویربرداری', basePrice: 850000, doctorSharePercent: 65, clinicSharePercent: 35, durationMinutes: 30, insuranceSupported: true },
    { id: 'srv-5', title: 'نوار قلب ۱۲ کاناله فوری (ECG)', category: 'پاراکلینیک و قلب', basePrice: 140000, doctorSharePercent: 50, clinicSharePercent: 50, durationMinutes: 10, insuranceSupported: true },
    { id: 'srv-6', title: 'آندوسکوپی فوقانی دستگاه گوارش با بیهوشی', category: 'گوارش و جراحی سرپایی', basePrice: 2400000, doctorSharePercent: 60, clinicSharePercent: 40, durationMinutes: 45, insuranceSupported: true },
    { id: 'srv-7', title: 'کولونوسکوپی تشخیصی و پولیپکتومی', category: 'گوارش و جراحی سرپایی', basePrice: 3200000, doctorSharePercent: 60, clinicSharePercent: 40, durationMinutes: 60, insuranceSupported: true },
    { id: 'srv-8', title: 'مزوتراپی مو و پوست با مواد فرانسوی', category: 'پوست و زیبایی', basePrice: 1800000, doctorSharePercent: 65, clinicSharePercent: 35, durationMinutes: 30, insuranceSupported: false },
    { id: 'srv-9', title: 'تزریق مفصلی ژل اسید هیالورونیک زانو', category: 'ارتوپدی و توانبخشی', basePrice: 1200000, doctorSharePercent: 70, clinicSharePercent: 30, durationMinutes: 20, insuranceSupported: true },
    { id: 'srv-10', title: 'نوار عصب و عضله چهار اندام (EMG/NCV)', category: 'نورولوژی و طب فیزیکی', basePrice: 1650000, doctorSharePercent: 65, clinicSharePercent: 35, durationMinutes: 40, insuranceSupported: true }
  ]);

  // Editing state
  const [editingTariff, setEditingTariff] = useState<ServiceTariffItem | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDocShare, setEditDocShare] = useState<number>(70);

  // New Service Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('ویزیت و معاینه');
  const [newPrice, setNewPrice] = useState<number>(300000);
  const [newDocShare, setNewDocShare] = useState<number>(70);
  const [newDuration, setNewDuration] = useState<number>(20);

  const handleOpenEdit = (t: ServiceTariffItem) => {
    setEditingTariff(t);
    setEditPrice(t.basePrice);
    setEditDocShare(t.doctorSharePercent);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTariff) return;
    const docShare = Math.min(100, Math.max(0, editDocShare));
    const clinicShare = 100 - docShare;

    setTariffList(prev => prev.map(t => 
      t.id === editingTariff.id 
        ? { ...t, basePrice: editPrice, doctorSharePercent: docShare, clinicSharePercent: clinicShare } 
        : t
    ));

    onUpdateServiceTariff(editingTariff.id, editPrice, docShare);
    setEditingTariff(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const docShare = Math.min(100, Math.max(0, newDocShare));
    const clinicShare = 100 - docShare;

    const item: ServiceTariffItem = {
      id: `srv-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      basePrice: newPrice,
      doctorSharePercent: docShare,
      clinicSharePercent: clinicShare,
      durationMinutes: newDuration,
      insuranceSupported: true
    };

    setTariffList(prev => [item, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
    setNewPrice(300000);
  };

  const filteredTariffs = tariffList.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
            <Stethoscope className="w-4 h-4" />
            تعرفه‌گذاری و کاتالوگ خدمات درمانی
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">مدیریت تعرفه مصوب، سهم پزشک و پوشش‌های بیمه‌ای</h2>
          <p className="text-xs text-slate-500 mt-1">
            تعیین بهای مصوب خدمات کلینیکی، درصد کارمزد پزشکان و تطبیق با بیمه‌های پایه و تکمیلی
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن خدمت درمانی جدید</span>
        </button>
      </div>

      {/* Internal Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('tariffs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'tariffs' 
              ? 'bg-blue-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          تعرفه‌های مصوب و تسهیم پورسانت ({toPersianDigits(tariffList.length)})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('specialties')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'specialties' 
              ? 'bg-blue-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          کاتالوگ تخصص‌های پزشکی ({toPersianDigits(specialties.length)})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('insurances')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'insurances' 
              ? 'bg-blue-600 text-white shadow-2xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          قوانین فرانشیز و پوشش بیمه‌ها ({toPersianDigits(insurances.length)})
        </button>
      </div>

      {/* TAB 1: TARIFFS & REVENUE SPLIT */}
      {activeTab === 'tariffs' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام خدمت درمانی یا دسته‌بندی..."
              className="w-full pl-3 pr-10 py-2.5 rounded-2xl border border-slate-300 text-xs focus:border-blue-500 focus:outline-none bg-slate-50/40"
            />
          </div>

          <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5">عنوان خدمت درمانی</th>
                  <th className="p-3.5">دسته</th>
                  <th className="p-3.5">تعرفه مصوب بیمار</th>
                  <th className="p-3.5">سهم پزشک (درصد)</th>
                  <th className="p-3.5">سهم کلینیک (درصد)</th>
                  <th className="p-3.5">مدت ویزیت</th>
                  <th className="p-3.5 text-center">ویرایش تعرفه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTariffs.map(t => {
                  const docShareAmount = Math.round(t.basePrice * (t.doctorSharePercent / 100));
                  const clinicShareAmount = t.basePrice - docShareAmount;

                  return (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">
                        {t.title}
                        {t.insuranceSupported && (
                          <span className="text-[10px] font-normal text-emerald-600 block">
                            ✓ تحت پوشش بیمه‌های تکمیلی و پایه
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                          {t.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-blue-700 text-sm">
                        {formatPersianPrice(t.basePrice)}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-800">{toPersianDigits(t.doctorSharePercent)}٪</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ({formatPersianPrice(docShareAmount)})
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-purple-700">{toPersianDigits(t.clinicSharePercent)}٪</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ({formatPersianPrice(clinicShareAmount)})
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600 font-medium">
                        {toPersianDigits(t.durationMinutes)} دقیقه
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(t)}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                        >
                          تغییر تعرفه
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SPECIALTIES DIRECTORY */}
      {activeTab === 'specialties' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {specialties.map(spec => (
            <div key={spec.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{spec.name}</h4>
                  <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{spec.englishName}</span>
                </div>
                <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-lg border border-blue-100 text-[11px]">
                  {toPersianDigits(spec.doctorCount)} پزشک
                </span>
              </div>
              <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                {spec.description}
              </p>
              {spec.popularSymptoms && spec.popularSymptoms.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {spec.popularSymptoms.map((symp, i) => (
                    <span key={i} className="text-[10px] bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                      {symp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INSURANCES BREAKDOWN */}
      {activeTab === 'insurances' && (
        <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-3.5">نام سازمان بیمه‌گر</th>
                <th className="p-3.5">نوع بیمه</th>
                <th className="p-3.5">درصد پوشش تعهد (فرانشیز)</th>
                <th className="p-3.5">نسخه الکترونیک</th>
                <th className="p-3.5">تعداد پزشکان طرف قرارداد</th>
                <th className="p-3.5">توضیحات پوشش</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {insurances.map(ins => (
                <tr key={ins.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{ins.name}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      ins.type === 'basic' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      ins.type === 'supplementary' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                      'bg-teal-50 text-teal-700 border border-teal-100'
                    }`}>
                      {ins.type === 'basic' ? 'بیمه پایه دولتی' : ins.type === 'supplementary' ? 'بیمه تکمیلی تجاری' : 'صندوق خاص'}
                    </span>
                  </td>
                  <td className="p-3.5 font-black text-slate-800 text-sm">
                    {toPersianDigits(ins.coverageCoPayPercent)}٪ <span className="text-xs font-normal text-slate-400">توسط بیمه</span>
                  </td>
                  <td className="p-3.5">
                    {ins.electronicRxSupported ? (
                      <span className="text-emerald-700 font-bold text-[11px]">✓ فعال (استعلام کدملی)</span>
                    ) : (
                      <span className="text-slate-400">نیاز به دفترچه</span>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-slate-700">{toPersianDigits(ins.acceptedDoctorsCount || 10)} پزشک</td>
                  <td className="p-3.5 text-slate-600 text-[11px] max-w-xs truncate">{ins.shortDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Tariff Modal */}
      {editingTariff && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                ویرایش تعرفه: {editingTariff.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTariff(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  تعرفه مصوب و قابل پرداخت بیمار (تومان):
                </label>
                <input
                  type="number"
                  step="10000"
                  required
                  value={editPrice}
                  onChange={e => setEditPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-base focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between font-bold text-slate-700 mb-1">
                  <span>سهم پزشک معالج (پورسانت ویزیت):</span>
                  <span className="text-blue-600 font-black">{editDocShare}٪</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editDocShare}
                  onChange={e => setEditDocShare(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>سهم کلینیک: {100 - editDocShare}٪</span>
                  <span>سهم پزشک: {editDocShare}٪</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>مبلغ پرداختی به پزشک:</span>
                  <span className="font-black">{Math.round(editPrice * (editDocShare / 100)).toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span>درآمد خالص کلینیک:</span>
                  <span className="font-black text-purple-700">{Math.round(editPrice * ((100 - editDocShare) / 100)).toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTariff(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm"
                >
                  ذخیره و اعمال تعرفه جدید
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                تعریف خدمت و آیتم درمانی جدید
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">نام خدمت یا پروسیجر پزشکی:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="مثال: تست ورزش قلب و عروق (Treadmill Stress Test)"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">دسته‌بندی خدمت:</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:border-blue-500 focus:outline-none bg-slate-50"
                >
                  <option value="ویزیت و مشاوره">ویزیت و مشاوره</option>
                  <option value="پاراکلینیک و تصویربرداری">پاراکلینیک و تصویربرداری</option>
                  <option value="جراحی سرپایی">جراحی سرپایی</option>
                  <option value="پوست، مو و لیزر">پوست، مو و لیزر</option>
                  <option value="توانبخشی و فیزیوتراپی">توانبخشی و فیزیوتراپی</option>
                  <option value="پزشکی آنلاین">پزشکی آنلاین</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">تعرفه پایه (تومان):</label>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">مدت زمان (دقیقه):</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={e => setNewDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">درصد سهم پزشک معالج ({newDocShare}٪):</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={newDocShare}
                  onChange={e => setNewDocShare(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm"
                >
                  ثبت خدمت در کاتالوگ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
