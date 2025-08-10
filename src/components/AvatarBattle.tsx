import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAvatarBattle, BattleAvatar } from '@/hooks/useAvatarBattle';
import { useAvatarCreator } from '@/hooks/useAvatarCreator';
import { useAvatarAchievements } from '@/hooks/useAvatarAchievements';
import AvatarRenderer from './AvatarRenderer';
import { 
  Sword, Shield, Sparkles, Crown, Trophy, Zap, 
  Heart, Star, Flame, Loader2, ArrowRight, Bolt,
  Bomb, Clock, Target
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AvatarBattle = () => {
  const navigate = useNavigate();
  const { savedAvatars } = useAvatarCreator();
  const { battles, isLoading, startBattle, generateRandomStats, generatePersonality } = useAvatarBattle();
  const { checkBattleWin } = useAvatarAchievements();
  
  const [selectedAvatar1, setSelectedAvatar1] = useState<string>('');
  const [selectedAvatar2, setSelectedAvatar2] = useState<string>('');
  const [battleType, setBattleType] = useState<'power' | 'creativity' | 'charm'>('power');
  const [lastBattle, setLastBattle] = useState<any>(null);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [battleSequence, setBattleSequence] = useState<any[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [avatar1Health, setAvatar1Health] = useState(100);
  const [avatar2Health, setAvatar2Health] = useState(100);
  const [battleEffects, setBattleEffects] = useState<string[]>([]);
  const [showBattleArena, setShowBattleArena] = useState(false);

  const convertToBattleAvatar = (avatar: any): BattleAvatar => ({
    ...avatar,
    stats: generateRandomStats(),
    wins: Math.floor(Math.random() * 20),
    losses: Math.floor(Math.random() * 15),
    personality: generatePersonality(),
  });

  const simulateBattleSequence = (avatar1: BattleAvatar, avatar2: BattleAvatar, type: string) => {
    const sequences = [];
    const totalRounds = 5;
    let health1 = 100;
    let health2 = 100;

    for (let round = 1; round <= totalRounds; round++) {
      const avatar1Power = type === 'power' ? avatar1.stats.power : 
                          type === 'creativity' ? avatar1.stats.creativity : avatar1.stats.charm;
      const avatar2Power = type === 'power' ? avatar2.stats.power : 
                          type === 'creativity' ? avatar2.stats.creativity : avatar2.stats.charm;
      
      const damage1to2 = Math.floor((avatar1Power / 10) + Math.random() * 15);
      const damage2to1 = Math.floor((avatar2Power / 10) + Math.random() * 15);
      
      health2 -= damage1to2;
      health1 -= damage2to1;
      
      sequences.push({
        round,
        attacker: avatar1.name,
        defender: avatar2.name,
        damage: damage1to2,
        attackType: type === 'power' ? '⚔️ Power Strike' : 
                   type === 'creativity' ? '🎨 Creative Burst' : '💖 Charm Attack',
        effect: type === 'power' ? 'Slashes with fierce determination!' : 
               type === 'creativity' ? 'Dazzles with artistic brilliance!' : 'Captivates with irresistible charm!',
        avatar1Health: Math.max(0, health1),
        avatar2Health: Math.max(0, health2)
      });
      
      if (health1 <= 0 || health2 <= 0) break;
      
      sequences.push({
        round,
        attacker: avatar2.name,
        defender: avatar1.name,
        damage: damage2to1,
        attackType: type === 'power' ? '🔥 Fire Strike' : 
                   type === 'creativity' ? '✨ Magic Spark' : '🌟 Star Power',
        effect: type === 'power' ? 'Counterattacks with burning fury!' : 
               type === 'creativity' ? 'Responds with mystical energy!' : 'Radiates with stellar charisma!',
        avatar1Health: Math.max(0, health1),
        avatar2Health: Math.max(0, health2)
      });
      
      if (health1 <= 0 || health2 <= 0) break;
    }
    
    return { sequences, winner: health1 > health2 ? avatar1 : avatar2 };
  };

  const handleBattle = async () => {
    if (!selectedAvatar1 || !selectedAvatar2) {
      toast({
        title: "Select Avatars",
        description: "Please select both avatars for the battle.",
        variant: "destructive",
      });
      return;
    }

    const avatar1 = savedAvatars.find(a => a.id === selectedAvatar1);
    const avatar2 = savedAvatars.find(a => a.id === selectedAvatar2);

    if (!avatar1 || !avatar2) return;

    const battleAvatar1 = convertToBattleAvatar(avatar1);
    const battleAvatar2 = convertToBattleAvatar(avatar2);

    setBattleInProgress(true);
    setShowBattleArena(true);
    setAvatar1Health(100);
    setAvatar2Health(100);
    setCurrentRound(0);
    setBattleEffects([]);
    
    const battleResult = simulateBattleSequence(battleAvatar1, battleAvatar2, battleType);
    setBattleSequence(battleResult.sequences);
    
    // Animate battle sequence
    for (let i = 0; i < battleResult.sequences.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const sequence = battleResult.sequences[i];
      setCurrentRound(i + 1);
      setAvatar1Health(sequence.avatar1Health);
      setAvatar2Health(sequence.avatar2Health);
      setBattleEffects(prev => [...prev, `${sequence.attacker}: ${sequence.effect}`]);
      
      if (sequence.avatar1Health <= 0 || sequence.avatar2Health <= 0) {
        break;
      }
    }

    try {
      const result = await startBattle(battleAvatar1, battleAvatar2, battleType);
      setLastBattle({
        ...result,
        battleSequence: battleResult.sequences,
        finalStats: {
          avatar1: { health: battleResult.sequences[battleResult.sequences.length - 1]?.avatar1Health || 100 },
          avatar2: { health: battleResult.sequences[battleResult.sequences.length - 1]?.avatar2Health || 100 }
        }
      });
      
      if (result.winner === battleAvatar1.id) {
        checkBattleWin();
      }
      
      toast({
        title: "🏆 VICTORY! 🏆",
        description: `${battleResult.winner.name} dominates in the ${battleType} battle with ${Math.max(battleResult.sequences[battleResult.sequences.length - 1]?.avatar1Health, battleResult.sequences[battleResult.sequences.length - 1]?.avatar2Health)}% health remaining!`,
      });
    } catch (error) {
      toast({
        title: "Battle Failed",
        description: "Something went wrong during the battle.",
        variant: "destructive",
      });
    } finally {
      setBattleInProgress(false);
      setTimeout(() => setShowBattleArena(false), 3000);
    }
  };

  const generateRandomOpponent = (): BattleAvatar => ({
    id: `cpu_${Date.now()}`,
    name: ['Shadow Master', 'Mystic Warrior', 'Crystal Guardian', 'Neon Fighter', 'Storm Caller'][Math.floor(Math.random() * 5)],
    hair: 'h' + (Math.floor(Math.random() * 5) + 1),
    eyes: 'e' + (Math.floor(Math.random() * 5) + 1),
    mouth: 'm' + (Math.floor(Math.random() * 5) + 1),
    skin: 's' + (Math.floor(Math.random() * 6) + 1),
    stats: generateRandomStats(),
    wins: Math.floor(Math.random() * 50),
    losses: Math.floor(Math.random() * 30),
    personality: generatePersonality(),
  });

  const StatCard = ({ icon, label, value, color }: any) => (
    <div className="flex items-center space-x-2">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span className="font-semibold">{value}</span>
        </div>
        <Progress value={value} className="h-2 mt-1" />
      </div>
    </div>
  );

  const AvatarStats = ({ avatar }: { avatar: BattleAvatar }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{avatar.name}</CardTitle>
          <Badge variant="outline">
            Level {avatar.stats.level}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {avatar.wins}W - {avatar.losses}L
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-center mb-4">
          <AvatarRenderer
            hair={avatar.hair}
            eyes={avatar.eyes}
            mouth={avatar.mouth}
            skin={avatar.skin}
            size="lg"
            name={avatar.name}
          />
        </div>
        
        <div className="space-y-2">
          <StatCard 
            icon={<Sword className="h-4 w-4 text-red-500" />}
            label="Power" 
            value={avatar.stats.power}
            color="red"
          />
          <StatCard 
            icon={<Sparkles className="h-4 w-4 text-purple-500" />}
            label="Creativity" 
            value={avatar.stats.creativity}
            color="purple"
          />
          <StatCard 
            icon={<Heart className="h-4 w-4 text-pink-500" />}
            label="Charm" 
            value={avatar.stats.charm}
            color="pink"
          />
          <StatCard 
            icon={<Star className="h-4 w-4 text-yellow-500" />}
            label="Rarity" 
            value={avatar.stats.rarity}
            color="yellow"
          />
        </div>

        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Personality</h4>
          <div className="flex flex-wrap gap-1">
            {avatar.personality.map((trait, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const BattleArena = () => {
    if (!showBattleArena || !selectedAvatar1 || !selectedAvatar2) return null;
    
    const avatar1 = savedAvatars.find(a => a.id === selectedAvatar1);
    const avatar2 = savedAvatars.find(a => a.id === selectedAvatar2);
    
    if (!avatar1 || !avatar2) return null;
    
    return (
      <Card className="mb-6 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-2 border-orange-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-800">
            🏟️ BATTLE ARENA 🏟️
          </CardTitle>
          <p className="text-orange-600">Round {currentRound} - {battleType.toUpperCase()} BATTLE</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Battle Visual */}
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Avatar 1 */}
            <div className="text-center space-y-2">
              <div className={`relative ${avatar1Health <= 20 ? 'animate-pulse' : avatar1Health <= 50 ? 'animate-bounce' : ''}`}>
                <AvatarRenderer
                  hair={avatar1.hair}
                  eyes={avatar1.eyes}
                  mouth={avatar1.mouth}
                  skin={avatar1.skin}
                  size="xl"
                  name={avatar1.name}
                />
                {battleInProgress && (
                  <div className="absolute -top-2 -right-2">
                    <Bomb className="h-6 w-6 text-red-500 animate-ping" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg">{avatar1.name}</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span className="font-bold">{avatar1Health}%</span>
                </div>
                <Progress 
                  value={avatar1Health} 
                  className="h-3"
                  style={{
                    background: avatar1Health > 50 ? 'linear-gradient(90deg, #22c55e, #16a34a)' :
                               avatar1Health > 20 ? 'linear-gradient(90deg, #eab308, #ca8a04)' :
                               'linear-gradient(90deg, #ef4444, #dc2626)'
                  }}
                />
              </div>
            </div>
            
            {/* Battle Effects */}
            <div className="text-center space-y-2">
              <div className="text-4xl animate-pulse">
                {battleType === 'power' ? '⚔️' : battleType === 'creativity' ? '🎨' : '💖'}
              </div>
              <div className="text-6xl font-bold text-orange-600 animate-bounce">VS</div>
              {battleInProgress && (
                <div className="space-y-1">
                  <div className="flex justify-center space-x-1">
                    <Bolt className="h-4 w-4 text-yellow-500 animate-ping" />
                    <Bomb className="h-4 w-4 text-red-500 animate-bounce" />
                    <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold text-orange-600 animate-pulse">
                    BATTLE IN PROGRESS!
                  </p>
                </div>
              )}
            </div>
            
            {/* Avatar 2 */}
            <div className="text-center space-y-2">
              <div className={`relative ${avatar2Health <= 20 ? 'animate-pulse' : avatar2Health <= 50 ? 'animate-bounce' : ''}`}>
                <AvatarRenderer
                  hair={avatar2.hair}
                  eyes={avatar2.eyes}
                  mouth={avatar2.mouth}
                  skin={avatar2.skin}
                  size="xl"
                  name={avatar2.name}
                />
                {battleInProgress && (
                  <div className="absolute -top-2 -left-2">
                    <Flame className="h-6 w-6 text-orange-500 animate-spin" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg">{avatar2.name}</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span className="font-bold">{avatar2Health}%</span>
                </div>
                <Progress 
                  value={avatar2Health} 
                  className="h-3"
                  style={{
                    background: avatar2Health > 50 ? 'linear-gradient(90deg, #22c55e, #16a34a)' :
                               avatar2Health > 20 ? 'linear-gradient(90deg, #eab308, #ca8a04)' :
                               'linear-gradient(90deg, #ef4444, #dc2626)'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Battle Log */}
          {battleEffects.length > 0 && (
            <Card className="bg-black/90 text-white">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Battle Log
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-32 overflow-y-auto">
                {battleEffects.slice(-3).map((effect, i) => (
                  <p key={i} className="text-xs mb-1 animate-fade-in font-mono">
                    {effect}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
          
          {/* Battle Result */}
          {lastBattle && !battleInProgress && (
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
              <CardContent className="pt-4 text-center">
                <Trophy className="h-12 w-12 mx-auto text-yellow-600 mb-2 animate-bounce" />
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  🏆 VICTORY! 🏆
                </h3>
                <p className="text-yellow-700">
                  <strong>{savedAvatars.find(a => a.id === lastBattle.winner)?.name}</strong> wins with {Math.max(avatar1Health, avatar2Health)}% health remaining!
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div className="bg-white/50 p-2 rounded">
                    <p className="font-bold">{avatar1.name}</p>
                    <p>Final Health: {avatar1Health}%</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded">
                    <p className="font-bold">{avatar2.name}</p>
                    <p>Final Health: {avatar2Health}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text">⚔️ Avatar Battle Arena</h2>
        <p className="text-muted-foreground mt-2">
          Battle your avatars and prove their strength!
        </p>
      </div>

      <Tabs defaultValue="battle" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="battle">New Battle</TabsTrigger>
          <TabsTrigger value="history">Battle History</TabsTrigger>
        </TabsList>

        <TabsContent value="battle" className="space-y-6">
          <BattleArena />
          
          {savedAvatars.length < 2 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Sword className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Need More Avatars</h3>
                <p className="text-muted-foreground mb-4">
                  Create at least 2 avatars to start battling!
                </p>
                <Button variant="outline" onClick={() => navigate('/create')}>Create Avatar</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Battle Setup */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Setup Battle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Avatar 1</label>
                      <Select value={selectedAvatar1} onValueChange={setSelectedAvatar1}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select first avatar" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedAvatars.map((avatar) => (
                            <SelectItem key={avatar.id} value={avatar.id}>
                              {avatar.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Avatar 2</label>
                      <Select value={selectedAvatar2} onValueChange={setSelectedAvatar2}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select second avatar" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedAvatars
                            .filter(a => a.id !== selectedAvatar1)
                            .map((avatar) => (
                            <SelectItem key={avatar.id} value={avatar.id}>
                              {avatar.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Battle Type</label>
                    <Select value={battleType} onValueChange={(value: any) => setBattleType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power">⚔️ Power Battle</SelectItem>
                        <SelectItem value="creativity">🎨 Creativity Contest</SelectItem>
                        <SelectItem value="charm">💖 Charm Competition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleBattle}
                    disabled={isLoading || battleInProgress || !selectedAvatar1 || !selectedAvatar2}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    size="lg"
                  >
                    {battleInProgress ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Battle in Progress... (Round {currentRound})
                      </>
                    ) : isLoading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-pulse" />
                        Preparing Battle...
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4 mr-2" />
                        Start Battle!
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Battle Preview */}
              {selectedAvatar1 && selectedAvatar2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AvatarStats avatar={convertToBattleAvatar(savedAvatars.find(a => a.id === selectedAvatar1)!)} />
                  
                  <Card className="flex items-center justify-center">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-2">⚔️</div>
                      <h3 className="text-lg font-semibold">VS</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {battleType} Battle
                      </p>
                      {lastBattle && (
                        <div className="mt-4 p-2 bg-yellow-50 rounded-lg">
                          <Trophy className="h-6 w-6 mx-auto text-yellow-600 mb-1" />
                          <p className="text-sm font-medium text-yellow-800">
                            Last Winner: {savedAvatars.find(a => a.id === lastBattle.winner)?.name || 'Unknown'}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <AvatarStats avatar={convertToBattleAvatar(savedAvatars.find(a => a.id === selectedAvatar2)!)} />
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {battles.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Battles Yet</h3>
                <p className="text-muted-foreground">
                  Start your first battle to see the history!
                </p>
              </CardContent>
            </Card>
          ) : (
            battles.map((battle) => (
              <Card key={battle.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-medium">{battle.avatar1.name}</p>
                        <div className="w-12 h-12 mx-auto mt-1">
                          <AvatarRenderer
                            hair={battle.avatar1.hair}
                            eyes={battle.avatar1.eyes}
                            mouth={battle.avatar1.mouth}
                            skin={battle.avatar1.skin}
                            size="sm"
                            name={battle.avatar1.name}
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground capitalize">
                          {battle.battleType} Battle
                        </p>
                        <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">{battle.avatar2.name}</p>
                        <div className="w-12 h-12 mx-auto mt-1">
                          <AvatarRenderer
                            hair={battle.avatar2.hair}
                            eyes={battle.avatar2.eyes}
                            mouth={battle.avatar2.mouth}
                            skin={battle.avatar2.skin}
                            size="sm"
                            name={battle.avatar2.name}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Crown className="h-3 w-3 mr-1" />
                        Winner: {battle.winner === battle.avatar1.id ? battle.avatar1.name : battle.avatar2.name}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(battle.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvatarBattle;