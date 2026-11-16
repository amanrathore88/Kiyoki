import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AboutEnvironmentalSection } from './AboutEnvironmentalSection';

interface AboutPageProps {
  onNavigate?: (page: 'home' | 'shop' | 'technology' | 'about') => void;
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
}

const DYNAMIC_HERO_WORDS = ['Clean', 'Pure', 'Fresh', 'Safe', 'Living'];

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
}) => {
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'visible' | 'exit' | 'enter'>('visible');

  // Ultra-smooth dynamic word cycling effect
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Initiate graceful exit: slides up and fades with soft blur
      setAnimationState('exit');

      // 2. Once exited (320ms), swap word while positioned below
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % DYNAMIC_HERO_WORDS.length);
        setAnimationState('enter');

        // 3. Immediately glide smoothly up into view
        setTimeout(() => {
          setAnimationState('visible');
        }, 30);
      }, 320);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  // Interactive accordion state: tracks which FAQ box is expanded
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      id: 1,
      question: 'How does Kiyoki active purification work?',
      answer:
        'We release beneficial negative ions that bind to and neutralize airborne pollutants before they settle on surfaces.',
    },
    {
      id: 2,
      question: 'How long do multi-stage filters last?',
      answer:
        'Most filters last 6 to 12 months under everyday use, with intelligent real-time sensor reminders.',
    },
    {
      id: 3,
      question: 'Is Kiyoki safe for quiet bedrooms and infants?',
      answer:
        'Yes. We produce zero ozone, zero chemicals, and run below 18 dB for undisturbed peaceful sleep.',
    },
    {
      id: 4,
      question: 'What airborne pollutants are captured?',
      answer:
        'We trap PM2.5, dust, pollen, VOCs, wildfire smoke, pet dander, and microscopic airborne pathogens.',
    },
  ];
  // Scroll to top and set page title when mounting
  useEffect(() => {
    document.title = 'About Us | KIYOKI — The Science of Pure Air';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleShopClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      window.location.hash = '#shop';
    }
  };

  return (
    <div className="w-full bg-white text-[#050505] font-sans antialiased selection:bg-[#E5DEC9] selection:text-black">
      
      {/* =========================================================================
          SECTION 01: HERO SECTION (White Background)
          Polished & Premium Layout:
          - Centered Main Heading with Ultra-Smooth Dynamic Cycling (Clean -> Pure -> Fresh -> Safe -> Living)
          - Left: Clean, spacious brand narrative matching reference style
          - Right: Clean rounded pastel card with portable lineup photo
         ========================================================================= */}
      <section
        id="about-hero"
        aria-label="About Kiyoki Hero"
        className="w-full bg-white text-[#050505] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-22 lg:pb-28"
      >
        <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          
          {/* Centered Main Heading with Ultra-Smooth Dynamic Animated Word */}
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-[38px] sm:text-[50px] md:text-[60px] lg:text-[66px] xl:text-[72px] font-black tracking-[-0.035em] leading-[1.08] text-[#050505]">
              <span className="inline-block relative overflow-hidden align-baseline">
                <span
                  className={`inline-block text-[#3B82F6] will-change-transform ${
                    animationState === 'visible'
                      ? 'opacity-100 translate-y-0 filter-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
                      : animationState === 'exit'
                      ? 'opacity-0 -translate-y-[35%] blur-[1.5px] transition-all duration-300 ease-in'
                      : 'opacity-0 translate-y-[35%] blur-[1.5px] transition-none'
                  }`}
                >
                  {DYNAMIC_HERO_WORDS[dynamicWordIndex]}
                </span>
              </span>{' '}
              <span className="text-[#3B82F6]">air,</span>{' '}
              <span>wherever life takes you.</span>
            </h1>
          </div>

          {/* Two-Column Grid: Left Copy & Right Clean Image Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            
            {/* Left Column: Authentic Brand Narrative */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7">
              <p className="text-[15.5px] sm:text-[16.5px] lg:text-[17.5px] text-neutral-800 leading-[1.76] font-normal">
                We’re Kiyoki, an advanced air-wellness brand built around one stubborn belief: clean, breathable air should be available to everyone, everywhere. Not just inside an air-conditioned room with a bulky purifier humming in the corner, but out in the world where we actually live our lives.
              </p>
              
              <p className="text-[15.5px] sm:text-[16.5px] lg:text-[17.5px] text-neutral-800 leading-[1.76] font-normal">
                So we engineered air purification you can carry with you—to your commute, your office, your morning walk, and your everyday travels. Grounded in aerosol physics and verified by IIT Kanpur, we don’t think the air you breathe should ever depend on where you happen to be standing.
              </p>
            </div>

            {/* Right Column: Clean Rounded Card matching Reference */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[580px] xl:max-w-[620px] aspect-[1.34/1] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-[#BFDBFE] shadow-lg border border-neutral-100/80">
                <img
                  src="/images/about/about-hero-portable-lineup.jpg"
                  alt="Lineup of sleek Kiyoki portable personal air purifiers in modern pastel finishes"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 02: STATEMENT / MISSION BANNER (Pitch Black Background)
          Refined Editorial Layout:
          - Background: Solid Black (#000000)
          - Top Header: Serif font with a crisp white dividing line
          - Left: In-depth narrative on engineering philosophy + 3 key performance metrics
          - Right: High-resolution photo of focused hands at the design desk
          - Perfectly balanced vertical heights between left copy and right image
         ========================================================================= */}
      <section
        id="about-mission"
        aria-label="Kiyoki Mission and Science"
        className="w-full bg-black text-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-22 lg:pb-28"
      >
        <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          
          {/* Top Serif Heading */}
          <h2 className="font-serif text-[34px] sm:text-[46px] md:text-[54px] lg:text-[60px] xl:text-[66px] font-normal text-white tracking-tight leading-snug">
            Professional engineering for pure living
          </h2>

          {/* Crisp, High-Visibility Solid White Dividing Line */}
          <div className="w-full h-[1.5px] bg-white mt-4 sm:mt-5 mb-8 sm:mb-10 lg:mb-12" />

          {/* Two-Column Content Row: Balanced Left Narrative & Right Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Substantive Narrative & Empirical Specs */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
              
              <p className="text-[17px] sm:text-[18px] lg:text-[19px] text-white font-medium leading-[1.6] mb-4">
                At Kiyoki, we believe that pure indoor air is an engineering science, not a luxury accessory. Our design studio brings together aerosol physics, precision mechanical engineering, and human-centered ergonomics to fundamentally transform how living spaces breathe.
              </p>
              
              <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] text-white/75 font-normal leading-[1.7] mb-7 sm:mb-8">
                From custom-calibrated brushless DC motors that run in tranquil silence below 18 dB, to active negative ion matrices verified in independent academic trials, every component is sculpted with deliberate purpose. We engineer seamless, zero-ozone purification that quietly elevates your everyday environment.
              </p>

              {/* Three-Metric Editorial Highlight Row */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/15">
                <div>
                  <span className="text-[22px] sm:text-[26px] font-black text-white tracking-tight block leading-tight">
                    99.97%
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-wider text-white/60 font-semibold block mt-0.5">
                    Sub-Micron Capture
                  </span>
                </div>

                <div>
                  <span className="text-[22px] sm:text-[26px] font-black text-white tracking-tight block leading-tight">
                    &lt; 18 dB
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-wider text-white/60 font-semibold block mt-0.5">
                    Silent Operation
                  </span>
                </div>

                <div>
                  <span className="text-[22px] sm:text-[26px] font-black text-white tracking-tight block leading-tight">
                    0.00 ppm
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-wider text-white/60 font-semibold block mt-0.5">
                    Safe Zero Ozone
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Resolution Photo of Design Craft */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[580px] xl:max-w-[620px] aspect-[1.7/1] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                <img
                  src="/images/about/about-craft-desk-exact-2x.png"
                  alt="Hands typing on laptop with coffee mug and notebook on wooden desk"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 03: ENVIRONMENTAL & CLIMATE COMMITMENT (Interactive 3-Element Showcase)
          Exact Match to Reference Mockup:
          - Centered Section Header: "Environmental & Climate Action"
          - Cycle Navigation Controls with < > round buttons and index pill
          - 3-Element Stage: Left Context Image + Center Content Card + Right Action Image
          - Accompanying images update synchronously as user cycles through slides
         ========================================================================= */}
      <AboutEnvironmentalSection />

      {/* =========================================================================
          SECTION 04: FAQS & LIFESTYLE SHOWCASE (Pitch Black Background)
          Exact Match to Reference Image 2:
          - Background: Solid Black (#000000)
          - Left: "FAQs" bold title + 4 perfectly formed white rounded cards
          - Expandable view: clicking any card smoothly reveals/toggles its answer below
          - Right: Exact light blue armchair & shelving alcove room from Reference Image 2,
            aspect-[0.91/1] with smooth rounded corners, perfectly aligned with left column
         ========================================================================= */}
      <section
        id="about-faqs"
        aria-label="Frequently Asked Questions"
        className="w-full bg-black text-white pt-14 sm:pt-18 lg:pt-24 pb-16 sm:pb-22 lg:pb-30"
      >
        <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: FAQs Headline & 4 Interactive Rounded Cards */}
            <div className="w-full flex flex-col justify-center">
              <h2 className="text-[44px] sm:text-[54px] lg:text-[62px] xl:text-[68px] font-black text-white tracking-tight leading-none mb-6 sm:mb-8 lg:mb-10">
                FAQs
              </h2>

              <div className="space-y-3.5 sm:space-y-4 lg:space-y-4.5">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndices.includes(index);
                  return (
                    <div
                      key={faq.id}
                      onClick={() => toggleFaq(index)}
                      className="bg-white rounded-2xl sm:rounded-[20px] p-5 sm:p-5.5 lg:p-6 text-black shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl active:scale-[0.99] select-none border border-black/5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-bold text-[15px] sm:text-[16px] lg:text-[17px] text-[#050505] tracking-tight leading-snug">
                          {faq.question}
                        </h3>
                        <div className="shrink-0 text-neutral-400">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-black' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Smooth Collapsible Answer Grid */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 mt-2.5 sm:mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] text-neutral-600 font-normal leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Exact Light Blue Armchair & Sage Alcove Interior from Reference Image 2 */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[540px] xl:max-w-[580px] aspect-[0.91/1] rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden shadow-2xl bg-neutral-900 border border-white/10">
                <img
                  src="/images/about/about-faq-interior-exact-2x.png"
                  alt="Minimalist tranquil room with light blue armchair, soft rug, and wooden shelf alcove"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: ELEVATE LEADERSHIP & CALL TO ACTION (White Background)
          Matching Reference Slice 5:
          - Top Header: Serif font "Elevate Your Skills & Leadership"
          - Full-width landscape photo of collaborative team
          - Bottom: Description on left, Terracotta/Coral CTA button "Register now" -> "Shop Kiyoki"
         ========================================================================= */}
      <section
        id="about-elevate"
        aria-label="Elevate Your Everyday Atmosphere"
        className="w-full bg-white py-16 sm:py-20 lg:py-26"
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          
          {/* Top Serif Heading */}
          <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[54px] font-normal text-[#050505] tracking-tight leading-tight mb-8 sm:mb-10">
            Elevate Your Everyday Atmosphere
          </h2>

          {/* Full-Width Landscape Photography */}
          <div className="w-full aspect-[2.1/1] sm:aspect-[2.5/1] lg:aspect-[2.9/1] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-neutral-100 mb-8 sm:mb-10">
            <img
              src="/images/about/about-team-collab.jpg"
              alt="Two design colleagues collaborating warmly over coffee in sunlit botanical space"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Bottom Bar: Copy Left, Terracotta Button Right */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
            <p className="text-neutral-700 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-xl">
              Experience practical, hands-on engineering designed to help you live, focus, and thrive in pure, energizing air.
            </p>

            <button
              type="button"
              onClick={handleShopClick}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[#E0856E] hover:bg-[#d4755d] active:scale-95 text-white text-[14px] sm:text-[15px] font-bold rounded-[6px] transition-all duration-200 shadow-md hover:shadow-lg shrink-0 cursor-pointer"
            >
              Shop Kiyoki
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
