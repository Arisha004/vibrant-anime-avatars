import { useState, useEffect } from 'react';

export interface AvatarStats {
  power: number;
  creativity: number;
  charm: number;
  rarity: number;
  level: number;
  experience: number;
}

export interface BattleAvatar {
  id: string;
  name: string;
  hair: string;
  eyes: string;
  mouth: string;
  skin: string;
  stats: AvatarStats;
  wins: number;
  losses: number;
  personality: string[];
}

export interface Battle {
  id: string;
  avatar1: BattleAvatar;
  avatar2: BattleAvatar;
  winner?: string;
  battleType: 'power' | 'creativity' | 'charm';
  timestamp: string;
}

export const useAvatarBattle = () => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomStats = (): AvatarStats => ({
    power: Math.floor(Math.random() * 100) + 1,
    creativity: Math.floor(Math.random() * 100) + 1,
    charm: Math.floor(Math.random() * 100) + 1,
    rarity: Math.floor(Math.random() * 100) + 1,
    level: Math.floor(Math.random() * 50) + 1,
    experience: Math.floor(Math.random() * 1000),
  });

  const generatePersonality = (): string[] => {
    const traits = ['Brave', 'Creative', 'Mysterious', 'Cheerful', 'Wise', 'Playful', 'Noble', 'Fierce'];
    const numTraits = Math.floor(Math.random() * 3) + 2;
    return traits.sort(() => 0.5 - Math.random()).slice(0, numTraits);
  };

  const calculateBattleResult = (avatar1: BattleAvatar, avatar2: BattleAvatar, battleType: Battle['battleType']): string => {
    let score1: number, score2: number;
    
    switch (battleType) {
      case 'power':
        score1 = avatar1.stats.power + avatar1.stats.level * 2;
        score2 = avatar2.stats.power + avatar2.stats.level * 2;
        break;
      case 'creativity':
        score1 = avatar1.stats.creativity + avatar1.stats.rarity;
        score2 = avatar2.stats.creativity + avatar2.stats.rarity;
        break;
      case 'charm':
        score1 = avatar1.stats.charm + avatar1.personality.length * 10;
        score2 = avatar2.stats.charm + avatar2.personality.length * 10;
        break;
      default:
        score1 = Object.values(avatar1.stats).reduce((a, b) => a + b, 0);
        score2 = Object.values(avatar2.stats).reduce((a, b) => a + b, 0);
    }

    return score1 > score2 ? avatar1.id : avatar2.id;
  };

  const startBattle = async (avatar1: BattleAvatar, avatar2: BattleAvatar, battleType: Battle['battleType']): Promise<Battle> => {
    setIsLoading(true);
    
    // Simulate battle calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const winner = calculateBattleResult(avatar1, avatar2, battleType);
    
    const battle: Battle = {
      id: Date.now().toString(),
      avatar1,
      avatar2,
      winner,
      battleType,
      timestamp: new Date().toISOString(),
    };

    setBattles(prev => [battle, ...prev]);
    setIsLoading(false);
    
    return battle;
  };

  return {
    battles,
    isLoading,
    startBattle,
    generateRandomStats,
    generatePersonality,
  };
};