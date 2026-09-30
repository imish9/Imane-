import React from 'react';

interface SpiderLilyProps {
  className?: string;
  size?: number;
  rotation?: number;
  subtle?: boolean;
}

export const SpiderLily: React.FC<SpiderLilyProps> = ({
  className = '',
  size = 64,
  rotation = 0,
  subtle = true,
}) => {
  return (
    <div
      className={`inline-block select-none transition-transform duration-500 hover:scale-105 ${subtle ? 'opacity-85 hover:opacity-100' : ''} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      aria-label="Spider Lily decoration"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-sm"
      >
        <g transform="translate(50, 60)">
          <path d="M 0 0 Q 3 20 5 38" stroke="#365314" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M 0 0 C -15 -10, -38 -8, -44 -26 C -40 -16, -20 -1, 0 0"
            fill="#991B1B"
            stroke="#7F1D1D"
            strokeWidth="1.2"
          />
          <path
            d="M 0 0 C -10 -15, -28 -28, -25 -42 C -20 -30, -8 -15, 0 0"
            fill="#B91C1C"
            stroke="#7F1D1D"
            strokeWidth="1.2"
          />
          <path
            d="M 0 0 C -4 -18, -4 -38, 2 -48 C 6 -36, 4 -16, 0 0"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="1.2"
          />
          <path
            d="M 0 0 C 10 -15, 28 -28, 25 -42 C 20 -30, 8 -15, 0 0"
            fill="#B91C1C"
            stroke="#7F1D1D"
            strokeWidth="1.2"
          />
          <path
            d="M 0 0 C 15 -10, 38 -8, 44 -26 C 40 -16, 20 -1, 0 0"
            fill="#991B1B"
            stroke="#7F1D1D"
            strokeWidth="1.2"
          />
          <path d="M 0 0 Q -25 -30 -38 -52" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="-38" cy="-52" r="1.5" fill="#FEF08A" />
          <path d="M 0 0 Q -10 -35 -14 -58" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="-14" cy="-58" r="1.5" fill="#FEF08A" />
          <path d="M 0 0 Q 10 -35 14 -58" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="14" cy="-58" r="1.5" fill="#FEF08A" />
          <path d="M 0 0 Q 25 -30 38 -52" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="38" cy="-52" r="1.5" fill="#FEF08A" />
          <circle cx="0" cy="0" r="3.5" fill="#7F1D1D" />
        </g>
      </svg>
    </div>
  );
};
