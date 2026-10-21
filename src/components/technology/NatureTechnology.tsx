import React from 'react';
import { TECHNOLOGY_DATA } from '../../technologyData';
import { ScientificPurificationDiagram } from './TechnologyVectors';

export const NatureTechnology: React.FC = () => {
  const { natureSection } = TECHNOLOGY_DATA;

  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-16 sm:pb-20 select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* =========================================================
            UPPER PART: TWO-COLUMN EDITORIAL INTRO
            Left: Eyebrow, Heading, and Overlapping Nature Photography
            Right: 3 Scientific Editorial Paragraphs
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 sm:mb-16">
          
          {/* Left Column (52% / lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
              {natureSection.eyebrow}
            </span>

            <h2 className="text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-8">
              {natureSection.heading}
            </h2>

            {/* Overlapping Nature Image Composition */}
            <div className="relative w-full max-w-[480px] h-[250px] sm:h-[280px] mt-2">
              {/* Back Image: Mountain Forest & Waterfall */}
              <div className="absolute right-2 top-0 w-[58%] h-[82%] rounded-xl overflow-hidden shadow-md border-2 border-white transition-transform duration-500 hover:scale-105 z-0">
                <img
                  src={natureSection.overlappingImages.waterfall.src}
                  alt={natureSection.overlappingImages.waterfall.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Image: Sunny Coastline Beach */}
              <div className="absolute left-0 bottom-0 w-[60%] h-[78%] rounded-xl overflow-hidden shadow-lg border-2 border-white transition-transform duration-500 hover:scale-105 z-10">
                <img
                  src={natureSection.overlappingImages.beach.src}
                  alt={natureSection.overlappingImages.beach.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column (48% / lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            {natureSection.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-[14px] sm:text-[15px] text-[#555A63] font-normal leading-[1.75]"
              >
                {para}
              </p>
            ))}
          </div>

        </div>

        {/* =========================================================
            LOWER PART: THREE EDITORIAL TILES
            Tile 1: Purification Process Infographic
            Tile 2: Natural Purification Waterfall
            Tile 3: Cleaner, Healthier Homes Family
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Tile 1: Scientific Process Diagram */}
          <div className="h-[250px] sm:h-[270px] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <ScientificPurificationDiagram />
          </div>

          {/* Tile 2: Natural Purification Waterfall */}
          <div className="group relative h-[250px] sm:h-[270px] rounded-xl overflow-hidden shadow-xs border border-slate-200/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src="/images/technology/nature-waterfall.png"
              alt="Natural mountain waterfall"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Bottom Dark Gradient for readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-[13px] sm:text-[14px] font-bold text-white tracking-wider uppercase drop-shadow-md">
                NATURAL PURIFICATION
              </span>
            </div>
          </div>

          {/* Tile 3: Cleaner, Healthier Homes */}
          <div className="group relative h-[250px] sm:h-[270px] rounded-xl overflow-hidden shadow-xs border border-slate-200/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src="/images/technology/clean-family-home.png"
              alt="Clean comfortable modern home"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Bottom Dark Gradient for readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-[13px] sm:text-[14px] font-bold text-white tracking-wider uppercase drop-shadow-md">
                CLEANER, HEALTHIER HOMES
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
