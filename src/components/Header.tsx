import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { KiyokiLogo } from './KiyokiLogo';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount?: number;
  currentPage?: 'home' | 'shop';
  onNavigate?: (page: 'home' | 'shop') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenSearch, 
  onOpenCart, 
  cartCount = 0,
  currentPage = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Purifiers', href: '#products' },
    { name: 'Technology', href: '#technology' },
    { name: 'Air Quality', href: '#technology' },
    { name: 'Discover', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Shop', href: '#shop' },
  ];

  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    if (linkName === 'Shop') {
      onNavigate?.('shop');
    } else if (linkName === 'Purifiers') {
      if (currentPage === 'shop') {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate?.('home');
      }
    } else if (linkName === 'Technology') {
      if (currentPage === 'shop') {
        const el = document.getElementById('technology');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate?.('home');
      }
    } else {
      onNavigate?.('home');
    }
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

        {/* Center: Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.name)}
              className={`text-[14px] lg:text-[15px] font-medium transition-colors duration-200 tracking-normal ${
                currentPage === 'shop' && link.name === 'Shop'
                  ? 'text-sky-brand'
                  : 'text-gray-800 hover:text-sky-brand'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-gray-900 hover:text-sky-brand transition-colors duration-200 rounded-full hover:bg-gray-50 focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Account Icon */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-gray-900 hover:text-sky-brand transition-colors duration-200 rounded-full hover:bg-gray-50 focus:outline-none"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="p-1.5 text-gray-900 hover:text-sky-brand transition-colors duration-200 rounded-full hover:bg-gray-50 focus:outline-none relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-900 hover:text-sky-brand focus:outline-none"
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
                  currentPage === 'shop' && link.name === 'Shop'
                    ? 'text-sky-brand'
                    : 'text-gray-800 hover:text-sky-brand'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
