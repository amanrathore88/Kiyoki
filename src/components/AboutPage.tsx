import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: 'home' | 'shop' | 'technology' | 'about') => void;
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
}) => {
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

  const handleExploreClick = () => {
    const el = document.getElementById('about-mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          Exact Match to Reference Image 2:
          - Top-aligned layout: Headline and green image start at top of section
          - Larger font size with ultra-tight leading (leading-[0.92])
          - Button: w-[220px] rounded-full royal blue, positioned ~32px below headline
          - Right Image: aspect-[0.91/1] (466x511 ratio), 45.5% screen width, rounded-2xl/3xl,
            exact emerald wall, green sofa, brass table image from reference
         ========================================================================= */}
      <section
        id="about-hero"
        aria-label="About Kiyoki Hero"
        className="w-full bg-white pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20"
      >
        <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Column: Top-aligned Bold Headline & Pill Button */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start pt-2 sm:pt-4 lg:pt-6">
              <h1 className="text-[58px] sm:text-[76px] md:text-[88px] lg:text-[96px] xl:text-[104px] font-black leading-[0.92] tracking-[-0.04em] text-[#050505] max-w-[580px]">
                <span className="text-[#D8CEBE]">Purity</span> that
                <br />
                stands the
                <br />
                test of time
              </h1>

              {/* Royal Blue Pill Button matching reference */}
              <div className="pt-7 sm:pt-8 lg:pt-9">
                <button
                  type="button"
                  onClick={handleExploreClick}
                  className="w-[190px] sm:w-[220px] lg:w-[230px] h-[46px] sm:h-[48px] lg:h-[50px] bg-[#4267FF] hover:bg-[#3155EC] active:scale-95 text-white text-[13px] sm:text-[14px] font-bold tracking-[0.2em] uppercase rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                >
                  EXPLORE
                </button>
              </div>
            </div>

            {/* Right Column: Exact Emerald Green Designer Interior from Reference Image 2 */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-start">
              <div className="w-full max-w-[540px] xl:max-w-[580px] aspect-[0.91/1] rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden bg-[#1E4D38] shadow-sm">
                <img
                  src="/images/about/about-hero-interior-exact.png"
                  alt="Minimalist luxury interior with emerald green wall, velvet sofa, and brass plant table"
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
          Matching Reference Slice 2:
          - Background: Solid Black (#000000)
          - Top Header: Serif font with a thin white/gray horizontal rule extending across
          - Left: Body paragraph in clean sans-serif
          - Right: High-resolution image of focused hands working at a design desk
         ========================================================================= */}
      <section
        id="about-mission"
        aria-label="Kiyoki Mission and Science"
        className="w-full bg-black text-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32"
      >
        <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          
          {/* Top Serif Heading - High Visibility & Perfect Proportion */}
          <h2 className="font-serif text-[34px] sm:text-[46px] md:text-[54px] lg:text-[60px] xl:text-[66px] font-normal text-white tracking-tight leading-snug">
            Professional engineering for pure living
          </h2>

          {/* Crisp, High-Visibility Solid White Dividing Line */}
          <div className="w-full h-[1.5px] bg-white mt-4 sm:mt-5 mb-14 sm:mb-20 lg:mb-28" />

          {/* Two-Column Content Row: Generous Open Black Space, Narrow 5-Line Paragraph, Sharp Photo */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
            
            {/* Left Column: Focused 5-Line Editorial Paragraph */}
            <div className="w-full lg:max-w-[320px] xl:max-w-[340px]">
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white/90 font-normal leading-[1.65]">
                Our mission combines expert engineering, practical science, and actionable filtration for immediate living space impact.
              </p>
            </div>

            {/* Right Column: Exact Sharp-Cornered Photo from Reference Image 2 */}
            <div className="w-full max-w-[500px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px]">
              <div className="w-full aspect-[1.84/1] rounded-none overflow-hidden bg-neutral-900 border border-white/10 shadow-none">
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
          SECTION 03: REGISTRATION PACKAGES (White Background)
          Exact Match to Reference Image 2:
          - Top solid black horizontal rule across
          - Serif Heading "Choose your registration package"
          - Bottom solid black horizontal rule across
          - 3 Sharp-cornered cards in #E4E4E4 gray with Standard, Professional, Premium passes
          - Prices $99, $149, $199 at bottom-left without dividing lines
         ========================================================================= */}
      <section
        id="about-pillars"
        aria-label="Registration Packages"
        className="w-full bg-white pt-10 sm:pt-14 lg:pt-18 pb-16 sm:pb-24 lg:pb-32"
      >
        <div className="w-full max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          
          {/* Top Horizontal Black Line */}
          <div className="w-full h-px sm:h-[1.5px] bg-black" />

          {/* Heading between the two solid black lines */}
          <div className="py-7 sm:py-9 lg:py-11">
            <h2 className="font-serif text-[34px] sm:text-[46px] md:text-[54px] lg:text-[60px] xl:text-[64px] font-normal text-[#050505] tracking-tight leading-none">
              Choose your registration package
            </h2>
          </div>

          {/* Bottom Horizontal Black Line */}
          <div className="w-full h-px sm:h-[1.5px] bg-black" />

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-5 mt-12 sm:mt-16 lg:mt-20">
            
            {/* Card 1: Standard pass */}
            <div className="bg-[#E4E4E4] rounded-none p-7 sm:p-8 lg:p-9 xl:p-10 flex flex-col justify-between min-h-[350px] sm:min-h-[380px] lg:min-h-[420px]">
              <div>
                <h3 className="font-serif text-[24px] sm:text-[27px] lg:text-[29px] font-normal text-[#050505] mb-5 sm:mb-6">
                  Standard pass
                </h3>
                <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14.5px] text-[#111111] font-normal leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Full training access</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Digital materials</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 sm:pt-10">
                <span className="text-[32px] sm:text-[36px] lg:text-[40px] font-black text-[#050505] tracking-tight block leading-none">
                  $99
                </span>
              </div>
            </div>

            {/* Card 2: Professional pass */}
            <div className="bg-[#E4E4E4] rounded-none p-7 sm:p-8 lg:p-9 xl:p-10 flex flex-col justify-between min-h-[350px] sm:min-h-[380px] lg:min-h-[420px]">
              <div>
                <h3 className="font-serif text-[24px] sm:text-[27px] lg:text-[29px] font-normal text-[#050505] mb-5 sm:mb-6">
                  Professional pass
                </h3>
                <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14.5px] text-[#111111] font-normal leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Full training access</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Digital materials</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Bonus resources</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 sm:pt-10">
                <span className="text-[32px] sm:text-[36px] lg:text-[40px] font-black text-[#050505] tracking-tight block leading-none">
                  $149
                </span>
              </div>
            </div>

            {/* Card 3: Premium pass */}
            <div className="bg-[#E4E4E4] rounded-none p-7 sm:p-8 lg:p-9 xl:p-10 flex flex-col justify-between min-h-[350px] sm:min-h-[380px] lg:min-h-[420px]">
              <div>
                <h3 className="font-serif text-[24px] sm:text-[27px] lg:text-[29px] font-normal text-[#050505] mb-5 sm:mb-6">
                  Premium pass
                </h3>
                <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14.5px] text-[#111111] font-normal leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Full training access</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Digital materials</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Bonus resources</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#050505] text-[15px] leading-snug">•</span>
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 sm:pt-10">
                <span className="text-[32px] sm:text-[36px] lg:text-[40px] font-black text-[#050505] tracking-tight block leading-none">
                  $199
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

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
