import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { Section02 } from './components/Section02';
import { ProductCarousel } from './components/ProductCarousel';
import { FiltrationSection } from './components/FiltrationSection';
import { GreenTeamSection } from './components/GreenTeamSection';
import { LifestyleBrandSection } from './components/LifestyleBrandSection';
import { AntiGravityBanner } from './components/AntiGravityBanner';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ShopPage } from './components/ShopPage';
import { AuthModal } from './components/AuthModal';
import { AdminPortal } from './components/AdminPortal';
import { UserDashboard } from './components/UserDashboard';
import { getCurrentSession, logout, type AuthSession, addAuditLog } from './services/authService';
import { type Product } from './shopData';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [session, setSession] = useState<AuthSession | null>(() => getCurrentSession());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Navigation pages: 'home' | 'shop' | 'admin' | 'account'
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'admin' | 'account'>(() => {
    const hash = window.location.hash;
    const currentSession = getCurrentSession();
    if (hash === '#shop') return 'shop';
    if (hash === '#admin') {
      return currentSession?.user.role === 'admin' ? 'admin' : 'home';
    }
    if (hash === '#account') {
      return currentSession ? 'account' : 'home';
    }
    return 'home';
  });

  // URL Hash Synchronizer with Role-Based Guards
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const currentSession = getCurrentSession();
      setSession(currentSession);

      if (hash === '#shop') {
        setCurrentPage('shop');
      } else if (hash === '#admin') {
        // Enforce Admin Role Guard
        if (currentSession && currentSession.user.role === 'admin') {
          setCurrentPage('admin');
        } else {
          // Block unauthorized direct URL access
          addAuditLog(
            'UNAUTHORIZED_ACCESS',
            currentSession ? currentSession.user.email : 'anonymous',
            'Attempted unauthorized direct URL navigation to #admin portal.'
          );
          setAuthInitialMode('login');
          setIsAuthOpen(true);
          setCurrentPage('home');
          window.location.hash = '';
        }
      } else if (hash === '#account') {
        if (currentSession) {
          setCurrentPage('account');
        } else {
          setAuthInitialMode('login');
          setIsAuthOpen(true);
          setCurrentPage('home');
          window.location.hash = '';
        }
      } else if (hash === '#login') {
        setAuthInitialMode('login');
        setIsAuthOpen(true);
        setCurrentPage('home');
      } else if (hash === '#register') {
        setAuthInitialMode('register');
        setIsAuthOpen(true);
        setCurrentPage('home');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'shop' | 'admin' | 'account') => {
    if (page === 'admin') {
      const currentSession = getCurrentSession();
      if (!currentSession || currentSession.user.role !== 'admin') {
        setAuthInitialMode('login');
        setIsAuthOpen(true);
        return;
      }
      setCurrentPage('admin');
      window.location.hash = '#admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'account') {
      const currentSession = getCurrentSession();
      if (!currentSession) {
        setAuthInitialMode('login');
        setIsAuthOpen(true);
        return;
      }
      setCurrentPage('account');
      window.location.hash = '#account';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'shop') {
      setCurrentPage('shop');
      window.location.hash = '#shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = (newSession: AuthSession) => {
    setSession(newSession);
    // Automatic Role-Based Redirection:
    // If admin enters credentials -> automatically open the Admin Panel!
    // If user enters credentials -> open the User Dashboard!
    if (newSession.user.role === 'admin') {
      setCurrentPage('admin');
      window.location.hash = '#admin';
    } else {
      setCurrentPage('account');
      window.location.hash = '#account';
    }
  };

  const handleLogout = () => {
    logout();
    setSession(null);
    handleNavigate('home');
  };

  const handleShopClick = () => {
    handleNavigate('shop');
  };

  const handleLearnMoreClick = () => {
    setIsSearchOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleAddProductToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id || item.name === product.model);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id || item.name === product.model
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.model,
          price: product.price,
          quantity: 1,
          image: `/images/${product.image}`,
        },
      ];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans selection:bg-sky-brand selection:text-white flex flex-col overflow-x-hidden min-h-screen">
      {/* 01. GLOBAL HEADER / NAVIGATION (88px) */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => {
          setAuthInitialMode('login');
          setIsAuthOpen(true);
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        session={session}
        onLogout={handleLogout}
      />

      {/* CONDITIONAL CONTENT: ADMIN PORTAL, USER DASHBOARD, SHOP PAGE OR HOME PAGE */}
      {currentPage === 'admin' ? (
        <main className="w-full">
          <AdminPortal
            session={session}
            onLogout={handleLogout}
            onNavigateHome={() => handleNavigate('home')}
          />
        </main>
      ) : currentPage === 'account' ? (
        <main className="w-full">
          <UserDashboard
            session={session}
            onLogout={handleLogout}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateShop={() => handleNavigate('shop')}
          />
        </main>
      ) : currentPage === 'shop' ? (
        <main className="w-full">
          <ShopPage onAddToCart={handleAddProductToCart} />
        </main>
      ) : (
        <main className="w-full">
          {/* 02. HERO BANNER Full-Width Image Carousel */}
          <HeroCarousel
            onShopClick={handleShopClick}
            onLearnMoreClick={handleLearnMoreClick}
          />

          {/* SECTION 02: Clean Air / For A Healthier You (Two-Column Layout with Video) */}
          <Section02
            onLearnMore={handleLearnMoreClick}
          />

          {/* SECTION 03: Horizontal Product-Card Carousel (Featured 67% + Secondary 33%) */}
          <ProductCarousel
            onShopClick={(productName) => {
              setCartItems((prev) => {
                const existing = prev.find((item) => item.name === productName);
                if (existing) {
                  return prev.map((item) =>
                    item.name === productName
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  );
                }
                return [
                  ...prev,
                  {
                    id: String(Date.now()),
                    name: productName,
                    price: 0,
                    quantity: 1,
                    image: '/images/card1_ref_clean.png',
                  },
                ];
              });
              setIsCartOpen(true);
            }}
            onLearnMoreClick={() => setIsSearchOpen(true)}
          />

          {/* SECTION 04: Advanced 5-Stage Filtration Technology */}
          <FiltrationSection
            onLearnMoreClick={handleLearnMoreClick}
          />

          {/* SECTION 05: Meet The Green Team (Interactive Expanding Product Showcase) */}
          <GreenTeamSection
            onShopNowClick={(productName) => {
              setCartItems((prev) => {
                const existing = prev.find((item) => item.name === productName);
                if (existing) {
                  return prev.map((item) =>
                    item.name === productName
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  );
                }
                return [
                  ...prev,
                  {
                    id: String(Date.now()),
                    name: `Kiyoki ${productName}`,
                    price: 0,
                    quantity: 1,
                    image: `/images/purifier_${productName.toLowerCase()}.png`,
                  },
                ];
              });
              setIsCartOpen(true);
            }}
          />

          {/* SECTION 06: Purify Your Space, Elevate Your Life (Lifestyle & Brand-Story Section) */}
          <LifestyleBrandSection
            onLearnMoreClick={handleLearnMoreClick}
          />

          {/* SECTION 07: Breathe Better With Kiyoki (Anti-Gravity Promotional Banner) */}
          <AntiGravityBanner
            onLearnMoreClick={handleLearnMoreClick}
          />
        </main>
      )}

      {/* GLOBAL FOOTER (Full-Width Solid Black Footer) */}
      {currentPage !== 'admin' && (
        <Footer
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => {
            setAuthInitialMode('login');
            setIsAuthOpen(true);
          }}
          onNavigate={handleNavigate}
        />
      )}

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Full-Feature Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authInitialMode}
      />
    </div>
  );
}

export default App;
