import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AnimeAvatarGeneratorProps {
  hair: string;
  eyes: string;
  mouth: string;
  skin: string;
  avatarName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onImageGenerated?: (imageUrl: string) => void;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

// Convert feature IDs to descriptive terms for AI prompt
const getHairDescription = (hairId: string) => {
  switch (hairId) {
    case 'hair-long': return 'long flowing hair';
    case 'hair-short': return 'short stylish hair';
    case 'hair-twintails': return 'twin-tails pigtails';
    case 'hair-punk': return 'spiky punk hair';
    case 'hair-spiky': return 'spiky anime hair';
    default: return 'stylish hair';
  }
};

const getEyesDescription = (eyesId: string) => {
  switch (eyesId) {
    case 'eyes-gentle': return 'gentle kind eyes';
    case 'eyes-cat': return 'cat-like eyes with sharp gaze';
    case 'eyes-round': return 'large round expressive eyes';
    default: return 'beautiful anime eyes';
  }
};

const getMouthDescription = (mouthId: string) => {
  switch (mouthId) {
    case 'mouth-smile': return 'gentle cheerful smile';
    case 'mouth-confident': return 'confident determined expression';
    default: return 'serene expression';
  }
};

const getSkinDescription = (skinColor: string) => {
  // Convert hex colors to descriptive terms
  if (skinColor.includes('fdb')) return 'fair skin';
  if (skinColor.includes('f3e')) return 'porcelain skin';
  if (skinColor.includes('c39')) return 'warm olive skin';
  if (skinColor.includes('8b6')) return 'rich bronze skin';
  if (skinColor.includes('f7d')) return 'golden tan skin';
  if (skinColor.includes('d4a')) return 'caramel skin';
  if (skinColor.includes('fef')) return 'pale luminous skin';
  return 'beautiful skin';
};

const AnimeAvatarGenerator = ({
  hair,
  eyes,
  mouth,
  skin,
  avatarName,
  size = 'xl',
  className,
  onImageGenerated
}: AnimeAvatarGeneratorProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAvatar = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      // Create a detailed anime prompt based on the selected features
      const hairDesc = getHairDescription(hair);
      const eyesDesc = getEyesDescription(eyes);
      const mouthDesc = getMouthDescription(mouth);
      const skinDesc = getSkinDescription(skin);
      
      const prompt = `Beautiful anime character portrait, ${skinDesc}, ${hairDesc}, ${eyesDesc}, ${mouthDesc}, high quality anime art style, detailed digital painting, vibrant colors, professional anime illustration, portrait orientation, clean background`;
      
      // Generate unique filename based on features
      const filename = `avatar-${hair}-${eyes}-${mouth}-${skin.replace('#', '')}-${Date.now()}.jpg`;
      const imagePath = `src/assets/generated-avatars/${filename}`;
      
      // Call the image generation API (this would be replaced with actual API call)
      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          target_path: imagePath,
          width: 512,
          height: 512,
          model: 'flux.schnell'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate avatar');
      }

      const result = await response.json();
      const generatedImageUrl = result.imageUrl || `/assets/generated-avatars/${filename}`;
      
      setImageUrl(generatedImageUrl);
      onImageGenerated?.(generatedImageUrl);
      
      toast({
        title: "Avatar Generated! ✨",
        description: "Your anime avatar has been created successfully.",
      });
      
    } catch (error) {
      console.error('Avatar generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate anime avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [hair, eyes, mouth, skin, onImageGenerated]);

  const regenerateAvatar = () => {
    setImageUrl(null);
    generateAvatar();
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className={`${sizeClasses[size]} relative border-4 border-white/30 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20`}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={avatarName || 'Generated Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isGenerating ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <div className="text-center p-4">
                <div className="text-sm text-muted-foreground mb-2">Preview</div>
                <Button 
                  onClick={generateAvatar}
                  size="sm"
                  className="bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90"
                >
                  Generate
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {imageUrl && !isGenerating && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={regenerateAvatar}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </Button>
      )}
    </div>
  );
};

export default AnimeAvatarGenerator;