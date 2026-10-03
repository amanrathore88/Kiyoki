import React, { useState } from 'react';
import { KiyokiLogo } from './KiyokiLogo';

interface FooterProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSearch,
  onOpenCart,
}) => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [activeSupportModal, setActiveSupportModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setSubscribeStatus('error');
      setStatusMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(trimmed)) {
      setSubscribeStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setSubscribeStatus('success');
    setStatusMessage('Thank you for subscribing! Welcome to Kiyoki.');
    setEmail('');

    setTimeout(() => {
      setSubscribeStatus('idle');
      setStatusMessage('');
    }, 5000);
  };

  const handleNavClick = (href: string, label: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (label === 'Help Center' || label === 'Contact Us' || label === 'Installation Guide') {
      setActiveSupportModal(label);
      return;
    }

    if (label === 'Air Purifiers' || label === 'Filters' || label === 'Accessories') {
      if (onOpenCart) {
        onOpenCart();
        return;
      }
    }

    if (onOpenSearch) {
      onOpenSearch();
    }
  };

  return (
    <footer className="w-full bg-black text-white selection:bg-neutral-800 selection:text-white relative select-none">
      {/* Centered Main Content Container with ~48-64px horizontal padding on desktop */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-14">
        
        {/* =========================================================
            FOUR-COLUMN GRID LAYOUT
            Col 1: ~28-30% width (Logo, Newsletter, Socials)
            Cols 2-4: Evenly distributed navigation columns
            All headings align on the exact same top baseline
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-10 lg:gap-8">
          
          {/* COLUMN 1: BRAND, NEWSLETTER & SOCIALS (lg:col-span-4 / ~30% width) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            {/* Kiyoki White Vector Logo */}
            <div className="h-8 flex items-center">
              <KiyokiLogo variant="white" />
            </div>

            {/* Newsletter Supporting Copy */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-[13px] text-neutral-300 leading-relaxed max-w-[310px] font-normal">
              Subscribe to our Newsletter and get the latest updates, offers and air
              quality tips for a healthier you.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mt-4 sm:mt-5 w-full max-w-[280px]">
              <div className="flex flex-col gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (subscribeStatus === 'error') setSubscribeStatus('idle');
                  }}
                  placeholder="Email*"
                  className="w-full bg-white text-gray-950 placeholder-gray-400 text-xs sm:text-sm px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-sky-400 transition-all shadow-sm font-normal"
                  aria-label="Email address for newsletter"
                />

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-[#555555] hover:bg-[#666666] active:bg-[#444444] text-white text-xs sm:text-[13px] font-medium px-5 py-1.5 sm:py-2 rounded-md transition-colors cursor-pointer shadow-sm active:scale-95"
                  >
                    Submit
                  </button>

                  {subscribeStatus === 'success' && (
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {statusMessage}
                    </span>
                  )}
                  {subscribeStatus === 'error' && (
                    <span className="text-[11px] text-rose-400 font-medium">
                      {statusMessage}
                    </span>
                  )}
                </div>
              </div>
            </form>

            {/* Horizontal Row of 5 Circular Social Media Icons */}
            <div className="mt-6 sm:mt-7 flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kiyoki on Facebook"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kiyoki on Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kiyoki on YouTube"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kiyoki on LinkedIn"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* TikTok / Brand Icon */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kiyoki on TikTok"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: SHOP (lg:col-span-2 or 3) */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col items-start text-left">
            <h3 className="h-8 flex items-center text-sm sm:text-base font-semibold text-white tracking-normal">
              Shop
            </h3>
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
              {[
                { label: 'Air Purifiers', href: '#products' },
                { label: 'Filters', href: '#technology' },
                { label: 'Accessories', href: '#products' },
                { label: 'Compare Models', href: '#products' },
                { label: 'Refurbished Products', href: '#products' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href, link.label)}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: LEARN MORE (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h3 className="h-8 flex items-center text-sm sm:text-base font-semibold text-white tracking-normal">
              Learn More
            </h3>
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
              {[
                { label: 'Air Quality', href: '#technology' },
                { label: 'Technology', href: '#technology' },
                { label: 'About Us', href: '#brand' },
                { label: 'Sustainability', href: '#brand' },
                { label: 'Blog', href: '#brand' },
                { label: 'Breathe Better Club', href: '#brand' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href, link.label)}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h3 className="h-8 flex items-center text-sm sm:text-base font-semibold text-white tracking-normal">
              Support
            </h3>
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
              {[
                { label: 'Help Center', href: '#support' },
                { label: 'Warranty', href: '#support' },
                { label: 'Installation Guide', href: '#support' },
                { label: 'Contact Us', href: '#support' },
                { label: 'Privacy Policy', href: '#support' },
                { label: 'Terms of Service', href: '#support' },
                { label: 'Refund Policy', href: '#support' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href, link.label)}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT AREA
            Directly aligned beneath the navigation columns
            ========================================================= */}
        <div className="mt-10 sm:mt-12 flex justify-start sm:justify-end">
          <p className="text-xs sm:text-[13px] text-neutral-400 font-normal">
            © 2026, Kiyoki. All rights reserved.
          </p>
        </div>

      </div>

      {/* =========================================================
          TWO FLOATING CONTACT/SUPPORT BUTTONS (LOWER RIGHT)
          Stacked vertically as shown in reference image.
          Visually secondary, subtle borders, with quick interactive support.
          ========================================================= */}
      <aside aria-label="Support and feedback" className="fixed right-4 sm:right-6 bottom-5 sm:bottom-6 z-40 flex flex-col items-center gap-2">
        {/* Top small circular button: Feedback / Message */}
        <button
          type="button"
          onClick={() => setActiveSupportModal('Feedback')}
          aria-label="Send feedback"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1c1c1c] hover:bg-[#2a2a2a] active:bg-[#141414] border border-neutral-700/80 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 cursor-pointer group"
          title="Feedback"
        >
          <svg className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* Bottom circular button: Live Support / Chat */}
        <button
          type="button"
          onClick={() => setActiveSupportModal('Live Support')}
          aria-label="Contact Kiyoki live support"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#262626] hover:bg-[#333333] active:bg-[#1a1a1a] border border-neutral-600/90 text-white flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group relative"
          title="Live Chat Support"
        >
          {/* Active online green dot indicator */}
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-neutral-900" />
          
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            <circle cx="8" cy="10" r="1.2" />
            <circle cx="12" cy="10" r="1.2" />
            <circle cx="16" cy="10" r="1.2" />
          </svg>
        </button>
      </aside>

      {/* Interactive Modal Dialog for Support / Policies / Guides */}
      {activeSupportModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveSupportModal(null)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-semibold text-white">
                {activeSupportModal}
              </h3>
              <button
                type="button"
                onClick={() => setActiveSupportModal(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {activeSupportModal === 'Feedback' && (
                <p>We value your suggestions! How can we make your Kiyoki air purification experience even better? Reach our team directly at <span className="text-sky-400">support@kiyoki.com</span>.</p>
              )}
              {activeSupportModal === 'Live Support' && (
                <div className="space-y-3">
                  <p>Our air wellness specialists are available 24/7 to assist with room sizing, filter replacements, or technical assistance.</p>
                  <p className="text-xs text-neutral-400">Average response time: &lt; 2 minutes.</p>
                </div>
              )}
              {activeSupportModal === 'Help Center' && (
                <p>Welcome to the Kiyoki Help Center. Find answers to common questions about filter lifespans, sensor calibration, and WiFi app connectivity.</p>
              )}
              {activeSupportModal === 'Warranty' && (
                <p>Every Kiyoki air purifier includes an industry-leading 3-Year Limited Warranty with complimentary parts and filter defect protection.</p>
              )}
              {activeSupportModal === 'Installation Guide' && (
                <p>Quick Setup: Unbox purifier, remove plastic wrap from the 5-stage filter cylinder, insert into chamber, plug in, and press the power ring.</p>
              )}
              {activeSupportModal === 'Contact Us' && (
                <p>Customer Care: <span className="text-white font-medium">1-800-549-6541</span><br />Email: <span className="text-sky-400">support@kiyoki.com</span><br />Hours: Mon–Fri 9am–8pm EST</p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveSupportModal(null)}
                className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
