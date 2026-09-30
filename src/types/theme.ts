export type BackgroundThemeId = 'pink-retro-glow' | 'pink-dream' | 'night-kawaii';

export interface BackgroundTheme {
  id: BackgroundThemeId;
  name: string;
  subtitle: string;
  badge: string;
  bgGradient: string;
  textColor: string;
}

export const BACKGROUND_THEMES: Record<BackgroundThemeId, BackgroundTheme> = {
  'pink-retro-glow': {
    id: 'pink-retro-glow',
    name: 'Pink Retro Glow',
    subtitle: 'Rose pastel, halos lumineux & étoiles rétro',
    badge: '✨ Kawaii Rétro',
    bgGradient: 'from-[#FFF0F5] via-[#FFE4EC] to-[#FCE7F3]',
    textColor: '#4A3B43',
  },
  'pink-dream': {
    id: 'pink-dream',
    name: 'Pink Dream',
    subtitle: 'Nuages cotonneux & lueurs douces féeriques',
    badge: '🌸 Douceur Rêve',
    bgGradient: 'from-[#FFF5F7] via-[#FDF2F8] to-[#FFF1F2]',
    textColor: '#4A3B43',
  },
  'night-kawaii': {
    id: 'night-kawaii',
    name: 'Night Kawaii',
    subtitle: 'Nuit violette étoilée & halos scintillants',
    badge: '🌙 Nuit Étoilée',
    bgGradient: 'from-[#2A1124] via-[#3B1238] to-[#1F0D24]',
    textColor: '#FDF2F8',
  },
};

export interface DecorationSettings {
  sunflowers: boolean; // 🌻 Tournesols
  ladybugs: boolean;   // 🐞 Coccinelles
  flowers: boolean;    // 🌸 Fleurs
  crochet: boolean;    // 🧶 Crochet
  spiderLily: boolean; // 🌺 Spider Lily
  bows: boolean;       // 🎀 Nœuds Sanrio
  stars: boolean;      // ✨ Étoiles & Lueurs
  hearts: boolean;     // 💗 Cœurs flottants
}

export const DEFAULT_DECORATIONS: DecorationSettings = {
  sunflowers: true,
  ladybugs: true,
  flowers: true,
  crochet: true,
  spiderLily: true,
  bows: true,
  stars: true,
  hearts: true,
};
