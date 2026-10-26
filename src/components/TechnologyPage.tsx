import React, { useEffect } from 'react';
import { TechnologyHero } from './technology/TechnologyHero';
import { ScienceIntroduction } from './technology/ScienceIntroduction';
import { TechnologySteps } from './technology/TechnologySteps';
import { TechnologyVideo } from './technology/TechnologyVideo';
import { NatureTechnology } from './technology/NatureTechnology';
import { TechnologyValidation } from './technology/TechnologyValidation';
import { TechnologyBenefits } from './technology/TechnologyBenefits';
import { TechnologyArticles } from './technology/TechnologyArticles';

interface TechnologyPageProps {
  onNavigate?: (page: 'home' | 'shop' | 'technology') => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = () => {
  // Update document title and meta description for SEO
  useEffect(() => {
    document.title = 'Air Purification Technology | KIYOKI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the technology behind KIYOKI air purifiers, including advanced filtration, intelligent airflow and cleaner indoor air solutions.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleExploreClick = () => {
    const target = document.getElementById('how-it-works');
    if (target) {
      const headerOffset = 88;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 font-sans selection:bg-[#1769FF]/15 selection:text-[#1769FF]">
      {/* SECTION 01 — MOLECULAR SCIENCE HERO */}
      <TechnologyHero onExploreClick={handleExploreClick} />

      {/* SECTION 02 — THE SCIENCE OF PURE AIR */}
      <ScienceIntroduction />

      {/* SECTION 03 — HOW IT WORKS IN THREE SIMPLE STEPS */}
      <TechnologySteps />

      {/* SECTION 04 — ADVANCED TECHNOLOGY VIDEO SHOWCASE (BLACK) */}
      <TechnologyVideo />

      {/* SECTION 05 — NATURE-INSPIRED TECHNOLOGY EDITORIAL (WHITE) */}
      <NatureTechnology />

      {/* SECTION 06 — TECHNOLOGY VALIDATION / TESTING (BLACK) */}
      <TechnologyValidation />

      {/* SECTION 07 — KEY BENEFITS OF KIYOKI TECHNOLOGY (WHITE) */}
      <TechnologyBenefits />

      {/* SECTION 08 — READ MORE ABOUT OUR TECHNOLOGY (BLACK) */}
      <TechnologyArticles />
    </div>
  );
};

export default TechnologyPage;
