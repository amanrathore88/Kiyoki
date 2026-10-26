import { useState, useEffect } from 'react';
import {
  type Product,
  PRODUCTS,
  EXPERT_RECOMMENDATIONS,
  formatINR,
  type CustomerReview,
} from '../shopData';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  onNavigateShop: () => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductDetailPage({
  product,
  onAddToCart,
  onNavigateShop,
  onSelectProduct,
}: ProductDetailPageProps) {
  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Sky Blue');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'deep-dive' | 'faqs' | 'reviews'>('overview');
  const [deepDiveSubTab, setDeepDiveSubTab] = useState<'product' | 'specs' | 'reports'>('product');

  // Sticky bottom bar trigger state
  const [showStickyBottomBar, setShowStickyBottomBar] = useState(false);

  // Accordion open states for Deep Dive
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    about: true,
    howItWorks: false,
    whoShouldUse: false,
    additionalDetails: false,
  });

  // Modal states
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackName, setCallbackName] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Reviews state with live upvoting
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(product.reviews);
  const [votedReviews, setVotedReviews] = useState<Record<string, number>>({});
  const [addedToast, setAddedToast] = useState(false);

  // Reset states when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0]?.name || 'Sky Blue');
    setQuantity(1);
    setReviewsList(product.reviews);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Track scroll position to reveal bottom sticky bar when scrolling past the main buy box
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setShowStickyBottomBar(true);
      } else {
        setShowStickyBottomBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (sectionKey: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handlePrevImage = () => {
    const total = product.galleryThumbnails.length;
    setActiveImageIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNextImage = () => {
    const total = product.galleryThumbnails.length;
    setActiveImageIndex((prev) => (prev + 1) % total);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleVoteHelpful = (reviewId: string) => {
    if (votedReviews[reviewId]) return;
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    setVotedReviews((prev) => ({ ...prev, [reviewId]: 1 }));
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setIsCallbackModalOpen(false);
      setCallbackSubmitted(false);
      setCallbackPhone('');
      setCallbackName('');
    }, 2200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      initials: reviewName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      rating: reviewRating,
      date: 'Just now',
      verified: true,
      location: 'India',
      comment: reviewComment,
      helpfulCount: 0,
    };
    setReviewsList((prev) => [newRev, ...prev]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
    }, 2000);
  };

  const scrollToSection = (id: string, tab: 'overview' | 'deep-dive' | 'faqs' | 'reviews') => {
    setActiveTab(tab);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen font-sans selection:bg-sky-100 selection:text-slate-900">
      {/* 1. TOP BREADCRUMB & STICKY SUB-NAVIGATION */}
      <nav aria-label="Breadcrumb and page tabs" className="ky-product-subnav-sticky bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb & Back to Shop */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <button
              onClick={onNavigateShop}
              className="inline-flex items-center gap-1.5 font-medium hover:text-slate-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Shop</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">{product.model}</span>
          </div>

          {/* Model Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium hidden sm:inline">
              Model:
            </span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                    p.id === product.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.model}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Section Tabs */}
          <div className="flex items-center gap-6 text-sm font-semibold tracking-wide">
            <button
              onClick={() => scrollToSection('overview-section', 'overview')}
              className={`pb-1 transition-all border-b-2 ${
                activeTab === 'overview'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('deep-dive-section', 'deep-dive')}
              className={`pb-1 transition-all border-b-2 ${
                activeTab === 'deep-dive'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Deep Dive
            </button>
            <button
              onClick={() => {
                scrollToSection('deep-dive-section', 'faqs');
                setDeepDiveSubTab('product');
                setOpenAccordions((prev) => ({ ...prev, about: true, howItWorks: true, whoShouldUse: true }));
              }}
              className={`pb-1 transition-all border-b-2 ${
                activeTab === 'faqs'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection('reviews-section', 'reviews')}
              className={`pb-1 transition-all border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN TWO-COLUMN CONTAINER: STICKY GALLERY (LEFT) + CONTINUOUS SCROLLING DETAILS (RIGHT) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative">
          
          {/* LEFT COLUMN: Outer container stretches the full height of the entire right column */}
          <div className="lg:col-span-6 relative">
            {/* STICKY GALLERY INNER WRAPPER: Stays fixed/pinned in viewport as user scrolls through the right column */}
            <div className="ky-product-gallery-sticky lg:sticky lg:top-[144px] z-20 flex flex-col-reverse sm:flex-row gap-4">
              {/* Vertical Thumbnail Strip */}
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[500px] pb-2 sm:pb-0 scrollbar-none">
                {product.galleryThumbnails.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all p-1.5 bg-white ${
                      idx === activeImageIndex
                        ? 'border-slate-900 shadow-md scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                    }`}
                    aria-label={`View ${item.label}`}
                  >
                    <img
                      src={`/images/${item.src}`}
                      alt={item.alt}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Large Main Stage Image View */}
              <div className="relative flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex items-center justify-center min-h-[400px] sm:h-[500px] max-h-[calc(100vh-175px)] group overflow-hidden">
                {/* 30-Day Money-Back Guarantee Seal at Top Right */}
                <div className="absolute top-5 right-5 z-10 pointer-events-none">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-slate-900 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm p-1.5 text-center shadow-sm">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 leading-none">
                      MONEY BACK
                    </span>
                    <span className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                      30
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 leading-none">
                      DAYS
                    </span>
                  </div>
                </div>

                {/* Prev Image Arrow */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md flex items-center justify-center border border-slate-200 transition-all opacity-80 group-hover:opacity-100 hover:scale-105"
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Main Photo Display */}
                <img
                  src={`/images/${product.galleryThumbnails[activeImageIndex]?.src || product.image}`}
                  alt={product.galleryThumbnails[activeImageIndex]?.alt || product.model}
                  className="max-h-[460px] w-auto max-w-full object-contain transition-all duration-300 transform group-hover:scale-[1.02]"
                />

                {/* Next Image Arrow */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md flex items-center justify-center border border-slate-200 transition-all opacity-80 group-hover:opacity-100 hover:scale-105"
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Bottom Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {product.galleryThumbnails.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLING DETAILS (BUY BOX, DEEP DIVE, INCLUDED IN BOX, EXPERT RECOMMENDATIONS) */}
          <div id="overview-section" className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#5cb85c] text-white shadow-sm">
                {product.categoryBadge}
              </span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
                {product.fullTitle}
              </h1>
              <p className="mt-2 text-base text-slate-600 font-medium leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Star Rating Line */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900">{product.rating}</span>
              <button
                onClick={() => scrollToSection('reviews-section', 'reviews')}
                className="text-xs text-slate-500 hover:text-slate-900 underline ml-1"
              >
                ({product.reviewCount} verified reviews)
              </button>
            </div>

            {/* Pricing Section */}
            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatINR(product.price)}
              </span>
              <span className="text-lg text-slate-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#e53935] text-white">
                {product.discount}
              </span>
              <span className="text-xs text-slate-500 font-medium ml-1">
                (Incl. of all taxes)
              </span>
            </div>

            {/* Highlight Banner: 90% Reduction Banner (Dark Navy/Slate with glowing gold) */}
            <div className="bg-[#111927] text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#1e293b]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center flex-shrink-0 text-[#f59e0b]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold leading-snug">
                    <span className="text-[#f59e0b] font-bold">90% Reduction</span> of airborne pollutants in your Breathing Space
                  </p>
                  <p
                    className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
                    onClick={() => {
                      scrollToSection('deep-dive-section', 'deep-dive');
                      setDeepDiveSubTab('reports');
                    }}
                  >
                    <span>Tested At National Testing Facility (IIT Kanpur)</span>
                    <span>&rarr;</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Feature Icon Capsules in a soft card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {/* 1. PM2.5 / PM10 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Fights Against<br />PM2.5, PM10
                  </span>
                </div>

                {/* 2. Allergy & Asthma */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#ef4444] flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Allergy and<br />Asthma Relief
                  </span>
                </div>

                {/* 3. Virus & Bacteria Shield */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Shields Virus<br />and Bacteria
                  </span>
                </div>

                {/* 4. Odour Neutralization */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#faf5ff] text-[#a855f7] flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Odour<br />Neutralization
                  </span>
                </div>
              </div>
            </div>

            {/* Health Alert Callout Box (Soft Red/Rose Tint Card) */}
            <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-2xl p-4 text-[#881337]">
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                <span className="font-bold underline decoration-[#f43f5e]">The air pollution in Indian cities is equivalent to smoking 10–50 cigarettes daily.</span>
              </p>
              <p className="text-xs text-[#9f1239] mt-1 leading-normal">
                Our Kiyoki continuous air system ensures your breathing space is protected wherever you go, anytime, anywhere.
              </p>
            </div>

            {/* Color Swatch Selector */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">
                  Color: <span className="font-normal text-slate-600">{selectedColor}</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">In Stock &bull; Ships in 24h</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-9 h-9 rounded-full border-2 transition-all shadow-sm ${
                      selectedColor === c.name
                        ? 'border-slate-900 ring-2 ring-offset-2 ring-slate-900 scale-110'
                        : 'border-slate-200 hover:scale-105'
                    }`}
                    aria-label={`Select ${c.name}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Main Add-To-Cart CTA */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-1">
              {/* Stepper */}
              <div className="inline-flex items-center justify-between border-2 border-slate-900 rounded-full px-4 py-2 bg-white w-full sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-lg font-bold text-slate-900 hover:text-slate-600 px-2"
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="font-bold text-base text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-lg font-bold text-slate-900 hover:text-slate-600 px-2"
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>

              {/* Add To Cart Primary Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Add To Cart</span>
              </button>
            </div>

            {/* Guarantee Tag Under Add to Cart */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 pt-0.5">
              <span className="inline-block border border-slate-400 rounded px-1.5 py-0.5 text-[10px] font-black uppercase">
                30 DAYS
              </span>
              <span>Get Easy 30 Days Money-Back Guarantee</span>
            </div>

            {/* Secondary CTA: Request a Callback */}
            <button
              type="button"
              onClick={() => setIsCallbackModalOpen(true)}
              className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Need help? Request a Callback</span>
            </button>

            {/* EMI Options Box (Warm Gold Tint) */}
            <div className="bg-[#fef3c7] border border-[#fde68a] rounded-2xl p-4 flex items-center justify-between gap-3 text-[#92400e]">
              <div>
                <p className="text-sm font-bold">
                  Pay {formatINR(Math.round(product.price / 4))} Now
                </p>
                <p className="text-xs text-[#b45309]">+3 EMI (No Interest &bull; All major credit cards)</p>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-slate-900 text-white hover:bg-black text-xs font-bold px-4 py-2 rounded-full transition-colors"
              >
                Buy on EMI
              </button>
            </div>

            {/* 4 Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-center">
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                <svg className="w-5 h-5 text-[#2e7d32] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">7-Days Free Exchange</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                <svg className="w-5 h-5 text-[#2e7d32] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Free Doorstep Delivery</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                <svg className="w-5 h-5 text-[#2e7d32] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">24/7 Support</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                <svg className="w-5 h-5 text-[#2e7d32] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Cash on Delivery</span>
              </div>
            </div>

            {/* Laboratory Test Verification Card */}
            <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-5 text-[#0369a1]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center flex-shrink-0 font-black text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0c4a6e]">{product.testReport.title}</h4>
                  <p className="text-xs font-semibold text-[#0369a1]">{product.testReport.lab}</p>
                  <p className="text-xs text-[#075985] mt-2 leading-relaxed">
                    {product.testReport.description}
                  </p>
                  <p className="text-xs text-[#075985] mt-1 italic">
                    {product.testReport.methodology}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. DEEP DIVE SECTION (POSITIONED RIGHT HERE ALONGSIDE THE PRODUCT IMAGE AS IN REFERENCE!) */}
            <div id="deep-dive-section" className="pt-8 border-t border-slate-200">
              {/* Sub-Tabs: Product | Technical Specs | Test Reports */}
              <div className="flex items-center border-b border-slate-200 mb-6">
                <button
                  onClick={() => setDeepDiveSubTab('product')}
                  className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 transition-all ${
                    deepDiveSubTab === 'product'
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Product
                </button>
                <button
                  onClick={() => setDeepDiveSubTab('specs')}
                  className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 transition-all ${
                    deepDiveSubTab === 'specs'
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setDeepDiveSubTab('reports')}
                  className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 transition-all ${
                    deepDiveSubTab === 'reports'
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Test Reports
                </button>
              </div>

              {/* TAB 1: PRODUCT ACCORDIONS (MATCHING USER REFERENCE SCREENSHOT) */}
              {deepDiveSubTab === 'product' && (
                <div className="divide-y divide-slate-200 border-t border-slate-200">
                  {/* Accordion 1: About the Product */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('about')}
                      className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      <span>About the Product</span>
                      <span className="text-xl font-bold text-slate-400">
                        {openAccordions['about'] ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordions['about'] && (
                      <div className="pt-3 text-slate-600 text-sm leading-relaxed space-y-3">
                        <p className="font-medium text-slate-900">
                          {product.deepDive.about.intro}
                        </p>
                        <div className="space-y-2 pt-1">
                          {product.deepDive.about.points.map((pt, i) => (
                            <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <h5 className="font-bold text-slate-900 text-xs mb-1">{pt.title}</h5>
                              <p className="text-xs text-slate-600 leading-relaxed">{pt.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: How does it work? */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('howItWorks')}
                      className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      <span>How does it work?</span>
                      <span className="text-xl font-bold text-slate-400">
                        {openAccordions['howItWorks'] ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordions['howItWorks'] && (
                      <div className="pt-3 text-slate-600 text-sm leading-relaxed space-y-3">
                        <p className="font-medium text-slate-900">
                          {product.deepDive.howItWorks.title}
                        </p>
                        <div className="space-y-2 pt-1">
                          {product.deepDive.howItWorks.steps.map((st) => (
                            <div key={st.step} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex gap-3 items-start">
                              <span className="text-sm font-black text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {st.step}
                              </span>
                              <div>
                                <h5 className="font-bold text-slate-900 text-xs mb-0.5">{st.title}</h5>
                                <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 3: Who should not use / How to use? */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('whoShouldUse')}
                      className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      <span>How to use & Safety Guidelines</span>
                      <span className="text-xl font-bold text-slate-400">
                        {openAccordions['whoShouldUse'] ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordions['whoShouldUse'] && (
                      <div className="pt-3 text-slate-600 text-sm leading-relaxed space-y-3">
                        <p className="font-medium text-slate-900">
                          {product.deepDive.howToUse.title}
                        </p>
                        <div className="space-y-2 pt-1">
                          {product.deepDive.howToUse.steps.map((st) => (
                            <div key={st.step} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex gap-3 items-start">
                              <span className="text-sm font-black text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {st.step}
                              </span>
                              <div>
                                <h5 className="font-bold text-slate-900 text-xs mb-0.5">{st.title}</h5>
                                <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 4: Additional Details */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion('additionalDetails')}
                      className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      <span>Additional Details</span>
                      <span className="text-xl font-bold text-slate-400">
                        {openAccordions['additionalDetails'] ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordions['additionalDetails'] && (
                      <div className="pt-3 text-slate-600 text-xs leading-relaxed space-y-2">
                        <p>&bull; <strong>Maintenance:</strong> Clean pre-filter every 30 days. Replace True HEPA H13 cartridge annually.</p>
                        <p>&bull; <strong>Certification:</strong> Tested in compliance with ISO 29463 and NABL certified environmental chambers.</p>
                        <p>&bull; <strong>Warranty:</strong> 2-year on-site replacement warranty covers motor, fan turbine, and sensor array.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: TECHNICAL SPECS TABLE */}
              {deepDiveSubTab === 'specs' && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden p-5">
                  <h4 className="text-base font-bold text-slate-900 mb-3">
                    Technical Specifications: {product.model}
                  </h4>
                  <div className="divide-y divide-slate-200">
                    {product.specs.map((sp, idx) => (
                      <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <span className="font-semibold text-slate-600">{sp.label}</span>
                        <span className="font-bold text-slate-900 sm:text-right">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TEST REPORTS */}
              {deepDiveSubTab === 'reports' && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2e7d32] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full">
                      NABL Certified
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-2">
                      {product.testReport.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{product.testReport.lab}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {product.testReport.metrics.map((m, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <p className="text-xl font-black text-slate-900">{m.value}</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1.5">
                    <p className="font-bold text-slate-900">Laboratory Methodology:</p>
                    <p>{product.testReport.description}</p>
                    <p className="italic text-slate-500">{product.testReport.methodology}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 4. INCLUDED IN THE BOX (POSITIONED RIGHT HERE ALONGSIDE THE PRODUCT IMAGE AS IN REFERENCE!) */}
            <div id="included-in-box-section" className="bg-[#e4eff8] rounded-3xl p-6 sm:p-7 border border-[#cbe0f2]">
              <h3 className="text-xl font-bold text-center text-slate-900 mb-6 tracking-tight">
                Included in the Box
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.boxItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div className="p-4 flex items-center justify-center min-h-[110px]">
                      {item.icon === 'purifier' && (
                        <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="6" y="3" width="12" height="18" rx="2" strokeWidth={1.8} />
                          <circle cx="12" cy="8" r="2" strokeWidth={1.8} />
                          <path strokeLinecap="round" strokeWidth={1.8} d="M9 14h6m-6 3h6" />
                        </svg>
                      )}
                      {item.icon === 'filter' && (
                        <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v18m-7-9h14M8 6h8m-8 12h8" />
                        </svg>
                      )}
                      {item.icon === 'remote' && (
                        <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="7" y="2" width="10" height="20" rx="3" strokeWidth={1.8} />
                          <circle cx="12" cy="7" r="1.5" strokeWidth={1.8} />
                          <circle cx="12" cy="12" r="1.5" strokeWidth={1.8} />
                          <circle cx="12" cy="17" r="1.5" strokeWidth={1.8} />
                        </svg>
                      )}
                      {item.icon === 'cable' && (
                        <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {item.icon === 'manual' && (
                        <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                    </div>
                    {/* Blue pill tag at the bottom matching reference */}
                    <div className="bg-[#5f87ab] text-white py-2 px-3 text-center">
                      <span className="text-xs font-bold leading-tight block">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. EXPERT RECOMMENDATIONS (POSITIONED RIGHT HERE ALONGSIDE THE PRODUCT IMAGE AS IN REFERENCE!) */}
            <div className="pt-6 border-t border-slate-200">
              <div className="mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  CLINICAL & LIFESTYLE ENDORSEMENTS
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
                  Expert Recommended
                </h3>
              </div>

              <div className="space-y-4">
                {EXPERT_RECOMMENDATIONS.map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex gap-4 items-start"
                  >
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{expert.name}</h4>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">{expert.role}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                        &ldquo;{expert.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 6. FULL-WIDTH CUSTOMER REVIEWS SECTION (BELOW THE MAIN STICKY SPLIT) */}
        <section id="reviews-section" className="mt-20 pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Customer Reviews
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Read real verified stories from homeowners and families.
              </p>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-sm"
            >
              Write a review
            </button>
          </div>

          {/* Aggregate Ratings Overview */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 mb-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Big Score */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start md:border-r border-slate-200 md:pr-8">
              <span className="text-5xl font-black text-slate-900 tracking-tight">{product.rating}</span>
              <div className="flex items-center text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-semibold">{product.reviewCount} verified ratings</span>
            </div>

            {/* Histogram distribution */}
            <div className="md:col-span-8 space-y-2">
              {[
                { star: 5, pct: '88%', count: 125 },
                { star: 4, pct: '9%', count: 13 },
                { star: 3, pct: '2%', count: 3 },
                { star: 2, pct: '0%', count: 0 },
                { star: 1, pct: '1%', count: 1 },
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="w-12">{row.star} Star</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: row.pct }}
                    />
                  </div>
                  <span className="w-8 text-right text-slate-400">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Author row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-extrabold text-sm flex items-center justify-center">
                      {rev.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900">{rev.author}</span>
                        <span className="text-[10px] font-bold text-slate-500">🇮🇳 IN</span>
                      </div>
                      {rev.verified && (
                        <span className="text-[10px] text-[#2e7d32] font-semibold flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Verified purchase
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-200 fill-current'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[10px] text-slate-400 ml-2">{rev.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Helpful footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Helpful?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVoteHelpful(rev.id)}
                      className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                    >
                      <span>👍</span>
                      <span className="font-bold">{rev.helpfulCount}</span>
                    </button>
                    <button className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors">
                      <span>👎 0</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 7. STICKY FLOATING BOTTOM BAR (REVEALS AS YOU SCROLL PAST BUY BOX, EXACTLY AS IN REFERENCE SITES) */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl transition-all duration-300 transform ${
          showStickyBottomBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={`/images/${product.image}`}
              alt={product.model}
              className="w-12 h-12 rounded-xl object-contain bg-slate-50 p-1 border border-slate-200"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">{product.model}</p>
              <p className="text-xs text-slate-500">Color: {selectedColor}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-lg font-black text-slate-900">{formatINR(product.price)}</span>
              <span className="text-xs text-slate-400 line-through ml-2">{formatINR(product.originalPrice)}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-slate-900 hover:bg-black text-white text-sm font-bold py-2.5 px-6 rounded-full shadow-md transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8. FLOATING QUICK ACTION BUTTONS (WHATSAPP & PHONE) */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919876543210?text=Hello%20Kiyoki%20Team%2C%20I%20have%20a%20question%20about%20air%20purifiers"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25d366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.086.086-.177.181-.076.354.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043s.433-.505.549-.679c.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z" />
          </svg>
        </a>

        {/* Callback Trigger Phone Button */}
        <button
          onClick={() => setIsCallbackModalOpen(true)}
          className="w-12 h-12 rounded-full bg-[#0066cc] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
          aria-label="Request a Call"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
      </div>

      {/* 9. REQUEST A CALLBACK MODAL */}
      {isCallbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsCallbackModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-2xl font-bold"
              aria-label="Close dialog"
            >
              &times;
            </button>

            {callbackSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#ecfdf5] text-[#10b981] mx-auto flex items-center justify-center text-3xl mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Callback Scheduled!</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Our clean air specialist will call you within 15 minutes to answer any questions about the {product.model}.
                </p>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Request a Quick Callback</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Need personalized advice on room size or filtration? Enter your contact info below.
                </p>

                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number (10 Digits)</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="e.g. 9876543210"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold py-3 rounded-full text-sm shadow-md transition-all"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. WRITE REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-2xl font-bold"
              aria-label="Close dialog"
            >
              &times;
            </button>

            {reviewSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#ecfdf5] text-[#10b981] mx-auto flex items-center justify-center text-3xl mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Thank You for Your Feedback!</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Your verified review has been recorded and posted.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Write a Customer Review</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Share your real experience with {product.model}.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Mehra"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl ${star <= reviewRating ? 'text-amber-500' : 'text-slate-300'}`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-900 ml-2">
                        {reviewRating} out of 5
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Review</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How has the purifier changed your room air and sleep quality?"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-full text-sm shadow-md transition-all"
                  >
                    Post Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 11. TOAST NOTIFICATION ON ADD TO CART */}
      {addedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-emerald-400 font-bold">✓</span>
          <span className="text-sm font-semibold">{product.model} added to your cart!</span>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
