import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft, ChevronDown, Copy, Check, Eye, ExternalLink } from 'lucide-react';
import { Doctor } from '../../types';

interface Props {
  currentDoctor: Doctor;
  availableDoctors: Doctor[];
}

export const SubdomainSimulationBar: React.FC<Props> = ({
  currentDoctor,
  availableDoctors
}) => {
  const [copied, setCopied] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const navigate = useNavigate();

  const cleanSlug = currentDoctor.slug.replace(/^dr-/, '');
  const simulatedSubdomain = `https://dr-${cleanSlug}.hospital.ir`;

  const handleCopy = () => {
    navigator.clipboard.writeText(simulatedSubdomain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (minimized) {
    return (
      <div className="fixed top-2 left-2 z-50 animate-in fade-in" dir="rtl">
        <button
          onClick={() => setMinimized(false)}
          className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-xl border border-slate-700 hover:bg-slate-800 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>ساب‌دامنه: dr-{cleanSlug}.hospital.ir</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white text-xs font-sans border-b border-slate-800 py-2 px-3 sm:px-6 relative z-50 shadow-md select-none" dir="rtl">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Domain URL Info */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 text-[11px]">ساب‌دامنه اختصاصی پزشک:</span>
            <code className="text-amber-300 font-mono font-bold text-xs" dir="ltr">
              {simulatedSubdomain}
            </code>
            <button
              onClick={handleCopy}
              className="p-1 hover:text-amber-300 text-slate-400 transition-colors ml-1 cursor-pointer"
              title="کپی آدرس ساب‌دامنه"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden md:inline">
            (وب‌سایت مستقل پزشک - بدون وابستگی به فریم)
          </span>
        </div>

        {/* Right: Switcher & Return to Hospital Button */}
        <div className="flex items-center gap-2 sm:gap-3 mr-auto">
          {/* Doctor Switcher Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 hidden sm:inline">تغییر پزشک:</span>
            <select
              value={currentDoctor.slug}
              onChange={(e) => {
                navigate(`/site/${e.target.value}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-hidden cursor-pointer"
            >
              {availableDoctors.map(doc => (
                <option key={doc.id} value={doc.slug}>
                  {doc.name} ({doc.specialtyName})
                </option>
              ))}
            </select>
          </div>

          {/* Return to Hospital Portal Button */}
          <Link
            to="/doctors"
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>سایت اصلی بیمارستان (hospital.ir)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>

          {/* Minimize button */}
          <button
            onClick={() => setMinimized(true)}
            className="text-slate-400 hover:text-white px-1.5 py-1 text-[11px] cursor-pointer"
            title="کوچک کردن نوار ساب‌دامنه"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
