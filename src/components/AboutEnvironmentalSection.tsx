import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Leaf, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { ABOUT_ENVIRONMENTAL_SLIDES } from './aboutEnvironmentalData';

export const AboutEnvironmentalSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = ABOUT_ENVIRONMENTAL_SLIDES.length;
  const currentSlide = ABOUT_ENVIRONMENTAL_SLIDES[currentIndex];

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((newIndex + totalSlides) % totalSlides);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning, totalSlides]
  );

  const handlePrev = () => {
    changeSlide(currentIndex - 1);
  };

  const handleNext = () => {
    changeSlide(currentIndex + 1);
  };

  // Keyboard navigation support when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isTransitioning]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    if (diffX > 45) {
      handleNext();
    } else if (diffX < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'COMMUNITY & EQUITY':
        return <Award className="w-3.5 h-3.5 text-[#2D6A4F]" />;
      case 'SUSTAINABLE ENGINEERING':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />;
      case 'BIOSPHERE STEWARDSHIP':
        return <Leaf className="w-3.5 h-3.5 text-[#2D6A4F]" />;
      case 'RESEARCH & ADVOCACY':
        return <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />;
      default:
        return <Leaf className="w-3.5 h-3.5 text-[#2D6A4F]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-environmental-commitment"
      aria-label="Environmental and Climate Commitment"
      className="w-full bg-white text-[#050505] pt-16 sm:pt-20 lg:pt-24 pb-18 sm:pb-24 lg:pb-32 select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
        
        {/* =====================================================================
            TOP HEADER AREA: Centered Title & Interactive Navigation Arrows
            Matches reference image with centered title and distinct < > buttons
           ===================================================================== */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16">
          
          <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#2D6A4F] uppercase font-sans mb-3 sm:mb-3.5">
            OUR COMMITMENT TO THE PLANET
          </p>

          <h2 className="text-[32px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-black text-[#050505] tracking-tight leading-[1.08] max-w-3xl">
            Environmental & Climate Action
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mt-3 sm:mt-4 leading-relaxed font-normal">
            How Kiyoki merges aerosol physics, zero-harm engineering, and ecological restoration to ensure pure, breathable air for all communities.
          </p>

          {/* Top Navigation Controls: Left & Right Arrows + Slide Counter */}
          <div className="flex items-center gap-4 mt-6 sm:mt-7">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 hover:text-black flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700 hover:text-black" />
            </button>

            {/* Slide Index Pill */}
            <div className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-[13px] font-bold tracking-widest text-neutral-800">
              <span className="text-[#050505] font-black">{currentSlide.number}</span>
              <span className="text-neutral-400 mx-1.5">/</span>
              <span className="text-neutral-500">{String(totalSlides).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 hover:text-black flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700 hover:text-black" />
            </button>
          </div>

          {/* Quick Jump Dot Indicators */}
          <div className="flex items-center gap-2 mt-4">
            {ABOUT_ENVIRONMENTAL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => changeSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === currentIndex
                    ? 'w-7 bg-[#2D6A4F]'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

        </div>

        {/* =====================================================================
            MAIN STAGE: 3-Element Layout (Left Image - Center Card - Right Image)
            Matches Reference Image Exactly: Left photo + Center text card + Right photo
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* ===================================================================
              LEFT COLUMN: Ambient Reality / Context Image
             =================================================================== */}
          <div className="order-2 lg:order-1 col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col">
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md bg-neutral-100 group border border-neutral-200/60 transition-all duration-500">
              <img
                src={currentSlide.leftImage.src}
                alt={currentSlide.leftImage.alt}
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  isTransitioning ? 'opacity-40 scale-98 blur-[1px]' : 'opacity-100 scale-100 blur-0'
                }`}
                loading="eager"
              />
              {/* Subtle bottom gradient vignette with caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 sm:p-5 pt-12 flex flex-col justify-end">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-white/70 block mb-1">
                  Context Perspective
                </span>
                <p className="text-white text-xs sm:text-[13px] font-medium leading-snug drop-shadow-sm">
                  {currentSlide.leftImage.label}
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================================
              CENTER COLUMN: The Editorial Content Card
              Elevated, high-contrast typography, metrics badge, & brand narrative
             =================================================================== */}
          <div className="order-1 lg:order-2 col-span-12 lg:col-span-6 xl:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[540px] bg-[#F8F9FA] rounded-2xl sm:rounded-3xl p-6 sm:p-9 lg:p-11 border border-neutral-200 shadow-sm flex flex-col justify-between overflow-hidden">
              
              {/* Watermark Slide Number in Background */}
              <div
                className="absolute top-2 sm:top-4 right-6 sm:right-8 font-serif text-[84px] sm:text-[110px] lg:text-[124px] font-black text-neutral-200/50 leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                {currentSlide.number}
              </div>

              {/* Top Meta Area: Category Tag & Metric Badge */}
              <div
                className={`relative z-10 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-4 sm:mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[#2D6A4F] text-[11px] sm:text-[12px] font-bold tracking-wider uppercase shadow-xs">
                    {getCategoryIcon(currentSlide.category)}
                    {currentSlide.category}
                  </span>

                  <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 bg-neutral-200/60 px-2.5 py-1 rounded-full">
                    Kiyoki Ecological Charter
                  </span>
                </div>

                {/* Slide Main Heading */}
                <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-black text-[#050505] tracking-tight leading-[1.14] mb-3">
                  {currentSlide.title}
                </h3>

                {/* Subtitle / Tagline */}
                <p className="text-neutral-700 text-sm sm:text-base font-semibold leading-snug mb-5 text-[#2D6A4F]">
                  {currentSlide.tagline}
                </p>

                {/* Metric / Empirical Highlight Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[#1B4332] text-xs sm:text-[13px] font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                  <span>{currentSlide.metricsBadge}</span>
                </div>

                {/* Body Paragraphs */}
                <div className="space-y-3.5 sm:space-y-4 text-neutral-600 text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.68] font-normal">
                  {currentSlide.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer: Navigation hint & Slide Progression */}
              <div className="relative z-10 pt-6 sm:pt-8 mt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500">
                <span className="font-medium flex items-center gap-1.5 text-neutral-600">
                  <Leaf className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  Dedicated to regional biosphere and atmospheric recovery
                </span>

                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-neutral-400">
                  <span>SWIPE OR USE ARROWS</span>
                  <span>•</span>
                  <span>{currentIndex + 1} OF {totalSlides}</span>
                </div>
              </div>

            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Action / Solution / Technological Image
             =================================================================== */}
          <div className="order-3 lg:order-3 col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col">
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md bg-neutral-100 group border border-neutral-200/60 transition-all duration-500">
              <img
                src={currentSlide.rightImage.src}
                alt={currentSlide.rightImage.alt}
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  isTransitioning ? 'opacity-40 scale-98 blur-[1px]' : 'opacity-100 scale-100 blur-0'
                }`}
                loading="eager"
              />
              {/* Subtle bottom gradient vignette with caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 sm:p-5 pt-12 flex flex-col justify-end">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-white/70 block mb-1">
                  Action Initiative
                </span>
                <p className="text-white text-xs sm:text-[13px] font-medium leading-snug drop-shadow-sm">
                  {currentSlide.rightImage.label}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutEnvironmentalSection;
