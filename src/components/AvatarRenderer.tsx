import React from 'react';
import SVGAvatarRenderer from './SVGAvatarRenderer';

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
  // Use SVG renderer for reliable avatar display
  return (
    <SVGAvatarRenderer
      hair={hair}
      eyes={eyes}
      mouth={mouth}
      skin={skin}
      size={size}
      className={className}
      name={name}
    />
  );
};

export default AvatarRenderer;