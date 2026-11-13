import React from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';

export const EngineeredStrip: React.FC = () => {
  const { strip } = TECHNOLOGY_PAGE_DATA;

  return (
    <section
      id="engineered-strip"
      aria-label="Engineered For Every Room Ribbon"
      className="w-full bg-[#E5DEC9] text-[#1C1D20] py-[18px] border-y border-[#D6CFB8]"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
        <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-[0.2em] uppercase leading-tight select-none">
          <span>{strip.prefix}</span>
          <span className="font-extrabold">{strip.highlight}</span>
        </p>
      </div>
    </section>
  );
};
