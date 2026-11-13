import React, { useEffect } from 'react';
import { TechnologyNavbar } from './components/TechnologyNavbar';
import { TechnologyHero } from './components/TechnologyHero';
import { EngineeredStrip } from './components/EngineeredStrip';
import { ScienceSection } from './components/ScienceSection';
import { AirInAction } from './components/AirInAction';
import { TechnologyBanner } from './components/TechnologyBanner';
import { BreatheEasy } from './components/BreatheEasy';
import { PureAirInMotion } from './components/PureAirInMotion';
import { RelatedArticles } from './components/RelatedArticles';
import { TechnologyFooter } from './components/TechnologyFooter';

import './styles/technology.css';
import './styles/responsive.css';

interface TechnologyPageProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  onNavigate?: (page: 'home' | 'shop' | 'technology' | 'about') => void;
  standalone?: boolean;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({
  onOpenSearch = () => {},
  onOpenCart = () => {},
  cartCount = 0,
  onNavigate,
  standalone = false,
}) => {
  // Update document title and scroll to top when mounting
  useEffect(() => {
    document.title = 'The Science of Clean Air | KIYOKI Technology';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the science and engineering behind Kiyoki air purification: thoughtful airflow, advanced filtration, and human-centered design.'
      );
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="w-full bg-white text-[#1C1D20] font-sans antialiased selection:bg-[#E5DEC9] selection:text-black">
      {/* SECTION 01: Top Navigation Bar (Rendered when standalone; App.tsx provides global Header otherwise) */}
      {standalone && (
        <TechnologyNavbar
          onOpenSearch={onOpenSearch}
          onOpenCart={onOpenCart}
          cartCount={cartCount}
          onNavigate={onNavigate}
        />
      )}

      {/* Main Content Landmark */}
      <div id="technology-page-content" className="w-full">
        {/* SECTION 02: Hero Canvas with 5-Layer Composition */}
        <TechnologyHero />

        {/* SECTION 03: Engineered for Every Room Champagne Strip */}
        <EngineeredStrip />

        {/* SECTION 04: Our Science & Our Approach Two-Column Section */}
        <ScienceSection />

        {/* SECTION 05: Air in Action 3-Card Lifestyle Grid */}
        <AirInAction />

        {/* SECTION 06: Panoramic Monochrome Landscape Banner */}
        <TechnologyBanner />

        {/* SECTION 07: Breathe Easy Architectural Callout Box */}
        <BreatheEasy />

        {/* SECTION 08: Pure Air in Motion 50/50 Feature Section */}
        <PureAirInMotion />

        {/* SECTION 09: Related Articles on Air Technology */}
        <RelatedArticles />
      </div>

      {/* SECTION 10: Global Footer (Rendered when standalone; App.tsx provides global Footer otherwise) */}
      {standalone && (
        <TechnologyFooter
          onOpenSearch={onOpenSearch}
          onOpenCart={onOpenCart}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

export default TechnologyPage;
