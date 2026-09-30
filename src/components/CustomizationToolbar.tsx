import React, { useState, useRef, useEffect } from 'react';
import { BackgroundThemeId, BACKGROUND_THEMES, DecorationSettings } from '../types/theme';
import { sounds } from '../utils/audio';
import { Sparkles, X, Check } from 'lucide-react';

interface CustomizationToolbarProps {
  currentTheme: BackgroundThemeId;
  onThemeChange: (theme: BackgroundThemeId) => void;
  decorations: DecorationSettings;
  onDecorationToggle: (key: keyof DecorationSettings) => void;
  isUnlocked: boolean;
}

export const CustomizationToolbar: React.FC<CustomizationToolbarProps> = ({
  currentTheme,
  onThemeChange,
  decorations,
  onDecorationToggle,
}) => {
  const [openPanel, setOpenPanel] = useState<'theme' | 'decorations' | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    if (openPanel) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openPanel]);

  const togglePanel = (panel: 'theme' | 'decorations') => {
    sounds.playSparkle();
    setOpenPanel(openPanel === panel ? null : panel);
  };

  const decorationItems: { key: keyof DecorationSettings; label: string; icon: string }[] = [
    { key: 'sunflowers', label: 'Tournesols', icon: '🌻' },
    { key: 'ladybugs', label: 'Coccinelles', icon: '🐞' },
    { key: 'flowers', label: 'Fleurs', icon: '🌸' },
    { key: 'crochet', label: 'Crochet', icon: '🧶' },
    { key: 'spiderLily', label: 'Spider Lily', icon: '🌺' },
    { key: 'bows', label: 'Nœuds Sanrio', icon: '🎀' },
    { key: 'stars', label: 'Étoiles', icon: '✨' },
    { key: 'hearts', label: 'Cœurs', icon: '💗' },
  ];

  return (
    <div ref={panelRef} className="fixed top-4 left-4 z-50 select-none">
      <div className="flex items-center gap-1.5 p-1 bg-white/75 hover:bg-white/90 backdrop-blur-md border border-pink-200/80 rounded-full shadow-md shadow-pink-200/30 transition-all duration-300">
        <button
          onClick={() => togglePanel('theme')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-retro tracking-wide transition-all cursor-pointer ${
            openPanel === 'theme'
              ? 'bg-[#E11D48] text-white shadow-xs'
              : 'text-[#881337] hover:bg-pink-100/70'
          }`}
          title="Changer l'ambiance du fond"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Fond ✨</span>
        </button>

        <button
          onClick={() => togglePanel('decorations')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-retro tracking-wide transition-all cursor-pointer ${
            openPanel === 'decorations'
              ? 'bg-[#E11D48] text-white shadow-xs'
              : 'text-[#881337] hover:bg-pink-100/70'
          }`}
          title="Activer ou désactiver les décorations"
        >
          <span>Décorations 🌸</span>
        </button>
      </div>

      {openPanel === 'theme' && (
        <div className="absolute top-12 left-0 w-72 sm:w-80 p-4 bg-white/95 backdrop-blur-lg rounded-3xl border border-pink-200 shadow-2xl shadow-rose-300/40 animate-in fade-in zoom-in-95 duration-200 z-50 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100 mb-3">
            <span className="font-retro text-sm text-[#881337] flex items-center gap-1.5">
              <span>🎨</span> Ambiances de Fond
            </span>
            <button
              onClick={() => setOpenPanel(null)}
              className="p-1 rounded-full text-pink-400 hover:bg-pink-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {(Object.keys(BACKGROUND_THEMES) as BackgroundThemeId[]).map((themeKey) => {
              const theme = BACKGROUND_THEMES[themeKey];
              const isSelected = currentTheme === themeKey;
              return (
                <button
                  key={themeKey}
                  onClick={() => {
                    sounds.playSparkle();
                    onThemeChange(themeKey);
                  }}
                  className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#E11D48] bg-pink-50/80 shadow-xs ring-1 ring-[#E11D48]'
                      : 'border-pink-100 hover:border-pink-200 hover:bg-pink-50/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-retro text-xs text-[#881337]">
                        {theme.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white text-pink-600 font-semibold border border-pink-150">
                        {theme.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9D4C6C] mt-0.5 font-medium leading-tight">
                      {theme.subtitle}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#E11D48] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {openPanel === 'decorations' && (
        <div className="absolute top-12 left-0 w-72 sm:w-80 p-4 bg-white/95 backdrop-blur-lg rounded-3xl border border-pink-200 shadow-2xl shadow-rose-300/40 animate-in fade-in zoom-in-95 duration-200 z-50 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100 mb-3">
            <div>
              <span className="font-retro text-sm text-[#881337] flex items-center gap-1.5">
                <span>🌸</span> Décorations Kawaii
              </span>
              <p className="text-[10px] text-[#9D4C6C]">Active ou désactive les éléments sur la page</p>
            </div>
            <button
              onClick={() => setOpenPanel(null)}
              className="p-1 rounded-full text-pink-400 hover:bg-pink-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {decorationItems.map((item) => {
              const active = decorations[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    sounds.playSparkle();
                    onDecorationToggle(item.key);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    active
                      ? 'border-[#E11D48] bg-rose-50/70 text-[#881337]'
                      : 'border-pink-100 bg-gray-50/50 text-gray-400 opacity-60'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-xs font-retro">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                      active ? 'bg-[#E11D48] text-white' : 'bg-gray-200'
                    }`}
                  >
                    {active ? '✓' : ''}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
