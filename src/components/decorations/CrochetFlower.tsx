import React from 'react';

interface CrochetFlowerProps {
  className?: string;
  size?: number;
  color?: string;
}

export const CrochetFlower: React.FC<CrochetFlowerProps> = ({
  className = '',
  size = 50,
  color = '#F472B6',
}) => {
  const petals = Array.from({ length: 6 });

  return (
    <div
      className={`inline-block select-none transition-transform hover:scale-110 duration-300 filter drop-shadow-sm ${className}`}
      aria-label="Crochet flower handmade charm"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(50, 50)">
          {petals.map((_, i) => {
            const angle = (i * 360) / 6;
            return (
              <g key={i} transform={`rotate(${angle})`}>
                <circle
                  cx="0"
                  cy="-26"
                  r="18"
                  fill={color}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="3 2"
                />
                <circle cx="0" cy="-26" r="12" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.4" />
              </g>
            );
          })}
          <circle cx="0" cy="0" r="17" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3 2" />
          <circle cx="0" cy="0" r="12" fill="#FDE047" />
          <path d="M -4 -4 L 4 4 M 4 -4 L -4 4" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
