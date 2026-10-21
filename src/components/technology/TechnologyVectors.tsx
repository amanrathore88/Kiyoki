import React from 'react';

// ==========================================
// 1. BENEFIT ICONS (Vector illustrations for 6 benefit cards)
// ==========================================

export const BenefitIcon: React.FC<{ type: 'air' | 'odour' | 'lungs' | 'allergy' | 'clock' | 'leaf'; className?: string }> = ({ type, className = 'w-16 h-16' }) => {
  switch (type) {
    case 'air':
      return (
        <div className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100/70 p-3 shadow-xs border border-sky-100/60`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="airCloud" x1="16" y1="20" x2="48" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="airStream" x1="10" y1="38" x2="54" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7dd3fc" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Soft cloud body */}
            <path
              d="M45.5 36h-27a9.5 9.5 0 01-2-18.8 12.5 12.5 0 0124.2-3.2A9.5 9.5 0 0145.5 36z"
              fill="url(#airCloud)"
              fillOpacity="0.85"
            />
            {/* Dynamic flow lines */}
            <path
              d="M12 44h26a4 4 0 000-8"
              stroke="url(#airStream)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M16 51h28a4 4 0 000-8"
              stroke="#0284c7"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M8 38h6"
              stroke="#bae6fd"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case 'odour':
      return (
        <div className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/70 p-3 shadow-xs border border-amber-100/60`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <rect x="12" y="32" width="40" height="20" rx="4" fill="#fed7aa" />
            <rect x="8" y="36" width="6" height="16" rx="2" fill="#fdba74" />
            <rect x="50" y="36" width="6" height="16" rx="2" fill="#fdba74" />
            <path d="M16 28h32v4H16z" fill="#f97316" fillOpacity="0.8" />
            {/* Neutralizing waves */}
            <path d="M24 20c0-4 4-4 4-8" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 18c0-5 5-5 5-10" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M40 20c0-4 4-4 4-8" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'lungs':
      return (
        <div className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-100/70 p-3 shadow-xs border border-cyan-100/60`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="lungGrad" x1="16" y1="16" x2="48" y2="52" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0ea5e9" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            {/* Trachea */}
            <path d="M32 10v16M28 14h8M28 18h8M28 22h8" stroke="#0369a1" strokeWidth="2.8" strokeLinecap="round" />
            {/* Left Lung */}
            <path
              d="M30 26c-3 0-14 3-14 15 0 9 6 15 13 15 3 0 3-4 3-8 0-8-1-17-2-22z"
              fill="url(#lungGrad)"
            />
            {/* Right Lung */}
            <path
              d="M34 26c3 0 14 3 14 15 0 9-6 15-13 15-3 0-3-4-3-8 0-8 1-17 2-22z"
              fill="url(#lungGrad)"
            />
            {/* Inner air glow */}
            <circle cx="24" cy="38" r="2.5" fill="#e0f2fe" />
            <circle cx="40" cy="38" r="2.5" fill="#e0f2fe" />
          </svg>
        </div>
      );

    case 'allergy':
      return (
        <div className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100/70 p-3 shadow-xs border border-rose-100/60`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            {/* Gentle family / mother & child silhouette */}
            <circle cx="26" cy="22" r="7" fill="#fb7185" />
            <path d="M15 48c0-8 5-13 13-13s13 5 13 13H15z" fill="#f43f5e" fillOpacity="0.85" />
            <circle cx="41" cy="28" r="5.5" fill="#f43f5e" />
            <path d="M32 50c0-6 4-10 10-10s10 4 10 10H32z" fill="#fb7185" />
            {/* Protective sparkle */}
            <path d="M47 14l1.5 3.5L52 19l-3.5 1.5L47 24l-1.5-3.5L42 19l3.5-1.5L47 14z" fill="#38bdf8" />
          </svg>
        </div>
      );

    case 'clock':
      return (
        <div className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100/70 p-3 shadow-xs border border-blue-100/60`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="22" stroke="#2563eb" strokeWidth="3.2" strokeDasharray="3 3" />
            <path d="M32 14a18 18 0 11-18 18" stroke="#1d4ed8" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M14 16v8h8" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* 24/7 Text badge */}
            <text x="32" y="37" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="800" fontFamily="sans-serif">
              24/7
            </text>
          </svg>
        </div>
      );

    case 'leaf':
      return (
        <div className={`${className} flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100/70 p-3 shadow-xs border border-emerald-100/60`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="leafGrad" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path
              d="M48 16c-18 0-32 12-32 32 18 0 32-12 32-32z"
              fill="url(#leafGrad)"
            />
            <path
              d="M16 48c8-10 18-20 32-32"
              stroke="#d1fae5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M26 38l6-2M33 30l6-2M40 22l5-2"
              stroke="#d1fae5"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

// ==========================================
// 2. VALIDATION BADGE ICONS
// ==========================================

export const ValidationIcon: React.FC<{ type: 'seal' | 'flask' | 'shield'; className?: string }> = ({ type, className = 'w-10 h-10' }) => {
  switch (type) {
    case 'seal':
      return (
        <div className={`${className} flex items-center justify-center rounded-full bg-stone-100 border border-stone-300 text-stone-800`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M7 12h10" />
            <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
          </svg>
        </div>
      );

    case 'flask':
      return (
        <div className={`${className} flex items-center justify-center rounded-full bg-stone-100 border border-stone-300 text-stone-800`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 2v5.5L4.5 18a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14 7.5V2h-4z" />
            <path strokeLinecap="round" d="M8.5 14h7M9 2h6" />
          </svg>
        </div>
      );

    case 'shield':
      return (
        <div className={`${className} flex items-center justify-center rounded-full bg-stone-100 border border-stone-300 text-stone-800`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

// ==========================================
// 3. SCIENTIFIC PURIFICATION DIAGRAM TILE
// ==========================================

export const ScientificPurificationDiagram: React.FC = () => {
  return (
    <div className="w-full h-full bg-white p-5 rounded-2xl flex flex-col justify-between select-none border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Purification Process</span>
        <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">5-Stage System</span>
      </div>

      <div className="my-auto py-2 grid grid-cols-5 gap-1.5 items-center text-center">
        {/* Stage 1: Polluted Air */}
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-slate-700 leading-tight">Polluted Air</span>
        </div>

        <div className="text-slate-300 font-bold text-xs">→</div>

        {/* Stage 2: Anion Generation */}
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center mb-1 shadow-xs">
            <span className="text-[10px] font-black">e⁻</span>
          </div>
          <span className="text-[9px] font-bold text-sky-700 leading-tight">Anion Emission</span>
        </div>

        <div className="text-slate-300 font-bold text-xs">→</div>

        {/* Stage 3: HEPA Trap */}
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-1 shadow-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-emerald-700 leading-tight">99.97% Pure</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
        <span>Particulate Agglomeration</span>
        <span className="font-bold text-slate-900">0.3 Microns</span>
      </div>
    </div>
  );
};
