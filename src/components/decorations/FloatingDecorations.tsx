import React from 'react';
import { DecorationSettings } from '../../types/theme';
import { HelloKittyBow } from './HelloKittyBow';
import { Ladybug } from './Ladybug';
import { Sunflower } from './Sunflower';
import { CrochetFlower } from './CrochetFlower';
import { SpiderLily } from './SpiderLily';

interface FloatingDecorationsProps {
  settings: DecorationSettings;
  isNight?: boolean;
}

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ settings, isNight = false }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* LAYER 1: ARRIÈRE-PLAN */}
      {settings.sunflowers && (
        <div className="absolute top-12 -left-12 opacity-20 filter blur-[1.5px] scale-125 animate-float-slow" style={{ animationDuration: '22s' }}>
          <Sunflower size={100} rotation={-20} />
        </div>
      )}
      {settings.spiderLily && (
        <div className="absolute bottom-16 -right-12 opacity-15 filter blur-[2px] scale-125 animate-float-slow" style={{ animationDuration: '26s', animationDelay: '3s' }}>
          <SpiderLily size={110} rotation={25} subtle={true} />
        </div>
      )}
      {settings.crochet && (
        <div className="absolute top-1/2 -left-10 opacity-20 filter blur-[1.5px] animate-float-slow" style={{ animationDuration: '24s', animationDelay: '1.5s' }}>
          <CrochetFlower size={80} color="#F472B6" />
        </div>
      )}

      {/* LAYER 2: PLAN INTERMÉDIAIRE */}
      {settings.sunflowers && (
        <div className="absolute top-[22%] -left-5 sm:left-2 opacity-50 sm:opacity-75 transition-opacity animate-float-slow" style={{ animationDuration: '14s' }}>
          <Sunflower size={64} rotation={-12} />
        </div>
      )}
      {settings.flowers && (
        <div className="absolute top-[52%] left-1 sm:left-4 opacity-50 sm:opacity-70 animate-float-slow" style={{ animationDuration: '17s', animationDelay: '2s' }}>
          <span className="text-3xl filter drop-shadow-sm">🌸</span>
        </div>
      )}
      {settings.crochet && (
        <div className="absolute top-[75%] -left-3 sm:left-3 opacity-55 sm:opacity-80 animate-float-slow" style={{ animationDuration: '16s', animationDelay: '4s' }}>
          <CrochetFlower size={52} color="#F9A8D4" />
        </div>
      )}

      {settings.bows && (
        <div className="absolute top-[20%] -right-4 sm:right-3 opacity-60 sm:opacity-85 animate-float-slow" style={{ animationDuration: '15s', animationDelay: '1s' }}>
          <HelloKittyBow size={52} />
        </div>
      )}
      {settings.spiderLily && (
        <div className="absolute top-[48%] -right-5 sm:right-2 opacity-45 sm:opacity-70 animate-float-slow" style={{ animationDuration: '18s', animationDelay: '3s' }}>
          <SpiderLily size={72} rotation={-25} subtle={true} />
        </div>
      )}
      {settings.ladybugs && (
        <div className="absolute top-[72%] right-2 sm:right-5 opacity-65 sm:opacity-90 animate-float-slow" style={{ animationDuration: '12s', animationDelay: '2.5s' }}>
          <Ladybug size={32} rotation={-15} />
        </div>
      )}

      {/* LAYER 3: PREMIER PLAN */}
      {settings.stars && (
        <>
          <div className="absolute top-10 left-[22%] text-pink-400 opacity-60 text-base animate-sparkle" style={{ animationDelay: '0.5s' }}>
            ✦
          </div>
          <div className="absolute top-14 right-[25%] text-amber-300 opacity-70 text-sm animate-sparkle" style={{ animationDelay: '1.2s' }}>
            ★
          </div>
          <div className="absolute top-[60%] left-[12%] text-pink-400 opacity-50 text-xs animate-sparkle" style={{ animationDelay: '2.4s' }}>
            ✧
          </div>
          <div className="absolute top-[82%] right-[18%] text-amber-200 opacity-60 text-base animate-sparkle" style={{ animationDelay: '1.8s' }}>
            ✦
          </div>
        </>
      )}

      {settings.hearts && (
        <>
          <div className="absolute top-[35%] left-[8%] text-rose-300 opacity-40 text-lg animate-float-slow" style={{ animationDuration: '13s', animationDelay: '1.5s' }}>
            💖
          </div>
          <div className="absolute top-[65%] right-[10%] text-pink-300 opacity-45 text-base animate-float-slow" style={{ animationDuration: '15s', animationDelay: '3.5s' }}>
            💗
          </div>
        </>
      )}
    </div>
  );
};
