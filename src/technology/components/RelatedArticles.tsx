import React from 'react';
import { TECHNOLOGY_PAGE_DATA } from '../technologyData';
import urbanPollutionImg from '../assets/images/urban-pollution.png';
import negativeIonsImg from '../assets/images/negative-ions.png';

export const RelatedArticles: React.FC = () => {
  const { articles } = TECHNOLOGY_PAGE_DATA;

  const articleImages: Record<string, string> = {
    'urban-pollution': urbanPollutionImg,
    'modern-filtration': negativeIonsImg,
  };

  return (
    <section
      id="related-articles"
      aria-label="Related Articles on Air Technology"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-gray-100"
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header: Centered Heading & Subtitle */}
        <div className="mb-10 sm:mb-12 lg:mb-14 text-center flex flex-col items-center">
          <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-light text-[#1C1D20] tracking-tight">
            {articles.heading}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6B7280] font-normal mt-2.5 max-w-[680px] mx-auto text-center leading-relaxed">
            {articles.subtitle}
          </p>
        </div>

        {/* Two Horizontal Article Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {articles.cards.map((card) => {
            const imgSrc = articleImages[card.id] || urbanPollutionImg;

            return (
              <article
                key={card.id}
                className="flex flex-col sm:flex-row items-stretch gap-6 border border-gray-200/90 p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative w-full sm:w-[220px] aspect-[16/9] sm:aspect-auto sm:min-h-[135px] flex-shrink-0 overflow-hidden bg-gray-100 border border-gray-100">
                  <img
                    src={imgSrc}
                    alt={card.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Article Info */}
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold tracking-[0.16em] text-[#9CA3AF] uppercase block">
                      {card.readTime}
                    </span>
                    <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#1C1D20] leading-snug group-hover:text-sky-brand transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#555A64]">
                      {card.excerpt}
                    </p>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#articles"
                      onClick={(e) => e.preventDefault()}
                      className="text-[14px] font-bold text-sky-brand hover:text-sky-dark inline-flex items-center gap-1.5 group/link"
                    >
                      <span>Read Article</span>
                      <svg
                        className="w-4 h-4 stroke-[2.5] text-sky-brand group-hover/link:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
