import React from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';
import studioImg from '../assets/images/studio-mixing.jpg';

export const PureAirInMotion: React.FC = () => {
  const { pureAirInMotion } = TECHNOLOGY_PAGE_DATA;

  return (
    <section
      id="pure-air-in-motion"
      aria-label="Pure Air in Motion Feature"
      className="w-full bg-black text-white min-h-[540px] lg:h-[580px] overflow-hidden"
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Studio Mixing Photography (50% Split) */}
        <div className="relative w-full h-[340px] sm:h-[420px] lg:h-full overflow-hidden bg-neutral-900">
          <img
            src={studioImg}
            alt={pureAirInMotion.imageAlt}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Right Column: Solid Pitch-Black Editorial Copy (50% Split) */}
        <div className="w-full h-full bg-black p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
          <div className="max-w-[480px] space-y-6 lg:space-y-8">
            
            <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.12] tracking-tight text-white uppercase">
              <span className="block">{pureAirInMotion.headingLine1}</span>
              <span className="block font-light text-white/90">{pureAirInMotion.headingLine2}</span>
            </h2>

            <div className="space-y-4 pt-2">
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/85 font-normal">
                {pureAirInMotion.paragraph1}
              </p>
              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-white/60 font-light">
                {pureAirInMotion.paragraph2}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
