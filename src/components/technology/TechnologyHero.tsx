import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TECHNOLOGY_DATA } from '../../technologyData';

interface TechnologyHeroProps {
  onExploreClick: () => void;
}

export const TechnologyHero: React.FC<TechnologyHeroProps> = ({ onExploreClick }) => {
  const { hero } = TECHNOLOGY_DATA;

  return (
    <section className="relative w-full bg-white overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 select-none">
      {/* Subtle radial ambient background aura */}
      <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-sky-50/60 via-blue-50/30 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[440px] sm:min-h-[460px]">
          
          {/* LEFT: Editorial Content (42% width / lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left max-w-xl">
            {/* Eyebrow badge */}
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3 sm:mb-4">
              {hero.eyebrow}
            </span>

            {/* Main Headline */}
            <h1 className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-slate-900 tracking-tight leading-[1.08] mb-4 sm:mb-5">
              The Science <br />
              of Purified Air
            </h1>

            {/* Description Paragraph */}
            <p className="text-[15px] sm:text-[16px] text-slate-600 font-normal leading-[1.65] max-w-[460px] mb-6 sm:mb-8">
              {hero.description}
            </p>

            {/* Primary Action Button */}
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center justify-center gap-3 bg-[#1769FF] hover:bg-[#0754DC] text-white text-[13px] sm:text-[14px] font-medium h-[46px] sm:h-[48px] px-6 rounded-md shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#1769FF]/50"
            >
              <span>{hero.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* RIGHT: Molecular Science Visual Composition (58% width / lg:col-span-7) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">
              <img
                src={hero.image}
                alt="3D molecular science structure of purified water and oxygen ions"
                className="w-full h-full object-contain object-right transform transition-transform duration-700 hover:scale-[1.02]"
                onError={(e) => {
                  // Fallback to high-definition SVG composition if image is generating
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.hero-fallback-vector')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'hero-fallback-vector w-full h-full flex items-center justify-center';
                    fallback.innerHTML = `
                      <svg viewBox="0 0 500 400" fill="none" class="w-full h-full">
                        <defs>
                          <radialGradient id="sphereGrad1" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff"/>
                            <stop offset="40%" stop-color="#bae6fd"/>
                            <stop offset="85%" stop-color="#0284c7"/>
                            <stop offset="100%" stop-color="#0369a1"/>
                          </radialGradient>
                          <radialGradient id="sphereGrad2" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stop-color="#ffffff"/>
                            <stop offset="50%" stop-color="#e0f2fe"/>
                            <stop offset="90%" stop-color="#38bdf8"/>
                            <stop offset="100%" stop-color="#0284c7"/>
                          </radialGradient>
                        </defs>
                        <!-- Molecular connector rods -->
                        <line x1="240" y1="210" x2="380" y2="120" stroke="#bae6fd" stroke-width="18" stroke-linecap="round" opacity="0.8"/>
                        <line x1="240" y1="210" x2="160" y2="110" stroke="#bae6fd" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
                        <line x1="240" y1="210" x2="340" y2="310" stroke="#bae6fd" stroke-width="18" stroke-linecap="round" opacity="0.8"/>
                        <line x1="380" y1="120" x2="450" y2="230" stroke="#bae6fd" stroke-width="14" stroke-linecap="round" opacity="0.8"/>
                        <!-- Spheres -->
                        <circle cx="240" cy="210" r="75" fill="url(#sphereGrad1)"/>
                        <circle cx="380" cy="120" r="55" fill="url(#sphereGrad2)"/>
                        <circle cx="160" cy="110" r="42" fill="url(#sphereGrad2)"/>
                        <circle cx="340" cy="310" r="62" fill="url(#sphereGrad1)"/>
                        <circle cx="450" cy="230" r="46" fill="url(#sphereGrad2)"/>
                      </svg>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
