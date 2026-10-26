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
import { TechnologyPage } from './components/TechnologyPage';
import { type Product } from './shopData';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Active website navigation pages: 'home' | 'shop' | 'technology'
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'technology'>(() => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    if (hash === '#shop' || pathname === '/shop') return 'shop';
    if (hash === '#technology' || pathname === '/technology') return 'technology';
    return 'home';
  });

  // URL Hash Synchronizer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      if (hash === '#shop' || pathname === '/shop') {
        setCurrentPage('shop');
      } else if (hash === '#technology' || pathname === '/technology') {
        setCurrentPage('technology');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'shop' | 'technology') => {
    if (page === 'shop') {
      setCurrentPage('shop');
      window.location.hash = '#shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'technology') {
      setCurrentPage('technology');
      window.location.hash = '#technology';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* CONDITIONAL MAIN CONTENT: TECHNOLOGY PAGE, SHOP PAGE OR HOME PAGE */}
      {currentPage === 'technology' ? (
        <main className="w-full">
          <TechnologyPage onNavigate={handleNavigate} />
        </main>
      ) : currentPage === 'shop' ? (
        <main className="w-full">
          <ShopPage
            onAddToCart={(p) => handleAddProductToCart(p, 1)}
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

          {/* SECTION 03: Horizontal Product-Card Carousel */}
          <ProductCarousel
            onShopClick={() => handleNavigate('shop')}
            onLearnMoreClick={() => handleNavigate('shop')}
          />

          {/* SECTION 04: Advanced 5-Stage Filtration Technology */}
          <FiltrationSection
            onLearnMoreClick={handleLearnMoreClick}
          />

          {/* SECTION 05: Meet The Green Team (Interactive Expanding Product Showcase) */}
          <GreenTeamSection
            onShopNowClick={() => handleNavigate('shop')}
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
      <Footer
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />

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
    </div>
  );
}

export default App;
