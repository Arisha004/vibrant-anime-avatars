
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
import AvatarRenderer from '@/components/AvatarRenderer';

// Import avatar images
import crystalAvatar from '@/assets/crystal-avatar.png';
import sakuraAvatar from '@/assets/sakura-avatar.png';
import azureAvatar from '@/assets/azure-avatar.png';
import neonAvatar from '@/assets/neon-avatar.png';
import fallbackAvatar from '@/assets/fallback-avatar.png';

// Avatar data with local images and avatar parts
const avatarData = {
  'a1': {
    id: 'a1',
    name: 'Crystal Angel',
    imageUrl: crystalAvatar,
    creator: 'NeonKitsune',
    creatorAvatar: fallbackAvatar,
    description: 'A cosmic warrior inspired by traditional samurai aesthetics combined with space elements. The armor glows with nebula patterns and the helmet has star constellations embedded in it.',
    created: '2024-03-18T14:30:00Z',
    likes: 245,
    views: 1023,
    hair: 'h2',
    eyes: 'e1',
    mouth: 'm1', 
    skin: 's1',
    comments: [
      {
        id: 'c1',
        user: 'SakuraDreams',
        userAvatar: fallbackAvatar,
        content: 'This is amazing! I love the colors and the cosmic theme.',
        timestamp: '2024-03-18T16:45:00Z',
        likes: 12,
      },
      {
        id: 'c2',
        user: 'PurpleSamurai',
        userAvatar: fallbackAvatar,
        content: 'The detail in the armor is incredible. How long did this take you?',
        timestamp: '2024-03-19T09:20:00Z',
        likes: 8,
      },
      {
        id: 'c3',
        user: 'StardustMage',
        userAvatar: fallbackAvatar,
        content: 'I\'m getting major space ronin vibes from this. Would love to see more of this style!',
        timestamp: '2024-03-20T11:15:00Z',
        likes: 5,
      },
    ],
    tags: ['cosmic', 'samurai', 'warrior', 'space', 'nebula'],
  },
  'a2': {
    id: 'a2',
    name: 'Sakura Spirit',
    imageUrl: sakuraAvatar,
    creator: 'PurpleSamurai',
    creatorAvatar: fallbackAvatar,
    description: 'A futuristic ninja with cybernetic enhancements. Neon accents highlight the sleek armor and mask, with digital patterns flowing across the surface. The eyes glow with an eerie blue light.',
    created: '2024-03-15T10:20:00Z',
    likes: 189,
    views: 876,
    hair: 'h4',
    eyes: 'e3',
    mouth: 'm1',
    skin: 's2',
    comments: [
      {
        id: 'c1',
        user: 'NeonKitsune',
        userAvatar: fallbackAvatar,
        content: 'The neon details really pop against the dark armor. Fantastic work!',
        timestamp: '2024-03-15T14:30:00Z',
        likes: 7,
      },
      {
        id: 'c2',
        user: 'TechnoSamurai',
        userAvatar: fallbackAvatar,
        content: 'This is giving me major Ghost in the Shell vibes. Love it!',
        timestamp: '2024-03-16T08:45:00Z',
        likes: 9,
      },
    ],
    tags: ['cyberpunk', 'ninja', 'neon', 'futuristic', 'tech'],
  },
  'a3': {
    id: 'a3',
    name: 'Azure Princess',
    imageUrl: azureAvatar,
    creator: 'DigitalMuse',
    creatorAvatar: fallbackAvatar,
    description: 'A regal anime character with flowing azure robes and a crown of stars. The elegant design features intricate patterns and celestial motifs.',
    created: '2024-03-12T08:15:00Z',
    likes: 298,
    views: 1156,
    hair: 'h1',
    eyes: 'e2',
    mouth: 'm3',
    skin: 's1',
    comments: [],
    tags: ['royal', 'elegant', 'blue', 'princess', 'celestial'],
  },
  'a4': {
    id: 'a4',
    name: 'Neon Priestess',
    imageUrl: neonAvatar,
    creator: 'CyberArtist',
    creatorAvatar: fallbackAvatar,
    description: 'A cyberpunk-inspired priestess with glowing neon accents and futuristic ceremonial robes. The perfect blend of spirituality and technology.',
    created: '2024-03-10T19:45:00Z',
    likes: 412,
    views: 1834,
    hair: 'h3',
    eyes: 'e5',
    mouth: 'm2',
    skin: 's3',
    comments: [],
    tags: ['cyberpunk', 'neon', 'priestess', 'technology', 'spiritual'],
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
  
  const [comments, setComments] = useState(avatar.comments);

  const handleComment = () => {
    if (commentInput.trim() === '') return;
    
    const newComment = {
      id: `c${Date.now()}`,
      user: 'You',
      userAvatar: fallbackAvatar,
      content: commentInput.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    
    setComments(prev => [newComment, ...prev]);
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully.",
    });
    
    setCommentInput('');
  };
  
  const handleDownload = async () => {
    try {
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = avatar.imageUrl;
      link.download = `${avatar.name.replace(/\s+/g, '_')}_avatar.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Avatar Downloaded",
        description: "The avatar has been saved to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the avatar. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/avatar/${avatar.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this avatar: ${avatar.name}`,
          text: `Created by ${avatar.creator}`,
          url: shareUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Avatar shared via native sharing.",
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied",
        description: "Share link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link. Please copy manually.",
        variant: "destructive",
      });
    }
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
        <div className="glass-panel rounded-xl p-8 overflow-hidden">
          <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex items-center justify-center">
            {avatar.hair && avatar.eyes && avatar.mouth && avatar.skin ? (
              <AvatarRenderer
                hair={avatar.hair}
                eyes={avatar.eyes}
                mouth={avatar.mouth}
                skin={avatar.skin}
                size="xl"
                name={avatar.name}
                className="w-full h-full shadow-2xl"
              />
            ) : (
              <img 
                src={avatar.imageUrl} 
                alt={avatar.name}
                className="w-full h-full object-cover filter contrast-105 saturate-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackAvatar;
                }}
              />
            )}
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
              <span>{comments.length} Comments</span>
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
            <Button 
              className="bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90 text-white w-full"
              onClick={() => {
                // Store selected avatar in localStorage for user to use
                const avatarToUse = {
                  hair: avatar.hair,
                  eyes: avatar.eyes,
                  mouth: avatar.mouth,
                  skin: avatar.skin,
                  name: avatar.name
                };
                localStorage.setItem('selectedAvatar', JSON.stringify(avatarToUse));
                toast({
                  title: "Avatar Selected!",
                  description: `You are now using "${avatar.name}" as your avatar.`,
                });
              }}
            >
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
            <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
            <TabsTrigger value="related">Related Avatars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comments" className="space-y-6">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={fallbackAvatar} />
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
              {comments.map((comment) => (
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
                      className="w-full h-full object-cover filter contrast-105 saturate-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = fallbackAvatar;
                      }}
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
