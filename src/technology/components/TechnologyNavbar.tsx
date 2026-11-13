import React from 'react';
import { Header } from '../../components/Header';

interface TechnologyNavbarProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount?: number;
  onNavigate?: (page: 'home' | 'shop' | 'technology' | 'about') => void;
}

export const TechnologyNavbar: React.FC<TechnologyNavbarProps> = ({
  onOpenSearch,
  onOpenCart,
  cartCount = 0,
  onNavigate,
}) => {
  return (
    <Header
      onOpenSearch={onOpenSearch}
      onOpenCart={onOpenCart}
      cartCount={cartCount}
      currentPage="technology"
      onNavigate={onNavigate}
    />
  );
};
