import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  alt: string;
  tagline: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  location: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/images/hero-living-room.png',
    alt: 'Sunlit Living Room with KIYOKI Air Purifier',
    tagline: 'LIVING SPACES',
    titleLine1: 'Cleaner Air',
    titleLine2: 'Healthier Living',
    subtitle: 'Advanced air purification for every space.',
    location: 'Residential Living Suite',
  },
  {
    id: 2,
    image: '/images/hero-office.png',
    alt: 'Modern Office with KIYOKI Air Purifier',
    tagline: 'PRODUCTIVITY SUITES',
    titleLine1: 'Cleaner Air',
    titleLine2: 'Healthier Living',
    subtitle: 'Advanced air purification for every space.',
    location: 'Executive Workspaces',
  },
  {
    id: 3,
    image: '/images/hero-gym.png',
    alt: 'Kiyoki Air Purifier in Modern Gym',
    tagline: 'ACTIVE PERFORMANCE',
    titleLine1: 'Cleaner Air',
    titleLine2: 'Healthier Living',
    subtitle: 'Advanced air purification for every space.',
    location: 'High-Demand Fitness Studios',
  },
];

interface HeroCarouselProps {
  onShopClick?: () => void;
  onLearnMoreClick?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onShopClick,
  onLearnMoreClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Automatic slide transition every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Touch gesture support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-black select-none group"
      style={{ minHeight: '470px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Carousel"
    >
      {/* 470px Height Frame on Desktop, responsive container */}
      <div className="relative w-full h-[470px] sm:h-[490px] md:h-[500px] lg:h-[470px] xl:h-[510px]">
        {/* Carousel Slides */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Full-width Hero Media Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center lg:object-[center_60%]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Subtle visual gradient to ensure text readability over bright sunlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent pointer-events-none"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          );
        })}

        {/* Content Overlay - Placed strictly according to Wireframe and Reference */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="w-full max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">
            <div className="max-w-xl pointer-events-auto">
              {/* Headline: Cleaner Air / Healthier Living */}
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] drop-shadow-md">
                <span>Cleaner Air</span>
                <br />
                <span>Healthier Living</span>
              </h1>

              {/* Supporting Copy */}
              <p className="mt-3 sm:mt-4 text-white/95 text-base sm:text-lg md:text-[19px] font-normal leading-relaxed drop-shadow">
                Advanced air purification for every space.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex items-center gap-3.5 sm:gap-4 flex-wrap">
                {/* Primary CTA: Sky Blue 'Shop Now' */}
                <a
                  href="#featured"
                  onClick={onShopClick}
                  className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-[#3168E8] hover:bg-[#2456D2] active:bg-[#1d47b5] text-white text-[15px] font-semibold rounded-[6px] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-brand focus:ring-offset-2"
                >
                  Shop Now
                </a>

                {/* Secondary CTA: White 'Learn More' */}
                <a
                  href="#technology"
                  onClick={onLearnMoreClick}
                  className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-white hover:bg-gray-100 active:bg-gray-200 text-[#111827] text-[15px] font-semibold rounded-[6px] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows - Exactly as shown in Reference Image */}
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-11 sm:w-10 sm:h-12 bg-white/90 hover:bg-white active:scale-95 text-gray-800 rounded-[6px] shadow-lg items-center justify-center transition-all duration-200 focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] text-gray-900" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-11 sm:w-10 sm:h-12 bg-white/90 hover:bg-white active:scale-95 text-gray-800 rounded-[6px] shadow-lg items-center justify-center transition-all duration-200 focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] text-gray-900" />
        </button>

        {/* Pagination Dots - Centered at bottom matching reference */}
        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {slides.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive 
                    ? 'w-7 h-2.5 bg-white shadow-md' 
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
