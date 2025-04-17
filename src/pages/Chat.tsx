
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Users, Star, Activity } from 'lucide-react';
import ChatRoom from '@/components/ChatRoom';

// Mock chat rooms
const chatRooms = [
  { id: 'c1', name: 'Anime Avatars General', members: 458, active: true },
  { id: 'c2', name: 'Avatar Creation Help', members: 237, active: true },
  { id: 'c3', name: 'Cyberpunk Style Discussion', members: 182, active: false },
  { id: 'c4', name: 'Fantasy Themes', members: 204, active: true },
  { id: 'c5', name: 'Newcomers Lounge', members: 326, active: true },
  { id: 'c6', name: 'Art Showcase', members: 291, active: false },
];

const Chat = () => {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Chat Rooms</h1>
        <p className="text-muted-foreground mt-1">Connect with other anime avatar enthusiasts in real-time</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search chat rooms..." 
              className="pl-10"
            />
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Room
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="joined">Joined</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-3">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{room.name}</h3>
                    {room.active && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    {room.members} members
                  </div>
                </button>
              ))}
            </TabsContent>
            
            <TabsContent value="joined" className="mt-4 space-y-3">
              {chatRooms.slice(0, 3).map((room) => (
                <button
                  key={room.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{room.name}</h3>
                    {room.active && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    {room.members} members
                  </div>
                </button>
              ))}
            </TabsContent>
            
            <TabsContent value="trending" className="mt-4 space-y-3">
              {chatRooms.slice(2, 5).map((room) => (
                <button
                  key={room.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{room.name}</h3>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20">
                      <Star className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Activity className="h-3 w-3 mr-1" />
                    High activity
                  </div>
                </button>
              ))}
            </TabsContent>
          </Tabs>
          
          <div className="glass-panel rounded-xl p-4">
            <h3 className="font-semibold mb-3">Chat Guidelines</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Be respectful to other members</li>
              <li>No spam or excessive self-promotion</li>
              <li>Keep discussions relevant to anime and avatars</li>
              <li>Have fun and make new friends!</li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default Chat;
