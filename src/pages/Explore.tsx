import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import AvatarCard from '@/components/AvatarCard';

// Mock avatar data (combining both lists from Index page)
const allAvatars = [
  { id: 'a1', name: 'Cosmic Samurai', imageUrl: 'https://i.imgur.com/jNGQMRQ.png', creator: 'NeonKitsune', likes: 245, views: 1023, comments: 48 },
  { id: 'a2', name: 'Cyberpunk Ninja', imageUrl: 'https://i.imgur.com/L8Hzdcy.png', creator: 'PurpleSamurai', likes: 189, views: 876, comments: 32 },
  { id: 'a3', name: 'Ethereal Spirit', imageUrl: 'https://i.imgur.com/wFMJpAy.png', creator: 'StardustMage', likes: 163, views: 745, comments: 27 },
  { id: 'a4', name: 'Crimson Fox', imageUrl: 'https://i.imgur.com/JpFc1KY.png', creator: 'SakuraDreams', likes: 217, views: 934, comments: 41 },
  { id: 'a5', name: 'Galaxy Wanderer', imageUrl: 'https://i.imgur.com/2P3hWLz.png', creator: 'CosmicMage', likes: 312, views: 1547, comments: 63 },
  { id: 'a6', name: 'Neon Ronin', imageUrl: 'https://i.imgur.com/VW4ktYR.png', creator: 'TechnoSamurai', likes: 278, views: 1398, comments: 51 },
  { id: 'a7', name: 'Azure Dragon', imageUrl: 'https://i.imgur.com/MsHSJzt.png', creator: 'OceanSpirit', likes: 256, views: 1124, comments: 46 },
  { id: 'a8', name: 'Sakura Princess', imageUrl: 'https://i.imgur.com/tbqGUZq.png', creator: 'BlossomNinja', likes: 283, views: 1267, comments: 58 },
  { id: 'a9', name: 'Phantom Blade', imageUrl: 'https://i.imgur.com/eTQqwcT.png', creator: 'ShadowMaster', likes: 198, views: 952, comments: 37 },
  { id: 'a10', name: 'Lunar Wolf', imageUrl: 'https://i.imgur.com/pQMZVCc.png', creator: 'MoonHowler', likes: 227, views: 1089, comments: 43 },
  { id: 'a11', name: 'Electric Kitsune', imageUrl: 'https://i.imgur.com/J5XwJKK.png', creator: 'ThunderFox', likes: 242, views: 1178, comments: 49 },
  { id: 'a12', name: 'Jade Empress', imageUrl: 'https://i.imgur.com/RvnMZEv.png', creator: 'EmeraldDragon', likes: 261, views: 1265, comments: 52 },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Explore Avatars</h1>
        <p className="text-muted-foreground mt-1">Discover unique anime avatars created by our community</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search avatars by name or creator..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <Select defaultValue={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="ghost" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="glass-panel rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 backdrop-blur-sm">
          <div className="space-y-4">
            <h3 className="font-medium">Categories</h3>
            <div className="space-y-2">
              {['Cyberpunk', 'Fantasy', 'Sci-fi', 'Traditional', 'Magical', 'Steampunk'].map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Switch id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Features</h3>
            <div className="space-y-2">
              {['Animated', 'Glowing Effects', 'Custom Background', 'Special Items', 'Unique Hair'].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Switch id={`feature-${feature}`} />
                  <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Popularity Range</h3>
            <Slider defaultValue={[40, 80]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
            
            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90 text-white">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/90 backdrop-blur-sm">
          <TabsTrigger value="all">All Avatars</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAvatars.map((avatar) => (
              <AvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="featured" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAvatars.slice(0, 8).map((avatar) => (
              <AvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAvatars.slice(4, 12).map((avatar) => (
              <AvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAvatars.slice(8, 12).concat(allAvatars.slice(0, 4)).map((avatar) => (
              <AvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-auto">
          Load More Avatars
        </Button>
      </div>
    </div>
  );
};

export default Explore;
