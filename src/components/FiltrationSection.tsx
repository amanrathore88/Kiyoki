import React, { useRef, useEffect } from 'react';

interface FiltrationStage {
  number: string;
  title: string;
  description: string;
}

const FILTRATION_STAGES: FiltrationStage[] = [
  {
    number: '01',
    title: 'Pre-Filter',
    description: 'Captures large particles like dust and hair.',
  },
  {
    number: '02',
    title: 'HEPA Filter',
    description: 'Removes 99.97% of particles (0.3 microns).',
  },
  {
    number: '03',
    title: 'Activated Carbon',
    description: 'Absorbs odours, VOCs and harmful gases.',
  },
  {
    number: '04',
    title: 'Antibacterial Layer',
    description: 'Inhibits bacteria and microbes.',
  },
  {
    number: '05',
    title: 'Clean Air Output',
    description: 'Purifies and delivers fresh, clean air.',
  },
];

interface FiltrationSectionProps {
  onLearnMoreClick?: () => void;
}

export const FiltrationSection: React.FC<FiltrationSectionProps> = ({
  onLearnMoreClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Safe autoplay fallback
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[840px] sm:h-[860px] lg:h-[900px] bg-[#070B09] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Background Video Layer - positioned higher (object-[center_18%]) so product/filtration action is clearly visible */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/filtration_video_poster.jpg"
          className="w-full h-full object-cover object-[center_18%] filter brightness-[0.98] contrast-[1.04]"
          src="/videos/filtration-showcase.mp4"
        />
        {/* Subtle dark tint */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* 2. Top Dark Gradient for Heading Legibility */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none z-[1]" />

      {/* 3. Black Gradient underneath the cards and button fading in from the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[460px] sm:h-[430px] bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-[1]" />

      {/* 4. Foreground Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col justify-between h-full px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-8 sm:pb-11">
        {/* Top Heading Area */}
        <div className="text-center max-w-2xl mx-auto drop-shadow-md">
          <h2 className="text-2xl sm:text-[34px] font-bold text-white tracking-tight leading-snug">
            Advanced 5-Stage Filtration Technology
          </h2>
          <p className="mt-2 text-xs sm:text-[14px] text-gray-200/90 font-normal leading-relaxed">
            Captures 99.97% of airborne pollutants as small as 0.3 microns for cleaner, healthier air.
          </p>
        </div>

        {/* Clear Visual Stage for Video in upper-middle */}
        <div className="flex-1 pointer-events-none" />

        {/* Bottom Area: Five White Cards (shifted down) + Blue CTA Button (shifted down) */}
        <div className="w-full flex flex-col items-center">
          {/* Five Equal-Width White Cards */}
          <div className="w-full max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
            {FILTRATION_STAGES.map((stage) => (
              <div
                key={stage.number}
                className="bg-white rounded-[10px] px-3.5 py-4 sm:py-4.5 text-center flex flex-col justify-start items-center shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-white/10"
              >
                <span className="text-xs sm:text-[13px] font-bold text-gray-400 mb-1 tracking-wider leading-none">
                  {stage.number}
                </span>
                <h3 className="text-sm sm:text-[14px] font-bold text-[#111827] mb-1.5 leading-snug">
                  {stage.title}
                </h3>
                <p className="text-[11px] sm:text-[12px] text-gray-500 leading-snug max-w-[155px]">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Centered CTA Button shifted downwards */}
          <div className="mt-6 sm:mt-7 flex justify-center">
            <button
              type="button"
              onClick={onLearnMoreClick}
              className="h-10 sm:h-[40px] px-9 sm:px-10 bg-[#0070F3] hover:bg-[#0060df] active:bg-[#0050c0] text-white text-xs sm:text-[13px] font-medium rounded-[6px] shadow-lg shadow-blue-500/25 transition-all duration-150 flex items-center justify-center cursor-pointer hover:shadow-xl hover:scale-[1.02]"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
