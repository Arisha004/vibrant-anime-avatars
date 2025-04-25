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
    name: 'Cyber Neko', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-1.png', 
    creator: 'NeonKitsune', 
    likes: 245, 
    views: 1023, 
    comments: 48 
  },
  { 
    id: 'a2', 
    name: 'Spirit Guardian', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-2.png', 
    creator: 'PurpleSamurai', 
    likes: 189, 
    views: 876, 
    comments: 32 
  },
  { 
    id: 'a3', 
    name: 'Moon Princess', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-3.png', 
    creator: 'StardustMage', 
    likes: 163, 
    views: 745, 
    comments: 27 
  },
  { 
    id: 'a4', 
    name: 'Tech Samurai', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-4.png', 
    creator: 'CyberArtist', 
    likes: 217, 
    views: 934, 
    comments: 41 
  },
];

const trendingAvatars = [
  { 
    id: 'a5', 
    name: 'Crystal Mage', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-5.png', 
    creator: 'CosmicMage', 
    likes: 312, 
    views: 1547, 
    comments: 63 
  },
  { 
    id: 'a6', 
    name: 'Neon Hunter', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-6.png', 
    creator: 'TechnoSamurai', 
    likes: 278, 
    views: 1398, 
    comments: 51 
  },
  { 
    id: 'a7', 
    name: 'Sky Ninja', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-7.png', 
    creator: 'CloudMaster', 
    likes: 256, 
    views: 1124, 
    comments: 46 
  },
  { 
    id: 'a8', 
    name: 'Dragon Rider', 
    imageUrl: 'https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/anime-8.png', 
    creator: 'DragonLord', 
    likes: 283, 
    views: 1267, 
    comments: 58 
  },
];

const Index = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-anime-purple to-anime-magenta py-12 sm:py-24 px-4 sm:px-6">
        <div className="container">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <Badge className="bg-white/20 hover:bg-white/30 text-white">✨ Create Your Dream Anime Avatar</Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
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
                className="border-white text-anime-purple bg-white/30 hover:bg-white/50 transition-colors"
              >
                <Link to="/explore">
                  Explore Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
                className="border-white text-anime-purple bg-white/30 hover:bg-white/50 transition-colors"
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
