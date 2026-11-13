import React, { useState, useRef } from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';
import heroAtmospherePng from '../assets/images/hero-molecular-atmosphere.png';

interface TechnologyHeroProps {
  onScrollClick?: () => void;
}

export const TechnologyHero: React.FC<TechnologyHeroProps> = ({ onScrollClick }) => {
  const { hero } = TECHNOLOGY_PAGE_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Interactive mouse tracking parallax: moves the background image in sync with cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Multipliers for fluid, responsive sync movement (offset up to ~36px horizontal, ~24px vertical)
    setOffset({
      x: normX * 36,
      y: normY * 24,
    });
  };

  const handleMouseLeave = () => {
    // Smoothly settle back to center when cursor leaves section
    setOffset({ x: 0, y: 0 });
  };

  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const nextSection = document.getElementById('engineered-strip') || document.getElementById('our-science');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="technology-hero"
      aria-label="Technology Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#050811] text-white overflow-hidden min-h-[520px] sm:min-h-[560px] lg:h-[620px] xl:h-[640px] flex items-center"
    >
      {/* LAYER 1 & 2: Base Background (#050811) + Atmospheric Molecular Image (at 70% opacity, moving in sync with mouse cursor) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={heroAtmospherePng}
          alt=""
          role="presentation"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.08)`,
            transition: 'transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'transform',
          }}
          className="w-full h-full object-cover object-center opacity-70"
        />
      </div>

      {/* Main Content Area: Framed Typography Box positioned on the Left */}
      <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1600px] mx-auto h-full px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-start py-6 sm:py-8 lg:py-0">
        
        {/* Architectural Framed Box: Exact Match to Reference (Sharp rectangular 1px border, transparent glass, bold/light typography, standalone bottom-right down arrow) */}
        <div className="ky-tech-hero-frame relative w-full max-w-[440px] sm:max-w-[470px] lg:max-w-[490px] xl:max-w-[520px] min-h-[400px] sm:min-h-[450px] lg:h-[490px] xl:h-[510px] border border-white/45 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-transparent">
          
          {/* Top Eyebrow & High-Contrast Editorial Headline */}
          <div>
            <p className="text-[11px] sm:text-[12px] lg:text-[13px] font-bold tracking-[0.24em] text-white/90 uppercase font-sans mb-4 sm:mb-6">
              {hero.eyebrow}
            </p>
            
            <h1 className="text-[44px] sm:text-[54px] md:text-[60px] lg:text-[66px] xl:text-[70px] leading-[0.98] tracking-[-0.035em] text-white">
              <span className="block font-black text-white">
                {hero.headlineLine1}
              </span>
              <span className="block font-light text-white mt-1 sm:mt-1.5">
                {hero.headlineLine2}
              </span>
            </h1>
          </div>

          {/* Bottom Section with Clean Down Arrow Indicator (No circle container, matching reference image) */}
          <div className="flex justify-end pt-6 pr-1 pb-1">
            <button
              type="button"
              onClick={handleScroll}
              aria-label={hero.arrowAriaLabel}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer p-2 transition-transform duration-300 hover:translate-y-1.5 active:scale-95"
            >
              <svg
                width="34"
                height="42"
                viewBox="0 0 34 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white drop-shadow-sm"
              >
                <path
                  d="M17 2V38M17 38L3 24M17 38L31 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default TechnologyHero;
