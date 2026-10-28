import React from 'react';
import { LogoVariant } from '../types/jobie';
import { MHLogo } from '../../components/MHLogo';

interface CompanyLogoProps {
  variant: LogoVariant;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-11 h-11 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-16 h-16 rounded-[20px]',
  }[size];

  const svgSize = {
    sm: 24,
    md: 28,
    lg: 38,
  }[size];

  const config: Record<
    LogoVariant,
    { bg: string; accent: string; style: 'arch' | 'c-mark' }
  > = {
    'orange-arch': { bg: '#FC6412', accent: '#FFD6C2', style: 'arch' },
    'dark-c': { bg: '#172B3A', accent: '#64748B', style: 'c-mark' },
    'magenta-c': { bg: '#005BB2', accent: '#60A5FA', style: 'c-mark' },
    'cyan-arch': { bg: '#0284C7', accent: '#7DD3FC', style: 'arch' },
    'green-arch': { bg: '#16A34A', accent: '#86EFAC', style: 'arch' },
    'blue-arch': { bg: '#005BB2', accent: '#93C5FD', style: 'arch' },
    'red-arch': { bg: '#E11D48', accent: '#FDA4AF', style: 'arch' },
    'pink-arch': { bg: '#EA580C', accent: '#FDBA74', style: 'arch' },
    'gold-arch': { bg: '#D97706', accent: '#FDE68A', style: 'arch' },
  };

  const { bg, accent, style } = config[variant] || config['blue-arch'];

  return (
    <div
      className={`${sizeClasses} flex items-center justify-center shrink-0 select-none shadow-xs text-white`}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      {style === 'arch' ? (
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 26C6.9 23.7 6 20.9 6 18C6 11.3726 11.3726 6 18 6C24.6274 6 30 11.3726 30 18C30 20.9 29.1 23.7 27.5 26H21.8C23.2 24.3 24 22.1 24 19.7C24 15.8 21.3 12.7 18 12.7C14.7 12.7 12 15.8 12 19.7C12 22.1 12.8 24.3 14.2 26H8.5Z"
            fill="#FFFFFF"
          />
          <circle cx="24" cy="24" r="3.2" fill={accent} />
        </svg>
      ) : (
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.5 12.5C23.7 10.3 21 9 18 9C12.75 9 8.5 13.03 8.5 18C8.5 22.97 12.75 27 18 27C21 27 23.7 25.7 25.5 23.5L21.3 20.3C20.4 21.3 19.2 21.9 17.9 21.9C15.6 21.9 13.8 20.15 13.8 18C13.8 15.85 15.6 14.1 17.9 14.1C19.2 14.1 20.4 14.7 21.3 15.7L25.5 12.5Z"
            fill="#FFFFFF"
          />
          <circle cx="24.5" cy="18" r="2.8" fill={accent} />
        </svg>
      )}
    </div>
  );
};

export const MHBrandLogo: React.FC = () => (
  <div className="flex items-center gap-2 select-none">
    <MHLogo variant="light" className="scale-95 origin-left" />
  </div>
);

// Backward-compatible alias
export const JobieBrandLogo = MHBrandLogo;

export const AdminAvatar: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11',
}) => (
  <div
    className={`${className} rounded-full bg-[#E2E8F0] overflow-hidden flex items-center justify-center border-2 border-white shadow-xs shrink-0`}
  >
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Jorge Hernández Avatar"
    >
      <rect width="64" height="64" fill="#005BB2" opacity="0.15" />
      <path
        d="M12 64C12 51.8497 20.9543 44 32 44C43.0457 44 52 51.8497 52 64H12Z"
        fill="#005BB2"
      />
      <path d="M26 44L32 53L38 44H26Z" fill="#FFFFFF" />
      <rect x="27" y="36" width="10" height="10" rx="4" fill="#D5C6B8" />
      <path
        d="M21 25C21 18.3726 25.9249 13 32 13C38.0751 13 43 18.3726 43 25V29C43 35.0751 38.0751 40 32 40C25.9249 40 21 35.0751 21 29V25Z"
        fill="#E5D6C8"
      />
      <path
        d="M20 24C20 16.5 25 11 32 11C39 11 44 16.5 44 24C44 21 41.5 17.5 37 17.5C34 17.5 31 19 27 18.5C23 18 21 21 20 24Z"
        fill="#172B3A"
      />
      <circle cx="27.5" cy="25.5" r="1.5" fill="#172B3A" />
      <circle cx="36.5" cy="25.5" r="1.5" fill="#172B3A" />
      <path
        d="M28 32C29.2 33 30.8 33.5 32 33.5C33.2 33.5 34.8 33 36 32"
        stroke="#172B3A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);
