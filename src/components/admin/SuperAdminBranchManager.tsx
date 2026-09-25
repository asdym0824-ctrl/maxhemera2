import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { ClinicBranch } from '../../types';

interface SuperAdminBranchManagerProps {
  branches: ClinicBranch[];
  onUpdateBranch: (branchId: string, updates: Partial<ClinicBranch>) => void;
  onAddBranch: (newBranch: ClinicBranch) => void;
}

export const SuperAdminBranchManager: React.FC<SuperAdminBranchManagerProps> = ({
  branches,
  onUpdateBranch,
  onAddBranch
}) => {
  const [editingBranch, setEditingBranch] = useState<ClinicBranch | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit form state
  const [editWorkingHours, setEditWorkingHours] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmergencyPhone, setEditEmergencyPhone] = useState('');
  const [editIsOpen, setEditIsOpen] = useState(true);
  const [editInPersonBooking, setEditInPersonBooking] = useState(true);

  // New branch form state
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('تهران');
  const [newDistrict, setNewDistrict] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newHours, setNewHours] = useState('شنبه تا پنج‌شنبه: ۰۸:۰۰ الی ۲۱:۰۰');

  const handleOpenEdit = (branch: ClinicBranch) => {
    setEditingBranch(branch);
    setEditWorkingHours(branch.workingHours || '');
    setEditPhone(branch.phone || '');
    setEditEmergencyPhone(branch.emergencyPhone || '');
    setEditIsOpen(branch.isOpenNow ?? true);
    setEditInPersonBooking(branch.inPersonBookingEnabled ?? true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch) return;
    onUpdateBranch(editingBranch.id, {
      workingHours: editWorkingHours,
      phone: editPhone,
      emergencyPhone: editEmergencyPhone,
      isOpenNow: editIsOpen,
      inPersonBookingEnabled: editInPersonBooking
    });
    setEditingBranch(null);
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAddress.trim()) return;

    const newCode = `BR-0${branches.length + 1}`;
    const branch: ClinicBranch = {
      id: `branch-${Date.now()}`,
      name: newName.trim(),
      code: newCode,
      city: newCity.trim(),
      district: newDistrict.trim() || undefined,
      address: newAddress.trim(),
      phone: newPhone.trim(),
      isMain: false,
      isOpenNow: true,
      workingHours: newHours.trim(),
      inPersonBookingEnabled: true,
      departments: ['پزشک عمومی و چکاپ', 'تزریقات و پانسمان', 'اطفال و نوزادان'],
      todayPresentDoctorsCount: 5,
      currentQueueWaitMinutes: 10
    };

    onAddBranch(branch);
    setShowAddModal(false);
    setNewName('');
    setNewDistrict('');
    setNewAddress('');
    setNewPhone('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
            <Building2 className="w-4 h-4" />
            فرماندهی شبکه مراکز درمانی (Multi-Branch Governance)
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">مدیریت شعب، دپارتمان‌ها و فضاهای فیزیکی کلینیک</h2>
          <p className="text-xs text-slate-500 mt-1">
            کنترل وضعیت فعالیت، ساعات کار، تلفن‌های اضطراری و ظرفیت اتاق‌های ویزیت شعب
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن شعبه درمانی جدید</span>
        </button>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {branches.map(branch => (
          <div 
            key={branch.id} 
            className="rounded-3xl border border-slate-200/90 p-5 sm:p-6 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm shrink-0">
                  {branch.code}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900">{branch.name}</h3>
                    {branch.isMain && (
                      <span className="text-[10px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-full">
                        شعبه اصلی
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {branch.city} • منطقه {branch.district || 'شهرداری'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenEdit(branch)}
                className="p-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 transition-colors cursor-pointer"
                title="ویرایش تنظیمات شعبه"
              >
                <Edit3 className="w-4 h-4 text-purple-600" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{branch.address} {branch.floorAndUnit ? `(${branch.floorAndUnit})` : ''}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/70 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block">پزشکان شیفت</span>
                <span className="font-black text-slate-900 mt-0.5 block">{branch.todayPresentDoctorsCount || 8} نفر</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block">میانگین صف</span>
                <span className="font-black text-amber-600 mt-0.5 block">{branch.currentQueueWaitMinutes || 12} دقیقه</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block">پذیرش حضوری</span>
                <span className="font-bold text-emerald-600 mt-0.5 block">
                  {branch.inPersonBookingEnabled ? 'مجاز' : 'غیرفعال'}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block">وضعیت مرکز</span>
                <span className={`font-bold mt-0.5 block ${branch.isOpenNow ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {branch.isOpenNow ? '🟢 باز' : '⚪ تعطیل'}
                </span>
              </div>
            </div>

            {/* Departments */}
            {branch.departments && branch.departments.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-700 block">دپارتمان‌های فعال در این شعبه:</span>
                <div className="flex flex-wrap gap-1.5">
                  {branch.departments.map((dept, i) => (
                    <span key={i} className="text-[10px] font-medium bg-white text-slate-700 px-2 py-1 rounded-lg border border-slate-200">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact details */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
              <span className="text-slate-600 flex items-center gap-1 font-mono font-bold" dir="ltr">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {branch.phone}
              </span>
              <span className="text-slate-500 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {branch.workingHours}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Branch Modal */}
      {editingBranch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-600" />
                ویرایش تنظیمات شعبه: {editingBranch.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingBranch(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">ساعات کاری و فعالیت شعبه:</label>
                <input
                  type="text"
                  value={editWorkingHours}
                  onChange={e => setEditWorkingHours(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">تلفن پذیرش شعبه:</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">خط مستقیم فوریت‌ها / اورژانس:</label>
                <input
                  type="text"
                  value={editEmergencyPhone}
                  onChange={e => setEditEmergencyPhone(e.target.value)}
                  placeholder="۰۲۱-۲۲۱۴۵۶۸۰"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsOpen}
                    onChange={e => setEditIsOpen(e.target.checked)}
                    className="rounded text-purple-600"
                  />
                  <span className="font-bold text-slate-800">شعبه اکنون باز است</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editInPersonBooking}
                    onChange={e => setEditInPersonBooking(e.target.checked)}
                    className="rounded text-purple-600"
                  />
                  <span className="font-bold text-slate-800">نوبت‌دهی حضوری فعال</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingBranch(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-sm"
                >
                  ذخیره تغییرات شعبه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Branch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" />
                تعریف و ثبت شعبه درمانی جدید
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBranch} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">نام رسمی شعبه:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="مثال: شعبه تجریش و دربند (شمال تهران)"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">شهر:</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">منطقه / محله:</label>
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={e => setNewDistrict(e.target.value)}
                    placeholder="تجریش (منطقه ۱)"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">آدرس دقیق:</label>
                <textarea
                  rows={2}
                  required
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  placeholder="میدان تجریش، ابتدای خیابان دربند، ساختمان پزشکان..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">تلفن پذیرش:</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="۰۲۱-۲۲۷۷۱۱۰۰"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ساعات کاری:</label>
                <input
                  type="text"
                  value={newHours}
                  onChange={e => setNewHours(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-500 focus:outline-none"
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
                  className="px-5 py-2.5 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-sm"
                >
                  ثبت و راه‌اندازی شعبه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
