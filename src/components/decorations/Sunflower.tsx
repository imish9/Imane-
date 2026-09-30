import React from 'react';

interface SunflowerProps {
  className?: string;
  size?: number;
  rotation?: number;
}

export const Sunflower: React.FC<SunflowerProps> = ({
  className = '',
  size = 54,
  rotation = 0,
}) => {
  const petals = Array.from({ length: 12 });

  return (
    <div
      className={`inline-block select-none transition-transform duration-300 hover:rotate-12 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-label="Sunflower decoration"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-sm"
      >
        <g transform="translate(50, 50)">
          {petals.map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <g key={i} transform={`rotate(${angle})`}>
                <path
                  d="M -7 -18 C -11 -30, -5 -44, 0 -47 C 5 -44, 11 -30, 7 -18 Z"
                  fill="#FBBF24"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
                <path
                  d="M -3 -22 C -4 -32, 0 -41, 0 -41 C 0 -41, 4 -32, 3 -22"
                  stroke="#FDE68A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
          <circle cx="0" cy="0" r="20" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="16" fill="#92400E" />
          <circle cx="-5" cy="-5" r="1.5" fill="#FDE68A" />
          <circle cx="4" cy="-7" r="1.2" fill="#FDE68A" />
          <circle cx="-3" cy="6" r="1.5" fill="#FDE68A" />
          <circle cx="6" cy="3" r="1.2" fill="#FDE68A" />
          <circle cx="0" cy="0" r="1.8" fill="#FEF3C7" />
        </g>
      </svg>
    </div>
  );
};
