import React from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';
import portraitImg from '../assets/images/science-portrait.jpg';

export const ScienceSection: React.FC = () => {
  const { science } = TECHNOLOGY_PAGE_DATA;

  return (
    <section
      id="our-science"
      aria-label="Our Science and Our Approach"
      className="relative w-full bg-white overflow-hidden pt-10 sm:pt-14 lg:pt-16 xl:pt-20 pb-0"
    >
      <div className="w-full flex flex-col lg:flex-row items-end justify-between">
        
        {/* Left Column: Enlarged Portrait Touching Left Screen Edge and Bottom Boundary, with Top Spacing */}
        <div className="w-full lg:w-[42%] xl:w-[40%] flex-shrink-0 flex items-end self-end pl-0 pb-0">
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] xl:h-[580px] overflow-hidden bg-neutral-100">
            <img
              src={portraitImg}
              alt="Kiyoki air science researcher portrait"
              className="w-full h-full object-cover object-[center_15%]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Editorial Text Blocks */}
        <div className="w-full lg:w-[58%] xl:w-[60%] flex-1 px-6 sm:px-12 lg:px-16 xl:px-20 pt-4 pb-14 lg:pb-20 xl:pb-24 flex items-center justify-start">
          <div className="max-w-[680px] w-full">
            
            {/* Block 1: Our Science */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-4 lg:col-span-3">
                <h2 className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#1C1D20] uppercase pt-1">
                  {science.scienceHeading}
                </h2>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.75] text-[#4B525D] font-normal">
                  {science.scienceBody}
                </p>
              </div>
            </div>

            {/* Hairline Divider Rule */}
            <hr className="my-8 sm:my-10 border-t border-gray-200/90 w-full" />

            {/* Block 2: Our Approach */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-[#1C1D20] uppercase pt-1">
                  {science.approachHeading}
                </h3>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.75] text-[#4B525D] font-normal">
                  {science.approachBody}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
