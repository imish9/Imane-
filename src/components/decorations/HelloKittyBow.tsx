import React from 'react';

interface HelloKittyBowProps {
  className?: string;
  size?: number;
}

export const HelloKittyBow: React.FC<HelloKittyBowProps> = ({ className = '', size = 48 }) => {
  return (
    <div
      className={`inline-block select-none transition-transform hover:scale-110 active:scale-95 duration-300 filter drop-shadow-sm ${className}`}
      aria-label="Hello Kitty Ribbon"
    >
      <svg
        width={size}
        height={Math.round(size * 0.72)}
        viewBox="0 0 100 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 45 36 C 25 10, 5 15, 8 36 C 10 52, 28 58, 45 42 Z"
          fill="#FF1464"
          stroke="#400014"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 22 26 C 18 32, 20 42, 28 44"
          stroke="#FFA5C2"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 55 36 C 75 10, 95 15, 92 36 C 90 52, 72 58, 55 42 Z"
          fill="#FF1464"
          stroke="#400014"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 78 26 C 82 32, 80 42, 72 44"
          stroke="#FFA5C2"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="38"
          r="14"
          fill="#FF1A75"
          stroke="#400014"
          strokeWidth="3.5"
        />
        <ellipse
          cx="46"
          cy="33"
          rx="5"
          ry="3"
          transform="rotate(-20 46 33)"
          fill="#FFAEC9"
        />
      </svg>
    </div>
  );
};
