import React from 'react';
import { Wind, Layers, Sparkles } from 'lucide-react';
import { TECHNOLOGY_DATA, TechnologyStep } from '../../technologyData';

export const TechnologySteps: React.FC = () => {
  const { stepsSection } = TECHNOLOGY_DATA;

  const renderIcon = (type: TechnologyStep['icon']) => {
    switch (type) {
      case 'wind':
        return <Wind className="w-5 h-5 text-slate-800" strokeWidth={1.8} />;
      case 'layers':
        return <Layers className="w-5 h-5 text-slate-800" strokeWidth={1.8} />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-slate-800" strokeWidth={1.8} />;
      default:
        return <Wind className="w-5 h-5 text-slate-800" strokeWidth={1.8} />;
    }
  };

  return (
    <section id="how-it-works" className="w-full bg-white pt-6 pb-16 sm:pb-20 select-none scroll-mt-24">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Centered Heading Area */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-[26px] sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug">
            {stepsSection.headingPart1}
            <span className="text-[#1769FF]">{stepsSection.headingHighlight}</span>
            {stepsSection.headingPart2}
          </h2>
          <p className="text-[14px] text-slate-500 font-normal mt-2 leading-relaxed">
            {stepsSection.subtitle}
          </p>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[22px]">
          {stepsSection.steps.map((step) => (
            <div
              key={step.number}
              className="group flex flex-col rounded-xl overflow-hidden border border-[#E8EBF0] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Upper Image Container (Near-black background with airflow / filtration visual) */}
              <div className="relative w-full h-[175px] sm:h-[180px] bg-[#0A0D12] overflow-hidden flex items-center justify-center p-4">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized vector step representation
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.step-vector-fallback')) {
                      const div = document.createElement('div');
                      div.className = 'step-vector-fallback w-full h-full flex items-center justify-center';
                      if (step.number === '01') {
                        div.innerHTML = `
                          <svg viewBox="0 0 200 120" fill="none" class="w-3/4 h-3/4">
                            <rect x="75" y="20" width="50" height="80" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
                            <!-- Inflow arrows -->
                            <path d="M20 40h45M20 60h45M20 80h45" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 4"/>
                            <path d="M180 40h-45M180 60h-45M180 80h-45" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 4"/>
                            <circle cx="45" cy="40" r="3" fill="#94a3b8"/>
                            <circle cx="35" cy="60" r="4" fill="#64748b"/>
                            <circle cx="155" cy="50" r="3" fill="#94a3b8"/>
                          </svg>
                        `;
                      } else if (step.number === '02') {
                        div.innerHTML = `
                          <svg viewBox="0 0 200 120" fill="none" class="w-3/4 h-3/4">
                            <polygon points="50,20 80,10 80,100 50,110" fill="#334155" stroke="#475569"/>
                            <polygon points="85,18 115,8 115,98 85,108" fill="#0284c7" stroke="#38bdf8"/>
                            <polygon points="120,16 150,6 150,96 120,106" fill="#1e293b" stroke="#475569"/>
                          </svg>
                        `;
                      } else {
                        div.innerHTML = `
                          <svg viewBox="0 0 200 120" fill="none" class="w-3/4 h-3/4">
                            <rect x="75" y="35" width="50" height="75" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
                            <!-- Upward clean flow -->
                            <path d="M85 30c0-15 15-20 15-25M100 30c0-18-5-22-5-28M115 30c0-15-15-20-15-25" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
                            <path d="M135 15c-6 0-10 4-10 10 6 0 10-4 10-10z" fill="#10b981"/>
                            <path d="M65 20c-5 0-8 3-8 8 5 0 8-3 8-8z" fill="#34d399"/>
                          </svg>
                        `;
                      }
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* Lower Info Container */}
              <div className="flex-1 bg-[#F8F8F9] p-5 sm:p-6 flex flex-col justify-between min-h-[145px]">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1 rounded-md bg-white border border-[#E2E6EE] shadow-2xs">
                      {renderIcon(step.icon)}
                    </div>
                    <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
