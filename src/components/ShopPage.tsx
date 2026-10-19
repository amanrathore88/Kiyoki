import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { FEATURES, formatINR, PRODUCTS, type Product } from '../shopData';
import '../ShopPage.css';

type IconName =
  | 'search' | 'user' | 'cart' | 'menu' | 'close' | 'arrow' | 'leaf' | 'volume'
  | 'house' | 'filter' | 'wifi' | 'bed' | 'crown' | 'building' | 'wind'
  | 'minus' | 'plus' | 'trash' | 'check' | 'heart' | 'heartFilled' | 'chevronLeft' | 'chevronRight';

function Icon({ name, size = 22, strokeWidth = 1.65 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7.5"/><path d="m17 17 4 4"/></>,
    user: <><circle cx="12" cy="7.5" r="3.3"/><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2z"/></>,
    cart: <><path d="M3 4h2l2.5 12h11.8l2.2-9.5H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    close: <><path d="m5 5 14 14M19 5 5 19"/></>,
    arrow: <><path d="M3 12h18m-7-7 7 7-7 7"/></>,
    leaf: <><path d="M20 3C8 3 4 9 4 15a6 6 0 0 0 6 6c7 0 12-7 10-18Z"/><path d="M5 20c3-5 7-8 12-11"/></>,
    volume: <><path d="M4 9v6h4l6 5V4L8 9H4Z"/><path d="M17 8a6 6 0 0 1 0 8M20 5a10 10 0 0 1 0 14"/></>,
    house: <><path d="m2 11 10-9 10 9M5 10v12h14V10M10 22v-7h4v7"/></>,
    filter: <><rect x="5" y="2.5" width="14" height="19" rx="1"/><path d="M5 8h14M5 13h14M5 18h14"/></>,
    wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M9 17a4 4 0 0 1 6 0"/><circle cx="12" cy="21" r="1" fill="currentColor" stroke="none"/></>,
    bed: <><path d="M3 3v18M21 11v10M3 16h18M5 12V8h7v4M12 12V8h7v4"/></>,
    crown: <><path d="m2 7 5 4 5-7 5 7 5-4-2 12H4L2 7ZM4 21h16"/></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M14 7h2M9 11h2M14 11h2M10 21v-5h4v5"/></>,
    wind: <><path d="M3 8h12a3 3 0 1 0-3-3M2 12h18a2 2 0 1 1-2 2M4 16h9a3 3 0 1 1-3 3"/></>,
    minus: <path d="M5 12h14"/>,
    plus: <path d="M5 12h14M12 5v14"/>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v7M14 11v7"/></>,
    check: <path d="m4 12 5 5L20 6"/>,
    heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>,
    heartFilled: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="currentColor"/>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

interface ModernProductCardProps {
  product: Product;
  asset: (filename: string) => string;
  onOpen: (product: Product) => void;
}

function ModernProductCard({ product, asset, onOpen }: ModernProductCardProps) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Dynamic image cycling every 3.5 seconds, paused when hovered
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [images.length, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setActiveImageIndex(idx);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
  };

  return (
    <article
      className="ky-mod-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(product)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target === e.currentTarget) {
            e.preventDefault();
            onOpen(product);
          }
        }
      }}
      aria-label={`${product.model} air purifier`}
    >
      {/* 1. Media Stage with Inset Rounded Frame (Uncluttered, No Top Badge) */}
      <div className="ky-mod-card__media">
        {/* Floating Top-Right Wishlist Heart Button */}
        <button
          type="button"
          className={`ky-mod-card__heart ${isFavorited ? 'is-active' : ''}`}
          onClick={handleHeartClick}
          aria-label={isFavorited ? `Remove ${product.model} from wishlist` : `Add ${product.model} to wishlist`}
        >
          <Icon name={isFavorited ? 'heartFilled' : 'heart'} size={17} strokeWidth={1.9} />
        </button>

        {/* Dynamic Image Views (Smooth cross-fade opacity transition) */}
        <div className="ky-mod-card__img-track">
          {images.map((img, idx) => {
            const isLifestyle =
              img.includes('room') ||
              img.includes('bedroom') ||
              img.includes('living') ||
              img.includes('gym') ||
              img.includes('lifestyle');

            return (
              <img
                key={img}
                src={asset(img)}
                alt={`${product.model} view ${idx + 1}`}
                className={`ky-mod-card__img ${isLifestyle ? 'ky-mod-card__img--cover' : 'ky-mod-card__img--contain'} ${
                  idx === activeImageIndex ? 'is-active' : ''
                }`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            );
          })}
        </div>

        {/* Chevrons on Hover for Manual View Navigation */}
        {images.length > 1 && (
          <div className="ky-mod-card__nav" aria-hidden={!isHovered}>
            <button
              type="button"
              className="ky-mod-card__nav-btn ky-mod-card__nav-btn--prev"
              onClick={handlePrev}
              aria-label="Previous view"
            >
              <Icon name="chevronLeft" size={16} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              className="ky-mod-card__nav-btn ky-mod-card__nav-btn--next"
              onClick={handleNext}
              aria-label="Next view"
            >
              <Icon name="chevronRight" size={16} strokeWidth={2.4} />
            </button>
          </div>
        )}

        {/* View Dots Indicator */}
        {images.length > 1 && (
          <div className="ky-mod-card__dots" role="tablist" aria-label="Views">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`ky-mod-card__dot ${idx === activeImageIndex ? 'is-active' : ''}`}
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Show view ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Card Body Content (Clean, Organized, Minimalist) */}
      <div className="ky-mod-card__body">
        {/* Model Title: Clean and Prominent */}
        <div className="ky-mod-card__header">
          <h3 className="ky-mod-card__title">{product.model}</h3>
        </div>

        {/* Clean Subtitle */}
        <p className="ky-mod-card__subtitle">{product.cardSubtitle || product.subtitle}</p>

        {/* Key Product Details / Highlights (Airy, Unboxed, Distinct) */}
        <div className="ky-mod-card__specs">
          {product.highlights.map((highlight, index) => {
            const specIcon: IconName =
              index === 0
                ? 'wind'
                : index === 1
                ? product.id === 'x3'
                  ? 'volume'
                  : product.id === 'x5'
                  ? 'wifi'
                  : 'wind'
                : 'filter';

            return (
              <div key={highlight} className="ky-mod-card__spec-item">
                <span className="ky-mod-card__spec-icon">
                  <Icon name={specIcon} size={15} strokeWidth={2} />
                </span>
                <span className="ky-mod-card__spec-text">{highlight}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Row: Pricing & Buy Pill Button */}
        <div className="ky-mod-card__footer">
          <div className="ky-mod-card__pricing">
            <span className="ky-mod-card__price-label">Starting at</span>
            <strong className="ky-mod-card__price-val">{formatINR(product.price)}</strong>
          </div>
          <button
            type="button"
            className="ky-mod-card__btn-pill"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(product);
            }}
          >
            <span>Buy</span>
            <Icon name="arrow" size={15} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </article>
  );
}

export interface ShopPageProps {
  /** Defaults to /images. */
  assetBaseUrl?: string;
  /** Callback when user adds a product to cart */
  onAddToCart?: (product: Product) => void;
  /** When provided, open existing product details or custom modal */
  onProductOpen?: (product: Product) => void;
}

export function ShopPage({
  assetBaseUrl = '/images',
  onAddToCart,
  onProductOpen,
}: ShopPageProps) {
  const asset = (filename: string) => `${assetBaseUrl.replace(/\/$/, '')}/${filename}`;
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!activeProduct) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProduct(null);
      }
    };
    document.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', esc);
    };
  }, [activeProduct]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const showProduct = (product: Product) => {
    if (onProductOpen) {
      onProductOpen(product);
    } else {
      setActiveProduct(product);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setActiveProduct(null);
    setToast(`${product.model} added to cart`);
  };

  return (
    <div className="ky-shop" id="top">
      {/* 1. HERO SECTION */}
      <section className="ky-hero" aria-labelledby="ky-hero-title">
        <div className="ky-hero__photo">
          <img
            src={asset('hero-room.webp')}
            alt="Kiyoki purifier in a calm, sunlit living room"
            fetchPriority="high"
          />
        </div>
        <div className="ky-container ky-hero__inner">
          <div className="ky-hero__content">
            <p className="ky-eyebrow">KIYOKI AIR PURIFIERS</p>
            <h1 id="ky-hero-title">
              Choose Your<br />Perfect Air Purifier
            </h1>
            <p className="ky-hero__subtitle">Cleaner air for every space. Designed for modern living.</p>
            <button
              type="button"
              className="ky-btn ky-btn--primary ky-hero__cta"
              onClick={() => scrollTo('products')}
            >
              Explore Our Purifiers <Icon name="arrow" size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. SLIM SPECS STRIP */}
      <section className="ky-specs" aria-label="Kiyoki air purifier highlights">
        <div className="ky-container ky-specs__inner">
          <div className="ky-spec">
            <Icon name="leaf" size={32} />
            <div>
              <strong>99.97%</strong>
              <span>Filtration Efficiency</span>
              <small>Captures 0.3 micron particles*</small>
            </div>
          </div>
          <div className="ky-spec">
            <Icon name="volume" size={32} />
            <div>
              <strong>Ultra Quiet</strong>
              <span>Thoughtfully designed</span>
              <small>For undisturbed rest*</small>
            </div>
          </div>
          <div className="ky-spec">
            <Icon name="house" size={32} />
            <div>
              <strong>Wide Coverage</strong>
              <span>Options for every room</span>
              <small>From compact to spacious</small>
            </div>
          </div>
          <div className="ky-spec">
            <Icon name="filter" size={32} />
            <div>
              <strong>True HEPA Filter</strong>
              <span>Advanced particle capture</span>
              <small>For fresher indoor air*</small>
            </div>
          </div>
          <div className="ky-spec">
            <Icon name="wifi" size={32} />
            <div>
              <strong>Smart Control</strong>
              <span>Convenient air care*</span>
              <small>Designed for daily living</small>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CARDS SECTION */}
      <section className="ky-products ky-section ky-container" id="products" aria-labelledby="ky-products-title">
        <div className="ky-heading">
          <p className="ky-eyebrow">OUR AIR PURIFIERS</p>
          <h2 id="ky-products-title">A Cleaner Home for a Healthier You</h2>
          <p>Three powerful purifiers. Designed for different spaces and lifestyles.</p>
        </div>
        <div className="ky-product-grid">
          {PRODUCTS.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              asset={asset}
              onOpen={showProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL SHOWCASE SECTION — Full width touching left and right borders */}
      <section className="ky-technology" id="technology" aria-labelledby="ky-tech-title">
        <div className="ky-technology__hero">
          <div className="ky-technology__hero-inner">
            <div className="ky-technology__copy">
              <p className="ky-eyebrow">ADVANCED AIR PURIFICATION</p>
              <h2 id="ky-tech-title">
                POWERFUL CLEAN AIR.<br />SMARTER LIVING.
              </h2>
              <p>
                Meet the clean-air technology behind KIYOKI. Designed to help your family breathe more comfortably, every day.
              </p>
              <button
                type="button"
                className="ky-btn ky-btn--outline"
                onClick={() => scrollTo('features')}
              >
                Learn More <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="ky-technology__product">
              <img
                src={asset('technology-purifier.webp')}
                alt="Kiyoki purifier with technical airflow illustration"
                loading="lazy"
              />
            </div>
            <div className="ky-technology__stat">
              <strong>99.97%</strong>
              <span>
                PURER AIR<br />HEALTHIER LIVING
              </span>
            </div>
          </div>
        </div>

        {/* FOUR LARGE FULL-WIDTH FEATURE CARDS MATCHING REFERENCE */}
        <div className="ky-feature-grid" id="features">
          {FEATURES.map((feature) => (
            <article className="ky-feature" key={feature.title}>
              <div className="ky-feature__image">
                <img src={asset(feature.image)} alt={feature.title} loading="lazy" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
        <div className="ky-claims-note-wrapper">
          <p className="ky-claims-note">
            *Illustrative feature copy from the design mockup. Verify model-specific specifications before publishing.
          </p>
        </div>
      </section>

      {/* 5. ROOM SELECTION GUIDE — High-end luxury architectural cards */}
      <section className="ky-guide" id="choose" aria-labelledby="ky-guide-title">
        <div className="ky-guide__container">
          <div className="ky-guide__header">
            <p className="ky-eyebrow">FIND YOUR PERFECT FIT</p>
            <h2 id="ky-guide-title">How to Choose the Right Purifier</h2>
            <p>Select your room size below to find the ideal Kiyoki air purifier engineered for your space.</p>
          </div>

          <div className="ky-guide__grid">
            {[
              {
                id: 'small',
                title: 'Small Rooms',
                eyebrow: 'BEDROOMS & STUDY',
                coverage: 'Up to 250 sq. ft.',
                spaces: 'Bedrooms, nurseries & home offices',
                description: 'Compact, ultra-quiet continuous filtration designed to maintain pristine air without disturbing sleep or concentration.',
                specs: ['18 dB Silent Mode', 'True HEPA H13', 'Night Light Mode'],
                roomImage: 'room-small.webp',
                purifierThumb: 'product-x3.webp',
                product: PRODUCTS[0],
                isPopular: false,
              },
              {
                id: 'medium',
                title: 'Medium Rooms',
                eyebrow: 'LIVING & FAMILY SPACES',
                coverage: 'Up to 450 sq. ft.',
                spaces: 'Living rooms, master suites & dining areas',
                description: 'The everyday family workhorse with continuous smart sensing that automatically dials in fresh, purified air.',
                specs: ['Smart AQI Display', 'Auto Fan Sensor', 'Dual Air Intake'],
                roomImage: 'room-medium.webp',
                purifierThumb: 'product-x5.webp',
                product: PRODUCTS[1],
                isPopular: true,
              },
              {
                id: 'large',
                title: 'Large Spaces',
                eyebrow: 'OPEN-PLAN & EXPANSIVE',
                coverage: 'Up to 800 sq. ft.',
                spaces: 'Open-concept living, halls & studio spaces',
                description: 'High-velocity 360° airflow engine engineered to circulate clean air rapidly across large floorplans and high ceilings.',
                specs: ['Turbo CADR Engine', '360° Multi-Stage', 'Heavy Duty Filter'],
                roomImage: 'room-large.webp',
                purifierThumb: 'product-x8.webp',
                product: PRODUCTS[2],
                isPopular: false,
              },
            ].map((item) => (
              <article
                key={item.id}
                className="ky-room-card group"
                onClick={() => showProduct(item.product)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showProduct(item.product);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.product.model} for ${item.title}`}
              >
                {/* Top Visual Showcase */}
                <div className="ky-room-card__media">
                  <img
                    src={asset(item.roomImage)}
                    alt={item.title}
                    className="ky-room-card__img"
                    loading="lazy"
                  />
                  <div className="ky-room-card__scrim" />

                  {/* Floating Badges */}
                  <div className="ky-room-card__badges">
                    <span className="ky-room-card__badge-room">{item.coverage}</span>
                    {item.isPopular && (
                      <span className="ky-room-card__badge-popular">Most Popular</span>
                    )}
                  </div>

                  {/* Floating Recommended Model Preview */}
                  <div className="ky-room-card__product-chip">
                    <img src={asset(item.purifierThumb)} alt={item.product.model} />
                    <div>
                      <small>Recommended</small>
                      <strong>{item.product.model}</strong>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="ky-room-card__body">
                  <span className="ky-room-card__eyebrow">{item.eyebrow}</span>
                  <h3 className="ky-room-card__title">{item.title}</h3>
                  <p className="ky-room-card__spaces">{item.spaces}</p>
                  <p className="ky-room-card__desc">{item.description}</p>

                  {/* Key Spec Pills */}
                  <div className="ky-room-card__specs">
                    {item.specs.map((spec) => (
                      <span key={spec}>{spec}</span>
                    ))}
                  </div>

                  {/* Footer Action & Pricing */}
                  <div className="ky-room-card__footer">
                    <div className="ky-room-card__price">
                      <span>Starting at</span>
                      <strong>{formatINR(item.product.price)}</strong>
                    </div>
                    <span className="ky-room-card__btn">
                      <span>Discover {item.product.model}</span>
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {activeProduct && (
        <div
          className="ky-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProduct(null);
          }}
        >
          <section
            className="ky-quickview"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ky-quickview-title"
          >
            <button
              type="button"
              className="ky-icon-button ky-quickview__close"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product details"
            >
              <Icon name="close" />
            </button>
            <div className="ky-quickview__image">
              <img
                src={asset(activeProduct.image)}
                alt={`${activeProduct.model} air purifier`}
              />
            </div>
            <div className="ky-quickview__copy">
              <p className="ky-eyebrow">{activeProduct.badge}</p>
              <h2 id="ky-quickview-title">{activeProduct.model}</h2>
              <p>{activeProduct.description}</p>
              <strong className="ky-quickview__price">{formatINR(activeProduct.price)}</strong>
              <div className="ky-quickview__features">
                {activeProduct.highlights.map((feature) => (
                  <div key={feature}>
                    <Icon name="check" size={17} />
                    {feature}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="ky-btn ky-btn--primary"
                onClick={() => handleAddToCart(activeProduct)}
              >
                <Icon name="cart" size={19} /> Add to Cart
              </button>
              <small>Shipping, taxes and availability are calculated by your connected checkout.</small>
            </div>
          </section>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="ky-toast" role="status">
          <Icon name="check" size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

export default ShopPage;
