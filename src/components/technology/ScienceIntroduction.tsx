import React from 'react';
import { TECHNOLOGY_DATA } from '../../technologyData';

export const ScienceIntroduction: React.FC = () => {
  const { sciencePanel } = TECHNOLOGY_DATA;

  return (
    <section className="w-full bg-white pt-2 pb-10 sm:pb-14 select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Horizontal information box */}
        <div className="bg-[#F7F8FA] border border-[#E8EBF0] rounded-xl p-6 sm:p-8 lg:px-12 lg:py-9 shadow-2xs transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Left Column (32% / md:col-span-4) */}
            <div className="md:col-span-4 flex flex-col justify-center">
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                {sciencePanel.eyebrow}
              </span>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1769FF] tracking-tight leading-tight">
                {sciencePanel.highlight}
              </h2>
            </div>

            {/* Subtle Vertical Divider on Desktop / Horizontal on Mobile */}
            <div className="hidden md:block w-px h-16 bg-[#E0E4EC] md:col-span-1 mx-auto" />

            {/* Right Column (68% / md:col-span-7) */}
            <div className="md:col-span-7 flex items-center">
              <p className="text-[15px] sm:text-[16px] text-slate-700 font-normal leading-[1.65] max-w-[650px]">
                {sciencePanel.paragraph}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
