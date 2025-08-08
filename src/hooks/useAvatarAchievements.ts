import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward?: {
    type: 'part' | 'background' | 'accessory';
    itemId: string;
  };
}

export const useAvatarAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedParts, setUnlockedParts] = useState<string[]>([]);

  const defaultAchievements: Achievement[] = [
    {
      id: 'first_avatar',
      title: 'First Creation',
      description: 'Create your first avatar',
      icon: '🎨',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: { type: 'accessory', itemId: 'crown' }
    },
    {
      id: 'avatar_master',
      title: 'Avatar Master',
      description: 'Create 10 different avatars',
      icon: '👑',
      unlocked: false,
      progress: 0,
      maxProgress: 10,
      reward: { type: 'part', itemId: 'legendary_hair' }
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Share 5 avatars with friends',
      icon: '🦋',
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      reward: { type: 'background', itemId: 'rainbow_bg' }
    },
    {
      id: 'battle_champion',
      title: 'Battle Champion',
      description: 'Win 20 avatar battles',
      icon: '⚔️',
      unlocked: false,
      progress: 0,
      maxProgress: 20,
      reward: { type: 'accessory', itemId: 'champion_medal' }
    },
    {
      id: 'daily_creator',
      title: 'Daily Creator',
      description: 'Create avatars for 7 consecutive days',
      icon: '📅',
      unlocked: false,
      progress: 0,
      maxProgress: 7,
      reward: { type: 'part', itemId: 'special_eyes' }
    },
    {
      id: 'style_explorer',
      title: 'Style Explorer',
      description: 'Use every available hair style',
      icon: '💇',
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      reward: { type: 'part', itemId: 'rainbow_hair' }
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('avatar-achievements');
    if (saved) {
      setAchievements(JSON.parse(saved));
    } else {
      setAchievements(defaultAchievements);
    }

    const unlockedItems = localStorage.getItem('unlocked-parts');
    if (unlockedItems) {
      setUnlockedParts(JSON.parse(unlockedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('avatar-achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('unlocked-parts', JSON.stringify(unlockedParts));
  }, [unlockedParts]);

  const updateProgress = (achievementId: string, increment: number = 1) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        const newProgress = Math.min(achievement.progress + increment, achievement.maxProgress);
        const unlocked = newProgress >= achievement.maxProgress;
        
        if (unlocked && achievement.reward) {
          setUnlockedParts(prev => [...prev, achievement.reward!.itemId]);
        }
        
        return { ...achievement, progress: newProgress, unlocked };
      }
      return achievement;
    }));
  };

  const checkAvatarCreated = () => updateProgress('first_avatar');
  const checkAvatarMaster = () => updateProgress('avatar_master');
  const checkSocialSharing = () => updateProgress('social_butterfly');
  const checkBattleWin = () => updateProgress('battle_champion');
  const checkDailyCreation = () => updateProgress('daily_creator');
  const checkStyleUsage = (styleId: string) => {
    // Track unique styles used
    const usedStyles = JSON.parse(localStorage.getItem('used-styles') || '[]');
    if (!usedStyles.includes(styleId)) {
      usedStyles.push(styleId);
      localStorage.setItem('used-styles', JSON.stringify(usedStyles));
      updateProgress('style_explorer', 1);
    }
  };

  return {
    achievements,
    unlockedParts,
    updateProgress,
    checkAvatarCreated,
    checkAvatarMaster,
    checkSocialSharing,
    checkBattleWin,
    checkDailyCreation,
    checkStyleUsage,
  };
};