export interface WheelItem {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  color: string;
  textColor: string;
  description: string;
  type: 'robux' | 'gage' | 'bonus' | 'custom';
}

export const INITIAL_WHEEL_ITEMS: WheelItem[] = [
  {
    id: 'robux-50',
    label: '50 Robux',
    sublabel: 'Roblox Treat',
    icon: '💰',
    color: '#FDA4AF',
    textColor: '#881337',
    description: 'Bravo Imane ! 50 Robux crédités pour t’offrir un super item ou skin mignon sur Roblox ! 🎮✨',
    type: 'robux',
  },
  {
    id: 'robux-100',
    label: '100 Robux',
    sublabel: 'Double Bonus',
    icon: '💰',
    color: '#FED7AA',
    textColor: '#7C2D12',
    description: 'Incroyable ! 100 Robux pour toi ! C’est l’heure du shopping kawaii dans Roblox ! 🎀🛍️',
    type: 'robux',
  },
  {
    id: 'robux-200',
    label: '200 Robux',
    sublabel: 'JACKPOT',
    icon: '💰',
    color: '#F472B6',
    textColor: '#831843',
    description: 'LE JACKPOT ROBUX ! 200 Robux tout neufs pour gâter ton avatar préféré ! Tu as une chance insolente ! 🍀✨',
    type: 'robux',
  },
  {
    id: 'gage-1',
    label: 'Un gage',
    sublabel: 'Fun & Rigolo',
    icon: '😈',
    color: '#FECDD3',
    textColor: '#9F1239',
    description: 'Oups un gage mignon ! Tu dois faire ta plus belle pose Hello Kitty ou miauler comme un petit chaton kawaii ! 🐱💖',
    type: 'gage',
  },
  {
    id: 'journee-oui',
    label: 'Journée OUI 🫠',
    sublabel: 'Avant mes 18 ans 🥲',
    icon: '🤝',
    color: '#DDD6FE',
    textColor: '#5B21B6',
    description: 'une journée ou je doit te dire oui 🥲🫠( utilisable avant mes 18ans )',
    type: 'bonus',
  },
];
