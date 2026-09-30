import React from 'react';

interface LadybugProps {
  className?: string;
  size?: number;
  rotation?: number;
}

export const Ladybug: React.FC<LadybugProps> = ({
  className = '',
  size = 36,
  rotation = 0,
}) => {
  return (
    <div
      className={`inline-block select-none transition-transform duration-300 hover:scale-115 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-label="Cute lucky ladybug"
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
          <path d="M -20 -15 L -35 -25" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 20 -15 L 35 -25" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M -24 5 L -38 10" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 24 5 L 38 10" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M -18 25 L -32 35" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <path d="M 18 25 L 32 35" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

          <path d="M -8 -28 Q -16 -45 -22 -44" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-22" cy="-44" r="2.5" fill="#111827" />
          <path d="M 8 -28 Q 16 -45 22 -44" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="22" cy="-44" r="2.5" fill="#111827" />

          <circle cx="0" cy="-24" r="16" fill="#111827" />
          <circle cx="-6" cy="-26" r="2" fill="#FFFFFF" />
          <circle cx="6" cy="-26" r="2" fill="#FFFFFF" />

          <ellipse cx="0" cy="8" rx="28" ry="32" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <path d="M 0 -22 L 0 40" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="-13" cy="-5" r="5" fill="#111827" />
          <circle cx="13" cy="-5" r="5" fill="#111827" />
          <circle cx="-16" cy="16" r="4.5" fill="#111827" />
          <circle cx="16" cy="16" r="4.5" fill="#111827" />
          <circle cx="-7" cy="28" r="3.5" fill="#111827" />
          <circle cx="7" cy="28" r="3.5" fill="#111827" />

          <ellipse cx="-12" cy="-12" rx="4" ry="7" transform="rotate(-30 -12 -12)" fill="#FFFFFF" fillOpacity="0.45" />
        </g>
      </svg>
    </div>
  );
};
