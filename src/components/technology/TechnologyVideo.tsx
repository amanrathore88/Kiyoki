import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { TECHNOLOGY_DATA } from '../../technologyData';

export const TechnologyVideo: React.FC = () => {
  const { videoSection } = TECHNOLOGY_DATA;
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  return (
    <section className="w-full bg-[#080A0C] text-white py-14 sm:py-16 lg:py-20 select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Centered Heading and Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-white tracking-tight leading-snug">
            {videoSection.heading}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#C9CDD4] font-normal mt-3 leading-relaxed max-w-[720px] mx-auto">
            {videoSection.subtitle}
          </p>
        </div>

        {/* Video Card Container (India Gate Sunset Banner) */}
        <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[390px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
          {/* Background Poster Image */}
          <img
            src={videoSection.poster}
            alt="India Gate, New Delhi sunset showcase of Kiyoki technology"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Subtle Dark Atmospheric Gradient Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-brightness-95 transition-opacity duration-300 group-hover:bg-black/20" />

          {/* Centered Play Button & Label */}
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
            role="button"
            aria-label="Play technology explanation video"
          >
            <div className="w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110 active:scale-95">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 translate-x-0.5" />
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-white drop-shadow-md">
                {videoSection.buttonLabel}
              </p>
              <span className="text-xs text-white/80 font-mono tracking-wider drop-shadow-sm">
                {videoSection.duration}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Accessible Interactive Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-slate-900/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-sm font-semibold text-white truncate max-w-md">
                  {videoSection.videoTitle}
                </h4>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster={videoSection.poster}
                autoPlay
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 bg-slate-900/90 text-left">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {videoSection.videoDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
