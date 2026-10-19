import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Shield, LogOut, ChevronDown } from 'lucide-react';
import { KiyokiLogo } from './KiyokiLogo';
import { type AuthSession } from '../services/authService';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  cartCount?: number;
  currentPage?: 'home' | 'shop' | 'product' | 'admin' | 'account';
  onNavigate?: (page: 'home' | 'shop' | 'product' | 'admin' | 'account') => void;
  session?: AuthSession | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenSearch, 
  onOpenCart, 
  onOpenAuth,
  cartCount = 0,
  currentPage = 'home',
  onNavigate,
  session = null,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleAccountClick = () => {
    if (!session) {
      onOpenAuth();
    } else {
      setUserDropdownOpen((prev) => !prev);
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
        <div className="flex items-center gap-3 sm:gap-6 shrink-0 relative">
          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-gray-900 hover:text-sky-brand transition-colors duration-200 rounded-full hover:bg-gray-50 focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Account Icon / Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleAccountClick}
              className={`p-1.5 transition-colors duration-200 rounded-full focus:outline-none flex items-center gap-1.5 ${
                session
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 px-2'
                  : 'text-gray-900 hover:text-sky-brand hover:bg-gray-50'
              }`}
              aria-label="Account"
              title={session ? `Signed in as ${session.user.name}` : 'Sign in to your account'}
            >
              {session ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-sky-brand text-white text-[10px] font-bold flex items-center justify-center">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  {session.user.role === 'admin' && (
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </>
              ) : (
                <User className="w-5 h-5 stroke-[1.8]" />
              )}
            </button>

            {/* Authenticated User Dropdown Menu */}
            {session && userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in text-gray-800 text-sm">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 truncate">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    session.user.role === 'admin'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {session.user.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>

                <div className="py-1">
                  {session.user.role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate?.('admin');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-900 flex items-center gap-2 font-medium"
                    >
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span>Admin Portal</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate?.('account');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span>My Account</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout?.();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 text-xs font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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
                    : 'text-gray-800'
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Auth Button */}
            <div className="pt-2">
              {session ? (
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-gray-500">
                    Signed in as <span className="font-bold text-gray-900">{session.user.name}</span>
                  </div>
                  {session.user.role === 'admin' && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate?.('admin');
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg bg-amber-50 text-amber-900 text-sm font-semibold flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span>Admin Portal</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate?.('account');
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg bg-gray-50 text-gray-800 text-sm font-medium flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span>My Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout?.();
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#fbc658] text-gray-900 font-semibold text-sm shadow-sm flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
