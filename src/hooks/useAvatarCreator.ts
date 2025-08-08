import { useState, useEffect } from 'react';
import { hairStyles, eyeStyles, mouthStyles, skinTones } from '@/assets/avatarParts';

// Saved avatars storage key
const SAVED_AVATARS_KEY = 'animeAvatars_savedAvatars';

export interface CreatedAvatar {
  id: string;
  name: string;
  hair: string;
  eyes: string;
  mouth: string;
  skin: string;
  createdAt: string;
  imageDataUrl?: string;
}

export const useAvatarCreator = () => {
  const [selectedHair, setSelectedHair] = useState(hairStyles[0].id);
  const [selectedEyes, setSelectedEyes] = useState(eyeStyles[0].id);
  const [selectedMouth, setSelectedMouth] = useState(mouthStyles[0].id);
  const [selectedSkin, setSelectedSkin] = useState(skinTones[0].id);
  const [avatarName, setAvatarName] = useState('');
  const [savedAvatars, setSavedAvatars] = useState<CreatedAvatar[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // Load saved avatars from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_AVATARS_KEY);
    if (saved) {
      try {
        setSavedAvatars(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved avatars:', error);
      }
    }
  }, []);

  // Save avatars to localStorage whenever savedAvatars changes
  useEffect(() => {
    localStorage.setItem(SAVED_AVATARS_KEY, JSON.stringify(savedAvatars));
  }, [savedAvatars]);

  const getSelectedParts = () => ({
    hair: hairStyles.find(h => h.id === selectedHair),
    eyes: eyeStyles.find(e => e.id === selectedEyes),
    mouth: mouthStyles.find(m => m.id === selectedMouth),
    skin: skinTones.find(s => s.id === selectedSkin),
  });

  const createAvatar = async (): Promise<CreatedAvatar> => {
    setIsCreating(true);
    
    try {
      // Simulate avatar creation process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAvatar: CreatedAvatar = {
        id: `avatar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: avatarName || `Avatar ${savedAvatars.length + 1}`,
        hair: selectedHair,
        eyes: selectedEyes,
        mouth: selectedMouth,
        skin: selectedSkin,
        createdAt: new Date().toISOString(),
      };

      // Add to saved avatars
      setSavedAvatars(prev => [newAvatar, ...prev]);
      
      // Trigger achievements
      const achievements = JSON.parse(localStorage.getItem('avatar-achievements') || '[]');
      if (achievements.length === 0) {
        // Initialize achievements if none exist
        const defaultAchievements = [
          { id: 'first_avatar', title: 'First Creation', description: 'Create your first avatar', icon: '🎨', unlocked: false, progress: 0, maxProgress: 1, reward: { type: 'accessory', itemId: 'crown' } },
          { id: 'avatar_master', title: 'Avatar Master', description: 'Create 10 different avatars', icon: '👑', unlocked: false, progress: 0, maxProgress: 10, reward: { type: 'part', itemId: 'legendary_hair' } },
        ];
        localStorage.setItem('avatar-achievements', JSON.stringify(defaultAchievements));
      } else {
        const updatedAchievements = achievements.map((achievement: any) => {
          if (achievement.id === 'first_avatar' && !achievement.unlocked) {
            return { ...achievement, progress: 1, unlocked: true };
          }
          if (achievement.id === 'avatar_master' && !achievement.unlocked) {
            return { ...achievement, progress: Math.min(achievement.progress + 1, achievement.maxProgress), unlocked: achievement.progress + 1 >= achievement.maxProgress };
          }
          return achievement;
        });
        localStorage.setItem('avatar-achievements', JSON.stringify(updatedAchievements));
      }
      
      return newAvatar;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteAvatar = (avatarId: string) => {
    setSavedAvatars(prev => prev.filter(avatar => avatar.id !== avatarId));
  };

  const randomizeAvatar = () => {
    setSelectedHair(hairStyles[Math.floor(Math.random() * hairStyles.length)].id);
    setSelectedEyes(eyeStyles[Math.floor(Math.random() * eyeStyles.length)].id);
    setSelectedMouth(mouthStyles[Math.floor(Math.random() * mouthStyles.length)].id);
    setSelectedSkin(skinTones[Math.floor(Math.random() * skinTones.length)].id);
  };

  const resetAvatar = () => {
    setSelectedHair(hairStyles[0].id);
    setSelectedEyes(eyeStyles[0].id);
    setSelectedMouth(mouthStyles[0].id);
    setSelectedSkin(skinTones[0].id);
    setAvatarName('');
  };

  const shareAvatar = async (avatar: CreatedAvatar): Promise<boolean> => {
    const shareData = {
      title: `Check out my anime avatar: ${avatar.name}`,
      text: `I created this awesome anime avatar using AnimeAvatars!`,
      url: `${window.location.origin}/avatar/${avatar.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (error) {
        if (error.name === 'AbortError') {
          return false;
        }
        // Fallback to clipboard
        return copyShareLink(shareData.url);
      }
    } else {
      return copyShareLink(shareData.url);
    }
  };

  const copyShareLink = async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  const downloadAvatar = (avatar: CreatedAvatar) => {
    // Create avatar representation as data URL with actual avatar parts
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const selectedSkinTone = skinTones.find(s => s.id === avatar.skin);
      const selectedHair = hairStyles.find(h => h.id === avatar.hair);
      const selectedEyes = eyeStyles.find(e => e.id === avatar.eyes);
      const selectedMouth = mouthStyles.find(m => m.id === avatar.mouth);
      
      // Background gradient
      const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
      gradient.addColorStop(0, '#f8f9fa');
      gradient.addColorStop(1, '#e9ecef');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 400);
      
      // Face (base skin tone)
      ctx.fillStyle = selectedSkinTone?.color || '#FFDBAC';
      ctx.beginPath();
      ctx.arc(200, 200, 160, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add border to face
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      // Avatar details text
      ctx.fillStyle = '#2d3748';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(avatar.name, 200, 50);
      
      // Avatar features text
      ctx.font = '16px Arial';
      ctx.fillStyle = '#4a5568';
      const features = [
        `Hair: ${selectedHair?.name || 'Default'}`,
        `Eyes: ${selectedEyes?.name || 'Default'}`,
        `Mouth: ${selectedMouth?.name || 'Default'}`,
        `Skin: ${selectedSkinTone?.name || 'Default'}`
      ];
      
      features.forEach((feature, index) => {
        ctx.fillText(feature, 200, 380 + (index * 20));
      });
      
      // Add avatar initial in center
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(avatar.name.charAt(0).toUpperCase(), 200, 220);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${avatar.name.replace(/\s+/g, '_')}_avatar.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return {
    selectedHair,
    setSelectedHair,
    selectedEyes,
    setSelectedEyes,
    selectedMouth,
    setSelectedMouth,
    selectedSkin,
    setSelectedSkin,
    avatarName,
    setAvatarName,
    savedAvatars,
    isCreating,
    getSelectedParts,
    createAvatar,
    deleteAvatar,
    randomizeAvatar,
    resetAvatar,
    shareAvatar,
    downloadAvatar,
  };
};