import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvatarBattle from '@/components/AvatarBattle';
import AchievementPanel from '@/components/AchievementPanel';
import DailyChallengePanel from '@/components/DailyChallengePanel';
import { Sword, Trophy, Target } from 'lucide-react';

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Advanced Features - AnimeAvatars</title>
        <meta name="description" content="Explore advanced features including avatar battles, achievements, and daily challenges. Level up your anime avatar experience!" />
        <meta name="keywords" content="avatar battles, achievements, daily challenges, anime games, avatar features" />
      </Helmet>
      
      <div className="container py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            ✨ Advanced Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take your avatar experience to the next level with battles, achievements, 
            daily challenges, and exclusive rewards!
          </p>
        </div>

        <Tabs defaultValue="battles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="battles" className="flex items-center gap-2">
              <Sword className="h-4 w-4" />
              Avatar Battles
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Daily Challenges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="battles" className="animate-fade-in">
            <AvatarBattle />
          </TabsContent>

          <TabsContent value="achievements" className="animate-fade-in">
            <AchievementPanel />
          </TabsContent>

          <TabsContent value="challenges" className="animate-fade-in">
            <DailyChallengePanel />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Features;