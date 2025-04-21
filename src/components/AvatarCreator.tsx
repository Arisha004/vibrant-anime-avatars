
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hairStyles, eyeStyles, mouthStyles, skinTones } from '@/assets/avatarParts';
import { useAvatarCreator } from '@/hooks/useAvatarCreator';
import AvatarPartSelector from './AvatarPartSelector';
import { Download, Share2, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AvatarCreator = () => {
  const {
    selectedHair,
    setSelectedHair,
    selectedEyes,
    setSelectedEyes,
    selectedMouth,
    setSelectedMouth,
    selectedSkin,
    setSelectedSkin,
    avatarName,
    setAvatarName,
  } = useAvatarCreator();

  const handleGenerate = () => {
    toast({
      title: "Avatar Generated!",
      description: "Your custom anime avatar has been created.",
    });
  };

  const handleRandomize = () => {
    setSelectedHair(hairStyles[Math.floor(Math.random() * hairStyles.length)].id);
    setSelectedEyes(eyeStyles[Math.floor(Math.random() * eyeStyles.length)].id);
    setSelectedMouth(mouthStyles[Math.floor(Math.random() * mouthStyles.length)].id);
    setSelectedSkin(skinTones[Math.floor(Math.random() * skinTones.length)].id);
  };

  return (
    <div className="space-y-6">
      <div>
        <Input
          placeholder="Name your avatar"
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <AvatarPartSelector
            label="Hair Style"
            options={hairStyles}
            selectedId={selectedHair}
            onSelect={setSelectedHair}
          />
          
          <AvatarPartSelector
            label="Eyes"
            options={eyeStyles}
            selectedId={selectedEyes}
            onSelect={setSelectedEyes}
          />
          
          <AvatarPartSelector
            label="Mouth"
            options={mouthStyles}
            selectedId={selectedMouth}
            onSelect={setSelectedMouth}
          />
        </TabsContent>

        <TabsContent value="style" className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-purple-700">Skin Tone</h3>
            <div className="flex gap-4">
              {skinTones.map((skin) => (
                <button
                  key={skin.id}
                  onClick={() => setSelectedSkin(skin.id)}
                  className={`w-12 h-12 rounded-full transition-transform ${
                    selectedSkin === skin.id ? 'ring-2 ring-purple-500 scale-110' : ''
                  }`}
                  style={{ backgroundColor: skin.color }}
                  title={skin.name}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-6">
          <p className="text-muted-foreground">Coming soon! More accessories will be available.</p>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleRandomize}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Randomize
        </Button>
        <Button onClick={handleGenerate}>
          Generate Avatar
        </Button>
      </div>
    </div>
  );
};

export default AvatarCreator;
