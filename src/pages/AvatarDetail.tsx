
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, Share2, Download, MessageCircle, User, 
  ThumbsUp, Flag, Eye, Calendar, ChevronLeft 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

// Mock avatar data
const avatarData = {
  'a1': {
    id: 'a1',
    name: 'Cosmic Samurai',
    imageUrl: 'https://via.placeholder.com/600?text=Cosmic+Samurai',
    creator: 'NeonKitsune',
    creatorAvatar: 'https://via.placeholder.com/40?text=NK',
    description: 'A cosmic warrior inspired by traditional samurai aesthetics combined with space elements. The armor glows with nebula patterns and the helmet has star constellations embedded in it.',
    created: '2024-03-18T14:30:00Z',
    likes: 245,
    views: 1023,
    comments: [
      {
        id: 'c1',
        user: 'SakuraDreams',
        userAvatar: 'https://via.placeholder.com/40?text=SD',
        content: 'This is amazing! I love the colors and the cosmic theme.',
        timestamp: '2024-03-18T16:45:00Z',
        likes: 12,
      },
      {
        id: 'c2',
        user: 'PurpleSamurai',
        userAvatar: 'https://via.placeholder.com/40?text=PS',
        content: 'The detail in the armor is incredible. How long did this take you?',
        timestamp: '2024-03-19T09:20:00Z',
        likes: 8,
      },
      {
        id: 'c3',
        user: 'StardustMage',
        userAvatar: 'https://via.placeholder.com/40?text=SM',
        content: 'I\'m getting major space ronin vibes from this. Would love to see more of this style!',
        timestamp: '2024-03-20T11:15:00Z',
        likes: 5,
      },
    ],
    tags: ['cosmic', 'samurai', 'warrior', 'space', 'nebula'],
  },
  'a2': {
    id: 'a2',
    name: 'Cyberpunk Ninja',
    imageUrl: 'https://via.placeholder.com/600?text=Cyberpunk+Ninja',
    creator: 'PurpleSamurai',
    creatorAvatar: 'https://via.placeholder.com/40?text=PS',
    description: 'A futuristic ninja with cybernetic enhancements. Neon accents highlight the sleek armor and mask, with digital patterns flowing across the surface. The eyes glow with an eerie blue light.',
    created: '2024-03-15T10:20:00Z',
    likes: 189,
    views: 876,
    comments: [
      {
        id: 'c1',
        user: 'NeonKitsune',
        userAvatar: 'https://via.placeholder.com/40?text=NK',
        content: 'The neon details really pop against the dark armor. Fantastic work!',
        timestamp: '2024-03-15T14:30:00Z',
        likes: 7,
      },
      {
        id: 'c2',
        user: 'TechnoSamurai',
        userAvatar: 'https://via.placeholder.com/40?text=TS',
        content: 'This is giving me major Ghost in the Shell vibes. Love it!',
        timestamp: '2024-03-16T08:45:00Z',
        likes: 9,
      },
    ],
    tags: ['cyberpunk', 'ninja', 'neon', 'futuristic', 'tech'],
  }
};

const AvatarDetail = () => {
  const { id = 'a1' } = useParams();
  const avatar = avatarData[id as keyof typeof avatarData] || avatarData['a1'];
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(avatar.likes);
  const [commentInput, setCommentInput] = useState('');
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
      toast({
        description: "Removed from your favorites",
        duration: 1500,
      });
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      toast({
        description: "Added to your favorites",
        duration: 1500,
      });
    }
  };
  
  const handleComment = () => {
    if (commentInput.trim() === '') return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully.",
    });
    
    setCommentInput('');
  };
  
  const handleDownload = () => {
    toast({
      title: "Avatar Downloaded",
      description: "The avatar has been saved to your device.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "Share link has been copied to clipboard.",
    });
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Format time ago
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    
    return formatDate(dateString);
  };

  return (
    <div className="container py-8 space-y-8">
      <Link 
        to="/explore" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Gallery
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-xl p-4 overflow-hidden">
          <div className="relative aspect-square bg-gradient-to-br from-anime-purple/20 to-anime-magenta/20 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src={avatar.imageUrl} 
              alt={avatar.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold">{avatar.name}</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownload}>
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <Link to={`/user/${avatar.creator}`} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar.creatorAvatar} />
                  <AvatarFallback>{avatar.creator.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{avatar.creator}</span>
              </Link>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{formatDate(avatar.created)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Button
              variant={isLiked ? "default" : "outline"}
              className={isLiked ? "bg-anime-purple hover:bg-anime-purple/90" : ""}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {likeCount} Likes
            </Button>
            
            <div className="flex items-center text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              <span>{avatar.views} Views</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{avatar.comments.length} Comments</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{avatar.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {avatar.tags.map((tag) => (
                <Link 
                  key={tag}
                  to={`/explore?tag=${tag}`}
                  className="px-3 py-1 bg-muted/50 hover:bg-muted text-muted-foreground rounded-full text-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90 text-white w-full">
              Use This Avatar
            </Button>
            
            <div className="flex items-center gap-4 justify-center mt-4 text-sm text-muted-foreground">
              <button className="flex items-center hover:text-foreground transition-colors">
                <Flag className="h-4 w-4 mr-1" />
                Report
              </button>
              
              <Separator orientation="vertical" className="h-4" />
              
              <button className="flex items-center hover:text-foreground transition-colors">
                <User className="h-4 w-4 mr-1" />
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-6">
        <Tabs defaultValue="comments">
          <TabsList className="mb-6">
            <TabsTrigger value="comments">Comments ({avatar.comments.length})</TabsTrigger>
            <TabsTrigger value="related">Related Avatars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comments" className="space-y-6">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://via.placeholder.com/40?text=Me" />
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <Textarea 
                  placeholder="Add a comment..." 
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="resize-none"
                />
                
                <div className="flex justify-end">
                  <Button onClick={handleComment}>Post Comment</Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              {avatar.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.userAvatar} />
                    <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-medium">{comment.user}</h4>
                      <span className="text-xs text-muted-foreground">{timeAgo(comment.timestamp)}</span>
                    </div>
                    
                    <p className="mt-1">{comment.content}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like ({comment.likes})
                      </button>
                      
                      <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="related" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.values(avatarData).filter(a => a.id !== avatar.id).map((relatedAvatar) => (
                <Link 
                  key={relatedAvatar.id}
                  to={`/avatar/${relatedAvatar.id}`}
                  className="glass-panel rounded-xl overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="aspect-square">
                    <img 
                      src={relatedAvatar.imageUrl} 
                      alt={relatedAvatar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{relatedAvatar.name}</h3>
                    <p className="text-xs text-muted-foreground">by {relatedAvatar.creator}</p>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AvatarDetail;
