import React, { useState, useRef, useEffect } from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';

interface TechnologyHeroProps {
  onScrollClick?: () => void;
}

export const TechnologyHero: React.FC<TechnologyHeroProps> = () => {
  const { hero } = TECHNOLOGY_PAGE_DATA;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sync state with HTML5 video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Attempt initial autoplay
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay might be restricted until user interaction
      setIsPlaying(!video.paused);
    });

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => {
        console.warn('Playback error:', err);
      });
    } else {
      video.pause();
    }
  };

  return (
    <section
      id="technology-hero"
      aria-label="Technology Hero"
      className="relative w-full bg-[#050811] text-white overflow-hidden min-h-[500px] sm:min-h-[560px] md:min-h-[600px] lg:h-[640px] xl:h-[660px] flex items-center justify-center select-none"
    >
      {/* Background HTML5 Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={hero.posterSrc}
          className="w-full h-full object-cover object-center pointer-events-none"
        >
          <source src={hero.videoSrc} type="video/mp4" />
          <source src="/videos/kiyoki-breathe-well.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic Dark Overlay for optimal text legibility matching reference */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Centered Typography Content Area: Matches Reference Image 2 */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center py-16 sm:py-20">
        
        {/* Eyebrow Tag: Champagne Gold / Amber Accent */}
        <p className="text-[#C8A97E] text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] uppercase mb-3 sm:mb-4 drop-shadow-sm">
          {hero.eyebrow}
        </p>

        {/* Main Headline: Bold White Text */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6 drop-shadow-md">
          {hero.headline}
        </h1>

        {/* Descriptive Paragraph: Clear, High-Readability 2-3 Sentences */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed max-w-2xl sm:max-w-3xl mx-auto font-normal drop-shadow">
          {hero.description}
        </p>
      </div>

      {/* Bottom-Right Video Play / Pause Floating Toggle Button */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 z-20">
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isPlaying ? (
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 fill-current ml-0.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default TechnologyHero;
