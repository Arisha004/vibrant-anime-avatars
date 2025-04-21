
import { useState } from 'react';
import { hairStyles, eyeStyles, mouthStyles, skinTones } from '@/assets/avatarParts';

export const useAvatarCreator = () => {
  const [selectedHair, setSelectedHair] = useState(hairStyles[0].id);
  const [selectedEyes, setSelectedEyes] = useState(eyeStyles[0].id);
  const [selectedMouth, setSelectedMouth] = useState(mouthStyles[0].id);
  const [selectedSkin, setSelectedSkin] = useState(skinTones[0].id);
  const [avatarName, setAvatarName] = useState('');

  const getSelectedParts = () => ({
    hair: hairStyles.find(h => h.id === selectedHair),
    eyes: eyeStyles.find(e => e.id === selectedEyes),
    mouth: mouthStyles.find(m => m.id === selectedMouth),
    skin: skinTones.find(s => s.id === selectedSkin),
  });

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
    getSelectedParts,
  };
};
