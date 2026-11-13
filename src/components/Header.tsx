import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { KiyokiLogo } from './KiyokiLogo';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  currentPage?: 'home' | 'shop' | 'technology' | 'about';
  onNavigate?: (page: 'home' | 'shop' | 'technology' | 'about') => void;
  onContactClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage = 'home',
  onNavigate,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Primary navigation links: 'Home', 'Technology', 'About', 'Shop'
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Technology', href: '#technology' },
    { name: 'About', href: '#about' },
    { name: 'Shop', href: '#shop' },
  ];

  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    if (linkName === 'Home') {
      onNavigate?.('home');
    } else if (linkName === 'Shop') {
      onNavigate?.('shop');
    } else if (linkName === 'Technology') {
      onNavigate?.('technology');
    } else if (linkName === 'About') {
      onNavigate?.('about');
    } else {
      onNavigate?.('home');
    }
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactModalOpen(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  const isLinkActive = (linkName: string) => {
    if (currentPage === 'home' && linkName === 'Home') return true;
    if (currentPage === 'shop' && linkName === 'Shop') return true;
    if (currentPage === 'about' && linkName === 'About') return true;
    if (currentPage === 'technology' && linkName === 'Technology') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white transition-all duration-300">
      {/* 88px exact height container matching wireframe specifications */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-[88px] flex items-center justify-between">
        
        {/* Left: KIYOKI Logo */}
        <div className="flex items-center shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('home');
            }}
            className="flex items-center group transition-transform active:scale-95"
            aria-label="Kiyoki Home"
          >
            <KiyokiLogo variant="dark" height={26} />
          </a>
        </div>

        {/* Center: Primary Navigation Links (Technology, About, Shop) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.name)}
              className={`text-[14px] lg:text-[15px] font-medium transition-colors duration-200 tracking-normal ${
                isLinkActive(link.name)
                  ? 'text-sky-brand font-semibold'
                  : 'text-gray-800 hover:text-sky-brand'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Contact Us Button replacing Add to Cart & Search Icons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={handleContactClick}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 bg-[#050505] hover:bg-neutral-800 active:scale-95 text-white text-[13px] sm:text-[14px] font-medium tracking-wide rounded-full transition-all duration-200 shadow-sm cursor-pointer"
          >
            Contact Us
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-900 hover:text-sky-brand focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.name);
                }}
                className={`text-[15px] font-medium py-1.5 border-b border-gray-50 transition-colors ${
                  isLinkActive(link.name)
                    ? 'text-sky-brand font-semibold'
                    : 'text-gray-800'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleContactClick();
                }}
                className="w-full py-2.5 rounded-full bg-[#050505] text-white text-[14px] font-medium tracking-wide text-center cursor-pointer shadow-sm"
              >
                Contact Us
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Contact Us Interactive Modal */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="bg-white text-[#050505] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#050505] tracking-tight">
                  Contact Us
                </h3>
                <p className="text-[13px] text-neutral-500 mt-0.5">
                  We'd love to hear from you. Our pure air team is here to help.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close contact modal"
              >
                ✕
              </button>
            </div>

            {/* Quick Contact Info Strip */}
            <div className="grid grid-cols-2 gap-3 my-5 py-3 px-4 bg-neutral-50 rounded-2xl border border-neutral-100">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-600 block">
                  Customer Care
                </span>
                <span className="text-[13px] font-semibold text-neutral-900 block mt-0.5">
                  1-800-549-6541
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-600 block">
                  Email Support
                </span>
                <a
                  href="mailto:support@kiyoki.com"
                  className="text-[13px] font-semibold text-sky-600 hover:underline block mt-0.5"
                >
                  support@kiyoki.com
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            {formSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-[17px] font-bold text-neutral-900">
                  Message Sent
                </h4>
                <p className="text-[13px] text-neutral-500 max-w-xs mx-auto">
                  Thank you for reaching out! A Kiyoki pure air specialist will get back to you shortly.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setIsContactModalOpen(false);
                    }}
                    className="px-5 py-2 bg-neutral-900 text-white text-[13px] font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[12px] font-medium text-neutral-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-[13.5px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-neutral-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-[13.5px] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-neutral-700 block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we help you with pure living and air purification?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-[13.5px] focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-4 py-2 text-neutral-600 text-[13px] font-medium hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#050505] hover:bg-neutral-800 text-white text-[13px] font-medium rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
