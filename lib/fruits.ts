export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical';
export type FruitType = 'Natural' | 'Elemental' | 'Beast';
export type Trend = 'up' | 'stable' | 'down';

export interface Fruit {
  id: string;
  name: string;
  rarity: Rarity;
  type: FruitType;
  physicalValue: number;
  permanentValue: number;
  beliPrice: number;
  robuxPrice: number;
  demand: number; // 1-10
  trend: Trend;
  emoji: string;
  awakened?: boolean;
}

export const RARITY_COLORS: Record<Rarity, { bg: string; border: string; text: string; glow: string }> = {
  Common: { bg: '#64748b15', border: '#64748b40', text: '#94a3b8', glow: '#64748b' },
  Uncommon: { bg: '#10b98115', border: '#10b98140', text: '#10b981', glow: '#10b981' },
  Rare: { bg: '#3b82f615', border: '#3b82f640', text: '#3b82f6', glow: '#3b82f6' },
  Legendary: { bg: '#8b5cf615', border: '#8b5cf640', text: '#a78bfa', glow: '#8b5cf6' },
  Mythical: { bg: '#f59e0b15', border: '#f59e0b40', text: '#fbbf24', glow: '#f59e0b' },
};

export const TYPE_COLORS: Record<FruitType, string> = {
  Natural: '#3b82f6',
  Elemental: '#f59e0b',
  Beast: '#ec4899',
};

export const FRUITS: Fruit[] = [
  // Common
  { id: 'rocket', name: 'Rocket', rarity: 'Common', type: 'Natural', physicalValue: 5000, permanentValue: 5000, beliPrice: 5000, robuxPrice: 50, demand: 1, trend: 'stable', emoji: '🚀' },
  { id: 'spin', name: 'Spin', rarity: 'Common', type: 'Natural', physicalValue: 7500, permanentValue: 7500, beliPrice: 7500, robuxPrice: 75, demand: 1, trend: 'stable', emoji: '🌀' },
  { id: 'blade', name: 'Blade', rarity: 'Common', type: 'Natural', physicalValue: 30000, permanentValue: 30000, beliPrice: 30000, robuxPrice: 100, demand: 1, trend: 'stable', emoji: '⚔️' },
  { id: 'spring', name: 'Spring', rarity: 'Common', type: 'Natural', physicalValue: 60000, permanentValue: 60000, beliPrice: 60000, robuxPrice: 180, demand: 1, trend: 'stable', emoji: '🪀' },
  { id: 'bomb', name: 'Bomb', rarity: 'Common', type: 'Natural', physicalValue: 5000, permanentValue: 5000, beliPrice: 5000, robuxPrice: 50, demand: 2, trend: 'stable', emoji: '💣' },
  { id: 'smoke', name: 'Smoke', rarity: 'Common', type: 'Elemental', physicalValue: 100000, permanentValue: 100000, beliPrice: 100000, robuxPrice: 250, demand: 2, trend: 'stable', emoji: '💨' },
  { id: 'spike', name: 'Spike', rarity: 'Common', type: 'Natural', physicalValue: 7500, permanentValue: 7500, beliPrice: 7500, robuxPrice: 75, demand: 1, trend: 'stable', emoji: '🌵' },
  { id: 'chop', name: 'Chop', rarity: 'Common', type: 'Natural', physicalValue: 30000, permanentValue: 30000, beliPrice: 30000, robuxPrice: 100, demand: 2, trend: 'stable', emoji: '✂️' },

  // Uncommon
  { id: 'flame', name: 'Flame', rarity: 'Uncommon', type: 'Elemental', physicalValue: 250000, permanentValue: 5000000, beliPrice: 250000, robuxPrice: 550, demand: 4, trend: 'up', emoji: '🔥', awakened: true },
  { id: 'ice', name: 'Ice', rarity: 'Uncommon', type: 'Elemental', physicalValue: 350000, permanentValue: 8000000, beliPrice: 350000, robuxPrice: 750, demand: 4, trend: 'stable', emoji: '❄️', awakened: true },
  { id: 'sand', name: 'Sand', rarity: 'Uncommon', type: 'Elemental', physicalValue: 420000, permanentValue: 6000000, beliPrice: 420000, robuxPrice: 850, demand: 3, trend: 'stable', emoji: '🏜️' },
  { id: 'dark', name: 'Dark', rarity: 'Uncommon', type: 'Elemental', physicalValue: 500000, permanentValue: 10000000, beliPrice: 500000, robuxPrice: 950, demand: 3, trend: 'down', emoji: '🌑', awakened: true },
  { id: 'diamond', name: 'Diamond', rarity: 'Uncommon', type: 'Natural', physicalValue: 600000, permanentValue: 7500000, beliPrice: 600000, robuxPrice: 1000, demand: 3, trend: 'stable', emoji: '💎' },
  { id: 'falcon', name: 'Falcon', rarity: 'Uncommon', type: 'Beast', physicalValue: 750000, permanentValue: 9000000, beliPrice: 750000, robuxPrice: 1100, demand: 3, trend: 'stable', emoji: '🦅' },

  // Rare
  { id: 'light', name: 'Light', rarity: 'Rare', type: 'Elemental', physicalValue: 650000, permanentValue: 17500000, beliPrice: 650000, robuxPrice: 1100, demand: 6, trend: 'up', emoji: '✨', awakened: true },
  { id: 'rubber', name: 'Rubber', rarity: 'Rare', type: 'Natural', physicalValue: 750000, permanentValue: 12500000, beliPrice: 750000, robuxPrice: 1200, demand: 5, trend: 'stable', emoji: '🎈' },
  { id: 'barrier', name: 'Barrier', rarity: 'Rare', type: 'Natural', physicalValue: 800000, permanentValue: 14000000, beliPrice: 800000, robuxPrice: 1250, demand: 5, trend: 'stable', emoji: '🛡️' },
  { id: 'magma', name: 'Magma', rarity: 'Rare', type: 'Elemental', physicalValue: 850000, permanentValue: 16000000, beliPrice: 850000, robuxPrice: 1300, demand: 6, trend: 'up', emoji: '🌋' },
  { id: 'ghost', name: 'Ghost', rarity: 'Rare', type: 'Natural', physicalValue: 950000, permanentValue: 18000000, beliPrice: 950000, robuxPrice: 1400, demand: 5, trend: 'stable', emoji: '👻' },

  // Legendary
  { id: 'quake', name: 'Quake', rarity: 'Legendary', type: 'Natural', physicalValue: 1000000, permanentValue: 25000000, beliPrice: 1000000, robuxPrice: 1500, demand: 6, trend: 'stable', emoji: '🌐', awakened: true },
  { id: 'buddha', name: 'Buddha', rarity: 'Legendary', type: 'Beast', physicalValue: 8000000, permanentValue: 330000000, beliPrice: 1200000, robuxPrice: 1650, demand: 9, trend: 'up', emoji: '🧘' },
  { id: 'love', name: 'Love', rarity: 'Legendary', type: 'Natural', physicalValue: 1300000, permanentValue: 35000000, beliPrice: 1300000, robuxPrice: 1700, demand: 5, trend: 'stable', emoji: '💗' },
  { id: 'spider', name: 'Spider', rarity: 'Legendary', type: 'Natural', physicalValue: 1400000, permanentValue: 40000000, beliPrice: 1400000, robuxPrice: 1750, demand: 6, trend: 'stable', emoji: '🕷️' },
  { id: 'sound', name: 'Sound', rarity: 'Legendary', type: 'Natural', physicalValue: 1450000, permanentValue: 42500000, beliPrice: 1450000, robuxPrice: 1780, demand: 6, trend: 'up', emoji: '🔊' },
  { id: 'string', name: 'String', rarity: 'Legendary', type: 'Natural', physicalValue: 1500000, permanentValue: 45000000, beliPrice: 1500000, robuxPrice: 1800, demand: 5, trend: 'stable', emoji: '🧵', awakened: true },
  { id: 'phoenix', name: 'Phoenix', rarity: 'Legendary', type: 'Beast', physicalValue: 1800000, permanentValue: 65000000, beliPrice: 1800000, robuxPrice: 2000, demand: 7, trend: 'up', emoji: '🦅' },
  { id: 'pain', name: 'Pain', rarity: 'Legendary', type: 'Natural', physicalValue: 1900000, permanentValue: 70000000, beliPrice: 1900000, robuxPrice: 2050, demand: 6, trend: 'stable', emoji: '⚡' },
  { id: 'blizzard', name: 'Blizzard', rarity: 'Legendary', type: 'Elemental', physicalValue: 2000000, permanentValue: 80000000, beliPrice: 2000000, robuxPrice: 2080, demand: 6, trend: 'up', emoji: '🌨️' },
  { id: 'rumble', name: 'Rumble', rarity: 'Legendary', type: 'Elemental', physicalValue: 2100000, permanentValue: 90000000, beliPrice: 2100000, robuxPrice: 2100, demand: 7, trend: 'up', emoji: '⚡', awakened: true },
  { id: 'portal', name: 'Portal', rarity: 'Legendary', type: 'Natural', physicalValue: 2200000, permanentValue: 110000000, beliPrice: 2200000, robuxPrice: 2150, demand: 8, trend: 'up', emoji: '🌀' },

  // Mythical
  { id: 'paw', name: 'Paw', rarity: 'Mythical', type: 'Natural', physicalValue: 2300000, permanentValue: 120000000, beliPrice: 2300000, robuxPrice: 2200, demand: 7, trend: 'stable', emoji: '🐾' },
  { id: 'gravity', name: 'Gravity', rarity: 'Mythical', type: 'Natural', physicalValue: 2500000, permanentValue: 140000000, beliPrice: 2500000, robuxPrice: 2300, demand: 6, trend: 'stable', emoji: '🌌' },
  { id: 'dough', name: 'Dough', rarity: 'Mythical', type: 'Natural', physicalValue: 25000000, permanentValue: 450000000, beliPrice: 2800000, robuxPrice: 2400, demand: 10, trend: 'up', emoji: '🥖' },
  { id: 'shadow', name: 'Shadow', rarity: 'Mythical', type: 'Natural', physicalValue: 2900000, permanentValue: 240000000, beliPrice: 2900000, robuxPrice: 2450, demand: 7, trend: 'stable', emoji: '🌚' },
  { id: 'venom', name: 'Venom', rarity: 'Mythical', type: 'Natural', physicalValue: 3000000, permanentValue: 280000000, beliPrice: 3000000, robuxPrice: 2480, demand: 8, trend: 'stable', emoji: '🐍' },
  { id: 'control', name: 'Control', rarity: 'Mythical', type: 'Natural', physicalValue: 3200000, permanentValue: 320000000, beliPrice: 3200000, robuxPrice: 2500, demand: 8, trend: 'up', emoji: '🎮' },
  { id: 'spirit', name: 'Spirit', rarity: 'Mythical', type: 'Natural', physicalValue: 10000000, permanentValue: 460000000, beliPrice: 3400000, robuxPrice: 2550, demand: 9, trend: 'stable', emoji: '👻' },
  { id: 'dragon', name: 'Dragon', rarity: 'Mythical', type: 'Beast', physicalValue: 180000000, permanentValue: 900000000, beliPrice: 3500000, robuxPrice: 2600, demand: 10, trend: 'up', emoji: '🐲' },
  { id: 'mammoth', name: 'Mammoth', rarity: 'Mythical', type: 'Beast', physicalValue: 30000000, permanentValue: 350000000, beliPrice: 4500000, robuxPrice: 2700, demand: 8, trend: 'stable', emoji: '🦣' },
  { id: 'trex', name: 'T-Rex', rarity: 'Mythical', type: 'Beast', physicalValue: 40000000, permanentValue: 400000000, beliPrice: 5000000, robuxPrice: 2800, demand: 9, trend: 'up', emoji: '🦖' },
  { id: 'leopard', name: 'Leopard / Tiger', rarity: 'Mythical', type: 'Beast', physicalValue: 40000000, permanentValue: 525000000, beliPrice: 5000000, robuxPrice: 3000, demand: 9, trend: 'up', emoji: '🐅' },
  { id: 'kitsune', name: 'Kitsune', rarity: 'Mythical', type: 'Beast', physicalValue: 130000000, permanentValue: 720000000, beliPrice: 6000000, robuxPrice: 3500, demand: 10, trend: 'up', emoji: '🦊' },
  { id: 'west-dragon', name: 'West Dragon', rarity: 'Mythical', type: 'Beast', physicalValue: 450000000, permanentValue: 1350000000, beliPrice: 8000000, robuxPrice: 4000, demand: 10, trend: 'up', emoji: '🐉' },
  { id: 'east-dragon', name: 'East Dragon', rarity: 'Mythical', type: 'Beast', physicalValue: 465000000, permanentValue: 1350000000, beliPrice: 8000000, robuxPrice: 4000, demand: 10, trend: 'up', emoji: '🐲' },
];

export function formatValue(num: number): string {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}