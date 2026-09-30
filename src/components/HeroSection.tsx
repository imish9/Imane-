import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelloKittyBow } from './decorations/HelloKittyBow';
import { Ladybug } from './decorations/Ladybug';
import { Sunflower } from './decorations/Sunflower';
import { CrochetFlower } from './decorations/CrochetFlower';
import { SpiderLily } from './decorations/SpiderLily';
import { sounds } from '../utils/audio';
import { DecorationSettings } from '../types/theme';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreNext: () => void;
  isUnlocked: boolean;
  setIsUnlocked: (unlocked: boolean) => void;
  decorations: DecorationSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreNext,
  isUnlocked,
  setIsUnlocked,
  decorations,
}) => {
  const [stage, setStage] = useState<'initial' | 'bursting' | 'revealed'>(
    isUnlocked ? 'revealed' : 'initial'
  );

  const fireSpectacularAnimation = () => {
    const heartShape = confetti.shapeFromText({ text: '❤️' });
    confetti({
      shapes: [heartShape],
      scalar: 2.4,
      particleCount: 45,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FF1493', '#FF69B4', '#E11D48'],
    });

    const count = 260;
    const defaults = {
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FF1A75', '#FF69B4', '#FFD1DC', '#FBBF24', '#DC2626', '#FFFFFF', '#F472B6'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 35, startVelocity: 65 });
    fire(0.2, { spread: 80 });
    fire(0.35, { spread: 120, decay: 0.91, scalar: 1.0 });
    fire(0.1, { spread: 140, startVelocity: 35, decay: 0.92, scalar: 1.4 });
    fire(0.1, { spread: 150, startVelocity: 60 });

    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 85,
        origin: { x: 0, y: 0.5 },
        colors: ['#FF1A75', '#FFC0CB', '#F59E0B', '#EF4444', '#FFFFFF'],
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 85,
        origin: { x: 1, y: 0.5 },
        colors: ['#FF1A75', '#FFC0CB', '#F59E0B', '#EF4444', '#FFFFFF'],
      });
    }, 450);
  };

  const handleMysticCircleClick = () => {
    if (stage !== 'initial') return;

    sounds.playGrandReveal();
    setStage('bursting');
    fireSpectacularAnimation();

    setTimeout(() => {
      setStage('revealed');
      setIsUnlocked(true);
    }, 850);
  };

  return (
    <section
      className={`relative w-full select-none flex flex-col items-center justify-center ${
        stage === 'initial' || stage === 'bursting'
          ? 'h-[100dvh] min-h-[580px] overflow-hidden'
          : 'min-h-[100dvh] py-12 sm:py-16'
      }`}
    >
      {stage === 'initial' && (
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4">
          {decorations.flowers && (
            <div className="absolute top-[18%] left-[12%] sm:left-[22%] pointer-events-none filter drop-shadow-sm animate-float-slow">
              <span className="text-3xl sm:text-4xl opacity-80">🌸</span>
            </div>
          )}

          {decorations.spiderLily && (
            <div className="absolute top-[16%] right-[10%] sm:right-[20%] pointer-events-none filter drop-shadow-md animate-float-slow" style={{ animationDelay: '1.2s' }}>
              <SpiderLily size={62} rotation={-18} subtle={true} />
            </div>
          )}

          {decorations.sunflowers && (
            <div className="absolute bottom-[20%] left-[10%] sm:left-[20%] pointer-events-none filter drop-shadow-md animate-float-slow" style={{ animationDelay: '0.8s' }}>
              <Sunflower size={64} rotation={-12} />
            </div>
          )}

          {decorations.ladybugs && (
            <div className="absolute bottom-[22%] right-[12%] sm:right-[22%] pointer-events-none filter drop-shadow-md animate-float-slow" style={{ animationDelay: '1.6s' }}>
              <Ladybug size={36} rotation={18} />
            </div>
          )}

          {decorations.bows && (
            <div className="absolute top-[38%] left-[6%] sm:left-[12%] pointer-events-none opacity-40 animate-float-slow" style={{ animationDelay: '2s' }}>
              <HelloKittyBow size={40} />
            </div>
          )}
          {decorations.crochet && (
            <div className="absolute top-[38%] right-[6%] sm:right-[12%] pointer-events-none opacity-40 animate-float-slow" style={{ animationDelay: '2.5s' }}>
              <CrochetFlower size={42} color="#F472B6" />
            </div>
          )}

          <div className="relative flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full bg-pink-300/25 blur-xl animate-pulse-gentle pointer-events-none" />
            <div
              className="absolute w-16 h-16 rounded-full bg-rose-400/30 blur-md animate-pulse pointer-events-none"
              style={{ animationDuration: '3s' }}
            />

            <span
              className="absolute -top-6 -right-6 text-pink-300/60 text-xs animate-sparkle pointer-events-none"
              style={{ animationDelay: '0.6s' }}
            >
              ✦
            </span>
            <span
              className="absolute -bottom-6 -left-6 text-amber-200/50 text-xs animate-sparkle pointer-events-none"
              style={{ animationDelay: '1.4s' }}
            >
              ✧
            </span>

            <button
              onClick={handleMysticCircleClick}
              onMouseEnter={() => sounds.playSparkle()}
              aria-label="Lumière secrète"
              className="animate-mystic-pulse relative z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white border-2 border-pink-200/90 cursor-pointer transition-all duration-300 hover:scale-130 active:scale-90 flex items-center justify-center focus:outline-none"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-300 via-pink-100 to-white opacity-95 group-hover:opacity-100 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}

      {stage === 'bursting' && (
        <div className="text-center z-30 animate-pulse-gentle px-4">
          <div className="text-7xl sm:text-9xl animate-bounce mb-4">✨💗✨</div>
          <div className="text-3xl sm:text-5xl font-retro retro-shiny-text animate-pulse">
            Illumination...
          </div>
        </div>
      )}

      {stage === 'revealed' && (
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-4 my-auto animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-12 rounded-[42px] shadow-2xl shadow-pink-300/50 crochet-border relative border-4 border-white">
            <div className="absolute -top-3.5 left-10 washi-tape w-28 h-6 rounded-xs transform -rotate-2"></div>
            <div className="absolute -top-3.5 right-10 washi-tape-yellow w-28 h-6 rounded-xs transform rotate-2"></div>

            {decorations.sunflowers && (
              <div className="absolute -top-8 -left-6 sm:-top-9 sm:-left-8 pointer-events-none filter drop-shadow-md">
                <Sunflower size={72} rotation={-12} />
              </div>
            )}
            {decorations.crochet && (
              <div className="absolute -top-8 -right-6 sm:-top-9 sm:-right-7 pointer-events-none filter drop-shadow-md">
                <CrochetFlower size={64} color="#F472B6" />
              </div>
            )}
            {decorations.spiderLily && (
              <div className="absolute -bottom-6 -left-5 pointer-events-none filter drop-shadow-md">
                <SpiderLily size={74} rotation={20} subtle={false} />
              </div>
            )}
            {decorations.ladybugs && (
              <div className="absolute -bottom-5 -right-5 pointer-events-none filter drop-shadow-md">
                <Ladybug size={42} rotation={-25} />
              </div>
            )}

            {decorations.bows && (
              <div className="flex justify-center mb-5">
                <div className="relative inline-block">
                  <HelloKittyBow size={100} className="filter drop-shadow-lg hover:scale-110 transition-transform" />
                  <span className="absolute -top-3 -right-3 text-3xl animate-spin">✨</span>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFE4EC] text-[#BE185D] text-xs sm:text-sm font-retro uppercase tracking-wider shadow-xs">
                <span>✨</span>
                <span>Surprise pour toi</span>
                <span>✨</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-retro retro-shiny-text retro-3d-title tracking-wide leading-tight">
                Je t'aime Imane ❤️
              </h1>

              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-swash text-[#E11D48] tracking-wide"
                style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
              >
                Bon anniversaire 🎀
              </h2>
            </div>

            <div className="max-w-xl mx-auto bg-[#FFF5F7] p-6 sm:p-7 rounded-2xl border-2 border-dashed border-[#F9A8D4] mb-8 text-[#6D2842] leading-relaxed relative shadow-inner">
              <p className="font-handwriting text-2xl sm:text-3xl text-[#881337] mb-2 font-bold">
                Ma Imane 😁
              </p>
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                T'as enfin 17 ans (twinn) joyeux anniversaire mon bb 👀 Qu'Allah t'accorde une longue et belle vie, d'ailleurs t'as cru j'avais oublié ton anniversaire 🤣🤣 j'ai fait exprès de pas te dire bon anniv à 00h pour voir ta réaction (ps : je prépare depuis 1 semaine le site et l'idée depuis qlq semaines haha bon azz découvre la suite 😉
              </p>
              <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center justify-center gap-4 text-xs text-[#BE185D] font-bold">
                <span>🎀 Sanrio Vibes</span>
                <span>•</span>
                <span>🐞 Porte-bonheur</span>
                <span>•</span>
                <span>🌻 Rayonne toujours</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={onExploreNext}
                className="px-10 py-4 bg-gradient-to-r from-[#FF1A66] via-[#F43F5E] to-[#FB7185] hover:from-[#E11D48] hover:to-[#FF1A66] text-white font-retro text-xl sm:text-2xl rounded-full shadow-xl shadow-rose-400/50 hover:shadow-2xl active:scale-95 transition-all flex items-center gap-3 cursor-pointer group border-2 border-white/80"
              >
                <span>Découvrir la suite</span>
                <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              </button>
              <span className="text-xs text-[#9D4C6C] font-semibold">
                Une roue de la chance et des surprises t'attendent juste en bas 👀
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
