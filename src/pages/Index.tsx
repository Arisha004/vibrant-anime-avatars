
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvatarCard from '@/components/AvatarCard';
import AvatarCreator from '@/components/AvatarCreator';
import ChatRoom from '@/components/ChatRoom';
import { ArrowRight, Sparkles, MessageCircle, PlusCircle } from 'lucide-react';

const featuredAvatars = [
  { 
    id: 'a1', 
    name: 'Crystal Angel', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/crystal-1.png', 
    creator: 'ArtisticDreams', 
    likes: 845, 
    views: 3023, 
    comments: 148 
  },
  { 
    id: 'a2', 
    name: 'Sakura Spirit', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/sakura-1.png', 
    creator: 'AnimeArtist', 
    likes: 789, 
    views: 2876, 
    comments: 132 
  },
  { 
    id: 'a3', 
    name: 'Azure Princess', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/azure-1.png', 
    creator: 'DigitalMuse', 
    likes: 763, 
    views: 2445, 
    comments: 127 
  },
  { 
    id: 'a4', 
    name: 'Neon Priestess', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/neon-1.png', 
    creator: 'CyberArtist', 
    likes: 917, 
    views: 3934, 
    comments: 241 
  },
];

const trendingAvatars = [
  { 
    id: 'a5', 
    name: 'Snow Queen', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/snow-1.png', 
    creator: 'WinterDreams', 
    likes: 1312, 
    views: 5547, 
    comments: 263 
  },
  { 
    id: 'a6', 
    name: 'Cherry Blossom', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/cherry-1.png', 
    creator: 'SakuraArt', 
    likes: 1178, 
    views: 4398, 
    comments: 251 
  },
  { 
    id: 'a7', 
    name: 'Starlight Mage', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/star-1.png', 
    creator: 'GalacticDreams', 
    likes: 1056, 
    views: 4124, 
    comments: 246 
  },
  { 
    id: 'a8', 
    name: 'Moon Guardian', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/moon-1.png', 
    creator: 'LunarArtist', 
    likes: 983, 
    views: 3267, 
    comments: 158 
  },
];

const Index = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-anime-purple to-anime-magenta py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 sm:space-y-6 relative z-10">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">✨ Create Your Dream Anime Avatar</Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Vibrant Anime Avatars with Real-Time Creation
              </h1>
              
              <p className="text-base sm:text-lg text-white/80">
                Express yourself with customizable anime avatars. Create, share, and chat with others in our vibrant community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-anime-purple hover:bg-white/90">
                  <Link to="/create">
                    Create Your Avatar
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/20 hover:bg-white/40 transition-colors"
                >
                  <Link to="/explore">
                    Explore Gallery
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex justify-end relative z-10">
              <div className="relative w-[400px] h-[400px]">
                <img
                  src="/lovable-uploads/d9883366-3da4-468a-8b20-63ecd0106eea.png"
                  alt="Anime Avatar"
                  className="w-full h-full object-contain animate-float drop-shadow-2xl"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error("Failed to load hero image:", target.src);
                    target.src = "https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/fallback-avatar.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anime-purple/20 to-transparent rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Avatars Gallery */}
      <section className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Trending Avatars</h2>
            <p className="text-muted-foreground mt-1">Discover the most popular anime avatars</p>
          </div>
          
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/explore">
              View All Avatars
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredAvatars.map((avatar) => (
                <AvatarCard key={avatar.id} {...avatar} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {trendingAvatars.map((avatar) => (
                <AvatarCard key={avatar.id} {...avatar} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredAvatars.slice(0, 2).concat(trendingAvatars.slice(0, 2)).map((avatar) => (
                <AvatarCard key={avatar.id} {...avatar} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Avatar Creator Preview */}
      <section className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-1/3 space-y-6">
              <div className="inline-block rounded-full bg-anime-purple/10 px-3 py-1 text-sm font-medium text-anime-purple">
                Avatar Creator
              </div>
              
              <h2 className="text-3xl font-bold">Create Your Own Anime Avatar</h2>
              
              <p className="text-muted-foreground">
                Our powerful avatar creator lets you customize every aspect of your anime persona. Choose from hundreds of features, colors, and accessories.
              </p>
              
              <ul className="space-y-3">
                {['Intuitive editor', 'Real-time preview', 'Unlimited combinations', 'One-click sharing'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-anime-purple"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild className="bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90 text-white">
                <Link to="/create">
                  Start Creating Now
                  <PlusCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 glass-panel rounded-xl p-6">
              <AvatarCreator />
            </div>
          </div>
        </div>
      </section>
      
      {/* Chat Preview */}
      <section className="container">
        <div className="mb-8">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-anime-purple/10 px-3 py-1 text-sm font-medium text-anime-purple">
              Real-Time Features
            </div>
            
            <h2 className="text-3xl font-bold">Join the Conversation</h2>
            
            <p className="text-muted-foreground">
              Connect with other anime avatar enthusiasts in our real-time chat rooms. Share your creations, get feedback, and make friends!
            </p>
          </div>
        </div>
        
        <ChatRoom />
        
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="mx-auto">
            <Link to="/chat">
              Join More Chat Rooms
              <MessageCircle className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Features section */}
      <section className="bg-gradient-to-br from-white via-purple-50 to-blue-50 py-12 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block rounded-full bg-anime-purple/10 px-3 py-1 text-sm font-medium text-anime-purple mb-4">
              Why Choose Us
            </div>
            
            <h2 className="text-3xl font-bold">Feature-Packed Avatar Platform</h2>
            
            <p className="text-muted-foreground mt-4">
              Our platform combines creativity, community, and cutting-edge technology to provide the best anime avatar experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced Avatar Editor',
                description: 'Create detailed, personalized avatars with our intuitive editor featuring hundreds of customization options.',
                icon: '🎨'
              },
              {
                title: 'Real-Time Updates',
                description: 'See changes and interactions instantly with our real-time technology powering the entire platform.',
                icon: '⚡'
              },
              {
                title: 'Vibrant Community',
                description: 'Join thousands of anime enthusiasts sharing creations, tips, and feedback every day.',
                icon: '👥'
              },
              {
                title: 'Gallery Showcase',
                description: 'Display your avatars in our curated galleries and get recognized for your creativity.',
                icon: '🖼️'
              },
              {
                title: 'Seamless Sharing',
                description: 'Share your creations across social media with just one click.',
                icon: '🔗'
              },
              {
                title: 'Regular Updates',
                description: 'We constantly add new features, styles, and customization options to keep things fresh.',
                icon: '🚀'
              }
            ].map((feature, i) => (
              <div key={i} className="glass-panel rounded-xl p-6 transition-all hover:translate-y-[-5px] hover:shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="container px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-anime-purple to-anime-magenta p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Express Yourself?</h2>
            
            <p className="text-white/80 text-lg">
              Join thousands of users creating unique anime avatars and connecting with the community in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-anime-purple hover:bg-white/90">
                <Link to="/create">
                  Start Creating Now
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-white/20 hover:bg-white/40 transition-colors"
              >
                <Link to="/explore">
                  Explore Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
