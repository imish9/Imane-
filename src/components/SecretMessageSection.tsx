import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelloKittyBow } from './decorations/HelloKittyBow';
import { Ladybug } from './decorations/Ladybug';
import { Sunflower } from './decorations/Sunflower';
import { CrochetFlower } from './decorations/CrochetFlower';
import { SpiderLily } from './decorations/SpiderLily';
import { sounds } from '../utils/audio';
import { DecorationSettings } from '../types/theme';
import { Sparkles, X } from 'lucide-react';

interface SecretMessageSectionProps {
  decorations?: DecorationSettings;
}

export const SecretMessageSection: React.FC<SecretMessageSectionProps> = ({ decorations }) => {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [hasDiscoveredSecret, setHasDiscoveredSecret] = useState(false);

  const handleOpenSecret = () => {
    sounds.playSecretChime();
    setHasDiscoveredSecret(true);
    setShowSecretModal(true);

    const heartShape = confetti.shapeFromText({ text: '❤️' });
    confetti({
      shapes: [heartShape],
      scalar: 2.2,
      particleCount: 35,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#FF1493', '#FF69B4', '#E11D48'],
    });

    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#FBCFE8', '#FED7AA', '#FFE4E8', '#FDE047'],
    });
  };

  return (
    <footer className="relative pt-12 pb-16 px-4 border-t-2 border-dashed border-[#F9A8D4] bg-white/40 backdrop-blur-xs overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5 filter drop-shadow-xs">
          {(!decorations || decorations.sunflowers) && <Sunflower size={40} rotation={-10} />}
          {(!decorations || decorations.bows) && <HelloKittyBow size={46} />}
          {(!decorations || decorations.crochet) && <CrochetFlower size={38} color="#F472B6" />}
          {(!decorations || decorations.ladybugs) && <Ladybug size={32} rotation={15} />}
          {(!decorations || decorations.spiderLily) && <SpiderLily size={46} rotation={20} subtle={true} />}
        </div>

        <p className="text-base font-retro text-[#881337] mb-1 tracking-wide">
          Créé avec tout mon cœur pour Imane 🎀
        </p>
        <p className="text-xs text-[#9D4C6C] font-handwriting text-lg">
          Joyeux Anniversaire • Que chaque jour soit une fête pleine de douceur
        </p>

        <div className="mt-8 pt-6 border-t border-pink-200/60 w-full flex flex-col items-center relative">
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 text-xs text-pink-300">
            <span>✿</span>
            <span>·</span>
            <span className="text-[10px]">★</span>
            <span>·</span>

            {!hasDiscoveredSecret ? (
              <button
                onClick={handleOpenSecret}
                className="relative group p-1.5 rounded-full bg-gradient-to-tr from-[#FF1A66] to-[#FBBF24] text-white shadow-md animate-ruby-glint cursor-pointer transition-transform hover:scale-125 active:scale-95 focus:outline-none border border-white"
                title="Un tout petit secret qui brille... ✨"
                aria-label="Secret d'Imane"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-200" style={{ animationDuration: '6s' }} />
                <span className="sr-only">Bouton secret</span>
              </button>
            ) : (
              <button
                onClick={handleOpenSecret}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 hover:bg-rose-200 text-[#BE123C] font-retro text-xs border border-rose-300 shadow-sm transition-all duration-300 cursor-pointer animate-in fade-in zoom-in-90"
                title="Clique pour relire la note secrète ❤️"
              >
                <span>💖</span>
                <span>Je t'aime Imane ❤️</span>
                <span className="text-amber-500">✨</span>
              </button>
            )}

            <span>·</span>
            <span className="text-[10px]">★</span>
            <span>·</span>
            <span>✿</span>
          </div>

          {!hasDiscoveredSecret && (
            <span className="text-[10px] text-pink-300/80 font-handwriting text-sm mt-2 italic">
              (Un minuscule éclat précieux se cache ici...)
            </span>
          )}
        </div>
      </div>

      {showSecretModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-xs animate-in fade-in duration-500">
          <div className="bg-[#FFF8FA] rounded-[40px] p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl crochet-border relative overflow-hidden animate-in zoom-in-95 duration-400 border-4 border-white">
            <div className="absolute -top-3 left-12 washi-tape w-24 h-5 transform -rotate-3"></div>
            <div className="absolute -top-3 right-12 washi-tape-yellow w-24 h-5 transform rotate-3"></div>

            <button
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="text-2xl animate-bounce">💖</span>
              <HelloKittyBow size={58} />
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-retro retro-shiny-text mb-3 tracking-wide">
              Je t'aime Imane ❤️
            </h3>

            <div className="bg-white/95 p-6 rounded-2xl border-2 border-dashed border-[#F472B6]/40 shadow-xs mb-6 text-left relative">
              <div className="absolute -top-3 -right-2">
                <Ladybug size={26} rotation={20} />
              </div>

              <p className="font-handwriting text-2xl sm:text-3xl text-[#881337] leading-relaxed mb-3 font-bold">
                Mon petit chaton,
              </p>
              <p className="text-sm sm:text-base text-[#4A3B43] leading-relaxed font-medium">
                haha message secret pour te dire que JE TAIMEEEEEE TGM je t'aime trop arhhh 😔 vtf (aussi des fois je te cacher des truc ces dernier temps c par ce que je fesait sa haha )
              </p>
              <div className="mt-5 pt-3 border-t border-pink-100 flex items-center justify-between">
                <span className="text-xs text-rose-500 font-bold">Pour toujours & à jamais</span>
                <span className="font-handwriting text-xl text-[#BE123C] font-bold">Je t'aime infiniment ❤️</span>
              </div>
            </div>

            <button
              onClick={() => setShowSecretModal(false)}
              className="px-8 py-3 bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white font-retro text-base rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer border border-white/60"
            >
              Garder ce secret dans mon cœur 💗
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
