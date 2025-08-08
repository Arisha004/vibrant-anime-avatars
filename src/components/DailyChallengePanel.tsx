import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useDailyChallenges } from '@/hooks/useDailyChallenges';
import { 
  Calendar, Clock, Target, Gift, Flame, Trophy, 
  CheckCircle, ArrowRight, Star, Zap 
} from 'lucide-react';

const DailyChallengePanel = () => {
  const { challenges, streak, getCompletionPercentage } = useDailyChallenges();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'creation': return <Star className="h-4 w-4" />;
      case 'battle': return <Zap className="h-4 w-4" />;
      case 'social': return <Target className="h-4 w-4" />;
      case 'exploration': return <Trophy className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'creation': return 'text-purple-500 bg-purple-100';
      case 'battle': return 'text-red-500 bg-red-100';
      case 'social': return 'text-blue-500 bg-blue-100';
      case 'exploration': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getRewardIcon = (rewardType: string) => {
    switch (rewardType) {
      case 'experience': return '⭐';
      case 'part': return '🎨';
      case 'background': return '🖼️';
      case 'currency': return '💰';
      default: return '🎁';
    }
  };

  const timeUntilReset = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const now = new Date();
    const diff = tomorrow.getTime() - now.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text">🎯 Daily Challenges</h2>
        <p className="text-muted-foreground mt-2">
          Complete daily tasks to earn exclusive rewards!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Flame className="h-8 w-8 mx-auto text-orange-500 mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {streak}
            </div>
            <p className="text-sm text-muted-foreground">
              Day Streak
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {Math.round(getCompletionPercentage())}%
            </div>
            <p className="text-sm text-muted-foreground">
              Today's Progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {timeUntilReset()}
            </div>
            <p className="text-sm text-muted-foreground">
              Until Reset
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Challenges
            </span>
            <Badge variant="outline">
              {challenges.filter(c => c.completed).length}/{challenges.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={getCompletionPercentage()} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Complete all challenges to maintain your streak!
          </p>
        </CardContent>
      </Card>

      {/* Challenge List */}
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <Card 
            key={challenge.id} 
            className={`transition-all hover:shadow-md ${
              challenge.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getTypeColor(challenge.type)}`}>
                  {getTypeIcon(challenge.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {challenge.title}
                    </h3>
                    {challenge.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {challenge.description}
                  </p>
                  
                  {!challenge.completed && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-purple-600">
                        {getRewardIcon(challenge.reward.type)} {challenge.reward.amount}
                        {challenge.reward.itemId && ` ${challenge.reward.itemId}`}
                      </span>
                    </div>
                    
                    <Badge 
                      variant={challenge.completed ? "default" : "secondary"}
                      className={challenge.completed ? "bg-green-100 text-green-800" : ""}
                    >
                      {challenge.completed ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Streak Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Streak Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { days: 3, reward: "Special Hair Style", unlocked: streak >= 3 },
              { days: 7, reward: "Exclusive Background", unlocked: streak >= 7 },
              { days: 14, reward: "Legendary Eyes", unlocked: streak >= 14 },
              { days: 30, reward: "Master's Crown", unlocked: streak >= 30 },
            ].map((item) => (
              <div 
                key={item.days}
                className={`text-center p-3 rounded-lg border ${
                  item.unlocked 
                    ? 'border-yellow-200 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`text-2xl mb-2 ${
                  item.unlocked ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {item.unlocked ? '🏆' : '🔒'}
                </div>
                <div className="text-sm font-medium">
                  {item.days} Days
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.reward}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyChallengePanel;