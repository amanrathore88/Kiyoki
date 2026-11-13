import React from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';

export const BreatheEasy: React.FC = () => {
  const { breatheEasy } = TECHNOLOGY_PAGE_DATA;

  return (
    <section
      id="breathe-easy"
      aria-label="Breathe Easy Callout"
      className="w-full bg-white pt-4 sm:pt-6 lg:pt-8 pb-0"
    >
      {/* Outer section wrapper matching the video banner width */}
      <div className="w-full max-w-[1520px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Exact Architectural Box Matching Reference Image 2:
            - Top border: YES
            - Left border: YES (connected straight down to the section below)
            - Right border: YES (connected straight down to the section below)
            - Bottom border: NO (border-b-0, open at bottom)
            - Flush with the bottom section so side lines connect directly */}
        <div className="w-full border-t border-l border-r border-b-0 border-[#717680] sm:border-t-[1.5px] sm:border-l-[1.5px] sm:border-r-[1.5px] rounded-none p-8 sm:p-10 lg:pt-12 lg:pb-14 lg:px-14 min-h-[160px] sm:min-h-[180px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12 bg-white box-border">
          
          {/* Left Column: Bold Headline matching reference typography */}
          <div className="flex-shrink-0">
            <h2 className="text-[44px] sm:text-[54px] md:text-[64px] lg:text-[72px] font-black text-[#050505] tracking-tight leading-none">
              Breathe easy.
            </h2>
          </div>

          {/* Right Column: Eyebrow + Body Copy */}
          <div className="max-w-[480px] space-y-2 lg:text-left">
            <p className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#050505] uppercase">
              {breatheEasy.eyebrow}
            </p>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#191919] font-normal leading-relaxed">
              {breatheEasy.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BreatheEasy;
