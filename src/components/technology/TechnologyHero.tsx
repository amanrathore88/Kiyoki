import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { TECHNOLOGY_DATA } from '../../technologyData';

interface TechnologyHeroProps {
  onExploreClick: () => void;
}

export const TechnologyHero: React.FC<TechnologyHeroProps> = ({ onExploreClick }) => {
  const { hero } = TECHNOLOGY_DATA;
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Trigger entrance sequence once mounted
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Subtle desktop mouse parallax (max 6-8px movement, disabled on touch/reduced motion)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // -6px to +6px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;  // -4px to +4px
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[460px] min-h-[420px] max-h-[500px] overflow-hidden select-none flex items-center bg-[#FFFFFF]"
      style={{ margin: 0, padding: 0 }}
    >
      {/* =========================================================
          LAYER 1 — GENERATED FULL-WIDTH MOLECULAR BACKGROUND
          Fills 100% width & height with cover sizing and center-right position
          ========================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `scale(${isLoaded ? 1 : 1.025}) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1200ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={hero.image}
          alt="KIYOKI Ultra-wide molecular science structure"
          className="w-full h-full object-cover object-[78%_center] lg:object-[center_right]"
          loading="eager"
        />
      </div>

      {/* =========================================================
          LAYER 2 — SUBTLE READABILITY GRADIENT OVERLAY
          Light overlay on the left to guarantee optimal contrast
          while preserving the crystal-clear glass refractions on the right
          ========================================================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 28%, rgba(255,255,255,0.20) 52%, rgba(255,255,255,0) 75%)',
        }}
      />

      {/* Mobile-specific soft background tint for ultra-small screens */}
      <div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 100%)',
        }}
      />

      {/* =========================================================
          LAYER 3 — FOREGROUND EDITORIAL CONTENT CONTAINER
          Positioned directly over the soft white left portion
          Max-width 475px, vertically centered, generous negative space
          ========================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center h-full">
        <div className="w-full max-w-[475px] text-left flex flex-col items-start">
          
          {/* Eyebrow Label */}
          <span
            className="text-[12px] font-medium uppercase tracking-[2.5px] text-[#717887] mb-[14px] transition-all duration-450 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
              transitionDuration: '450ms',
            }}
          >
            {hero.eyebrow}
          </span>

          {/* Main Heading (Exactly two lines at desktop) */}
          <h1
            className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-[#101114] tracking-[-1.5px] leading-[1.12] max-w-[470px] mb-[20px] transition-all duration-650 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDuration: '650ms',
              transitionDelay: '100ms',
            }}
          >
            The Science <br />
            of Purified Air
          </h1>

          {/* Description */}
          <p
            className="text-[15px] font-normal text-[#3F4652] leading-[1.65] max-w-[410px] mb-[24px] transition-all duration-550 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(14px)',
              transitionDuration: '550ms',
              transitionDelay: '230ms',
            }}
          >
            {hero.description}
          </p>

          {/* Primary CTA Button */}
          <button
            onClick={onExploreClick}
            className="group inline-flex items-center justify-center gap-[12px] bg-[#1769FF] hover:bg-[#0754DC] text-white text-[13px] font-semibold h-[46px] px-[22px] rounded-[6px] shadow-none transition-all duration-220 ease-out transform active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#1769FF]/50"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transitionDuration: '500ms',
              transitionDelay: '350ms',
            }}
          >
            <span>{hero.buttonText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-220 ease-out group-hover:translate-x-1" />
          </button>

        </div>
      </div>
    </section>
  );
};
