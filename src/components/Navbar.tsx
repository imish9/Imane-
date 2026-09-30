import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { HelloKittyBow } from './decorations/HelloKittyBow';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface NavbarProps {
  onScrollToWheel: () => void;
  isUnlocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToWheel, isUnlocked = false }) => {
  const [soundEnabled, setSoundEnabled] = useState(sounds.soundEnabled);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleSound = () => {
    sounds.soundEnabled = !sounds.soundEnabled;
    setSoundEnabled(sounds.soundEnabled);
    if (sounds.soundEnabled) {
      sounds.playSparkle();
    }
  };

  const toggleMusic = () => {
    sounds.toggleMusicBox((playing) => {
      setMusicPlaying(playing);
    });
  };

  return (
    <header
      className={`z-40 w-full transition-all duration-500 ${
        isUnlocked
          ? 'sticky top-0 bg-white/70 backdrop-blur-md border-b border-pink-200/50 px-4 py-3'
          : 'fixed top-0 left-0 right-0 bg-transparent border-transparent px-4 py-3 pointer-events-none'
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between pl-48 sm:pl-56 md:pl-0">
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <HelloKittyBow size={34} />
          <span className="font-retro text-base sm:text-lg text-[#881337] tracking-wide hidden xs:inline">
            Imane's Birthday 🎀
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto ml-auto">
          {isUnlocked && (
            <button
              onClick={onScrollToWheel}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-[#FFE4EC] text-[#BE185D] text-xs font-retro border border-pink-200 shadow-xs transition-colors cursor-pointer"
            >
              <span>🎡 Roue des cadeaux</span>
            </button>
          )}

          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-retro border shadow-xs transition-all cursor-pointer ${
              musicPlaying
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-white/90 hover:bg-pink-100 text-pink-700 border-pink-200'
            }`}
            title={musicPlaying ? 'Arrêter la berceuse d’anniversaire' : 'Jouer la boîte à musique'}
          >
            <Music className={`w-3.5 h-3.5 ${musicPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">{musicPlaying ? 'Musique ♫' : 'Boîte à musique'}</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white/90 hover:bg-pink-100 text-[#881337] text-xs font-medium border border-pink-200 shadow-xs transition-colors cursor-pointer flex items-center gap-1"
            title={soundEnabled ? 'Désactiver les effets sonores' : 'Activer les effets sonores'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
