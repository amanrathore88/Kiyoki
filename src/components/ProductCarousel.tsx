import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
}

interface ProductCarouselProps {
  onShopClick?: (productName: string) => void;
  onLearnMoreClick?: (productName: string) => void;
}

const baseFeatures: FeatureItem[] = [
  {
    id: 'smart-app-control',
    title: 'Smart App Control',
    tagline: 'Control your air. Anytime, anywhere.',
    description:
      'Highlight remote operation and convenient control through the app. Monitor indoor air quality in real time, set customized purification schedules, and control settings wherever you are.',
    image: '/images/product_x8_living.jpg',
  },
  {
    id: 'filter-replacement-indicator',
    title: 'Filter Replacement Indicator',
    tagline: 'Know when your filter needs a change.',
    description:
      'Focus on easy maintenance and timely filter replacement. Intelligent particulate saturation sensors track filter lifespan and notify you precisely when it is time for a fresh replacement.',
    image: '/images/product_pro_office.jpg',
  },
  {
    id: 'night-mode-low-noise',
    title: 'Night Mode & Low Noise',
    tagline: 'Quiet comfort. Even while you sleep.',
    description:
      'Communicate comfortable nighttime use without unnecessary noise. Operates below 18 dB in silent night mode with dimmed indicators for tranquil, undisturbed sleep.',
    image: '/images/product_x3_bedroom.jpg',
  },
  {
    id: 'real-time-air-monitoring',
    title: 'Real-Time Air Quality Monitoring',
    tagline: 'See the air you breathe.',
    description:
      'Show customers the air-quality readings and help them understand when purification may be needed. High-precision laser sensors provide live particulate readings and instant feedback.',
    image: '/images/product_studio_gym.jpg',
  },
];

const N = baseFeatures.length;
// 5 full buffer sets (20 items) for generous, glitch-free bidirectional runway
const extendedFeatures = [
  ...baseFeatures,
  ...baseFeatures,
  ...baseFeatures,
  ...baseFeatures,
  ...baseFeatures,
];
// Start in the exact center set (Set 2: index 2 * N = 8)
const INITIAL_INDEX = 2 * N;

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  onShopClick,
  onLearnMoreClick,
}) => {
  const [virtualIndex, setVirtualIndex] = useState<number>(INITIAL_INDEX);
  const [noTransition, setNoTransition] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  
  // Transition lock ref and failsafe timer to completely prevent getting stuck
  const isTransitioningRef = useRef<boolean>(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const virtualIndexRef = useRef<number>(INITIAL_INDEX);
  virtualIndexRef.current = virtualIndex;

  // Measure container dimensions on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Normalizes the position back to the middle buffer set seamlessly
  const normalizePosition = useCallback((targetIdx: number) => {
    // Middle buffer range is [2*N .. 3*N - 1] (indices 8 to 11)
    if (targetIdx >= 3 * N || targetIdx < 2 * N) {
      const offsetFromBase = ((targetIdx % N) + N) % N;
      const normalizedIdx = 2 * N + offsetFromBase;

      if (normalizedIdx !== targetIdx) {
        setNoTransition(true);
        setVirtualIndex(normalizedIdx);
      }
    }
  }, []);

  // When noTransition becomes true, force a reflow and re-enable transitions in next frame
  useEffect(() => {
    if (noTransition) {
      if (trackRef.current) {
        // Force synchronous browser reflow so it registers the jumped position
        void trackRef.current.offsetHeight;
      }
      // Re-enable smooth CSS transition in the next double animation frame
      let rAF2: number;
      const rAF1 = requestAnimationFrame(() => {
        rAF2 = requestAnimationFrame(() => {
          setNoTransition(false);
        });
      });
      return () => {
        cancelAnimationFrame(rAF1);
        if (rAF2) cancelAnimationFrame(rAF2);
      };
    }
  }, [noTransition]);

  // Clean transition end handler: unlocks transition state and normalizes buffer
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only respond to the track's own transform transition, ignore bubbled events from children
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    isTransitioningRef.current = false;
    normalizePosition(virtualIndexRef.current);
  };

  // Main slide function with automatic timeout failsafe
  const slideTo = useCallback(
    (newIdx: number) => {
      // If already mid-transition, reject to maintain smooth cadence
      if (isTransitioningRef.current) return;

      setNoTransition(false);
      isTransitioningRef.current = true;
      setVirtualIndex(newIdx);

      // Failsafe timer: transition duration is 500ms, unlock at 550ms no matter what
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        normalizePosition(virtualIndexRef.current);
      }, 550);
    },
    [normalizePosition]
  );

  const nextSlide = useCallback(() => {
    slideTo(virtualIndexRef.current + 1);
  }, [slideTo]);

  const prevSlide = useCallback(() => {
    slideTo(virtualIndexRef.current - 1);
  }, [slideTo]);

  const goToSlide = (targetBaseIdx: number) => {
    if (isTransitioningRef.current) return;
    const currentBaseIdx = ((virtualIndexRef.current % N) + N) % N;
    const delta = targetBaseIdx - currentBaseIdx;
    slideTo(virtualIndexRef.current + delta);
  };

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setNoTransition(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.touches[0].clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
      prevSlide();
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setNoTransition(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
      prevSlide();
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Card dimensions: Desktop ~68% width, Mobile ~88% width
  const isDesktop = containerWidth >= 768;
  const gap = isDesktop ? 20 : 16;
  const cardWidth = isDesktop
    ? Math.max(580, Math.min(containerWidth * 0.68, 920))
    : containerWidth * 0.88;

  // Center active card with symmetrical peeking cards on both sides
  const centerOffset = (containerWidth - cardWidth) / 2;
  const targetTranslate = -virtualIndex * (cardWidth + gap) + centerOffset;
  const finalTranslate = targetTranslate + dragOffset;

  // Active base index for pagination dots (0..N-1)
  const activeDotIndex = ((virtualIndex % N) + N) % N;

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-10 select-none overflow-hidden">
      {/* Centered Main Container */}
      <div
        ref={containerRef}
        className="max-w-[1380px] mx-auto relative group/carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrow: Previous (Infinite continuous navigation) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-11 sm:w-10 sm:h-12 rounded-lg bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900 stroke-[2.5]" />
        </button>

        {/* Navigation Arrow: Next (Infinite continuous navigation) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-11 sm:w-10 sm:h-12 rounded-lg bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          aria-label="Next product"
        >
          <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2.5]" />
        </button>

        {/* Continuous Infinite Sliding Track */}
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex items-stretch will-change-transform"
          style={{
            transform: `translateX(${finalTranslate}px)`,
            transition:
              isDragging || noTransition
                ? 'none'
                : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            gap: `${gap}px`,
          }}
        >
          {extendedFeatures.map((item, idx) => {
            const isActive = idx === virtualIndex;
            const isRevealed = tappedIndex === idx;

            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => {
                  if (!isActive) {
                    slideTo(idx);
                  } else {
                    setTappedIndex((prev) => (prev === idx ? null : idx));
                  }
                }}
                style={{ width: `${cardWidth}px` }}
                className={`group/card shrink-0 h-[440px] sm:h-[480px] lg:h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 ${
                  isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-95'
                }`}
              >
                {/* Full-Bleed High-Quality Photorealistic Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 ease-out group-hover/card:scale-105"
                />

                {/* Dark gradient overlay that deepens smoothly on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 transition-opacity duration-500 pointer-events-none ${
                    isRevealed ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                  }`}
                />

                {/* Resting State: Minimal Floating Indicator at bottom left (fades out as content slides up) */}
                <div
                  className={`absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 transition-all duration-300 pointer-events-none ${
                    isRevealed
                      ? 'opacity-0 translate-y-3'
                      : 'group-hover/card:opacity-0 group-hover/card:translate-y-3'
                  }`}
                >
                  <div className="px-4 py-2 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/20 flex items-center gap-2 shadow-lg">
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">
                      {item.title}
                    </span>
                    <span className="text-white/70 text-xs font-mono ml-0.5">↑</span>
                  </div>
                </div>

                {/* Hover Slide-Up Content Panel: Animates upwards from bottom into view */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 z-20 flex flex-col justify-end text-white transform transition-all duration-500 ease-out ${
                    isRevealed
                      ? 'translate-y-0 opacity-100 pointer-events-auto'
                      : 'translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 pointer-events-none group-hover/card:pointer-events-auto'
                  }`}
                >
                  {/* Feature Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                    {item.title}
                  </h3>

                  {/* Tagline */}
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base lg:text-[17px] font-semibold text-sky-200 tracking-tight">
                    {item.tagline}
                  </p>

                  {/* Detailed Description */}
                  <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  {/* Interactive Buttons */}
                  <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-3.5 flex-wrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onLearnMoreClick) onLearnMoreClick(item.title);
                      }}
                      className="px-6 sm:px-7 py-2.5 sm:py-3 bg-white hover:bg-neutral-100 active:scale-95 text-[#111827] text-xs sm:text-sm font-semibold rounded-full shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
                    >
                      <span>Learn More</span>
                      <span>→</span>
                    </button>
                    {onShopClick && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShopClick(item.title);
                        }}
                        className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#3168E8] hover:bg-[#2355cc] active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all duration-200 cursor-pointer"
                      >
                        Shop Kiyoki
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-7 sm:mt-8">
          {baseFeatures.map((_, idx) => {
            const isActive = idx === activeDotIndex;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#111827] scale-110'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductCarousel;
