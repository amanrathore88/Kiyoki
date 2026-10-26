import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TECHNOLOGY_DATA } from '../../technologyData';

export const TechnologySteps: React.FC = () => {
  const { purificationMomentsSection } = TECHNOLOGY_DATA;
  const cards = purificationMomentsSection.cards;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Check scroll bounds to enable/disable arrow buttons
  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollBounds();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollBounds, { passive: true });
      window.addEventListener('resize', checkScrollBounds);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, []);

  const handleScroll = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="how-it-works"
      className="w-full bg-[#EDEAE6] text-gray-900 py-16 sm:py-20 lg:py-24 select-none scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* =========================================================
            HEADER AREA
            Left: Editorial 3-line headline ("Purification \n For Every \n Moment.")
            Right: Description paragraph + circular navigation buttons
            ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12 lg:mb-14">
          
          {/* Headline */}
          <div className="max-w-md">
            <h2 className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold tracking-tight leading-[1.05]">
              <span className="block text-[#111827]">
                {purificationMomentsSection.headline.line1}
              </span>
              <span className="block text-[#707070]">
                {purificationMomentsSection.headline.line2}
              </span>
              <span className="block text-[#707070]">
                {purificationMomentsSection.headline.line3}
              </span>
            </h2>
          </div>

          {/* Subtitle & Circular Arrow Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10 lg:gap-12">
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#4F5561] font-normal leading-[1.65] max-w-[340px]">
              {purificationMomentsSection.subtitle}
            </p>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleScroll('prev')}
                disabled={!canScrollPrev}
                className="w-[44px] h-[44px] rounded-full border border-[#D5D2CD] hover:border-[#111827] hover:bg-black/5 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-[#111827] focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4 stroke-[1.9]" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('next')}
                disabled={!canScrollNext}
                className="w-[44px] h-[44px] rounded-full bg-[#111827] hover:bg-[#2B303B] active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-label="Next slide"
              >
                <ArrowRight className="w-4 h-4 stroke-[1.9]" />
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================
            THREE HIGH-RESOLUTION PRODUCT MOMENT CARDS
            Grid on desktop (lg), horizontal snap scroll on mobile/tablet
            ========================================================= */}
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <article
              key={card.id}
              className="group relative flex-shrink-0 w-[84vw] sm:w-[50vw] md:w-[42vw] lg:w-auto h-[480px] sm:h-[520px] lg:h-[560px] rounded-[24px] overflow-hidden snap-start cursor-pointer select-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.18)] transition-all duration-500 ease-out border border-black/[0.04]"
            >
              {/* Full-Bleed Product Lifestyle Photography */}
              <img
                src={card.image}
                alt={card.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Top-Left Number Pill Badge (e.g. 01, 02, 03) */}
              <div className="absolute top-5 left-5 z-20 px-2.5 py-1 rounded-[6px] bg-black/40 backdrop-blur-md border border-white/25 text-white/95 text-[11px] sm:text-[12px] font-mono tracking-widest font-semibold shadow-xs">
                {card.badge}
              </div>

              {/* Bottom Multi-Stop Dark Gradient Scrim */}
              <div
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-95"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.52) 28%, rgba(0, 0, 0, 0.15) 52%, rgba(0, 0, 0, 0) 75%)',
                }}
              />

              {/* Card Footer Content (Title, Description, Learn More CTA) */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 lg:p-8 z-20 flex flex-col items-start text-left">
                <h3 className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-white tracking-tight leading-[1.2] mb-2 group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-white/85 font-normal leading-[1.6] max-w-[280px] mb-4 sm:mb-5">
                  {card.description}
                </p>
                <div className="text-white text-[13px] sm:text-[14px] font-semibold inline-flex items-center gap-1.5 transition-all duration-300 group-hover:text-white">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechnologySteps;
