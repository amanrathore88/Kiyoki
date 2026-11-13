import React from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';
import cardSunsetImg from '../assets/images/card-at-home-sunset.jpg';
import momentPortableImg from '../assets/images/purification-moment-portable.jpg';
import momentMaskImg from '../assets/images/purification-moment-mask.jpg';

export const AirInAction: React.FC = () => {
  const { airInAction } = TECHNOLOGY_PAGE_DATA;

  const cardImages: Record<string, string> = {
    home: cardSunsetImg,
    portable: momentPortableImg,
    mask: momentMaskImg,
  };

  return (
    <section
      id="air-in-action"
      aria-label="Air in Action Product Formats"
      className="w-full bg-[#050713] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header: Right-Aligned on Desktop, Bold & Large matching user's red box dimensions */}
        <div className="flex justify-start lg:justify-end mb-10 sm:mb-14 lg:mb-18">
          <h2 className="text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] xl:text-[84px] font-bold leading-none text-white tracking-tight">
            {airInAction.heading}
          </h2>
        </div>

        {/* Three Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {airInAction.cards.map((card) => {
            const imgSrc = cardImages[card.id] || cardSunsetImg;

            return (
              <article
                key={card.id}
                className="flex flex-col group"
              >
                {/* Card Header: Number Badge and Product Title (Above Image matching Reference) */}
                <div className="mb-4 space-y-1">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                    {card.badge}
                  </p>
                  <h3 className="text-[20px] sm:text-[22px] font-normal text-white tracking-tight">
                    {card.title}
                  </h3>
                </div>

                {/* 16:9 Image Thumbnail Container */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 border border-white/10 mb-4 transition-transform duration-300 group-hover:border-white/25">
                  <img
                    src={imgSrc}
                    alt={card.alt}
                    style={{ objectPosition: card.objectPosition }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Card Description (Below Image matching Reference) */}
                <div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/70 font-normal">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
