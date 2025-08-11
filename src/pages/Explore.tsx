import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import ImageAvatarCard from '@/components/ImageAvatarCard';

// Import all avatar images
import crystalAngelImg from '@/assets/explore-avatars/crystal-angel.jpg';
import sakuraSpiritImg from '@/assets/explore-avatars/sakura-spirit.jpg';
import azurePrincessImg from '@/assets/explore-avatars/azure-princess.jpg';
import neonPriestessImg from '@/assets/explore-avatars/neon-priestess.jpg';
import snowQueenImg from '@/assets/explore-avatars/snow-queen.jpg';
import cherryBlossomImg from '@/assets/explore-avatars/cherry-blossom.jpg';
import starlightMageImg from '@/assets/explore-avatars/starlight-mage.jpg';
import moonGuardianImg from '@/assets/explore-avatars/moon-guardian.jpg';
import celestialMaidenImg from '@/assets/explore-avatars/celestial-maiden.jpg';
import solarKnightImg from '@/assets/explore-avatars/solar-knight.jpg';
import auroraWeaverImg from '@/assets/explore-avatars/aurora-weaver.jpg';
import mysticSeerImg from '@/assets/explore-avatars/mystic-seer.jpg';

// Real anime avatar data with unique generated images
const allAvatars = [
  { id: 'a1', name: 'Crystal Angel', creator: 'ArtisticDreams', likes: 845, views: 3023, comments: 148, imageUrl: crystalAngelImg },
  { id: 'a2', name: 'Sakura Spirit', creator: 'AnimeArtist', likes: 789, views: 2876, comments: 132, imageUrl: sakuraSpiritImg },
  { id: 'a3', name: 'Azure Princess', creator: 'DigitalMuse', likes: 763, views: 2445, comments: 127, imageUrl: azurePrincessImg },
  { id: 'a4', name: 'Neon Priestess', creator: 'CyberArtist', likes: 917, views: 3934, comments: 241, imageUrl: neonPriestessImg },
  { id: 'a5', name: 'Snow Queen', creator: 'WinterDreams', likes: 1312, views: 5547, comments: 263, imageUrl: snowQueenImg },
  { id: 'a6', name: 'Cherry Blossom', creator: 'SakuraArt', likes: 1178, views: 4398, comments: 251, imageUrl: cherryBlossomImg },
  { id: 'a7', name: 'Starlight Mage', creator: 'GalacticDreams', likes: 1056, views: 4124, comments: 246, imageUrl: starlightMageImg },
  { id: 'a8', name: 'Moon Guardian', creator: 'LunarArtist', likes: 983, views: 3267, comments: 158, imageUrl: moonGuardianImg },
  { id: 'a9', name: 'Celestial Maiden', creator: 'StardustArt', likes: 892, views: 2952, comments: 137, imageUrl: celestialMaidenImg },
  { id: 'a10', name: 'Solar Knight', creator: 'SunlightStudio', likes: 927, views: 3089, comments: 143, imageUrl: solarKnightImg },
  { id: 'a11', name: 'Aurora Weaver', creator: 'NorthernLights', likes: 842, views: 2178, comments: 149, imageUrl: auroraWeaverImg },
  { id: 'a12', name: 'Mystic Seer', creator: 'EnchantedArts', likes: 861, views: 2265, comments: 152, imageUrl: mysticSeerImg },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  
  // Filter and sort avatars based on search query and sort option
  const filteredAndSortedAvatars = useMemo(() => {
    let filtered = allAvatars.filter(avatar =>
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avatar.creator.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered results
    switch (sortBy) {
      case 'popularity':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'newest':
        return filtered.sort((a, b) => b.views - a.views); // Using views as a proxy for recency
      case 'oldest':
        return filtered.sort((a, b) => a.views - b.views);
      case 'a-z':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [searchQuery, sortBy]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useMemo hook above
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
          <TabsTrigger value="all" className="text-anime-purple data-[state=active]:!text-anime-purple data-[state=inactive]:!text-anime-purple hover:!text-anime-purple">All Avatars</TabsTrigger>
          <TabsTrigger value="featured" className="text-anime-purple data-[state=active]:!text-anime-purple data-[state=inactive]:!text-anime-purple hover:!text-anime-purple">Featured</TabsTrigger>
          <TabsTrigger value="trending" className="text-anime-purple data-[state=active]:!text-anime-purple data-[state=inactive]:!text-anime-purple hover:!text-anime-purple">Trending</TabsTrigger>
          <TabsTrigger value="new" className="text-anime-purple data-[state=active]:!text-anime-purple data-[state=inactive]:!text-anime-purple hover:!text-anime-purple">New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedAvatars.map((avatar) => (
              <ImageAvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
          {filteredAndSortedAvatars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No avatars found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="featured" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedAvatars.slice(0, 8).map((avatar) => (
              <ImageAvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
          {filteredAndSortedAvatars.slice(0, 8).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured avatars found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="trending" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedAvatars.slice(4, 12).map((avatar) => (
              <ImageAvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
          {filteredAndSortedAvatars.slice(4, 12).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No trending avatars found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedAvatars.slice(8, 12).concat(filteredAndSortedAvatars.slice(0, 4)).map((avatar) => (
              <ImageAvatarCard key={avatar.id} {...avatar} />
            ))}
          </div>
          {filteredAndSortedAvatars.slice(8, 12).concat(filteredAndSortedAvatars.slice(0, 4)).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No new avatars found matching your search criteria.</p>
            </div>
          )}
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
