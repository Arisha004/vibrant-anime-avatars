
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { hairStyles, eyeStyles, mouthStyles, skinTones } from '@/assets/avatarParts';
import { useAvatarCreator, CreatedAvatar } from '@/hooks/useAvatarCreator';
import AvatarPartSelector from './AvatarPartSelector';
import AvatarRenderer from './AvatarRenderer';
import { 
  Download, Share2, RefreshCw, Save, Trash2, 
  Loader2, Sparkles, Heart, Eye, Calendar 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

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
    savedAvatars,
    isCreating,
    createAvatar,
    deleteAvatar,
    randomizeAvatar,
    resetAvatar,
    shareAvatar,
    downloadAvatar,
  } = useAvatarCreator();

  const [activeTab, setActiveTab] = useState('creator');

  const handleCreateAvatar = async () => {
    if (!avatarName.trim()) {
      toast({
        title: "Name Required",
        description: "Please give your avatar a name before creating it.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newAvatar = await createAvatar();
      toast({
        title: "Avatar Created! 🎉",
        description: `"${newAvatar.name}" has been saved to your collection.`,
      });
      setAvatarName(''); // Reset name after creation
      setActiveTab('gallery'); // Switch to gallery to show the new avatar
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create avatar. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (avatar: CreatedAvatar) => {
    const success = await shareAvatar(avatar);
    if (success) {
      toast({
        title: "Shared Successfully! 🔗",
        description: "Avatar link copied to clipboard.",
      });
    } else {
      toast({
        title: "Share Failed",
        description: "Failed to share avatar. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (avatar: CreatedAvatar) => {
    downloadAvatar(avatar);
    toast({
      title: "Download Started! 📥",
      description: "Your avatar is being downloaded.",
    });
  };

  const handleDelete = (avatar: CreatedAvatar) => {
    deleteAvatar(avatar.id);
    toast({
      title: "Avatar Deleted",
      description: `"${avatar.name}" has been removed from your collection.`,
    });
  };

  const getSelectedSkinTone = () => {
    return skinTones.find(s => s.id === selectedSkin);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="creator" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Create Avatar
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            My Avatars ({savedAvatars.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creator" className="space-y-6">
          {/* Avatar Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Avatar Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <AvatarRenderer
                  hair={selectedHair}
                  eyes={selectedEyes}
                  mouth={selectedMouth}
                  skin={selectedSkin}
                  size="xl"
                  name={avatarName}
                  className="shadow-2xl border-4 border-white/30"
                />
                <div className="text-center space-y-2">
                  <Input
                    placeholder="Enter avatar name"
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
                    className="max-w-xs mx-auto text-center"
                  />
                  <div className="text-sm text-muted-foreground">
                    <p>Hair: {hairStyles.find(h => h.id === selectedHair)?.name}</p>
                    <p>Eyes: {eyeStyles.find(e => e.id === selectedEyes)?.name}</p>
                    <p>Mouth: {mouthStyles.find(m => m.id === selectedMouth)?.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization Tabs */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
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
                <h3 className="font-semibold text-lg">Skin Tone</h3>
                <div className="grid grid-cols-3 gap-3">
                  {skinTones.map((skin) => (
                    <button
                      key={skin.id}
                      onClick={() => setSelectedSkin(skin.id)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                        selectedSkin === skin.id 
                          ? 'border-anime-purple bg-anime-purple/10' 
                          : 'border-border hover:border-anime-purple/50'
                      )}
                    >
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: skin.color }}
                      />
                      <span className="text-xs font-medium">{skin.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accessories" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>More accessories coming soon!</p>
                    <p className="text-sm mt-1">We're working on adding hats, glasses, and more customization options.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={randomizeAvatar} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Randomize
            </Button>
            <Button variant="outline" onClick={resetAvatar} className="flex-1">
              Reset
            </Button>
            <Button 
              onClick={handleCreateAvatar} 
              disabled={isCreating || !avatarName.trim()}
              className="flex-1 bg-gradient-to-r from-anime-purple to-anime-magenta hover:from-anime-purple/90 hover:to-anime-magenta/90"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Avatar
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          {savedAvatars.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No avatars created yet</p>
                  <p className="text-sm mt-1">Start creating your first anime avatar!</p>
                  <Button 
                    onClick={() => setActiveTab('creator')} 
                    className="mt-4"
                    variant="outline"
                  >
                    Create Your First Avatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedAvatars.map((avatar) => (
                  <Card key={avatar.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{avatar.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(avatar.createdAt)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                     {/* Avatar Preview */}
                      <div className="flex justify-center">
                        <AvatarRenderer
                          hair={avatar.hair}
                          eyes={avatar.eyes}
                          mouth={avatar.mouth}
                          skin={avatar.skin}
                          size="lg"
                          name={avatar.name}
                          className="shadow-lg border-2 border-white/20"
                        />
                      </div>

                      {/* Avatar Details */}
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex justify-between">
                          <span>Hair:</span>
                          <span>{hairStyles.find(h => h.id === avatar.hair)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eyes:</span>
                          <span>{eyeStyles.find(e => e.id === avatar.eyes)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mouth:</span>
                          <span>{mouthStyles.find(m => m.id === avatar.mouth)?.name}</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleShare(avatar)}
                          className="flex-1"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownload(avatar)}
                          className="flex-1"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(avatar)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvatarCreator;
