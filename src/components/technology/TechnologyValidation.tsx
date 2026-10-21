import React, { useState, useEffect } from 'react';
import { ArrowRight, X, FileText, CheckCircle2 } from 'lucide-react';
import { TECHNOLOGY_DATA } from '../../technologyData';
import { ValidationIcon } from './TechnologyVectors';

export const TechnologyValidation: React.FC = () => {
  const { validationSection } = TECHNOLOGY_DATA;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsReportModalOpen(false);
    };
    if (isReportModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isReportModalOpen]);

  return (
    <section className="w-full bg-[#080A0C] text-white py-14 sm:py-16 lg:py-20 select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Centered Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-9">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight leading-snug">
            {validationSection.heading}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-slate-400 font-normal mt-2.5 leading-relaxed max-w-[750px] mx-auto">
            {validationSection.subtitle}
          </p>

          {/* Outlined White Button */}
          <div className="mt-5">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/60 hover:border-white text-white hover:bg-white/10 text-[13px] font-medium transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <span>{validationSection.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 White Credibility Cards in a horizontal row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {validationSection.badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white rounded-xl p-4 sm:p-5 flex items-center justify-center gap-4 text-slate-900 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <ValidationIcon type={badge.icon} className="w-10 h-10 flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-[14px] sm:text-[15px] font-extrabold tracking-wider uppercase text-slate-900 leading-tight">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Official Lab Test Report Summary Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-fade-in text-slate-900">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Official Aerodynamic Test Summary
                  </h3>
                  <p className="text-xs text-slate-500">
                    {validationSection.reportDetails.institution}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close test report"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="bg-sky-50/60 rounded-xl p-4 border border-sky-100">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                  Facility Protocol
                </span>
                <p className="text-xs font-semibold text-sky-950 mt-1.5">
                  {validationSection.reportDetails.testStandard}
                </p>
                <p className="text-xs text-sky-800 mt-1">
                  Lab: {validationSection.reportDetails.lab}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {validationSection.reportDetails.metrics.map((m, i) => (
                  <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-center">
                    <p className="text-xl font-black text-slate-900">{m.value}</p>
                    <p className="text-xs font-medium text-slate-600 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Scientific Synopsis */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Methodology & Observations
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {validationSection.reportDetails.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Verified by Environmental Aerodynamic Simulation Standards</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
