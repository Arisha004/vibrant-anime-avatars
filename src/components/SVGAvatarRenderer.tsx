import React from 'react';
import { cn } from '@/lib/utils';
import { hairStyles, eyeStyles, mouthStyles, skinTones } from '@/assets/avatarParts';

interface SVGAvatarRendererProps {
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

const SVGAvatarRenderer = ({ 
  hair, 
  eyes, 
  mouth, 
  skin, 
  size = 'md', 
  className,
  name 
}: SVGAvatarRendererProps) => {
  const selectedSkin = skinTones.find(s => s.id === skin);
  const selectedHair = hairStyles.find(h => h.id === hair);
  const selectedEyes = eyeStyles.find(e => e.id === eyes);
  const selectedMouth = mouthStyles.find(m => m.id === mouth);

  const skinColor = selectedSkin?.color || '#FFDBAC';
  
  // Hair colors based on style
  const hairColors = {
    'h1': '#4A4A4A', // Spiky - Dark Gray
    'h2': '#8B4513', // Long - Brown
    'h3': '#FFD700', // Short - Blonde
    'h4': '#FF69B4', // Twin Tails - Pink
    'h5': '#9370DB'  // Punk - Purple
  };
  
  const hairColor = hairColors[hair as keyof typeof hairColors] || '#4A4A4A';

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-4 border-white/30 shadow-lg",
      sizeClasses[size],
      className
    )}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background Circle */}
        <circle cx="100" cy="100" r="100" fill={skinColor} />
        
        {/* Hair */}
        {selectedHair && (
          <>
            {hair === 'h1' && ( // Spiky
              <g fill={hairColor}>
                <path d="M50 80 Q100 30 150 80 Q100 60 50 80" />
                <path d="M60 85 Q100 45 140 85" />
              </g>
            )}
            {hair === 'h2' && ( // Long Flowing
              <g fill={hairColor}>
                <path d="M40 70 Q100 20 160 70 Q100 50 40 70" />
                <path d="M30 90 Q70 60 100 90 Q130 60 170 90" />
                <path d="M35 110 Q100 80 165 110" />
              </g>
            )}
            {hair === 'h3' && ( // Short Messy
              <g fill={hairColor}>
                <path d="M55 75 Q100 35 145 75 Q100 55 55 75" />
                <path d="M65 80 Q100 50 135 80" />
              </g>
            )}
            {hair === 'h4' && ( // Twin Tails
              <g fill={hairColor}>
                <circle cx="70" cy="75" r="15" />
                <circle cx="130" cy="75" r="15" />
                <path d="M60 75 Q100 40 140 75 Q100 60 60 75" />
              </g>
            )}
            {hair === 'h5' && ( // Punk
              <g fill={hairColor}>
                <path d="M60 70 Q80 20 100 70 Q120 20 140 70" />
                <path d="M70 75 Q100 45 130 75" />
              </g>
            )}
          </>
        )}
        
        {/* Eyes */}
        {selectedEyes && (
          <g>
            {eyes === 'e1' && ( // Bright Round
              <g>
                <circle cx="80" cy="95" r="8" fill="#000" />
                <circle cx="120" cy="95" r="8" fill="#000" />
                <circle cx="82" cy="93" r="3" fill="#FFF" />
                <circle cx="122" cy="93" r="3" fill="#FFF" />
              </g>
            )}
            {eyes === 'e2' && ( // Sharp Cat
              <g>
                <path d="M72 95 L88 90 L88 100 Z" fill="#000" />
                <path d="M112 90 L128 95 L112 100 Z" fill="#000" />
                <circle cx="78" cy="95" r="2" fill="#FFF" />
                <circle cx="122" cy="95" r="2" fill="#FFF" />
              </g>
            )}
            {eyes === 'e3' && ( // Gentle
              <g>
                <ellipse cx="80" cy="95" rx="10" ry="6" fill="#000" />
                <ellipse cx="120" cy="95" rx="10" ry="6" fill="#000" />
                <circle cx="82" cy="93" r="2" fill="#FFF" />
                <circle cx="122" cy="93" r="2" fill="#FFF" />
              </g>
            )}
            {eyes === 'e4' && ( // Determined
              <g>
                <rect x="70" y="90" width="15" height="10" fill="#000" />
                <rect x="115" y="90" width="15" height="10" fill="#000" />
                <circle cx="75" cy="93" r="2" fill="#FFF" />
                <circle cx="125" cy="93" r="2" fill="#FFF" />
              </g>
            )}
            {eyes === 'e5' && ( // Mysterious
              <g>
                <path d="M70 95 Q80 85 90 95 Q80 90 70 95" fill="#000" />
                <path d="M110 95 Q120 85 130 95 Q120 90 110 95" fill="#000" />
                <circle cx="78" cy="92" r="1" fill="#FFF" />
                <circle cx="122" cy="92" r="1" fill="#FFF" />
              </g>
            )}
          </g>
        )}
        
        {/* Mouth */}
        {selectedMouth && (
          <g>
            {mouth === 'm1' && ( // Sweet Smile
              <path d="M85 120 Q100 130 115 120" stroke="#000" strokeWidth="2" fill="none" />
            )}
            {mouth === 'm2' && ( // Confident
              <rect x="90" y="118" width="20" height="4" fill="#000" />
            )}
            {mouth === 'm3' && ( // Cheerful
              <g>
                <circle cx="100" cy="120" r="8" fill="#FF69B4" />
                <path d="M92 120 Q100 125 108 120" stroke="#000" strokeWidth="1" fill="none" />
              </g>
            )}
            {mouth === 'm4' && ( // Pouty
              <ellipse cx="100" cy="120" rx="6" ry="4" fill="#FF69B4" />
            )}
            {mouth === 'm5' && ( // Playful
              <g>
                <path d="M90 120 Q100 125 110 120" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="95" cy="118" r="1" fill="#000" />
              </g>
            )}
          </g>
        )}
        
        {/* Nose */}
        <circle cx="100" cy="105" r="1.5" fill="#000" opacity="0.3" />
      </svg>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10" />
    </div>
  );
};

export default SVGAvatarRenderer;