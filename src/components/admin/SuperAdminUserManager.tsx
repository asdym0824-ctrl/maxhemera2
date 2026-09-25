import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  Edit3, 
  Lock, 
  Check, 
  X, 
  UserCheck, 
  UserX, 
  Key, 
  Phone, 
  Mail, 
  Building2,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { User, UserRole, AppPermission } from '../../types';
import { Badge } from '../common/Badge';

interface SuperAdminUserManagerProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
  onCreateUser: (newUser: Omit<User, 'id'>) => void;
}

const ALL_ROLES: { role: UserRole; label: string; color: string }[] = [
  { role: 'super_admin', label: 'مدیر ارشد (Super Admin)', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { role: 'admin', label: 'مدیر سیستم (IT Admin)', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { role: 'clinic_manager', label: 'مدیر کلینیک و عملیات', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { role: 'doctor', label: 'پزشک متخصص', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { role: 'secretary', label: 'منشی و پذیرش', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { role: 'reception', label: 'کانتر پذیرش حضوری', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { role: 'nurse', label: 'پرستار و تریاژ', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { role: 'finance', label: 'مدیر مالی و حسابداری', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { role: 'patient', label: 'بیمار / مراجع', color: 'bg-slate-100 text-slate-700 border-slate-200' }
];

const AVAILABLE_PERMISSIONS: { key: AppPermission; label: string; category: string }[] = [
  { key: 'system.admin', label: 'دسترسی تام ادمین کل سیستم (Super Admin)', category: 'امنیت کلان' },
  { key: 'super_admin.portal.access', label: 'ورود به پنل ارشد مدیریتی', category: 'پرتال‌ها' },
  { key: 'clinic.portal.access', label: 'دسترسی مدیریت کلینیک و شعب', category: 'پرتال‌ها' },
  { key: 'doctor.portal.access', label: 'دسترسی مطب دیجیتال و پرونده بیماران', category: 'پرتال‌ها' },
  { key: 'secretary.portal.access', label: 'دسترسی میزکار پذیرش و نوبت‌دهی', category: 'پرتال‌ها' },
  { key: 'patient.portal.access', label: 'دسترسی پورتال بیمار و نوبت‌های من', category: 'پرتال‌ها' },
  { key: 'appointments.create', label: 'ثبت و رزرو نوبت جدید', category: 'نوبت‌دهی' },
  { key: 'appointments.update', label: 'تغییر وضعیت و ساعت نوبت', category: 'نوبت‌دهی' },
  { key: 'appointments.cancel', label: 'لغو و کنسلی نوبت مراجعین', category: 'نوبت‌دهی' },
  { key: 'medical_records.read', label: 'مشاهده پرونده الکترونیک سلامت', category: 'اطلاعات پزشکی' },
  { key: 'medical_records.write', label: 'ثبت تجویز دارو، شرح حال و آزمایش', category: 'اطلاعات پزشکی' },
  { key: 'doctor.website.manage', label: 'مدیریت و انتشار وبسایت پزشک', category: 'مطب دیجیتال' },
  { key: 'staff.manage', label: 'مدیریت شیفت و کارکنان', category: 'عملیات' },
  { key: 'automation.manage', label: 'تنظیمات قوانین و اتوماسیون پیامک', category: 'عملیات' }
];

export const SuperAdminUserManager: React.FC<SuperAdminUserManagerProps> = ({
  users,
  onUpdateUser,
  onCreateUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  
  // Selected user for editing
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<UserRole>('patient');
  const [editPermissions, setEditPermissions] = useState<AppPermission[]>([]);
  const [editStatus, setEditStatus] = useState<'active' | 'suspended'>('active');

  // New User Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('secretary');
  const [newNationalId, setNewNationalId] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Password reset feedback
  const [resetSuccessId, setResetSuccessId] = useState<string | null>(null);

  // Filtered users
  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      u.name.toLowerCase().includes(q) || 
      u.phone.includes(q) || 
      (u.nationalId && u.nationalId.includes(q)) || 
      (u.email && u.email.toLowerCase().includes(q));
    return matchesRole && matchesSearch;
  });

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditPermissions(user.permissions || []);
    setEditStatus((user as any).status === 'suspended' ? 'suspended' : 'active');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    onUpdateUser(editingUser.id, {
      role: editRole,
      permissions: editPermissions,
      ...((editStatus === 'suspended') ? { status: 'suspended' } : { status: 'active' } as any)
    });
    setEditingUser(null);
  };

  const handleTogglePermission = (permKey: AppPermission) => {
    setEditPermissions(prev => 
      prev.includes(permKey) 
        ? prev.filter(p => p !== permKey) 
        : [...prev, permKey]
    );
  };

  const handleResetPassword = (userId: string) => {
    setResetSuccessId(userId);
    setTimeout(() => setResetSuccessId(null), 2500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    onCreateUser({
      name: newName.trim(),
      phone: newPhone.trim(),
      role: newRole,
      nationalId: newNationalId.trim() || undefined,
      email: newEmail.trim() || undefined,
      clinicId: 'clinic-1',
      branchId: 'branch-1',
      permissions: [
        'patient.portal.access',
        ...(newRole === 'doctor' ? ['doctor.portal.access' as AppPermission, 'medical_records.read' as AppPermission, 'medical_records.write' as AppPermission] : []),
        ...(newRole === 'secretary' ? ['secretary.portal.access' as AppPermission, 'appointments.create' as AppPermission, 'appointments.update' as AppPermission] : []),
        ...(newRole === 'clinic_manager' ? ['clinic.portal.access' as AppPermission, 'staff.manage' as AppPermission] : []),
        ...(newRole === 'super_admin' ? ['system.admin' as AppPermission, 'super_admin.portal.access' as AppPermission] : [])
      ]
    });

    setShowCreateModal(false);
    setNewName('');
    setNewPhone('');
    setNewNationalId('');
    setNewEmail('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header & Overview Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            سیستم کنترل دسترسی و احراز هویت (RBAC)
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">مدیریت کاربران، نقش‌ها و مجوزهای امنیتی</h2>
          <p className="text-xs text-slate-500 mt-1">
            پایش جامع کلیه پزشکان، منشی‌ها، مدیران کلینیک، بیماران و حساب‌های با دسترسی کلان
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>ایجاد کاربر جدید با نقش سازمانی</span>
        </button>
      </div>

      {/* Summary Micro-Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-slate-400 block text-[11px]">کل کاربران ثبت‌شده</span>
          <span className="text-lg font-black text-slate-900 mt-0.5 block">{users.length} حساب</span>
          <span className="text-[10px] text-slate-500">پزشکان، پرسنل و مراجعین</span>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
          <span className="text-blue-600 block text-[11px] font-semibold">پزشکان متخصص</span>
          <span className="text-lg font-black text-blue-900 mt-0.5 block">
            {users.filter(u => u.role === 'doctor').length} نفر
          </span>
          <span className="text-[10px] text-blue-500">دارای پروانه و وبسایت مطب</span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
          <span className="text-purple-600 block text-[11px] font-semibold">کادر اداری و پذیرش</span>
          <span className="text-lg font-black text-purple-900 mt-0.5 block">
            {users.filter(u => ['secretary', 'reception', 'clinic_manager', 'nurse'].includes(u.role)).length} نفر
          </span>
          <span className="text-[10px] text-purple-500">مدیران و پرسنل شعب ۵ گانه</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
          <span className="text-rose-600 block text-[11px] font-semibold">مدیران ارشد سامانه</span>
          <span className="text-lg font-black text-rose-900 mt-0.5 block">
            {users.filter(u => ['super_admin', 'admin'].includes(u.role)).length} نفر
          </span>
          <span className="text-[10px] text-rose-500">دسترسی تام و نظارتی</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="جستجوی کاربر بر اساس نام، شماره تلفن، کدملی یا ایمیل..."
            className="w-full pl-3 pr-10 py-2.5 rounded-2xl border border-slate-300 text-xs focus:border-rose-500 focus:outline-none bg-slate-50/40"
          />
        </div>

        {/* Role Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              roleFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            همه نقش‌ها ({users.length})
          </button>
          {ALL_ROLES.slice(0, 5).map(r => (
            <button
              key={r.role}
              type="button"
              onClick={() => setRoleFilter(r.role)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                roleFilter === r.role ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r.label.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
            <tr>
              <th className="p-3.5">کاربر</th>
              <th className="p-3.5">اطلاعات تماس و کدملی</th>
              <th className="p-3.5">نقش فعلی</th>
              <th className="p-3.5">شعبه و انتساب</th>
              <th className="p-3.5">وضعیت حساب</th>
              <th className="p-3.5 text-center">عملیات ادمین</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map(user => {
              const roleMeta = ALL_ROLES.find(r => r.role === user.role) || { label: user.role, color: 'bg-slate-100 text-slate-700 border-slate-200' };
              const isSuspended = (user as any).status === 'suspended';
              const isResetting = resetSuccessId === user.id;

              return (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-extrabold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <div className="space-y-0.5">
                      <span className="font-mono text-slate-800 font-semibold block" dir="ltr">{user.phone}</span>
                      <span className="text-[11px] text-slate-400">کدملی: {user.nationalId || 'ثبت نشده'}</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${roleMeta.color}`}>
                      {roleMeta.label}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="text-slate-700 font-medium">
                      {user.clinicId ? 'شعبه مرکزی سعادت‌آباد' : 'سامانه سراسری'}
                    </span>
                  </td>

                  <td className="p-3.5">
                    {isSuspended ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        <UserX className="w-3 h-3" />
                        حساب معلق
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        فعال
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                        title="ویرایش نقش و پرمیشن‌ها"
                      >
                        <Edit3 className="w-4 h-4 text-blue-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResetPassword(user.id)}
                        className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                          isResetting ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="ارسال پیامک بازیابی رمز عبور"
                      >
                        <Key className="w-4 h-4 text-amber-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onUpdateUser(user.id, {
                          ...((isSuspended) ? { status: 'active' } : { status: 'suspended' } as any)
                        })}
                        className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                          isSuspended ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                        title={isSuspended ? 'فعال‌سازی مجدد حساب' : 'تعلیق حساب کاربری'}
                      >
                        {isSuspended ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                      </button>
                    </div>
                    {isResetting && (
                      <span className="text-[10px] text-emerald-600 font-bold block mt-1 animate-in fade-in">
                        رمز بازنشانی شد
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Role & Permissions Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-rose-600" />
                  ویرایش نقش سازمانی و دسترسی‌های: {editingUser.name}
                </h3>
                <span className="text-xs text-slate-500 font-mono">{editingUser.phone}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Role Selector */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  تغییر سطح نقش کاربری (User Role):
                </label>
                <select
                  value={editRole}
                  onChange={e => setEditRole(e.target.value as UserRole)}
                  className="w-full p-3 rounded-2xl border border-slate-300 font-bold text-xs bg-slate-50 focus:border-rose-500 focus:outline-none"
                >
                  {ALL_ROLES.map(r => (
                    <option key={r.role} value={r.role}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Status Switch */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  وضعیت فعال بودن حساب کاربری:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditStatus('active')}
                    className={`p-2.5 rounded-xl font-bold border transition-colors cursor-pointer text-center ${
                      editStatus === 'active' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-2xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    فعال و مجاز به ورود
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditStatus('suspended')}
                    className={`p-2.5 rounded-xl font-bold border transition-colors cursor-pointer text-center ${
                      editStatus === 'suspended' 
                        ? 'bg-rose-50 text-rose-800 border-rose-400 shadow-2xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    معلق / مسدود شده
                  </button>
                </div>
              </div>

              {/* Granular Permissions Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-800 block">
                  مجوزهای امنیتی و دسترسی‌های اختصاصی کاربر (Permissions):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
                  {AVAILABLE_PERMISSIONS.map(perm => {
                    const isChecked = editPermissions.includes(perm.key);
                    return (
                      <div
                        key={perm.key}
                        onClick={() => handleTogglePermission(perm.key)}
                        className={`p-2.5 rounded-xl border flex items-start gap-2 cursor-pointer transition-colors ${
                          isChecked ? 'bg-blue-50/80 border-blue-300 text-blue-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[11px] leading-tight">{perm.label}</span>
                          <span className="text-[9px] text-slate-400 font-mono">{perm.key}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm"
                >
                  ذخیره تغییرات نقش و دسترسی‌ها
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" dir="rtl">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-rose-600" />
                تعریف کاربر جدید سازمانی
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="مثال: دکتر مهدی صبوری یا سارا رحیمی"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">شماره همراه (نام کاربری ورود):</label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="09121234567"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">نقش سازمانی در کلینیک:</label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold focus:border-rose-500 focus:outline-none bg-slate-50"
                >
                  {ALL_ROLES.map(r => (
                    <option key={r.role} value={r.role}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">کد ملی (اختیاری جهت تطبیق پرونده):</label>
                <input
                  type="text"
                  dir="ltr"
                  value={newNationalId}
                  onChange={e => setNewNationalId(e.target.value)}
                  placeholder="0012345678"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-[11px] leading-relaxed border border-amber-200">
                رمز عبور اولیه این کاربر به صورت پیش‌فرض <span className="font-mono font-bold">123456</span> تنظیم می‌شود و کاربر در اولین ورود ملزم به تغییر آن خواهد بود.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-sm"
                >
                  ایجاد و فعال‌سازی حساب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
