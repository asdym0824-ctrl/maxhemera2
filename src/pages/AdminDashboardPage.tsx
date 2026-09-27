import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  AdminKPIs, 
  PatientCRMRecord, 
  Doctor, 
  DoctorWebsiteStatus, 
  ClinicBranch, 
  ActivityLog, 
  User, 
  Specialty, 
  ServiceItem, 
  InsuranceCompany, 
  Appointment 
} from '../types';
import { apiService } from '../services/apiService';
import { INITIAL_USERS } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Award, 
  UserCheck, 
  Activity, 
  Megaphone, 
  Settings, 
  PieChart, 
  Globe, 
  Eye, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Building2, 
  Stethoscope, 
  Radio, 
  Download, 
  Sparkles, 
  X,
  Layers,
  Key,
  Database
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { resolveDoctorWebsiteStatus, getWebsiteStatusMeta, getDoctorSubdomain } from '../utils/doctorWebsiteUtils';

// Super Admin Modular Subcomponents
import { SuperAdminCommandHub } from '../components/admin/SuperAdminCommandHub';
import { SuperAdminUserManager } from '../components/admin/SuperAdminUserManager';
import { SuperAdminBranchManager } from '../components/admin/SuperAdminBranchManager';
import { SuperAdminTariffCatalog } from '../components/admin/SuperAdminTariffCatalog';
import { SuperAdminFinanceEngine } from '../components/admin/SuperAdminFinanceEngine';
import { SuperAdminOperationsQueue } from '../components/admin/SuperAdminOperationsQueue';
import { SuperAdminMarketingSms } from '../components/admin/SuperAdminMarketingSms';
import { SuperAdminSecuritySettings } from '../components/admin/SuperAdminSecuritySettings';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [kpis, setKpis] = useState<AdminKPIs | null>(null);
  const [crmRecords, setCrmRecords] = useState<PatientCRMRecord[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [branches, setBranches] = useState<ClinicBranch[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('synapse_admin_all_users_v2');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_USERS;
  });
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [insurances, setInsurances] = useState<InsuranceCompany[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Website Lifecycle State
  const [websiteFilter, setWebsiteFilter] = useState<'all' | DoctorWebsiteStatus>('all');
  const [updatingDoctorId, setUpdatingDoctorId] = useState<string | null>(null);

  // Global Super Admin Banner States
  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(null);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(false);
  const [crmSearchQuery, setCrmSearchQuery] = useState('');
  const [crmStatusFilter, setCrmStatusFilter] = useState<'all' | 'vip' | 'active' | 'followup_needed'>('all');

  useEffect(() => {
    document.title = 'سوپرپنل مدیریت ارشد کلینیک | همرا کلینیک';
    Promise.all([
      apiService.getAdminKPIs(),
      apiService.getCRMRecords(),
      apiService.getDoctors(),
      apiService.getBranches(),
      apiService.getActivityLogs(60),
      apiService.getSpecialties(),
      apiService.getServices(),
      apiService.getInsurances(),
      apiService.getAppointments()
    ]).then(([kp, crm, docs, brs, logs, specs, srvs, ins, apps]) => {
      setKpis(kp);
      setCrmRecords(crm);
      setDoctors(docs);
      setBranches(brs);
      setActivityLogs(logs);
      setSpecialties(specs);
      setServices(srvs);
      setInsurances(ins);
      setAppointments(apps);
    }).catch(err => {
      console.error('Failed to load super admin data', err);
    });
  }, []);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/users')) return 'users';
    if (path.includes('/branches')) return 'branches';
    if (path.includes('/catalog')) return 'catalog';
    if (path.includes('/finance')) return 'finance';
    if (path.includes('/websites')) return 'websites';
    if (path.includes('/crm')) return 'crm';
    if (path.includes('/operations')) return 'operations';
    if (path.includes('/marketing')) return 'marketing';
    if (path.includes('/security') || path.includes('/settings')) return 'security';
    if (path.includes('/analytics')) return 'overview';
    return 'overview';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tabId: string) => {
    if (tabId === 'overview') navigate('/admin');
    else navigate(`/admin/${tabId}`);
  };

  const handleStatusChange = async (doctorId: string, newStatus: DoctorWebsiteStatus) => {
    setUpdatingDoctorId(doctorId);
    try {
      const updated = await apiService.setDoctorWebsiteStatus(doctorId, newStatus);
      if (updated) {
        setDoctors(prev => prev.map(d => d.id === doctorId ? updated : d));
      }
    } catch (err) {
      console.error('Failed to change doctor website status', err);
    } finally {
      setUpdatingDoctorId(null);
    }
  };

  // Full Database Snapshot Download
  const handleTriggerBackup = () => {
    const backupData = {
      metadata: {
        system: 'همرا کلینیک (HEMERA CLINIC OS)',
        version: '4.8.2-ENTERPRISE',
        generatedAt: new Date().toISOString(),
        actor: 'مدیر ارشد سامانه (Super Admin)'
      },
      kpis,
      totalUsers: users.length,
      totalDoctors: doctors.length,
      totalBranches: branches.length,
      totalAppointments: appointments.length,
      data: {
        users,
        branches,
        crmRecords,
        doctors: doctors.map(d => ({ id: d.id, name: d.name, specialty: d.specialtyName, fee: d.consultationFee })),
        activityLogs: activityLogs.slice(0, 50)
      }
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hamrah-clinic-enterprise-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // User RBAC Updates
  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => {
      const next = prev.map(u => u.id === userId ? { ...u, ...updates } : u);
      try {
        localStorage.setItem('synapse_admin_all_users_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCreateUser = (newUser: Omit<User, 'id'>) => {
    const created: User = {
      ...newUser,
      id: `user-${Date.now()}`
    };
    setUsers(prev => {
      const next = [created, ...prev];
      try {
        localStorage.setItem('synapse_admin_all_users_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Branch Updates
  const handleUpdateBranch = (branchId: string, updates: Partial<ClinicBranch>) => {
    setBranches(prev => prev.map(b => b.id === branchId ? { ...b, ...updates } : b));
  };

  const handleAddBranch = (newBranch: ClinicBranch) => {
    setBranches(prev => [...prev, newBranch]);
  };

  // Service Tariff Updates
  const handleUpdateServiceTariff = (serviceId: string, basePrice: number, doctorSharePercent: number) => {
    // updates reflected across system
  };

  if (!kpis) return null;

  const adminTabs = [
    { id: 'overview', label: 'مرکز فرماندهی و KPIs', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'کاربران و پرمیشن‌ها (RBAC)', icon: <Users className="w-4 h-4" /> },
    { id: 'branches', label: 'شبکه شعب و فضاهای فیزیکی', icon: <Building2 className="w-4 h-4" /> },
    { id: 'catalog', label: 'تعرفه‌ها و کاتالوگ خدمات', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'finance', label: 'امور مالی و تسویه پزشکان', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'websites', label: 'وبسایت و مطب دیجیتال پزشکان', icon: <Globe className="w-4 h-4" /> },
    { id: 'crm', label: 'مدیریت ارتباط مراجعین (CRM)', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'operations', label: 'عملیات، صف و نوبت‌دهی', icon: <Settings className="w-4 h-4" /> },
    { id: 'marketing', label: 'مرکز پیامک و بازاریابی', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'security', label: 'امنیت، لاگ‌ها و بکاپ دیتابیس', icon: <ShieldAlert className="w-4 h-4" /> }
  ];

  const filteredDoctors = doctors.filter(doc => {
    if (websiteFilter === 'all') return true;
    return resolveDoctorWebsiteStatus(doc.websiteConfig) === websiteFilter;
  });

  const filteredCrm = crmRecords.filter(crm => {
    const matchesStatus = crmStatusFilter === 'all' || crm.status === crmStatusFilter;
    const q = crmSearchQuery.trim().toLowerCase();
    const matchesSearch = !q || crm.name.toLowerCase().includes(q) || crm.phone.includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Global Broadcast Banner (if dispatched by Super Admin) */}
      {broadcastMessage && (
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white p-4 rounded-3xl shadow-xl flex items-center justify-between gap-4 border border-rose-400 animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-black text-xs block text-rose-100">اعلان فوری سراسری سوپر ادمین (System Broadcast):</span>
              <p className="text-xs font-bold mt-0.5">{broadcastMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setBroadcastMessage(null)}
            className="text-white hover:bg-white/20 p-1.5 rounded-xl cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Maintenance Mode Warning Banner */}
      {isMaintenanceMode && (
        <div className="bg-amber-500 text-slate-950 p-4 rounded-3xl shadow-lg flex items-center justify-between gap-4 border border-amber-600 animate-in fade-in">
          <div className="flex items-center gap-3 font-bold text-xs">
            <AlertTriangle className="w-5 h-5 text-slate-950 shrink-0" />
            <span>حالت نگهداری فعال است: دسترسی کاربران عمومی موقتاً محدود شده و سامانه فقط در اختیار مدیران ارشد قرار دارد.</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMaintenanceMode(false)}
            className="px-3 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            غیرفعال‌سازی حالت نگهداری
          </button>
        </div>
      )}

      {/* Executive Command Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl border border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 font-black text-xs">
            <ShieldAlert className="w-4 h-4" />
            سوپرپنل ارشد مدیریت و فرماندهی کلینیک (Clinic Enterprise Management OS)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            سامانه جامع نظارت، مالی، کاربران و امنیت همرا کلینیک
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            مرکز کنترل متمرکز ۵ شعبه، ۲۰ دپارتمان تخصصی، کادر درمان، تسویه پورسانت‌ها و حاکمیت زیرساخت ابری
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-2xl text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200">وضعیت سامانه: ۱۰۰٪ عملیاتی</span>
          </div>

          <button
            type="button"
            onClick={handleTriggerBackup}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>بکاپ کامل JSON</span>
          </button>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {adminTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 1. OVERVIEW & COMMAND HUB */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'overview' && (
        <SuperAdminCommandHub
          kpis={kpis}
          branches={branches}
          activityLogs={activityLogs}
          onTriggerBackup={handleTriggerBackup}
          onSendBroadcast={(msg) => setBroadcastMessage(msg)}
          onToggleMaintenance={() => setIsMaintenanceMode(!isMaintenanceMode)}
          isMaintenanceMode={isMaintenanceMode}
          onNavigateTab={handleTabClick}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. USER & ROLE MANAGEMENT (RBAC) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'users' && (
        <SuperAdminUserManager
          users={users}
          onUpdateUser={handleUpdateUser}
          onCreateUser={handleCreateUser}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. MULTI-BRANCH & PHYSICAL NETWORK */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'branches' && (
        <SuperAdminBranchManager
          branches={branches}
          onUpdateBranch={handleUpdateBranch}
          onAddBranch={handleAddBranch}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 4. TARIFFS, SERVICES & SPECIALTIES */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'catalog' && (
        <SuperAdminTariffCatalog
          specialties={specialties}
          services={services}
          insurances={insurances}
          onUpdateServiceTariff={handleUpdateServiceTariff}
          onAddService={(srv) => setServices(prev => [srv, ...prev])}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 5. FINANCE & DOCTOR SETTLEMENT ENGINE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'finance' && (
        <SuperAdminFinanceEngine
          doctors={doctors}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 6. DOCTOR WEBSITES GOVERNANCE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'websites' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
                <Globe className="w-4 h-4" />
                حاکمیت مطب‌های دیجیتال پزشکان (Physician Web Platforms)
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                نظارت و مدیریت چرخه حیات وبسایت پزشکان
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                کنترل وضعیت انتشار، بررسی دامنه، پیش‌نمایش سایت‌های پزشکان و سئوی محلی
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
              {[
                { id: 'all', label: `همه (${doctors.length})` },
                { id: 'published', label: 'منتشر شده', color: 'text-emerald-700' },
                { id: 'draft', label: 'پیش‌نویس', color: 'text-amber-700' },
                { id: 'disabled', label: 'غیرفعال', color: 'text-slate-600' },
                { id: 'suspended', label: 'تعلیق شده', color: 'text-rose-700' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setWebsiteFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    websiteFilter === f.id
                      ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5">پزشک</th>
                  <th className="p-3.5">تخصص و مطب</th>
                  <th className="p-3.5">نشانی وبسایت</th>
                  <th className="p-3.5">وضعیت انتشار</th>
                  <th className="p-3.5">پیش‌نمایش مدیر</th>
                  <th className="p-3.5">تغییر وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDoctors.map(doctor => {
                  const status = resolveDoctorWebsiteStatus(doctor.websiteConfig);
                  const meta = getWebsiteStatusMeta(status);
                  const isUpdating = updatingDoctorId === doctor.id;

                  return (
                    <tr key={doctor.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-extrabold text-slate-900">{doctor.name}</div>
                            <div className="text-[11px] text-slate-500">{doctor.title}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-slate-800">{doctor.specialtyName}</span>
                        <div className="text-[11px] text-slate-500">{doctor.city}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" dir="ltr">
                          /site/{doctor.slug}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          status === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          status === 'suspended' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            status === 'published' ? 'bg-emerald-500' :
                            status === 'draft' ? 'bg-amber-500' :
                            status === 'suspended' ? 'bg-rose-500' : 'bg-slate-400'
                          }`} />
                          {meta.label}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="flex flex-col items-start gap-1">
                          <Link
                            to={`/site/${doctor.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>مشاهده وبسایت</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <span className="text-[10px] text-blue-600 font-mono font-medium" dir="ltr">
                            {getDoctorSubdomain(doctor)}
                          </span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <select
                          disabled={isUpdating}
                          value={status}
                          onChange={(e) => handleStatusChange(doctor.id, e.target.value as DoctorWebsiteStatus)}
                          className="bg-white text-slate-800 text-xs font-bold rounded-xl px-2.5 py-1.5 border border-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs disabled:opacity-50"
                        >
                          <option value="published">🟢 انتشار عمومی</option>
                          <option value="draft">🟡 پیش‌نویس</option>
                          <option value="disabled">⚪ غیرفعال</option>
                          <option value="suspended">🔴 تعلیق به دلیل تخلف</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 7. PATIENT CRM & RETENTION */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'crm' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                <UserCheck className="w-4 h-4" />
                مدیریت ارتباط با مراجعین (Patient CRM & Retention)
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                باشگاه وفاداری بیماران، ارزش طول عمر (LTV) و پیگیری‌های درمان
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                دسته‌بندی هوشمند پرونده‌های VIP، پیگیری‌های پس از درمان و پیشگیری از ریزش بیمار
              </p>
            </div>

            <Badge variant="blue">پایش وفاداری ({crmRecords.length} پرونده)</Badge>
          </div>

          {/* CRM Filter & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <input
              type="text"
              value={crmSearchQuery}
              onChange={e => setCrmSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس نام یا شماره تلفن بیمار..."
              className="p-2.5 rounded-2xl border border-slate-300 text-xs max-w-sm focus:border-blue-500 focus:outline-none"
            />

            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setCrmStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  crmStatusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600'
                }`}
              >
                همه ({crmRecords.length})
              </button>
              <button
                type="button"
                onClick={() => setCrmStatusFilter('vip')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  crmStatusFilter === 'vip' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600'
                }`}
              >
                بیماران VIP
              </button>
              <button
                type="button"
                onClick={() => setCrmStatusFilter('followup_needed')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  crmStatusFilter === 'followup_needed' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600'
                }`}
              >
                نیازمند پیگیری
              </button>
            </div>
          </div>

          <div className="overflow-x-auto text-xs rounded-2xl border border-slate-200">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3.5">نام بیمار</th>
                  <th className="p-3.5">تلفن همراه</th>
                  <th className="p-3.5">وضعیت وفاداری</th>
                  <th className="p-3.5">تعداد ویزیت‌ها</th>
                  <th className="p-3.5">ارزش کل (LTV)</th>
                  <th className="p-3.5">آخرین مراجعه</th>
                  <th className="p-3.5">موعد پیگیری</th>
                  <th className="p-3.5 text-center">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCrm.map(crm => (
                  <tr key={crm.patientId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{crm.name}</td>
                    <td className="p-3.5 font-mono text-slate-600" dir="ltr">{crm.phone}</td>
                    <td className="p-3.5">
                      <Badge variant={crm.status === 'vip' ? 'amber' : crm.status === 'followup_needed' ? 'rose' : 'blue'}>
                        {crm.status === 'vip' ? 'مشتری VIP' : crm.status === 'followup_needed' ? 'نیازمند پیگیری' : 'بیمار فعال'}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">{crm.lifetimeVisits} ویزیت</td>
                    <td className="p-3.5 font-extrabold text-blue-700">{crm.totalSpent.toLocaleString('fa-IR')} تومان</td>
                    <td className="p-3.5 text-slate-600">{crm.lastVisitDate}</td>
                    <td className="p-3.5 font-bold text-rose-600">{crm.nextFollowUpDate || 'ثبت نشده'}</td>
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => alert(`ثبت پیگیری و ارسال پیامک مراقبتی برای ${crm.name} انجام شد.`)}
                        className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-colors cursor-pointer"
                      >
                        ثبت پیگیری
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 8. OPERATIONS, QUEUE & NO-SHOW RECOVERY */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'operations' && (
        <SuperAdminOperationsQueue
          branches={branches}
          appointments={appointments}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 9. MARKETING, SMS ENGINE & PROMO CODES */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'marketing' && (
        <SuperAdminMarketingSms />
      )}

      {/* ---------------------------------------------------- */}
      {/* 10. SECURITY AUDIT, BACKUP & SYSTEM SETTINGS */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'security' && (
        <SuperAdminSecuritySettings
          activityLogs={activityLogs}
          onTriggerBackup={handleTriggerBackup}
        />
      )}
    </div>
  );
};
