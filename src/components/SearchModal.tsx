import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Wind } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const suggestions = [
    { title: 'Kiyoki Core Pro (1,200 sq.ft Flagship)', category: 'Purifier', href: '#featured' },
    { title: 'Kiyoki One Compact (Bedrooms & Small Spaces)', category: 'Purifier', href: '#purifiers' },
    { title: 'Kiyoki Balance (750 sq.ft Workspaces)', category: 'Purifier', href: '#purifiers' },
    { title: 'True HEPA-14 Carbon Replacement Filter', category: 'Accessories', href: '#technology' },
    { title: '5-Stage Clinical Filtration Architecture', category: 'Technology', href: '#technology' },
    { title: 'Zero Ozone CARB Lab Certification', category: 'Support', href: '#air-quality' },
  ];

  const filtered = suggestions.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-gray-100 gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kiyoki models, replacement filters, tech specs..."
            className="w-full text-base sm:text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Quick Links */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2">
            {query ? 'Search Results' : 'Recommended Quick Searches'}
          </div>

          <div className="space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/70 hover:text-sky-brand transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-sky-100 group-hover:text-sky-brand flex items-center justify-center shrink-0">
                      <Wind className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-sky-brand">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-sky-brand group-hover:translate-x-1 transition-all" />
                </a>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No matching results found for "{query}".
              </div>
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>Press ESC or click outside to dismiss</span>
          <span className="font-semibold text-sky-brand">KIYOKI Search Engine</span>
        </div>
      </div>
    </div>
  );
};
