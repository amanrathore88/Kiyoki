import React, { useState, useRef, useEffect, useCallback } from 'react';
import bannerImg from '../assets/images/technology-banner.jpg';

export const TechnologyBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // High-End Expanding Video Play Trigger
  const handleOpenAndPlay = async () => {
    setIsExpanded(true);
    const video = videoRef.current;
    if (video) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Direct unmuted play blocked, attempting muted playback:', err);
        try {
          video.muted = true;
          setIsMuted(true);
          await video.play();
          setIsPlaying(true);
        } catch (e) {
          console.error('Video playback failed:', e);
        }
      }
    }
  };

  // Smooth Collapse Trigger
  const handleCollapse = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsPlaying(false);
    setIsExpanded(false);
  };

  // Play / Pause Toggle during expanded playback
  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  // Audio Mute Toggle
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Update progress tracking
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  // Timeline scrubber click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newProgress * duration;
    setCurrentTime(video.currentTime);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Escape key collapses video
  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCollapse();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  // Auto-hide controls when playing during inactivity
  const handleMouseMoveOverVideo = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="technology-banner"
      aria-label="Expanding Technology Video Banner"
      className="w-full bg-white py-8 sm:py-12 lg:py-14 transition-all duration-700 ease-out"
    >
      {/* Outer section wrapper with refined, reduced left/right margins */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 transition-all duration-700 ease-out flex justify-center">
        
        {/* Dynamic Expanding Card Container */}
        <div
          ref={containerRef}
          onClick={!isExpanded ? handleOpenAndPlay : undefined}
          onMouseMove={isExpanded ? handleMouseMoveOverVideo : undefined}
          className={`group relative overflow-hidden bg-black border border-gray-200/80 shadow-md cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
            isExpanded
              ? 'w-full max-w-[1760px] 2xl:max-w-[1880px] rounded-2xl lg:rounded-3xl shadow-2xl h-[480px] sm:h-[600px] lg:h-[720px] xl:h-[780px] border-white/20'
              : 'w-full max-w-[1520px] 2xl:max-w-[1640px] rounded-xl lg:rounded-2xl h-[320px] sm:h-[400px] lg:h-[460px] xl:h-[500px] hover:shadow-xl hover:border-gray-300'
          }`}
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src="/videos/kiyoki-breathe-well.mp4"
            poster={bannerImg}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              !isExpanded ? 'group-hover:scale-[1.02]' : ''
            }`}
          />

          {/* Vignette Overlay for Ambient Depth & Readability */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isExpanded
                ? 'bg-gradient-to-t from-black/60 via-transparent to-black/40'
                : 'bg-black/25 group-hover:bg-black/35'
            }`}
          />

          {/* STATE 1: Collapsed Rest Overlay with Premium Magnetic Play Button */}
          {!isExpanded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              {/* Animated Floating Glass Play Button */}
              <div className="relative flex items-center justify-center">
                {/* Subtle Breathing Pulse Ring */}
                <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 animate-ping opacity-40 pointer-events-none" />
                
                {/* Main Glass Icon Button */}
                <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-black/40 group-hover:bg-[#3168E8] backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 text-white ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Callout Labels */}
              <div className="mt-4 sm:mt-5 space-y-1">
                <span className="inline-block text-white text-[12px] sm:text-[13px] font-bold tracking-[0.28em] uppercase drop-shadow-md">
                  Watch Film
                </span>
                <p className="text-white/80 text-[13px] sm:text-[14px] font-normal tracking-wide drop-shadow-sm">
                  Click to expand & experience Kiyoki air in action
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: Expanded High-End Cinema Overlay Controls */}
          {isExpanded && (
            <div
              className={`absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 lg:p-8 transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Top Navigation Bar: Badge & Collapse Button */}
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  KIYOKI CINEMA
                </div>

                {/* Close / Collapse Button */}
                <button
                  type="button"
                  onClick={handleCollapse}
                  aria-label="Collapse video to standard banner"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <span>Close</span>
                  <svg
                    className="w-4 h-4 text-white/90 group-hover:rotate-90 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Center Screen Click-to-Toggle Area */}
              <div
                className="flex-1 flex items-center justify-center cursor-pointer"
                onClick={handleTogglePlay}
              >
                {!isPlaying && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform duration-200">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom Cinema Control Bar */}
              <div className="w-full space-y-3 bg-black/40 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-xl shadow-2xl">
                {/* Timeline Progress Scrubber */}
                <div
                  onClick={handleSeek}
                  className="group/timeline relative w-full h-2 hover:h-3 bg-white/25 rounded-full cursor-pointer transition-all duration-150 overflow-hidden"
                >
                  <div
                    className="h-full bg-[#3168E8] rounded-full relative transition-all duration-75"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/timeline:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Controls Row: Play/Pause, Timestamp, Mute/Unmute */}
                <div className="flex items-center justify-between text-white text-xs sm:text-sm font-medium">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Play/Pause Button */}
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="p-1.5 hover:text-sky-400 active:scale-95 transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Elapsed / Total Time */}
                    <span className="font-mono text-white/90 text-xs sm:text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Side: Audio Mute & Expand Indicator */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleToggleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="p-1.5 hover:text-sky-400 active:scale-95 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {isMuted ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                      <span className="text-[11px] font-mono uppercase hidden sm:inline">
                        {isMuted ? 'Muted' : 'Sound On'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default TechnologyBanner;
