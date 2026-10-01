import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, MoreVertical } from 'lucide-react';

interface Section02Props {
  onBookDemo?: () => void;
  onLearnMore?: () => void;
}

export const Section02: React.FC<Section02Props> = ({
  onBookDemo,
  onLearnMore,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true); // default true for web autoplay compliance
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play attempt on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay policy fallback
      setIsPlaying(false);
    });
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    const target = containerRef.current || videoRef.current;
    if (!target) return;
    if (!document.fullscreenElement) {
      target.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPercent * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 xl:px-10">
      {/* Centered Large Card Container matching enlarged dimensions (max-w-[1380px], h-[480-520px]) */}
      <div className="max-w-[1380px] mx-auto bg-[#F4F4F4] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch md:h-[480px] lg:h-[500px] xl:h-[520px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-200/60">
        
        {/* Left Column: Content Area (tight, cohesive vertical grouping with natural spacing) */}
        <div className="w-full md:w-[43%] flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14 shrink-0">
          
          <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            {/* Main Heading & Supporting Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold tracking-tight leading-[1.12] text-[#171A20]">
                Clean Air
                <br />
                <span className="text-[#3168E8]">For A Healthier You</span>
              </h2>

              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#5C5E62] font-normal leading-relaxed max-w-md">
                Breath cleaner. Live better. Subscribe for ₹99/mo.*
              </p>
            </div>

            {/* Metrics Area: Prominent Horizontal Display */}
            <div className="flex items-start gap-10 sm:gap-14 pt-1">
              <div>
                <div className="text-3xl sm:text-[34px] lg:text-[38px] font-extrabold text-[#171A20] tracking-tight leading-none">
                  99.97%
                </div>
                <div className="text-xs sm:text-sm text-[#5C5E62] font-medium mt-1.5">
                  Pollutant Removal
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-[34px] lg:text-[38px] font-extrabold text-[#171A20] tracking-tight leading-none">
                  150M+
                </div>
                <div className="text-xs sm:text-sm text-[#5C5E62] font-medium mt-1.5">
                  Families Trust Kiyoki
                </div>
              </div>
            </div>

            {/* CTA Buttons: Horizontally Aligned */}
            <div className="flex items-center gap-3.5 sm:gap-4 pt-1 flex-wrap">
              {/* Primary Black Button */}
              <button
                onClick={() => {
                  if (onBookDemo) onBookDemo();
                  setIsDemoModalOpen(true);
                }}
                className="h-11 sm:h-12 px-7 sm:px-8 bg-[#171A20] hover:bg-black active:bg-gray-800 text-white text-sm font-semibold rounded-[6px] shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center"
              >
                Book a Demo
              </button>

              {/* Secondary White Button with subtle border */}
              <button
                onClick={onLearnMore}
                className="h-11 sm:h-12 px-7 sm:px-8 bg-white hover:bg-gray-50 active:bg-gray-100 text-[#171A20] text-sm font-semibold rounded-[6px] border border-gray-300 hover:border-gray-400 shadow-2xs transition-all duration-200 flex items-center justify-center"
              >
                Learn More
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Full-Height Real Video Player Area with Hover-Activated Overlay */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full md:w-[57%] h-72 sm:h-96 md:h-full relative overflow-hidden bg-black shrink-0 select-none cursor-pointer"
        >
          {/* Real HTML5 Video using user-provided MP4 */}
          <video
            ref={videoRef}
            src="/videos/kiyoki-breathe-well.mp4"
            poster="/images/sec2_video_living.png"
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-cover object-center cursor-pointer"
          />

          {/* Center Play Overlay on pause (reveals on hover when paused) */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center hover:scale-110 hover:bg-black/75 transition-all duration-300 shadow-xl z-10 ${
                isHovered ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              aria-label="Play video"
            >
              <Play className="w-7 h-7 fill-white ml-0.5" />
            </button>
          )}

          {/* Video Player Controls Bar Overlay - Disappears when cursor leaves, reappears when cursor hovers */}
          <div
            className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-10 pb-4 px-5 sm:px-6 flex flex-col justify-end transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            {/* Controls Top Row: Play/Pause, Timestamp, Volume, Fullscreen, Options */}
            <div className="flex items-center justify-between text-white text-xs sm:text-[13px] font-medium mb-3">
              
              {/* Left Controls: Play/Pause & Timestamp */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-sky-300 transition-colors p-1 focus:outline-none"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white" />
                  )}
                </button>

                <span className="font-mono text-white/90 text-xs sm:text-[13px]">
                  {formatTime(currentTime)} / {formatTime(duration || 52)}
                </span>
              </div>

              {/* Right Controls: Volume, Fullscreen, Options */}
              <div className="flex items-center gap-3.5">
                {/* Volume toggle */}
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-sky-300 transition-colors p-1 focus:outline-none"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                {/* Fullscreen toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-sky-300 transition-colors p-1 focus:outline-none"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>

                {/* Options */}
                <button
                  className="text-white/80 hover:text-white transition-colors p-1 focus:outline-none hidden sm:block"
                  aria-label="More options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Bottom Scrubber Progress Bar */}
            <div 
              className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative group/track"
              onClick={handleScrub}
            >
              <div
                className="h-full bg-white rounded-full transition-all relative"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Small scrubber dot on hover */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/track:opacity-100 transition-opacity" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Book a Demo Interactive Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              Book a Live In-Home Demo
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Experience the whisper-quiet medical filtration of Kiyoki in your own space.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! A Kiyoki Air Specialist will reach out shortly to schedule your demo.');
                setIsDemoModalOpen(false);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  className="w-full px-4 py-2.5 rounded-[6px] border border-gray-200 text-sm focus:outline-none focus:border-[#3168E8] focus:ring-1 focus:ring-[#3168E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-[6px] border border-gray-200 text-sm focus:outline-none focus:border-[#3168E8] focus:ring-1 focus:ring-[#3168E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  City / Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                  className="w-full px-4 py-2.5 rounded-[6px] border border-gray-200 text-sm focus:outline-none focus:border-[#3168E8] focus:ring-1 focus:ring-[#3168E8]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-[6px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111827] hover:bg-black text-white text-sm font-semibold rounded-[6px] shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
