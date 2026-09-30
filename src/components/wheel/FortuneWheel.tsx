import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WheelItem, INITIAL_WHEEL_ITEMS } from './wheelData';
import { sounds } from '../../utils/audio';
import { Sparkles, Trophy, X, Plus, Trash2, RotateCw } from 'lucide-react';
import { HelloKittyBow } from '../decorations/HelloKittyBow';
import { Sunflower } from '../decorations/Sunflower';
import { Ladybug } from '../decorations/Ladybug';

export const FortuneWheel: React.FC = () => {
  const [items, setItems] = useState<WheelItem[]>(INITIAL_WHEEL_ITEMS);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WheelItem | null>(null);
  const [history, setHistory] = useState<{ item: WheelItem; timestamp: string }[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTickAngle = useRef(0);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;
    const numItems = items.length;
    const arcAngle = (2 * Math.PI) / numItems;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(255, 105, 180, 0.4)';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#F472B6';
    ctx.stroke();
    ctx.restore();

    items.forEach((item, i) => {
      const startAngle = i * arcAngle;
      const endAngle = (i + 1) * arcAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arcAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      ctx.font = '24px sans-serif';
      ctx.fillText(item.icon, radius - 20, 0);

      const fontSize = item.label.length > 13 ? 12 : item.label.length > 9 ? 13.5 : 15;
      ctx.font = `bold ${fontSize}px "Shrikhand", cursive, sans-serif`;
      ctx.fillStyle = item.textColor;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 4;
      ctx.fillText(item.label, radius - 52, 0);

      if (item.sublabel) {
        ctx.font = 'italic 9.5px "Fredoka", sans-serif';
        ctx.fillStyle = '#4A3B43';
        ctx.fillText(item.sublabel, radius - 52, 15);
      }

      ctx.restore();
      ctx.restore();
    });

    const dotCount = numItems * 3;
    for (let d = 0; d < dotCount; d++) {
      const dotAngle = (d * 2 * Math.PI) / dotCount;
      const dotX = centerX + Math.cos(dotAngle) * (radius - 2);
      const dotY = centerY + Math.sin(dotAngle) * (radius - 2);

      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = d % 2 === 0 ? '#FFFFFF' : '#FDE047';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#BE185D';
      ctx.stroke();
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FF1A75';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFF5F7';
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    drawWheel();
  }, [items]);

  const spinWheel = () => {
    if (isSpinning || items.length === 0) return;
    setIsSpinning(true);
    setSelectedItem(null);
    sounds.playSparkle();

    // 1. Choose the winning item first
    const targetIndex = Math.floor(Math.random() * items.length);
    const wonItem = items[targetIndex];

    const segmentAngle = 360 / items.length;
    // 2. Pick a safe angle inside the target slice (between 20% and 80%, avoiding borders)
    const targetAngleInSegment = targetIndex * segmentAngle + (0.2 + Math.random() * 0.6) * segmentAngle;
    
    // 3. Pointer is at 12 o'clock (270° on standard canvas). 
    // For targetAngleInSegment to reach 270°: targetAngleInSegment + rotation = 270 (mod 360)
    const targetMod = (((270 - targetAngleInSegment) % 360) + 360) % 360;

    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = (targetMod - currentMod) % 360;
    if (delta < 0) delta += 360;

    const fullSpins = (6 + Math.floor(Math.random() * 4)) * 360;
    const totalExtraRotation = fullSpins + delta;

    const startRot = rotation;
    const duration = 5200;
    const startTime = performance.now();

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRot = startRot + totalExtraRotation * easeOut;

      setRotation(currentRot);

      if (Math.abs(currentRot - lastTickAngle.current) > segmentAngle / 2) {
        sounds.playTick();
        lastTickAngle.current = currentRot;
      }

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        setSelectedItem(wonItem);
        sounds.playWin();

        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF1A75', '#FFD1DC', '#FBBF24', '#34D399', '#60A5FA'],
        });

        setHistory((prev) => [
          {
            item: wonItem,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev,
        ]);
      }
    };

    requestAnimationFrame(animateSpin);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemLabel.trim()) return;

    const colors = ['#FDA4AF', '#FED7AA', '#FBCFE8', '#FDE68A', '#DDD6FE', '#BAE6FD'];
    const randomColor = colors[items.length % colors.length];

    const newItem: WheelItem = {
      id: `custom-${Date.now()}`,
      label: newItemLabel.trim(),
      sublabel: 'Surprise Imane',
      icon: '🎁',
      color: randomColor,
      textColor: '#881337',
      description: newItemDesc.trim() || `Un cadeau d'anniversaire spécial : ${newItemLabel} ! 🎉`,
      type: 'custom',
    };

    setItems([...items, newItem]);
    setNewItemLabel('');
    setNewItemDesc('');
    sounds.playSparkle();
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 2) {
      return;
    }
    setItems(items.filter((item) => item.id !== id));
    sounds.playSparkle();
  };

  return (
    <section id="wheel-section" className="relative py-12 px-4 max-w-4xl mx-auto select-none">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-[#BE185D] text-xs font-retro tracking-wide shadow-xs border border-pink-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Roue de la Chance Sanrio Edition</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-retro text-[#881337] tracking-wide">
          Tourne la Roue des Cadeaux ! 🎡
        </h2>
        <p className="text-xs sm:text-sm text-[#9D4C6C] mt-2 font-medium">
          Robux, gages mignons ou douceurs... Qu'a réservé le destin pour ton anniversaire ?
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative p-4 sm:p-8 bg-white/80 backdrop-blur-md rounded-[48px] shadow-2xl shadow-pink-200/50 crochet-border border-4 border-white flex flex-col items-center">
          <div className="absolute -top-6 -left-6 filter drop-shadow-md">
            <Sunflower size={56} rotation={-15} />
          </div>
          <div className="absolute -bottom-5 -right-5 filter drop-shadow-md">
            <Ladybug size={38} rotation={25} />
          </div>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute -top-3 z-30 flex flex-col items-center filter drop-shadow-lg">
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[34px] border-t-[#FF1A75]"></div>
              <div className="w-4 h-4 rounded-full bg-white border-2 border-[#FF1A75] -mt-7"></div>
            </div>

            <div
              className="relative rounded-full overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'none' : 'transform 0.5s ease-out',
              }}
            >
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] cursor-pointer"
                onClick={spinWheel}
              />
            </div>

            <div className="absolute pointer-events-none z-20">
              <HelloKittyBow size={42} className="filter drop-shadow-md" />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`px-8 py-3.5 rounded-full font-retro text-lg sm:text-xl tracking-wider text-white shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer border-2 border-white ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-[#FF1A66] via-[#F43F5E] to-[#FB7185] hover:from-[#E11D48] hover:to-[#FF1A66] active:scale-95 animate-pulse-gentle shadow-pink-400/50 hover:shadow-xl'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'La roue tourne...' : 'LANCER LA ROUE ! 🎀'}</span>
            </button>

            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-4 py-2 rounded-full font-cute font-semibold text-xs text-[#BE185D] bg-pink-100/80 hover:bg-pink-200/90 border border-pink-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{showConfig ? 'Masquer options' : '⚙️ Personnaliser la roue'}</span>
            </button>
          </div>
        </div>

        {showConfig && (
          <div className="w-full max-w-lg mt-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-pink-200 shadow-lg animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-retro text-lg text-[#881337]">Gérer les cases de la roue</h4>
              <button
                onClick={() => setShowConfig(false)}
                className="p-1 rounded-full text-pink-400 hover:bg-pink-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto mb-4 pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-pink-50/70 border border-pink-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="font-bold text-[#881337]">{item.label}</span>
                    <span className="text-[10px] text-[#9D4C6C] italic">{item.sublabel}</span>
                  </div>
                  {items.length > 2 && (
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-rose-500 hover:bg-rose-100 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddItem} className="space-y-2 pt-2 border-t border-pink-200">
              <p className="text-xs font-semibold text-[#881337]">Ajouter une récompense personnalisée :</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nom (ex: Câlin, 500 Robux...)"
                  value={newItemLabel}
                  onChange={(e) => setNewItemLabel(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-pink-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#FF1A75] text-white rounded-xl text-xs font-bold hover:bg-[#E11D48] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {history.length > 0 && (
          <div className="w-full max-w-lg mt-6 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-pink-200 text-xs">
            <span className="font-bold text-[#881337] flex items-center gap-1.5 mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Historique des gains de la session :</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {history.slice(0, 6).map((h, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-pink-100 text-[#881337] border border-pink-200 text-[11px] font-medium"
                >
                  {h.item.icon} {h.item.label} ({h.timestamp})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-[#FFF8FA] rounded-[36px] p-6 sm:p-8 max-w-md w-full text-center shadow-2xl crochet-border relative overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-white">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-5xl sm:text-6xl mb-3 animate-bounce">{selectedItem.icon}</div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-retro uppercase mb-2">
              <span>🎉 Félicitations Imane !</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-retro text-[#881337] mb-2 tracking-wide">
              {selectedItem.label}
            </h3>

            <div className="p-4 bg-white/90 rounded-2xl border border-pink-200 shadow-inner mb-6 text-sm text-[#4A3B43] leading-relaxed">
              {selectedItem.description}
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="px-8 py-3 bg-gradient-to-r from-[#FF1A75] to-[#F43F5E] text-white font-retro text-base rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer border border-white/80"
            >
              Youpii ! Merci ! 💗
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
