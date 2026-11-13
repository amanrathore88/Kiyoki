import React from 'react';
import { Footer } from '../../components/Footer';

interface TechnologyFooterProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  onNavigate?: (page: 'home' | 'shop' | 'technology' | 'about') => void;
}

export const TechnologyFooter: React.FC<TechnologyFooterProps> = ({
  onOpenSearch,
  onOpenCart,
  onNavigate,
}) => {
  return (
    <Footer
      onOpenSearch={onOpenSearch}
      onOpenCart={onOpenCart}
      onNavigate={onNavigate}
    />
  );
};
