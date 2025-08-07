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
      "relative rounded-full overflow-hidden bg-gradient-to-br from-anime-purple/20 to-anime-magenta/20 border-4 border-white/40 shadow-2xl",
      sizeClasses[size],
      className
    )}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Enhanced Background with gradient */}
        <defs>
          <radialGradient id="skinGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor={skinColor} />
            <stop offset="100%" stopColor={skinColor} stopOpacity="0.9" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle cx="100" cy="100" r="95" fill="url(#skinGradient)" />
        
        {/* Hair - Enhanced with more anime style */}
        {selectedHair && (
          <>
            {hair === 'h1' && ( // Spiky Anime
              <g fill={hairColor} filter="url(#glow)">
                <path d="M45 75 Q70 25 100 30 Q130 25 155 75 Q130 50 100 55 Q70 50 45 75" />
                <path d="M55 80 Q80 35 100 40 Q120 35 145 80 Q120 55 100 60 Q80 55 55 80" />
                <path d="M65 85 Q85 45 100 45 Q115 45 135 85" />
                {/* Spiky details */}
                <path d="M75 70 Q80 30 85 70" />
                <path d="M95 65 Q100 25 105 65" />
                <path d="M115 70 Q120 30 125 70" />
              </g>
            )}
            {hair === 'h2' && ( // Long Flowing
              <g fill={hairColor} filter="url(#glow)">
                <path d="M35 65 Q100 15 165 65 Q130 40 100 45 Q70 40 35 65" />
                <path d="M25 85 Q65 55 100 85 Q135 55 175 85" />
                <path d="M30 105 Q100 75 170 105" />
                <path d="M35 125 Q100 95 165 125" />
                {/* Flowing strands */}
                <path d="M40 90 Q60 70 80 110 Q70 90 40 90" />
                <path d="M160 90 Q140 70 120 110 Q130 90 160 90" />
              </g>
            )}
            {hair === 'h3' && ( // Short Messy
              <g fill={hairColor} filter="url(#glow)">
                <path d="M50 70 Q100 30 150 70 Q125 45 100 50 Q75 45 50 70" />
                <path d="M60 75 Q100 40 140 75" />
                {/* Messy strands */}
                <path d="M70 65 Q75 35 80 65" />
                <path d="M90 60 Q95 30 100 60" />
                <path d="M120 65 Q125 35 130 65" />
              </g>
            )}
            {hair === 'h4' && ( // Twin Tails
              <g fill={hairColor} filter="url(#glow)">
                {/* Main hair */}
                <path d="M55 70 Q100 35 145 70 Q125 50 100 55 Q75 50 55 70" />
                {/* Twin tails */}
                <ellipse cx="65" cy="70" rx="18" ry="25" />
                <ellipse cx="135" cy="70" rx="18" ry="25" />
                {/* Tail details */}
                <path d="M65 95 Q70 110 60 125" />
                <path d="M135 95 Q130 110 140 125" />
              </g>
            )}
            {hair === 'h5' && ( // Punk Style
              <g fill={hairColor} filter="url(#glow)">
                <path d="M55 65 Q75 15 95 65 Q100 10 105 65 Q125 15 145 65" />
                <path d="M65 70 Q85 25 105 70 Q115 25 135 70" />
                {/* Punk spikes */}
                <path d="M70 60 Q75 20 80 60" />
                <path d="M85 55 Q90 15 95 55" />
                <path d="M105 55 Q110 15 115 55" />
                <path d="M120 60 Q125 20 130 60" />
              </g>
            )}
          </>
        )}
        
        {/* Enhanced Eyes with anime style */}
        {selectedEyes && (
          <g filter="url(#glow)">
            {eyes === 'e1' && ( // Bright Round
              <g>
                <circle cx="75" cy="90" r="12" fill="#FFF" stroke="#000" strokeWidth="2" />
                <circle cx="125" cy="90" r="12" fill="#FFF" stroke="#000" strokeWidth="2" />
                <circle cx="75" cy="90" r="8" fill="#4A90E2" />
                <circle cx="125" cy="90" r="8" fill="#4A90E2" />
                <circle cx="75" cy="90" r="4" fill="#000" />
                <circle cx="125" cy="90" r="4" fill="#000" />
                <circle cx="77" cy="87" r="2" fill="#FFF" />
                <circle cx="127" cy="87" r="2" fill="#FFF" />
              </g>
            )}
            {eyes === 'e2' && ( // Sharp Cat
              <g>
                <path d="M65 85 L85 80 L90 95 L85 100 L65 95 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
                <path d="M110 80 L130 85 L135 95 L115 100 L110 95 Z" fill="#FFF" stroke="#000" strokeWidth="2" />
                <ellipse cx="77" cy="90" rx="6" ry="4" fill="#E74C3C" />
                <ellipse cx="123" cy="90" rx="6" ry="4" fill="#E74C3C" />
                <circle cx="77" cy="90" r="2" fill="#000" />
                <circle cx="123" cy="90" r="2" fill="#000" />
                <circle cx="78" cy="88" r="1" fill="#FFF" />
                <circle cx="124" cy="88" r="1" fill="#FFF" />
              </g>
            )}
            {eyes === 'e3' && ( // Gentle
              <g>
                <ellipse cx="75" cy="90" rx="14" ry="8" fill="#FFF" stroke="#000" strokeWidth="2" />
                <ellipse cx="125" cy="90" rx="14" ry="8" fill="#FFF" stroke="#000" strokeWidth="2" />
                <ellipse cx="75" cy="90" rx="8" ry="6" fill="#9B59B6" />
                <ellipse cx="125" cy="90" rx="8" ry="6" fill="#9B59B6" />
                <circle cx="75" cy="90" r="3" fill="#000" />
                <circle cx="125" cy="90" r="3" fill="#000" />
                <circle cx="76" cy="88" r="1.5" fill="#FFF" />
                <circle cx="126" cy="88" r="1.5" fill="#FFF" />
              </g>
            )}
            {eyes === 'e4' && ( // Determined
              <g>
                <rect x="63" y="85" width="18" height="12" rx="2" fill="#FFF" stroke="#000" strokeWidth="2" />
                <rect x="119" y="85" width="18" height="12" rx="2" fill="#FFF" stroke="#000" strokeWidth="2" />
                <rect x="67" y="87" width="10" height="8" fill="#F39C12" />
                <rect x="123" y="87" width="10" height="8" fill="#F39C12" />
                <circle cx="72" cy="91" r="2" fill="#000" />
                <circle cx="128" cy="91" r="2" fill="#000" />
                <circle cx="73" cy="89" r="1" fill="#FFF" />
                <circle cx="129" cy="89" r="1" fill="#FFF" />
              </g>
            )}
            {eyes === 'e5' && ( // Mysterious
              <g>
                <path d="M65 85 Q75 75 85 85 Q80 80 75 85 Q70 80 65 85" fill="#FFF" stroke="#000" strokeWidth="2" />
                <path d="M115 85 Q125 75 135 85 Q130 80 125 85 Q120 80 115 85" fill="#FFF" stroke="#000" strokeWidth="2" />
                <ellipse cx="75" cy="85" rx="6" ry="3" fill="#2C3E50" />
                <ellipse cx="125" cy="85" rx="6" ry="3" fill="#2C3E50" />
                <circle cx="75" cy="85" r="1.5" fill="#000" />
                <circle cx="125" cy="85" r="1.5" fill="#000" />
                <circle cx="76" cy="84" r="0.5" fill="#FFF" />
                <circle cx="126" cy="84" r="0.5" fill="#FFF" />
              </g>
            )}
          </g>
        )}
        
        {/* Enhanced Mouth with anime style */}
        {selectedMouth && (
          <g>
            {mouth === 'm1' && ( // Sweet Smile
              <g>
                <path d="M82 115 Q100 125 118 115" stroke="#E91E63" strokeWidth="3" fill="none" />
                <ellipse cx="100" cy="120" rx="12" ry="4" fill="#FFB6C1" opacity="0.6" />
              </g>
            )}
            {mouth === 'm2' && ( // Confident
              <g>
                <rect x="88" y="116" width="24" height="6" rx="3" fill="#E91E63" />
                <rect x="90" y="118" width="20" height="2" fill="#FFF" opacity="0.7" />
              </g>
            )}
            {mouth === 'm3' && ( // Cheerful
              <g>
                <ellipse cx="100" cy="118" rx="10" ry="6" fill="#FF69B4" />
                <path d="M90 118 Q100 123 110 118" stroke="#C91E63" strokeWidth="2" fill="none" />
                <ellipse cx="100" cy="116" rx="8" ry="2" fill="#FFF" opacity="0.5" />
              </g>
            )}
            {mouth === 'm4' && ( // Pouty
              <g>
                <ellipse cx="100" cy="118" rx="8" ry="5" fill="#FF69B4" />
                <ellipse cx="100" cy="116" rx="6" ry="2" fill="#FFF" opacity="0.5" />
              </g>
            )}
            {mouth === 'm5' && ( // Playful
              <g>
                <path d="M85 118 Q100 123 115 118" stroke="#E91E63" strokeWidth="3" fill="none" />
                <circle cx="92" cy="115" r="1.5" fill="#E91E63" />
                <ellipse cx="100" cy="121" rx="10" ry="3" fill="#FFB6C1" opacity="0.4" />
              </g>
            )}
          </g>
        )}
        
        {/* Enhanced Nose */}
        <ellipse cx="100" cy="102" rx="2" ry="1" fill="#000" opacity="0.2" />
        
        {/* Anime-style blush */}
        <ellipse cx="60" cy="95" rx="8" ry="4" fill="#FF69B4" opacity="0.3" />
        <ellipse cx="140" cy="95" rx="8" ry="4" fill="#FF69B4" opacity="0.3" />
      </svg>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-anime-purple/10 to-white/20 pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-anime-magenta/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default SVGAvatarRenderer;