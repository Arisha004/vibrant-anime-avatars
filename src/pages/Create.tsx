
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvatarCreator from '@/components/AvatarCreator';
import { Download, Share2, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Create = () => {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleDownload = () => {
    toast({
      title: "Avatar Downloaded",
      description: "Your avatar has been saved to your device.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Link Created",
      description: "Your avatar sharing link has been copied to clipboard.",
    });
    
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText("https://your-anime-avatars.com/share/my-avatar");
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Avatar Removed" : "Avatar Saved",
      description: isSaved 
        ? "Avatar removed from your collection." 
        : "Avatar saved to your collection.",
    });
  };
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Create Your Avatar</h1>
          <p className="text-muted-foreground mt-1">Design your perfect anime avatar with our easy-to-use creator</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            variant={isSaved ? "default" : "outline"} 
            size="sm"
            onClick={handleSave}
            className={isSaved ? "bg-pink-500 hover:bg-pink-600" : ""}
          >
            <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-white" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-xl p-6">
          <AvatarCreator />
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-semibold mb-4">Getting Started</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Select features for your avatar</li>
              <li>Choose colors and accessories</li>
              <li>Generate your unique avatar</li>
              <li>Download or share with friends</li>
            </ol>
          </div>
          
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-semibold mb-4">Trending Styles</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
                <div>
                  <p className="font-medium">Cyberpunk Fusion</p>
                  <p className="text-xs text-muted-foreground">Trending this week</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"></div>
                <div>
                  <p className="font-medium">Ocean Vibes</p>
                  <p className="text-xs text-muted-foreground">Popular now</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-red-500"></div>
                <div>
                  <p className="font-medium">Sunset Samurai</p>
                  <p className="text-xs text-muted-foreground">Rising in popularity</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-semibold mb-4">Pro Tips</h3>
            <Tabs defaultValue="colors">
              <TabsList className="w-full">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="effects">Effects</TabsTrigger>
              </TabsList>
              <TabsContent value="colors" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Choose complementary colors for your avatar's features. Contrasting hair and eye colors create a more striking look.
                </p>
              </TabsContent>
              <TabsContent value="features" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  The eyes and hair define your avatar's personality. Try different combinations to find the perfect expression.
                </p>
              </TabsContent>
              <TabsContent value="effects" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Add subtle glow effects to make your avatar stand out. Background gradients can enhance the overall aesthetic.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
