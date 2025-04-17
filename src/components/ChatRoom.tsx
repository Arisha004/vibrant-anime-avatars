
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Smile, Image, Mic, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isMine: boolean;
}

// Mock users
const users = [
  { id: 'u1', username: 'NeonKitsune', avatar: 'https://via.placeholder.com/40?text=NK', status: 'online' },
  { id: 'u2', username: 'PurpleSamurai', avatar: 'https://via.placeholder.com/40?text=PS', status: 'online' },
  { id: 'u3', username: 'CosmicMage', avatar: 'https://via.placeholder.com/40?text=CM', status: 'offline' },
  { id: 'u4', username: 'SakuraDreams', avatar: 'https://via.placeholder.com/40?text=SD', status: 'online' },
  { id: 'u5', username: 'OceanSpirit', avatar: 'https://via.placeholder.com/40?text=OS', status: 'idle' },
];

// Initial mock messages
const initialMessages: Message[] = [
  {
    id: 'm1',
    userId: 'u2',
    username: 'PurpleSamurai',
    avatar: 'https://via.placeholder.com/40?text=PS',
    content: 'Hey everyone! Just joined the chat. I love the new avatar features!',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isMine: false,
  },
  {
    id: 'm2',
    userId: 'u1',
    username: 'NeonKitsune',
    avatar: 'https://via.placeholder.com/40?text=NK',
    content: 'Welcome! The new vibrant themes are amazing. Has anyone tried the custom backgrounds yet?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isMine: false,
  },
  {
    id: 'm3',
    userId: 'u4',
    username: 'SakuraDreams',
    avatar: 'https://via.placeholder.com/40?text=SD',
    content: 'I love the gradient ones! They make the avatars pop so much more.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isMine: false,
  },
];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [messageInput, setMessageInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(users);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate receiving new messages
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomMessages = [
        'The new avatar editor is amazing!',
        'Has anyone seen the new anime-inspired backgrounds?',
        'Just created a custom avatar with the purple hair style, looks awesome!',
        'How do you add those glowing effects to your avatar?',
        'The real-time updates are so smooth now',
      ];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      if (Math.random() > 0.7) { // 30% chance to add a message
        const newMessage: Message = {
          id: `m${Date.now()}`,
          userId: randomUser.id,
          username: randomUser.username,
          avatar: randomUser.avatar,
          content: randomMessage,
          timestamp: new Date(),
          isMine: false,
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      userId: 'me',
      username: 'You',
      avatar: 'https://via.placeholder.com/40?text=Me',
      content: messageInput,
      timestamp: new Date(),
      isMine: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
  };
  
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Online users sidebar */}
      <div className="hidden lg:block glass-panel rounded-xl p-4">
        <h3 className="font-semibold mb-4">Online Users</h3>
        <ScrollArea className="h-[520px] pr-4">
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <div 
                key={user.id}
                className="flex items-center p-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8 border border-white/50">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span 
                    className={cn(
                      "absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white",
                      user.status === 'online' ? 'bg-green-500' : 
                      user.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'
                    )}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Chat content */}
      <div className="lg:col-span-3 flex flex-col glass-panel rounded-xl">
        <div className="p-4 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="font-semibold">Anime Avatars Chat</h2>
            <div className="ml-3 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
              {onlineUsers.filter(u => u.status === 'online').length} online
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden">
            <User className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  message.isMine ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <Avatar className={cn(
                  "h-8 w-8 border", 
                  message.isMine ? "border-anime-purple/30" : "border-white/50"
                )}>
                  <AvatarImage src={message.avatar} alt={message.username} />
                  <AvatarFallback>{message.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={cn(
                      "text-sm font-medium",
                      message.isMine ? "text-anime-purple" : ""
                    )}>
                      {message.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "mt-1 p-3 rounded-lg",
                    message.isMine 
                      ? "bg-gradient-to-r from-anime-purple/20 to-anime-magenta/20 border border-anime-purple/20" 
                      : "bg-white/50 border border-white/30"
                  )}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 shrink-0">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 shrink-0">
              <Image className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Input 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..." 
              className="bg-muted/50 border-muted"
            />
            
            <Button
              onClick={handleSendMessage}
              className="rounded-full h-9 w-9 shrink-0 bg-anime-purple hover:bg-anime-purple/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
