import { useState } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { Section02 } from './components/Section02';
import { ProductCarousel } from './components/ProductCarousel';
import { FiltrationSection } from './components/FiltrationSection';
import { GreenTeamSection } from './components/GreenTeamSection';
import { LifestyleBrandSection } from './components/LifestyleBrandSection';
import { SearchModal } from './components/SearchModal';
import { CartDrawer, CartItem } from './components/CartDrawer';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleShopClick = () => {
    setIsCartOpen(true);
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

  return (
    <div className="w-full bg-white text-gray-900 font-sans selection:bg-sky-brand selection:text-white flex flex-col overflow-x-hidden">
      {/* 01. HEADER / NAVIGATION (88px) */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/* 02. HERO BANNER (470px) Full-Width Image Carousel */}
      <main className="w-full">
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
      </main>

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
