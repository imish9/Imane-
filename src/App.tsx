/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FortuneWheel } from './components/wheel/FortuneWheel';
import { ScrapbookSection } from './components/ScrapbookSection';
import { SecretMessageSection } from './components/SecretMessageSection';
import { FloatingDecorations } from './components/decorations/FloatingDecorations';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CustomizationToolbar } from './components/CustomizationToolbar';
import { BackgroundThemeId, DecorationSettings, DEFAULT_DECORATIONS } from './types/theme';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<BackgroundThemeId>('pink-retro-glow');
  const [decorations, setDecorations] = useState<DecorationSettings>(DEFAULT_DECORATIONS);

  const handleDecorationToggle = (key: keyof DecorationSettings) => {
    setDecorations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const scrollToWheel = () => {
    if (!isUnlocked) {
      setIsUnlocked(true);
    }
    setTimeout(() => {
      const wheelElement = document.getElementById('wheel-section');
      if (wheelElement) {
        wheelElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const isNight = currentTheme === 'night-kawaii';

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900 transition-colors duration-700 ${
        isNight ? 'text-[#FCE7F3]' : 'text-[#4A3B43]'
      }`}
    >
      <AnimatedBackground theme={currentTheme} />
      <FloatingDecorations settings={decorations} isNight={isNight} />
      <CustomizationToolbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        decorations={decorations}
        onDecorationToggle={handleDecorationToggle}
        isUnlocked={isUnlocked}
      />
      <Navbar onScrollToWheel={scrollToWheel} isUnlocked={isUnlocked} />

      <main className="relative z-10">
        <HeroSection
          onExploreNext={scrollToWheel}
          isUnlocked={isUnlocked}
          setIsUnlocked={setIsUnlocked}
          decorations={decorations}
        />

        {isUnlocked && (
          <div className="animate-in fade-in duration-700 space-y-12 sm:space-y-16">
            <FortuneWheel />
            <ScrapbookSection />
            <SecretMessageSection decorations={decorations} />
          </div>
        )}
      </main>
    </div>
  );
}
