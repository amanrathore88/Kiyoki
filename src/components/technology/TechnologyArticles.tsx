import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Clock, User, Calendar } from 'lucide-react';
import { TECHNOLOGY_DATA, TechnologyArticle } from '../../technologyData';

export const TechnologyArticles: React.FC = () => {
  const { articlesSection } = TECHNOLOGY_DATA;
  const [selectedArticle, setSelectedArticle] = useState<TechnologyArticle | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    if (selectedArticle) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  return (
    <section className="w-full bg-[#080A0C] text-white py-14 sm:py-16 lg:py-20 select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Centered Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight leading-snug">
            {articlesSection.heading}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#BFC3CA] font-normal mt-2.5 leading-relaxed">
            {articlesSection.subtitle}
          </p>
        </div>

        {/* 2-Column Horizontal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {articlesSection.articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row cursor-pointer text-slate-900 border border-slate-200/80 min-h-[190px]"
            >
              {/* Left Image (45% on desktop/tablet) */}
              <div className="relative w-full sm:w-[45%] h-48 sm:h-auto overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Right Content (55%) */}
              <div className="p-5 sm:p-6 sm:w-[55%] flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-[#1769FF] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-slate-600 leading-[1.6]">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1769FF] group-hover:underline">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Accessible Interactive Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-fade-in text-slate-900">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1769FF] bg-blue-50 px-2.5 py-1 rounded-full">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content Area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {selectedArticle.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2.5">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{selectedArticle.author}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedArticle.readTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedArticle.date}</span>
                  </span>
                </div>
              </div>

              {/* Lead paragraph */}
              <p className="text-sm sm:text-[15px] font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedArticle.content.lead}
              </p>

              {/* Content Sections */}
              <div className="space-y-6">
                {selectedArticle.content.sections.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {sec.heading}
                    </h3>
                    {sec.body.map((p, j) => (
                      <p key={j} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">KIYOKI Scientific Editorial</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
