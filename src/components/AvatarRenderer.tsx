import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { hairStyles, eyeStyles, mouthStyles, skinTones } from '@/assets/avatarParts';

interface AvatarRendererProps {
  hair: string;
  eyes: string;
  mouth: string;
  skin: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  name?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24', 
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

const AvatarRenderer = ({ 
  hair, 
  eyes, 
  mouth, 
  skin, 
  size = 'md', 
  className,
  name 
}: AvatarRendererProps) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const selectedSkin = skinTones.find(s => s.id === skin);
  const selectedHair = hairStyles.find(h => h.id === hair);
  const selectedEyes = eyeStyles.find(e => e.id === eyes);
  const selectedMouth = mouthStyles.find(m => m.id === mouth);

  const handleImageError = (partType: string) => {
    setImageErrors(prev => ({ ...prev, [partType]: true }));
  };

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10",
      sizeClasses[size],
      className
    )}>
      {/* Base face/skin */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: selectedSkin?.color || '#FFDBAC' }}
      />
      
      {/* Hair Layer */}
      {selectedHair && !imageErrors.hair && (
        <img
          src={selectedHair.imageUrl}
          alt={selectedHair.name}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          onError={() => handleImageError('hair')}
          style={{ zIndex: 1 }}
        />
      )}
      
      {/* Eyes Layer */}
      {selectedEyes && !imageErrors.eyes && (
        <img
          src={selectedEyes.imageUrl}
          alt={selectedEyes.name}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          onError={() => handleImageError('eyes')}
          style={{ zIndex: 2 }}
        />
      )}
      
      {/* Mouth Layer */}
      {selectedMouth && !imageErrors.mouth && (
        <img
          src={selectedMouth.imageUrl}
          alt={selectedMouth.name}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          onError={() => handleImageError('mouth')}
          style={{ zIndex: 3 }}
        />
      )}
      
      {/* Fallback when images fail to load */}
      {(imageErrors.hair || imageErrors.eyes || imageErrors.mouth) && (
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
          {name ? name.charAt(0).toUpperCase() : '👤'}
        </div>
      )}
      
      {/* Avatar border/glow effect */}
      <div className="absolute inset-0 rounded-full border-2 border-white/20 shadow-lg" />
    </div>
  );
};

export default AvatarRenderer;