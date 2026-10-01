import React from 'react';

interface KiyokiLogoProps {
  variant?: 'dark' | 'white';
  className?: string;
  height?: number;
}

export const KiyokiLogo: React.FC<KiyokiLogoProps> = ({ 
  variant = 'dark', 
  className = '', 
}) => {
  const isWhite = variant === 'white';
  
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem matching the device mark */}
      <svg 
        width="28"
        height="28"
        viewBox="0 0 34 34" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
      >
        {/* Main vertical stem of K */}
        <rect 
          x="3" 
          y="4" 
          width="7.5" 
          height="26" 
          rx="1" 
          fill={isWhite ? '#FFFFFF' : '#111827'} 
        />
        {/* Upper diagonal leaf/petal */}
        <path 
          d="M13.5 17.5C13.5 17.5 17 8 28.5 4C28.5 4 28 13.5 18 18.5L13.5 17.5Z" 
          fill={isWhite ? '#FFFFFF' : '#111827'} 
        />
        {/* Lower diagonal leaf/petal */}
        <path 
          d="M14 18.5C14 18.5 18.5 21 28 30C28 30 18.5 30.5 14 24.5V18.5Z" 
          fill={isWhite ? '#FFFFFF' : '#111827'} 
        />
      </svg>
      
      {/* KIYOKI Clean Geometric Typography */}
      <span 
        className={`tracking-[0.2em] sm:tracking-[0.24em] text-[17px] sm:text-[20px] font-bold uppercase transition-colors ${
          isWhite ? 'text-white' : 'text-[#111827]'
        }`}
      >
        KIYOKI
      </span>
    </div>
  );
};
