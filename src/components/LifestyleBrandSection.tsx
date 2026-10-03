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
        {/* Left Column: Asymmetric 4-Image Interactive Lifestyle Collage (~55% width) */}
        <div className="w-full lg:w-[55%] flex items-center justify-center">
          <div className="relative w-full max-w-[620px] aspect-[1024/680] select-none">
            {/* 1. Bedroom with Kiyoki Purifier (Top-Left) */}
            <div className="absolute left-0 top-0 w-[47.5%] h-[53.5%] overflow-hidden group cursor-pointer bg-black">
              <img
                src="/images/lifestyle_bedroom_hq.jpg"
                alt="Kiyoki air purifier in a modern luxury bedroom"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                loading="lazy"
              />
            </div>

            {/* 2. Sunlit Dining Room (Top-Right) */}
            <div className="absolute left-[47.8%] top-[14.1%] w-[52.2%] h-[48.2%] overflow-hidden group cursor-pointer bg-black">
              <img
                src="/images/lifestyle_dining_hq.jpg"
                alt="Sunlit modern dining area with clean air and thriving houseplants"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                loading="lazy"
              />
            </div>

            {/* 3. Living Room Plant Corner with Kiyoki Purifier (Bottom-Left) */}
            <div className="absolute left-[10.9%] top-[54.1%] w-[39.5%] h-[44.1%] overflow-hidden group cursor-pointer bg-black">
              <img
                src="/images/lifestyle_plants_hq.jpg"
                alt="Kiyoki air purifier standing in modern plant-filled living space"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                loading="lazy"
              />
            </div>

            {/* 4. Scandinavian Sofa in Sunlit Living Space (Bottom-Right) */}
            <div className="absolute left-[50.8%] top-[62.9%] w-[38.2%] h-[37.1%] overflow-hidden group cursor-pointer bg-black">
              <img
                src="/images/lifestyle_sofa_hq.jpg"
                alt="Cozy Scandinavian living room sofa with natural sunlight"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Heading, Supporting Copy & Outlined Pill Button (~45% width) */}
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
