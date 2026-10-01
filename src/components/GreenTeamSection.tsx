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
    <section className="w-full bg-white text-gray-900 pt-7 sm:pt-9 lg:pt-11 pb-14 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1180px] mx-auto">
        {/* Section Heading & Subtitle - Aligned to Card Container */}
        <div className="mb-6 sm:mb-7 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-950 tracking-tight leading-tight">
            Meet The Green Team
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 font-normal leading-normal">
            A purifier for every need and every room.
          </p>
        </div>

        {/* Desktop & Tablet: Horizontal Interactive Accordion Cards (Aligned with red box height) */}
        <div className="hidden md:flex items-stretch gap-5 lg:gap-6 w-full h-[240px] lg:h-[250px]">
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
                className={`relative bg-[#F8F8F7] rounded-[14px] p-5 lg:p-6 transition-all duration-300 ease-in-out overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.07)] border border-black/[0.04] flex flex-col justify-between ${
                  isExpanded
                    ? 'cursor-default'
                    : 'cursor-pointer hover:bg-[#F3F3F1] hover:shadow-[0_14px_32px_rgba(0,0,0,0.11)]'
                }`}
              >
                {isExpanded ? (
                  /* Expanded Card State: Left Info Column + Right Image Column */
                  <div className="w-full h-full flex items-center justify-between gap-3">
                    {/* Left Info Area */}
                    <div className="flex-1 flex flex-col justify-between h-full py-0.5 pr-2 max-w-[64%]">
                      <div>
                        <span className="text-[11px] sm:text-xs text-gray-400 font-normal block mb-0.5 leading-tight">
                          {product.capacity}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight leading-snug mb-1.5">
                          {product.name}
                        </h3>
                        <p className="text-[11px] sm:text-[12px] text-gray-700 leading-relaxed font-normal line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShopNowClick?.(product.name);
                          }}
                          className="h-8 sm:h-[34px] px-5 sm:px-6 bg-[#0070F3] hover:bg-[#0060df] active:bg-[#0050c0] text-white text-xs font-semibold rounded-[5px] shadow-sm transition-colors duration-150 flex items-center justify-center cursor-pointer"
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>

                    {/* Right Product Image */}
                    <div className="w-[34%] h-full flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="max-h-[175px] lg:max-h-[190px] w-auto object-contain drop-shadow-sm pointer-events-none"
                      />
                    </div>
                  </div>
                ) : (
                  /* Collapsed Card State: Centered Product Image + Bottom Info */
                  <div className="w-full h-full flex flex-col items-center justify-between py-1">
                    {/* Product Image */}
                    <div className="flex-1 w-full flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="max-h-[130px] lg:max-h-[142px] w-auto object-contain drop-shadow-sm pointer-events-none transition-transform duration-300"
                      />
                    </div>

                    {/* Bottom Capacity & Name */}
                    <div className="text-center pt-1.5">
                      <span className="text-[10px] sm:text-[11px] text-gray-400 font-normal block leading-tight">
                        {product.capacity}
                      </span>
                      <h4 className="text-base sm:text-[17px] font-bold text-gray-950 mt-0.5 leading-snug">
                        {product.name}
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion View */}
        <div className="flex md:hidden flex-col gap-3.5 w-full">
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
                className={`bg-[#F8F8F7] rounded-[14px] p-4 transition-all duration-300 ease-in-out border border-black/[0.04] shadow-[0_6px_20px_rgba(0,0,0,0.06)] ${
                  isExpanded ? 'cursor-default' : 'cursor-pointer hover:bg-[#F3F3F1]'
                }`}
              >
                {isExpanded ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <span className="text-[11px] text-gray-400 font-normal block mb-0.5">
                          {product.capacity}
                        </span>
                        <h3 className="text-xl font-bold text-gray-950 tracking-tight">
                          {product.name}
                        </h3>
                      </div>
                      <div className="w-20 h-24 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="max-h-20 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShopNowClick?.(product.name);
                        }}
                        className="w-full h-9 bg-[#0070F3] hover:bg-[#0060df] text-white text-xs font-semibold rounded-[5px] shadow-sm flex items-center justify-center"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-normal block leading-tight">
                        {product.capacity}
                      </span>
                      <h4 className="text-base font-bold text-gray-950 mt-0.5 leading-snug">
                        {product.name}
                      </h4>
                    </div>
                    <div className="w-14 h-14 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="max-h-12 w-auto object-contain"
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
