import { useState, useEffect } from 'react';

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'creation' | 'battle' | 'social' | 'exploration';
  requirements: {
    [key: string]: any;
  };
  reward: {
    type: 'experience' | 'part' | 'background' | 'currency';
    amount: number;
    itemId?: string;
  };
  completed: boolean;
  progress: number;
  maxProgress: number;
  expiresAt: string;
}

export const useDailyChallenges = () => {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [streak, setStreak] = useState(0);

  const generateDailyChallenges = (): DailyChallenge[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const challengeTemplates = [
      {
        id: 'daily_creator',
        title: 'Daily Creator',
        description: 'Create 3 unique avatars today',
        type: 'creation' as const,
        requirements: { avatarsToCreate: 3 },
        reward: { type: 'experience' as const, amount: 100 },
        maxProgress: 3,
      },
      {
        id: 'style_master',
        title: 'Style Master',
        description: 'Use a different hair style than yesterday',
        type: 'creation' as const,
        requirements: { newHairStyle: true },
        reward: { type: 'part' as const, amount: 1, itemId: 'mystery_hair' },
        maxProgress: 1,
      },
      {
        id: 'battle_warrior',
        title: 'Battle Warrior',
        description: 'Win 5 avatar battles',
        type: 'battle' as const,
        requirements: { battlesToWin: 5 },
        reward: { type: 'currency' as const, amount: 50 },
        maxProgress: 5,
      },
      {
        id: 'social_star',
        title: 'Social Star',
        description: 'Share 2 avatars with the community',
        type: 'social' as const,
        requirements: { sharesToMake: 2 },
        reward: { type: 'background' as const, amount: 1, itemId: 'star_bg' },
        maxProgress: 2,
      },
      {
        id: 'explorer',
        title: 'Explorer',
        description: 'View 10 different community avatars',
        type: 'exploration' as const,
        requirements: { avatarsToView: 10 },
        reward: { type: 'experience' as const, amount: 75 },
        maxProgress: 10,
      },
    ];

    // Select 3 random challenges for today
    const selectedTemplates = challengeTemplates
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return selectedTemplates.map(template => ({
      ...template,
      completed: false,
      progress: 0,
      expiresAt: tomorrow.toISOString(),
    }));
  };

  useEffect(() => {
    const savedChallenges = localStorage.getItem('daily-challenges');
    const savedStreak = localStorage.getItem('daily-streak');
    const lastChallengeDate = localStorage.getItem('last-challenge-date');
    
    const today = new Date().toDateString();
    
    if (savedChallenges && lastChallengeDate === today) {
      setChallenges(JSON.parse(savedChallenges));
    } else {
      // Generate new challenges for today
      const newChallenges = generateDailyChallenges();
      setChallenges(newChallenges);
      localStorage.setItem('daily-challenges', JSON.stringify(newChallenges));
      localStorage.setItem('last-challenge-date', today);
    }

    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  const updateChallengeProgress = (challengeId: string, increment: number = 1) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        const newProgress = Math.min(challenge.progress + increment, challenge.maxProgress);
        const completed = newProgress >= challenge.maxProgress;
        
        if (completed) {
          // Update streak if this is the last challenge completed today
          const otherChallenges = prev.filter(c => c.id !== challengeId);
          const allCompleted = otherChallenges.every(c => c.completed);
          
          if (allCompleted) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            localStorage.setItem('daily-streak', newStreak.toString());
          }
        }
        
        return { ...challenge, progress: newProgress, completed };
      }
      return challenge;
    }));
  };

  const getCompletionPercentage = () => {
    if (challenges.length === 0) return 0;
    const completed = challenges.filter(c => c.completed).length;
    return (completed / challenges.length) * 100;
  };

  useEffect(() => {
    localStorage.setItem('daily-challenges', JSON.stringify(challenges));
  }, [challenges]);

  return {
    challenges,
    streak,
    updateChallengeProgress,
    getCompletionPercentage,
  };
};