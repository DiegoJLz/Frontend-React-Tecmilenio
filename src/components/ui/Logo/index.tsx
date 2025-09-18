import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative animate-float`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle Background with gradient */}
          <defs>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="30%" stopColor="#FFEB3B" />
              <stop offset="50%" stopColor="#4DD0E1" />
              <stop offset="70%" stopColor="#26C6DA" />
              <stop offset="85%" stopColor="#0097A7" />
              <stop offset="100%" stopColor="#006064" />
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="50" fill="url(#brandGradient)" />

          {/* Palm Tree */}
          <g transform="translate(25, 20)" className="animate-wave">
            {/* Trunk */}
            <path
              d="M8 35 L8 50 L12 50 L12 35 Z"
              fill="#006064"
            />
            {/* Fronds */}
            <path
              d="M10 20 Q5 25 8 30 Q10 25 15 30 Q18 25 10 20"
              fill="#006064"
            />
            <path
              d="M10 25 Q3 30 6 35 Q10 30 17 35 Q20 30 10 25"
              fill="#006064"
            />
          </g>

          {/* Airplane */}
          <g transform="translate(65, 25)">
            <path
              d="M5 10 L15 8 L20 12 L15 16 L5 14 Z"
              fill="#006064"
            />
            <path
              d="M20 12 L25 10 L30 12 L25 14 Z"
              fill="#006064"
            />
          </g>

          {/* Water Waves */}
          <path
            d="M0 60 Q25 55 50 60 T100 60 L100 100 L0 100 Z"
            fill="#4DD0E1"
          />
          <path
            d="M0 70 Q25 65 50 70 T100 70 L100 100 L0 100 Z"
            fill="#26C6DA"
          />
          <path
            d="M0 80 Q25 75 50 80 T100 80 L100 100 L0 100 Z"
            fill="#0097A7"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="ml-4">
          <h1 className={`font-bold text-[#006064] ${textSizes[size]} tracking-wide`}>
            TECMYEXPLORER
          </h1>
          <p className="text-xs text-[#0097A7] font-medium tracking-wider">
            Local Experiences
          </p>
        </div>
      )}
    </div>
  );
}
