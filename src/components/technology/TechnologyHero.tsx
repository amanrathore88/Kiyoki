import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Shield, Wind } from 'lucide-react';
import { TECHNOLOGY_DATA } from '../../technologyData';

interface TechnologyHeroProps {
  onExploreClick: () => void;
  onWatchClick?: () => void;
}

export const TechnologyHero: React.FC<TechnologyHeroProps> = ({
  onExploreClick,
  onWatchClick,
}) => {
  const { hero } = TECHNOLOGY_DATA;
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Trigger entrance sequence once mounted
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 40);
    return () => clearTimeout(timer);
  }, []);

  // Subtle desktop mouse parallax (max 6-8px movement, disabled on touch/reduced motion)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 1024) return;
    }
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // -6px to +6px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;  // -4px to +4px
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleWatchVideo = () => {
    if (onWatchClick) {
      onWatchClick();
      return;
    }
    const videoSection = document.getElementById('technology-video');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[540px] min-h-[490px] max-h-[620px] lg:h-[560px] overflow-hidden select-none flex items-center bg-[#FFFFFF]"
      style={{ margin: 0, padding: 0 }}
    >
      {/* =========================================================
          LAYER 1 — 3D CLEAN AIR & PARTICULATE HERO BACKGROUND
          Fills 100% width & height with responsive cover alignment
          ========================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `scale(${isLoaded ? 1 : 1.02}) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1000ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={hero.image}
          alt="From Polluted to Pure Air - Kiyoki air purification technology breakdown"
          className="w-full h-full object-cover object-[72%_center] lg:object-[center_right]"
          loading="eager"
        />
      </div>

      {/* =========================================================
          LAYER 2 — SOFT READABILITY GRADIENT OVERLAY (LEFT SIDE)
          Ensures high text contrast without obscuring the 3D visual
          ========================================================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 32%, rgba(255,255,255,0.22) 58%, rgba(255,255,255,0) 78%)',
        }}
      />

      {/* Mobile-specific overlay for legibility on small screens */}
      <div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.20) 100%)',
        }}
      />

      {/* =========================================================
          LAYER 3 — SCIENTIFIC CALLOUT ANNOTATIONS (DESKTOP)
          Curved pointer lines & technical labels pinned to visual points
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-15 hidden lg:block overflow-hidden">
        <div className="relative w-full max-w-[1360px] h-full mx-auto">
          
          {/* CALLOUT 1 — TRAPS ULTRA-FINE PARTICLES */}
          <div
            className="absolute top-[8%] left-[51%] flex flex-col items-start transition-all duration-700 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '300ms',
            }}
          >
            <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-slate-800 leading-[1.25] uppercase text-left mb-1">
              TRAPS<br />ULTRA-FINE<br />PARTICLES
            </p>
            {/* Curved pointer line with anchor dot */}
            <svg
              className="w-12 h-16 xl:w-14 xl:h-20 text-slate-800 overflow-visible"
              viewBox="0 0 50 70"
              fill="none"
            >
              <path
                d="M8 2 C 8 26, 32 38, 42 62"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="42" cy="62" r="2.8" fill="currentColor" />
            </svg>
          </div>

          {/* CALLOUT 2 — NEUTRALIZES HARMFUL PARTICLES */}
          <div
            className="absolute top-[5%] right-[22%] flex flex-col items-start transition-all duration-700 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '450ms',
            }}
          >
            <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-slate-800 leading-[1.25] uppercase text-left mb-1">
              NEUTRALIZES<br />HARMFUL PARTICLES
            </p>
            {/* Curved pointer line with anchor dot */}
            <svg
              className="w-10 h-14 text-slate-800 overflow-visible"
              viewBox="0 0 40 50"
              fill="none"
            >
              <path
                d="M6 2 C 6 18, 14 26, 22 42"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="22" cy="42" r="2.8" fill="currentColor" />
            </svg>
          </div>

          {/* CALLOUT 3 — RELEASES CLEANER, FRESHER AIR */}
          <div
            className="absolute bottom-[16%] right-[11%] flex items-center gap-2 transition-all duration-700 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: '600ms',
            }}
          >
            {/* Curved pointer line with anchor dot pointing left-upwards */}
            <svg
              className="w-12 h-10 text-slate-800 overflow-visible shrink-0"
              viewBox="0 0 50 35"
              fill="none"
            >
              <circle cx="4" cy="18" r="2.8" fill="currentColor" />
              <path
                d="M4 18 C 18 18, 30 24, 46 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-slate-800 leading-[1.25] uppercase text-left">
              RELEASES<br />CLEANER,<br />FRESHER AIR
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================
          LAYER 4 — EDITORIAL CONTENT CONTAINER (LEFT-ALIGNED)
          ========================================================= */}
      <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center h-full">
        <div className="w-full max-w-[560px] text-left flex flex-col items-start">
          
          {/* Eyebrow Label with Right Accent Line */}
          <div
            className="flex items-center gap-3 mb-2.5 sm:mb-3.5 transition-all duration-500 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.24em] text-[#475569] uppercase font-mono">
              {hero.eyebrow}
            </span>
            <span className="inline-block w-10 sm:w-14 h-[1.5px] bg-[#94A3B8]/70 rounded-full" />
          </div>

          {/* Main Headline: FROM POLLUTED TO PURE AIR */}
          <div
            className="w-full mb-5 sm:mb-6 transition-all duration-650 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(18px)',
              transitionDelay: '100ms',
            }}
          >
            {/* LINE 1: FROM */}
            <span className="block text-[22px] sm:text-[28px] lg:text-[34px] font-normal tracking-[0.22em] text-[#1E293B] uppercase mb-0 sm:mb-0.5">
              {hero.headline.from}
            </span>

            {/* LINE 2: POLLUTED (Heavy, Textured Carbon Particle Aesthetic) */}
            <h1
              className="block text-[46px] sm:text-[62px] lg:text-[76px] font-black tracking-[-0.035em] leading-[0.92] uppercase text-[#0F172A] select-none"
              style={{
                backgroundImage: "url('/images/technology/carbon-particle-texture.jpg')",
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                backgroundColor: '#0F172A',
              }}
            >
              {hero.headline.polluted}
            </h1>

            {/* LINE 3: TO PURE AIR */}
            <div className="flex items-baseline gap-2.5 sm:gap-3.5 leading-[0.94] mt-1 sm:mt-1.5">
              <span className="text-[22px] sm:text-[28px] lg:text-[34px] font-normal tracking-[0.22em] text-[#1E293B] uppercase">
                {hero.headline.to}
              </span>
              <span
                className="text-[46px] sm:text-[62px] lg:text-[76px] font-black tracking-[-0.035em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-[#0095FF] to-[#0066FF]"
                style={{
                  filter: 'drop-shadow(0 2px 14px rgba(0, 160, 255, 0.28))',
                }}
              >
                {hero.headline.pureAir}
              </span>
            </div>
          </div>

          {/* Three Feature Badges Strip (Captures, Neutralizes, Releases) */}
          <div
            className="flex items-center gap-3 sm:gap-5 py-1 mb-6 sm:mb-8 transition-all duration-600 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(14px)',
              transitionDelay: '220ms',
            }}
          >
            {/* Feature 1: Captures Pollutants */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Custom particle dispersion dots icon matching reference */}
              <div className="w-5 h-5 text-slate-800 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <circle cx="12" cy="12" r="2.2" />
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                  <circle cx="7" cy="7" r="1.3" />
                  <circle cx="17" cy="7" r="1.3" />
                  <circle cx="7" cy="17" r="1.3" />
                  <circle cx="17" cy="17" r="1.3" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] text-[#1E293B] uppercase leading-[1.25]">
                {hero.features[0].line1}<br />{hero.features[0].line2}
              </p>
            </div>

            {/* Vertical Divider 1 */}
            <div className="w-[1px] h-6 sm:h-7 bg-[#CBD5E1]" />

            {/* Feature 2: Neutralizes Harmful Particles */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Shield className="w-4 h-4 text-slate-800 shrink-0 stroke-[2.2]" />
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] text-[#1E293B] uppercase leading-[1.25]">
                {hero.features[1].line1}<br />{hero.features[1].line2}
              </p>
            </div>

            {/* Vertical Divider 2 */}
            <div className="w-[1px] h-6 sm:h-7 bg-[#CBD5E1]" />

            {/* Feature 3: Releases Cleaner Air */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Wind className="w-4 h-4 text-slate-800 shrink-0 stroke-[2.2]" />
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] text-[#1E293B] uppercase leading-[1.25]">
                {hero.features[2].line1}<br />{hero.features[2].line2}
              </p>
            </div>
          </div>

          {/* Action CTAs: Primary Explore Button + Secondary Watch Video Button */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-550 ease-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: '340ms',
            }}
          >
            {/* Primary Blue Button */}
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center justify-center gap-2.5 bg-[#1769FF] hover:bg-[#0754DC] text-white text-[13px] sm:text-[14px] font-semibold h-[46px] px-6 sm:px-7 rounded-full shadow-[0_4px_16px_rgba(23,105,255,0.28)] hover:shadow-[0_6px_22px_rgba(23,105,255,0.38)] transition-all duration-200 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1769FF]/50"
            >
              <span>{hero.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </button>

            {/* Secondary Circular Play Button */}
            <button
              onClick={handleWatchVideo}
              className="group inline-flex items-center gap-3 text-slate-800 hover:text-[#1769FF] transition-colors focus:outline-none"
              aria-label="Watch how Kiyoki technology works"
            >
              <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#1769FF] transition-all duration-200 group-hover:scale-108 group-hover:shadow-md">
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
              </div>
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-normal text-[#0F172A] group-hover:text-[#1769FF] transition-colors">
                {hero.watchButtonText}
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnologyHero;
