import React, { useState } from 'react';

interface ProductCardData {
  id: string;
  name: string;
  capacity: string;
  description: string;
  image: string;
  imageAlt: string;
}

const PRODUCTS: ProductCardData[] = [
  {
    id: 'x8',
    name: 'X8',
    capacity: 'up to 4,000 sq.ft.',
    description:
      'Perfect for open-concept family spaces, basements, commercial offices, and retail spaces—the X8 is ideal for spaces between 1,000-1,600 sq.ft.',
    image: '/images/purifier_x8.png',
    imageAlt: 'Kiyoki X8 Air Purifier for large spaces',
  },
  {
    id: 'x3',
    name: 'X3',
    capacity: 'up to 869 sq.ft.',
    description:
      'Designed for bedrooms, nurseries, and personal work studios—the X3 delivers whisper-quiet, medical-grade purification for spaces up to 869 sq.ft.',
    image: '/images/purifier_x3.png',
    imageAlt: 'Kiyoki X3 Air Purifier for bedrooms',
  },
  {
    id: 'x5',
    name: 'X5',
    capacity: 'up to 1,600 sq.ft.',
    description:
      'Engineered for master suites, living rooms, and open apartments—the X5 offers high-velocity filtration and smart air sensing for spaces up to 1,600 sq.ft.',
    image: '/images/purifier_x5.png',
    imageAlt: 'Kiyoki X5 Air Purifier for family rooms',
  },
];

interface GreenTeamSectionProps {
  onShopNowClick?: (productName: string) => void;
}

export const GreenTeamSection: React.FC<GreenTeamSectionProps> = ({
  onShopNowClick,
}) => {
  // Initial expanded state is Card 1 (X8) matching the reference design
  const [expandedId, setExpandedId] = useState<string>('x8');

  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1180px] mx-auto">
        {/* Section Heading & Subtitle - Left Aligned to Card Container */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-950 tracking-tight leading-tight">
            Meet The Green Team
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700 font-normal leading-normal">
            A purifier for every need and every room.
          </p>
        </div>

        {/* Desktop & Tablet: Horizontal Interactive Accordion Cards */}
        <div className="hidden md:flex items-stretch gap-5 lg:gap-6 w-full h-[320px] lg:h-[340px]">
          {PRODUCTS.map((product) => {
            const isExpanded = expandedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => {
                  if (!isExpanded) {
                    setExpandedId(product.id);
                  }
                }}
                style={{
                  flex: isExpanded ? '2.1 1 0%' : '1 1 0%',
                }}
                className={`relative bg-[#F8F8F7] rounded-[16px] p-6 lg:p-7 transition-all duration-300 ease-in-out overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-black/[0.04] flex flex-col justify-between ${
                  isExpanded
                    ? 'cursor-default'
                    : 'cursor-pointer hover:bg-[#F3F3F1] hover:shadow-[0_6px_28px_rgba(0,0,0,0.05)]'
                }`}
              >
                {isExpanded ? (
                  /* Expanded Card State: Left Info Column + Right Image Column */
                  <div className="w-full h-full flex items-center justify-between gap-4">
                    {/* Left Info Area */}
                    <div className="flex-1 flex flex-col justify-between h-full py-1 pr-2 max-w-[62%]">
                      <div>
                        <span className="text-[12px] sm:text-[13px] text-gray-400 font-normal block mb-1">
                          {product.capacity}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight mb-3">
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShopNowClick?.(product.name);
                          }}
                          className="h-10 px-6 sm:px-7 bg-[#0070F3] hover:bg-[#0060df] active:bg-[#0050c0] text-white text-xs sm:text-[13px] font-medium rounded-[6px] shadow-sm transition-colors duration-150 flex items-center justify-center cursor-pointer"
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>

                    {/* Right Product Image */}
                    <div className="w-[36%] h-full flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="max-h-[240px] lg:max-h-[260px] w-auto object-contain drop-shadow-sm pointer-events-none"
                      />
                    </div>
                  </div>
                ) : (
                  /* Collapsed Card State: Centered Product Image + Bottom Info */
                  <div className="w-full h-full flex flex-col items-center justify-between py-2">
                    {/* Product Image */}
                    <div className="flex-1 w-full flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="max-h-[170px] lg:max-h-[185px] w-auto object-contain drop-shadow-sm pointer-events-none transition-transform duration-300"
                      />
                    </div>

                    {/* Bottom Capacity & Name */}
                    <div className="text-center pt-2">
                      <span className="text-[11px] sm:text-[12px] text-gray-400 font-normal block leading-tight">
                        {product.capacity}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-950 mt-0.5 leading-snug">
                        {product.name}
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion View (Stack vertically, expanding on click) */}
        <div className="flex md:hidden flex-col gap-4 w-full">
          {PRODUCTS.map((product) => {
            const isExpanded = expandedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => {
                  if (!isExpanded) {
                    setExpandedId(product.id);
                  }
                }}
                className={`bg-[#F8F8F7] rounded-[14px] p-5 transition-all duration-300 ease-in-out border border-black/[0.04] shadow-sm ${
                  isExpanded ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                {isExpanded ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs text-gray-400 font-normal block mb-1">
                          {product.capacity}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-950 tracking-tight">
                          {product.name}
                        </h3>
                      </div>
                      <div className="w-24 h-28 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="max-h-24 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShopNowClick?.(product.name);
                        }}
                        className="w-full h-10 bg-[#0070F3] hover:bg-[#0060df] text-white text-xs font-semibold rounded-[6px] shadow-sm flex items-center justify-center"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 font-normal block leading-tight">
                        {product.capacity}
                      </span>
                      <h4 className="text-lg font-bold text-gray-950 mt-0.5 leading-snug">
                        {product.name}
                      </h4>
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="max-h-14 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
