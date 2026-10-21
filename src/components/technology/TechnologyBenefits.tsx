import React from 'react';
import { TECHNOLOGY_DATA } from '../../technologyData';
import { BenefitIcon } from './TechnologyVectors';

export const TechnologyBenefits: React.FC = () => {
  const { benefitsSection } = TECHNOLOGY_DATA;

  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-16 sm:pb-20 select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2 block">
            {benefitsSection.eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
            {benefitsSection.heading}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#70757F] font-normal mt-2 leading-relaxed">
            {benefitsSection.subtitle}
          </p>
        </div>

        {/* 3 Columns x 2 Rows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {benefitsSection.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white border border-[#EFF0F2] rounded-xl p-5 sm:p-6 flex items-center gap-4 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default group"
            >
              {/* Left Custom Visual Vector Illustration */}
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                <BenefitIcon type={benefit.iconType} className="w-16 h-16 sm:w-[72px] sm:h-[72px]" />
              </div>

              {/* Right Text Content */}
              <div className="flex-1 text-left">
                <h3 className="text-[15px] font-bold text-slate-900 tracking-tight leading-snug mb-1">
                  {benefit.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-slate-600 leading-[1.6]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
