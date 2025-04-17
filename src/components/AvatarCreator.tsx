
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  ChevronRight, Download, RefreshCw, Sparkles, 
  Image, Camera, Share2 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { hairStyles, eyeStyles, mouthStyles, skinTones, sampleAvatars } from '@/assets/avatarParts';

const AvatarCreator = () => {
  const [name, setName] = useState('');
  const [selectedHair, setSelectedHair] = useState(hairStyles[0].id);
  const [selectedEyes, setSelectedEyes] = useState(eyeStyles[0].id);
  const [selectedMouth, setSelectedMouth] = useState(mouthStyles[0].id);
  const [selectedSkin, setSelectedSkin] = useState(skinTones[0].id);
  const [generating, setGenerating] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(sampleAvatars[0].imageUrl);
  
  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      // Pick a random avatar from samples for demo purposes
      const randomAvatar = sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];
      setCurrentAvatar(randomAvatar.imageUrl);
      
      setGenerating(false);
      toast({
        title: "Avatar Generated!",
        description: "Your custom avatar has been created successfully.",
      });
    }, 2000);
  };
  
  const handleRandomize = () => {
    setSelectedHair(hairStyles[Math.floor(Math.random() * hairStyles.length)].id);
    setSelectedEyes(eyeStyles[Math.floor(Math.random() * eyeStyles.length)].id);
    setSelectedMouth(mouthStyles[Math.floor(Math.random() * mouthStyles.length)].id);
    setSelectedSkin(skinTones[Math.floor(Math.random() * skinTones.length)].id);
    
    toast({
      description: "Avatar randomized!",
      duration: 1500,
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Avatar Downloaded",
      description: "Your avatar has been saved to your device.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "Share link has been copied to clipboard.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Label htmlFor="avatar-name">Name your avatar</Label>
          <Input 
            id="avatar-name" 
            placeholder="E.g., NeonKitsune" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-6">
            <div className="space-y-3">
              <Label>Hair Style</Label>
              <div className="grid grid-cols-4 gap-2">
                {hairStyles.map((hair) => (
                  <div 
                    key={hair.id}
                    className={`relative rounded-md overflow-hidden cursor-pointer transition-all ${selectedHair === hair.id ? 'ring-2 ring-primary/70 scale-105' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setSelectedHair(hair.id)}
                  >
                    <img src={hair.imageUrl} alt={hair.name} className="w-full aspect-square object-cover bg-white" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-medium">
                      {hair.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Eyes</Label>
              <div className="grid grid-cols-4 gap-2">
                {eyeStyles.map((eye) => (
                  <div 
                    key={eye.id}
                    className={`relative rounded-md overflow-hidden cursor-pointer transition-all ${selectedEyes === eye.id ? 'ring-2 ring-primary/70 scale-105' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setSelectedEyes(eye.id)}
                  >
                    <img src={eye.imageUrl} alt={eye.name} className="w-full aspect-square object-cover bg-white" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-medium">
                      {eye.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Mouth</Label>
              <div className="grid grid-cols-4 gap-2">
                {mouthStyles.map((mouth) => (
                  <div 
                    key={mouth.id}
                    className={`relative rounded-md overflow-hidden cursor-pointer transition-all ${selectedMouth === mouth.id ? 'ring-2 ring-primary/70 scale-105' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setSelectedMouth(mouth.id)}
                  >
                    <img src={mouth.imageUrl} alt={mouth.name} className="w-full aspect-square object-cover bg-white" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-medium">
                      {mouth.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-6">
            <div className="space-y-3">
              <Label>Skin Tone</Label>
              <div className="flex gap-2">
                {skinTones.map((skin) => (
                  <div 
                    key={skin.id}
                    className={`h-10 w-10 rounded-full cursor-pointer transition-all ${selectedSkin === skin.id ? 'ring-2 ring-primary/70 scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: skin.color }}
                    onClick={() => setSelectedSkin(skin.id)}
                    title={skin.name}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Hair Color</Label>
              <div className="h-10">
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Eye Color</Label>
              <div className="h-10">
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Background</Label>
              <RadioGroup defaultValue="gradient" className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gradient" id="gradient" />
                  <Label htmlFor="gradient">Gradient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solid" id="solid" />
                  <Label htmlFor="solid">Solid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transparent" id="transparent" />
                  <Label htmlFor="transparent">Transparent</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="accessories" className="space-y-6">
            <p className="text-muted-foreground">Choose accessories to customize your avatar further.</p>
            
            <div className="space-y-3">
              <Label>Headwear</Label>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i}
                    className="relative rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100"
                  >
                    <img 
                      src={`https://i.imgur.com/Jy${String.fromCharCode(65 + i)}xPqD.png`} 
                      alt={`Accessory ${i+1}`} 
                      className="w-full aspect-square object-cover bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Eyewear</Label>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i}
                    className="relative rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100"
                  >
                    <img 
                      src={`https://i.imgur.com/L${String.fromCharCode(74 + i)}wQyn.png`} 
                      alt={`Eyewear ${i+1}`} 
                      className="w-full aspect-square object-cover bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Special</Label>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i}
                    className="relative rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100"
                  >
                    <img 
                      src={`https://i.imgur.com/K${String.fromCharCode(65 + i)}vQpx.png`}
                      alt={`Special ${i+1}`} 
                      className="w-full aspect-square object-cover bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex flex-col">
        <div className="relative aspect-square bg-gradient-to-br from-anime-purple/30 to-anime-magenta/30 rounded-xl overflow-hidden flex items-center justify-center mb-4 shadow-lg">
          {/* Avatar preview */}
          <div className="h-56 w-56 rounded-full overflow-hidden border-4 border-white/70 bg-white flex items-center justify-center">
            <img 
              src={currentAvatar} 
              alt="Avatar Preview"
              className="w-full h-full object-contain"
            />
          </div>
          
          {generating && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white flex flex-col items-center">
                <RefreshCw className="h-10 w-10 animate-spin mb-2" />
                <p>Generating your avatar...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4 flex-1">
          <div className="flex gap-3">
            <Button className="w-full" onClick={handleRandomize}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Randomize
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90 text-white"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="w-full" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="w-full" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="mt-8 space-y-2">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" className="justify-start hover:bg-muted/50">
                <Image className="h-4 w-4 mr-2" />
                Upload Photo
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button variant="ghost" className="justify-start hover:bg-muted/50">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCreator;
