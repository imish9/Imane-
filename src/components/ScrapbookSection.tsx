import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sunflower } from './decorations/Sunflower';
import { CrochetFlower } from './decorations/CrochetFlower';
import { SpiderLily } from './decorations/SpiderLily';
import { Ladybug } from './decorations/Ladybug';
import { sounds } from '../utils/audio';
import { CheckCircle2 } from 'lucide-react';

export const ScrapbookSection: React.FC = () => {
  const [candleBlown, setCandleBlown] = useState(false);
  const [hugMessage, setHugMessage] = useState(false);
  const hugTimerRef = useRef<number | null>(null);

  const handleBlowCandle = () => {
    sounds.playWin();
    if (!candleBlown) {
      setCandleBlown(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#FBBF24', '#F472B6', '#FDE047', '#FFFFFF'],
      });
    }

    setHugMessage(true);
    if (hugTimerRef.current) {
      clearTimeout(hugTimerRef.current);
    }
    hugTimerRef.current = window.setTimeout(() => {
      setHugMessage(false);
    }, 4500);
  };

  return (
    <section className="relative py-12 px-4 max-w-xl mx-auto">
      <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-[38px] crochet-border shadow-xl text-center relative border-4 border-white">
        <div className="absolute -top-6 -left-5 pointer-events-none filter drop-shadow-md">
          <Sunflower size={52} rotation={-10} />
        </div>
        <div className="absolute -top-6 -right-5 pointer-events-none filter drop-shadow-md">
          <CrochetFlower size={48} color="#F472B6" />
        </div>
        <div className="absolute -bottom-5 -left-4 pointer-events-none filter drop-shadow-md">
          <SpiderLily size={56} rotation={-20} subtle={true} />
        </div>
        <div className="absolute -bottom-4 -right-4 pointer-events-none filter drop-shadow-md">
          <Ladybug size={32} rotation={15} />
        </div>

        <div className="mb-4">
          <span className="text-xs font-retro uppercase tracking-widest text-[#DB2777] bg-pink-100 px-3.5 py-1 rounded-full">
            Moment Vœu Magique ✨
          </span>
          <h3 className="text-xl sm:text-2xl font-retro text-[#881337] mt-3">
            Souffle ta bougie virtuelle, Imane ! 🎂
          </h3>
          <p className="text-xs sm:text-sm text-[#9D4C6C] mt-1 font-medium">
            Ferme les yeux, fais ton plus grand vœu, et clique sur la flamme pour l'exaucer !
          </p>
        </div>

        {hugMessage && (
          <div className="mb-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border-2 border-rose-300 text-[#9F1239] font-retro text-sm sm:text-base shadow-lg animate-pulse-gentle">
              <span>🫂</span>
              <span>je veux te faire un câlin imane 🫠😔</span>
            </div>
          </div>
        )}

        <div className="my-6 flex flex-col items-center justify-center">
          <div
            onClick={handleBlowCandle}
            className={`relative cursor-pointer transition-transform duration-300 ${
              candleBlown ? 'scale-95 hover:scale-105' : 'hover:scale-110 active:scale-95'
            }`}
            title={candleBlown ? 'Clique pour un câlin ! 💖' : 'Clique pour souffler la bougie !'}
          >
            {!candleBlown ? (
              <div className="relative flex flex-col items-center animate-bounce">
                <div className="w-6 h-8 bg-gradient-to-t from-amber-400 via-yellow-300 to-white rounded-full shadow-lg shadow-amber-300/80 animate-pulse"></div>
                <div className="w-1.5 h-3 bg-neutral-800 -mt-1 rounded-xs"></div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center animate-in fade-in duration-500">
                <div className="text-xl text-pink-400 animate-sparkle">✨</div>
                <div className="w-1.5 h-3 bg-neutral-500 rounded-xs"></div>
              </div>
            )}

            <div className="w-8 h-20 bg-gradient-to-b from-[#FDA4AF] to-[#F43F5E] rounded-t-sm rounded-b-md shadow-md border-2 border-white flex flex-col justify-around items-center py-2">
              <div className="w-2 h-2 rounded-full bg-white/80"></div>
              <div className="w-2 h-2 rounded-full bg-white/80"></div>
              <div className="w-2 h-2 rounded-full bg-white/80"></div>
            </div>

            <div className="w-16 h-4 bg-[#FDE047] rounded-full shadow-sm border border-amber-300 -mt-1"></div>
          </div>
        </div>

        {candleBlown ? (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
            {hugMessage ? (
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-retro font-bold text-[#E11D48] bg-rose-50 px-5 py-2.5 rounded-full border border-rose-300 shadow-sm animate-bounce">
                <span>🫂</span>
                <span>je veux te faire un câlin imane 🫠😔</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-sm font-cute font-bold text-[#E11D48] bg-rose-50 px-4 py-2 rounded-full border border-rose-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Ton vœu est scellé dans les étoiles ! 🌟</span>
              </div>
            )}
            <p className="text-xs text-[#9D4C6C] mt-2 font-handwriting text-base">
              {hugMessage
                ? 'Plein de tendresse et de douceur...'
                : 'Puisse tout ce que ton cœur désire se réaliser cette année.'}
            </p>
          </div>
        ) : (
          <button
            onClick={handleBlowCandle}
            className="px-7 py-3 bg-gradient-to-r from-[#FF6584] to-[#E04867] hover:from-[#E04867] hover:to-[#FF6584] text-white font-retro text-base rounded-full shadow-md transition-all active:scale-95 cursor-pointer border border-white/60"
          >
            Souffler la bougie 🕯️
          </button>
        )}
      </div>
    </section>
  );
};
