import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAvatarAchievements } from '@/hooks/useAvatarAchievements';
import { Trophy, Lock, Gift, Star, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AchievementPanel = () => {
  const { achievements, unlockedParts } = useAvatarAchievements();

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const handleClaimReward = (achievement: any) => {
    if (achievement.reward && achievement.unlocked) {
      toast({
        title: "Reward Claimed! 🎁",
        description: `You've unlocked: ${achievement.reward.itemId}`,
      });
    }
  };

  const AchievementCard = ({ achievement, isLocked = false }: any) => (
    <Card className={`transition-all hover:shadow-md ${
      achievement.unlocked ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`text-2xl p-2 rounded-lg ${
            achievement.unlocked 
              ? 'bg-yellow-100 text-yellow-600' 
              : 'bg-gray-100 text-gray-400'
          }`}>
            {isLocked ? <Lock className="h-6 w-6" /> : achievement.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold ${
                achievement.unlocked ? 'text-yellow-800' : 'text-gray-700'
              }`}>
                {achievement.title}
              </h3>
              {achievement.unlocked && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {achievement.description}
            </p>
            
            {!achievement.unlocked && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100} 
                  className="h-2"
                />
              </div>
            )}
            
            {achievement.reward && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-purple-600">
                    Reward: {achievement.reward.itemId}
                  </span>
                </div>
                
                {achievement.unlocked && (
                  <Button 
                    size="sm" 
                    onClick={() => handleClaimReward(achievement)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Gift className="h-3 w-3 mr-1" />
                    Claim
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text">🏆 Achievements</h2>
        <p className="text-muted-foreground mt-2">
          Complete challenges to unlock exclusive content!
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {unlockedAchievements.length}
            </div>
            <p className="text-sm text-muted-foreground">
              Achievements Unlocked
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 mx-auto text-purple-500 mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {unlockedParts.length}
            </div>
            <p className="text-sm text-muted-foreground">
              Items Unlocked
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">
              Completion Rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="text-xl font-semibold">Unlocked Achievements</h3>
            <Badge variant="secondary">{unlockedAchievements.length}</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Lock className="h-5 w-5 text-gray-500" />
            <h3 className="text-xl font-semibold">Locked Achievements</h3>
            <Badge variant="outline">{lockedAchievements.length}</Badge>
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lockedAchievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                  isLocked={true}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Unlocked Items Preview */}
      {unlockedParts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-purple-500" />
              Unlocked Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {unlockedParts.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                  <Star className="h-3 w-3 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AchievementPanel;