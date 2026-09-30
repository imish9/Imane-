import React from 'react';
import { BackgroundThemeId } from '../types/theme';

interface AnimatedBackgroundProps {
  theme: BackgroundThemeId;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-1000">
      {theme === 'pink-retro-glow' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F6] via-[#FFE4ED] to-[#FFDDE8] transition-opacity duration-1000">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(#F472B6 1.2px, transparent 1.2px), radial-gradient(#FBBF24 0.9px, transparent 0.9px)',
              backgroundSize: '32px 32px',
              backgroundPosition: '0 0, 16px 16px',
            }}
          />
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[#FF6584]/30 to-[#F472B6]/20 blur-3xl animate-float-slow"
            style={{ animationDuration: '18s' }}
          />
          <div
            className="absolute top-1/4 -right-28 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-[#FDA4AF]/35 to-[#FDE047]/20 blur-3xl animate-float-slow"
            style={{ animationDuration: '24s', animationDelay: '2s' }}
          />
          <div
            className="absolute -bottom-36 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FF1A75]/20 to-[#FDA4AF]/25 blur-3xl animate-float-slow"
            style={{ animationDuration: '22s', animationDelay: '4s' }}
          />
          <span className="absolute top-16 left-[12%] text-pink-300 text-lg opacity-60 animate-sparkle" style={{ animationDelay: '0.4s' }}>✦</span>
          <span className="absolute top-36 right-[15%] text-amber-300 text-sm opacity-60 animate-sparkle" style={{ animationDelay: '1.2s' }}>★</span>
          <span className="absolute top-1/2 left-[8%] text-pink-400 text-xl opacity-50 animate-sparkle" style={{ animationDelay: '2.5s' }}>✧</span>
          <span className="absolute top-2/3 right-[10%] text-rose-300 text-base opacity-60 animate-sparkle" style={{ animationDelay: '1.8s' }}>✦</span>
          <span className="absolute bottom-24 left-[18%] text-pink-300 text-xs opacity-50 animate-sparkle" style={{ animationDelay: '3s' }}>★</span>
          <span className="absolute bottom-16 right-[22%] text-amber-200 text-lg opacity-60 animate-sparkle" style={{ animationDelay: '0.8s' }}>✧</span>
        </div>
      )}

      {theme === 'pink-dream' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7] via-[#FFF1F2] to-[#FDF2F8] transition-opacity duration-1000">
          <div
            className="absolute -top-24 left-1/3 w-[520px] h-[520px] rounded-full bg-gradient-to-b from-[#FCE7F3]/60 via-[#FDF2F8]/40 to-transparent blur-3xl animate-float-slow"
            style={{ animationDuration: '26s' }}
          />
          <div
            className="absolute top-1/3 -left-36 w-[460px] h-[460px] rounded-full bg-gradient-to-r from-[#FFE4E6]/50 to-transparent blur-3xl animate-float-slow"
            style={{ animationDuration: '28s', animationDelay: '3s' }}
          />
          <div
            className="absolute bottom-12 -right-32 w-[480px] h-[480px] rounded-full bg-gradient-to-l from-[#FBCFE8]/45 to-transparent blur-3xl animate-float-slow"
            style={{ animationDuration: '24s', animationDelay: '1.5s' }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(#F9A8D4 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <span className="absolute top-20 right-[25%] text-pink-300 text-xs opacity-50 animate-sparkle">☁️</span>
          <span className="absolute bottom-40 left-[14%] text-pink-200 text-xs opacity-50 animate-sparkle" style={{ animationDelay: '2s' }}>☁️</span>
          <span className="absolute top-1/2 right-[12%] text-rose-200 text-sm opacity-50 animate-sparkle" style={{ animationDelay: '1s' }}>✦</span>
        </div>
      )}

      {theme === 'night-kawaii' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F0A20] via-[#2D0D2E] to-[#17051A] transition-opacity duration-1000">
          <div
            className="absolute -top-20 left-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#701A75]/35 via-[#9D174D]/25 to-transparent blur-3xl animate-float-slow"
            style={{ animationDuration: '20s' }}
          />
          <div
            className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-[#831843]/30 to-[#4A044E]/30 blur-3xl animate-float-slow"
            style={{ animationDuration: '25s', animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-10 left-[-80px] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#581C87]/30 to-transparent blur-3xl animate-float-slow"
            style={{ animationDuration: '22s', animationDelay: '4s' }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(#F472B6 0.8px, transparent 0.8px), radial-gradient(#FDE047 0.8px, transparent 0.8px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px',
            }}
          />
          <span className="absolute top-16 left-[20%] text-amber-200 text-sm opacity-70 animate-sparkle">★</span>
          <span className="absolute top-28 right-[18%] text-pink-300 text-lg opacity-70 animate-sparkle" style={{ animationDelay: '1.4s' }}>✦</span>
          <span className="absolute top-1/3 left-[10%] text-fuchsia-300 text-xs opacity-60 animate-sparkle" style={{ animationDelay: '0.8s' }}>✧</span>
          <span className="absolute top-2/3 right-[14%] text-pink-200 text-base opacity-75 animate-sparkle" style={{ animationDelay: '2.2s' }}>★</span>
          <span className="absolute bottom-24 left-[24%] text-amber-200 text-xs opacity-65 animate-sparkle" style={{ animationDelay: '1.9s' }}>✦</span>
        </div>
      )}
    </div>
  );
};
