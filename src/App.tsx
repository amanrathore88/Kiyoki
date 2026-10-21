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
import { ProductDetailPage } from './components/ProductDetailPage';
import { TechnologyPage } from './components/TechnologyPage';
import { getCurrentSession, logout, type AuthSession, addAuditLog } from './services/authService';
import { PRODUCTS, type Product } from './shopData';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [session, setSession] = useState<AuthSession | null>(() => getCurrentSession());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#product')) {
      const parts = hash.split('/');
      if (parts[1]) {
        const found = PRODUCTS.find((p) => p.id === parts[1]);
        if (found) return found;
      }
    }
    return PRODUCTS[0];
  });

  // Navigation pages: 'home' | 'shop' | 'product' | 'admin' | 'account' | 'technology'
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'product' | 'admin' | 'account' | 'technology'>(() => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    const currentSession = getCurrentSession();
    if (hash.startsWith('#product')) return 'product';
    if (hash === '#shop' || pathname === '/shop') return 'shop';
    if (hash === '#technology' || pathname === '/technology') return 'technology';
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
      const pathname = window.location.pathname;
      const currentSession = getCurrentSession();
      setSession(currentSession);

      if (hash.startsWith('#product')) {
        const parts = hash.split('/');
        if (parts[1]) {
          const found = PRODUCTS.find((p) => p.id === parts[1]);
          if (found) setSelectedProduct(found);
        }
        setCurrentPage('product');
      } else if (hash === '#shop' || pathname === '/shop') {
        setCurrentPage('shop');
      } else if (hash === '#technology' || pathname === '/technology') {
        setCurrentPage('technology');
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
        const active = getCurrentSession();
        if (active) {
          setSession(active);
          setCurrentPage('account');
          setIsAuthOpen(false);
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

  const handleNavigate = (page: 'home' | 'shop' | 'product' | 'admin' | 'account' | 'technology') => {
    if (page === 'admin') {
      const currentSession = getCurrentSession();
      if (!currentSession || currentSession.user.role !== 'admin') {
        setAuthInitialMode('login');
        setIsAuthOpen(true);
        return;
      }
      setIsAuthOpen(false);
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
      setIsAuthOpen(false);
      setCurrentPage('account');
      window.location.hash = '#account';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'shop') {
      setCurrentPage('shop');
      window.location.hash = '#shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'technology') {
      setCurrentPage('technology');
      window.location.hash = '#technology';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'product') {
      setCurrentPage('product');
      window.location.hash = `#product/${selectedProduct.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.location.hash = `#product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (newSession: AuthSession) => {
    setSession(newSession);
    setIsAuthOpen(false);
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

  const handleAddProductToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCartItems((prev) => {
      const itemKey = selectedColor ? `${product.id}-${selectedColor}` : product.id;
      const itemName = `${product.model}${selectedColor ? ` (${selectedColor})` : ''}`;
      const existing = prev.find((item) => item.id === itemKey || item.name === itemName);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey || item.name === itemName
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          name: itemName,
          price: product.price,
          quantity: quantity,
          image: `/images/${product.image}`,
        },
      ];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans selection:bg-sky-brand selection:text-white flex flex-col min-h-screen">
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

      {/* CONDITIONAL CONTENT: ADMIN PORTAL, USER DASHBOARD, PRODUCT DETAIL PAGE, SHOP PAGE OR HOME PAGE */}
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
      ) : currentPage === 'product' && selectedProduct ? (
        <main className="w-full">
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddProductToCart}
            onNavigateShop={() => handleNavigate('shop')}
            onSelectProduct={handleOpenProduct}
          />
        </main>
      ) : currentPage === 'technology' ? (
        <main className="w-full">
          <TechnologyPage onNavigate={handleNavigate} />
        </main>
      ) : currentPage === 'shop' ? (
        <main className="w-full">
          <ShopPage
            onAddToCart={(p) => handleAddProductToCart(p, 1)}
            onProductOpen={handleOpenProduct}
          />
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
              const matched = PRODUCTS.find(
                (p) =>
                  p.model.toLowerCase() === productName.toLowerCase() ||
                  productName.toLowerCase().includes(p.id) ||
                  p.model.toLowerCase().includes(productName.toLowerCase())
              );
              if (matched) {
                handleOpenProduct(matched);
              } else {
                handleNavigate('shop');
              }
            }}
            onLearnMoreClick={() => handleNavigate('shop')}
          />

          {/* SECTION 04: Advanced 5-Stage Filtration Technology */}
          <FiltrationSection
            onLearnMoreClick={handleLearnMoreClick}
          />

          {/* SECTION 05: Meet The Green Team (Interactive Expanding Product Showcase) */}
          <GreenTeamSection
            onShopNowClick={(productName) => {
              const matched = PRODUCTS.find(
                (p) =>
                  p.model.toLowerCase() === productName.toLowerCase() ||
                  productName.toLowerCase().includes(p.id) ||
                  p.model.toLowerCase().includes(productName.toLowerCase())
              );
              if (matched) {
                handleOpenProduct(matched);
              } else {
                handleNavigate('shop');
              }
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
