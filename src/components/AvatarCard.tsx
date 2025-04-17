
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

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
        "avatar-card relative group overflow-hidden avatar-card-hover",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="font-medium text-white truncate">{name}</h3>
          <p className="text-xs text-white/80">by {creator}</p>
        </div>
      </div>
      
      <div className="p-3 bg-white/80 backdrop-blur-sm">
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
          
          <div className={cn(
            "h-2 w-2 rounded-full bg-accent transform transition-transform duration-300",
            isHovered && "scale-125"
          )} />
        </div>
      </div>
    </Link>
  );
};

export default AvatarCard;
