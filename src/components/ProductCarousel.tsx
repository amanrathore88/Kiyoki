import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  roomTag: string;
  description: string;
  image: string;
}

interface ProductCarouselProps {
  onShopClick?: (productName: string) => void;
  onLearnMoreClick?: (productName: string) => void;
}

const baseProducts: ProductItem[] = [
  {
    id: 'kiyoki-x8',
    name: 'Kiyoki X8',
    roomTag: 'For Large Rooms',
    description: 'Engineered for open-concept living spaces, high ceilings, and expansive homes.',
    image: '/images/product_x8_living.jpg',
  },
  {
    id: 'kiyoki-x3',
    name: 'Kiyoki X3',
    roomTag: 'For Bedrooms',
    description: 'Whisper-quiet medical filtration tailored for restorative, deep rest.',
    image: '/images/product_x3_bedroom.jpg',
  },
  {
    id: 'kiyoki-pro',
    name: 'Kiyoki Pro',
    roomTag: 'For Executive Offices',
    description: 'High-throughput air purification built for executive boardrooms.',
    image: '/images/product_pro_office.jpg',
  },
  {
    id: 'kiyoki-studio',
    name: 'Kiyoki Studio',
    roomTag: 'For Active Studios',
    description: 'Rapid particulate turnover designed for fitness areas and creative spaces.',
    image: '/images/product_studio_gym.jpg',
  },
];

const N = baseProducts.length;
// 3 full sets for seamless infinite looping buffer in both directions
const extendedProducts = [...baseProducts, ...baseProducts, ...baseProducts];

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  onShopClick,
  onLearnMoreClick,
}) => {
  // Start in the middle set at index N (Kiyoki X8)
  const [virtualIndex, setVirtualIndex] = useState<number>(N);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [noTransition, setNoTransition] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(1200);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

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

  const slideTo = useCallback(
    (newIdx: number) => {
      if (isTransitioning) return;
      setNoTransition(false);
      setIsTransitioning(true);
      setVirtualIndex(newIdx);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    slideTo(virtualIndex + 1);
  }, [slideTo, virtualIndex]);

  const prevSlide = useCallback(() => {
    slideTo(virtualIndex - 1);
  }, [slideTo, virtualIndex]);

  const goToSlide = (targetBaseIdx: number) => {
    if (isTransitioning) return;
    slideTo(N + targetBaseIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Seamless silent jump when sliding into either buffer set
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (virtualIndex >= 2 * N) {
      setNoTransition(true);
      setVirtualIndex((prev) => prev - N);
    } else if (virtualIndex < N) {
      setNoTransition(true);
      setVirtualIndex((prev) => prev + N);
    }
  };

  // Touch handlers
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
        {/* Navigation Arrow: Previous (Always available for infinite loop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-11 sm:w-10 sm:h-12 rounded-lg bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900 stroke-[2.5]" />
        </button>

        {/* Navigation Arrow: Next (Always available for infinite loop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-11 sm:w-10 sm:h-12 rounded-lg bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Next product"
        >
          <ChevronRight className="w-5 h-5 text-gray-900 stroke-[2.5]" />
        </button>

        {/* Continuous Infinite Sliding Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex items-stretch will-change-transform"
          style={{
            transform: `translateX(${finalTranslate}px)`,
            transition:
              isDragging || noTransition
                ? 'none'
                : 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
            gap: `${gap}px`,
          }}
        >
          {extendedProducts.map((item, idx) => {
            const isActive = idx === virtualIndex;

            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => {
                  if (!isActive) slideTo(idx);
                }}
                style={{ width: `${cardWidth}px` }}
                className={`shrink-0 h-[440px] sm:h-[480px] lg:h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 transition-opacity duration-300 ${
                  isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-95'
                }`}
              >
                {/* Full-Bleed High-Quality Photorealistic Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 ease-out hover:scale-[1.02]"
                />

                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top-Left Category Tag */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 pointer-events-none">
                  <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
                    {item.roomTag}
                  </span>
                </div>

                {/* Bottom-Left Content: Name, Room Subtitle, CTAs (STRICTLY NO PRICING) */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 z-10 flex flex-col justify-end text-white">
                  {/* Product Name */}
                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-none drop-shadow-sm">
                    {item.name}
                  </h3>

                  {/* Subtitle / Description (Replacing price) */}
                  <p className="mt-2 text-xs sm:text-sm text-white/90 font-medium tracking-wide drop-shadow-xs max-w-md">
                    {item.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-3.5 flex-wrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onShopClick) onShopClick(item.name);
                      }}
                      className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#3168E8] hover:bg-[#2355cc] active:bg-[#1a44a8] text-white text-xs sm:text-sm font-semibold rounded-[6px] shadow-sm hover:shadow transition-all duration-200"
                    >
                      Shop Now
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onLearnMoreClick) onLearnMoreClick(item.name);
                      }}
                      className="px-6 sm:px-7 py-2.5 sm:py-3 bg-white hover:bg-gray-100 active:bg-gray-200 text-[#111827] text-xs sm:text-sm font-semibold rounded-[6px] shadow-2xs transition-all duration-200"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Pagination Indicator Dots (matching Tesla reference: ● ○ ○ ○) */}
        <div className="flex items-center justify-center gap-2.5 mt-7 sm:mt-8">
          {baseProducts.map((_, idx) => {
            const isActive = idx === activeDotIndex;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#111827] scale-110'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to product ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
