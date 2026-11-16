import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      }, 300);
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

  return (
    <section
      ref={sectionRef}
      id="about-environmental-commitment"
      aria-label="Environmental and Climate Action"
      className="w-full bg-white text-[#050505] pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
        
        {/* =====================================================================
            TOP HEADER AREA: Centered Title & Interactive Navigation Arrows
            Clean header without eyebrow, subtitle, or bottom dots per user request
           ===================================================================== */}
        <div className="flex flex-col items-center text-center mb-7 sm:mb-9 lg:mb-10">
          
          <h2 className="text-[32px] sm:text-[44px] md:text-[50px] lg:text-[54px] font-black text-[#050505] tracking-tight leading-[1.08] max-w-3xl">
            Environmental & Climate Action
          </h2>

          {/* Navigation Controls: Circular Left & Right Buttons with Index Pill */}
          <div className="flex items-center gap-3.5 mt-5 sm:mt-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 hover:text-black flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-700 hover:text-black" />
            </button>

            {/* Slide Index Counter Pill */}
            <div className="px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[12px] sm:text-[13px] font-bold tracking-widest text-neutral-800">
              <span className="text-[#050505] font-black">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-neutral-400 mx-1.5">/</span>
              <span className="text-neutral-500">{String(totalSlides).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 hover:text-black flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-neutral-700 hover:text-black" />
            </button>
          </div>

        </div>

        {/* =====================================================================
            MAIN STAGE: 3-Element Layout (Left Image - Center Card - Right Image)
            Slightly tightened height for elegant, compact proportions
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 xl:gap-8 items-stretch">
          
          {/* ===================================================================
              LEFT COLUMN: Ambient Reality / Context Image
             =================================================================== */}
          <div className="order-2 lg:order-1 col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col">
            <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] lg:h-[450px] xl:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md bg-neutral-100 group border border-neutral-200/60 transition-all duration-500">
              <img
                src={currentSlide.leftImage.src}
                alt={currentSlide.leftImage.alt}
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  isTransitioning ? 'opacity-40 scale-98 blur-[1px]' : 'opacity-100 scale-100 blur-0'
                }`}
                loading="eager"
              />
              {/* Subtle bottom gradient vignette with caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 pt-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/70 block mb-0.5">
                  Context Perspective
                </span>
                <p className="text-white text-xs font-medium leading-snug drop-shadow-sm">
                  {currentSlide.leftImage.label}
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================================
              CENTER COLUMN: The Editorial Content Card
              Clean, focused typography matching reference (badges/taglines/footer removed)
             =================================================================== */}
          <div className="order-1 lg:order-2 col-span-12 lg:col-span-6 xl:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[400px] lg:h-[450px] xl:h-[470px] bg-[#F8F9FA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 xl:p-10 border border-neutral-200/90 shadow-xs flex flex-col justify-center overflow-hidden">
              
              {/* Clean Number & Content Area */}
              <div
                className={`transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                {/* Step Number matching reference image */}
                <span className="text-neutral-400 font-bold text-sm sm:text-base mb-2 sm:mb-2.5 block">
                  {currentSlide.number}
                </span>

                {/* Main Heading */}
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-black text-[#050505] tracking-tight leading-[1.18] mb-4 sm:mb-5">
                  {currentSlide.title}
                </h3>

                {/* Body Paragraphs */}
                <div className="space-y-3.5 sm:space-y-4 text-neutral-600 text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.68] font-normal">
                  {currentSlide.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Action / Solution / Technological Image
             =================================================================== */}
          <div className="order-3 lg:order-3 col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col">
            <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] lg:h-[450px] xl:h-[470px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md bg-neutral-100 group border border-neutral-200/60 transition-all duration-500">
              <img
                src={currentSlide.rightImage.src}
                alt={currentSlide.rightImage.alt}
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  isTransitioning ? 'opacity-40 scale-98 blur-[1px]' : 'opacity-100 scale-100 blur-0'
                }`}
                loading="eager"
              />
              {/* Subtle bottom gradient vignette with caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 pt-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/70 block mb-0.5">
                  Action Initiative
                </span>
                <p className="text-white text-xs font-medium leading-snug drop-shadow-sm">
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
