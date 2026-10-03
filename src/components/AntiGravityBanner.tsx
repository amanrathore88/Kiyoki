import React from 'react';

interface AntiGravityBannerProps {
  onLearnMoreClick?: () => void;
}

export const AntiGravityBanner: React.FC<AntiGravityBannerProps> = ({
  onLearnMoreClick,
}) => {
  return (
    <section className="w-full bg-white pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 px-4 sm:px-6 lg:px-8 select-none">
      {/* 
        Centered Banner Container
        Occupies 92-94% desktop viewport width (max 1340px)
        Height ~280-320px at desktop
        Rounded corners 36-42px
      */}
      <div className="w-[94%] sm:w-[93%] lg:w-[92%] max-w-[1340px] mx-auto min-h-[290px] sm:min-h-[300px] lg:h-[320px] rounded-[34px] sm:rounded-[38px] lg:rounded-[42px] relative overflow-hidden shadow-[0_12px_36px_rgba(75,152,109,0.18)] flex items-center">
        
        {/* =========================================================
            LAYER 1: INDEPENDENT GREEN BACKGROUND
            Rich, natural green with subtle smooth tonal variation
            ========================================================= */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-700"
          style={{
            background: 'linear-gradient(108deg, #4ba071 0%, #49996c 38%, #449265 72%, #3a8157 100%)',
          }}
        >
          {/* Subtle soft radial ambient highlights */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 35% 45%, rgba(255, 255, 255, 0.45) 0%, transparent 60%), radial-gradient(circle at 80% 60%, rgba(0, 0, 0, 0.25) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* =========================================================
            LAYER 2: FOREGROUND PRODUCT LAYER (ANTI-GRAVITY DISPLAY)
            Separate HD transparent asset (2200px wide) containing
            Kiyoki air purifiers on white cylindrical display platforms
            with natural houseplant foliage background.
            Shifted downward via translate-y so the purifiers have
            clean breathing room at the top and platforms sit grounded.
            ========================================================= */}
        <div className="absolute right-0 bottom-0 z-10 h-full w-[50%] sm:w-[54%] lg:w-[58%] flex items-end justify-end pointer-events-none select-none">
          <img
            src="/images/antigravity_purifiers_transparent.png"
            alt="Kiyoki Air Purifiers on Display Platforms"
            className="h-full w-auto max-w-full object-contain object-bottom translate-y-3.5 sm:translate-y-5 lg:translate-y-6 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* =========================================================
            LAYER 3: LEFT CONTENT AREA (TEXT & CTA)
            Occupies ~42-45% width, perfectly balanced and readable
            ========================================================= */}
        <div className="relative z-20 h-full flex flex-col justify-center items-start pl-6 sm:pl-10 lg:pl-16 pr-3 sm:pr-4 py-6 sm:py-8 lg:py-10 max-w-[54%] sm:max-w-[48%] lg:max-w-[44%] text-left">
          
          {/* Main Heading split into 2 lines matching reference */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold text-white tracking-tight leading-[1.12]">
            Breathe Better
            <br />
            With Kiyoki
          </h2>

          {/* Supporting Copy */}
          <p className="mt-2 sm:mt-2.5 lg:mt-3 text-[11px] sm:text-[13px] lg:text-sm text-white/90 font-normal leading-relaxed max-w-[410px]">
            Kiyoki air purifiers are designed to remove dust, allergens, pet dander,
            smoke, odours and harmful pollutants — so you can breathe cleaner air,
            every day.
          </p>

          {/* White Pill-Shaped Learn More Button */}
          <div className="mt-3.5 sm:mt-4.5 lg:mt-6">
            <button
              type="button"
              onClick={onLearnMoreClick}
              className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-5 sm:px-6 lg:px-7 py-2 sm:py-2.5 text-[11px] sm:text-xs lg:text-sm font-semibold tracking-wide hover:bg-gray-100 hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AntiGravityBanner;
