import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LifestyleBrandSectionProps {
  onLearnMoreClick?: () => void;
}

export const LifestyleBrandSection: React.FC<LifestyleBrandSectionProps> = ({
  onLearnMoreClick,
}) => {
  return (
    <section className="w-full bg-black text-white py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 select-none overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 overflow-hidden">
        {/* Left Column: Asymmetric 4-Image Lifestyle Collage (approx. 55% width) */}
        <div className="w-full lg:w-[55%] flex items-center justify-center overflow-hidden">
          <img
            src="/images/lifestyle_collage_full.png"
            alt="Kiyoki air purifiers in modern home environments including bedroom, dining room, and living spaces"
            className="w-full max-w-[620px] h-auto object-contain block drop-shadow-md select-none pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Right Column: Heading, Supporting Paragraph & Pill Button (approx. 45% width) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-start lg:pl-6 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15] mb-5 sm:mb-6">
            Purify Your Space<br />Elevate Your Life
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-normal leading-[1.65] max-w-[440px] mb-7 sm:mb-9">
            Kiyoki air purifiers blend seamlessly into your home while keeping your air clean, fresh and healthy. Designed for modern living.
          </p>

          <button
            type="button"
            onClick={onLearnMoreClick}
            className="group inline-flex items-center gap-2.5 h-11 px-7 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 cursor-pointer shadow-sm hover:shadow-white/20"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};
