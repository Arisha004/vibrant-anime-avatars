
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import fallbackImage from '@/assets/fallback-avatar.png';

interface AvatarCardProps {
  id: string;
  name: string;
  imageUrl: string;
  creator: string;
  likes: number;
  views: number;
  comments: number;
  className?: string;
}

const AvatarCard = ({ 
  id, 
  name, 
  imageUrl, 
  creator, 
  likes: initialLikes, 
  views, 
  comments,
  className 
}: AvatarCardProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
      toast({
        description: "Removed from your favorites",
        duration: 1500,
      });
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      toast({
        description: "Added to your favorites",
        duration: 1500,
      });
    }
  };


  return (
    <Link 
      to={`/avatar/${id}`}
      className={cn(
        "avatar-card relative group overflow-hidden rounded-lg shadow-md transition-all duration-300",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
          </div>
        )}
        
        <img 
          src={imageError ? fallbackImage : imageUrl} 
          alt={`${name} - Anime Avatar by ${creator}`}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110",
            !imageLoaded && !imageError && "opacity-0",
            "filter contrast-105 saturate-105"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error("Failed to load avatar image:", imageUrl);
            setImageError(true);
            setImageLoaded(true);
          }}
          loading="lazy"
          style={{ imageRendering: 'crisp-edges' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-medium text-purple-100 group-hover:text-white truncate">{name}</h3>
          <p className="text-xs text-purple-200 group-hover:text-white/80">by {creator}</p>
        </div>
      </div>
      
      <div className="p-3 bg-white/90 backdrop-blur-sm border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-8 w-8 hover:bg-muted/50", 
                isLiked && "text-red-500"
              )}
              onClick={handleLike}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-xs text-muted-foreground">{likes}</span>
            
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{views}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{comments}</span>
            </div>
          </div>
          
          <div className="h-2 w-2 rounded-full bg-accent transform transition-transform duration-300 group-hover:scale-125" />
        </div>
      </div>
    </Link>
  );
};

export default AvatarCard;
