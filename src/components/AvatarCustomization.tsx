import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, Sparkles, Crown, Glasses, 
  Mountain, Trees, Sun, Moon, Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarCustomizationProps {
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  selectedPose: string;
  setSelectedPose: (pose: string) => void;
  selectedAccessories: string[];
  setSelectedAccessories: (accessories: string[]) => void;
}

const backgrounds = [
  { id: 'none', name: 'None', icon: '🚫', color: 'transparent' },
  { id: 'sunset', name: 'Sunset', icon: '🌅', color: 'linear-gradient(135deg, #ff6b6b, #ffa726)' },
  { id: 'forest', name: 'Forest', icon: '🌲', color: 'linear-gradient(135deg, #4caf50, #8bc34a)' },
  { id: 'ocean', name: 'Ocean', icon: '🌊', color: 'linear-gradient(135deg, #2196f3, #00bcd4)' },
  { id: 'galaxy', name: 'Galaxy', icon: '🌌', color: 'linear-gradient(135deg, #9c27b0, #3f51b5)' },
  { id: 'cherry', name: 'Cherry Blossoms', icon: '🌸', color: 'linear-gradient(135deg, #e91e63, #ffb3d1)' },
  { id: 'neon', name: 'Neon City', icon: '🏙️', color: 'linear-gradient(135deg, #00bcd4, #e91e63)' },
];

const poses = [
  { id: 'normal', name: 'Normal', description: 'Standard pose' },
  { id: 'confident', name: 'Confident', description: 'Hands on hips' },
  { id: 'thinking', name: 'Thinking', description: 'Hand on chin' },
  { id: 'waving', name: 'Waving', description: 'Friendly wave' },
  { id: 'peace', name: 'Peace Sign', description: 'Victory pose' },
];

const accessories = [
  { id: 'crown', name: 'Crown', icon: '👑', unlocked: true },
  { id: 'glasses', name: 'Glasses', icon: '👓', unlocked: true },
  { id: 'hat', name: 'Hat', icon: '👒', unlocked: true },
  { id: 'headphones', name: 'Headphones', icon: '🎧', unlocked: false },
  { id: 'necklace', name: 'Necklace', icon: '📿', unlocked: false },
  { id: 'earrings', name: 'Earrings', icon: '💎', unlocked: false },
];

const AvatarCustomization = ({
  selectedBackground,
  setSelectedBackground,
  selectedPose,
  setSelectedPose,
  selectedAccessories,
  setSelectedAccessories,
}: AvatarCustomizationProps) => {
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);

  const toggleAccessory = (accessoryId: string) => {
    const accessory = accessories.find(a => a.id === accessoryId);
    if (!accessory?.unlocked) return;

    if (selectedAccessories.includes(accessoryId)) {
      setSelectedAccessories(selectedAccessories.filter(id => id !== accessoryId));
    } else {
      setSelectedAccessories([...selectedAccessories, accessoryId]);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="backgrounds" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
          <TabsTrigger value="poses">Poses</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>

        <TabsContent value="backgrounds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Background Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBackground(bg.id)}
                    className={cn(
                      "relative aspect-square rounded-lg border-2 transition-all overflow-hidden group",
                      selectedBackground === bg.id
                        ? "border-anime-purple ring-2 ring-anime-purple/30 scale-105"
                        : "border-border hover:border-anime-purple/50"
                    )}
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center text-2xl"
                      style={{ 
                        background: bg.color,
                        backgroundColor: bg.color === 'transparent' ? '#f3f4f6' : undefined 
                      }}
                    >
                      {bg.icon}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-sm font-medium px-2 py-1 bg-black/50 rounded">
                        {bg.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="poses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Avatar Poses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poses.map((pose) => (
                  <button
                    key={pose.id}
                    onClick={() => setSelectedPose(pose.id)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-left",
                      selectedPose === pose.id
                        ? "border-anime-purple bg-anime-purple/10"
                        : "border-border hover:border-anime-purple/50"
                    )}
                  >
                    <h3 className="font-semibold mb-1">{pose.name}</h3>
                    <p className="text-sm text-muted-foreground">{pose.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Accessories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {accessories.map((accessory) => (
                  <button
                    key={accessory.id}
                    onClick={() => toggleAccessory(accessory.id)}
                    disabled={!accessory.unlocked}
                    className={cn(
                      "relative p-4 rounded-lg border-2 transition-all text-center",
                      selectedAccessories.includes(accessory.id) && accessory.unlocked
                        ? "border-anime-purple bg-anime-purple/10"
                        : "border-border hover:border-anime-purple/50",
                      !accessory.unlocked && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="text-2xl mb-2">{accessory.icon}</div>
                    <div className="text-sm font-medium">{accessory.name}</div>
                    {!accessory.unlocked && (
                      <Badge className="absolute -top-2 -right-2 text-xs">
                        🔒 Locked
                      </Badge>
                    )}
                    {selectedAccessories.includes(accessory.id) && (
                      <div className="absolute -top-2 -left-2 bg-anime-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Visual Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Brightness</label>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={200}
                  min={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Dark</span>
                  <span>{brightness[0]}%</span>
                  <span>Bright</span>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-2 block">Contrast</label>
                <Slider
                  value={contrast}
                  onValueChange={setContrast}
                  max={200}
                  min={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>{contrast[0]}%</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvatarCustomization;